import "./pages/index.css";
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'

import { myId, root, formNew, formInfo, formPhoto, deleteButtonElement, openFormButton, 
		popUpForm, popUpCloseButton, popUpCloseEditButton, openEditButton,
		popUpFormEdit, popUpFormPhoto, userName, userInfo, popUpEditSaveButton, 
		addButton, popupImage, placesList, userPhoto, owner } from "./const.js"


import { Api } from "./class_Api.js"
import { Card } from "./class_Card.js"
import { CardList } from "./class_CardList.js"
import { Popup } from "./class_Popup.js"



const cardList = new CardList(document.querySelector('.places-list'), [], owner)

const api = new Api(
  serverUrl,
  {
    authorization: '70f2226f-be57-4015-8706-b73d7a08cde1',
    'Content-Type': 'application/json'
  }
)

api.getInitialCards().then(data => {
  const cardList = new CardList(document.querySelector('.places-list'), data, owner)
  cardList.render()
  console.log(data)
})

api.getUserInfo()
  .then(data => {
    Object.assign(owner, data)
    userName.textContent = data.name
    userInfo.textContent = data.about
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  })

  api.getUserPhoto()
  .then(data => {
    userPhoto.style.backgroundImage = `url(${data.avatar})`
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  })




function openForm (event) {
  document.querySelector('.error-name').textContent = ''
  document.querySelector('.error-link').textContent = ''
  addButtonDisabled()
  new Popup('.popup_card')
}

function openFormEdit (event) {
  const user = formInfo.elements.user 
  const about = formInfo.elements.about
  document.querySelector('.error-user').textContent = ''
  document.querySelector('.error-about').textContent = ''
  user.value = userName.textContent 
  about.value = userInfo.textContent
  new Popup('.popup_edit')
}

function openFormPhoto (event) {
  document.querySelector('.error-photo').textContent = ''
  new Popup('.popup_photo')
}

function addImg (event) {
  if (event.target.classList.contains('place-card__image')) {
    const image = event.target.style.backgroundImage
    const imgString = image.slice(5, length - 2)
    popupImage.setAttribute('src', imgString)
    new Popup('.popup_img')
  }
}



function addButtonActive () {
  addButton.removeAttribute('disabled')
  addButton.classList.remove('popup__button_disabled')
}

function addButtonDisabled () {
  const addButton = root.querySelector('.popup__button')
  addButton.setAttribute('disabled', true)
  addButton.classList.add('popup__button_disabled')
}



function closeForm () {
  popUpForm.classList.remove('popup_is-opened')
}

function closeEdit () {
  popUpFormEdit.classList.remove('popup_is-opened')
}

function closePhoto () {
  popUpFormPhoto.classList.remove('popup_is-opened')
}

function closeCard () {
  root.removeChild(event.target.closest('.popup_img'))
}

function isValidLenght (length, errorMessage) {
  if (length === 0) {
    document.querySelector(errorMessage).textContent = 'Это обязательное поле'
  } else if (length < 2 || length > 30) {
    document.querySelector(errorMessage).textContent =
      'Должно быть от 2 до 30 символов'
  } else {
    document.querySelector(errorMessage).textContent = ''
    return true
  }
  return false
}

function isValidLink (link, errorMessage) {
  if (link.value.length === 0) {
    document.querySelector(errorMessage).textContent = 'Это обязательное поле'
  } else if (!link.validity.valid) {
    document.querySelector(errorMessage).textContent =
      'Здесь должна быть ссылка'
  } else {
    document.querySelector(errorMessage).textContent = ''
    return true
  }
  return false
}

function handleValidateCard (event) {
  const form = event.currentTarget
  const name = form.elements.name
  const link = form.elements.link

  addButtonDisabled()

  const validName = isValidLenght(name.value.length, '.error-name')
  const validLink = isValidLink(link, '.error-link')

  if (validName && validLink) {
    addButtonActive()
  }
}

function handleValidatePhoto (event) {
  const form = event.currentTarget
  const photo = formPhoto.elements.photo

  popUpPhotoSaveButton.setAttribute('disabled', true)
  popUpPhotoSaveButton.classList.add('popup__button_disabled')

  const validPhoto = isValidLink(photo, '.error-photo')

  if (validPhoto) {
    popUpPhotoSaveButton.removeAttribute('disabled')
    popUpPhotoSaveButton.classList.remove('popup__button_disabled')
  }
}

function handleValidateInfo (event) {
  const user = formInfo.elements.user
  const about = formInfo.elements.about
  const form = event.currentTarget

  popUpEditSaveButton.setAttribute('disabled', true)
  popUpEditSaveButton.classList.add('popup__button_disabled')

  const validName = isValidLenght(user.value.length, '.error-user')
  const validInfo = isValidLenght(about.value.length, '.error-about')

  if (validName && validInfo) {
    popUpEditSaveButton.removeAttribute('disabled')
    popUpEditSaveButton.classList.remove('popup__button_disabled')
  }
}

function renderLoadingInfo (isLoading) {
  if (isLoading) {
    popUpEditSaveButton.textContent = 'Загрузка...'
  } else {
    popUpEditSaveButton.textContent = 'Сохранить'
  }
}

function renderLoadingCard (isLoading) {
  if (isLoading) {
    addButton.textContent = 'Загрузка...'
  } else {
    addButton.textContent = 'Сохранить'
  }
}

function renderLoadingPhoto (isLoading) {
  if (isLoading) {
    popUpPhotoSaveButton.textContent = 'Загрузка...'
  } else {
    popUpPhotoSaveButton.textContent = 'Сохранить'
  }
}



function newCard (event) { 
  event.preventDefault()
  renderLoadingCard(true)
  api.postCard(formNew.elements.name.value, formNew.elements.link.value)
    .then((data) => {
      cardList.addCard(formNew.elements.link.value, formNew.elements.name.value, true)
      formNew.reset()
      addButtonDisabled()
      closeForm()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoadingCard(false)
    })
}

function newInfo (event) {
  event.preventDefault()
  renderLoadingInfo(true)
  api.patchUserInfo()
    .then((data) => {
      userName.textContent = formInfo.elements.user.value
      userInfo.textContent = formInfo.elements.about.value
      closeEdit()
    })
    .catch(err => {
      cosole.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoadingInfo(false)
    })
}




function newPhoto (event) {
  event.preventDefault()
  renderLoadingPhoto(true)
  api.patchUserPhoto(formPhoto.elements.photo.value)
    .then(data => {
      userPhoto.style.backgroundImage = `url(${formPhoto.elements.photo.value})`
      closePhoto()
      formPhoto.elements.photo.value = ''
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoadingPhoto(false)
    })
}







formNew.addEventListener('submit', newCard)
openFormButton.addEventListener('click', openForm)
popUpCloseButton.addEventListener('click', closeForm)
openEditButton.addEventListener('click', openFormEdit)
popUpCloseEditButton.addEventListener('click', closeEdit)
formInfo.addEventListener('input', handleValidateInfo)
formNew.addEventListener('input', handleValidateCard)
formPhoto.addEventListener('input', handleValidatePhoto)
formInfo.addEventListener('submit', newInfo)
placesList.addEventListener('click', addImg)
userPhoto.addEventListener('click', openFormPhoto)
formPhoto.addEventListener('click', newPhoto)
