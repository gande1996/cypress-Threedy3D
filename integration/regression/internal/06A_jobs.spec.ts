describe('jobs_Aritize', () => {
    beforeEach(() => {
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

            cy.contains('p', 'Rows per page')
            cy.wait(3000, { log: false })
        })

    })

    it('Sharing_Status_with_Client_Approved', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let status = "Client Approved"
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(10)
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
        cy.get('input[placeholder="SKU:"]').should('be.visible').type('amazon')
        cy.get('.MuiTableBody-root > :nth-child(1) > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .MuiIconButton-label > .jss198').check()
        cy.contains('span', 'more actions').should('be.visible').click()
        cy.get('ul li').contains('Share').click()
        cy.get('[role="dialog"][aria-describedby="alert-dialog-description"]').should('exist')
        cy.get('#text-field-email').should('be.visible').type('akhil.test@myyahoo.com')
        cy.get('#outlined-multiline-message').should('be.visible').type('May models')
        cy.get('.MuiButton-outlinedPrimary').click()
        cy.contains('Is created').should('be.visible').should('have.text', 'Is created!')


    })

    it('Sharing_Status_with_Client_Review_in_progress', () => {
        cy.viewport(1660, 1000)
        cy.wait(5000, { log: false })
        let status = "Client Review In-Progress"
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(10)
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
        cy.get('input[placeholder="SKU:"]').should('be.visible').type('amazon')
        cy.get('.MuiTableBody-root > :nth-child(1) > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .MuiIconButton-label > .jss198').check()
        cy.contains('span', 'more actions').should('be.visible').click()
        cy.get('ul li').contains('Share').click()
        cy.get('[role="dialog"][aria-describedby="alert-dialog-description"]').should('exist')
        cy.get('#text-field-email').should('be.visible').type('akhil.test@myyahoo.com')
        cy.get('#outlined-multiline-message').should('be.visible').type('May models')
        cy.get('.MuiButton-outlinedPrimary').click()
        cy.contains('Is created').should('be.visible').should('have.text', 'Is created!')

    })

})
