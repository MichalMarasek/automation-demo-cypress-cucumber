Feature: Shopping cart tests

  Scenario: Add items to shopping cart
    Given I open the "Men" items page "Tops" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    And I add the item number 2 from list to the shopping cart
    Then I expect 2 items in cart

  Scenario: Add items to shopping cart and edit quantity
    Given I open the "Women" items page "Tops" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    And I open the cart widget
    And I edit the quantity of the item no 1 to 2
    Then I expect 2 items in cart

  Scenario: Add and delete items from shopping cart
    Given I open the "Men" items page "Bottoms" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    And I add the item number 2 from list to the shopping cart
    Then I expect 2 items in cart
    And I open the cart widget
    And I edit the quantity of the item no 2 to 2
    Then I expect 3 items in cart
    And I delete the item no 2 from the cart
    Then I expect 1 items in cart

  Scenario: Add and delete all items from the shopping cart
    Given I open the "Men" items page "Jackets" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    And I add the item number 2 from list to the shopping cart
    Then I expect 2 items in cart
    And I open the cart widget
    And I delete the item no 2 from the cart
    Then I expect 1 items in cart
    And I delete the item no 1 from the cart
    Then I expect 0 items in cart

  Scenario: Add items from different categories to shopping cart
    Given I open the "Men" items page "Tees" category
    And I add the item number 1 from list to the shopping cart
    Then I expect 1 items in cart
    Given I open the "Women" items page "Bottoms" category
    And I add the item number 2 from list to the shopping cart
    Then I expect 2 items in cart
