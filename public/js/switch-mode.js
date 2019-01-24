'use strict';

(function() {
  let createBox = document.querySelector('.create-box__wrapper');

  


  function switchMode() {
    let noteMode = document.querySelector('.create-box__mode-button');

    noteMode.setAttribute('mode', 'note');

    createBox.classList.add('notes-mod');
    document.querySelector('.new-task__add-field').style.display = 'none';
    document.querySelector('.new-task__add-button').style.display = 'none';

    document.querySelector('.new-note__note-header').style.display = 'block';
    document.querySelector('.new-note__note-text').style.display = 'block';
    document.querySelector('.new-note__add-button').style.display = 'block';


 
  }

  window.note = {
    switchMode
  }
})();