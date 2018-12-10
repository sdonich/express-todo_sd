'use strict';

function create(data, onLoad) {
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

function complite(complited, id) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `/complite?id=${id}&complited=${complited}`);
  xhr.send();
}

window.task = {
  create,
  complite
}
