import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js"; //a js wrapper around the available spotify api's
import { useDataLayerValue } from "./DataLayer";
import Player from "./Player";
import { getTokenFromResponseUrl } from "./spotify";
import "./App.css";
import Login from "./Login";

const spotify = new SpotifyWebApi(); //creating object of theat spotifyJsWebApi

function App() {
  //dispatch is like a gun and used to shoot request to the datalayer
  const [{ user, token }, dispatch] = useDataLayerValue(); //a variable or instance to access data layer

  //below code represents volatile type of memory
  // const [token, setToken] = useState(null);

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponseUrl(); //grabs the access toke from the returned response after login atuhentication
    window.location.hash = ""; //makes location(i.e url) empty for security reason
    let _token = hash.access_token; //get only the access token from the returned hash

    // console.log("Token 👉", _token);

    if (_token) {
      dispatch({
        //saving token in data layer
        type: "SET_TOKEN",
        token: _token,
      });
      // setToken(_token);

      //giving extracted token/key to spotifyJsWebApi instance
      spotify.setAccessToken(_token);

      //now testingg the above, like if token is passed to the spotify instance or not
      spotify.getMe().then((user) => {
        //getMe function get the user's function
        // console.log("👱", user);

        dispatch({
          type: "SET_USER",
          user: user,
          // token: _token,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("0va12zjtBfg7S5KfmDlJuZ").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }

    // if (_token) {
    //   s.setAccessToken(_token);

    // dispatch({
    //   type: "SET_TOKEN",
    //   token: _token,
    // });

    //   s.getMyTopArtists().then((response) =>
    //     dispatch({
    //       type: "SET_TOP_ARTISTS",
    //       top_artists: response,
    //     })
    //   );

    //   dispatch({
    //     type: "SET_SPOTIFY",
    //     spotify: s,
    //   });

    //   s.getMe().then((user) => {
    //     dispatch({
    //       type: "SET_USER",
    //       user,
    //     });
    //   });

    // s.getUserPlaylists().then((playlists) => {
    //   dispatch({
    //     type: "SET_PLAYLISTS",
    //     playlists,
    //   });
    //   });
    // }
    // console.log("Token2 👉", _token);
  }, []);

  // console.log(user);
  //gettin user from data layer
  // console.log("dataUser👱", user);
  // console.log("dataToken👱", token);

  return (
    <div className="app">
      {/* {!token && <Login />}
      {token && <Player spotify={s} />} */}

      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
