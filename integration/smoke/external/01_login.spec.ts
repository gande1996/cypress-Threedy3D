/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

//import { commonSelectors as csel } from '../../../support/commonSelectors'
import { registrationData } from '../../../fixtures/data/registrationData'
import { loginSelectors as logsel } from '../../../support/page-object-models/internal/login/_selectors-login'
import { registrationSelectors as regsel } from '../../../support/page-object-models/internal/registration/_selectors-registration'
describe('SELFSERVE-SMOKE-Client Sign In', () => {
    //C274
    it('validate user successfully sing in and sign out', () => {

        /* Client Logs in */
        cy.log('client logs in')
        cy.login('client', 'clientPassword', 'test')

        /* Admin Logs off */
        cy.log('Log off')
        //cy.signOut('external')
        cy.wait(3000)
        cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]').eq(1).should('be.visible').click({ force: true }).then(() => {
            cy.get('[id="logout"]').should('be.visible').click({force:true})
            // cy.window().then((win) => {
            //     win.eval('document.getElementById("logout-btn").click()');
            // })
        })

    })


})