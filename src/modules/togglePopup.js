const togglePopup = () => {
  const popup = document.querySelector("div.popup"),
        btnsPopup = document.querySelectorAll(".popup-btn");

  // Анимация появления popup'а
  const popupAnimated = (timeout=500) => {
    const timeGap = 10;       // временной шаг анимации
    const start = Date.now(); // время начала анимации

    const timer = setInterval( () => {
      // оставшееся время до конца анимации
      const timeLeft = timeout - (Date.now() - start);
      // отрисовать анимацию с учетом оставшегося времени
      draw(timeLeft);
    }, timeGap);

    // смещение popup'а с учетом оставшегося на анимацию времени и временного шага
    const draw = (timeLeft) => {
      const left = parseInt(popup.style.left);
      const shift = left / timeLeft * timeGap;
      if (Math.abs(left) - Math.abs(shift) <= 0) {
        // Завершение анимации:
        // // "парковка" элемента на место
        // // очистка setInterval
        popup.style.left = "0%";
        clearInterval(timer);
      } else {
        popup.style.left = (left - shift) + '%';
      }
    };

  };

  btnsPopup.forEach( (btn) => {
    btn.addEventListener("click", () => {
      if (window.screen.width >= 768) {
        popup.querySelector(".popup-content").style.position = "absolute";
        popup.style.left = "-100%";
        popup.style.display = "block";
        popupAnimated(200);
      } else {
        popup.style.display = "block";
      }
    });
  });

  popup.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.closest(".popup-content") ||
        target.closest(".popup-close")) {
      popup.style.display = "none";
    }
  });
};

export default togglePopup;
