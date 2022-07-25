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