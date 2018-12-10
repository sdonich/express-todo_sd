'use strict';

(function () {
  function add(tasks) {
    getLastTask(tasks, (task) => {
  
      let ul = document.querySelector('ul');
      let li = document.createElement('li');
      let label = document.createElement('label');
      let input = document.createElement('input');
      label.setAttribute('for', task.id);
      input.setAttribute('complited', task.complited);
  
      label.textContent = task.title;
      input.setAttribute('id', task.id);
      input.setAttribute('type', 'checkbox');
      input.setAttribute('complited', task.complited);
  
      li.append(input);
      li.append(label);
  
      ul.append(li);

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
        
        window.tasklist.moving(evt);
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