document.addEventListener('DOMContentLoaded', function (){
const dateTimeInput = document.getElementById('date-time');
const startBtn = document.getElementById('start-btn');
const resetBtn =  document.getElementById('resetBtn');
const daysElement = document.getElementById('day');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const messageElement = document.getElementById('message');
});

let countdownInterval;

//set minimum datetime to current time

const now = new Date();
const timezoneOffset = now.getTimezoneOffset() * 60000;

const localISOTime = (new Date(now - timezoneOffset)).toISOString().slice(0,16);
dateTimeInput.min = localISOTime;

startBtn.addEventListener('click' , startCountdown);
resetBtn.addEventListener('click', resetBtn);


function startCountdown(){
    const selectedDateTime = dateTimeInput.value;

    if(!selectedDateTime){
        alert('Please select a date and time');
        return;
    }
    //clear any existing countdown

    if(countdownInterval){
        clearInterval(countdownInterval);
    }
    // hide msg if shown
    messageElement.classList.remove('active');
    
    //calculate the target time (convert from local to UTC)

    const targetTime = new Date(selectedDateTime).getTime();

    //update countdown immediately

    updateCountdown(targetTime);

    //Then update every second
    countdownInterval = setInterval(() => updateCountdown(targetTime), 1000); 
}