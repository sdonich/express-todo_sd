function editNote(newNote, notelist) {
  notelist.forEach(note => {
    if (note.id == newNote.id) {
      note.header = newNote.header;
      note.content = newNote.content;
    }
  });

  return notelist;
}

module.exports = editNote;