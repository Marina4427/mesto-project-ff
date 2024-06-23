(()=>{"use strict";function e(e){o(e.target.closest(".popup"))}function t(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function n(e){e.target.classList.contains("popup_is-opened")&&o(e.target)}function o(o){o.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t),document.removeEventListener("click",n),o.querySelector(".popup__close").removeEventListener("click",e)}function r(o){o.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",t),document.addEventListener("click",n),o.querySelector(".popup__close").addEventListener("click",e)}var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"eedbd58f-f39c-41fc-bc71-e4b882bd41d1","Content-Type":"application/json"}},a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function u(e,t,n){var o=t.deleteCardCallback,r=t.openImageCallback,c=t.likeCallback,a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__title"),s=a.querySelector(".card__like-counter"),l=a.querySelector(".card__delete-button"),d=a.querySelector(".card__like-button");return i.textContent=e.name,u.src=e.link,u.alt=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===n}))?d.classList.add("card__like-button_is-active"):d.classList.remove("card__like-button_is-active"),l.style.display=e.owner._id===n?"block":"none",l.addEventListener("click",(function(){o(a,e._id)})),d.addEventListener("click",(function(){c(d,e,s,n)})),u.addEventListener("click",(function(){r(e.name,e.link)})),a}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},l=function(e){return e.some((function(e){return!e.validity.valid}))};function d(e,t,n){l(e,n)?(t.setAttribute("disabled",!0),t.classList.add(n.inactiveButtonClass)):(t.removeAttribute("disabled"),t.classList.remove(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return s(e,n,t)})),d(n,o,t)}var _=document.querySelector(".places__list"),m=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),b=h.querySelector(".popup__caption"),S=h.querySelector(".popup__image"),k=document.forms["new-place"],q=document.querySelector(".popup__input_type_name"),C=document.querySelector(".popup__input_type_description"),L=document.forms["edit-profile"],E=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),U=document.querySelector(".profile__image"),j=document.querySelector(".popup_type_new-avatar"),P=document.querySelector('input[name="link_avatar"]'),w="",T={likeCallback:function(e,t,n){var o;e.classList.contains("card__like-button_is-active")?(o=t._id,fetch("".concat(c.baseUrl,"/cards/likes/")+"".concat(o),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){n.textContent=t.likes.length,e.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Произошла ошибка при удалении лайка:",e)})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/")+"".concat(e),{method:"PUT",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t._id).then((function(t){e.classList.add("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.error("Произошла ошибка при добавлении лайка:",e)}))},deleteCardCallback:function(e,t){var n=document.forms["delete-card"],a=document.querySelector(".popup_type_delete-card"),u=n.querySelector(".popup__button");r(a),u.addEventListener("click",(function(){var n;e.remove(),n=t,fetch("".concat(c.baseUrl,"/cards/")+"".concat(n),{method:"DELETE",headers:c.headers}),o(a)}))},openImageCallback:function(e,t){S.src=t,S.alt=e,b.textContent=e,r(h)}};L.addEventListener("submit",(function(e){!function(e){e.preventDefault();var t,n,r=L.querySelector(".popup__button");B(r,!0),(t=x.textContent=q.value,n=A.textContent=C.value,fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return a(e)}))).then((function(e){x.textContent=e.name,A.textContent=e.about})),B(r,!1),o(L.closest(".popup"))}(e)})),k.addEventListener("submit",(function(e){e.preventDefault();var t,n,r=k.querySelector(".popup__button");B(r,!0),(t=E.value,n=g.value,fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){_.prepend(u(e,T,w))})),B(r,!1),o(k.closest(".popup"))})),m.addEventListener("click",(function(){q.value=x.textContent,C.value=A.textContent,p(v,i),r(v)})),f.addEventListener("click",(function(){E.value="",g.value="",p(y,i),r(y)}));var B=function(e,t){e.textContent=t?"Сохранение...":"Сохранить"};U.addEventListener("click",(function(){P.value="",p(j,i),r(j);var e=document.querySelector('form[name="new-avatar"]').querySelector(".popup__button");e.addEventListener("click",(function(){B(e,!0);var t=P.value;!function(e){fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:e})})}(t),U.style.backgroundImage="url(".concat(t,")"),B(e,!1),o(j)}))})),Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then(a).catch((function(e){console.log(e)})),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then(a).catch((function(e){console.log(e)}))]).then((function(e){var t=e[0];w=t._id;var n,o,r=e[1];n=t,x.textContent=n.name,A.textContent=n.about,w=n._id,U.style.backgroundImage="url(".concat(n.avatar,")"),o=r,t._id,o.forEach((function(e){_.append(u(e,T,w))}))})).catch((function(e){console.error("Произошла ошибка при получении данных:",e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.classList.add(n.errorClass),o.textContent=t.validationMessage}(e,t,n)}(e,r,t),d(n,o,t)}))}))}(t,e)}))}(i)})();
//# sourceMappingURL=main.js.map