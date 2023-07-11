let taskDate = document.querySelector(".date");
let taskMonth = document.querySelector(".month");
let taskYear = document.querySelector(".year");
let timerSection = document.querySelector("#timer-section");
let confettiCanvas = document.getElementById("confetti");
let confettiSection = document.getElementById("confetti-section");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// here we set our deadline/task date
let TDate = 17;
let TMonth = 5;
let TMonthName = months[TMonth - 1];
let TYear = 2023;
let time = "21:31:59";
let deadline = new Date(`${TMonthName} ${TDate} ${TYear} ${time}`);

// today date and time
const currentDate = new Date();

// const todayDate = new Date(`${currentDate.getMonth() + 1} ${currentDate.getDate()} ${currentDate.getFullYear()}`);
const currentTime = (currentDate.getHours() * (1000 * 60 * 60)) + (currentDate.getMinutes() * (1000 * 60)) + (currentDate.getSeconds() * 1000);
// let deadlineDate = new Date(`${TMonthName} ${TDate} ${TYear}`);
let deadlineTime = (deadline.getHours() * (1000 * 60 * 60)) + (deadline.getMinutes() * (1000 * 60)) + (deadline.getSeconds() * 1000);

// show confetti when date and month matched
function showConfetti() {
  if(deadline.getDate()===currentDate.getDate() && deadline.getMonth() + 1 === currentDate.getMonth() + 1){
      //show confetti and hide timer
      timerSection.classList.add("hidden");
      confettiCanvas.classList.remove("hidden");
      confettiSection.classList.remove("hidden");
  }else{
        //hide confetti and show timer
        timerSection.classList.remove("hidden");
        confettiCanvas.classList.add("hidden");
        confettiSection.classList.add("hidden");
  }
}
// showConfetti();


function getValues() {
  // get the values from localstorage
  // set month, year etc
  // const dateStr = localStorage.getItem("deadline");
  // console.log("dateStr", dateStr);

  // if (dateStr) {
    // deadline = new Date(dateStr);
  // } else {
    if (deadline - currentDate <= 0 && deadlineTime - currentTime <= 0) {
      deadline.setFullYear(currentDate.getFullYear() + 1);
    } else if (deadline - currentDate <= 0) {
      deadline.setFullYear(currentDate.getFullYear());
    }
  // }

  resetTimer();
}

const resetTimer = () => {
  TDate = deadline.getDate();
  TMonth = deadline.getMonth() + 1;
  TYear = deadline.getFullYear();
  TMonthName = months[TMonth - 1];
  time = `${deadline.getHours()}:${deadline.getMinutes()}:${deadline.getSeconds()}`;

  // show deadline/task date on HTML page
  taskDate.innerHTML = TDate;
  taskMonth.innerHTML = TMonthName;
  taskYear.innerHTML = TYear;

  // deadline time in milliseconds
  const newDate = new Date(`${TMonthName} ${TDate} ${TYear} ${time}`).getTime();

  const countdown = setInterval(() => {
    const date = new Date().getTime(); // current time in milliseconds

    const diff = newDate - date;
    // console.log("diff", diff);

    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysdiff = diff / (1000 * 60 * 60 * 24);
    const remainingWeeks = parseInt(daysdiff / 7);
    const remainingDays = parseInt(daysdiff % 7);

    document.querySelector(".weeks").innerHTML = remainingWeeks < 10 ? "0" + remainingWeeks : remainingWeeks;
    document.querySelector(".days").innerHTML = remainingDays < 10 ? "0" + remainingDays : remainingDays;
    document.querySelector(".hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.querySelector(".minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.querySelector(".seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;


    // if(hours===0 && minutes===0 && remainingDays===0 && remainingWeeks===0 && seconds<=11){
    //   document.querySelector("#timer-section").classList.add("hidden");
    //   document.querySelector(".clock").classList.remove("hidden");

    //   let timeLeft=10;
    //   function countTime(){
    //     document.getElementsByClassName('clock').innerHTML=timeLeft;
    //     if(timeLeft>=0){
    //       setTimeout(countTime,1000);
    //     }
    //     timeLeft--;
    //   };
    //   setTimeout(countTime,1000);
    // }

    if(hours===0 && minutes===0 && remainingDays===0 && remainingWeeks===0 && seconds<=10){
      document.querySelector("#timer-section").classList.add("hidden");
      document.querySelector(".clock").classList.remove("hidden");
      document.querySelector(".clock").innerHTML=seconds;


    }


    if (diff < 0) {
      // do this for 30 seconds
        // var duration = 5 * 1000;
        // var end = Date.now() + duration;

        // (function frame() {
        //   // launch a few confetti from the left edge
        //   confetti({
        //     particleCount: 7,
        //     angle: 60,
        //     spread: 55,
        //     origin: { x: 0 }
        //   });
        //   // and launch a few from the right edge
        //   confetti({
        //     particleCount: 7,
        //     angle: 120,
        //     spread: 55,
        //     origin: { x: 1 }
        //   });

        //   // keep going until we are out of time
        //   if (Date.now() < end) {
        //     requestAnimationFrame(frame);
        //   }
        // }());

        const end = Date.now() + 15 * 1000;

        // go Buckeyes!
        const colors = ["#bb0000", "#ffffff"];

        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });

          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();













      //show confetti and hide timer
      document.querySelector(".clock").classList.add("hidden");


      document.querySelector("#timer-section").classList.add("hidden");
      document.getElementById("confetti").classList.remove("hidden");
      document.getElementById("confetti-section").classList.remove("hidden");

      // store in localstorage
      deadline.setFullYear(deadline.getFullYear() + 1);
      // localStorage.setItem("deadline", deadline.toString());

      setTimeout(() => {
        // hide confetti and show timer
        document.getElementById("timer-section").classList.remove("hidden");
        document.getElementById("confetti-section").classList.add("hidden");
        document.getElementById("confetti").classList.add("hidden");
      }, 5000);

      clearInterval(countdown);
      resetTimer();
    }
  }, 1000);
};

getValues();
// resetTimer();


