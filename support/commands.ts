import { createModelSelectors as cmsel } from '../support/page-object-models/internal/create-model/_selectors-createmodel'
import { appBarSelectors as apbsel } from '../support/page-object-models/internal/app-bar/_selectors-app-bar'

import { credentials } from '../fixtures/credentials/credentials'
import { DateUtils } from '../support/Utils/DateUtils'
const dateUtils = new DateUtils()
const { _ } = Cypress
import { loginSelectors as logsel } from '../support/page-object-models/internal/login/_selectors-login'
import { title } from 'process'
import 'cypress-file-upload';
import cypress from 'cypress'


const serverId = Cypress.env("serverID")

Cypress.Commands.add('enterCredentials', (email, password) => {
  cy.get(logsel.emailInput).should('be.visible').type(`${email}`).should('have.value', email)
  cy.get(logsel.passwordInput).should('be.visible').type(`${password}`).should('have.value', password)
})

Cypress.Commands.add('verifyEmailNotification', (emailId, notification: string) => {

  cy.wait(5000)
  cy.mailosaurGetMessage(serverId, {
    sentTo: emailId
  }).then(emailContent => {

    // const toEmail: string | undefined = emailContent.to[0].email
    // const fromEmail: string | undefined = emailContent.from[0].email
    // expect(toEmail).to.equal(emailId)
    // expect(fromEmail).to.equal('info@threedy.ai')
    if (notification == 'createmodel') {
      expect(emailContent.subject).to.equal('We’ve Received Your 3D Model Request')
      expect(emailContent.text?.body).to.contains('Thank you for submitting a model request! We’ll get started processing')
      expect(emailContent.text?.body).to.contains('it as soon as we can.')
      expect(emailContent.text?.body).to.contains('Look out for another email when your 3D model is ready for review within')
      expect(emailContent.text?.body).to.contains('2-3 business days.')
      expect(emailContent.text?.body).to.contains('Still have questions?')
      expect(emailContent.text?.body).to.contains('No worries, we are here to help! Email us at 3d-support@nextechar.com')
      expect(emailContent.text?.body).to.contains('and we’ll get back to you within 1-2 business days.')
      expect(emailContent.text?.body).to.contains('Thank you,')
      expect(emailContent.text?.body).to.contains('The Threedyai Team')
    } else if (notification == 'invitemember') {
      expect(emailContent.subject).to.equal('automation Test Invited You to Join Threedy.ai')
      expect(emailContent.html?.body).to.contains('Hi TestAutomationNtar')
      expect(emailContent.html?.body).to.contains('automation Test has invited you to the Threedy.ai platform. Use the button')
      expect(emailContent.html?.body).to.contains('below to set up your account and get started.')
      expect(emailContent.html?.body).to.contains('Our customer service team can be reached at 3d-support@nextechar.com if')
      expect(emailContent.html?.body).to.contains('you have any questions on how to get started.')
      expect(emailContent.html?.body).to.contains('Thank you,')
      expect(emailContent.html?.body).to.contains('The Threedyai Team')

    } else if (notification == 'commentNotification') {
      expect(emailContent.subject).to.equal('A Comment Has Been Added to Your 3D Model')
      expect(emailContent.text?.body).to.contains('autoName autoLastName left a comment on C308Model')
      expect(emailContent.text?.body).to.contains('Click below to view comments')
      expect(emailContent.text?.body).to.contains('https://portal-test.threedy.ai/products/')
      expect(emailContent.text?.body).to.contains('Need additional help? Email us at 3d-support@nextechar.com and we’ll get')
      expect(emailContent.text?.body).to.contains('back to you as soon as we can.')
      expect(emailContent.text?.body).to.contains('Thank you,')
      expect(emailContent.text?.body).to.contains('The Threedyai Team')

    }

  })

})
Cypress.Commands.add('launchApp', (option) => {

  // if (option === 'test' && option !== undefined) {
  //   Cypress.config('baseUrl', `http://portal-${Cypress.env('test')}.threedy.ai`)
  // } else if (option === 'staging' && option !== undefined) {
  //   Cypress.config('baseUrl', Cypress.env('staging'))
  // }
  Cypress.config('baseUrl', 'http://portal-' + Cypress.env('testLevel') + '.threedy.ai')
  cy.visit('/')
})
Cypress.Commands.add('login', (username, password, option) => {
  //if (option === 'test' && option !== undefined) {
  Cypress.config('baseUrl', 'http://portal-' + Cypress.env('testLevel') + '.threedy.ai')
  // } else if (option === 'staging' && option !== undefined) {
  //   Cypress.config('baseUrl', Cypress.env('staging'))
  // }
  cy.visit('/')
  cy.enterCredentials(credentials[username], credentials[password])
  cy.contains('button', 'Log In').should('be.visible').click({ force: true })
  if (Cypress.env('testLevel') === 'test' && Cypress.env('testLevel') !== undefined) {
    cy.url().should('contain', 'portal-test.threedy.ai')
  } else if (Cypress.env('testLevel') === 'staging' && Cypress.env('testLevel') !== undefined) {
    cy.url().should('contain', 'portal-staging.threedy.ai')
  } else {
    cy.url().should('contain', 'portal-test.threedy.ai')
    cy.contains('Welcome to ARitize 3D').should('be.visible')
  }
  if (username == 'admin') {
    cy.contains('ARitize 3D Dashboard').should('be.visible')
  }
  else if (username == 'invalidUserId') {

  } else cy.contains('Welcome to ARitize 3D').should('be.visible')
  cy.wait(2000)
})


