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
    window.domElement.remove('.motivation-box__notes');

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
      if (noteText.textContent !== 'type note...') {
        let note = {
          header: noteHeader.textContent,
          content: noteText.textContent
        }
  
        window.backend.addNote(note, (response) => {
          addNote(response);
        });
      }
      
    }

    setDefaultState();
    window.switchMode.pull();
  }
  
  function setDefaultState() {
    noteHeader.textContent = 'type header...';
    noteHeader.style.color = 'grey';
    noteText.textContent = '';

    addNoteButton.removeEventListener('click', submit);
    
    switchModeButton.removeEventListener('click', setDefaultState);
    document.removeEventListener('mousedown', resetInputMousedownHandler);
    document.removeEventListener('keydown', keydownHandler);
    noteText.removeEventListener('blur', noteTextBlurHandler);
    noteText.removeEventListener('focus', noteTextFocusHandler);
    noteHeader.removeEventListener('blur', noteHeaderBlurHandler);
    noteHeader.removeEventListener('focus', noteHeaderFocusHandler);
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

  function noteTextBlurHandler() {
    if (noteText.textContent.length === 0) {
      noteText.textContent = 'type note...';
      noteText.style.color = 'grey';
    }
  }

  function noteTextFocusHandler() {
    if (noteText.textContent === 'type note...') {
      noteText.textContent = '';
      noteText.style.color = 'black';
    }
  }
  function noteHeaderBlurHandler() {
    if (noteHeader.textContent.length === 0) {
      noteHeader.textContent = 'type header...';
      noteHeader.style.color = 'grey';
    }
  }

  function noteHeaderFocusHandler() {
    if (noteHeader.textContent === 'type header...') {
      noteHeader.textContent = '';
      noteHeader.style.color = 'black';
    }
  }


  function setNoteHandler() {
    noteText.focus();

    addNoteButton.addEventListener('click', submit);
    switchModeButton.addEventListener('click', setDefaultState);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('mousedown', resetInputMousedownHandler);
    noteText.addEventListener('blur', noteTextBlurHandler);
    noteText.addEventListener('focus', noteTextFocusHandler);
    noteHeader.addEventListener('blur', noteHeaderBlurHandler);
    noteHeader.addEventListener('focus', noteHeaderFocusHandler);
  }

  window.note = {
    setNoteHandler,
    addNote
  }
})();