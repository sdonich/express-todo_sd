'use strict';


let button = document.querySelectorAll('button');

function sendData(data) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  

  xhr.open('POST', 'http://localhost:3000/edit');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // console.log(data);
  

  xhr.send(data);

  


}

button.forEach((item) => {
  item.addEventListener('click', (evt) => {
    let task = evt.target.parentElement.querySelector('div');

    let edit = document.createElement('input');
    let form = document.querySelector('form');
    edit.classList.add('edit');
    edit.placeholder = task.textContent;
    edit.setAttribute('name', 'key');
    edit.setAttribute('type', 'text');
    form.append(edit);

    document.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(form);
      let data = new FormData(form);
        
      sendData(data);
    });

    document.addEventListener('keydown', (evt) => {
      // evt.preventDefault();
      if (evt.keyCode === 13) {
        evt.preventDefault();
        // console.log(editTask);
        
        // console.log(typeof xx);
        let data = new FormData(form);
        
        sendData(data);
      }
    });
    // edit();
  });
});

