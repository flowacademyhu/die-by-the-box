const map = require('./map');
const { palyaKitoltes, palyaKeret } = require('./map');
const boxes = require('./boxes');
const table = require('table');
const axel = require('axel');
const moves = require('./moves.js');
const addtopscore = require('./topscores.json');
const falling = require('./falling.js')
const fs = require('fs');

var term = require('terminal-kit').terminal;

let topscores = addtopscore.topscores;
let canPushKey = 0
let szelesseg = 10
let magassag = 15
let tomb_ami_a_map = palyaKeret(szelesseg, magassag);
let scoremany = []
let player = { posx: tomb_ami_a_map[0].length / 2, posy: Math.floor(tomb_ami_a_map.length - 1), head: 'top', facing: 'left', points: 0, lives: 3, name: 'Tesztelek' };
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
let nOfScores = 5;
tomb_ami_a_map = palyaKitoltes(tomb_ami_a_map, player, boxmany, scoremany)

term.cyan('Welcome to the World of Madness!\n');
term.cyan('\'Tis a world of mortal dangers, where bestial boxes prey on the unwary.\n');

let choice = '';
var items = [
  'New Game',
  'Hall of Fame',
  'Quit Game'
];

const theGameItself = () => {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("What is your name ? ", function (name) {
    player.name = name;
    rl.close();
  });

  rl.on("close", function () {

    setInterval(() => {
      isDead = moves.playerDeath(boxmany, player, isDead);
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
      //esik-e
      if (player.posy !== magassag - 1 && ((tomb_ami_a_map[player.posy + 1] !== undefined && (tomb_ami_a_map[player.posy][player.posx - 1] === ' ' || tomb_ami_a_map[player.posy][player.posx - 1] === undefined) && (tomb_ami_a_map[player.posy][player.posx + 1] === ' ' || tomb_ami_a_map[player.posy][player.posx + 1] === undefined) && tomb_ami_a_map[player.posy + 1][player.posx] === ' ') || (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === '🎈'))) {
        kellEsni = true
      }
      if (kellEsni && player.posy !== magassag - 1 && ((tomb_ami_a_map[player.posy + 1] !== undefined && (tomb_ami_a_map[player.posy + 1][player.posx] === ' ' || tomb_ami_a_map[player.posy + 1][player.posx] === '🎈')))) {
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
      if (counter_jutalom === (magassag - 1) * 2) {
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

      let renderelt = table.table(tomb_ami_a_map, {
        border: {
          topBody: `─`,
          topJoin: ``,
          topLeft: `┌`,
          topRight: `┐`,

          bottomBody: `─`,
          bottomJoin: ``,
          bottomLeft: `└`,
          bottomRight: `┘`,

          bodyLeft: `│`,
          bodyRight: `│`,
          bodyJoin: ``,

          joinBody: ``,
          joinLeft: ``,
          joinRight: ``,
          joinJoin: ``
        },
        columnDefault: {
          paddingLeft: 1,
          paddingRight: 2,
          width: 3
        },
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === size;
        }
      });
      console.log(renderelt);
      counter_doboz = counter_doboz + 1;
      counter_jutalom = counter_jutalom + 1;
    }, 300);


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
      let renderelt = table.table(tomb_ami_a_map, {
        border: {
          topBody: `─`,
          topJoin: ``,
          topLeft: `┌`,
          topRight: `┐`,

          bottomBody: `─`,
          bottomJoin: ``,
          bottomLeft: `└`,
          bottomRight: `┘`,

          bodyLeft: `│`,
          bodyRight: `│`,
          bodyJoin: ``,

          joinBody: ``,
          joinLeft: ``,
          joinRight: ``,
          joinJoin: ``
        },
        columnDefault: {
          paddingLeft: 1,
          paddingRight: 2,
          width: 3
        },
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === size;
        }
      });
      console.log(renderelt);
      //lehetnyomni
      if (key === 'q') {
        console.log('Quitter! You might as well quit life too!!!')
        process.exit(0);
      }
    });



  });
}

term.singleColumnMenu(items, function (error, response) {
  term('\n')(
    choice = response.selectedText ,
  );
  if (choice === 'New Game') {
    theGameItself()
  }
  else if (choice === 'Hall of Fame') {

    fs.readFile('./topscores.json', 'utf8', (err, data) => {

      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        let allEntries = JSON.parse(data);
        let ideiglenesTomb = [];
        let ideiglenesTarolo = [];
        for (let k = 1; k < allEntries.length; k++) {
          let tarolo = allEntries[k];
          let l = k - 1;
          while (l >= 0 && allEntries[l].points < tarolo.points) {
            allEntries[l + 1] = allEntries[l];
            l--;
          }
          allEntries[l + 1] = tarolo;
        }
        console.log('')
        console.log('Retrieving Data...')
        console.log('');
        console.log('');
        console.log('Match Found!');

        for (let z = 0; z < 5; z++) {
          ideiglenesTarolo = []
          ideiglenesTarolo.push(allEntries[z].name);
          ideiglenesTarolo.push(allEntries[z].points);
          ideiglenesTomb.push(ideiglenesTarolo);
        }
        console.log(table.table(ideiglenesTomb))
        console.log('Press * to quit.')
        console.log('Press - to begin your journey.')
        const stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', (key) => {
          // spamszamlalo
          if (key === '*') {
            console.log('See you around, Space Cowboy!');
            process.exit(0)
          }
          if (key === '-') {
            theGameItself()
          }
        })
      }

    })
  }
  else if (choice === 'Quit Game') {
    process.exit(0);
  }
});
