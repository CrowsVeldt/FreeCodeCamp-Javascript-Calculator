(function () {
  'use strict'

  var history = []

  var current = ''

  var currentOperator = false

  var decimalPlaced = false

  // display stuff on the screen
  function display () {
    const logDisplay = document.getElementsByClassName('log-display')
    const currentDisplay = document.getElementsByClassName('current-display')

    currentDisplay[0].innerHTML = current
    logDisplay[0].innerHTML = history
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
        if (input.classList.contains('clear')) {
          history = []

          current = ''

          currentOperator = false

          decimalPlaced = false

          display()
        } else if (input.classList.contains('clear-current')) {
          current = ''

          currentOperator = false

          decimalPlaced = false

          display()
        } else if (input.classList.contains('number')) {
          current += input.innerHTML

          currentOperator = false

          display()
        } else if (decimalPlaced === false && input.classList.contains('decimal')) {
          current += input.innerHTML

          display()

          decimalPlaced = true
        } else if (currentOperator === false && input.classList.contains('operator')) {
          current += input.innerHTML

          display()

          currentOperator = true

          decimalPlaced = false
        } else if (input.classList.contains('equals')) {
          currentOperator = false

          decimalPlaced = false

          history.push(current)

          current = evaluate(current)

          display()
        }
      })
    })
  }

  input()
}())
