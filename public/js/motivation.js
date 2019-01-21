'use strict';

(function() {

  function add() {
    let motivationBox = document.createElement('div');
    motivationBox.classList.add('motivation-box');
      
    document.querySelector('.tasks').append(motivationBox);
    motivationBox.insertAdjacentHTML('beforeend', `<img src="/img/motivation-checkmark.png"> no task, let's play in videogames`);
  }

  window.motivation = {
    add
  }

  
})();