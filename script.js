(function () {
  'use strict'
    
  // string to store the values from user input
  var valueStore = ''
  
  // add const to access display section
  const display = document.getElementById('displaySection')
  
  // add const to access Buttons
  const buttons = document.querySelectorAll('button')
  
  // add eventListener to all of normalButtons
  buttons.forEach(function(item){
    item.addEventListener('click', function(){
      
      // on click add button value to valueStore
      valueStore += item.innerHTML
        
      // and display it in displaySection
      display.innerHTML = valueStore
        
    })
  })

}())
