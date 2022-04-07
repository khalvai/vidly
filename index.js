//@ts-check
const mongoose=require("mongoose");
const winston=require("winston");
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/mongodb")(mongoose)
require("./startup/loging")()
require("./startup/config")();
require("./startup/validation")();


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
