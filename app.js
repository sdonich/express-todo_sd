const express = require('express');
const tasklist = require('./data/tasklist.json');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');

app.post('/edit', jsonParser, (req, res) => {

  console.log(req.body);
  // req.end(data, 'utf-8', () => {
  //   console.log(data);
  // });
});


app.get('/', (req, res) => {
  res.render('mylist', { tasklist });
});

app.listen(3000, () => console.log('Server is running'));