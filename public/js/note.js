'use strict';

(function() {
  let createBox = document.querySelector('.create-box__wrapper');

  function paddingNoteBox() {
    let noteHeader = document.createElement('div');
    noteHeader.classList.add('new-note__note-header');
    noteHeader.textContent = 'type header...'
    noteHeader.setAttribute('contenteditable', true);

    let noteText = document.createElement('div');
    noteText.classList.add('new-note__note-text');
    noteText.setAttribute('contenteditable', true);

    let noteAdd = document.createElement('div');
    noteAdd.classList.add('new-note__add-button');
    noteAdd.classList.add('button');

    let checkMode = document.createElement('div');
    checkMode.classList.add('create-box__check-mode');
    checkMode.classList.add('button');

    
    createBox.append(noteHeader);
    createBox.append(noteText);
    createBox.append(noteAdd);
    createBox.append(checkMode);

    noteText.focus();

    noteAdd.addEventListener('click', () => {

    });

    checkMode.addEventListener('click', () => {
      window.domElement.remove('.new-note__note-header');
      window.domElement.remove('.new-note__note-text');
      window.domElement.remove('.new-note__add-button');
      window.domElement.remove('.create-box__check-mode');

      createBox.classList.remove('notes-mod');


      let createField = document.createElement('div');
      createField.classList.add('new-task__add-field');
      createField.textContent = 'new task...';

      let addTasklistButton = document.createElement('div');
      addTasklistButton.classList.add('new-task__add-button');
      addTasklistButton.classList.add('button');

      let noteMode = document.createElement('div');
      noteMode.classList.add('create-box__note-mode');
      noteMode.classList.add('button');

      createBox.append(createField);
      createBox.append(addTasklistButton);
      createBox.append(noteMode);

      createField.addEventListener('click', window.task.createTaskHandler);



      // let createField = document.querySelector('.new-task__add-field');

    });
  }


  function switchMode() {
    createBox.classList.add('notes-mod');
    window.domElement.remove('.new-task__add-field');
    window.domElement.remove('.new-task__add-button');
    window.domElement.remove('.create-box__note-mode');

    paddingNoteBox();
  }

  window.note = {
    switchMode
  }
})();