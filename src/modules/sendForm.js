import { phoneValid, notEmptyValid } from './validators';

const sendForm = () => {
  const errorMessage = "Что-то пошло не так...",
        loadMessage = "Загрузка...",
        succesMessage = "Спасибо! Мы скоро с Вами свяжемся!",
        statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem; color: #fff;";

  const forms = document.querySelectorAll("form[id^=\"form\"]");

  const postData = (body) => {
    // Отправка данных с помощью fetch
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });
  };

  // Листенер для форм
  forms.forEach( (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Проверка поля телефона
      const phone = [...form.elements].filter(
        (elem) => elem.matches("input[id$=phone]"))[0];
      if (!phoneValid({target: phone})) {
        // Прерываем действие, если номер не валиден
        return;
      }
      // Проверка поля email
      const email = [...form.elements].filter(
        (elem) => elem.matches("input[id$=email]"))[0];
      if (!notEmptyValid({target: email})) {
        // Прерываем действие, если поле пусто
        return;
      }
      // Проверка поля сообщение (если есть)
      const msg = [...form.elements].filter(
        (elem) => elem.matches("input[id$=message]"))[0];
      if (msg && !notEmptyValid({target: msg})) {
        // Прерываем действие, если поле пусто
        return;
      }


      // Элемент для сообщения
      form.appendChild(statusMessage);

      // Данные из формы
      const formData = new FormData(form);
      const body = {};
      formData.forEach( (val, key) => {
        body[key] = val;
      });

      // Непосредственно отправка данных на сервер
      statusMessage.textContent = loadMessage;
      postData(body)
        .then( (response) => {
          if (response.status !== 200) {
            throw new Error("network status is " +
              response.status + " - " + response.statusText);
          }
          statusMessage.textContent = succesMessage;
          // Очистка формы при успешном ответе сервера
          const inputes = [...form.elements].filter(
            (elem) => !elem.matches("button, input[type=\"button\"]"));
          inputes.forEach( (elem) => {elem.value = "";});
        })
        .catch( (error) => {
          statusMessage.textContent = errorMessage;
          console.error("Ошибка при отправке данных:", error);
        });
    });
  });
};

export default sendForm;
