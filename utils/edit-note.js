function editNote(newNote, notelist) {
  notelist.forEach(note => {
    if (note.id == newNote.id) {
      note.header = newNote.header;
      note.content = newNote.content;
      note.color = newNote.color;
    }
  });

  return notelist;
}

module.exports = editNote;