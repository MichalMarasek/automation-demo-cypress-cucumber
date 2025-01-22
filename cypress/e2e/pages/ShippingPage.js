const emailAddressInput = "#customer-email";
const firstNameInput = 'input[name="firstname"]';
const lastNameInput = 'input[name="lastname"]';
const streetInputLine1 = 'input[name="street[0]"]';
const cityInput = 'input[name="city"]';
const regionSelect = 'select[name="region_id"]';
const postcodeInput = 'input[name="postcode"]';
const countrySelect = 'select[name="country_id"]';
const phoneNumberInput = 'input[name="telephone"]';
const shippingMethodFlatRate = 'tr:contains("Flat Rate")';
const shippingMethodBestWay = 'tr:contains("Best Way")';
const nextButton = 'button[data-role="opc-continue"]';

class ShippingPage {
  static shippingFormDisplayed() {
    cy.get(emailAddressInput).should("be.visible");
    cy.get(firstNameInput).should("be.visible");
    cy.get(lastNameInput).should("be.visible");
    cy.get(streetInputLine1).should("be.visible");
    cy.get(cityInput).should("be.visible");
    cy.get(regionSelect).should("be.visible");
    cy.get(postcodeInput).should("be.visible");
    cy.get(countrySelect).should("be.visible");
    cy.get(phoneNumberInput).should("be.visible");

    cy.get(shippingMethodFlatRate).should("be.visible");
    cy.get(shippingMethodBestWay).should("be.visible");

    cy.get(nextButton).should("be.visible");
  }

  static shippingFormFillOut(userCredentials, shippingMethod) {
    cy.get(emailAddressInput)
      .type(userCredentials.email)
      .should("have.value", userCredentials.email);
    cy.get(firstNameInput)
      .type(userCredentials.firstName)
      .should("have.value", userCredentials.firstName);
    cy.get(lastNameInput)
      .type(userCredentials.lastName)
      .should("have.value", userCredentials.lastName);
    cy.get(streetInputLine1)
      .type(userCredentials.street)
      .should("have.value", userCredentials.street);
    cy.get(cityInput)
      .type(userCredentials.city)
      .should("have.value", userCredentials.city);
    cy.get(regionSelect)
      .select(userCredentials.region)
      .find("option:selected")
      .should("have.text", userCredentials.region);
    cy.get(postcodeInput)
      .type(userCredentials.postcode)
      .should("have.value", userCredentials.postcode);
    cy.get(countrySelect)
      .select(userCredentials.country)
      .find("option:selected")
      .should("have.text", userCredentials.country);
    cy.get(phoneNumberInput)
      .type(userCredentials.phone)
      .should("have.value", userCredentials.phone);

    if (shippingMethod === "Flat Rate") {
      cy.get(shippingMethodFlatRate)
        .click()
        .find('input[type="radio"]')
        .should("be.checked");
      cy.get(shippingMethodBestWay)
        .find('input[type="radio"]')
        .should("not.be.checked");
    } else if (shippingMethod === "Best Way") {
      cy.get(shippingMethodBestWay)
        .click()
        .find('input[type="radio"]')
        .should("be.checked");
      cy.get(shippingMethodFlatRate)
        .find('input[type="radio"]')
        .should("not.be.checked");
    }
  }

  static proceedToReviewAndPayment() {
    cy.get(nextButton).should("be.visible").click();
  }
}
export default ShippingPage;
