/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


import { createModelData } from '../../../fixtures/data/createModelData'
import { commonSelectors as csel } from '../../../support/commonSelectors'

describe('SELFSERVE-SMOKE-Create Model', () => {

    beforeEach(() => {
        Cypress.Cookies.debug(true)
        cy.clearCookies()
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client2', 'clientPassword2', 'test')
                  
    })
    /**C277*/ 
    it('validate user successfully create model from home page', () => {

        cy.navigateToCreateModel()
        /* user create a model  */
        cy.log('user create a model')
        cy.createModelData(createModelData.categoryName, createModelData.modelTitleName, createModelData.skuNumber, createModelData.productURL,
            createModelData.unitOfMeasurement, createModelData.height, createModelData.width, createModelData.depth, createModelData.path)
        cy.contains('button', 'Got it').should('be.visible').click({ force: true })


    })
    /**C278*/ 
    it('validate user successfully create model from My Models page', () => {

        /* user navigate to My Models page*/
        cy.log(' user navigate to My Models page')
        cy.navigateProductPage()
        cy.contains('button', 'Create New Model').should('be.visible').click({ force: true })
        /* user create a model  */
        cy.log('user create a model')
        cy.createModelData(createModelData.categoryName, createModelData.modelTitleName, createModelData.skuNumber, createModelData.productURL,
            createModelData.unitOfMeasurement, createModelData.height, createModelData.width, createModelData.depth, createModelData.path)
        cy.contains('button', 'Got it').should('be.visible').click({ force: true })

    })
    // additional scenarios 
    // sku already present 
    // maximum sku no hit level

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })





})