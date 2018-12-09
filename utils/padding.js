function random() {
  let rand = 1111111 - 0.5 + Math.random() * (9999999 - 1111111 + 1)
  rand = Math.round(rand);
  return rand;
}

function padding(note) {
  const task = note;
  task.complited = false;
  task.id = random();
  return task;
}

module.exports = padding;