var firstNumber;
var secondNumber;
var operator = '';
var displayIsShowingPreviousNumber = false;
var elementHighlighted = '';

var isButtonAvailable = new Map();

/*Connecting all buttons*/

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("button-1").onclick = function(){Input(1)};
    document.getElementById("button-2").onclick = function(){Input(2)};
    document.getElementById("button-3").onclick = function(){Input(3)};
    document.getElementById("button-4").onclick = function(){Input(4)};
    document.getElementById("button-5").onclick = function(){Input(5)};
    document.getElementById("button-6").onclick = function(){Input(6)};
    document.getElementById("button-7").onclick = function(){Input(7)};
    document.getElementById("button-8").onclick = function(){Input(8)};
    document.getElementById("button-9").onclick = function(){Input(9)};
    document.getElementById("button-0").onclick = function(){Input(0)};
    document.getElementById("button-divide").onclick = function(){Operator('divide')};
    document.getElementById("button-multiply").onclick = function(){Operator('multiply')};
    document.getElementById("button-minus").onclick = function(){Operator('minus')};
    document.getElementById("button-plus").onclick = function(){Operator('plus')};
    document.getElementById("button-change").onclick = function(){ButtonChange()};    
    document.getElementById("button-ce").onclick = function(){ButtonCE()};
    document.getElementById("button-comma").onclick = function(){InputComma()};
    document.getElementById("button-equals").onclick = function(){Equals()};
    document.getElementById("button-c").onclick = function(){ButtonC()};
    SetOperationButtonsAvailability(true);
    SetPositiveNumbersButtonsAvailability(true);
    SetButtonsAvailability(false, '0', 'ce', 'change');
});

/*Connecting all keys*/

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    if('0123456789'.includes(event.key)){
        Input(parseFloat(event.key));
    }
    switch (event.key) {
        case '+':
            Operator('plus');
            console.log(isButtonAvailable.get('plus'));
            break;
        case '-':
            Operator('minus');
            break;
        case '*':
            Operator('multiply');
            break;
        case '/':
            Operator('divide');
            break;
        case ',': case'.':
            InputComma();
            break;
        case '=': case 'Enter':
            Equals();
            break;
        case 'c': case 'C': case 'Delete': case 'Escape':
            ButtonC();
            break;
        case 'Backspace':
            ButtonCE();
            break;
        case 'Control':
            ButtonChange();
            break;
    }
  })

/*Number input methods*/

function Input(digit)
{
    if(isButtonAvailable.get(digit.toString()))
    {
        var resultat = GetDisplayText();
        if(resultat == 'ERROR' || displayIsShowingPreviousNumber)
            resultat = '0';

        switch(GetNumberOfDigits(resultat))
        {
            case 1:
                if(resultat == '0')
                    resultat = digit;
                else
                    resultat = resultat.concat(digit); 

                if(resultat != '0')
                    SetButtonsAvailability(true, 'ce', 'change', '0');
                else
                    SetButtonsAvailability(false, 'ce', 'change', '0');
                break;
            case 9:
                resultat = resultat.concat(digit);
                SetPositiveNumbersButtonsAvailability(false);
                SetButtonsAvailability(false, 'comma', '0');
                break;
            case 10:
                break;
            default:
                resultat = resultat.concat(digit);
                break;
        }

        SetDisplayText(resultat);
        displayIsShowingPreviousNumber = false;
    }
}

function InputComma()
{
    if(isButtonAvailable.get('comma'))
    {
        var display = GetDisplayText();
        if(IsEmptyText(display))
            SetDisplayText('0,');
        else if(!display.includes(',') && GetNumberOfDigits(display) <= 9)
            SetDisplayText(display.concat(','));
        displayIsShowingPreviousNumber = false;
        SetButtonsAvailability(true, 'ce', '0');
        SetButtonsAvailability(false, 'comma');
    }
}

function ButtonC()
{
    if(isButtonAvailable.get('c'))
    {
        SetDisplayText('0');
        operator = '';
        HighLight('');
        SetOperationButtonsAvailability(true);
        SetPositiveNumbersButtonsAvailability(true);
        SetButtonsAvailability(false, '0', 'ce', 'change');
    }
}

function ButtonCE()
{
    if(isButtonAvailable.get('ce'))
    {
        var display = GetDisplayText();
        if(GetNumberOfDigits(display) > 1 && !displayIsShowingPreviousNumber)
        {
            if(GetNumberOfDigits(display) == 10){
                SetPositiveNumbersButtonsAvailability(true);
                SetButtonsAvailability(true, '0');
            }
            display = display.slice(0,display.length-1);
            if(!display.includes(','))
                SetButtonsAvailability(true, 'comma');
        }
        else
            display ='0';

        SetDisplayText(display);

        if(display == '0')
        {
            SetButtonsAvailability(true, 'comma');
            SetButtonsAvailability(false, '0', 'ce', 'change');
        }
        else if(display == '0,')
        {
            SetButtonsAvailability(true, '0', 'ce')
            SetButtonsAvailability(false, 'change');
        }
    }
}

