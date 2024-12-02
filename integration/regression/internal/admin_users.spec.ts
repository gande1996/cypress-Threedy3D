/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />

import { should } from "chai"

/* eslint-enable */


describe('User-module', () => {
    const email = '01_cypress_dummyuser'+Cypress._.random(0,1e4).toString()+'@gmail.com'
    const editEmail = '01_cypress_editDummyUser'+Cypress._.random(0,1e4).toString()+'@gmail.com'
    
      beforeEach(() => {
          /* admin Logs in */
          cy.log('admin logs in')
          cy.login('admin', 'passwordAdmin', 'test')
         // cy.homePage()
          cy.get('li').contains('Admin').click()//.parent().parent().next().children().click()
        cy.get('[href="/users"]').first().click({ force: true }).then(() => {            
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                 expect(currentUrl).to.include('/users')                
            })
         
      })
      cy.contains('span','New User').should('be.visible') 
    })
      it('Create-user', () => {
          
          cy.createUser(email)
      })
  
      it('edit-User',()=>{
       //cy.editUser(email,editEmail)
       cy.editPassword(email)
        
  
       })
  
      it('Delete-User',()=>{
       cy.deleteUser(email)
       cy.restoreUser(email)
        
      })
     
      afterEach(() => {
  
          /* Admin Logs off */
          cy.log('Log off')
          cy.signOut('internal')
      })
      })
  
  
  