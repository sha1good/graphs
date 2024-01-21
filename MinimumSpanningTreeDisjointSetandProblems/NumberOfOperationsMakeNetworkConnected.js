// You are given a graph with n vertices and m edges.

// You can remove one edge from anywhere and add that edge between any two vertices in one operation.

// Find the minimum number of operations that will be required to make the graph connected.

// If it is not possible to make the graph connected, return -1.

// Example 1:

// Input:
// n=4
// m=3
// Edge=[ [0, 1] , [0, 2] , [1, 2] ]

// Output:
// 1

// Explanation:
// Remove edge between vertices 1 and 2 and add between vertices 1 and 3.

// Example 2:

// Input:
// n=6
// m=5
// Edge=[ [0,1] , [0,2] , [0,3] , [1,2] , [1,3] ]

// Output:
// 2

// Explanation:
// Remove edge between (1,2) and(0,3) and add edge between (1,4) and (3,5)

class DisjointSetByRannk {
  constructor(n) {
    this.rank = new Array(n + 1).fill(0);
    this.parent = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
      this.parent[i] = i;
    }
  }

  findUltimateParent(node) {
    if (node === this.parent[node]) {
      return node; // parent of 1 is 1
    }
    return (this.parent[node] = this.findUltimateParent(this.parent[node]));
  }

  unionByRank(u, v) {
    const ultimateParentOfU = this.findUltimateParent(u);
    const ultimateParentOfV = this.findUltimateParent(v);

    if (ultimateParentOfU === ultimateParentOfV) return;

    if (this.rank[ultimateParentOfV] < this.rank[ultimateParentOfU]) {
      // join v to u
      this.parent[ultimateParentOfV] = ultimateParentOfU;
    } else if (this.rank[ultimateParentOfU] < this.rank[ultimateParentOfV]) {
      this.parent[ultimateParentOfU] = ultimateParentOfV;
      // Attach u to v
    } else {
      this.parent[ultimateParentOfV] = ultimateParentOfU;
      // if their ultimate parent are  the same thing , so the rank that we attached to  will increase
      this.rank[ultimateParentOfU]++;
    }
  }
}

function solve(noOfNodes, edge) {
  let ds = new DisjointSetByRannk(noOfNodes);

  let cntExtras = 0;

  for (let [u, v] of edge) {
    if (ds.findUltimateParent(u) === ds.findUltimateParent(v)) {
      cntExtras++;
    } else {
      ds.unionByRank(u, v);
    }
  }

  let numberOfComponent = 0;

  for (let i = 0; i < noOfNodes; i++) {
    if (i === ds.parent[i]) numberOfComponent++;
  }

  let result = numberOfComponent - 1;

  if (cntExtras >= result) return result;
  return -1;
}

function main() {
  let noOfNodes = 9;
  let edge = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [2, 3],
    [4, 5],
    [5, 6],
    [7, 8],
  ];
  let result = solve(noOfNodes, edge);

  console.log(result);
}

main();



// Time Complexity: O(E*4α)+O(N*4α) where E = no. of edges and N = no. of nodes. 
// The first term is to calculate the number of extra edges and the second term is to count the number of components. 
// 4α is for the disjoint set operation we have used and this term is so small that it can be considered constant.

// Space Complexity: O(2N) where N = no. of nodes. 2N for the two arrays(parent and size) of size N we have used inside the disjoint set.