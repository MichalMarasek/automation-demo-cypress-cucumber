//Pre-requisite: generate Auth code
//https://github.com/login/oauth/authorize?client_id=Ov23lio4B6d7BIPIpIxV

/*
1) Get The OAuth access token
POST: https://github.com/login/oauth/access_token
 Query params
    -----
    client_id
    client_secret
    code

2) Send GET request by using access token
https://api.github.com/user/repos
Auth: accessToken


*/




describe("OAuth2 Authentication", () => {

    let accessToken = '';

    it('Get the OAuth access token', () => {

        cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs: {
                client_id: '',
                client_secret: '',
                code: ''
            }

    })
    .then((response) => {
        expect(response.status).to.eq(200)
        const params = response.body.split('&');
        accessToken = params[0].split('=')[1];
        cy.log("Generated token is: " + accessToken);
        
    })


    })

    it('OAuth2 request', () => {

        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0].id).to.eq(643586503);
        })

    })
})