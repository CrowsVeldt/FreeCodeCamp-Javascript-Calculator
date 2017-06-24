(function () {
  'use strict'

  // the history of all entries
  var history = []

  // the equation that will be evaluated after pressing 'equals'
  var equationToEvaluate = []

  // the number currently being entered
  var currentEntry = ''

  // maximum number of characters to display, to prevent overflow of currentEntry
  const digitLimit = 15

  // access variables for the display sections
  const historyDisplay = document.getElementsByClassName('history-display')
  const equationDisplay = document.getElementsByClassName('equation-display')
  const currentDisplay = document.getElementsByClassName('current-display')

  // display on the screen
  function display () {
    currentDisplay[0].innerHTML = currentEntry

    equationDisplay[0].innerHTML = equationToEvaluate.join('')

    if (history.length > 0) {
      historyDisplay[0].innerHTML = history[history.length - 1].join('')
    } else {
      historyDisplay[0].innerHTML = ''
    }
  }

  // evaluate the function to display
  function evaluate (equation) {
    // get the simple result of the equation
    var eqString = eval(equation).toString()

    if (eqString.length > digitLimit) {
      // if result is larger than digitLimit, display it in exponential notation
      return eval(equation).toExponential(4)
    } else {
      // return the simple result
      return eqString
    }
  }

  // recieve input
  function input () {
    const buttons = document.querySelectorAll('button')
    
    buttons.forEach(function (buttonPressed) {
      buttonPressed.addEventListener('click', function () {
        if (buttonPressed.classList.contains('clear')) {
          history = []

          equationToEvaluate = []

          currentEntry = ''

          display()
        } else if (buttonPressed.classList.contains('clear-current')) {
          currentEntry = ''

          display()
        } else if (buttonPressed.classList.contains('zero') && currentEntry !== '0' && currentEntry.length < digitLimit) {
          currentEntry += buttonPressed.innerHTML

          display()
        } else if (buttonPressed.classList.contains('number') && currentEntry.length < digitLimit) {
          if (currentEntry === '0') {
            currentEntry = buttonPressed.innerHTML
          } else {
            currentEntry += buttonPressed.innerHTML
          }

          display()
        } else if (buttonPressed.classList.contains('decimal') && currentEntry.indexOf('.') === -1 && currentEntry.length < digitLimit) {
          if (currentEntry === '') {
            currentEntry = '0.'
          } else {
            currentEntry += '.'
          }

          display()
        } else if (buttonPressed.classList.contains('operator')) {
          if (currentEntry !== '') {
            // add the operator to currentEntry
            currentEntry += buttonPressed.innerHTML
            // then push currentEntry to equationToEvaluate
            equationToEvaluate.push(currentEntry)
            // then reset currentEntry
            currentEntry = ''

            display()
          }
        } else if (buttonPressed.classList.contains('equals')) {
          // if currentEntry is not empty
          if (currentEntry !== '') {
            // add currentEntry to equationToEvaluate
            equationToEvaluate.push(currentEntry)
            // evaluate equationToEvaluate and set currentEntry to the result
            currentEntry = evaluate(equationToEvaluate.join(''))
            // add equationToEvalute to history
            history.push(equationToEvaluate)
            // empty equationToEvaluate
            equationToEvaluate = []

            display()
          }
        } else if (buttonPressed.classList.contains('previous') && history.length > 0) {
          // set equationToEvaluate to the last element of history
          equationToEvaluate = (history[history.length - 1])
          // remove the last element of history
          history.pop()
          // move last element of equationToEvaluate to currentEntry
          currentEntry = equationToEvaluate.pop()

          display()
        } else if (buttonPressed.classList.contains('backspace') && currentEntry.indexOf('e') === -1) {
          // if currentEntry is empty and equationToEvaluate isn't
          if (currentEntry === '' && equationToEvaluate.length > 0) {
            // pop the last element of equationToEvaluate into currentEntry
            currentEntry = equationToEvaluate.pop()
          }
          // remove the last charecter of currentEntry
          currentEntry = currentEntry.slice(0, -1)

          display()
        }
      })
    })
  }

  // do all the things!
  input()
}())
