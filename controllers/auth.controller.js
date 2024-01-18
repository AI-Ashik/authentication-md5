const md5 = require("md5");
const Auth = require("../models/auth.model");

// console.log(md5("message"));

exports.authHome = (req, res) => {
  res.status(200).send("welcome to auth page");
};

exports.authRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new Auth({
      name,
      email,
      password: md5(password),
    });
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
    const hashedPassword = md5(password);
    const user = await Auth.findOne({ email });
    if (user && user.password === hashedPassword) {
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
