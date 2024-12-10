/// <reference types="cypress" /> 

export class LoginPage {
    //Objects
    txt_userName = '#userName';
    txt_password = '#password';
    btn_login = '#login';


    //Action
    loginAction(email,pass){
        cy.get(this.txt_userName).type(email)
        cy.get(this.txt_password).type(pass)
        cy.get(this.btn_login).click()
    }


    
    
}