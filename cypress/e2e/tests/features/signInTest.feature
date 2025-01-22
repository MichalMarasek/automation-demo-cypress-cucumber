Feature: Sign In to App Tests

  Scenario: Invalid email with valid password
    Given I open the Sign In page
    When I enter an invalid email
    And I enter a valid password
    And I click on the Sign In button
    Then I should see an invalid email error message

  Scenario: Valid email with invalid password
    Given I open the Sign In page
    When I enter a valid email
    And I enter an invalid password
    And I click on the Sign In button
    Then I should see an invalid credentials error message

  Scenario: Valid email and valid password
    Given I open the Sign In page
    When I enter a valid email
    And I enter a valid password
    And I click on the Sign In button
    Then I should be logged in
