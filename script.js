(function () {
  'use strict'

  var history = ''
  // current characters to add to log/display
  var current = ''
  // current operator saved to so that it can be easily switched &tc.
  var currentOperator = ''
  
  // display stuff on the screen
  function display () {
    
  const logDisplay = document.getElementsByClassName ('log-display')
  const currentDisplay = document.getElementsByClassName ('current-display')
  
  currentDisplay[0].innerHTML = current
  logDisplay[0].innerHTML = history
  
  }
  
  
  // recieve and clean input
  function input () {
    
    const buttons = document.querySelectorAll ('button')
    
    buttons.forEach (function(input) {
      input.addEventListener('click', function(){
        
        
        
      })
          
    })
    
    }
      

  
  input ()
  
  
  // evaluate stuff, seperated out for general good code-liness and in case I want to mess with the evaluation function in the future
  function evaluate () {
    
    
    
  }
}())
