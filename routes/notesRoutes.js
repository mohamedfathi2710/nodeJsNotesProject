const express = require('express');
const app = express();
const router = express.Router();
const notes = require('../data/notes.json');
const fs = require('fs');
const path = require('path');



//it should get all notes
router.get('/', ...);

//it should get a single note by id
router.get('/:id', ...);

//it should create a new note (add it to the notes.json file)
router.post('/', ...);

//it should update an existing note (update the notes.json file)
router.put('/:id', ...);

//it should delete an existing note (update the notes.json file)
router.delete('/:id', ...);





module.exports = router;
