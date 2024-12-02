/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */
describe('SELFSERVE-SMOKE-', () => {   
    before (() => {
        cy.clearCookies()
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
    })
    it('Dashboard verify landing pag', () => {
        /* validate home page */    
        cy.log('validate home page') 
        cy.contains('Welcome to ARitize 3D').should('be.visible')
        // cy.verifyHomePage('internal')             
    })

    it('homepage-verify how it works and Support navigation link', () => {   
        cy.navigateTutorialPage()
        cy.navigateHomePage()
        cy.navigateSupportDialog()
        cy.navigateHomePage()
    })
    it('Home Page option- View Analytics verification', () => {   
        cy.navigateOverviewPage()
        cy.navigateHomePage()
    })
    it('Homepage- Verify options under SiteMap', () => { 
        cy.navigateToPage('Home')
        cy.navigateToPage('Billing')
        cy.navigateToPage('Home') 
        cy.navigateToPage('Overview')
        cy.reload()
        cy.wait(2000)
        cy.verifyAppFooterPresent()
        cy.navigateToPage('Home') 
        cy.navigateToPage('How-To-Videos')
        cy.reload()
        cy.wait(2000)
        cy.verifyAppFooterPresent()
        cy.navigateToPage('Home') 
        cy.navigateToPage('Contact')
        cy.reload()
        cy.navigateToPage('Home') 
        cy.navigateToPage('My Models')
        cy.reload()
        cy.navigateToPage('Home') 
    })
    it('Homepage-verify Need enterprise solutions?-Contact Us navigation link', () => {   
        cy.navigateContactUsPage()
        cy.navigateHomePage()
    })
    after(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })


})