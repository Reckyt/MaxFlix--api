const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
    connection.query("SELECT * from movie", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving movies");
      } else {
        res.json(results);
      }
    });
  });

  router.get("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query(
      "SELECT * from movie WHERE id_movie = ?",
      [idUrl],
      (err, results) => {
        if (err) {
          res.status(500).send("Error retrieving movies");
        } else {
          res.json(results);
        }
      }
    );
  });
  
  router.post("/", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO movie SET ?", formData, (err, results) => {
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
      "UPDATE movie SET ? WHERE id_movie = ?",
      [formData, idUrl],
      (err) => {
        if (err) {
          res.status(500).send("Error editing");
        } else {
          res.sendStatus(200);
          console.log(err);
        }
      }
    );
  });
  
  router.delete("/:id", (req, res) => {
    const idUrl = req.params.id;
    connection.query("DELETE FROM movie WHERE id_movie = ?", [idUrl], (err) => {
      if (err) {
        res.status(500).send("Error deleting");
      } else {
        res.sendStatus(200);
      }
    });
  });

  module.exports = router;