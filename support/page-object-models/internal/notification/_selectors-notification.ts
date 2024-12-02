export const notificationSelectors = {
    typeSearchBox: 'input[class="MuiInputBase-input MuiInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd"]',   
    statusText:'.MuiChip-label:eq(1)',
    approvedStatus:'[data-value="job.client_approved"]',
    progressStatus:'[data-value="job.created"]',
    reviewStatus:'[data-value="job.client_review"]',
    commentStatus:'[data-value="job_comment.to_client"]',
    reviewText:'.MuiChip-label:eq(3)'
}