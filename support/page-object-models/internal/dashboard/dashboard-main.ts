import { homePageSelectors as hmsel } from './_selectors-dashboard'
import { appBarSelectors as apbsel } from '../../../../support/page-object-models/internal/app-bar/_selectors-app-bar'

Cypress.Commands.add('verifyHomePage', (appType) => {
    if (appType === 'external') {
        cy.contains('div', 'Welcome to ARitize 3D').should('be.visible')
        cy.contains('div', 'Let’s create a new model').should('be.visible')
        cy.contains('div', 'Follow 3 simple steps then let our AI technology create new 3D model for you').should('be.visible')
        //cy.get(hmsel.createModelBtn).should('be.visible').and('have.css', 'background','rgb(74,87,200)')
        cy.contains(hmsel.contactUdBtn, 'Contact Us').should('be.visible')
        cy.contains('div', 'My Models').should('be.visible')
        cy.contains('div', 'View all of the 3D models I’ve created and check out their status and views').should('be.visible')
        //cy.contains('a', 'View My Models').should('be.visible')
        cy.contains('div', 'View Analytics').should('be.visible')
        cy.contains('div', 'Explore how my 3D models are being viewed and where market interest is at').should('be.visible')
        cy.contains('a', 'View Analytics').should('be.visible')
        cy.contains('div', 'How it works').should('be.visible')
        cy.contains('div', 'Watch some tutorial videos to understand and bring the most out of threedy.ai').should('be.visible')
        cy.contains('a', 'Explore Tutorials').should('be.visible')
        cy.contains('div', 'Support').should('be.visible')
        cy.contains('div', 'Need a little help? Leave us a message and we’ll help you every step of the way').should('be.visible')
        cy.contains('a', 'Contact Support').should('be.visible')
        cy.contains('div', 'Need enterprise solutions?').should('be.visible')
        cy.contains('div', 'All the benefits of a personalized and scalable service for enterprise solutions.').should('be.visible')
        //cy.get(hmsel.contactUdBtn).should('be.visible').and('have.css', 'background', 'rgb(255,255,255)')
        cy.contains(hmsel.createModelBtn, 'Create a new model').should('be.visible')
    } else if (appType === 'internal') {

        cy.contains('h3', 'ARitize 3D Dashboard').should('be.visible')    
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root').should($lis => {
            expect($lis, '46 Left hand Menu').to.have.length(51)
            expect($lis.eq(0), '1st item').to.contain('Dashboard')
            expect($lis.eq(1), '2nd item').to.contain('Products')
            expect($lis.eq(2), '3rd item').to.contain('Orders')
            expect($lis.eq(3), '4rth item').to.contain('Feed')
            expect($lis.eq(4), '4th item').to.contain('Jobs')
            //     expect($lis.eq(10), '5th item').to.contain('Part Requests');
            expect($lis.eq(13), '6th item').to.contain('Meshes')
            //     expect($lis.eq(17), '7th item').to.contain('Material');
            expect($lis.eq(23), '8th item').to.contain('Client Categories')
            expect($lis.eq(17), '9th item').to.contain('Admin')
            expect($lis.eq(30), '10th item').to.contain('Tools')
            expect($lis.eq(38), '11th item').to.contain('Reports')
        })
    }
})

Cypress.Commands.add('navigateToCreateModel', () => {
    cy.log('/* Navigate to create model Page */')
    cy.get(hmsel.createModelBtn).should('be.visible').trigger('mouseover').click({ force: true }).then(() => {
        cy.url().should('include', '/create-model')
        cy.verifyCreateModelPage1()
    })
    //cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToProductsPage', () => {
    cy.log('/* Navigate to Product Page */')
    cy.get('[href="/products"]').eq(1).click().then(() => {
        cy.url().should('include', '/products')
        //cy.verifyProductPage()
    })
    //cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateOverviewPage', () => {
    cy.log('/* Navigate to Overview Page */')
    cy.contains('a', 'View Analytics').trigger('mouseover').click({ force: true }).then(() => {
        cy.url().should('include', '/overview')
        cy.verifyOverviewPage()
        cy.verifyEvent('Comment Added', 9)
    })
    //cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateTutorialPage', () => {
    cy.log('/* Navigate to Tutorial Page */')
    cy.contains('a', 'Explore Tutorials').trigger('mouseover').click({ force: true }).then(() => {
        cy.url().should('include', '/how-it-works')
        cy.verifyTutorialPage()
    })
    cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateSupportDialog', () => {
    cy.log('/* Navigate to Support Page */')
    cy.contains('a', 'Contact Support').trigger('mouseover').click({ force: true }).then(() => {
        //cy.get(hmsel.supportDialog).should('exist')
        cy.verifySupportDialog()
    })
    cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateContactUsPage', () => {
    cy.log('/* Navigate to ConatactUs Page */')
    cy.contains('button', 'Contact Us', {timeout:90000}).trigger('mouseover').click({ force: true }).then(() => {
        cy.url().should('include', '/enterprise-contact')
        cy.verifyEnterpriseContactUsPage()
    })
    cy.verifyAppBarPresent()
})

