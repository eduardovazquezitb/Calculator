Feature: Calculator

Background: 
    Given a user opens the app
    
Scenario: Default display screen
Then the display should show the following value: "0"

Scenario Outline: Clicking non-operators screen buttons
Given in the display screen the number <numberOnScreen> is shown
When the user press the "<Button>" button
Then in the display screen should be show a "<resultDisplay>"

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