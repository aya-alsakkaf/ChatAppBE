const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./database");
const errorHandler = require("./src/Middlewares/ErrorHandler");
const notFoundHandler = require("./src/Middlewares/NotFoundHandler");
const { localStrategy, jwtStratgey } = require("./src/Middlewares/Passport");
const userRouter = require("./src/APIs/User/user.routes");
const chatRouter = require("./src/APIs/Chats/chats.routes");
const messageRouter = require("./src/APIs/Messages/message.routes");
const { createServer } = require("http");
const { Server } = require("socket.io");
//init
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT;
connectDB();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStratgey);

//routes
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

//error handlers
app.use(errorHandler);
app.use(notFoundHandler);

//socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (message) => {
    console.log("socket message", message);
    io.emit("message", message);
  });
  // socket.on("disconnect", () => {
  //   console.log("A user disconnected");
  // });
});

httpServer.listen(3000);

//listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
