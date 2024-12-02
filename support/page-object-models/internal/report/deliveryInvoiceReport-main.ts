import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('selectComplexity',(complexity , verifySearch) =>{
    cy.get(rsel.selectComplexity).click().type(complexity)
    .type('{downarrow}').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })
    cy.get(rsel.filterButton).click()
    cy.contains('div',verifySearch).should('be.visible')
    cy.contains('div','Simple').should('not.exist')
})
