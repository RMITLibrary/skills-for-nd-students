document.addEventListener('DOMContentLoaded', function () {

	const fidgetGrid = document.getElementById('fidget-grid');
	const noOfItems = 24;
	var itemArr = [];

	const autoplayInterval = 10;
	let autoplayTimer = null;

	//colClassArr referemnces a bunch of styles defined in css
	const colClassArr = ['col-1', 'col-2', 'col-3', 'col-4', 'col-5'];
	const colNeutralClass = 'neutral';

	let previousColour = null;

	//listen for timer expired event
	document.addEventListener('timer:expired', function () {
		if (autoplayTimer !== null) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}

		console.log('Grid autoplay stopped');
	});

	// Random integer from min to max, inclusive
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function changeItemColour(myDiv) {
		// Exclude the colour selected on the previous click
		const availableColours = colClassArr.filter(function (colour) {
			return colour !== previousColour;
		});

		const randomIndex = randomNumber(0, availableColours.length - 1);
		const newColour = availableColours[randomIndex];

		// Remember this colour for the next click
		previousColour = newColour;

		// Remove the existing colour classes
		myDiv.classList.remove(colNeutralClass, ...colClassArr);

		// Apply the new colour
		myDiv.classList.add(newColour);

		// Restart the animation every time the tile is clicked
		myDiv.classList.remove('colour-change');

		void myDiv.offsetWidth; // Forces the browser to restart the animation
		myDiv.classList.add('colour-change');
	}

	function changeItemShape(myDiv) {
		//if circle exists, remove and and change back to square
		if (myDiv.classList.contains('circle')) {
			myDiv.classList.remove('circle');
		} 
		else {
			//change shape to circle 20 percent of the time
			const myRand = randomNumber(1, 5);
			if(myRand === 2) {
				myDiv.classList.add('circle');
			}	
		}
	}

	//create grid
    function createGrid() {
        for(var i=0; i < noOfItems; i++) {
			//create grid items
			const myDiv = document.createElement('div');
			myDiv.setAttribute('class', 'neutral');
			myDiv.setAttribute('id', 'item'+i);
			fidgetGrid.appendChild(myDiv);

			//on click, change the item's colour and maybe shape
			myDiv.addEventListener('click', function (event) {
				const selectedItem = event.currentTarget;

				changeItemColour(selectedItem);
				changeItemShape(selectedItem);

				clearInterval(autoplayTimer);
				autoplayTimer = null;
			});

			itemArr.push(myDiv);
		}
    }

    //create the grid
    createGrid();

	//set a timer and automatically start shapes changing colour, cancel upon interaction
	autoplayTimer = setInterval(autoplay, autoplayInterval*1000);

	function autoplay() {
		
		//grab an random item and change colour
		const randomIndex = randomNumber(0, itemArr.length - 1);
		changeItemColour(itemArr[randomIndex]);
		changeItemShape(itemArr[randomIndex]);
	}
});

