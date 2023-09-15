const express = require('express');
const app = express();
const router = express.Router();
const notes = require('../data/notes.json');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/notes.json');


//it should get all notes
router.get('/', (req, res) => {
  try {
    res.json(notes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//it should get a single note by id
router.get('/:id', (req,res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.notes.find((n) => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
});

//it should create a new note (add it to the notes.json file)
router.post('/', (req, res) => {
  const { title, note } = req.body;
  if(!title || !note){

  }
  const newNote = {
    id: notes.notes.length + 1,
    title,
    note,
  };

  notes.notes.push(newNote);

  // Write the updated notes back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

  res.status(201).json(newNote);
});

//it should update an existing note (update the notes.json file)
router.put('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, note } = req.body;
  const noteIndex = notes.notes.findIndex((n) => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const updatedNote = {
    id: noteId,
    title,
    note,
  };

  notes.notes[noteIndex] = updatedNote;

  // Write the updated notes back to the JSON object
  fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify(notes, null, 2));

  res.json(updatedNote);

});

//it should delete an existing note (update the notes.json file)
router.delete('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.notes.findIndex((n) => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  // Remove the note from the notes array
  notes.notes.splice(noteIndex, 1);

  // Write the updated notes back to the JSON object
  fs.writeFileSync(path.join(__dirname, '../data/notes.json'), JSON.stringify(notes, null, 2));

  res.status(204).send();

});





module.exports = router;
