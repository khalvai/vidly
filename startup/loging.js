const winston = require("winston");
require("express-async-errors");

module.exports=function(){

winston.exceptions.handle(
    new winston.transports.Console({colorize:true,pretyPrint:true}),
    
    new winston.transports.File({filename:"uncaughtException.log"}))

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
}