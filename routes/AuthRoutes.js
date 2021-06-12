const express = require("express");
const mongoose = require("mongoose");
const Signup = require("../models/Signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const tokenSecret = "verySecretValue";
router.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, userName, password, createdDate } =
    req.body;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("emailId", emailId);
  console.log("userName", userName);
  console.log("password", password);

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const newSignUp = new Signup({
    firstName,
    lastName,
    emailId,
    userName,
    password: hashedPassword,
    createdDate,
  });
  try {
    await newSignUp.save();
    res
      .status(201)
      .json({ success: true, data: newSignUp, message: "Signup success" });
  } catch (error) {
    res
      .status(409)
      .json({ success: false, data: error, message: "Signup error" });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userData = await Signup.findOne({ userName: userName });
    console.log("userData", userData);
    if (userData) {
      //console.log(userData);
      bcrypt.compare(password, userData.password, function (err, result) {
        if (err) {
          return res.status(400).json({
            success: false,
            data: err,
            message: "Passwords doesnot match",
          });
        }
        console.log("resukt", result);
        try {
          let token = jwt.sign({ userName: userData.userName }, tokenSecret, {
            expiresIn: "1h",
          });
          res.status(201).json({
            success: true,
            data: { token },
            message: "Login Successful",
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            data: error,
            message: "Login Failed",
          });
        }
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      data: error,
      message: "Unknown error",
    });
  }
});

module.exports = router;
