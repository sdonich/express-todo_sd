'use strict';

(function() {
  function inputChange(checkbox) {
    checkbox.addEventListener('change', (evt) => {
      let task = evt.target;
  
      if (task.checked === true) {
        task.setAttribute('complited', true);
      } else {
        task.setAttribute('complited', false);
      }
  
      const complited = task.getAttribute('complited');
      const id = task.getAttribute('id');
  
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
    });
    cross.addEventListener('mouseout', (evt) => {
      cross.style.opacity = 0;
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
    let tasklistHeadTitle = document.querySelector('.tasklist_head-title');
    tasklist.addEventListener('click', (evt) => {
      while (document.querySelector('.task_box')) {
        document.querySelector('.task_box').remove();
      }

      tasklistHeadTitle.textContent = evt.target.textContent;
      window.tasklist.build(tasklistHeadTitle.textContent);
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