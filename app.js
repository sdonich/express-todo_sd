const express = require('express');
const bodyParser = require('body-parser');
const padding = require('./utils/padding');
const fs = require('fs');
const path = require('path');
const jsonParse = bodyParser.json();
const url = require('url');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.post('/edit', jsonParse, (req, res) => {

  fs.readFile(path.resolve('data', 'tasklist.json'), (err, data) => {
    let newTasklist = JSON.parse(data);
    const newTask = padding(req.body);

    newTasklist.push(newTask);
    let jsonTasklist = JSON.stringify(newTasklist);
    fs.writeFile(path.resolve('data', 'tasklist.json'), jsonTasklist, (err) => {
      res.json(jsonTasklist);
    });
  });
});

app.get('/notes', (req, res) => {
  // console.log('hello');
  fs.readFile(path.resolve('data', 'tasklist.json'), (err, data) => {

    let tasklist = JSON.parse(data);

    // let jsonTasklist = JSON.stringify(data);
    // res.set('Content-type', 'application/json');
    res.json(tasklist);


  });
});

app.get('/complite', (req, res) => {

  const changeTask = url.parse(req.url, true).query;

  fs.readFile(path.resolve('data', 'tasklist.json'), (err, data) => {

    let tasklist = JSON.parse(data);
    tasklist.forEach(task => {

      if (task.id.toString() === changeTask.id) {
        task.complited = (changeTask.complited == 'true');
      }
    });

    let jsonTasklist = JSON.stringify(tasklist);
    
    fs.writeFile(path.resolve('data', 'tasklist.json'), jsonTasklist, (err) => {
      res.send('ok');
    });
  });
});


app.get('/', (req, res) => {

  fs.readFile(path.resolve('data', 'tasklist.json'), (err, data) => {
    let tasklist = JSON.parse(data);
    res.render('mylist', { tasklist });
  });
});

app.listen(3000, () => console.log('Server is listening'));