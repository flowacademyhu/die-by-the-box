const { table, getBorderCharacters } = require('table');
const axel = require('axel');
const addtopscore = require('./topscores.js');
const { draw } = require('axel');

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
      if (i === 0 || k === 0 || i === kitoltendo - 1 || k === kitoltendo - 1) {
        kitoltendo[i][k] = '██';
      if ((i === player.posy) && (k === player.posx)) {
        if (player.head === 'top' && player.facing === 'right'){
          kitoltendo[i][k] = '^>';}
        if (player.head === 'left' && player.facing === 'right'){
          kitoltendo[i][k] = '<';}
        if (player.head === 'left' && player.facing === 'left'){
            kitoltendo[i][k] = '<˛';}
        if (player.head === 'right' && player.facing === 'right'){
          kitoltendo[i][k] = ',>';}
        if (player.head === 'right' && player.facing === 'left'){
            kitoltendo[i][k] = '^>';}
        if (player.head === 'top' && player.facing === 'left'){
            kitoltendo[i][k] = '<^';}    
        }
      for (let l = 0; l < boxstuff.length; l++) {
        if (i === boxstuff[l].posy && k === boxstuff[l].posx) {
          kitoltendo[i][k] = 'B';
        }
      }
    }
  }
}
  return kitoltendo;
};


const drawMap = (palyaKeret) => {
  const text = table.table(palyaKeret, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0
    }
  });
  console.clear();
  console.log('Points:', player.points, 'Lives:', player.elet);
  console.log(text);
};

const addTopScore = () => {
  for ( i = 0; i < addtopscore.length; i++) {
  if (player.points > addtopscore[i].points) {
    addtopscore.points = player.points;
    addtopscore.name = player.name;
    break
  }
}
};

module.exports = {
    palyaKeret,
    palyaKitoltes,
    drawMap,
    addTopScore
  };