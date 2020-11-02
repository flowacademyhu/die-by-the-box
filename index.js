const map = require('./map');
const { palyaKitoltes, palyaKeret } = require('./map');
const boxes = require('./boxes');
const table = require('table');
const { box } = require('axel');
const moves = require('./moves.js');
const addtopscore = require('./topscores.js');


let canPushKey = 0
let szelesseg = 10
let magassag = 15
let tomb_ami_a_map = palyaKeret(szelesseg, magassag);

let player = { posx: tomb_ami_a_map[0].length / 2, posy: Math.floor(tomb_ami_a_map.length - 1), head: 'top', facing: 'left', points: 0, lives:0, name:'' };
let boxmany = []
boxmany = boxes.spawnBoxes(2, szelesseg);
let boxes_new = []
let counter = 0;
let szamolos = 0;
let torlendo = []
let kellEsni = false;
let isDead = false;

tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany)

setInterval(() => {
  //boxok mozgatasa
  let vaneures = 0;
  for (let z = 0; z < boxmany.length; z++) {
    vaneures = 0;
    //if ciklus h utolso sor
    if (boxmany[z].posy !== magassag - 1) {
      //mapellenorzes h van-e alatta hely
      for (let t = 0; t < tomb_ami_a_map.length; t++) {
        for (let o = 0; o < tomb_ami_a_map[t].length; o++) {
          //körbejártuk a tombot^
          if (boxmany[z].posy === t && boxmany[z].posx === o) {
            //van e a tomb adott pontjan doboz^
            for (let w = t; w < tomb_ami_a_map.length; w++) {
              if (tomb_ami_a_map[w][o] !== 'B') {
                //van-e alatta hely^
                vaneures = vaneures + 1;
              }
            }
          }
        }
      }
      //for cikluson kívül mert nem minden üresre akarunk mozgatni, ha tobb mint egy üres van akk megy egyet le
      if (vaneures > 0) {
        boxmany[z].posy++;
      }
    }
  }
  //boxok mozgatva
  //map kitoltes
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);
  //map kitoltve
  //uj boxok spawnoltatasa és elheylezése időzítve!!!! counter 0zasa
  if (counter === magassag - 1) {
    boxes_new = []
    boxes_new = boxes.spawnBoxes(2, szelesseg)
    for (let d = 0; d < boxes_new.length; d++) {
      boxmany.push(boxes_new[d])
    }
    counter = 0;
  }
  //regi tomb az uj elemekkel kibővítve
  //megnezzuk mennyi van aluk
  szamolos = boxes.alsotSzamolSzam(boxmany, magassag);
  torlendo = boxes.alsotSzamolTomb(boxmany, magassag);
  //toroljuk ha eleri a szelesseget

  if (szamolos === szelesseg) {
    boxmany = boxes.alsotTorol(boxmany, torlendo);
    tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);
    kellEsni = true;
    if (kellEsni) {
      player.posy++;
      kellEsni = false;
    }
  };
  // map.drawMap(tomb_ami_a_map);
  console.log(tomb_ami_a_map);
  counter = counter + 1;
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
  if (isDead === true) {
    process.exit(0);
  }
  if (key === 'a') {
    moves.move_a(player, tomb_ami_a_map)
  }
  if (key === 'd') {
    moves.move_d(player, tomb_ami_a_map)
  }
  console.clear();
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);
  console.log(tomb_ami_a_map);
  //lehetnyomni
  if (key === 'q') {
    console.log('Quitter! You might as well quit life too!!!')
    process.exit(0);
  }
});
