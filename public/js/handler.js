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

  function editContent(taskContent) {
    let prieviousContent = '';

    function taskContentClickHandler(evt) {
      prieviousContent = evt.target.textContent;

      document.addEventListener('keydown', submitHandler);
      document.addEventListener('keydown', resetHandler);
      evt.target.removeEventListener('click', taskContentClickHandler);
    }


    function resetHandler(evt) {
      if (evt.keyCode === 27) {
        taskContent.blur();
        taskContent.textContent = prieviousContent;
        document.removeEventListener('keydown', resetHandler);
        document.removeEventListener('keydown', submitHandler);
        taskContent.addEventListener('click', taskContentClickHandler);
      }
    }

    function submitHandler(evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        evt.target.blur();
        const checkboxSibling = evt.target.previousSibling;
        const id = checkboxSibling.getAttribute('id');
        const content = evt.target.textContent;

        window.backend.edit( {id, title: content} );
        document.removeEventListener('keydown', submitHandler);
        document.addEventListener('keydown', resetHandler);

        taskContent.addEventListener('click', taskContentClickHandler);
      }
    }

    taskContent.addEventListener('click', taskContentClickHandler);
  }

  window.handler = {
    inputChange,
    crossAppear,
    crossDelete,
    editContent
  }
})();