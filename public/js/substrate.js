(function() {
  
  function place() {
    let sub = document.createElement('div');
    sub.classList.add('substrate');
    document.body.prepend(sub);
  }

  window.substrate = {
    place
  }
})();