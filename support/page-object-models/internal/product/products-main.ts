import { listenerCount } from 'process'
import { commonSelectors as csel } from '../../../commonSelectors'
import { productsSelectors as prosel } from './_selectors-products'
import cypress from 'cypress'


Cypress.Commands.add('verifySorting',(column:string)=>{
    let list:string[] = []
   if(column=="First Title"){
        cy.get('[role="option"][data-value="1"]').should('be.visible').click({force:true})
        cy.wait(3000)
        cy.get('div [style="margin: auto 0px auto 5px;"]')
        .each(($el,index) => {
                 list[index] = $el.text()                     
        })
    cy.wrap(list).should('deep.eq', list.sort())
    
    }else if(column=="Last Title"){
        cy.get('[role="option"][data-value="2"]').should('be.visible').click({force:true})
        cy.wait(3000)
        cy.get('div [style="margin: auto 0px auto 5px;"]')
        .each(($el,index) => {
                 list[index] = $el.text()                     
        })
    cy.wrap(list).should('deep.eq', list.sort().reverse())
    }else if(column=="First SKU"){
        cy.get('[role="option"][data-value="3"]').should('be.visible').click({force:true})
        cy.wait(3000)
        cy.get('div [style="margin: auto 0px auto 5px;"]')
        .each(($el,index) => {
                 list[index] = $el.text()                     
        })
    cy.wrap(list).should('deep.eq', list.sort())
    }else if(column=="Last SKU"){
        cy.get('[role="option"][data-value="4"]').should('be.visible').click({force:true})
        cy.wait(3000)
        cy.get('div [style="margin: auto 0px auto 5px;"]')
        .each(($el,index) => {
                 list[index] = $el.text()                     
        })
    cy.wrap(list).should('deep.eq', list.sort().reverse())

    }else if(column=="First Updated"){
        cy.get('[role="option"][data-value="5"]').should('be.visible').click({force:true})
        cy.wait(3000)
        cy.get('div [style="margin: auto 0px auto 5px;"]')
        .each(($el,index) => {
                 list[index] = $el.text()                     
        })
    cy.wrap(list).should('deep.eq', list.sort())

    }else if(column=="Last Updated"){
        cy.get('[role="option"][data-value="6"]').should('be.visible').click({force:true})
        cy.wait(3000)
        cy.get('div [style="margin: auto 0px auto 5px;"]')
        .each(($el,index) => {
                 list[index] = $el.text()                     
        })
    cy.wrap(list).should('deep.eq', list.sort().reverse())
    }    
  
   
 

})
Cypress.Commands.add('verifyProductPage', () => {
    cy.contains('div', 'My Models').should('be.visible')
    cy.contains('div', 'View all of the 3D models I’ve created and check out their status and views')// .should('be.visible')
    cy.contains('button', 'Create New Model').should('be.visible')
    cy.get(prosel.searchBox).should('be.visible').and('be.enabled').should('have.attr', 'placeholder', 'Search All Products...')
    cy.contains('div', 'Show').should('be.visible')
    cy.contains('[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"]:eq(0)', 'All').should('be.visible')
    cy.contains('span', 'Filter').should('be.visible')
    cy.contains('[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input"]:eq(2)', 'Last Updated').should('be.visible')
    cy.contains('div', 'Model Title').should('be.visible')
    cy.contains('div', 'Status').should('be.visible')
    cy.contains('div', 'SKU').should('be.visible')
    cy.contains('div', 'Categories').should('be.visible')
    cy.contains('div', 'Modified').should('be.visible')
    cy.contains('div', 'TOTAL clicks').should('be.visible')
})

Cypress.Commands.add('searchModel', (option) => {
    cy.get(prosel.searchBox).fill(option).should('have.value', option)
    cy.get(prosel.modelName).each(($el) => {
        expect($el.text()).to.include(option)
    })
})


