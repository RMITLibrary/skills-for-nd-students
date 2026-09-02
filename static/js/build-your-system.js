document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const q1Form = document.getElementById('build-q1');
    const q2Form = document.getElementById('build-q2');
    const q3Form = document.getElementById('build-q3');
    const planDiv = document.getElementById('plan');
    const q2Highlight = document.getElementById('build-q2-question-highlight');
	const q2HighlightList = document.getElementById('build-q2-question-highlight-list');
	const challengeStatementSpan = document.getElementById('build-challenge-statement');
    const challengeTextSpan = document.getElementById('build-challenge');
	const challengeList = document.getElementById('build-challenge-list')
    const tech1Span = document.getElementById('build-technique1');
    const tech2Span = document.getElementById('build-technique2');
    const techMainSpan = document.getElementById('build-technique-main');
    const restartBtn = planDiv.querySelector('.prev-question');

    planDiv.hidden = true;

    const techniqueMapping = {
        'Pomodoro technique': { toolsId: 'tools-pomodoro', infoId: 'info-pomodoro' },
        'Body doubling': { toolsId: 'tools-body-doubling', infoId: 'info-body-doubling' },
        'Prioritisation': { toolsId: 'tools-prioritisation', infoId: 'info-prioritisation' },
        'Create urgency': { toolsId: 'tools-create-urgency', infoId: 'info-create-urgency' },
        '5-minute rule': { toolsId: 'tools-5-minute-rule', infoId: 'info-5-minute-rule' },
        'Make it pleasant': { toolsId: 'tools-make-it-pleasant', infoId: 'info-make-it-pleasant' },
        'Gamify it': { toolsId: 'tools-gamify-it', infoId: 'info-gamify-it' },
        'Break down assessments': { toolsId: 'tools-break-down-assessments', infoId: 'info-break-down-assessments' },
        'Schedule and time block': { toolsId: 'tools-schedule-timeblock', infoId: 'info-schedule-timeblock' },
        'Externalising': { toolsId: 'tools-externalising', infoId: 'info-externalising' }
    };

    function hideAllTechniqueBlocks() {
        Object.values(techniqueMapping).forEach(map => {
            if (map.toolsId) {
                const tools = document.getElementById(map.toolsId);
                if (tools) tools.hidden = true;
            }
            if (map.infoId) {
                const info = document.getElementById(map.infoId);
                if (info) info.hidden = true;
            }
        });
    }
    hideAllTechniqueBlocks();

    function getCheckedRadioValue(name) {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (!checked) return null;
        const label = checked.closest('.form-check').querySelector('label');
        return label ? label.textContent.trim() : null;
    }

    function getCheckedCheckboxLabels(container) {
        const labels = [];
        container.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
            const label = input.closest('.form-check').querySelector('label');
            if (label) labels.push(label.textContent.trim());
        });
        return labels;
    }

    // STEP 1 → 2
    q1Form.addEventListener('submit', function (e) {
        e.preventDefault();
        /* const challenge = getCheckedRadioValue('radio-challenge');
        if (!challenge) {
            alert('Please select at least one time management challenge.');
            return;
        } */

		//throw error if nothing is selected
		const challenge = getCheckedCheckboxLabels(q1Form);
        if (challenge.length < 1) {
            alert('Please select at least one time management challenge.');
            return;
        }

		//remove everything from challengeTextSpan
		while (challengeTextSpan.firstChild) {
			challengeTextSpan.removeChild(challengeTextSpan.firstChild);
		}
		
		if(challenge.length === 1) {
			//if we have only one challenge, format the text and add it to questino 2 page
			q2Highlight.textContent = challenge[0].toLowerCase();

			//show the single highlight, hide the list
			q2Highlight.hidden = false;
			q2HighlightList.hidden = true;

			//do the same thing for the final plan, change statement text and add the challenge
			challengeStatementSpan.textContent = "The biggest time management challenge I have is ";

			//add in bold content
			const myStrong = document.createElement('strong');
			myStrong.textContent = challenge[0].toLowerCase() +".";
			challengeTextSpan.appendChild(myStrong);

			//show the single highlight, hide the list
			challengeTextSpan.hidden = false;
			challengeList.hidden = true;
		}
		else {
			//if we have more than one challenge

			//remove all previous highlights from both lists (q2 and final plan)
			while (q2HighlightList.firstChild) {
				q2HighlightList.removeChild(q2HighlightList.firstChild);
			}

			while (challengeList.firstChild) {
				challengeList.removeChild(challengeList.firstChild);
			}

			//change language of final plan intro
			challengeStatementSpan.textContent = "The biggest time management challenges I have are:";

			//loop and make a list for  question 2 and final plan
			for(var i=0; i < challenge.length; i++) {

				//creat list items for both lists
				createListItem(challenge[i], q2HighlightList, "lead");
				createListItem(challenge[i], challengeList, "strong");
			}

			//hide single highlight, show the list
			q2Highlight.hidden = true;
			q2HighlightList.hidden = false;

			//do the same for the final plan
			challengeTextSpan.hidden = true;
			challengeList.hidden = false;
		}
        
        q1Form.hidden = true;
        q2Form.hidden = false;
        q3Form.hidden = true;
        planDiv.hidden = true;

		fish();
    });

	function createListItem(myText, myParent, myClass) {
		
		const mySpan = document.createElement('span');
		const myItem = document.createElement('li');
		if(myClass) {
			mySpan.setAttribute("class", myClass);
		}

		mySpan.textContent = myText;
		myItem.appendChild(mySpan);
		myParent.appendChild(myItem);
	}

    // STEP 2 → 3
    q2Form.addEventListener('submit', function (e) {
        e.preventDefault();
        const techniques = getCheckedCheckboxLabels(q2Form);
        if (techniques.length < 2) {
            alert('Please select at least two techniques.');
            return;
        }

        tech1Span.textContent = techniques[0].toLowerCase();
        tech2Span.textContent = techniques[1].toLowerCase();

        const optionContainer = q3Form.querySelector('.option-container');
        optionContainer.innerHTML = '';
        techniques.forEach((tech, index) => {
            const id = 'build-q3-' + index;
            const wrapper = document.createElement('div');
            wrapper.className = 'form-check';

            const input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'radio';
            input.name = 'radio-technique';
            input.id = id;

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = id;
            label.textContent = tech;

            wrapper.appendChild(input);
            wrapper.appendChild(label);
            optionContainer.appendChild(wrapper);
        });

        q1Form.hidden = true;
        q2Form.hidden = true;
        q3Form.hidden = false;
        planDiv.hidden = true;

		fish();
    });

    // STEP 3 → PLAN
    q3Form.addEventListener('submit', function (e) {
        e.preventDefault();
        const chosenTechnique = getCheckedRadioValue('radio-technique');
        if (!chosenTechnique) {
            alert('Please select a technique to try.');
            return;
        }

        techMainSpan.textContent = chosenTechnique.toLowerCase();

        hideAllTechniqueBlocks();
        const mapping = techniqueMapping[chosenTechnique];
        if (mapping) {
            if (mapping.toolsId) {
                const tools = document.getElementById(mapping.toolsId);
                if (tools) tools.hidden = false;
            }
            if (mapping.infoId) {
                const info = document.getElementById(mapping.infoId);
                if (info) info.hidden = false;
            }
        }

        q1Form.hidden = true;
        q2Form.hidden = true;
        q3Form.hidden = true;
        planDiv.hidden = false;

		fish();
    });

    // NEW: BACK BUTTONS
    const backButtons = document.querySelectorAll('.prev-question');

    backButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const parentForm = btn.closest('form') || btn.closest('#plan');

            // From Q2 → back to Q1
            if (parentForm === q2Form) {
                q1Form.hidden = false;
                q2Form.hidden = true;
                q3Form.hidden = true;
                planDiv.hidden = true;
                return;
            }

            // From Q3 → back to Q2
            if (parentForm === q3Form) {
                q1Form.hidden = true;
                q2Form.hidden = false;
                q3Form.hidden = true;
                planDiv.hidden = true;
                return;
            }

            // From PLAN → restart (existing behaviour)
            if (parentForm === planDiv) {
                // same as your RESTART handler
                q1Form.reset();
                q2Form.reset();
                q3Form.reset();

                planDiv.hidden = true;
                q1Form.hidden = false;
                q2Form.hidden = true;
                q3Form.hidden = true;
                hideAllTechniqueBlocks();

				fish();
            }
        });
    });

    // You can remove this dedicated restart handler if you keep the unified one above,
    // or leave it if you prefer (but it will duplicate behaviour):
    restartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        q1Form.reset();
        q2Form.reset();
        q3Form.reset();
        planDiv.hidden = true;
        q1Form.hidden = false;
        q2Form.hidden = true;
        q3Form.hidden = true;
        hideAllTechniqueBlocks();
    });

	function fish() {
		document.getElementById('build-title').scrollIntoView({
			behaviour: 'smooth',
			block: 'start'
		});
	}
});