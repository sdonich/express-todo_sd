const ul = document.querySelector('.test');

function get(onLoad) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `/notes`);
  xhr.responseType = 'json';
  xhr.send();

  xhr.addEventListener('load', function () {
    onLoad(xhr.response);
  })

}


get((notes) => {
  console.log(notes);
});