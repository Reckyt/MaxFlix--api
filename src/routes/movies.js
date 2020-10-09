const express = require("express");

const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query(
    "SELECT *, CONCAT(d.firstname, ' ', d.name) AS director FROM movie AS m INNER JOIN director AS d WHERE m.director_id_director = d.id_director",
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
    "SELECT ANY_VALUE(m.id_movie) as id_movie, ANY_VALUE(m.title) AS title, ANY_VALUE(m.year) AS year, ANY_VALUE(m.poster) AS poster, ANY_VALUE(m.link) AS link, ANY_VALUE(m.synopsis) AS synopsis, ANY_VALUE(m.actors) AS actors, ANY_VALUE(d.firstname) AS firstname,ANY_VALUE(d.name) AS name, ANY_VALUE(m.director_id_director) AS id_director, group_concat(mk.kind order by mk.kind asc separator ' - ') AS kind from movie AS m INNER JOIN director AS d ON m.director_id_director = d.id_director INNER JOIN movie_has_kind AS mhk ON m.id_movie = mhk.movie_id_movie INNER JOIN movie_kind AS mk ON mhk.movie_kind_id_user = mk.id_user WHERE m.id_movie = ? group by title;",
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

router.put("/", (req, res) => {
  console.log(req.body);
  const formData = req.body;
  connection.query("INSERT INTO movie SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Error saving movie");
    } else {
      res.sendStatus(201);
    }
  });
});

router.post("/:id", (req, res) => {
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
