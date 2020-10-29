const table = require('table');
const axel = require('axel');

const palyaKeret = (szelesseg, magassag) => {
  const hasznalttomb = new Array(magassag);
  for (let i = 0; i < hasznalttomb.length; i++) {
    hasznalttomb[i] = new Array(szelesseg);
  }
  return hasznalttomb;
};


const palyaKitoltes = (kitoltendo, player, boxstuff) => {
  for (let i = 0; i < kitoltendo.length; i++) {
    for (let k = 0; k < kitoltendo[i].length; k++) {
      kitoltendo[i][k] = ' ';
      if ((i === player.posy) && (k === player.posx)) {
        if (player.head === 'top'){
          kitoltendo[i][k] = '^';}
        if (player.head === 'left'){
          kitoltendo[i][k] = '<';}
        if (player.head === 'right'){
          kitoltendo[i][k] = '>';}  
        }
      for (let l = 0; l < boxstuff.length; l++) {
        if (i === boxstuff[l].posy && k === boxstuff[l].posx) {
          kitoltendo[i][k] = 'B';
        }
      }
    }
  }
  console.clear();
  return kitoltendo;
};


const drawMap = (map) => {
  const text = table.table(map);
  console.clear();
  console.log(text);
};

module.exports = {
    palyaKeret,
    palyaKitoltes,
    drawMap
  };