(function () {
  'use strict'

  var history = []
 
  var argument1 = ''
  
  var argument2 = ''

  var currentOperator = ''
  
  // display stuff on the screen
  function display () {
    
  const logDisplay = document.getElementsByClassName ('log-display')
  const currentDisplay = document.getElementsByClassName ('current-display')
  
  currentDisplay[0].innerHTML = argument1 + ' ' + currentOperator + ' ' + argument2
  logDisplay[0].innerHTML = history
  
  }
  
  
  // recieve and clean input
  function input () {
    
    const buttons = document.querySelectorAll ('button')
    
    buttons.forEach (function(input) {
      input.addEventListener('click', function(){
        
        
        if (currentOperator === '') { // if currentOperator is empty
          
          if (input.classList.contains('number')) {
            
            argument1 += input.innerHTML
            
            display ()
            
          } else if (input.classList.contains('decimal')) {
            
            // fill stuff here
          
          } else if (input.classList.contains('operator')) {
            
            currentOperator = input.innerHTML
            
            display ()
            
          } else if (input.classList.contains('equals')) {
            
            // fill stuff here
            
          }
          
          
        } else { // if currentOperator is not empty
        
          if (input.classList.contains('number')) {
            
            argument2 += input.innerHTML
            
            display ()
            
          } else if (input.classList.contains('decimal')) {
            
            // fill stuff here
          
          } else if (input.classList.contains('operator')) {
            
            currentOperator = input.innerHTML
            
            display ()
            
          } else if (input.classList.contains('clear')) {
            
            history = ''
            argument1 = ''
            argument2 = ''
            currentOperator = ''
            display ()
            
          } else if (input.classList.contains('clear-current')) {

            argument1 = ''
            argument2 = ''
            currentOperator = ''
            display ()
            
          } else if (input.classList.contains('equals')) {
            
            // fill stuff here
            
          }
         
        }
        
        
        
        
//        if (input.classList.contains('number')) {
//          
//          if (currentOperator === '') {
//            
//            argument1 += input.innerHTML
//          
//            display ()
//            
//          } else {
//            
//            argument2 += input.innerHTML
//          
//            display ()
//            
//          }
          
//        } else if (input.classList.contains('decimal')) {
//          
//          if ()
//          
//          current += input.innerHTML
//          
//          display ()
//          
//        } else if (input.classList.contains('operator')) {
//          
//          current += input.innerHTML
//          
//          display ()
//          
//        } else if (input.classList.contains('clear')) {
//          
//          history = ''
//          
//          current = ''
//          
//          display ()
//          
//        } else if (input.classList.contains('clear-current')) {
//          
//          current = ''
//          
//          display ()
//          
//        }
        
      })
      
    })
    
  }
  
  input ()
  
  
  // evaluate stuff, seperated out for general good code-liness and in case I want to mess with the evaluation function in the future
  function evaluate (stuff) {
    
    return eval(stuff)
    
  }
}())
