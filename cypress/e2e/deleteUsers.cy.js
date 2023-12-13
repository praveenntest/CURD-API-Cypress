describe('Delete API Automation In Cypress', () => {
    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@dispostable.com"
        return email
    }
    let userId; 

    beforeEach(() => {
        let emailAddress = generateRandomEmail()
        let payload = {
            "name": "AB Test 01",
            "email": emailAddress,
            "gender": "female",
            "status": "active"
        }

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
            },
            body: payload
        }).then((response) => {
            userId = response.body.id;
        });
    });

    it('deleteuser', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://gorest.co.in/public/v2/users/' + userId,
            headers: {
                Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
            }
        }).then((response) => {
            expect(response.status).to.equal(204);
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + userId,
                headers: {
                    Authorization: 'Bearer c3392686b79f5c2d433d137873146a2111f8a14960e147d14c058c1ab83f2d5d'
                },
                failOnStatusCode: false
            }).then((getResponse) => {
                expect(getResponse.status).to.equal(404);
            });
        });
    });
});
