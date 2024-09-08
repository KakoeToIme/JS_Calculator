"use strict"

const displayNum = val => {
    let allowEdit = true;
    const displayVal = document.getElementsByClassName('numpad');

    if (displayVal[0].textContent.length > 15) allowEdit = false;
    if (displayVal[0].textContent.length <= 15) allowEdit = true;

    if (displayVal[0].textContent !== '0' && allowEdit === true) document.getElementsByClassName('numpad')[0].textContent += val;
    else if (allowEdit === true) {
        document.getElementsByClassName('numpad')[0].textContent = val;
        document.getElementById('clear').textContent = 'C';
    }
}

const AC = () => {
    document.getElementsByClassName('numpad')[0].textContent = 0;
    document.getElementById('clear').textContent = 'AC';
}

const DEL = () => {
    const newText = document.getElementsByClassName('numpad')[0].textContent.slice(0, -1);

    if (document.getElementsByClassName('numpad')[0].textContent.length > 1) document.getElementsByClassName('numpad')[0].textContent = newText;
    else document.getElementsByClassName('numpad')[0].textContent = '0';
}