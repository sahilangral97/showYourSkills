const { json } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ err: "You need to login first " });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_TOKEN, (err, payload) => {
      if (err) {
        return res.status(401).json({ err: "You need to login first " });
      }
      const { _id } = payload;
      User.findById(_id).then((userData) => {
        req.user = userData;
      });
      next();
    });
  }
};
