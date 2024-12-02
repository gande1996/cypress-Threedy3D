export const overviewSelectors = {
    typeSearchBox: 'input[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]',   
    searchBoxShevron : 'button[[class="MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator"]',
    excludeEvent:'input[type="checkbox"][data-indeterminate="false"]',
    jobStatusChart : '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2"]>div[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12 MuiGrid-grid-xl-12"]:eq(0)',
    productCategoryChart : '[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2"]>div[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12 MuiGrid-grid-xl-12"]:eq(1)',
    eventFilterButton : 'button[class="MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator"]',
    eventFilterSelected : 'div.MuiChip-deletableColorPrimary',
    eventFilterText : ':nth-child(2) > .MuiListItemText-root > .MuiListItemText-primary > span',
    eventFilterDelete : '.MuiChip-root > .MuiSvgIcon-root > path'
}