const result = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttonsContainer button");
const sound = document.getElementById("clicksound");
const operators = ['+', '-', '×', '/', '^', '%']

function updateDisplay(value) {
    result.textContent = value;
    result.scrollLeft = result.scrollWidth;
    if(result.textContent.length === 0){
        updateDisplay(0);
    }
}

const removeErrors = (string)=>string.replace(/[^1-9+\-*/](0+)(?=[1-9])/g, '').replace(/(^0+)/g, '').replace("Error", '')

function calculateResult() {
    try {
        const input = result.textContent.replace('π', `${Math.PI}`).replace(/\^/g, '**').replace(/\×/g, '*').replace(/(?<=\d)[ ]*\(/, '*(')
        let evalResult = eval(input);
        if (evalResult.toString().length >= 7) {
            evalResult = evalResult.toExponential(2);
            return updateDisplay(evalResult.toString());
        }

        return updateDisplay(parseFloat(evalResult.toFixed(2)).toString());
    } catch (error) {
        console.log(error)
        updateDisplay("Error");
    }
}

buttons.forEach((button) => {
    button.addEventListener("mousedown", function () {
        sound.play();
        const currentDisplay = result.textContent;
        const value = this.value
        if (value === "=") { return calculateResult() }
        if (value === "C") { return updateDisplay("0") }
        if (value === "backspace") {
            return updateDisplay(result.textContent.slice(0, result.textContent.length-1))
        }

        if (!this.classList.contains(('operator'))){
            result.textContent += value
            console.log(value)
            result.textContent = removeErrors(result.textContent)
            return null;
        }
        if (operators.includes(value) && (result.textContent.length && result.textContent[0] !== 0)){
            result.textContent += value
            result.textContent = removeErrors(result.textContent)
            return null;
        }
    });
});
