import { Before, Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../pages/HomePage";
import SignInPage from "../../pages/SignInPage";

Given("I open the Sign In page", () => {
  cy.visit("/");
  HomePage.openSignInPage();
});

When("I enter a valid email", () => {
  cy.fixture("userCredentials").then((userCredentials) => {
    SignInPage.enterEmail(userCredentials.validUser.email);
  });
});

When("I enter an invalid email", () => {
  cy.fixture("userCredentials").then((userCredentials) => {
    SignInPage.enterEmail(userCredentials.invalidUser.email);
  });
});

And("I enter a valid password", () => {
  cy.fixture("userCredentials").then((userCredentials) => {
    SignInPage.enterPassword(userCredentials.validUser.password);
  });
});

And("I enter an invalid password", () => {
  cy.fixture("userCredentials").then((userCredentials) => {
    SignInPage.enterPassword(userCredentials.invalidUser.password);
  });
});

And("I click on the Sign In button", () => {
  cy.get("#send2").should("be.visible").click();
});

Then("I should see an invalid email error message", () => {
  cy.get("#email-error")
    .should("be.visible")
    .and(
      "have.text",
      "Please enter a valid email address (Ex: johndoe@domain.com)."
    );
  cy.contains("a", "Sign In").should("be.visible");
});

Then("I should see an invalid credentials error message", () => {
  cy.get('[data-ui-id="message-error"]')
    .contains(
      "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
    )
    .should("be.visible");
  cy.contains("a", "Sign In").should("be.visible");
});

Then("I should be logged in", () => {
  cy.fixture("userCredentials").then((userCredentials) => {
    cy.contains(
      "span",
      "Welcome, " +
        userCredentials.validUser.firstName +
        " " +
        userCredentials.validUser.lastName +
        "!"
    ).should("be.visible");

    cy.get('button[data-action="customer-menu-toggle"]')
      .eq(0)
      .should("be.visible")
      .click();
    cy.contains("a", "Sign Out").should("be.visible").click();

    cy.contains("You are signed out").should("be.visible");
    cy.contains(
      "You have signed out and will go to our homepage in 5 seconds."
    ).should("be.visible");
  });
});
