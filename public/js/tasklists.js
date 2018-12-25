'use strict';

// work
(function() {
  let tasklistsBox = document.querySelector('.tasklists-box');
  let tasklists = document.querySelector('.tasklists');
  let tasklistTitle = document.querySelector('.tasklist-title');

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
      document.body.insertAdjacentElement('beforeEnd', tasklistEnter);
      tasklistEnter.setAttribute('contenteditable', true);
      tasklistEnter.focus();

      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/enter-field`);
      // xhr.responseType = 'json';
      xhr.send();
      xhr.addEventListener('load', function() {
        console.log(xhr.response);
        let html = xhr.response;
        placeholder.insertAdjacentHTML('afterbegin', html);

      })
    });
  }); 
})();

// end
