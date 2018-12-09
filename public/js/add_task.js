'use strict';

(function () {
  function add(tasks) {
    getLastTask(tasks, (task) => {
  
      let tasklist = document.querySelector('ul');
      let newLi = document.createElement('li');
      let newTask = document.createElement('label');
      let input = document.createElement('input');
      newTask.setAttribute('for', task.id);
      input.setAttribute('complited', task.complited);
  
      newTask.textContent = task.title;
      input.setAttribute('id', task.id);
      input.setAttribute('type', 'checkbox');
      input.setAttribute('complited', task.complited);
  
      newLi.append(input);
      newLi.append(newTask);
  
      tasklist.append(newLi);
  
    });
  }
  
  function getLastTask(tasks, callback) {
    const tasklist = JSON.parse(tasks);
    const lastIndex = tasklist.length;
    const task = tasklist[lastIndex - 1];
    callback(task);
  }
  
  window.newTask = {
    add
  };
})();