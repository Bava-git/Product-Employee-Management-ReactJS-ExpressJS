Cypress.Commands.add("submitEmptyRequest", () => {
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Please fill the form correctly").should("exist"); //verify
});

Cypress.Commands.add("submitNewSickLeaveRequest", () => {
  cy.get(".form-select").select("Sick Leave");
  cy.get('[data-testid="newrequest-title"]').should("not.exist");
  cy.get(`input[name="requestFromDate"]`).type("2025-12-25");
  cy.get(`input[name="requestEndDate"]`).type("2025-12-25");
  cy.get(`textarea[name="requestDescription"]`).type("Sick Leave Description");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Requested succussfully").should("exist"); //verify
});

Cypress.Commands.add("submitNewVacationRequest", () => {
  cy.get(".form-select").select("Vacation");
  cy.get('[data-testid="newrequest-title"]').should("not.exist");
  cy.get(`input[name="requestFromDate"]`).type("2026-01-01");
  cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
  cy.get(`textarea[name="requestDescription"]`).type("Vacation Description");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Requested succussfully").should("exist"); //verify
});

Cypress.Commands.add("submitNewGeneralRequest", () => {
  cy.get(".form-select").select("Vacation");
  cy.get('[data-testid="newrequest-title"]').should("not.exist");
  cy.get(`input[name="requestFromDate"]`).type("2026-01-01");
  cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
  cy.get(`textarea[name="requestDescription"]`).type("Vacation Description");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Requested succussfully").should("exist"); //verify
});

Cypress.Commands.add("submitNewGeneralReqWithoutFromDate", () => {
  cy.get('[data-testid="newrequest-title"]').type("Geneal 4");
  cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
  cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Requested succussfully").should("exist"); //verify
});

Cypress.Commands.add("submitNewGeneralReqWithoutToDate", () => {
  cy.get('[data-testid="newrequest-title"]').type("Geneal 5");
  cy.get(`input[name="requestFromDate"]`).type("2026-12-31");
  cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Requested succussfully").should("exist"); //verify
});

Cypress.Commands.add("failTestSickLeaveRequest", () => {
  cy.get(".form-select").select("Sick Leave");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
  cy.get('[data-testid="newrequest-title"]').should("not.exist");
  cy.get(`input[name="requestFromDate"]`).type("2025-12-25");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
  cy.get(`input[name="requestEndDate"]`).type("2025-12-25");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
  cy.get(`textarea[name="requestDescription"]`).type("Sick Leave Description");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
});

Cypress.Commands.add("failTestVacationRequest", () => {
  cy.get(".form-select").select("Vacation");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
  cy.get('[data-testid="newrequest-title"]').should("not.exist");
  cy.get(`input[name="requestFromDate"]`).type("2026-01-01");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
  cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Please fill the form correctly").should("exist"); //verify
  cy.get(`textarea[name="requestDescription"]`).type("Vacation Description");
  cy.get('[data-testid="bn-submit"]').click(); // submit
  cy.contains("Requested succussfully").should("exist"); //verify
});

Cypress.Commands.add("failTestGeneralReqWithoutTitle", () => {
  cy.get(`input[name="requestFromDate"]`).type("2026-12-31");
  cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
  cy.get(`textarea[name="requestDescription"]`).type("Geneal description");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Please fill the form correctly").should("exist"); //verify
});

Cypress.Commands.add("failTestGeneralReqWithoutDescription", () => {
  cy.get('[data-testid="newrequest-title"]').type("Geneal 3");
  cy.get(`input[name="requestFromDate"]`).type("2026-12-31");
  cy.get(`input[name="requestEndDate"]`).type("2026-12-31");
  cy.get('[data-testid="bn-submit"]').click();
  cy.contains("Please fill the form correctly").should("exist"); //verify
});
