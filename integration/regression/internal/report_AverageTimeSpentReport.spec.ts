/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Average-Time-Spent-Report', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectTimeSpentReport('/time-spent-report','Average Time Spent Report')
    })

    it('Time-spent-report--Summary-report ', () => {  
        cy.validateSummaryReport()
    })

    

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
