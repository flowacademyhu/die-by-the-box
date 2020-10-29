const map = require("./map");

const spawnBoxes = (boxNum, szelesseg) => {
    let boxTomb = []
    let boxdarab = { posx: 0, posy: 0,}
    let box_x = 0; 
    let counter = 0;
    for (let i = 0; i < boxNum; i++) {
        boxdarab = { posx: 0, posy: 0,}
        box_x = Math.floor(Math.random() * szelesseg);
        boxdarab.posx = (box_x);
        if (boxTomb[0] === undefined) {
            boxTomb.push(boxdarab);
        }
        else if (boxTomb[0] !== undefined) {
            counter = 0;
            for (let j = 0; j < boxTomb.length; j++) {
                if (boxTomb[j].posx === boxdarab.posx) {
                    counter = counter +1
                }
            }
            if (counter === 0) {
                boxTomb.push(boxdarab);
            }
        }
    }
    return boxTomb
    };

const alsotSzamolSzam = (boxok, magassag) => {
    let ennyivanalul = 0;
    for (let k = 0; k < boxok.length; k++) {
       if (boxok[k].posy === magassag-1) {
           ennyivanalul = ennyivanalul + 1;
       }
    }
    return ennyivanalul;
}

const alsotSzamolTomb = (boxok, magassag) => {
    let tartotomb = []
    for (let k = 0; k < boxok.length; k++) {
        tartotomb
       if (boxok[k].posy === magassag-1) {
           tartotomb.push(boxok[k])
       }
    }
    return tartotomb;
}

const alsotTorol = (boxok, torlos) => {
    let eredmeny = []
    let talalatok = 0;
    for (let l = boxok.length-1; l >= 0; l--) {
        talalatok = 0;
        for (let m = 0; m < torlos.length; m++) {
        if (boxok[l].posy === torlos[m].posy && boxok[l].posx === torlos[m].posx) {
            talalatok = talalatok + 1;
        }
     }
     if (talalatok === 0) {
        eredmeny.push(boxok[l])
 }
    }
     return eredmeny
}

module.exports = {
    spawnBoxes,
    alsotSzamolSzam,
    alsotSzamolTomb,
    alsotTorol
};