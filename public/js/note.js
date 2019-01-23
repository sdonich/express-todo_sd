'use strict';

(function() {
  let createBox = document.querySelector('.create-box__wrapper');

  function paddingBox() {
    let noteHeader = document.createElement('div');
    noteHeader.classList.add('new-note__note-header');
    noteHeader.textContent = 'Enter header...'
    noteHeader.setAttribute('contenteditable', true);

    let noteText = document.createElement('div');
    noteText.classList.add('new-note__note-text');
    noteText.setAttribute('contenteditable', true);

    let noteAdd = document.createElement('div');
    noteAdd.classList.add('new-note__add-button');
    
    createBox.append(noteHeader);
    createBox.append(noteText);
    createBox.append(noteAdd);

    noteText.focus();

    noteAdd.addEventListener('click', () => {
      console.log('hello');
    });
  }


  function switchMode() {
    createBox.classList.add('notes-mod');
    window.domElement.remove('.new-task__add-field');
    window.domElement.remove('.new-task__add-button');
    window.domElement.remove('.create-box__note-mode');

    paddingBox();

  }

  window.note = {
    switchMode
  }
})();