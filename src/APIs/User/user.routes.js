const express = require("express");
const { register, login, getUser } = require("./user.controller");
const passport = require("passport");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
userRouter.post("/search", getUser);

module.exports = userRouter;
