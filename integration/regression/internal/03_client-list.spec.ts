/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */
const clientName = '002 - cypress TEST CLIENT'+Cypress._.random(0,1e5).toString()
const editName_Client = '002 - test_edit_cypress'+Cypress._.random(0,1e5).toString()
describe('Portal-client-list', () => {   
    beforeEach (() => {
      /* admin Logs in */
      cy.log('admin logs in')
      cy.login('admin', 'passwordAdmin', 'test')
      //cy.homePage()
        cy.get('li').contains('Admin').click()//.parent().parent().next().children().click()
        cy.get('[href="/clients"]').first().click({ force: true }).then(() => {            
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                 expect(currentUrl).to.include('/client')                
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    it('Client-Table-Display', () => {
        cy.viewport(1660, 1000)
        let client = '123test', // Test assumes the data in portal-test has not changed
        client_id = '1142'
        
        cy.url().should('include', '/clients')
        cy.contains('Client Name').click()
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


            
        cy.get('div[placeholder="Search client"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(client)
                    .should('have.value', client)
            })
        cy.wait(3000, { log: false })
        cy.get('table tbody tr td:first').contains(client_id)
            .click({ force: true })
            .then(() => {
                cy.url().should('contain', 'clients')
                cy.get('table tbody tr td:nth-child(4)').contains(client)
            })   

    })
    it('New-Client', () => {
        cy.viewport(1660, 1000)
        cy.createClient(clientName)
        
    })

    it('Edit-Client', () => {
        cy.viewport(1660, 1000)
        cy.editClient(clientName,editName_Client)
      
    })

    it('Archive-Client', () => {
        cy.viewport(1660, 1000)
        cy.archiveClient(editName_Client)
      
    })

    it('Restore-Client', () => {
        cy.viewport(1660, 1000)
        cy.restoreClient(editName_Client)
      
    })
    // it('Archive Client after restoring', () => {
    //     cy.viewport(1660, 1000)
    //     cy.archiveClient(editName_Client)
    // })
    
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })


})