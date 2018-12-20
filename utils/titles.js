// work

function titles(tasklist) {
  let result = [];
  let unique = {};
  tasklist.forEach(task => {
    let title = task.tasklist;
    if (unique[title] !== 1) {
      unique[title] = 1;
      result.push(title);
    } 
  });

  return result;
}

module.exports = titles;
// -