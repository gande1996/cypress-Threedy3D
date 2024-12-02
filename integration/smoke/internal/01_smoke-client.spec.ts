/* eslint-disable */
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
/// <reference path="../../../support/index.d.ts" />
/* eslint-enable */

describe('PORTAL-SMOKE TEST', () => {
    it('validate user successfully sing in and sign out', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        /* Admin Logs off */
        cy.log('Log off external')
        cy.wait(3000)
        // cy.get('button[type="button"][tabindex="0"]>span[class="MuiIconButton-label"]').eq(0).should('be.visible').click({ force: true }).then(() => {
        //     cy.window().then((win) => {
        //         win.eval('document.getElementById("logout-btn").click()');
        //     })
        // })
    })

    it('Navigate to Client Categories', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/client-categories"]').eq(0).click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/client-categories')) {
                    cy.get('[href="/client-categories"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/client-categories')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('Navigate to Admin-clients', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('li').contains('Admin').click()//.parent().parent().next().children().click()
        cy.get('[href="/clients"]').first().click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                expect(currentUrl).to.include('/client')
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })
    })

    it('Navigate to Mesh Components', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('li').contains('Admin').click()//parent().parent().next().children().click()
        cy.get('[href="/components"]').first().click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                expect(currentUrl).to.include('/components')
            })
        })
        cy.contains('p', 'Rows per page')
        cy.contains('span','Edit').should('be.visible')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Meshes- Mesh Tags', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('li').contains('Admin').click()//parent().parent().next().children().click()
        cy.get('[href="/meshlib_tags"]').first().click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                expect(currentUrl).to.include('/meshlib_tags')
            })
        })
        cy.contains('p', 'Rows per page')
        cy.contains('span','Edit').should('be.visible')
        cy.contains('h4','MeshLib Tags Listing').should('be.visible')
        cy.contains('span','Tag ID').should('be.visible')
        cy.contains('span','Tag Name').should('be.visible')
        cy.contains('span','# of Mesh Tagged').should('be.visible')
        cy.contains('div','Action').should('be.visible')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Feed', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/feed"]').eq(1).click({ force: true }).then(() => {
            //cy.contains('div', 'Feed', {visible:false}).should('be.visible').click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/feed')) {
                    cy.get('[href="/feed"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/feed')
                }
            })
        })
        cy.wait(2000)
        cy.contains('p', 'Rows per page:')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Jobs', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/jobs"]').eq(1).click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs')) {
                    cy.get('[href="/jobs"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Jobs-Model Compact Config', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/jobs"]').eq(1).click()
        cy.get('[href="/model-compact-config"]').click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/model-compact-config')) {
                    cy.get('[href="/model-compact-config"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/model-compact-config')
                }
            })
        })
        cy.contains('h4','Config').should('be.visible')
        cy.contains('div','Name').should('be.visible')
        cy.contains('div','Description').should('be.visible')
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Navigate to Jobs-Job Tags', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/jobs"]').eq(1).click()
        cy.get('[href="/job_tags"]').click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job_tags')) {
                    cy.get('[href="/job_tags"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/job_tags')
                }
            })
        })
        cy.contains('h4','Job & Feed Tags Listing').should('be.visible')
        cy.contains('span','Tag ID').should('be.visible')
        cy.contains('span','Tag Name').should('be.visible')
        cy.contains('span','# of Entities Tagged').should('be.visible')
        cy.contains('div','Action').should('be.visible')
        cy.contains('p', 'Rows per page')
        cy.contains('span','Edit').should('be.visible')
        cy.wait(3000, { log: false })

    })


    it('Navigate to Product', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/products"]').eq(1).click({ force: true }).then((url) => {
            cy.log('------------------' + url)
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/products')) {
                    cy.get('[href="/products"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/products')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Quick-ar-or-not-found Report', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
       cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({ force: true })
        cy.get('[href="/quick-ar-or-not-found"]').click({ force: true }).then(() => {
            //cy.contains('div', 'Feed', {visible:false}).should('be.visible').click({ force: true }).then(() => {
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/quick-ar-or-not-found')) {
                    cy.get('[href="/quick-ar-or-not-found"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/quick-ar-or-not-found')
                }
            })
        })
        cy.validateModelNotFoundReport()
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Job Config', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/model-compact-config"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/model-compact-config')) {
                    cy.get('[href="/model-compact-config"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/model-compact-config')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Job Tags', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/job_tags"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job_tags')) {
                    cy.get('[href="/job_tags"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/job_tags')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })


    it('Navigate to Mesh Tags', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Meshes').siblings('li').click()
        cy.get('[href="/meshlib_tags"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job_tags')) {
                    cy.get('[href="/meshlib_tags"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/meshlib_tags')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })


    it('Navigate to Part Tags', () => {

        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('[href="/part_tags"]').click({ force: true }).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job_tags')) {
                    cy.get('[href="/part_tags"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/part_tags')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Jobs-Projects', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/job-projects"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job-projects')) {
                    cy.get('[href="/job-projects"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/job-projects')
                }
            })
        })
        cy.contains('h4','Projects').should('be.visible')
        cy.contains('span','Project ID').should('be.visible')
        cy.contains('span','Client Name').should('be.visible')
        cy.contains('span','Project Name').should('be.visible')
        cy.contains('div','Action').should('be.visible')
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Jobs-Complexity Assignment', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/jobs/complexity"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/jobs/complexity')) {
                    cy.get('[href="/jobs/complexity"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/jobs/complexity')
                }
            })
        })
        cy.contains('span','SKU').should('be.visible')
        cy.contains('div','Image').should('be.visible')
        cy.contains('span','Tag').should('be.visible')
        cy.contains('span','Complexity').should('be.visible')
        cy.contains('span','Proposed Complexity').should('be.visible')
        cy.contains('span','Agency/Lead').should('be.visible')
        cy.contains('span','Status').scrollIntoView().should('be.visible')
        cy.contains('span','Last Modified').scrollIntoView().should('be.visible')
        cy.contains('span','Clients:').should('be.visible')
        cy.contains('span','Agency/Lead:').should('be.visible')
        cy.contains('span','Tag:').should('be.visible')
        cy.contains('span','Complexities:').should('be.visible')
        cy.contains('span','Due date').should('be.visible')
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Jobs-Batches', () => {
        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('li').contains('Jobs').siblings('li').click()
        cy.get('[href="/job-batches"]').click().then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/job-batches')) {
                    cy.get('[href="/job-batches"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/job-batches')
                }
            })
        })
        cy.contains('h4','Batches').should('be.visible')
        cy.contains('span','Batch ID').should('be.visible')
        cy.contains('span','Batch Name').should('be.visible')
        cy.contains('span','Artist Company').should('be.visible')
        cy.contains('span','Project name').should('be.visible')
        cy.contains('span','Client Name').should('be.visible')
        cy.contains('span','Due Date').should('be.visible')
        cy.contains('span','Client:').should('be.visible')
        cy.contains('span','Artist Company:').should('be.visible')
        cy.contains('span','Past Due').should('be.visible')
        cy.contains('div','Action').should('be.visible')
        cy.contains('p', 'Rows per page')
        cy.wait(3000, { log: false })

    })

    it('Navigate Reports', () => {

        /* admin Logs in */
        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
       // cy.homePage()
        cy.get('.MuiDrawer-paperAnchorLeft ul.MuiList-root.MuiList-padding li.MuiListItem-root:eq(41)').click({ force: true })
        cy.wait(2000)
        cy.viewport(1660, 1000)
        cy.selectReport('/artist-co-job-report', 'Artist Co Report')
        cy.selectReport('/client-report','Client Report')
        cy.selectReport('/client-job-report','Comment Report')
        cy.selectReport('/delivery-invoice','Delivery Invoice')
        cy.selectReport('/events-report','Events Report')
        cy.selectReport('/job-stat-transition','Job State Transition')
        cy.selectReport('/model-size-report','Model Size Report')
        cy.selectReport('/nile-report','Nile Report')
        cy.selectReport('/quick-ar-or-not-found','Quick AR / Model Not Found')
        cy.selectReport('/state-tracking-report','State Tracking Report')

    })

    it('Navigate to Orders', () => {

        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('a[href="/order-tasks"]:eq(1)').click({force:true}).then(() => {
            cy.wait(3000, { log: false })
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                if (currentUrl.indexOf('/order-tasks')) {
                    cy.get('[href="/order-tasks"]').eq(1).click({ force: true })
                    expect(currentUrl).to.include('/order-tasks')
                }
            })
        })
        cy.contains('p', 'Rows per page')
        cy.contains('span','Order ID').should('be.visible')
      cy.contains('span','Order Name').should('be.visible')
      cy.contains('span','Client Name').should('be.visible')
      cy.contains('span','Created On').should('be.visible')
      cy.contains('span','Last Modified').should('be.visible')
      cy.contains('span','Create User').should('be.visible')
        cy.wait(3000, { log: false })

    })

    it('Navigate to Admin-Users', () => {

        cy.log('admin logs in')
        cy.login('admin', 'passwordAdmin', 'test')
        //cy.homePage()
        cy.get('li').contains('Admin').click()//.parent().parent().next().children().click()
        cy.get('[href="/users"]').first().click({ force: true }).then(() => {            
            cy.url().then((currentUrl) => {
                cy.log(currentUrl)
                 expect(currentUrl).to.include('/users')                
            })
         
      })
        cy.contains('p', 'Rows per page')
        cy.contains('span','Role:').should('be.visible')
      cy.contains('span','Client:').should('be.visible')
      cy.contains('span','Artist Company:').should('be.visible')
      cy.contains('span','Id').should('be.visible')
      cy.contains('div','Role').should('be.visible')
      cy.contains('span','Artist Company').should('be.visible')
      cy.contains('span','Active').should('be.visible')
      cy.contains('span','Last Login').should('be.visible')
      cy.contains('span','Created').should('be.visible')
      cy.contains('div','Action').should('be.visible')
      
        cy.wait(3000, { log: false })

    })


    afterEach(() => {
  
        /* Admin Logs off */
        cy.log('Log off')
        cy.signOut('internal')
    })
})