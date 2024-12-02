import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('validateArtistReport',() =>{
    cy.contains('div','The Nile').should('be.visible')
    cy.contains('div','Galaxy S22 Ultra').should('be.visible')
    cy.contains('h3','Artist Company Report').should('be.visible')
    cy.contains('span','Client:').should('be.visible')
    cy.contains('span','Artist Company:').should('be.visible')
    cy.contains('div','Job ID').should('be.visible')
    cy.contains('div','Job URL').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Option ID').should('be.visible')
    cy.contains('div','Client Name').should('be.visible')
    cy.contains('div','Model Title').should('be.visible')
    cy.contains('div','Artist Company').should('be.visible')
    cy.contains('div','Uploaded Date/Time').should('be.visible')

})