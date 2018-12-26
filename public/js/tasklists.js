'use strict';

(function() {
  let tasklistsBox = document.querySelector('.tasklists-box');
  let tasklists = document.querySelector('.tasklists');
  let tasklistHeadTitle = document.querySelector('.tasklist-title');

  function setDefaultState() {
    let tasklist = document.querySelector('.tasklist-enter_field');
    tasklist.remove();
  }

  function addTasklistTitle(title) {
    tasklistsBox.querySelector('p').remove();
    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklists.append(tasklist);
    tasklistHeadTitle.textContent = title;

    window.handler.tasklistClickHandler(tasklist);
  }

  function submit() {
    let tasklist = document.querySelector('.tasklist-enter_field');
    let title = tasklist.textContent;
    
    if (title.length > 0) {
      window.backend.sendTasklistTitle(title);
      tasklist.remove();
      addTasklistTitle(title);
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
    placeholder.insertAdjacentHTML('afterBegin', 'There is no tasklists yet<br><b>Press to create</b>');
    placeholder.addEventListener('click', () => {
      let tasklistEnter = document.createElement('div');
      tasklistEnter.classList.add('tasklist-enter_field');
      tasklistsBox.insertAdjacentElement('beforeEnd', tasklistEnter);
      tasklistEnter.setAttribute('contenteditable', true);
      tasklistEnter.focus();

      tasklistEnter.addEventListener('keydown', keydownHandler);
    });
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
