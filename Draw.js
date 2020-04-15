function draw() {
    ctx.fillStyle = visitedColor;
    cells.forEach(cell => cell.show());
    currentCellHighlighter(currentCell);

    currentCell.visited = true;
    algo();
}

function currentCellHighlighter(current) {
    ctx.beginPath();
    ctx.fillStyle = currentColor;
    ctx.fillRect(current.x * cellSize, current.y * cellSize, cellSize, cellSize);
}

function removeWalls(current, next) {
    if (current.y < next.y) {
        current.walls[2] = false;
        next.walls[0] = false;
    }
    if (current.x < next.x) {
        current.walls[1] = false;
        next.walls[3] = false;
    }
    if (current.y > next.y) {
        current.walls[0] = false;
        next.walls[2] = false;
    }
    if (current.x > next.x) {
        current.walls[3] = false;
        next.walls[1] = false;
    }
    console.log('--------------');
    console.log(current.y);
    console.log(next.y);
    console.log(current.x);
    console.log(next.x);
}

function drawLine(pointStart, pointEnd) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(pointStart.x, pointStart.y);
    ctx.lineTo(pointEnd.x, pointEnd.y);
    ctx.stroke();
}

function Point(x, y) {
    var obj = {};
    obj.x = x;
    obj.y = y;
    return obj;
}
