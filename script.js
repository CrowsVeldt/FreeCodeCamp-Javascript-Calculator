(function () {
  'use strict'

  // string to store the values from user input
  var valueStore = ''
  
  var history = ''
  
  var current = ''

  // add const to access display section
  const log = document.getElementsByClassName('history')

  const totalOrCurrent = document.getElementsByClassName('total-current')

  // add const to access Buttons
  const buttons = document.querySelectorAll('button')

  // add eventListener to all of normalButtons
  buttons.forEach(function (item) {
    item.addEventListener('click', function () {
      // if 'item' is a number add it to valueStore and display valueStore
      if (item.classList.contains('numberButton')) {
        // on click add button value to valueStore
        valueStore += item.innerHTML
        // and display it in displaySection
        log[0].innerHTML = valueStore
      // if 'item' is an operator add it to valueStore and display valueStore
      } else if (item.classList.contains('operatorButton')) {
        // on click add button value to valueStore
        valueStore += item.innerHTML
        // and display it in displaySection
        log[0].innerHTML = valueStore
      // if 'item' is clear
      } else if (item.classList.contains('clearButton')) {
        // set ValueStore to 0
        valueStore = '0'
        // empty history
        log[0].innerHTML = null
        // empty total
        totalOrCurrent[0].innerHTML = null
      // if 'item' is equals
      } else if (item.classList.contains('equalsButton')) {
        // evaluate valueStore and display the result
        totalOrCurrent[0].innerHTML = eval(valueStore)
      }
    })
  })
}())
