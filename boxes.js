const spawnBoxes = (mapArr, boxNum) => {
    for (let j = 0; j < mapArr[0].length; j++) {
        mapArr[0][j] = ' ';
    }
    for (let i = 0; i < boxNum; i++) {
        const j = Math.floor(Math.random() * mapArr[0].length);
        mapArr[0][j] = 'X';
    }
};

const falling = (mapArr) => {
    const height = mapArr.length;
    for (let j = 0; j < mapArr[0].length; j++) {
        mapArr[height - 1][j] = ' ';
    }
    for (let i = height - 1; i > 0; i--) {
        for (let j = 0; j < mapArr[i].length; j++) {
            for (let g = j; g < mapArr.length)

            if (mapArr[i - 1][j] === 'X') {
                mapArr[i][j] = 'X';
                mapArr[i - 1][j] = ' ';
            }
        }
    }
};

module.exports = {
    spawnBoxes,
    falling
};