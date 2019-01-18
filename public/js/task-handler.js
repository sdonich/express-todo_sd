'use strict';

(function() {
  function inputChange(checkbox) {
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
    taskContent.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;
    });
    taskContent.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;
    });
    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 1;

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
    inputChange,
    crossAppear,
    crossDelete,
    editContent
  }
})();