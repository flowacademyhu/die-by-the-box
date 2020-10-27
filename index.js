const map = require('./map');
const { palyaKitoltes, palyaKeret } = require('./map');
const boxes = require('./boxes');
const table = require('table');
const { box } = require('axel');

let szelesseg = 10
let magassag = 15
let tomb_ami_a_map = palyaKeret(szelesseg, magassag);

let player = { posx: tomb_ami_a_map.length -1, posy: Math.floor(tomb_ami_a_map[0].length / 2) };
let boxmany = []
boxmany = boxes.spawnBoxes(2, szelesseg);
let boxes_new = []
let counter = 0;

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
              if (tomb_ami_a_map[w][o] === ' ' || tomb_ami_a_map[w][o] === 'P') {

                //van-e alatta hely^

                vaneures = vaneures +1;
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
if (counter === magassag-1) {
boxes_new = []
boxes_new = boxes.spawnBoxes(2, szelesseg)
  for (let d = 0; d < boxes_new.length; d++) {
    boxmany.push(boxes_new[d])
  }
  counter = 0;
}
//regi tomb az uj elemekkel kibővítve


//Karakter mozgás
let key;

  const stdin = process.stdin;

  stdin.setRawMode(true); // Ne várjon enterre
  stdin.resume(); // Csak process.exit-el lehet kilépni
  stdin.setEncoding('utf8'); // Karaktereket kapjunk vissza
  stdin.on ('data', (key) => { // Callback függvény
    if (key === 'q') {
      process.exit();
    }
      if (key === 'a' && player.posx > 1 && kitoltendo[player.posy][player.posx - 1] !== 'X') { // Ha az egyel balra nincs doboz akkor 1-t balra lép
        player.posx--;
     } 
     // Majd itt kezd el ugrálni a dobozokra -->
     //else if (key === 'a' && player.posx > 1 && kitoltendo[player.posy +1][player.posx - 1] === 'X') { // Felugrik az egyel balra lévő 1-gyel magasabban lévő doboz tetejére 
     //   player.posx--;
    //    player.posy++; 
    //  }
      if (key === 'd' && player.posx < szelesseg-2 && kitoltendo[player.posy][player.posx - 1] !== 'X') { //jobbra lép 1et ha ott nincs doboz
        player.posx++;
    } 
    // Majd itt kezd el ugrálni a dobozokra -->
    //else if (key === 'd' && playerpos.x < width - 2 && kitoltendo[playerpos.y +1][playerpos.x + 1] === 'X') { // Felugrik az egyel jobbra lévő 1-gyel magasabban lévő doboz tetejére 
       // playerpos.x++;
      //  playerpos.y++; 
    //}
      refreshMap();
  });


// map.drawMap(tomb_ami_a_map);
console.log(tomb_ami_a_map);
counter = counter + 1
}, 1000);

