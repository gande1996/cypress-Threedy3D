/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/* eslint-enable */


import { writeFile } from "fs"
import { resolve } from "path"

let feedId = + Cypress._.random(0, 1e6).toString()
let sku = 'SKUAPI' + Cypress._.random(0, 1e6).toString()

describe.skip('API-Create a Feed', () => {
    let token
    let authorization
    let options

    before(() => {
        cy.clearCookies()
        cy.loginAPI(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
        cy.fixture('/data/token.json').then((data) => {
            authorization = `bearer ${data.tokenKey}`
            console.log(`${data.tokenKey}`)
        })
    })
    it('validate create feed api POST call', () => {
        cy.fixture('/data/feed/01_create-feed.json').then((feedInput) => {
            feedInput.feed_id = '001tcBNG'
            feedInput.sku = sku           
            cy.apiPostRequest('feed/', authorization, JSON.stringify(feedInput)).then((response) => {
                cy.writeFile('cypress/fixtures/feed.json', response.body)
                expect(response.status).to.eq(201)
                expect(response.body.client).to.eq(1218)
            })
        })
    })
    it('validate feed already exist error message', () => {
        cy.fixture('feed.json').then((feedInput) => {
            cy.apiPostRequest('feed/', authorization, JSON.stringify(feedInput)).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.eq('Product with this SKU already exists')
            })
        })
    })
})