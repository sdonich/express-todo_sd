'use strict';

(function() {
  let createField = document.querySelector('.new-task__add-field');
  let okMarkdown = document.querySelector('.new-task__wrapper .new-task__add-button');

  function setDefaultState() {
    createField.style.color = 'grey';
    createField.textContent = 'new task...';
    okMarkdown.style.opacity = 0;
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('mousedown', resetInputMousedownHandler);
    okMarkdown.removeEventListener('click', submit);
    createField.addEventListener('click', createTaskHandler);
  }
  
  function submit() {
    let task = createField.textContent;
    if (!document.querySelector('.tasklists-box__tasklist-title__selected')) {
      while (document.querySelector('.tasklists-box p')) {
        document.querySelector('.tasklists-box p').remove();
      }

      window.main.pasteTasklist('default list');
      let selectedTasklist = document.querySelector('.tasklists-box__tasklist-title__element');
      selectedTasklist.classList.add('tasklists-box__tasklist-title__selected');

      let tasklistHeadTitle = document.querySelector('.tasklist-header__title');
      tasklistHeadTitle.textContent = 'default list';
      window.backend.sendTasklistTitle(tasklistHeadTitle.textContent);
    }

    let tasklist = document.querySelector('.tasklists-box__tasklist-title__selected');
    let tasklistTitle = tasklist.textContent;

    window.handler.tasklistClickHandler(tasklist);
    
    if (task.length > 0) window.backend.create(task, tasklistTitle, window.action.add);

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

  function resetInputMousedownHandler(evt) {
    if (evt.target !== okMarkdown || evt.target !== createField) {

      if (createField.textContent.length === 0) {
        return setDefaultState();
      }

      createField.style.color = 'grey';

      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('mousedown', resetInputMousedownHandler);
      createField.addEventListener('click', createTaskHandler);
    }
  }
  
  function createTaskHandler(evt) {
    okMarkdown.style.opacity = 1;

    if (evt.target.textContent === 'new task...') evt.target.textContent = '';
    
    createField.style.color = 'black';

    document.addEventListener('keydown', keydownHandler);
    okMarkdown.addEventListener('click', submit);
    document.addEventListener('mousedown', resetInputMousedownHandler);

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




