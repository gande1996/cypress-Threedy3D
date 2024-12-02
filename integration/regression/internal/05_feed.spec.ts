/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('Portal-Feed-Filter', () => {
    before(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('[href="/feed"]').eq(1).click({ force: true }).then(() => {
            //cy.contains('div', 'Feed', {visible:false}).should('be.visible').click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/feed')) {
                    cy.get('[href="/feed"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/feed')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })
    it('Pagination', () => {
        //cy.viewport(1660, 1000)
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
        
        cy.validateSort('Feed ID','1')
        cy.validateSort('SKU','2')
        cy.validateSort('Option ID','3')
        cy.validateSort('Client','5')
        cy.validateSort('Tags','6')
        cy.validateSort('VS Score','8')
        cy.validateSort('Created On','9')
        cy.validateSort('Last Modified','10')

       
    })

    // Table Filters


    it('Filter by Status', () => {
        cy.viewport(1660, 1000)
        let status = "New"

        // cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(3)
        //     .should('exist')
        //     .click({ force: true })
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(3)
            .click().type(status)
            .type('{downarrow}').
            wait(2000).trigger('keydown', {
                key: 'Enter',
            }).wait(4000)
            .then(() => {
                cy.get('ul li').contains(status).click()
                cy.wait(3000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(status)
                    })
            })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({ force: true })
            .wait(1500, { log: false })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length.of.at.least', 1)
            })
    })

    it('Filter by Client', () => {
        cy.viewport(1660, 1000)
        let client = 'Stylejoy'
        cy.wait(1000)
        // cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(0)').
        //     eq(0).should('be.visible').type(client)
        // cy.contains('li', client).should('be.visible').click({ force: true })
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(0)').
            click().type(client)
            .type('{downarrow}').
            wait(2000).trigger('keydown', {
                key: 'Enter',
            })
        // cy.get('.MuiInputBase-root > .MuiSelect-root').eq(0)
        //     .should('exist')
        //     .click()
        //     .then(() => {
        //         cy.get('ul li[data-value="10"]').click()
        //         cy.wait(3000, { log: false })
        //     })
        //     .then(() => {
        //         cy.get('tbody tr[role="checkbox"]')
        //             .each(($tr) => {
        //                 expect($tr).to.contain(client)
        //             })
        //     })
        cy.contains('div', client)
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({ force: true })
            .wait(1500, { log: false })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length.of.at.least', 1)
            })
    })

    it('Filter by Client Category', () => {
        cy.viewport(1660, 1000)
        let clientCategory = 'furniture/chairs/accent_chairs'
        cy.wait(1000)
        // cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(0)').
        //     eq(0).should('be.visible').type(client)
        // cy.contains('li', client).should('be.visible').click({ force: true })
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(1)').
            click().type(clientCategory)
            .type('{downarrow}').
            wait(2000).trigger('keydown', {
                key: 'Enter',
            })
        // cy.get('.MuiInputBase-root > .MuiSelect-root').eq(0)
        //     .should('exist')
        //     .click()
        //     .then(() => {
        //         cy.get('ul li[data-value="10"]').click()
        //         cy.wait(3000, { log: false })
        //     })
        //     .then(() => {
        //         cy.get('tbody tr[role="checkbox"]')
        //             .each(($tr) => {
        //                 expect($tr).to.contain(client)
        //             })
        //     })
        cy.contains('div', clientCategory)
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({ force: true })
            .wait(1500, { log: false })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length.of.at.least', 1)
            })
    })

    it('Filter by Tag', () => {
        cy.viewport(1660, 1000)
        cy.get('thead tr').contains('Tags').click({ force: true })
        cy.get('tbody tr:nth-child(1) td:nth-child(7) div span:nth-child(1)').invoke('text').then((tag) => {
            cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(2)
                .click().type(tag)
                .type('{downarrow}').wait(2000).
                trigger('keydown', {

                }).wait(2000)


                //   .should('exist')
                //     .click({ force: true })
                .then(() => {
                    cy.get('ul li').contains(tag).click()
                    cy.wait(3000, { log: false })
                })
                .then(() => {
                    cy.get('tbody tr[role="checkbox"]')
                        .each(($tr) => {
                            expect($tr).to.contain(tag)
                        })
                })
        })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({ force: true })
            .wait(1500, { log: false })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length.of.at.least', 1)
            })
    })



    it('Reset Filters', () => {
        cy.viewport(1660, 1000)
        let status = "New"

        //cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(3)
        //cy.pause()
        cy.get('input[type="text"][placeholder="All"]:eq(3)')
            .should('exist')
            .click({ force: true })
            .then(($el) => {
                cy.get('ul li').contains(status).click()
                //cy.wrap($el).type('{enter}')
                cy.wait(3000, { log: false })
            })
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]:eq(0)')
            .should('exist')
            .click()
            .then(() => {
                // client id 10 == Cypress-Automated-Tests
                cy.get('ul.MuiAutocomplete-listbox li:nth-child(2)').click({ force: true })
                cy.wait(3000, { log: false })
            })
        cy.wait(3000, { log: false })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Reset')
            .click({ force: true })
            .wait(1500, { log: false })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .should('have.length.of.at.least', 1)
            })
    })

    it('Create-Delete Feed', () => {
        const urlImg = 'https://img.icons8.com/bubbles/2x/google-logo.png'
        const sku = 'QA' + `${Math.floor(Math.random() * 10000)}`

        cy.viewport(1660, 1000)

        cy.wait(1500, { log: false })
        cy.get('button.MuiButton-containedPrimary')
            .contains('New Feed')
            .click()
        cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]').should('exist')

        cy.get('#title').type('title-test-cypress Feed')
        cy.get('#url').type('https://google.com')
        cy.get('#sku').type(sku)
        cy.get('#option_id').type(`-test-${Math.random()}`)
        cy.get('#heightValue').type('10')
        cy.get('#widthValue').type('11')
        cy.get('#depthValue').type('12')

        cy.get('#client_id')
            .should('exist')
            .click({ force: true }).type('ABC')
            .type('{downarrow}').
            wait(2000).trigger('keydown', {
                key: 'Enter',
            })

        cy.wait(2000)
        cy.get('#client_category')
            .should('exist')
            .click()
            .then(() => {
                //cy.get('ul li[data-value="10159"]').click()
                cy.contains('li', 'paintings').should('be.visible').click({ force: true })
                cy.wait(1500, { log: false })
            })

        cy.get('#url-0').type(urlImg)

        cy.get('.MuiDialogContent-root button.MuiButton-sizeSmall').click().click()
        cy.wait(1500, { log: false })
        cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]').should('exist').within(() => {
            cy.get('button.MuiButton-containedPrimary')
                .contains('Create Feed')
                .click()
        })
        cy.wait(2000)
        cy.reload()
        cy.get('table thead').contains('Created On').click().then(() => {
            cy.wait(10000, { log: false })
            cy.get('tbody tr:first td:nth-child(3) div')
                .invoke('text')
                .then(tdText => {
                    if (expect(tdText).to.equal(sku)) {
                        cy.get('tbody tr:first td:nth-child(1) span span input').click()
                        cy.get('button').contains('delete').click()
                        cy.get('button').contains('Delete').click()
                    }
                });
            cy.wait(3000, { log: false })
        })
    })

    it('Search SKU', () => {
        cy.viewport(1660, 1000)
        let sku = '4150481', // Test assumes the data in portal-test has not changed
            id = '8e118586'
        cy.get('div[placeholder="SKU:"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(sku)
                    .should('have.value', sku)
            })
        cy.wait(3000, { log: false })
        cy.get('tbody tr td a').contains(id)
            .click({ force: true })
            .then(() => {
                cy.url().should('contain', '/feed/')
                cy.get('#sku').should('have.value', sku)
            })

    })

    after(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })


})

