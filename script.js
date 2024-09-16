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
    checkOperand();
    changeOperand('+');
    savePrevAndNewOperand('+');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '+';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    }
    else {
        temp = Number(firstNum) + Number(document.getElementsByClassName('numpadTwo')[0].textContent);
        document.getElementsByClassName('numpadTwo')[0].textContent = temp;
        document.getElementsByClassName('operand')[0].textContent = '+';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    }
}

const MINUS = () => {
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
    } else {
        temp = Number(document.getElementsByClassName('numpadTwo')[0].textContent) - Number(firstNum);
        document.getElementsByClassName('numpadTwo')[0].textContent = temp;
        document.getElementsByClassName('operand')[0].textContent = '-';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    }
}

const MULTIPLICATION = () => {
    checkOperand();
    changeOperand('*');
    savePrevAndNewOperand('*');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '*';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0') {
        temp = Number(document.getElementsByClassName('numpadTwo')[0].textContent) * Number(firstNum);
        document.getElementsByClassName('numpadTwo')[0].textContent = temp;
        document.getElementsByClassName('operand')[0].textContent = '*';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    }
}

const DIVISION = () => {
    checkOperand();
    changeOperand('/');
    savePrevAndNewOperand('/');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '/';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0') {
        temp = Number(document.getElementsByClassName('numpadTwo')[0].textContent) / Number(firstNum);
        document.getElementsByClassName('numpadTwo')[0].textContent = temp;
        document.getElementsByClassName('operand')[0].textContent = '/';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    }
}

const MOD_DIVISION = () => {
    checkOperand();
    changeOperand('%');
    savePrevAndNewOperand('%');

    let temp = 0;
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '') {
        document.getElementsByClassName('numpadTwo')[0].textContent = firstNum;
        document.getElementsByClassName('operand')[0].textContent = '%';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    } else if (document.getElementsByClassName('numpadOne')[0].textContent !== '0') {
        temp = Number(document.getElementsByClassName('numpadTwo')[0].textContent) % Number(firstNum);
        document.getElementsByClassName('numpadTwo')[0].textContent = temp;
        document.getElementsByClassName('operand')[0].textContent = '%';
        document.getElementsByClassName('numpadOne')[0].textContent = '0';
    }
}

const ROUND = () => {
    let temp = 0;

    if (document.getElementsByClassName('numpadTwo')[0].textContent === '' && document.getElementsByClassName('operand')[0].textContent === '') {
        temp = Math.round(Number(document.getElementsByClassName('numpadOne')[0].textContent));
        document.getElementsByClassName('numpadOne')[0].textContent = temp;
    }
}

const checkOperand = () => {
    if (clearAfterEqual) clearAfterEqual = false;
}

const changeOperand = oper => {
    if (document.getElementsByClassName('numpadTwo')[0].textContent !== '' && document.getElementsByClassName('operand')[0].textContent !== '' &&
        document.getElementsByClassName('numpadOne')[0].textContent === '0') document.getElementsByClassName('operand')[0].textContent = oper;
}

const savePrevAndNewOperand = oper => {
    if (count === 0) {
        count++;
        oldAndNewOper[1] = oper;
    } else {
        oldAndNewOper[0] = oldAndNewOper[1];
        oldAndNewOper[1] = oper;
    }

    console.log(oldAndNewOper);
}
//Исправить баг, что в numpadOne или numpadTwo может стоять минус без числа
// Исправить баг со знаками при поочередном нажатии на операнды (savePrevAndNewOperand функцию довести до конца)
// Рефакторинг (много повторяющегося кода)