const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const api = require("./src/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("There is an error");
  }
  console.log("There is an port, bitches");
});
//
