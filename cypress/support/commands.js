// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const roleCredentials = {
  admin: {
    email: cy.env("adminUser"),
    password: cy.env("adminPass"),
    displayName: "Admin",
    displayPosition: "Admin",
  },
  manager: {
    email: cy.env("managerUser"),
    password: cy.env("managerPass"),
    displayName: "Lavish",
    displayPosition: "Manager",
  },
  supervisor: {
    email: cy.env("superviorUser"),
    password: cy.env("superviorPass"),
    displayName: "Khan",
    displayPosition: "Supervisor",
  },
  worker: {
    email: cy.env("workerUser"),
    password: cy.env("workerPass"),
    displayName: "Worker",
    displayPosition: "Worker",
  },
};

Cypress.Commands.add("Login", (role) => {
  const filteredRole = roleCredentials[role];

  cy.visit("/");
  cy.url().should("contains", "3001");
  cy.title().should("eq", "Warehouse");
  cy.visit("/login");
  cy.url().should("contains", "login"); // verify
  cy.get("#loginEmail").type(filteredRole.email);
  cy.get("#loginPassword").type(filteredRole.password);
  cy.get("#loginButton").click();
  cy.contains(filteredRole.displayName).should("exist");
  cy.contains(filteredRole.displayPosition).should("exist");
  cy.contains("Welcome, happy to have you here").should("exist");
});

Cypress.Commands.add("paginationExist", () => {
  cy.get(".card-footer").then(($page) => {
    if ($page.find('[data-testid^="pagination-page"]').length > 0) {
      cy.get('[data-testid="pagination-bar"]').should("exist"); // verify
    }
  });
});

Cypress.Commands.add("paginationStrutureCheck", () => {
  cy.get(".card-footer").then(($page) => {
    if ($page.find('[data-testid^="pagination-page"]').length > 0) {
      cy.contains("Previous").should("exist"); // verify
      cy.contains("First").should("exist"); // verify
      cy.contains("Last").should("exist"); // verify
      cy.contains("Next").should("exist"); // verify
    }
  });
});

Cypress.Commands.add("paginationRunPageNumber", () => {
  cy.get(".card-footer").then(($page) => {
    if ($page.find('[data-testid^="pagination-page"]').length > 0) {
      cy.get('[data-testid^="pagination-page"]')
        .its("length")
        .then((count) => {
          cy.log(`Total pages: ${count}`);
          // You can loop based on count if needed
          for (let i = 1; i <= count; i++) {
            cy.get(`[data-testid="pagination-page${i}"]`)
              .should("exist")
              .click();
          }
        });
    }
  });
});

Cypress.Commands.add("paginationRunNextButton", () => {
  cy.get(".card-footer").then(($page) => {
    if ($page.find('[data-testid^="pagination-page"]').length > 0) {
      cy.get('[data-testid^="pagination-page"]')
        .its("length")
        .then((count) => {
          cy.log(`Total pages: ${count}`);
          // You can loop based on count if needed
          for (let i = 1; i <= count; i++) {
            cy.contains("Next").should("exist").click();
          }
        });
    }
  });
});
