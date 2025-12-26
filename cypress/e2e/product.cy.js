const roles = ["admin", "manager", "supervisor", "worker"];

roles.forEach((role) => {
  describe(`Product Page - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-product"]').contains("Product").click();
    });

    it(`left-aside Product - ${role}`, () => {
      cy.url().should("contain", "products"); // verify
      cy.get(".card-title").contains("Product Inventory Overview"); // verify
    });

    it(`Check visiblity of edit button - ${role}`, () => {
      cy.get("#bn-edit").should("exist"); // verify
    });

    if (role === "worker") {
      it(`Check visiblity of delete button - ${role}`, () => {
        cy.get("#bn-delete").should("not.exist"); // verify
      });
    } else {
      it(`Check visiblity of delete button - ${role}`, () => {
        cy.get("#bn-delete").should("exist"); // verify
      });
    }
  });

  describe(`product <a> tags - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-product"]').contains("Product").click();
    });

    it(`product-links <a> exist - ${role}`, () => {
      cy.contains("Home").should("have.attr", "href", "/products"); // verify
      cy.contains("Add Product").should("have.attr", "href", "/add-product"); // verify
    });

    it(`check Home <a> tag - ${role}`, () => {
      cy.contains("Home").click();
      cy.url().should("contain", "products"); // verify
      cy.get(".card-title").contains("Product Inventory Overview"); // verify
    });

    it(`check Add Product <a> tag - ${role}`, () => {
      cy.contains("Add Product").click();
      cy.url().should("contain", "add-product"); // verify
      cy.get(".pm-title").contains("Add Product Details"); // verify
    });
  });

  describe(`product-pagination - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.intercept("GET", "/api/products").as("getProducts");
      cy.get('[data-testid="left-aside-product"]').click();
      cy.wait("@getProducts");
    });

    it(`product-pagination exist - ${role}`, () => {
      cy.paginationExist();
    });

    it(`product-pagination struture - ${role}`, () => {
      cy.paginationStrutureCheck();
    });

    it(`product-pagination run-pagenumber - ${role}`, () => {
      cy.paginationRunPageNumber();
    });

    it(`product-pagination run-nextbutton - ${role}`, () => {
      cy.paginationRunNextButton();
    });
  });

  describe(`Add Product Form - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-product"]').click();
      cy.contains("Add Product").click();
      cy.contains("Add Product Details").should("exist");
    });

    it(`submit New Product - ${role}`, () => {
      cy.fixture("/product/productDetails.json").then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          cy.get(`input[name="${key}"]`).type(String(value));
        });
      });
      cy.get(`input[type="file"]`).attachFile("/product/productImage.png");
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Product image is missing!").should("exist"); // verify
    });

    it(`submit Product Form Without Image - ${role}`, () => {
      cy.fixture("/product/productDetails.json").then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          cy.get(`input[name="${key}"]`).type(String(value));
        });
      });
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Product image is missing!").should("exist"); // verify
    });

    it(`product Form Fail Test - ${role}`, () => {
      cy.fixture("/product/productDetails.json").then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          cy.get(`input[name="${key}"]`).type(String(value));
          cy.get('[data-testid="bn-submit"]').click(); // submit
          cy.contains("Please fill the form correctly").should("exist"); // verify
        });
      });
      cy.get(`input[name="productName"]`).clear();
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    //
    it(`empty Product Submit - ${role}`, () => {
      cy.get('[data-testid="bn-submit"]').click(); // submit
      cy.contains("Please fill the form correctly").should("exist"); // verify
    });

    it(`return From Product Form - ${role}`, () => {
      cy.get('[data-testid="bn-cancel"]').click();
      cy.url().should("contain", "products"); // verify
      cy.get(".card-title").contains("Product Inventory Overview"); // verify
    });
  });

  describe(`Edit product - ${role}`, () => {
    beforeEach(() => {
      cy.Login(role);
      cy.get('[data-testid="left-aside-product"]').contains("Product").click();
    });

    it(`Edit product - ${role}`, () => {
      cy.intercept("GET", "/api/products/*").as("getProductForEdit");
      cy.get('[data-testid="edit-product-Product Name-1"]').click();
      cy.wait("@getProductForEdit").then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.contains("Update Product Details").should("exist"); // verify
      cy.get(`input[name="productName"]`).clear();
      cy.get(`input[name="productName"]`).type("Product After Edit");
      cy.get('[data-testid="bn-submit"]').click();
      cy.contains("Product After Edit updated succussfully").should("exist"); // verify
    });
  });

  if (role != "worker") {
    describe(`Delete product - ${role}`, () => {
      beforeEach(() => {
        cy.Login(role);
        cy.get('[data-testid="left-aside-product"]')
          .contains("Product")
          .click();
      });

      it(`Delete product - ${role}`, () => {
        cy.get('[data-testid="delete-product-Product After Edit-1"]').click();
        cy.contains("Deleted succussfully").should("exist"); // verify
      });
    });
  }
});
