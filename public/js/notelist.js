'use strict';

(function() {
  let notes = document.querySelector('.notes');
  let template = document.querySelector('template').content;

  function paddingNote(note) {
    let noteBox = template.querySelector('.note-box').cloneNode(true);
    noteBox.setAttribute('id', note.id);

    let noteHeader = noteBox.querySelector('.note-box__header');
    noteHeader.textContent = note.header;
    let noteText = noteBox.querySelector('.note-box__text');
    noteText.textContent = note.content;

    let noteSetting = noteBox.querySelector('.note-box__setting');
    noteBox.append(noteHeader);
    noteBox.append(noteText);
    noteBox.append(noteSetting);

    notes.append(noteBox);
  }


  function fullDataCallback(notelist) {
    notelist.forEach(note => {
      paddingNote(note);
    });
  
  }
  function emptyDataCallback() {
    console.log('nothing to render');
  }

  function render() {
    window.backend.notelist(fullDataCallback, emptyDataCallback);
  }

  window.notelist = {
    render
  }
})();