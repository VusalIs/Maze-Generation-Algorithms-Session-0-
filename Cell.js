function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;

    // Initiate all edge points
    this.leftTopPoint = new Point(this.x * cellSize, this.y * cellSize);
    this.rightTopPoint = new Point(this.x * cellSize + cellSize, this.y * cellSize);
    this.rightBottomPoint = new Point(this.x * cellSize + cellSize, this.y * cellSize + cellSize);
    this.leftBottomPoint = new Point(this.x * cellSize, this.y * cellSize + cellSize);

    this.neighbors = [];
    this.setNeighbors = function () {
        // push top neighbors
        if (this.y != 0) this.neighbors.push(cells[(this.y - 1) * cellCountRow + this.x]);
        else this.neighbors.push(undefined);

        // push right neighbors
        if (this.x != cellCountRow - 1) this.neighbors.push(cells[this.y * cellCountRow + this.x + 1]);
        else this.neighbors.push(undefined);

        // push bottom neighbors
        if (this.y != cellCountColumn - 1) this.neighbors.push(cells[(this.y + 1) * cellCountRow + this.x]);
        else this.neighbors.push(undefined);

        // push left neighbors
        if (this.x != 0) this.neighbors.push(cells[this.y * cellCountRow + this.x - 1]);
        else this.neighbors.push(undefined);
    };

    this.getNextCell = function () {
        var unvisitedNeighbors = this.neighbors.filter(neighbor => neighbor && !neighbor.visited);
        return unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
    };

    // If wall value is true, it will be shown
    this.walls = [true, true, true, true];

    this.show = function () {
        if (this.walls[0]) {
            drawLine(this.leftTopPoint, this.rightTopPoint);
        }
        if (this.walls[1]) {
            drawLine(this.rightTopPoint, this.rightBottomPoint);
        }
        if (this.walls[2]) {
            drawLine(this.rightBottomPoint, this.leftBottomPoint);
        }
        if (this.walls[3]) {
            drawLine(this.leftBottomPoint, this.leftTopPoint);
        }
        if (this.visited) {
            ctx.fillRect(this.leftTopPoint.x, this.leftTopPoint.y, cellSize, cellSize);
        }
    };
}
