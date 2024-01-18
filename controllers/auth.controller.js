const Auth = require("../models/auth.model");

exports.authHome = (req, res) => {
  res.status(200).send("welcome to auth page");
};

exports.authRegister = async (req, res) => {
  try {
    const newUser = new Auth(req.body);
    await newUser.save();
    res.status(201).json({
      message: "user is created",
    });
  } catch (error) {
    res.status(500).json({
      message: "something was broke",
    });
  }
};

exports.authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user && user.password === password) {
      res.status(200).json({
        message: "user is valid",
      });
    } else {
      res.status(500).json({
        message: "user is not valid",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something was broke",
    });
  }
};
