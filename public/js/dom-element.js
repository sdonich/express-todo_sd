'use strict';

(function() {
  function remove(selector) {
    while (document.querySelector(selector)) {
      document.querySelector(selector).remove();
    }
  }

  window.domElement = {
    remove
  }
})();



