import {meshSelectors as msel} from './_selectors-mesh'

Cypress.Commands.add('selectMeshType', (meshType) =>{
    cy.get('li').contains('Meshes').siblings('li').click()
         cy.get('[href="'+meshType+'"]').click().then(() => {
             cy.wait(3000, { log: false })
             cy.url().then((currentUrl) => {
                 cy.log(currentUrl)
                 if (currentUrl.indexOf('/job_tags')) {
                     cy.get('[href="'+meshType+'"]').eq(1).click({ force: true })
                     expect(currentUrl).to.include(meshType)
                 }
             })
         })
         cy.contains('p', 'Rows per page')
         cy.wait(3000, { log: false })
})

Cypress.Commands.add('verifyComponentTable', (meshSelected:String,selectVerify:String)=> {
    cy.url().should('include', meshSelected)
    cy.contains('Component Name').click().click()
        .then(() => {
            let names: string[] = []
            cy.get('tbody tr td')
                .each(($el, index) => {
                    if(index % 4 == 1){
                        names[index] = $el.text()
                    }
                })
            cy.wrap(names).should('deep.eq', names.sort())
        })
    cy.get('p').contains('Rows per page:').next()
        .click()
        .then(() => {
            cy.get('li[data-value="10"]').click()
        })
        .then(() => {
            expect('tbody tr').to.have.length.of.at.most(10)
        })
})

Cypress.Commands.add('createMesh', (meshType,createName)=>{
    cy.contains(meshType).as('newComponent')
            .click()
            .then(() => {
                cy.get(msel.closePopUp)
                    .click()
                    .wait(1000);
                cy.get('@newComponent')
                    .should('contain', meshType)
                    .click()
                    .then(() => {
                        cy.get(msel.typeBox)
                            .type(createName)
                            .should('have.value', createName);
                        cy.get(msel.create_editButton)
                            .should('contain', 'Create')
                            .and('not.be.disabled')
                            .click();
                    })
                    .then(() => {
                        cy.contains('Component ID').click({force: true})
                        cy.get('table tbody tr').contains(createName)
                            .should('exist')
                    })
            })
})

Cypress.Commands.add('editMesh',(meshIDType,createName,editName) =>{
    cy.contains(meshIDType).click({force: true})
        cy.get('table tbody tr:first')
            .should('contain', createName)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(msel.actionButton).click()
                cy.get('ul li:last').should('contain', 'Edit').click()
            })
        cy.get(msel.typeBox)
            .type('{selectall}')
            .type(editName)
            .should('have.value', editName)
            .then(() => {
                cy.get(msel.create_editButton)
                    .should('contain', 'Edit')
                    .and('not.be.disabled')
                    .click()
                     cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]',{timeout:90000}).should('not.exist')
            })
        cy.get('table tbody tr').contains(editName)
            .should('exist')
})

Cypress.Commands.add('deleteMesh',(meshIDType,editName) =>{
    cy.contains(meshIDType).click({force: true})
        cy.get('table tbody tr:first')
            .should('contain', 'cypress')
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(msel.actionButton).click()
                cy.get('ul li:first').should('contain', 'Delete').click()
            })
        cy.get(msel.create_editButton)
            .should('contain', 'Delete')
            .and('not.be.disabled')
            .click().wait(1500, {log: false})
        cy.get('table tbody tr')
            .each(($tr) => {
                expect($tr).to.not.contain(editName)
            })
})