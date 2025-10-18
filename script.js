//Inisialisasi class
class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

//Fungsi untuk mencari sel pada grid
function getCell(row, col) {
    return document.querySelector('td[data-row="' + row + '"][data-col="' + col + '"]');
}

//Fungsi untuk return posisi sel
function getPosition(element) {
    if (!element) return;
    return new Position(parseInt(element.dataset.row), parseInt(element.dataset.col));
}

//Variabel grid
let row = 20,
    col = 20;
const table = document.querySelector('table');

//Fungsi untuk hapus grid
function delGrid() {
    while(table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

//Fungsi untuk generate grid
function genGrid(row, col) {
    for (let i = 0; i < row; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < col; j++) {
            const td = document.createElement('td');
            td.dataset.row = i;
            td.dataset.col = j;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
} genGrid(row, col);

//Event untuk reset grid
document.getElementById('reset').addEventListener('click', () => {
    delGrid();
    genGrid(row, col);
});

//Mode selector
let mode = 'start',
    isMouseDown = false;
const selButtons = document.querySelector('.selector');

selButtons.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON') {
        mode = e.target.id;
    }
});

//Event modifikasi sel
table.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    if (e.target.tagName == 'TD') {
        if (mode == 'start' && !(e.target.classList.contains('wall') || e.target.classList.contains('end'))) {
            document.querySelectorAll('.start').forEach(element => {
                element.classList.remove('start');
            });
            e.target.classList.add('start');
        } else if (mode == 'end' && !(e.target.classList.contains('wall') || e.target.classList.contains('start'))) {
            document.querySelectorAll('.end').forEach(element => {
                element.classList.remove('end');
            });
            e.target.classList.add('end');
        } else if (mode == 'wall' && !(e.target.classList.contains('start') || e.target.classList.contains('end'))) {
            e.target.classList.add('wall');
        } else if (mode == 'erase') {
            e.target.classList.remove('wall');
            e.target.classList.remove('start');
            e.target.classList.remove('end');
        }
    }
});

table.addEventListener('mousemove', (e) => {
    if (isMouseDown && (mode == 'wall' || mode == 'erase') && e.target.tagName == 'TD') {
        if (mode == 'wall') {
            if (!e.target.classList.contains('start') && !e.target.classList.contains('end')) e.target.classList.add('wall');
        } else {
            e.target.classList.remove('wall');
            e.target.classList.remove('start');
            e.target.classList.remove('end');
        }
    }
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

//Mulai visualisasi
document.getElementById('vis').addEventListener('click', (e) => {
    //Definisi posisi start dan end
    const start = getPosition(document.querySelector('.start')),
        end = getPosition(document.querySelector('.end'));

    if (!start || !end) return;

    mode = null;
    e.target.disabled = true;
    for (const x of selButtons.children) {
        x.disabled = true;
    }

    //Definisi variabel BFS
    const queue = [start],
        visited = Array.from({ length: row }, () => new Array(col).fill(false)),
        parent = Array.from({ length: row }, () => new Array(col)),
        direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    let current;
    parent[start.row][start.col] = start;
    visited[start.row][start.col] = true;

    //Algoritma BFS
    const bfs = setInterval(() => {
        if (current = queue.shift()) {
            if (current.row === end.row && current.col === end.col) {
                const path = [];
                let node = parent[current.row][current.col];

                while(node.row !== start.row || node.col !== start.col) {
                    path.unshift(node);
                    node = parent[node.row][node.col];
                }

                let cell;
                const backtrack = setInterval(() => {
                    if (cell = path.shift()) {
                        getCell(cell.row, cell.col).classList.add('path');
                    } else {
                        clearInterval(backtrack);
                    }
                }, 20);

                clearInterval(bfs);
                return;
            }
            getCell(current.row, current.col).classList.add('active');

            direction.forEach((x) => {
                const child = new Position(current.row + x[0], current.col + x[1]);

                if (child.row >= 0 && child.row < row && child.col >= 0 && child.col < col && !visited[child.row][child.col] && !getCell(child.row, child.col).classList.contains('wall')) {
                    queue.push(child);
                    parent[child.row][child.col] = current;
                    visited[child.row][child.col] = true;
                }
            })
        } else clearInterval(bfs);
    }, 20);
});