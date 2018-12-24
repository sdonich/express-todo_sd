const express = require('express');
const bodyParser = require('body-parser');
const padding = require('./utils/padding');
const fs = require('fs');
const path = require('path');
const jsonParse = bodyParser.json();
const url = require('url');
const edit = require('./utils/edit');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.post('/add', jsonParse, (req, res) => {
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let newTasks = JSON.parse(data);
    const newTask = padding(req.body);
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
      res.send('ok');

    });
  });
});

app.get('/tasks', (req, res) => {
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    res.json(tasks);
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
      res.send('ok');
    });
  });
});

app.get('/expel', (req, res) => {
  const expelTaskId = url.parse(req.url, true).query;

  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    tasks.forEach((task, i) => {
      if (task.id == expelTaskId.id) {
        tasks.splice(i, 1);
      }
    });

    let jsonTasks = JSON.stringify(tasks);
    fs.writeFile(path.resolve('data', 'tasks.json'), jsonTasks, (err) => {
      res.send('ok');
    });
  });
});

// work

app.get('/tasklists', (req, res) => {
  fs.readFile(path.resolve('data', 'tasklists.json'), (err, data) => {
    let tasklists = JSON.parse(data);
    res.json(tasklists); 
  });
});

//-

app.get('/', (req, res) => {
  fs.readFile(path.resolve('data', 'tasks.json'), (err, data) => {
    let tasks = JSON.parse(data);
    res.render('home', { tasks });
  });
});

app.listen(3000, () => console.log('Server is listening'));