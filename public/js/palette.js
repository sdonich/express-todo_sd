'use strict';

(function() {
  let picture;

  class Picture {
    constructor(parent) {
      this.parent = document.querySelector(parent);
      this.paletteButton = this.parent.querySelector('.palette-button');
      this.palette = this.parent.querySelector('.palette');
      this.paints = this.parent.querySelectorAll('.paint');
    }
  }

  function closePaletteHandler(evt) {
    if (evt.target !== picture.paletteButton && evt.target !== picture.palette) {
      setTimeout(() => {
        picture.palette.style.display = 'none';
        picture.parent.removeEventListener('click', closePaletteHandler);
        picture.palette.removeEventListener('click', selectNoteColorHandler);
      }, 200);
    }
  }

  function display(evt) {
    let parent = evt.target.parentElement.classList[0];
    picture = new Picture(`.${parent}`);
    let display = getComputedStyle(picture.palette, null).display;

    if (display === 'none') {
      picture.palette.style.display = 'grid';
      picture.palette.addEventListener('click', selectNoteColorHandler);

      picture.parent.addEventListener('click', closePaletteHandler);
    }
    if (display === 'grid') {
      picture.palette.style.display = 'none';
      picture.parent.removeEventListener('click', closePaletteHandler);
    }
  }

  function selectNoteColorHandler(evt) {
    if (evt.target !== picture.palette) {
      picture.paints.forEach(paint => {
        if (paint.hasAttribute('status', 'selected')) {
          paint.removeAttribute('status', 'selected');
        }
      })

      evt.target.setAttribute('status', 'selected');
      if (picture.parent.classList.contains('create-box__wrapper')) {
        picture.paletteButton.setAttribute('color', evt.target.getAttribute('color'));
      }
      if (document.querySelector('.editor-popup__header')) {
        let noteHeader = document.querySelector('.editor-popup__header');
        noteHeader.setAttribute('color', evt.target.getAttribute('color'));
      }
    }
  }

  function getColor(paints) {
    for (let i = 0; i <= paints.length; i++) {
      if (paints[i].hasAttribute('status', 'selected')) {
        return paints[i].getAttribute('color');
      }
    }
  }

  window.palette = {
    display,
    getColor
  }
})();