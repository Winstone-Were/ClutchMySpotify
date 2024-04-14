/*

    Hello, the aim of this is to create a better spotify experience,
    Better Shuffle, Better Recomendation and Better sharing 😂😂 lol

    Just Fork this...

    Please comment so that I can be able to push your code to prod if I get the money

    kind regards
    stonie_dev
    clutch_ent

*/


require('dotenv').config();

const SpotifyWebApi = require("spotify-web-api-node");

console.log(process.env);

const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8080/callback'
});

const express = require('express');
const app = express();

app.get('/login', (req,res)=>{
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
    res.redirect(spotifyAPI.createAuthorizeURL(scopes));
});

//Once this runs, you should be able to access the other endpoints
app.get('/callback', (req,res)=>{
    const error = req.query.error;
    const code = req.query.code;

    if(error){
        //Code to handle some sort of error
    }

    spotifyAPI.authorizationCodeGrant(code).then(data=> {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        spotifyAPI.setAccessToken(accessToken);
        spotifyAPI.setRefreshToken(refreshToken);

        console.log('The access token is ' + accessToken);
        console.log('The refresh token is ' + refreshToken);


        //Refresh token  
        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expiresIn / 2 * 1000); 
        
    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.send('Error getting tokens');
    });  
});

app.get('/get',(req,res)=>{
    const {q} = req.query;

    spotifyAPI.searchTracks(q).then(results=>{ 
        const trackURI = results.body.tracks.items[0].uri;
        res.send({uri: trackURI});
    }).catch(ERROR=>{ 
        //Someone to send this error in a better way 
        res.send(ERROR);
    });

});

app.get('/play', (req,res)=>{
    const {uri} = req.query;

    spotifyAPI.play({uris: [uri]}).then(()=>{
        res.send('Playing');
    }).catch(ERROR=>{
        res.send(ERROR);
    });
});

const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));