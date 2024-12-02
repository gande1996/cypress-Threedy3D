/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Nile-Reports', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('Portal-Nile-Reports', () => {
        cy.wait(2000)
        cy.selectReport('/nile-report','Nile Report')
        cy.dateRangeSelector('01152023','02152023')
        cy.validateNewTab()
        cy.validateDeliveredTab()
        cy.validateCompletedTab()
        cy.validateReworkNeededTab()
        cy.validateRejectedTab()
        cy.validateAgingTab()
        cy.validateWeeklyTab()
        cy.validateDeadlineTab('11302022')
        cy.validateQAErrorsTab()
        cy.validateReportTab()
       // cy.validateArtistReport()     
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
