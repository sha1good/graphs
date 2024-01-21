// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

// The distance between two adjacent cells is 1.

class Solution {
  DistanceOfNearestCellHaving1(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    // visited and distance matrix
    let visited = Array.from(Array(rows), () => Array(cols).fill(0));
    let distance = Array.from(Array(rows), () => Array(cols).fill(0));

    let queue = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // start BFS if cell contains 1
        if (grid[i][j] === 1) {
          queue.push([[i, j], 0]);
          visited[i][j] = 1;
        } else {
          // mark unvisited
          visited[i][j] = 0;
        }
      }
    }

    let dRow = [-1, 0, 1, 0];
    let dCol = [0, 1, 0, -1];
    //iterate until the queue lenght is empty
    while (queue.length !== 0) {
      //Pop or remove the first row and  first col from the queue
      let [[row, col], steps] = queue.shift();

      distance[row][col] = steps;
      // for all 4 neighbours
      for (let i = 0; i < 4; i++) {
        let nRow = row + dRow[i];
        let nCol = col + dCol[i];

        // check for valid unvisited cell
        if (
          nRow >= 0 &&
          nRow < rows &&
          nCol >= 0 &&
          nCol < cols &&
          visited[nRow][nCol] === 0
        ) {
          queue.push([[nRow, nCol], steps + 1]);
          visited[nRow][nCol] = 1;
        }
      }
    }

    // return distance matrix
    return distance;
  }
}

function main() {
  let grid = [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
  ];

  const obj = new Solution();

  let result = obj.DistanceOfNearestCellHaving1(grid);

  for (let i of result) {
    for (j of i) process.stdout.write(j + " ");
    console.log();
  }
}

main();


// Time Complexity: O(NxM + NxMx4) ~ O(N x M)

// For the worst case, the BFS function will be called for (N x M) nodes, and for every node, we are traversing for 4 neighbors, so it will take O(N x M x 4) time.

// Space Complexity: O(N x M) + O(N x M) + O(N x M) ~ O(N x M)

// O(N x M) for the visited array, distance matrix, and queue space takes up N x M locations at max. 