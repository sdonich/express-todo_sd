'use strict';

(function() {
  const checkbox = document.querySelectorAll('input[type="checkbox"]');

  checkbox.forEach((box) => {
    box.addEventListener('change', (evt) => {
      let task = evt.target;

      if (task.checked === true) {
        task.setAttribute('complited', true);
      }
      if (task.checked === false) {
        task.setAttribute('complited', false);
      }

      const complited = task.getAttribute('complited');
      const id = task.getAttribute('id');

      sendData(complited, id);




    });
  });

  function sendData(complited, id) {
    
    // console.log(task);
    // console.log(id);



    let xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';
    // xhr.open('GET', `/complite?id=${id}&complited=${complited}`);
    // xhr.open('GET', `/complite`);
    xhr.open('GET', `/complite?id=${id}&complited=${complited}`);


  
    xhr.send();
  
    // xhr.addEventListener('load', function () {
    //   onLoad(xhr.response);
    // });    
    
  }



})();

