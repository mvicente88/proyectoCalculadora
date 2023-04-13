const displayPrevValue = document.getElementById('prevValue');
const displayCurrentValue = document.getElementById('currentValue');
const numberButton = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator');

const switchBtn = document.querySelector('.input');
const display = new Display(displayPrevValue, displayCurrentValue);
const calculator = document.querySelector('.Calculator');


switchBtn.addEventListener('change', function() {
    if (this.checked) {
      calculator.classList.add('on');
      display.printValues('0');
    } else {
      calculator.classList.remove('on');
      display.deleteAll();
    }
});

numberButton.forEach(button =>{
  button.addEventListener('click', () => {
      if (switchBtn.checked) {
          display.addNumber(button.textContent);
      }
  });
});

operatorButton.forEach(button => {
  button.addEventListener('click', () => {
      if (switchBtn.checked) {
          display.computar(button.getAttribute('data-action'));
      }
  });
});


