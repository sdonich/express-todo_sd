'use strict';


let button = document.querySelectorAll('button');

function sendData(data) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  

  xhr.open('POST', '/edit');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
  // console.log(data);
  for (let value of data.values()) {
    console.log(value);
  }
  

  xhr.send(data);

  


}
let form = document.querySelector('form');


document.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // let data = new FormData(form);
  sendData(new FormData(form));
});

button.forEach((item) => {
  item.addEventListener('click', (evt) => {
    let task = evt.target.parentElement.querySelector('div');

    // let edit = document.createElement('input');
    // edit.classList.add('edit');
    // edit.placeholder = task.textContent;
    // edit.setAttribute('name', 'key');
    // edit.setAttribute('type', 'text');
    // form.append(edit);

    // document.addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    //   // let data = new FormData(form);
    //   console.log('form');
    //   sendData(new FormData(form));
    // });

    // document.addEventListener('keydown', (evt) => {
    //   // evt.preventDefault();
    //   if (evt.keyCode === 13) {
    //     evt.preventDefault();
    //     // console.log(editTask);
        
    //     // console.log(typeof xx);
    //     // let data = new FormData(form);
        
    //     sendData(new FormData(form));
    //   }
    // });
    // edit();
  });
});

