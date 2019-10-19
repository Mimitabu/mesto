

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



