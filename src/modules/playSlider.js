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

export default playSlider;
