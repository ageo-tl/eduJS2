window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  // === Timer ===
  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
          timerMinutes = document.querySelector("#timer-minutes"),
          timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
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
    }

    function numFormat(n) {
      return isNaN(n) ?
                n :
                n.toLocaleString(undefined, {minimumIntegerDigits: 2});
    }

    function updateClock(timer) {
      timer = timer ? timer : getTimeRemaining();
      timerHours.textContent = numFormat(timer.hours);
      timerMinutes.textContent = numFormat(timer.minutes);
      timerSeconds.textContent = numFormat(timer.seconds);
    }

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


});
