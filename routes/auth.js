const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../keys");
const userLogin = require("../middlewares/userLogin");

routes.get("/protected", userLogin, (req, res) => {
  res.send("Protected Information");
});

routes.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "Invalid Username or Password" });
  }
  User.findOne({ email: email }).then((userFound) => {
    if (!userFound) {
      return res.status(422).json({ err: "Invalid Username or Password" });
    } else {
      console.log(password);
      console.log(userFound);
      bcrypt
        .compare(password, userFound.password)
        .then((match) => {
          if (match) {
            //res.json({ message: "Successful Login" });
            const token = jwt.sign({ _id: match._id }, JWT_TOKEN);
            res.json({ token });
          } else {
            return res
              .status(422)
              .json({ err: "Invalid Username or Password" });
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

routes.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Enter All Fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        console.log(savedUser);
        return res.status(422).json({ err: "User Already Exists" });
      } else {
        console.log(savedUser);

        bcrypt.hash(password, 15).then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            name,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "User Saved Successfully" });
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

module.exports = routes;
