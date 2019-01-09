'use strict';

(function() {
  let tasklistsBox = document.querySelector('.tasklists-box');
  let tasklists = document.querySelector('.tasklists-box__tasklist-title');
  let addTasklistButton = tasklistsBox.querySelector('.tasklists-box__add-button');

  function setDefaultState() {
    let tasklistInputField = document.querySelector('.tasklists-box__input-field');
    tasklistInputField.remove();
  }

  function submit() {
    let tasklistInputField = document.querySelector('.tasklists-box__input-field');
    let title = tasklistInputField.textContent;
    
    if (title.length > 0) {
      window.backend.sendTasklistTitle(title);
      tasklistInputField.remove();
      window.action.addTasklist(title);
      window.tasklist.build(title);

    } else {
      setDefaultState();
    }
    document.removeEventListener('click', resetInputTitle, true);
  }

  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      document.removeEventListener('click', resetInputTitle, true);
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
      document.querySelector('.tasklists-box__input-field').remove();
      document.removeEventListener('click', resetInputTitle, true);
    }
  }

  addTasklistButton.addEventListener('click', () => {
    let tasklistInputField = document.createElement('div');
    tasklistInputField.classList.add('tasklists-box__input-field');
    tasklistInputField.setAttribute('contenteditable', true);
    tasklistsBox.append(tasklistInputField);
    tasklistInputField.focus();

    document.addEventListener('click', resetInputTitle, true);
    tasklistInputField.addEventListener('keydown', keydownHandler);
  });

  function emptyDataCallback() {
    let placeholder = document.createElement('p');
    placeholder.classList.add('tasklists-box__placeholder');
    addTasklistButton.before(placeholder);
    placeholder.insertAdjacentHTML('afterBegin', 'There is no tasklists yet<br><b>Press PLUS</b> to create <br> your first tasklist');
  }

  function fullDataCallback(data) {
    data.forEach(title => {
      let tasklist = document.createElement('li');
      tasklist.textContent = title;
      tasklists.append(tasklist);

      window.handler.tasklistClickHandler(tasklist);
    });
  
    let selectedTasklist = tasklists.firstChild;
    let title = selectedTasklist.textContent;

    window.tasklist.build(title);
  }

  window.backend.tasklists(fullDataCallback, emptyDataCallback); 
})();
