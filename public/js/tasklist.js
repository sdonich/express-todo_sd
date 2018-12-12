'use strict';

(function() {
  function add(onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/notes`);
    xhr.responseType = 'json';
    xhr.send();
  
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    })
  
  }
  
  function render(task, handler) {
    let notDone = document.querySelector('.not_done');
    let done = document.querySelector('.done');    

    let li = document.createElement('li');
    li.classList.add('li');

    let label = document.createElement('div');
    label.classList.add('label');
    let input = document.createElement('input');
    input.setAttribute('complited', task.complited);
  
    label.textContent = task.title;

    label.addEventListener('mouseover', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0.5;

    });
    label.addEventListener('mouseout', (evt) => {
      let cross = evt.target.nextSibling;
      cross.style.opacity = 0;

    });

    
    input.setAttribute('id', task.id);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('complited', task.complited);

    let cross = document.createElement('div');
    cross.classList.add('cross');

    cross.addEventListener('mouseover', (evt) => {
      cross.style.opacity = 0.5;
    });
    cross.addEventListener('mouseout', (evt) => {
      cross.style.opacity = 0;
    });
  
      
  
    li.append(input);
    li.append(label);
    li.append(cross);
  
    // tasklist.append(newLi);
    if (task.complited) {
      input.checked = true;
      done.append(li);
    } 
    if (task.complited === false) {
      notDone.append(li);
      // console.log('hello');
    }

   handler(input);
  
   cross.addEventListener('click', (evt) => {
    //  console.log(task.id);
    window.task.expel(task.id, (task) => {
      // console.log(li);
      li.remove();
    });

    

   });
  

  }
  
  add((tasks) => {
    tasks.forEach(task => {
      render(task, inputChangeHandler);
    });
  });

  function inputChangeHandler(input) {
    // debugger;

    input.addEventListener('change', (evt) => {
      let task = evt.target;
  
      if (task.checked === true) {
        task.setAttribute('complited', true);
      }
      if (task.checked === false) {
        task.setAttribute('complited', false);
      }
  
      const complited = task.getAttribute('complited');
      const id = task.getAttribute('id');
  
      window.task.complite(complited, id);

      //clear
      // console.log(evt.target.parentElement.parentElement);
      moving(evt);


      
      // if (li.parentElement === done) {
        
      //   let copy = li.parentElement.removeChild(li);
      //   notDone.append(copy);

      // }

      // while (notDone.lastChild) {
      //   console.log('hello');
      //   notDone.removeChild(notDone.lastChild);
      // }

      // while (done.lastChild) {
      //   console.log('hi');

      //   done.removeChild(done.lastChild);
      // }  
      
      

    });
  }

  function moving(evt) {
    let notDone = document.querySelector('.not_done');
      let done = document.querySelector('.done'); 

      let li = evt.target.parentElement;
      let parent = li.parentElement;
      // let copy = li.parentElement.removeChild(li);
      // console.log(copy);
      let copy = li.parentElement.removeChild(li);
      if (parent === notDone) {
        
        done.append(copy);

      } else {
        notDone.append(copy);
      }
  }

  
  window.tasklist = {
    moving
  };

})();

