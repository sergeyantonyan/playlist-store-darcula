# playlist-store-darcula
#### Tumo Darcula team's project based on interledger protocol.

Playlist store is a website that allows its users sell and buy youtube playlists. Payment functionality is built using [ILP](https://interledger.org).

## Minimal requirements
- Node 8
- Mysql 5
- ILP Kit instance

## Setup
- Clone repo
- Create an empty MySQL DB
- Setup a Google App to use Youtube API
- Add Google Plus API and Youtube API to the app in Google dev console
- Copy `config-example.js` to `config.js`
- Fill in config values (DB, Google API, ILP)
- Run `npm install`
- Run `npm start`
