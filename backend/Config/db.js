const mongoose = require("mongoose");

let connectDB = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Error Connecting to DB");
    console.error(error);
  });

module.exports = connectDB;