describe('Portal-Feed-Details-Test', () => {
    // before(() => {
    //     cy.clearLocalStorage()
    // })

    beforeEach(() => {
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('[href="/feed"]').eq(1).click()
        cy.wait(3000, { log: false })
        let sku = '4150481', // Test assumes the data in portal-test has not changed
            id = '8e118586'
        cy.get('div[placeholder="SKU:"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(sku)
                    .should('have.value', sku)
            })
        cy.wait(3000, { log: false })
        cy.get('tbody tr td a:first').click()
    })

    it('Details Table', () => {
        cy.viewport(1660, 1000)
        cy.get('tbody')
            .should('contain', 'SKU')
            .and('contain', 'Job ID')
        cy.get('tbody')
            .should('contain', 'Client')
            .and('contain', 'Job ID')
        cy.get('tbody tr:nth-child(3)')
            .should('contain', 'Client Category')
        cy.get('tbody tr:nth-child(3)')
            .should('contain', 'Tag')
        cy.get('tbody tr:nth-child(4)')
            .and('contain', 'Dimensions')
        cy.get('tbody tr:nth-child(4)')
            .and('contain', 'Option ID')
        cy.contains('span','New Job').should('be.visible')
    })

    it('Image List', () => {
        cy.viewport(1660, 1000)
        cy.get('ul.MuiGridList-root li.MuiGridListTile-root')
            .should('have.length.of.at.least', 1)
            .each(($li) => {
                cy.wrap($li).find('img').should('be.visible')
            })
    })

    it('Add-Delete Image', () => {
        const urls = [
            'https://cdn.icon-icons.com/icons2/2119/PNG/512/google_icon_131222.png',
            'https://cdn4.iconfinder.com/data/icons/social-media-and-logos-11/32/Logo_Google-512.png',
            'https://cdn4.iconfinder.com/data/icons/social-media-and-logos-11/32/Logo_Google-512.png'
        ]
        cy.viewport(1660, 1000)
        cy.get('button.MuiButton-containedPrimary')
            .contains('New Image')
            .click()
        cy.wait(1500, { log: false })
        cy.get('button.MuiButton-sizeSmall')
            .contains('Add')
            .click().click()
        cy.wait(1500, { log: false })
        for (let i = 0; i < urls.length; i++) {
            cy.get(`#url-${i}`).type(urls[i])
        }
        cy.wait(1500, { log: false })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Save')
            .click()
        cy.wait(1500, { log: false })
        for (let i = 0; i < urls.length; i++) {
            cy.get('button[aria-label="delete"]').last()
                .click()
            cy.get('button.MuiButton-textPrimary')
                .contains('Delete')
                .click()
            cy.wait(1500, { log: false })
        }

    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})
