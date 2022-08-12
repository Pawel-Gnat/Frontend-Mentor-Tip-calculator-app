/*
1. If all inputs are empty or not selected disable reset button else set button to working state
2. If custom or bill number input contains string or some kind of calc display error "Not a number" or if contains negative value display "Negative value" 
3. If tip input was selected and you want to change it to custom than remove checked state from declared value input
4. If custom input contains some value and you want to change it to declated tip value input, it resets to custom state again 
5. If people input contains string or some kind of calc display error "Not a number" or if contains negative value display "Negative value" or if contains "zero" value display "Can't be zero" 
6. Calculate tip amount by declaring custom value and divide by number of people or by calculating the percent of bill
7. Calculate total value by adding calculated tip amount and divided bill value by number of people
*/

const customInput = document.querySelector('.select_box__select--input')
const tipValueInputs = document.querySelectorAll('.select_box__select--btn')
const billInput = document.querySelector('.select_box__input')
const billTextError = document.querySelector('.select_box__bill_error')

customInput.addEventListener('click', e => {
	tipValueInputs.forEach(input => {
		input.checked = false
	})
})

for (let i = 0; i < tipValueInputs.length; i++) {
	tipValueInputs[i].addEventListener('click', e => {
		customInput.value = ''
	})
}

function checkBill() {
	if (parseFloat(billInput.value) === 'NaN') {
		billInput.classList.add('input_error')
		billTextError.classList.add('error')
		billTextError.textContent = 'Not a number'
	} else if (parseFloat(billInput.value) === 0) {
		billInput.classList.add('input_error')
		billTextError.classList.add('error')
		billTextError.textContent = "Can't be zero"
	} else if (parseFloat(billInput.value) < 0) {
		billInput.classList.add('input_error')
		billTextError.classList.add('error')
		billTextError.textContent = 'Negative value'
	} else {
		billInput.classList.remove('input_error')
		billTextError.classList.remove('error')
		billTextError.textContent = ''
	}
}
checkBill()

// billInput.addEventListener('click', e => {
// 	if (parseFloat(billInput.value) === 'NaN') {
// 		billInput.classList.add('input_error')
// 		billTextError.classList.add('error')
// 		billTextError.textContent = 'Not a number'
// 	} else if (parseFloat(billInput.value) === 0) {
// 		billInput.classList.add('input_error')
// 		billTextError.classList.add('error')
// 		billTextError.textContent = "Can't be zero"
// 	} else if (parseFloat(billInput.value) < 0) {
// 		billInput.classList.add('input_error')
// 		billTextError.classList.add('error')
// 		billTextError.textContent = 'Negative value'
// 	} else {
// 		billInput.classList.remove('input_error')
// 		billTextError.classList.remove('error')
// 		billTextError.textContent = ''
// 	}
// })
