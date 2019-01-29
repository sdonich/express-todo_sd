'use strict';

(function() {
  
  function fullDataCallback(notelist) {
    notelist.forEach(note => {
      window.note.addNote(note);
    });
  
  }
  function emptyDataCallback() {
    console.log('nothing to render');
  }

  function render() {
    window.backend.notelist(fullDataCallback, emptyDataCallback);
  }

  window.notelist = {
    render
  }
})();