/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-disable */
describe('Portal-QuickAR-Report', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('Quick-AR-report-module', () => {
        cy.wait(2000)
        cy.selectReport('/quick-ar-or-not-found','Quick AR / Model Not Found')
        cy.selectReportType()
        cy.dateRangeSelector('12282023','12312023')
        cy.waitOnLoad()
        cy.validateQuickARReport()
    })

    it('Model-not-found-report', () => {
        cy.wait(2000)
        cy.selectReport('/quick-ar-or-not-found','Quick AR / Model Not Found')
        cy.dateRangeSelector('12282023','12312023')
        cy.waitOnLoad()
        cy.validateModelNotFoundReport()     
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
