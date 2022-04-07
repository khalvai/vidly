const winston=require("winston");
module.exports = function (error, req, res, next) {
  winston.error(error.message,error);
  //error
  //warn
  //info
  //verbos
  //debug
  //silly
  
  res.status(500).send("some thing failed.");
};
