'use strict';

(function() {
  function build(title) {
    while (document.querySelector('.task_box')) document.querySelector('.task_box').remove();

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
