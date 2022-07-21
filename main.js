var firstNumber;
var secondNumber;
var operator = '';
var previousNumber = false;
var elementHighlighted = '';

var numbersEnabled = false;
var operationsEnabled = false;
var commaEnabled = false;
var ceEnabled = false;
var equalsEnabled = false;
var cEnabled = false;
var changeEnabled = false;

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
    EnableAll();
    DisableCES();
    DisableButton('0');
});

/*Connecting all keys*/

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    switch (event.key) {
        case '0':
            Input(0);
            break;
        case '1':
            Input(1);
            break;
        case '2':
            Input(2);
            break;
        case '3':
            Input(3);
            break;
        case '4':
            Input(4);
            break;
        case '5':
            Input(5);
            break;
        case '6':
            Input(6);
            break;
        case '7':
            Input(7);
            break;
        case '8':
            Input(8);
            break;
        case '9':
            Input(9);
            break;
        case '0':
            Input(0);
            break;
        case '+':
            Operator('plus');
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
    if(numbersEnabled)
    {
        var display = document.getElementById('display-text');
        var resultat = display.textContent;
        if(IsEmptyText(resultat))
            resultat = '0';

        switch(TrueLength(resultat))
        {
            case 0:
                resultat = digit;
                break;
            case 1:
                if(resultat == '0')
                    resultat = digit;
                else
                    resultat = resultat.concat(digit);                
                if(resultat != '0')
                {
                    EnableCES();
                    EnableButton('0');
                }
                else
                {
                    DisableCES();
                    DisableButton('0');
                }
                break;
            case 9:
                resultat = resultat.concat(digit);
                DisableNumbers();
                DisableButton('comma');
                commaEnabled = false;
                break;
            case 10:
                break;
            default:
                resultat = resultat.concat(digit);
                break;
        }

        display.textContent = resultat;
        previousNumber = false;
    }
}

function InputComma()
{
    if(commaEnabled)
    {
        var display = document.getElementById('display-text');
        if(IsEmptyText(display.textContent))
            display.textContent = '0,';
        else if(!display.textContent.includes(',') && TrueLength(display.textContent) <= 9)
            display.textContent = display.textContent.concat(',');
        previousNumber = false;
        EnableButton('ce');
        ceEnabled = true;
        EnableButton('0');
        DisableButton('comma');
        commaEnabled = false;
    }
}

function ButtonC()
{
    if(cEnabled)
    {
        var display = document.getElementById('display-text');
        display.textContent = '0';
        operator = '';
        HighLight('');
        EnableAll();
        DisableCES();
        DisableButton('0');
    }
}

function ButtonCE()
{
    if(ceEnabled)
    {
        var display = document.getElementById('display-text');
        if(TrueLength(display.textContent) > 1 && !previousNumber)
        {
            if(TrueLength(display.textContent) == 10)
                EnableNumbers();
            display.textContent = display.textContent.slice(0,display.textContent.length-1);
            if(!display.textContent.includes(','))
            {
                EnableButton('comma');
                commaEnabled = true;
            }
        }
        else
            display.textContent = '0';
        
        if(display.textContent == '0'){
            EnableAll();
            DisableCES();
            DisableButton('0');
        }
        else if(display.textContent == '0,')
        {
            EnableAll();
            DisableButton('change');
            changeEnabled = false;
        }
    }
}

function ButtonChange()
{
    if(operationsEnabled)
    {
        var display = document.getElementById('display-text');
        var valor = ConvertToFloat(display.textContent);
        if(valor != 0 && !IsEmptyText(display.textContent))
        {
            if(display.textContent[0] == '-')
                display.textContent = display.textContent.slice(1,display.textContent.length);
            else
                display.textContent = '-'.concat(display.textContent);
        }
    }
}

/*Operators (divide, multiply, minus, plus)*/

