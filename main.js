import {getNumberOfNumericalDigits, convertToFloat, getResultDisplay, getOperationResult} from './auxiliary.js';

var firstNumber;
var secondNumber;
var operator = '';
var displayIsShowingPreviousNumber = false;
var elementHighlighted = '';
var isButtonAvailable = new Map();

window.addEventListener('DOMContentLoaded', () => {
    connectingAllButtons();
    setOperationButtonsAvailability(true);
    setPositiveNumbersButtonsAvailability(true);
    setButtonsAvailability(true, 'c');
    setButtonsAvailability(false, '0', 'ce', 'change');
});

function connectingAllButtons(){
    document.getElementById("button-1").onclick = function(){handleNumericalClick(1)};
    document.getElementById("button-2").onclick = function(){handleNumericalClick(2)};
    document.getElementById("button-3").onclick = function(){handleNumericalClick(3)};
    document.getElementById("button-4").onclick = function(){handleNumericalClick(4)};
    document.getElementById("button-5").onclick = function(){handleNumericalClick(5)};
    document.getElementById("button-6").onclick = function(){handleNumericalClick(6)};
    document.getElementById("button-7").onclick = function(){handleNumericalClick(7)};
    document.getElementById("button-8").onclick = function(){handleNumericalClick(8)};
    document.getElementById("button-9").onclick = function(){handleNumericalClick(9)};
    document.getElementById("button-0").onclick = function(){handleNumericalClick(0)};
    document.getElementById("button-divide").onclick = function(){handleOperatorClick('divide')};
    document.getElementById("button-multiply").onclick = function(){handleOperatorClick('multiply')};
    document.getElementById("button-minus").onclick = function(){handleOperatorClick('minus')};
    document.getElementById("button-plus").onclick = function(){handleOperatorClick('plus')};
    document.getElementById("button-change").onclick = function(){handleChangeSignClick()};    
    document.getElementById("button-ce").onclick = function(){handleClearEntryClick()};
    document.getElementById("button-comma").onclick = function(){handleCommaClick()};
    document.getElementById("button-equals").onclick = function(){handleEqualsClick()};
    document.getElementById("button-c").onclick = function(){handleClearDisplayClick()};
}

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    connectingAllKeys(event);
})

function connectingAllKeys(event)
{
    if('0123456789'.includes(event.key)){
        handleNumericalClick(parseFloat(event.key));
    }
    switch (event.key) {
        case '+':
            handleOperatorClick('plus');
            break;
        case '-':
            handleOperatorClick('minus');
            break;
        case '*':
            handleOperatorClick('multiply');
            break;
        case '/':
            handleOperatorClick('divide');
            break;
        case ',': case'.':
            handleCommaClick();
            break;
        case '=': case 'Enter':
            handleEqualsClick();
            break;
        case 'c': case 'C': case 'Delete': case 'Escape':
            handleClearDisplayClick();
            break;
        case 'Backspace':
            handleClearEntryClick();
            break;
        case 'Control':
            handleChangeSignClick();
            break;
    }
}

function handleNumericalClick(digit)
{
    if(isButtonAvailable.get(digit.toString()))
    {
        var resultat = getDisplayText();
        if(resultat == 'ERROR' || displayIsShowingPreviousNumber)
            resultat = '0';

        switch(getNumberOfNumericalDigits(resultat))
        {
            case 1:
                if(resultat == '0')
                    resultat = digit;
                else
                    resultat = resultat.concat(digit); 

                if(resultat != '0')
                    setButtonsAvailability(true, 'ce', 'change', '0');
                else
                    setButtonsAvailability(false, 'ce', 'change', '0');
                break;
            case 9:
                resultat = resultat.concat(digit);
                setPositiveNumbersButtonsAvailability(false);
                setButtonsAvailability(false, 'comma', '0');
                break;
            case 10:
                break;
            default:
                resultat = resultat.concat(digit);
                break;
        }

        setDisplayText(resultat);
        displayIsShowingPreviousNumber = false;
    }
}

