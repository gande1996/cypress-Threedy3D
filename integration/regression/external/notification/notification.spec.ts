/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */


describe('SelfServe-verify Notification module', () => {

    beforeEach(() => {

        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')

    })
    it('Verify notifications tab', () => {
        /* Client verifies all the notification and status from notification tab */
        cy.get('button[type="button"]:eq(0)').click()
        cy.contains('div','Notifications').should('be.visible')
        

        cy.get('button[class="MuiButtonBase-root MuiButton-root MuiButton-outlined"]').click()
        cy.url().should('include', 'notifications')

        cy.validateStatus('approved')      
        cy.validateStatus('progress')
        cy.validateStatus('comment')
        cy.validateStatus('review')
     
        cy.wait(3000)
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })
})