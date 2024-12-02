import 'cypress-real-events/support'
import 'cypress-file-upload'
import 'cypress-xpath'
import 'cypress-fill-command'
import './commands'
import 'cypress-ag-grid'
import '@shelex/cypress-allure-plugin'
import addContext from 'mochawesome/addContext';
import 'cypress-mailosaur'
import './page-object-models/internal/app-bar/app-bar-main'
import './page-object-models/internal/login/login-main'
import './page-object-models/internal/dashboard/dashboard-main'
import './page-object-models/internal/create-model/createmodel-main'
import './page-object-models/internal/product/products-main'
import './page-object-models/internal/registration/registration-main'
import './page-object-models/internal/overview/overview-main'
import './page-object-models/internal/tutorial/tutorial-main'
import './page-object-models/internal/contactus/enterprise-main'
import './page-object-models/internal/accounts/accounts-main'
import './page-object-models/internal/app-footer/app-footer-main'
import './page-object-models/internal/notification/notification-main'
import './page-object-models/internal/report/clientReport-main'
import './page-object-models/internal/report/eventReport-main'
import './page-object-models/internal/report/artistReport-main'
import './page-object-models/internal/report/stateTrackReport-main'
import './page-object-models/internal/report/modelSizeReport-main'
import './page-object-models/internal/report/quickAR_modelNotFoundReport-main'
import './page-object-models/internal/report/nileReport-main'
import './page-object-models/internal/report/commentReport-main'
import './page-object-models/internal/report/deliveryInvoiceReport-main'
import './page-object-models/internal/mesh/componentMesh-main'
import 'cypress-file-upload'
import './page-object-models/internal/order/order-main'
import './page-object-models/internal/admin/admin_user-main'
import './page-object-models/internal/admin/admin_systemCategories'
import './page-object-models/internal/admin/admin_client-main'
import './page-object-models/internal/report/sppDeliveryReport-main'
import './page-object-models/internal/report/bonusReport-main'
import './page-object-models/internal/report/averageTimeSpentReport-main'




Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent!.title} -- ${test.title} (failed).png`
        addContext(test.test, `reports/mocha/assets/api/${Cypress.spec.name}/${screenshotFileName}`)
    }
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
