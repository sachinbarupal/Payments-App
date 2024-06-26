const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successfull !!"))
    .catch(() => console.log("Error in DB Connection"));
};
module.exports = { connectDB };
