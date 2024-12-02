import {adminSelectors as asel} from './_selectors-admin'

Cypress.Commands.add('createUser', (email) => {
    cy.get(asel.newUserButton).click()
     
    cy.get(asel.emailField).type(email,{delay:1})
    cy.get(asel.passwordField).type('@qwerty1234')
    cy.get(asel.usernameField).type('dummy_user')
    cy.get(asel.firstnameField).type('dummy')
    cy.get(asel.lastnameField).type('user')
    cy.selectDropdownKeyboard(asel.clientDropdown, 'ABC')   
    cy.get(asel.userRoleDropdown).click()
    cy.get(asel.adminUserSelect).click()
    cy.contains('Save').click()
    cy.wait(3000)
})

Cypress.Commands.add('editUser', (email,editEmail) => {
    cy.wait(3000)
    cy.get(asel.emailSorting).click({force: true}).click({force:true})
    cy.get('table tbody tr')
            .should('contain', email)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(asel.edit_delete_updateButton).click()
                cy.get('ul li:first').should('contain', 'Edit').click()
            })
    cy.get(asel.emailField).invoke('val', '')
            .type(editEmail,{delay:1})
    cy.contains('Save').click()
    cy.get('table tbody tr').contains(editEmail)
            .should('exist')
})

Cypress.Commands.add('editPassword', (editEmail) => {
    cy.wait(3000)
    cy.get(asel.emailSorting).click({force: true}).click({force:true})
    cy.get('table tbody tr')
            .should('contain', editEmail)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(asel.edit_delete_updateButton).click()
                cy.get('ul li:last').should('contain', 'Edit Password').click()
            })
    cy.get(asel.passwordField).type('@qwerty123456')
    cy.get(asel.retypePasswordField).type('@qwerty123456')
    cy.contains('Save').click()
    cy.get('table tbody tr').contains(editEmail)
            .should('exist')
})

Cypress.Commands.add('deleteUser', (editEmail) => {
    cy.wait(3000)
    cy.get(asel.emailSorting).click({force: true}).click({force:true})
    cy.get('table tbody tr')
            .should('contain', editEmail)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(asel.edit_delete_updateButton).click()
                cy.contains('Archive').click()
            })

    cy.contains('h2','Archive confirmation').should('be.visible')
    cy.get('.MuiButton-textPrimary').click()      
    cy.get('table tbody tr')
            .should('contain', editEmail)
            .and('not.have.class', 'MuiSvgIcon-colorPrimary')
})

Cypress.Commands.add('restoreUser', (editEmail) => {
    cy.wait(3000)
    cy.get(asel.emailSorting).click({force: true}).click({force:true})
    cy.get('table tbody tr')
            .should('contain', editEmail)
            .and('have.class', 'MuiTableRow-root')
            .within(() => {
                cy.get(asel.edit_delete_updateButton).click()
                cy.contains('Restore').click()
            })

    cy.contains('h2','Restore confirmation').should('be.visible')
    cy.get('.MuiButton-textPrimary').click()      
    cy.get('table tbody tr')
            .should('contain', editEmail)
            .wait(2000)
            .within(() => {
                cy.get('.MuiSvgIcon-colorPrimary').should('be.visible')
                
            })
            
})

Cypress.Commands.add('createUserArtist', (email,password) => {
    cy.get(asel.newUserButton).click()  
    cy.get(asel.emailField).type(email,{delay:1})
    cy.get(asel.passwordField).type(password)
    cy.get(asel.usernameField).type('dummy_user')
    cy.get(asel.firstnameField).type('dummy')
    cy.get(asel.lastnameField).type('user')
    cy.selectDropdownKeyboard(asel.clientDropdown, '__test') 
    cy.get(asel.artistCompanyDropdown).click()
    cy.get(asel.artistCompanySelect).click() 
    cy.get(asel.userRoleDropdown).click()
    cy.get(asel.adminUserSelect).click()
    cy.contains('Save').click()
    cy.wait(3000)
})

Cypress.Commands.add('assignedUserJob', () => {
    cy.get('[href="/jobs"]').eq(1).click()

    cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').
                eq(0).should('be.visible').type('__test')
            cy.contains('li', '__test').should('be.visible').click({ force: true })
            cy.wait(5000)

            let status = "New"

            cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(8)
                .should('exist')
                .click({ force: true })
                .then(() => {
                    cy.get('ul li').contains(status).click()
                        .wait(6000, { log: false })
                })

                cy.get('tbody tr td:nth-child(2) span a').eq(1).click()
                cy.wait(2000)
})

