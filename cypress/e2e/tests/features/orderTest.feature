Feature: Orders test

  Scenario: Place an order with one item
    Given I open the "Men" items page "Tops" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    And I open the cart widget
    And I checkout from cart widget
    Then Shipping form should be displayed
    And I fill the shipping form with valid data and choose "Flat Rate"
    And I proceed to review and payment
    Then Data of valid user is displayed with method "Flat Rate - Fixed"
    And I place an order

  Scenario: Place an order with two items
    Given I open the "Men" items page "Tops" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    And I add the item number 2 from list to the shopping cart
    Then I expect 2 items in cart
    And I open the cart widget
    And I checkout from cart widget
    Then Shipping form should be displayed
    And I fill the shipping form with valid data and choose "Flat Rate"
    And I proceed to review and payment
    Then Data of valid user is displayed with method "Flat Rate - Fixed"
    And I place an order
