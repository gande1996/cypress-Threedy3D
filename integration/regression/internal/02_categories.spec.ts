/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Categories', () => {   
    before (() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/client-categories"]').eq(0).click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/client-categories')) {
                    cy.get('[href="/client-categories"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/client-categories')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    it('Category-Table-Display', () => {
        cy.url().should('include', '/client-categories')
        cy.contains('Category Name').click().click()
            .then(() => {
                let names: string[] = [] 
                cy.get('tbody tr td')
                    .each(($el, index) => {
                        if(index % 5 == 2){
                            //names.push($el.text())
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
                expect('tbody tr').to.have.length.of.at.most(10)
            })
    });
    
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })


})