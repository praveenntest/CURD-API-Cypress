describe('API Automation using Cypress', () => {

  it('Get Users', () => {
      cy.request({
          method: 'GET',
          url: 'https://gorest.co.in/public/v2/users/',
          headers: {
              Authorization: "Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d"
          }
      })
          .then((response) => {
              cy.log(JSON.stringify(response))
              expect(response.status).to.equal(200)
          })
  })

  it('Get User1', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v2/users/5780526',
        headers: {
            Authorization: "Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d"
        }
    })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(5780526)
        })

})

it('Get User - Invalid Endpoint', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v2/user',
        headers: {
            Authorization: "Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d"
        },
        failOnStatusCode: false

    })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(404)

        })

})

it('Get User - Invalid User', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v2/users/14525',
        headers: {
            Authorization: "Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d"
        },
        failOnStatusCode: false

    })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(404)

        })

})


})