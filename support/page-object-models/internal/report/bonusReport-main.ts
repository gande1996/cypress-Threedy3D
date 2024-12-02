import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('selectReportMethod',(reportType)=>{
    cy.get('a[href="'+reportType+'"]').click({force:true}).then(() => {
        cy.wait(3000, { log: false })
        cy.url().then((currentUrl) => {
         
            expect(currentUrl.indexOf(reportType)).greaterThan(0)
           
        })
    }) 
})

Cypress.Commands.add('validateBonusReportPage',()=>{
    cy.get(rsel.bonusReportSelector).click().type('A Team').
    wait(2000).trigger('keydown', {
        key: 'Enter',
      })

    cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiButton-label').click() 
    cy.wait(4000) 

    cy.contains('span','From').should('be.visible')
    cy.contains('span','To (included)').should('be.visible')
    cy.contains('label','Artist Co:').should('be.visible')

    cy.contains('div','SLA, %').should('be.visible')
    cy.contains('div','FPY, %').should('be.visible')
    cy.contains('div','Total POIDs').should('be.visible')
    cy.contains('div','Primary POIDs').should('be.visible')
    cy.contains('div','Secondary POIDs').should('be.visible')
    cy.contains('div','Points').should('be.visible')

})