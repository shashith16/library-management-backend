const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  userName: String,
  password: String,
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
