const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const api = require("./src/routes");

const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", api);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header, Accept"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

app.listen(PORT, (err) => {
  if (err) {
    throw new Error("There is an error");
  }
  console.log(`Server is running on port ${PORT}. Bitches`);
});
