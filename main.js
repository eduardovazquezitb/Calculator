var firstNumber;
var secondNumber;
var operator = '';
var previousNumber = false;

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
    document.getElementById("button-comma").onclick = function(){InputComma()};
    document.getElementById("button-equals").onclick = function(){Equals()};
    document.getElementById("button-c").onclick = function(){ButtonC()};
    document.getElementById("button-ce").onclick = function(){ButtonCE()};
    document.getElementById("button-change").onclick = function(){ButtonChange()};
});

/*Connecting all keys*/

document.addEventListener("keydown", function(event) {
    console.log(event);
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
        case 's': case 'S':
            ButtonChange();
            break;
    }
  })

/*Number input methods*/

function Input(digit)
{
    var display = document.getElementById('display-text');
    if(IsEmptyText(display.textContent))
        display.textContent = '';
    var max = (display.textContent[0] == '-' ? 11 : 10)
    switch(display.textContent.length)
    {
        case 0:
            display.textContent = digit;
            break;
        case 1:
            if(display.textContent == '0')
                display.textContent = digit;
            else
                display.textContent = display.textContent.concat(digit);
                break;
        case max:
            break;
        default:
            display.textContent = display.textContent.concat(digit);
            break;
    }
    previousNumber = false;
}

function InputComma()
{
    var display = document.getElementById('display-text');
    if(IsEmptyText(display.textContent))
        display.textContent = '0,';
    else if(!display.textContent.includes(',') && display.textContent.length <= 8)
        display.textContent = display.textContent.concat(',');
    previousNumber = false;
}

function ButtonC()
{
    var display = document.getElementById('display-text');
    display.textContent = '0';
    operator = '';
    HighLight('');
}

function ButtonCE()
{
    var display = document.getElementById('display-text');
    if(display.textContent.length > 1 && !previousNumber) 
        display.textContent = display.textContent.slice(0,display.textContent.length-1);
    else
        display.textContent = '0';
}

function ButtonChange()
{
    var display = document.getElementById('display-text');
    var valor = ConvertToFloat(display.textContent);
    if(previousNumber)
    if(valor != 0 && valor != Infinity && valor == valor && valor != null)
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
    if(operator == '')
    {
        var display = document.getElementById('display-text');
        firstNumber = ConvertToFloat(display.textContent);
        previousNumber = true;
    }
    operator = button;
    console.log('firstNumber ' + firstNumber + ' ' + operator);
    HighLight(operator);
}

function Equals()
{
    if(operator != ''){
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
        display.textContent = ResultDisplay(result);
        console.log('secondNumber ' + secondNumber + ' = result ' + result)
        operator = '';
        firstNumber = '';
        previousNumber = true;
        HighLight('');
    }
}

/*Auxiliary Functions*/

function ConvertToFloat(text)
{
    if(IsEmptyText(text)) return 0;
    if(text == 'BIG RESULT') return Infinity;
    if(text == 'INVALID OP') return NaN;
    return parseFloat(text.replace(',','.'));
}

function ResultDisplay(result)
{
    if(Math.abs(result) > 9999999999) return 'BIG RESULT';
    if(Math.abs(result) < 0.00000001 || result.toString().includes('e')) return '0';
    if(isNaN(result)) return 'INVALID OP';
    var length = 10 + (result < 0 ? 11 : 10);
    var partial = result.toString().replace('.',',').slice(0,length);
    while(HasUnusedDecimalDigits(partial))
    {
        partial = partial.slice(0,partial.length-1);
    } 
    return partial;
}

function IsEmptyText(text)
{
    if(text == '' || text == '0' || previousNumber) return true;
    return false;
}

function HasUnusedDecimalDigits(text)
{
    if(! text.includes(',')) return false;
    return text[text.length-1]==',' || text[text.length-1]=='0';
}

function HighLight(text)
{
    var divide = document.getElementById('td-divide');
    var multiply = document.getElementById('td-multiply');
    var minus = document.getElementById('td-minus');
    var plus = document.getElementById('td-plus');

    var colorHighLight = '#31CFB2';

    if(text=='divide')
        divide.style.backgroundColor = colorHighLight;
    else
        divide.style.backgroundColor = '#80E3D1';

    if(text=='multiply')
        multiply.style.backgroundColor = colorHighLight;
    else
        multiply.style.backgroundColor = '#80E3D1';

    if(text=='minus')
        minus.style.backgroundColor = colorHighLight;
    else
        minus.style.backgroundColor = '#80E3D1';

    if(text=='plus')
        plus.style.backgroundColor = colorHighLight;
    else
        plus.style.backgroundColor = '#80E3D1';
}