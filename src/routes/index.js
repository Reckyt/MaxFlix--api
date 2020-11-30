const express = require("express");

const movies = require("./movies");
const directors = require("./directors");
const users = require("./users");
const wishList = require("./wishList");
const seenList = require("./seenList");
const kinds = require("./kinds");
const video = require("./video");

const router = express.Router();

router.use("/movies", movies);
router.use("/directors", directors);
router.use("/users", users);
router.use("/wishList", wishList);
router.use("/seenList", seenList);
router.use("/kinds", kinds);
router.use("/video", video);

module.exports = router;