Cypress.Commands.add('loginAPI', (user, password) => {
  //cy.pause()
  Cypress.log({
    name: 'loginViaAuth0',
    message: user,
  });

  const options = {
    method: 'POST',
    url: Cypress.env('auth_url'),
    //failOnStatusCode: false,
    body: {
      grant_type: 'password',
      username: user,
      password: password,
      audience: Cypress.env('auth_audience'),
      scope: 'openid profile email',
      client_id: Cypress.env('auth_client_id'),
      client_secret: Cypress.env('auth_client_secret'),
    },
  };
  cy.request(options)
    .then(resp => resp.body)
    .then((body: any) => {
      // const  access_token = body;
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: '',
        state: 'test-state',
      };
      Cypress.env('token', access_token); // either this or some global var but remember that this will only work in one test case
      cy.writeFile('cypress/fixtures/data/token.json', { tokenKey: access_token })
      //const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
      // cy.visit(callbackUrl, {
      //   onBeforeLoad: (win) => {
      //     win.document.cookie = `com.auth0.auth.test-state=${JSON.stringify(auth0State)}`;
      //   }
      // })
    })
})

Cypress.Commands.add('signOut', (appType) => {
  cy.get(apbsel.appbarPanel).within(() => {
    if (appType === 'internal') {
      cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]:eq(0)').should('be.visible').click({ force: true }).then(() => {
        cy.wait(2000)
        cy.window().then((win) => {
          win.eval('document.getElementById("logout-btn").click()');
        })
        cy.wait(3000)
      })
    } else if (appType === 'external') {
      cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]:eq(1)').should('be.visible').click({ force: true }).then(() => {
        cy.wait(2000)
        cy.window().then((win) => {
          win.eval('document.getElementById("logout").click()');
        })
        cy.wait(1000)
      })

    }


  })

})

Cypress.Commands.add('createModelData', (categoryName, modelName, skyNumber, productUrl, measureType, height, width, depth, imgPath) => {
  cy.log(`Create Service Model ${modelName}`)
  cy.contains('button', 'Let\'s get started').should('be.visible').click({ force: true })
  cy.get(cmsel.categoryName).should('be.visible').and('be.enabled').type(categoryName, { force: true }).then(() => { cy.get(cmsel.categoryName).type('{enter}') })
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  let modelSkuNumber = 'Qa' + `${Math.floor(Math.random() * 100000)}`
  cy.contains('button', 'Continue').should('not.be.enabled')
  cy.enterRequiredModelDetails(modelName, modelSkuNumber, productUrl)
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  cy.contains('button', 'Continue').should('not.be.enabled')
  cy.enterRequiredModelDimensions(measureType, height, width, depth)
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  cy.backForwardCheck()
  cy.get(cmsel.linkImgBtn).should('be.visible').click({ force: true })
  cy.get(cmsel.imageUrl).should('be.visible').type(imgPath)
  cy.contains('span', 'Add Image').should('be.visible').click({ force: true })
  //cy.wait(10000)
  cy.get('[aria-label="delete"][type="button"]').should('exist').and('be.visible')
  cy.contains('button', 'Review your model').should('be.visible').trigger('mouseover').click({ force: true })
  cy.contains('h5', 'Dimensions').should('be.visible')
  cy.contains('Create my model', { timeout: 150000 }).should('be.visible').realClick()//trigger('mouseover').click({ force: true })
  cy.wait(11000)
  cy.get(cmsel.confirmationDialog, { timeout: 60000 }).should('exist')
  cy.contains('h2', 'Success! Your model is now being processed.').should('be.visible')
  cy.contains('span', 'We\'ll send you an email within 2 business days to inform you of an expected delivery date.').should('be.visible')
  cy.contains('button', 'Got it').should('be.visible')
  cy.writeFile('cypress/fixtures/modelId.json', { skuNumber: modelSkuNumber, modelName: modelName })

})

