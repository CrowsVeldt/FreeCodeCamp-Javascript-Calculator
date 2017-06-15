(function () {
  'use strict'

  var history = []

  var current = ''
  
  // Was the last character an operator? 
  var currentOperator = false
  
  // is the current number already a decimal/contains a decimal?
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
    

    // clean leading zeroes from 'stuff'
    while (stuff.charAt(0) === '0' && stuff.charAt(1) !== '.') {

      stuff = stuff.slice(1)

    }
 
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
          // if current is not empty
          if (current !== ''){

            // (re)set currentOperator
            currentOperator = false
            // (re)set decimalPlaced
            decimalPlaced = false
            // push current to history
            history.push(current)
            // return the evaluation of current as a string (to allow delete to work)
            current = evaluate(current).toString()

            display()
          }
        } else if (input.classList.contains('previous')) {
          // if history is not empty
          if (history.length > 0) {
            // return previous entry
            current = history.pop()

            display()
          }
         
        } else if (input.classList.contains('delete')) {
          
          currentOperator = false
          
          current = current.slice(0, -1)
          
          display ()
          
        }
      })
    })
  }

  input()
}())
