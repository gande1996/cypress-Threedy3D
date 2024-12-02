/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Job-complexity-Assignment', () => {
    
    beforeEach(() => {
       
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')

        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/jobs/complexity"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs/complexity')) {
                    cy.get('[href="/jobs/complexity"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs/complexity')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    
    it('Listing-Test', ()=>{
        cy.url().should('include', '/jobs/complexity')
        cy.contains('p','complexity').should('be.visible')
        
        let client = "Kohls"
        let tag= "ywlxO"

      //  cy.get('.MuiAutocomplete-endAdornment:eq(0)')
      cy.get('.MuiInputBase-inputAdornedEnd:eq(0)').should('exist')
            .click({ force: true }).wait(2000)
            .type(client).wait(1000)
            .type('{downarrow}').wait(2000).
            
            // .type('{enter}').wait(4000)
            trigger('keydown', {
                key: 'Enter',
            }).wait(4000)
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(client)
                    })
            })

        cy.get('.MuiAutocomplete-endAdornment:eq(2)')
            .should('exist')
            .click({ force: true }).wait(2000)
            .type(tag).wait(3000)
            .type('{downarrow}')
            .type('{enter}').wait(4000)
            // trigger('keydown', {
            //     key: 'Enter',
            // }).wait(4000)
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(tag)
                    })
            })   
    })

    it('Filter-Reset', ()=>{
        cy.url().should('include', '/jobs/complexity')
        
        let client = "Kohls"

        cy.get('.MuiInputBase-inputAdornedEnd:eq(0)')
            .should('exist')
            .click({ force: true }).wait(2000)
            .type(client).wait(3000)
            .type('{downarrow}').
            trigger('keydown', {
                key: 'Enter',
            }).wait(4000)
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(client)
                    })
            })

            cy.contains('span','Reset').click()
            cy.contains('div','___test').should('be.visible')
    })

    it('Export-CSV', ()=>{
        cy.url().should('include', '/jobs/complexity')
        
        let client = "Kohls"

        cy.get('.MuiInputBase-inputAdornedEnd:eq(0)')
            .should('exist')
            .click({ force: true }).wait(2000)
            .type(client).wait(3000)
            .type('{downarrow}').
            trigger('keydown', {
                key: 'Enter',
            }).wait(4000)
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(client)
                    })
            })
   //         cy.get('.MuiButton-containedSecondary').click()
           cy.contains('span','Export CSV').click({force:true})
            
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
})
