const fs = require('fs');
const path = require('path');

const del = {
  tasklists(title, data) {
    
    data.splice(data.indexOf(title), 1);

    return data;
  },
  tasks(title, data) {
    let result = data.filter((task) => {
      return task.tasklist !== title;
    });
  
    return result;
  }
}

function deleteTasklist(title) {
  fs.readFile(path.resolve('data', 'tasklists.json'), (err, data) => {
    let tasklists = JSON.parse(data);

    let jsonTasklists = JSON.stringify(del.tasklists(title, tasklists));
    fs.writeFile(path.resolve('data', 'tasklists.json'), jsonTasklists, (err, data) => {
      // res?
    });

  });
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);

    let jsonTasks = JSON.stringify(del.tasks(title, tasks));
    fs.writeFile(path.resolve('data', 'tasks.json'), jsonTasks, (err, data) => {
      // res?
    });

  });

}

module.exports = deleteTasklist;