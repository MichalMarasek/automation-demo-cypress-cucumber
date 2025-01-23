describe('Authentication', () => {

    it('Basic Auth', () => {

        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                user: '',
                pass: ''
            }
            
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })

    })

    it('Digest Auth', () => {

        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                username: '',
                password: '',
                method: ''
            }
            
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })

    })

    const bearerToken = ''
    it('Bearer Token Auth', () => {

        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer ' + bearerToken,
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })

    })

    it.only('API Key Auth', () => {

        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
            qs: {
                q: 'London',
                appid:'' // API key and value
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })

    })

})