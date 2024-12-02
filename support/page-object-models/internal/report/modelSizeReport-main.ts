import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('validateModelSizeReport',() =>{
    cy.contains('h3','Model Size Report').should('be.visible')
    cy.contains('span','Client:').should('be.visible')
    cy.contains('span','From').should('be.visible')
    cy.contains('div','Title').should('be.visible')
    cy.contains('div','Job URL').should('be.visible')
    cy.contains('span','SKU').should('be.visible')
    cy.contains('span','Option ID').should('be.visible')
    cy.contains('span','Client Name').should('be.visible')
    cy.contains('span','Glb File Size').should('be.visible')
    cy.contains('span','Time Uploaded').should('be.visible')
    cy.contains('span','Export CSV').should('be.visible')

})