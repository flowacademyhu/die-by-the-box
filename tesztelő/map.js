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
        if (player.head === 'top' && player.facing === 'right'){
          kitoltendo[i][k] = '^>';}
        if (player.head === 'left' && player.facing === 'rigth'){
          kitoltendo[i][k] = '<';}
        if (player.head === 'left' && player.facing === 'left'){
            kitoltendo[i][k] = '<_';}
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
  kitoltendo[0][0] = '🎖️';
  kitoltendo[0][1] = player.points;
  kitoltendo[0][8] = '❤️';
  kitoltendo[0][9] = player.lives;
  console.clear();
  return kitoltendo;
};


const drawMap = (map) => {
  console.log('Points:', player.points, 'Lives:', player.elet);
  const text = table.table(map);
  console.clear();
  console.log(text);
};

const savePointAfterDeath = (playername, collectedpoints) => {
  for (i = 0, i < topscores.length, i++) {
    if topscores.ID < player.points {
      topscores.name = player.name;
      topscores.points = player.points;
      break;
    }
  }
  };


module.exports = {
    palyaKeret,
    palyaKitoltes,
    drawMap
    savePointAfterDeath
  };