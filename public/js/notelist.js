'use strict';

(function() {
  
  function fullDataCallback(notelist) {
    notelist.forEach(note => {
      window.note.addNote(note);
    });
  
  }
  function emptyDataCallback() {
    window.motivation.add('notes');
  }

  function render() {
    window.backend.notelist(fullDataCallback, emptyDataCallback);
  }

  window.notelist = {
    render
  }
})();