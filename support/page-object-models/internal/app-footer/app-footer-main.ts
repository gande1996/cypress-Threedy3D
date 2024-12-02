import { appFooterSelectors as appFooter } from './_selectors-app-footer'

Cypress.Commands.add('verifyAppFooterPresent', () => {
   cy.wait(3000)
   cy.get(appFooter.appFooterPanel).should('exist').within(() => {
      cy.contains(appFooter.links, 'Home').should('exist').and('be.visible').and('have.attr', 'href', '/')
      cy.contains(appFooter.links, 'My Models').should('exist').and('be.visible').and('have.attr', 'href', '/products')
      cy.contains(appFooter.links, 'Billing').should('exist').and('be.visible').and('have.attr', 'href', '/account-settings/billing-history')
      cy.contains(appFooter.links, 'Overview').should('exist').and('be.visible').and('have.attr', 'href', '/overview')
   //   cy.contains(appFooter.links, 'Support').should('exist').and('be.visible').and('not.have.attr', 'href')
      cy.contains(appFooter.links, 'How-To-Videos').should('exist').and('be.visible').and('have.attr', 'href', '/how-it-works')
      cy.contains(appFooter.links, 'Contact').should('exist').and('be.visible').and('have.attr', 'href', '/support-and-help')
      cy.contains('span', '1069 Main Street #144 ').should('exist').and('be.visible')
      cy.contains('span', 'Holbrook NY 11741').should('exist').and('be.visible')
      cy.contains('span', 'Sitemap').should('exist').and('be.visible')
      //Terms & Conditions
      cy.scrollTo('bottom').contains('a','Terms & Conditions').should('exist').and('be.visible').and('have.attr', 'href', 'https://www.nextechar.com/ar-solutions-terms')
      cy.contains('a', 'Privacy Policy').should('exist').and('be.visible').and('have.attr', 'href', 'https://www.nextechar.com/nextech-ar-solutions-privacy-policy')
      cy.contains('span', 'Copyright ©').should('exist').and('be.visible')
      cy.contains('span', '2024').should('exist').and('be.visible')
      cy.contains('span', 'Nextech AR Solutions Inc.').should('exist').and('be.visible')
      //brandLogoPanel
   // cy.get(appFooter.brandLogoPanel).should('exist').and('be.visible')

   })
})


Cypress.Commands.add('navigateToPage', (pageName) => {
   cy.log(`/* Navigate to ${pageName} Page */`)
   cy.get(appFooter.appFooterPanel).should('exist').within(() => {

   //Contact Us
   //cy.contains('span', 'Contact Us').should('exist').next().within(() => {
      cy.contains(appFooter.links, pageName).scrollIntoView().should('exist').and('be.visible').click().then(() => {
         if (pageName == 'Home') {
            cy.url().should('include', 'threedy.ai/')
         } else if (pageName == 'My Models') {
            cy.url().should('include', '/products')
         } else if (pageName == 'Billing') {
            cy.url().should('include', '/account-settings/billing-history')
         } else if (pageName == 'Overview') {
            cy.url().should('include', '/overview')
         } else if (pageName == 'How-To-Videos') {
            cy.url().should('include', '/how-it-works')
         } else if (pageName == 'Contact') {
            cy.url().should('include', '/support-and-help')
         }
      })
   })
})

// Cypress.Commands.add('navigateProductPage', () => {
//    cy.log('/* Navigate to Product Page */')
//    cy.get(appFooter.appFooterPanel).should('exist').within(() => {
//       cy.contains(appFooter.links, 'My Models').should('exist').and('be.visible').and('have.attr', 'href', '/products').click().then(() => {
//          cy.url().should('include', '/products')

//       })
//    })
//    cy.verifyAppFooterPresent()
// })



