export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
      authorization: 'eedbd58f-f39c-41fc-bc71-e4b882bd41d1', //myId
      'Content-Type': 'application/json'
    }
  }
    
const getResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  //получить карточки с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(getResponse)
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } 
  
  //получить данные о пользователе с сервера
export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(getResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  

// Удаление карточки по идентификатору
export const deleteCardId = (id) => {
    return fetch(`${config.baseUrl}/cards/`+`${id}`, {
       method: "DELETE",
       headers: config.headers
     });
   };


  // Обновление информации о пользователе
export  const patchUser = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => getResponse(res));
  };
  
 
  //добавление новой карточки
export const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  };

  // Добавление лайка карточке
export const addLikeCard = (id)  => {
  return fetch(`${config.baseUrl}/cards/likes/`+`${id}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(response => {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
};

// Удаление лайка с карточки
export const deleteLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/`+`${id}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(response => {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
};

// Обновление аватара пользователя
export const patchAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatar }),
  });
};
//ux
const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

