"use strict"

let clearAfterEqual = false;

let count = 0;
const oldAndNewOper = ['', ''];

const displayNum = val => {
    if (clearAfterEqual === true) {
        AC();
        clearAfterEqual = false;
    }

    let allowEdit = true;
    const displayVal = document.getElementsByClassName('numpadOne');

    if (displayVal[0].textContent.length > 15) allowEdit = false;
    if (displayVal[0].textContent.length <= 15) allowEdit = true;

    if (checkMinus() && val === '.') return;
    if (displayVal[0].textContent.includes('.') && val === '.') return;

    if (displayVal[0].textContent !== '0' && allowEdit === true) document.getElementsByClassName('numpadOne')[0].textContent += val;
    else if (val === '.' && allowEdit === true && document.getElementsByClassName('numpadOne')[0].textContent === '0')
        document.getElementsByClassName('numpadOne')[0].textContent += val;
    else if (allowEdit === true & val !== '.') {
        document.getElementsByClassName('numpadOne')[0].textContent = val;
        document.getElementById('clear').textContent = 'C';
    }
}

const EQUAL = () => {
    clearAfterEqual = true;

    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;
    const secondNum = document.getElementsByClassName('numpadTwo')[0].textContent;

    switch (document.getElementsByClassName('operand')[0].textContent) {
        case '+':
            document.getElementsByClassName('numpadOne')[0].textContent = Number(firstNum) + Number(secondNum);
            document.getElementsByClassName('numpadTwo')[0].textContent = '';
            document.getElementsByClassName('operand')[0].textContent = '';
            break;
        case '/':
            document.getElementsByClassName('numpadOne')[0].textContent = Number(secondNum) / Number(firstNum);
            document.getElementsByClassName('numpadTwo')[0].textContent = '';
            document.getElementsByClassName('operand')[0].textContent = '';
            break;
        case '*':
            document.getElementsByClassName('numpadOne')[0].textContent = Number(secondNum) * Number(firstNum);
            document.getElementsByClassName('numpadTwo')[0].textContent = '';
            document.getElementsByClassName('operand')[0].textContent = '';
            break;
        case '-':
            document.getElementsByClassName('numpadOne')[0].textContent = Number(secondNum) - Number(firstNum);
            document.getElementsByClassName('numpadTwo')[0].textContent = '';
            document.getElementsByClassName('operand')[0].textContent = '';
            break;
        case '%':
            document.getElementsByClassName('numpadOne')[0].textContent = Number(secondNum) % Number(firstNum);
            document.getElementsByClassName('numpadTwo')[0].textContent = '';
            document.getElementsByClassName('operand')[0].textContent = '';
            break;
    }
}

const AC = () => {
    document.getElementsByClassName('numpadOne')[0].textContent = 0;
    document.getElementsByClassName('numpadTwo')[0].textContent = '';
    document.getElementsByClassName('operand')[0].textContent = '';
    document.getElementById('clear').textContent = 'AC';
    count = 0;
    oldAndNewOper[0] = '';
    oldAndNewOper[1] = '';
}

const DEL = () => {
    const newText = document.getElementsByClassName('numpadOne')[0].textContent.slice(0, -1);

    if (document.getElementsByClassName('numpadOne')[0].textContent.length > 1) document.getElementsByClassName('numpadOne')[0].textContent = newText;
    else {
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
        document.getElementById('clear').textContent = 'AC';
    }
}

const PLUS = () => {
    if (checkMinus()) return;

    checkOperand();
    savePrevAndNewOperand('+');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '+';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0' && document.getElementsByClassName('numpadTwo')[0].textContent !== '') {
        completeLastAction();
    }

    changeOperand('+');
}

const MINUS = () => {
    if (checkMinus()) return;

    checkOperand();
    savePrevAndNewOperand('-');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadOne')[0].textContent === '0') {
        document.getElementsByClassName('numpadOne')[0].textContent = '-';
    } else if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '-';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0' && document.getElementsByClassName('numpadTwo')[0].textContent !== '') {
        completeLastAction();
    }

    changeOperand('-');
}

const MULTIPLICATION = () => {
    if (checkMinus()) return;

    checkOperand();
    savePrevAndNewOperand('*');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '*';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0' && document.getElementsByClassName('numpadTwo')[0].textContent !== '') {
        completeLastAction();
    }

    changeOperand('*');
}

const DIVISION = () => {
    if (checkMinus()) return;

    checkOperand();
    savePrevAndNewOperand('/');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '/';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0' && document.getElementsByClassName('numpadTwo')[0].textContent !== '') {
        completeLastAction();
    }

    changeOperand('/');
}

const MOD_DIVISION = () => {
    if (checkMinus()) return;

    checkOperand();
    savePrevAndNewOperand('%');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '%';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0' && document.getElementsByClassName('numpadTwo')[0].textContent !== '') {
        completeLastAction();
    }

    changeOperand('%');
}

const ROUND = () => {
    if (checkMinus()) return;

    let temp = 0;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '' && document.getElementsByClassName('operand')[0].textContent === '') {
        temp = Math.round(Number(document.getElementsByClassName('numpadOne')[0].textContent));
        document.getElementsByClassName('numpadOne')[0].textContent = temp;
    }
}

const checkOperand = () => {
    if (clearAfterEqual) clearAfterEqual = false;
}

const changeOperand = () => {
    if (document.getElementsByClassName('numpadTwo')[0].textContent !== '' && document.getElementsByClassName('operand')[0].textContent !== '' &&
        document.getElementsByClassName('numpadOne')[0].textContent === '0') document.getElementsByClassName('operand')[0].textContent = oldAndNewOper[1];
}

const checkMinus = () => document.getElementsByClassName('numpadOne')[0].textContent === '-' ? true : false;


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
    let temp = 0;
    const firstNum = Number(document.getElementsByClassName('numpadOne')[0].textContent);
    const secondNum = Number(document.getElementsByClassName('numpadTwo')[0].textContent);

    switch (oldAndNewOper[0]) {
        case '+':
            temp = secondNum + firstNum;
            break;
        case '-':
            temp = secondNum - firstNum;
            break;
        case '*':
            temp = secondNum * firstNum;
            break;
        case '/':
            temp = secondNum / firstNum;
            break;
        case '%':
            temp = secondNum % firstNum;
            break;
        default:
            return; 
    }

    console.log(temp);
    document.getElementsByClassName('numpadTwo')[0].textContent = temp;
    document.getElementsByClassName('numpadOne')[0].textContent = '0';
}

// Рефакторинг (много повторяющегося кода)