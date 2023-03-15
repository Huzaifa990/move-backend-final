import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import master from "../img/mastercard.svg";
import cancel from "../img/remove.png";
import visa from "../img/visa.svg";
import { InputMask } from "primereact/inputmask";
import { useNavigate } from "react-router-dom";

// 👇️ View all listings from the API
const ViewListings = () => {
  const location = useLocation();
  console.log(location.state.id);
  const navigator = useNavigate();

  // 👇️ Use states for storing data and images from the API
  const [name, setName] = useState([]);
  const [img, setImg] = useState([]);
  const [buttonLoader, setButtonLoader] = useState("Proceed To Payment");
  const [pendingId, setPendingId] = useState("");
  var [paymentStatus, setPaymentStatus] = useState(false);
  var [attemptCount, setAttempt] = useState(0);
  var [paymentButton, setPayButton] = useState("Pay");

  useEffect(() => {
    var imgg = [];
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const names = async () => {
      const response = await fetch("http://localhost:8080/api/listing/" + location.state.id, {
        headers: { Authorization: userDetails },
      });
      console.log(response);
      const data = await response.json();
      imgg = data.item.picture;
      setImg(imgg);
      console.log(imgg);
      console.log(data.item);
      setName(data.item);
    };

    names();
  }, [location.state.id]);

  // 👇️ Getting data from the API and setting use states to store data and images form the API

  // 👇️ Changing the format of time and date so that it can be inserted into the form inputs
  function timeFix() {
    const timeInput1 = document.getElementById("pickTime");

    timeInput1.addEventListener("input", (e) => {
      let hour = e.target.value.split(":")[0];
      e.target.value = `${hour}:00`;
    });

    const timeInput2 = document.getElementById("dropTime");

    timeInput2.addEventListener("input", (e) => {
      let hour = e.target.value.split(":")[0];
      e.target.value = `${hour}:00`;
    });
  }

  setTimeout(timeFix, 2000);

  // 👇️ Allows user to book a car
  const bookingCar = () => {
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      Authorization: userDetails,
    };

    var pickDate = document.getElementById("pickDate").value;
    var pickTime = document.getElementById("pickTime").value;
    var dropDate = document.getElementById("dropDate").value;
    var dropTime = document.getElementById("dropTime").value;

    var pickupDate = pickDate + "T" + pickTime + "Z";
    var dropOffDate = dropDate + "T" + dropTime + "Z";
    console.log(pickupDate);
    console.log(dropOffDate);
    var paymentMethod = document.getElementById("COD").value;

    var car = location.state.id;

    console.log(car, dropOffDate, pickupDate, paymentMethod);
    // 👇️ Axios command to add a booking
    axios
      .post(
        "http://localhost:8080/api/booking/",
        {
          car,
          pickupDate,
          dropOffDate,
          paymentMethod,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        // 👇️ Displaying the confirmation message and clearing the input values //
        document.getElementById("errorMessage").innerText =
          "Your Car Has Been Booked Successfully!";
        document.getElementById("errorApi").style.visibility = "visible";
        document.getElementById("errorApi").style.position = "relative";
        document.getElementById("errorApi").style.width = "100%";
        document.getElementById("errorApi").style.background = "green";

        document.getElementById("pickDate").style.border = "none";
        document.getElementById("dropDate").style.border = "none";
        document.getElementById("pickTime").style.border = "none";
        document.getElementById("dropTime").style.border = "none";

        document.getElementById("pickDate").value = "";
        document.getElementById("dropDate").value = "";
        document.getElementById("pickTime").value = "";
        document.getElementById("dropTime").value = "";
      })
      .catch((e) => {
        console.log(e);
        // 👇️ Displaying the error codes on the screen from the API //
        if (e.response.data.msg !== undefined) {
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("pickDate").style.border = "none";
          document.getElementById("dropDate").style.border = "none";
          document.getElementById("pickTime").style.border = "none";
          document.getElementById("dropTime").style.border = "none";
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.pickupDate !== undefined) {
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("pickDate").style.border = "2px solid crimson";
          document.getElementById("pickTime").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.pickupDate;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        } else if (e.response.data.error.dropOffDate !== undefined) {
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("pickDate").style.border = "none";
          document.getElementById("pickTime").style.border = "none";
          document.getElementById("dropDate").style.border = "2px solid crimson";
          document.getElementById("dropTime").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.dropOffDate;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        }
      });
  };

  // ================ PYAMENT POP UP FUNCTIONS START ========================= //
  function togglePopupCredit() {
    const popupContainer = document.getElementById("popCredit");
    if (popupContainer.style.display === "block") {
      popupContainer.style.display = "none";
    } else {
      popupContainer.style.display = "block";
    }
  }

  function logoChange() {
    var cardNum = document.getElementById("cc-1").value;
    if (cardNum[0] === "5") {
      document.getElementById("visaLogo").style.visibility = "hidden";
      document.getElementById("visaLogo").style.position = "absolute";
    } else if (cardNum[0] === "4") {
      document.getElementById("masterLogo").style.visibility = "hidden";
      document.getElementById("masterLogo").style.position = "absolute";
    } else {
      document.getElementById("masterLogo").style.visibility = "visible";
      document.getElementById("masterLogo").style.position = "relative";
      document.getElementById("visaLogo").style.visibility = "visible";
      document.getElementById("visaLogo").style.position = "relative";
    }
  }

  function toggleOffCredit() {
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      Authorization: userDetails,
    };

    const popupContainer = document.getElementById("popCredit");
    popupContainer.style.display = "none";
    axios.delete("http://localhost:8080/api/booking/"+pendingId,
    {
      headers: headers,
    }).then((res)=>{
      console.log(res);
    }).catch((e)=>{
      console.log(e);
    })
  }

  // ================ PYAMENT POP UP FUNCTIONS END ========================= //

  // ================ PYAMENT MODULE FUNCTIONS START ========================= //

  function showCardButton() {
    document.getElementById("btn-card").style.visibility = "visible";
    document.getElementById("btn-card").style.position = "relative";

    document.getElementById("btn-cash").style.visibility = "hidden";
    document.getElementById("btn-cash").style.position = "absolute";
  }

  function bookingPossibility(){

    setButtonLoader("Validating...");
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      Authorization: userDetails,
    };

    var pickDate = document.getElementById("pickDate").value;
    var pickTime = document.getElementById("pickTime").value;
    var dropDate = document.getElementById("dropDate").value;
    var dropTime = document.getElementById("dropTime").value;

    var pickupDate = pickDate + "T" + pickTime + "Z";
    var dropOffDate = dropDate + "T" + dropTime + "Z";
    console.log(pickupDate);
    console.log(dropOffDate);
    var paymentMethod = "Stripe";

    var car = location.state.id;

    axios
      .post(
        "http://localhost:8080/api/booking/cardBooking",
        {
          car,
          pickupDate,
          dropOffDate,
          paymentMethod,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        setButtonLoader("Proceed To Payment");
        setPendingId(res.data.bookingId);
        setPayButton(`Pay ${res.data.amount} PKR`);
        togglePopupCredit();
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.msg !== undefined) {
          document.getElementById("errorMessage").innerText = e.response.data.msg;
          document.getElementById("pickDate").style.border = "none";
          document.getElementById("dropDate").style.border = "none";
          document.getElementById("pickTime").style.border = "none";
          document.getElementById("dropTime").style.border = "none";
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("errorApi").style.position = "relative";
        } else if (e.response.data.error.pickupDate !== undefined) {
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("pickDate").style.border = "2px solid crimson";
          document.getElementById("pickTime").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.pickupDate;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        } else if (e.response.data.error.dropOffDate !== undefined) {
          document.getElementById("errorApi").style.backgroundColor = "crimson";
          document.getElementById("pickDate").style.border = "none";
          document.getElementById("pickTime").style.border = "none";
          document.getElementById("dropDate").style.border = "2px solid crimson";
          document.getElementById("dropTime").style.border = "2px solid crimson";
          document.getElementById("errorMessage").innerText = e.response.data.error.dropOffDate;
          document.getElementById("errorApi").style.visibility = "visible";
          document.getElementById("errorApi").style.position = "relative";
          document.getElementById("errorApi").style.width = "100%";
        }
        setButtonLoader("Proceed To Payment");
      });
  }

  function showCashButton() {
    document.getElementById("btn-cash").style.visibility = "visible";
    document.getElementById("btn-cash").style.position = "relative";

    document.getElementById("btn-card").style.visibility = "hidden";
    document.getElementById("btn-card").style.position = "absolute";
  }

  function triggerStripe(){
    setPaymentStatus(true);
    setAttempt(attemptCount++);
    document.getElementById("cancel-credit").style.visibility = "hidden";
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const headers = {
      Authorization: userDetails,
    };
    var cardNum = document.getElementById("cc-1").value;
    var expireMonthArr = document.getElementById("expiration-month");
    var expireYearArr = document.getElementById("expiration-year");
    var exp_month = expireMonthArr[expireMonthArr.selectedIndex].value;
    var exp_year = expireYearArr[expireYearArr.selectedIndex].value;
    var cvc = document.getElementById("cvc").value;
    var cardNumber = "";
    for(var i = 0; i < cardNum.length; i++){
      if(cardNum[i] !== " "){
        cardNumber += cardNum[i];
      }
    }

    axios.put("http://localhost:8080/api/booking/stripePayment", {
      cardNumber,
      exp_month: parseInt(exp_month),
      exp_year: parseInt(exp_year),
      cvc,
      attempt: attemptCount,
      bookingId:pendingId
    },
    {
      headers: headers,
    }).then((res)=>{
      setPaymentStatus(false);
      console.log(res)
      document.getElementById("errorMessage-credit").innerText = res.data.msg;
      document.getElementById("attempts").style.position = "absolute";
      document.getElementById("attempts").style.visibility = "hidden";
      document.getElementById("errorApi-credit").style.visibility = "visible";
      document.getElementById("errorApi-credit").style.position = "relative";
      document.getElementById("errorApi-credit").style.width = "100%";
      document.getElementById("errorApi-credit").style.backgroundColor = "green";
      document.getElementById("btn-credit").style.visibility = "hidden";
      setTimeout(goToMyBooking, 3000);
    }).catch((e)=>{
      setPaymentStatus(false);
      console.log(e);
      document.getElementById("errorMessage-credit").innerText = e.response.data.msg;
      document.getElementById("attempts").innerText = e.response.data.attempt <= 3?" Attempts Remaining: ("+e.response.data.attempt+" / 3)": "";
      document.getElementById("errorApi-credit").style.visibility = "visible";
      document.getElementById("errorApi-credit").style.position = "relative";
      document.getElementById("errorApi-credit").style.width = "100%";
      document.getElementById("errorApi-credit").style.backgroundColor = "crimson";
      document.getElementById("cancel-credit").style.visibility = "visible";
      setAttempt(e.response.data.attempt);
      if(e.response.data.attempt > 3){
        document.getElementById("attempts").style.position = "absolute";
        document.getElementById("btn-credit").style.visibility = "hidden";
        document.getElementById("cancel-credit").style.visibility = "hidden";
        setTimeout(()=>{
          window.location.reload()
        }, 2000);
      }
    })

  }

  function goToMyBooking(){
    document.getElementById("errorMessage-credit").innerText = "Redirecting To Booking Page...";
    setTimeout(()=>{
      navigator("/myBookings")
    }, 1500);
  }

  // ================ PYAMENT MODULE FUNCTIONS END ========================= //

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase mb-5">
            {name.company} {name.carName}
          </h1>
          <div className="row align-items-center pb-2">
            {img.length < 3 && img.length > 1 ? (
              <>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[0]} alt="" />
                  <img className="img-fluid" src={img[1]} alt="" />
                </div>
              </>
            ) : img.length < 4 && img.length > 1 ? (
              <>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[0]} alt="" />
                  <img className="img-fluid" src={img[1]} alt="" />
                </div>
                <div className="col-lg-6 mb-4">
                  <img className="img-fluid" src={img[2]} alt="" />
                </div>{" "}
              </>
            ) : img.length < 5 && img.length > 1 ? (
              <>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[0]} alt="" />
                  <img className="img-fluid" src={img[1]} alt="" />
                </div>
                <div className="col-lg-4 mb-4">
                  <img className="img-fluid" src={img[2]} alt="" />
                  <img className="img-fluid" src={img[3]} alt="" />
                </div>{" "}
              </>
            ) : (
              <div className="col-lg-6 mb-4">
                <img className="img-fluid" src={img[0]} alt="" />
              </div>
            )}

            <div className="col-lg-6 mb-4">
              <h4 className="mb-2">PKR{name.rentPerDay}/Day</h4>
              <div className="d-flex mb-3">
                <h6 className="mr-2">Rating:</h6>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star-half-alt text-primary mr-1"></small>
                  <small>(250)</small>
                </div>
              </div>
              <p>
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum
                et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing
                labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur
                invidunt
              </p>
              <div className="d-flex pt-1">
                <h6>Share on:</h6>
                <div className="d-inline-flex">
                  <a className="px-2" href="/">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="px-2" href="/">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="px-2" href="/">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-n3 mt-lg-0 pb-4">
            <div className="col-md-3 col-6 mb-2">
              <i className="fa fa-car text-primary mr-2"></i>
              <span>Model: {name.model}</span>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <i className="fa fa-cogs text-primary mr-2"></i>
              <span>{name.transmission}</span>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <i className="fa fa-road text-primary mr-2"></i>
              <span>20km/liter</span>
            </div>
            <div className="col-md-3 col-6 mb-2">
              <i className="fa fa-eye text-primary mr-2"></i>
              <span>GPS Navigation</span>
            </div>
          </div>
        </div>
      </div>
      {name.status === true ? (
        <>
          <div className="container-fluid pb-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <h2 className="mb-4">Booking Details</h2>
                  <label htmlFor id="errorApi">
                    {" "}
                    <span id="errorMessage"></span>
                  </label>
                  <div className="mb-5">
                    <div className="row">
                      <div className="col-6 form-group">
                        <label for="">Pickup Date: </label>
                        <div className="date" id="date2" data-target-input="nearest">
                          <input
                            type="date"
                            id="pickDate"
                            className="form-control p-4 datetimepicker-input"
                            placeholder="Pickup Date"
                            data-target="#date2"
                          />
                        </div>
                      </div>
                      <div className="col-6 form-group">
                        <label for="">Pickup Time: </label>
                        <div className="date" id="date2" data-target-input="nearest">
                          <input
                            type="time"
                            id="pickTime"
                            className="form-control p-4 datetimepicker-input"
                            placeholder="Pickup Date"
                            data-target="#date2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 form-group">
                        <label for="">Dropoff Date: </label>
                        <div className="date" id="date2" data-target-input="nearest">
                          <input
                            type="date"
                            id="dropDate"
                            className="form-control p-4 datetimepicker-input"
                            placeholder="Pickup Date"
                            data-target="#date2"
                          />
                        </div>
                      </div>
                      <div className="col-6 form-group">
                        <label for="">Dropoff Time: </label>
                        <div className="date" id="date2" data-target-input="nearest">
                          <input
                            type="time"
                            id="dropTime"
                            className="form-control p-4 datetimepicker-input"
                            placeholder="Pickup Date"
                            data-target="#date2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =============== PAYMENT POP UP CODE START ================== */}
                <div class="popup-container-credit" id="popCredit">
                  <div class="popup-credit">
                    <img
                      id="cancel-credit"
                      src={cancel}
                      style={{ width: "35px", cursor: "pointer", marginLeft: "100%" }}
                      onClick={toggleOffCredit}
                      alt="button close"
                    />
                    <label htmlFor id="errorApi-credit">
                      <span id="errorMessage-credit"></span>
                      <span id="attempts"></span>
                    </label>
                    <div className="popup-credit-flex">
                      <h1 className="card-section-heading" style={{color:"#f77d0a"}}>Enter Card Details</h1>
            
                      <form className="credit-card">
                        <div className="front">
                          <div className="card-data-row">
                            <div className="brand-name">Card Details</div>
                            <img
                              data-logo
                              src={visa}
                              id="visaLogo"
                              alt="card"
                              className="card-logo"
                            />
                            <img
                              data-logo
                              src={master}
                              id="masterLogo"
                              alt="card"
                              className="card-logo"
                            />
                          </div>
                          <fieldset className="form-group">
                            <legend>Card Number</legend>
                            <label for="cc-1">Card Number</label>
                            <div data-connected-inputs className="cc-inputs horizontal-input-stack">
                              <InputMask
                                type="tel"
                                aria-label="Credit Card First 4 Digits"
                                id="cc-1"
                                mask="9999 9999 9999 9999"
                                placeholder="1234 1234 1234 1234"
                                required
                                onChange={logoChange}
                              />
                            </div>
                          </fieldset>
                          <div className="input-row">
                            <fieldset className="form-group">
                              <legend>Expiration</legend>
                              <label for="expiration-month">Expiration</label>
                              <div className="horizontal-input-stack">
                                <select
                                  id="expiration-month"
                                  aria-label="Expiration Month"
                                  required
                                >
                                  <option value="1">01</option>
                                  <option value="2">02</option>
                                  <option value="3" selected>03</option>
                                  <option value="4">04</option>
                                  <option value="5">05</option>
                                  <option value="6">06</option>
                                  <option value="7">07</option>
                                  <option value="8">08</option>
                                  <option value="9">09</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                </select>
                                <select
                                  id="expiration-year"
                                  aria-label="Expiration Year"
                                  required
                                  data-expiration-year
                                >
                                  <option value="2023">2023</option>
                                  <option value="2024">2024</option>
                                  <option value="2025">2025</option>
                                  <option value="2026">2026</option>
                                  <option value="2027">2027</option>
                                  <option value="2028">2028</option>
                                  <option value="2029">2029</option>
                                  <option value="2030">2030</option>
                                  <option value="2031">2031</option>
                                  <option value="2032">2032</option>
                                  <option value="2033">2033</option>
                                  <option value="2034">2035</option>
                                </select>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                        <div className="back">
                          <div className="stripe"></div>
                          <div className="form-group cvc-group">
                            <label for="cvc">CVC</label>
                            <input
                              className="cvc-input"
                              type="tel"
                              maxlength="3"
                              id="cvc"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </form>
                      <button disabled={paymentStatus} className="btn" style={{ background: "#f77d0a" }} id="btn-credit" onClick={triggerStripe}>
                        {paymentButton}
                      </button>
                    </div>
                  </div>
                </div>

                {/* =============== PAYMENT POP UP CODE END ================== */}

                <div className="col-lg-4">
                  <div className="bg-secondary p-5 mb-5">
                    <h2 className="text-primary mb-4">Payment</h2>
                    <input
                      type="radio"
                      name="payment_methd"
                      value="credit"
                      className="p_meth"
                      onClick={showCardButton}
                    />{" "}
                    Credit/ Debit Card
                    <br />
                    <br />
                    <input
                      type="radio"
                      name="payment_methd"
                      value="COD"
                      id="COD"
                      className="p_meth"
                      onClick={showCashButton}
                    />{" "}
                    Cash on Delivery (COD)
                    <br />
                    <br />
                    <button
                      id="btn-cash"
                      className="btn btn-block btn-primary py-3"
                      onClick={() => bookingCar()}
                    >
                      Reserve Now
                    </button>
                    <button
                      id="btn-card"
                      className="btn btn-block btn-primary py-3"
                      onClick={bookingPossibility}
                    >
                      {buttonLoader}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewListings;
