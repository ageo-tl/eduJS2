import { generalAnimation, quad } from './animation';

const scrollToElement = () => {

  // Прокрутка страницы
  const scrollPage = (current, target, progress) => {
    document.documentElement.scrollTop =
        current + (target - current) * progress;
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
      const scrolling = scrollPage.bind(null,
                                  document.documentElement.scrollTop,
                                  document.getElementById(anchor).offsetTop);
      generalAnimation({
                timing: quad,
                draw: scrolling,
                duration: 500,
          });
    });
  });
};

export default scrollToElement;
