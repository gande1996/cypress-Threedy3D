import { createModelSelectors as cmsel } from './_selectors-createmodel'

Cypress.Commands.add('verifyCreateModelPage1', () => {
   cy.contains('h1', 'Create a new 3D Model').should('be.visible')
   cy.contains('h2', 'Follow these 4 simple steps and get your 3D model off the ground').should('be.visible')
   cy.contains('li', '1').should('be.visible')
   cy.contains('li', 'Choose your category').should('be.visible')
   cy.contains('li', '2').should('be.visible')
   cy.contains('li', 'Enter some basic details').should('be.visible')
   cy.contains('li', '3').should('be.visible')
   cy.contains('li', 'Enter the model dimensions').should('be.visible')
   cy.contains('li', '4').should('be.visible')
   cy.contains('li', 'Upload your reference images').should('be.visible')
   // cy.get(cmsel.letsGetStartedBtn).should('be.visible').and('have.css', 'background-color','rgb(74,87,200)')
   //cy.contains(cmsel.letsGetStartedBtn, 'Let\'s get started').should('be.visible')   
})

Cypress.Commands.add('enterRequiredModelDetails', (modelTitle, modelSkuNumber, productUrl)=>{   
   cy.log('$$'+modelSkuNumber)
   cy.get(cmsel.modelTitle).should('be.visible').and('be.be.enabled').type('{selectall}{backspace}').type(modelTitle).should('have.value',modelTitle)
   cy.get(cmsel.modelSku).should('be.visible').and('be.be.enabled').type('{selectall}{backspace}').type(modelSkuNumber).should('have.value',modelSkuNumber)
   cy.get(cmsel.modelProductUrl).should('be.visible').and('be.be.enabled').type('{selectall}{backspace}').type(productUrl).should('have.value',productUrl)
})

Cypress.Commands.add('enterRequiredModelDimensions', (measureType, height, width, depth)=>{
   if(measureType==='inches'){
      cy.get(cmsel.unitInInches).should('be.visible').click({force:true})
      cy.get(cmsel.height).should('be.visible').and('be.be.enabled').type(height).should('have.value',height)
      cy.get(cmsel.width).should('be.visible').and('be.be.enabled').type(width).should('have.value',width)
      cy.get(cmsel.depth).should('be.visible').and('be.be.enabled').type(depth).should('have.value',depth)
   }else if (measureType === 'cm'){
      cy.get(cmsel.unitInCm).should('be.visible').click({force:true})
      cy.get(cmsel.height).should('be.visible').and('be.be.enabled').type(height)
      cy.get(cmsel.width).should('be.visible').and('be.be.enabled').type(width)
      cy.get(cmsel.depth).should('be.visible').and('be.be.enabled').type(depth)
   }
   
})

Cypress.Commands.add('uploadImage', (path)=>{

   // cy.get(cmsel.uploadImgBtn).should('be.visible').type(modelTitle).should('have.value',modelTitle)
   // cy.get(cmsel.modelSku).should('be.visible').and('be.be.enabled').type(modelSkuNumber).should('have.value',modelSkuNumber)
   // cy.get(cmsel.modelProductUrl).should('be.visible').and('be.be.enabled').type(productUrl).should('have.value',productUrl)

})

Cypress.Commands.add('editBasicDetails',(productUrl)=>{
   cy.get('.MuiButton-label:eq(3)').click();
   cy.contains('h1','Enter some basic details').should('be.visible')
   let SKUNumberEdit = 'Qa' + `${Math.floor(Math.random() * 100000)}`
   cy.enterRequiredModelDetails('Test123', SKUNumberEdit, productUrl)
   cy.contains('button', 'Continue').should('be.visible').click({ force: true })
   cy.contains('button', 'Continue').should('be.visible').click({ force: true })
   cy.get(cmsel.imageUrl).should('be.visible')
   cy.contains('span', 'Add Image').should('be.visible').click({force:true})
   cy.get('[aria-label="delete"][type="button"]').should('exist').and('be.visible')
   cy.contains('button', 'Review your model').should('be.visible').trigger('mouseover').click({ force: true })
   cy.contains('h5', 'Dimensions').should('be.visible')
   cy.contains('span', 'Test123').should('be.visible')
   cy.contains('span', SKUNumberEdit).should('be.visible')
 })

 Cypress.Commands.add('editDimensions',()=>{
   cy.get('.MuiButton-label:eq(5)').click();
   cy.enterRequiredModelDimensions('cm', 0,0,0)  
   cy.contains('button', 'Continue').should('be.visible').click({ force: true })
   cy.get(cmsel.imageUrl).should('be.visible')
   cy.contains('span', 'Add Image').should('be.visible').click({force:true})
   cy.get('[aria-label="delete"][type="button"]').should('exist').and('be.visible')
   cy.contains('button', 'Review your model').should('be.visible').trigger('mouseover').click({ force: true })
   cy.contains('h5', 'Dimensions').should('be.visible')
   cy.contains('span','cm').should('be.visible')
 })
 
 Cypress.Commands.add('editImage',()=>{
   cy.get('.MuiButton-label:eq(6)').click();
   cy.contains('span','Back').should('be.visible').click()
   cy.get(cmsel.uploadImgBtn).should('be.visible').click({ force: true })
   cy.contains('h4','Upload more').should('be.visible').click().type('C:\Users\akshi\Downloads\Starbucks.png')
   cy.contains('button', 'Review your model').should('be.visible').trigger('mouseover').click({ force: true })
   cy.contains('h5', 'Dimensions').should('be.visible')
 })

 Cypress.Commands.add('backForwardCheck',()=>{
   cy.contains('span','Back').should('be.visible').click()
   cy.contains('h1','Enter the model dimensions').should('be.visible')
   cy.contains('span','Back').should('be.visible').click()
   cy.contains('h1','Enter some basic details').should('be.visible')
   cy.contains('span','Back').should('be.visible').click()
   cy.contains('h1','Choose your category').should('be.visible')
   cy.contains('span','Continue').should('be.visible').click()
   cy.contains('h1','Enter some basic details').should('be.visible')
   cy.contains('span','Back').should('be.visible').click()
   cy.contains('h1','Choose your category').should('be.visible')
   cy.contains('span','Continue').should('be.visible').click()
   cy.contains('h1','Enter some basic details').should('be.visible')
   cy.contains('span','Continue').should('be.visible').click()
   cy.contains('h1','Enter the model dimensions').should('be.visible')
   cy.contains('span','Continue').should('be.visible').click()
   cy.contains('h1','Upload your reference images').should('be.visible')
})
 