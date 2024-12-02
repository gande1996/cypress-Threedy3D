describe('color_Transfer', () => {
    beforeEach(() => {
        cy.log('admin logs in');
        cy.login('admin', 'passwordAdmin', 'test');
        cy.clearCookies()
    })
    it('Create_texture_expansion', () => {
        cy.get(':nth-child(37) > .jss66 > .jss60 > [style="flex-grow: 1;"] > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[href="/texture_expansion"]').click().then(() => {
            cy.wait(3000, { log: false });
            cy.url().then((currentUrl) => {
                cy.log(currentUrl);
                if (currentUrl.includes('/texture_expansion')) {
                    cy.get('[href="/texture_expansion"]').eq(1).click({ force: true });
                    expect(currentUrl).to.include('/texture_expansion');
                }
            });
        });
        const inputPatch = 'attachments/car.jpg';
        cy.get('#inputPatch', { timeout: 6000 }).attachFile(inputPatch)
        cy.get('input[id="block_size"]').click().clear()
        cy.get('input[id="block_size"]').type('52')
        cy.get('input[id="output_texture_size"]').click().clear()
        cy.get('input[id="output_texture_size"]').type('550')
        cy.get('input[id="overlap"]').click().clear()
        cy.get('input[id="overlap"]').type('10')
        cy.get('input[id="fuzzy_search_threshold"]').click().clear()
        cy.get('input[id="fuzzy_search_threshold"]').type('0.4')
        // cy.get('.MuiIconButton-label')
        //     .find('input[type="radio"]')
        //     .check()
        //     .should('be.checked')
        //     .and('have.value', 'Best');
        cy.contains('span','Submit').should('be.visible').click()
    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})