/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Client-Report', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
//cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('Client-report-module', () => {
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectReport('/client-report','Client Report')
        cy.validateClientReport()
        cy.dateRangeSelector('12272023','01022024')
        cy.validateDateRange()       
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
