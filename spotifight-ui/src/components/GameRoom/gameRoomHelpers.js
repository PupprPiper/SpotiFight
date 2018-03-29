import Lobby from '../Lobby/Lobby.jsx';
import Masher from '../Games/Masher/Masher.jsx';
import MusicTrivia from '../Games/MusicTrivia/MusicTrivia';
import Flappy from '../Games/Flappy/Flappy';
import RPSLS from '../Games/RPSLS/rpsls.jsx';

export const games = {
  Lobby: Lobby,
  Masher: Masher,
  MusicTrivia: MusicTrivia,
  RPSLS: RPSLS,
  Flappy: Flappy
};

export const assignLeftPlayer = array => {
  return array.filter((item, index) => {
    if (index % 2 === 0 || index === 0) {
      return item;
    }
  });
};

export const assignRightPlayer = array => {
  return array.filter((item, index) => {
    if (index % 2 === 1) {
      return item;
    }
  });
};
