// // Number of Islands – II – Online Queries – DSU: G-51
// // Problem Statement: You are given an n, m which means the row and column of the 2D matrix, and an array of size k denoting the number of operations. Matrix elements are 0 if there is water or 1 if there is land. Originally, the 2D matrix is all 0 which means there is no land in the matrix. The array has k operator(s) and each operator has two integers A[i][0], A[i][1] means that you can change the cell matrix[A[i][0]][A[i][1]] from sea to island. Return how many islands are there in the matrix after each operation.
// // You need to return an array of size k.

// Let’s discuss the following observations:

// Observation 1: What does each operation/query mean?
// In each operation/query, an index of a cell will be given and we need to add an island on that particular cell i.e. we need to place the value 1 to that particular cell.

// Observation 2: Optimizing the repeating same operations
// The same operations may repeat any number of times but it is meaningless to perform all of them every time. So, we will maintain a visited array that will keep track of the cells on which the operations have been already performed. If the operations repeat, by just checking the visited array we can decide not to calculate again, and instead, just take the current answer into our account. Thus we can optimize the number of operations.

// Observation 3: How to connect cells to include them in the same group or consider them a single island.
// Generally, a cell is represented by two parameters i.e. row and column. But to connect the cells as we have done with nodes, we need to first represent each cell with a single number. So, we will number them from 0 to n*m-1(from left to right) where n = no. of total rows and m = total no. of columns.

// For example, if a 5X4 matrix is given we will number the cell in the following way:

// Now if we want to connect cells (1,0) and (2,0), we will just perform a union of 5 and 10. The number for representing each cell can be found using the following formula:
// number = (row of the current cell*total number of columns)+column of the current cell for example, for the cell (2, 0) the number is = (2*5) + 0 = 10.

// Observation 4: How to count the number of islands.
// For each operation, if the given cell is not visited, we will first mark the cell visited and increase the counter by 1. Now we will check all four sides of the given cell. If any other islands are found, we will connect the current cell with each of them(If not already connected) decreasing the counter value by 1. While connecting we need to check if the cells are already connected or not. For this, we will first convert the cells’ indices into numbers using the above formula and then we will check their ultimate parents. If the parents become the same, we will not connect them as well as we will not make any changes to the counter variable. Thus the number of islands will be calculated.

// Approach:
// The algorithm steps are as follows:

// Initial Configuration:
// Visited array: This 2D array should be initialized with 0.
// Counter variable: This variable will also be initialized with 0.
// Answer array: After performing the algorithm, this array will store the results after performing the queries.

// First, we will iterate over all the queries selecting each at a time. Now, we can get the row and the column of the cell given in that query.
// Then, we will check that cell in the visited array, if the cell is previously visited or not.
// If the cell is previously visited, we will just take the current count into our account storing that count value in our answer array and we will move on to the next query.
// Otherwise, we will mark the cell as visited in the visited array and increase the value of the counter variable by 1.
// Now, it’s time to connect the adjacent islands properly. For that, we will check all four adjacent cells of the current cell. If any island is found, we will first check if they(the current cell and the adjacent cell that contains an island) are already connected or not using the findUPar() method.
// For checking, we will first convert the indices of the current cell and the adjacent cell into the numbers using the specified formula. Then we will check their ultimate parents.
// If the ultimate parents are different, we will decrease the counter value by 1 and perform the union(either unionBySize() or unionByRank()) between those two numbers that represent the cells.
// Similarly, checking all four sides and making the required changes in the counter variable, we will put the counter value into our answer array.
// After performing step 2 for all the queries, we will get our final answer array containing the results for all the queries.

class DisjointSetBySize {
  constructor(n) {
    this.size = new Array(n + 1).fill(0);
    this.parent = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  findUltimateParent(node) {
    if (node === this.parent[node]) {
      return node; // parent of 1 is 1
    }
    return (this.parent[node] = this.findUltimateParent(this.parent[node]));
  }

  unionBySize(u, v) {
    const ultimateParentOfU = this.findUltimateParent(u);
    const ultimateParentOfV = this.findUltimateParent(v);

    if (ultimateParentOfU === ultimateParentOfV) return;

    if (this.size[ultimateParentOfV] < this.size[ultimateParentOfU]) {
      // join v to u
      this.parent[ultimateParentOfV] = ultimateParentOfU;
      this.size[ultimateParentOfU] += this.size[ultimateParentOfV];
    } else {
      this.parent[ultimateParentOfU] = ultimateParentOfV;
      // if their ultimate parent are the same thing , so the  size that we attached to  will increase
      this.size[ultimateParentOfV] += this.size[ultimateParentOfU];
    }
  }
}

class Solution {
  isValid(n, m, adjRow, adjCol) {
    return adjRow >= 0 && adjRow < n && adjCol >= 0 && adjCol < m;
  }
  numberOfIslands(n, m, operator) {
    let result = [];
    let ds = new DisjointSetBySize(n * m);
    let cnt = 0;
    let visited = Array.from({ length: n }, () => new Array(m).fill(0));
    for (let [row, col] of operator) {
      if (visited[row][col] === 1) {
        result.push(cnt);
        continue;
      }

      visited[row][col] = 1;
      cnt++;
      // row - 1, col
      // row , col + 1
      // row + 1, col
      // row, col - 1;

      let delRow = [-1, 0, 1, 0];
      let delCol = [0, 1, 0, -1];
      for (let i = 0; i < 4; i++) {
        let adjRow = row + delRow[i];
        let adjCol = col + delCol[i];

        if (this.isValid(n, m, adjRow, adjCol)) {
          // Check if it is an island
          if (visited[adjRow][adjCol] === 1) {
            let nodeNo = row * m + col;
            let adjNodeNo = adjRow * m + adjCol;

            if (
              ds.findUltimateParent(nodeNo) !== ds.findUltimateParent(adjNodeNo)
            ) {
              cnt--;
              ds.unionBySize(nodeNo, adjNodeNo);
            }
          }
        }
      }

      result.push(cnt);
    }

    return result;
  }
}

function main() {
  const n = 4;
  const m = 5;

  let operator = [
    [0, 0],
    [0, 0],
    [1, 1],
    [1, 0],
    [0, 1],
    [0, 3],
    [1, 3],
    [0, 4],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
  ];

  let obj = new Solution();

  let result = obj.numberOfIslands(n, m, operator);
  console.log(result.join(" "));
}

main();


// Time Complexity: O(Q*4α) ~ O(Q) where Q = no. of queries. The term 4α is so small that it can be considered constant.

// Space Complexity: O(Q) + O(N*M) + O(N*M), where Q = no. of queries, N = total no. of rows, M = total no. of columns. The last two terms are for the parent and the size array used 
// inside the Disjoint set data structure. The first term is to store the answer.