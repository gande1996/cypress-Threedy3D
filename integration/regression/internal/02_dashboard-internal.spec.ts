/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Dashboard', () => {   
    beforeEach (() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
    })
    it('verify-landing-page', () => {
        /* validate home page */    
        cy.log('validate home page') 
//cy.verifyHomePage('internal')   
    })

    it('verify-navigations-link', () => {   
        cy.navigateToProductsPage()
        cy.navigateToHomePage()
        cy.navigateToFeedsPage()
        cy.navigateToHomePage()
        cy.navigateToJobsPage()
        cy.navigateToHomePage()
        cy.navigateToAdminClientPage()
        cy.navigateToHomePage()
        cy.navigateToAdminUsersPage()
        cy.navigateToHomePage()
        cy.navigateToReportsPage()
        cy.navigateToHomePage()
    })
    
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })


})