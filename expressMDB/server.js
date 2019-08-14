/**
 * Run using node --experimental-modules server.js in node > 12
 */

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import bookRouter from "./Routes/bookRouter.js";

// data base hosted in https://mlab.com/ or well https://cloud.mongodb.com/
const db = mongoose.connect(
  "mongodb+srv://usr:1q2w3e@cluster0-xcoun.mongodb.net/api-test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const app = express();
const port = process.env.PORT || 5656;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/Books", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("====================================");
  console.log(`http://localhost:${port}`);
  console.log("====================================");
});
