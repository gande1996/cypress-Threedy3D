import { appBarSelectors as appsel } from './_selectors-app-bar'

Cypress.Commands.add('verifyAppBarPresent', () => {
   cy.get(appsel.appbarPanel).should('exist').within(() => {
      cy.get(appsel.homeMenu).should('exist').and('be.visible')
      cy.contains(appsel.homeMenu,'Home').should('exist').and('be.visible')
      cy.get(appsel.brandLogoPanel).should('exist')
      cy.get(appsel.overViewMenu).should('exist').and('be.visible')
      cy.contains(appsel.overViewMenu,'Overview').should('exist').and('be.visible')
      cy.get(appsel.myModelMenu).should('exist').and('be.visible')
      cy.contains(appsel.myModelMenu,'My Models').should('exist').and('be.visible')
      cy.get(appsel.notificationIcon).should('exist').and('be.visible')
      cy.get(appsel.profileBtnIcon).should('exist').and('be.visible')
   })
})

Cypress.Commands.add('verifyAppBarHide', () => {
   cy.get(appsel.appbarPanel).should('not.exist')
})

Cypress.Commands.add('navigateHomePage', () => {
    cy.log('/* Navigate to Home Page */')
    cy.get(appsel.homeMenu).should('be.visible').trigger('mouseover').click().then(() => {
        cy.url().should('include', 'threedy.ai/')
        cy.verifyHomePage('external')        
    })
    cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateProductPage', () => {
   cy.log('/* Navigate to Product Page */')
   cy.get(appsel.myModelMenu).should('be.visible').trigger('mouseover').click().then(() => {
       cy.url().should('include', '/products')
       //cy.verifyProductPage()       
   })
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToResourcesPage', (submenu) => {
   cy.contains('span', 'Resources').should('be.visible').click({ force: true })
   if(submenu === 'How-To-Videos'){     
      cy.contains(appsel.resourceHowItWorksMenu, 'How-To-Videos').click({ force: true })   
      //cy.get('body').type('{esc}', {force:true})
      cy.url().should('include', '/how-it-works')
      cy.verifyAppBarPresent()
      cy.contains('p', 'How it works').should('be.visible')
      cy.verifyTutorialPage()      

   }else if (submenu === 'Enterprise'){
      cy.contains(appsel.resourceEnterpriseMenu, 'Enterprise').click({ force: true })      
      cy.url().should('include', '/enterprise-contact')
      cy.verifyAppBarPresent()
      cy.contains('p', 'Why build with enterprise?').should('be.visible')
      cy.verifyEnterpriseContactUsPage()
   }else if (submenu === 'Support and Help'){
      cy.contains(appsel.resourceSupportHelp, 'Support and Help').click({ force: true })      
      //cy.get('[data-testid="drop-container"]').should('exist').and('be.visible')
      cy.verifyAppBarPresent()
      cy.contains('h1', 'Submit a request or leave us a question.').should('be.visible')
      cy.verifyContactUsPage()     
   }
  
})


