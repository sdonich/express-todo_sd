'use strict';

(function() {
  function build(title) {
    window.backend.getTasklist(title, (tasks) => {
      window.domElement.remove('.task-box');

      tasks.forEach(task => {
        window.task.addTask(task);
      });
    }, () => {
      window.domElement.remove('.task-box');
      window.motivation.add('tasks');
    });
  }

  function add(title) {
    window.domElement.remove('.tasklists-box p');

    let tasklists = document.querySelector('.tasklists-box__tasklist-title');
    let tasklistTitleHead = document.querySelector('.tasklist-header__title');
    let tasklist = document.createElement('li');
    tasklist.classList.add('tasklists-box__tasklist-title__element');

    if (document.querySelector('.tasklists-box__tasklist-title__selected')) {
      let selectedList = document.querySelector('.tasklists-box__tasklist-title__selected');
      selectedList.classList.remove('tasklists-box__tasklist-title__selected');
    }
    tasklist.classList.add('tasklists-box__tasklist-title__selected');

    tasklist.textContent = title;
    tasklists.append(tasklist);

    tasklistTitleHead.textContent = title;

    window.tasklistToggle.tasklistClickHandler(tasklist);
  }

  window.tasklist = {
    build,
    add
  };

})();
