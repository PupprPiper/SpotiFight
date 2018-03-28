import Ban from './ban.png';

export let bird = { height: 10, position: 2 };

export let towers = [
  { position: 29, height: 3, upright: false },
  { position: 26, height: 5, upright: true },
  { position: 22, height: 7, upright: false },
  { position: 18, height: 6, upright: true },
  { position: 14, height: 7, upright: false },
  { position: 11, height: 5, upright: true },
  { position: 7, height: 8, upright: false },
  { position: 3, height: 2, upright: true }
];

export let banStyle = {
  background: `url(${Ban}) no-repeat center center`,
  backgroundSize: 'contain',
  width: '400px',
  height: '400px'
};

export let opponentBanStyle = {
  background: `url(${Ban}) no-repeat center center`,
  backgroundSize: 'contain',
  width: '75px',
  height: '75px',
  textAlign: 'center'
};

export let opponentThumbnailStyle = url => {
  return {
    background: `url(${url}) no-repeat center center`,
    backgroundSize: 'contain',
    width: '75px',
    height: '75px',
    textAlign: 'center'
  };
};

export let createGrid = gridCopy => {
  for (let i = 0; i < 20; i++) {
    gridCopy.push(new Array(30).fill('lightgreen'));
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
      towersCopy[i].position = 29;
      towersCopy[i].height = Math.floor(Math.random() * 7) + 3;
    }
  }
};
