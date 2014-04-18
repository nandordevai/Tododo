Feature: Close todo

    Scenario: Close todo
        Given I am on the active todo page
        When I close todo "First active item"
        And I click on link "Closed"
        Then I should see "First active item" in position #1