const express = require("express");
const fs = require("fs");

const router = express.Router();
const relativePath = "/home/maxime/Bureau/";

// router.get("/", (req, res) => {
//   const path = relativePath + "Fous d'Irène.mkv";
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const file = fs.createReadStream(path, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "video/mkv",
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mkv",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });

router.get("/:id/:title", (req, res) => {
  const movieTitle = req.params.title;
  const path = relativePath + movieTitle + ".mkv";
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mkv",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mkv",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

// router.get("/:id", (req, res) => {
//   const idUrl = req.params.id;
//   connection.query(
//     "SELECT * from movie AS m WHERE m.id_movie = ?",
//     // "SELECT m.*, d.*, group_concat(mk.kind order by mk.kind asc separator ' - ') AS kind from movie AS m INNER JOIN director AS d ON m.director_id_director = d.id_director INNER JOIN movie_has_kind AS mhk ON m.id_movie = mhk.movie_id_movie INNER JOIN movie_kind AS mk ON mhk.movie_kind_id_user = mk.id_user WHERE m.id_movie = ? group by title",
//     [idUrl],
//     (err, results) => {
//       if (err) {
//         res.status(500).send("Error retrieving movies");
//       } else {
//         movie = res.json(results);
//       }
//     }
//   );
//   const path = `assets/${req.params.id}.mkv`;
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const file = fs.createReadStream(path, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "video/mkv",
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mkv",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });

module.exports = router;
