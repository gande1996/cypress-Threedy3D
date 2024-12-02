import {commonSelectors as csel} from '../../../commonSelectors'
import {loginSelectors as logsel} from './_selectors-login'


Cypress.Commands.add('verifyLoginPage', () => {
    cy.contains('h3', 'Log in').should('be.visible')
 //   cy.contains('h5', 'Don’t have an account?').should('be.visible')
    cy.contains('a', 'New Customer Pricing and Sign-up.').should('be.visible')
    cy.get(logsel.emailInput).should('be.visible').and('be.enabled')
    cy.get(logsel.passwordInput).should('be.visible').and('be.enabled')
    //cy.get(logsel.rememberMeCheck).should('be.visible').and('be.enabled')
    cy.get(logsel.loginBtn).should('be.visible').and('be.enabled')
    cy.contains(logsel.forgotPassword,'Forgot Password?').should('be.visible')
    cy.contains(logsel.loginBtn,'Log In').should('be.visible')
    cy.contains('label', 'Remember Me').should('be.visible')    
 })

 Cypress.Commands.add('verifyRegistrationPage', () => {
    cy.contains('h3', 'Create an Account').should('be.visible')
    cy.contains('h5', 'Have an account? ').should('be.visible')
    cy.contains('a', 'Log in').should('be.visible')
    cy.get(logsel.emailInput).should('be.visible').and('be.enabled')
    cy.get(logsel.passwordInput).should('be.visible').and('be.enabled')
    cy.get(logsel.agreeCheck).should('be.visible').and('be.enabled')
    cy.get(logsel.signUpBtn).should('be.visible').and('be.enabled')
    cy.get(logsel.forgotPassword).should('be.visible').and('be.enabled')
    cy.contains(logsel.loginBtn,'Log In').should('be.visible')
    cy.contains('label', 'By signing up, you are agreeing to Nextech’s').should('be.visible')    
 })

 Cypress.Commands.add('verifyForgotPasswordPage', () => {
    cy.contains('h3', 'Reset your password').should('be.visible')
    cy.contains('h5', 'Please enter your email address. We will send you an email to reset your password.').should('be.visible')
    cy.get(logsel.emailInput).should('be.visible').and('be.enabled')
    cy.get(logsel.resetButton).should('be.visible').and('be.enabled')    
 })


// Cypress.Commands.add('searchUser', (option) => {
//     cy.get(sel.searchBox).fill(option)
//     cy.get(sel.searchResultBox).should('be.visible')
//     cy.get(sel.searchResult).first().within(() => {
//         if(option === analyticsData.uuid){
//             cy.get(sel.uuidFirstName).invoke('text').then((text) => {
//                 expect(text).to.include(analyticsData.userName)
//             })
//         }
//         else{
//             cy.get(sel.firstName).invoke('text').then((text) => {
//                 expect(text).to.equal(analyticsData.userName)
//             })
//         }
//     })
//     cy.get(sel.searchResult).first().click()
//     cy.get(sel.tableData).should('be.visible')
//     cy.get(sel.rowData).first().within(() => {
//         cy.get(sel.tableUserData).invoke('text').then((text) => {
//             expect(text).to.equal(analyticsData.userName + ' Test')
//         })
//         cy.get(sel.tableEmailData).invoke('text').then((text) => {
//             expect(text).to.equal(analyticsData.userEmail)
//         })
//         cy.get(sel.tableUuidData).invoke('text').then((text) => {
//             expect(text).to.equal(analyticsData.uuid)
//         })
//     })
// })

// Cypress.Commands.add('clearUser', (option) => {
//     cy.get(sel.searchBox).fill(option)
//     cy.get(sel.searchBox).should('be.visible').clear({ force: true })
//     cy.get(sel.searchResultBox).should('not.exist')
// })