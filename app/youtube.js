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

  this.getPlaylists = function () {
    return new Promise((resolve, reject) => {
      this.youtube.playlists.list({
        part: 'snippet,contentDetails',
        //id: 'UC3N5y6UWKJaKqoU2b_0MfTQ'
        mine: true
      }, (err, data) => {
        if (err) {
          console.error('Get playlist items error: ' + err);
          return reject(err)
        }

       // console.log(data.items);
        return resolve(data)
      });
    })
  };

  this.getPlaylistItems = function (playlistId) {
    return new Promise((resolve, reject) => {
      this.youtube.playlistItems.list({
        part: 'snippet, contentDetails',
        playlistId: playlistId
        //mine: true
      },(err, data) => {
        if (err) {
          console.error('Error: ' + err);
          return reject(err);
        }
        if (data) {
          console.log(data);
          return resolve(data);
        }
      })
    })
  };
};


module.exports = YoutubeAPI;