function Operator(button)
{
    if(operationsEnabled)
    {
        if(operator != '' && !previousNumber)
        {
            Equals();
            operator = '';
        }
    }
    if(operationsEnabled)
    {
        if(operator == '')
        {
            var display = document.getElementById('display-text');
            firstNumber = ConvertToFloat(display.textContent);
            previousNumber = true;
            EnableAll();
            DisableCES();
        }
        operator = button;
        console.log('firstNumber ' + firstNumber + ' ' + operator);
        HighLight(operator);
    }
}

function Equals()
{
    if(equalsEnabled){
        if(operator != '' && !previousNumber){
            var display = document.getElementById('display-text');
            secondNumber = ConvertToFloat(display.textContent);
            var result = Calculate();
        
            EnableAll();
            DisableCES();
            HighLight('');
            var screenText = ResultDisplay(result);
            if(screenText != 'ERROR'){
                display.textContent = screenText;
                console.log('secondNumber ' + secondNumber + ' = result ' + result);
            }
            operator = '';
            firstNumber = '';
            previousNumber = true;
        }
        else if(operator != '' && previousNumber)
        {
            ThrowError();
        }
        else{
            var display = document.getElementById('display-text');
            if(display.textContent[display.textContent.length-1]==',')
                display.textContent = display.textContent.substring(0, display.textContent.length-1);
            previousNumber = true;
            EnableAll();
            DisableCES();
        }
    }
}

function Calculate()
{
    switch(operator)
    {
        case 'divide':
            return firstNumber / secondNumber;
        case 'multiply':
            return firstNumber * secondNumber;
        case 'minus':
            return firstNumber - secondNumber;
        case 'plus':
            return firstNumber + secondNumber;
    }
}

function ThrowError()
{
    var display = document.getElementById('display-text');
    display.textContent = 'ERROR';
    console.log('= result ERROR');
    HighLight('');
    DisableAll();
}

/*Disabling buttons*/

function EnableAll()
{
    EnableNumbers();
    EnableOperations();
    EnableButton('comma');
    EnableButton('c');
    EnableButton('equals');
    commaEnabled = true;
    cEnabled = true;
    equalsEnabled = true;
}

function DisableAll()
{
    DisableNumbers();
    DisableOperations();
    DisableCES();
    DisableButton('comma');
    DisableButton('equals');
    commaEnabled = false;
    equalsEnabled = false;
}

function EnableNumbers()
{
    for(var i = 0; i<10; i++)
        EnableButton(i.toString());
    numbersEnabled = true;
}

function DisableNumbers()
{
    for(var i =0; i<10; i++)
        DisableButton(i.toString());
    numbersEnabled = false;
}

function EnableOperations()
{
    let operation = ["divide", "multiply", "minus", "plus"];
    for(var i = 0; i<operation.length; i++)
        EnableButton(operation[i]);
    operationsEnabled = true;
}

function DisableOperations()
{
    let operation = ["divide", "multiply", "minus", "plus"];
    for(var i =0; i<operation.length; i++)
        DisableButton(operation[i]);
    operationsEnabled = false;
}

function EnableCES()// CE and +/-  button have a fundamentally similar behaviour
{
    let operation = ["ce", "change"];
    for(var i =0; i<operation.length; i++)
        EnableButton(operation[i]);
    ceEnabled = true;
    changeEnabled = true;
}

function DisableCES() 
{
    let operation = ["ce", "change"];
    for(var i =0; i<operation.length; i++)
        DisableButton(operation[i]);
    ceEnabled = false;
    changeEnabled = false;
}

function EnableButton(text)
{
    var button = document.getElementById('button-' + text);
    button.classList.remove('not-working-button');
    button.classList.add('working-button');
}

function DisableButton(text)
{
    var button = document.getElementById('button-' + text);
    button.classList.remove('working-button');
    button.classList.add('not-working-button');
}

/*Auxiliary Functions*/

// Discounts sign and decimal comma
function TrueLength(text)
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
    if(text == '' || text == 'ERROR' || previousNumber) return true;
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