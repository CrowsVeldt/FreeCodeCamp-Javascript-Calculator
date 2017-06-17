(function () {
  'use strict'

  var history = []

  var currentEntry = ''
  
  var lastCharacter = ''

  // is the currentEntry number already a decimal/contains a decimal?
  var decimalPlaced = false

  // display entry on the screen
  function display () {
    const logDisplay = document.getElementsByClassName('log-display')
    const currentDisplay = document.getElementsByClassName('current-display')

    currentDisplay[0].innerHTML = currentEntry
    logDisplay[0].innerHTML = history
  }

  // evaluate the function to display
  function evaluate (entry) {
    // clean leading zeroes from 'entry'
    while (entry.charAt(0) === '0' && entry.charAt(1) !== '.') {
      entry = entry.slice(1)
    }

    return eval(entry).toString()
  }

  // recieve and clean input
  function input () {
    const buttons = document.querySelectorAll('button')

    buttons.forEach(function (input) {
      input.addEventListener('click', function () {
        if (input.classList.contains('clear')) {
          history = []

          currentEntry = ''

          decimalPlaced = false

          display()
        } else if (input.classList.contains('clear-currentEntry')) {
          currentEntry = ''
          
          decimalPlaced = false

          display()
        } else if (input.classList.contains('number')) {
          currentEntry += input.innerHTML

          display()
        } else if (decimalPlaced === false && input.classList.contains('decimal')) {
          currentEntry += input.innerHTML

          display()

          decimalPlaced = true
        } else if (input.classList.contains('operator')) {
          if (currentEntry !== '' && lastCharacter !== '+' && lastCharacter !== '-' && lastCharacter !== '/' && lastCharacter !== '*') {
            currentEntry += input.innerHTML

            display()

            decimalPlaced = false
          }
        } else if (input.classList.contains('equals')) {
          // if currentEntry is not empty and the last and first char are not an operators
          if (currentEntry !== '' && lastCharacter !== '+' && lastCharacter !== '-' && lastCharacter !== '/' && lastCharacter !== '*') {
            // (re)set decimalPlaced
            decimalPlaced = false
            // push currentEntry to history
            history.push(currentEntry)
            // return the evaluation of currentEntry as a string (to allow delete to work)
            currentEntry = evaluate(currentEntry)

            display()
          }
        } else if (input.classList.contains('previous')) {
          // if history is not empty
          if (history.length > 0) {
            // return previous entry
            currentEntry = history.pop()

            display()
          }
        } else if (input.classList.contains('delete')) {

          currentEntry = currentEntry.slice(0, -1)

          display()
        }
        
        // set 'lastCharacter' to the current last character of 'currentEntry' 
        lastCharacter = currentEntry.charAt(currentEntry.length-1)

      })
    })
  }

  input()

}())
