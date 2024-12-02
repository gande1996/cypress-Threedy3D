/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */
const componentName = 'cypress_test_component'+Cypress._.random(0,1e5).toString()
const editNameComponent = 'test_edit_cypress'+Cypress._.random(0,1e5).toString()
describe('Portal-component', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Admin').click()//parent().parent().next().children().click()
        cy.get('[href="/components"]').first().click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                expect(currentUrl).to.include('/components')
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    it('Component-Table-Display', () => {
        cy.url().should('include', '/components')
        cy.contains('Component Name').click().click()
            .then(() => {
                let names: string[] = []
                cy.get('tbody tr td')
                    .each(($el, index) => {
                        if(index % 5 == 2){
                            names[index]= $el.text()
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

    it('New-Component', () => {
        cy.contains('New Component').as('newComponent')
            .click()
            .then(() => {
                cy.get('button[aria-label="close"]')
                    .click()
                    .wait(1000);
                cy.get('@newComponent')
                    .should('contain', 'New Component')
                    .click()
                    .then(() => {
                        cy.get('input[type="text"]')
                            .type(componentName)
                            .should('have.value', componentName);
                        cy.get('button[class*="MuiButton-textPrimary"]')
                            .should('contain', 'Create')
                            .and('not.be.disabled')
                            .click();
                    })
                    .then(() => {
                        cy.contains('Component ID').click({force: true})
                        cy.get('table tbody tr').contains(componentName)
                            .should('exist')
                    })
            })
    })

    it('Edit-Component', () => {
        cy.contains('Component ID').click({force: true}).wait(1500, {log: false})
        cy.get('table tbody tr:first')
            .should('contain', componentName)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get('[aria-label="select merge strategy"]').click()
                cy.get('ul li:last').should('contain', 'Edit').click()
            })
        cy.get('input[type="text"]')
            .type('{selectall}')
            .type(editNameComponent)
            .should('have.value', editNameComponent)
            .then(() => {
                cy.get('button[class*="MuiButton-textPrimary"]')
                    .should('contain', 'Edit')
                    .and('not.be.disabled')
                    .click()
            })
        cy.get('table tbody tr').contains(editNameComponent)
            .should('exist')
    })

    it('Delete-Component', () => {
        cy.contains('Component ID').click({force: true}).wait(3000, {log: false})
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
                expect($tr).to.not.contain(editNameComponent)
            })
    })
    
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })


})