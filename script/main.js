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
    const menu = document.querySelector("menu");

    const handlerMenu = (event) => {
      const { target } = event;
      if (menu.classList.contains("active-menu") && !target.closest("menu")) {
        menu.classList.remove("active-menu");
      }
      if (target.closest(".menu, .close-btn, menu>ul>li")) {
        menu.classList.toggle("active-menu");
      }
    };

    document.addEventListener("click", handlerMenu);

  };
  toggleMenu();
  // === END OF === Menu ===

  // === SCROLL ===
  const scrollToElement = () => {

    // Расчет прогресса от времени
    const quad = (timeFraction) => {
      return Math.pow(timeFraction, 2);
    };

    // Прокрутка страницы
    const draw = (current, target, progress) => {
      document.documentElement.scrollTop =
          current + (target - current) * progress;
    };

    // Анимация прокрутки страницы
    const scrollPage = ({
      timing, draw, duration, currentScroll, targetScroll
    }) => {
      const curDraw = draw.bind(null, currentScroll, targetScroll);
      const start = performance.now();

      const animate = (time) => {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) { timeFraction = 1; }

        // вычисление текущего состояния анимации и ее отрисовка
        const progress = timing(timeFraction);
        curDraw(progress);

        // рекурсия по условию
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const itemsMenu = document.querySelectorAll("menu>ul>li");
    const btnNext = document.querySelector("main>a[href='#service-block']");
    const allItems = [...itemsMenu, btnNext];

    allItems.forEach( (item) => {
      let it;
      if ("hash" in item) {
        it = item;
      } else {
        it = item.querySelector("a[href*='#']");
      }
      const anchor = it.hash.slice(1);
      item.addEventListener("click", (event) => {
        event.preventDefault();
        scrollPage({
              timing: quad,
              draw: draw,
              duration: 500,
              currentScroll: document.documentElement.scrollTop,
              targetScroll: document.getElementById(anchor).offsetTop
            });
      });
    });
  };
  scrollToElement();
  // === END OF === SCROLL ===

  // === Popup ===
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
  togglePopup();
  // === END OF === Popup ===


  // === Tabs ===
  const switchTabs = () => {
    const tabHeader = document.querySelector(".service-header"),
          tabs = document.querySelectorAll(".service-header-tab"),
          tabsContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabsContent.length; i++) {
        if (index === i) {
          tabs[i].classList.add("active");
          tabsContent[i].classList.remove("d-none");
        } else {
          tabs[i].classList.remove("active");
          tabsContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      const target = event.target.closest(".service-header-tab");
      if (target) {
        tabs.forEach( (item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });

  };
  switchTabs();
  // === END OF === Tabs ===

});
