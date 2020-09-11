// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
//documentation to reat and understand spotify api

export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = ""; //got from spotify documentation for simranjeet account
const redirectUri = "https://spotify-clone-48d75.web.app/"; //added when creating spotify app on spotify developer dashboard
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state", //these all values basically is permissions send with accessUrl to get access for
  "user-top-read", // all of these things when login or authentication is succesful
  "user-modify-playback-state",
];

//the below fuction will be used to get the returned response after login and grab that token and
//do some decoding over the secret key in the access_token
//
export const getTokenFromResponseUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

//response_type=token will give authentication response that is if its success full or not and if it is
//then bunch of more info with it
