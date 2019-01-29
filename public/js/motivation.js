'use strict';

(function() {

  let motivationText = {
    'tasks': `no task, let's play in videogames`,
    'notes': `area for your notes`
  }

  function add(parent) {
    window.domElement.remove(`.motivation-box__${parent}`);
    let motivationBox = document.createElement('div');
    motivationBox.classList.add(`motivation-box__${parent}`);
      
    document.querySelector(`.${parent}`).append(motivationBox);
    motivationBox.insertAdjacentHTML('beforeend', `<img src="/img/motivation-${parent}.png"> ${motivationText[parent]}`);
  }

  window.motivation = {
    add
  }

  
})();