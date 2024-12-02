/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />

import { accountsData } from "../../../../fixtures/data/accounts"

/* eslint-enable */


describe('SelfServ-Profile info', () => {

    beforeEach(() => {
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')
        cy.viewport(1600, 1000)
    })
   
    it('verify profile information page', () => {
        /* verify Billing info  */
        cy.log('verify profile info')
        cy.navigateToAccounts()
        cy.verifyAccountPage()
        
    })
   
    it('update profile information', () => {
        /* verify Billing info  */
        cy.log('update profile info')
        cy.navigateToAccounts()
        cy.verifyAccountPage()
        cy.editProfile(accountsData.firstName,accountsData.lastName,accountsData.phoneNumber)
        cy.contains('button','Edit Profile').click({force:true})
     cy.wait(10000)
        const filePath= 'attachments/model.jpg'
        cy.editProfilePhoto(filePath)
        
    })
    afterEach(() => {
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')
    })

})
