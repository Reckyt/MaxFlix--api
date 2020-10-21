const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * from seen_movie", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving item in seenList");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT * from seen_movie AS sm INNER JOIN movie AS m ON m.id_movie = wm.movie_id_movie WHERE sm.user_id = ? ",
    idUrl,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving item in seenList");
      } else {
        res.json(results);
      }
    }
  );
});

router.put("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO seen_movie SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Error saving item in seenList");
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/:id", (req, res) => {
  const formData = req.body.data.seenListBody;
  connection.query(
    "DELETE FROM seen_movie WHERE movie_id_movie = " +
      formData.movie_id_movie +
      " AND user_id = " +
      formData.user_id,
    (err) => {
      if (err) {
        res.status(500).send("Error deleting");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
