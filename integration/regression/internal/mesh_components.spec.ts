/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Mesh-Component', () => {
    const componentName = 'cypress_test_component'+Cypress._.random(0,1e5).toString()
    const editName = 'test_edit_cypress'+Cypress._.random(0,1e5).toString()

    beforeEach(() => {
      
         /* admin Logs in */
         cy.log('admin logs in')
         cy.login('admin', 'passwordAdmin', 'test')
        // cy.homePage()
         cy.selectMeshType('/components')
        
    })

    it('Component-Listing-Display', () => {
        cy.verifyComponentTable('/components','Component Name')
        
    });

    it('New-Component', () => {
        cy.createMesh('New Component',componentName)
       
    })

    it('Edit-Component', () => {
        cy.editMesh('Component ID',componentName,editName)
       
    })

    it('Delete-Component', () => {
        cy.deleteMesh('Component ID',editName)
       
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
});