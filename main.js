let topTenGames;

const headers = {
  'user-key': '57d88431d1dfd29a26b29a89cf2c8550',
  Accept: 'application/json'
};

axios
  .get(
    `${'https://cors-anywhere.herokuapp.com/'}https://api-endpoint.igdb.com/games/?fields=name,popularity&order=popularity:desc`,
    { headers }
  )
  .then(response => {
    topTenGamesIds = response.data.map(game => game.id);
    console.log(topTenGamesIds);
    return axios
      .get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api-endpoint.igdb.com/games/${topTenGamesIds}`,
        { headers }
      )
      .then(response => {
        topTenGames = response.data;
        console.log(topTenGames);
        topTenGames.forEach(function(game) {
          createCard(game);
        });
      });
  })
  .catch(e => {
    console.error('error', e);
  });

function createCard(game) {}
