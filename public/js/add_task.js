'use strict';

(function () {
  function add(tasks) {
    getLastTask(tasks, (task) => {
  
      let ul = document.querySelector('ul');
      let li = document.createElement('li');
      li.classList.add('li');

      let label = document.createElement('div');
      label.classList.add('label');

      let input = document.createElement('input');
      label.setAttribute('for', task.id);
      input.setAttribute('complited', task.complited);
  
      label.textContent = task.title;
      label.addEventListener('mouseover', (evt) => {
        let cross = evt.target.nextSibling;
        cross.style.opacity = 0.5;
  
      });
      label.addEventListener('mouseout', (evt) => {
        let cross = evt.target.nextSibling;
        cross.style.opacity = 0;
  
      });

      



      input.setAttribute('id', task.id);
      input.setAttribute('type', 'checkbox');
      input.setAttribute('complited', task.complited);

      let cross = document.createElement('div');
      cross.classList.add('cross');

      cross.addEventListener('mouseover', (evt) => {
        cross.style.opacity = 0.5;
      });
      cross.addEventListener('mouseout', (evt) => {
        cross.style.opacity = 0;
      });


  
      li.append(input);
      li.append(label);
      li.append(cross);
  
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

      cross.addEventListener('click', (evt) => {
        //  console.log(task.id);
        window.task.expel(task.id, (task) => {
          // console.log(li);
          li.remove();
        });
    
        
    
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