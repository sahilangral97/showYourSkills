const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { String } = mongoose.Schema.Types;
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    default: "Not Specified",
  },
  website: {
    type: String,
    default: "Not Specified",
  },
  date: {
    type: Date,
    default: new Date(),
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    ref: "User",
  },
});

mongoose.model("Project", projectSchema);
