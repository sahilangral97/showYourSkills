const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const Project = mongoose.model("Project");
const User = mongoose.model("User");
const userLogin = require("../middlewares/userLogin");

routes.post("/createProject", userLogin, (req, res) => {
  const { title, description, github, website } = req.body;
  if (!title || !description) {
    return res.status(422).send({ message: "Please add Title or Description" });
  }
  const project = new Project({
    title,
    description,
    github,
    website,
    date: new Date(),
    postedBy: req.user,
    userName: req.user.name,
  });
  project
    .save()
    .then((result) => {
      res.send({ message: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).send({ result: result });
    })
    .catch((error) => console.log(error));
});

routes.get("/allprojects", (req, res) => {
  Project.find({})
    .sort({ date: -1 })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.get("/api/project/:id", (req, res) => {
  Project.find({ postedBy: req.params.id })
    .sort({ date: -1 })
    .then((result) => {
      console.log(result);
      res.status(200).send({ result: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.get("/myProjects", userLogin, (req, res) => {
  console.log(req.user);
  Project.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .sort({ date: -1 })
    .then((project) => {
      //console.log(project);
      res.send({ project });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.get("/:id", (req, res) => {
  console.log(req.params);
  User.find({ _id: req.params.id })
    .then((result) => {
      return res.status(200).send({ user: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

routes.delete("/deleteProject", (req, res) => {
  console.log(req.body);
  Project.deleteOne({ _id: req.body.a._id })
    .then((result) => {
      res.status(200).send({ message: "success" });
    })
    .catch((error) => {
      console.log(error);
    });
});

routes.get("/search/:searchWord", (req, res) => {
  const search = req.params.searchWord;
  console.log(req.params);
  Project.find({ title: { $regex: `^${search}` } })
    .then((result) => {
      res.status(200).send({ result: result });
      console.log(result);
    })
    .catch((error) => console.log(error));
});
module.exports = routes;
