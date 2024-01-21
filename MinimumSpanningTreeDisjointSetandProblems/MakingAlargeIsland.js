// You are given an n x n binary grid. A grid is said to be binary if every value in grid is either 1 or 0.

// You can change at most one cell in grid from 0 to 1.

// You need to find the largest group of connected  1's.

// Two cells are said to be connected if both are adjacent to each other and both have same value.

// Example 1

// Input:
// 2
// 1 1
// 0 1

// Output:
// 4

// Explanation:
// By changing cell (2,1) ,we can obtain a connected group of 4 1's
// 1 1
// 1 1

// Example 2

// Input:
// 3
// 1 0 1
// 1 0 1
// 1 0 1

// Output:
// 7

// Explanation:
// By changing cell (3,2) ,we can obtain a connected group of 7 1's
// 1 0 1
// 1 0 1
// 1 1 1

// Your Task:
// You don't need to read or print anything. Your task is to complete the function MaxConnection() which takes a matrix grid[][] denoting the grid and
// return the maximum group of connected group of 1s.

// Solution:
// Before moving on to the solution, let’s quickly discuss some points about the question. First, we need to remember that a group means a group of cells with the value 1 such that they share a common side. If we look into it from the matrix view, the statement actually means that two cells with value 1 are considered a single group if one of them is located in any of the four directions (Up, Down, Left, Right) of the other cell. But two diagonal adjacent cells will not be considered a single group rather they will be counted as different groups. The following illustration will depict the concept:

// Here cells [0,0] and [0,1] are considered a single group as they share a common side but cells [0,1] and [1,2] must be considered two different groups as they do not have any common side.

// Now, we need to discuss the approach with which we are trying to solve this question. Here, we are selecting the cells with value 0 one at a time, then placing the value 1 to that selected cell and finally, we are trying to connect the cells to get the largest possible group of connected 1’s.

// Basically, we are checking the largest group of connected 1’s we can get by changing each possible cell with the value 0 one at a time.

// So, here is a concept of connecting cells as well as dynamically changing the matrix. We can imagine this matrix as a dynamic graph. So, from these observations, we can easily decide to choose the Disjoint Set data structure to solve this problem.

// Let’s discuss the following observations:

// Observation 1: How to connect cells to include them in the same group.
// Generally, a cell is represented by two parameters i.e. row and column. But to connect the cells as we have done with nodes, we need to first represent each cell with a single number. So, we will number them from 0 to n*m-1(from left to right) where n = no. of total rows and m = total no. of columns.

// For example, if a 5X4 matrix is given we will number the cell in the following way:

// Now if we want to connect cells (1,0) and (2,0), we will just perform a union of 5 and 10. The number for representing each cell can be found using the following formula:
// node number = (row of the current cell*total number of columns)+column of the current cell for example, for the cell (2, 0) the number is = (2*5) + 0 = 10.

// Observation 2: How to find the cell in which if we invert the value, we will get the largest possible group of connected 1s.
// In order to find the cell, we will follow the brute force approach. We will check for every possible cell with a value of 0 one by one and we will try to figure out the largest group we can get after inverting that particular cell to 1 in each case. Among all the answers we will find the cell that creates the largest possible group.

// Now, with these two observations, the following is our first approach:

// We will first invert a cell from the value 0 to 1 and will check all its four adjacent cells(Up, Down, Left, Right). If any component/group exists, we will just connect the current cell to that adjacent component and add the component’s size to our answer. Finally, checking all four cells, we will add an extra 1 to our answer for the current cell being included in the group, and then we will get the total size of the newly created group.

// But How to get the size of an existing group/component of connected 1s:

// In order to get the size of the existing groups, first, we need to create the existing group by connecting the cells with the value 1. To do so we will do a union of the two node numbers calculated using the above-specified formula if the cells contain 1 and they share a common side. Now after connecting all such cells we will get the different existing components.
// Now to find the size of the components, we will just find their ultimate parents and refer to the ultimate parent index of the size array inside the Disjoint Set data structure(size[ultimateParent]).

// Thus we can calculate the size of the components/groups. But there exists an edge case in this approach.

// Edge Case:
// Here is the edge case. Let’s understand it using the following example.

