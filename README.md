# Maze Generation Algorithms (Session 0)

# Description

This repository is the first part of Maze Generation Algorithms and will explain base folder structure and code. I have following algorithms implemented:

-   [Depth First Search with Backtracking](https://github.com/VusalIs/Maze-Generation-Algorithms-Session-1-)
- [Randomized Kruskal's Algorithm](https://github.com/VusalIs/Maze-Generation-Algorithms-Session-2-)

# What is Maze Generation Algorithms?

Probably, all of us have heard about Mazes, but If we want to create different mazes every time how we can implement them. This session will help you to create baseline for your maze generation application. Actually, we can assume a maze as a graph or tree, that is why algorithms which we will use have different purposes but we will use them to create our random maze. I have created an environment which consists of 4 files, and will describe each of them in this session. Let's get started.

-   [index.html](#index.html)
-   [Setup.js](#Setup\.js)
-   [Draw.js](#Draw.js)
-   [Cell.js](#Cell.js)
-   [Thanks for your attention](#Thanks-for-your-attention)

# index.html

index.html file is our main file to show everything to the user, that is why it only contains visualization of input data. In this file, I specified default values and which values user can customize. When you click the `Generate your maze` button, it calls `initAllVariableAndSetup()` function which is located in `Setup.js` file.

# Setup.js

In `Setup.js` we have 2 main functions - initAllVariableAndSetup() and setup(). initAllVariableAndSetup() function helps us initiate all global variables which we have taken from user.

```javascript
borderColor = '' + document.getElementById('border-color').value;
visitedColor = '' + document.getElementById('visited-color').value;
currentColor = '' + document.getElementById('current-color').value;
cellSize = 50;
canvasWidth = document.getElementById('map-width').value;
canvasHeight = document.getElementById('map-height').value;
intervalTime = document.getElementById('interval-time').value;
setup();
```

As you see, at the end of function we call setup() function, because after initiate everything it is time to create first version of maze.

```javascript
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
```

In the first 5 lines, we just initiate our canvas(width, height, count of cells per row and colum). We divide everything to cells because it will be easy to work with. Every square when you will see in the first stage is one cell. After canvas initiation, we have to create our cells. Cells will store x and y values and implementation can be found in `Cell.js`. After pushing everything to `cells` variable, we call every cell and set its neighbors. We use one dimensional array, that is why we don't know any top, right, bottom, and left neighbors of this cell and we have to set them. Other 2 lines, initiate our starting point with the first cell and call `draw`(can be found in `Draw.js`) function with given interval.

# Cell.js

We create instances for every cell with this function. This file stores all information about one cell. After initiating x and y, we also initiate corner points of the cell. I think, It helps us a lot in the following lines.

```javascript
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
```

In the above function, we check if the cell is in the corner, undefined is pushed to `neighbors` array. The sequence of neighbors in this variable is from top neighbor to left neighbor. We also have `getUnvisitedNeighbors()` function which returns, all available neighbor cells(unvisited and is not undefined).

```javascript
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
```

`walls` array stores which walls should be visible by user. It is border of the cell and current cell has passed from this wall that means, It has to be invisible by user. The sequence of walls is the same with `neighbors` array (from top to left). `show` function is called in `draw()` function and defines which walls should be drawn. Also if this cell has been already visited, we should draw it as a visited cell.

# Draw.js

This file contains our main `draw()` function which is called every interval time, and other helper functions.

```javascript
function draw() {
    ctx.fillStyle = visitedColor;
    cells.forEach(cell => cell.show());
    currentCellHighlighter(currentCell);

    currentCell.visited = true;
    // algo() we will call our maze generation algorithm here
}
```

In the function, first 4 lines of code regenerate the all cell with updated values and set value of current cell visited. After this initiation, we call our main algorithm (which we will talk about later sessions) to find next cell for current cell.

```javascript
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
```

3 functions which mentioned above are our helper functions. In canvas you have write several lines of code to create a line or rectangle, that is I create those kind of functions.

```javascript
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
```

`removeWalls()` function will be helpful for the implementation of different algorithms. We take current and next cell, and know that which direction our current cell will move. Based on x and y of current and next cells, we remove corresponding wall. Remember that in canvas when you move from top to bottom your y value increases, that is why function would look a little weird for you :)

# Thanks for your attention

Thanks for your attention. I plan to make it series. In the next session I will implement our first algorithm for Maze Generation. See you 👋
