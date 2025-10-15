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

//Mode selector
document.querySelector('.selector').addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON') {
        mode = e.target.id;
    }
});

//Inisialisasi grid
const row = 20,
    column = 20,
    table = document.querySelector('table');

for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < column; j++) {
        const td = document.createElement('td');
        td.dataset.row = i;
        td.dataset.col = j;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

//Event modifikasi sel
let mode = 'start',
    isMouseDown = false,
    isAddingWall = false;

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
            isAddingWall = !e.target.classList.contains('wall');
            e.target.classList.toggle('wall');
        }
    }
});

table.addEventListener('mousemove', (e) => {
    if (isMouseDown && mode == 'wall' && e.target.tagName == 'TD') {
        if (!e.target.classList.contains('start') && !e.target.classList.contains('end')) {
            if (isAddingWall) {
                e.target.classList.add('wall');
            } else {
                e.target.classList.remove('wall');
            }
        }
    }
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

//Mulai visualisasi
document.getElementById('vis').addEventListener('click', () => {
    //Definisi posisi start dan end
    const start = getPosition(document.querySelector('.start')),
        end = getPosition(document.querySelector('.end'));

    if (!start || !end) return;

    //Definisi variabel BFS
    const queue = [start],
        visited = Array.from({ length: row }, () => new Array(column).fill(false)),
        parent = Array.from({ length: row }, () => new Array(column)),
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

                let i = 0;
                const backtrack = setInterval(() => {
                    if (!path[i]) {
                        clearInterval(backtrack);
                    } else {
                        getCell(path[i].row, path[i].col).classList.add('path');
                        i++;
                    }
                }, 20);

                clearInterval(bfs);
                return;
            }
            getCell(current.row, current.col).classList.add('active');

            direction.forEach((x) => {
                const child = new Position(current.row + x[0], current.col + x[1]);

                if (child.row >= 0 && child.row < row && child.col >= 0 && child.col < column && !visited[child.row][child.col] && !getCell(child.row, child.col).classList.contains('wall')) {
                    queue.push(child);
                    parent[child.row][child.col] = current;
                    visited[child.row][child.col] = true;
                }
            })
        } else clearInterval(bfs);
    }, 20);
});