Cypress.Commands.add(
  'dropFile',
  {
    prevSubject: false
  },
  (fileName) => {
    Cypress.log({
      name: 'dropFile'
    });
    return cy
      .fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then((blob) => {
        // instantiate File from `application` window, not cypress window
        return cy.window().then((win) => {
          const file = new win.File([blob], fileName);
          const dataTransfer = new win.DataTransfer();
          dataTransfer.items.add(file);
          return cy.document().trigger('drop', {
            dataTransfer
          });
        });
      });
  }
);


Cypress.Commands.add('getDiv', (index) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }
  const selector = '[role="menu"]>div>button'//`input[data-elements-stable-field-name="${iframe}"]`;
  return cy
    .get('div')
    .its(index)//.should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
})

Cypress.Commands.add('getIframe', (iframe, index) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }

  const selector = `input[data-elements-stable-field-name="${iframe}"]`;
  // if (iframe == 'cardNumber'){

  // }else if(iframe ==''){

  // }else if(iframe ==''){

  // }
  // const selector = `input[name="${iframe}"]`;

  return cy
    .get('[name*="__privateStripeFrame"]:eq(' + index + ')')
    .its(0 + '.contentDocument.body')//.should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
})

Cypress.Commands.add('getForm9Iframe', (selectorInFrame) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }

  const selector = selectorInFrame;
  return cy
    .get('[class="hs-form-iframe"]')
    .its(0 + '.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
})

Cypress.Commands.add('getCardIframe', (selectorInFrame) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }

  const selector = selectorInFrame;
  return cy
    .get('iframe[name="__privateStripeFrame05020"]')
    .its(0 + '.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
})
Cypress.Commands.add('getForm1Iframe', (selectorInFrame) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }

  const selector = selectorInFrame
  return cy
    .get('[class="hs-form-iframe"]')
    .its(0 + '.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
})
Cypress.Commands.add('getLogOut', (iframe, index) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }

  //const selector = `input[data-elements-stable-field-name="${iframe}"]`;
  const selector = `[role="menu"]>div>button`
  return cy
    .get('iframe')
    .its(index + '.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
})


Cypress.Commands.add('waitOnLoad', () => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }
  cy.get('[role="progressbar"]', { timeout: 200000 }).should('not.exist')
})

/** Internal Portal  */

