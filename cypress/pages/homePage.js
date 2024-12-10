/// <reference types="cypress" /> 

export class HomePage {
    //Objects
    btn_signIn = '#login';
    url_homePage = 'https://demoqa.com/books';
    btn_userInfo = '#userName-value';

    //Action
    naviHomePage(){
        cy.visit(this.url_homePage)
    }
    naviLoginPage(){
        cy.get(this.btn_signIn).click()
    }
    
    
}