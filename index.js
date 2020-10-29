const map = require('./map');
const { palyaKitoltes, palyaKeret } = require('./map');
const boxes = require('./boxes');
const table = require('table');
const { box } = require('axel');
const falling = require('./falling');

const feltetel1 = (palya[w][o] !== 'B' && palya[w][o] !== 'S');
const feltetel2 = (palya[w][o] === ' ' || palya[w][o] === 'P');

const canPushKey = 0;
const szelesseg = 10;
const magassag = 15;
let tomb_ami_a_map = palyaKeret(szelesseg, magassag);

const player = { posx: tomb_ami_a_map[0].length / 2, posy: Math.floor(tomb_ami_a_map.length - 1), head: 'top', facing: 'left' };
let boxmany = [];
boxmany = boxes.spawnBoxes(2, szelesseg);
let boxes_new = [];
let counter = 0;
let szamolos = 0;
let torlendo = [];

tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);

setInterval(() => {
// boxok mozgatasa
  let vaneures = 0;
  for (let z = 0; z < boxmany.length; z++) {
    vaneures = 0;
    // if ciklus h utolso sor
    if (boxmany[z].posy !== magassag - 1) {
      // mapellenorzes h van-e alatta hely
      for (let t = 0; t < tomb_ami_a_map.length; t++) {
        for (let o = 0; o < tomb_ami_a_map[t].length; o++) {
          // körbejártuk a tombot^
          if (boxmany[z].posy === t && boxmany[z].posx === o) {
            // van e a tomb adott pontjan doboz^
            for (let w = t; w < tomb_ami_a_map.length; w++) {
              if (tomb_ami_a_map[w][o] === ' ' || tomb_ami_a_map[w][o] === 'P') {
                // van-e alatta hely^
                vaneures = vaneures + 1;
              }
            }
          }
        }
      }
      // for cikluson kívül mert nem minden üresre akarunk mozgatni, ha tobb mint egy üres van akk megy egyet le
      if (vaneures > 0) {
        boxmany[z].posy++;
      }
    }
  }
  // boxok mozgatva
  // map kitoltes
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);
  // map kitoltve
  // uj boxok spawnoltatasa és elheylezése időzítve!!!! counter 0zasa
  if (counter === magassag - 1) {
    boxes_new = [];
    boxes_new = boxes.spawnBoxes(2, szelesseg);
    for (let d = 0; d < boxes_new.length; d++) {
      boxmany.push(boxes_new[d]);
    }
    counter = 0;
  }
  // regi tomb az uj elemekkel kibővítve
  // megnezzuk mennyi van aluk
  szamolos = boxes.alsotSzamolSzam(boxmany, magassag);
  torlendo = boxes.alsotSzamolTomb(boxmany, magassag);
  // toroljuk ha eleri a szelesseget
  console.log(szamolos);

  if (szamolos === undefined && torlendo !== undefined && szamolos[0] === szelesseg) {
    boxmany = boxes.alsotTorol(boxmany, torlendo);
  }
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);

  // map.drawMap(tomb_ami_a_map);
  console.log(tomb_ami_a_map);
  counter = counter + 1;
}, 300);

// regi tomb az uj elemekkel kibővítve

