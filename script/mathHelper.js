export function getCountOfNumericalDigits(text)
{
    var result = text.length;
    if(text.includes(',')) result--;
    if(text[0] == '-') result--;
    return result;
}

export function convertToFloat(text)
{
    if(text == '') return 0;
    if(text == 'ERROR') return NaN;
    return parseFloat(text.replace(',','.'));
}

export function getApproximationToMaxDigits(number, maxDigits)                  // Case number = 99.999, maxDigits = 4
{
    var firstApproximation = number.toFixed(maxDigits-1);                       //  "99.999" -> Le sobra un dígito
    var countIntegerDigits1 = getCountOfIntegerDigits(firstApproximation);      // 2
    if(countIntegerDigits1 > maxDigits) return firstApproximation;
    var secondApproximation = number.toFixed(maxDigits-countIntegerDigits1);    // "100.00"  -> Le sobra un dígito
    var countIntegerDigits2 = getCountOfIntegerDigits(secondApproximation);     // 3
    if(countIntegerDigits2 > maxDigits) return secondApproximation;
    var thirdApproximation = number.toFixed(maxDigits - countIntegerDigits2);   // "100.0" OK
    return thirdApproximation;
}

export function getCountOfIntegerDigits(text)
{
    var result = text.indexOf('.');
    if(result == -1)
        result = text.length;
    if(text[0] == '-')
        result--;
    return result;
}

export function removeZerosFromRight(text)
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