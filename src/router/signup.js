"use strict";
const express = require("express");

const { users } = require("../models/index");

const bcrypt = require("bcrypt");
const signUpRouter = express.Router();

signUpRouter.post("/signup", async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    const record = await users.create({
      username: username,
      password: password,
      email: email,
    });
    res.status(201).json(record);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = signUpRouter;
