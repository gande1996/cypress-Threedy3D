import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('selectClient',(clientName,verifySearch) =>{
    cy.get(rsel.clientSelector).click().type(clientName)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })
    cy.get(rsel.filterButton).click()
    cy.contains('div',verifySearch).should('be.visible')
    cy.get(rsel.deleteClient).click({force:true})
})

Cypress.Commands.add('selectCompany',(companyName,verifySearch) =>{
    cy.log("before")
    cy.get(rsel.companySelector).click().type(companyName)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })

    cy.log("after")  
    cy.get(rsel.filterButton).click()
    cy.wait(2000)
    cy.contains('div',verifySearch).should('be.visible')
    cy.get(rsel.deleteCompany).click({force:true})
})

Cypress.Commands.add('selectClientType',(clientTypeName) =>{
    cy.get(rsel.clientTypeSelector).click().type(clientTypeName)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })
    cy.get(rsel.filterButton).click()
    cy.wait(2000)
    cy.contains('div','Packaging In-Progress').should('be.visible')
    cy.get(rsel.deleteClientType).click({force:true})
})

Cypress.Commands.add('selectTag',(tagName) =>{
    cy.get(rsel.tagSelector).click().type(tagName)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })
    cy.get(rsel.filterButton).click()
    cy.wait(2000)
    cy.contains('div','Packaging In-Progress').should('be.visible')
    cy.get(rsel.deleteTag).click({force:true})
})

Cypress.Commands.add('validateStateTrackReport',()=>{
    cy.contains('h3', 'Job State Tracking Report').should('be.visible')
    cy.contains('p', 'Filters').should('be.visible')
    cy.contains('span', 'From').should('be.visible')
    cy.contains('span', 'Client:').should('be.visible')
    cy.contains('span', 'Artist Company:').should('be.visible')
    cy.contains('span', 'Category:').should('be.visible')
    cy.contains('span', 'Client Type:').should('be.visible')
    cy.contains('span', 'Assigned User:').should('be.visible')
    cy.contains('span', 'Tag:').should('be.visible')
    cy.contains('span', 'Exclude hold').should('be.visible')
 //   cy.contains('div', 'State').should('be.visible')
    cy.contains('div', 'Count').should('be.visible')
    cy.contains('div', 'Average Time').should('be.visible')
})