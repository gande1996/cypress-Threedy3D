/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Reports-Quick-AR', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(40)').click({force:true})
    })

    it('Quick-ar-or-not-found-Model-not-found', () => {
        cy.viewport(1660, 1000)
        cy.get('a[href="/quick-ar-or-not-found"]').click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                expect(currentUrl.indexOf('/quick-ar-or-not-found')).greaterThan(0)
                // if (currentUrl.indexOf('/quick-ar-or-not-found')) {                 
                //     expect(currentUrl).to.include('/quick-ar-or-not-found')
                // }
            })
        })
        cy.get('[class=" css-tlfecz-indicatorContainer"]').should('be.visible').click({ force: true })
        cy.contains('div', 'Kmart').scrollIntoView().should('be.visible').click({ force: true })
        cy.contains('button', 'Filter').should('be.visible').click({ force: true })
        cy.wait(2000, { log: false })
        cy.get('tbody tr[role="checkbox"]')
            .each(($tr) => {
                expect($tr).to.contain('Kmart')
            })

    })

    it('Quick-ar-or-not-found-Quick-AR', () => {
        cy.viewport(1660, 1000)
        cy.get('a[href="/quick-ar-or-not-found"]').click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                expect(currentUrl.indexOf('/quick-ar-or-not-found')).greaterThan(0)
                // if (currentUrl.indexOf('/quick-ar-or-not-found')) {                 
                //     expect(currentUrl).to.include('/quick-ar-or-not-found')
                // }
            })
        })

    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
