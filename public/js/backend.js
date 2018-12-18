'use strict';

(function() {
  function create(data, onLoad) {
    const task = { title: data };
    
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', '/add');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( task ));
  
    xhr.addEventListener('load', function () {
      let task = getLastTask(xhr.response);
      onLoad(task);
    });
  }

  // work
  function edit(data, onLoad) {
    // const task = { title: data };
    
    // let xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';
    // xhr.open('POST', '/add');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify( task ));
  
    // xhr.addEventListener('load', function () {
    //   let task = getLastTask(xhr.response);
    //   onLoad(task);
    // });
  }
  //
  
  function complite(complited, id) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/complite?id=${id}&complited=${complited}`);
    xhr.send();
  }
  
  function expel(id, onLoad) {
    let xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function () {
      onLoad();
    });
    
    xhr.open('GET', `/expel?id=${id}`);
    xhr.send();
  }
  
  function buildList(onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/notes`);
    xhr.responseType = 'json';
    xhr.send();
  
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    })
  }

  function getLastTask(tasks) {
    const lastIndex = tasks.length;
    const task = tasks[lastIndex - 1];

    return task;
  }
  
  window.backend = {
    create,
    complite,
    expel,
    buildList,

    // work
    edit
    //
  }
})();


