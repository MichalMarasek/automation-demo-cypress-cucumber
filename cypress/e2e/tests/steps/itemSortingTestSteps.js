import {
  Before,
  Given,
  When,
  Then,
  And,
} from "cypress-cucumber-preprocessor/steps";
import ItemsPage from "../../pages/ItemsPage";

And("I set sorting type {string}", (sortType) => {
  ItemsPage.setSortingTypeTo(sortType);
});

And("I set sorting direction to {string}", (sortDirection) => {
  ItemsPage.setSortingDirectionTo(sortDirection);
});

Then(
  "Items are sorted by {string} in {string} order",
  (sortType, sortDirection) => {

    ItemsPage.checkIfItemsAreSorted(sortType, sortDirection);

  }
);
