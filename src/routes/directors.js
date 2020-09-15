const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * from director", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving director");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT * from director AS d LEFT OUTER JOIN movie AS m ON d.id_director = m.id_director WHERE d.id_director = ? ORDER BY m.year",
    idUrl,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving director");
      } else {
        res.json(results);
      }
    }
  );
});

router.post("", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO director SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Error saving");
    } else {
      res.sendStatus(200);
    }
  });
});

router.put("/:id", (req, res) => {
  const idUrl = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE director SET ? WHERE id_director = ?",
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
    "DELETE FROM director WHERE id_director = ?",
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
