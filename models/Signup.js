const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  userName: String,
  password: String,
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

const Signup = mongoose.model("user_table", signupSchema);

module.exports = Signup;
