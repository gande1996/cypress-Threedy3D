# Notes of Best Practices for writing Cypress tests

## Selecting Elements
```
- Don't' use highly brittle selectors that are subject to change.
+ Use data-* attributes to provide context to your selectors and insulate them from CSS or JS changes

Add data-* attributes to make it easier to target elements.

For example:

<button id="main" class="btn btn-large" name="submit"
  role="button" data-cy="submit">Submit</button>

 cy.get('[data-cy=submit]').click()
```
## Writing Tests
```
- Don't couple multiple tests together.
+ Tests should always be able to be run independently and still pass.
```

## Add multiple assertions
```
- Don't create "tiny" tests with a single assertion and acting like you’re writing unit tests.
+ Add multiple assertions

Cypress runs a series of async lifecycle events that reset state between tests. 
Resetting tests is much slower than adding more assertions.

it('validates and formats first name', function () {
    cy.get('#first')
      .type('johnny')
      .should('have.attr', 'data-validation', 'required')
      .and('have.class', 'active')
      .and('have.value', 'Johnny')
  })
```

## Unnecessary Waiting
```
- Don't wait for arbitrary time periods using cy.wait(Number).
+ Use route aliases or assertions to guard Cypress from proceeding until an explicit condition is met.
For example waiting explicitly for an aliased route:

cy.server()
cy.route('GET', /users/, [{ 'name': 'Maggy' }, { 'name': 'Joan' }]).as('getUsers')
cy.get('#fetch').click()
cy.wait('@getUsers')     // <--- wait explicitly for this route to finish
cy.get('table tr').should('have.length', 2)
```
## Set global baseUrl
```
+ Set a baseUrl in your configuration file.
```
## Data
```
+ Add the selectors to commonSelector.ts if they are used across multiple spec files.
- Don't add any data to the page object files. Add them to the fixture/data folders.
```