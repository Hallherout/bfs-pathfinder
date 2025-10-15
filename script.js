//Inisialisasi class
class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

//Fungsi untuk mencari element pada matrix
function getMatrix(row, col) {
    return document.querySelector('td[data-row="' + row + '"][data-col="' + col + '"]');
}

//Inisialisasi matrix
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

//Definisi posisi start dan end
const start = new Position(5, 4),
    end = new Position(15, 10);

getMatrix(start.row, start.col).classList.add('start');
getMatrix(end.row, end.col).classList.add('end');

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
        if (current.row == end.row && current.col == end.col) {
            const path = [];
            let node = parent[current.row][current.col];

            while(node.row != start.row || node.col != start.col) {
                path.unshift(node);
                node = parent[node.row][node.col];
            }

            let i = 0;
            const backtrack = setInterval(() => {
                if (!path[i]) {
                    clearInterval(backtrack);
                } else {
                    getMatrix(path[i].row, path[i].col).classList.add('path');
                    i++;
                }
            }, 20);

            clearInterval(bfs);
            return;
        }
        getMatrix(current.row, current.col).classList.add('active');

        direction.forEach((x) => {
            const child = new Position(current.row + x[0], current.col + x[1]);

            if (child.row >= 0 && child.row < row && child.col >= 0 && child.col < column && !visited[child.row][child.col] && !getMatrix(child.row, child.col).classList.contains('wall')) {
                queue.push(child);
                parent[child.row][child.col] = current;
                visited[child.row][child.col] = true;
            }
        })
    }
}, 20);