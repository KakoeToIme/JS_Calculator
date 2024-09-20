"use strict"

let clearAfterEqual = false;

let count = 0;
const oldAndNewOper = ['', ''];

const operPlus = '+';
const operMinus = '-';
const operMult = '*';
const operDiv = '/';
const operMod = '%';
const dot = '.';
const zero = '0';
const space = '';

const displayNum = val => {
    if (clearAfterEqual === true) {
        AC();
        clearAfterEqual = false;
    }

    const displayVal = document.getElementsByClassName('numpadOne')[0].textContent;
    let allowEdit = displayVal.length <= 15;

    if (checkMinus() && val === dot) return;
    if (displayVal.includes(dot) && val === dot) return;

    if (displayVal !== zero && allowEdit === true) document.getElementsByClassName('numpadOne')[0].textContent += val;
    else if (val === dot && allowEdit === true && document.getElementsByClassName('numpadOne')[0].textContent === zero)
        document.getElementsByClassName('numpadOne')[0].textContent += val;
    else if (allowEdit === true & val !== dot) {
        setTextContent('numpadOne', val);
        document.getElementById('clear').textContent = 'C';
    }
}

const EQUAL = () => {
    clearAfterEqual = true;

    const firstNum = new Decimal(document.getElementsByClassName('numpadOne')[0].textContent);
    const secondNum = new Decimal(document.getElementsByClassName('numpadTwo')[0].textContent);
    const operand = document.getElementsByClassName('operand')[0].textContent;

    switch (operand) {
        case operPlus:
            setTextContent('numpadOne', secondNum.plus(firstNum));
            break;
        case operMinus:
            setTextContent('numpadOne', secondNum.minus(firstNum));
            break;
        case operMult:
            setTextContent('numpadOne', secondNum.times(firstNum));
            break;
        case operDiv:
            setTextContent('numpadOne', secondNum.div(firstNum));
            break;
        case operMod:
            setTextContent('numpadOne', secondNum.mod(firstNum));
            break;
    }

    setTextContent('numpadTwo', space);
    setTextContent('operand', space);
}

const AC = () => {
    setTextContent('numpadOne', zero);
    setTextContent('numpadTwo', space);
    setTextContent('operand', space);
    document.getElementById('clear').textContent = 'AC';
    count = 0;
    oldAndNewOper[0] = space;
    oldAndNewOper[1] = space;
}

const DEL = () => {
    const numOne = document.getElementsByClassName('numpadOne')[0].textContent;

    const newText = numOne.slice(0, -1);

    if (numOne.length > 1) setTextContent('numpadOne', newText);
    else {
        setTextContent('numpadOne', zero);
        document.getElementById('clear').textContent = 'AC';
    }
}

const PLUS = () => useOperand(operPlus);

const MINUS = () => useOperand(operMinus);

const MULTIPLICATION = () => useOperand(operMult);

const DIVISION = () => useOperand(operDiv);

const MOD_DIVISION = () => useOperand(operMod);

const ROUND = () => {
    if (checkMinus()) return;

    let temp = 0;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === space) {
        temp = Math.round(Number(document.getElementsByClassName('numpadOne')[0].textContent));
        setTextContent('numpadOne', temp);
    }
}

const setTextContent = (className, value) => {
    document.getElementsByClassName(className)[0].textContent = value;
}

const checkOperand = () => {
    if (clearAfterEqual) clearAfterEqual = false;
}

const changeOperand = () => {
    if (document.getElementsByClassName('numpadTwo')[0].textContent !== space && document.getElementsByClassName('operand')[0].textContent !== space &&
        document.getElementsByClassName('numpadOne')[0].textContent === zero) setTextContent('operand', oldAndNewOper[1]);
}

const checkMinus = () => document.getElementsByClassName('numpadOne')[0].textContent === operMinus;

const numToUpperNumpad = oper => {
    if (document.getElementsByClassName('numpadTwo')[0].textContent === space) {
        setTextContent('numpadTwo', document.getElementsByClassName('numpadOne')[0].textContent);
        setTextContent('operand', oper);
        setTextContent('numpadOne', zero);
    } else completeLastAction();
}

const useOperand = oper => {
    if (checkMinus()) return;

    checkOperand();

    if (document.getElementsByClassName('numpadOne')[0].textContent === zero && oper === operMinus) {
        setTextContent('numpadOne', operMinus);
        document.getElementById('clear').textContent = 'C';
        return;
    }

    if (document.getElementById('clear').textContent === 'AC' && oper === operMinus) return;

    savePrevAndNewOperand(oper);
    numToUpperNumpad(oper);
    changeOperand(oper);
}

const savePrevAndNewOperand = oper => {
    if (count === 0) {
        count++;
        oldAndNewOper[1] = oper;
    } else {
        oldAndNewOper[0] = oldAndNewOper[1];
        oldAndNewOper[1] = oper;
    }
}

const completeLastAction = () => {
    if (document.getElementsByClassName('numpadOne')[0].textContent !== zero && document.getElementsByClassName('numpadTwo')[0].textContent !== space) {
        let temp = 0;
        const firstNum = new Decimal(document.getElementsByClassName('numpadOne')[0].textContent);
        const secondNum = new Decimal(document.getElementsByClassName('numpadTwo')[0].textContent);

        switch (oldAndNewOper[0]) {
            case operPlus:
                temp = secondNum.plus(firstNum);
                break;
            case operMinus:
                temp = secondNum.minus(firstNum);
                break;
            case operMult:
                temp = secondNum.times(firstNum);
                break;
            case operDiv:
                temp = secondNum.div(firstNum);
                break;
            case operMod:
                temp = secondNum.mod(firstNum);
                break;
            default:
                return;
        }

        setTextContent('numpadTwo', temp);
        setTextContent('numpadOne', zero);
    }
}