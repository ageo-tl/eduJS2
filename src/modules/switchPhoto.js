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

export default switchPhoto;
