const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema =new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    isAdmin:{type: Boolean
    }
  });
         
  

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, isAdmin:this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User",userSchema);

const validate = function (user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(15).required(),
  
  };

  return Joi.validate(user, schema);
};

module.exports.validate = validate;
module.exports.User = User;
