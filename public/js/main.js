'use strict';

(function() {
  let tasklistsBox = document.querySelector('.tasklists-box');
  let tasklists = document.querySelector('.tasklists');
  let tasklistHeadTitle = document.querySelector('.tasklist_head-title');
  let addTasklistButton = tasklistsBox.querySelector('.add-tasklist');

  addTasklistButton.addEventListener('click', () => {
    let tasklistEnter = document.createElement('div');
    tasklistEnter.classList.add('tasklist_enter-field');
    tasklistsBox.insertAdjacentElement('beforeEnd', tasklistEnter);
    tasklistEnter.setAttribute('contenteditable', true);
    tasklistEnter.focus();

    tasklistEnter.addEventListener('keydown', keydownHandler);
  });

  function setDefaultState() {
    let tasklistEnter = document.querySelector('.tasklist_enter-field');
    tasklistEnter.remove();
  }

  function addTasklistTitle(title) {
    while (tasklistsBox.querySelector('p')) {
      tasklistsBox.querySelector('p').remove();
    }

    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklists.append(tasklist);
    tasklistHeadTitle.textContent = title;

    window.handler.tasklistClickHandler(tasklist);
  }

  function submit() {
    let tasklistEnter = document.querySelector('.tasklist_enter-field');
    let title = tasklistEnter.textContent;
    
    if (title.length > 0) {
      window.backend.sendTasklistTitle(title);
      tasklistEnter.remove();
      addTasklistTitle(title);
      window.tasklist.build(title);
    } else {
      setDefaultState();
    }
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

  function emptyDataCallback() {
    let placeholder = document.createElement('p');
    tasklistsBox.append(placeholder);
    placeholder.insertAdjacentHTML('afterBegin', 'There is no tasklists yet<br><b>Press PLUS to create</b>');
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
    tasklistHeadTitle.textContent = title;
  
    window.tasklist.build(title);
  }

  window.backend.tasklists(fullDataCallback, emptyDataCallback); 
})();
