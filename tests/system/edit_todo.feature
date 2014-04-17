Feature: Edit todo

    @wip
    Scenario: Edit todo
        Given I am on the active todo page
        When I click on "First active item"
        And I type " updated" into the edit todo field
        And I press enter
        Then I should see "First active item updated" in position #1
