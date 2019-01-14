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
    window.backend.editTasklist(titles);
  }

  function keydownInputFieldHandler(evt) {
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
    document.removeEventListener('keydown', keydownInputFieldHandler);
  }

  let tasklistOperation = {
    rename() {
      let tasklistTitleInputField = document.createElement('div');
      tasklistTitleInputField.classList.add('tasklist-header__input-field');
      tasklistTitleInputField.setAttribute('contenteditable', true);
      tasklistHeader.append(tasklistTitleInputField); 
      tasklistTitleInputField.focus();

      document.addEventListener('keydown', keydownInputFieldHandler);
    },
    delete() {
      // console.log(tasklistTitle.textContent);
      let tasklist = tasklistTitle.textContent;
      window.backend.deleteTasklist(tasklist);
    }
  }

  function tasklistMenuClickHandler(evt) {
    if (evt.target.tagName === 'li'.toUpperCase()) {
      resetTasklistMenu();
      tasklistMenu.removeEventListener('click', tasklistMenuClickHandler);

      let operation = evt.target.textContent;

      tasklistOperation[operation]();
    }
  }

  function resetClickMenuHandler(evt) {
    if (evt.target.closest('ul') !== tasklistMenu && evt.target !== tasklistMenuButton) {
      resetTasklistMenu();
    }
  }

  function addTasklistMenu() {
    tasklistMenu.classList.toggle('invisible');

    tasklistMenu.addEventListener('click', tasklistMenuClickHandler);
    document.addEventListener('keydown', keydownMenuHandler);
    document.addEventListener('mousedown', resetClickMenuHandler);    
  }

  function resetTasklistMenu() {
    tasklistMenu.classList.toggle('invisible');

    tasklistMenu.removeEventListener('click', tasklistMenuClickHandler);
    document.removeEventListener('keydown', keydownMenuHandler);
    document.removeEventListener('mousedown', resetClickMenuHandler);
  }

  tasklistMenuButton.addEventListener('click', () => {
    if (tasklistMenu.classList.contains('invisible')) {
      addTasklistMenu();
    } else {
      resetTasklistMenu();
    }
  });
})();



    