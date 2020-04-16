function draw() {
    ctx.fillStyle = visitedColor;
    cells.forEach(cell => cell.show());
    currentCellHighlighter(currentCell);

    currentCell.visited = true;
    // algo() we will call our maze generation algorithm here
}

function removeWalls(current, next) {
    if (current.y < next.y) {
        current.walls[2] = false; // remove bottom wall
        next.walls[0] = false; // remove top wall
    }
    if (current.x < next.x) {
        current.walls[1] = false; // remove right wall
        next.walls[3] = false; // remove left wall
    }
    if (current.y > next.y) {
        current.walls[0] = false; // remove top wall
        next.walls[2] = false; // remove bottom wall
    }
    if (current.x > next.x) {
        current.walls[3] = false; // remove left wall
        next.walls[1] = false; // remove right wall
    }
}

function currentCellHighlighter(current) {
    ctx.beginPath();
    ctx.fillStyle = currentColor;
    ctx.fillRect(current.x * cellSize, current.y * cellSize, cellSize, cellSize);
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
