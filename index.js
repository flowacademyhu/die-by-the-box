const map = require('./map');
const { palyaKitoltes, palyaKeret } = require('./map');
const { spawnBoxes, falling } = require('./boxes');

let szelesseg = 10
let magassag = 15
let tomb_ami_a_map = palyaKeret(szelesseg, magassag);
let counter = 0;

let player = { posx: tomb_ami_a_map.length -1, posy: Math.floor(tomb_ami_a_map[0].length / 2) };
console.log(palyaKitoltes(tomb_ami_a_map, player));
setInterval(() => {
    tomb_ami_a_map = palyaKeret(szelesseg, magassag);
    palyaKitoltes(tomb_ami_a_map, player);
    if (counter === 0) {
        spawnBoxes(tomb_ami_a_map, 4);
    }
    counter = counter + 1
    falling(tomb_ami_a_map);
},500)
