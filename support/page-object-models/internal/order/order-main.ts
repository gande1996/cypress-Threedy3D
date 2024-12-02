import {orderSelectors as orsel} from './_selectors-order'

Cypress.Commands.add('createOrder', (orderName,filePath) => {
    cy.contains('span', 'Create New Order').click()
       cy.get(orsel.orderNameTextField).type(orderName) 
       cy.selectDropdownKeyboard(orsel.orderClientDropdown, 'ABC')
       //cy.get(orsel.orderClientDropdown).type('ABC')
       
      cy.get(orsel.uploadFile).click().wait(2000).attachFile(filePath)

      cy.get('.css-wd36ch').click().type('admin').wait(2000).trigger('keydown', {
        key: 'Enter',
      })
      cy.get(orsel.createOrder).click()
       
})

Cypress.Commands.add('validateOrderFilter', (orderName) => {
    cy.get(orsel.orderNameFilter).type(orderName)
      cy.contains('a',orderName).should('be.visible')
      cy.get(orsel.orderNameFilter).clear()
      cy.selectDropdownKeyboard(orsel.clientDropdownSelector, 'ABC')
      cy.wait(3000)
      cy.get('table tbody tr')
      .each(($tr) => {
          expect($tr).to.contain('ABC')
      })
      cy.contains('span','Order ID').should('be.visible')
      cy.contains('span','Order Name').should('be.visible')
      cy.contains('span','Client Name').should('be.visible')
      cy.contains('span','Created On').should('be.visible')
      cy.contains('span','Last Modified').should('be.visible')
      cy.contains('span','Create User').should('be.visible')
       
})

Cypress.Commands.add('deleteOrder', (orderName) => {
    cy.contains('Order Name').click({force: true})
      cy.contains('a',orderName).click()
      cy.contains('h4','Tasks').should('be.visible')
      cy.contains('span','Product URL').should('be.visible')
      cy.contains('span','Title').should('be.visible')
      cy.contains('div','Image Options').should('be.visible')
      cy.contains('span','Measure Unit').should('be.visible')
      cy.contains('span','Client Category').should('be.visible')
      cy.contains('span','Length').should('be.visible')
      cy.contains('span','Width').should('be.visible')
      cy.contains('span','Height').should('be.visible')
      cy.contains('span','SKU').should('be.visible')
      cy.wait(2000)
      cy.contains('Delete').click()
      cy.wait(2000)
      cy.contains('h4','Orders').should('be.visible') 
      cy.contains('a',orderName).should('not.exist')
       
})

Cypress.Commands.add('validateOrderDetails', (orderName) => {
  cy.get(orsel.orderNameFilter).type(orderName)
    cy.contains('a',orderName).should('be.visible').click()
    cy.wait(2000)
    cy.contains('span','Product URL').should('be.visible')
    cy.contains('span','Title').should('be.visible')
    cy.contains('div','Image Options').should('be.visible')
    cy.contains('span','Measure Unit').should('be.visible')
    cy.contains('span','Client Category').should('be.visible')
    cy.contains('span','Length').should('be.visible')
    cy.contains('span','Width').should('be.visible')
    cy.contains('span','Height').should('be.visible')
    cy.contains('span','SKU').should('be.visible')
    cy.contains('span','Option Id').scrollIntoView().should('be.visible')
    cy.contains('span','Status').should('be.visible')
     
})