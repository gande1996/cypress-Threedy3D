import { registrationSelectors as regsel } from './_selectors-registration'
import { commonSelectors as csel } from '../../../commonSelectors'


Cypress.Commands.add('verifyCreateAccountPage', () => {
   cy.get(csel.aritizeLogo).should('be.visible')
   cy.contains('h3', 'Create an Account').should('be.visible')
   cy.contains('h3', 'Create an Account')
   cy.contains('h3', 'Reset your password').should('not.be.visible')
   cy.contains('h3', 'Log in').should('not.be.visible')
   cy.contains('h5', 'Have an account? ').should('be.visible')
   cy.contains('a', 'Log in').should('be.visible').and('have.attr', 'href', '#')
   cy.contains('h5', 'Please enter your email address. We will send you an email to reset your password.').should('not.be.visible')
   cy.get(regsel.rememberMeCheck).should('not.be.visible')
   cy.contains('label', 'By signing up, you are agreeing to Nextech’s').should('be.visible')
   cy.contains('a', 'Terms and Conditions').should('be.visible').and('have.attr', 'href', 'https://www.nextechar.com/ar-solutions-terms')
   //cy.contains('a', 'Privacy Policy').should('be.visible').and('have.attr', 'href', 'https://www.nextechar.com/nextech-ar-solutions-privacy-policy')
})

Cypress.Commands.add('enterAccountDetails', (emailId, password, isTermsAccepted) => {
   //let userEmail = userId + `${Math.floor(Math.random() * 10000)}` + '@mailsac.com'
   cy.get(regsel.email).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Email Address').clear().type(emailId)
   cy.get(regsel.password).should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Password').clear().type(password)
   cy.get(regsel.confirmPassword).should('be.visible').type(password)
   if (isTermsAccepted) {
      cy.get(regsel.agreeCheck).should('exist').and('not.be.checked').check({ force: true })
   }
   cy.get(regsel.signUpBtn).should('be.visible').and('be.enabled').click({ force: true })
   cy.url().should('include', '/user-detail-init/')
})


Cypress.Commands.add('verifyLetsGetStartedPage', () => {
   cy.url().should('include', '/user-detail-init/')
   cy.get(regsel.topBanner).should('exist').within(() => {
      cy.get('g[id="ARitize_3D_white_svg__Layer_2"]').should('exist')
      cy.contains('button', 'Logout').should('be.visible')
   })
   cy.get('[id="ARitize_3D_dark_svg__Layer_2"]').should('exist')
   cy.contains('h2', 'Let’s get your account set up!').should('be.visible')
   cy.contains('h3', 'Don’t worry, we’ll help guide you every step of the way.')
   cy.contains('button', 'Let’s get started').should('be.visible')
})

Cypress.Commands.add('verifyLetsGetStartedPage', () => {
   cy.url().should('include', '/user-detail-init/')
   cy.get(regsel.topBanner).should('exist').within(() => {
      cy.get('g[id="ARitize_3D_white_svg__Layer_2"]').should('exist')
      cy.contains('button', 'Logout').should('be.visible')
   })
   cy.get('[id="ARitize_3D_dark_svg__Layer_2"]').should('exist')
   cy.contains('h2', 'Let’s get your account set up!').should('be.visible')
   cy.contains('h3', 'Don’t worry, we’ll help guide you every step of the way.')
   cy.contains('button', 'Let’s get started').should('be.visible')
})

Cypress.Commands.add('enterAboutYourself', (firstName, lastName, companyName, phoneNumber) => {
   cy.contains('h3', 'Tell us about yourself').should('be.visible')
   cy.contains('label', 'First Name').should('be.visible')
   cy.contains('button', 'Continue').should('be.visible').and('not.be.enabled')
   cy.get(regsel.firstName).should('be.visible').and('be.enabled').clear().type(firstName).and('have.value', firstName)
   cy.get(regsel.lastName).should('be.visible').and('be.enabled').clear().type(lastName).and('have.value', lastName)
   companyName = companyName + `${Math.floor(Math.random() * 10000)}`
   cy.get(regsel.companyName).should('be.visible').and('be.enabled').clear().type(companyName).and('have.value', companyName)
   cy.contains('button', 'Continue').should('be.visible').and('not.be.enabled')
   cy.get(regsel.phoneNumber).should('be.visible').and('be.enabled').and('have.value', '(+1)___ ___ __ __').type(phoneNumber).and('have.value', '(+1)' + phoneNumber.substring(0, 3) + ' ' + phoneNumber.substring(3, 6) + ' ' + phoneNumber.substring(6, 8) + ' ' + phoneNumber.substring(8, 10))
   //cy.contains('button', 'Continue').should('be.visible').and('be.enabled').realClick()//click({ force: true })
   cy.get('[class*="MuiButtonBase-root MuiButton-root"]:eq(2)').should('be.visible').and('be.enabled').realClick()
   cy.wait(3000)
})

