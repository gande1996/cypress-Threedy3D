/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Comment-Report ', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('State-transition-module', () => {
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectReport('/client-job-report','Comment Report')
        cy.dateCommentRangeSelector('11012022','02152023')
        cy.selectCommentClient('The Nile','The Nile')
        cy.selectArtistCompany()
        cy.validateIssueResolvedCheckbox()
       // cy.validateIssueNotResolvedCheckbox()
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
