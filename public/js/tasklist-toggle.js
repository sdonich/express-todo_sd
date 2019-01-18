'use strict';

(function() {
  function tasklistClickHandler(tasklist) {
    let tasklistTitleHead = document.querySelector('.tasklist-header__title');
    tasklist.addEventListener('click', (evt) => {
      window.domElement.remove('.task-box');

      if (document.querySelector('.tasklists-box__tasklist-title__selected')) {
        let selectedList = document.querySelector('.tasklists-box__tasklist-title__selected');
        selectedList.classList.remove('tasklists-box__tasklist-title__selected');
      }
      evt.target.classList.add('tasklists-box__tasklist-title__selected');

      tasklistTitleHead.textContent = evt.target.textContent;
      window.tasklist.build(tasklistTitleHead.textContent);
    });
  }

  window.tasklistToggle ={
    tasklistClickHandler
  }
})();