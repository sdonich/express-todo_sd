'use strict';

(function() {
  let tasklistMenuButton = document.querySelector('.tasklist-header__edit-tasklist_button');
  let tasklistMenu = document.querySelector('.tasklist-header__edit-tasklist_menu');
  let tasklistHeader = document.querySelector('.tasklist-header');

  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      // console.log('hello');
      // clearSelection();
      // setDefaultState();
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();
      // console.log('ddd');

      // clearSelection();
      // submit();
    }

    // tasklistTitleInputField.removeEventListener('keydown', keydownHandler);

  }

  tasklistMenuButton.addEventListener('click', () => {
    tasklistMenu.classList.toggle('invisible');

    tasklistMenu.addEventListener('click', (evt)=> {
      if (evt.target.tagName === 'li'.toUpperCase()) {
        tasklistMenu.classList.toggle('invisible');

        // let tasklistOperation = evt.target.textContent;
        
        // let tasklistTitle = document.querySelector('.tasklist-header__title');
        
        // tasklistTitle.setAttribute('contenteditable', true);
        // tasklistTitle.focus();

        let tasklistTitleInputField = document.createElement('div');
        tasklistTitleInputField.classList.add('tasklist-header__input-field');
        tasklistTitleInputField.setAttribute('contenteditable', true);
        tasklistHeader.append(tasklistTitleInputField);
        tasklistTitleInputField.focus();

        document.addEventListener('keydown', keydownHandler);

      }
    });
  });
})();



    