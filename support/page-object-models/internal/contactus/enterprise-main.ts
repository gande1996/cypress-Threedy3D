import { enterpriseSelectors as enterSel } from './_selectors-enterprise'

Cypress.Commands.add('verifyEnterpriseContactUsPage', () => {
    cy.contains('p', 'Why build with enterprise?').should('be.visible')
    cy.contains('p', 'At threedy.ai, we’re commited to using our scalable AI technology to provide the fastest and smoothest 3D modelling experience for your business.').should('be.visible')
    cy.contains('li', 'Unlimited clicks').should('be.visible')
    cy.contains('li', 'Unlimited models').should('be.visible')
    cy.contains('li', 'Maximum security').should('be.visible')
    cy.contains('li', 'Personalized and constant support').should('be.visible')
    cy.contains('h1', 'We\'re excited to get in touch.').should('be.visible')
    cy.contains('h2', 'Send a message:').should('be.visible')
    cy.wait(5000)
    cy.reload()
    cy.wait(10000)
    // cy.contains('span', 'First Name').should('be.visible')
    // cy.contains('span', '*').should('be.visible')
    // cy.contains('span', 'Email').should('be.visible')
    // cy.contains('span', 'Last Name').should('be.visible')
    // cy.contains('span', 'Phone Number').should('be.visible')
    // cy.contains('span', 'Company Name').should('be.visible')
    // cy.contains('span', 'Please select your primary region').should('be.visible')
    // cy.contains('p', 'I agree to receive communication from www.nextechar.com.').should('be.visible')
    // cy.contains('span', 'Message').should('be.visible')
    // cy.contains('span','protected by ')
    // cy.contains('strong','reCAPTCHA')
   

    cy.getForm9Iframe(enterSel.form9FirstName).click({force:true}).type('firsName',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9LastName).click({force:true}).type('formlastname',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9Company).click({force:true}).type('company',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9Email).click({force:true}).type('rakesh.ingole@next.com',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9Phone).click({force:true}).type('878898246',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9Message).click({force:true}).type('messagetext',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9ContactRegion).select('North America')//.should('have.value',cardNumber)
    cy.getForm9Iframe(enterSel.form9LegalCheckbox).click({force:true})//.should('have.value',cardNumber)
    //cy.getForm9Iframe(enterSel.form9SubmitBtn).click({force:true})//.should('have.value',cardNumber)
   
   
})

Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
    // Wait until the iframe (Google reCAPTCHA) is totally loaded
    cy.wait(500)
    cy.get('[id="target"] *> iframe')
        .then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find('.recaptcha-checkbox-border')
                .should('be.visible')
                .click()
        })
})
 

Cypress.Commands.add('verifyContactUsPage', () => {
    cy.contains('p', 'Support and Help').should('be.visible')
    cy.contains('li a', 'Dashboard').should('be.visible')
    cy.contains('h1', 'Submit a request or leave us a question.').should('be.visible')
    cy.contains('h1', 'We\'re here to help').should('be.visible').and('have.css', 'color','rgb(226, 0, 218)')
    cy.wait(5000)
    cy.reload()
    cy.wait(5000)
    cy.getForm9Iframe(enterSel.form9SubmitBtn).should('be.visible').click()
    cy.getForm9Iframe(enterSel.form9MandatoryErrorMessage1).should('be.visible')
    cy.getForm9Iframe(enterSel.form9MandatoryErrorMessage2).should('be.visible')
    //cy.contains('label','Please complete this required field.').should('be.visible')
    //cy.contains('label','Please complete all required fields.').should('be.visible')
    cy.getForm9Iframe(enterSel.form9FirstName).click({force:true}).type('firsName',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9LastName).click({force:true}).type('formlastname',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9Email).click({force:true}).clear().
    type('rakesh.ingole@next.com',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9Message).click({force:true}).type('messagetext',{force:true})//.should('have.value',cardNumber)  
    cy.getForm9Iframe(enterSel.form9LegalCheckbox).click({force:true})//.should('have.value',cardNumber)
    cy.getForm9Iframe(enterSel.form9SubmitBtn).should('be.visible').click()
  
  
})
