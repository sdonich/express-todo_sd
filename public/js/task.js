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
    if (createField.textContent.length > 0) {
      let task = createField.textContent;
      if (!document.querySelector('.tasklists-box__tasklist-title__selected')) {
        window.domElement.remove('.tasklists-box p');
  
        window.main.pasteTasklist('default list');
        let selectedTasklist = document.querySelector('.tasklists-box__tasklist-title__element');
        selectedTasklist.classList.add('tasklists-box__tasklist-title__selected');
  
        let tasklistHeadTitle = document.querySelector('.tasklist-header__title');
        tasklistHeadTitle.textContent = 'default list';
        
        window.tasklistToggle.tasklistClickHandler(selectedTasklist);
        window.backend.sendTasklistTitle(tasklistHeadTitle.textContent);
      }
  
      let tasklist = document.querySelector('.tasklists-box__tasklist-title__selected');
      let tasklistTitle = tasklist.textContent;
      
      window.backend.create(task, tasklistTitle, addTask);
      setDefaultState();
    } else {
      setDefaultState();
    }
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

  function addTask(task) {
    let notDone = document.querySelector('.tasks_not-done');
    let done = document.querySelector('.tasks_done');

    let taskBox = document.createElement('li');
    taskBox.classList.add('task-box');

    let checkbox = document.createElement('div');
    checkbox.setAttribute('role', 'checkbox');
    checkbox.setAttribute('complited', task.complited);
    checkbox.setAttribute('id', task.id);

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-box__content');
    taskContent.setAttribute('contenteditable', true);
    taskContent.textContent = task.content;
       
    let cross = document.createElement('div');
    cross.classList.add('task-box__cross');

    taskBox.append(checkbox);
    taskBox.append(taskContent);
    taskBox.append(cross);

    if (task.complited === true) {
      checkbox.setAttribute('checked', true);
      done.append(taskBox);
    }
    if (task.complited === false) {
      checkbox.setAttribute('checked', false);
      notDone.append(taskBox);
    }

    window.taskHandler.setHandlers(task, taskBox, checkbox, taskContent, cross);
  }
  
  function clearSelection() {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if(window.getSelection) {
      let sel = window.getSelection();
      sel.removeAllRanges();
    }
  }

  window.task = {
    createTaskHandler,
    addTask
  }
})();




