const result = document.getElementById("result");
const smallResult = document.getElementById("small-result");
const buttons = document.getElementsByClassName("button");

let calc = false;
let leftSide = false;
let rightSide = false;
let operator = "+";
let operatorPressed = false;
let total = 0;
let calcDone = false;
let currentStatus = 0;

setEventListeners();

function setEventListeners(e){
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            useCalculator(e);
        })
    }
    /* const darkModeButton = document.querySelector(".darkmode-button");
    darkModeButton.addEventListener("click", (e) => {
        root.classList.toggle("dark");
    }) */
};

function handleNumber(currentNum){
    currentNum = currentNum.toString();

    if(calcDone){
        clearCalculator();
    }
    if(!operatorPressed){
        if (!leftSide){
            leftSide = "";
        }
        leftSide = limitLength(leftSide + currentNum);
        result.innerHTML = leftSide;
        smallResult.innerHTML = leftSide;
    }
    if(operatorPressed){
        if (!rightSide){
            rightSide = "";
        }
        rightSide = limitLength(rightSide + currentNum);
        result.innerHTML = rightSide;
        smallResult.innerHTML = leftSide + operator + rightSide;
    }
}

function calcTotal(currentOperator){
    if (leftSide && rightSide) {
        operatorPressed = true;
        getTotal();
        operator = currentOperator;
    }
    if (calcDone) {
        const result = (leftSide = total);
        clearCalculator();
        leftSide = result;
        leftSide = limitLength(leftSide);
        result.innerHTML = currentOperator;
        smallResult.innerHTML = +result + currentOperator;
        operator = currentOperator;
        operatorPressed = true;
    }
    if (!leftSide || operatorPressed) {
        return false;
    }

    if (leftSide && !rightSide) {
        let temp = smallResult.innerHTML.toString();
        smallResult.innerHTML = temp + currentOperator;
        operator = currentOperator;
        operatorPressed = true;
    }
}

function getTotal(){
    if (!leftSide) {
        return false;
    }
    if (!rightSide && operatorPressed) {
        total = handleOperators(leftSide, leftSide, operator);
        total = limitLength(total);
    }
    if (rightSide && leftSide) {
        total =handleOperators(leftSide, rightSide, operator);
        total = limitLength(total);
    }
    total = total.toString();

    if (!(total.indexOf(".") == -1)) {
        total = parseFloat(total).toFixed(4);
    }
    result.innerHTML = total;
}

function handleOperators(number1, number2, operator){
    switch (operator) {
        case "+":
            total = +number1 + +number2;
            calcDone = true;
            break;
        case "-":
            total = +number1 - +number2;
            calcDone = true;
            break;
        case "/":
            total = +number1 / +number2;
            calcDone = true;
            break;
        case "*":
            total = +number1 * +number2;
            calcDone = true;
            break;

        default:
            return false;
    }
    return total;
}

function limitLength(number){
    number = number.toString();
    
    if (number.length > 12) {
        number = number.substring(0,12);
    }
    return number;
}


function clearCalculator(){
    smallResult.innerHTML = "";
    result.innerHTML = 0;
    leftSide = false;
    rightSide = false;
    operator = "+";
    total = 0;
    calcDone = false;
    operatorPressed = false;   
}

function useCalculator(e){
    switch (e.target.value) {
        case "0":
            handleNumber(0);
            break;
        case "1":
            handleNumber(1);
            break;
        case "2":
            handleNumber(2);
            break;
        case "3":
            handleNumber(3);
            break;
        case "4":
            handleNumber(4);
            break;
        case "5":
            handleNumber(5);
            break;
        case "6":
            handleNumber(6);
            break;
        case "7":
            handleNumber(7);
            break;
        case "8":
            handleNumber(8);
            break;
        case "9":
            handleNumber(9);
            break;
        case ".":
            handleNumber(".");
            break;
        case "+":
            calcTotal("+");
            break;
        case "-":
            calcTotal("-");
            break;
        case "/":
            calcTotal("/");
            break;
        case "*":
            calcTotal("*");
            break;
        case "=":
            getTotal();
            break;
        case "AC":
            clearCalculator();
        default:
            break;
    }
}