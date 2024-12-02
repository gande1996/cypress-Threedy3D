/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

import { commonSelectors as csel } from '../../../support/commonSelectors'

describe('Portal-Client-Sign-In', () => {
    it('validate-user-successfully-sing-in-and-sign-out', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        /* Admin Logs off */
        cy.log('Log off external')
        cy.wait(3000)
        cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]').eq(0).should('be.visible').click({ force: true }).then(() => {
            cy.wait(2000)
            cy.window().then((win) => {
                win.eval('document.getElementById("logout-btn").click()');
            })
        })
    })

    it('validate-invalid-login-error', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('invalidUserId', 'userPassword', 'test')
        cy.wait(2000)
        cy.get(csel.errorMessage).should('exist').should('be.visible').and('have.text', 'Your account has been blocked after multiple consecutive login attempts.') //Wrong email or password.
        cy.verifyAppBarHide()
    })

    it('Product Request', () => {
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        cy.get('[href="/products"]').eq(1).click({ force: true }).then((url) => {
            cy.log('------------------' + url)
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/products')) {
                    cy.get('[href="/products"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/products')
                }
            })
            cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]').eq(0).should('be.visible').click({ force: true }).then(() => {
                cy.wait(2000)
                cy.window().then((win) => {
                    win.eval('document.getElementById("switch-user").click()');
                    cy.wait(5000)
                cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]')
                .should('exist')
                .click()
                cy.contains('li', 'rahul28@mailinator.com').should('be.visible').click({ force: true })
                    cy.get('tbody tr:first').should('exist').and('contain', "rahul28@mailinator.com")
                })
            })
            
                .then(() => {
                    cy.contains('li', 'rahul28@mailinator.com').should('be.visible').click({ force: true })
                    cy.get('tbody tr:first').should('exist').and('contain', "rahul28@mailinator.com")
                })

        })


    })

})