/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../../support/index.d.ts" />
/* eslint-enable */

import { createModelData } from '../../../../fixtures/data/createModelData'
import { commonSelectors as csel } from '../../../../support/commonSelectors'

describe('SelfServe-My Models', () => {

    beforeEach(() => {

        cy.clearCookies()
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client2', 'clientPassword2', 'test')

        cy.navigateToCreateModel()

        /* user create a model  */
        cy.log('user create a model')
        cy.createModelData(createModelData.categoryName, createModelData.modelTitleName, createModelData.skuNumber, createModelData.productURL,
            createModelData.unitOfMeasurement, createModelData.height, createModelData.width, createModelData.depth, createModelData.path)
        cy.contains('button', 'Got it').should('be.visible').click({ force: true })

    })

    it('validate created model present in product list', () => {

        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()

        /* verify product page */
        cy.log('verify product page ')
        cy.verifyProductPage()
    })

    it('search model', () => {

        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            cy.searchModel(skuId.modelName)
        })
    })
    it('create model and verify search details ', () => {

        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        /**Search and open model */
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            cy.searchModel(skuId.modelName)
            cy.openModel(skuId.modelName)
        })
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })



})


describe('SelfServe-Model details', () => {

    beforeEach(() => {
        cy.clearCookies()
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client2', 'clientPassword2', 'test')
        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
    })

    it('validate layout ', () => {
        /**Search and open model */
           cy.get('button span[class="MuiIconButton-label"] *>path[d*="M4"]').should('exist').click({force:true})
           cy.contains('Model Title').should('not.exist')
           cy.contains('Status').should('not.exist')
           cy.contains('Configurator').should('not.exist')
           cy.contains('Categories').should('not.exist')
           cy.contains('Modified').should('not.exist')
           cy.contains('Total Clicks').should('not.exist')
           cy.get('button span[class="MuiIconButton-label"] *>path[d*="M3"]').should('exist').click({force:true})
           cy.contains('Model Title').should('exist')
           cy.contains('Status').should('exist')
           cy.contains('SKU').should('exist')
           cy.contains('Configurator').should('exist')
           cy.contains('Categories').should('exist')
           cy.contains('Modified').should('exist')
           cy.contains('TOTAL clicks').should('exist')
    })
    it('search model by number', () => {

        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        /**Search and open model */
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            cy.searchModel(3)
            cy.get('[style="margin: auto 0px auto 5px;"]').each(($el)=>{

                expect($el.text()).to.include(3)
            })
            //cy.openModel(skuId.modelName)
        })
    })

    it('search model by status Approved and validate model details', () => {
        /**Search and open model */
        //cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            //cy.searchModel(skuId.modelName)
           
            cy.FilterModelByStatus('Approved')
            cy.openModel('Toggle Testing 07142023')
            cy.verifyModelDetails('Approved')
            cy.verifyProductDetailsData('Toggle Testing 07142023')
            //createModelData.modelTitleName
        //})
    })
    it('search model by status In-Progress and validate model details', () => {

        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        /**Search and open model */
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            //cy.searchModel(skuId.modelName)
            cy.FilterModelByStatus('In Progress')
            cy.openModel('QaTestModel')
            cy.verifyModelDetails('In Progress')
            cy.verifyProductDetailsData('QaTestModel')
            //createModelData.modelTitleName
        })
    })
    it('search model by status In Review and validate model details', () => {
        // add step to check it is configurator or not         
        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        /**Search and open model */
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            cy.FilterModelByStatus('In Review')
            cy.openModel('QaTestModel')
            cy.verifyModelDetails('In Review')
            cy.verifyProductDetailsData('QaTestModel')
        })
    })
    it('search model by Approved status and validate reference and model setting section', () => {
        // add step to check it is configurator or not 

        
        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
        /**Search and open model */
        cy.readFile('cypress/fixtures/modelId.json').then((skuId) => {
            cy.FilterModelByStatus('Approved')
            cy.openModel('Toggle Testing 07142023')
            cy.contains('span','Reference Photos').should('be.visible').click({force:true})
            cy.productDetailsSections('Approved')           
            cy.contains('span','Model Settings').should('be.visible').click({force:true})
            cy.modelSettingSections('Approved')
        })
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('external')

    })


})

describe('SelfServe-Sort models', () => {

    beforeEach(() => {
        cy.clearCookies()
        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client2', 'clientPassword2', 'test')
        /* user navigate to the product page */
        cy.log('user navigate to the product page')
        cy.navigateProductPage()
        cy.verifyProductPage()
    })

    it('sort by models columns layout ', () => {
        /**Search and open model */
           cy.get('[aria-haspopup="listbox"]:eq(2)').should('exist').click({force:true})
            cy.verifySorting("First Title")
            cy.get('[aria-haspopup="listbox"]:eq(2)').should('exist').click({force:true})
            cy.verifySorting("Last Title")
            cy.get('[aria-haspopup="listbox"]:eq(2)').should('exist').click({force:true})
            cy.verifySorting("First SKU")
            cy.get('[aria-haspopup="listbox"]:eq(2)').should('exist').click({force:true})
            cy.verifySorting("Last SKU")
            cy.get('[aria-haspopup="listbox"]:eq(2)').should('exist').click({force:true})
            cy.verifySorting("First Updated")
            cy.get('[aria-haspopup="listbox"]:eq(2)').should('exist').click({force:true})
            cy.verifySorting("Last Updated")
          
  })
})