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

  function getNoteData() {
    let noteEditor = document.querySelector('.note-box__editor-popup');

    return {
      id: noteEditor.getAttribute('id'),
      header: noteEditor.querySelector('.editor-popup__header').textContent,
      content: noteEditor.querySelector('.editor-popup__text').textContent
    }
  }

  function setDefaultState() {
    document.querySelector('.note-box__editor-popup').remove();
    window.domElement.remove('.substrate');
    document.removeEventListener('keydown', resetEditNote);
    document.removeEventListener('mousedown', submitMousedownHandler);
  }

  function noteBoxClickHandler(evt) {
    if (evt.target !== evt.currentTarget.querySelector('.note-box__cross')) {
      window.substrate.place();

      let id = evt.currentTarget.getAttribute('id');
      let header = evt.currentTarget.querySelector('.note-box__header');
      let content = evt.currentTarget.querySelector('.note-box__text');
      let noteEditor = template.querySelector('.note-box__editor-popup').cloneNode(true);
      noteEditor.setAttribute('id', id);
  
      let noteHeader = noteEditor.querySelector('.editor-popup__header');
      noteHeader.textContent = header.textContent;
      noteHeader.setAttribute('color', header.getAttribute('color'));
      let noteText = noteEditor.querySelector('.editor-popup__text');
      noteText.textContent = content.textContent;
  
      document.body.prepend(noteEditor);
      noteText.focus();
      window.getSelection().collapse(noteText.firstChild, noteText.firstChild.length);

      let submitButton = noteEditor.querySelector('.editor-popup__setting__submit');
      submitButton.addEventListener('click', submitNoteEdit);
      document.addEventListener('keydown', resetEditNote);
      document.addEventListener('mousedown', submitMousedownHandler);
    }
  }

  function submitMousedownHandler(evt) {
    if (evt.target === document.querySelector('.substrate')) {
      submitNoteEdit();
    }
  }

  function submitNoteEdit() {
    window.backend.editNote(getNoteData(), () => {
      let editNote = getNoteData();
      let notes = document.querySelectorAll('.note-box');
      notes.forEach((note) => {
        if (note.getAttribute('id') === editNote.id) {
          note.querySelector('.note-box__header').textContent = editNote.header;
          note.querySelector('.note-box__text').textContent = editNote.content;
        }
      });

      setDefaultState();
    });
  }


  function resetEditNote(evt) {
    if (evt.keyCode === 27) {
      setDefaultState();
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