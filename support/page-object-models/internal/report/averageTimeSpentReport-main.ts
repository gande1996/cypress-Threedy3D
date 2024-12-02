import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('selectTimeSpentReport', (reportType,reportSelected) => {   
    cy.get('a[href="'+reportType+'"]').click({force:true}).then(() => {
        cy.wait(3000, { log: false })
        cy.url().then((currentUrl) => {
            cy.log(currentUrl)
            expect(currentUrl.indexOf(reportType)).greaterThan(0)
           
        })
    }) 
    cy.contains('h3', reportSelected).should('be.visible')
})

Cypress.Commands.add('validateSummaryReport',()=>{
    cy.get('.Mui-selected').click()
    cy.contains('span','Tag:').should('be.visible')
    cy.contains('span','Assigned User:').should('be.visible')
    cy.contains('span','Artist Co:').should('be.visible')
    cy.contains('span','Clients:').should('be.visible')
    cy.contains('span','From').should('be.visible')
  //  cy.contains('span','To').should('be.visible')
    cy.contains('span','Reset').should('be.visible')
    cy.contains('span','export summary').should('be.visible')
    cy.verifyReportSection('All',7)
    cy.verifyReportSection('Primary',8)
    cy.verifyReportSection('Secondary',9)
    cy.verifyReportSection('Mesh Only',10)
               

 })

 Cypress.Commands.add('verifyReportSection',( section,  index)=>{
if(section=='All'){
    cy.get('.MuiPaper-elevation1:eq(7)')
                    .within(() => {
                        cy.verifyDetails()
                    })
}

else if(section=='Primary'){
    cy.get('.MuiPaper-elevation1:eq(8)')
    .within(() => {
        cy.verifyDetails()
    })
}
else if(section=='Secondary'){
    cy.get('.MuiPaper-elevation1:eq(9)')
    .within(() => {
        cy.verifyDetails()
    })
}
else if(section=='Mesh Only'){
    cy.get('.MuiPaper-elevation1:eq(10)')
    .within(() => {
        cy.verifyDetails()
    })
}
 })


 Cypress.Commands.add('verifyDetails',()=>{
    cy.contains('div','Complexity').should('be.visible')
        cy.contains('div','Average (mins)').should('be.visible')
        cy.contains('div','Average (HH:MM)').should('be.visible')
        cy.contains('div','Job Count').should('be.visible')
 })


            
