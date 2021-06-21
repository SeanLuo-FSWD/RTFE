/// <reference types="cypress" />

context("Login spec", () => {
    beforeEach(() => {
    //   cy.visit("/");
    Cypress.env('baseUrl');
    });

    it("goes to sign in page", () => {
        cy.contains("h2", "Login page");
    })
});
