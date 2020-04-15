var cellSize = 50;
var cells = [];
var borderColor;
var visitedColor;
var currentColor;
var cellCountRow;
var cellCountColumn;
var stack = [];
var currentCell;
var selectedAlgorithm;
var intervalTime;
var canvas;
var ctx;
var canvasWidht;
var canvasHeight;

function setup() {
    document.body.innerHTML = `<canvas id="myCanvas" width="${canvasWidht}" height="${canvasHeight}"></canvas>`;
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    cellCountRow = canvas.width / cellSize;
    cellCountColumn = canvas.height / cellSize;

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
    setInterval(draw, 200);
}

function initAllVariableAndSetup() {
    selectedAlgorithm = document.getElementById('algorithm').value ? document.getElementById('algorithm').value : 0;
    borderColor = '' + document.getElementById('border-color').value;
    visitedColor = '' + document.getElementById('visited-color').value;
    currentColor = '' + document.getElementById('current-color').value;
    cellSize = document.getElementById('cell-size').value ? document.getElementById('cell-size').value : 50;
    canvasWidht = document.getElementById('map-width').value ? document.getElementById('map-width').value : 500;
    canvasHeight = document.getElementById('map-height').value ? document.getElementById('map-height').value : 500;
    intervalTime = document.getElementById('interval-time').value ? document.getElementById('interval-time').value : 200;
    setup();
}