Cypress.Commands.add('homePage', () => {
  cy.get('[aria-label="breadcrumb"] > ol').then($lis => {
    expect($lis, 'Breadcrumb').to.have.length(1);
    expect($lis.eq(0), 'first item').to.contain('Dashboard');
  });

  cy.contains('h3', 'ARitize 3D Dashboard').should('be.visible')

  cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root').each(($el, index, $list) => {


    cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root').eq(index).then(function (name) {
      cy.log(name.text())
    }
    )
  })
  cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root').should($lis => {
    //expect($lis, '43 Left hand Menu').to.have.length(46);
    expect($lis.eq(0), '1st item').to.contain('Dashboard');
    expect($lis.eq(1), '2nd item').to.contain('Products');
    expect($lis.eq(3), '3rd item').to.contain('Feed');
    expect($lis.eq(4), '4th item').to.contain('Jobs');
    expect($lis.eq(7), '5th item').to.contain('Projects');
    expect($lis.eq(8), '6th item').to.contain('Batches');
    expect($lis.eq(9), '7th item').to.contain('Model Compact Config');
    expect($lis.eq(10), '8th item').to.contain('Job Tags');
    expect($lis.eq(12), '10th item').to.contain('Part Tags');
    expect($lis.eq(13), '11th item').to.contain('Meshes');
    expect($lis.eq(15), '12th item').to.contain('Components');
    expect($lis.eq(16), '13th item').to.contain('Mesh Tags');
    expect($lis.eq(17), '9th item').to.contain('Admin');
    expect($lis.eq(19), '9th item').to.contain('Admin Notifications');
    expect($lis.eq(20), '9th item').to.contain('Artist Companies');
    expect($lis.eq(21), '9th item').to.contain('Bulk Updates');
    expect($lis.eq(22), '9th item').to.contain('Clients');
    // expect($lis.eq(23), '8th item').to.contain('Client Categories');
    expect($lis.eq(24), '11th item').to.contain('Email Templates');
    expect($lis.eq(25), '9th item').to.contain('Feature Toggling');
    expect($lis.eq(26), '11th item').to.contain('StyleJoy User Scenes');
    expect($lis.eq(27), '9th item').to.contain('System Categories');
    expect($lis.eq(28), '10th item').to.contain('Tasks');
    expect($lis.eq(29), '9th item').to.contain('Users');
    expect($lis.eq(30), '11th item').to.contain('Tools');
    expect($lis.eq(32), '11th item').to.contain('Color Transfer');
    expect($lis.eq(33), '11th item').to.contain('Texture Expansion');
    expect($lis.eq(34), '11th item').to.contain('Brightness Equalization');
    expect($lis.eq(35), '11th item').to.contain('Playground');
    expect($lis.eq(36), '11th item').to.contain('Tileable Patch');
    expect($lis.eq(37), '11th item').to.contain('Texture Search');
    expect($lis.eq(38), '11th item').to.contain('Reports');
    expect($lis.eq(40), '11th item').to.contain('QuickAR / Model Not Found');
    expect($lis.eq(41), '11th item').to.contain('Client Report');
    expect($lis.eq(42), '11th item').to.contain('Events Report');
    expect($lis.eq(43), '11th item').to.contain('Comment Report');
    expect($lis.eq(44), '11th item').to.contain('Artist Co Report');
    expect($lis.eq(45), '11th item').to.contain('State Tracking Report');
    expect($lis.eq(46), '11th item').to.contain('Model Size Report');
  });

})



Cypress.Commands.add('apiGetRequest', (endPoint, authorization, queryString) => {
  //const token = options.token || JSON.parse(window.sessionStorage.getItem('oauth-token') || '{}').accessToken
  let testUrl
  if (queryString) {
    testUrl = `https://portal-${Cypress.env('testLevel')}.threedy.ai/api/${endPoint}?${queryString}`
  } else {
    testUrl = `https://portal-${Cypress.env('testLevel')}.threedy.ai/api/${endPoint}`
  }
  if (authorization) {
    return cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: testUrl,
      headers: {
        authorization,
      }

      //url: `${apiUri}/${endPoint}`
    })
    // .its('status')
    // .should('eq', 200);
  }
  return cy
})


Cypress.Commands.add('apiPostRequest', (endPoint, authorization, payload) => {
  //const token = options.token || JSON.parse(window.sessionStorage.getItem('oauth-token') || '{}').accessToken
  let testUrl
  if (authorization) {
    return cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `https://portal-${Cypress.env('testLevel')}.threedy.ai/api/${endPoint}`,
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: payload
      //url: `${apiUri}/${endPoint}`
    })
    // .its('status')
    // .should('eq', 200);
  }
  return cy
})

Cypress.Commands.add('waitOnLoad', () => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }
  cy.get('[role="progressbar"]', { timeout: 150000 }).should('not.exist')
})

Cypress.Commands.add('selectDropdownKeyboard', (dropdownSelector, valueSelect) => {
  cy.get(dropdownSelector).click().type(valueSelect).wait(3000)
    .type('{downarrow}').
    trigger('keydown', {
      key: 'Enter',
    })
})

Cypress.Commands.add('navigateToHomePage', () => {
  cy.get('[href="/"]:eq(2)').should('be.visible').trigger('mouseover').click().then(() => {
    cy.url().should('include', 'threedy.ai/')
    //cy.verifyHomePage('internal')
  })
})

Cypress.Commands.add('checkStatusAndReload', () => {
  cy.get('.MuiPaper-root > .MuiInputBase-root > .MuiSelect-root').invoke('text').then((statusText) => {
    const status = statusText.trim()
    if (status === "New") {
      cy.log('Status is still New, reloading the page...')
      cy.wait(5000)
      cy.reload(true)
      
    } else if (status === "Ready for Packaging") {
      cy.log('Status has changed to Ready for Packaging')
    } else {
      cy.log(`Status has changed to: ${status}, no further reloading needed.`)
    }

  })
})

