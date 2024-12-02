/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Delivery-Invoice', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('Delivery-invoice-module', () => {
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectReport('/delivery-invoice','Delivery Invoice')
        cy.dateRangeSelector('02012022','09302022')
        cy.selectClient('Kohls','Kohls') 
        cy.selectCompany('Global Team','default')
        cy.selectComplexity('Medium','Medium')   
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
