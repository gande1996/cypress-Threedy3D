//import {commonSelectors as csel} from '../../../commonSelectors'
import {notificationSelectors as nsel} from './_selectors-notification'



Cypress.Commands.add('validateStatus', (status) => {
    //let userEmail = userId + `${Math.floor(Math.random() * 10000)}` + '@mailsac.com'
    cy.log(status)
    cy.get('.MuiSelect-root').click()
    if(status=='approved'){
        cy.get(nsel.approvedStatus).click()
        cy.wait(2000)
        cy.get(nsel.statusText).contains('Approved').should('be.visible')
        cy.contains('span', 'approved').should('be.visible')

    }
    else if(status=='progress'){
        cy.get(nsel.progressStatus).click()
        cy.wait(2000)
        cy.get(nsel.statusText).contains('In Progress').should('be.visible')
        cy.contains('span', 'is in progress.').eq(0).should('be.visible')
    }
    else if(status=='review'){
        cy.get(nsel.reviewStatus).click()
        cy.wait(2000)
        //cy.contains('div', 'Unread').should('be.visible')
        cy.get(nsel.statusText).contains('In Review').should('be.visible')
        cy.get(nsel.statusText).contains('In Review').should('be.visible')
        cy.contains('span', 'is ready for review.').eq(0).should('be.visible')
        cy.contains('div', 'Read').should('be.visible')
        cy.contains('span', 'is ready for review.').should('be.visible')
        cy.get(nsel.reviewText).contains('In Review').should('be.visible')
        cy.get(nsel.reviewText).contains('In Review').should('be.visible')
    }
    
    else if(status=='comment'){
        cy.get(nsel.commentStatus).click()
        cy.wait(2000)
        cy.get(nsel.statusText).contains('Comments').should('be.visible')
        cy.contains('span', 'new comment on ').eq(0).should('be.visible')
    }
    
})
