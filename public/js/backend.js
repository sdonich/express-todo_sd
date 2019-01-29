'use strict';

(function() {
  function create(data, tasklist, onLoad) {
    const task = { content: data, tasklist };
    
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.open('POST', '/add');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(task));
  
    xhr.addEventListener('load', function () {
      let task = getLastTask(xhr.response);
      onLoad(task);
    });
  }

  function edit(data) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', '/edit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }
  
  function complite(complited, id) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', `/complite?id=${id}&complited=${complited}`);
    xhr.send();
  }
  
  function deleteTask(id, onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', `/deleteTask?id=${id}`);
    xhr.send();

    xhr.addEventListener('load', function () {
      onLoad();
    });
  }
  
  function getTasklist(title, onLoadFull, onLoadEmpty) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', `/tasks?title=${title}`);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.response.length !== 0) {
        onLoadFull(xhr.response);
      }  else {
        onLoadEmpty();
      }
    });
  }

  function getTasklists(onLoadFull, onLoadEmpty) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/tasklists`);
    xhr.responseType = 'json';
    xhr.send();
  
    xhr.addEventListener('load', function () {
      if (xhr.response.length !== 0) {
        onLoadFull(xhr.response);
      }  else {
        onLoadEmpty();
      }
    });
  }

  function sendTasklistTitle(data) {
    const tasklist = { title: data };

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', '/addTasklist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(tasklist));
  }
    
  function getLastTask(tasks) {
    const lastIndex = tasks.length;
    const task = tasks[lastIndex - 1];

    return task;
  }

  function editTasklist(titles) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', '/editTasklist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(titles));
  }

  function deleteTasklist(tasklist, onLoadFull, onLoadEmpty, setTitle) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', '/deleteTasklist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { tasklist }));

    xhr.addEventListener('load', function () {
      if (xhr.response.length !== 0) {
        onLoadFull(xhr.response);
        setTitle(xhr.response[0]);
      }  else {
        onLoadEmpty();
        setTitle();
      }
    })
  }

  function notelist(onLoadFull, onLoadEmpty) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/notelist`);
    xhr.responseType = 'json';
    xhr.send();
  
    xhr.addEventListener('load', function () {
      if (xhr.response.length !== 0) {
        onLoadFull(xhr.response);
      }  else {
        onLoadEmpty();
      }
    });
  }

  function addNote(note, onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', '/addnote');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(note));
    
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
  }

  function deleteNote(id, onLoad) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', `/deleteNote?id=${id}`);
    xhr.send();

    xhr.addEventListener('load', function () {
      onLoad();
    });
  }
  
  window.backend = {
    create,
    complite,
    deleteTask,
    edit,
    getTasklist,
    getTasklists,
    sendTasklistTitle,
    editTasklist,
    deleteTasklist,
    notelist,
    addNote,
    deleteNote
  }
})();


