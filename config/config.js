const config = {
    port: 3000,
    koaSecret: 'Some very strong key goes here, yo!',
    google: {
        clientID: '29309523074-vpcre3joed3qrjca9hqf0nav8iknp6oj.apps.googleusercontent.com',
        clientSecret: 'w6p1yVr32g8jaxdtbesBmC4J',
        callbackURL: 'http://www.darcula.com/oauth2callback',
        accessType: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube']
    }
}

module.exports = config;