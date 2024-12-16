import React, { useState } from 'react';


const clientId = '1b0ea2fd83234300b0df617a81325f89';
const redirect_uri = 'http://localhost:8888/callback';
let accessToken;






function Spotify(){

    const [emptyFormField, setEmptyFormField] = useState(true);


    const handleLogin = () => {
        let clientId = document.getElementById('clientId');
        setEmptyFormField(true);
        if(clientId.value) {
         
        } else {
          clientId.classList.add('error') //This will highlight the input field red
        }
      };

    const getAccessToken = () => {

    }
    
}

export default Spotify;


/*const app = express();

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});*/