export function getCountOfNumericalDigits(text)
{
    return text.length - (text.includes(',') ? 1 : 0 ) - (text[0] == '-' ? 1 : 0);
}

export function convertToFloat(text)
{
    if(text == '') return 0;
    if(text == 'ERROR') return NaN;
    return parseFloat(text.replace(',','.'));
}

export function getCountOfIntDigits(number, maxDigits)
{
    var text1 = number.toFixed(maxDigits - 1);
    var countIntegerDigits1 = text1.indexOf('.') - (text1[0]=='-' ? 1 : 0);
    var text2 = number.toFixed(maxDigits - countIntegerDigits1);
    return text2.indexOf('.') - (text2[0]=='-' ? 1 : 0);
}

export function correctDecimalDigits(text, maxDigits)
{
    var partial = text.replace('.',',');
    while(isDecimalPartEmpty(partial))
        partial = partial.slice(0,partial.length-1);
    return partial;
}

function isDecimalPartEmpty(text)
{
    if(!text.includes(',')) return false;
    return text[text.length-1]==',' || text[text.length-1]=='0';
}

export function getOperationResult(num1, num2, operation)
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