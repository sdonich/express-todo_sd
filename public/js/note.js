'use strict';

(function() {
  let create
  let noteHeader = document.querySelector('.new-note__note-header');
  let noteText = document.querySelector('.new-note__note-text');
  let addNoteButton = document.querySelector('.new-note__add-button');
  let switchModeButton = document.querySelector('.create-box__mode-button');
  let createBoxWrapper = document.querySelector('.create-box__wrapper');

  function submit() {
    console.log(noteHeader.textContent);
    console.log(noteText.textContent);

    if (noteText.textContent.length > 0 && noteHeader.textContent.length > 0) {
      let note = {
        header: noteHeader.textContent,
        content: noteText.textContent
      }

      // window.backend.addNote(note, () => {

      // });
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
    setNoteHandler
  }
})();