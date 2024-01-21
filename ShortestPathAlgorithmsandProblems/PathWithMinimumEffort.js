// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of the cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e.,0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

// A route’s effort is the maximum absolute difference in heights between two consecutive cells of the route.

// Example 1:
// Input:
// heights = [[1,2,2],[3,8,2],[5,3,5]]
// Output:
// 2
// Explanation:

// The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.

// Example 2:

// Input:

// heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
// Output:
// 0
// Explanation:
// The route of [1,1,1,1,1,1,1,1,1,1,1,1,1,1] has a maximum absolute difference of 0 in consecutive cells.This is better than the route of [1,1,1,1,1,1,2,1], where the maximum absolute difference is 1.

// Approach:
// Brute Force: We can figure out the effort for all the paths and return the minimum effort among them.

// Optimised (Using Dijkstra) :
// In this particular problem, since there is no adjacency list we can say that the adjacent cell for a coordinate is that cell which is either on the top, bottom, left, or right of the current cell i.e, a cell can have a maximum of 4 cells adjacent to it and can only move in these directions.

// Initial configuration:

// Queue: Define a Queue which would contain pairs of the type {diff, (row, col) }, where ‘dist’ indicates the currently updated value of difference from source to the cell.
// Distance Matrix: Define a distance matrix that would contain the minimum difference from the source cell to that particular cell. If a cell is marked as ‘infinity’ then it is treated as unreachable/unvisited.
// The Algorithm consists of the following steps :

// Start by creating a queue that stores the distance-node pairs in the form {dist,(row, col)} and a dist matrix with each cell initialized with a very large number ( to indicate that they’re unvisited initially) and the source cell marked as ‘0’.
// We push the source cell to the queue along with its distance which is also 0.
// Pop the element at the front of the queue and look out for its adjacent nodes (left, right, bottom, and top cell). Also, for each cell, check the validity of the cell if it lies within the limits of the matrix or not.
// If the current difference value of a cell from its parent is better than the previous difference indicated by the distance matrix, we update the difference in the matrix and push it into the queue along with cell coordinates.
// A cell with a lower difference value would be at the front of the queue as opposed to a node with a higher difference. The only difference between this problem and Dijkstra’s Standard problem is that there we used to update the value of the distance of a node from the source and here we update the absolute difference of a node from its parent.
// We repeat the above three steps until the queue becomes empty or until we encounter the destination node.
// Return the calculated difference and stop the algorithm from reaching the destination node. If the queue becomes empty and we don’t encounter the destination node, return ‘0’ indicating there’s no path from source to destination.
// Here’s a quick demonstration of the Algorithm’s 1st iteration ( all the further iterations would be done in a similar way ) :

// Note: Updating the value of difference will only yield us the effort for the path traversed.

// Note: If you wish to see the dry run of the above approach, you can watch the video attached to this article.

// Intuition:

// In this problem, we need to minimize the effort of moving from the source cell (0,0) to the destination cell (n – 1,m – 1). The effort can be calculated as the maximum value of the difference between the node and its next node in the path from the source to the destination. Among all the possible paths, we have to minimize this effort. So, for these types of minimum path problems,
//there’s one standard algorithm that always comes to our mind and that is Dijkstra’s Algorithm which would be used in solving this problem also. We update the distance every time we encounter a value of difference less than the previous value. This way, whenever we reach the destination we finally return the value of difference which is also the minimum effort.

