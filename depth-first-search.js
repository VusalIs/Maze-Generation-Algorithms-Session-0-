function algo() {
    var next = currentCell.getNextCell();
    if (next) {
        stack.push(currentCell);
        next.visited = true;
        removeWalls(currentCell, next);
        currentCell = next;
    } else if (stack.length > 0) {
        currentCell = stack.pop();
    }
}
