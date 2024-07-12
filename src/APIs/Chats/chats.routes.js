const express = require("express");
const {
  getAllChatRooms,
  getChatRoom,
  createChatRoom,
  getChatRoomByID,
} = require("./chats.controller");

const chatRouter = express.Router();
const passport = require("passport");

chatRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllChatRooms
);

chatRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getChatRoomByID
);

chatRouter.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  createChatRoom
);

module.exports = chatRouter;
