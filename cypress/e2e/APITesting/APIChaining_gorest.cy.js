describe('Gorest API Chaining', () => {

    const auth_token = 'Bearer 123123123123';

    it('create, update, delete user in Gorest API', () => {

        cy.request({

            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            body: {
                name: 'Joh Kenedy',
                gender: 'male',
                email: Math.random().toString(5).substring(2) + '@gmail.com',
                status: 'active'
            },
            headers: {
                Authorization: auth_token
            }

        })
        .then((response) => {

            expect(response.status).to.eq(201)
            const userID = response.body.id
            
            //updating user name
            cy.request({

                method: 'PUT',
                url: `https://gorest.co.in/public/v2/users/${userID}`,
                body: {
                    name: 'Janusz Kowalski'
                },
                headers: {
                    Authorization: auth_token
                }

            })
            .then((response) => {

                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('Janusz Kowalski')

                //delete resource
                cy.request({

                    method: 'DELETE',
                    url: `https://gorest.co.in/public/v2/users/${userID}`,
                    headers: {
                        Authorization: auth_token
                    }
    
                })
                .then((response) => {

                    expect(response.status).to.eq(204)

                })

            })


        })

    })

})