// On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.

// A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

// Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.

// Example 1:

// Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
// Output: 5
// Explanation: One way to remove 5 stones is as follows:
// 1. Remove stone [2,2] because it shares the same row as [2,1].
// 2. Remove stone [2,1] because it shares the same column as [0,1].
// 3. Remove stone [1,2] because it shares the same row as [1,0].
// 4. Remove stone [1,0] because it shares the same column as [0,0].
// 5. Remove stone [0,1] because it shares the same row as [0,0].
// Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
// Example 2:

// Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
// Output: 3
// Explanation: One way to make 3 moves is as follows:
// 1. Remove stone [2,2] because it shares the same row as [2,0].
// 2. Remove stone [2,0] because it shares the same column as [0,0].
// 3. Remove stone [0,2] because it shares the same row as [0,0].
// Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.
// Example 3:

// Input: stones = [[0,0]]
// Output: 0
// Explanation: [0,0] is the only stone on the plane, so you cannot remove it.


// Approach:
// The algorithm steps are as follows:

// First, from the stone information, we will find out the maximum row and the maximum column number so that we can get an idea about the size of the 2D plane(i.e. nothing but a matrix).
// Then, we need to create a disjoint set of sizes (maximum row index+maximum column index). For safety, we may take a size one more than required.
// Now it’s time to connect the cells having a stone. For that we will loop through the given cell information array and for each cell we will extract the row and the column number and do the following:
// First, we will convert column no. to (column no. + maximum row index +1). 
// We will perform the union(either unionBySize() or unionByRank()) of the row number and the converted column number.
// We will store the row and the converted column number in a map data structure for later use.
// Now, it’s time to calculate the number of components and for that, we will count the number of ultimate parents. Here we will refer to the previously created map.
// We just need the nodes in the Disjoint Set that are involved in having a stone. So we have stored the rows and the columns in a map in step 3.3, as they will have stones. Now we just need to check them from the map data structure once for getting the number of ultimate parents.
// Finally, we will subtract the no. of components(i.e. no. of ultimate parents) from the total no. of stones and we will get our answer.

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

function maxStoneRemove(stones, noOfstones) {
  let maxRow = 0;
  let maxCol = 0;

  //Loop through the stones

  for (let [row, col] of stones) {
    maxRow = Math.max(maxRow, row);
    maxCol = Math.max(maxCol, col);
  }

  let ds = new DisjointSetBySize(maxRow + maxCol + 1);

  let stoneNode = new Map();

  for (let [row, col] of stones) {
    let nodeRow = row;
    let nodeCol = col + maxRow + 1;

    ds.unionBySize(nodeRow, nodeCol);
    stoneNode.set(nodeRow, 1);
    stoneNode.set(nodeCol, 1);
  }

  let cnt = 0;

  for (let key of stoneNode.keys()) {
    if (ds.findUltimateParent(key) === key) cnt++;
  }
  return noOfstones - cnt;
}

function main() {
  let noOfstones = 6;

  let stones = [
    [0, 0],
    [0, 2],
    [1, 3],
    [3, 1],
    [3, 2],
    [4, 3],
  ];

  let result = maxStoneRemove(stones, noOfstones);

  console.log(result);
}

main();

function maxStoneRemoveParent(stones, noOfstones) {
  let maxRow = 0;
  let maxCol = 0;

  //Loop through the stones

  for (let [row, col] of stones) {
    maxRow = Math.max(maxRow, row);
    maxCol = Math.max(maxCol, col);
  }
  let noOfNodes = maxRow + maxCol + 1;
  let ds = new DisjointSetBySize(noOfNodes);
  for (let [row, col] of stones) {
    let nodeRow = row;
    let nodeCol = col + maxRow + 1;

    ds.unionBySize(nodeRow, nodeCol);
  }

  let cnt = 0;

  for (let i = 0; i <= noOfNodes; i++) {
    if (i === ds.parent[i]) {
      if (ds.size[i] > 1) cnt++;
    }
  }
  return noOfstones - cnt;
}

function ola() {
  let noOfstones = 6;

  let stones = [
    [0, 0],
    [0, 2],
    [1, 3],
    [3, 1],
    [3, 2],
    [4, 3],
  ];

  let result = maxStoneRemoveParent(stones, noOfstones);

  console.log(result);
}

ola();


// Time Complexity: O(N), where N = total no. of stones. 
// Here we have just traversed the given stones array several times. 
// And inside those loops, every operation is apparently taking constant time. 
// So, the time complexity is only the time of traversal of the array.

// Space Complexity: O(2* (max row index + max column index)) 
// for the parent and size array inside the Disjoint Set data structure.
