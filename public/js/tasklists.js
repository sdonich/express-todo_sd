'use strict';

window.backend.tasklists((data)=> {
  let tasklists = document.querySelector('.tasklists');
  let tasklistTitle = document.querySelector('.tasklist-title');


  data.forEach(title => {
    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklists.append(tasklist);

    tasklist.addEventListener('click', (evt) => {
      while (document.querySelector('.taskBox')) {
        document.querySelector('.taskBox').remove();
      }

      tasklistTitle.textContent = evt.target.textContent;
      window.tasklist.build(tasklistTitle.textContent);
    });

  });

  let selectedTasklist = tasklists.firstChild;
  let title = selectedTasklist.textContent;
  tasklistTitle.textContent = title;

  window.tasklist.build(title);
});