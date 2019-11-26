document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Dogs - https://random.dog/woof.json
  // Cats - https://aws.random.cat/meow

  const card = document.getElementById("card"),
        btnsBlock = document.querySelector(".buttons");

  // Получение ссылки на картинку или видео
  const getUrl = (data) => {
    if ("url" in data) {
      return data.url;
    } else if ("file" in data) {
      return data.file;
    } else {
      throw new Error("no data link found in response");
    }
  };

  // Создание и размещение элемента
  const createNewMedia = (url) => {
    let newMedia;
    if (url.match(/\.(png|jpg|jpeg|gif)$/i)) {
      // create img
      newMedia = document.createElement("img");
      newMedia.src = url;
      newMedia.align = "middle";
    } else {
      // create video
      newMedia = document.createElement("video");
      newMedia.src = url;
      newMedia.autoplay = "autoplay";
      newMedia.controls = "controls";
    }
    // удаляем уже имеющиеся элементы
    [...card.children].forEach( (elem) => elem.remove())
    // Добавляем новый
    card.appendChild(newMedia);
  };

  // Запрос данных и их обработка
  const newDogCat = (urlData) => {
    fetch(urlData)
      .then( (res) => {
        if (res.status !== 200) {
          throw new Error("network status is " +
              res.status + " - " + res.statusText);
        }
        return res.json();
      })
      .then( (data) => getUrl(data))
      .then( (url) => createNewMedia(url))
      .catch( (error) => console.error(error))
  };

  // Листнеры для кнопок
  btnsBlock.addEventListener("click", (event) => {
    const { target } = event;
    if (target.id === "dogs") {
      newDogCat("https://random.dog/woof.json");
    } else if (target.id === "cats") {
      newDogCat("https://aws.random.cat/meow");
    }

  });

  // Картинка при загрузке страницы
  if (Math.random() > 0.5) {
    newDogCat("https://random.dog/woof.json");
  } else {
    newDogCat("https://aws.random.cat/meow");
  };

});
