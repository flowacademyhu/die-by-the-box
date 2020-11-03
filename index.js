const map = require('./map');
const { palyaKitoltes, palyaKeret } = require('./map');
const boxes = require('./boxes');
const table = require('table');
const { box } = require('axel');
const moves = require('./moves.js');
const addtopscore = require('./topscores.json');
const falling = require('./falling.js')

let topscores = addtopscore.topscores;
let canPushKey = 0
let szelesseg = 10
let magassag = 15
let tomb_ami_a_map = palyaKeret(szelesseg, magassag);

let scoremany = []
let player = { posx: tomb_ami_a_map[0].length / 2, posy: Math.floor(tomb_ami_a_map.length - 1), head: 'top', facing: 'left', points: 0, lives:2, name:'Tesztelek' };
let boxmany = []
//alap doboz spawn
boxmany = boxes.spawnBoxes(boxes.diffSum(player.points), szelesseg);
//alap score spawn
scoremany = boxes.spawnBoxes(2, szelesseg);
let counter_doboz = 0;
let counter_jutalom = 0;
let szamolos = 0;
let torlendo = []
let kellEsni = false;
let isDead = false;

tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany, scoremany)

setInterval(() => {
  if (isDead) {
    process.exit(0);
  }
  // box eses
  boxmany = falling.fallingBox(boxmany, tomb_ami_a_map);
  // score eses
  scoremany = falling.fallingScore(scoremany, boxmany, tomb_ami_a_map);
  // score torles
  player.points = boxes.ScorePlayer(scoremany, player)
  scoremany = boxes.ScoreTorlesScore(scoremany, player, boxmany);
  //
  if (player.posy !== magassag-1 && player.head === 'top' && ((tomb_ami_a_map[player.posy+1] !== undefined && tomb_ami_a_map[player.posy+1][player.posx] === ' ') || (tomb_ami_a_map[player.posy+1] !== undefined && tomb_ami_a_map[player.posy+1][player.posx] === '$'  ))) {
    kellEsni = true
  }
  if (kellEsni) {
    player.posy++;
    kellEsni = false;
  }
  //boxok mozgatva
  //map kitoltes
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany, scoremany);
  //map kitoltve
  //uj boxok spawnoltatasa és elheylezése időzítve!!!! counter 0zasa
  if (player.points >= 25 && counter_doboz === 8) {
    boxmany = boxes.spawnInterval(boxmany, boxes.diffSum(player.points), szelesseg);
    counter_doboz = 0;
  } else if (counter_doboz === magassag - 1) {
    boxmany = boxes.spawnInterval(boxmany, boxes.diffSum(player.points), szelesseg);
    counter_doboz = 0;
  };
  //regi tomb az uj elemekkel kibővítve
  //jutalom spawnoltatás, időzétés
  if (counter_jutalom === (magassag - 1) *2 ) {
    scoremany = boxes.spawnInterval(scoremany, 2, szelesseg);
    counter_jutalom = 0;
  }
  //megnezzuk mennyi van aluk
  szamolos = boxes.alsotSzamolSzam(boxmany, magassag);
  torlendo = boxes.alsotSzamolTomb(boxmany, magassag);
  //toroljuk ha eleri a szelesseget
  if (szamolos === szelesseg) {
    boxmany = boxes.alsotTorol(boxmany, torlendo);
    tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany, scoremany);
    kellEsni = true;
  };
  // map.drawMap(tomb_ami_a_map);
  console.log(tomb_ami_a_map);
  counter_doboz = counter_doboz + 1;
  counter_jutalom = counter_jutalom +1;
  isDead = moves.playerDeath(boxmany, player, isDead);
}, 300);
//regi tomb az uj elemekkel kibővítve

//Karakter mozgás

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  // spamszamlalo
  if (key === 'a') {
    moves.move_a(player, tomb_ami_a_map)
  }
  if (key === 'd') {
    moves.move_d(player, tomb_ami_a_map)
  }
  player.points = boxes.ScorePlayer(scoremany, player)
  scoremany = boxes.ScoreTorlesScore(scoremany, player, boxmany);
  console.clear();
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany, scoremany);
  console.log(tomb_ami_a_map);
  //lehetnyomni
  if (key === 'q') {
    console.log('Quitter! You might as well quit life too!!!')
    process.exit(0);
  }
});


