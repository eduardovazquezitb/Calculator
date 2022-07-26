import {getDisplayText, setDisplayText, getButtonElement, setCellBackgroundColor, setButtonStatusStyle, callButtonOnClick} from './domCalls.js';

export function updateButtonStatus()
{
    
}

function setButtonsAvailability(isAvailable, ...params) 
{
    for(let i =0; i<params.length; i++){
        var button = getButtonElement(params[i]);
        if(! ( button.disabled ^ isAvailable) ){
            setButtonStatusStyle(params[i], isAvailable);
            button.disabled = !isAvailable;
        }
    }
}