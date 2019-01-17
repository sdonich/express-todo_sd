'use strict';

(function() {
  function build(title) {
    window.domElement.remove('.task-box');

    window.backend.getTasklist(title, (tasks) => {
      tasks.forEach(task => {
        window.action.add(task);
      });
    });
  }

  window.tasklist = {
    build
  };

})();
