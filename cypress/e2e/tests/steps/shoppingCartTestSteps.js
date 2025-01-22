import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../pages/HomePage";
import ItemsPage from "../../pages/ItemsPage";
import CartWidgetPage from "../../pages/CartWidgetPage";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

beforeEach(() => {
  // disable Cypress's default behavior of logging all XMLHttpRequests and fetches
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});

Given(
  "I open the {string} items page {string} category",
  (itemsCategory, category) => {
    cy.visit("/");
    HomePage.openItemsPage(itemsCategory);
    ItemsPage.openCategory(category);
  }
);

And(
  "I add the item number {int} from list to the shopping cart",
  (itemNumber) => {
    ItemsPage.addItemFromListToCart(itemNumber - 1);
  }
);

Then("I expect {int} items in cart", (numberOfItemsInCart) => {
  CartWidgetPage.checkAmountOfItemsInCartWidget(numberOfItemsInCart);
});

And("I open the cart widget", () => {
  CartWidgetPage.openCartWidget();
});

Then(
  "I edit the quantity of the item no {int} to {int}",
  (itemNumber, newQuantity) => {
    CartWidgetPage.editQuantityOfItemInCartWidget(itemNumber - 1, newQuantity);
  }
);

And("I delete the item no {int} from the cart", (itemNumber) => {
  CartWidgetPage.deleteItemNoFromTheCartWidget(itemNumber - 1);
});

And("I checkout from cart widget", () => {
  CartWidgetPage.goToCheckoutFromCartWidget();
});
