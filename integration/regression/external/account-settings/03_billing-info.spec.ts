/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */


 describe('SelfServe-Billing info', () => {

 beforeEach(() => {         
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client2', 'clientPassword2', 'test')
        cy.viewport(1600,1000)
    })
    it('verify Billing info page', () => {        
        /* verify Billing info  */
        cy.log('verify Billing info')
        cy.navigateToAccounts()
        cy.navigateToBillingHistory()  
        cy.verifyBillingHistory()         

    })
    
    it('verify invoice', () => {        
        /* verify Billing info  */
        cy.log('verify Billing info')
        cy.navigateToAccounts()
        cy.navigateToBillingHistory()  
        cy.verifyBillingHistory()      
        cy.contains('span', 'View Invoice').should('be.visible') 
        cy.contains('span', 'View Invoice').parent().invoke('attr','href').then((invoiceUrl)=>{
            cy.log(''+invoiceUrl)
  //          expect(invoiceUrl).to.equal('https://pay.stripe.com/invoice/acct_1KnPzkH311pq3KMI/test_YWNjdF8xS25QemtIMzExcHEzS01JLF9NVjlRR3FycVdKNVhYWW1TUE9nemlZTGo4M1RSMzJ5LDU1ODM2MDk402000XoEkU4m/pdf?s=ap')           
           expect(invoiceUrl?.includes('https://pay.stripe.com/invoice/acct_1KnPzkH311pq3KMI')).to.be.true
})        
    })

    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')
    })

})
