const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const timer = document.querySelector('.timer');

const controlBtn = document.querySelector('.control-btn');
const roundBtn = document.querySelector('.round-btn');

const roundsList = document.querySelector('.round-list');

let isWorking = false;
let workingLink;
let time = {
  min: 0,
  sec: 0
};

let rounds = 0;

const getMaxNotes = () => {
  const width =  window.innerWidth;

  if (width > 530) {
    return 36;
  } else if (width > 480) {
    return 24;
  } else if (width > 430) {
    return 18;
  } else if (width > 380) {
    return 15;
  } else {
    return 8;
  };
};

const updateTime = () => {
  if (time.sec < 10) {
    seconds.textContent = `0${time.sec}`
  } else {
    seconds.textContent = time.sec;
  }
  if (time.min < 10) {
    minutes.textContent = `0${time.min}`
  } else {
    minutes.textContent = time.min;
  }
};

const clearTime = () => {
  minutes.textContent = '00';
  seconds.textContent = '00';
  time.sec = 0;
  time.min = 0;
};

const displayRound = working => {
  if (working) {
    roundBtn.style.opacity = 0;
    setTimeout(() => {
      roundBtn.style.display = 'none';
    }, 200);
  } else {
    roundBtn.style.display = 'block';
    setTimeout(() => {
      roundBtn.style.opacity = 1;
    }, 200);
  };
};

const getTimerNote = (min, sec, round) => {
  return `<li class="round-item">${round} round: ${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}</li>`
};

controlBtn.addEventListener('click', () => {
  timer.classList.toggle('working');
  roundsList.classList.toggle('working');
  displayRound(isWorking);
  if (isWorking) {
    clearInterval(workingLink);
    controlBtn.textContent = 'start';
    isWorking = false;
    clearTime();
    roundsList.innerHTML = '';
    rounds = 0;
  } else {
    isWorking = true;
    controlBtn.textContent = 'stop';
    workingLink = setInterval(() => {
      if (time.sec == 59) {
        time.min++;
        time.sec = 0;
      } else {
        time.sec++;
      };
      updateTime();
    }, 1000);
  };
});

roundBtn.addEventListener('click', () => {
  rounds++;

  if (rounds <= getMaxNotes()) {
    roundsList.innerHTML += getTimerNote(time.min, time.sec, rounds);
  };
});

