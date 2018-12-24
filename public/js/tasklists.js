'use strict';

// work


window.backend.tasklists((data)=> {

  let tasklists = document.querySelector('.tasklists');

  data.forEach(title => {
    let tasklist = document.createElement('li');
    tasklist.textContent = title;
    tasklists.append(tasklist);

  });
});
// -