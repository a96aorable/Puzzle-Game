
const puzzle = document.getElementById('puzzle');
let tiles = [];

function init() {
    tiles = [];
    for (let i = 1; i < 16; i++) {
        tiles.push(i);
    }
    tiles.push(null);
    render();
}

function render() {
    puzzle.innerHTML = '';
    tiles.forEach((value, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        if (value === null) {
            tile.classList.add('empty');
        } else {
            tile.textContent = value;
            tile.onclick = () => move(index);
        }
        puzzle.appendChild(tile);
    });
}

function move(index) {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    if (validMoves.includes(index) && isAdjacent(index, emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        render();
    }
}

function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 4);
    const row2 = Math.floor(index2 / 4);
    const col1 = index1 % 4;
    const col2 = index2 % 4;
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

function shuffle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    render();
}

init();