function pathMinimumEffort(heights, source, destination, n, m) {
  // Create a set containing pairs of cells
  // and their respective distance from the source cell in the
  // form { {row of cell, col of cell}, diff }.

  let st = new Set();
  st.add(`${source[0]}-${source[1]}`);
  console.log(st);

  // Create a distance matrix with initially all the cells marked as
  // unvisited and the source cell as 0.

  let distance = new Array(n).fill(null).map(() => new Array(m).fill(1e9));
  distance[source[0]][source[1]] = 0;

  // The following delta rows and delta columns array are created such that
  // each index represents each adjacent node that a cell may have
  // in a direction.

  let delRow = [-1, 0, 1, 0];
  let delCol = [0, 1, 0, -1];

  // Now, erase the minimum distance node first from the set
  // and traverse for all its adjacent nodes.
  while (st.size > 0) {
    let it = [...st.keys()][0];
    console.log(it.split("-"));
    st.delete(it);
    const [row, col] = it.split("-").map(Number);

    // Check if we have reached the destination cell,
    // return the current value of difference (which will be min).
    if (row === destination[0] && col === destination[1]) {
      return distance[row][col];
    }

    // Now, traverse the current cell in its four directions
    for (let i = 0; i < 4; i++) {
      let newRow = row + delRow[i];
      let newCol = col + delCol[i];

      // Checking validity of the cell.
      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m) {
        // Effort can be calculated as the max value of differences
        // between the heights of the current node and its adjacent nodes.
        let newEffort = Math.max(
          Math.abs(heights[row][col] - heights[newRow][newCol]),
          distance[row][col]
        );
        // If the calculated effort is less than the prev value
        // we update as we need the min effort of the distance and in the set
        if (newEffort < distance[newRow][newCol]) {
          distance[newRow][newCol] = newEffort;
          st.add(`${newRow}-${newCol}`);
        }
      }
    }
  }

  return 0; // if unreachable
}

function main() {
  let heights = [
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5],
  ];
  let n = heights.length;
  let m = heights[0].length;
  let source = [0, 0];
  let destination = [n - 1, m - 1];

  let result = pathMinimumEffort(heights, source, destination, n, m);
  console.log(result);
}

main();

console.log("This is with prority queue");

function pathMinimumEffortWwithPriorityQueue(
  heights,
  source,
  destination,
  n,
  m
) {
  // Create a priority queue containing pairs of cells
  // and their respective distance from the source cell in the
  // form { {row of cell, col of cell}, diff }.
  let pq = [[source[0], source[1], 0]];

  console.log(pq);
  // Create a distance matrix with initially all the cells marked as
  // unvisited and the source cell as 0.
  let distance = new Array(n).fill(null).map(() => new Array(m).fill(1e9));
  distance[source[0]][source[1]] = 0;

  // The following delta rows and delts columns array are created such that
  // each index represents each adjacent node that a cell may have
  // in a direction.
  let delRow = [-1, 0, 1, 0];
  let delCol = [0, 1, 0, -1];

  // Now, pop the minimum distance node first from the priority queue
  // and traverse for all its adjacent nodes.
  while (pq.length > 0) {
    pq.sort((a, b) => a[2] - b[2]); //Sort the priority queue based on distance
    console.log(pq);
    let [row, col, diff] = pq.shift();

    // Check if we have reached the destination cell,
    // return the current value of difference (which will be min).
    if (row === destination[0] && col === destination[1]) {
      return diff;
    }
    // Now traverse the current cell in its four directions
    for (let i = 0; i < 4; i++) {
      let newRow = row + delRow[i];
      let newCol = col + delCol[i];

      // Checking validity of the cell.
      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m) {
        // Effort can be calculated as the max value of differences
        // between the heights of the current node and its adjacent nodes.
        let newEffort = Math.max(
          Math.abs(heights[row][col] - heights[newRow][newCol]),
          diff
        );

        // If the calculated effort is less than the prev value
        // we update as we need the min effort  of the distance and in the  priority queue
        if (newEffort < distance[newRow][newCol]) {
          distance[newRow][newCol] = newEffort;
          pq.push([newRow, newCol, newEffort]);
        }
      }
    }
  }
  return 0; //if unreachable
}

function ade() {
  let heights = [
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5],
  ];

  let n = heights.length;
  let m = heights[0].length;
  let source = [0, 0],
    destination = [n - 1, m - 1];

  let result = pathMinimumEffortWwithPriorityQueue(
    heights,
    source,
    destination,
    n,
    m
  );
  console.log(result);
}

ade();



// Time Complexity: O( 4*N*M * log( N*M) ) { N*M are the total cells, for each of which we also check 4 adjacent nodes for the minimum effort and additional log(N*M) for insertion-deletion operations in a priority queue } 

// Where, N = No. of rows of the binary maze and M = No. of columns of the binary maze.

// Space Complexity: O( N*M ) { Distance matrix containing N*M cells + priority queue in the worst case containing all the nodes ( N*M) }.

// Where, N = No. of rows of the binary maze and M = No. of columns of the binary maze.