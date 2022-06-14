var firstNumber;
var secondNumber;
var operator = "";

/*Number input methods*/

function Input(digit)
{
    var display = document.getElementById('display-text');
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
        case 10:
            break;
        default:
            display.textContent = display.textContent.concat(digit);
            break;
    }
}

function InputComma()
{
    var display = document.getElementById('display-text');
    if(display.textContent == '')
        display.textContent = '0,';
    else if(!display.textContent.includes(',') && display.textContent.length <= 8)
        display.textContent = display.textContent.concat(',');
}

function ButtonC()
{
    var display = document.getElementById('display-text');
    display.textContent = "";
}

/*Operators (divide, multiply, minus, plus)*/

function Operator(button)
{
    if(operator == '')
    {
        var display = document.getElementById('display-text');
        firstNumber = ConvertToFloat(display.textContent);
        display.textContent = '';
    }
    operator = button;
    console.log('firstNumber ' + firstNumber + ' ' + operator);
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
    }
}

/*Auxiliary Functions*/

function ConvertToFloat(text)
{
    if(text == '') return 0;
    if(text == 'BIG RESULT') return Infinity;
    if(text == 'INVALID OP') return NaN;
    return parseFloat(text.replace(',','.'));
}

function ResultDisplay(result)
{
    if(Math.abs(result) > 9999999999) return 'BIG RESULT';
    if(Math.abs(result) < 0.00000001 || result.toString().includes('e')) return '0';
    if(isNaN(result)) return 'INVALID OP';
    var partial = result.toString().replace('.',',').slice(0,10);
    if(partial.charAt(9)==',') partial = partial.slice(0,9);
    return partial;
}
