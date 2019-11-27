const phoneValid = ({ target: phone }) => {
  if (phone.value.trim().match(/^\+?\d+$/)) {
    phone.style.border = "";
    return true;
  } else {
    phone.style.border = "2px solid red";
    return false;
  }
};

const notEmptyValid = ({ target }) => {
  if (target.value.trim().length) {
    target.style.border = "";
    return true;
  } else {
    target.style.border = "2px solid red";
    return false;
  }
};

export { phoneValid, notEmptyValid };
