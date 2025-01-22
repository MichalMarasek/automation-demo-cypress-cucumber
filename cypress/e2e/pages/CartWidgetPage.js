const cartWidgetItemInputsList = 'input[class="item-qty cart-item-qty"]';
const topsCategory = 'li[class="item"] > a:contains("Tops")';
const itemsList = 'div[class="product-item-info"]';
const cartItemsCounter = 'span[class="counter-number"]';
const cartWidgetButton = 'a[class="action showcart"]';
const cartWidgetCheckoutButton = "#top-cart-btn-checkout";
const cartWidgetItemDeleteButtonList = 'a[class="action delete"]';
const cartWidgetUpdateButtonList = 'button[class="update-cart-item"]';

const cartWidgetDeleteItemModalConfirmButton =
  'div[class="modal-inner-wrap"] button[class="action-primary action-accept"]';

class CartWidgetPage {
  static checkAmountOfItemsInCartWidget(amountOfItemsInCart) {
    if (amountOfItemsInCart == 0) {
      cy.contains("You have no items in your shopping cart.").should(
        "be.visible"
      );
    } else {
      cy.get(cartItemsCounter)
        .should("be.visible")
        .should("have.text", amountOfItemsInCart);
    }
  }

  static openCartWidget() {
    cy.get(cartWidgetButton).should("be.visible").click();

    cy.get(cartWidgetCheckoutButton).should("be.visible");
  }

  static editQuantityOfItemInCartWidget(itemNumber, newQuantity) {
    cy.intercept("POST", "**/checkout/sidebar/updateItemQty/").as(
      "updateItemQty"
    );
    cy.intercept("GET", "**/customer/section/load/*").as("customerSectionLoad");

    cy.get(cartWidgetItemInputsList)
      .eq(itemNumber)
      .should("be.visible")
      .clear()
      .type(newQuantity)
      .should("have.value", newQuantity);

    cy.get(cartWidgetUpdateButtonList)
      .eq(itemNumber)
      .should("be.visible")
      .click();

    cy.wait("@updateItemQty");
    cy.wait("@customerSectionLoad");

    cy.get(cartWidgetItemInputsList)
      .eq(itemNumber)
      .should("be.visible")
      .should("have.value", newQuantity);
  }

  static deleteItemNoFromTheCartWidget(itemNumber) {
    cy.intercept("POST", "**/checkout/sidebar/removeItem/").as("removeItem");
    cy.intercept("GET", "**/customer/section/load/*").as("customerSectionLoad");

    cy.get(cartWidgetItemDeleteButtonList)
      .eq(itemNumber)
      .should("be.visible")
      .click();

    cy.contains(
      "Are you sure you would like to remove this item from the shopping cart?"
    ).should("be.visible");

    cy.get(cartWidgetDeleteItemModalConfirmButton).should("be.visible").click();

    cy.wait("@removeItem");
    cy.wait("@customerSectionLoad");
  }

  static goToCheckoutFromCartWidget() {
    cy.get(cartWidgetCheckoutButton).should("be.visible").wait(500).click();
  }
}
export default CartWidgetPage;
