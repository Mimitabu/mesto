
const myId = '9e63fcbef5bfd8892bbb773a'
const root = document.querySelector('.root')
const formNew = document.forms.new
const formInfo = document.forms.info
const formPhoto = document.forms.userphoto
const deleteButtonElement = root.querySelector('.place-card__delete-icon')
const openFormButton = root.querySelector('.user-info__button')
const popUpForm = root.querySelector('.popup')
const popUpCloseButton = root.querySelector('.popup__close')
const popUpCloseEditButton = root.querySelector('.popup__close_edit')
const openEditButton = root.querySelector('.user-info__button_edit')
const popUpFormEdit = root.querySelector('.popup_edit')
const popUpFormPhoto = root.querySelector('.popup_photo')
const userName = root.querySelector('.user-info__name')
const userInfo = root.querySelector('.user-info__job')
const popUpEditSaveButton = root.querySelector('.popup__button_edit')
const popUpPhotoSaveButton = root.querySelector('.popup__button_photo')
const addButton = root.querySelector('.popup__button')
const popupImage = root.querySelector('.popup__image')
const placesList = root.querySelector('.places-list')
const userPhoto = root.querySelector('.user-info__photo')
const owner = {}





export { myId, root, formNew, formInfo, formPhoto, deleteButtonElement, openFormButton, 
		popUpForm, popUpCloseButton, popUpCloseEditButton, openEditButton,
		popUpFormEdit, popUpFormPhoto, userName, userInfo, popUpEditSaveButton, 
		addButton, popupImage, placesList, userPhoto, owner}