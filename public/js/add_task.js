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

      input.addEventListener('change', (evt) => {
        let task = evt.target;

        if (task.checked === true) {
          task.setAttribute('complited', true);
        }
        if (task.checked === false) {
          task.setAttribute('complited', false);
        }
  
        const complited = task.getAttribute('complited');
        const id = task.getAttribute('id');
  
        window.task.complite(complited, id);        
      });

  
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