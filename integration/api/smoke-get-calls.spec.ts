/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/* eslint-enable */
describe('API-Get Calls', () => {
    let token
    let authorization
    let options
    let baseUrl
    before(() => {
        cy.loginAPI(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
        cy.fixture('/data/token.json').then((data) => {
            authorization = `bearer ${data.tokenKey}`
            cy.log('>>>>>>' + data.tokenKey)
        })
    })
    it('validate artist companies GET api call', () => {
        cy.apiGetRequest('artist_companies/', authorization).then((response) => {
            cy.log(JSON.stringify(response))
        })
    })
    it('validate artist companies upload GET api call', () => {       
        cy.apiGetRequest('artist_company_uploads/', authorization)
    })
    it('validate artist skills group GET api call', () => {
        cy.apiGetRequest('artist_skills_groups/', authorization)
    })
    it('validate artist load group GET api call', () => {
        cy.apiGetRequest('artists_load/', authorization)
    })
    it('validate category components GET api call', () => {
        cy.apiGetRequest('category_components/', authorization)
    })
    it('validate client Credit logs GET api call', () => {
        cy.apiGetRequest('client_credits_log/', authorization)
    })
    it('validate client validations GET api call', () => {
        cy.apiGetRequest('client_validations/', authorization)
    })
    it('validate artist skills group GET api call', () => {
        cy.apiGetRequest('artist_skills_groups/', authorization)
    })
    it('validate clients GET api call', () => {
        cy.apiGetRequest('clients/', authorization)
    })
    it('validate client Categories GET api call', () => {
        cy.apiGetRequest('client_categories/', authorization)
    })
    it('validate feed GET api call', () => {
        cy.apiGetRequest('feed/', authorization)
    })
    it('validate system categories GET api call', () => {
        cy.apiGetRequest('system_categories/', authorization)
    })
    it('validate task status GET api call', () => {
        cy.apiGetRequest('tasks/get_status/', authorization)
    })
    it('validate users GET api call', () => {        
        cy.apiGetRequest('users/', authorization)
    })
    it('validate client roles mapping GET api call', () => {
        cy.apiGetRequest('client_roles_mapping/', authorization)
    })
    it('validate download template file GET api call', () => {
        cy.apiGetRequest('clients/download_template_file/', authorization)
    })
    it('validate get client information GET api call', () => {
        cy.apiGetRequest('clients/get_client_info/', authorization)
    })
    it('validate get hubspot records GET api call', () => {
        cy.apiGetRequest('clients/get_hubspot_records/', authorization)
    })
    it('validate clients role GET api call', () => {
        cy.apiGetRequest('clients_roles/', authorization)
    })
    it('validate commerce plan GET api call', () => {
        cy.apiGetRequest('commerce/plans/', authorization)
    })
    it('validate plan invoices GET api call', () => {
        cy.apiGetRequest('commerce/plans/invoices/', authorization)
    })
    it('validate purchase options GET api call', () => {
        cy.apiGetRequest('commerce/purchase_options/', authorization)
    })
    it('validate commerce purchase orders GET api call', () => {
        cy.apiGetRequest('commerce/purchase_orders/', authorization)
    })
    it('validate common endpoints settings GET api call', () => {
        cy.apiGetRequest('common/endpoints_settings/', authorization)
    })
    it('validate components GET api call', () => {
        cy.apiGetRequest('components/', authorization)
    })
    it('validate customer resources GET api call', () => {
        cy.apiGetRequest('customer_resources/', authorization)
    })
    it('validate template kinds GET api call', () => {
        cy.apiGetRequest('email/template_kinds/', authorization)
    })
    it('validate templates GET api call', () => {
        cy.apiGetRequest('email/templates/', authorization)
    })
    it('validate environments GET api call', () => {
        cy.apiGetRequest('environments​/', authorization)
    })
    it('validate stream events GET api call', () => {
        cy.apiGetRequest('event_stream/events/', authorization)
    })
    it('validate categories GET api call', () => {
        cy.apiGetRequest('feed/categories/', authorization)
    })
    it('validate feed fetch GET api call', () => {
        cy.apiGetRequest('feed/fetch/', authorization)
    })
    it('validate feed options GET api call', () => {
        cy.apiGetRequest('feed/options/', authorization)
    })
    it('validate feed states GET api call', () => {
        cy.apiGetRequest('feed/states/', authorization)
    })
    it('validate feed summary GET api call', () => {
        cy.apiGetRequest('feed/summary/', authorization)
    })
    it('validate full jobs GET api call', () => {
        cy.apiGetRequest('full_jobs/', authorization)
    })
    it('validate full jobs get states GET api call', () => {
        cy.apiGetRequest('full_jobs/get_states/', authorization)
    })
    it('validate full jobs options GET api call', () => {
        cy.apiGetRequest('full_jobs/get_job_options/', authorization)
    })
    it('validate full jobs summary GET api call', () => {
        cy.apiGetRequest('full_jobs/summary/', authorization)
    })
    it('validate groups GET api call', () => {
        cy.apiGetRequest('groups/', authorization)
    })
    it('validate health check GET api call', () => {
        cy.apiGetRequest('health_check/', authorization)
    })
    it('validate images GET api call', () => {
        cy.apiGetRequest('images/', authorization)
    })
    it('validate job batch GET api call', () => {
        cy.apiGetRequest('job_batch/', authorization)
    })
    it('validate job chat GET api call', () => {
        cy.apiGetRequest('job_chat/', authorization)
    })
    it('validate job configs GET api call', () => {
        cy.apiGetRequest('job_configs/', authorization)
    })
    it('validate jobs tags GET api call', () => {
        cy.apiGetRequest('job_tags/', authorization)
    })
    it('validate job validations GET api call', () => {
        cy.apiGetRequest('job_validations​/', authorization)
    })
    it('validate jobs GET api call', () => {
        cy.apiGetRequest('jobs/', authorization)
    })
    it('validate jobs column settings GET api call', () => {
        cy.apiGetRequest('jobs_columns_settings/', authorization)
    })
    it('validate job history GET api call', () => {
        cy.apiGetRequest('jobs_history/', authorization)
    })
    it('validate list entities GET api call', () => {
        cy.apiGetRequest('list_entities/', authorization)
    })
    it('validate matlib GET api call', () => {
        cy.apiGetRequest('matlib/', authorization)
    })
    it('validate mat library category GET api call', () => {
        cy.apiGetRequest('matlib_category/', authorization)
    })
    it('validate mesh library GET api call', () => {
        cy.apiGetRequest('meshlib/', authorization)
    })
    it('validate mesh library files GET api call', () => {
        cy.apiGetRequest('meshlib_files/', authorization)
    })
    it('validate mesh library tags GET api call', () => {
        cy.apiGetRequest('meshlib_tags/', authorization)
    })
    it('validate method params GET api call', () => {
        cy.apiGetRequest('method_params/', authorization)
    })
    it('validate methods GET api call', () => {
        cy.apiGetRequest('methods/', authorization)
    })
    it('validate model files GET api call', () => {
        cy.apiGetRequest('model_files/', authorization)
    })
    it('validate models GET api call', () => {
        cy.apiGetRequest('models/', authorization)
    })
    it('validate order tasks GET api call', () => {
        cy.apiGetRequest('order_tasks/', authorization)
    })
    it('validate orders GET api call', () => {
        cy.apiGetRequest('orders/', authorization)
    })
    it('validate part files GET api call', () => {
        cy.apiGetRequest('part_files/', authorization)
    })
    it('validate part tags GET api call', () => {
        cy.apiGetRequest('part_tags/', authorization)
    })
    it('validate parts GET api call', () => {
        cy.apiGetRequest('parts/', authorization)
    })
    it('validate parts components GET api call', () => {
        cy.apiGetRequest('parts/components/', authorization)
    })
    it('validate parts options GET api call', () => {
        cy.apiGetRequest('parts/get_part_options/', authorization)
    })
    it('validate parts method GET api call', () => {
        cy.apiGetRequest('parts/methods/', authorization)
    })
    it('validate platform renders  GET api call', () => {
        cy.apiGetRequest('platform-renders/', authorization)
    })
    it('validate products GET api call', () => {
        cy.apiGetRequest('products/', authorization)
    })
    it('validate reports geo stat GET api call', () => {
        cy.apiGetRequest('reports/geo_stat_get/', authorization)
    })
    it('validate tags GET api call', () => {
        cy.apiGetRequest('tags/', authorization)
    })
    it('validate tesk status GET api call', () => {
        cy.apiGetRequest('tasks/get_status/', authorization)
    })
    it('validate texture methods GET api call', () => {
        cy.apiGetRequest('texture_methods/', authorization)
    })
    it('validate user invites GET api call', () => {
        cy.apiGetRequest('user_invites/', authorization)
    })
    it('validate users GET api call', () => {
        cy.apiGetRequest('users/', authorization).then((response) => {
            cy.writeFile('cypress/fixtures/output.json', JSON.stringify(response))
        })
    })
    it('validate users options GET api call', () => {
        cy.apiGetRequest('users/users_options/', authorization)
    })
    it('validate validation types GET api call', () => {
        cy.apiGetRequest('validation_types/', authorization)
    })
    it('validate visual template GET api call', () => {
        cy.apiGetRequest('visual_template/', authorization)
    })
    // afterEach(() => {
    //     // cy.request(options)
    //     // .its('status')
    //     // .should('eq', 200);
    //     cy.request(options)
    //         .then(resp => resp.body)
    //         .then((body: any) => {
    //             cy.log(JSON.stringify(body))
    //             //cy.writeFile('cypress/fixtures/apiOut.json', JSON.stringify(body))
    //         })
    //         })
})