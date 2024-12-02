

describe('API-Client Details', () => {
  let token
  let authorization
  before(() => {
    cy.clearCookies()
    cy.loginAPI(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
    cy.fixture('/data/token.json').then((data) => {
      authorization = `bearer ${data.tokenKey}`
      cy.log('>>>'+ data.tokenKey)
    })

  })
  it('validate clients api', () => {
    cy.apiGetRequest('client_categories/', authorization, 'client_id=1218').then((response) => {
      expect(response.status).to.equal(200)
    })
  })

  it('validate specific client details', () => {
    cy.apiGetRequest('clients/', authorization, 'client_id=1218').then(resp => resp.body).then((body: any) => {
      expect(body.count).to.equal(1)
      expect(body.results[0].client_id).to.equal(1218)
      expect(body.results[0].client_name).to.equal('ntartest3')
      expect(body.results[0].client_key).to.equal('iU5NtcLcsDnNjXn9Kb5boSx69L31GqnT')
      expect(body.results[0].status).to.equal(1)
      expect(body.results[0].client_type_definition).to.equal('Standalone')     
    })
  })
})