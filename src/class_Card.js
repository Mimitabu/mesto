import {myId} from "./const.js"
import {Api} from "./class_Api.js"


const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'
const api = new Api(
  serverUrl,
  {
    authorization: '70f2226f-be57-4015-8706-b73d7a08cde1',
    'Content-Type': 'application/json'
  }
)


export class Card {
  constructor (link, name, trash, cardId, likes = []) {
    this.remove = this.remove.bind(this)
    this.like = this.like.bind(this)
    this.name = name
    this.link = link
    this.trash = trash
    this.cardId = cardId
    this.likes = likes
    this.likeCounter = this.likes.length
    this.wasLikedPreviously = !!(likes.find(like => like._id === myId))
    this.cardElement = this.createCard(link, name)
    this.likeButton = this.cardElement
      .querySelector('.place-card__like-icon')
    this.likeButton
      .addEventListener('click', this.like)
    if (this.trash) {
      this.cardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove)
    }
  }

  createCard () {
    const placeCardElement = document.createElement('div')
    const cardImageElement = document.createElement('div')

    if (this.trash) {
      const deleteButtonElement = document.createElement('button')
      deleteButtonElement.classList.add('place-card__delete-icon')
      cardImageElement.appendChild(deleteButtonElement)
    }

    const cardDescriptionElement = document.createElement('div')
    const cardNameElement = document.createElement('h3')
    const likeCards = document.createElement('div')
    const likeButtonElement = document.createElement('button')
    const likeCountElement = document.createElement('p')

    placeCardElement.classList.add('place-card')
    placeCardElement.setAttribute('card-id', this.cardId)
    cardImageElement.classList.add('place-card__image')
    cardImageElement.style.backgroundImage = `url(${this.link})` 
    likeCards.classList.add('place-card__like-cards')
    cardDescriptionElement.classList.add('place-card__description')
    cardNameElement.classList.add('place-card__name')
    cardNameElement.textContent = this.name 
    likeButtonElement.classList.add('place-card__like-icon')
    if (this.wasLikedPreviously) {
      likeButtonElement.classList.add('place-card__like-icon_liked')
    }
    likeCountElement.classList.add('place-card__like-count')

    placeCardElement.appendChild(cardImageElement)
    placeCardElement.appendChild(cardDescriptionElement)
    cardDescriptionElement.appendChild(cardNameElement)
    cardDescriptionElement.appendChild(likeCards)
    likeCards.appendChild(likeButtonElement)
    likeCards.appendChild(likeCountElement)
    likeCountElement.textContent = this.likes.length
    return placeCardElement
    console.log(placeCardElement)
  }

  like (event) {
    if (!this.likeButton.classList.contains('place-card__like-icon_liked')) {
      api.likeCard(this.cardId,'PUT')
        .then(data => {
          this.likeCounter += 1
          this.cardElement
            .querySelector('.place-card__like-count').textContent = this.likeCounter 
          this.likeButton.classList.add('place-card__like-icon_liked')
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        })
    } else {
      api.likeCard(this.cardId,'DELETE')
        .then(data => {
           this.likeCounter -= 1
          this.cardElement
            .querySelector('.place-card__like-count').textContent =this.likeCounter
          this.likeButton.classList.remove('place-card__like-icon_liked')
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        })
    }
  }

  remove (event) {
    const question = confirm('Вы действительно хотите удалить эту карточку?')
    if (question) {
      api.delCard(this.cardId)
        .then(data => {
          event.target.closest('.place-card').remove()
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        })
    }
  }
}