Cypress.Commands.add('validateSort', (SortName, index) => {
  cy.get('table thead').contains(SortName).click().click()
    .then(() => {
      let names: string[] = []
      cy.get('tbody tr td:nth-child(' + index + ')')
        .each(($el, index) => {
          names[index] = $el.text()
        })
      cy.wrap(names).should('deep.eq', names.sort())
    })

  cy.wait(2000)
})

Cypress.Commands.add('pagination', (paginationValue) => {
  cy.get('p').contains('Rows per page:').next()
    .click()
    .then(() => {
      cy.get('li[data-value="' + paginationValue + '"]').click()
    }).wait(2000)
    .then(() => {
      expect('tbody tr').to.have.length.of.at.most(25)
    })
})

Cypress.Commands.add('createModelDataExit', (categoryName, modelName, skyNumber, productUrl, measureType, height, width, depth, imgPath) => {
  cy.log(`Create Service Model ${modelName}`)
  cy.contains('button', 'Let\'s get started').should('be.visible').click({ force: true })
  cy.get(cmsel.categoryName).should('be.visible').and('be.enabled').type(categoryName, { force: true }).then(() => { cy.get(cmsel.categoryName).type('{enter}') })
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  let modelSkuNumber = 'Qa' + `${Math.floor(Math.random() * 100000)}`
  cy.contains('button', 'Continue').should('not.be.enabled')
  cy.enterRequiredModelDetails(modelName, modelSkuNumber, productUrl)
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  cy.contains('button', 'Continue').should('not.be.enabled')
  cy.enterRequiredModelDimensions(measureType, height, width, depth)
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  cy.contains('span', 'Exit').should('be.visible').click({ force: true })
  cy.contains('h2', 'Your model is not complete').should('be.visible')
  cy.contains('span', 'Any information you’ve entered will not be saved').should('be.visible')
  cy.contains('span', 'Go Back').should('be.visible').click()
  cy.contains('span', 'Exit').should('be.visible').click({ force: true })
  cy.contains('span', "Yes, I'm sure.").should('be.visible').click()
})

Cypress.Commands.add('createModelDataEdit', (categoryName, modelName, skyNumber, productUrl, measureType, height, width, depth, imgPath) => {
  cy.log(`Create Service Model ${modelName}`)
  cy.contains('button', 'Let\'s get started').should('be.visible').click({ force: true })
  cy.get(cmsel.categoryName).should('be.visible').and('be.enabled').type(categoryName, { force: true }).then(() => { cy.get(cmsel.categoryName).type('{enter}') })
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  let modelSkuNumber = 'Qa' + `${Math.floor(Math.random() * 100000)}`
  cy.contains('button', 'Continue').should('not.be.enabled')
  cy.enterRequiredModelDetails(modelName, modelSkuNumber, productUrl)
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  cy.contains('button', 'Continue').should('not.be.enabled')
  cy.enterRequiredModelDimensions(measureType, height, width, depth)
  cy.contains('button', 'Continue').should('be.visible').click({ force: true })
  cy.get(cmsel.linkImgBtn).should('be.visible').click({ force: true })
  cy.get(cmsel.imageUrl).should('be.visible').type(imgPath)
  cy.contains('span', 'Add Image').should('be.visible').click({ force: true })
  //cy.wait(10000)
  cy.get('[aria-label="delete"][type="button"]').should('exist').and('be.visible')
  cy.contains('button', 'Review your model').should('be.visible').trigger('mouseover').click({ force: true })
  cy.contains('h5', 'Dimensions').should('be.visible')
  cy.editBasicDetails(productUrl)
  cy.editDimensions()
  cy.editImage()
  cy.contains('Create my model', { timeout: 150000 }).should('be.visible').realClick()//trigger('mouseover').click({ force: true })
  cy.wait(11000)
  cy.get(cmsel.confirmationDialog, { timeout: 60000 }).should('exist')
  cy.contains('h2', 'Success! Your model is now being processed.').should('be.visible')
  cy.contains('span', 'We\'ll send you an email within 2 business days to inform you of an expected delivery date.').should('be.visible')
  cy.contains('button', 'Got it').should('be.visible')
})

