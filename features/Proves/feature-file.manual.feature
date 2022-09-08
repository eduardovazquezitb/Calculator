@manual
Feature: Calculator

Background: 
    Given a user opens the app
    
Scenario Outline: Clicking operators screen buttons
When the user press the <button> button
Then just the operator <button> button should be highlighted

Examples:
|button|
|   +  |
|   -  |
|   /  |
|   *  |

Scenario Outline: Unhighlighting operators screen buttons
When the user press the <button> button
Then all the operators buttons should be unhighlighted

Examples:
|button|
|   =  |
|   C  |

Scenario Outline: Pressing operators keys
When the user press the <Key> key
Then the <Key> button should be highlighted

Examples:
|Key   |
|   +  |
|   -  |
|   /  |
|   *  |