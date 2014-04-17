Feature: Edit todo

    @wip
    Scenario: Edit todo
        Given I am on the active todo page
        When I click on "First active item"
        And I type "Updated todo" into the edit todo field
        And I press enter
        Then I should see "Updated todo" in position #1
