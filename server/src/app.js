const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./controller/user.controller");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use((err, req, res, next) => res.send(err.message));

app.use("/user", userRouter);

module.exports = app;
