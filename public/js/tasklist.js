'use strict';

(function() {
  function add(onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/notes`);
    xhr.responseType = 'json';
    xhr.send();
  
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    })
  
  }
  
  function render(task, handler) {
    let notDone = document.querySelector('.not_done');
    let done = document.querySelector('.done');    

    let taskBox = document.createElement('li');
    taskBox.classList.add('taskBox');

    let taskContent = document.createElement('div');
    taskContent.classList.add('taskContent');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('complited', task.complited);
  
    taskContent.textContent = task.title;

    taskContent.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;

    });
    taskContent.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;

    });

    
    checkbox.setAttribute('id', task.id);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('complited', task.complited);

    let cross = document.createElement('div');
    cross.classList.add('cross');

    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 0.5;
    });
    cross.addEventListener('mouseout', (evt) => {
      cross.style.opacity = 0;
    });
  
      
  
    taskBox.append(checkbox);
    taskBox.append(taskContent);
    taskBox.append(cross);
  
    if (task.complited) {
      checkbox.checked = true;
      done.append(taskBox);
    } 
    if (task.complited === false) {
      notDone.append(taskBox);
    }

   handler(checkbox);
  
   cross.addEventListener('click', (evt) => {
    window.backend.expel(task.id, (task) => {
      taskBox.remove();
    });

    

   });
  

  }
  
  add((tasks) => {
    tasks.forEach(task => {
      render(task, inputChangeHandler);
    });
  });

  function inputChangeHandler(checkbox) {

    checkbox.addEventListener('change', (evt) => {
      let task = evt.target;
  
      if (task.checked === true) {
        task.setAttribute('complited', true);
      }
      if (task.checked === false) {
        task.setAttribute('complited', false);
      }
  
      const complited = task.getAttribute('complited');
      const id = task.getAttribute('id');
  
      window.backend.complite(complited, id);

      window.action.moving(evt);


    });
  }



})();

