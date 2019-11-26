"use strict";

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import scrollToElement from './modules/scrollToElement';
import togglePopup from './modules/togglePopup';
import switchTabs from './modules/switchTabs';
import playSlider from './modules/playSlider';
import switchPhoto from './modules/switchPhoto';
import { calcCheckInput, calc } from './modules/calc';
import phoneValid from './modules/phoneValid';
import cyrillicFilter from './modules/cyrillicFilter';
import sendForm from './modules/sendForm';


// === Timer ===
// countTimer("12 november 2019");
const date = new Date();
date.setDate(date.getDate() + 1);
countTimer(date.toDateString());

// === Menu ===
toggleMenu();

// === SCROLL ===
scrollToElement();

// === Popup ===
togglePopup();

// === Tabs ===
switchTabs();

// === Slider ===
playSlider();

// === Command Photo ===
switchPhoto();

// === Calc ===
calcCheckInput();
calc();

// === Validation ===
// Валидация телефона
const phones = document.querySelectorAll("input[id$='phone']");
phones.forEach( (phone) => {
  phone.addEventListener("change", phoneValid);
});

// === Input filtering ===
const cyrFields = document.querySelectorAll("input[id$='name'],[id$='message']");
cyrFields.forEach( (field) => {
  field.addEventListener("input", cyrillicFilter);
});

// === Send-ajax-form ===
sendForm();
