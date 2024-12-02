import {reportSelectors as rsel} from './_selectors-report'

Cypress.Commands.add('validateNewTab',()=>{
    cy.get(rsel.newTab).click()
    cy.contains('div','Job Id').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Created On (UTC)').should('be.visible')
    cy.contains('div','tag').should('be.visible')
    cy.wait(5000)
    cy.get('.MuiTableCell-sizeSmall:eq(6)').should('be.visible')
    
})

Cypress.Commands.add('validateDeliveredTab',()=>{
    cy.get(rsel.deliveredTab).click()
    cy.contains('div','Job Id').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Created On (UTC)').should('be.visible')
    cy.contains('div','tag').should('be.visible')
    //Data not loading do not validated table value
})

Cypress.Commands.add('validateCompletedTab',()=>{
    cy.get(rsel.completedTab).click()
    cy.contains('div','Job Id').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Created On (UTC)').should('be.visible')
    cy.contains('div','tag').should('be.visible')
    cy.contains('div','Approval Date (UTC)').should('be.visible')
   // cy.contains('div','Complexity').should('be.visible')
    cy.contains('div','Production Days').should('be.visible')
    cy.get('.MuiTableCell-sizeSmall:eq(9)').should('be.visible')
})

Cypress.Commands.add('validateReworkNeededTab',()=>{
    cy.get(rsel.reworkNeededTab).click()
    cy.contains('div','Job Id').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Created On (UTC)').should('be.visible')
    cy.contains('div','tag').should('be.visible')
    //Data not loading do not validated table value
})

Cypress.Commands.add('validateRejectedTab',()=>{
    cy.get(rsel.rejectedTab).click()
    cy.contains('div','Job Id').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Created On (UTC)').should('be.visible')
    cy.contains('div','tag').should('be.visible')
    //Data not loading do not validated table value
})

Cypress.Commands.add('validateAgingTab',()=>{
    cy.get(rsel.agingTab).click()
    cy.contains('h4','Data for over SLA models').should('be.visible')
    cy.contains('div','SLA').should('be.visible')
    cy.contains('div','In House').should('be.visible')
    cy.contains('div','QA Artist Company').should('be.visible')
    cy.get('.MuiTableCell-sizeSmall:eq(9)').should('be.visible')
    cy.contains('h4','Deadline for In House').should('be.visible')
    cy.contains('div','Days To Deadline').should('be.visible')
    cy.contains('div','Models').should('be.visible')
})

Cypress.Commands.add('validateWeeklyTab',()=>{
    cy.get(rsel.weeklyTab).click()
    cy.contains('div','W#').should('be.visible')
    cy.contains('div','Day').should('be.visible')
    cy.contains('div','Nile Requested').should('be.visible')
    cy.contains('div','Actual Worked').should('be.visible')
    cy.contains('div','No Artist').should('be.visible')
    cy.contains('div','In House Complex+ Pro').should('be.visible')
   // cy.contains('div','Total worked on by QA Artist Company').should('be.visible')
    cy.contains('div','Cancelled Complex+').should('be.visible')
    cy.contains('div','Delivered Models').should('be.visible')
    cy.contains('div','Nile Approved Models').should('be.visible')
    cy.contains('div','Under Revision').should('be.visible')
    cy.contains('div','Average Price').should('be.visible')
   // cy.get('.MuiTableCell-sizeSmall:eq(14)').should('be.visible')
    
})

Cypress.Commands.add('validateDeadlineTab',(dateFrom)=>{
    cy.get(rsel.deadlineTab).click()
    cy.contains('div','Job Id').should('be.visible')
    cy.contains('div','SKU').should('be.visible')
    cy.contains('div','Created On (UTC)').should('be.visible')
    cy.contains('span','Artist Company').should('be.visible')
    cy.contains('span','Days To Deadline').should('be.visible')
    cy.contains('span','Revisions').should('be.visible')
    cy.contains('label','Status').should('be.visible')
    cy.contains('label','Revisions:').should('be.visible')
    cy.contains('label','Artist Co:').should('be.visible')
    cy.contains('label','Tag').should('be.visible')
    cy.get('.MuiTableCell-sizeSmall:eq(9)').should('be.visible')
    cy.get(rsel.dateFromSelector).clear().type(dateFrom)
    cy.get(rsel.filterButton).click()
    //cy.contains('div','71 days past').should('not.exist')
})

Cypress.Commands.add('validateQAErrorsTab',()=>{
    cy.get(rsel.QAErrorsTab).click()
    cy.contains('span','Job Id').should('be.visible')
    cy.contains('span','SKU').should('be.visible')
    cy.contains('span','Created On (UTC)').should('be.visible')
    cy.contains('div','Revision Count').should('be.visible')
    cy.contains('div','Reason Added on (UTC)').should('be.visible')
    cy.contains('div','Reason').should('be.visible')
    cy.contains('div','Notes').should('be.visible')
    cy.contains('span','QA Errors:').should('be.visible')
    //Data not loading do not validated table value
})

Cypress.Commands.add('validateReportTab',()=>{
    cy.get(rsel.reportTab).click()
    cy.contains('div','Name').should('be.visible')
    cy.contains('div','Value').should('be.visible')
    cy.get('.MuiTableCell-sizeSmall:eq(6)').should('be.visible')
})