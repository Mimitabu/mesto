import { formInfo } from "./const.js"

export class Api {
  constructor (baseUrl, headers) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  getUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так ${res.status}`)
      })
  }

  patchUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: formInfo.elements.user.value,
        about: formInfo.elements.about.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  patchUserPhoto (link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

  getUserPhoto () {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

  getInitialCards () {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.regect(`Ошибка ${res.status}`)
      })
  }

  postCard (name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  delCard (cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  likeCard (cardId, queryMethod) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: queryMethod,
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  // deleteLike (cardId) {
  //   return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
  //     method: 'DELETE',
  //     headers: this.headers
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //       return Promise.reject(res.status)
  //     })
  // }
}