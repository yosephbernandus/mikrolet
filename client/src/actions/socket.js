import io from "socket.io-client";

const socket = io("http://localhost:5000");

const configureSocket = dispatch => {
  // make sure our socket is connected to the port
  socket.on("connection", () => {
    console.log("connected");
  });
};

// Send location to server
export const sendLocationToServer = location =>
  socket.emit("SEND_LOCATION_TO_SERVER", location);

export default configureSocket;
