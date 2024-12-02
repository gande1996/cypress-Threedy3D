describe('color_Transfer', () => {
    beforeEach(() => {
        cy.log('admin logs in');
        cy.login('admin', 'passwordAdmin', 'test');
        cy.clearCookies()
    })
    it('New_Color_Trasfer', () => {
        cy.get(':nth-child(37) > .jss66 > .jss60 > [style="flex-grow: 1;"] > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[href="/color_transfer"]').click().then(() => {
            cy.wait(3000, { log: false });
            cy.url().then((currentUrl) => {
                cy.log(currentUrl);
                if (currentUrl.includes('/color_transfer')) {
                    cy.get('[href="/color_transfer"]').eq(1).click({ force: true });
                    expect(currentUrl).to.include('/color_transfer');
                }
            });
        });
        const colorTheme = 'attachments/car.jpg';
        cy.get('#colorTheme',{timeout:6000}).attachFile(colorTheme);
        const inputPattern = 'attachments/model.jpg';
        cy.get('#inputPattern',{timeout:6000}).attachFile(inputPattern)
        cy.contains('span','Submit').should('be.visible').click()
        cy.get('[title="Output"]').should('be.visible')
        cy.contains('span','Download').should('be.visible').click()
        cy.wait(2000)
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
})