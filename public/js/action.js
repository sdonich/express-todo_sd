'use strict';

(function () {
  function add(tasks) {
    // получаем последнюю добавленную задачу
    let task = getLastTask(tasks);

    // создание листа
    let notDoneList = document.querySelector('.not_done');
    let taskBox = document.createElement('li');
    taskBox.classList.add('taskBox');

    // чекбокс для такса
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('complited', task.complited);
    checkbox.setAttribute('id', task.id);
    
    // контейнер для задачи
    let taskContent = document.createElement('div');
    taskContent.classList.add('taskContent');
    taskContent.textContent = task.title;
    
    // обработчика события на появление cross
    taskContent.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;
    });
    taskContent.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;
    });
    
    // cross для удаления задачи
    let cross = document.createElement('div');
    cross.classList.add('cross');
    // обработка появления cross
    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 0.5;
    });
    cross.addEventListener('mouseout', (evt) => {
      cross.style.opacity = 0;
    });

    // вставка в DOM
    taskBox.append(checkbox);
    taskBox.append(taskContent);
    taskBox.append(cross);
    notDoneList.append(taskBox);

    // событие на завершение задачи и перенос в другой список
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
      moving(evt);
    });

    cross.addEventListener('click', () => {
      window.backend.expel(task.id, () => {
        taskBox.remove();
      });
    });
  }

  // перемещение задачи между невыполненными и выполненными
  function moving(evt) {
    let notDone = document.querySelector('.not_done');
    let done = document.querySelector('.done'); 

    let taskBox = evt.target.parentElement;
    let parent = taskBox.parentElement;
    let copy = taskBox.parentElement.removeChild(taskBox);
    if (parent === notDone) {
      done.append(copy);
    } else {
      notDone.append(copy);
    }
  }
  
  function getLastTask(tasks) {
    const tasklist = JSON.parse(tasks);
    const lastIndex = tasklist.length;
    const task = tasklist[lastIndex - 1];

    return task;
  }
  
  window.action = {
    add,
    moving
  };
})();