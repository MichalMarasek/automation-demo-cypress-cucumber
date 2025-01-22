const signInButton = "";

class HomePage {
  static openSignInPage() {
    cy.contains("a", "Sign In").should("be.visible").click();
  }

  static openItemsPage(itemsCategory) {
    cy.contains("span", itemsCategory).should("be.visible").click();
    cy.get('li[class="item"] > a:contains("Tops")').should("be.visible");
  }
}
export default HomePage;
