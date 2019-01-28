const express = require('express');
const fs = require('fs');
const path = require('path');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();

const {padding, edit, select, editTasklist, deleteTasklist} = require('./utils/index');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.post('/add', jsonParse, (req, res) => {
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let newTasks = JSON.parse(data);
    const newTask = padding.task(req.body);
    newTasks.push(newTask);

    fs.writeFile(path.resolve('data', 'tasks.json'), JSON.stringify(newTasks), (err) => {
      res.json(newTasks);
    });
  });
});

app.post('/edit', jsonParse, (req, res) => {
  let editTask = req.body;
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    let newTasks = edit(editTask, tasks);

    fs.writeFile(path.resolve('data', 'tasks.json'), JSON.stringify(newTasks), (err) => {
      res.send();
    });
  });
});

app.get('/tasks', (req, res) => {
  const selectedTasklist = url.parse(req.url, true).query;

  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    let selectedTasks = select(tasks, selectedTasklist);
    res.json(selectedTasks);
  });
});

app.get('/complite', (req, res) => {
  const changeTask = url.parse(req.url, true).query;

  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    tasks.forEach(task => {
      if (task.id.toString() === changeTask.id) {
        task.complited = (changeTask.complited == 'true');
      }
    });

    let jsonTasks = JSON.stringify(tasks);
    fs.writeFile(path.resolve('data', 'tasks.json'), jsonTasks, (err) => {
      res.send();
    });
  });
});

app.get('/deleteTask', (req, res) => {
  const deleteTaskId = url.parse(req.url, true).query;

  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    tasks.forEach((task, i) => {
      if (task.id == deleteTaskId.id) {
        tasks.splice(i, 1);
      }
    });

    let jsonTasks = JSON.stringify(tasks);
    fs.writeFile(path.resolve('data', 'tasks.json'), jsonTasks, (err) => {
      res.send();
    });
  });
});

app.get('/tasklists', (req, res) => {
  fs.readFile(path.resolve('data', 'tasklists.json'), (err, data) => {
    let tasklists = JSON.parse(data);
    res.json(tasklists); 
  });
});

app.post('/addTasklist', jsonParse, (req, res) => {
  fs.readFile(path.resolve('data', 'tasklists.json'), (err, data) => {
    let tasklists = JSON.parse(data);
    tasklists.push(req.body.title);

    let jsonTasklists = JSON.stringify(tasklists);
    fs.writeFile(path.resolve('data', 'tasklists.json'), jsonTasklists, (err) => {
      res.send();
    });
  });
});

app.post('/editTasklist', jsonParse, (req, res) => {
  editTasklist(req.body, 'tasklists');
  editTasklist(req.body, 'tasks');

  res.send();
});

app.post('/deleteTasklist', jsonParse, (req, res) => {
  deleteTasklist(req.body.tasklist, (tasklists) => {
    res.json(tasklists);
  });
});

app.get('/notelist', (req, res) => {
  fs.readFile(path.resolve('data', 'notelist.json'), (err, data) => {
    let notelist = JSON.parse(data);
    res.json(notelist);
  });
});

app.post('/addnote', jsonParse, (req, res) => {
  fs.readFile(path.resolve('data', 'notelist.json'), (err, data) => {
    let notelist = JSON.parse(data);
    // const newTask = padding(req.body);
    // newTasks.push(newTask);
    const newNote = padding.note(req.body);


    // fs.writeFile(path.resolve('data', 'notelist.json'), JSON.stringify(), (err) => {
    //   res.json();
    // });
  });
});

app.get('/', (req, res) => {
  fs.readFile(path.resolve('data', 'tasklists.json'), (err, data) => {
    let tasklists = JSON.parse(data);
    res.render('home', { title: tasklists[0] });
  });
});

app.listen(3000, () => console.log('Server is listening'));