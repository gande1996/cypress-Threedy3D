/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */


describe.only('SelfServe-AppBar Navigation', () => {

    beforeEach(() => {

        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')

    })

    it('client Validates Navigation from Resource Menu', () => {
        /* Client verifies all the navigation from home page */
        cy.log('Admin verifies all the navigation from Resource Menu')
        cy.navigateToResourcesPage('How-To-Videos')
        cy.navigateToResourcesPage('Enterprise')

    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })



})
