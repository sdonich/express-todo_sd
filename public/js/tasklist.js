'use strict';

(function() {
  function build(title) {
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