// Karakter mozgás

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  // spamszamlalo
  if (key === 'a') {
  // nem a szélén van
    if (player.posx !== 0) {
    // dobozbqa akar szaladni
      if (tomb_ami_a_map[player.posy][player.posx - 1] === 'B' && player.head === 'top') {
        // ráfordul_jobb_also
        player.head = 'right';
        player.facing = 'left';
      } else if (tomb_ami_a_map[player.posy][player.posx - 1] === 'B' && player.head === 'right') {
        // rávanfordulva, lehet mászni
        // kell-e maszni, v sarkon van
        // masznikell, felfele
        if (tomb_ami_a_map[player.posy - 1][player.posx - 1] === 'B' && tomb_ami_a_map[player.posy][player.posx - 1] === 'B' && player.head === 'right' && tomb_ami_a_map[player.posy - 1][player.posx] === ' ') {
          player.posy--;
        }
        // sarkon van felfele_jobbfelso
        else if (tomb_ami_a_map[player.posy - 1][player.posx - 1] === ' ' && player.head === 'right' && player.facing === 'left') {
          player.head = 'top';
          player.posy--;
          player.posx--;
        }
      }

      // sarkon van, lefele, balfelso
      else if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx - 1] === ' ' && player.head === 'top' && tomb_ami_a_map[player.posy + 1][player.posx] === 'B') {
        player.head = 'left';
        player.posy++;
        player.posx--;
      }

      // ballentfordul
      else if (player.head === 'left' && (tomb_ami_a_map[player.posy + 1] === undefined || tomb_ami_a_map[player.posy + 1][player.posx] === 'B')) {
        player.head = 'top';
        player.facing = 'left';
      }

      // maszni kell lefele
      else if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === ' ' && player.head === 'left' && (tomb_ami_a_map[player.posy + 1][player.posx + 1] === 'B' || tomb_ami_a_map[player.posy + 1][player.posx - 1] === undefined)) {
        player.posy++
        ;
      }
      // sarokrol fordaul barla, balalso
      else if (tomb_ami_a_map[player.posy + 1] !== undefined && (tomb_ami_a_map[player.posy + 1][player.posx] === 'B' || (tomb_ami_a_map[player.posy + 1][player.posx] === ' ' && player.posy + 1 === magassag - 1)) && player.head === 'left') {
        player.head === 'top';
      } else { player.posx--; }
    // nincs spam
    } else if (player.head === 'left' && player.posx === 0) {
      if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === ' ') {
        player.posy++;
      } else { player.head = 'top'; }
    }
  }
  if (key === 'd') {
  // nem a szélén van
    if (player.posx !== szelesseg - 1) {
    // dobozbqa akar szaladni balról
      if (tomb_ami_a_map[player.posy][player.posx + 1] === 'B' && player.head === 'top') {
        // ráfordul_bal_also
        player.head = 'left';
        player.facing = 'right';
      } else if (tomb_ami_a_map[player.posy][player.posx + 1] === 'B' && player.head === 'left') {
        // rávanfordulva, lehet mászni
        // kell-e maszni, v sarkon van
        // masznikell, felfele
        if (tomb_ami_a_map[player.posy - 1][player.posx + 1] === 'B' && tomb_ami_a_map[player.posy][player.posx + 1] === 'B' && player.head === 'left' && tomb_ami_a_map[player.posy - 1][player.posx] === ' ') {
          player.posy--;
        }
        // sarkon van felfele_balfelso
        else if (tomb_ami_a_map[player.posy - 1][player.posx + 1] === ' ' && player.head === 'left' && player.facing === 'right') {
          player.head = 'top';
          player.posy--;
          player.posx++;
        }
      }

      // sarkon van, lefele, jobbfelso
      else if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx + 1] === ' ' && player.head === 'top' && tomb_ami_a_map[player.posy + 1][player.posx] === 'B') {
        player.head = 'right';
        player.posy++;
        player.posx++;
      }

      // jobblentfordul
      else if (player.head === 'right' && (tomb_ami_a_map[player.posy + 1] === undefined || tomb_ami_a_map[player.posy + 1][player.posx] === 'B')) {
        player.head = 'top';
        player.facing = 'right';
      }

      // maszni kell lefele
      else if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === ' ' && player.head === 'right' && (tomb_ami_a_map[player.posy + 1][player.posx - 1] === 'B' || tomb_ami_a_map[player.posy + 1][player.posx + 1] === undefined)) {
        player.posy++
        ;
      }
      // sarokrol fordaul jobbra, jobbalso
      else if (tomb_ami_a_map[player.posy + 1] !== undefined && (tomb_ami_a_map[player.posy + 1][player.posx] === 'B' || (tomb_ami_a_map[player.posy + 1][player.posx] === ' ' && player.posy + 1 === magassag - 1)) && player.head === 'right') {
        player.head === 'top';
      } else { player.posx++; }
    // nincs spam
    } else if (player.head === 'left' && player.posx === 0) {
      if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === ' ') {
        player.posy++;
        if (player.posx !== szelesseg - 1) {
          // ne spammeljunk
          player.posx++;
        }
      } else { player.head = 'top'; }
    }
  }
  console.clear();
  tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany);
  console.log(tomb_ami_a_map);
  // lehetnyomni
  if (key === 'q') {
    console.log('Quitter! You might as well quit life too!!!');
    process.exit(0);
  }
});
