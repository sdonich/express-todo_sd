const fs = require('fs');
const path = require('path');

const edit = {
  tasklists(titles, data) {
      data.forEach((elem, i) => {
        if (elem === titles.previous) {
          data[i] = titles.new;
        } 
    });

    return data;
  },
  tasks(titles, data) {
    data.forEach((elem, i) => {
      if (data[i].tasklist === titles.previous) {
        data[i].tasklist = titles.new;
      } 
    });
  
    return data;
  }
}

function editTitle(titles, filename) {
  fs.readFile(path.resolve('data', `${filename}.json`), (err, data) => {
    let parseData = JSON.parse(data);
    let result = edit[filename](titles, parseData);
    let jsonResult = JSON.stringify(result);

    fs.writeFile(path.resolve('data', `${filename}.json`), jsonResult, (err) => {});
  });
}

module.exports = editTitle;





