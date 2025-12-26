const roles = ["admin", "manager", "supervisor"];

roles.forEach((role) => {
  describe(`Employee Request Page - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-request"]')
        .contains("Employee Request")
        .click();
    });

    it(`left-aside Request - ${role}`, () => {
      cy.url().should("contain", "request"); // verify
      cy.get(".card-title").contains("New Employee Requests"); // verify
    });

    it(`Requests History button exist - ${role}`, () => {
      cy.contains("Requests History").should("exist").click();
      cy.contains("Employee Requests History").should("exist"); // verify
      cy.contains("New Requests").should("exist").click();
      cy.contains("New Employee Requests").should("exist"); // verify
    });
  });

  describe(`Employee Request pagination - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.intercept("GET", "/api/requests/by/*", {
        fixture: "request/request.json",
      }).as("getRequest");
      cy.get('[data-testid="left-aside-request"]')
        .contains("Employee Request")
        .click();
      cy.wait("@getRequest");
    });

    it(`request-pagination exist - ${role}`, () => {
      cy.paginationExist();
    });

    it(`request-pagination struture - ${role}`, () => {
      cy.paginationStrutureCheck();
    });

    it(`request-pagination run-pagenumber - ${role}`, () => {
      cy.paginationRunPageNumber();
    });

    it(`request-pagination run-nextbutton - ${role}`, () => {
      cy.paginationRunNextButton();
    });
  });

  describe(`Employee Request functions - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.intercept("GET", "/api/requests/by/*", {
        fixture: "request/request.json",
      }).as("getRequest");
      cy.get('[data-testid="left-aside-request"]')
        .contains("Employee Request")
        .click();
      cy.wait("@getRequest");
    });

    it(`Employee Request approved-button - ${role}`, () => {
      cy.contains("Approved").click();
      cy.contains("Processed successfully").should("exist"); //verify
    });

    it(`Employee Request reject-button - ${role}`, () => {
      cy.contains("Rejected").click();
      cy.contains("Processed successfully").should("exist"); //verify
    });
  });
});
