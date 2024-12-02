/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Spp-Delivery-Report', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectReport('/spp-delivery-report','Spp Delivery Report')
    })

    it('SPP-report---Awaiting Delivery ', () => {  
        cy.validateAwaitingDeliverySection() 
    })

    it('SPP-report-- Delivered',()=>{
        cy.validateDeliveredSection()
        cy.SKUSearchDelivered()
    })

    it('SPP-report-- Missing',()=>{    
        cy.validateMissingSection()
        cy.validateSort('SKU','1') 
        cy.pagination('25')
        cy.SKUSearchMissing()
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
