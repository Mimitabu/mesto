export class Popup {
  constructor (container) {
    this.container = document.querySelector(container)
    this.open()
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close)
  }

  open () {
    this.container.classList.add('popup_is-opened')
  }

  close (event) {
    event.target.closest('.popup').classList.remove('popup_is-opened')
  }
}