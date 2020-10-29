const table = require('table');
const axel = require('axel');

const palyaKeret = (szelesseg, hosszusag) => {
  const kulso = new Array(hosszusag);
  for (let i = 0; i < kulso.length; i++) {
    kulso[i] = new Array(szelesseg);
  }
  return kulso;
};

const palyaKitoltes = (belso) => {
  for (let i = 0; i < belso.length; i++) {
    for (let k = 0; k < belso[i].length; k++) {
      belso[i][k] = ' ';
    }
  }
};
