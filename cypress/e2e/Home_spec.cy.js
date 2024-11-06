// Import fungsi generateRandomString dari helper.js
import {
  generateRandomString
} from '../support/helper';


describe('Pengujian Halaman Utama', () => {
  //Sebelum setiap tes, kunjungi halaman utama 
  beforeEach(function () {
    cy.fixture('productData').then((data) => {
      this.productData = data;
    });
    cy.visit('/');
  });

  it('TC-01: Validasi Halaman Utama', () => {
    //Validasi bahwa URL benar
    cy.url().should('eq', 'https://automationteststore.com/');
    //Periksa apakah logo muncul
    cy.get('.logo > img').should('be.visible');
    //cek apakah elemen search bar ada 
    cy.get('#filter_keyword').should('be.visible');
    //cek apakah elemen kategori ada
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=43"]').should('be.visible');
    //cek apakah navbar atas tampil 
    cy.get('#topnav > .form-control').should('be.visible');

  })


  it('TC-02: Pencarian Produk', function () {
    //Memasukkan kata kunci dan lakukan pencarian
    cy.get('#filter_keyword').type(this.productData.validProduct.name);
    cy.get('.button-in-search > .fa').click();

    // Verifikasi bahwa tidak ada pesan "Produk tidak ditemukan"
    cy.contains('There is no product').should('not.exist');

    // Memeriksa apakah produk yang dicari muncul di hasil pencarian
    cy.contains(this.productData.validProduct.name).should('be.visible');

    // Verifikasi harga produk juga muncul di hasil pencarian
    cy.contains(this.productData.validProduct.price).should('be.visible');

  })

  it('TC-03: Pencarian Produk Tidak ditemukan', () => {
    //Memasukkan kata kunci dan lakukan pencarian
    const randomSearchTerm = generateRandomString(6);
    cy.log('Kata kunci acak: ' + randomSearchTerm); // Log untuk debugging

    cy.get('#filter_keyword').type(randomSearchTerm);
    cy.get('.button-in-search > .fa').click();

    // Validasi hasil pencarian
    cy.url().should('include', 'search');
    cy.contains('There is no product').should('be.visible');

  })

  // Test Case 4: Menambahkan produk valid ke keranjang
  it('Menambahkan produk valid ke keranjang', function () {
    // Mengklik tombol untuk menambahkan produk valid ke keranjang
    cy.get(`a[data-id="${this.productData.validProduct.productId}"]`).click();

    // Memeriksa apakah produk berhasil ditambahkan
    cy.get('ul.topcart li.dropdown.hover').trigger('mouseover');
    cy.contains(this.productData.validProduct.name).should('be.visible');
    cy.contains(this.productData.validProduct.price).should('be.visible');
  })

  // Test Case 5: Menambahkan produk valid ke keranjang 2
  it('Menambahkan produk valid ke keranjang 2', function () {
    // Mengklik tombol untuk menambahkan produk valid ke keranjang
    const cartPage = new CartPage();
    cartPage.addProductToCart('a[data-id="52"]'); // Menambahkan produk berdasarkan selector

    // Memeriksa apakah produk berhasil ditambahkan
    cy.get('ul.topcart li.dropdown.hover').trigger('mouseover');
    cy.contains(this.productData.validProduct.name).should('be.visible');
    cy.contains(this.productData.validProduct.price).should('be.visible');
  })

})