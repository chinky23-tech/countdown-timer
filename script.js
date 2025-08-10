document.addEventListener('DOMContentLoaded', function() {
    const dateTimeInput = document.getElementById('date-time');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const messageElement = document.getElementById('message');
    
    let countdownInterval;
    
    // Set minimum datetime to current time
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - timezoneOffset)).toISOString().slice(0, 16);
    dateTimeInput.min = localISOTime;
    
    startBtn.addEventListener('click', startCountdown);
    resetBtn.addEventListener('click', resetCountdown);
    
    function startCountdown() {
        const selectedDateTime = dateTimeInput.value;
        
        if (!selectedDateTime) {
            alert('Please select a date and time');
            return;
        }
        
        // Clear any existing countdown
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // Hide message if shown
        messageElement.classList.remove('active');
        
        // Calculate the target time (convert from local to UTC)
        const targetTime = new Date(selectedDateTime).getTime();
        
        // Update countdown immediately
        updateCountdown(targetTime);
        
        // Then update every second
        countdownInterval = setInterval(() => updateCountdown(targetTime), 1000);
    }
    
    function updateCountdown(targetTime) {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        if (distance <= 0) {
            clearInterval(countdownInterval);
            displayComplete();
            return;
        }
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
    }
    
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    function displayComplete() {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        messageElement.textContent = 'Countdown Complete!';
        messageElement.classList.add('active');
    }
    
    function resetCountdown() {
        clearInterval(countdownInterval);
        dateTimeInput.value = '';
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        messageElement.classList.remove('active');
    }
});