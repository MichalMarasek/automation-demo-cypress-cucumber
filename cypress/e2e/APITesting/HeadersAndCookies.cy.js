describe('API Testing - Headers and Cookies', () => {

    let authToken = null;

    before('Creating access token', () => {

        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients',
            headers: {
                'content-type': 'application/json'
            },
            body: {
                clientName: 'ABC',
                clientEmail: Math.random().toString(5).substring(2) + '@gmail.com'
            }

        })
        .then((response) => {
            authToken = response.body.accessToken;
        });
    });

    before('Creating new order using access token', () => {

        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: {
                bookId: 1,
                customerName: 'xyzabc'
            }

        })
        .then((response) => {
            
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);

        });
    });

    it('Fetching the orders', () => {

        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            cookies: {
                'cookieName' : 'myCookie'
            }

        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).has.length(1);
            cy.log(JSON.stringify(response.body));
        })

    })



})