const itemsList = 'div[class="product-item-info"]';
const itemSizeList = 'div[class="swatch-attribute-options clearfix"] div';
const itemColorList = 'div[class="swatch-option color"]';
const itemName = 'a[class="product-item-link"]';

class ItemsPage {
  static openCategory(category) {
    cy.get('li[class="item"] > a:contains("' + category + '")')
      .should("be.visible")
      .click();
  }

  static addItemFromListToCart(itemNumber) {
    cy.intercept("GET", "**/swatches/ajax/media/*").as("getMedia");
    cy.intercept("GET", "**/customer/section/load/*").as("customerSection");

    let choosenItemName;
    cy.get(itemsList)
      .eq(itemNumber)
      .should("be.visible")
      .then(($el) => {
        cy.wrap($el).find(itemSizeList).eq(0).should("be.visible").click();
        cy.wrap($el).find(itemColorList).eq(0).should("be.visible").click();

        cy.wrap($el)
          .find(itemName)
          .then(($itemName) => {
            choosenItemName = $itemName.text().trim();
          });
        cy.wait("@getMedia");
        cy.wrap($el).find("form").submit();
      });

    cy.wait("@customerSection");

    cy.then(() => {
      cy.contains(
        "You added " + choosenItemName + " to your shopping cart."
      ).should("be.visible");
    });
  }
}
export default ItemsPage;
