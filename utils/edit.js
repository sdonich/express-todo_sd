function edit(editTask, tasklist) {
  tasklist.forEach(task => {
    if (task.id == editTask.id) {
      task.title = editTask.title;
    }
  });

  return tasklist;
}

module.exports = edit;