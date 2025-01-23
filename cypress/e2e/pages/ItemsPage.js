const itemsList = 'div[class="product-item-info"]';
const itemSizeList = 'div[class="swatch-attribute-options clearfix"] div';
const itemColorList = 'div[class="swatch-option color"]';
const itemName = 'a[class="product-item-link"]';
const sortTypeSelect = "#sorter";
const sortDirectionArrow = ".toolbar-sorter > .action.sorter-action:visible";
const itemPrice = 'span[class="price"]';

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

  static setSortingTypeTo(sortType) {
    cy.intercept("GET", "**product_list_order*").as("getSorted");
    cy.intercept("GET", "**/checkout/captcha*").as("allGetLoaded");

    cy.wait("@allGetLoaded");
    cy.get(sortTypeSelect).select(sortType.toLowerCase());

    cy.wait("@getSorted");

    cy.get(sortTypeSelect)
      .find("option:selected")
      .invoke("val")
      .then((val) => {
        expect(val.toLowerCase()).to.equals(sortType.toLowerCase());
      });
  }

  static setSortingDirectionTo(sortDirection) {
    cy.intercept("GET", "**/men/tops-men.html?product_list_order=price").as(
      "getSorted"
    );
    cy.intercept("GET", "**/checkout/captcha*").as("allGetLoaded");

    cy.get(sortDirectionArrow)
      .invoke("attr", "class")
      .then((classes) => {
        if (classes === "action sorter-action sort-asc") {
          if (sortDirection === "Descending") {
            cy.get(sortDirectionArrow).click().click();
            // cy.get(sortDirectionArrow).click();
          }
        } else if (classes === "action sorter-action sort-desc") {
          if (sortDirection === "Ascending") {
            cy.get(sortDirectionArrow).click().click();
          }
        }
      });

    cy.wait("@allGetLoaded");
    // cy.wait("@getSorted");
  }

  static checkIfItemsAreSorted(sortType, sortDirection) {
    // cy.get(itemsList)
    // .eq(itemNumber)
    // .should("be.visible")
    // .then(($el) => {
    //   cy.wrap($el).find(itemSizeList).eq(0).should("be.visible").click();
    //   cy.wrap($el).find(itemColorList).eq(0).should("be.visible").click();

    //   cy.wrap($el)
    //     .find(itemName)
    //     .then(($itemName) => {
    //       choosenItemName = $itemName.text().trim();
    //     });
    //   cy.wait("@getMedia");
    //   cy.wrap($el).find("form").submit();
    // });

    // cy.get(itemsList).each(($el) => {
    //   cy.wrap($el)
    //     .find(itemPrice)
    //     .then(($itemPrice) => {
    //       cy.log(parseFloat($itemPrice.text().trim().substring(1)));
    //       let price = parseFloat($itemPrice.text().trim().substring(1));
    //       originalPricesArray.push(price);
    //     });
    // });

    // cy.log("Oryginalna tablica");
    // cy.log(originalPricesArray.toString());

    //////////////////////////

    //Collect the items then print
    let originalPricesArray = [];
    let sortedPricesArray = [];
    cy.get(".item.product.product-item  .price")
      .each(($price) =>
        originalPricesArray.push(parseFloat($price.text().substring(1)))
      )
      .then(() => {
        // cy.log(originalPricesArray.join(", "));
        sortedPricesArray = originalPricesArray.slice();
        // cy.log(sortedPricesArray.sort().join(", "));
        // cy.log(sortedPricesArray.sort().reverse().join(", "));

        if (sortDirection === "Ascending") {
          cy.log("Ascending");
          cy.log("ORIGINAL");
          cy.log(originalPricesArray.join(", "));
          cy.log("SORTED");
          cy.log(sortedPricesArray.sort().join(", "));
          cy.wrap(originalPricesArray.join(", ")).should("equal", sortedPricesArray.sort().join(", "));

        } else if (sortDirection === "Descending") {
          cy.log("Descending");
          cy.log("ORIGINAL");
          cy.log(originalPricesArray.join(", "));
          cy.log("SORTED");
          cy.log(sortedPricesArray.sort().reverse().join(", "));
          cy.wrap(originalPricesArray.join(", ")).should("equal", sortedPricesArray.sort().reverse().join(", "));
        }
      });
  }
}
export default ItemsPage;
