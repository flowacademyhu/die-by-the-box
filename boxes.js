const map = require("./map");
const { playerDeath } = require("./moves");

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

const spawnInterval = (ezEssen_Osszes, mennyiEssen, szelesseg) => {
    let ezEssen_uj = []
    ezEssen_uj = spawnBoxes(mennyiEssen, szelesseg)
    for (let d = 0; d < ezEssen_uj.length; d++) {
      ezEssen_Osszes.push(ezEssen_uj[d])
    }
    return ezEssen_Osszes;
}


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


const ScoreTorlesScore = (scoreTomb, jatekos, dobozok) => {
    let eredmeny = []
    let talalatok = 0;
    for (let l = 0; l < scoreTomb.length; l++) {
        talalatok = 0;
        //nem player?
        if (scoreTomb[l].posy === jatekos.posy && scoreTomb[l].posx === jatekos.posx) {
        //player eseten semmi
        talalatok = talalatok + 3
        }
        //nem doboz?
        for (let n = 0; n < dobozok.length; n++) {
            if (dobozok[n].posy === scoreTomb[l].posy && dobozok[n].posx === scoreTomb[l].posx) {
                talalatok = talalatok + 8
            }
            }
            //doboz eseten semmi 
        for (let m = 0; m < scoreTomb.length; m++) {
        if (scoreTomb[l].posy === scoreTomb[m].posy && scoreTomb[l].posx === scoreTomb[m].posx) {
            talalatok = talalatok + 1;
        }
     }
     if (talalatok === 1) {
        eredmeny.push(scoreTomb[l])
 }
}
     return eredmeny
}

const ScorePlayer = (scoreTomb, jatekos) => {
    let talalatok = 0;
    for (let l = 0; l < scoreTomb.length; l++) {
        talalatok = 0;
        if (scoreTomb[l].posy === jatekos.posy && scoreTomb[l].posx === jatekos.posx) {
        jatekos.points++
        }
}
     return jatekos.points
}



module.exports = {
    spawnBoxes,
    alsotSzamolSzam,
    alsotSzamolTomb,
    alsotTorol,
    spawnInterval,
    ScoreTorlesScore,
    ScorePlayer
};