import {adminSelectors as asel} from './_selectors-admin'

Cypress.Commands.add('createCategory', (categoryName) => {
    cy.contains('New Category').click()
    cy.get(asel.orientationDropdown).click()
    cy.get('li[data-value="2"]').click()
    cy.get(asel.complexityDropdown).click()
    cy.get('li[data-value="1"]').click()
    cy.get(asel.categoryDropdown).click()
    cy.get('li[data-value="10184"]').click()
    cy.get(asel.categoryNameField).type(categoryName)
    cy.contains('h4','Create Category').should('be.visible')
    cy.get(asel.createCategoryButton).click()
    cy.wait(2000)
    

})

Cypress.Commands.add('editCategory', (categoryName,editCategoryName) => {
    cy.get(asel.emailSorting).click({force: true}).click({force:true})
    cy.get('table tbody tr')
            .should('contain', categoryName)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(asel.edit_delete_updateButton).click()
                cy.get('ul li:last').should('contain', 'Edit').click()
            })
    cy.get('.MuiInput-input:eq(3)').type('{selectall}')
            .type(editCategoryName)
    cy.get(asel.createCategoryButton).click()
    cy.wait(2000)


})

Cypress.Commands.add('deleteCategory', (categoryName,editCategoryName) => {
    cy.get(asel.emailSorting).click({force: true}).click({force:true})
    cy.get('table tbody tr')
            .should('contain', categoryName)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(asel.edit_delete_updateButton).click()
                cy.get('ul li:first').should('contain', 'Delete').click()
            })
   
    cy.get(asel.createCategoryButton).click()
    cy.wait(2000)


})