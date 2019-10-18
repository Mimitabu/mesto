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

import { newPhoto, newInfo, newCard, renderLoadingPhoto, renderLoadingCard, 
        renderLoadingInfo, handleValidateInfo, handleValidatePhoto, 
        handleValidateCard, isValidLink, isValidLenght, closeCard, closePhoto,
        closeEdit, closeForm, addImg, openFormPhoto, openFormEdit, openForm, 
        addButtonDisabled, addButtonActive } from "./helpers.js"


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
