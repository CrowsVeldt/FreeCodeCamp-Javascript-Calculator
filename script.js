(function () {
  'use strict'

  // the history of all entries
  var history = []

  // the equation that will be evaluated after pressing 'equals'
  var equationToEvaluate = []

  // the number currently being entered
  var currentEntry = ''

  // the total after evaluation
  var total = ''

  // maximum number of characters to display, to prevent overflow of currentEntry
  const digitLimit = 12

  // access variables for the HTML elements
  const historyDisplay = document.getElementsByClassName('history-display')
  const equationDisplay = document.getElementsByClassName('equation-display')
  const currentDisplay = document.getElementsByClassName('current-display')
  const buttons = document.querySelectorAll('button')

  // code to format numbers - thanks to Elias Zamaria on StackOverflow (https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
  function numberWithCommas (number) {
    var parts = number.split('.')
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')
  }

  // display on the screen
  function display () {
    if (total !== '') {
      currentDisplay[0].innerHTML = '<b>' + numberWithCommas(total) + '</b>'
    } else if (currentEntry === '') {
      currentEntry = '0'
      currentDisplay[0].innerHTML = numberWithCommas(currentEntry)
    } else {
      currentDisplay[0].innerHTML = numberWithCommas(currentEntry)
    }

    equationDisplay[0].innerHTML = numberWithCommas(equationToEvaluate.join(''))

    if (history.length > 0) {
      historyDisplay[0].innerHTML = numberWithCommas(history[history.length - 1].join(''))
    } else {
      historyDisplay[0].innerHTML = ''
    }
  }

  // evaluate the function to display
  function evaluate (equation) {
    var eqString = eval(equation).toString()

    // if number has a decimal point, display only 2 numbers past it
    if (equation.toString().indexOf('.') !== -1 && equation.toString().indexOf('e') === -1) {
      return eval(equation).toFixed(2)
    }

    if (eqString.length > digitLimit) {
      // if result is larger than digitLimit, display it in exponential notation
      return eval(equation).toExponential(4)
    }

    return eval(equation).toString()
  }

  // do things based on the input recieved
  function doStuffWithUserInput (userInput) {
    switch (userInput) {
      case 'clear':
        total = ''
        history = []
        equationToEvaluate = []
        currentEntry = ''
        display()
        break

      case 'clear-current':
        total = ''
        currentEntry = ''
        display()
        break

      case 'zero':
        total = ''
        currentEntry += '0'
        display()
        break

      case 'decimal':
        if (total !== '') {
          currentEntry = total
          total = ''
        }

        if (currentEntry.indexOf('.') === -1) {
          currentEntry += '.'
        }

        display()
        break

      case 'equals':
        // add currentEntry to equationToEvaluate
        equationToEvaluate.push(currentEntry)
        // evaluate equationToEvaluate and set total to the result
        total = evaluate(equationToEvaluate.join(''))
        // add equationToEvalute to history
        history.push(equationToEvaluate)
        // empty equationToEvaluate
        equationToEvaluate = []
        currentEntry = ''
        display()
        break

      case 'previous':
        total = ''
        // set equationToEvaluate to the last element of history
        equationToEvaluate = (history[history.length - 1])
        // remove the last element of history
        history.pop()
        // move last element of equationToEvaluate to currentEntry
        currentEntry = equationToEvaluate.pop()
        display()
        break

      case 'backspace':
        if (total !== '') {
          currentEntry = total
          total = ''
        }
        if (currentEntry === '0' && equationToEvaluate.length > 0) {
          // pop the last element of equationToEvaluate into currentEntry
          currentEntry = equationToEvaluate.pop()
        }
        // remove the last charecter of currentEntry
        currentEntry = currentEntry.slice(0, -1)
        display()
        break

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (total !== '') {
          total = ''
          currentEntry += userInput
        } else if (currentEntry === '0') {
          currentEntry = userInput
        } else {
          currentEntry += userInput
        }
        display()
        break

      case '+':
      case '-':
      case '/':
      case '*':
        if (total !== '') {
          currentEntry = total
          total = ''
        }
          // add the operator to currentEntry
        currentEntry += userInput
          // then push currentEntry to equationToEvaluate
        equationToEvaluate.push(currentEntry)
          // then reset currentEntry
        currentEntry = ''
        display()
        break
    }
  }

  // recieve input
  function acceptUserInput () {
    buttons.forEach(function (buttonPressed) {
      buttonPressed.addEventListener('click', function () {
        if (buttonPressed.classList.contains('clear')) {
          doStuffWithUserInput('clear')
        } else if (buttonPressed.classList.contains('clear-current')) {
          doStuffWithUserInput('clear-current')
        } else if (buttonPressed.classList.contains('zero') && currentEntry !== '0' && currentEntry.length < digitLimit) {
          doStuffWithUserInput('zero')
        } else if (buttonPressed.classList.contains('number') && currentEntry.length < digitLimit) {
          doStuffWithUserInput(buttonPressed.innerHTML)
        } else if (buttonPressed.classList.contains('decimal') && currentEntry.indexOf('.') === -1 && currentEntry.length < digitLimit) {
          doStuffWithUserInput('decimal')
        } else if (buttonPressed.classList.contains('operator')) {
          if (currentEntry !== '' || total !== '') {
            doStuffWithUserInput(buttonPressed.innerHTML)
          }
        } else if (buttonPressed.classList.contains('equals') && currentEntry !== '' && total === '') {
          doStuffWithUserInput('equals')
        } else if (buttonPressed.classList.contains('previous') && history.length > 0) {
          doStuffWithUserInput('previous')
        } else if (buttonPressed.classList.contains('backspace') && currentEntry.indexOf('e') === -1) {
          doStuffWithUserInput('backspace')
        }
      })
    })
  }

  display()
  // do all the things!
  acceptUserInput()
}())
