import { off } from "process"
import 'cypress-file-upload'
import { TimeoutError } from "cypress/types/bluebird"
// import { expect } from "chai"

describe('jobs_end_to_end', () => {
    beforeEach(() => {
        cy.log("admin login")
        cy.login('admin', 'passwordAdmin', 'Test')
        cy.get('[href="/jobs"]').eq(1).click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                if (currentUrl.indexOf('/jobs')) {
                    cy.get('[href="/jobs"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include("/jobs")
                }
            })
            cy.contains('p', 'Rows per page')
            cy.wait(3000, { log: false })
        })
    })

    it('Upload model with Admin', () => {
        cy.viewport(1660, 1000)
        let clientName = "TeamSG"
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(0)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(clientName).click()
            })
        cy.wait(5000, { log: true })
        let status = "New"
        cy.get('[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]').eq(9)
            .should('exist')
            .click({ force: true })
            .then(() => {
                cy.get('ul li').contains(status).click()
                    .wait(6000, { log: false })
            })
            .then(() => {
                cy.get('tbody tr td:nth-child(2) span a').eq(1).click()
            })
        cy.contains('Title').should('be.visible')
        cy.contains('UPLOAD MODEL').should('be.visible').click()
        cy.wait(10000, { log: false })
        cy.get('.MuiDialog-paper').within(() => {
            // Switch to glb/fbx/zip file type
            cy.get('.MuiSwitch-root').first().click()

            // Ensure the rights confirmation checkbox is checked
            cy.get('input[name="artistNeededConfirm"]').should('be.checked')

            // Upload the file
            const Upload3Dmodel = 'attachments/mesh.glb';
            cy.get('input[type="file"]', { timeout: 30000 })
                .should('be.visible')
                .attachFile(Upload3Dmodel, { allowEmpty: true })

            // Enter a comment (optional)
            cy.get('textarea').first().type('Uploading OBJ file for testing')

            // Click the upload button
            cy.get('button').contains('Upload File').click()
        })
        cy.contains('File is uploaded. Please refresh the page in a minute to get current job status.', { timeout: 30000 })
            .should('be.visible')
            .then(() => {
                cy.log('File uploaded successfully. Refreshig page...')
                cy.wait(6000, { log: false })

            })
        cy.contains('Title').should('be.visible')
        cy.checkStatusAndReload()
        
        

    })








    afterEach(() => {
        /*admin logs off*/
        // cy.log('log off')
        // cy.signOut('internal')
    })

})
