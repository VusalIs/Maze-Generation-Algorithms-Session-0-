function algo() {
    var unvisitedNeighbors = currentCell.getUnvisitedNeighbors();
    var next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
    if (next) {
        stack.push(currentCell);
        next.visited = true;
        removeWalls(currentCell, next);
        currentCell = next;
    } else if (stack.length > 0) {
        currentCell = stack.pop();
    }
}
