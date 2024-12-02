/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

import { credentials } from '../../../../fixtures/credentials/credentials'
import { commonSelectors as csel } from '../../../../support/commonSelectors'
import { loginSelectors as logsel } from '../../../../support/page-object-models/internal/login/_selectors-login'

describe('SelfServe-email verification', () => {
    const serverId = Cypress.env("serverID")
    const domainName = Cypress.env('domain')
    const testEmail =  'autotest'+Cypress._.random(0,1e5).toString()+domainName

    it('validate reset password link', () => {
        cy.clearCookies()
        /* launch app */
        cy.launchApp('test')
        cy.verifyLoginPage()
        cy.get(logsel.forgotPassword).click({ force: true })
        cy.verifyForgotPasswordPage()
        cy.wait(2000)
        cy.get(logsel.emailInput).should('be.visible').and('be.enabled').type(testEmail)
        cy.wait(2000)
        cy.get(logsel.resetButton).should('be.visible').and('be.enabled').click({ force: true })

    })

    it('validate invalid login error', () => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.launchApp('test')
        cy.enterCredentials(credentials.invalidUserId, credentials.userPassword)
        cy.wait(2000)
        cy.get('#btn-login').should('be.visible').click({ force: true })
        cy.wait(2000)
        cy.get(csel.errorMessage).should('exist').should('be.visible').and('have.text', 'Wrong email or password.')
        cy.wait(2000)
        cy.verifyAppBarHide()
    })

})