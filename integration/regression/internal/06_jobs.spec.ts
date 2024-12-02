/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */


describe('Portal-Jobs-Listing', () => {
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('[href="/jobs"]').eq(1).click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs')) {
                    cy.get('[href="/jobs"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('Pagination', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
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
        cy.wait(5000, { log: false })
        cy.get('table thead').contains('Client').click().click()
            .then(() => {
                let names: string[] = []
                cy.get('tbody tr td:nth-child(5)')
                    .each(($el, index) => {
                        names[index] = $el.text()
                    })
                cy.wrap(names).should('deep.eq', names.sort())
            })
        cy.wait(5000, { log: false })
        cy.get('table thead').contains('Title').click().click()
            .then(() => {
                let names: string[] = []
                cy.get('tbody tr td:nth-child(6)')
                    .each(($el, index) => {
                        names[index] = $el.text()
                    })
                cy.wrap(names).should('deep.eq', names.sort())
            })
    })

    // Table Filters
    it('Search-SKU', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let sku = '4453538', // Test assumes the data in portal-test has not changed
            id = 'c134b1fc'
        cy.get('div[placeholder="SKU:"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(sku)
                    .should('have.value', sku)
                    .wait(1500, { log: false })
            })
        cy.get('tbody tr:nth-child(1) td:nth-child(2) a').contains(sku)
            .click({ force: true })
            .then(() => {
                cy.url().should('contain', '/jobs/')
            })

    })

    it('Search-Option-Id', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let optionId = 'default-test', // Test assumes the data in portal-test has not changed
            id = 'c134b1fc'
        cy.get('div[placeholder="Option Id:"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(optionId)
                    .should('have.value', optionId)
                    .wait(1500, { log: false })
            })
        cy.get('tbody tr td a').contains(optionId)
            .click({ force: true })
            .then(() => {
                cy.url().should('contain', '/jobs/')
            })

    })

    it('Search-Title', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        cy.get('tbody tr:first td:nth-child(8)')
            .each(($el, $index) => {
                const searchString = $el.text();
                cy.get('div[placeholder="Title:"]').should('have.length', 1)
                    .within(() => {
                        cy.get('input[type="text"]').type(searchString)
                            .should('have.value', searchString)
                    })
                    .wait(1500, { log: false })
                    .then(() => {
                        cy.get('tbody tr[role="checkbox"]').should('have.length.of.at.least', 1)
                    })
            })
    })

    it('Filter-by-Client', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        cy.get('tbody tr:nth-child(1) td:nth-child(7) div').invoke('text').then((client) => {
            cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').
                eq(0).should('be.visible').type(client)
            cy.contains('li', client).should('be.visible').click({ force: true })
            cy.wait(5000)
            // cy.get('.MuiInputBase-root > .MuiSelect-root').eq(0)
            //     .should('exist')
            //     .click()
            //     .then(() => {
            //         cy.get('ul li[data-value="10"]').click()
            //             .wait(5000, { log: false })
            //     })
            //     .then(() => {
            cy.get('tbody tr[role="checkbox"]')
                .each(($tr) => {
                    expect($tr).to.contain(client)
                })
            // })
        })
    })

    it('Filter-by-Status', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let status = "Part making in progress"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(9)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(status).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(status)
                    })
            })
    })

    it.skip('Filter-by-System-Category', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let cat = "Bedroom"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(3)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(cat)
                    .click()
                    .wait(5000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(cat)
                    })
            })
    })

    it('Filter-by-Client-Category', () => {
        cy.wait(5000, { log: false })
        let clientCategory = "Bookshelf"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(2)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(clientCategory).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').click()
                   
            })
            cy.wait(5000)
        cy.get('#client_category').should('have.value',clientCategory)
    })

    it('Filter-by-Assigned-User', () => {
        cy.wait(5000, { log: false })
        let assignedUser = "alex@stylejoy.com"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(4)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(assignedUser).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(assignedUser)
                    })
            })
    })

    it('Filter-by-Assigned-watcher', () => {
        cy.wait(5000, { log: false })
        let assignedWatcher = "Threedy61@AI.com"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(5)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(assignedWatcher).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').click()
                   
            })
            cy.wait(5000)
        cy.get('#assigned_watcher').should('have.value',assignedWatcher)
    })

    it('Filter-by-Assigned-QA-User', () => {
        cy.wait(5000, { log: false })
        let assignedQAUser = "amir.salimnia@nextechar.com"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(6)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(assignedQAUser).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(assignedQAUser)
                    })
            })
    })

    it('Filter-by-Tag', () => {
        cy.wait(5000, { log: false })
        let tag = "Toggle"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(8)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(tag).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(tag)
                    })
            })
    })

    it('Filter-by-Workflow-Type', () => {
        cy.wait(5000, { log: false })
        let workflowType = "Manual"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(10)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(workflowType).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr[role="checkbox"]')
                    .each(($tr) => {
                        expect($tr).to.contain(workflowType)
                    })
            })
        //     .then(() => {
        //         cy.get('tbody tr td:nth-child(2) span a :eq(1)').click()
                   
        //     })
        //     cy.wait(5000)
        // cy.get('#workflow_type').should('have.value',workflowType)
    })

    it('Filter-by-workflowCategory', () => {
        cy.wait(5000, { log: false })
        let workflowCategory = "Regular"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(11)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(workflowCategory).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').eq(0).click()
                   
            })
            cy.wait(5000)
        cy.get('#workflow_category').should('have.value',workflowCategory)
    })

    it('Filter-by-Complexities', () => {
        cy.wait(5000, { log: false })
        let complexities = "Medium"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(12)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(complexities).click()
                    .wait(6000, { log: false })
            })

            cy.get('#complexity').should('have.value',complexities)
            
    })

    it('Filter-by-Hold', () => {
        cy.wait(5000, { log: false })
        let hold = "No Hold"

        cy.get('[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"]:eq(2)')
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(hold).click()
                    .wait(6000, { log: false })
            })    
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').eq(0).click()
                   
            })
            cy.wait(5000)
        cy.get('#is_hold').should('have.value',hold)
    })

    it('Filter-by-QA-Errors', () => {
        cy.wait(5000, { log: false })
        let QAErrors = "Quality standard change"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(13)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(QAErrors).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').eq(0).click()
                   
            })
            cy.wait(5000)
        cy.contains('span',QAErrors)
    })

    it('Filter-by-Priority', () => {
        cy.wait(5000, { log: false })
        let priority = "High"

        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(14)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(priority).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').eq(0).click()
                   
            })
            cy.wait(5000)
            cy.get('#priorityLevel').should('have.value',priority)
    })

    it('Reset-Filters', () => {
        //cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let status = "Client Approved"

        cy.get('tbody tr:nth-child(1) td:nth-child(5)').invoke('text').then((client) => {
            cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').
                eq(9).should('be.visible').type(status)
            cy.contains('li', status).should('be.visible').click({ force: true })
            cy.wait(5000)
            // cy.get('.MuiInputBase-root > .MuiSelect-root').eq(0)
            //     .should('exist')
            //     .click()
            //     .then(() => {
            //         cy.get('ul li[data-value="10"]').click()
            //             .wait(5000, { log: false })
            //     })
            //     .then(() => {
                    cy.get('tbody tr[role="checkbox"]')
                        .each(($tr) => {
                            expect($tr).to.contain(status)
                        })
                //})
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


    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})


describe('Portal-Job-Creation', () => {
    const randStr = Math.random();
    const titleNewJob = '01-title-test-cypress-Job'+Cypress._.random(0,1e5).toString()
    const sku = 'QA'+ `${Math.floor(Math.random()*10000)}`
    beforeEach(() => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
       
    })

    it('Create', () => {

        const urlImg = 'https://img.icons8.com/bubbles/2x/google-logo.png'
        
        
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
       // cy.viewport(1660, 1000)

        cy.wait(1500, { log: false })
        cy.get('button.MuiButton-containedPrimary')
            .contains('Create Feed + Job')
            .click()
        cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]').should('exist')

        cy.get('#title').type(titleNewJob)
        cy.get('#url').type('https://google.com')
        cy.get('#sku').type(sku)
        cy.get('#option_id').type(`-test-${Math.random()}`)
        cy.get('#heightValue').type('10')
        cy.get('#widthValue').type('11')
        cy.get('#depthValue').type('12')

        cy.get('#client_id')
            .should('exist')
            .click({force:true})
            .then(() => {
                //cy.get('ul li[data-value="10"]').click()
                cy.wait(1000, { log: false })
                cy.contains('li', 'ABC').should('be.visible').click({ force: true })
                cy.wait(1500, { log: false })
            })
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
        cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]').should('exist').within(()=>{
            cy.get('button.MuiButton-containedPrimary')
            .contains('Create Feed + Job')
            .click()
            cy.wait(4000)
        })
        cy.wait(3000)  
    })
    it('Delete', () => {
       // const titleNewJob = 'title-test-cypress-Job'
        cy.get('[href="/jobs"]').eq(1).click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs')) {
                    cy.get('[href="/jobs"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
        // cy.get('div[placeholder="Title:"]').should('have.length', 1)
        //     .within(() => {
        //         cy.get('input[type="text"]').type(titleNewJob)
        //             .should('have.value', titleNewJob)
        //     })
            cy.get('div[placeholder="SKU:"]').should('have.length', 1)
            .within(() => {
                cy.get('input[type="text"]').type(sku)
                    .should('have.value', sku)
            })
            cy.get('.MuiSwitch-input:eq(2)').click()
         cy.wait(5000)
        // cy.reload()
      //  cy.get('table thead').contains('Created On').click().click()
        cy.wait(3000)
        cy.get('tbody tr:first td:nth-child(2) span a')
            .invoke('text')
            .then(title => {
                if (expect(title).to.contain(sku)) {
                    cy.get('tbody tr[role="checkbox"]').should('have.length.of.at.least', 1)
                    cy.get('tbody tr:first td:nth-child(1) span span input').click()
                    cy.get('button').contains('delete').click()
                    cy.get('button').contains('Delete').click()
                }
            })
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})


