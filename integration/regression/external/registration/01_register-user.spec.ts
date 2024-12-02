/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

import { createModelData } from '../../../../fixtures/data/createModelData'
import { registrationData } from '../../../../fixtures/data/registrationData'
import { loginSelectors as logsel } from '../../../../support/page-object-models/internal/login/_selectors-login'
import { registrationSelectors as regsel } from '../../../../support/page-object-models/internal/registration/_selectors-registration'
import {randFullName, randUserName } from '@ngneat/falso'
describe('SelfServe-Negative test - Registration', () => {
    beforeEach(() => {
        /* Client launches application */
        cy.log('client launch application')
        cy.launchApp('test')

    })
    it('Registering existing user error', () => {
        cy.get(logsel.registrationLink).should('be.visible').and('have.attr', 'href', '#').click({ force: true })
        cy.verifyCreateAccountPage()
        cy.get(regsel.email).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Email Address').clear().type('testnextechar1@gmail.com')
        cy.get(regsel.password).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Password').clear().type(registrationData.password)
        cy.get(regsel.confirmPassword).should('be.visible').type(registrationData.password)
        cy.get(regsel.agreeCheck).should('exist').and('not.be.checked').check({ force: true })
        cy.get(regsel.signUpBtn).should('be.visible').and('be.enabled').click({ force: true })
        cy.get('[id="err-msg-for-email"]').should('be.visible').and('have.text', 'Email is already present in the system')
        cy.url().should('not.include', '/user-detail-init/')
        cy.url().should('include', '/login')

    })

    it('Registering invalid email address', () => {
        cy.get(logsel.registrationLink).should('be.visible').and('have.attr', 'href', '#').click({ force: true })
        cy.verifyCreateAccountPage()
        cy.get(regsel.email).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Email Address').clear().type('testnextechar1gmail.com')
        cy.get(regsel.password).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Password').clear().type(registrationData.password)
        cy.get(regsel.confirmPassword).should('be.visible').and('have.attr', 'placeholder', 'Confirm your Password').type(registrationData.password)
        cy.get(regsel.agreeCheck).should('exist').and('not.be.checked').check({ force: true })
        cy.get(regsel.signUpBtn).should('be.visible').and('be.enabled').click({ force: true })
        cy.get('[id="err-msg-for-email"]').should('be.visible').and('have.text', 'Email is not valid.')
        cy.url().should('not.include', '/user-detail-init/')
        cy.url().should('include', '/login')
       
       
    })
    it('Registering invalid password', () => {
        cy.get(logsel.registrationLink).should('be.visible').and('have.attr', 'href', '#').click({ force: true })
        cy.verifyCreateAccountPage()
        cy.get(regsel.email).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Email Address').clear().type(Cypress._.random(0, 1e5).toString()+'@gmail.com')
        cy.get(regsel.password).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Password').clear().type('Test123')
        cy.get(regsel.confirmPassword).should('be.visible').and('have.attr', 'placeholder', 'Confirm your Password').clear().type('Test123')
        cy.get(regsel.agreeCheck).should('exist').and('not.be.checked').check({ force: true })
        cy.get(regsel.signUpBtn).should('be.visible').and('be.enabled').click({ force: true })
        //cy.get('[id="err-msg-for-password"]').should('be.visible').and('have.text', '*** At least 8 characters in length**, but the text was *** At least 8 characters in length\n* Contain at least 3 of the following 4 types of characters:\n * lower case letters (a-z)\n * upper case letters (A-Z)\n * numbers (i.e. 0-9)\n * special characters (e.g. !@#$%^&*)**')
        cy.contains('div', '* Contain at least 3 of the following 4 types of characters:').should('be.visible')
        cy.contains('div', ' * lower case letters (a-z)').should('be.visible')
        cy.contains('div', '* upper case letters (A-Z)').should('be.visible')
        cy.contains('div', '* numbers (i.e. 0-9)').should('be.visible')
        cy.contains('div', ' * special characters (e.g. !@#$%^&*)').should('be.visible')
         
        cy.url().should('not.include', '/user-detail-init/')
        cy.url().should('include', '/login')

    })
    it('Registering password and confirm password not matching error', () => {
        cy.get(logsel.registrationLink).should('be.visible').and('have.attr', 'href', '#').click({ force: true })
        cy.verifyCreateAccountPage()
        cy.get(regsel.email).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Email Address').clear().type('testnextechar1@gmail.com')
        cy.get(regsel.password).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Password').clear().type(registrationData.password)
        cy.get(regsel.confirmPassword).should('be.visible').type('registration')
        cy.get(regsel.agreeCheck).should('exist').and('not.be.checked').check({ force: true })
        cy.get(regsel.signUpBtn).should('be.visible').and('be.enabled').click({ force: true })
        cy.get('[id="err-msg-for-password"]').should('be.visible').and('have.text', 'Password and the confirmation are not the same')
        cy.url().should('not.include', '/user-detail-init/')
        cy.url().should('include', '/login')

    })
})
describe('SelfServe-Registration', () => {
    const domainName = Cypress.env('domain')
    beforeEach(() => {
        /* Client launches application */
        cy.log('client launch application')
        cy.launchApp('test')

    })
    it.skip('successful user registration', () => {
        const emailId =  'autoTest'+Cypress._.random(0,1e5).toString()+domainName
        const companyName ='Nextech'+Cypress._.random(0,1e5).toString()
        cy.get(logsel.registrationLink).should('be.visible').and('have.attr', 'href', '#').click({ force: true })
        cy.verifyCreateAccountPage()
        cy.enterAccountDetails(emailId, registrationData.password, registrationData.isTermsSelected)
        cy.verifyLetsGetStartedPage()
        cy.contains('button', 'Let’s get started').should('be.visible').click({ force: true })
        cy.enterAboutYourself(registrationData.firstName, registrationData.lastName, companyName, registrationData.phoneNumber)
        cy.verifyPlanPage()
        cy.selectPlan('starter')
        cy.wait(5000)
        cy.contains('button', 'Confirm Plan').scrollIntoView().should('be.visible').and('be.enabled').click({ force: true })
        cy.contains('button', 'Select').eq(0).should('be.visible').click({ force: true })
        cy.get('[class*="MuiDialogContent-root jss"]').should('exist').and('be.visible')
        cy.contains('button', 'Confirm Billing Option').should('be.visible').and('be.enabled').click({ force: true })
        cy.enterBillingInformation(registrationData.firstName, registrationData.lastName, registrationData.street, registrationData.city, registrationData.province, registrationData.country, registrationData.zipCode, registrationData.saveBillings, registrationData.cardNumber, registrationData.expiry, registrationData.cvv, registrationData.isTerms, registrationData.isPromotion)
        cy.contains('button', 'Confirm and Pay').should('be.visible').and('be.enabled').click({ force: true })
        cy.verifyRegistrationConfirmPage()
        cy.contains('button', 'Skip, and go to dashboard').should('be.visible').click({ force: true })
        //cy.url().contains( 'threedy.ai/')
       
    })
    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')

    })
})
