describe("HTTP Requests", () => {

    it("POST Approach 1 - Hard coded json object", ()=> {

        const requestBody={
            "tourist_name": "John",
            "tourist_email": "john1223252523@gmail.com",
            "tourist_location": "USA"
        }
            
        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq('John')
            expect(response.body.tourist_email).to.eq('john1223252523@gmail.com')
            expect(response.body.tourist_location).to.eq('USA')
        })
    })

    it("POST Approach 2 - Dynamically generating json object", ()=> {

        const requestBody={
            "tourist_name": Math.random().toString(5).substring(2),
            "tourist_email": Math.random().toString(5).substring(2) + "@gmail.com",
            "tourist_location": "USA"
        }
            
        cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com/api/Tourist',
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
        })
    })

    it.only("POST Approach 3 - using Fixtures", ()=> {

        cy.fixture('tourist').then((myFixtureData) => {

            const requestBody = myFixtureData;

            cy.request({
                method: 'POST',
                url: 'http://restapi.adequateshop.com/api/Tourist',
                body: requestBody
            })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)

                //assert that there is a property called 'tourist_email' in the response body 
                // and its value is equal to the value of requestBody.tourist_email
                expect(response.body).has.property('tourist_email', requestBody.tourist_email)
                expect(response.body).to.have.property('tourist_email', requestBody.tourist_email)
            })
        })

    })
            


})