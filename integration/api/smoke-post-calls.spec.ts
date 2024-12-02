/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import { resolve } from "path"
//import {faker} from "faker"

/* eslint-enable */


let feedId = + Cypress._.random(0, 1e6).toString()
let sku = 'SKUAPI' + Cypress._.random(0, 1e6).toString()

describe('API-Post Call', () => {
    let token
    let authorization
    let options

    before(() => {
        cy.clearCookies()
        cy.loginAPI(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
        authorization = `bearer ${token}`
    })
    it('validate create feed api POST call', () => {
        cy.fixture('/data/feed/01_create-feed.json').then((feedInput) => {
            cy.fixture('/data/token.json').then((data) => {
                feedInput.feed_id = '001tcBNG'//feedId
                feedInput.sku = sku
                cy.request({
                    method: 'POST',
                    url: Cypress.env('api') + '/api/feed/',
                    body: JSON.stringify(feedInput),
                    headers: {
                        "Authorization": `bearer ${data.tokenKey}`,
                        "content-type": "application/json",
                    },
                }).then((response) => {
                    cy.log('success')
                    expect(response.status).to.eq(200)                   
                    expect(response.body.error).to.eq(undefined)
                })
            })
        })
    })
    
    it('validate create component api POST call', () => {
        cy.fixture('/data/json/component.json').then((input) => {
            cy.fixture('/data/token.json').then((data) => {
                input.code = '099'            
                cy.request({
                    method: 'POST',
                    url: Cypress.env('api') + '/api/component/',
                    body: JSON.stringify(input),
                    headers: {
                        "Authorization": `bearer ${data.tokenKey}`,
                        "content-type": "application/json",
                    },
                }).then((response) => {
                    cy.log('success')
                    expect(response.status).to.eq(200)                   
                    expect(response.body.error).to.eq(undefined)
                })
            })
        })
    })   

})