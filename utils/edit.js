function edit(editTask, tasks) {
  tasks.forEach(task => {
    if (task.id == editTask.id) {
      task.content = editTask.content;
    }
  });

  return tasks;
}

module.exports = edit;