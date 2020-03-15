const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const PayHistory = require("../../model/PayHistory");
var mongoose = require("mongoose");

exports.generateJwtToken = async (req, res) => {
  const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    //secure: true, // to force https (if you use it)
    maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
    signed: true // if you use the secret with cookieParser
  };

  const uname = req.query.username;
  const password = req.query.password;

  const user = await User.findOne({ username: uname });

  if (!user)
    return res.status(400).send({
      result: "redirect",
      url: "/login",
      style: "login.css",
      loginError: "login error !!!!!"
    });

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass)
    return res.status(400).send({
      result: "redirect",
      url: "/login",
      style: "login.css",
      loginError: "login error !!!!!"
    });

  //generating jwt token
  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: uname
    },
    "secret"
  );

  res.cookie('token', token, cookieConfig);
  res.cookie('uid', user.id, cookieConfig);

  return res.status(200).send({
    result: "redirect",
    token: token,
    url: "/homePage"
  });
};