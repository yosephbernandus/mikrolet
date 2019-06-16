const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const drivers = require("./routes/api/drivers");
// const profile = require("./routes/api/profile");
// const posts = require("./routes/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Connect Success"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/drivers", drivers);
// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
