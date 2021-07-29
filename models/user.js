const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  mobile: {
    type: Number
  },
  password: {
    type: String
  },
  status: {
    type: Number, // 0 means active and 1 means inactive
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);