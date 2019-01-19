'use strict';

(function() {
  function checkTask(checkbox) {
    checkbox.addEventListener('click', (evt) => {
      let check = checkbox.getAttribute('checked');
  
      if (check === 'true') {
        checkbox.setAttribute('checked', false);
        checkbox.setAttribute('complited', false);
      } 
      if (check === 'false') {
        checkbox.setAttribute('checked', true);
        checkbox.setAttribute('complited', true);
      }
  
      const complited = checkbox.getAttribute('complited');
      const id = checkbox.getAttribute('id');
  
      window.backend.complite(complited, id);
      moving(evt);
    });
  }

  function crossAppear(taskContent, cross) {
    taskContent.addEventListener('mouseover', () => {
      cross.style.opacity = 0.5;
    });
    taskContent.addEventListener('mouseout', () => {
      cross.style.opacity = 0;
    });
    cross.addEventListener('mouseover', () => {
      cross.style.opacity = 1;
      taskContent.style.color = 'red';
    });
    cross.addEventListener('mouseout', () => {
      cross.style.opacity = 0;
      taskContent.style.color = 'black';
    });
  }

  function crossDelete(task, taskBox, cross) {
    cross.addEventListener('click', () => {
      window.backend.deleteTask(task.id, () => {
        taskBox.remove();
      });
    });
  }

  let prieviousContent = '';
  function taskContentClickHandler(evt) {
    prieviousContent = evt.target.textContent;
    evt.target.setAttribute('status', 'editing');

    document.addEventListener('keydown', keydownEditHandler);
    document.addEventListener('click', clickSubmit);
    evt.target.removeEventListener('click', taskContentClickHandler);
  }

  function keydownEditHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      resetEditTask();
    }
    if (evt.keyCode === 13) {
      evt.preventDefault();
      submitEditTask();
    }
  }

  function submitEditTask() {
    const editingTask = document.querySelector('div[status="editing"]');
    const checkboxSibling = editingTask.previousSibling;
    const id = checkboxSibling.getAttribute('id');
    const content = editingTask.textContent || '-';
    editingTask.blur();

    window.backend.edit( {id, content} );
    
    document.removeEventListener('click', clickSubmit);
    document.removeEventListener('keydown', keydownEditHandler);
    editingTask.addEventListener('click', taskContentClickHandler);

    editingTask.removeAttribute('status', 'editing');
  }
  
  function clickSubmit(evt) {
    if (evt.target !== document.querySelector('div[status="editing"]')) {
      submitEditTask();
    }
  }

  function resetEditTask() {
    const editingTask = document.querySelector('div[status="editing"]');

    editingTask.blur();
    editingTask.textContent = prieviousContent;
    document.removeEventListener('keydown', keydownEditHandler);

    document.removeEventListener('click', clickSubmit);
    editingTask.addEventListener('click', taskContentClickHandler);
    editingTask.removeAttribute('status', 'editing');
  }

  function editContent(taskContent) {
    taskContent.addEventListener('click', taskContentClickHandler);
  }

  function moving(evt) {
    let notDone = document.querySelector('.tasks_not-done');
    let done = document.querySelector('.tasks_done');
  
    let taskBox = evt.target.parentElement;
    let parent = taskBox.parentElement;
    let copy = parent.removeChild(taskBox);
    
    if (parent === notDone) {
      done.append(copy);
    } else {
      notDone.append(copy);
    }
  }

  window.taskHandler = {
    checkTask,
    crossAppear,
    crossDelete,
    editContent
  }
})();