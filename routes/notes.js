const note = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile, readAndDelete } = require("../helpers/fsUtils");

// GET route to retrieve all notes
note.get("/", (req, res) =>
  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)))
);

//POST route to add a new note to the current saved notes
note.post("/", (req, res) => {
  // Destructuring for items in req.body
  const { title, text } = req.body;
  // Check to see if new note has required elements
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, '../db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error posting note')
  }
});

note.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readAndDelete(noteId, '../db/db.json');
  res.json(`Note ${noteId} has been deleted`);
});

module.exports = note;
