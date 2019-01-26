'use strict';

(function() {
  let createBox = document.querySelector('.create-box__wrapper');
  let switchModeButton = document.querySelector('.create-box__mode-button');

  let switcher = {
    checkMode: {
      check: 'block',
      note: 'none'
    },
    noteMode: {
      check: 'none',
      note: 'block'
    }
  }

  function pull() {
    createBox.classList.toggle('notes-mod');

    if (switchModeButton.getAttribute('mode') === 'checkMode') {
      switchModeButton.setAttribute('mode', 'noteMode');
    } else {
      switchModeButton.setAttribute('mode', 'checkMode');
    }
    let mode = switchModeButton.getAttribute('mode');

    document.querySelector('.new-task__add-field').style.display = switcher[mode].check;
    document.querySelector('.new-task__add-button').style.display = switcher[mode].check;

    document.querySelector('.new-note__note-header').style.display = switcher[mode].note;
    document.querySelector('.new-note__note-text').style.display = switcher[mode].note;
    document.querySelector('.new-note__add-button').style.display = switcher[mode].note;

    if (mode === 'noteMode') {
      window.note.setNoteHandler();
    }
    
  }

  window.switchMode = {
    pull
  }
})();