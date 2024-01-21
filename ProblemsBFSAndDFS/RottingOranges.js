// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, if a Fresh Orange is adjacent to a Rotten Orange in 4-direction ( upward, downwards, right, and left ) it becomes Rotten.

// Return the minimum number of minutes required such that none of the cells has a Fresh Orange. If it’s not possible, return -1.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Example 2:

// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
// Example 3:

// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

function orangeRotting(grid) {
  if (grid.length === 0) return 0;

  let rows = grid.length,
    cols = grid[0].length;

  let queue = [];

  let visited = Array.from({ length: rows }, () => Array(cols).fill(0));
  let cntFresh = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        queue.push([[i, j], 0]);
        visited[i][j] = 2;
      }

      if (grid[i][j] === 1) cntFresh++;
    }
  }

  let dRow = [-1, 0, 1, 0];
  let dCol = [0, 1, 0, -1];
  let count = 0;
  let minimumTime = 0;
  //Iterate through the  queue  until the queue is empty
  while (queue.length !== 0) {
    //Pop or remove the first row and  first col from the queue
    let [[row, col], currentTime] = queue.shift();

    //Now  each orange or node has for 4 neigbour. Meaning it can go upward, downward, leftward and rightward
    for (let i = 0; i < 4; i++) {
      let nRow = row + dRow[i];
      let nCol = col + dCol[i];
      //Check if the neighbor Row and col is within the context of the grid and not out overflow
      // and it  has not been marked as visited ... i.e not marked as 2 in the visited array and
      // both the neighbor row and col is not empty, i.e it is not equal to 0 or it has a fresh orange

      if (
        nRow >= 0 &&
        nRow < rows &&
        nCol >= 0 &&
        nCol < cols &&
        visited[nRow][nCol] !== 2 &&
        grid[nRow][nCol] === 1
      ) {
        // Push them to the  queue, increase the  time taken and marked them as visited if the above condition is satisfied
        queue.push([[nRow, nCol], currentTime + 1]);
        visited[nRow][nCol] = 2;
        count++; // Increment count after marking the visited array as 2.  This represent the count of changing the fresh orange to rotten
        minimumTime = currentTime + 1; // Update minimumTime only when a new level begins
      }
    }
  }

  return count === cntFresh ? minimumTime : -1;
}

function main() {
  const v = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ];

  const rotten = orangeRotting(v);
  console.log("Minimum Number of Minutes Required:", rotten);
}

main();
