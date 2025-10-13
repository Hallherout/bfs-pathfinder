//Inisialisasi matrix
const row = 20,
    column = 20,
    table = document.querySelector("table"),
    matrix = [];

for (let i = 0; i < row; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < column; j++) {
        tr.appendChild(document.createElement("td"));
    }
    table.appendChild(tr);
    matrix.push(tr.getElementsByTagName("td"));
}

//Point object constructor
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.set = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.get = function() {
        return new (this.x, this.y);
    }
}

const start = new Point(5, 4),
    end = new Point(15, 10);

matrix[start.x][start.y].classList.add("start");
matrix[end.x][end.y].classList.add("end");

const queue = [document.querySelector(".start")],
    visited = new Array(row).fill(new Array(column).fill(false)),
    parent = new Array(row).fill(new Array(column));