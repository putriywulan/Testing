import LoginPage from '../support/pageObjects/loginPage';
import CartPage from '../support/pageObjects/cartPage';
import CheckoutPage from '../support/pageObjects/checkoutPage';

describe('Automasi Proses Checkout dengan POM', () => {
  const loginPage = new LoginPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  before(() => {
    // Kunjungi halaman login dan login dengan valid credentials
    cy.visit('/index.php?rt=account/login');
    loginPage.login('naomi', '12345');
  });

  it('Menambahkan produk ke keranjang dan memproses checkout', () => {
    // Tambah produk ke keranjang
    cy.visit('/');
    cy.get('a[data-id="52"]').click(); 

    // Validasi produk di keranjang
    cartPage.validateProductInCart('Benefit Bella Bamba', '2', '$56.00');

    // Proses checkout
    cartPage.checkoutButton().click();
    checkoutPage.validateCheckoutPage();
    checkoutPage.processOrder();
  });
});
