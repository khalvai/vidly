const express = require("express");
const Joi = require("joi");

const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(`err : ${error}`);

  const user = await User.findOne({ email: req.body.email });

  if (!user) res.send("Invalid email or password").status(400);

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) res.status(400).send("Invalid email or password !!!");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(15).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
