const fallingBox = (aminek_esnie_kell, palya) => {
  // dolgok mozgatasa
  let vaneures = 0;
  for (let z = 0; z < aminek_esnie_kell.length; z++) {
    vaneures = 0;
    // if ciklus h utolso sor
    if (aminek_esnie_kell[z].posy !== palya.length - 1) {
      // mapellenorzes h van-e alatta hely
      for (let t = 0; t < palya.length; t++) {
        for (let o = 0; o < palya[t].length; o++) {
          // körbejártuk a tombot^
          if (aminek_esnie_kell[z].posy === t && aminek_esnie_kell[z].posx === o) {
            // van e a tomb adott pontjan doboz^
            for (let w = t; w < palya.length; w++) {
              if (palya[w][o] !== '📦') {
                vaneures = vaneures + 1;
              }
            }
          }
        }
      }
      if (vaneures > 0) {
        aminek_esnie_kell[z].posy++;
      }
    }
  }
  return aminek_esnie_kell;
};

const fallingScore = (score, dobozok, palya) => {
  // dolgok mozgatasa
  let egyezes = 0
  for (let z = 0; z < score.length; z++) {
    egyezes = 0
    // if ciklus h utolso sor
    if (score[z].posy !== palya.length - 1) {
      // mapellenorzes h van-e alatta hely
      for (let t = 0; t < dobozok.length; t++) {
          // körbejártuk a doboz_tombot^
          if (score[z].posy+1 === dobozok[t].posy && score[z].posx === dobozok[t].posx) {
            // van-e alatta doboz^
            egyezes = egyezes + 1;
        }
      }
        if (egyezes < 1) {
          score[z].posy = score[z].posy+ 1
      }
    }
  }
  return score;
};

module.exports = {
  fallingBox,
  fallingScore
}
  ;
