/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Bonus-Report', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
     
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('Bonus-report-module', () => {
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectReportMethod('/bonus-report')
        
        cy.dateRangeSelector('11012023','05092023')
        cy.validateBonusReportPage()
             
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
