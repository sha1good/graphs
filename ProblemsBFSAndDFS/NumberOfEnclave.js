// 1020. Number of Enclaves
// Medium
// Topics
// Companies
// Hint
// You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

// A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

// Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

// Example 1:

// Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
// Output: 3
// Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.
// Example 2:

// Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
// Output: 0
// Explanation: All 1s are either on the boundary or can reach the boundary.a

// The algorithm steps are as follows:

// For BFS traversal, we need a queue data structure and a visited array. Create a corresponding visited array.
// Push the coordinates of boundary nodes in the queue and mark them as visited.
// Start the BFS traversal, pop out an element from the queue every time and travel to all its unvisited neighboring land cells in the 4 directions. For every unvisited node, push it {row, col} into the Q and mark it as visited to avoid multiple traversals in the future.
// Repeat the steps until the queue becomes empty. When all the boundaries are traversed and corresponding sets of 1s are marked as visited, use a counter variable to count the number of remaining unvisited land cells.
// Return the value of the counter as it indicates the number of land cells that cannot cross the boundary.
// Consider the following illustration to understand how BFS traverses the matrix and finds the number of land cells in the grid for which we cannot walk off the boundary of the grid in any number of moves.

function numberOfEnclave(n, m, grid) {
  // create a visited Array
  let visited = Array.from(Array(n), () => Array(m).fill(0));

  let queue = [];

  // traverse boundary elements
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // first row, first col, last row, last col
      if (i === 0 || i === n - 1 || j === 0 || j === m - 1) {
        // if it is a land then store it in queue and mar
        if (grid[i][j] === 1) {
          queue.push([i, j]);
          visited[i][j] = 1;
        }
      }
    }
  }

  let delRow = [-1, 0, 1, 0];
  let delCol = [0, 1, 0, -1];
  //Iterate through the queue till it is empty
  while (queue.length !== 0) {
    //Remove the first element in the queue
    let [row, col] = queue.shift();
    // Loop through the four direction
    for (let i = 0; i < 4; i++) {
      let nRow = row + delRow[i];
      let ncol = col + delCol[i];

      if (
        nRow >= 0 &&
        nRow < n &&
        ncol >= 0 &&
        ncol < m &&
        grid[nRow][ncol] === 1 &&
        visited[nRow][ncol] === 0
      ) {
        visited[nRow][ncol] = 1;
        queue.push([nRow, ncol]);
      }
    }
  }

  // Now if  the  while loop get exhausted and the remaining 1's are not visited, i will return them
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        count++;
      }
    }
  }

  return count;
}

function main() {
  let grid = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ];

  let n = grid.length;
  let m = grid[0].length;

  let result = numberOfEnclave(n, m, grid);

  console.log("The total number of enclosed clave ", result);
}

main();
