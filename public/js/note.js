'use strict';

(function() {
  let noteHeader = document.querySelector('.new-note__note-header');
  let noteText = document.querySelector('.new-note__note-text');
  let addNoteButton = document.querySelector('.new-note__add-button');
  let switchModeButton = document.querySelector('.create-box__mode-button');

  function submit() {
    console.log(noteHeader.textContent);
    console.log(noteText.textContent);
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
    document.removeEventListener('keydown', keydownHandler);
  }

  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      setDefaultState();
      window.switchMode.pull();

      // здесь должен быть переключение мода
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();

      submit();
    }
  }

  function setNoteHandler() {
    noteText.focus();

    addNoteButton.addEventListener('click', submit);
    noteHeader.addEventListener('click', noteHeaderHandler);
    switchModeButton.addEventListener('click', setDefaultState);
    document.addEventListener('keydown', keydownHandler);
  }

  window.note = {
    setNoteHandler
  }


})();