const table = require('table');
const axel = require('axel');
const addtop = require('./topscores.json');
const fs = require('fs');
const chalk = require('chalk');

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
//   let tempobject = {"name": '', "points": 0}
//   for ( i = 0; i < topscores.length; i++ ) {
//   if (pointscollected > topscores[i].points) {
//     tempobject.points = player.points;
//     tempobject.name = player.name;
//     topscores.push(tempobject);
//     break
//   }
// }
const data = fs.readFileSync('./topscores.json', 'utf8')
        // parse JSON string to JSON object
        let databases = JSON.parse(data);
        // add a new record
        databases.push({
            name: player,
            points: pointscollected
        });
        databases = JSON.stringify(databases, null, 4)
        // write new data back to the file
        fs.writeFileSync('topscores.json', databases, (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            }
        });

};

const generateTopScores = (nOfScores) => {  //és ki is írja
  let arrForTop = [];
  for ( i = 0; i < addtop.length; i++ ) {
      arrForTop.push([addtop[i].points, addtop[i].name]);  //A teljes JSON-t tömbbe pakolja
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

  let newRecord = (points, name) => {
    let top = generateTopScores(5);
    let answer = []
    for (let i = 0; i < top.length ; i++ ) {
      if (points > top[i][0]) {
        top.splice(i, 0, [points, name]);
        top.pop();
        answer.push('Yaay! Your score is in TOP5 now! \n Congratulations!\n\n')
        answer.push(top)
        return answer
      } 
    } 
    answer.push('Not good, not terrible.')
    answer.push(top);
    return answer
  }


module.exports = {
    palyaKeret,
    palyaKitoltes,
    drawMap,
    addTopScore,
    generateTopScores,
    newRecord
  };