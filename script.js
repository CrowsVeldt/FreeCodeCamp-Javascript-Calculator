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
      if (item.classList.contains('numberButton')) {
        current += item.innerHTML

        totalOrCurrent[0].innerHTML = current
      // if the button pressed is an operator
      } else if (item.classList.contains('operatorButton')) {
        history += current + item.innerHTML

        current = ''

        totalOrCurrent[0].innerHTML = current

        log[0].innerHTML = history
      // if the button pressed is the 'clear' button
      } else if (item.classList.contains('clearButton')) {
        history = ''

        current = ''

        log[0].innerHTML = null

        totalOrCurrent[0].innerHTML = null
      // if the button pressed is the equals button
      } else if (item.classList.contains('equalsButton')) {
        history += current

        log[0].innerHTML = history

        current = ''

        totalOrCurrent[0].innerHTML = eval(history)
      }
    })
  })
}())
