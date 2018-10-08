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

function createCard(game) {
  //divs
  var mainDiv = document.createElement('div');
  var innerDiv = document.createElement('div');
  var frontDiv = document.createElement('div');
  var backDiv = document.createElement('div');
  var badge = document.createElement('span');
  //content
  var badgeText = document.createTextNode(0);
  var image = document.createElement('img');
  var thumbnail = game.cover.url;
  var cover = thumbnail.replace('thumb', 'cover_big'); //increasing img quality
  image.src = cover;
  var cardTitle = document.createElement('h2');
  var titleText = document.createTextNode(`${game.name}`);
  var parag = document.createElement('p');
  var paragText = document.createTextNode(
    `${game.summary ? game.summary : "This game doesn't have a summary."}`
  );
  //class definitions
  mainDiv.className = 'flip-card';
  innerDiv.className = 'flip-card-inner';
  frontDiv.className = 'flip-card-front';
  backDiv.className = 'flip-card-back';
  cardTitle.className = 'flip-back-text';
  parag.className = 'flip-back-text';
  //appending
  badge.appendChild(badgeText);
  frontDiv.appendChild(image);
  innerDiv.appendChild(frontDiv);
  cardTitle.appendChild(titleText);
  backDiv.appendChild(cardTitle);
  parag.appendChild(paragText);
  backDiv.appendChild(parag);
  innerDiv.appendChild(backDiv);
  mainDiv.appendChild(innerDiv);
  mainDiv.appendChild(badge);
  document.getElementsByClassName('games_list')[0].appendChild(mainDiv);
  //logic
  mainDiv.addEventListener('click', function() {
    console.log(`You selected ${game.name}!`);
    increaseVote();
  });
  function increaseVote() {
    badgeText.nodeValue = Number(badgeText.nodeValue) + 1;
  }
}
