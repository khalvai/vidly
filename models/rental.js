const mongoose = require("mongoose");
const Joi = require("joi");

const express = require("express");
const { type } = require("joi/lib/types/object");
const string = require("joi/lib/types/string");
const router = express.Router();

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      phone: {
        type: String,
        min: 6,
        max: 11,
      },
      name: {
        type: String,
        required: true,
      },
    }),
  },

  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minlength: 4,
        maxlength: 14,
        trim: true,
      },

      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
  },

  dateReturend: {
    type: Date,
  },

  rentalFee: {
    type: Number,
    min: 0,
  },
});

const validate = function (rent) {
  const joiSchema = {
    movieId: Joi.objectID().required(),
    customerId: Joi.objectID().required(),
  };

  return Joi.validate(rent, joiSchema);
};

const Rental = mongoose.model("Rental", rentalSchema);

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validate = validate;
