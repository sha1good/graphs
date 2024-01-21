// Problem statement
// You are given a two-dimensional array/list of integers consisting of 0s and 1s. In the list, 1 represents land and 0 represents water.

// The task is to find the number of distinct islands where a group of connected 1s(horizontally or vertically) forms an island.

// Note:
// Two islands are considered to be the same if and only if one island is equal to another(not rotated or reflected) i.e if we can translate one island on another without rotating or reflecting then it would be considered as the same islands.
// For example:
// 1 1 0
// 0 0 1
// 0 0 1

// In this example, we have two islands and they would be considered as distinct islands as we can not translate them on one another even if they have the same no of 1's.
// For example :
// 1 1 0 0 0
// 1 1 0 0 0
// 0 0 0 1 1
// 0 0 0 1 1

// In this example, we have two islands and they are the same as we can translate one island onto another island, so our answer should be 1.
// Detailed explanation ( Input/output format, Notes, Images )
// Constraints
//  0 <= N <= 1000
//  0 <= M <= 1000
//  0 <= elements of array <= 1

// Time Limit: 1 sec

// Approach:
// In any traversal technique, we have one starting node and it traverses all the nodes in the graph. We know about both the traversals, Breadth First Search (BFS) and Depth First Search (DFS). We can use any of the traversals to solve this problem, in our case we will be using BFS.

// The algorithm steps are as follows:

// The pairs of row and column (<row, column>) will represent the node numbers.
// For BFS traversal, we need a queue data structure and a visited array. Create a replica of the given array, i.e., create another array of the same size and call it a visited array. We can use the same matrix, but we will avoid alteration of the original data.
// In the queue, insert a vertex (pair of <row, column>) and mark it as visited.
// While BFS traversal, pop out an element from the queue and travel to all its neighbours. In a graph, we store the list of neighbours in an adjacency list but here we know the neighbours are in 8 directions.
// We go in all 8 directions and check for unvisited land neighbours. To travel in 8 directions we will use nested loops, you can find the implementation details in the code.
// BFS function call will make sure that it starts the BFS call from that unvisited land, and visits all the nodes that are on that island, and at the same time, it will also mark them as visited.
// Since the nodes travelled in a traversal will be marked as visited, they will no further be called for any further BFS traversal.
// Keep repeating these steps, for every land that you find unvisited, and visit the entire island.
// Add a counter variable to count the number of times the BFS function is called, as in this way we can count the total number of starting nodes, which will give us the number of islands.
// In the following example there are 3 islands, i.e., we will have 3 starting nodes.

function bfs(i, j, visited, grid) {
  // mark it visited
  visited[i][j] = 1;
  let rows = grid.length;
  let cols = grid[0].length;
  // push the node in queue
  let queue = [];
  queue.push([i, j]);

  // until the queue becomes empty
  while (queue.length !== 0) {
    let [row, col] = queue.shift();

    // traverse in the neighbours and mark them if its a land
    for (let delRow = -1; delRow <= 1; delRow++) {
      for (let delCol = -1; delCol <= 1; delCol++) {
        let nRow = row + delRow;
        let nCol = col + delCol;
        // neighbour row and column is valid, and is an unvisited land
        if (
          nRow >= 0 &&
          nRow < rows &&
          nCol >= 0 &&
          nCol < cols &&
          grid[nRow][nCol] === 1 &&
          !visited[nRow][nCol]
        ) {
          visited[nRow][nCol] = 1;
          queue.push([nRow, nCol]);
        }
      }
    }
  }
}

function NumberOfDistictIsland(rows, cols, grid) {
  let visited = Array.from({ length: rows }, () => Array(cols).fill(0));

  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // if not visited and is a land
      if (!visited[i][j] && grid[i][j] === 1) {
        count++;
        bfs(i, j, visited, grid);
      }
    }
  }

  return count;
}

function main() {
  let grid = [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [1, 1, 0, 1],
  ];

  let n = grid.length;
  let m = grid[0].length;

  let result = NumberOfDistictIsland(n, m, grid);
  console.log(result);
}


// Time Complexity ~ O(N² + NxMx8), N² for the nested loops, and NxMx9 for the overall DFS of the matrix, 
// that will happen throughout if all the cells are filled with 1.
// Space Complexity: O(N²) for visited array max queue space O(N²), 
// If all are marked as 1 then the maximum queue space will be N².
main();
