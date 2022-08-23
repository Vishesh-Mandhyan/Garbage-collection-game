const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
require("dotenv").config();

//middlewares

app.use(cors());
app.use(express.json());

//api Routes

app.use("/api/auth", userRoute);

const server = http.createServer(app);

// connecting to database

mongoose
  .connect("mongodb://localhost:27017/garbage_Collection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello world");
});

//Listening at port 5000

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});