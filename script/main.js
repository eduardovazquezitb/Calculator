import {getCountOfNumericalDigits, convertToFloat, correctDecimalDigits, getOperationResult} from './mathHelper.js';
import {getDisplayText, setDisplayText, getButtonElement, setCellBackgroundColor, setButtonStatusStyle, callButtonOnClick} from './domCalls.js';
import {updateButtonStatus} from './buttonStatusHelper.js';

var firstNumber;
var secondNumber;
var operation = '';
var displayIsShowingPreviousNumber = false;
var elementHighlighted = '';
var isButtonAvailable = new Map();

var maxDigits = 10;

window.addEventListener('DOMContentLoaded', () => {
    connectAllButtons();
    setOperationButtonsAvailability(true);
    setNonZeroNumbersButtonsAvailability(true);
    setButtonsAvailability(true, 'c');
    setButtonsAvailability(false, '0', 'ce', 'change');
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
    updateButtonStatus();
}

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    connectAllKeys(event);
})

function connectAllKeys(event) //Making onClick on the Button
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
    if(isButtonAvailable.get(digit.toString()))
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
                    display = display.concat(display); 

                setButtonsAvailability(display!='0', 'ce', 'change', '0');
                break;
            case maxDigits-1:
                display = display.concat(digit);
                setNonZeroNumbersButtonsAvailability(false);
                setButtonsAvailability(false, 'comma', '0');
                break;
            case maxDigits:
                break;
            default:
                display = display.concat(digit);
                break;
        }

        setDisplayText(display);
        displayIsShowingPreviousNumber = false;
    }
}

// make function UpdateButtonStatus

function handleCommaClick()
{
    if(isButtonAvailable.get('comma'))
    {
        var display = getDisplayText();
        if(displayIsShowingPreviousNumber)
            setDisplayText('0,');
        else if(!display.includes(',') && getCountOfNumericalDigits(display) < maxDigits)
            setDisplayText(display.concat(','));
        displayIsShowingPreviousNumber = false;
        setButtonsAvailability(true, 'ce', '0');
        setButtonsAvailability(false, 'comma');
    }
}

function handleClearDisplayClick()
{
    if(isButtonAvailable.get('c'))
    {
        setDisplayText('0');
        operation = '';
        setButtonHighLight('');
        setOperationButtonsAvailability(true);
        setNonZeroNumbersButtonsAvailability(true);
        setButtonsAvailability(false, '0', 'ce', 'change');
    }
}

function handleClearEntryClick()
{
    if(isButtonAvailable.get('ce'))
    {
        var display = getDisplayText();
        if(getCountOfNumericalDigits(display) > 1 && !displayIsShowingPreviousNumber)
        {
            if(getCountOfNumericalDigits(display) == maxDigits){
                setNonZeroNumbersButtonsAvailability(true);
                setButtonsAvailability(true, '0');
            }
            display = display.slice(0,display.length-1);
            if(!display.includes(','))
                setButtonsAvailability(true, 'comma');
        }
        else
            display ='0';

        setDisplayText(display);

        if(display == '0')
        {
            setButtonsAvailability(true, 'comma');
            setButtonsAvailability(false, '0', 'ce', 'change');
        }
        else if(display == '0,')
        {
            setButtonsAvailability(true, '0', 'ce')
            setButtonsAvailability(false, 'change');
        }
    }
}

function handleChangeSignClick()
{
    if(isButtonAvailable.get('change'))
    {
        var display = getDisplayText();
        if(display != '0' && display != '0,' && !displayIsShowingPreviousNumber)
        {
            if(display[0] == '-')
                setDisplayText(display.slice(1,display.length));
            else
                setDisplayText('-'.concat(display));
        }
    }
}

function handleOperationClick(button)
{
    if(isButtonAvailable.get(button))
    {
        if(operation != '' && !displayIsShowingPreviousNumber)
            setOperationResult();
    }
    if(isButtonAvailable.get(button))
    {
        if(operation == '')
            setFirstNumber();
        operation = button;
        console.log('firstNumber ' + firstNumber + ' ' + operation);
        setButtonHighLight(operation);
    }
}

function handleEqualsClick()
{
    if(isButtonAvailable.get('equals')){
        if(operation != '' && !displayIsShowingPreviousNumber)
            setOperationResult();
        else if(operation != '' && displayIsShowingPreviousNumber)
            throwError();
        else
            setFirstNumber();
    }
}

function setFirstNumber()
{
    var display = getDisplayText();
    firstNumber = convertToFloat(display);
    if(display[display.length-1]==',')
        setDisplayText(display.substring(0, display.length-1));
    displayIsShowingPreviousNumber = true;
    setNonZeroNumbersButtonsAvailability(true);
    setOperationButtonsAvailability(true);
    setButtonsAvailability(true, '0');
    setButtonsAvailability(false, 'ce', 'change');
}

function setOperationResult()
{
    var display = getDisplayText();
    secondNumber = convertToFloat(display);
    var result = getOperationResult(firstNumber, secondNumber, operation);

    setNonZeroNumbersButtonsAvailability(true);
    setOperationButtonsAvailability(true);
    setButtonsAvailability(true, '0');
    setButtonsAvailability(false, 'ce', 'change');
    setButtonHighLight('');

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
    var resultat = number.toFixed(9);
    resultat = correctDecimalDigits(resultat, maxDigits);
    return resultat;
}

function throwError()
{
    setDisplayText('ERROR');
    console.log('= result ERROR');
    setButtonHighLight('');
    setNonZeroNumbersButtonsAvailability(false);
    setOperationButtonsAvailability(false);
    setButtonsAvailability(false, 'ce', 'change', '0');
}

function setOperationButtonsAvailability(isAvailable)
{
    setButtonsAvailability(isAvailable, 'divide', 'multiply', 'minus', 'plus', 'equals', 'comma');
}

function setNonZeroNumbersButtonsAvailability(isAvailable)
{
    setButtonsAvailability(isAvailable, '1', '2', '3', '4', '5', '6', '7', '8', '9');
}

function setButtonsAvailability(isAvailable, ...params) 
{
    for(let i =0; i<params.length; i++){
        setButtonStatusStyle(params[i], isAvailable);
        isButtonAvailable.set(params[i], isAvailable);
    }
}

function setButtonHighLight(text)
{
    var colorHighLight = '#31CFB2';
    var defaultColor = '#80E3D1';

    if(elementHighlighted != '')
        setCellBackgroundColor(elementHighlighted, defaultColor)
    if(text != '')
    {
        elementHighlighted = text;
        setCellBackgroundColor(elementHighlighted, colorHighLight)
    }
}