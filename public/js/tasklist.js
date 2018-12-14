'use strict';

(function() {
  function render(task, handler) {
    let notDone = document.querySelector('.not_done');
    let done = document.querySelector('.done');    

    // создаем обертки и контейнеры для задачь
    let taskBox = document.createElement('li');
    taskBox.classList.add('taskBox');

    let taskContent = document.createElement('div');
    taskContent.classList.add('taskContent');
    taskContent.textContent = task.title;

    let checkbox = document.createElement('input');
    checkbox.setAttribute('complited', task.complited);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', task.id);
    
    // вешаем обработку на появление cross
    taskContent.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;
    });
    taskContent.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;
    });

    // создание cross и обработка
    let cross = document.createElement('div');
    cross.classList.add('cross');

    cross.addEventListener('mouseover', () => {
      cross.style.opacity = 0.5;
    });
    cross.addEventListener('mouseout', () => {
      cross.style.opacity = 0;
    });
      
    // вставляем задачи
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

    // обработчики на галочку и на тап по cross
    handler(checkbox);
    cross.addEventListener('click', () => {
      window.backend.expel(task.id, () => {
        taskBox.remove();
      });
    });
  }

  function inputChangeHandler(checkbox) {
    checkbox.addEventListener('change', (evt) => {
      let task = evt.target;
  
      if (task.checked === true) {
        task.setAttribute('complited', true);
      } else {
        task.setAttribute('complited', false);
      }
  
      const complited = task.getAttribute('complited');
      const id = task.getAttribute('id');
  
      window.backend.complite(complited, id);
      window.action.moving(evt);
    });
  }

  window.backend.buildList((tasks) => {
    tasks.forEach(task => {
      render(task, inputChangeHandler);
    });
  });
})();

