'use strict';

(function() {
  let noteHeader = document.querySelector('.new-note__note-header');
  let noteText = document.querySelector('.new-note__note-text');
  let addNoteButton = document.querySelector('.new-note__add-button');
  let switchModeButton = document.querySelector('.create-box__mode-button');
  let createBoxWrapper = document.querySelector('.create-box__wrapper');
  let notes = document.querySelector('.notes');
  let template = document.querySelector('template').content;

  function addNote(note) {
    let noteBox = template.querySelector('.note-box').cloneNode(true);
    noteBox.setAttribute('id', note.id);

    let noteHeader = noteBox.querySelector('.note-box__header');
    noteHeader.textContent = note.header;
    let noteText = noteBox.querySelector('.note-box__text');
    noteText.textContent = note.content;

    notes.append(noteBox);
    let cross = noteBox.querySelector('.note-box__cross');
    window.noteHandler.setHandlers(noteBox, noteHeader, noteText, cross);
  }

  function submit() {
    if (noteText.textContent.length > 0 && noteHeader.textContent.length > 0) {
      let note = {
        header: noteHeader.textContent,
        content: noteText.textContent
      }

      window.backend.addNote(note, (response) => {
        addNote(response);
      });
    }

    setDefaultState();
    window.switchMode.pull();
  }
  function noteHeaderHandler() {
    noteHeader.textContent = '';
    noteHeader.style.color = 'black';
  }
  function setDefaultState() {
    noteHeader.textContent = 'type header';
    noteHeader.style.color = 'grey';
    noteText.textContent = '';

    addNoteButton.removeEventListener('click', submit);
    noteHeader.removeEventListener('click', noteHeaderHandler);
    switchModeButton.removeEventListener('click', setDefaultState);
    document.removeEventListener('mousedown', resetInputMousedownHandler);
    document.removeEventListener('keydown', keydownHandler);
  }

  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      setDefaultState();
      window.switchMode.pull();
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();

      submit();
    }
  }

  function resetInputMousedownHandler(evt) {
    if (evt.target.parentElement !== createBoxWrapper && evt.target !== createBoxWrapper) {
      evt.stopPropagation();
      setDefaultState();
      window.switchMode.pull();
    }
  }

  function setNoteHandler() {
    noteText.focus();

    addNoteButton.addEventListener('click', submit);
    noteHeader.addEventListener('click', noteHeaderHandler);
    switchModeButton.addEventListener('click', setDefaultState);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('mousedown', resetInputMousedownHandler);
  }

  window.note = {
    setNoteHandler,
    addNote
  }
})();