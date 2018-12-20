'use strict';

// work

// let title = document.querySelector('.title').textContent;
// console.log()


window.backend.titleTasklists((tasklists)=> {

  let titlesList = document.querySelector('.tasklists');

  tasklists.forEach(title => {
    let tasklistTitle = document.createElement('li');
    tasklistTitle.textContent = title;
    titlesList.append(tasklistTitle);

  });
});
// -