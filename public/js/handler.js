'use strict';

(function() {
  function inputChange(checkbox) {
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

  function crossAppear(taskContent, cross) {
    taskContent.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;
    });
    taskContent.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;
    });
    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 0.5;
    });
    cross.addEventListener('mouseout', (evt) => {
      cross.style.opacity = 0;
    });
  }

  function crossDelete(task, taskBox, cross) {
    cross.addEventListener('click', () => {
      window.backend.expel(task.id, () => {
        taskBox.remove();
      });
    });
  }

  window.handler = {
    inputChange,
    crossAppear,
    crossDelete
  }
})();