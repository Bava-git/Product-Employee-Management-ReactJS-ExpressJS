const roles = ["admin", "manager"];

roles.forEach((role) => {
  describe(`Employee Page - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-employee"]')
        .contains("Employee")
        .click();
    });

    it(`left-aside Employees - ${role}`, () => {
      cy.url().should("contain", "employees"); // verify
      cy.get(".card-title").contains("Employees"); // verify
    });

    if (role === "admin") {
      it(`Check visiblity of edit button - ${role}`, () => {
        cy.get("#bn-edit").should("exist"); // verify
      });

      it(`Check visiblity of delete button - ${role}`, () => {
        cy.get("#bn-delete").should("exist"); // verify
      });
    }

    it(`Employees-links <a> exist - ${role}`, () => {
      cy.contains("Home").should("exist"); // verify
    });
    it(`Employees-links <a> exist - ${role}`, () => {
      cy.contains("New Recruit").should("exist"); // verify
    });
  });

  describe(`Employee <a> tags - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-employee"]')
        .contains("Employee")
        .click();
    });

    it(`employee-links <a> exist - ${role}`, () => {
      cy.contains("Home").should("have.attr", "href", "/employees"); // verify
      cy.contains("New Recruit").should("have.attr", "href", "/add-employee"); // verify
    });

    it(`check Home <a> tag - ${role}`, () => {
      cy.contains("Home").click();
      cy.url().should("contain", "employees"); // verify
      cy.get(".card-title").contains("Employees"); // verify
    });

    it(`check New Recruit <a> tag - ${role}`, () => {
      cy.contains("New Recruit").click();
      cy.url().should("contain", "add-employee"); // verify
      cy.get(".pm-title").contains("Add Recruitment"); // verify
    });
  });

  describe(`Employees-pagination - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.intercept("GET", "/api/employees/by/*").as("getEmployees");
      cy.get('[data-testid="left-aside-employee"]')
        .contains("Employee")
        .click();
      cy.wait("@getEmployees");
    });

    it(`employee-pagination exist - ${role}`, () => {
      cy.paginationExist();
    });

    it(`employee-pagination struture - ${role}`, () => {
      cy.paginationStrutureCheck();
    });

    it(`employee-pagination run-pagenumber - ${role}`, () => {
      cy.paginationRunPageNumber();
    });

    it(`employee-pagination run-nextbutton - ${role}`, () => {
      cy.paginationRunNextButton();
    });
  });

  describe(`Employee Form Cancel - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-employee"]')
        .contains("Employee")
        .click();
      cy.contains("New Recruit").click();
      cy.contains("Add Recruitment").should("exist");
    });

    it(`should cancel form and return to employees page - ${role}`, () => {
      cy.get('[data-testid="bn-cancel"]').click();
      cy.url().should("contain", "employees"); // verify
      cy.get(".card-title").contains("Employees"); // verify
    });
  });

  describe(`Add Employee Form - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-employee"]')
        .contains("Employee")
        .click();
      cy.contains("New Recruit").click();
      cy.contains("Add Recruitment").should("exist");
    });

    it(`Add employee - ${role}`, () => {
      cy.get('input[name="employeeName"]').clear().type(role);
      cy.get('input[name="employeeDOB"]').clear().type("2025-01-01");
      cy.get('select[name="employeeGender"]').select("Male");
      cy.get('select[name="employeeMarriage"]').select("Marriage");
      cy.get('input[name="employeeEmailid"]').clear().type(`${role}@gmail.com`);
      cy.get('input[name="employeePhonenum"]').clear().type("8888888888");
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get('select[name="employeePosition"]').select("Supervisor");
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get(`input[type="file"]`).attachFile(
        "cypress/fixtures/employee/employee.jpg"
      );
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("New Employee details succussfully uploaded!").should(
        "exist"
      ); // verify
    });
  });

  describe(`Employee Form Fail Test - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-employee"]')
        .contains("Employee")
        .click();
      cy.contains("New Recruit").click();
      cy.contains("Add Recruitment").should("exist");
    });

    it(`Submit without data - ${role}`, () => {
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only name - ${role}`, () => {
      cy.get('input[name="employeeName"]').clear().type(role);
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only date - ${role}`, () => {
      cy.get('input[name="employeeDOB"]').clear().type("2025-06-26");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only gender - ${role}`, () => {
      cy.get('select[name="employeeGender"]').select("Male");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only marriage - ${role}`, () => {
      cy.get('select[name="employeeMarriage"]').select("Marriage");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only email - ${role}`, () => {
      cy.get('input[name="employeeEmailid"]').clear().type(`${role}@gmail.com`);
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only phone number - ${role}`, () => {
      cy.get('input[name="employeePhonenum"]').clear().type("8888888888");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only department - ${role}`, () => {
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Submit only position - ${role}`, () => {
      cy.get('select[name="employeePosition"]').select("Supervisor");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`Check duplicate email - ${role}`, () => {
      cy.get('input[name="employeeName"]').clear().type("admin Test Employee2");
      cy.get('input[name="employeeDOB"]').clear().type("2025-01-01");
      cy.get('select[name="employeeGender"]').select("Male");
      cy.get('select[name="employeeMarriage"]').select("Marriage");
      cy.get('input[name="employeeEmailid"]').clear().type(`${role}@gmail.com`);
      cy.get('input[name="employeePhonenum"]').clear().type("8888888888");
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get('select[name="employeePosition"]').select("Supervisor");
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Email id already used, Please check and update").should(
        "exist"
      ); // verify
    });

    it(`Submit without image - ${role}`, () => {
      cy.get('input[name="employeeName"]').clear().type(role);
      cy.get('input[name="employeeDOB"]').clear().type("2025-01-01");
      cy.get('select[name="employeeGender"]').select("Male");
      cy.get('select[name="employeeMarriage"]').select("Marriage");
      cy.get('input[name="employeeEmailid"]')
        .clear()
        .type("withoutimage@gmail.com");
      cy.get('input[name="employeePhonenum"]').clear().type("8888888888");
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get('select[name="employeePosition"]').select("Supervisor");
      cy.get('select[name="employeeDepartment"]').select("Management");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Product image is missing!").should("exist"); // verify
    });
  });

  if (role === "admin") {
    describe(`Edit Employee Details - ${role}`, () => {
      beforeEach(() => {
        cy.Login(role);
        cy.get('[data-testid="left-aside-employee"]')
          .contains("Employee")
          .click();
      });

      it(`edit employee name - ${role}`, () => {
        cy.intercept("GET", "/api/employees/*").as("getEmployee");
        cy.get(`[data-testid="edit-employee-${role}"]`).click();
        cy.wait("@getEmployee").then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('input[name="employeeName"]')
          .clear()
          .type(`${role} changed name`);
        cy.get('[data-testid="bn-submit"]').click(); // submit
        cy.contains(
          `${role} changed name details updated succussfully!`
        ).should("exist"); // verify
      });
    });

    describe(`Delete Employee Details - ${role}`, () => {
      beforeEach(() => {
        cy.Login(role);
        cy.get('[data-testid="left-aside-employee"]')
          .contains("Employee")
          .click();
      });

      it(`delete an emmployee - ${role}`, () => {
        cy.get(`[data-testid="delete-employee-${role} changed name"]`).click();
        cy.contains("Deleted succussfully").should("exist"); // verify
      });
    });
  }
});

