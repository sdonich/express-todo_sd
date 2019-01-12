'use strict';

(function() {
  let tasklistMenuButton = document.querySelector('.tasklist-header__edit-tasklist_button');
  let tasklistMenu = document.querySelector('.tasklist-header__edit-tasklist_menu');
  let tasklistHeader = document.querySelector('.tasklist-header');
  let tasklistTitle = document.querySelector('.tasklist-header__title');

  function submit(evt) {
    let titles = {
      new: evt.target.textContent,
      previous: tasklistTitle.textContent
    };


    window.backend.editTitle(titles);
    // console.log(newTitle);
    // console.log(previousTitle);


  }

  function keydownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      // console.log('hello');
      // clearSelection();
      setDefaultState();
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();
      // console.log(evt.target);
      
      // console.log('ddd');

      // clearSelection();
      submit(evt);
      setDefaultState();
      
    }

    // tasklistTitleInputField.removeEventListener('keydown', keydownHandler);

  }

  function setDefaultState() {
    document.querySelector('.tasklist-header__input-field').remove();

    document.removeEventListener('keydown', keydownHandler);

  }

  function tasklistMenuClickHandler(evt) {
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
      tasklistMenu.removeEventListener('click', tasklistMenuClickHandler);

    }


    
  }

  tasklistMenuButton.addEventListener('click', () => {
    tasklistMenu.classList.toggle('invisible');

    tasklistMenu.addEventListener('click', tasklistMenuClickHandler);
   
  });




})();



    