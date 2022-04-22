# calculator
a deceptively "easy" app that we use daily, created with vanilla JS

#pseudocode

html structure
div 1: display screen
div 2: 2 unit sized clear and delete
div 3-6: buttons

special operator behavior
- if user selects operator without typing any number, default current number is 0
==> small display will be: "0 x"...
==> if user selects another operator, small display will update, big display will remain as blank
==> if user selects the same operator, no change


after selecting currentnumber and an operator: 
==> second number selected will be shown as current number in big display
==> first number will now be prev number and second number will be current number

at this point, if another operator is pressed, calculator will evaluate the operation between prev and current number

expected result: 
- both small and big display will show evaluated output
- small display will display the second operator

first no. pressed: update big display
==> updateBigDisplay()

first oper pressed: update small display with first no. and first oper

second no. pressed: update big display with second no.
second oper pressed: update small display with eval figure and second oper






