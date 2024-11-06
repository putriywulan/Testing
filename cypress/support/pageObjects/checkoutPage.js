class CheckoutPage {
  checkoutBtn() {
    return cy.get('#checkout_btn');
  }

  validateCheckoutPage() {
    cy.get('h1').should('contain.text', 'Checkout');
  }

  processOrder() {
    this.checkoutBtn().click();
    cy.get('h1').should('contain.text', 'Your Order Has Been Processed!');
  }
}

export default CheckoutPage;
