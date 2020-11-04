const table = require('table');
const ctx = require('axel');
const topscores = require('./topscores.json');
const fs = require('fs');
const addtop = require('./topscores.json');

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
  kitoltendo[0][8] = '🤍:';
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

const generateTopScores = (nOfScores) => { //és ki is írja
  let arrForTop = [];
  for ( i = 0; i < addtop.length; i++ ) {
      arrForTop.push([addtop[i].points ,addtop[i].name]);  //A teljes JSON-t tömbbe pakolja
  };
  arrForTop.sort(sortFunction); //sorba rendezi a tömböt
  function sortFunction(a, b) {
      if (a[0] === b[0]) {
          return 0;
      }
      else {
          return (a[0] < b[0]) ? -1 : 1;
      }
  }
  //console.log(arrForTop);
  // If nOfScores több mint amennyi score van
  let arrForTopN = [];
  for (i = arrForTop.length-1; i >= arrForTop.length-nOfScores; i--) { //kii
    arrForTopN.push(arrForTop[i]);
  }
  return arrForTopN;
  };

  let newRecord = (points, nOfScores) => {
    let top = generateTopScores(nOfScores);
    if (points > top[nOfScores-1][0]) {

    } else {
      console.clear() 
      ctx.clear();
ctx.bg(0,0,61);
ctx.box(1,1,35,40);
ctx.fg(204,0,0);
ctx.text(15,5, "GAME OVER!");
ctx.bg(153,0,0);
ctx.box(1,9,35,1);
ctx.bg(219,21,21);
ctx.box(1,8,35,1);
ctx.bg(255,128,0);
ctx.box(1,7,35,1);
ctx.bg(0,0,153);
ctx.box(1,6,35,1);
ctx.bg(51,102,0);
ctx.box(1,10,35,40);
ctx.bg(204,102,0);
ctx.box(14,7,10,5);
ctx.bg(64,64,64);
ctx.box(15,8,8,6);
ctx.bg(64,64,64);
ctx.box(14,12,10,2);
ctx.fg(0,0,0);
ctx.text(17,9, "RIP");
ctx.bg(51,102,12);
ctx.box(15,20,10,10);
ctx.bg(20,40,0);
ctx.box(14,14,10,6);
ctx.bg(20,40,0);
ctx.box(12,16,14,3);
ctx.bg(20,40,0);
ctx.box(10,19,18,3);
    }
  }


module.exports = {
    palyaKeret,
    palyaKitoltes,
    drawMap,
    addTopScore,
    generateTopScores,
    newRecord
  };