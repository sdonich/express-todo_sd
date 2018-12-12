'use strict';

(function() {
  const button = document.querySelector('button');

  function createButtonHandler(evt) {
    // создается input для новой задачи
    let edit = document.createElement('input');
    edit.classList.add('edit');
    edit.placeholder = 'Input your task';
    document.body.append(edit);
  
    // создается кнопка submit новой задачи
    let submit = document.createElement('button');
    submit.classList.add('ok_button');
    submit.textContent = 'Ok';
    document.body.append(submit);
  
    // отправка новой задачи на сервер
    submit.addEventListener('click', submitHandler);
    // document.addEventListener('keydown', (evt) => {
    //   if (evt.keyCode === 13) {
    //     evt.preventDefault();
    //     let edit = document.querySelector('.edit');
    //     let submit = document.querySelector('button');
    //     let task = edit.value;
  
    //     window.task.create(task, window.newTask.add);
    //     submit.remove();
      
    //     edit.remove();
    //     button.addEventListener('click', createButtonHandler);

    //   }
      
    // });
    document.addEventListener('keydown', keydownHandler);



    button.removeEventListener('click', createButtonHandler);

  }

  function submitHandler(evt) {
    evt.preventDefault();
      let edit = document.querySelector('.edit');
      let submit = document.querySelector('.ok_button');

      let task = edit.value;

      window.task.create(task, window.newTask.add);
      submit.remove();
      edit.remove();
      
      button.addEventListener('click', createButtonHandler);
      document.removeEventListener('keydown', keydownHandler);
      submit.removeEventListener('click', submitHandler);
  }

  function keydownHandler(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      let edit = document.querySelector('.edit');
      let submit = document.querySelector('.ok_button');
      let task = edit.value;

      window.task.create(task, window.newTask.add);
      submit.remove();
    
      edit.remove();
      document.removeEventListener('keydown', keydownHandler);


      button.addEventListener('click', createButtonHandler);

    }
  }

  button.addEventListener('click', createButtonHandler);
})();




