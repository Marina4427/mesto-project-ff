import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, callbacks } from "./components/card.js";

const placesList = document.querySelector(".places__list");
const formPersonElement = document.querySelector('form[name="edit-profile"]');
const formCardElement = document.querySelector('form[name="new-place"]');

const popupEditElement = document.querySelector(".profile__edit-button");
const popupAddElement = document.querySelector(".profile__add-button");
const popupEditContent = document.querySelector(".popup_type_edit");
const popupAddContent = document.querySelector(".popup_type_new-card");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");
export const popups = document.querySelectorAll('.popup');

//вывод карточек из массива
initialCards.forEach((item) => {
  placesList.append(createCard(item, callbacks));
});
//открыть попап "Новое место"
popupAddElement.addEventListener("click", () => {
  cardNameInput.value = "";
  cardUrlInput.value = "";
  openPopup(popupAddContent);
});

//открыть попап "Редактировать профиль"
popupEditElement.addEventListener("click", () => {
  nameInput.value = "";
  jobInput.value = "";
  openPopup(popupEditContent);
});

//ф-я добавления новой карточки по ссылке
function addCardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardNameValue = cardNameInput.value;
  const cardUrlValue = cardUrlInput.value;

  const form = document.forms["new-place"];
  const namePlace = form.elements["place-name"];
  const linkPlace = form.elements.link;
  namePlace.textContent = cardNameValue;
  linkPlace.textContent = cardUrlValue;
  const cardNew = {
    name: cardNameValue,
    link: cardUrlValue,
    alt: cardNameValue,
  };
  placesList.prepend(createCard(cardNew, callbacks));
  const popup = form.closest(".popup");
  closePopup(popup);
}

//ф-ия смены имени и описания профиля
function changeProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const form = document.forms["edit-profile"];
  const nameProfile = form.elements.name;
  const descriptionProfile = form.elements.description;
  nameProfile.textContent = nameValue;
  descriptionProfile.textContent = jobValue;
  
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  const popup = form.closest(".popup");
  closePopup(popup);
}

// изменение описания профиля
formPersonElement.addEventListener("submit", changeProfileFormSubmit);
// добавление карточки по ссылке
formCardElement.addEventListener("submit", addCardFormSubmit);


