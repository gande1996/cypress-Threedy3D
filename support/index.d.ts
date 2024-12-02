/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {

        enterCredentials(email: string, password: string): Cypress.Chainable<void>;
        verifyLoginPage(): Chainable<void>;
        verifyAppBarPresent(): Cypress.Chainable<void>;
        verifyAppBarHide(): Cypress.Chainable<void>;
        verifyHomePage(appType:string): Cypress.Chainable<void>;
        navigateToResourcesPage(submenu: string): Chainable<void>;
        navigateProductPage(): Cypress.Chainable<void>;
        verifyForgotPasswordPage(): Cypress.Chainable<void>
        verifyContactUsWindow():Cypress.Chainable<void>
        pagination(paginationValue: string):Cypress.Chainable<void>
        /* Commands */
        launchApp(env: string): Cypress.Chainable<void>;
        waitOnLoad(): Cypress.Chainable<void>;
        //login(username: string, password: string, option?: string | 'test'): Cypress.Chainable<void>;
        login(username: string, password: string, option): Cypress.Chainable<void>;
        loginAPI(username: string, password: string): Cypress.Chainable<void>;
        signOut(index:string): Cypress.Chainable<void>;
        createModelData(categoryName: string, modelName: string, skyNumber: string, productUrl: string, measureType: string, height: number, width: number, depth: number, imgPath: string): Cypress.Chainable<void>;
        dropFile(path: string): Cypress.Chainable<void>;
        getIframe(frame: string, index): Cypress.Chainable<void>;
        getForm9Iframe(selector: string): Cypress.Chainable<void>;
        getForm1Iframe(selector: string): Cypress.Chainable<void>;
        getCardIframe(selector: string): Cypress.Chainable<void>;
        solveGoogleReCAPTCHA(selector: string): Cypress.Chainable<void>;
        getDiv(index): Cypress.Chainable<void>;
        getLogOut(index): Cypress.Chainable<void>;
        addCardInfo(): Cypress.Chainable<void>;
        editProfilePhoto(filePath: string): Cypress.Chainable<void>;
        /* Registration  */
        verifyCreateAccountPage(): Cypress.Chainable<void>;
        enterAccountDetails(email: string, password: string, isTermsAccepted: boolean): Cypress.Chainable<void>;
        verifyLetsGetStartedPage(): Cypress.Chainable<void>;
        enterAboutYourself(firstName: string, lastName: string, companyName: string, phoneNumber: string): Cypress.Chainable<void>;
        verifyPlanPage(): Cypress.Chainable<void>;
        selectPlan(plan: string): Cypress.Chainable<void>;
        selectBillingDuration()
        enterBillingInformation(firstName: string, lastName: string, street: string, city: string, province: string, country: string, zipCode: string, isSaveBilling: boolean, cardNumber: number, expiryDate: number, cvc: number, isTerms: boolean, isPromotion: boolean): Cypress.Chainable<void>;
        enterBillingInformationUpgrade(firstName: string, lastName: string, street: string, city: string, province: string, country: string, zipCode: string, isSaveBilling: boolean, cardNumber: number, expiryDate: number, cvc: number, isTerms: boolean, isPromotion: boolean): Cypress.Chainable<void>;
        verifyRegistrationConfirmPage(): Cypress.Chainable<void>;
        verifyEmailNotification(userName:string, notification:string): Cypress.Chainable<void>;
        /* Dashboard */
        navigateToCreateModel(): Cypress.Chainable<void>;
        verifySupportDialog():Cypress.Chainable<void>;
        navigateOverviewPage():Cypress.Chainable<void>;
        navigateTutorialPage():Cypress.Chainable<void>;
        navigateSupportDialog():Cypress.Chainable<void>;
        navigateContactUsPage():Cypress.Chainable<void>;
        verifyEnterpriseContactUsPage():Cypress.Chainable<void>;
        verifyContactUsPage():Cypress.Chainable<void>;
        navigateToAccounts():Cypress.Chainable<void>;
        navigateToUpgrade():Cypress.Chainable<void>;
        navigateToPage(pageName:string):Cypress.Chainable<void>;
        /** Accounts  */
        verifyAccountPage():Cypress.Chainable<void>;
        navigateToPaymentInfo():Cypress.Chainable<void>;
        navigateToBillingHistory():Cypress.Chainable<void>;
        navigateToPreferences():Cypress.Chainable<void>;
        navigateToTeamMembers():Cypress.Chainable<void>;
        editProfile(firstName:string,lastName:string, phoneNumber:string):Cypress.Chainable<void>;
        changePassword(currentPassword:string,newPassword:string):Cypress.Chainable<void>;
        editPaymentInfo(street:string,appartment:string, city:string,state:string,country:string,postal:string):Cypress.Chainable<void>;
        addTeamMember(email:string):Cypress.Chainable<void>;
        verifyPaymentInfo():Cypress.Chainable<void>;
        verifyBillingHistory():Cypress.Chainable<void>;
        verifyPreference():Cypress.Chainable<void>;
        verifyAddMemberDialog():Cypress.Chainable<void>;
        verifyTeamMembers():Cypress.Chainable<void>;
        addTeamMember(email:string):Cypress.Chainable<void>;

        /** Notifactions **/
        notification():Cypress.Chainable<void>;
        validateStatus(status:string): Cypress.Chainable<void>;

        /** Report **/
        validateClientReport():Cypress.Chainable<void>;
        selectReport(reportType:string,reportSelected:string): Cypress.Chainable<void>;
        dateRangeSelector(dateFrom:string, dateTo:string): Cypress.Chainable<void>;
        validateDateRange():Cypress.Chainable<void>;
        verifyEventSelected(eventfiltertName:string,index:number):Cypress.Chainable<void>;
        verifyMultipleEventSelected(eventfiltertName1:string,eventfiltertName2:string,userfiltertName:string,index1:number,index2:number,userindex:number):Cypress.Chainable<void>;
        validateEventReportPage():Cypress.Chainable<void>;
        validateArtistReport():Cypress.Chainable<void>;
        selectClient(clientName:String,verifySearch:String):Cypress.Chainable<void>;
        selectCompany(companyName:String,verifySearch: String):Cypress.Chainable<void>;
        selectClientType(clientTypeName:String):Cypress.Chainable<void>;
        selectTag(tagName:String):Cypress.Chainable<void>;
        validateStateTrackReport():Cypress.Chainable<void>;
        validateModelSizeReport():Cypress.Chainable<void>;
        selectReportType():Cypress.Chainable<void>;
        validateNewTab():Cypress.Chainable<void>;
        validateDeliveredTab():Cypress.Chainable<void>;
        validateCompletedTab():Cypress.Chainable<void>;
        validateReworkNeededTab():Cypress.Chainable<void>;
        validateRejectedTab():Cypress.Chainable<void>;
        validateAgingTab():Cypress.Chainable<void>;
        validateWeeklyTab():Cypress.Chainable<void>;
        validateDeadlineTab(dateFrom:String):Cypress.Chainable<void>;
        validateQAErrorsTab():Cypress.Chainable<void>;
        validateReportTab():Cypress.Chainable<void>;
        dateCommentRangeSelector(dateFrom:string, dateTo:string): Cypress.Chainable<void>;
        selectCommentClient(clientName:String,verifySearch:String):Cypress.Chainable<void>;
        selectArtistCompany():Cypress.Chainable<void>;
        validateIssueResolvedCheckbox():Cypress.Chainable<void>;
        validateIssueNotResolvedCheckbox():Cypress.Chainable<void>;
        selectComplexity(complexity:String,verifySearch:String):Cypress.Chainable<void>;
        validateQuickARReport():Cypress.Chainable<void>;
        validateModelNotFoundReport():Cypress.Chainable<void>;
        validateAwaitingDeliverySection():Cypress.Chainable<void>;
        validateDeliveredSection():Cypress.Chainable<void>;
        validateMissingSection():Cypress.Chainable<void>;
        selectReportMethod(reportType:string): Cypress.Chainable<void>;
        validateBonusReportPage():Cypress.Chainable<void>
        SKUSearchDelivered():Cypress.Chainable<void>
        SKUSearchMissing():Cypress.Chainable<void>
        selectTimeSpentReport(reportType:string,reportSelected:string): Cypress.Chainable<void>;
        validateSummaryReport():Cypress.Chainable<void>
        verifyReportSection(section:string,index:number):Cypress.Chainable<void>
        verifyDetails():Cypress.Chainable<void>
        
        /* Mesh */
        selectMeshType(meshType:String):Cypress.Chainable<void>;
        verifyComponentTable(meshSelected:String,selectVerify:String):Cypress.Chainable<void>;
        createMesh(meshType:String,createName:String):Cypress.Chainable<void>;
        editMesh(meshIDType:String,createName:String,editName:String):Cypress.Chainable<void>;
        deleteMesh(meshIDType:String,editName:String):Cypress.Chainable<void>;

        /* Create Model */
        verifyCreateModelPage1(): Cypress.Chainable<void>;
        enterRequiredModelDetails(modelTitle: string, modelSkuNumber: string, productUrl): Cypress.Chainable<void>;
        enterRequiredModelDimensions(measureType: string, height: number, width: number, depth: number): Cypress.Chainable<void>;
        backForwardCheck(): Cypress.Chainable<void>;
        createModelDataExit(categoryName: string, modelName: string, skyNumber: string, productUrl: string, measureType: string, height: number, width: number, depth: number, imgPath: string):Cypress.Chainable<void>
        createModelDataEdit(categoryName: string, modelName: string, skyNumber: string, productUrl: string, measureType: string, height: number, width: number, depth: number, imgPath: string):Cypress.Chainable<void>
        editBasicDetails(productUrl: string): Cypress.Chainable<void>; 
        editDimensions(): Cypress.Chainable<void>;  
        editImage(): Cypress.Chainable<void>;    

    /* Product page */
        verifyProductPage(): Cypress.Chainable<void>;
        searchModel(skuNumber: number): Cypress.Chainable<void>;
        openModel(modelName?: string): Cypress.Chainable<void>;
        verifyModelDetails(status?:string): Cypress.Chainable<void>;
        verifyProductDetailsData(modelName:string): Cypress.Chainable<void>;
        verifySorting(column:string): Cypress.Chainable<void>;
        /* Add Product Request */
        // verifyAddProductRequestPage():Cypress.Chainable<void>;
        // addProductRequest(ProductName:string, URL:string): Cypress.Chainable<void>;
        //  addProductRequest(ProductName:string, URL:string, SKU:string, height: string, width: string, depth:string): Cypress.Chainable<void>;
        CreateProductRequest(ProductName: string, URL: string, Productsku: string, height: string, width: string, depth:string):Cypress.Chainable<void>;
        // CreateProductRequest(productSKU:String):Cypress.Chainable<void>;

        CreateFeedRequest(FeedTittle:string, SKU:string, height: string, width: string, depth:string):Cypress.Chainable<void>;

        CreateFeedJobRequest(FeedTittle:string, SKU:string, height: string, width: string, depth:string):Cypress.Chainable<void>;

        ComplexityChecker(complexityTittle:string, height: string, width: string, depth:string):Cypress.Chainable<void>;

        /* Jobs Page E2E */
        reloadAndWaitForElement():Cypress.Chainable<void>;
        // pollJobStatus():Cypress.Chainable<void>;
        checkStatusAndReload():Cypress.Chainable<void>;
        
        /* Overview Page */
        verifyOverviewPage(): Cypress.Chainable<void>;
        verifyEvent(eventfiltertName:string,index:number):Cypress.Chainable<void>;
        /* Tutorial Page */
        verifyTutorialPage(): Cypress.Chainable<void>;
        /** AppBar Header */
        navigateHomePage(): Cypress.Chainable<void>;

         /** Order page */
         createOrder(orderName:string,filePath:string): Cypress.Chainable<void>;
         selectDropdownKeyboard(dropdownSelector:string,valueSelect:string)
         validateOrderFilter(orderName:string)
         deleteOrder(orderName:string)
         validateOrderDetails(orderName:string)
        
        /** Admin page */
        createUser(email:string): Cypress.Chainable<void>;
        editUser(email:string,editEmail:string): Cypress.Chainable<void>;
        editPassword(editEmail:string): Cypress.Chainable<void>;
        deleteUser(editEmail:string): Cypress.Chainable<void>;
        restoreUser(editEmail:string): Cypress.Chainable<void>;
        createCategory(categoryName:string): Cypress.Chainable<void>;
        editCategory(categoryName:string,editCategoryName:string): Cypress.Chainable<void>;
        deleteCategory(editCategoryName:string): Cypress.Chainable<void>;
        validateSort(SortName:string, index:String): Cypress.Chainable<void>;
        createClient(clientName:string): Cypress.Chainable<void>;
        editClient(clientName:string, editName_Client:String): Cypress.Chainable<void>;
        archiveClient(editName_Client:string): Cypress.Chainable<void>;
        restoreClient(editName_Client:string): Cypress.Chainable<void>;
        createUserArtist(email:string,password:string): Cypress.Chainable<void>;
        assignedUserJob(): Cypress.Chainable<void>;

        /** Internal */
        navigateToReportsPage(): Cypress.Chainable<void>;
        navigateToAdminUsersPage(): Cypress.Chainable<void>;
        navigateToAdminClientPage(): Cypress.Chainable<void>;
        navigateToJobsPage(): Cypress.Chainable<void>;
        navigateToFeedsPage(): Cypress.Chainable<void>;
        navigateToProductsPage(): Cypress.Chainable<void>;
        homePage(): Cypress.Chainable<void>;
        FilterModelByStatus(status:string):Cypress.Chainable<void>;
        verifyAppFooterPresent():Cypress.Chainable<void>;
        navigateToHomePage():Cypress.Chainable<void>;
        
        productDetailsSections(status:string):Cypress.Chainable<void>;
        modelSettingSections(status : string):Cypress.Chainable<void>;

        //api
        apiGetRequest(endPoint:string, token:any, queryString?:string): Chainable<Response<T>>
        apiPostRequest(endPoint:string, token:any, payload:string): Chainable<Response<T>>


        

    }


}