describe('Automasi Proses Checkout', () => {

  before(function() {
    cy.fixture('checkoutData').then((data) => {
      this.data = data;
    });
  });

  // Fungsi untuk login
  const login = (username, password) => {
    cy.visit('/index.php?rt=account/login');
    cy.get('input[name="loginname"]').type(username); 
    cy.get('input[name="password"]').type(password); 
    cy.get('button[title="Login"]').click(); 
  };

  // Fungsi untuk menambah produk ke keranjang
  const addProductToCart = (productId) => {
    cy.visit('/');
    cy.get(`a[data-id="${productId}"]`).click(); 
  };

  // Fungsi untuk validasi halaman
  const validatePage = (pageTitle) => {
    cy.get('h1').should('contain.text', pageTitle);
  };

  // Test Case: Menambahkan Produk ke Keranjang dan Checkout
  it('Menambahkan produk ke keranjang dan checkout', function() {
    login(this.data.user.username, this.data.user.password);
    addProductToCart(this.data.product.id);

    // Buka keranjang dan cek produk
    cy.get('ul.topcart li.dropdown.hover').trigger('mouseover');
    cy.contains(this.data.product.name).should('be.visible');
    cy.get('td.quantity').should('contain.text', this.data.product.quantity); 
    cy.get('.totals tr:nth-child(2) td:nth-child(2)').should('contain.text', this.data.product.totalPrice); 

    // Lanjut ke checkout
    cy.get('a[title="Checkout"]').click();
    validatePage('Checkout');

    // Proses checkout
    cy.get('#checkout_btn').click();
    validatePage('Your Order Has Been Processed!');

    // Ambil Order ID dari pesan konfirmasi
    cy.get('div.contentpanel p').contains('Your order').then(($orderMessage) => {
      const orderIDText = $orderMessage.text();
      const orderIDMatch = orderIDText.match(/#(\d+)/);
      if (orderIDMatch) {
        const orderID = orderIDMatch[1];
        cy.wrap(orderID).as('orderID'); 
      } else {
        throw new Error('Order ID tidak ditemukan dalam pesan konfirmasi');
      }
    });

    // Verifikasi riwayat pesanan
    cy.visit('/index.php?rt=account/history');
    validatePage('Order History');
    cy.get('@orderID').then((orderID) => {
      cy.get('div.container-fluid')
        .contains(`Order ID: #${orderID}`)
        .should('exist'); 
    });
  });

});
