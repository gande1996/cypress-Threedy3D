/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Job-Details', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('[href="/jobs"]').eq(1).click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs')) {
                    cy.get('[href="/jobs"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    it('page-Test', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let status = "Part making in progress"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(9)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(status).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').eq(1).click()
                   
            })
        cy.wait(4000)    
        cy.contains('div','Title').should('be.visible')
        cy.contains('div','URL').should('be.visible')
        cy.contains('div','SKU').should('be.visible')
        cy.contains('div','Client Category').should('be.visible')
        cy.contains('div','System Category').should('be.visible')
        cy.contains('div','Option ID').should('be.visible')
        cy.contains('div','Dimensions').should('be.visible')
        cy.contains('div','Assigned to').should('be.visible')
        cy.contains('div','Orientation').should('be.visible')
        cy.contains('div','Is Manual').should('be.visible')
        cy.contains('div','Machine Category').should('be.visible')
        cy.contains('div','Assigned Agency/Lead').should('be.visible')
        cy.contains('div','Allow shared download').should('be.visible')
        cy.contains('div','3D View Engine').should('be.visible')
        cy.contains('div','iOS Intensity').should('be.visible')
        cy.contains('div','Prefer Compressed Model').should('be.visible')
        cy.contains('div','Assigned Watcher').should('be.visible')
        cy.contains('div','Assigned QA User').should('be.visible')
        cy.contains('div','Focal Length').should('be.visible')
        cy.contains('div','Delivered On').should('be.visible')
        cy.contains('div','Compress With RapidCompact').should('be.visible')
        cy.contains('div','Workflow Type').should('be.visible')
        cy.contains('div','Workflow Category').should('be.visible')
        cy.contains('div','Due Date').should('be.visible')
        cy.contains('div','Hold').should('be.visible')
        cy.contains('div','QA Errors').should('be.visible')
        cy.contains('div','Priority').should('be.visible')
        
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})