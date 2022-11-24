require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connected) {
      console.log("Connected to the mongoDB");
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = dbConnection;
