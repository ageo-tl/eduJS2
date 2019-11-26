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

export default toggleMenu;
