'use strict';

// work

// let title = document.querySelector('.title').textContent;
// console.log()


window.backend.titleTasklists((data)=> {

  let tasklists = document.querySelector('.tasklists');

  data.forEach(title => {
    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklists.append(tasklist);

  });
});
// -