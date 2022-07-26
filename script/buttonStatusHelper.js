import {getDisplayText, getButtonElement, setCellBackgroundColor, setButtonStatusStyle} from './domCalls.js';
import {getCountOfNumericalDigits} from './mathHelper.js';

export function updateButtonStatus(displayIsShowingPreviousNumber, elementHighlighted, operation)
{
    var display = getDisplayText();

    if(display == 'ERROR')
    {
        setNonZeroNumbersButtonsAvailability(false);
        setOperationButtonsAvailability(false);
        setButtonsAvailability(true, 'c');
        setButtonsAvailability(false, '0', 'change', 'ce', 'comma');
    }
    else if(displayIsShowingPreviousNumber)
    {
        setNonZeroNumbersButtonsAvailability(true);
        setOperationButtonsAvailability(true);
        setButtonsAvailability(true, '0', 'c', 'comma');
        setButtonsAvailability(false, 'change', 'ce');
    }
    else
    {
        var areNumbersAvailable = getCountOfNumericalDigits(display)!=10;
        var isZeroAvailable = areNumbersAvailable && display != '0';
        var isCommaAvailable = areNumbersAvailable && !display.includes(',');
        var isClearEntryAvailable = display != '0';
        var isChangeSignAvailable = display != '0' && display != '0,';

        setNonZeroNumbersButtonsAvailability(areNumbersAvailable);
        setButtonsAvailability(isZeroAvailable, '0');
        setButtonsAvailability(isCommaAvailable, 'comma');
        setOperationButtonsAvailability(true);
        setButtonsAvailability(true, 'c');
        setButtonsAvailability(isClearEntryAvailable, 'ce');
        setButtonsAvailability(isChangeSignAvailable, 'change');
    }
    return setButtonHighLight(operation, elementHighlighted);
}

export function initializeButtonStatus()
{
    var buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

function setButtonsAvailability(newAvailability, ...params) 
{
    for(let i =0; i<params.length; i++){
        var button = getButtonElement(params[i]);
        if(button.disabled == newAvailability) {
            setButtonStatusStyle(params[i], newAvailability);
            button.disabled = !newAvailability;
        }
    }
}

function setOperationButtonsAvailability(isAvailable)
{
    setButtonsAvailability(isAvailable, 'divide', 'multiply', 'minus', 'plus', 'equals');
}

function setNonZeroNumbersButtonsAvailability(isAvailable)
{
    setButtonsAvailability(isAvailable, '1', '2', '3', '4', '5', '6', '7', '8', '9');
}

function setButtonHighLight(text, elementHighlighted)
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
    return elementHighlighted;
}