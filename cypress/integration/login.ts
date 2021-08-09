/// <reference types="cypress" />

context("Login spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("goes to sign in page", () => {
    cy.title().should("eq", "Login Page");
  });

  it("fails when given non-existent email", () => {
    cy.get('input[name="email"]').type("bad@bob.com");
    cy.get('input[name="password"]').type("bob@bob.com");
    cy.get("[data-cy=LoginPg_submit]").click();
    cy.location("pathname").should("eq", "/error");
    cy.get("[data-cy=ErrorPg_errMsg]").contains(
      "Wrong credentials, please try again"
    );
  });

  it("fails when given bad password", () => {
    cy.get('input[name="email"]').type("bob@bob.com");
    cy.get('input[name="password"]').type("bad@bob.com");
    cy.get("[data-cy=LoginPg_submit]").click();
    cy.location("pathname").should("eq", "/error");
    cy.get("[data-cy=ErrorPg_errMsg]").contains(
      "Wrong credentials, please try again"
    );
  });

  it("succeed when given good password", () => {
    cy.get('input[name="email"]').type("bob@bob.com");
    cy.get('input[name="password"]').type("bob@bob.com");
    cy.get("[data-cy=LoginPg_submit]").click();
    cy.location("pathname").should("eq", "/");
    cy.title().should("eq", "Feed Page");
  });
});
