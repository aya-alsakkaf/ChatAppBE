const express = require("express");
const passport = require("passport");
const messageRouter = express.Router();

const { addMessage } = require("./message.controller");

messageRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addMessage
);

module.exports = messageRouter;
