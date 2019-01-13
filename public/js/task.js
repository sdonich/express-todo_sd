'use strict';

(function() {
  let createField = document.querySelector('.new-task__add-field');
  let okMarkdown = document.querySelector('.new-task__wrapper .new-task__add-button');

  function setDefaultState() {
    createField.style.color = 'grey';
    createField.textContent = 'new task...';
    okMarkdown.style.opacity = 0;
    document.removeEventListener('keydown', keydownHandler);
    okMarkdown.removeEventListener('click', submit);
    createField.addEventListener('click', createTaskHandler);
  }
  
  function submit() {
    let task = createField.textContent;
    let tasklist = document.querySelector('.tasklist-header__title').textContent;
    
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
  
  function createTaskHandler(evt) {
    okMarkdown.style.opacity = 1;

    if (evt.target.textContent === 'new task...') evt.target.textContent = '';
    
    createField.style.color = 'black';

    document.addEventListener('keydown', keydownHandler);
    okMarkdown.addEventListener('click', submit);

    document.addEventListener('mousedown', (evt) => {
      if (evt.target !== okMarkdown || evt.target !== createField) {

        if (createField.textContent.length === 0) {
          return setDefaultState();
        }

        createField.style.color = 'grey';

        document.removeEventListener('keydown', keydownHandler);
        createField.addEventListener('click', createTaskHandler);
      }
    });

    createField.removeEventListener('click', createTaskHandler);
  }
  
  function clearSelection() {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if(window.getSelection) {
      let sel = window.getSelection();
      sel.removeAllRanges();
    }
  }
  
  createField.addEventListener('click', createTaskHandler);
})();




