import Ban from './ban.png';

export let bird = { height: 10, position: 2 };

export let asteroids = [
  { position: 39, vertical: 12 },
  { position: 32, vertical: 14 },
  { position: 30, vertical: 11 },
  { position: 23, vertical: 9 },
  { position: 19, vertical: 7 }
];

export let towers = [
  { position: 39, height: 3, upright: false },
  { position: 36, height: 5, upright: true },
  { position: 32, height: 7, upright: false },
  { position: 28, height: 6, upright: true },
  { position: 24, height: 7, upright: false },
  { position: 21, height: 5, upright: true },
  { position: 17, height: 8, upright: false },
  { position: 13, height: 2, upright: true },
  { position: 9, height: 8, upright: false },
  { position: 5, height: 2, upright: true }
];

export let banStyle = {
  background: `url(${Ban}) no-repeat center center`,
  backgroundSize: 'contain',
  width: '400px',
  height: '400px'
};

export let opponentBanStyle = {
  background: `url(${Ban}) no-repeat center center`,
  display: 'table-cell',
  verticalAlign: 'middle',

  backgroundSize: 'contain',
  width: '100px',
  height: '100px',
  textAlign: 'center'
};

export let thumbnailStyle = {
  width: '100px',
  height: '100px',
  textAlign: 'center'
};

export let winnerStyle = {
  fontSize: '6em',
  textAlign: 'center'
};

export let createGrid = gridCopy => {
  for (let i = 0; i < 20; i++) {
    gridCopy.push(new Array(40).fill(''));
  }
};

export let createTowers = (gridCopy, towersCopy) => {
  for (let i = 0; i < towersCopy.length; i++) {
    for (let j = 0; j < towersCopy[i].height; j++) {
      if (towersCopy[i].upright) {
        gridCopy[19 - j][towersCopy[i].position] = 'blue';
      } else {
        gridCopy[j][towersCopy[i].position] = 'blue';
      }
    }
  }
};

export let moveTowers = towersCopy => {
  for (let i = 0; i < towersCopy.length; i++) {
    towersCopy[i].position--;
    if (towersCopy[i].position < 0) {
      towersCopy[i].position = 39;
      towersCopy[i].height = Math.floor(Math.random() * 7) + 3;
    }
  }
};

export let createAsteroids = (gridCopy, asteroidsCopy) => {
  for (let i = 0; i < asteroidsCopy.length; i++) {
    gridCopy[asteroidsCopy[i].vertical][asteroidsCopy[i].position] = 'red';
  }
};

export let moveAsteroids = asteroidsCopy => {
  for (let i = 0; i < asteroidsCopy.length; i++) {
    asteroidsCopy[i].position--;
    if (asteroidsCopy[i].position < 0) {
      asteroidsCopy[i].position = 39;
      asteroidsCopy[i].vertical = Math.floor(Math.random() * 5 + 10);
    }
  }
};
