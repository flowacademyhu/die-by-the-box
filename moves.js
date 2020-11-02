const ezDoboz = (cella) => {
  if (cella === 'B') {
    return true
  }
  else {return false}
}
const ezUres = (cella) => {
  return cella === ' ';
}
const ezLetezik = (kerdeses) => {
  return kerdeses !== undefined;
}
const egyenesenAll = (all) => {
  return all === 'top';
}
const fejeBalraAll = (all) => {
  return all === 'left';
}
const fejeJobbraAll = (all) => {
  return all === 'right';
}

const move_a = (player, tomb_ami_a_map) => {
  let vizszintes = player.posx
  let toleBalra = tomb_ami_a_map[player.posy][vizszintes-1];
  let toleBalraFel = tomb_ami_a_map[player.posy - 1][vizszintes - 1]
  let felette = tomb_ami_a_map[player.posy - 1][player.posx];
  let allasa = player.head;
  let nezese = player.facing;
  let mapmagassaga = tomb_ami_a_map.length;
  //nem a szélén van
  if (player.posx !== 0) {
    //dobozbqa akar szaladni
    if (ezDoboz(toleBalra) && egyenesenAll(allasa)) {
      //ráfordul_jobb_also
      player.head = 'right';
      player.facing = 'left';
    }
    else if (ezDoboz(toleBalra) && fejeJobbraAll(allasa)) {
      //rávanfordulva, lehet mászni
      //kell-e maszni, v sarkon van
      //masznikell, felfele
      if (ezDoboz(toleBalraFel) && ezDoboz(toleBalra) && fejeJobbraAll(allasa) && ezUres(felette)) {
        player.posy--
        player.head = 'right';
        player.facing = 'left';
      }
      //sarkon van felfele_jobbfelso
      else if (ezUres(toleBalraFel) && fejeJobbraAll(allasa)) {
        player.facing = 'left'
        player.head = 'top';
        player.posy--;
        player.posx--;
      }
    }
    //sarkon van, lefele, balfelso
    else if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && ezUres(tomb_ami_a_map[player.posy + 1][player.posx - 1]) && egyenesenAll(allasa) && ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx])) {
      player.facing = 'left'
      player.head = 'left';
      player.posy++;
      player.posx--;
    }
    //ballentfordul
    else if (fejeBalraAll(allasa) && (tomb_ami_a_map[player.posy + 1] === undefined || ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx]))) {
      player.head = 'top';
      player.facing = 'left';
    }
    // maszni kell lefele
    else if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && ezUres(tomb_ami_a_map[player.posy + 1][player.posx]) && fejeBalraAll(allasa) && ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx + 1])) {
      player.posy++
      player.head = 'left'
      player.facing = 'left'
    }
    //sarokrol fordaul barla, balalso
    else if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && (ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx]) || player.posy === mapmagassaga - 1) && fejeBalraAll(allasa)) {
      player.head = 'top';
      player.facing = 'left';
    }
    else {
      player.posx--;
      player.head = 'top';
      player.facing = 'left';
    }
    // nincs spam
  }
  else if (fejeBalraAll(allasa) && vizszintes === 0) {
    if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && ezUres(tomb_ami_a_map[player.posy + 1][player.posx])) {
      player.posy++
      player.facing = 'left';
      player.head = 'left'
    }
    else { player.head = 'top' }
  }
}

const move_d = (player, tomb_ami_a_map) => {
  let toleJobbra = tomb_ami_a_map[player.posy][player.posx + 1];
  let toleJobbraFel = tomb_ami_a_map[player.posy-1][player.posx + 1];
  let felette = tomb_ami_a_map[player.posy - 1][player.posx];
  let allasa = player.head;
  let nezese = player.facing;
  let mapmagassaga = tomb_ami_a_map.length;
  let mapVege = tomb_ami_a_map[1].length - 1;
  // nem a szélén van
  if (player.posx !== mapVege) {
    // dobozbqa akar szaladni balról
    if (ezDoboz(toleJobbra) && egyenesenAll(allasa)) {
      // ráfordul_bal_also
      player.head = 'left';
      player.facing = 'right';
    } else if (ezDoboz(toleJobbra) && fejeBalraAll(allasa)) {
      // rávanfordulva, lehet mászni
      // kell-e maszni, v sarkon van
      // masznikell, felfele
      if (ezDoboz(toleJobbraFel) && ezDoboz(toleJobbra) && fejeBalraAll(allasa) && ezUres(felette)) {
        player.posy--;
        player.head = 'left';
        player.facing = 'right'
      }
      // sarkon van felfele_balfelso
      else if (ezUres(toleJobbraFel) && fejeBalraAll(allasa)) {
        player.facing = 'right';
        player.head = 'top';
        player.posy--;
        player.posx++;
      }
    }
    // sarkon van, lefele, jobbfelso
    else if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && ezUres(tomb_ami_a_map[player.posy + 1][player.posx + 1]) && egyenesenAll(allasa) && ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx])) {
      player.facing = 'right';
      player.head = 'right';
      player.posy++;
      player.posx++;
    }
      //jobblentfordul
    else if (fejeJobbraAll(allasa) && (tomb_ami_a_map[player.posy + 1] === undefined || ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx]))) {
          player.head = 'top';
          player.facing = 'right';
    }
    // maszni kell lefele
    else if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && ezUres(tomb_ami_a_map[player.posy + 1][player.posx]) && fejeJobbraAll(allasa) && ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx - 1])) {
      player.posy++
      player.facing = 'right';
      player.head = 'right';
    }
    //sarokrol fordul jobbra, jobbalso
    else if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && (ezDoboz(tomb_ami_a_map[player.posy + 1][player.posx]) || player.posy === mapmagassaga - 1) && fejeJobbraAll(allasa)) {
      player.head = 'top';
    }
    else {
      player.posx++
      player.facing = 'right'
      player.head = 'top'
    }
    // nincs spam
  }
  else if (fejeJobbraAll(allasa) && player.posx === mapVege) {
    if (ezLetezik(tomb_ami_a_map[player.posy + 1]) && ezUres(tomb_ami_a_map[player.posy + 1][player.posx])) {
      player.posy++
      player.facing = 'right';
      player.head = 'right';
    }
      else {
        // ne spammeljunk
        player.head = 'top'
      }
  }
}

module.exports = {
  move_a,
  move_d,
  ezDoboz,
  ezUres,
  ezLetezik,
  fejeBalraAll,
  fejeJobbraAll,
  egyenesenAll,
}