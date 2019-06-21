const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const Driver = require("../../models/Driver");

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Drivers Works" }));

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Driver.findOne({ email: req.body.email }).then(driver => {
    if (driver) {
      errors.email = "Email has already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });

      const newDriver = new Driver({
        name: req.body.name,
        email: req.body.email,
        kode_plat_nomor: req.body.kode_plat_nomor,
        kode: req.body.kode,
        trayek: req.body.trayek,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDriver.password, salt, (err, hash) => {
          if (err) throw err;
          newDriver.password = hash;
          newDriver
            .save()
            .then(driver => res.json(driver))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route    GET api/users/login
// @desc     Login User / Returning JWT Token
// @access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  Driver.findOne({ email }).then(driver => {
    //check for user
    if (!driver) {
      errors.email = "Driver not found";
      return res.status(404).json(errors);
    }

    // check password
    bcrypt.compare(password, driver.password).then(isMatch => {
      if (isMatch) {
        // user matched

        const payload = { id: driver.id, name: driver.name, avatar: driver.avatar }; //create jwt payload

        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.driver.id,
      name: req.driver.name,
      email: req.driver.email
    });
  }
);

module.exports = router;
