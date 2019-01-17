'use strict';

(function () {
  let notDone = document.querySelector('.tasks_not-done');
  let done = document.querySelector('.tasks_done');

  function add(task) {
    let taskBox = document.createElement('li');
    taskBox.classList.add('task-box');

    let checkbox = document.createElement('div');
    checkbox.setAttribute('role', 'checkbox');
    checkbox.setAttribute('complited', task.complited);
    checkbox.setAttribute('id', task.id);

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-box__content');
    taskContent.setAttribute('contenteditable', true);
    taskContent.textContent = task.content;
       
    let cross = document.createElement('div');
    cross.classList.add('task-box__cross');

    taskBox.append(checkbox);
    taskBox.append(taskContent);
    taskBox.append(cross);

    if (task.complited === true) {
      checkbox.setAttribute('checked', true);
      done.append(taskBox);
    }
    if (task.complited === false) {

      checkbox.setAttribute('checked', false);

      notDone.append(taskBox);
    }

    window.handler.crossAppear(taskContent, cross);
    window.handler.inputChange(checkbox);
    window.handler.crossDelete(task, taskBox, cross);
    window.handler.editContent(taskContent);
  }

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

  function addTasklist(title) {
    window.domElement.remove('.tasklists-box p');

    let tasklists = document.querySelector('.tasklists-box__tasklist-title');
    let tasklistTitleHead = document.querySelector('.tasklist-header__title');
    let tasklist = document.createElement('li');
    tasklist.classList.add('tasklists-box__tasklist-title__element');

    if (document.querySelector('.tasklists-box__tasklist-title__selected')) {
      let selectedList = document.querySelector('.tasklists-box__tasklist-title__selected');
      selectedList.classList.remove('tasklists-box__tasklist-title__selected');
    }
    tasklist.classList.add('tasklists-box__tasklist-title__selected');

    tasklist.textContent = title;
    tasklists.append(tasklist);

    tasklistTitleHead.textContent = title;

    window.handler.tasklistClickHandler(tasklist);
  }
  
  window.action = {
    add,
    moving,
    addTasklist
  };
})();