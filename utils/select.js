function select(tasks, tasklist) {
  let result = [];

  tasks.forEach(task => {
    if (task.tasklist === tasklist.title) {
      result.push(task);
    }
  });

  return result;
}

module.exports = select;
