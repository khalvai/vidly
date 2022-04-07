const mongoose = require("mongoose");
const { rentalSchem, Rental, validate } = require("../models/rental");
const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const Fawn = require("fawn");
const auth=require("../middleware/auth")
const { response } = require("express");

router.get("/", async (req, res) => {
  const rentlas = await Rental.find();
  if (!rentlas) return res.status(404).send("NO rentals found...");
  res.send(rentlas);
});

Fawn.init(mongoose)

router.post("/", auth,async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);

  if (!customer) return res.status(404).send("Invalid customer Id");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Invalid movi  Id");

  if (movie.numberInStock === 0)
    return res.send("this movie doesn't exists in stock");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      phone: customer.phone,
      name: customer.name,
    },

    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

 try {new Fawn.Task()
  .save("rentals",rental)
  .update("movies",{_id:movie._id},{
      $inc:{
          numberInStock:-1
      }
  }).run();
    res.send(rental)
}catch(err){
    res.status(500).send("some thing faild..")
}



});

module.exports = router;
