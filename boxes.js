const map = require("./map");

const spawnBoxes = (boxNum, szelesseg) => {
    let boxTomb = []
    let boxdarab = { posx: 0, posy: 0,}
    let box_x = 0; 
    for (let i = 0; i < boxNum; i++) {
        boxdarab = { posx: 0, posy: 0,}
        box_x = Math.floor(Math.random() * szelesseg);
        boxdarab.posx = (box_x);
        boxTomb.push(boxdarab);
    }
    return boxTomb
    };

module.exports = {
    spawnBoxes
};