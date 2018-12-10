'use strict';

(function() {
  const checkbox = document.querySelectorAll('input[type="checkbox"]');

  checkbox.forEach((box) => {
    box.addEventListener('change', (evt) => {
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

  


})();

