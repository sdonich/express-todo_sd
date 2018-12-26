'use strict';

// work
(function() {
  let tasklistsBox = document.querySelector('.tasklists-box');
  let tasklists = document.querySelector('.tasklists');
  let tasklistTitle = document.querySelector('.tasklist-title');

  function setDefaultState() {
    let tasklist = document.querySelector('.tasklist-enter_field');
    tasklist.remove();
  }

  function addTitle(title) {
    tasklistsBox.querySelector('p').remove();
    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklists.append(tasklist);
    tasklistTitle.textContent = title;
    
  }

  // при добавлении li нужно на него вешать обработку событий

  function sendTasklist(data) {
    const tasklist = { title: data };

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', '/addTasklist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(tasklist));
  }

  function submit() {
    let tasklist = document.querySelector('.tasklist-enter_field');
    let title = tasklist.textContent;
    
    if (title.length > 0) {
      sendTasklist(title);
      tasklist.remove();
      addTitle(title);
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

  window.backend.tasklists((data)=> {
    data.forEach(title => {
      let tasklist = document.createElement('li');
      tasklist.textContent = title;
      tasklists.append(tasklist);
  
      tasklist.addEventListener('click', (evt) => {
        while (document.querySelector('.taskBox')) {
          document.querySelector('.taskBox').remove();
        }
  
        tasklistTitle.textContent = evt.target.textContent;
        window.tasklist.build(tasklistTitle.textContent);
      });
  
    });
  
    let selectedTasklist = tasklists.firstChild;
    let title = selectedTasklist.textContent;
    tasklistTitle.textContent = title;
  
    window.tasklist.build(title);
  }, () => {
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
  }); 
})();

// end
