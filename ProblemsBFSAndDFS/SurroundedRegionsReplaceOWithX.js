// Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.

// Example 1:

// Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
// Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
// Explanation: Notice that an 'O' should not be flipped if:
// - It is on the border, or
// - It is adjacent to an 'O' that should not be flipped.
// The bottom 'O' is on the border, so it is not flipped.
// The other three 'O' form a surrounded region, so they are flipped.
// Example 2:

// Input: board = [["X"]]
// Output: [["X"]]

function dfs(row, col, visited, mat, delRow, delCol) {
  visited[row][col] = 1;

  let rows = mat.length;
  let cols = mat[0].length;

  // check for top, right, bottom, left
  for (i = 0; i < 4; i++) {
    let nRow = row + delRow[i];
    let nCol = col + delCol[i];

    //Check for validity so that we  do not iterate out of bound
    if (
      nRow >= 0 &&
      nRow < rows &&
      nCol >= 0 &&
      nCol < cols &&
      !visited[nRow][nCol] &&
      mat[nRow][nCol] === "O"
    ) {
      dfs(nRow, nCol, visited, mat, delRow, delCol);
    }
  }

  return;
}

function replaceWithX(n, m, mat) {
  let visited = Array.from({ length: n }, () => Array(m).fill(0));

  let delRow = [-1, 0, 1, 0];
  let delCol = [0, 1, 0, -1];

  // traverse first row and last row
  for (let j = 0; j < m; j++) {
    // check for unvisited Os in the boundary rows
    // first row
    if (!visited[0][j] && mat[0][j] === "O") {
      dfs(0, j, visited, mat, delRow, delCol);
    }

    // last row
    if (!visited[n - 1][j] && mat[n - 1][j] === "O") {
      dfs(n - 1, j, visited, mat, delRow, delCol);
    }
  }

  // check for unvisited Os in the boundary columns
  // first column
  for (let i = 0; i < n; i++) {
    if (!visited[i][0] && mat[i][0] === "O") {
      dfs(i, 0, visited, mat, delRow, delCol);
    }

    // last column
    if (!visited[i][m - 1] && mat[i][m - 1] === "O") {
      dfs(i, m - 1, visited, mat, delRow, delCol);
    }
  }

  // if unvisited O  and the matrix at [row] and [col]  is still 0 , then convert to X
  for (i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && mat[i][j] === "O") {
        mat[i][j] = "X";
      }
    }
  }
  return mat;
}

function main() {
  let mat = [
    ["X", "X", "X", "X"],
    ["X", "O", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "O", "X", "X"],
    ["X", "X", "O", "O"],
  ];

  let n = mat.length;
  let m = mat[0].length;
  let result = replaceWithX(n, m, mat);

  for (let i of result) {
    for (let j of i) {
      process.stdout.write(j + " ");
    }
    console.log();
  }
}

// Time Complexity: O(N) + O(M) + O(NxMx4) ~ O(N x M), For the worst case, every element will be marked as ‘O’ in the matrix, and the DFS function will be called for (N x M) nodes and for every node, we are traversing for 4 neighbors, so it will take O(N x M x 4) time. Also, we are running loops for boundary elements so it will take O(N) + O(M).

// Space Complexity ~ O(N x M), O(N x M) for the visited array, and auxiliary stack space takes up N x M locations at max.
main();
