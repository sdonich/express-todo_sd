'use strict';


let button = document.querySelectorAll('button');

function sendData(data) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open('POST', 'http://localhost:3000/edit');



  xhr.send(data);

  


}

button.forEach((item) => {
  item.addEventListener('click', (evt) => {
    let task = evt.target.parentElement.querySelector('div');

    let edit = document.createElement('input');
    edit.classList.add('edit');
    edit.placeholder = task.textContent;
    // edit
    document.body.append(edit);
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) {
        let editTask = edit.value;
        // console.log(editTask);
        
        // console.log(typeof xx);
        let xxx = new FormData();
        xxx.append('aaaa', 'dddd');
        console.log(xxx);
        sendData(xxx);
      }
    });
    // edit();
  });
});

