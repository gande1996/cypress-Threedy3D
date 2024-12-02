/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />

import { should } from "chai"

/* eslint-enable */


describe('User-module', () => {
    const email = '01_cypress_dummyuser'+Cypress._.random(0,1e4).toString()+'@gmail.com'
    const password = '01_cypress'+Cypress._.random(0,1e4).toString()
    //const editEmail = '01_cypress_editDummyUser'+Cypress._.random(0,1e4).toString()+'@gmail.com'
    
      before(() => {
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
          
          cy.createUserArtist(email,password)
      })

      it('Assigned-user',()=>{
        cy.assignedUserJob()
        cy.get('#assigned_user').click().type(email)
        .type('{downarrow}').
        wait(2000).trigger('keydown', {
            key: 'Enter',
          })

          cy.wait(3000)
          cy.reload()
          cy.wait(3000)
      })
  
     
     
      after(() => {
  
          /* Admin Logs off */
          cy.log('Log off')
          cy.signOut('internal')
      })
      })
  
  
  