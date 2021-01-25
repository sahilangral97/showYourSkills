const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    default: "Not Specified",
  },
  skills: {
    type: Array,
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.model("User", userSchema);
