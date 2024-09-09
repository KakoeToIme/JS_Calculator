"use strict"

const displayNum = val => {
    let allowEdit = true;
    const displayVal = document.getElementsByClassName('numpadOne');

    if (displayVal[0].textContent.length > 15) allowEdit = false;
    if (displayVal[0].textContent.length <= 15) allowEdit = true;

    if (displayVal[0].textContent !== '0' && allowEdit === true) document.getElementsByClassName('numpadOne')[0].textContent += val;
    else if (allowEdit === true) {
        document.getElementsByClassName('numpadOne')[0].textContent = val;
        document.getElementById('clear').textContent = 'C';
    }
}

const AC = () => {
    document.getElementsByClassName('numpadOne')[0].textContent = 0;
    document.getElementsByClassName('numpadTwo')[0].textContent = '';
    document.getElementsByClassName('operand')[0].textContent = '';
    document.getElementById('clear').textContent = 'AC';
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

const EQUAL = () => {
    const firstNum = document.getElementsByClassName('numpadOne')[0].textContent;
    const secondNum = document.getElementsByClassName('numpadTwo')[0].textContent;

    switch (document.getElementsByClassName('operand')[0].textContent) {
        case '+':
            document.getElementsByClassName('numpadOne')[0].textContent = Number(firstNum) + Number(secondNum);
            document.getElementsByClassName('numpadTwo')[0].textContent = '';
            document.getElementsByClassName('operand')[0].textContent = '';
            break;
    }
}