function handleCommaClick()
{
    if(isButtonAvailable.get('comma'))
    {
        var display = getDisplayText();
        if(display == 'ERROR' || displayIsShowingPreviousNumber)
            setDisplayText('0,');
        else if(!display.includes(',') && getNumberOfNumericalDigits(display) <= 9)
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
        operator = '';
        setButtonHighLight('');
        setOperationButtonsAvailability(true);
        setPositiveNumbersButtonsAvailability(true);
        setButtonsAvailability(false, '0', 'ce', 'change');
    }
}

function handleClearEntryClick()
{
    if(isButtonAvailable.get('ce'))
    {
        var display = getDisplayText();
        if(getNumberOfNumericalDigits(display) > 1 && !displayIsShowingPreviousNumber)
        {
            if(getNumberOfNumericalDigits(display) == 10){
                setPositiveNumbersButtonsAvailability(true);
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
        if(display != '0' && display != '0,' && display!= 'ERROR' && !displayIsShowingPreviousNumber)
        {
            if(display[0] == '-')
                setDisplayText(display.slice(1,display.length));
            else
                setDisplayText('-'.concat(display));
        }
    }
}

function handleOperatorClick(button)
{
    if(isButtonAvailable.get(button))
    {
        if(operator != '' && !displayIsShowingPreviousNumber)
            setOperationResult();
    }
    if(isButtonAvailable.get(button))
    {
        if(operator == '')
            setFirstNumber();
        operator = button;
        console.log('firstNumber ' + firstNumber + ' ' + operator);
        setButtonHighLight(operator);
    }
}

function handleEqualsClick()
{
    if(isButtonAvailable.get('equals')){
        if(operator != '' && !displayIsShowingPreviousNumber)
            setOperationResult();
        else if(operator != '' && displayIsShowingPreviousNumber)
            ThrowError();
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
    setPositiveNumbersButtonsAvailability(true);
    setOperationButtonsAvailability(true);
    setButtonsAvailability(true, '0');
    setButtonsAvailability(false, 'ce', 'change');
}

function setOperationResult()
{
    var display = getDisplayText();
    secondNumber = convertToFloat(display);
    var result = getOperationResult(firstNumber, secondNumber, operator);

    setPositiveNumbersButtonsAvailability(true);
    setOperationButtonsAvailability(true);
    setButtonsAvailability(true, '0');
    setButtonsAvailability(false, 'ce', 'change');
    setButtonHighLight('');

    var screenText = getResultDisplay(result);
    if(screenText == 'ERROR')
        ThrowError();
    else{
        setDisplayText(screenText);
        console.log('secondNumber ' + secondNumber + ' = result ' + result);
    }

    operator = '';
    firstNumber = '';
    displayIsShowingPreviousNumber = true;
}

function ThrowError()
{
    setDisplayText('ERROR');
    console.log('= result ERROR');
    setButtonHighLight('');
    setPositiveNumbersButtonsAvailability(false);
    setOperationButtonsAvailability(false);
    setButtonsAvailability(false, 'ce', 'change', '0');
}

function setOperationButtonsAvailability(isAvailable)
{
    setButtonsAvailability(isAvailable, 'divide', 'multiply', 'minus', 'plus', 'equals', 'comma');
}

function setPositiveNumbersButtonsAvailability(isAvailable)
{
    setButtonsAvailability(isAvailable, '1', '2', '3', '4', '5', '6', '7', '8', '9');
}

function setButtonsAvailability(isAvailable, ...params) 
{
    for(let i =0; i<params.length; i++){
        var button = document.getElementById('button-' + params[i]);
        if(isAvailable){
            button.classList.remove('not-working-button');
            button.classList.add('working-button');
        }
        else
        {
            button.classList.remove('working-button');
            button.classList.add('not-working-button');
        }
        isButtonAvailable.set(params[i], isAvailable);
    }
}

function setButtonHighLight(text)
{
    var colorHighLight = '#31CFB2';

    if(elementHighlighted != '')
    {
        var unhighlight = document.getElementById(elementHighlighted);
        unhighlight.style.backgroundColor = '#80E3D1';
    }
    if(text != '')
    {
        elementHighlighted = 'td-'+text;
        var highlight = document.getElementById(elementHighlighted);
        highlight.style.backgroundColor = colorHighLight;
    }
}

function getDisplayText()
{
    return document.getElementById('display-text').textContent;
}

function setDisplayText(text)
{
    document.getElementById('display-text').textContent = text;
}