'use strict';

(function () {
  let notDone = document.querySelector('.not_done');
  let done = document.querySelector('.done');

  function add(task) {
    // создание листа
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
    taskContent.setAttribute('contenteditable', true);
    taskContent.textContent = task.title;
       
    // cross для удаления задачи
    let cross = document.createElement('div');
    cross.classList.add('cross');

    // вставка в DOM
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

    // событие на завершение задачи и перенос в другой список
    window.handler.crossAppear(taskContent, cross);
    window.handler.inputChange(checkbox);
    window.handler.crossDelete(task, taskBox, cross);
  }

  // перемещение задачи между невыполненными и выполненными
  function moving(evt) {
    let taskBox = evt.target.parentElement;
    let parent = taskBox.parentElement;
    let copy = taskBox.parentElement.removeChild(taskBox);
    
    if (parent === notDone) {
      done.append(copy);
    } else {
      notDone.append(copy);
    }
  }
  
  window.action = {
    add,
    moving
  };
})();