/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Jobs-Model-Compact-Config', () => {
    const configName = `config--dummy123`;
    const newConfigName = `edited-config--dummy123`;
    
    beforeEach(() => {
        // cy.clearCookies()
        // cy.login(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
        // cy.get('li').contains('Jobs').parent().parent().next().children().click()
        // cy.get('[href="/model-compact-config"]').click()
        // cy.wait(3000, {log: false})

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
//cy.homePage()
        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/model-compact-config"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/model-compact-config')) {
                    cy.get('[href="/model-compact-config"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/model-compact-config')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('New-Config', () => {
        cy.contains('New Config').as('newConfig')
            .click()
            .then(() => {
                cy.get('button').contains('Cancel')
                    .click({force: true})
                    .wait(1000);
                cy.get('@newConfig')
                    .should('contain', 'New Config')
                    .click()
                    .then(() => {
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(1)
                            .click({force: true})
                            .type(configName, {force: true})
                            .should('have.value', configName);
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(2)
                            .click({force: true})
                            .type('testing', {force: true})
                            .should('have.value', 'testing');
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(3)
                            .click({force: true})
                            .type('1', {force: true})
                            .should('have.value', '1');
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(1)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(5)
                            .click({force: true})
                            .type('0', {force: true})
                            .should('have.value', '0');
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(6)
                            .click({force: true})
                            .type('1', {force: true})
                            .should('have.value', '1');
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(7)
                            .click({force: true})
                            .type('1', {force: true})
                            .should('have.value', '1');
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(2)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(3)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(4)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(11)
                            .click({force: true})
                            .type('1', {force: true})
                            .should('have.value', '1');
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(5)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(6)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(7)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                        cy.get('.MuiInputBase-root > .MuiSelect-root').eq(8)
                            .click({force: true})
                            .then(() => {
                                cy.get('ul.MuiMenu-list li:nth-child(1)').click({force: true})
                            })
                        cy.wait(2000, {log: false})
                    })
                    .then(() => {
                        cy.get('button').contains('Add')
                            .click({force: true})
                            .wait(1000);
                        cy.get('table tbody tr').contains(configName)
                            .should('exist')
                    })
            })
    })

    it('Edit-Config', () => {
        cy.get('button').contains(configName)
            .click()
            .wait(1000)
            .then(() => {
                cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(1)
                    .click({force: true})
                    .type('{selectall}', {force: true})
                    .type(newConfigName, {force: true})
                    .should('have.value', newConfigName); 
                cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(2)
                    .click({force: true})
                    .type('{selectall}', {force: true})
                    .type('testingEdit', {force: true})
                    .should('have.value', 'testingEdit') 
                cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(3)
                    .click({force: true})
                    .type('{selectall}', {force: true})
                    .type('2', {force: true})
                    .should('have.value', '2');  
                cy.get('.MuiInputBase-root > .MuiSelect-root').eq(1)
                    .click({force: true})
                    .then(() => {
                        cy.get('ul.MuiMenu-list li:nth-child(2)').click({force: true})
                    })
                cy.wait(2000, {log: false})
                cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(5)
                    .click({force: true})
                    .type('{selectall}', {force: true})
                    .type('0.1', {force: true})
                    .should('have.value', '0.1');
                cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(6)
                    .click({force: true})
                    .type('{selectall}', {force: true})
                    .type('0.5', {force: true})
                    .should('have.value', '0.5');
                cy.get('.MuiInputBase-root > .MuiInputBase-input').eq(7)
                    .click({force: true})
                    .type('{selectall}', {force: true})
                    .type('0.4', {force: true})
                    .should('have.value', '0.4');
                cy.get('.MuiInputBase-root > .MuiSelect-root').eq(2)
                    .click({force: true})
                    .then(() => {
                        cy.get('ul.MuiMenu-list li:nth-child(2)').click({force: true})
                    })
                cy.wait(2000, {log: false})
                cy.get('.MuiInputBase-root > .MuiSelect-root').eq(3)
                    .click({force: true})
                    .then(() => {
                        cy.get('ul.MuiMenu-list li:nth-child(3)').click({force: true})
                    })
                cy.wait(2000, {log: false}) 
            })
            .then(() => {
                cy.get('button').contains('Save')
                    .click({force: true})
                    .wait(1000);
                cy.get('table tbody tr').contains(newConfigName)
                    .should('exist')
            })
    })

    it('Delete-Config', () => {
        cy.get('button').contains(newConfigName)
            .click()
            .wait(2000)
            .then(() => {
                cy.get('button').contains('Delete')
                    .click({force: true})
                    .wait(1000);
                cy.contains('h2','Delete confirmation').should('be.visible') 
                cy.contains('p','Are you sure want to delete this item(s)?').should('be.visible')   
                cy.get('.MuiDialogActions-root > .MuiButtonBase-root').contains('Delete')
                    .click({force: true})
                    .wait(1000);
                cy.get('table tbody tr')
                    .each(($tr) => {
                        expect($tr).to.not.contain(newConfigName)
                    })
            })
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
})