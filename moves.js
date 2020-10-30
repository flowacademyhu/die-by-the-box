const move_a = (player, tomb_ami_a_map) => {
      //nem a szélén van
  if (player.posx !== 0) {
    //dobozbqa akar szaladni
    if (tomb_ami_a_map[player.posy][player.posx - 1] === 'B' && player.head === 'top') {
      //ráfordul_jobb_also
      player.head = 'right';
      player.facing = 'left';
    }
    else if (tomb_ami_a_map[player.posy][player.posx - 1] === 'B' && player.head === 'right') {
      //rávanfordulva, lehet mászni
      //kell-e maszni, v sarkon van
      //masznikell, felfele
      if (tomb_ami_a_map[player.posy - 1][player.posx - 1] === 'B' && tomb_ami_a_map[player.posy][player.posx - 1] === 'B' && player.head === 'right' && tomb_ami_a_map[player.posy - 1][player.posx] === ' ') {
        player.posy--
      }
      //sarkon van felfele_jobbfelso
      else if (tomb_ami_a_map[player.posy - 1][player.posx - 1] === ' ' && player.head === 'right' && player.facing === 'left') {
        player.head = 'top';
        player.posy--;
        player.posx--;
      }
    }

    //sarkon van, lefele, balfelso
    else if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx - 1] === ' ' && player.head === 'top' && tomb_ami_a_map[player.posy + 1][player.posx] === 'B') {
      player.head = 'left';
      player.posy++;
      player.posx--;
    }

    //ballentfordul
    else if (player.head === 'left' && (tomb_ami_a_map[player.posy + 1] === undefined || tomb_ami_a_map[player.posy + 1][player.posx] === 'B')) {
      player.head = 'top';
      player.facing = 'left';
    }

    // maszni kell lefele
    else if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === ' ' && player.head === 'left' && (tomb_ami_a_map[player.posy + 1][player.posx + 1] === 'B' || tomb_ami_a_map[player.posy + 1][player.posx - 1] === undefined)) {
      player.posy++
    }
    //sarokrol fordaul barla, balalso
    else if (tomb_ami_a_map[player.posy + 1] !== undefined && (tomb_ami_a_map[player.posy + 1][player.posx] === 'B' || (tomb_ami_a_map[player.posy + 1][player.posx] === ' ' && player.posy + 1 === magassag - 1)) && player.head === 'left') {
      player.head === 'top';
    }
    else { player.posx-- }
    // nincs spam
  }
  else if (player.head === 'left' && player.posx === 0) {
    if (tomb_ami_a_map[player.posy + 1] !== undefined && tomb_ami_a_map[player.posy + 1][player.posx] === ' ') {
      player.posy++
    }
    else { player.head = 'top' }
  }
}


module.exports = {
  move_a,
}