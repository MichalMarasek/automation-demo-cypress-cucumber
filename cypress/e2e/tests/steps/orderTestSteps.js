import {
  Before,
  Given,
  When,
  Then,
  And,
} from "cypress-cucumber-preprocessor/steps";
import ShippingPage from "../../pages/ShippingPage";
import ReviewAndPaymentsPage from "../../pages/ReviewAndPaymentsPage";
import OrderSuccessPage from "../../pages/OrderSuccessPage";

Then("Shipping form should be displayed with {int} item", (amountOfItems) => {
  ShippingPage.shippingFormDisplayed(amountOfItems);
});

And("I fill the shipping form with valid data", () => {
  cy.fixture("userCredentials").then((userCredentials) => {
    ShippingPage.shippingFormFillOut(userCredentials.validUser);
  });
});

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

And("I set shipping method to {string}", (shippingMethod) => {
  ShippingPage.setShippingMethod(shippingMethod);
});

Then(
  "Error is displayed and I cant proceed without choosing shipping method",
  () => {
    ShippingPage.shippingMethodIsMissing();
  }
);

Then("All required shipping details inputs errors are displayed", () => {
  ShippingPage.allRequiredInputsErrorsDisplayed();
});
