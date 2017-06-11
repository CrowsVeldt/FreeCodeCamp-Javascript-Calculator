(function () {
  'use strict'

  // string to store the values from user input
  var valueStore = ''

  // add const to access display section
  const display = document.getElementById('displaySection')

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
        display.innerHTML = valueStore
      // if 'item' is an operator add it to valueStore and display valueStore
      } else if (item.classList.contains('operatorButton')) {
        // on click add button value to valueStore
        valueStore += item.innerHTML
        // and display it in displaySection
        display.innerHTML = valueStore
      // if 'item' is clear
      } else if (item.classList.contains('clearButton')) {
        // set ValueStore to 0
        valueStore = '0'
        // empty display
        display.innerHTML = null
      // if 'item' is equals
      } else if (item.classList.contains('equalsButton')) {
        // evaluate valueStore and display the result
        display.innerHTML = eval(valueStore)
      }
    })
  })
}())
