window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // === Timer ===
  const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours"),
          timerMinutes = document.querySelector("#timer-minutes"),
          timerSeconds = document.querySelector("#timer-seconds");

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining) % 60,
            minutes = Math.floor(timeRemaining / 60) % 60,
            hours = Math.floor(timeRemaining / 3600);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    };

    const numFormat = (n) => {
      return isNaN(n) ?
                n :
                n.toLocaleString(undefined, {minimumIntegerDigits: 2});
    };

    const updateClock = (timer) => {
      timer = timer ? timer : getTimeRemaining();
      timerHours.textContent = numFormat(timer.hours);
      timerMinutes.textContent = numFormat(timer.minutes);
      timerSeconds.textContent = numFormat(timer.seconds);
    };

    if (getTimeRemaining().timeRemaining > 0) {
      updateClock();
      setInterval(updateClock, 1000);
    } else {
      updateClock({hours: 0, minutes: 0, seconds: 0});
    }
  }

  // countTimer("12 november 2019");
  const date = new Date();
  date.setDate(date.getDate() + 1);
  countTimer(date.toDateString());
  // === END OF === Timer ===


  // === Menu ===
  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
          btnMenu = document.querySelector(".menu"),
          btnClose = document.querySelector(".close-btn"),
          itemsMenu = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      // if (!menu.style.transform) {
      //   menu.style.transform = "translateX(0)";
      // } else {
      //   menu.style.transform = "";
      // }
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    btnClose.addEventListener("click", handlerMenu);
    itemsMenu.forEach( (item) => item.addEventListener("click", handlerMenu));

  };
  toggleMenu();
  // === END OF === Menu ===


  // === Popup ===
  const togglePopup = () => {
    const popup = document.querySelector("div.popup"),
          btnsPopup = document.querySelectorAll(".popup-btn"),
          closePopup = document.querySelector(".popup-close");

    // Анимация появления popup'а
    const popupAnimated = (timeout=500) => {
      const timeGap = 10;       // временной шаг анимации
      const start = Date.now(); // время начала анимации

      const timer = setInterval( () => {
        // оставшееся время до конца анимации
        const timeLeft = timeout - (Date.now() - start);
        if (timeLeft < 0) {
          // закончить анимацию после истечения таймаута
          clearInterval(timer);
          return;
        }
        // отрисовать анимацию с учетом оставшегося времени
        draw(timeLeft);
      }, timeGap);

      // смещение popup'а с учетом оставшегося на анимацию времени и временного шага
      const draw = (timeLeft) => {
        const left = parseInt(popup.style.left);
        const shift = left / timeLeft * timeGap;
        if (Math.abs(left) - Math.abs(shift) <= 0) {
          popup.style.left = "0%";
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

    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };
  togglePopup();
  // === END OF === Popup ===


});
