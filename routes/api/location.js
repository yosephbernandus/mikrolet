const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load lcoation model
const Location = require("../../models/Location");

// @route    POST api/location
// @desc     Create Latitude and Longiturde
// @access   Private

router.post(
  "/sendLocation",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    req.io.sockets.on("connection", socket => {
      console.log("connected");

      socket.on("SEND_LOCATION_TO_SERVER", location => {
        console.log(location);
      });
    });

    // const newLocation = new Post({
    //   longitude: req.body.longitude,
    //   latitude: req.body.latitude
    // });

    // newLocation.save().then(post => res.json(post));
  }
);

// @route   GET api/driverLocations
// @desc    Get driverLocation
// @access  Public
router.get("/", (req, res) => {
  Location.find()
    .then(driverLocation => res.json(driverLocation))
    .catch(err => res.status(404).json({ nodriverfound: "No Driver Found" }));
});

// @route    GET api/posts/test
// @desc     Tests post route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
