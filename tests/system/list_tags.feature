Feature: List tasks by tag

    Scenario: List tasks by tag
        Given I am on the active todo page
        When I type "New todo with #tag" into the new todo field
        And I press enter
        And I type "Another todo with #tag" into the new todo field
        And I press enter
        And I click on link "tag"
        Then I should see 2 tasks on the page
        And I should see "New todo with tag" in position #1
        And I should see "Another todo with tag" in position #2
        When I click on "New todo with tag"
        And I type " updated" into the edit todo field
        And I press enter
        Then I should see "New todo with tag updated" in position #1
        When I close todo "New todo with tag updated"
        And I click on link "Active"
        And I click on link "tag"
        Then I should see "Another todo with tag" in position #1
        