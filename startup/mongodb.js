
const winston=require("winston");

module.exports = function (mongoose) {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => {
      winston.info("connected to MongoDB...");
    })
};
