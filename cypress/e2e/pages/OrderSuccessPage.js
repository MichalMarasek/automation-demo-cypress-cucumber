const continueShoppingButton = 'span:contains("Continue Shopping")';

class OrderSuccessPage {
  static orderSuccessInfoIsDisplayed() {
    cy.get(continueShoppingButton).should("be.visible");
    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains(/^Your order # is: \d\d\d\d\d\d\d\d\d.$/).should("be.visible");
    cy.contains(
      "We'll email you an order confirmation with details and tracking info."
    ).should("be.visible");
  }
}
export default OrderSuccessPage;
