import { Before, Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import ShippingPage from "../../pages/ShippingPage";
import ReviewAndPaymentsPage from "../../pages/ReviewAndPaymentsPage";
import OrderSuccessPage from "../../pages/OrderSuccessPage";

Then("Shipping form should be displayed", () => {
  ShippingPage.shippingFormDisplayed();
});

And(
  "I fill the shipping form with valid data and choose {string}",
  (shippingMethod) => {
    cy.fixture("userCredentials").then((userCredentials) => {
      ShippingPage.shippingFormFillOut(
        userCredentials.validUser,
        shippingMethod
      );
    });
  }
);

And("I proceed to review and payment", () => {
  ShippingPage.proceedToReviewAndPayment();
});

Then(
  "Data of valid user is displayed with method {string}",
  (shippingMethod) => {
    cy.fixture("userCredentials").then((userCredentials) => {
      ReviewAndPaymentsPage.checkDisplayedUserDataAndShippingMethod(
        userCredentials.validUser,
        shippingMethod
      );
    });
  }
);

And("I place an order", () => {
  ReviewAndPaymentsPage.placeAnOrder();
  OrderSuccessPage.orderSuccessInfoIsDisplayed();
});