Cypress.Commands.add('openModel', (option) => {
    cy.wait(5000)
    if (option != undefined) {
        cy.contains(prosel.modelName, option).eq(0).click({ force: true })
    } else {
        cy.get(prosel.modelName).first().click()
    }
})

Cypress.Commands.add('verifyModelDetails', (status) => {
    cy.contains('a', 'Dashboard').should('be.visible')
    cy.contains('a', 'Products').should('be.visible').and('have.attr', 'href', '/products')
    cy.url().then((url) => {
        cy.get('[class="MuiBreadcrumbs-li"] p').then(($jobId) => {
            expect(url).to.include($jobId.text())
        })
    })
    cy.contains('span', 'Last Updated: ').should('be.visible')
    cy.contains('button', '0 Clicks').should('be.visible')
    cy.contains('span', 'Menu').should('be.visible')
    cy.contains('h3', 'PRODUCT NAME').should('be.visible')
    cy.contains('h3', 'SKU').should('be.visible')
    cy.contains('h3', 'Option ID').should('be.visible')
    cy.contains('h3', 'Category').should('be.visible')
    cy.contains('h3', 'Client Key').should('be.visible')
    cy.contains('h3', 'PRODUCT PAGE URL').should('be.visible')
    cy.contains('h3', 'LAST MODIFIED').should('be.visible')
    cy.contains('span', 'Model Details').should('be.visible')
    cy.contains('span', 'Reference Photos').should('be.visible')
    cy.contains('span', 'Model Settings').should('be.visible')

    if (status == 'In Progress') {
        cy.contains('span', status).should('be.visible')
        cy.contains('span', 'In Progress').should('be.visible')
        cy.contains('button', 'Approved').should('not.exist')
        cy.contains('span', 'Model Settings').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'true')
        cy.contains('span', 'Reference Photos').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
        cy.contains('span', 'Model Details').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
        cy.contains('span', 'Menu').should('be.visible')
    } else if (status == 'Approved') {
        cy.contains('div', ' Your model is now active. You can now embed your model on your e-commerce platform.').should('be.visible')
        cy.contains('span', status).should('be.visible')
        cy.contains('button', 'Embed Model').should('exist')
        cy.contains('span', '3D Model').should('be.visible')
        cy.contains('span', 'Comment Pins').should('be.visible')
        cy.get('input[name="switchSearchType"]').should('exist')
        cy.contains('span', 'Embed Model').should('be.visible')
      //  cy.get('div[class="container"] div[class="userInput"]').should('exist')
        cy.contains('span', 'Model Settings').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
        cy.contains('span', 'Reference Photos').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
        cy.contains('span', 'Model Details').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
        cy.contains('span', 'Menu').should('be.visible')

    } else if (status == 'In Review') {
        cy.get('table button:eq(0)').should('be.visible').and('be.enabled').invoke('text').then((buttonLbl) => {
            if (buttonLbl == 'Approve Model - Pending Configurator') {
                cy.contains('div', 'Please review your model. Once you are satisfied, click the approve button to begin the Configurator process.').should('be.visible')
                cy.contains('span', status).should('be.visible')
                cy.contains('button', 'Approve Model - Pending Configurator').should('exist')
                cy.contains('button', 'Approve Configurator').should('not.exist')
                cy.contains('span', '3D Model').should('be.visible')
                cy.contains('span', 'Comment Pins').should('be.visible')
                cy.get('input[name="switchSearchType"]').should('exist')
                cy.contains('span', 'Embed Model').should('not.exist')
                cy.contains('span', 'Model Settings').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'true')
                cy.contains('span', 'Reference Photos').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Comments').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Model Details').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Menu').should('be.visible')
                cy.contains('div', 'Your model is currently being processed by our AI technology. Once its processed, you can review and revise your model approving it for embed.').should('be.visible')


            } else if (buttonLbl == 'Approve Configurator') {

                cy.contains('div', 'Please review your configurator. Once you are satisfied, click the approve button to receive your model and configurator embed codes.').should('be.visible')
                cy.contains('span', status).should('be.visible')
                cy.contains('button', 'Approve Model - Pending Configurator').should('not.exist')
                cy.contains('button', 'Approve Configurator').should('exist')
                cy.contains('span', '3D Model').should('be.visible')
                cy.contains('span', 'Comment Pins').should('be.visible')
                cy.get('input[name="switchSearchType"]').should('exist')
                cy.contains('span', 'Embed Model').should('not.exist')
                cy.contains('span', 'Model Settings').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'true')
                cy.contains('span', 'Reference Photos').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Comments').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Model Details').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('button', '3D Model').should('be.visible').should('have.attr', 'class', 'active')
                cy.contains('button', 'Configurator').should('be.visible')
                cy.get('[title="Expand View"]').should('be.visible').and('be.enabled')
                cy.get('[title="QR code"]').should('be.visible').and('be.enabled')
                cy.get('[title="Reset View"]').should('be.visible').and('be.enabled')
                cy.get('[class="MuiInputBase-input MuiOutlinedInput-input"]').its('length').should('eq', 3)

            
            } else if (buttonLbl == 'Approve Model') {

                cy.contains('div', 'Please review your model. Once you are satisfied, click the approve button to receive your embed code.').should('be.visible')
                cy.contains('span', status).should('be.visible')
                cy.contains('button', 'Approve Model - Pending Configurator').should('not.exist')
                cy.contains('button', 'Approve Model').should('exist')
                cy.contains('span', 'Menu').should('be.visible')
                cy.contains('span', 'Comment Pins').should('be.visible')
                cy.get('input[name="switchSearchType"]').should('exist')
                cy.contains('span', 'Embed Model').should('exist')
                cy.contains('span', 'Model Settings').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Reference Photos').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Comments').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                cy.contains('span', 'Model Details').should('be.visible').parent().parent().should('have.attr', 'aria-disabled', 'false')
                //cy.contains('div', 'Your model is currently being processed by our AI technology. Once its processed, you can review and revise your model approving it for embed.').should('not.be.visible')
                //cy.contains('button', '3D Model').should('be.visible').should('have.attr', 'class', 'active')
                //cy.contains('button', 'Configurator').should('be.visible')
                cy.get('[title="Expand View"]').should('be.visible').and('be.enabled')
                cy.get('[title="QR code"]').should('be.visible').and('be.enabled')
                cy.get('[title="Reset View"]').should('be.visible').and('be.enabled')
                cy.get('[class="MuiInputBase-input MuiOutlinedInput-input"]').its('length').should('eq', 3)

            }
        })

    }

})

