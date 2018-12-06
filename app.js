const express = require('express');
const tasklist = require('./data/tasklist.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const jsonParser = bodyParser.json();
const app = express();

// const urlencodedParser = bodyParser.urlencoded({extended: false});
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');

app.post('/edit', jsonParser, (req, res) => {

  console.log(req.body.key);
  // let task = {};
  // task.title = req.body.key;
  // fs.readFile(path.resolve('data', 'tasklist.json'), (err, data) => {
  //   // console.log(data);
  //   let json = JSON.parse(data);
  //   json.push(task);
  //   console.log(json);
  //   const xxx = JSON.stringify(json);
  //   fs.writeFile(path.resolve('data', 'tasklist.json'), xxx, (err) => {
  //     // console.log(tasklist);
  //     if (err) console.log('f');
  //   });

  // });
  res.render('mylist', { tasklist });
  // res.resume();
  // req.end(data, 'utf-8', () => {
  //   console.log(data);
  // });
});


app.get('/', (req, res) => {
  res.render('mylist', { tasklist });
});

app.listen(3000, () => console.log('Server is running'));