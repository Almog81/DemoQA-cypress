/// <reference types="cypress" /> 

import { HomePage } from "../pages/homePage"
import { LoginPage } from "../pages/loginPage"

let homePage = new HomePage;
let loginPage = new LoginPage;

describe('Santy Tests', () => {
  
  beforeEach(() => {
    cy.fixture('loginData.json').as('loginData')
  })

  it('login Test', () => {
    homePage.naviHomePage()
    homePage.naviLoginPage()
    cy.get('@loginData').then((user) => {
      loginPage.loginAction(user.username, user.password )
      cy.get(homePage.btn_userInfo).should('contain', user.username)
    })
  }) 

})