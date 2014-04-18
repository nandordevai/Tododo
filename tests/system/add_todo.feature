Feature: Add todo

	@fixture_empty
	Scenario: Empty todo
		Given I am on the active todo page
		When I type "" into the new todo field
		And I press enter
		Then I should see "No tasks. Hurray!" on the page

	Scenario: Todo with text
		Given I am on the active todo page
		When I type "New todo" into the new todo field
		And I press enter
		Then I should see "New todo" in position #3

	Scenario: Todo with tags
		Given I am on the active todo page
		When I type "New todo with #tag" into the new todo field
		And I press enter
		Then I should see "New todo with tag" in position #3
		And I should see a link with text "tag"

	@wip
	Scenario: Todo with due date
		# A dátummezőbe csak mai nap + jövőbeli dátumok írhatóak.
		# Az aktuális tennivalók listában a "Deadline" oszlopban megjelenik az érték és tudunk a két féle rendezés között változtatni. 
		Given I am on the active todo page
		When I type "New todo tomorrow" into the new todo field
		And I press enter
		Then I should see "New todo" in position #3
		And I should see due date "Tomorrow 12:00" in position #3
