'use strict';

(function() {
  function inputChange(checkbox) {
    checkbox.addEventListener('click', (evt) => {
      // let task = evt.target;
      // console.log('heldddd');
      let check = checkbox.getAttribute('checked');
      // console.log(check);
      // console.log(true);
  
      // if (task.checked === true) {
      if (check === 'true') {
        console.log('hel');

        checkbox.setAttribute('checked', false);
        checkbox.setAttribute('complited', false);

      } 
      if (check === 'false') {
        console.log('hel2');

        checkbox.setAttribute('checked', true);
        checkbox.setAttribute('complited', true);
      }
  
      const complited = checkbox.getAttribute('complited');
      const id = checkbox.getAttribute('id');
  
      window.backend.complite(complited, id);
      window.action.moving(evt);
    });
  }

  function crossAppear(taskContent, cross) {
    taskContent.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;
    });
    taskContent.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;
    });
    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 0.5;

      let textContent = evt.target.previousSibling;
      textContent.style.color = 'red';
    });
    cross.addEventListener('mouseout', (evt) => {
      cross.style.opacity = 0;
      
      let textContent = evt.target.previousSibling;
      textContent.style.color = 'black';
    });
  }

  function crossDelete(task, taskBox, cross) {
    cross.addEventListener('click', () => {
      window.backend.expel(task.id, () => {
        taskBox.remove();
      });
    });
  }

  // обработка редактирования задачи
  let prieviousContent = '';
  function taskContentClickHandler(evt) {
    prieviousContent = evt.target.textContent;
    evt.target.setAttribute('status', 'editing');

    document.addEventListener('keydown', enterSubmit);
    document.addEventListener('keydown', resetHandler);
    document.addEventListener('click', clickSubmit);
    evt.target.removeEventListener('click', taskContentClickHandler);
  }

  function submit(evt) {
    evt.preventDefault();

    const editingTask = document.querySelector('div[status="editing"]');
    const checkboxSibling = editingTask.previousSibling;
    const id = checkboxSibling.getAttribute('id');
    const content = editingTask.textContent || '-';
    editingTask.blur();

    window.backend.edit( {id, content} );
    
    document.removeEventListener('keydown', enterSubmit);
    document.removeEventListener('click', clickSubmit);
    document.removeEventListener('keydown', resetHandler);
    editingTask.addEventListener('click', taskContentClickHandler);

    editingTask.removeAttribute('status', 'editing');
  }
  
  function clickSubmit(evt) {
    if (evt.target !== document.querySelector('div[status="editing"]')) {
      submit(evt);
    }
  }

  function resetHandler(evt) {
    const editingTask = document.querySelector('div[status="editing"]');

    if (evt.keyCode === 27) {
      evt.preventDefault();
      editingTask.blur();
      editingTask.textContent = prieviousContent;
      document.removeEventListener('keydown', resetHandler);
      document.removeEventListener('keydown', enterSubmit);
      document.removeEventListener('click', clickSubmit);
      editingTask.addEventListener('click', taskContentClickHandler);

      editingTask.removeAttribute('status', 'editing');
    }
  }

  function enterSubmit(evt) {
    if (evt.keyCode === 13) {
      submit(evt);
    }
  }

  function editContent(taskContent) {
    taskContent.addEventListener('click', taskContentClickHandler);
  }

  function tasklistClickHandler(tasklist) {
    let tasklistTitleHead = document.querySelector('.tasklist-header__title');
    tasklist.addEventListener('click', (evt) => {
      while (document.querySelector('.task-box')) {
        document.querySelector('.task-box').remove();
      }

      tasklistTitleHead.textContent = evt.target.textContent;
      window.tasklist.build(tasklistTitleHead.textContent);
    });
  }

  window.handler = {
    inputChange,
    crossAppear,
    crossDelete,
    editContent,
    tasklistClickHandler
  }
})();