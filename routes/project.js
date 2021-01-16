const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const Project = mongoose.model("Project");
const userLogin = require("../middlewares/userLogin");

routes.post("/createProject", userLogin, (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(422).json({ error: "Please add Title or Description" });
  }
  const project = new Project({
    title,
    description,
    postedBy: req.user,
  });
  project
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.get("/myProjects", userLogin, (req, res) => {
  Project.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((project) => {
      res.json({ project });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = routes;
