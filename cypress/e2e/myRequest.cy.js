const roles = ["manager", "supervisor", "worker"];

roles.forEach((role) => {
  describe(`My Request Page - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="user-icon"]').click();
      cy.contains("My Request").should("be.visible").click({ force: true });
    });

    it(`My Request Page - ${role}`, () => {
      cy.url().should("contain", "my-request"); // verify
      cy.get(".card-title").contains("My Request Status"); // verify
    });

    it(`My Request Page button exist - ${role}`, () => {
      cy.contains("New").should("exist"); // verify
      cy.contains("History").should("exist"); // verify
    });

    it(`click New and cancel to come back - ${role}`, () => {
      cy.contains("New").click();
      cy.contains("New Request").should("exist"); // verify
      cy.get('[data-testid="bn-cancel"]').click();
      cy.get(".card-title").contains("My Request Status"); // verify
    });

    it(`click History and cancel to come back - ${role}`, () => {
      cy.contains("History").click();
      cy.contains("History").should("exist"); // verify
      cy.contains("Pending").click();
      cy.get(".card-title").contains("My Request Status"); // verify
    });
  });

  describe(`My Request pagination - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.intercept("GET", "/api/requests/*", {
        fixture: "request/myRequest.json",
      }).as("getMyRequest");
      cy.get('[data-testid="user-icon"]').click();
      cy.contains("My Request").should("be.visible").click({ force: true });
    });

    it(`request-pagination exist - ${role}`, () => {
      cy.wait("@getMyRequest");
      cy.paginationExist();
    });

    it(`request-pagination struture - ${role}`, () => {
      cy.wait("@getMyRequest");
      cy.paginationStrutureCheck();
    });

    it(`request-pagination run-pagenumber - ${role}`, () => {
      cy.wait("@getMyRequest");
      cy.paginationRunPageNumber();
    });

    it(`request-pagination run-nextbutton - ${role}`, () => {
      cy.wait("@getMyRequest");
      cy.paginationRunNextButton();
    });
  });

  describe(`My Request status display - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.intercept("GET", "/api/requests/*", {
        fixture: "request/myRequest.json",
      }).as("getMyRequest");
      cy.get('[data-testid="user-icon"]').click();
      cy.contains("My Request").should("be.visible").click({ force: true });
      cy.wait("@getMyRequest");
    });

    it(`My Request pending-page - ${role}`, () => {
      cy.contains("Pending").should("exist"); //verify
      cy.contains("Cancel").should("exist"); //verify
    });

    it(`My Request processed-page - ${role}`, () => {
      cy.contains("History").click();
      cy.contains("Approved").should("exist"); //verify
      cy.contains("Rejected").should("exist"); //verify
    });
  });

  describe(`submit New Requests - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="user-icon"]').click();
      cy.contains("My Request").should("be.visible").click({ force: true });
      cy.contains("New").click();
      cy.contains("New Request").should("exist"); //verify
      cy.intercept("POST", "/api/requests/add", {
        statusCode: 200,
      }).as("createRequest");
    });

    it(`submit new sick leave request - ${role}`, () => {
      cy.get(".form-select").select("Sick Leave");
      cy.get('[data-testid="newrequest-title"]').should("not.exist");
      cy.get(`input[name="requestFromDate"]`).type("2025-12-25");
      cy.get(`input[name="requestEndDate"]`).type("2025-12-25");
      cy.get(`textarea[name="requestDescription"]`).type(
        "Sick Leave Description"
      );
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Requested succussfully").should("exist"); //verify
      cy.wait("@createRequest"); // stop mock overload
    });

    it(`submit new vacation request - ${role}`, () => {
      cy.get(".form-select").select("Vacation");
      cy.get('[data-testid="newrequest-title"]').should("not.exist");
      cy.get(`input[name="requestFromDate"]`).type("2026-01-01");
      cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
      cy.get(`textarea[name="requestDescription"]`).type(
        "Vacation Description"
      );
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Requested succussfully").should("exist"); //verify
      cy.wait("@createRequest"); // stop mock overload
    });

    it(`submit new general request with date - ${role}`, () => {
      cy.get('[data-testid="newrequest-title"]').type("Geneal 1");
      cy.get(`input[name="requestFromDate"]`).type("2026-01-01");
      cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
      cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Requested succussfully").should("exist"); //verify
      cy.wait("@createRequest"); // stop mock overload
    });

    it(`submit new general request without FROM date - ${role}`, () => {
      cy.get('[data-testid="newrequest-title"]').type("Geneal 4");
      cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
      cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Requested succussfully").should("exist"); //verify
      cy.wait("@createRequest"); // stop mock overload
    });

    it(`submit new general request without END date - ${role}`, () => {
      cy.get('[data-testid="newrequest-title"]').type("Geneal 5");
      cy.get(`input[name="requestFromDate"]`).type("2026-12-31");
      cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Requested succussfully").should("exist"); //verify
      cy.wait("@createRequest"); // stop mock overload
    });
  });

  describe(`Request Form Fail Test - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="user-icon"]').click();
      cy.contains("My Request").should("be.visible").click({ force: true });
      cy.contains("New").click();
      cy.contains("New Request").should("exist"); //verify
    });

    it(`submit without data - ${role}`, () => {
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
    });

    it(`submit new sick leave request fail test - ${role}`, () => {
      cy.get(".form-select").select("Sick Leave");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
      cy.get('[data-testid="newrequest-title"]').should("not.exist");
      cy.get(`input[name="requestFromDate"]`).type("2025-12-25");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
      cy.get(`input[name="requestEndDate"]`).type("2025-12-25");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
      cy.get(`textarea[name="requestDescription"]`).type(
        "Sick Leave Description"
      );
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
    });

    it(`submit new vacation request fail test - ${role}`, () => {
      cy.get(".form-select").select("Vacation");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
      cy.get('[data-testid="newrequest-title"]').should("not.exist");
      cy.get(`input[name="requestFromDate"]`).type("2026-01-01");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
      cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
      cy.get(`textarea[name="requestDescription"]`).type(
        "Vacation Description"
      );
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Requested succussfully").should("exist"); //verify
    });

    it(`submit new general request without title - ${role}`, () => {
      cy.get(`input[name="requestFromDate"]`).type("2026-12-31");
      cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
      cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
    });

    it(`submit new general request without description - ${role}`, () => {
      cy.get('[data-testid="newrequest-title"]').type("Geneal 3");
      cy.get(`input[name="requestFromDate"]`).type("2026-12-31");
      cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Please fill the form correctly").should("exist"); //verify
    });
  });
});
