(function () {
  'use strict'

  // the history of all entries
  var history = []

  // the equation that will be evaluated after pressing 'equals'
  var equationToEvaluate = []

  // the number currently being entered
  var currentEntry = ''

  // the last character of the current number
  var lastCharacter = ''

  // display on the screen
  function display () {
    const logDisplay = document.getElementsByClassName('log-display')
    const equationDisplay = document.getElementsByClassName('equation-display')
    const currentDisplay = document.getElementsByClassName('current-display')

    currentDisplay[0].innerHTML = currentEntry

    equationDisplay[0].innerHTML = equationToEvaluate.join('')

    if (history.length > 0) {
      logDisplay[0].innerHTML = history[history.length - 1].join('')
    } else {
      logDisplay[0].innerHTML = ''
    }
  }

  // evaluate the function to display
  function evaluate (equation) {
    if (equation[0] === '0' && equation[1] !== '.') {
      return eval(equation.slice(1)).toString()
    }

    return eval(equation).toString()
  }

  // recieve input
  function input () {
    const buttons = document.querySelectorAll('button')

    buttons.forEach(function (input) {
      input.addEventListener('click', function () {
        if (input.classList.contains('clear')) {
          history = []

          equationToEvaluate = []

          currentEntry = ''

          display()
        } else if (input.classList.contains('clear-current')) {
          equationToEvaluate = []

          currentEntry = ''

          display()
        } else if (input.classList.contains('zero') && currentEntry !== '') {
          currentEntry += input.innerHTML

          display()
        } else if (input.classList.contains('number')) {
          currentEntry += input.innerHTML

          display()
        } else if (input.classList.contains('decimal') && currentEntry.indexOf('.') === -1) {
          currentEntry += input.innerHTML

          display()
        } else if (input.classList.contains('operator')) {
          if (currentEntry !== '' && lastCharacter !== '+' && lastCharacter !== '-' && lastCharacter !== '/' && lastCharacter !== '*') {
            // add the operator to currentEntry
            currentEntry += input.innerHTML
            // then push currentEntry to equationToEvaluate
            equationToEvaluate.push(currentEntry)

            currentEntry = ''

            display()
          }
        } else if (input.classList.contains('equals')) {
          // if currentEntry is not empty
          if (currentEntry !== '') {
            // push currentEntry to equationToEvaluate
            equationToEvaluate.push(currentEntry)
            // evaluate equationToEvaluate and set currentEntry to the result
            currentEntry = evaluate(equationToEvaluate.join(''))
            // push equationToEvalute to history
            history.push(equationToEvaluate)
            // empty equationToEvaluate
            equationToEvaluate = []

            display()
          }
        } else if (input.classList.contains('previous') && history.length > 0) {
            // set equationToEvaluate to the last element of history
          equationToEvaluate = (history[history.length - 1])
            // remove the last element of history
          history.pop()
            // move last element of equationToEvaluate to currentEntry
          currentEntry = equationToEvaluate.pop()

          display()
        } else if (input.classList.contains('delete')) {
          // if currentEntry is empty and equationToEvaluate isn't
          if (currentEntry === '' && equationToEvaluate.length > 0) {
            // pop the last elemt of equationToEvaluate into currentEntry
            currentEntry = equationToEvaluate.pop()
          }
          // remove the last charecter of currentEntry
          currentEntry = currentEntry.slice(0, -1)

          display()
        }

        // set 'lastCharacter' to the current last character of 'currentEntry'
        lastCharacter = currentEntry.charAt(currentEntry.length - 1)
      })
    })
  }

  input()
}())
