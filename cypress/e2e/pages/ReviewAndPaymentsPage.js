const billindAddressDetails = 'div[class="billing-address-details"]';
const shipToDetails =
  'div[class="ship-to"] div[class="shipping-information-content"]';
const shippingMethodDiv =
  'div[class="ship-via"] div[class="shipping-information-content"]';
const placeOrderButton = 'button[title="Place Order"]';
const cartSubtotalPrice = 'tr[class="totals sub"] span[class="price"]';
const cartShippingPrice =
  'tr[class="totals shipping excl"] span[class="price"]';
const cartTotalPrice = 'tr[class="grand totals"] span[class="price"]';

class ReviewAndPaymentsPage {
  static checkDisplayedUserDataAndShippingMethod(
    userCredentials,
    shippingMethod
  ) {
    cy.intercept("GET", "**/totals*").as("paymentApiCalculations");

    cy.wait("@paymentApiCalculations").then((interception) => {
      cy.get(cartSubtotalPrice)
        .should("be.visible")
        .contains(interception.response.body.subtotal);
      cy.get(cartShippingPrice)
        .should("be.visible")
        .contains(interception.response.body.shipping_amount);
      cy.get(cartTotalPrice)
        .should("be.visible")
        .contains(interception.response.body.grand_total);
    });

    cy.get(billindAddressDetails)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.contain(
          userCredentials.firstName,
          userCredentials.lastName,
          userCredentials.street,
          userCredentials.city,
          userCredentials.region,
          userCredentials.postcode,
          userCredentials.country,
          userCredentials.phone
        );
      });

    cy.get(shipToDetails)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.contain(
          userCredentials.firstName,
          userCredentials.lastName,
          userCredentials.street,
          userCredentials.city,
          userCredentials.region,
          userCredentials.postcode,
          userCredentials.country,
          userCredentials.phone
        );
      });

    cy.get(shippingMethodDiv)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.contain(shippingMethod);
      });
  }

  static placeAnOrder() {
    cy.get(placeOrderButton).should("be.visible").click();
  }
}
export default ReviewAndPaymentsPage;
// 