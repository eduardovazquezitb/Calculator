var firstNumber;
var secondNumber;
var operator = '';
var previousNumber = false;
var elementHighlighted = '';

/*Connecting all buttons*/

window.addEventListener('DOMContentLoaded', () => {
    EnableAll();
});

/*Connecting all keys*/

document.addEventListener("keydown", function(event) {
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
    var display = document.getElementById('display-text');
    var resultat = display.textContent;
    if(IsEmptyText(resultat))
        resultat = '';

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
                if(digit != 0) EnableCE();
            break;
        case 9:
            resultat = resultat.concat(digit);
            DisableNumbers();
            DisableButton('comma');
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

function InputComma()
{
    var display = document.getElementById('display-text');
    if(IsEmptyText(display.textContent))
        display.textContent = '0,';
    else if(!display.textContent.includes(',') && TrueLength(display.textContent) <= 9)
        display.textContent = display.textContent.concat(',');
    previousNumber = false;
    DisableButton('comma');
}

function ButtonC()
{
    var display = document.getElementById('display-text');
    display.textContent = '0';
    operator = '';
    HighLight('');
    EnableAll();
}

function ButtonCE()
{
    var display = document.getElementById('display-text');
    if(display.textContent.length > 1 && !previousNumber)
    {
        if(TrueLength(display.textContent) == 10)
            EnableNumbers();
        if(display.textContent[display.textContent.length-1] == ',')
            EnableComma();
        display.textContent = display.textContent.slice(0,display.textContent.length-1);
    }
    else{
        display.textContent = '0';
        DisableButton('ce');
    }
}

function ButtonChange()
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

/*Operators (divide, multiply, minus, plus)*/

function Operator(button)
{
    if(operator != '' && !previousNumber)
    {
        Equals();
        operator = '';
    }
    if(operator == '')
    {
        var display = document.getElementById('display-text');
        firstNumber = ConvertToFloat(display.textContent);
        previousNumber = true;
        EnableAll();
    }
    operator = button;
    console.log('firstNumber ' + firstNumber + ' ' + operator);
    HighLight(operator);
}

function Equals()
{
    if(operator != '' && !previousNumber){
        var display = document.getElementById('display-text');
        secondNumber = ConvertToFloat(display.textContent);
        var result;
        switch(operator)
        {
            case 'divide':
                result = firstNumber / secondNumber;
                break;
            case 'multiply':
                result = firstNumber * secondNumber;
                break;
            case 'minus':
                result = firstNumber - secondNumber;
                break;
            case 'plus':
                result = firstNumber + secondNumber;
                break;
        }
        
        EnableAll();
        HighLight('');
        display.textContent = ResultDisplay(result);
        console.log('secondNumber ' + secondNumber + ' = result ' + result)
        operator = '';
        firstNumber = '';
        previousNumber = true;
    }
    else if(operator != '' && previousNumber)
    {
        var display = document.getElementById('display-text');
        display.textContent = 'ERROR';
        console.log('= result ERROR');
        HighLight('');
        DisableAll();
    }
    else{
        var display = document.getElementById('display-text');
        if(display.textContent[display.textContent.length-1]==',')
            display.textContent = display.textContent.substring(0, display.textContent.length-1);
        previousNumber = true;
        EnableAll();
    }
}

/*Disabling buttons*/

function EnableAll()
{
    EnableNumbers();
    EnableComma();
    EnableOperations();
    EnableC();
    DisableButton('ce');
    EnableEquals();
}

function DisableAll()
{
    DisableNumbers();
    DisableButton('comma');
    DisableOperations();
    DisableButton('ce');
    DisableButton('equals');
}

function EnableNumbers()
{
    for(var i = 0; i<10; i++){
        var button = document.getElementById('button-' + i.toString());
        button.classList.remove('not-working-button');
        button.classList.add('working-button');
    }
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
}

function DisableNumbers()
{
    for(var i =0; i<10; i++)
        DisableButton(i.toString());
}

function EnableOperations()
{
    let operation = ["divide", "multiply", "minus", "plus", "change"];
    for(var i = 0; i<operation.length; i++){
        var button = document.getElementById('button-' + operation[i]);
        button.classList.remove('not-working-button');
        button.classList.add('working-button');
    }
    document.getElementById("button-divide").onclick = function(){Operator('divide')};
    document.getElementById("button-multiply").onclick = function(){Operator('multiply')};
    document.getElementById("button-minus").onclick = function(){Operator('minus')};
    document.getElementById("button-plus").onclick = function(){Operator('plus')};
    document.getElementById("button-change").onclick = function(){ButtonChange()};
}

function DisableOperations()
{
    let operation = ["divide", "multiply", "minus", "plus", "change"];
    for(var i =0; i<operation.length; i++)
        DisableButton(operation[i]);
}

function EnableComma()
{
    var button = document.getElementById('button-comma');
    button.classList.remove('not-working-button');
    button.classList.add('working-button');
    button.onclick = function(){InputComma()};
}

function EnableCE()
{
    var button = document.getElementById('button-ce');
    button.classList.remove('not-working-button');
    button.classList.add('working-button');
    button.onclick = function(){ButtonCE()};
}

function EnableEquals()
{
    var button = document.getElementById('button-equals');
    button.classList.remove('not-working-button');
    button.classList.add('working-button');
    button.onclick = function(){Equals()};
}

function EnableC()
{
    var button = document.getElementById('button-c');
    button.classList.remove('not-working-button');
    button.classList.add('working-button');
    button.onclick = function(){ButtonC()};
}

function DisableButton(text)
{
    var button = document.getElementById('button-' + text);
    button.classList.remove('working-button');
    button.classList.add('not-working-button');
    button.onclick = null;
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
    if(Math.abs(number) > 9999999999 || isNaN(number) || !(number==number) ) 
    {
        DisableAll();
        return 'ERROR';
    }
    if(Math.abs(number) < 0.00000001 || number.toString().includes('e')) return '0';
    var resultat = number.toString();
    if(resultat.includes('.')) resultat = CorrectDecimalDigits(resultat);
    return resultat;
}

function CorrectDecimalDigits(text)
{
    var length1 = 11 + (text[0] == '-' ? 1 : 0) + (text.includes('.') ? 1 : 0);
    text = text.slice(0, length1);
    if(text[length1-1]>=5)
    {
        var number = parseFloat(text)+(15-parseFloat(text[length1-1]))*Math.pow(10, -length1+text.indexOf('.')+1);
        text = number.toString();
    }
    var length2 = 10 + (text[0] == '-' ? 1 : 0) + (text.includes('.') ? 1 : 0);
    var partial = text.replace('.',',').slice(0,length2);
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