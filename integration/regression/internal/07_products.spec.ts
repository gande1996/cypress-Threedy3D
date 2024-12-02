/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Product-Listing', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('[href="/products"]').eq(1).click({ force: true }).then((url) => {
            cy.log('------------------'+url)
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/products')) {
                    cy.get('[href="/products"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/products')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('Pagination', () => {
        cy.wait(10000, { log: false })
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
        cy.viewport(1660, 1000)
        cy.get('table thead').contains('SKU').click()
        cy.wait(10000, { log: false })
        cy.get('table thead').contains('SKU').click()
            .wait(10000, { log: false })
            .then(() => {
                let names: string[] = []
                cy.get('tbody tr td:nth-child(3)')
                    .each(($el, index) => {
                         names[index] = $el.text()
                    })
               
                cy.wrap(names).should('deep.eq', names.sort())
            })
        cy.get('table thead').contains('Category').click()
        cy.wait(10000, { log: false })
        cy.get('table thead').contains('Category').click()
            .wait(10000, { log: false })
            .then(() => {
                let names: string[] = []
                cy.get('tbody tr td:nth-child(4)')
                    .each(($el, index) => {
                         names[index] = $el.text()
                    })
               
                cy.wrap(names).should('deep.eq', names.sort())
            })
    })


    // Table Filters
    it('Search-SKU', () => {
        cy.get('tbody tr:first td:nth-child(4) span a')
            .each(($el, $index) => {
                const sku = $el.text();
                cy.get('div[role="combobox"]').should('have.length', 6)
                    .within(() => {
                        cy.get('input[type="text"]').eq(0).type(sku)
                    })
                    .wait(3000, { log: false })
                    .then(() => {
                        cy.get('tbody tr:first td:nth-child(4) span a').should('contain', sku)
                    })
            })
    })

    it('Search-Title', () => {
        cy.get('tbody tr:first td:nth-child(7) div')
            .each(($el, $index) => {
                const title = $el.text().length > 10 ? $el.text().substring(0, 10) : $el.text();
                cy.get('div[placeholder="Title:"]').should('have.length', 1)
                    .within(() => {
                        cy.get('input[type="text"]').type(title)
                    })
                    .wait(6000, { log: false })
                    .then(() => {
                        cy.get('tbody tr:first td:nth-child(7) div').should('contain', title)
                    })
            })
    })

    it('Filter-by-Option-ID', () => {
        cy.get('tbody tr:first td:nth-child(5) span a')
            .each(($el, $index) => {
                const OptionId = 'fire';
                cy.get('div[placeholder="Option Id:"]').should('have.length', 1)
                    .within(() => {
                        cy.get('input[type="text"]').type(OptionId)
                    })
                    .wait(6000, { log: false })
                    .then(() => {
                        cy.get('tbody tr:first td:nth-child(5) span a').should('contain', OptionId)
                    })
            })
    })

    it('Batch-Filter', () => {
        let batch = '1234'
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').
        eq(0).should('be.visible').type(batch)
        cy.contains('li',batch).should('be.visible').click({force:true})        
        // cy.get(':nth-child(3) > .MuiPaper-root > .MuiInputBase-root > .MuiSelect-root')
        //     .should('exist')
        //     .click()
        //     .then(() => {
        //         cy.get('ul li[data-value=' + batch + ']').click()
        //         // cy.get('div[value="' + batch + '"]').should('contain', batch)
        //     })
    })

    it('Filter-by-Status', () => {
        let status = 'Client Approved'
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').
        eq(1).should('be.visible').type(status)
        cy.contains('li',status).should('be.visible')  
            .should('exist')
            .click({force:true})
            .then(() => {
                //cy.get('ul li[data-value=16]').click()
                cy.wait(10000, { log: false })
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(status)
                    })
            })
    })

    it('Filter-by-System-Category', () => {
        // cy.get(':nth-child(5) > .MuiPaper-root > .MuiInputBase-root > .MuiSelect-root')
        //     .should('exist')
        //     .click()
        //     .then(() => {
        //         cy.get('ul.MuiMenu-list li:nth-child(2)').invoke('text').then((сategory) => {
        //             cy.get('ul.MuiMenu-list li:nth-child(2)').click()
        //         })
        //     })

        let status = 'Client Approved'
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').
        eq(1).should('be.visible').type(status)
        cy.contains('li',status).should('be.visible')  
            .should('exist')
            .click({force:true})
            .then(() => {
                //cy.get('ul li[data-value=16]').click()
                cy.wait(10000, { log: false })
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(status)
                    })
            })
    })

    it('Filter-by-Category', () => {
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(4)')
            .should('exist').and('be.visible')
            .click()
            .then(() => {
                cy.contains('li', 'Furniture').should('be.visible').click({ force: true })
                cy.wait(3000)
                // cy.get('ul.MuiMenu-list li:nth-child(2)').invoke('text').then((сategory) => {
                //    cy.get('ul.MuiMenu-list li:nth-child(2)').click()
                    cy.get('tbody tr:first')
                        .should('exist')
                        .and('contain', 'Furniture')
                //})
            })
    })

    it('Filter-Client-and-Reset', () => {
        cy.viewport(1660, 1000)
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(3)')
            .should('exist')
            .click()
            .then(() => {
                cy.contains('li', 'Kohls').should('be.visible').click({ force: true })
                cy.wait(3000)
                // cy.get('ul li[data-value=8]').click()
                cy.get('tbody tr:first')
                    .should('exist')
                    .and('contain', "Kohls")
            })
        cy.get('body').click()
        cy.contains('Reset').click()
    })

    it('Product Request', () =>{
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(4)')
            .should('exist').and('be.visible')
            .click()
            .then(() => {
                
                cy.contains('li', 'Furniture').should('be.visible').click({ force: true })
                cy.wait(3000)
                // cy.get('ul.MuiMenu-list li:nth-child(2)').invoke('text').then((сategory) => {
                //    cy.get('ul.MuiMenu-list li:nth-child(2)').click()
                    cy.get('tbody tr:first')
                        .should('exist')
                        .and('contain', 'Furniture')
                //})
            })

        
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
})
