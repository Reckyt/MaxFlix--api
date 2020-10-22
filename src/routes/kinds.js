const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * from movie_kind ORDER BY kind", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving movie_kind");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT * from movie_kind AS mk WHERE mk.id_user = ?",
    idUrl,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving movie_kind");
      } else {
        res.json(results);
      }
    }
  );
});

router.put("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO movie_kind SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Error saving movie_kind");
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/:id", (req, res) => {
  const idUrl = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE movie_kind SET ? WHERE id_user = ?",
    [formData, idUrl],
    (err) => {
      if (err) {
        res.status(500).send("Error editing");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "DELETE FROM movie_kind WHERE id_user = ?",
    [idUrl],
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
