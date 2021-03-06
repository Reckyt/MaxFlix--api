const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * from wished_movie", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving item in wishlist");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT * from wished_movie AS wm INNER JOIN movie AS m ON m.id_movie = wm.movie_id_movie WHERE wm.user_id = ? ",
    idUrl,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving item in wishlist");
      } else {
        res.json(results);
      }
    }
  );
});

router.put("/", (req, res) => {
  const formData = req.body;
  connection.query(
    "INSERT INTO wished_movie SET ?",
    formData,
    (err, results) => {
      if (err) {
        res.status(500).send("Error saving item in wishlist");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.post("/:id", (req, res) => {
  const formData = req.body.data.wishListBody;
  connection.query(
    "DELETE FROM wished_movie WHERE movie_id_movie = " +
      formData.movie_id_movie +
      " AND user_id = " +
      formData.user_id,
    (err) => {
      if (err) {
        res.status(500).send("Error deleting");
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
