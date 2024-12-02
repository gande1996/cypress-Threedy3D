/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */


describe('SelfServe-Overview module', () => {

    beforeEach(() => {

        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')

    })
    it('Verify overview screen', () => {
        /* Client verifies all the notification and status from notification tab */
        cy.get(':nth-child(64)').click()
        cy.verifyOverviewPage()
        cy.verifyEvent('Comment Added', 9)
        cy.verifyEvent('job.created', 8)
        cy.verifyEvent('job.client_approved', 6)
        cy.verifyEvent('job.client_review', 5)

    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })
})