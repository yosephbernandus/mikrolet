const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load lcoation model
const Location = require("../../models/Location");

// @route    POST api/location
// @desc     Create Latitude and Longiturde
// @access   Private
router.delete(
  "/deleteLocation",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Location.findOneAndRemove({ users: req.user.id }).then(() => {
      res.json({ success: true });
    });
  }
);

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

// @route   GET api/driver/
// @desc    Get driver from location collections
// @access  private
router.get("/driver", (req, res) => {
  // Location.findById(req.params.id)
  //   .then(driver => res.json(driver))
  //   .catch(err => res.status(404).json({ nodriver: "No Driver Found" }));
  Location.find({ users: "5d0dc69f0f50951098f2cea9" })
    .then(driver => res.json(driver))
    .catch(err => res.status(404).json({ nodriver: "No driver found" }));
  // .then(driver => res.json(driver))
  // .catch(err => res.status(404).json({ nodriver: "No Driver Found" })
});

// @route   GET api/driverLocations
// @desc    Get driverLocation
// @access  Public
router.get("/", (req, res) => {
  Location.find({ status: "driver" })
    .then(driverLocation => res.json(driverLocation))
    .catch(err => res.status(404).json({ nodriverfound: "No Driver Found" }));
});

router.get("/users", (req, res) => {
  Location.find({ status: "user" })
    .then(userLocation => res.json(userLocation))
    .catch(err => res.status(404).json({ nouserfound: "No User Found" }));
});

// @route    GET api/posts/test
// @desc     Tests post route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
