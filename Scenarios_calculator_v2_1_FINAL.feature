Feature: Calculator

Background: 
    Given a user opens the app
    
Scenario: Default display screen
Then in the display screen should be show a 0

Scenario Outline: Clicking non-operators screen buttons
Given in the display screen the number <numberOnScreen> is shown
When the user press the <Button> button
Then in the display screen should be show a <resultDisplay>

Examples:
|numberOnScreen|Button| resultDisplay |
|             1|   0  |            10 |
|             0|   1  |             1 |
|             0|   2  |             2 |
|             0|   3  |             3 |
|             0|   4  |             4 |
|             0|   5  |             5 |
|             0|   6  |             6 |
|             0|   7  |             7 |
|             0|   8  |             8 |
|             0|   9  |             9 |
|             0|   ,  |            0, |
|             1|   C  |             0 |
|             1| +/-  |           -1  |

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

Scenario Outline: Pressing non-operators keys
Given in the display screen the number <numberOnScreen> is shown
When the user press the <Key> key
Then in the display screen should be show a <Button>

Examples:
|numberOnScreen|Key   | resultDisplay |
|             1|   0  |            10 |
|             0|   1  |             1 |
|             0|   2  |             2 |
|             0|   3  |             3 |
|             0|   4  |             4 |
|             0|   5  |             5 |
|             0|   6  |             6 |
|             0|   7  |             7 |
|             0|   8  |             8 |
|             0|   9  |             9 |
|             0|   ,  |            0, |
|             1|  ESC |             0 |
|            -1|  Alt |             1 |
|             1|  Alt |            -1 |

Scenario Outline: Pressing operators keys
When the user press the <Key> key
Then the <Key> button should be highlighted

Examples:
|Key   |
|   +  |
|   -  |
|   /  |
|   *  |

Scenario Outline: Writing numbers 
Given in the display screen the number <numberOnScreen> is shown
When the user press the number <Button>
Then in the display screen should be show a <resultDisplay>

Examples:
|numberOnScreen|Button|resultDisplay| 
|             0|   0  |            0| 
|             7|   0  |           70|
|             0|   1  |            1|
|           123|   4  |         1234|
|          1234|   8  |        12348|
|             0| ,    |           0,|
|          1234| ,    |        1234,|
|         1234,| 1    |       1234,1|
|        1234,1| ,    |       1234,1|
|             0| +/-  |           0 |
|             7| +/-  |          -7 |
|          1234| +/-  |        -1234|
|         -1234| +/-  |         1234|

Scenario Outline: Writing more than 10 digits
Given in the display screen the number <numberOnScreen> is shown
When the user presses <Action>
Then in the display screen should be shown <resultDisplay>

Examples:
|numberOnScreen| Action |resultDisplay|
|    1234567890|    7   |   1234567890|
|    1234567890|   +/-  |  -1234567890|
|    1234567890|    ,   |   1234567890|
|     123456789|    ,   |   123456789,|
|    123456789,|    5   |  123456789,5|
|   123456789,5|   +/-  | -123456789,5|

Scenario Outline: Disabling buttons
Given in the display screen the <numberOnScreen> is shown
Then the numerical buttons and the comma button are disabled

Examples:
|numberOnScreen|
|    1234567890|
|   -1234567890|
|   123456789,5|
|  -123456789,5|

Scenario: Disabling the second comma
Given in the display screen the number 3,141592 is shown
Then the comma button is disabled

Scenario: Disabling because of error
Given in the display screen an ERROR is displayed
Then all buttons except the C button are disabled

Scenario Outline: Reenabling buttons with no error
Given there are unabled buttons
And no ERROR on the display screen
When I click on the button <button>
Then all buttons are enabled again

Examples:
|button|
|   C  |
|   +  |
|   -  |
|   *  |
|   /  |
|   =  |

