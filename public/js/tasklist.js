'use strict';

(function() {
  window.backend.buildTasklist((tasks) => {
    tasks.forEach(task => {
      window.action.add(task);
    });
  });
})();
