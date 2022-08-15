/*
1. If all inputs are empty or not selected disable reset button else set button to working state
2. If custom or bill number input contains string or some kind of calc display error "Not a number" or if contains negative value display "Negative value" 
3. If tip input was selected and you want to change it to custom than remove checked state from declared value input
4. If custom input contains some value and you want to change it to declated tip value input, it resets to custom state again 
5. If people input contains string or some kind of calc display error "Not a number" or if contains negative value display "Negative value" or if contains "zero" value display "Can't be zero" 
6. Calculate tip amount by declaring custom value and divide by number of people or by calculating the percent of bill
7. Calculate total value by adding calculated tip amount and divided bill value by number of people
*/

const customTipInput = document.querySelector('.select_box__select--input')
const customTipTextError = document.querySelector('.select_box__select--custom_error')
const tipRadioButtonValue = document.querySelectorAll('.select_box__select--btn')
const tipValueInputs = document.querySelectorAll('.select_box__select--btn')
const billInput = document.querySelector('#billInput')
const billTextError = document.querySelector('.select_box__bill_error')
const peopleInput = document.querySelector('#peopleInput')
const peopleTextError = document.querySelector('.select_box__people_error')
const result = document.querySelectorAll('.text_box__result')

customTipInput.addEventListener('click', e => {
	tipValueInputs.forEach(input => {
		input.checked = false
	})
})

for (let i = 0; i < tipValueInputs.length; i++) {
	tipValueInputs[i].addEventListener('click', e => {
		customTipInput.value = ''
	})
}

// billInput.addEventListener('change', e => {
// 	text = billInput.value

// 	if (isNaN(parseFloat(text)) == true) {
// 		billInput.classList.add('input_error')
// 		billTextError.classList.add('error')
// 		billTextError.textContent = 'Not a number'
// 	} else if (parseFloat(text) === 0) {
// 		billInput.classList.add('input_error')
// 		billTextError.classList.add('error')
// 		billTextError.textContent = "Can't be zero"
// 	} else if (parseFloat(text) < 0) {
// 		billInput.classList.add('input_error')
// 		billTextError.classList.add('error')
// 		billTextError.textContent = 'Negative value'
// 	} else {
// 		calculateTip()
// 		calculateTotal()
// 		billInput.classList.remove('input_error')
// 		billTextError.classList.remove('error')
// 		billTextError.textContent = ''
// 	}
// })

// customTipInput.addEventListener('change', e => {
// 	text = customTipInput.value

// 	if (isNaN(parseFloat(text)) == true) {
// 		customTipInput.classList.add('input_error')
// 		customTipTextError.classList.add('error')
// 		customTipTextError.textContent = 'Not a number'
// 	} else if (parseFloat(text) < 0) {
// 		customTipInput.classList.add('input_error')
// 		customTipTextError.classList.add('error')
// 		customTipTextError.textContent = 'Negative value'
// 	} else {
// 		calculateTip()
// 		calculateTotal()
// 		customTipInput.classList.remove('input_error')
// 		customTipTextError.classList.remove('error')
// 		customTipTextError.textContent = ''
// 	}
// })

// peopleInput.addEventListener('change', e => {
// 	text = peopleInput.value

// 	if (isNaN(parseFloat(text)) == true) {
// 		peopleInput.classList.add('input_error')
// 		peopleTextError.classList.add('error')
// 		peopleTextError.textContent = 'Not a number'
// 	} else if (parseFloat(text) === 0) {
// 		peopleInput.classList.add('input_error')
// 		peopleTextError.classList.add('error')
// 		peopleTextError.textContent = "Can't be zero"
// 	} else if (parseFloat(text) < 0) {
// 		peopleInput.classList.add('input_error')
// 		peopleTextError.classList.add('error')
// 		peopleTextError.textContent = 'Negative value'
// 	} else {
// 		calculateTip()
// 		calculateTotal()
// 		peopleInput.classList.remove('input_error')
// 		peopleTextError.classList.remove('error')
// 		peopleTextError.textContent = ''
// 	}
// })

// inputArr = [billInput, customTipInput, peopleInput]
// inputErrorArr = [billTextError, customTipTextError, peopleTextError]

// inputArr.forEach((input, text) => {
// 	input.addEventListener('change', e => {
// 		if (isNaN(parseFloat(input.value)) == true) {
// 			input.classList.add('input_error')
// 			text.classList.add('error')
// 			text.textContent = 'Not a number'
// 		} else if (parseFloat(input.value) === 0) {
// 			input.classList.add('input_error')
// 			text.classList.add('error')
// 			text.textContent = "Can't be zero"
// 		} else if (parseFloat(input.value) < 0) {
// 			input.classList.add('input_error')
// 			text.classList.add('error')
// 			text.textContent = 'Negative value'
// 		} else {
// 			calculateTip()
// 			calculateTotal()
// 			input.classList.remove('input_error')
// 			text.classList.remove('error')
// 			text.textContent = ''
// 		}
// 	})
// })

const inputConfig = [
	{ input: billInput, error: billTextError },
	{ input: customTipInput, error: customTipTextError, canBeZero: true },
	{ input: peopleInput, error: peopleTextError },
]

function getErrorMessage(value, canBeZero) {
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

inputConfig.forEach(({ input, error, canBeZero }) => {
	input.addEventListener('change', e => {
		const errorMsg = getErrorMessage(e.target.value, canBeZero)
		error.textContent = errorMsg

		if (errorMsg) {
			input.classList.add('input_error')
			error.classList.add('error')
		} else {
			calculateTip()
			calculateTotal()
			input.classList.remove('input_error')
			error.classList.remove('error')
		}
	})
})

function calculateTip() {
	let tipValue

	for (let i = 0; i < tipRadioButtonValue.length; i++) {
		if (tipRadioButtonValue[i].checked) {
			tipValue = parseInt(tipRadioButtonValue[i].value) / 100
		}
		// else if (tipValue.value > 0) {
		// 	result[0].textContent =
		// 		'$' + ((parseInt(billInput.value) * parseInt(tipValue.value)) / parseInt(peopleInput.value)).toFixed(2)
		// }

		console.log(tipValue)
	}

	if (customTipInput.value > 0) {
		result[0].textContent = '$' + (parseInt(customTipInput.value) / parseInt(peopleInput.value)).toFixed(2)
	}
	// else if (tipValue.value > 0) {
	// 	result[0].textContent =
	// 		'$' + ((parseInt(billInput.value) * parseInt(tipValue.value)) / parseInt(peopleInput.value)).toFixed(2)
	// }
}

function calculateTotal() {
	if (billInput.value == '' || peopleInput.value == '') {
		result[0].textContent = '$0.00'
		result[1].textContent = '$0.00'
	} else {
		result[1].textContent =
			'$' +
			(
				parseInt(billInput.value) / parseInt(peopleInput.value) +
				parseInt(result[0].textContent.replace(/\D/g, '')) / 100
			).toFixed(2)
	}
}

/*
else if (tipRadioButtonValue.checked) {
		let tipValue

		for (let i = 0; i < tipRadioButtonValue.length; i++) {
			if (tipRadioButtonValue[i].checked) {
				tipValue = parseInt(tipRadioButtonValue[i].value) / 100
			}
		}

		result[0].textContent = '$' + ((parseInt(billInput.value) * tipValue.value) / peopleInput.value).toFixed(2)
		result[1].textContent = '$' + (result[0].textContent + parseInt(billInput.value) / peopleInput.value).toFixed(2)
*/
