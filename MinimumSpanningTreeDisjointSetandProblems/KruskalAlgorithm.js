// Approach:
// We will be implementing Kruskal’s algorithm using the Disjoint Set data structure that we have previously learned.

// Now, we know Disjoint Set provides two methods named findUPar()(This function helps to find the ultimate parent of a particular node) and Union(This basically helps to add the edges between two nodes). To know more about these functionalities, do refer to the article on Disjoint Set.

// The algorithm steps are as follows:

// First, we need to extract the edge information(if not given already) from the given adjacency list in the format of (wt, u, v) where u is the current node, v is the adjacent node and wt is the weight of the edge between node u and v and we will store the tuples in an array.
// Then the array must be sorted in the ascending order of the weights so that while iterating we can get the edges with the minimum weights first.
// After that, we will iterate over the edge information, and for each tuple, we will apply the  following operation:
// First, we will take the two nodes u and v from the tuple and check if the ultimate parents of both nodes are the same or not using the findUPar() function provided by the Disjoint Set data structure.
// If the ultimate parents are the same, we need not do anything to that edge as there already exists a path between the nodes and we will continue to the next tuple.
// If the ultimate parents are different, we will add the weight of the edge to our final answer(i.e. mstWt variable used in the following code) and apply the union operation(i.e. either unionBySize(u, v) or unionByRank(u, v)) with the nodes u and v. The union operation is also provided by the Disjoint Set.
// Finally, we will get our answer (in the mstWt variable as used in the following code) successfully.

// Note: Points to remember if the graph is given as an adjacency list we must extract the edge information first. As the graph contains bidirectional edges we can get a single edge twice in our array (For example, (wt, u, v) and (wt, v, u), (5, 1, 2) and (5, 2, 1)). But we should not worry about that as the Disjoint Set data structure will automatically discard the duplicate one.

// Note: This algorithm mainly contains the Disjoint Set data structure used to find the minimum spanning tree of a given graph. So, we just need to know the data structure.

// Given a weighted, undirected and connected graph of V vertices and E edges.
// The task is to find the sum of weights of the edges of the Minimum Spanning Tree.
// Given adjacency list adj as input parameters .
// Here adj[i] contains vectors of size 2, where the first integer
// in that vector denotes the end of the edge and the second integer denotes the edge weight.

// Example 1:

// Input:
// 3 3
// 0 1 5
// 1 2 3
// 0 2 1

// Output:
// 4
// Explanation:

// The Spanning Tree resulting in a weight
// of 4 is shown above.
// Example 2:

// Input:
// 2 1
// 0 1 5

// Output:
// 5
// Explanation:
// Only one Spanning Tree is possible
// which has a weight of 5.

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
      // if their ultimate parent are the same thing ,so the size that we attached to  will increase
      this.size[ultimateParentOfV] += this.size[ultimateParentOfU];
    }
  }
}

class Solution {
  spanningTree(V, adj) {
    // 1 - 2 wt = 5
    /// 1 - > (2, 5)
    // 2 -> (1, 5)

    // 5, 1, 2
    // 5, 2, 1

    let edges = [];
    for (let i = 0; i < V; i++) {
      for (let [adjacencyNode, wt] of adj[i]) {
        let node = i;
        edges.push([wt, node, adjacencyNode]);
      }
    }

    const ds = new DisjointSetBySize(V);
    //Sort the edges by weigth
    edges.sort((a, b) => a[0] - b[0]);
    let mstWt = 0;

    for (let [weight, u, v] of edges) {
      if (ds.findUltimateParent(u) !== ds.findUltimateParent(v)) {
        mstWt += weight;
        ds.unionBySize(u, v);
      }
    }

    return mstWt;
  }
}

function main() {
  let noOfNodes = 5;

  const edges = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 2, 1],
    [2, 3, 2],
    [3, 4, 1],
    [4, 2, 2],
  ];

  const adj = new Array(noOfNodes).fill(0).map(() => []);

  for (let it of edges) {
    const temp1 = [it[1], it[2]];
    const temp2 = [it[0], it[2]];

    adj[it[0]].push(temp1);
    adj[it[1]].push(temp2);
  }

  const obj = new Solution();
  let mstWt = obj.spanningTree(noOfNodes, adj);
  console.log("The sum of all the edge weights:", mstWt);
}

main();


// Time Complexity: O(N+E) + O(E logE) + O(E*4α*2)  
// where N = no. of nodes and E = no. of edges. O(N+E) for extracting edge information from the adjacency list. 
//O(E logE) for sorting the array consists of the edge tuples. Finally, we are using the disjoint set operations inside a loop. 
//The loop will continue to E times. Inside that loop, there are two disjoint set operations like findUPar() and UnionBySize() each taking 4 and so it will result in 4*2. 
//That is why the last term O(E*4*2) is added.

// Space Complexity: O(N) + O(N) + O(E) where E = no. of edges and N = no. of nodes.
// O(E) space is taken by the array that we are using to store the edge information. 
//And in the disjoint set data structure, we are using two N-sized arrays i.e. a parent and a size array
 //(as we are using unionBySize() function otherwise, a rank array of the same size 
 //if unionByRank() is used) which result in the first two terms O(N).



