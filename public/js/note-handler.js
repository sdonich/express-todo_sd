'use strict';

(function() {
  let template = document.querySelector('template').content;
  
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
    if (evt.target !== evt.currentTarget.querySelector('.note-box__cross')) {
      let id = evt.currentTarget.getAttribute('id');
      let header = evt.currentTarget.querySelector('.note-box__header');
      let content = evt.currentTarget.querySelector('.note-box__text');
      let noteEditor = template.querySelector('.note-box__editor-popup').cloneNode(true);
  
      let noteHeader = noteEditor.querySelector('.editor-popup__header');
      noteHeader.textContent = header.textContent;
      let noteText = noteEditor.querySelector('.editor-popup__text');
      noteText.textContent = content.textContent;
  
      document.body.prepend(noteEditor);
  
      let submitEditingButton = noteEditor.querySelector('.editor-popup__setting__submit');
      submitEditingButton.addEventListener('click', () => {
  
        let note = {
          id,
          header: noteHeader.textContent,
          content: noteText.textContent
        }
  
        window.backend.editNote(note, () => {
          header.textContent = note.header;
          content.textContent = note.content;
  
        });
  
        noteEditor.remove();
      });
    }
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