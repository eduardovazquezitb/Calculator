import {getCountOfNumericalDigits, convertToFloat, getApproximationToMaxDigits, getCountOfIntegerDigits, removeZerosFromRight, getOperationResult} from './mathHelper.js';
import {getDisplayText, setDisplayText, getButtonElement, callButtonOnClick} from './domCallsHelper.js';
import {updateButtonStatus, initializeButtonStatus} from './buttonStatusHelper.js';

var firstNumber;
var operation = '';
var displayIsShowingPreviousNumber = false;
const MAX_DIGITS_ON_DISPLAY = 10; // MAX_DIGITS_ON_DISPLAY > 1

window.addEventListener('DOMContentLoaded', () => {
    initializeButtonStatus();
    connectAllButtons();
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
});

function connectAllButtons(){
    getButtonElement('1').onclick = function(){handleNumericalClick(1)};
    getButtonElement('2').onclick = function(){handleNumericalClick(2)};
    getButtonElement('3').onclick = function(){handleNumericalClick(3)};
    getButtonElement('4').onclick = function(){handleNumericalClick(4)};
    getButtonElement('5').onclick = function(){handleNumericalClick(5)};
    getButtonElement('6').onclick = function(){handleNumericalClick(6)};
    getButtonElement('7').onclick = function(){handleNumericalClick(7)};
    getButtonElement('8').onclick = function(){handleNumericalClick(8)};
    getButtonElement('9').onclick = function(){handleNumericalClick(9)};
    getButtonElement('0').onclick = function(){handleNumericalClick(0)};
    getButtonElement('divide').onclick = function(){handleOperationClick('divide')};
    getButtonElement('multiply').onclick = function(){handleOperationClick('multiply')};
    getButtonElement('minus').onclick = function(){handleOperationClick('minus')};
    getButtonElement('plus').onclick = function(){handleOperationClick('plus')};
    getButtonElement('change').onclick = function(){handleChangeSignClick()};    
    getButtonElement('ce').onclick = function(){handleClearEntryClick()};
    getButtonElement('comma').onclick = function(){handleCommaClick()};
    getButtonElement('equals').onclick = function(){handleEqualsClick()};
    getButtonElement('c').onclick = function(){handleClearDisplayClick()};
}

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    connectAllKeys(event);
})

function connectAllKeys(event)
{
    if('0123456789'.includes(event.key)){
        callButtonOnClick(event.key);
    }
    switch (event.key) {
        case '+':
            callButtonOnClick('plus');
            break;
        case '-':
            callButtonOnClick('minus');
            break;
        case '*':
            callButtonOnClick('multiply');
            break;
        case '/':
            callButtonOnClick('divide');
            break;
        case ',': case'.':
            callButtonOnClick('comma');
            break;
        case 'Enter':
            callButtonOnClick('equals');
            break;
        case 'Escape':
            callButtonOnClick('c');
            break;
        case 'Backspace':
            callButtonOnClick('ce');
            break;
        case 'Control':
            callButtonOnClick('change');
            break;
    }
}

function handleNumericalClick(digit)
{
    var display = getDisplayText();
    if(display == '0' || displayIsShowingPreviousNumber)
        display = digit;
    else
        display = display.concat(digit);
    setDisplayText(display);
    displayIsShowingPreviousNumber = false;
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function handleCommaClick()
{
    var display = getDisplayText();
    if(displayIsShowingPreviousNumber)
        setDisplayText('0,');
    else
        setDisplayText(display.concat(','));
    displayIsShowingPreviousNumber = false;
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function handleClearDisplayClick()
{
    setDisplayText('0');
    operation = '';
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function handleClearEntryClick()
{
    var display = getDisplayText();
    if(getCountOfNumericalDigits(display) > 1)
        display = display.slice(0,display.length-1);
    else
        display ='0';
    setDisplayText(display);
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function handleChangeSignClick()
{
    var display = getDisplayText();
    if(display[0] == '-')
        setDisplayText(display.slice(1,display.length));
    else
        setDisplayText('-'.concat(display));
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function handleOperationClick(button)
{
    if(operation != '' && !displayIsShowingPreviousNumber)
        setOperationResult();
    if(getDisplayText() != 'ERROR')
    {
        if(operation == '')
            setFirstNumber();
        operation = button;
        console.log('firstNumber ' + firstNumber + ' ' + operation);
    }
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function handleEqualsClick()
{
    if(operation != '' && !displayIsShowingPreviousNumber)
        setOperationResult();
    else if(operation != '' && displayIsShowingPreviousNumber)
        throwError();
    else
        setFirstNumber();
    updateButtonStatus(displayIsShowingPreviousNumber, operation, MAX_DIGITS_ON_DISPLAY);
}

function setFirstNumber()
{
    var display = getDisplayText();
    firstNumber = convertToFloat(display);
    if(display[display.length-1]==',')
        setDisplayText(display.substring(0, display.length-1));
    displayIsShowingPreviousNumber = true;
}

function setOperationResult()
{
    var secondNumber = convertToFloat(getDisplayText());
    var result = getOperationResult(firstNumber, secondNumber, operation);

    var display = getResultDisplay(result);
    if(display == 'ERROR')
        throwError();
    else{
        setDisplayText(display);
        console.log('secondNumber ' + secondNumber + ' = result ' + result);
    }

    operation = '';
    firstNumber = '';
    displayIsShowingPreviousNumber = true;
}

function getResultDisplay(number)
{
    if(isNaN(number) || ! isFinite(number)) return 'ERROR';
2.
    var resultDisplay = getApproximationToMaxDigits(number, MAX_DIGITS_ON_DISPLAY);
    var countIntegerDigits = getCountOfIntegerDigits(resultDisplay);

    if(countIntegerDigits > MAX_DIGITS_ON_DISPLAY) return 'ERROR';

    resultDisplay = removeZerosFromRight(resultDisplay);
    return resultDisplay;
}

function throwError()
{
    setDisplayText('ERROR');
    console.log('= result ERROR');
    operation = '';
}