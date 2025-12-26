const role = "admin";

describe(`Cleanup Delete product - ${role}`, () => {
  beforeEach(() => {
    cy.Login(role);
    cy.get('[data-testid="left-aside-product"]').contains("Product").click();
  });

  it(`Cleanup Delete product - ${role}`, () => {
    cy.get('[data-testid="delete-product-Product After Edit-1"]').click();
    cy.contains("Deleted succussfully").should("exist"); // verify
  });
});

describe(`Cleanup Delete Employee Details - ${role}`, () => {
  beforeEach(() => {
    cy.Login(role);
    cy.get('[data-testid="left-aside-employee"]').contains("Employee").click();
  });

  it(`added by manager`, () => {
    cy.get(`[data-testid="delete-employee-manager"]`).click();
    cy.contains("Deleted succussfully").should("exist"); // verify
  });
});
