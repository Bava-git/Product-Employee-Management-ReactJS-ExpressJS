const roles = ["admin", "manager", "supervisor", "worker"];

roles.forEach((role) => {
  describe("Login With Correct Credentials", () => {
    it(`credentials of ${role}`, () => {
      cy.once("uncaught:exception", () => false);
      cy.Login(role);
      cy.get('[data-testid="user-icon"]').click();
      cy.contains("Log Out").should("be.visible").click({ force: true });
      cy.url().should("contains", "login");
      cy.contains("Employee Log in").should("exist");
    });
  });
});

describe("Login Fail Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("contains", "3001");
    cy.title().should("eq", "Warehouse");
    cy.get('[data-testid="navbar-login"]').click();
    cy.url().should("contains", "login");
  });

  it("login without credentials", () => {
    cy.once("uncaught:exception", () => false);
    cy.get("#loginButton").click();
    cy.contains("Invalid username or password").should("exist");
  });

  it("login without email", () => {
    cy.once("uncaught:exception", () => false);
    cy.get("#loginPassword").type("password");
    cy.get("#loginButton").click();
    cy.contains("Invalid username or password").should("exist");
  });

  it("login without password", () => {
    cy.once("uncaught:exception", () => false);
    cy.get("#loginEmail").type("email");
    cy.get("#loginButton").click();
    cy.contains("Invalid username or password").should("exist");
  });

  it("login with wrong credentials", () => {
    cy.once("uncaught:exception", () => false);
    cy.get("#loginEmail").type("email");
    cy.get("#loginPassword").type("password");
    cy.get("#loginButton").click();
    cy.contains("Invalid username or password").should("exist");
  });
});
