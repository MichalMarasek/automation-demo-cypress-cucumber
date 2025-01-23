Feature: Shop items sorting tests

  Scenario: Sorting items by price in ascending order
    Given I open the "Men" items page "Tops" category
    And I set sorting type "Price"
    And I set sorting direction to "Descending"
    Then Items are sorted by "Price" in "Descending" order
