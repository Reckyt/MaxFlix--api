const express = require("express");

const router = express.Router();
const connection = require("../config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM user", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query("SELECT * FROM user WHERE id = ?", idUrl, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ results });
    }
  });
});

router.post("/signup", (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 7);
  const formData = {
    mail: req.body.mail,
    password: hashPassword,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
  };
  console.log(formData, req.body);
  connection.query("INSERT INTO user SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/login", (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE mail = ?",
    req.body.mail,
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const samePassword = bcrypt.compareSync(
          req.body.password,
          results[0].password
        );
        if (!samePassword) {
          res.status(500).send("wrong password ducon");
        } else {
          // creation du token d'un user
          jwt.sign({ results }, "variable denvironnement", (err, token) => {
            res.json({
              token: token,
              userData: results,
            });
          });
        }
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const formData = req.body;
  const idUser = req.params.id;
  connection.query(
    "UPDATE client SET ? WHERE id = ?",
    [formData, idUser],
    (err, results) => {
      if (err) {
        res.status(500).send("Database error");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
