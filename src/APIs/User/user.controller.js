const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = async (user) => {
  const payLoad = {
    id: user._id,
  };

  const token = await jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
};

const register = async (req, res, next) => {
  try {
    let { phoneNumber, fullName, password } = req.body;
    password = await hashPassword(password);
    const newUser = await User.create({ phoneNumber, fullName, password });
    const token = await generateToken(newUser);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    console.log(req.body.phoneNumber);
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    console.log("user", user);
    if (!user) return res.status(404).json({ message: "User is Not Found" });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUser,
};
