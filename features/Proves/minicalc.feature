Feature: Calculator

Background: 
    Given the user opens the app
    
Scenario: Default display screen
Then the display shows "0"

Scenario Outline: Clicking non-operators screen buttons
Given the user writes <numberOnScreen>
When the user presses the "<Button>" button
Then the display shows "<resultDisplay>"

Examples:
|numberOnScreen|Button| resultDisplay |
|             1|   0  |            10 |
|             0| 1  |             1 |
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
|           173|   C  |             0 |
|             1| +-   |           -1  |

Scenario Outline: Pressing non-operators keys
Given the user writes <numberOnScreen>
When the user presses the <Key> key
Then the display shows "<resultDisplay>"

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
|            -1|  Left Ctrl |             1 |
|            -1| Right Ctrl |             1 |
|             1| Right Ctrl |            -1 |
|             1|  Left Ctrl |            -1 |

Scenario: Doing an operation with keyboard
Given the user presses the ESC key
And the user presses the 2 key
And the user presses the + key
And the user presses the 3 key
When the user presses the enter key
Then the display shows 5

@workinprogress
Scenario Outline: Writing numbers 
Given the user writes "<numberOnScreen>"
When the user presses the "<Button>" button
Then the display shows "<resultDisplay>"

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
|             0| +-   |            0|
|            0,| +-   |           0,|
|           13,| +-   |         -13,|
|          -13,| +-   |          13,|
|          -0,5| +-   |          0,5|
|           0,5| +-   |         -0,5|
|             7| +-   |           -7|
|          1234| +-   |        -1234|
|         -1234| +-   |         1234|