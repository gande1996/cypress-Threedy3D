/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Event-Reports', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({force:true})
    })

    it('Client-report-module', () => {
        cy.wait(2000)
        cy.viewport(1660, 1000) 
        cy.selectReport('/events-report','Events Report')
        cy.verifyEventSelected('job.client_review', 10)
        cy.log("here now")
        cy.verifyEventSelected('user_invites.created', 8)
        cy.log("here")
        cy.verifyEventSelected('job.deleted', 28)
        cy.verifyMultipleEventSelected('job.client_review','job.deleted','tester@cypress.tests',10,19,11)
        cy.validateEventReportPage()
               
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
