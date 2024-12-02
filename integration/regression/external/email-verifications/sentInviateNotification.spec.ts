/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />

import { accountsData } from "../../../../fixtures/data/accounts"

/* eslint-enable */


describe.skip('SelfServe-Invite member email notification', () => {
    const domainName = Cypress.env('domain')
    const emailId = 'autotest' + Cypress._.random(0, 1e5).toString() + domainName
    beforeEach(() => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
        cy.viewport(1600, 1000)
    })
    it('verify email notification for invite', () => {
        /* verify Billing info  */
        cy.log('verify Team member info')
        cy.navigateToAccounts()
        cy.navigateToTeamMembers()
        cy.verifyTeamMembers()
        cy.contains('button', 'Add More Team Members').should('be.visible').click({ force: true })
      
        cy.addTeamMember(emailId)
        cy.verifyEmailNotification(emailId, 'invitemember')
        
    })
    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')
    })

})
