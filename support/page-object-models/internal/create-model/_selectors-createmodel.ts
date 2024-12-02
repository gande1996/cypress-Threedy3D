export const createModelSelectors = {
    /*Page 1 selectors */
    exitBtn: 'button[class*="MuiButtonBase-root MuiButton-root MuiButton-text"]>span[class="MuiButton-label"]:eq(0)',
    letsGetStartedBtn: 'button[class*="MuiButtonBase-root MuiButton-root"]>span[class="MuiTouchRipple-root"]:eq(3)',
    /*Page 2 selectors */
    categoryName: '#react-select-2-input',
    backBtn: 'button[class*="MuiButtonBase-root MuiButton-root MuiButton-text"]>span[class="MuiButton-label"]:eq(1)',
    continueBtn: 'button[class*="MuiButtonBase-root MuiButton-root MuiButton-text"]>span[class="MuiButton-label"]:eq(2)',
    /*Page 3 selectors */
    modelTitle: '#title',
    modelSku: '#sku',
    modelProductUrl: '#url',
    /*Page 4 selectors */
    unitInInches: 'div[class="MuiFormGroup-root MuiFormGroup-row"]>label>span>span[class="MuiTouchRipple-root"]:eq(0)',
    unitInCm: 'div[class="MuiFormGroup-root MuiFormGroup-row"]>label>span>span[class="MuiTouchRipple-root"]:eq(1)',
    height : '#height',
    width : '#width',
    depth : '#depth',
    /*page 5 selectors */
    uploadImgBtn: 'div[class*="MuiPaper-root MuiCard-root"]:eq(0)',
    linkImgBtn: 'div[class*="MuiPaper-root MuiCard-root"]:eq(1)',
    imageUrl : '#imageUrl',
    /*Page 6 selectors */
    browseFile : 'button[class*="MuiButtonBase-root MuiButton-root"]>span[class="MuiButton-label"]:eq(1)',
    page6BackBtn: 'button[class*="MuiButtonBase-root MuiButton-root"]>span[class="MuiButton-label"]ea(2)',
    reviewModelBtn: 'button[class*="MuiButtonBase-root MuiButton-root"]>span[class="MuiButton-label"]:eq(3)',
    /*Page 7 selectors */
    createMyModel : 'button[class*="MuiButtonBase-root MuiButton-root"]>span[class="MuiButton-label"]:eq(8)',



    /*Confirmation page */
    confirmationDialog : '[role="dialog"][aria-describedby="alert-dialog-description"][aria-labelledby="alert-dialog-title"]',
    gotIt : 'button[class*="MuiButtonBase-root MuiButton-root"]>span[class="MuiButton-label"]:eq(9)'
}