
describe('Pendaftaran Pengguna Baru', () => {
   //Sebelum setiap tes, kunjungi halaman utama 
  beforeEach(() => {
    cy.visit('/index.php?rt=account/login');
    // Memilih radio button untuk mendaftar
    cy.get('#accountFrm_accountregister').check(); // Memilih radio button
    // Verifikasi bahwa radio button sudah terpilih
    cy.get('#accountFrm_accountregister').should('be.checked'); // Memastikan radio button terpilih
    cy.get('#accountFrm > fieldset > .btn').click(); 
  });

   // Generate a UUID to ensure unique login name and email 
   const uuid = () => Cypress._.random(0, 1e6);  // Membuat angka acak besar
   const uniqueLoginName = `user${uuid()}`;  // Membuat nama unik seperti user123456
   const uniqueEmail = `test${uuid()}@example.com`;


  it('TC01: Harus berhasil mendaftar dengan informasi yang valid', () => {
  // Fill out Personal Details
  cy.get('input[name="firstname"]').type('susi');      // First Name
  cy.get('input[name="lastname"]').type('susanti');        // Last Name
  cy.get('#AccountFrm_email').type(uniqueEmail); //  // Gunakan email unik juga
  cy.get('input[name="telephone"]').type('123456789'); // Telephone
  cy.get('input[name="fax"]').type('987654321');       // Fax (optional)

  // Fill out Address Details
  cy.get('input[name="company"]').type('MyCompany');   // Company (optional)
  cy.get('input[name="address_1"]').type('123 Street Name'); // Address 1
  cy.get('input[name="address_2"]').type('Suite 456'); // Address 2 (optional)
  cy.get('input[name="city"]').type('London');         // City
  cy.get('select[name="zone_id"]').select(3);   // Region / State
  cy.get('input[name="postcode"]').type('AB12CD');     // ZIP Code
  cy.get('select[name="country_id"]').select('United Kingdom'); // Country

  // Fill out Login Details
  // Pilih nama acak dari daftar

  cy.get('input[name="loginname"]').type(uniqueLoginName);  // Login name
  cy.get('input[name="password"]').type('SecurePass123'); // Password
  cy.get('input[name="confirm"]').type('SecurePass123');  // Confirm Password

  // Select Newsletter Subscription
  cy.get('input[name="newsletter"][value="1"]').check(); // Subscribe to newsletter

  // Agree to Privacy Policy and Submit
  cy.get('input[name="agree"]').check();   // Agree to the Privacy Policy
  cy.contains('Continue').click(); // Ganti dengan teks yang ada di tombol
  cy.get('.mb40 > .btn').click();
  cy.get('.logo > img').should('be.visible'); //Periksa apakah logo di dashboard muncul
});

// it('TC02: Tidak harus mendaftar dengan email yang sudah terdaftar', () => {
 

//   cy.contains('Email sudah terdaftar').should('be.visible'); 
// });

// it('TC03: Tidak harus mendaftar dengan password yang tidak sama', () => {


//   cy.contains('Password dan konfirmasi password tidak cocok').should('be.visible'); 
// });

// it('TC04: Tidak harus mendaftar dengan format email tidak valid', () => {


//   cy.contains('Format email tidak valid').should('be.visible'); 
// });

// ('TC06: Tidak harus mendaftar dengan password terlalu pendek', () => {
 

//   cy.contains('Password terlalu pendek').should('be.visible'); 
// });

})