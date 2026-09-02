document.addEventListener('DOMContentLoaded', function () {

    const totalTime = 180;          // 3 minutes, in seconds
    const progressInterval = 100;   // Update progress every 100 milliseconds
    const displayInterval = 15000;  // Update displayed time every 15 seconds

    //initialise display circle
    const progressCircle = document.querySelector('.timer-progress');
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    //create values for the timer
    const startTime = Date.now();
    const endTime = startTime + totalTime * 1000;

    let progressTimer;
    let displayTimer;

    function getRemainingTime() {
        const remainingMilliseconds = Math.max(0, endTime - Date.now());

        return {
            milliseconds: remainingMilliseconds,
            seconds: Math.ceil(remainingMilliseconds / 1000),
            progress: remainingMilliseconds / (totalTime * 1000)
        };
    }

    function updateProgress() {
        const timer = getRemainingTime();
        const elapsedProgress = 1 - timer.progress;

        //update the amount of the circle displaying
        const offset = circumference * (1 - elapsedProgress);
        progressCircle.style.strokeDashoffset = offset;

        //timer is complere
        if (timer.milliseconds <= 0) {
            clearInterval(progressTimer);
            clearInterval(displayTimer);

            console.log('Countdown complete');
        }
    }

    //update every displayInterval milliseconds
    function updateDisplayedTime() {
        const timer = getRemainingTime();

        const totalSeconds = timer.seconds;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const timeString =
            String(minutes).padStart(2, '0') +
            String(seconds).padStart(2, '0');

        updateDigit('ten-minutes', timeString[0]);
        updateDigit('minutes', timeString[1]);
        updateDigit('ten-seconds', timeString[2]);
        updateDigit('seconds', timeString[3]);
    }

    //update digits - fade them
    function updateDigit(id, newValue) {
        const digit = document.getElementById(id);

        digit.classList.add('is-fading');

        setTimeout(function () {
            digit.textContent = newValue;
            digit.classList.remove('is-fading');
        }, 300);
    }

    // Output initial values immediately
    updateProgress();
    updateDisplayedTime();

    //set intervals
    progressTimer = setInterval(updateProgress, progressInterval);
    displayTimer = setInterval(updateDisplayedTime, displayInterval);
});