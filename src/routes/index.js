const express = require("express");
const movies = require("./movies");
const directors = require("./directors");

const router = express.Router();

router.use("/movies", movies);
router.use("/directors", directors);

module.exports = router;
