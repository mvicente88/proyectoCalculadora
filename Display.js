class Display{
    constructor(displayPrevValue, displayCurrentValue){
        this.displayCurrentValue = displayCurrentValue;
        this.displayPrevValue = displayPrevValue;
        this.calculator = new Calculator();
        this.tipoOperacion = undefined;
        this.currentValue = '';
        this.prevValue = '';
        this.operator = {
            sumar: '+',
            dividir: '/',
            multiplicar: '*',
            restar: '-',
            porcentaje: '%', 
        }
    }

    delete () {
        this.currentValue = this.currentValue.toString().slice(0,-1);
        this.printValues();
    }
    deleteAll() {
        this.currentValue = '';
        this.prevValue = '';
        this.tipoOperacion = undefined;
        this.printValues();
    }

    computar(tipo) {
        if (tipo === 'porcentaje') {
            this.calculatePercentage();
            this.printValues();
            return;
        }
        if (this.tipoOperacion !== "igual") {
          const result = this.calculate();
          if (result !== undefined) {
            this.currentValue = result.toString();
            this.prevValue = "";
            this.printValues();
          }
        } else {
          this.prevValue = this.currentValue;
          this.currentValue = '';
        }
      
        this.tipoOperacion = tipo;
        if (this.prevValue === "" && this.currentValue !== "") {
          this.prevValue = this.currentValue;
          this.currentValue = "";
        }
        this.printValues();
    }

    addNumber(number) {
        this.tipoOperacion = this.tipoOperacion || '';
        if(number === '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString();
        this.currentValueText = this.currentValue; 
        this.printValues();
    }
    
    printValues() {
        this.displayPrevValue.innerText = `${this.prevValue} ${this.operator[this.tipoOperacion] || ''}`;
        this.displayCurrentValue.innerText = this.currentValue;
    }

    calculate() {
        const prevValue = parseFloat(this.prevValue);
        const currentValue = parseFloat(this.currentValue);
    
        if (isNaN(currentValue) || isNaN(prevValue)) return;
        
        // para actualizar prevValue
        this.prevValue = this.currentValue;
        
        // hacer la operación y guardar el resultado en la variable currentValue
        this.currentValue = this.calculator[this.tipoOperacion](prevValue, currentValue);
    }
    calculatePercentage() {
        const currentValue = parseFloat(this.currentValue);
        if (isNaN(currentValue)) return;
        const percentage = currentValue / 100;
        this.currentValue = percentage.toString();
    }
    
}
