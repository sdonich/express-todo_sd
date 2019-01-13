'use strict';

(function() {
  let tasklistMenuButton = document.querySelector('.tasklist-header__edit-tasklist_button');
  let tasklistMenu = document.querySelector('.tasklist-header__edit-tasklist_menu');
  let tasklistHeader = document.querySelector('.tasklist-header');
  let tasklistTitle = document.querySelector('.tasklist-header__title');

  function renameTitle(titles) {
    let tasklists = document.querySelectorAll('.tasklists-box__tasklist-title li');

    tasklists.forEach((elem) => {
      if (elem.textContent === titles.previous) {
        elem.textContent = titles.new;
      }      
    });

    tasklistTitle.textContent = titles.new;
  }

  function submit(evt) {
    let titles = {
      new: evt.target.textContent,
      previous: tasklistTitle.textContent
    };

    renameTitle(titles);
    window.backend.editTitle(titles);
  }

  function keydownInputFiledHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setDefaultState();
    }
  
    if (evt.keyCode === 13) {
      evt.preventDefault();
      submit(evt);
      setDefaultState();
    }
  }

  function keydownMenuHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      resetTasklistMenu();
    }
  }

  function setDefaultState() {
    document.querySelector('.tasklist-header__input-field').remove();
  }

  function tasklistMenuClickHandler(evt) {
    if (evt.target.tagName === 'li'.toUpperCase()) {
      resetTasklistMenu();

      let tasklistTitleInputField = document.createElement('div');
      tasklistTitleInputField.classList.add('tasklist-header__input-field');
      tasklistTitleInputField.setAttribute('contenteditable', true);
      tasklistHeader.append(tasklistTitleInputField); 
      tasklistTitleInputField.focus();

      tasklistTitleInputField.addEventListener('keydown', keydownInputFiledHandler);
      tasklistMenu.removeEventListener('click', tasklistMenuClickHandler);
    }
  }

  function resetClickMenuHandler(evt) {
    if (evt.target.closest('ul') !== tasklistMenu) {
      resetTasklistMenu();
    }
  }

  function resetTasklistMenu() {
    tasklistMenu.classList.toggle('invisible');

    tasklistMenu.removeEventListener('click', tasklistMenuClickHandler);
    document.removeEventListener('keydown', keydownMenuHandler);
    document.removeEventListener('mousedown', resetClickMenuHandler);
  }

  tasklistMenuButton.addEventListener('click', () => {
    if (tasklistMenu.classList.contains('invisible')) {
      tasklistMenu.classList.toggle('invisible');

      tasklistMenu.addEventListener('click', tasklistMenuClickHandler);
      document.addEventListener('keydown', keydownMenuHandler);
      document.addEventListener('mousedown', resetClickMenuHandler);

    } else {
      resetTasklistMenu();
    }
  });
})();



    