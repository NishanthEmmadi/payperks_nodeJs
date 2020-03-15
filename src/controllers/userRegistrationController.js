const User = require("../../model/User");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  let isEmailExist = await User.findOne({ username: req.body.username });

  if (isEmailExist)
    return res.status(200).render("registration", {
      style: "registration.css",
      registrationError: "User already exists! Please try again"
    });

  const UserProvidedpassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(UserProvidedpassword, salt);

  //console.log('Generated Hash'+ hashPassword)

  const user = new User({
    username: req.body.username,
    password: hashPassword
  });

  try {
    await user.save();

    return res.status(200).render("login", {
      style: "login.css",
      loginError: "Registration Successful !!"
    });
  } catch (err) {
    console.log("error while saving:" + err);

    return res.status(200).render("registration", {
      style: "registration.css",
      registrationError: "Error!! please try again"
    });
  }
};