// In this given grid, we will check for every cell with the value 0. When we come to cell (3,3), we will check all four adjacent cells to get the components’ sizes. Now it will first add the component of size 7 in our answer while checking the left cell and will again add the same component while checking the downward cell. This is where the answer gets incorrect. So, to avoid this edge case, instead of adding the component sizes to our answer we will store the ultimate parents in a set data structure. This process will automatically discard the case of adding duplicate components. After that, to get the size of the ultimate parents we will just refer to the ultimate parent index of the size array inside the Disjoint Set data structure(size[ultimateParent]). Thus we will get the final answer.

// Approach:

// The algorithm steps are as follows (step 3 is very important):

// Our first objective is to connect all the nodes that have formed groups. In order to do so, we will visit each cell of the grid and check if it contains the value 1.
// If the value is 1, we will check all four adjacent cells of the current cell. If we find any adjacent cell with the same value 1, we will perform the union(either unionBySize() or unionByRank()) of the two node numbers that represent those two cells i.e. the current cell and the adjacent cell.
// Now, step 1 is completed.
// Then, we will again visit each cell of the grid and check if it contains the value 0.
// If the value is 0, we will check all four adjacent cells of the current cell. If we found any cell with value 1, we will just insert the ultimate parent of that cell(using the findUPar() method) in the set data structure. This process will add the adjacent components to our answer.
// After doing so for all the adjacent cells containing 1, we will iterate through the set data structure and add the size of each ultimate parent(referring to the size array inside the Disjoint Set data structure) to our answer. Finally, we will add an extra 1 to our answer for the current cell being included in the group.
// Now, we will compare to get the maximum answer among all the previous answers we got for the previous cells with the value 0 and the current one.
// But if the matrix does not contain any cell with 0, step 2 will not be executed. For that reason, we will just run a loop from node number 0 to n*n and for each node number, we will find the ultimate parent. After that, we will find the sizes of those ultimate parents and will take the size of the largest one.
// Thus we will get the maximum size of the group of connected 1s stored in our answer.

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
  isValid(n, newRow, newCol) {
    return newRow >= 0 && newRow < n && newCol >= 0 && newCol < n;
  }

  MaxConnection(grid) {
    let n = grid.length;

    let ds = new DisjointSetBySize(n * n);

    // step - 1
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (grid[row][col] === 0) continue;

        let dr = [-1, 0, 1, 0];
        let dc = [0, -1, 0, 1];

        for (let i = 0; i < 4; i++) {
          let newRow = row + dr[i];
          let newCol = col + dc[i];

          if (this.isValid(n, newRow, newCol)) {
            if (grid[newRow][newCol] === 1) {
              let nodeNo = row * n + col;
              let adjNodeNo = newRow * n + newCol;
              ds.unionBySize(nodeNo, adjNodeNo);
            }
          }
        }
      }
    }

    //Step 2, converting  of atmost one 0 to 1
    let maxIsland = 0;
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (grid[row][col] === 1) continue;

        let dr = [-1, 0, 1, 0];
        let dc = [0, -1, 0, 1];
        let components = new Set();
        for (let i = 0; i < 4; i++) {
          let newRow = row + dr[i];
          let newCol = col + dc[i];
          if (this.isValid(n, newRow, newCol)) {
            if (grid[newRow][newCol] === 1) {
              let adjNodeNo = newRow * n + newCol;
              components.add(ds.findUltimateParent(adjNodeNo));
            }
          }
        }

        let sizeTotal = 0;

        for (let it of components) {
          sizeTotal += ds.size[it];
        }
        maxIsland = Math.max(maxIsland, sizeTotal + 1); // Add  1 here because we are converting 0 to 1
      }
    }

    //If all the cells  has a value of 1, then we need to get the max size of the maximum isalnd we can find
    for (let cellNo = 0; cellNo < n * n; cellNo++) {
      maxIsland = Math.max(maxIsland, ds.size[ds.findUltimateParent(cellNo)]);
    }

    return maxIsland;
  }
}

function main() {
  let grid = [
    [1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0],
  ];

  let obj = new Solution();
  let ans = obj.MaxConnection(grid);
  console.log("The largest group of connected 1s is of size: " + ans);
}

main();

// Time Complexity: O(N2)+O(N2) ~ O(N2) where N = total number of rows of the grid. Inside those nested loops,
// all the operations are taking apparently constant time.
// So, O(N2) for the nested loop only, is the time complexity.

// Space Complexity: O(2*N2) where N = the total number of rows of the grid.
// This is for the two arrays i.e. parent array and size array of size N2 inside the Disjoint set.
