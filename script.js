(function () {
  'use strict'
    
  // string to store the values from user input
  var valueStore = ''
  
  // add const to access display section
  const display = document.getElementById('displaySection')
  
  // add const to access normalButtons
  const normalButtons = document.querySelectorAll('.normalButton')
  
  // add const to access equals button
  const equals = document.getElementById('equalsButton')
  
  // add eventListener to all of normalButtons
  normalButtons.forEach(function(item){
    item.addEventListener('click', function(){
      
      // on click add button value to valueStore
      valueStore += item.innerHTML
        
      // and display it in displaySection
      display.innerHTML = valueStore
        
    })
  })
  
  
  // add eventListener to equalsButton
  equals.addEventListener('click', function(){
      
    // when pressed perform evaluation and display result
    display.innerHTML = eval(valueStore)
      
  })    

}())
