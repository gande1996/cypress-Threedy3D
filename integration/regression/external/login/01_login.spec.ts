/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

import { constant } from 'cypress/types/lodash'
import { credentials } from '../../../../fixtures/credentials/credentials'
import { commonSelectors as csel } from '../../../../support/commonSelectors'

describe.only('SelfServe-Client Sign In', () => {
    //C274
    it('validate user successfully sing in and sign out', () => {
        cy.clearCookies()
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })
    const emailId= 'automationtest1'+Cypress._.random(0,1e5).toString()+'*mailsac.com'
    it('validate invalid login error', () => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.launchApp('test')
        cy.enterCredentials(emailId, credentials.userPassword)
        cy.get('#btn-login').should('be.visible').click({force:true})
        cy.get(csel.errorMessage).should('exist').should('be.visible').and('have.text', 'Wrong email or password.')
        cy.verifyAppBarHide()
    })

})