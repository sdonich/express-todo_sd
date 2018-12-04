const express = require('express');
const tasklist = require('./data/tasklist.json');
const app = express();


app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('mylist', {tasklist});
});

app.listen(3000, () => console.log('Server is running'));