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

function deleteTasklist(title, callback) {
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);

    let jsonTasks = JSON.stringify(del.tasks(title, tasks));
    fs.writeFile(path.resolve('data', 'tasks.json'), jsonTasks, (err) => {
      fs.readFile(path.resolve('data', 'tasklists.json'), (err, data) => {
        let tasklists = JSON.parse(data);
        let editTasklist = del.tasklists(title, tasklists);
    
        let jsonTasklists = JSON.stringify(editTasklist);
        fs.writeFile(path.resolve('data', 'tasklists.json'), jsonTasklists, (err) => {
          callback(editTasklist);
        });
      });
    });
  });
}

module.exports = deleteTasklist;