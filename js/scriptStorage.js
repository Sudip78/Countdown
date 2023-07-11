let taskDate = document.querySelector(".date");
let taskMonth = document.querySelector(".month");
let taskYear = document.querySelector(".year");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// here we set our deadline/task date
let TDate = 17;
let TMonth = 5;
let TMonthName = months[TMonth - 1];
let TYear = 2023;
let time = "02:29:30";
let deadline = new Date(`${TMonthName} ${TDate} ${TYear} ${time}`);

function getValues() {
  // get the values from localstorage
  // set month, year etc
  const dateStr = localStorage.getItem("deadline");
  // console.log("dateStr", dateStr);

  if (dateStr) {
    deadline = new Date(dateStr);
    // console.log("dateStr-deadline", deadline);
  }

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

    // console.log('date', date);
    // console.log('newdate', newDate);

    const diff = newDate - date;
    // console.log("diff", diff);

    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysdiff = diff / (1000 * 60 * 60 * 24);
    const day=1000 * 60 * 60 * 1;
    console.log(day);
    const remainingWeeks = parseInt(daysdiff / 7);
    const remainingDays = parseInt(daysdiff % 7);

    document.querySelector(".weeks").innerHTML = remainingWeeks < 10 ? "0" + remainingWeeks : remainingWeeks;
    document.querySelector(".days").innerHTML = remainingDays < 10 ? "0" + remainingDays : remainingDays;
    document.querySelector(".hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.querySelector(".minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.querySelector(".seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if(hours==0 && minutes===0 && remainingDays===0 && remainingWeeks===0 && seconds<=11){
      document.querySelector("#timer-section").classList.add("hidden");
      document.getElementById("clock").classList.remove("hidden");

          let timeLeft = 10;
          function countdown() {
            
            document.getElementById("seconds").innerHTML = String( timeLeft );
            if (timeLeft >= 0) {
              setTimeout(countdown, 1000);
            }
            timeLeft--;
            // confetti({
            //   particleCount: 100,
            //   spread: 70,
            //   origin: { y: 0.6 },
            // });
          };
          setTimeout(countdown, 1000);
    }


    if (diff < 0) {
      //show confetti and hide timer
      document.getElementById("clock").classList.add("hidden");
      document.querySelector("#timer-section").classList.add("hidden");
      document.getElementById("confetti").classList.remove("hidden");
      document.getElementById("confetti-section").classList.remove("hidden");

      // store in localstorage
      deadline.setFullYear(deadline.getFullYear() + 1);
      localStorage.setItem("deadline", deadline.toString());

      setTimeout(() => {
        //hide confetti and show timer
        document.getElementById("timer-section").classList.remove("hidden");
        document.getElementById("confetti-section").classList.add("hidden");
        document.getElementById("confetti").classList.add("hidden");
      }, day);

      clearInterval(countdown);
      resetTimer();
    }
  }, 1000);
};

getValues();
// resetTimer();
