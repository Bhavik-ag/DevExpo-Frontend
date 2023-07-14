describe("<Login />", () => {
  beforeEach(() => {
    cy.visit("/user/login");
  });

  // To check if the page is loaded
  it("check if the page loaded", () => {
    cy.get("h2").contains("Sign in to your account");
    cy.get("form").should("exist");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  // To check if login works
  it("should login an existing user", () => {
    cy.get("input[name='email']").type("test");
    cy.get("input[name='password']").type("djangouser");
    cy.get("button[type='submit']").click();

    // Wait for response from server
    cy.wait(1000);
    cy.getCookie("access").should("exist");
    cy.getCookie("refresh").should("exist");
  });
});
