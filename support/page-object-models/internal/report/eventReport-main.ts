import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('verifyEventSelected',(eventfiltertName,index) => {
    cy.get(rsel.eventFilterButton).click()
        .wait(2000)
        .type('{downarrow}'.repeat(index))
        .wait(2000)
        .trigger('keydown', {
            key: 'Enter',
        })
    cy.get(rsel.eventFilterSelected).contains(eventfiltertName).should('be.visible')  
    cy.wait(2000)
    if(eventfiltertName=='job.client_review'){
        cy.get(rsel.eventFilterText).wait(2000).contains('review').should('be.visible')
        cy.get('input[type="checkbox"]').check()
        cy.contains('span', 'test admin').should('be.visible')
        cy.contains('span', 'You').should('not.exist')
       
    }
    else if(eventfiltertName=='user_invites.created'){
        cy.get(rsel.eventFilterText).contains('create invite').should('be.visible')
        cy.get('input[type="checkbox"]').check()
        cy.contains('span', 'create invite').should('be.visible')
        cy.contains('span', 'You').should('not.exist')
       
    }
    else if(eventfiltertName=='job.deleted'){
        // cy.get(rsel.eventFilterText).contains('deleted the job ').should('be.visible')
        cy.get('input[type="checkbox"]').check()
        cy.contains('span', 'deleted').should('be.visible')
        //cy.contains('span', 'You').should('not.exist')
       
    }
    cy.get(rsel.removeFilter).click({force:true}) 
    cy.reload()  
    cy.wait(5000)
})

Cypress.Commands.add('verifyMultipleEventSelected',(eventFilterName1,eventFilterName2,userfiltertName,index1,index2,userindex) =>{
        cy.get(rsel.eventFilterButton).click()
        .wait(2000)
        .type('{downarrow}'.repeat(index1))
        .wait(2000)
        .trigger('keydown', {
            key: 'Enter',
        })
        .wait(2000)
        .type('{downarrow}'.repeat(index2))
        .wait(2000)
        .trigger('keydown', {
            key: 'Enter',
        })
    cy.get(rsel.eventFilterSelected).contains(eventFilterName1).should('be.visible')  
    cy.get(rsel.eventFilterSelected).contains(eventFilterName2).should('be.visible')  
    cy.wait(2000)
    if(eventFilterName1=='job.client_review' && eventFilterName2=='job.deleted' ){
        cy.contains('span', 'review').should('be.visible')
        cy.contains('span', 'deleted the job').should('be.visible')
        cy.get('input[type="checkbox"]').check()
       // cy.contains('span', 'test admin').should('be.visible')
        //cy.contains('span', 'You').should('not.exist')
       
    }
    cy.get(rsel.userFilterButton).click()
    .wait(2000)
    .type('{downarrow}'.repeat(userindex))
    .wait(2000)
    .trigger('keydown', {
        key: 'Enter',
    })
    cy.get(rsel.eventFilterSelected).contains(userfiltertName).should('be.visible')
    cy.contains('span', 'Cypress User').should('be.visible')
    cy.reload()  
    cy.wait(5000)
    })


Cypress.Commands.add('validateEventReportPage',()=>{
        cy.contains('h3', 'Latest Events').should('be.visible')
        cy.contains('span', 'Type:').should('be.visible')
        cy.contains('span', 'User:').should('be.visible')
        cy.contains('span', 'Exclude My Events').should('be.visible')
    })