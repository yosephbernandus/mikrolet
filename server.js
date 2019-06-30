const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// const cors = require("cors");
// var fs = require("fs");
const http = require("http");
// const https = require("https");
const users = require("./routes/api/users");
const drivers = require("./routes/api/drivers");
const location = require("./routes/api/location");

const io = require("socket.io");
// const profile = require("./routes/api/profile");
// const posts = require("./routes/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

// Model Location User And Driver
const Location = require("./models/Location");

//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Connect Success"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

// const server = require("http").Server(app);
// const io = require("socket.io")(server);
// const server = app.listen(8810);
// const io = require("socket.io").listen(server);

// const whitelist = [
//   "http://localhost:5000",
//   "http://localhost:3000",
//   "http://localhost:8080"
// ];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) return callback(null, true);
//     callback(new Error("Not allowed by CORS"));
//   }
// };
// app.use(cors(corsOptions));

// Create Http server

// const httpsServer = http.createServer(
//   {
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.cert"),
//     requestCert: false,
//     rejectUnauthorized: false
//   },
//   app
// );
const httpsServer = http.createServer(app);

const webSocket = io.listen(httpsServer);

if (process.env.NODE_ENV === "production") {
  webSocket.configure(function() {
    webSocket.serveClient("transports", ["xhr-polling"]);
    webSocket.serveClient("polling duration", 10);
  });
}

// app.use(function(req, res, next) {
//   req.io = webSocket;
//   next();
// });

// use routes
app.use("/api/users", users);
app.use("/api/drivers", drivers);
app.use("/api/location", location);

webSocket.sockets.on("connection", socket => {
  console.log("connected");

  socket.on("SEND_LOCATION_TO_SERVER", location => {
    console.log(location);
    // new Location({
    //   latitude: location[0],
    //   longitude: location[1]
    // }).save(function(err, location) {
    //   if (err) {
    //     return console.log("Error");
    //   }
    //   console.log(location);
    // });
  });

  socket.on("SEND_DRIVER_LOCATION_TO_SERVER", driverLocation => {
    // console.log(driverLocation);
    let locationFields = {};

    locationFields.users = driverLocation.user;
    locationFields.name = driverLocation.name;
    locationFields.kodePlatNomor = driverLocation.kodePlatNomor;
    locationFields.trayek = driverLocation.trayek;
    locationFields.status = driverLocation.status;
    locationFields.latitude = driverLocation.latitude;
    locationFields.longitude = driverLocation.longitude;

    Location.findOne({ users: driverLocation.user }).then(location => {
      if (location) {
        console.log("location fields");
        Location.findOneAndUpdate(
          { users: driverLocation.user },
          { $set: locationFields },
          { new: true }
        ).then(console.log());
      } else {
        console.log("not location fields");
        new Location(locationFields)
          .save()
          .then(location => socket.emit("get_seat", location.seat));
      }
    });

    // new Location(locationFields)
    //   .save()
    //   .then(locationFields => console.log(locationFields));

    // new Location(locationFields)
    //   .save()
    //   .then(locationFields => console.log(locationFields));

    // new Driver({
    //   latitude: driverLocation.latitude,
    //   longitude: driverLocation.longitude,
    //   name: driverLocation.name,
    //   kodePlatNomor: driverLocation.kodePlatNomor,
    //   trayek: driverLocation.trayek
    // }).save(function(err, driverLocation) {
    //   if (err) {
    //     return console.log("Error");
    //   }
    //   console.log(driverLocation);
    // });
  });

  socket.on("CHANGE_SEAT", seat => {
    let seatFields = {};

    seatFields.users = seat.user;
    seatFields.seat = seat.seat;

    Location.findOne({ users: seat.user }).then(changeSeat => {
      if (changeSeat) {
        Location.findOneAndUpdate(
          { users: seat.user },
          { $set: seatFields },
          { new: true }
        ).then(console.log());
      }
    });
  });

  socket.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval", interval);
    setInterval(() => {
      let driverLocation = {};
      // Location.find().then(driver => console.log(driver));
      // socket.emit("timer", new Date());

      Location.find({}, (err, data) => {
        if (err) throw err;
        if (data) {
          // RESEND ALL USERS
          socket.emit("timer", data);
        }
      });
    }, interval);
  });

  // socket.on("join", function(user, sendKey) {
  //   user.key = Date.now();
  //   socket.set("userkey", user.key);
  //   sendKey(user.key);
  //   connectedUsers[user.key] = user;
  //   socket.broadcast.emit("user connected", user);
  // });
  // socket.on("message", function(msg) {
  //   socket.get("userkey", function(err, key) {
  //     let user = connectedUsers[key];
  //     if (user) {
  //       let data = {
  //         key: key,
  //         sender: user.name,
  //         message: msg
  //       };
  //       socket.broadcast.emit("new chat msg", data);
  //     }
  //   });
  // });
  // socket.on("send location", function(data) {
  //   socket.get("userkey", function(err, key) {
  //     let user = connectedUsers[key];
  //     if (user) {
  //       user.lat = data.lat;
  //       user.lng = data.lng;
  //       data.name = user.name;
  //       data.key = key;
  //       socket.broadcast.emit("location update", data);
  //     }
  //   });
  // });
  // socket.on("request locations", function(sendData) {
  //   sendData(connectedUsers);
  // });
  // socket.on("disconnect", function() {
  //   socket.get("userkey", function(err, key) {
  //     let userInfo = connectedUsers[key];
  //     if (userInfo) {
  //       console.log("User", userInfo.username, "has disconnected, Key = ", key);
  //       delete connectedUsers[key];
  //       socket.broadcast.emit("user disconnected", key);
  //     }
  //   });
  // });
});

httpsServer.listen(port, () => console.log(`Server running on port ${port}`));
// Use let's encrypt
// app.use(express.static(__dirname, { dotfiles: "allow" }));

// app.listen(port, () => console.log(`Server running on port ${port}`));
