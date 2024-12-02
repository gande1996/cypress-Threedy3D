export const enterpriseSelectors = {
    /*Page 1 selectors */
    exitBtn: 'button[class*="MuiButtonBase-root MuiButton-root MuiButton-text"]>span[class="MuiButton-label"]:eq(0)',
    form9 : '#reactHubspotForm9',
    form9Frame : '#hs-form-iframe-9',
    form9FirstName : '[name="firstname"]',
    form9LastName : '[name="lastname"]',
    form9Email : '[name="email"]',
    form9Phone : '[name="phone"]',
    form9Company : '[name="company"]',
    form9ContactRegion: '[name="contact_region"]',
    form9ContactRegionOption2 :'[name="contact_region"] option:eq(1)',
    form9Message : '[name="message"]',
    form9LegalCheckbox: '[class="hs-input"][type=checkbox]',
    form9SubmitBtn : 'input[type="submit"]',
    form9MandatoryErrorMessage1: 'label[class="hs-error-msg hs-main-font-element"]',
    form9MandatoryErrorMessage2: 'label[class="hs-main-font-element"]',
}