Cypress.Commands.add('verifyPlanPage', () => {
   cy.url().should('include', '/user-detail-init/')
   cy.contains('h3', 'Select a plan that best suits your needs', { timeout: 90000 }).should('be.visible')
   cy.contains('h3', 'Starter').should('be.visible')
   cy.contains('b', '1').should('be.visible')
   cy.contains('h5', ' SKU').should('be.visible')
   cy.contains('div', '1').should('be.visible')   
   cy.contains('b', '30 days free trial').should('be.visible')
   cy.contains('div', '3D Model creation for 1 SKU').should('be.visible')
   cy.contains('div', 'Hosting 3D models').should('be.visible')
   cy.contains('div', 'Integration support').should('be.visible')
   cy.contains('div', '$4').should('be.visible')
   //cy.contains('div', 'No annual contract just pay month to month').should('be.visible')
   cy.contains('div', 'Additional charges may apply due to the complexity of the model').should('be.visible')
   cy.contains('div', '$4.00/mo').should('be.visible')
   cy.contains('button', 'Select Plan').should('be.visible')

   // cy.contains('h3', 'Accelerate').should('be.visible')
   // cy.contains('h5', 'Up to 25 SKUs').should('be.visible')
   // cy.contains('h4', '$500/mo').should('be.visible')
   // cy.contains('h6', 'With 12-month contract').should('be.visible')
   // cy.contains('div', 'Pay in advance &').should('be.visible')
   // cy.contains('div', 'OR').should('be.visible')
   // cy.contains('div', 'Save 10%').should('be.visible')
   // cy.contains('div', '$5400/Year').should('be.visible')
   // cy.contains('div', '3D model creation').should('be.visible')
   // cy.contains('div', 'Hosting 3D models').should('be.visible')
   // cy.contains('div', 'Low monthly fee').should('be.visible')
   // cy.contains('button', 'Select Plan').should('be.visible')
   // cy.contains('h3', '$20.00 / SKU / Month').should('be.visible')

   // cy.contains('h3', 'Growth').should('be.visible')
   // cy.contains('h5', 'Up to 50 SKUs').should('be.visible')
   // cy.contains('h4', '$950/mo').should('be.visible')
   // cy.contains('h6', 'With 12-month contract').should('be.visible')
   // cy.contains('div', 'Pay in advance &').should('be.visible')
   // cy.contains('div', 'OR').should('be.visible')
   // cy.contains('div', 'Save 10%').should('be.visible')
   // cy.contains('div', '$10260/Year').should('be.visible')
   // cy.contains('div', '3D model creation').should('be.visible')
   // cy.contains('div', 'Hosting 3D models').should('be.visible')
   // cy.contains('div', 'Low monthly fee').should('be.visible')
   // cy.contains('button', 'Select Plan').should('be.visible')
   // cy.contains('h3', '$19.00 / SKU / Month').should('be.visible')

   // cy.contains('h3', 'Pro-Growth').should('be.visible')
   // cy.contains('h5', 'Up to 100 SKUs').should('be.visible')
   // cy.contains('h4', '$1800/mo').should('be.visible')
   // cy.contains('h6', 'With 12-month contract').should('be.visible')
   // cy.contains('div', 'Pay in advance &').should('be.visible')
   // cy.contains('div', 'OR').should('be.visible')
   // cy.contains('div', 'Save 10%').should('be.visible')
   // cy.contains('div', '$8640/Year').should('be.visible')
   // cy.contains('div', '3D model creation').should('be.visible')
   // cy.contains('div', 'Hosting 3D models').should('be.visible')
   // cy.contains('div', 'Low monthly fee').should('be.visible')
   // cy.contains('button', 'Select Plan').should('be.visible')
   // cy.contains('h3', '$18.00 / SKU / Month').should('be.visible')

   // cy.contains('h3', 'Hyper-Growth').should('be.visible')
   // cy.contains('h5', 'Up to 500 SKUs').should('be.visible')
   // cy.contains('h4', '$8000/mo').should('be.visible')
   // cy.contains('h6', 'With 12-month contract').should('be.visible')
   // cy.contains('div', 'Pay in advance &').should('be.visible')
   // cy.contains('div', 'OR').should('be.visible')
   // cy.contains('div', 'Save 10%').should('be.visible')
   // cy.contains('div', '$8640/Year').should('be.visible')
   // cy.contains('div', '3D model creation').should('be.visible')
   // cy.contains('div', 'Hosting 3D models').should('be.visible')
   // cy.contains('div', 'Low monthly fee').should('be.visible')
   // cy.contains('button', 'Select Plan').should('be.visible')
   // cy.contains('h3', '$16.00 / SKU / Month').should('be.visible')


})

