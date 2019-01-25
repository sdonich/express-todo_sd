'use strict';

(function() {
  let tasklistsBox = document.querySelector('.tasklists-box');
  let tasklists = document.querySelector('.tasklists-box__tasklist-title');
  let addTasklistButton = tasklistsBox.querySelector('.tasklists-box__add-button');
  let createField = document.querySelector('.new-task__add-field');
  let tasklistMenuButton = document.querySelector('.tasklist-header__edit-tasklist_button');
  let switchModeButton = document.querySelector('.create-box__mode-button');

  function setDefaultState() {
    let tasklistInputField = document.querySelector('.tasklists-box__input-field');
    tasklistInputField.remove();

    document.removeEventListener('click', resetInputTitle, true);
  }

  function submit() {
    let tasklistInputField = document.querySelector('.tasklists-box__input-field');
    let title = tasklistInputField.textContent;
    
    if (title.length > 0) {
      window.backend.sendTasklistTitle(title);
      window.tasklist.add(title);
      window.tasklist.build(title);
    } 

    setDefaultState();
  }

  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setDefaultState();
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();
      submit();
    }
  }

  function resetInputTitle(evt) {
    if (evt.target !== document.querySelector('.tasklists-box__input-field')) {
      evt.stopPropagation();

      setDefaultState();
    }
  }

  function pasteTasklist(title) {
    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklist.classList.add('tasklists-box__tasklist-title__element');
    tasklists.append(tasklist);

    return tasklist;
  }

  function emptyDataCallback() {
    window.motivation.add();

    let placeholder = document.createElement('p');
    placeholder.classList.add('tasklists-box__placeholder');
    addTasklistButton.before(placeholder);
    placeholder.insertAdjacentHTML('afterBegin', 'There is no tasklists yet,<br><b>press PLUS</b> to create');
  }

  function fullDataCallback(data) {
    data.forEach(title => {
      let tasklist = pasteTasklist(title);
      window.tasklistToggle.tasklistClickHandler(tasklist);
    });
  
    let selectedTasklist = tasklists.firstChild;
    selectedTasklist.classList.add('tasklists-box__tasklist-title__selected');
    let title = selectedTasklist.textContent;

    window.tasklist.build(title);
  }

  window.backend.getTasklists(fullDataCallback, emptyDataCallback);

  createField.addEventListener('click', window.task.createTaskHandler);
  tasklistMenuButton.addEventListener('click', window.tasklistSetting.editMenuHandler);
  addTasklistButton.addEventListener('click', () => {
    let tasklistInputField = document.createElement('div');
    tasklistInputField.classList.add('tasklists-box__input-field');
    tasklistInputField.setAttribute('contenteditable', true);
    tasklistsBox.append(tasklistInputField);
    tasklistInputField.focus();

    document.addEventListener('click', resetInputTitle, true);
    tasklistInputField.addEventListener('keydown', keydownHandler);
  });
  switchModeButton.addEventListener('click', window.switchMode.pull);

  window.main = {
    fullDataCallback,
    emptyDataCallback,
    pasteTasklist
  }
})();
