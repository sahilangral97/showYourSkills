const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "Not Specified",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Project", projectSchema);
