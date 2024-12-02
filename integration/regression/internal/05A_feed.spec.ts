import { exists } from "fs"

describe('Portal-Feed-Filter', () => {
    beforeEach(()=>{
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        cy.clearCookies()
        // cy.homePage()
    })
    it('CreateFeed-Job', () => {
        let sku = 'SKU' + Cypress._.random(0, 1e6).toString()
        cy.get('[href="/feed"]').eq(1).click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/feed')) {
                    cy.get('[href="/feed"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/feed')
                }
            })
        })
        
        cy.CreateFeedJobRequest('watches', sku,'8','8','9')
        
    })

    it('createNewFeedRequest', () => {
        let sku = 'SKU' + Cypress._.random(0, 1e6).toString()

        
        cy.get('[href="/feed"]').eq(1).click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/feed')) {
                    cy.get('[href="/feed"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/feed')
                }
            })
        })
        
        cy.CreateFeedRequest('Lamps', sku,'2','3','5')
        
    })
    afterEach(()=>{
         /* Admin Logs off */
         cy.log('Log off')
         cy.signOut('internal')
    })

})