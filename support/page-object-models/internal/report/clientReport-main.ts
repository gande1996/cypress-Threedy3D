import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('selectReport', (reportType,reportSelected) => {   
    cy.get('a[href="'+reportType+'"]').click({force:true}).then(() => {
        cy.wait(3000, { log: false })
        cy.url().then((currentUrl) => {
            cy.log(currentUrl)
            expect(currentUrl.indexOf(reportType)).greaterThan(0)
           
        })
    }) 
    cy.contains('p', reportSelected).should('be.visible')
})
Cypress.Commands.add('validateClientReport', () => {    
    cy.get(rsel.DateDropdown).click()
    cy.get('li[data-value="2"]').click()
    cy.get(rsel.clientSelector).click().type('Kohls')
    .type('{downarrow}').wait(2000).type('{enter}')
    // wait(3000).trigger('keydown', {
    //     key: 'Enter',
    //   })
    
    cy.get(rsel.filterButton).click()
    cy.wait(4000)
    cy.contains('tspan', 'Values').should('be.visible')
    cy.contains('span', 'Number of Model Loads /').should('be.visible')
    cy.contains('span', 'Top Models Loaded').should('be.visible')
    cy.contains('span', 'Category Breakdown').should('be.visible')
    cy.get(rsel.dateRangeButton).click()
    })

Cypress.Commands.add('dateRangeSelector', (dateFrom:string, dateTo:string) => {
    cy.get(rsel.dateFromSelector).clear().type(dateFrom).should('have.value', dateFrom.substring(0,2)+'/'+dateFrom.substring(2,4)+'/'+dateFrom.substring(4) )
    cy.get(rsel.dateToSelector).clear().type(dateTo)
    cy.wait(4000)
    cy.get(rsel.filterButton).click()
    cy.wait(3000)
    
})

Cypress.Commands.add('validateDateRange', () => {  
    cy.wait(3000)
    cy.get('.MuiSelect-root').then(function($elem){
        cy.log($elem.text())
        var month=$elem.text()
    })
    cy.contains('tspan', '28 Dec').should('be.visible')
    cy.contains('tspan', '26 Dec').should('not.exist')
})
