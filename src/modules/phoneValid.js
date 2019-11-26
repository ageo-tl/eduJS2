const phoneValid = ({ target: phone }) => {
  if (phone.value.trim().match(/^\+?\d+$/)) {
    phone.style.border = "2px solid green";
    return true;
  } else {
    phone.style.border = "2px solid red";
    return false;
  }
};

export default phoneValid;
