const express = require("express");
const movies = require("./movies");
const directors = require("./directors");
const users = require("./users");

const router = express.Router();

router.use("/movies", movies);
router.use("/directors", directors);
router.use("/users", users);

module.exports = router;
