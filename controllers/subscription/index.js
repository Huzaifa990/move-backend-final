const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

const Subscription = require("../../models/Subscription");

const checkOutSession = async (req, res) => {
  const { email, type, lookup_key } = req.body;

  if (type !== "employer") {
    return res.status(409).send({ msg: "Only Employer Can Make Subscriptions!" });
  }

  const emailExists = await Subscription.findOne({ email });
  if (emailExists) {
    return res.status(409).send({ msg: "You are Already Subscribed!" });
  }

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ["data.product"],
  });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: prices?.data?.[0]?.id || lookup_key,
        quantity: 1,
      },
    ],
    mode: prices?.data?.[0]?.id ? "subscription" : "payment",
    success_url: `https://beta.yehaww.com/?success=true`,
    cancel_url: `https://beta.yehaww.com/?canceled=true`,
  });
  res.status(200).json({ redirect: session.url });
};

const webhook = async (req, res) => {
  let event = req.body;
  let subscription;
  let status;
  // Handle the event
  switch (event.type) {
    case "invoice.payment_succeeded": {
      subscription = event.data.object;
      const customer = await stripe.customers.retrieve(subscription?.customer);
      if (subscription.billing_reason === "subscription_create") {
        const newSubscription = new Subscription({
          id: subscription?.subscription,
          email: customer.email,
          expiry: moment().add(subscription?.lines?.data?.[0]?.plan?.interval_count, "M"),
        });
        await newSubscription.save();
      }
      break;
    }
    case "payment_intent.succeeded": {
      subscription = event.data.object;
      const amount = subscription.amount_received;
      const customerId = subscription.customer;
      const customer = await stripe.customers.retrieve(customerId);
      if (amount === 500) {
        const newSubscription = new Subscription({
          id: subscription?.id,
          email: customer.email,
          expiry: moment().add(6, "M"),
          amount,
        });
        await newSubscription.save();
      }
      break;
    }
    default:
      // Unexpected event type
      console.info(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 res to acknowledge receipt of the event
  res.send();
};

module.exports = { checkOutSession, webhook };
