import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('validateAwaitingDeliverySection',()=>{
    cy.contains('div','SKU (Generated From Name)').should('be.visible')
    cy.contains('div','File Name').should('be.visible')
    cy.contains('div','Size (Mb)').should('be.visible')
    cy.contains('div','Week').should('be.visible')
    cy.contains('div','Year').should('be.visible')
    cy.contains('span','Delivered').should('be.visible')
    cy.contains('span','Awaiting Delivery').should('be.visible')
    cy.contains('span','Missing').should('be.visible')
})

Cypress.Commands.add('validateDeliveredSection',()=>{
 
    cy.get(':nth-child(2) > .MuiTab-wrapper').click()
    cy.contains('label','Tag:').should('be.visible')

    cy.contains('span','SKU').should('be.visible')
    cy.contains('span','Size (Mb)').should('be.visible')
    cy.contains('span','Delivered on (UTC)').should('be.visible')
    cy.contains('span','Week').should('be.visible')
    cy.contains('span','Year').should('be.visible')

    
    
})

Cypress.Commands.add('SKUSearchDelivered',()=>{
    cy.get('tbody tr td:nth-child(2)')
    .each(($el, $index) => {
        const searchString = $el.text();
        cy.get('div[placeholder="SKU:"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(searchString)
                    .should('have.value', searchString)
            })
            .wait(1500, { log: false })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]').should('have.length.of.at.least', 1)
            })
            cy.get('div[placeholder="SKU:"]').type("{selectall}{backspace}")   
    })
})

Cypress.Commands.add('SKUSearchMissing',()=>{
    cy.get('tbody tr td:nth-child(1)')
            .each(($el, $index) => {
                const searchString = $el.text();
                cy.get('div[placeholder="SKU:"]').should('have.length', 1)
                    .within(() => {
                        cy.get('input[type="text"]').type(searchString)
                            .should('have.value', searchString)
                    })
                    .wait(1500, { log: false })
                    .then(() => {
                        cy.get('tbody tr[role="checkbox"]').should('have.length.of.at.least', 1)
                    })
                    cy.get('div[placeholder="SKU:"]').type("{selectall}{backspace}")   
            })
})

Cypress.Commands.add('validateMissingSection',()=>{
    let tag= '--new-tag-003'

    cy.get(':nth-child(3) > .MuiTab-wrapper').click()

    cy.get('#tag').click().type(tag)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })
    cy.wait(3000)
    cy.get('table tbody tr td:nth-child(2)')
      .each(($tr) => {
          expect($tr).to.contain(tag)
      })  
      cy.validateSort('SKU','1')   
      cy.get('.MuiButton-contained').click()
      cy.wait(2000)

      
    //   cy.readFile('C://Users//akshi//cypress-threedy-test//cypress//downloads//missing_spp_skus.*')
    //  .should('exist')
    

    
      
})