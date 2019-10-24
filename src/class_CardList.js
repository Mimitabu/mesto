import {Card} from "./class_Card.js"

export class CardList {
  constructor (container, initialCards, amIOwner) {
    this.container = container
    this.initialCards = initialCards
    this.amIOwner = amIOwner
  }

  render () {
    this.initialCards.forEach(({ name, link, owner, _id, likes }) => {
      if (this.amIOwner._id == owner._id) {
        this.trash = true
      } else {
        this.trash = false
      }
      this.addCard(link, name, this.trash, _id, likes)
    })
  }

  addCard (image, name, trash, _id, likes) {
    const { cardElement } = new Card(image, name, trash, _id, likes)
    this.container.appendChild(cardElement)
  }
}