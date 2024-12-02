/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/* eslint-enable */


describe('API -Client Category Test', () => {
  let token
  let authorization

  before(() => {
    cy.clearCookies()
    cy.loginAPI(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
    cy.fixture('/data/token.json').then((data) => {
      authorization = `bearer ${data.tokenKey}`
    })

  })
  it('Client Categories', () => {
    cy.apiGetRequest('client_categories/', authorization)
  })

  it('Client details for specific client #1218', () => {  
    cy.apiGetRequest('client_categories/', authorization,'client_id=1218').then(resp => resp.body).then((body: any) => {
      expect(body.count).to.equal(7)        
    })
  })
})