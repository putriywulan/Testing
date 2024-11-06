class CartPage {
  cartIcon() {
    return cy.get('ul.topcart li.dropdown.hover');
  }

  productInCart(productName) {
    return cy.contains(productName);
  }

  quantity() {
    return cy.get('td.quantity');
  }

  checkoutButton() {
    return cy.get('a[title="Checkout"]');
  }

  // Method untuk memvalidasi produk di keranjang
  validateProductInCart(productName, quantity, totalPrice) {
    this.cartIcon().trigger('mouseover');
    this.productInCart(productName).should('be.visible');
    this.quantity().should('contain.text', quantity);
    cy.get('.totals tr:nth-child(2) td:nth-child(2)').should('contain.text', totalPrice);
  }
  
  addProductToCart(productSelector) {
    cy.get(productSelector).click(); // Klik produk berdasarkan selector
  }
}

export default CartPage;
