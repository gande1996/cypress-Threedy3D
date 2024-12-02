/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

import { registrationData } from '../../../../fixtures/data/registrationData'
import {loginSelectors as logsel} from '../../../../support/page-object-models/internal/login/_selectors-login'
const companyName = 'testCompany'+Cypress._.random(0,1e5).toString()
 describe('SelfServe-upgrade plan', () => {
    const domainName = Cypress.env('domain')

 beforeEach(() => {         
        /* Client Logs in */
       /* Client launches application */
       cy.log('client launch application')
       cy.launchApp('test')
    })
    it('Create model notification when registered new account', () => {
        const emailId =  'autotest'+Cypress._.random(0,1e5).toString()+domainName
        cy.get(logsel.registrationLink).should('be.visible').and('have.attr', 'href', '#').click({ force: true })
        cy.verifyCreateAccountPage()
        cy.enterAccountDetails(emailId, registrationData.password, registrationData.isTermsSelected)
        cy.verifyLetsGetStartedPage()
        cy.contains('button', 'Let’s get started').should('be.visible').click({ force: true })
        cy.enterAboutYourself(registrationData.firstName, registrationData.lastName,companyName, registrationData.phoneNumber)
        cy.verifyPlanPage()
        cy.selectPlan('starter')
        cy.contains('button', 'Confirm Plan').should('be.visible').and('be.enabled').click({ force: true })
        cy.wait(2000)
        cy.contains('button', 'Select').eq(0).should('be.visible').click({ force: true })
        cy.get('[class*="MuiDialogContent-root jss"]').should('exist').and('be.visible')
        cy.contains('button', 'Confirm Billing Option').should('be.visible').and('be.enabled').click({ force: true })
        cy.url().should('include', '/user-detail-init/')
        cy.enterBillingInformation(registrationData.firstName, registrationData.lastName, registrationData.street, registrationData.city, registrationData.province, registrationData.country, registrationData.zipCode, registrationData.saveBillings, registrationData.cardNumber, registrationData.expiry, registrationData.cvv, registrationData.isTerms, registrationData.isPromotion)
        cy.contains('button', 'Confirm and Pay').should('be.visible').and('be.enabled').click({ force: true })
        cy.verifyRegistrationConfirmPage()
        cy.contains('button', 'Skip, and go to dashboard').should('be.visible').click({ force: true })
        cy.navigateToUpgrade()
        cy.contains('button', 'Upgrade Plan').should('be.visible').click({force:true})
        cy.contains('button', 'Confirm Plan').should('be.visible').and('be.enabled').click({ force: true })
        cy.contains('h3','Select your billing period').should('be.visible')
        cy.contains('button', 'Select').eq(0).should('be.visible').click({ force: true })
        cy.contains('button', 'Confirm Billing Option').should('be.visible').and('be.enabled').click({ force: true })
        cy.url().should('include', '/upgrade')
        cy.contains('h3','Enter your billing and payment information').should('be.visible')
        cy.enterBillingInformationUpgrade(registrationData.firstName, registrationData.lastName, registrationData.street, registrationData.city, registrationData.province, registrationData.country, registrationData.zipCode, registrationData.saveBillings, registrationData.cardNumber, registrationData.expiry, registrationData.cvv, registrationData.isTerms, registrationData.isPromotion)
        cy.contains('button', 'Confirm and Pay').should('be.visible').and('be.enabled').click({ force: true })

        // cy.url().should('eq', 'https://portal-test.threedy.ai/')
        // cy.log('user create a model')
        // cy.contains('span','Create a new model').should('be.visible').click({force:true})
        // cy.createModelData(createModelData.categoryName, createModelData.modelTitleName, createModelData.skuNumber, createModelData.productURL,
        //     createModelData.unitOfMeasurement, createModelData.height, createModelData.width, createModelData.depth, createModelData.path)
        // cy.contains('button', 'Got it').should('be.visible').click({ force: true })
        // cy.verifyEmailNotification(emailId,'createmodel')
        
    })
    afterEach(() => {
           
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })
})
