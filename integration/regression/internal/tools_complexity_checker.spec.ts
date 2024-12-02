import { should } from 'chai';
import 'cypress-file-upload';

describe('Complexity_Checker', () => {
    beforeEach(() => {
        cy.log('admin logs in');
        cy.login('admin', 'passwordAdmin', 'test');
        cy.clearCookies()
        // cy.homePage()
    });

    it('Check_complexityChecker', () => {
        cy.get(':nth-child(37) > .jss66 > .jss60 > [style="flex-grow: 1;"] > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[href="/complexity-checker"]').click().then(() => {
            cy.wait(3000, { log: false });
            cy.url().then((currentUrl) => {
                cy.log(currentUrl);
                if (currentUrl.includes('/complexity-checker')) {
                    cy.get('[href="/complexity-checker"]').eq(1).click({ force: true });
                    expect(currentUrl).to.include('/complexity-checker');
                }
            });
        });

        cy.ComplexityChecker('watches', '4','4','6')
        // cy.wait(2000)
        // cy.contains('Service responded with an error').should('be.visible').and('have.text','Service responded with an error')
        // cy.contains('N/A').should('be.visible').and('have.text','N/A')
        // cy.contains('span','New Search').should('be.visible').click()
    });
    it('Check_complexityChecker_NewSearch', () => {
        cy.get(':nth-child(37) > .jss66 > .jss60 > [style="flex-grow: 1;"] > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[href="/complexity-checker"]').click().then(() => {
            cy.wait(3000, { log: false });
            cy.url().then((currentUrl) => {
                cy.log(currentUrl);
                if (currentUrl.includes('/complexity-checker')) {
                    cy.get('[href="/complexity-checker"]').eq(1).click({ force: true });
                    expect(currentUrl).to.include('/complexity-checker');
                }
            });
        });
        
       cy.ComplexityChecker('sofa', '14','25','13')
        
    })

    afterEach(() => {

        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })

});
