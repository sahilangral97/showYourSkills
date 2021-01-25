const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config/keys");
const userLogin = require("../middlewares/userLogin");
const projectRoute = require("./project");
const { route } = require("./project");
routes.get("/protected", userLogin, (req, res) => {
  res.send("Protected Information");
});

routes.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ message: "Invalid Username or Password" });
  }
  User.findOne({ email: email }).then((userFound) => {
    if (!userFound) {
      return res.status(422).send({ message: "Invalid Username or Password" });
    } else {
      console.log(password);
      console.log(userFound);
      bcrypt
        .compare(password, userFound.password)
        .then((match) => {
          if (match) {
            //res.json({ message: "Successful Login" });
            const { _id, name, email, profession, skills } = userFound;
            console.log(_id + " " + name);
            const token = jwt.sign({ _id: userFound._id }, JWT_TOKEN);
            res.send({ token, user: { _id, name, email, profession, skills } });
          } else {
            return res
              .status(422)
              .send({ message: "Invalid Username or Password" });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

routes.put("/addskill", userLogin, (req, res) => {
  const skillData = req.body;
  User.updateOne({ _id: req.user._id }, { $set: { skills: skillData } })
    .then((result) => {
      res.status(200).send({ message: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.get("/myskills", userLogin, (req, res) => {
  User.findById({ _id: req.user._id })
    .then((resp) => {
      res.status(200).send({ skill: resp.skills });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.post("/signup", (req, res) => {
  const { name, email, password, profession } = req.body;
  if (!name || !email || !password || !profession) {
    return res.status(422).send({ message: "Enter All Fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        console.log(savedUser);
        return res.status(422).send({ message: "User Already Exists" });
      } else {
        console.log(savedUser);

        bcrypt.hash(password, 15).then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            name,
            profession,
          });
          user
            .save()
            .then((user) => {
              res.send({ message: "User Saved Successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.delete("/deleteskill/:name", (req, res) => {
  console.log(req.body);
  User.updateOne(
    { _id: req.body.userData._id },
    { $pull: { skills: req.params.name } }
  )
    .then((result) => {
      console.log(result);
      res.status(200).send({ message: "Success" });
    })
    .catch((err) => console.log(err));
});

routes.use("/", projectRoute);

module.exports = routes;
