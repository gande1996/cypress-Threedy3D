/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

import { commonSelectors as csel } from '../../../support/commonSelectors'

describe('Portal-Client-Sign-In', () => {
    it('Product_Request2', () => {
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
                    cy.wait(12000)
                })
            })
            cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(5)
                .should('exist')
                .click()
                .then(() => {
                    cy.contains('li', 'rahul28@mailinator.com').should('be.visible').click({ force: true })
                    // cy.wait(8000)
                    cy.contains('span', 'Select').should('be.visible').click()
                    cy.contains('Products').should('be.visible', "Products").click()
                    cy.wait(3000)
                    cy.contains('Product Request').should('be.visible', "PRODUCT REQUEST").click()
                    cy.wait(5000)
                    cy.CreateProductRequest('Lamps', 'https://www.amazon.in/', 'amazon219','2','3','5')

                    

                    // cy.get('input[id="title"]').type('lamps')
    
                   
                })

        })

    

    })


//Main
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
                    cy.wait(8000)
                })
            })
            cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(5)
                .should('exist')
                .click()
                .then(() => {
                    cy.contains('li', 'rahul28@mailinator.com').should('be.visible').click({ force: true })
                    cy.wait(5000)
                    cy.contains('span', 'Select').click()
                    cy.contains('Products').should('be.visible', "Products").click()
                    cy.wait(3000)
                    cy.contains('Product Request').should('be.visible', "PRODUCT REQUEST").click()
                    cy.wait(3000)
                    cy.get('input[id="title"]').type('lamps')
                    cy.get('input[id="url"]').type("https://www.amazon.in/")
                    cy.get('input[id="sku"]').type('amazon226')
                    cy.wait(2000)
                    cy.get('[class="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]')
                        .should('exist')
                        .click()
                        .then(() => {
                            cy.contains('li', 'Cricket Products').should('be.visible').click({ force: true })
                            cy.wait(2000)
                            cy.get('input[Id="heightValue"]').type('5')
                            cy.get('input[Id="widthValue"]').type('5')
                            cy.get('input[Id="depthValue"]').type('5')
                            cy.wait(2000)
                            // cy.get('[class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline MuiOutlinedInput-inputMultiline MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]').type("Ramdom")
                            cy.contains('span', 'Urls').click()
                            cy.wait(3000)
                            cy.get('[class="MuiFormLabel-root MuiInputLabel-root jss590 MuiInputLabel-animated"]').click()
                            cy.get('input[Id="url-0"]').type("https://m.media-amazon.com/images/I/51A75O7cvUL._SL1500_.jpg")
                            cy.wait(3000)
                            // cy.get('[class="MuiTouchRipple-root"]').should('have.text', 'Add URL')
                            cy.contains('span', 'Add URL').should('be.visible').click()
                            cy.contains('span', 'Send Request').should('have.text', "Send Request").click()
                        })
                })

        })

    

    })
})
