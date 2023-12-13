import updateUsers from '../config/user-update.json'
import users from '../config/payload.json'
describe('PUT CALL In Cypresss',()=>{
    
    it('PUT CALL Using JSON',()=>{
        cy.fixture('payload-put-users').then((payload)=>{
            cy.request({
                method : 'PUT',
                url : 'https://gorest.co.in/public/v2/users/5826145',
                headers: {
                    Authorization: "Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d"
                },
                body : payload
            }).then((response)=>{
                expect(response.status).to.be.equal(200)
                expect(response.body).has.property("name","praveentestvagrant")
            })
        })
    })

    it('POST CALL - Config/JSON',()=>{
        cy.request({
            method : 'PUT',
            url : 'https://gorest.co.in/public/v2/users/5826145',
            headers: {
                Authorization: "Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d"
            },
            body : updateUsers
        }).then((response)=>{
            expect(response.status).to.be.equal(200)
            expect(response.body).has.property("name","Testing AB")
        })
    })


    
    it(' End to End Flow', () => {
        users.email = "randoo6mm128789ab@dispostable.com"
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
            },
            body: users
        }).then((response) => {
            let id = response.body.id
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
                },
                body: updateUsers
            })
            .then((response)=>{
                expect(response.status).to.be.equal(200)
            })
            cy.request({
                method:'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
                },
            })
            .then((response)=>{
                expect(response.status).to.be.equal(200)
                expect(response.body).has.property('name', updateUsers.name)
            })

        })
    })
})
        