Cypress.Commands.add('productDetailsSections', (status) => {

    if (status == 'In Progress') {

    } else if (status == 'Approved') {
        cy.contains('span', 'Menu').should('exist')
        cy.contains('h3', 'PRODUCT NAME').should('not.exist')
        cy.contains('h3', 'SKU').should('not.exist')
        cy.contains('h3', 'Option ID').should('not.exist')
        cy.contains('h3', 'Category').should('not.exist')
        cy.contains('h3', 'Client Key').should('not.exist')
        cy.contains('h3', 'PRODUCT PAGE URL').should('not.exist')
        cy.contains('h3', 'LAST MODIFIED').should('not.exist')
        cy.contains('span', 'Model Details').should('be.visible')
        cy.contains('span', 'Reference Photos').should('be.visible')
        cy.contains('span', 'Model Settings').should('be.visible')
        cy.get('ul[style="margin: -2px;"] div div div a img').should('exist')
        // cy.contains('button', '3D Model').should('be.visible').should('have.attr', 'class', 'active')
        // cy.contains('button', 'Configurator').should('be.visible')
        cy.get('[title="Expand View"]').should('be.visible').and('be.enabled')
        cy.get('[title="QR code"]').should('be.visible').and('be.enabled')
        cy.get('[title="Reset View"]').should('be.visible').and('be.enabled')
        cy.get('[class="MuiInputBase-input MuiOutlinedInput-input"]').its('length').should('eq', 3)
    } else if (status == 'In Review') {

    }

})

