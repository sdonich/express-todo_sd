'use strict';

(function() {
  const button = document.querySelector('button');

  button.addEventListener('click', (evt) => {
  
    // создается input для новой задачи
    let edit = document.createElement('input');
    edit.classList.add('edit');
    edit.placeholder = 'Input your task';
    document.body.append(edit);
  
    // создается кнопка submit новой задачи
    let submit = document.createElement('button');
    submit.textContent = 'Ok';
    document.body.append(submit);
  
    // отправка новой задачи на сервер
    submit.addEventListener('click', (evt) => {
      evt.preventDefault();
      let task = edit.value;
      window.task.create(task, window.newTask.add);
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        let task = edit.value;
  
        window.task.create(task, window.newTask.add);
      }
    });
  
  });
})();