Scenario: Reenabling buttons with error
Given there are unabled buttons
And there is an ERROR on the display screen
When I click on the button C
Then all buttons are enabled again

Scenario Outline: Performing two number operations
Given in the display screen the number <numberOnScreen> is shown
When the user press the <operator>
And the user writes the number: <secondNumber>
And the user press the =                              
Then in the display screen should be show a <resultDisplay>

Examples:
|numberOnScreen|operator |secondNumber|resultDisplay|
|            24|    +    |           6|           30|
|          24,2|    +    |         6,4|         30,6|
|         13,14|    +    |       2,781|       15,921|
|            10|    +    |          -5|            5|
|           -20|    +    |          10|          -10|
|            24|    -    |           6|           18|
|             6|    -    |          24|          -18|
|             6|    -    |         -24|           30|
|          24,2|    -    |         6,4|         17,8|
|         13,14|    -    |       2,781|       10,359|
|            10|    *    |           8|           80|
|           5,2|    *    |           8|         41,6|
|         36,25|    *    |       7,496|       271,73|
|            10|    *    |          -8|          -80|
|           -10|    *    |          -8|           80|
|           -10|    *    |           8|          -80|
|            10|    /    |           2|            5|
|            84|    /    |         4,3|   19,5348837|
|         23,58|    /    |       10,14|   2,32544379|
|            10|    /    |          -2|           -5|
|           -10|    /    |           2|           -5|
|           -10|    /    |          -2|            5|

Scenario Outline: Performing two number operations with a result number with more than 10 digits
Given in the display screen the number 9999999999 is shown
When the user press <operator>
And the user writes the number: <secondNumber>
And the user press = 
Then in the display screen should be show ERROR

|numberOnScreen|operator |secondNumber|
|     999999999|    +    |           1|
|            -1|    -    |  -999999999|
|     999999999|    *    |           2|
|     999999999|    /    |         0,1|

Scenario Outline: Clicking two different operation buttons
Given in the display screen the number <firstNumber> is shown
When the user presses <Button>
And the user presses <Button2>
And the user writes the number <secondNumber>
When the user presses the =  
Then the display screen shows <resultDisplay>

|firstNumber|Button|Button2|secondNumber|resultDisplay|
|         12|   +  |   /   |           6|            2|
|       1234|   -  |   +   |          31|         1265|
|       9,26|   *  |   *   |       2,15 |       19,909|

Scenario Outline: Doing a new operation
Given in the display screen the number <firstNumber> is shown
When the user presses <Button>
And the user writes the number <secondNumber>
And the user presses the =
And the operation result <resultDisplay> is shown
When the user writes the number <thirdNumber>
Then the display screen shows <thirdNumber>

|firstNumber|Button|secondNumber|resultDisplay|thirdNumber|
|       12,2|   +  |           6|         18,2|         13|
| 1234567890|   +  |           1|   1234567891|        -24|

Scenario Outline: Using the previous result in a new operation
Given in the display screen the number <firstNumber> is shown
When the user presses <Button>
And the user writes the number <secondNumber>
And the user presses the =
And the operation result <resultDisplay> is shown
And the user presses <Button2>
And the user writes the number <thirdNumber>
And the user presses the =
Then the display screen shows <resultDisplay2>

|firstNumber|Button|secondNumber|resultDisplay|Button2|thirdNumber|resultDisplay2|
|       12,2|   +  |           6|         18,2|   +   |         13|          31,2|
|        123|   -  |       -24,8|        147,8|   *   |         12|        1773,6|
| 1234567890|   /  |        -2,5|   -493827156|   -   |        147|    -493827303|

Scenario: Division with 0
Given in the display screen the number 23 is shown
And the user press /
And the user writes the number: 0
When the user press the =  
Then in the display screen should be show ERROR

Scenario Outline: Doing an operation without a second number
Given in the display screen the number 23 is shown
And the user press +
And the user press the = 
Then in the display screen should be show ERROR