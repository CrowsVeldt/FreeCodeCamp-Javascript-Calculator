(function () {
  'use strict'
    
  // string to store the values from user input
  var valueStore = ''
  
  const display = document.getElementById('displaySection')
  
  const normalButtons = document.querySelectorAll('.normalButton')
  
  // add eventListener to all of normalButtons
  normalButtons.forEach(function(item){
    item.addEventListener('click', function(){
      
      // on click add button value to valueStore
      valueStore += item.innerHTML
        
      // and display it in displaySection
      display.innerHTML = valueStore
        
    })
  })
  
  
  // add eventListener to equalsButton when pressed perform evaluation and display result
}())
