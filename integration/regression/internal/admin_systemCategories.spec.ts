/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />

import { should } from "chai"

/* eslint-enable */


describe('User-module-System-Categories', () => {
    const categoryName = '01_cypressCategory_'+Cypress._.random(0,1e3).toString()
    const editCategoryName = '01_cypressCategory_'+Cypress._.random(0,1e3).toString()
    
      beforeEach(() => {
          /* admin Logs in */
          cy.log('admin logs in')
          cy.login('admin', 'passwordAdmin', 'test')
         // cy.homePage()
          cy.get('li').contains('Admin').click()//.parent().parent().next().children().click()
        cy.get('[href="/system-categories"]').first().click({ force: true }).then(() => {            
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                 expect(currentUrl).to.include('/system-categories')                
            })
         
      })
     
    })
      it('Create-user', () => {
          
          cy.createCategory(categoryName)
          cy.editCategory(categoryName,editCategoryName)
          cy.deleteCategory(editCategoryName)
      })
  
    //   it('edit User',()=>{
    //    //cy.editUser(email,editEmail)
      
        
  
    //    })
  
    //   it('Delete User',()=>{
    //    cy.deleteUser(email)
    //    cy.restoreUser(email)
        
    //   })
     
      afterEach(() => {
  
          /* Admin Logs off */
          cy.log('Log off')
          cy.signOut('internal')
      })
      })
  
  
  