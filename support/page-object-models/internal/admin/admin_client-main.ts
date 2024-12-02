

Cypress.Commands.add('createClient', (clientName) => {
    cy.contains('New Client').as('addClient')
            .click()
            .then(() => {
                cy.get('button[aria-label="close"]')
                    .click()
                    .wait(1000);
                cy.get('@addClient')
                    .should('contain', 'New Client')
                    .click()
                    .then(() => {
                        cy.get('.MuiDialog-paper').find("div[class='MuiInputBase-root MuiInput-root MuiInput-underline Mui-error Mui-error MuiInputBase-formControl MuiInput-formControl'] input")
                            .type(clientName)
                            .should('have.value', clientName);
                        cy.get('.MuiDialogContent-root .MuiInputBase-root > .MuiSelect-root').eq(0)
                            .should('exist')
                            .click()
                            .then(() => {
                                cy.get("ul li[data-value='model-viewer']").click()
                                cy.wait(1500, {log: false})
                            })
                        cy.get('button[class*="MuiButton-textPrimary"]')
                            .should('contain', 'Create')
                            .and('not.be.disabled')
                            .click();
                    })
                    .then(() => {
                        cy.contains('Client ID').click({force: true})
                        cy.get('table tbody tr').contains(clientName)
                            .should('exist')
                    })
            })
})

Cypress.Commands.add('editClient',(clientName,editName_Client)=>{
    cy.get('input[placeholder="Search client"]').type(clientName)
    cy.contains('Client ID').click({force: true})
    cy.get('table tbody tr:first')
        .should('contain', clientName)
        .and('have.class', 'MuiTableRow-root')
        .within(() => {
            cy.get('[aria-label="select merge strategy"]').click()
            cy.get('ul li:nth-child(2)').should('contain', 'Edit').click()
        })
        cy.get('.MuiInput-input:eq(0)')
        .type('{selectall}')
        .type(editName_Client)
        .should('have.value', editName_Client)

        cy.contains('Save').click()
})

Cypress.Commands.add('archiveClient',(editName_Client)=>{
    cy.get('input[placeholder="Search client"]').type(editName_Client)
        cy.contains('Client ID').click({force: true})
        cy.get('table tbody tr:first')
            .should('contain', editName_Client)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get('[aria-label="select merge strategy"]').click()
                cy.get('ul li:first').should('contain', 'Archive').click()
            })
        cy.get('button[class*="MuiButtonBase-root MuiButton-root MuiButton-text"]:eq(1)')
            .should('contain', 'CONFIRM')
            .and('not.be.disabled')
            .click().wait(1000, {log: false})
        cy.get('table tbody tr:first').should('not.contain', editName_Client)
})

Cypress.Commands.add('restoreClient',(editName_Client)=>{
    cy.get('.MuiSwitch-input:eq(0)').click()
    cy.get('input[placeholder="Search client"]').type(editName_Client)
    cy.contains('Client ID').click({force: true})
    cy.get('table tbody tr:first')
        .should('contain', editName_Client)
        .and('have.class', 'MuiTableRow-root')
        .within(() => {
            cy.get('[aria-label="select merge strategy"]').click()
            cy.get('ul li:nth-child(3)').should('contain', 'Restore').click()
        })

    cy.contains('h4','WARNING: If you restore client, related users listed below will also be restore! Confirm?').should('be.visible')
    cy.contains('span','CANCEL').should('be.visible')
    cy.get('button[class*="MuiButtonBase-root MuiButton-root MuiButton-text"]:eq(1)')
        .should('contain', 'CONFIRM')
        .and('not.be.disabled')
        .click().wait(1000, {log: false})
        cy.get('.MuiSwitch-input:eq(0)').click() 
        cy.get('table tbody tr:first').should('contain', editName_Client)  
})