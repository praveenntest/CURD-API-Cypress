// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getAPI', (pathParam) => {

    cy.request({
        method: 'GET',
        url: '/' + pathParam,
        headers: {

            Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
        }
    })


})

Cypress.Commands.add('postAPI', (payload) => {

    cy.request({
        method: 'POST',
        url: '/',
        headers: {

            Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
        },
        body: payload

    })
})

Cypress.Commands.add('putAPI', (pathParam) => {

    cy.request({
        method: 'PUT',
        url: '/' + pathParam,
        headers: {

            Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
        },
    })

})

Cypress.Commands.add('deleteAPI', (pathParam) => {
    cy.request({
        method: 'DELETE',
        url: '/' + pathParam,
        headers: {

            Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
        },

    })
})