Cypress.Commands.add('CreateProductRequest', (ProductName, URL, Productsku, height, width, depth) => {
  cy.get('input[id="title"]').type(ProductName)
  cy.get('input[id="url"]').type(URL)
  cy.get('input[id="sku"]').type(Productsku)
  cy.get('input[Id="heightValue"]').type(height)
  cy.get('input[Id="widthValue"]').type(width)
  cy.get('input[Id="depthValue"]').type(depth)
  cy.get('[class="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]')
    .should('exist')
    .click()
    .then(() => {
      cy.contains('li', 'Cricket Products').should('be.visible').click({ force: true })
      cy.contains('span', 'Urls').click()
      cy.wait(3000)
      cy.get('input[Id="url-0"]').type("https://m.media-amazon.com/images/I/51A75O7cvUL._SL1500_.jpg")
      cy.wait(3000)
      cy.contains('span', 'Add URL').should('be.visible').click()
      cy.contains('span', 'Send Request').should('have.text', "Send Request").click()

    })

})
Cypress.Commands.add('CreateFeedRequest', (Feedtitle, SKU, height, width, depth) => {
  cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"]').should('be.visible', 'New Feed').click()
  cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]').should('exist')
  cy.get('input[id="title"]').type(Feedtitle)
  cy.get('input[id="url"]').type('https://www.amazon.in/')
  cy.get('input[id="sku"]').type(SKU)
  cy.wait(2000)
  cy.get('#client_id').should('be.visible').type('teamsg').click({ force: true })
  cy.contains('li', 'TeamSG').should('have.text', 'TeamSG').click()
  cy.get('#client_category').should('be.visible').type('Cricket Products').click({ force: true })
  cy.contains('li', 'Cricket Products').should('have.text', 'Cricket Products').click()
  cy.get('input[id="heightValue"]').type(height)
  cy.get('input[id="widthValue"]').type(width)
  cy.get('input[id="depthValue"]').type(depth)
  cy.get('input[id="url-0"]').type('https://m.media-amazon.com/images/I/51-DHFzI32L._SY300_SX300_.jpg')
  cy.wait(5000)
  cy.contains('span', 'Add URL').click()
  cy.get('.MuiDialogActions-root > .MuiButton-containedPrimary').click()

})

Cypress.Commands.add('CreateFeedJobRequest', (Feedtitle, SKU, height, width, depth) => {
  cy.contains('span', 'Create Feed + Job').should('be.visible').click()
  cy.get('[role="dialog"][aria-labelledby="customized-dialog-title"]').should('exist')
  cy.get('input[id="title"]').type(Feedtitle)
  cy.get('input[id="url"]').type('https://www.amazon.in/')
  cy.get('input[id="sku"]').type(SKU)
  cy.wait(2000)
  cy.get('#client_id').should('be.visible').type('teamsg').click({ force: true })
  cy.contains('li', 'TeamSG').should('have.text', 'TeamSG').click()
  cy.get('#client_category').should('be.visible').type('Cricket Products').click({ force: true })
  cy.contains('li', 'Cricket Products').should('have.text', 'Cricket Products').click()
  cy.get('input[id="heightValue"]').type(height)
  cy.get('input[id="widthValue"]').type(width)
  cy.get('input[id="depthValue"]').type(depth)
  cy.get('input[id="url-0"]').type('https://m.media-amazon.com/images/I/51-DHFzI32L._SY300_SX300_.jpg')
  cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"]').click()
})

Cypress.Commands.add('ComplexityChecker', (complexityTittle, width, height, depth) => {
  const primaryfilePath = 'attachments/car.jpg';
  cy.get('#primary-image', { timeout: 60000 }).attachFile(primaryfilePath);
  const secondaryfilePath = 'attachments/model.jpg';
  cy.get('#secondary-image', { timeout: 60000 }).attachFile(secondaryfilePath);
  cy.get('[id="category"]').should('be.visible').click({ force: true });
  cy.contains('li', 'Sofa & Seating').should('have.text', 'Sofa & Seating').click();
  cy.get('input[id="title"]').should('be.visible').type(complexityTittle);
  cy.get('input[id="depth"]').should('be.visible').type(depth);
  cy.get('input[id="width"]').should('be.visible').type(width);
  cy.get('input[id="height"]').should('be.visible').type(height);
  cy.contains('span', 'Check Complexity').should('be.visible').click()
})

Cypress.Commands.add('reloadAndWaitForElement', () => {
  cy.reload()
  cy.contains('Title').should('be.visible')
})
