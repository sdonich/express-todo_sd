'use strict';

(function() {
  let createField = document.querySelector('.create_field');
  let okMarkdown = document.querySelector('.wrapper_create .ok_markdown');

  function setDefaultState() {
    createField.style.color = 'grey';
    createField.textContent = 'new task...';
    okMarkdown.style.opacity = 0;
    document.removeEventListener('keydown', keydownHandler);
    okMarkdown.removeEventListener('click', submit);
    createField.addEventListener('click', createNoteHandler);
  }
  
  function submit() {
    let task = createField.textContent;
    let tasklist = document.querySelector('.tasklist_head-title').textContent;
    
    if (task.length > 0) window.backend.create(task, tasklist, window.action.add);

    setDefaultState();
  }
  
  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      clearSelection();
      setDefaultState();
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();

      clearSelection();
      submit();
    }
  }
  
  function createNoteHandler(evt) {
    okMarkdown.style.opacity = 0.5;

    if (evt.target.textContent === 'new task...') evt.target.textContent = '';
    
    createField.style.color = 'black';

    document.addEventListener('keydown', keydownHandler);
    okMarkdown.addEventListener('click', submit);

    document.addEventListener('mousedown', (evt) => {
      if (evt.target !== okMarkdown || evt.target !== createField) {
        createField.style.color = 'grey';

        document.removeEventListener('keydown', keydownHandler);
        createField.addEventListener('click', createNoteHandler);
      }
    });

    createField.removeEventListener('click', createNoteHandler);
  }
  
  function clearSelection() {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if(window.getSelection) {
      let sel = window.getSelection();
      sel.removeAllRanges();
    }
  }
  
  createField.addEventListener('click', createNoteHandler);
})();




