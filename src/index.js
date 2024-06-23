import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, putLike } from "./components/card.js";
import { validationConfig, enableValidation, clearValidation } from "./components/validation.js"
import { getUser, getInitialCards, postCard, patchUser, deleteCardId, patchAvatar} from "./components/api.js"

const placesList = document.querySelector(".places__list");

const popupEditElement = document.querySelector(".profile__edit-button");
const popupAddElement = document.querySelector(".profile__add-button");
const popupEditContent = document.querySelector(".popup_type_edit");
const popupAddContent = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImagePicture = popupImage.querySelector(".popup__image");

const formCardElement = document.forms["new-place"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const formPersonElement = document.forms["edit-profile"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatarImageButton = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_new-avatar');
const avatarInput = document.querySelector('input[name="link_avatar"]');

let userId = '';

// Объект с колбэками для работы с событиями карточек
const callbacksObject = {
  likeCallback: putLike,
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
};

// Функция открытия модального окна с изображением карточки
function openImagePopup(cardName, cardLink) {
  popupImagePicture.src = cardLink;
  popupImagePicture.alt = cardName;
  popupImageCaption.textContent = cardName;
  openPopup(popupImage);
}

//открыть попап удалить карточку
function openPopupDelete(cardElement, _id) {
  const formDeleteCard = document.forms["delete-card"];
  const deletePopup = document.querySelector(".popup_type_delete-card");
  const formDeleteCardButton = formDeleteCard.querySelector('.popup__button');
  openPopup(deletePopup);
  // Слушатель подтверждения удаления карточки по id
  formDeleteCardButton.addEventListener("click", () => {
    cardElement.remove();
    deleteCardId(_id);
    closePopup(deletePopup);
  });
}

//запрос на сервер данных Profile и отобразить их при загрузке страницы;
const updateProfileData = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  userId = data._id;
  avatarImageButton.style.backgroundImage = `url(${data.avatar})`;
}

//ф-ия смены имени и описания профиля
function changeProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const buttonSave = formPersonElement.querySelector('.popup__button');
  loading(buttonSave, true);
  const name = profileTitle.textContent = nameInput.value;
  const about = profileDescription.textContent = jobInput.value;
  patchUser(name, about).then(dataUser => {
    // Обновление отображаемых данных профиля на странице
    profileTitle.textContent = dataUser.name;
    profileDescription.textContent = dataUser.about;
  });
  loading(buttonSave, false);
  const popup = formPersonElement.closest(".popup");
  closePopup(popup);
}

//ф-я добавления новой карточки по ссылке
function addCardFormSubmit(evt) {
  evt.preventDefault();
  const buttonSave = formCardElement.querySelector('.popup__button');
  loading(buttonSave, true);
  const cardNameValue = cardNameInput.value;
  const cardUrlValue = cardUrlInput.value;
  //отправить на сервер и вернуть данные карточки
      postCard(cardNameValue, cardUrlValue)
      .then(dataCard => {
        placesList.prepend(createCard(dataCard, callbacksObject, userId));
      });
  loading(buttonSave, false);
  const popup = formCardElement.closest(".popup");
  closePopup(popup);
}

//вывод карточек с сервера
const renderCards = (dataCards) => {
    dataCards.forEach((item) => {
    placesList.append(createCard(item, callbacksObject, userId));
  });
};

//слушатель - изменение описания профиля
formPersonElement.addEventListener("submit", function(evt) {
  changeProfileFormSubmit(evt);
});

//слушатель - добавление карточки по ссылке
formCardElement.addEventListener("submit", addCardFormSubmit);

//слушатель - открыть попап "Редактировать профиль"
popupEditElement.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditContent, validationConfig);
  openPopup(popupEditContent);
});

//слушатель - открыть попап "Новое место"
popupAddElement.addEventListener("click", () => {
  cardNameInput.value = "";
  cardUrlInput.value = "";
  clearValidation(popupAddContent, validationConfig);
  openPopup(popupAddContent);
});

// UX
const loading = ( button, isLoading ) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

avatarImageButton.addEventListener('click', () => {
  avatarInput.value = '';
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
  const formElement = document.querySelector('form[name="new-avatar"]');
  const buttonAvatarClose = formElement.querySelector('.popup__button');
  buttonAvatarClose.addEventListener('click', () => {
    loading(buttonAvatarClose, true);
    const avatar = avatarInput.value;
    patchAvatar(avatar);
    avatarImageButton.style.backgroundImage = `url(${avatar})`;
    loading(buttonAvatarClose, false);
    closePopup(popupAvatar);
  })
})

Promise.all([getUser(), getInitialCards()])
.then((result) => {
  const user = result[0];
    userId = user._id;
    const cards = result[1];
    updateProfileData(user);
    renderCards(cards, callbacksObject, user._id);
})
.catch((err) => {
  console.error("Произошла ошибка при получении данных:", err);
});

enableValidation (validationConfig);
