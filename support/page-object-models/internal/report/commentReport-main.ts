import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('dateCommentRangeSelector', (dateFrom, dateTo) => {
    cy.get(rsel.dateFromSelector).clear().type(dateFrom)
    cy.get(rsel.dateToSelector).clear().type(dateTo)
    cy.get(rsel.commentFilterButton).click()
})

Cypress.Commands.add('selectCommentClient',(clientName,verifySearch) =>{
    cy.get(rsel.clientSelector).click().type(clientName)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })
    cy.get(rsel.commentFilterButton).click()
    cy.contains('div',verifySearch).should('be.visible')
})

Cypress.Commands.add('selectArtistCompany', () => {
    cy.get(rsel.artistCompanySelector).click()
    .type('{downarrow}'.repeat(1))
    .wait(2000)
    .trigger('keydown', {
        key: 'Enter',
    })
    cy.get(rsel.commentFilterButton).click()
    cy.contains('span','a year ago').should('be.visible')
})

Cypress.Commands.add('validateIssueResolvedCheckbox', ()=>{
    cy.get(rsel.issueResolvedCheckbox).click()
    cy.get(rsel.commentFilterButton).click()
    cy.contains('div','Nile Feedback').should('be.visible')
})

Cypress.Commands.add('validateIssueNotResolvedCheckbox', ()=>{
    cy.log("here")
    cy.get(rsel.issueNotResolvedCheckbox).click()
    cy.get(rsel.commentFilterButton).click()
    cy.contains('span','7 months ago').should('not.exist')
})