function ButtonChange()
{
    if(isButtonAvailable.get('change'))
    {
        var display = GetDisplayText();
        var valor = ConvertToFloat(display);
        if(valor != 0 && !IsEmptyText(display))
        {
            if(display[0] == '-')
                SetDisplayText(display.slice(1,display.length));
            else
                SetDisplayText('-'.concat(display));
        }
    }
}

/*Operators (divide, multiply, minus, plus)*/

function Operator(button)
{
    if(isButtonAvailable.get(button))
    {
        if(operator != '' && !displayIsShowingPreviousNumber)
        {
            Equals();
            operator = '';
        }
    }
    if(isButtonAvailable.get(button))
    {
        if(operator == '')
        {
            var display = GetDisplayText();
            firstNumber = ConvertToFloat(display);
            displayIsShowingPreviousNumber = true;
            SetPositiveNumbersButtonsAvailability(true);
            SetOperationButtonsAvailability(true);
            SetButtonsAvailability(true, '0');
            SetButtonsAvailability(false, 'ce', 'change');
        }
        operator = button;
        console.log('firstNumber ' + firstNumber + ' ' + operator);
        HighLight(operator);
    }
}

function Equals()
{
    if(isButtonAvailable.get('equals')){
        if(operator != '' && !displayIsShowingPreviousNumber){
            var display = GetDisplayText();
            secondNumber = ConvertToFloat(display);
            var result = Calculate(firstNumber, secondNumber, operator);
        
            SetPositiveNumbersButtonsAvailability(true);
            SetOperationButtonsAvailability(true);
            SetButtonsAvailability(true, '0');
            SetButtonsAvailability(false, 'ce', 'change');

            HighLight('');
            var screenText = ResultDisplay(result);
            if(screenText != 'ERROR'){
                SetDisplayText(screenText);
                console.log('secondNumber ' + secondNumber + ' = result ' + result);
            }
            operator = '';
            firstNumber = '';
            displayIsShowingPreviousNumber = true;
        }
        else if(operator != '' && displayIsShowingPreviousNumber)
        {
            ThrowError();
        }
        else{
            var display = GetDisplayText();
            if(display[display.length-1]==',')
                SetDisplayText(display.substring(0, display.length-1));
            displayIsShowingPreviousNumber = true;
            SetPositiveNumbersButtonsAvailability(true);
            SetOperationButtonsAvailability(true);
            SetButtonsAvailability(true, '0');
            SetButtonsAvailability(false, 'ce', 'change');
        }
    }
}

function ThrowError()
{
    SetDisplayText('ERROR');
    console.log('= result ERROR');
    HighLight('');
    SetPositiveNumbersButtonsAvailability(false);
    SetOperationButtonsAvailability(false);
    SetButtonsAvailability(false, 'ce', 'change', '0');
}

/*Buttons Availability Methods*/

function SetOperationButtonsAvailability(isAvailable)
{
    SetButtonsAvailability(isAvailable, 'divide', 'multiply', 'minus', 'plus', 'equals', 'comma', 'c');
}

function SetPositiveNumbersButtonsAvailability(isAvailable)
{
    SetButtonsAvailability(isAvailable, '1', '2', '3', '4', '5', '6', '7', '8', '9');
}

function SetButtonsAvailability(isAvailable, ...params) 
{
    for(let i =0; i<params.length; i++){
        var button = document.getElementById('button-' + params[i]);
        console.log(params[i]);
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

/*Auxiliary Functions*/

// Discounts sign and decimal comma
function GetNumberOfDigits(text)
{
    return text.length - (text.includes(',') ? 1 : 0 ) - (text[0] == '-' ? 1 : 0);
}

function ConvertToFloat(text)
{
    if(text == '') return 0;
    if(text == 'ERROR') return NaN;
    return parseFloat(text.replace(',','.'));
}

function ResultDisplay(number)
{
    if(Math.abs(number) >= 9999999999.5 || isNaN(number) || !(number==number) ) 
    {
        ThrowError();
        return 'ERROR';
    }
    if(Math.abs(number) <= 0.0000000005) return '0';
    var resultat = number.toFixed(9);
    resultat = CorrectDecimalDigits(resultat);
    return resultat;
}

function CorrectDecimalDigits(text)
{
    var length = 10 + (text[0] == '-' ? 1 : 0) + (text.includes('.') ? 1 : 0);
    var partial = text.replace('.',',').slice(0,length);
    while(HasUnusedDecimalDigits(partial))
    {
        partial = partial.slice(0,partial.length-1);
    } 
    return partial;
}

function HasUnusedDecimalDigits(text)
{
    if(!text.includes(',')) return false;
    return text[text.length-1]==',' || text[text.length-1]=='0';
}

function IsEmptyText(text)
{
    if(text == '' || text == 'ERROR' || displayIsShowingPreviousNumber) return true;
    return false;
}

function HighLight(text)
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

function Calculate(num1, num2, operation)
{
    switch(operation)
    {
        case 'divide':
            return num1 / num2;
        case 'multiply':
            return num1 * num2;
        case 'minus':
            return num1 - num2;
        case 'plus':
            return num1 + num2;
    }
}

function GetDisplayText()
{
    return document.getElementById('display-text').textContent;
}

function SetDisplayText(text)
{
    document.getElementById('display-text').textContent = text;
}