/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-MeshLib-Tags', () => {
    const tagName = 'cypress_test_tag'+Cypress._.random(0,1e5).toString()
    const editName = 'test_edit_cypress'+Cypress._.random(0,1e5).toString()

    beforeEach(() => {
      
         /* admin Logs in */
         cy.log('admin logs in')
         cy.login('admin', 'passwordAdmin', 'test')
        // cy.homePage()
         cy.get('li').contains('Meshes').siblings('li').click()
         cy.get('[href="/meshlib_tags"]').click().then(() => {
             cy.wait(3000, { log: false })
             cy.url().then((currentUrl) => {
                 cy.log(currentUrl)
                 if (currentUrl.indexOf('/job_tags')) {
                     cy.get('[href="/meshlib_tags"]').eq(1).click({ force: true })
                     expect(currentUrl).to.include('/meshlib_tags')
                 }
             })
         })
         cy.contains('p', 'Rows per page')
         cy.wait(3000, { log: false })
    })

    it('Tag-Table-Display', () => {
        cy.url().should('include', '/meshlib_tags')
        cy.contains('Tag Name').click().click()
            .then(() => {
                let names: string[] = []
                cy.get('tbody tr td')
                    .each(($el, index) => {
                        if(index % 4 == 1){
                            names[index] = $el.text()
                        }
                    })
                cy.wrap(names).should('deep.eq', names.sort())
            })
        cy.get('p').contains('Rows per page:').next()
            .click()
            .then(() => {
                cy.get('li[data-value="10"]').click()
            })
            .then(() => {
                expect('tbody tr').to.have.length.of.at.most(10)
            })
    });

    it('New-Tag', () => {
        cy.contains('New Tag').as('newTag')
            .click()
            .then(() => {
                cy.get('button[aria-label="close"]')
                    .click()
                    .wait(1000);
                cy.get('@newTag')
                    .should('contain', 'New Tag')
                    .click()
                    .then(() => {
                        cy.get('input[type="text"]')
                            .type(tagName)
                            .should('have.value', tagName);
                        cy.get('button[class*="MuiButton-textPrimary"]')
                            .should('contain', 'Create')
                            .and('not.be.disabled')
                            .click();
                    })
                    .then(() => {
                        cy.contains('Tag ID').click({force: true})
                        cy.get('table tbody tr').contains(tagName)
                            .should('exist')
                    })
            })
    })

    it('Edit-Tag', () => {
        cy.contains('Tag ID').click({force: true})
        cy.get('table tbody tr:first')
            .should('contain', tagName)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get('[aria-label="select merge strategy"]').click()
                cy.get('ul li:last').should('contain', 'Edit').click()
            })
        cy.get('input[type="text"]')
            .type('{selectall}')
            .type(editName)
            .should('have.value', editName)
            .then(() => {
                cy.get('button[class*="MuiButton-textPrimary"]')
                    .should('contain', 'Edit')
                    .and('not.be.disabled')
                    .click()
                     cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]',{timeout:90000}).should('not.exist')
            })
        cy.get('table tbody tr').contains(editName)
            .should('exist')
    })

    it('Delete-Tag', () => {
        cy.contains('Tag ID').click({force: true})
        cy.get('table tbody tr:first')
            .should('contain', 'cypress')
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get('[aria-label="select merge strategy"]').click()
                cy.get('ul li:first').should('contain', 'Delete').click()
            })
        cy.get('button[class*="MuiButton-textPrimary"]')
            .should('contain', 'Delete')
            .and('not.be.disabled')
            .click().wait(1500, {log: false})
        cy.get('table tbody tr')
            .each(($tr) => {
                expect($tr).to.not.contain('edit')
            })
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
});