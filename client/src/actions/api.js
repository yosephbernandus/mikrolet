import io from "socket.io-client";

const socket = io("http://localhost:5000");

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}

export { subscribeToTimer };