Cypress.Commands.add('modelSettingSections', (status) => {

    if (status == 'In Progress') {

    } else if (status == 'Approved') {
        //cy.contains('span', 'Menu').should('not.exist')
        cy.contains('h3', 'PRODUCT NAME').should('not.exist')
        cy.contains('h3', 'SKU').should('not.exist')
        cy.contains('h3', 'Option ID').should('not.exist')
        cy.contains('h3', 'Category').should('not.exist')
        cy.contains('h3', 'Client Key').should('not.exist')
        cy.contains('h3', 'PRODUCT PAGE URL').should('not.exist')
        cy.contains('h3', 'LAST MODIFIED').should('not.exist')
        cy.contains('span', 'Model Details').should('be.visible')
        cy.contains('span', 'Reference Photos').should('be.visible')
        cy.contains('span', 'Model Settings').should('be.visible')
     //   cy.get('ul[style="margin: -2px;"] div div div a img').should('not.exist')
        cy.contains('h3', 'DEACTIVATE YOUR MODEL?').should('be.visible')
        cy.get('[alt="question"]').should('be.visible')
        cy.contains('span', 'ACTIVE').should('be.visible')
        cy.contains('h3', 'DELETE THIS MODEL').should('be.visible')
     //   cy.get('[name="switchSearchType"]').should('be.visible').should('be.checked')
        cy.contains('button', 'DELETE MODEL').should('be.visible').and('be.enabled')
        cy.contains('span', 'Menu').should('be.visible')
     //   cy.contains('div', 'Your model is currently being processed by our AI technology. Once its processed, you can review and revise your model approving it for embed.').should('not.be.visible')
     //   cy.contains('button', '3D Model').should('be.visible').should('have.attr', 'class', 'active')
     //   cy.contains('button', 'Configurator').should('be.visible')
        cy.get('[title="Expand View"]').should('be.visible').and('be.enabled')
        cy.get('[title="QR code"]').should('be.visible').and('be.enabled')
        cy.get('[title="Reset View"]').should('be.visible').and('be.enabled')
        cy.get('[class="MuiInputBase-input MuiOutlinedInput-input"]').its('length').should('eq', 3)



    } else if (status == 'In Review') {

    }

})


Cypress.Commands.add('verifyProductDetailsData', (modelName) => {
    cy.contains('h3', 'PRODUCT NAME').should('be.visible').next().should('have.text', modelName)
    // cy.contains('h3', 'Option ID').should('be.visible').next().should('have.text',createModelData.SKU)
    // cy.contains('h3', 'SKU').should('be.visible').next().should('have.text',createModelData.modelTitleName)
    // cy.contains('h3', 'Category').should('be.visible').next().should('have.text',createModelData.modelTitleName)
    // cy.contains('h3', 'Client Key').should('be.visible').next().should('have.text',createModelData.modelTitleName)
    // cy.contains('h3', 'PRODUCT PAGE URL').should('be.visible').next().should('have.text',createModelData.modelTitleName)
    // cy.contains('h3', 'LAST MODIFIED').should('be.visible').next().should('have.text',createModelData.modelTitleName)

})

Cypress.Commands.add('FilterModelByStatus', (status) => {
    cy.get('[aria-haspopup="listbox"]:eq(0)').click({ force: true })
    cy.get('[class*="MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation"]').should('exist').within(() => {
        cy.contains('div', status).should('be.visible').click({ force: true })

    })
})
Cypress.Commands.add('verifyAddProductRequestPage',()=>{

})
Cypress.Commands.add('addProductRequest', (ProductName, URL, productSKU)=>{
    cy.contains('Product Request').should('be.visible', "PRODUCT REQUEST").click()
    cy.get('input[id="title"]').type(ProductName)
    cy.get('input[id="url"]').type(URL)
    cy.get('input[id="sku"]').type(productSKU)
    
})  


