/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />

import { accountsData } from "../../../../fixtures/data/accounts"

/* eslint-enable */


describe('SelfServe-Team member', () => {

    beforeEach(() => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
        cy.viewport(1600, 1000)
    })
   
    it('verify team member info page', () => {
        /* verify Billing info  */
        cy.log('verify Team member info')
        cy.navigateToAccounts()
        cy.screenshot()
        cy.navigateToTeamMembers()
        cy.screenshot()   
        cy.verifyTeamMembers()
            
    })   
    it('Invite member', () => {
        /* verify Billing info  */
        cy.log('verify Team member info')
        cy.navigateToAccounts()
        cy.screenshot()
        cy.navigateToTeamMembers()
        cy.screenshot()   
        cy.verifyTeamMembers()
        cy.screenshot()   
        cy.contains('button','Add More Team Members').should('be.visible').click({force:true})
        cy.addTeamMember(accountsData.teamMemberEmail)
        
    })
    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')
    })

})
