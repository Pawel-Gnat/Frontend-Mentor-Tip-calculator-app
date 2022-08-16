/*
1. If all inputs are empty or not selected disable reset button else set button to working state
2. If custom or bill number input contains string or some kind of calc display error "Not a number" or if contains negative value display "Negative value" 
3. If tip input was selected and you want to change it to custom than remove checked state from declared value input
4. If custom input contains some value and you want to change it to declated tip value input, it resets to custom state again 
5. If people input contains string or some kind of calc display error "Not a number" or if contains negative value display "Negative value" or if contains "zero" value display "Can't be zero" 
6. Calculate tip amount by declaring custom value and divide by number of people or by calculating the percent of bill
7. Calculate total value by adding calculated tip amount and divided bill value by number of people
*/

const tipRadioButtonValue = document.querySelectorAll('.select_box__select--btn')
const tipValueInputs = document.querySelectorAll('.select_box__select--btn')
const result = document.querySelectorAll('.text_box__result')
const resetButton = document.querySelector('.outcome_box__reset_btn')
const inputConfig = [
	{
		input: (billInput = document.querySelector('#billInput')),
		error: (billTextError = document.querySelector('.select_box__bill_error')),
	},
	{
		input: (customTipInput = document.querySelector('.select_box__select--input')),
		error: (customTipTextError = document.querySelector('.select_box__select--custom_error')),
		canBeZero: true,
	},
	{
		input: (peopleInput = document.querySelector('#peopleInput')),
		error: (peopleTextError = document.querySelector('.select_box__people_error')),
	},
]
let tipValue

function disableResetButton() {
	if (billInput.value == '' && peopleInput.value == '') {
		resetButton.preventDefault
		resetButton.classList.add('disabled')
		resetButton.disabled = true
	} else {
		resetButton.classList.remove('disabled')
		resetButton.disabled = false
	}
}

function getErrorMessage(value, canBeZero) {
	// function displays error message while input contains inappropriate value
	const parsedValue = parseFloat(value)
	if (isNaN(parsedValue)) {
		return 'Not a number'
	} else if (!parsedValue && !canBeZero) {
		return "Can't be zero"
	} else if (parsedValue < 0) {
		return 'Negative value'
	} else {
		return ''
	}
}

function calculateTotal() {
	if (!customTipInput.value == '') {
		result[0].textContent = '$' + (parseInt(customTipInput.value) / parseInt(peopleInput.value)).toFixed(2)
	} else {
		result[0].textContent = '$' + ((parseInt(billInput.value) * tipValue) / parseInt(peopleInput.value)).toFixed(2)
	}

	result[1].textContent =
		'$' +
		(
			parseInt(billInput.value) / parseInt(peopleInput.value) +
			parseInt(result[0].textContent.replace(/\D/g, '')) / 100
		).toFixed(2)
}

customTipInput.addEventListener('click', e => {
	// function unchecks my %tip inputs if they were checked
	tipValueInputs.forEach(input => {
		input.checked = false
	})
})

for (let i = 0; i < tipValueInputs.length; i++) {
	// function set my custom tip input to default (if his value was declared), after clicking whichever of my other %tip inputs
	tipValueInputs[i].addEventListener('click', e => {
		customTipInput.value = ''
		tipValue = parseInt(tipRadioButtonValue[i].value) / 100 // variable tipValue is needed to calculate my tip amount for each person
		calculateTotal()
		disableResetButton()
	})
}

inputConfig.forEach(({ input, error, canBeZero }) => {
	input.addEventListener('change', e => {
		const errorMsg = getErrorMessage(e.target.value, canBeZero)
		error.textContent = errorMsg

		if (errorMsg) {
			input.classList.add('input_error')
			error.classList.add('error')
		} else {
			calculateTotal()
			disableResetButton()
			input.classList.remove('input_error')
			error.classList.remove('error')
		}
	})
})

function clearContent() {
	inputConfig.forEach(input => {
		input.input.value = ''
	})
	result[0].textContent = '$0.00'
	result[1].textContent = '$0.00'
}

resetButton.addEventListener('click', e => {
	clearContent()
	resetButton.classList.add('disabled')
	resetButton.disabled = true
})

window.onload = disableResetButton()
