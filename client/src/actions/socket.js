import io from "socket.io-client";

const socket = io("http://localhost:5000");
// const socket = io("http://192.168.43.179:5000");

const configureSocket = dispatch => {
  // make sure our socket is connected to the port
  socket.on("connection", () => {
    console.log("connected");
  });
};

// Send location to server
export const sendLocationToServer = location =>
  socket.emit("SEND_LOCATION_TO_SERVER", location);

// Delete Location
export const deleteLocation = deleteUser =>
  socket.emit("DELETE_LOCATION", deleteUser);

// Send driver location to server

export const sendDriverLocationToServer = driverLocation =>
  socket.emit("SEND_DRIVER_LOCATION_TO_SERVER", driverLocation);

// Send user location to server
export const sendUserLocationToServer = userLocation =>
  socket.emit("SEND_USER_LOCATION_TO_SERVER", userLocation);

export const changeSeat = seat => {
  socket.emit("CHANGE_SEAT", seat);
};

export const driverSendMessage = message => {
  socket.emit("DRIVER_MESSAGE", message);
};

export const userSendMessage = message => {
  socket.emit("USER_MESSAGE", message);
};

export const changeCountPassengers = seat => {
  socket.emit("CHANGE_COUNT_PASSENGERS", seat);
};

export const subscribeToDriverRoute = route => {
  socket.emit("ROUTE", route);
};

export const subscribeToDriver = cb => {
  socket.on("driver", driver => cb(null, driver));
  socket.emit("subscribeToDriver", 1000);
};

export const subscribeToUser = cb => {
  socket.on("user", timestamp => cb(null, timestamp));
  socket.emit("subscribeToUser", 1000);
};

// export const sendDriverLocationToServer = driverLocation =>
//   setInterval(function() {
//     socket.emit("SEND_DRIVER_LOCATION_TO_SERVER", driverLocation);
//   }, 7000);

// export const sendLocationToServer = location =>
//   setInterval(function() {
//     socket.emit("SEND_LOCATION_TO_SERVER", location);
//   }, 5000);

export default configureSocket;
