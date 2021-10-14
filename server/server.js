const express = require("express");
const cors = require("cors");
const app = express();
const socketio = require("socket.io");

require("./config/mongoose.config");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PetsRoutes = require("./routes/pets.routes");

PetsRoutes(app);

const port = 8000;
const server = app.listen(port, () => console.log("In the port", port));
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("socket id for handshake: ", socket.id);
  socket.on("added_pet", (data) => {
    console.log(data);
    console.log("socket id for added pet broadcast creation: ", socket.id);
    socket.broadcast.emit("pet_added", data);
  });
  socket.on("deleted_pet", (data) => {
    console.log("Pet deleted-pet Id ", data);
    socket.broadcast.emit("pet_deleted", data);
  });
});
