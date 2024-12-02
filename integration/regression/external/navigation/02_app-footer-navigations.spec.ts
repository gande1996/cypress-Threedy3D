/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */


describe('SelfServe-Footer Navigation', () => {

    beforeEach(() => {
         
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
    })

    it('Validate Navigation from footer menu links', () => {        
        /* Client verifies all the navigation from home page */
        cy.log('user verifies all the navigation from footer page')        
        //cy.pause()
        cy.navigateToPage('My Models')
        cy.reload()
        cy.verifyAppFooterPresent()
        cy.navigateToPage('Home')

        cy.navigateToPage('Billing')
        cy.reload()
        cy.verifyAppFooterPresent()
        cy.navigateToPage('Home') 
        cy.navigateToPage('Overview')
        cy.reload()
        cy.verifyAppFooterPresent()
        cy.navigateToPage('Home') 
        cy.navigateToPage('How-To-Videos')
        cy.reload()
        cy.verifyAppFooterPresent()
        cy.navigateToPage('Home') 
        cy.reload()
        cy.navigateToPage('Contact')
        cy.verifyContactUsPage()
        cy.reload()
        cy.verifyAppFooterPresent()
        
        cy.navigateToPage('Home') 
        cy.verifyHomePage('external')
    })
    afterEach(() => {

        /* user Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })

})
