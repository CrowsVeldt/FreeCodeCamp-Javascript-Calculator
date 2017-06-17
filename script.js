(function () {
  'use strict'
  
  // the history of all entries
  var history = []
  
  // the equation that will be evaluated after pressing 'equals' 
  var equationToEvaluate = []
  
  // the current number 
  var currentEntry = ''
  
  // the last character of the current number
  var lastCharacter = ''

  // does currentEntry already contain a decimal?
  var decimalPlaced = false

  // display on the screen
  function display () {
    const logDisplay = document.getElementsByClassName('log')
    const currentDisplay = document.getElementsByClassName('current')
    
    const tempDisplay = document.getElementsByClassName('temp')

    currentDisplay[0].innerHTML = currentEntry
    logDisplay[0].innerHTML = history
    tempDisplay[0].innerHTML = equationToEvaluate
  }

  // evaluate the function to display
  function evaluate (currentEntry) {
    // clean leading zeroes from 'currentEntry'
    while (currentEntry.charAt(0) === '0' && currentEntry.charAt(1) !== '.') {
      currentEntry = currentEntry.slice(1)
    }

    return eval(currentEntry).toString()
  }

  // recieve and clean input
  function input () {
    const buttons = document.querySelectorAll('button')

    buttons.forEach(function (input) {
      input.addEventListener('click', function () {
        if (input.classList.contains('clear')) {
          history = []
          
          equationToEvaluate = []

          currentEntry = ''

          decimalPlaced = false

          display()
        } else if (input.classList.contains('clear-current')) {
          equationToEvaluate = []
          
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
            // add the operator to currentEntry
            currentEntry += input.innerHTML
            // then push currentEntry to equationToEvaluate
            equationToEvaluate.push([currentEntry])

            display()

            decimalPlaced = false
          }
        } else if (input.classList.contains('equals')) {
          // if currentEntry is not empty
          if (currentEntry !== '') {
            // (re)set decimalPlaced
            decimalPlaced = false
            // push currentEntry to history
            history.push(currentEntry)

            currentEntry = evaluate(currentEntry)

            display()
          }
        } else if (input.classList.contains('previous')) {
          // if history is not empty
          if (history.length > 0) {
            // return previous currentEntry
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
