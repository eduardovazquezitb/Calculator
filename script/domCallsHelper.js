export function getDisplayText()
{
    return document.getElementById('display-text').textContent;
}

export function setDisplayText(text)
{
    document.getElementById('display-text').textContent = text;
}

export function getButtonElement(text)
{
    return document.getElementById("button-" + text);
}

export function setCellBackgroundColor(text, color)
{
    document.getElementById('td-' + text).style.backgroundColor = color;
}

export function setButtonStatusStyle(buttonName, isAvailable)
{
    var button = getButtonElement(buttonName);
    if(isAvailable){
        button.classList.remove('not-working-button');
        button.classList.add('working-button');
    }
    else{
        button.classList.remove('working-button');
        button.classList.add('not-working-button');
    }
}

export function callButtonOnClick(buttonName)
{
    var button = getButtonElement(buttonName);
    button.click();
}

export function disableAllButtons()
{
    var buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}