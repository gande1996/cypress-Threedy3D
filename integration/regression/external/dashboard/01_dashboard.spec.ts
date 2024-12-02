/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

describe('SelfServe-Dashboard', () => {   
    beforeEach (() => {
        /* Client Logs in */
        cy.clearCookies()
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
    })
     it('verify landing page', () => {
        /* validate home page */    
        cy.log('validate home page') 
        cy.verifyHomePage('external')  
    })

    it('verify how it works navigation link', () => {   
        cy.navigateTutorialPage()
        cy.navigateHomePage()
    })
    it('verify overview works navigation link', () => {   
        cy.navigateOverviewPage()
        cy.navigateHomePage()
    })
    it('verify support navigation link', () => {   
        cy.navigateSupportDialog()
        cy.navigateHomePage()
    })
    it('verify contact us navigation link', () => {   
        cy.navigateContactUsPage()
        cy.navigateHomePage()
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })


})