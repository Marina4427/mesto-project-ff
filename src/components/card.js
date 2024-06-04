import { openPopup } from "./modal";

// const использующиеся только в card.js
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = document.querySelector(".popup_type_image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImagePicture = popupImage.querySelector(".popup__image");

function deleteCard(element) {
  element.remove();
}

function putLike(element) {
  element.classList.toggle("card__like-button_is-active");
}

function openFullSizeCard(cardName, cardLink) {
  popupImagePicture.src = cardLink;
  popupImagePicture.alt = cardName;
  popupImageCaption.textContent = cardName;
  openPopup(popupImage);
}

const callbacks = {
  likeCallback: putLike,
  deleteCallback: deleteCard,
  openCallback: openFullSizeCard,
};

function createCard(item, callbacks) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.alt;
  // @todo: Функция удаления карточки

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    callbacks.deleteCallback(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    callbacks.likeCallback(likeButton);
  });

  const cardName = item.name;
  const cardLink = item.link;
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.addEventListener("click", () => {
    callbacks.openCallback(cardName, cardLink);
  });
  return cardElement;
}

export { createCard, callbacks };
