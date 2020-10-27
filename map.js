const table = require('table');
const axel = require('axel');

const palyaKeret = (szelesseg, magassag) => {
  const hasznalttomb = new Array(magassag);
  for (let i = 0; i < hasznalttomb.length; i++) {
    hasznalttomb[i] = new Array(szelesseg);
  }
  return hasznalttomb;
};

const palyaKitoltes = (kitoltendo, player) => {
  for (let i = 0; i < kitoltendo.length; i++) {
    for (let k = 0; k < kitoltendo[i].length; k++) {
      kitoltendo[i][k] = ' ';
      if ((i === player.posx) && (k === player.posy)) {
        kitoltendo[i][k] = 'P';
      }
    }
  }
  return kitoltendo;
};

module.exports = {
    palyaKeret,
    palyaKitoltes,
  };