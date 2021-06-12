const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const { v4: uuidV4 } = require("uuid");
const usersData = require("../data/Users");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    userId,
    userName,
    firstName,
    lastName,
    emailId,
    contactNumber,
    location,
  } = req.body;
  const Users = new UserModel({
    userId: uuidV4(),
    userName,
    firstName,
    lastName,
    emailId,
    contactNumber,
    location,
  });
  try {
    const newUser = await Users.save();
    res.status(201).json({
      success: true,
      data: newUser,
      message: "Added new user",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      data: error,
      message: "add user error",
    });
  }
});

router.post("/addUsers", async (req, res) => {
  const {
    userId,
    userName,
    firstName,
    lastName,
    emailId,
    contactNumber,
    location,
  } = req.body;
  const Users = new UserModel({
    userId: uuidV4(),
    userName,
    firstName,
    lastName,
    emailId,
    contactNumber,
    location,
  });
  let bulk = Users.collection.initializeUnorderedBulkOp();
  const usersDataNew = usersData();
  console.log("usersDataNew.....", usersDataNew);

  // const userObjData = usersDataNew.map((userObj) => {
  //   console.log("userObj...", userObj);
  //   return userObj;
  // });
  // console.log("userObjData....", userObjData);

  bulk.insert(usersDataNew);

  const newAddUsers = await bulk.execute();
  console.log("newAddUsers.......", newAddUsers);
  try {
    //const newUsers = await Users.save();
    res.status(201).json({
      success: true,
      data: newAddUsers,
      message: "Added new users",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      data: error,
      message: "add users error",
    });
  }
});

router.get("/getAllUsers", async (req, res) => {
  const getAllUsers = await UserModel.find({});
  try {
    res.status(201).json({
      success: true,
      data: getAllUsers,
      message: "Get all users",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      data: error,
      message: "get all users error",
    });
  }
});

router.get("/getUser/:userId", async (req, res) => {
  const { userId } = req.params;
  const getUser = await UserModel.findOne({ userId });
  try {
    res.status(201).json({
      success: true,
      data: getUser,
      message: "Get user success",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      data: error,
      message: "get user error",
    });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const { userId } = req.params;
  const deleteUser = await UserModel.findOneAndRemove({ userId });
  try {
    res.status(201).json({
      success: true,
      data: deleteUser,
      message: "Delete user success",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      data: error,
      message: "Delete user error",
    });
  }
});

module.exports = router;
