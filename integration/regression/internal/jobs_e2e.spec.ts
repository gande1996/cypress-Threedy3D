/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Jobs-E2E', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/jobs"]').eq(1).click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs')) {
                    cy.get('[href="/jobs"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('redo-job-validation', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        cy.get('tbody tr td span a:eq(0)').scrollIntoView().should('be.visible').click({force:true})
        cy.get('button[aria-label="select merge strategy"] svg:eq(0)').click({force:true})
        cy.contains('li[role="menuitem"]', 'Redo Job').should('be.visible').click({force:true})
        cy.contains('button', 'Redo Job').should('be.visible').click({force:true})
        cy.get('[role="button"][aria-haspopup="listbox"]:eq(0)').should('have.text','Sent for Redo')
        cy.get('button[aria-describedby="switchIssueStatusPopover"]').should('contain','No Issue')
      
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})