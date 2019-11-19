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


  // === Slider ===
  const playSlider =() => {
    const slider =document.querySelector(".portfolio-content"),
          slides = document.querySelectorAll(".portfolio-item");

    let currentSlide = 0,     // Счетчик слайда
        idInterval,           // id для setInterval
        dots;                 //список элементов-"точек"

    // Добавление "точек" на слайдер
    const addDots = () => {
      const dotPlace = document.querySelector(".portfolio-dots");
      const newDot = document.createElement("li");
      newDot.classList.add("dot");
      for (let i = 0; i < slides.length; i++) {
        const dot = dotPlace.appendChild(newDot.cloneNode());
        if (!i) { dot.classList.add("dot-active"); }
      }
      dots = document.querySelectorAll(".dot");
    };

    const prevSlide = (elems, index, strClass) => {
      // Действия для скрытия (элементов) слайда
      elems[index].classList.remove(strClass);
    };
    const nextSlide = (elems, index, strClass) => {
      // Действия для отображения (элементов) слайда
      elems[index].classList.add(strClass);
    };

    const autoPlaySlider = () => {
      prevSlide(slides, currentSlide, "portfolio-item-active");
      prevSlide(dots, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slides.length) { currentSlide = 0; }
      nextSlide(slides, currentSlide, "portfolio-item-active");
      nextSlide(dots, currentSlide, "dot-active");
    };

    const startSlider = ( time = 3000) => {
      idInterval = setInterval(autoPlaySlider, time);
    };

    const stopSlider = () => {
      clearInterval(idInterval);
    };

    // Обработка событий клика над кнопками-стрелками и по "точкам"
    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let { target } = event;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      // Скроем предыдущий слайд
      prevSlide(slides, currentSlide, "portfolio-item-active");
      prevSlide(dots, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dots.forEach( (dot, index) => {
          if (dot === target) {
            currentSlide = index;
          }
        });
      }
      // Проверка индекса салйда
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }

      // Отобразим следующий слайд
      nextSlide(slides, currentSlide, "portfolio-item-active");
      nextSlide(dots, currentSlide, "dot-active");

    });

    // События наведения курсора на кнопки-стрелки и "точки"
    slider.addEventListener("mouseover", (event) => {
      if (event.target.matches(".portfolio-btn, .dot")) {
        stopSlider();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (event.target.matches(".portfolio-btn, .dot")) {
        startSlider();
      }
    });

    // Добавим "точки" на слайдер
    addDots();
    // Поехали!
    startSlider();

  };
  playSlider();
  // ===END OF === Slider ===


  // === Command Photo ===
  const switchPhoto = () => {
    const command = document.getElementById("command"),
          commandRow = command.querySelector(".row"),
          photos = [...(document.querySelectorAll(".command__photo"))];

    // События прохода курсора над фото
    commandRow.addEventListener("mouseover", (event) => {
      const { target } = event;
      if (photos.indexOf(target) >= 0) {
        target.dataset.defaultImg = target.getAttribute("src");
        target.setAttribute("src", target.dataset.img);
      }
    });
    commandRow.addEventListener("mouseout", (event) => {
      const { target } = event;
      if (photos.indexOf(target) >= 0) {
        target.setAttribute("src", target.dataset.defaultImg);
      }
    });
  };
  switchPhoto();
  // === END OF === Command Photo ===


  // === Calc ===
  const calcCheckInput = () => {
    const calc = document.querySelector(".calc-block"),
          calcItems = calc.querySelectorAll(".calc-item");

    // Поменяем тип input'а на text, чтобы при удалении символов-нецифр
    // не удалялся остальной ввод
    calcItems.forEach( (item) => {
      if (item.matches(".calc-square, .calc-count, .calc-day")) {
        item.setAttribute("type", "text");
      }
    });

    calc.addEventListener("input", (event) => {
      const { target } = event;
      if (target.matches(".calc-square, .calc-count, .calc-day")) {
        // Удаляем нецифровые символы, если есть
        target.value = target.value.replace(/\D/g, "");
      }
    });
  };
  calcCheckInput();

  const calc = (price=100) => {
    const calcBlock = document.querySelector(".calc-block"),
          calcType = document.querySelector(".calc-type"),
          calcSquare = document.querySelector(".calc-square"),
          calcCount = document.querySelector(".calc-count"),
          calcDay = document.querySelector(".calc-day"),
          totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;

      // Тип помещения и площадь
      const typeValue = calcType.options[calcType.options.selectedIndex].value,
            squareValue = +calcSquare.value;

      // Количество помещений и сроки
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10 ;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      // Итого
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const { target } = event;
      if (target.matches(".calc-item")) {
        countSum();
      }
    });
  };
  calc();
  // === END OF === Calc ===


});
