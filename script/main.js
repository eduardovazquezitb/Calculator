import {getCountOfNumericalDigits, convertToFloat, getCountOfIntDigits, correctDecimalDigits, getOperationResult} from './mathHelper.js';
import {getDisplayText, setDisplayText, getButtonElement, callButtonOnClick} from './domCalls.js';
import {updateButtonStatus, initializeButtonStatus} from './buttonStatusHelper.js';

var firstNumber;
var operation = '';
var displayIsShowingPreviousNumber = false;
var elementHighlighted = '';

var maxDigits = 10;

window.addEventListener('DOMContentLoaded', () => {
    initializeButtonStatus();
    connectAllButtons();
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
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
    if(displayIsShowingPreviousNumber)
        display = '0';

    switch(getCountOfNumericalDigits(display))
    {
        case 1:
            if(display == '0')
                display = digit;
            else
                display = display.concat(digit); 
            break;
        case maxDigits-1:
            display = display.concat(digit);
            break;
        case maxDigits:
            break;
        default:
            display = display.concat(digit);
            break;
    }

    setDisplayText(display);
    displayIsShowingPreviousNumber = false;
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
}

function handleCommaClick()
{
    var display = getDisplayText();
    if(displayIsShowingPreviousNumber)
        setDisplayText('0,');
    else if(!display.includes(',') && getCountOfNumericalDigits(display) < maxDigits)
        setDisplayText(display.concat(','));
    displayIsShowingPreviousNumber = false;
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
}

function handleClearDisplayClick()
{
    setDisplayText('0');
    operation = '';
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
}

function handleClearEntryClick()
{
    var display = getDisplayText();
    if(getCountOfNumericalDigits(display) > 1 && !displayIsShowingPreviousNumber)
        display = display.slice(0,display.length-1);
    else
        display ='0';

    setDisplayText(display);
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
}

function handleChangeSignClick()
{
    var display = getDisplayText();
    if(display != '0' && display != '0,' && !displayIsShowingPreviousNumber)
    {
        if(display[0] == '-')
            setDisplayText(display.slice(1,display.length));
        else
            setDisplayText('-'.concat(display));
    }
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
}

function handleOperationClick(button)
{
    if(operation != '' && !displayIsShowingPreviousNumber)
        setOperationResult();
    if(getDisplayText != 'ERROR')
    {
        if(operation == '')
            setFirstNumber();
        operation = button;
        console.log('firstNumber ' + firstNumber + ' ' + operation);
    }
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
}

function handleEqualsClick()
{
    if(operation != '' && !displayIsShowingPreviousNumber)
        setOperationResult();
    else if(operation != '' && displayIsShowingPreviousNumber)
        throwError();
    else
        setFirstNumber();
    elementHighlighted = updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation);
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
    var display = getDisplayText();
    var secondNumber = convertToFloat(display);
    var result = getOperationResult(firstNumber, secondNumber, operation);

    var screenText = getResultDisplay(result);
    if(screenText == 'ERROR')
        throwError();
    else{
        setDisplayText(screenText);
        console.log('secondNumber ' + secondNumber + ' = result ' + result);
    }

    operation = '';
    firstNumber = '';
    displayIsShowingPreviousNumber = true;
}

function getResultDisplay(number)
{
    if(Math.abs(number) >= 9999999999.5 || isNaN(number) || !(number==number) ) return 'ERROR';
    if(Math.abs(number) <= 0.0000000005) return '0';
    var numIntDigits = getCountOfIntDigits(number, maxDigits);
    var resultat = number.toFixed(maxDigits-numIntDigits);
    resultat = correctDecimalDigits(resultat, maxDigits);
    return resultat;
}

function throwError()
{
    setDisplayText('ERROR');
    console.log('= result ERROR');
    operation = '';
}