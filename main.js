let topTenGames;

const headers = {
  'user-key': '57d88431d1dfd29a26b29a89cf2c8550',
  Accept: 'application/json'
};

const apiUrl = `${'https://cors-anywhere.herokuapp.com/'}https://api-endpoint.igdb.com/games/`;

axios
  .get(`${apiUrl}?fields=name,popularity&order=popularity:desc`, { headers })
  .then(response => {
    let topTenGamesIds = response.data.map(game => game.id);
    return axios
      .get(`${apiUrl}${topTenGamesIds}`, { headers })
      .then(response => {
        topTenGames = response.data;
        document.getElementsByClassName('games_list')[0].innerHTML = '';
        topTenGames.forEach(function(game) {
          createCard(game);
        });
      });
  })
  .catch(e => {
    console.error('error', e);
  });

document.getElementsByClassName('games_list')[0].innerHTML = 'Loading...';

function createCard(game) {
  const { cover, name, summary } = game;
  //divs
  const mainDiv = document.createElement('div');
  const innerDiv = document.createElement('div');
  const frontDiv = document.createElement('div');
  const backDiv = document.createElement('div');
  const badge = document.createElement('span');
  //content
  const badgeText = document.createTextNode('0');
  const image = document.createElement('img');
  const thumbnail = cover.url;
  const coverArt = thumbnail.replace('thumb', 'cover_big'); //increasing img quality
  image.src = coverArt;
  const cardTitle = document.createElement('h2');
  const titleText = document.createTextNode(`${name}`);
  const parag = document.createElement('p');
  const paragText = document.createTextNode(
    `${summary ? summary : "This game doesn't have a summary."}`
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
    increaseVote();
  });
  function increaseVote() {
    badgeText.nodeValue = Number(badgeText.nodeValue) + 1;
  }
}
