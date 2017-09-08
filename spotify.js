'use strict';

// !!!FILL IN YOUR CLIENT ID FROM YOUR APPLICATION CONSOLE:
// https://developer.spotify.com/my-applications/#!/applications !!!
const CLIENT_ID = 'd242465e03f248c986b806cca05b462d';

const getFromApi = function (endpoint, query = {}) {
  // You won't need to change anything in this function, but you will use this function 
  // to make calls to Spotify's different API endpoints. Pay close attention to this 
  // function's two parameters.

  const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${localStorage.getItem('SPOTIFY_ACCESS_TOKEN')}`);
  headers.set('Content-Type', 'application/json');
  const requestObject = {
    headers
  };

  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  return fetch(url, requestObject).then(function (response) {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  });
};

let artist;

const getArtist = function (name) {
  const spotifyEndPt = 'search';
  const query = {
    q: name,
    limit: 1,
    type: 'artist'
  };

  //fetch().then   res

  //Promise()

  //artists/{id}/related-artists

  return getFromApi(spotifyEndPt, query)
    .then(res => {
      artist=res.artists.items[0];
      console.log(artist);
      const spotifyRelArtistsEndPt = `artists/${artist.id}/related-artists`;
      return getFromApi(spotifyRelArtistsEndPt);
    })
    .then(res => {
      artist.related = res.artists;
      console.log(artist);
      for (let i=0; i<artist.related.length; i++) {
        const spotifyTopTracks = `artists/${artist.related[i].id}/top-tracks?country=US`;
        return getFromApi(spotifyTopTracks);
      
      
  const allPromise = Promise.all(topTracks);
  return allPromise;
    })
    .then(responses => {
        for ();
    })
    //   return artist;
    // })
    .catch(err => {
      console.log('error');
      console.log(err);
    });
};





// =========================================================================================================
// IGNORE BELOW THIS LINE - THIS IS RELATED TO SPOTIFY AUTHENTICATION AND IS NOT NECESSARY  
// TO REVIEW FOR THIS EXERCISE
// =========================================================================================================
const login = function () {
  const AUTH_REQUEST_URL = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URI = 'http://localhost:8080/auth.html';

  const query = new URLSearchParams();
  query.set('client_id', CLIENT_ID);
  query.set('response_type', 'token');
  query.set('redirect_uri', REDIRECT_URI);

  window.location = AUTH_REQUEST_URL + '?' + query.toString();
};

$(() => {
  $('#login').click(login);
});
