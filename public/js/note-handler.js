'use strict';

(function() {
  function crossAppear(noteBox, noteHeader, noteText, cross) {
    noteText.addEventListener('mouseover', () => {
      cross.style.opacity = 0.5;
    });
    noteText.addEventListener('mouseout', () => {
      cross.style.opacity = 0;
    });
    noteHeader.addEventListener('mouseover', () => {
      cross.style.opacity = 0.5;
    });
    noteHeader.addEventListener('mouseout', () => {
      cross.style.opacity = 0;
    });

    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 1;
      noteBox.style.color = 'red';
    });
    cross.addEventListener('mouseout', () => {
      cross.style.opacity = 0;
      noteBox.style.color = 'black';
    });
  }

  function crossDelete(cross, noteBox) {
    cross.addEventListener('click', () => {
      let noteId = noteBox.getAttribute('id');
      window.backend.deleteNote(noteId, () => {
        noteBox.remove();

        if (!document.querySelector('.note-box')) {
          window.motivation.add('notes');
        }
      });

    }); 
  }

  function noteBoxClickHandler(evt) {
    let id = evt.currentTarget.getAttribute('id');
    let header = evt.currentTarget.querySelector('.note-box__header').textContent;
    let content = evt.currentTarget.querySelector('.note-box__text').textContent;
    console.log(header);
    console.log(content);
    console.log(id);

  }

  function editContent(noteBox) {
    noteBox.addEventListener('click', noteBoxClickHandler);
  }

  function setHandlers(noteBox, noteHeader, noteText, cross) {
    crossAppear(noteBox, noteHeader, noteText, cross);
    crossDelete(cross, noteBox);
    editContent(noteBox);
  }

  window.noteHandler = {
    setHandlers
  }
})();