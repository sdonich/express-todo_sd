'use strict';

window.sendData = function(data, onLoad) {
  const task = { title: data };

  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/edit');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(JSON.stringify( task ));

  xhr.addEventListener('load', function () {
    onLoad(xhr.response);
  });
}

