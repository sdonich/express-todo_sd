'use strict';

(function() {
  const createButton = document.querySelector('.create_button');

  function createButtonHandler() {
    // создаем поле ввода новой задачи
    let enterField = document.createElement('input');
    enterField.classList.add('enter_field');
    enterField.placeholder = 'Input your task';
    document.body.append(enterField);

    // создаем кнопку "Ок"
    let submit = document.createElement('button');
    submit.classList.add('ok_button');
    submit.textContent = 'Ok';
    document.body.append(submit);
  
    // вешаем обработчики на подтверждение создания новой задачи
    submit.addEventListener('click', submitHandler);
    document.addEventListener('keydown', keydownHandler);

    createButton.removeEventListener('click', createButtonHandler);
  }

  function submitHandler(evt) {
    evt.preventDefault();
    let enterField = document.querySelector('.enter_field');
    let submit = document.querySelector('.ok_button');

    let task = enterField.value;
    window.backend.create(task, window.action.add);

    submit.remove();
    enterField.remove();
    
    // удаляем лишние обработчики в вешаем обработчик на кнопку createButton
    document.removeEventListener('keydown', keydownHandler);
    createButton.addEventListener('click', createButtonHandler);
  }

  function keydownHandler(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      let enterField = document.querySelector('.enter_field');
      let submit = document.querySelector('.ok_button');

      let task = enterField.value;
      window.backend.create(task, window.action.add);

      submit.remove();
      enterField.remove();

      // удаляем лишние обработчики в вешаем обработчик на кнопку createButton
      document.removeEventListener('keydown', keydownHandler);
      createButton.addEventListener('click', createButtonHandler);
    }
  }

  createButton.addEventListener('click', createButtonHandler);
})();




