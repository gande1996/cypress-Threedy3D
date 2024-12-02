/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />

import { accountsData } from "../../../../fixtures/data/accounts"

/* eslint-enable */


describe('SelfServe-Payment  info', () => {

    beforeEach(() => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
        cy.viewport(1600, 1000)
    })
    it('verify Payment info page', () => {
        /* verify Billing info  */
        cy.log('verify Payment info')
        cy.navigateToAccounts()
        cy.screenshot()
        cy.navigateToPaymentInfo()
        cy.screenshot()
        cy.verifyPaymentInfo()
        cy.screenshot()
    })
    it('update payment information', () => {
        /* verify Billing info  */
        cy.log('verify Payment info')
        cy.navigateToAccounts()
        cy.screenshot()
        cy.navigateToPaymentInfo()
        cy.screenshot()
        cy.verifyPaymentInfo()
        cy.editPaymentInfo(accountsData.street,accountsData.apartment,accountsData.city,accountsData.state,accountsData.country,accountsData.zip)
        cy.screenshot()
        cy.contains('button', 'Add Card').should('be.visible').click()
        cy.wait(5000)
        cy.addCardInfo()
        
    })
   
    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')
    })

})
