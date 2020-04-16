var cellSize; // Cell is a square and this variable specify size of the square
var cells = []; // The variable stores all cells
var borderColor; // Specify color of border of maze
var visitedColor; // It is both color of visited cells and background of our maze
var currentColor;
var cellCountRow;
var cellCountColumn;
var currentCell;
var intervalTime; // This is the interval of update function which we call every interval time
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;

function setup() {
    document.body.innerHTML = `<canvas id="myCanvas" width="${canvasWidth}" height="${canvasHeight}"></canvas>`;
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    cellCountRow = canvasWidth / cellSize;
    cellCountColumn = canvasHeight / cellSize;

    // Initiate colors
    ctx.strokeStyle = borderColor;

    for (var column = 0; column < cellCountColumn; column++) {
        for (var row = 0; row < cellCountRow; row++) {
            var cell = new Cell(row, column);
            cells.push(cell);
        }
    }

    cells.forEach(cell => cell.setNeighbors());

    // Initiate current cell
    currentCell = cells[0];
    setInterval(draw, intervalTime);
}

function initAllVariableAndSetup() {
    borderColor = '' + document.getElementById('border-color').value;
    visitedColor = '' + document.getElementById('visited-color').value;
    currentColor = '' + document.getElementById('current-color').value;
    cellSize = 50;
    canvasWidth = document.getElementById('map-width').value;
    canvasHeight = document.getElementById('map-height').value;
    intervalTime = document.getElementById('interval-time').value;
    setup();
}
