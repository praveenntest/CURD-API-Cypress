import payload from '../config/payload.json';

describe('POST CALL In Cypress', () => {

    function generateRandomemail() {
        const randomstring = Math.random().toString(36).substring(2,10)
        const email = randomstring + "@dispostable.com"
        return email
    }

    it('POST CALL - JSON',()=>{
        let emailAddress = generateRandomemail();
        cy.log("The random email is" + emailAddress)
        let payload = {
            "name" : "AB Test 01",
            "email" : emailAddress,
            "gender" : "female",
            "status" : "active"
        }
        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
            },
            body : payload

        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body).has.property("name","AB Test 01");
            //expect(response.body).has.property("email","praveenasddf1@gmail.com")
            expect(response.body).has.property("status","active")
            expect(response.body).to.not.be.null;
        })
    })

    it(' POST CALL - Fixtures', () => {
        cy.fixture('user').then((responseObject) => {
            responseObject.email = generateRandomemail()

            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {

                    Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
                },
                body: responseObject

            }).then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body).has.property("name", "AB Test 01")
                expect(response.body).has.property("gender", "female")
                expect(response.body).has.property("status", "active")
                expect(response.body.id).to.not.be.null
            })
        })
    })

    it(' POST CALL - Config JSON ', () => {
        payload.email = generateRandomemail()
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
            },
            body: payload

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).has.property("name", "AB Test 01")
            expect(response.body).has.property("gender", "female")
            expect(response.body).has.property("status", "active")
            expect(response.body.id).to.not.be.null;

            let id = response.body.id

            cy.request({

                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
                }

            })
                .then((response) => {
                    expect(response.status).to.be.equal(200)
                    expect(response.body).has.property("name", "AB Test 01")
                    expect(response.body).has.property("gender", "female")
                    expect(response.body).has.property("status", "active")
                    expect(response.body.id).to.not.be.null

                })
            })
    
        })

    it(' POST CALL - Negative Case || Wrong header ', () => {
        payload.email = generateRandomemail()
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer'
            },
            body: payload,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.equal(401)

        })
    })

    it(' POST CALL - Negative Case || Wrong Data ', () => {
        payload.email = null
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 96096fd0358d8c24b76ba3e3e415aae7102a4452fdf0ad819c070462c474b70b'
            },
            body: payload,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.equal(422)

        })
    })

    it(' POST CALL - Negative Case || Duplicate Data ', () => {
        payload.email = "abtest01@dispostable.com"
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 96096fd0358d8c24b76ba3e3e415aae7102a4452fdf0ad819c070462c474b70b'
            },
            body: payload,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.equal(422)

        })
    })
  
})