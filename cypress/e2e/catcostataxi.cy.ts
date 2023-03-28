import { cities } from "./catcostataxi"

describe("Add Routes to CatCostaTaxi", () => {
  it("should navigate to the website and fill in form", () => {
    cities.forEach((city) => {
      city.fromArray.forEach((from) => {
        city.toArray.forEach((to) => {
          cy.visit("http://test.mydomain.com:3000/")
          cy.wait(100)

          // Check that "De la" input field is not disabled
          cy.get("input.input-base:nth-child(1)").should("not.be.disabled")
          cy.wait(100)

          // Fill in "De la" input field and wait for autocomplete options
          cy.get("input.input-base:nth-child(1)").click().type(from)
          cy.wait(100)

          // Wait for modal to appear
          cy.get("li:nth-child(1)", { timeout: 10000 }).should("be.visible")
          cy.wait(100)

          // Select the first option from autocomplete
          cy.get("li:nth-child(1)").click()
          cy.wait(100)

          // Check that "Pana la" input field is not disabled
          cy.get("input.input-base:nth-child(2)").should("not.be.disabled")
          cy.wait(100)

          // Fill in "Pana la" input field and wait for autocomplete options
          cy.get("input.input-base:nth-child(2)").click().type(to)
          cy.wait(100)

          // Wait for modal to appear
          cy.get("li:nth-child(1)", { timeout: 10000 }).should("be.visible")
          cy.wait(100)

          // Select the first option from autocomplete
          cy.get("li:nth-child(1)").click()
          cy.wait(100)

          // Click "Calculează estimat" button
          cy.get(".button-primary").click()
          cy.wait(100)

          // Wait for page to load
          cy.url({ timeout: 10000 }).should("include", "/directions/")
          cy.wait(100)
        })
      })
    })
  })
})
