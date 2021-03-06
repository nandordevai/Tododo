Feature: List todos

	@fixture_empty
	Scenario: Empty list
		Given I am on the active todo page
		Then I should see "No tasks. Hurray!" on the page

	Scenario: List tasks
		Given I am on the active todo page
		Then I should see "First active item" in position #1
		And I should see "Second active item" in position #2
		And I should not see "Closed item" in the list
