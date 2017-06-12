(function () {
  'use strict'

  var history = ''
  var current = ''

  const log = document.getElementsByClassName('history')
  const totalOrCurrent = document.getElementsByClassName('total-current')

  const buttons = document.querySelectorAll('button')

  buttons.forEach(function (item) {
    item.addEventListener('click', function () {
      // if the button pressed is a number
      if (item.classList.contains('number')) {
        current += item.innerHTML

        totalOrCurrent[0].innerHTML = current
      // if the button pressed is an operator
      } else if (item.classList.contains('operator')) {
        // remove extra zeros from the front, to prevent eval from reading 'current' as an octal
        while (current.charAt(0) === '0' && current.charAt(1) !== '.') { current = current.slice(1) }

        history += current + item.innerHTML

        current = ''

        totalOrCurrent[0].innerHTML = current

        log[0].innerHTML = history
      // if the button pressed is the 'clear' button
      } else if (item.classList.contains('clear')) {
        history = ''

        current = ''

        log[0].innerHTML = null

        totalOrCurrent[0].innerHTML = null
      // if the button pressed is the clear current button
      } else if (item.classList.contains('clearCurrent')) {
        current = ''

        totalOrCurrent[0].innerHTML = null
        // if the button pressed is the decimal point button
      } else if (item.classList.contains('decimal')) {
        current += item.innerHTML

        totalOrCurrent[0].innerHTML = current
      // if the button pressed is the equals button
      } else if (item.classList.contains('equals')) {
        // remove extra zeros from the front, to prevent eval from reading 'current' as an octal
        while (current.charAt(0) === '0' && current.charAt(1) !== '.') { current = current.slice(1) }

        history += current
        // if the history is empty, display a string to avoid eval-ing to undefined
        if (history === '') {
          totalOrCurrent[0].innerHTML = 'Push some buttons to see numbers happen!'
        } else {
          if (history.charAt(history.length-1) === '/') {history = history.slice(0,-1)}
          
          log[0].innerHTML = history

          current = ''

          totalOrCurrent[0].innerHTML = eval(history)
        }
      }
    })
  })
}())