Cypress.Commands.add('selectPlan', (plan) => {
   cy.url().should('include', '/user-detail-init/')
   cy.wrap(plan).as('selectedPlan')
   switch (plan) {
      case 'starter':
         cy.contains('button', 'Select Plan').eq(0).should('be.visible').click({ force: true })
         break;
      case 'accelerate':
         cy.contains('button', 'Select Plan').eq(1).should('be.visible').click({ force: true })
         break;
      case 'growth':
         cy.contains('button', 'Select Plan').eq(2).should('be.visible').click({ force: true })
         break;
      case 'progrowth':
         cy.contains('button', 'Select Plan').eq(3).should('be.visible').click({ force: true })
         break;
      case 'hypergrowth':
         cy.contains('button', 'Select Plan').eq(4).should('be.visible').click({ force: true })
         break;

   }
})
Cypress.Commands.add('selectBillingDuration', () => {

   cy.contains('h2','Step 3 of 4').should('be.visible')
   cy.contains('h1','Select your billing period').should('be.visible')
   cy.contains('h3','How would you like to be billed?').should('be.visible')   
   cy.get('button span[class="MuiButton-label"]:eq(2)').should('be.visible').click({force:true})

})

Cypress.Commands.add('enterBillingInformation', (firstName, lastName, street, city, province, country, zipCode, isSaveBilling, cardNumber, expiryDate, cvc, isTerms, isPromotion) => {
   cy.contains('h3', 'Enter your billing and payment information').should('be.visible')
   cy.contains('label', 'First Name').should('be.visible')
   cy.contains('label', 'Last Name').should('be.visible')
   //cy.contains('label', 'Street address, P.O. box, c/o').should('be.visible')
   cy.contains('label', 'City').should('be.visible')
   //cy.contains('label', 'State/Province/Region').should('be.visible')
   //cy.contains('div', 'United States of America').should('be.visible')
   //cy.contains('label', 'ZIP/Postal Code').should('be.visible')
   cy.contains('label', 'Card Number').should('be.visible')
   cy.contains('label', 'Expiry Date').should('be.visible')
   cy.contains('label', 'CVV').should('be.visible')
   cy.contains('button', 'Confirm and Pay').should('be.visible').and('not.be.enabled')
   cy.contains('h2', 'Order Summary').should('be.visible')
   cy.contains('div', 'Starter - Annually').should('be.visible')
   cy.contains('div', 'Total Amount').should('be.visible')

   cy.get(regsel.billingFirstName).should('be.visible').and('be.enabled').clear().type(firstName).and('have.value', firstName)
   cy.get(regsel.billingLastName).should('be.visible').and('be.enabled').clear().type(lastName).and('have.value', lastName)
   cy.get(regsel.street).should('be.visible').and('be.enabled').clear().type(street).and('have.value', street)
   cy.get(regsel.city).should('be.visible').and('be.enabled').clear().type(city).and('have.value', city)
   cy.get(regsel.province).should('be.visible').and('be.enabled').clear().type(province).and('have.value', province)
   cy.get(regsel.zipCode).should('be.visible').and('be.enabled').clear().type(zipCode).and('have.value', zipCode)
   cy.get(regsel.country).should('be.visible').click({ force: true })
   cy.contains('li', country).should('be.visible').click({ force: true })
   cy.contains('button', 'Confirm and Pay').should('be.visible').and('not.be.enabled')

   // cy.get('@selectedPlan').then((plan) => {
   //    cy.log('Selected Plan' + plan.toString())
   //    let decidePlanCost = plan.toString()
   //    switch (decidePlanCost) {
   //       case 'starter':
   //          cy.contains('div', '$4.00').should('be.visible')
   //          break;
   //       case 'accelerate':
   //          cy.contains('div', '$5400.00').should('be.visible')
   //          break;
   //       case 'growth':
   //          cy.contains('div', '$10260.00').should('be.visible')
   //          break;
   //       case 'progrowth':
   //          cy.contains('div', '$8640.00').should('be.visible')
   //          break;
   //       case 'hypergrowth':
   //          cy.contains('div', '$8640.00').should('be.visible')
   //          break;
   //          cy.wrap(plan).as('selectedPlan')
   //    }
   // })
   if (isSaveBilling) {
      cy.get(regsel.saveBillings).should('not.be.checked').check({ force: true })
   }
   if (isTerms) {
      cy.get(regsel.isTerms).check({ force: true })
   }
   if (isPromotion) {
      cy.get(regsel.isPromotion).check({ force: true })
   }
   
   cy.contains('button', 'Confirm and Pay').should('be.visible').and('be.enabled')
   cy.getIframe('cardNumber', 0).click({force:true}).type(cardNumber,{force:true})//.should('have.value',cardNumber)  
   
   cy.getIframe('cardExpiry',1).click({ force: true }).type(expiryDate, { force: true })//.should('have.value',expiryDate) 

   cy.getIframe('cardCvc',2).click({force:true}).type(cvc,{force:true}).should('have.value',cvc) 
})
Cypress.Commands.add('enterBillingInformationUpgrade', (firstName, lastName, street, city, province, country, zipCode, isSaveBilling, cardNumber, expiryDate, cvc, isTerms, isPromotion) => {
   cy.contains('h3', 'Enter your billing and payment information').should('be.visible')
   cy.contains('label', 'First Name').should('be.visible')
   cy.contains('label', 'Last Name').should('be.visible')
  
   cy.contains('label', 'City').should('be.visible')
  
   cy.contains('span', '4242').should('be.visible')
   cy.contains('button', 'Confirm and Pay').should('be.visible').and('not.be.enabled')
   cy.contains('h2', 'Order Summary').should('be.visible')
   cy.contains('div', 'Annually').should('be.visible')
   cy.contains('div', 'Total Upgrade Amount').should('be.visible')

   cy.get(regsel.billingFirstName).should('be.visible').and('be.enabled').clear().type(firstName).and('have.value', firstName)
   cy.get(regsel.billingLastName).should('be.visible').and('be.enabled').clear().type(lastName).and('have.value', lastName)
   cy.get(regsel.street).should('be.visible').and('be.enabled').clear().type(street).and('have.value', street)
   cy.get(regsel.city).should('be.visible').and('be.enabled').clear().type(city).and('have.value', city)
   cy.get(regsel.province).should('be.visible').and('be.enabled').clear().type(province).and('have.value', province)
   cy.get(regsel.zipCode).should('be.visible').and('be.enabled').clear().type(zipCode).and('have.value', zipCode)
   cy.get('#country').should('be.visible').and('be.enabled').clear().type('Canada').and('have.value', 'Canada')
 
   cy.contains('button', 'Confirm and Pay').should('be.visible').and('not.be.enabled')

  
   if (isSaveBilling) {
      cy.get(regsel.saveBillings).should('not.be.checked').check({ force: true })
   }
   if (isTerms) {
      cy.get(regsel.isTerms).check({ force: true })
   }
   
   
   cy.contains('button', 'Confirm and Pay').should('be.visible').and('be.enabled')
   
})
Cypress.Commands.add('verifyRegistrationConfirmPage', () => {
   cy.url().should('include', '/user-detail-init/')
   cy.contains('h2', 'Your payment was successful!').should('be.visible')
   cy.contains('p', 'Your account is now ready to go, let’s create your first 3D model!')
   cy.contains('button', 'Create a new model').should('be.visible')
   cy.contains('button', 'Skip, and go to dashboard').should('be.visible')
})