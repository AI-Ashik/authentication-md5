require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
  next();
});

app.get((error, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
