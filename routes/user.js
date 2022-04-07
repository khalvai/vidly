const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

const isAdmin = require("../middleware/admin");
const router = express.Router();

router.get("/me", [auth,isAdmin], async (req, res) => {
  const user = await User.find().select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`err : ${error}`);

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send("user already registerd");
  }

  try {
    user = new User(_.pick(req.body, ["email", "name", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const doc = await user.save();

    const token = doc.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(doc, ["email", "name", "_id"]));
  } catch (err) {
    res.send(err);
  }
});

router.delete("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const doc=await user.remove();

  res.send(`deleted user : ${doc}`);
});

module.exports = router;
