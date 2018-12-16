'use strict';

(function() {
  window.backend.buildList((tasks) => {
    tasks.forEach(task => {
      window.action.add(task);
    });
  });
})();
