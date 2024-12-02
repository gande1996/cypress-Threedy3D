/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe.skip('Portal-Part-Requests', () => {
    beforeEach(() => {
        // cy.clearCookies()
        // cy.login(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
        // cy.get('[href="/part-requests"]').click()
        // cy.wait(3000, {log: false})

        cy.log('admin-logs-in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/part-requests"]').eq(1).click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job_tags')) {
                    cy.get('[href="/part-requests"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/part-requests')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    
    it('Pagination', () => {
        cy.get('p').contains('Rows per page:').next()
            .click()
            .then(() => {
                cy.get('li[data-value="10"]').click()
            })
            .then(() => {
                expect('tbody tr').to.have.length.of.at.most(10)
            })
    })

    it('Table-Sort', () => {
        cy.get('table thead').contains('Client').click().click()
            .then(() => {
                   let names: string[] = []
                cy.get('tbody tr td:nth-child(4)')
                    .each(($el, $index) => {
                        names[$index] = $el.text()
                    })
                cy.wrap(names).should('deep.eq', names.sort())
            })
        cy.get('table thead').contains('Batch ID').click().click()
            .then(() => {
                   let names: string[] = []
                cy.get('tbody tr td:nth-child(5)')
                    .each(($el, index) => {
                        names[index] = $el.text()
                    })
                cy.wrap(names).should('deep.eq', names.sort())
            })
    })
    
    // Table Filters
    it('Search-by-ID', () => {
        let job_id = '778cd6dc', // Test assumes the data in portal-test has not changed
            part_id = "2332"
        cy.get('input[placeholder="Request ID:"]')
            .should('exist')
            .type(part_id)
            .then(($input) => {
                expect($input).to.have.value(part_id)
            })
            .then(() => {
                // cy.wait(3000, {log: false})
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length', 1)
                    .and('contain', part_id)
                    .wait(3000, {log: false})
            })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({force: true})
            .wait(3000, {log: false})
        cy.get('input[placeholder="Job ID:"]').as('jobID')
            .should('exist')
            .type(job_id)
            .then(($input) => {
                expect($input).to.have.value(job_id)
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]').should('have.length.of.at.least', 1)
            })
        cy.get('tbody tr td a').contains(part_id)
            .click({force: true})
            .then(() => {
                cy.url().should('contain', '/part-requests/')
            }).wait(5000, {log: false})
            .then(() => {
                cy.get('thead tr', {timeout: 10000})
                    .should('contain', job_id)
                    .and('be.visible')
            })

    })
    
    it('Filter-by-Batch-ID', () => {
        cy.viewport(1920, 1200)
        cy.get('thead tr').contains('Batch ID').click({force: true})
        cy.get('tbody tr:nth-child(2) td:nth-child(5) div').invoke('text').then((batch) => {
            cy.get('[placeholder="All"]').eq(3)
                .should('exist')
                .click({force: true})
                .wait(1500, {log: false})
                .then(() => {
                    cy.get('ul li')
                        .contains(batch).click()
                }).wait(5000)
                .then(() =>{
                    cy.get('div [class="MuiInputBase-root MuiInput-root MuiInput-underline MuiAutocomplete-inputRoot MuiInputBase-fullWidth MuiInput-fullWidth Mui-focused Mui-focused MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart MuiInputBase-adornedEnd"]').should('contain', batch)
                    cy.get('tbody tr[role="checkbox"]')
                        .each(($tr) => {
                            expect($tr).to.contain(batch)
                        })
                })
        })
    })
    
    it('Filter-by-Status', () => {
        cy.viewport(1920, 1200)
        let status = "DONE"

        cy.get('[placeholder="All"]').eq(4)
            .should('exist')
            .click({force: true})
            .then(() => {
                cy.get('ul li')
                    .contains(status).click()
            }).wait(5000)
            .then(() =>{
                cy.get('[data-tag-index="0"]').should('contain', status)
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(status)
                    })
            })
    })
    
    it('Reset-Filters', () => {
        cy.viewport(1920, 1200)
        let mat = "WOOD",
            tag = "pillow",
            batch = "stylejoy_kohls_pillows",
            status = "DONE"

        cy.get('[placeholder="All"]').eq(1)
            .should('exist')
            .click({force: true})
            .then(() => {
                cy.get('ul li').contains(mat).click({force: true})
            })
        cy.get('[placeholder="All"]').eq(1)
            .should('exist')
            .click({force: true})
            .then(() => {
                cy.get('ul li').contains(tag).click({force: true})
            })
        cy.get('[placeholder="All"]').eq(1)
            .should('exist')
            .click({force: true})
            .then(() => {
                cy.get('ul li').contains(batch).click({force: true})
            })
        cy.get('[placeholder="All"]').eq(1)
            .should('exist')
            .click({force: true})
            .then(() => {
                cy.get('ul li').contains(status).click({force: true})
            })
            .wait(1500, {log: false})
            .then(() =>{
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length', 0)
            })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({force: true})
            .wait(1500, {log: false})
            .then(() =>{
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length.of.at.least', 1)
            })
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
    
})

describe.skip('Portal-Part-Request-Details-Test', () => {
   
    beforeEach(() => {
        // cy.clearCookies()
        // cy.login(Cypress.env('auth_admin'), Cypress.env('admin_pw'))
        // cy.get('[href="/part-requests"]').click()
        // cy.wait(3000, {log: false})
        // cy.get('tbody tr td a:first').click()

        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/part-requests"]').eq(1).click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job_tags')) {
                    cy.get('[href="/part-requests"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/part-requests')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('Change-Status', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, {log: false})
        cy.get('[placeholder="All"]').eq(4)
            .should('exist')
            .click()
            .then(() => {
                //alert(cy.get('ul').html())
                cy.get('ul.MuiMenu-list').find('li').last().click()
            })
            .wait(5000, {log: false})
        cy.get('[placeholder="All"]').eq(0)
            .should('exist')
            .click()
            .wait(5000, {log: false})
            .then(() => {
                //alert(cy.get('ul').html())
                cy.get('ul.MuiMenu-list').find('li').first().click()
            })
    })
    it.skip('Change-Attributes', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, {log: false})
        cy.get('[placeholder="All"]').eq(1)
            .should('exist')
            .click()
            .wait(3000, {log: false})
            .then(() => {
                cy.get('ul.MuiMenu-list').find('li').last().click()
            })
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
