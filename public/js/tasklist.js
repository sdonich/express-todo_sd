'use strict';

(function() {
  function build(title) {
    while (document.querySelector('.task-box')) document.querySelector('.task-box').remove();

    window.backend.buildTasklist(title, (tasks) => {
      tasks.forEach(task => {
        window.action.add(task);
      });
    });
  }

  window.tasklist = {
    build
  };

})();
