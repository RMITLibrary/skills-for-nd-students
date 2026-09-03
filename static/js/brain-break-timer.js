document.addEventListener('DOMContentLoaded', function () {

    const totalTime = 120;          // 2 minutes, in seconds
    const progressInterval = 100;   // Update progress every 100 milliseconds
    const displayInterval = 1000;  // Update displayed time every 5 seconds

    //initialise display circle
    const progressCircle = document.querySelector('.timer-progress');
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

	//get reference to timer, digits
	const timerContainer = document.getElementById('timer-container');
	const digitsDiv = document.getElementById('digits');

    //create values for the timer
    const startTime = Date.now();
    const endTime = startTime + totalTime * 1000;

    let progressTimer;
    let displayTimer;

	let timerExpired = false;

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
        if (timer.milliseconds <= 0 && !timerExpired) {
			timerExpired = true;

			clearInterval(progressTimer);
			clearInterval(displayTimer);

			console.log('Countdown complete');

			// Ensure the final value is displayed
			updateDisplayedTime();

			// Notify other scripts that the timer has expired
			document.dispatchEvent(new CustomEvent('timer:expired'));
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
		const value = String(newValue);

		//if digit is the same as existing one, return
		if (digit.textContent === value) {
			return;
		}

		digit.textContent = value;

		/* //fade code not needed
		digit.classList.add('is-fading');

		setTimeout(function () {
			digit.textContent = value;
			digit.classList.remove('is-fading');
		}, 100); */
	}

	timerContainer.addEventListener('click', function (event) {
		if(digitsDiv.hidden === true) {
			digitsDiv.hidden = false;
		}
		else {
			digitsDiv.hidden = true;
		}
	});


    // Output initial values immediately
    updateProgress();
    updateDisplayedTime();

    //set intervals
    progressTimer = setInterval(updateProgress, progressInterval);
    displayTimer = setInterval(updateDisplayedTime, displayInterval);
});