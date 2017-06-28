'use strict';
var Promise = require('bluebird');
var google = require('googleapis');

var YoutubeAPI = function (clientID, clientSecret, redirectURL, accsesToken, refreshToken) {
    this.OAuth2Client = new google.auth.OAuth2(
        clientID,
        clientSecret,
        redirectURL
    );

    this.OAuth2Client.setCredentials({
        access_token: accsesToken,
        refresh_token: refreshToken
    });
    google.options({
        auth: this.OAuth2Client
    });

    this.youtube = google.youtube({
        version: 'v3',
        auth: this.OAuth2Client
    });

    this.youtube.playlists.list({
        part: 'id,snippet',
        id: 'UC3N5y6UWKJaKqoU2b_0MfTQ'
    }, function (err, data, response) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            console.log(data);
        }
        if (response) {
            console.log('Status code: ' + response.statusCode);
        }
        //callback(err, data, response);
    });
};

module.exports = YoutubeAPI;



