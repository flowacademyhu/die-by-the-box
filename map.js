const table = require('table');
const axel = require('axel');
const topscores = require('./topscores.json');
const fs = require('fs');

const palyaKeret = (szelesseg, magassag) => {
  const hasznalttomb = new Array(magassag);
  for (let i = 0; i < hasznalttomb.length; i++) {
    hasznalttomb[i] = new Array(szelesseg);
  }
  return hasznalttomb;
};
const palyaKitoltes = (kitoltendo, player, boxstuff, scorestuff) => {
  for (let i = 0; i < kitoltendo.length; i++) {
    for (let k = 0; k < kitoltendo[i].length; k++) {
      kitoltendo[i][k] = ' ';
      for (let l = 0; l < scorestuff.length; l++) {
        if (i === scorestuff[l].posy && k === scorestuff[l].posx) {
          kitoltendo[i][k] = '🎈';
        }
      }
      if ((i === player.posy) && (k === player.posx)) {
        if (player.head === 'top' && player.facing === 'right'){
          kitoltendo[i][k] = '👉';}
        if (player.head === 'left' && player.facing === 'right'){
          kitoltendo[i][k] = '👍';}
        if (player.head === 'left' && player.facing === 'left'){
            kitoltendo[i][k] = '👎';}
        if (player.head === 'right' && player.facing === 'right'){
          kitoltendo[i][k] = '👇';}
        if (player.head === 'right' && player.facing === 'left'){
            kitoltendo[i][k] = '👍';}
        if (player.head === 'top' && player.facing === 'left'){
            kitoltendo[i][k] = '👈';}
        }
      for (let l = 0; l < boxstuff.length; l++) {
        if (i === boxstuff[l].posy && k === boxstuff[l].posx) {
          kitoltendo[i][k] = '📦';
        }
      }
    }
  }
  kitoltendo[0][0] = '👌:';
  kitoltendo[0][1] = player.points;
  kitoltendo[0][8] = '🩸:';
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
const addTopScore = (pointscollected, player) => {
  for ( i = 0; i < topscores.length; i++ ) {
  if (pointscollected > topscores[i].points) {
    topscores[i].points = player.points;
    topscores[i].name = player.name;
    break
  }
}
  fs.readFile('./topscores.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        const databases = JSON.parse(data);

        // add a new record
        databases.push({
            name: player,
            points: pointscollected
        });

        // write new data back to the file
        fs.writeFile('./topscores.json', JSON.stringify(databases, null, 4), (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            }
        });
    }

})
};
module.exports = {
    palyaKeret,
    palyaKitoltes,
    drawMap,
    addTopScore
  };