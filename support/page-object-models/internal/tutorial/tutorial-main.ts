import {commonSelectors as csel} from '../../../commonSelectors'
import {tutorialSelectors as tsel} from './_selectors-tutorial'


Cypress.Commands.add('verifyTutorialPage', () => {
    cy.contains('a', 'Dashboard').should('be.visible')
    cy.contains('li', '/').should('be.visible')
    cy.contains('li', 'How it works').should('be.visible')
    cy.contains('p', 'How it works').should('be.visible')
    cy.contains('p', 'Quick video tutorials with tips and tricks for getting the most out of threedy.ai').should('be.visible')
    cy.get(tsel.howToCreateModelBtn).should('be.visible').and('be.enabled')
    cy.get(tsel.modelStageBtn).should('be.visible').and('be.enabled')
    cy.get(tsel.reviewAndApproveBtn).should('be.visible').and('be.enabled')
    cy.contains('span','About your models').should('be.visible')    
 })
