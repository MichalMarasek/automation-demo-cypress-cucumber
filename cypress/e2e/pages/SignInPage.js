const emailInput = "#email";
const passwordInput = "#pass";

class SignInPage {
  static enterEmail(email) {
    cy.get(emailInput)
      .should("be.visible")
      .type(email)
      .should("have.value", email);
  }

  static enterPassword(password) {
    cy.get(passwordInput)
      .should("be.visible")
      .type(password)
      .should("have.value", password);
  }
}
export default SignInPage;
