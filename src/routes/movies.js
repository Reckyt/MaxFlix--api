const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query(
    "SELECT *, CONCAT(d.firstname, ' ', d.name) AS director FROM movie AS m INNER JOIN director AS d WHERE m.id_director = d.id_director",
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving movies");
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT * from movie AS m INNER JOIN director AS d ON m.id_director = d.id_director WHERE m.id_movie = ?",
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

router.get("/stream", (req, res) => {
  const path = "../assets/BigBuckBunny.mp4";
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Range": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

module.exports = router;
