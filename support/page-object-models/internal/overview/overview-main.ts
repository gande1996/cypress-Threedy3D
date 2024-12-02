//import {commonSelectors as csel} from '../../../commonSelectors'
import {overviewSelectors as osel} from './_selectors-overview'

Cypress.Commands.add('verifyOverviewPage', () => {
    cy.contains('a', 'Dashboard')
    cy.contains('li', '/').should('be.visible')
    cy.contains('li', 'Overview').should('be.visible')
    cy.contains('h3', 'Latest Events').should('be.visible')
    cy.contains('h3', 'Overview').should('be.visible')
    cy.contains('span', 'Type:').should('be.visible')
    cy.get(osel.jobStatusChart).should('be.visible').within(() => {
        cy.contains('span', 'Job Status').should('be.visible')
        cy.contains('span', 'Status of all jobs').should('be.visible')
    })
    cy.get(osel.productCategoryChart).should('be.visible').within(() => {
        cy.contains('span', 'Product Category').should('be.visible')
        cy.contains('span', 'Category of products currently being processed').should('be.visible')
    })
    cy.contains('span','Exclude My Events').should('be.visible')    
})


Cypress.Commands.add('verifyEvent',(eventfiltertName , index) => {
    cy.get(osel.eventFilterButton).click()
        .wait(3000)
        .type('{downarrow}'.repeat(index))
        .wait(3000)
        .trigger('keydown', {
            key: 'Enter',
        })
    cy.get(osel.eventFilterSelected).contains(eventfiltertName).should('be.visible')  
    cy.wait(2000)
    if(eventfiltertName=='Comment Added'){
        cy.get(osel.eventFilterText).contains('Test Test added a new comment').should('be.visible')
        cy.get("input[type='checkbox']").check()
        cy.contains('div', 'No Events').should('be.visible')
       
    }
    else if(eventfiltertName=='job.created'){
        cy.get(osel.eventFilterText).contains('You created a new job').should('be.visible')
    }
    else if(eventfiltertName=='job.client_approved'){
        cy.get(osel.eventFilterText).contains('You approved').should('be.visible')   
    }
    else if(eventfiltertName=='job.client_review'){
        cy.get(osel.eventFilterText).contains('admin added').should('be.visible')   
        cy.get("input[type='checkbox']").check()
        cy.get(osel.eventFilterText).contains('admin added').should('be.visible')
    }
       
    cy.get('.MuiChip-root > .MuiSvgIcon-root > path').click({force:true}) 
    cy.reload()  
    cy.wait(5000)

})


