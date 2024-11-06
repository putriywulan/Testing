class LoginPage {
    // Mendefinisikan elemen-elemen halaman
    loginField() {
      return cy.get('input[name="loginname"]');
    }
  
    passwordField() {
      return cy.get('input[name="password"]');
    }
  
    loginButton() {
      return cy.get('button[title="Login"]');
    }
  
    // Method untuk login
    login(username, password) {
      this.loginField().type(username);
      this.passwordField().type(password);
      this.loginButton().click();
    }
  }
  
  export default LoginPage;
  