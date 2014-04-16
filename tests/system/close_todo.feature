Feature: Close todo

    @wip
    Scenario: Close todo
        Given I am on the active todo page
        When I close todo "First active item"
        And I click on "Archived"
        Then I should see "First active item" in position #2