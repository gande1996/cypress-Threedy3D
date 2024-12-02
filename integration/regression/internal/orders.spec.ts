/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Order-module', () => {
  const orderName = '001_cypress_order_tag0'+Cypress._.random(0,1e5).toString()
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('a[href="/order-tasks"]:eq(1)').click({force:true})  
       cy.contains('p','Orders').should('be.visible') 
    })

    it('Create-order', () => {
        const filePath= 'attachments/order_csv_example.csv'
        cy.createOrder(orderName,filePath)
    })

    it('validateFilter',()=>{
      cy.validateOrderFilter(orderName)     

    })

    it('Order-Details',()=>{
      cy.validateOrderDetails(orderName)     

    })

    it('Delete-order',()=>{
      cy.deleteOrder(orderName)
      
    })
   
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
