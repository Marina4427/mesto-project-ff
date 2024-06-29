import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, putLike } from "./components/card.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./components/validation.js";
import {
  getUser,
  getInitialCards,
  postCard,
  patchUser,
  deleteCardId,
  patchAvatar,
  deleteLikeCard,
  addLikeCard
} from "./components/api.js";

const placesList = document.querySelector(".places__list");

const popupEditElement = document.querySelector(".profile__edit-button");
const popupAddElement = document.querySelector(".profile__add-button");
const popupEditContent = document.querySelector(".popup_type_edit");
const popupAddContent = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImagePicture = popupImage.querySelector(".popup__image");

const formCardElement = document.forms["new-place"];
const buttonSave = formCardElement.querySelector(".popup__button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const formPersonElement = document.forms["edit-profile"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatarImageButton = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_new-avatar");
const avatarInput = document.querySelector('input[name="link_avatar"]');


const formDeleteCard = document.forms["delete-card"];
const formDeleteCardButton = formDeleteCard.querySelector(".popup__button");
const popupDelete = document.querySelector(".popup_type_delete-card");

const formAvatarElement = document.forms["new-avatar"];
const buttonAvatarSave = formAvatarElement.querySelector(".popup__button");

let userId = "";

// Объект с колбэками для работы с событиями карточек
const callbacksObject = {
  likeCallback: putLike,
  deleteCardCallback: deleteCard,
  openImageCallback: openImagePopup,
  openDeletePopupCallBack: openDeletePopup, // was openPopup,
  deleteLikeCard: deleteLikeCard,
  addLikeCard: addLikeCard,
}

// Функция открытия модального окна с изображением карточки
function openImagePopup(cardName, cardLink) {
  popupImagePicture.src = cardLink;
  popupImagePicture.alt = cardName;
  popupImageCaption.textContent = cardName;
  openPopup(popupImage);
}

//удалить карточку по id
function deleteCard(cardElement, _id) {
  deleteCardId(_id)
    .then(() => {
      cardElement.remove();
      closePopup(popupDelete);
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

function openDeletePopup(cardElement, cardId) {
  formDeleteCardButton.cardElement = cardElement;
  formDeleteCardButton.cardId = cardId;
  openPopup(popupDelete);
}

// Слушатель подтверждения удаления карточки по id
formDeleteCardButton.addEventListener("click", () => {
  deleteCard(formDeleteCardButton.cardElement, formDeleteCardButton.cardId);
});

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
  const buttonSave = formPersonElement.querySelector(".popup__button");
  loading(buttonSave, true);
  const name = (profileTitle.textContent = nameInput.value);
  const about = (profileDescription.textContent = jobInput.value);
  patchUser(name, about)
    .then((dataUser) => {
      // Обновление отображаемых данных профиля на странице
      profileTitle.textContent = dataUser.name;
      profileDescription.textContent = dataUser.about;
      closePopup(popupEditContent);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      loading(buttonSave, false);
    });
}

//ф-я добавления новой карточки по ссылке
function addCardFormSubmit(evt) {
  evt.preventDefault();
  loading(buttonSave, true);
  const cardNameValue = cardNameInput.value;
  const cardUrlValue = cardUrlInput.value;
  //отправить на сервер и вернуть данные карточки
  postCard(cardNameValue, cardUrlValue)
    .then((dataCard) => {
      placesList.prepend(createCard(dataCard, callbacksObject, userId));
      closePopup(popupAddContent);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      loading(buttonSave, false);
    });
}

//вывод карточек с сервера
const renderCards = (dataCards) => {
  dataCards.forEach((item) => {
    placesList.append(createCard(item, callbacksObject, userId));
  });
}

//слушатель - изменение описания профиля
formPersonElement.addEventListener("submit", function (evt) {
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
const loading = (button, isLoading) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

//слушатель - открыть попап "Смена аватара"
avatarImageButton.addEventListener("click", () => {
  avatarInput.value = "";
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

//слушатель - изменение аватара
formAvatarElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  loading(buttonAvatarSave, true);
  const avatar = avatarInput.value;
  const currentAvatar = avatarImageButton.style.backgroundImage;
  patchAvatar(avatar)
    .then((data) => {
      avatarImageButton.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
      avatarImageButton.style.backgroundImage = currentAvatar;
    })
    .finally(() => {
      loading(buttonAvatarSave, false);
    });
});

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

enableValidation(validationConfig);