describe("Employee Page - supervisor", () => {
  beforeEach(() => {
    cy.Login("supervisor");
    cy.get('[data-testid="left-aside-employee"]').contains("Employee").click();
  });

  it("left-aside Employees - supervisor", () => {
    cy.url().should("contain", "employees"); // verify
    cy.get(".card-title").contains("Employees"); // verify
  });

  it("Check visiblity of Action column - supervisor", () => {
    cy.contains("Action").should("not.exist"); // verify
  });

  it("Check visiblity of edit button - supervisor", () => {
    cy.get("#bn-edit").should("not.exist"); // verify
  });

  it("Check visiblity of delete button - supervisor", () => {
    cy.get("#bn-delete").should("not.exist"); // verify
  });

  it("Employees-links <a> exist - supervisor", () => {
    cy.contains("Home").should("not.exist"); // verify
  });
  it("Employees-links <a> exist - supervisor", () => {
    cy.contains("New Recruit").should("not.exist"); // verify
  });
});

describe("Employees-pagination - supervisor", () => {
  beforeEach(() => {
    cy.Login("supervisor");
    cy.intercept("GET", "/api/employees/by/*").as("getEmployees");
    cy.get('[data-testid="left-aside-employee"]').contains("Employee").click();
    cy.wait("@getEmployees");
  });

  it("employee-pagination exist - supervisor", () => {
    cy.paginationExist();
  });

  it("employee-pagination struture - supervisor", () => {
    cy.paginationStrutureCheck();
  });

  it("employee-pagination run-pagenumber - supervisor", () => {
    cy.paginationRunPageNumber();
  });

  it("employee-pagination run-nextbutton - supervisor", () => {
    cy.paginationRunNextButton();
  });
});
