describe('Brightness Equalization', () => {
    beforeEach(() => {
        cy.log('admin logs in');
        cy.login('admin', 'passwordAdmin', 'test');
        cy.clearCookies()
    })
    it('create_Brightness_Equalization', () => {
        cy.get(':nth-child(37) > .jss66 > .jss60 > [style="flex-grow: 1;"] > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[href="/brightness_equalization"]').click().then(() => {
            cy.wait(3000, { log: false });
            cy.url().then((currentUrl) => {
                cy.log(currentUrl);
                if (currentUrl.includes('/brightness_equalization')) {
                    cy.get('[href="/brightness_equalization"]').eq(1).click({ force: true });
                    expect(currentUrl).to.include('/brightness_equalization');
                }
            });
        });
        const inputPatch = 'attachments/car.jpg';
        cy.get('#inputPatch', { timeout: 6000 }).attachFile(inputPatch)
        cy.get('input[id="n_samples_random_scan"]').clear()
        cy.get('input[id="n_samples_random_scan"]').type('101')
        cy.get('input[id="color_diff_threshold"]').clear()
        cy.get('input[id="color_diff_threshold"]').type('0.2')
        cy.get('input[id="color_sim_threshold"]').clear()
        cy.get('input[id="color_sim_threshold"]').type('8.2')
        cy.get('input[id="initial_damping"]').clear()
        cy.get('input[id="initial_damping"]').type('0.4')
        cy.get('input[id="final_damping"]').clear()
        cy.get('input[id="final_damping"]').type('0.4')
        cy.get('input[id="damping_steps"]').clear()
        cy.get('input[id="damping_steps"]').type('2')
        cy.get('.MuiIconButton-label')
            .find('input[type="radio"]')
            .check({ force: true })
            .should('be.checked')
            .and('have.value', 'BOTH').then(() => {
                cy.wait(2000)
                cy.contains('span', 'Submit').should('be.visible').click()
            })






    })
    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

})