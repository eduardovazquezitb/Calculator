import {getDisplayText, getButtonElement, setCellBackgroundColor, setButtonStatusStyle, disableAllButtons} from './domCallsHelper.js';
import {getCountOfNumericalDigits} from './mathHelper.js';

var elementHighlighted = '';

export function updateButtonStatus(displayIsShowingPreviousNumber, operation, maxDigitsOnDisplay)
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
        setButtonsAvailability(true, 'c', '0');
        setButtonsAvailability(false, 'change', 'ce', 'comma');
    }
    else
    {
        var areNumbersAvailable = getCountOfNumericalDigits(display) < maxDigitsOnDisplay;
        var isZeroAvailable = areNumbersAvailable && display != '0';
        var isCommaAvailable = areNumbersAvailable && !display.includes(',');
        var isClearEntryAvailable = display != '0';
        var isChangeSignAvailable = display != '0' && display != '0,';

        setNonZeroNumbersButtonsAvailability(areNumbersAvailable);
        setOperationButtonsAvailability(true);
        setButtonsAvailability(isZeroAvailable, '0');
        setButtonsAvailability(isCommaAvailable, 'comma');
        setButtonsAvailability(true, 'c');
        setButtonsAvailability(isClearEntryAvailable, 'ce');
        setButtonsAvailability(isChangeSignAvailable, 'change');
    }
    setButtonHighLight(operation);
}

export function initializeButtonStatus()
{
    disableAllButtons();
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