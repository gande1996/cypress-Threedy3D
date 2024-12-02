/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

import { credentials } from "../../../../fixtures/credentials/credentials"

describe.skip('SelfServe-Model comment email notification', () => {
    const domainName = Cypress.env('domain')
    const emailId = 'autotest' + Cypress._.random(0, 1e5).toString() + domainName

    beforeEach(() => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client1', 'clientPassword1', 'test')
        cy.viewport(1600, 1000)
    })
    it('verify email notification for model commented', () => {
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        /**Search and open model */
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            cy.FilterModelByStatus('In Review')
            cy.openModel('C308Model')
            cy.verifyModelDetails('In Review')
            cy.contains('span', 'Comments').should('be.visible').click({ force: true })
            cy.contains('button', 'Add comment').should('be.visible').and('be.enabled').click({ force: true })
            cy.get('#textAreaMain').should('be.visible').and('be.enabled').type('TestComment' + new Date())
            cy.contains('button', 'Add').should('be.visible').click({ force: true })
            cy.wait(2000)
            cy.get('ul[class*="MuiList-root"] li *> p:eq(0)').should('have.text', 'TestComment' + new Date())
            cy.verifyEmailNotification(credentials.client1, 'commentNotification')
        })
    })

    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')
    })

})
