(function () {
  'use strict'

  var history = []

  var arg1 = ''

  var arg2 = ''

  var currentOperator = ''

  // display stuff on the screen
  function display () {
    const logDisplay = document.getElementsByClassName('log-display')
    const currentDisplay = document.getElementsByClassName('current-display')

    currentDisplay[0].innerHTML = arg1 + ' ' + currentOperator + ' ' + arg2
    logDisplay[0].innerHTML = history[history.length - 1]
  }

  // evaluate stuff, seperated out for general good code-liness and in case I want to mess with the evaluation function in the future
  function evaluate (stuff) {
    return eval(stuff)
  }

  // recieve and clean input
  function input () {
    const buttons = document.querySelectorAll('button')

    buttons.forEach(function (input) {
      input.addEventListener('click', function () {
        if (currentOperator === '') { // if currentOperator is empty
          if (input.classList.contains('number')) {
            arg1 += input.innerHTML

            display()
          } else if (input.classList.contains('decimal')) {

            // fill stuff here

          } else if (input.classList.contains('operator')) {
            currentOperator = input.innerHTML

            display()
          } else if (input.classList.contains('clear')) {
            history = []

            arg1 = ''

            arg2 = ''

            currentOperator = ''

            display()
          } else if (input.classList.contains('clear-current')) {
            arg1 = ''

            arg2 = ''

            currentOperator = ''

            display()
          } else if (input.classList.contains('equals')) {
            history.push([arg1, currentOperator, arg2])

            display()
          }
        } else { // if currentOperator is not empty
          if (input.classList.contains('number')) {
            arg2 += input.innerHTML

            display()
          } else if (input.classList.contains('decimal')) {

            // fill stuff here

          } else if (input.classList.contains('operator')) {
            currentOperator = input.innerHTML

            display()
          } else if (input.classList.contains('clear')) {
            history = []

            arg1 = ''

            arg2 = ''

            currentOperator = ''

            display()
          } else if (input.classList.contains('clear-current')) {
            arg1 = ''

            arg2 = ''

            currentOperator = ''

            display()
          } else if (input.classList.contains('equals')) {
            history.push([arg1, currentOperator, arg2])

            let current = arg1 + currentOperator + arg2

            arg1 = evaluate(current)

            arg2 = ''

            currentOperator = ''

            display()
          }
        }
      })
    })
  }

  input()
}())
