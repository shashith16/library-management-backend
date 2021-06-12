const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  userId: String,
  userName: String,
  firstName: String,
  lastName: String,
  emailId: String,
  gender: String,
  contactNumber: Number,
  location: String,
});

const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel;