Cypress.Commands.add('navigateToAccounts', () => {
    cy.get('button[id="user-menu"]').should('be.visible').click({ force: true }).then(() => {
        cy.wait(2000)
        cy.window().then((win) => {
            win.eval('document.getElementById("account-settings").click()')
        })
        cy.wait(3000)
    })
  
})

Cypress.Commands.add('navigateToUpgrade', () => {
    cy.get('button[id="user-menu"]').should('be.visible').click({ force: true }).then(() => {
        cy.wait(2000)
        cy.window().then((win) => {
            win.eval('document.getElementById("upgrade-plan").click()')
        })
        cy.wait(3000)
    })  
})


Cypress.Commands.add('navigateToUpgrade', () => {
    cy.get(apbsel.appbarPanel).should('exist').within(() => {
        cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]:eq(1)').should('be.visible').click({ force: true }).then(() => {
            cy.wait(2000)
            cy.window().then((win) => {
                win.eval('document.getElementById("upgrade-plan").click()')
            })
            cy.wait(3000)
        })
    })

})

Cypress.Commands.add('verifySupportDialog', () => {
    cy.getForm1Iframe(hmsel.firstNameLabel).should('be.visible')
    cy.getForm1Iframe(hmsel.firstNameText).should('be.visible')
    cy.getForm1Iframe(hmsel.lastNameLabel).should('be.visible')
    cy.getForm1Iframe(hmsel.lastNameText).should('be.visible')
    cy.getForm1Iframe(hmsel.emailLabel).should('be.visible')
    cy.getForm1Iframe(hmsel.emailText).should('be.visible')
    cy.getForm1Iframe(hmsel.messageLabel).should('be.visible')
    cy.getForm1Iframe(hmsel.messageText).should('be.visible')
    cy.getForm1Iframe(hmsel.legalConsentLabel).should('be.visible')
    cy.getForm1Iframe(hmsel.submitButton).should('be.visible').click()
    cy.getForm1Iframe(hmsel.form9MandatoryErrorMessage1).should('be.visible')
    cy.getForm1Iframe(hmsel.form9MandatoryErrorMessage2).should('be.visible')
    cy.getForm1Iframe(hmsel.firstNameText).type('firsName',{force:true})
    cy.getForm1Iframe(hmsel.lastNameText).type('formlastname',{force:true})
    cy.getForm1Iframe(hmsel.messageText).type('messagetext',{force:true})
    cy.getForm1Iframe(hmsel.submitButton).should('be.visible').click()

    //  cy.get(hmsel.supportDialog).should('exist').within(() => {
    //      cy.get(hmsel.widgetHeader).should('be.visible')
    //      cy.contains('h1', 'Contact us').should('be.visible')
    //      cy.get(hmsel.minimiseBtn).should('be.visible')
    //   cy.get(hmsel.supportDialogForm).should('exist').within(() => {
    //       cy.get(hmsel.formField).each(($elem) => {
    //           cy.wrap($elem).should('be.visible')
    //       })
    //       cy.get(hmsel.formField).eq(0).should('be.visible').within(() => {
    //           cy.contains('strong', 'Email address').should('be.visible')
    //           cy.get(hmsel.textInput).should('be.visible')

    //       })
    //       cy.get(hmsel.formField).eq(1).should('be.visible').within(() => {
    //           cy.contains('strong', 'Your name').should('be.visible')
    //           cy.get(hmsel.textInput).should('be.visible')

    //       })
    //       cy.get(hmsel.formField).eq(2).should('be.visible').within(() => {
    //           cy.contains('strong', 'How can we help you?').should('be.visible')
    //           cy.get(hmsel.textAreaInput).should('be.visible')
    //       })
    //       cy.get(hmsel.formField).eq(3).should('be.visible').within(() => {
    //           cy.contains('strong', 'Attachments').should('be.visible')
    //           cy.get(hmsel.attachBtn).should('be.visible')
    //           cy.contains(hmsel.attachFileInstruction, 'Add up to 5 files').should('be.visible')
    //       })
    //  })
    //})
})

Cypress.Commands.add('navigateToFeedsPage', () => {
    cy.log('/* Navigate to Feed Page */')
    cy.get('[href="/feed"]').eq(1).click().then(() => {
        cy.url().should('include', '/feed')       
    })    
})

Cypress.Commands.add('navigateToJobsPage', () => {
    cy.log('/* Navigate to Jobs Page */')
    cy.get('[href="/jobs"]').eq(1).click().then(() => {
        cy.url().should('include', '/jobs')     
    })
})

Cypress.Commands.add('navigateToAdminClientPage', () => {
    cy.log('/* Navigate to Admin client Page */')
    cy.get('[href="/clients"]').eq(1).click().then(() => {
        cy.url().should('include', '/clients')     
    })
})

Cypress.Commands.add('navigateToAdminUsersPage', () => {
    cy.log('/* Navigate to Admin User Page */')
    cy.get('li').contains('Admin').click()
    cy.get('[href="/users"]').first().click({ force: true }).then(() => {
        cy.url().should('include', '/users')     
    })
})

Cypress.Commands.add('navigateToReportsPage', () => {
    cy.log('/* Navigate to Report Page */')
    cy.get('a[href="/client-report"]').click({force:true}).then(() => {
        cy.url().should('include', '/client-report')     
    })
})




