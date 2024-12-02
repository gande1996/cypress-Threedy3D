import { setegid } from 'process'
import { credentials } from '../../../../fixtures/credentials/credentials'
import { accountsSelectors as asel } from './_selectors-accounts'

Cypress.Commands.add('verifyAccountPage', () => {
   cy.contains('h3', 'Account Settings').should('be.visible')
   cy.contains('span', 'Profile Info').should('be.visible')
   cy.contains('span', 'Payments Info').should('be.visible')
   cy.contains('span', 'Billing History').should('be.visible')
   cy.contains('span', 'Preferences').should('be.visible')
   cy.contains('span', 'Team Members').should('be.visible')
   cy.contains('div', 'Profile Information').should('be.visible')
   cy.contains('label', 'First Name').should('be.visible')
   cy.contains('label', 'Last Name').should('be.visible')
   cy.contains('label', 'Phone Number').should('be.visible')
   cy.contains('label', 'Your Role').should('be.visible')
   cy.get('.MuiOutlinedInput-input:eq(0)').invoke('val').should('have.length.greaterThan',0)
   cy.get('.MuiOutlinedInput-input:eq(1)').invoke('val').should('have.length.greaterThan',0)
   cy.get('.MuiOutlinedInput-input:eq(2)').invoke('val').should('have.length.greaterThan',0)
   cy.get('.MuiOutlinedInput-input:eq(3)').invoke('val').should('have.length.greaterThan',0)
   //Change Password
   cy.contains('div', 'Change Password').should('be.visible')
   cy.contains('p', '6 to 32 characters.').should('be.visible')
   cy.contains('span', 'Edit Password').should('be.visible')
   cy.contains('span', 'Edit Profile').should('be.visible')
   cy.contains('span', 'Log Out').should('be.visible')
 //  cy.contains('p', 'Drag & drop images, or click to select files').should('be.visible')
   cy.contains('div', 'EMAIL').should('be.visible')
   //cy.contains('div', 'automationtest@mailsac.com').should('be.visible')

})

Cypress.Commands.add('navigateToPaymentInfo', () => {
   cy.log('/* Navigate to Payment Info */')
   cy.contains('Payments Info').click({ force: true })
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToProfileInfo', () => {
   cy.log('/* Navigate to Payment Info */')
   cy.contains('Payments Info').click({ force: true })
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToBillingHistory', () => {
   cy.log('/* Navigate to Billing History */')
   cy.contains('Billing History').click({ force: true })
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToPreferences', () => {
   cy.log('/* Navigate to Preferences */')
   cy.contains('Preferences').click({ force: true })
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToTeamMembers', () => {
   cy.log('/* Navigate to Team members */')
   cy.contains('Team Members').click({ force: true })
   cy.verifyAppBarPresent()
})


Cypress.Commands.add('editProfile', (firstName, lastName, phoneNumber) => {
   cy.log('/* Navigate toProfile Information */')
   cy.get(asel.firstName).should('be.visible').clear().type(firstName)
   cy.get(asel.lastName).should('be.visible').clear().type(lastName)
   cy.get(asel.phoneNumber).should('be.visible').clear().type(phoneNumber)
   cy.get('.Mui-disabled:eq(1)').should('not.be.enabled')
   cy.contains('Edit Profile').click({force:true})
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('changePassword', (currentPassword, newPassword) => {
   cy.log('/* Navigate to Profile Information change password*/')
   cy.get(asel.currentPassword).should('be.visible').clear().type(currentPassword)
   cy.get(asel.newPassword).should('be.visible').clear().type(newPassword)
   cy.contains('Edit Password').click({force:true})
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('editPaymentInfo', (street, apartment, city, state, country, zip) => {
   cy.log('/* Navigate to Payment Information*/')
   cy.get(asel.streetAddress).should('be.visible').clear().type(street).and('have.value',street)
   cy.get(asel.appartment).should('be.visible').clear().type(apartment).and('have.value',apartment)
   cy.get(asel.city).should('be.visible').clear().type(city).and('have.value',city)
   cy.get(asel.state).should('be.visible').clear().type(state).and('have.value',state)
   cy.get(asel.country).should('be.visible').clear().type(country).and('have.value',country)
   cy.get(asel.postal).should('be.visible').clear().type(zip)
   cy.contains('button', 'Save Changes').click({force:true})
   cy.verifyAppBarPresent()
})

Cypress.Commands.add('addTeamMember', (email) => {
   cy.log('/* Navigate to add team member*/')
   cy.get(asel.addMemberDialog).should('be.visible').within(()=>{
      cy.get(asel.addMemberEmail).should('be.visible').clear().type(email)
      cy.contains('button', 'Send Invite').click({force:true})
      cy.get('button>span[class="MuiIconButton-label"]').should('be.visible').click({force:true})
   }) 

   cy.verifyAppBarPresent()
})

Cypress.Commands.add('verifyPaymentInfo', () => {
   cy.contains('div', 'Payment Methods').should('be.visible')
   cy.contains('button', 'Add Card').should('be.visible')
   cy.contains('label', 'City').should('be.visible')
   cy.contains('label', 'Street address, P.O. box, company name, c/o').should('be.visible')
   cy.contains('label', 'Apartment, suite, unit, building, floor, etc.').should('be.visible')
   cy.contains('label', 'State/Province/Region').should('be.visible')
   cy.contains('label', 'Country').should('be.visible')
   cy.contains('label', 'ZIP/Postal Code').should('be.visible')   

})

Cypress.Commands.add('verifyBillingHistory', () => {
   cy.contains('div', 'date created').should('be.visible')
   cy.contains('div', 'invoice number').should('be.visible')
   cy.contains('div', 'description').should('be.visible')
   cy.contains('div', 'total').should('be.visible')
   cy.contains('div', 'action').should('be.visible')

})
Cypress.Commands.add('verifyPreference', () => {
   cy.contains('div', 'Notifications').should('be.visible')
   cy.contains('div', 'Notify me on my models events').should('be.visible')
   cy.contains('span', 'ON').should('be.visible')
})

Cypress.Commands.add('verifyTeamMembers', () => {
   cy.contains('button', 'Add More Team Members').should('be.visible')
   cy.contains('div', 'ADMIN').should('be.visible')
   cy.contains('div', credentials.client).should('be.visible')
})

Cypress.Commands.add('addCardInfo', () => {
   cy.get('.__PrivateStripeElement:eq(0)').click().type('4444555566667777')
   cy.get('.__PrivateStripeElement:eq(1)').type('1229')
   cy.get('.__PrivateStripeElement:eq(2)').type('777')
})

Cypress.Commands.add('verifyAddMemberDialog', () => {
   cy.contains('button', 'Send Invite').should('be.visible')
   cy.contains('div', 'Add a team member').should('be.visible')
   cy.contains('span', 'Add Emails').should('be.visible')
   cy.contains('div', 'Invite Link').should('be.visible')
   cy.contains('div', 'ADMIN').should('be.visible')
   cy.contains('div', 'Use this link to invite people to register as team members').should('be.visible') 
   cy.contains('button', 'Copy Link').should('be.visible')

})

Cypress.Commands.add('editProfilePhoto', (filePath) => {
 //  cy.contains('div','Edit Photo').click({force:true}).wait(2000).attachFile(filePath)
 cy.get('.MuiGrid-item:eq(0) div:eq(0) div:eq(1)').click({force:true}).wait(2000).attachFile(filePath)
})








