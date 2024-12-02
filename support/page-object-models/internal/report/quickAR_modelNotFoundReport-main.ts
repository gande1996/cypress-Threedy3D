import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('selectReportType',()=>{
    cy.get('div.MuiInput-input:eq(0)').click({force:true})
    cy.get('li[data-value=2]').click()
    
})

Cypress.Commands.add('validateQuickARReport',()=>{
    cy.contains('span','Reports:').should('be.visible')
    cy.contains('span','Create a custom time range:').should('be.visible')
    cy.contains('span','Select a relative time range:').should('be.visible')
    cy.contains('span','Last 5 minutes').should('be.visible')
    cy.contains('span','Last 30 minutes').should('be.visible')
    cy.contains('span','Last 1 hour').should('be.visible')
    cy.contains('span','Last 6 hour').should('be.visible')
    cy.contains('span','Last 12 hours').should('be.visible')
    cy.contains('span','Last 24 hours').should('be.visible')
    cy.contains('span','Last 2 days').should('be.visible')
    cy.contains('span','Last 7 days').should('be.visible')
    cy.contains('span','Last 14 days').should('be.visible')
    cy.contains('span','Last 1 month').should('be.visible')
    cy.contains('div','3D Buttons Served (Total)').should('be.visible')
    cy.contains('div','AR Buttons Served (Total)').should('be.visible')
    cy.contains('div','QR Scanning (Total)').should('be.visible')
    cy.contains('div','QR Scanning (Unique)').should('be.visible')
    cy.contains('div','3D Buttons Served (Unique)').should('be.visible')
    cy.contains('div','AR Buttons Served (Unique)').should('be.visible')
    cy.contains('div','3D Views (Total)').should('be.visible')
    cy.contains('div','AR Views (Total)').should('be.visible')
    cy.get('.MuiTableCell-sizeSmall:eq(17)').then($value =>{
        if($value.length>0){
            cy.log("passed")
        }
    })
    
    
})

Cypress.Commands.add('validateModelNotFoundReport',()=>{
    cy.contains('span','Reports:').should('be.visible')
    cy.contains('span','Create a custom time range:').should('be.visible')
    cy.contains('span','Select a relative time range:').should('be.visible')
    cy.contains('span','Last 5 minutes').should('be.visible')
    cy.contains('span','Last 30 minutes').should('be.visible')
    cy.contains('span','Last 1 hour').should('be.visible')
    cy.contains('span','Last 6 hour').should('be.visible')
    cy.contains('span','Last 12 hours').should('be.visible')
    cy.contains('span','Last 24 hours').should('be.visible')
    cy.contains('span','Last 2 days').should('be.visible')
    cy.contains('span','Last 7 days').should('be.visible')
    cy.contains('span','Last 14 days').should('be.visible')
    cy.contains('span','Last 1 month').should('be.visible')
    cy.contains('div','Limit').should('be.visible')
    cy.contains('div','Min Frequency Occurrence').should('be.visible')
    cy.contains('span','SKU').should('be.visible')
    cy.contains('div','Image').should('be.visible')
    cy.contains('span','Option ID').should('be.visible')
    cy.contains('span','Count').should('be.visible')
    cy.contains('span','SKU exists').should('be.visible')
    cy.contains('span','Option ID & SKU exists').should('be.visible')
    cy.contains('span','Feed Id').should('be.visible')
    cy.contains('span','Feed Deleted Exists').should('be.visible')
    //cy.contains('div','Kmart').should('be.visible')
    
})