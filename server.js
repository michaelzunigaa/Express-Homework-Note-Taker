const express = require("express");

const path = require("path");

const app = express();

const fs = require("fs");

let noteData = [];

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.get("api/notes", function (err, res) {
  try {

    noteData = fs.readFileSync("Devlop/db/db.json", "utf8");
    noteData = JSON.parse(noteData);
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.error(err);
  }
  res.json(noteData);
});

app.post("/api/notes", function (req, res) {
  try {

    noteData = fs.readFileSync("./db/db.json", "utf8");
    noteData = JSON.parse(noteData);

    req.body.id = noteData.length;

    noteData.push(req.body);
    noteData = JSON.stringify(noteData);

    fs.writeFile("./db/db.json", noteData, "utf8", function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(noteData));

  } catch (err) {
    throw err;
  }
});

app.delete("/api/notes/:id", function (req, res) {
  try {
    noteData = fs.readFileSync("./Develop/db/db.json", "utf8");
    noteData = JSON.parse(noteData);
    noteData = noteData.filter(function (note) {
      return note, id != req.params.id;
    });

    noteData = JSON.stringify(noteData);

    fs.writeFile("./Develop/db/db.json", noteData, "utf8", function (err) {
      if (err) throw err;


    });
    res.send(JSON.parse(noteData));
  } catch (err) {
    throw err;

  }
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "/db/db.json"));
});


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});