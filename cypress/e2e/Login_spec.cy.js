describe('Automasi Login Form', () => {
  //Sebelum setiap tes, kunjungi halaman utama 
  beforeEach(function(){
    // Load data dari file userData.json dan simpan dalam `this.userData`
    cy.fixture('userData').then((data) => {
      this.userData = data;
    });
    cy.visit('/index.php?rt=account/login');
  });

  // Test Case 1: Login berhasil dengan username dan password valid
  it('Login berhasil dengan valid credentials', function() {

    cy.get('input[name="loginname"]').type(this.userData.validUser.username); // Nama login valid
    cy.get('input[name="password"]').type(this.userData.validUser.password); // Password valid

    cy.get('button[title="Login"]').click(); // Klik tombol login

    // Verifikasi bahwa login berhasil (bisa dengan memeriksa URL, pesan, dll.)
    cy.url().should('include', 'index.php?rt=account/account'); // Contoh: Periksa URL setelah login
    cy.contains('div.menu_text', 'Welcome back naumi').should('be.visible'); // Pesan selamat datang atau elemen unik setelah login
  });

  // Test Case 2: Login gagal karena password salah
  it('Login gagal dengan password salah', function()  {

    cy.get('input[name="loginname"]').type(this.userData.invalidUser.username); // Nama login valid
    cy.get('input[name="password"]').type(this.userData.invalidUser.password); // Password salah

    cy.get('button[title="Login"]').click(); // Klik tombol login

    // Verifikasi bahwa login gagal dan pesan error muncul
    cy.contains('Error: Incorrect login or password provided.').should('be.visible'); // Contoh pesan error
    cy.url().should('include', '/login'); // Pastikan masih di halaman login
  });

  // Test Case 3: Login gagal karena nama login salah
  it('Login gagal dengan username yang salah', function() {

    cy.get('input[name="loginname"]').type(this.userData.invalidUser.username); // Nama login salah
    cy.get('input[name="password"]').type(this.userData.invalidUser.password); // Password valid

    cy.get('button[title="Login"]').click(); // Klik tombol login

    // Verifikasi bahwa login gagal dan pesan error muncul
    cy.contains('Error: Incorrect login or password provided.').should('be.visible'); // Contoh pesan error
    cy.url().should('include', '/login'); // Pastikan masih di halaman login
  });

});