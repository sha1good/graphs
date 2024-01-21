// There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], there is an undirected edge between node u and node v. The graph has the following properties:

// There are no self-edges (graph[u] does not contain u).
// There are no parallel edges (graph[u] does not contain duplicate values).
// If v is in graph[u], then u is in graph[v] (the graph is undirected).
// The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them.
// A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.

// Return true if and only if it is bipartite.

// Example 1:

// Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
// Output: false
// Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.
// Example 2:

// Input: graph = [[1,3],[0,2],[1,3],[0,2]]
// Output: true
// Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.

// Constraints:

// graph.length == n
// 1 <= n <= 100
// 0 <= graph[u].length < n
// 0 <= graph[u][i] <= n - 1
// graph[u] does not contain u.
// All the values of graph[u] are unique.
// If graph[u] contains v, then graph[v] contains u.

function dfs(node, col, colors, adjList) {
  colors[node] = col;

  // Now, let us loop through the adjacent nodes

  for (let adjacentNode of adjList[node]) {
    // if uncoloured, now , go and color it with opposite color that you used before
    //i.e if it color it previously with 0, then go and color it with 1
    if (colors[adjacentNode] === -1) {
      if (dfs(adjacentNode, !col, colors, adjList) === false) {
        return false;
      }
    }
    // if previous node and the  current  node has the same color
    else if (colors[adjacentNode] === col) {
      return false;
    }
  }

  return true;
}
function isBipartite(noOfNodes, adjList) {
  //if it is  an unconnected component, loop througth all the nodes
  let colors = Array(noOfNodes + 1).fill(-1);
  //for (let i = 0; i < noOfNodes; i++) colors[i] = -1;
  console.log(colors);

  // / for connected components
  for (let i = 1; i <= noOfNodes; i++) {
    if (colors[i] === -1) {
      // I will return false any moment I get false... no need to check further or call any dfs for any other nodes
      if (dfs(i, 0, colors, adjList) === false) return false;
    }
  }
  return true;
}

function addEdge(adjList, u, v) {
  adjList[u].push(v);
  adjList[v].push(u);
}

function main() {
  let noOfNodes = 4;
  let adjList = Array.from({ length: noOfNodes }, () => []);
  addEdge(adjList, 0, 1);
  addEdge(adjList, 0, 2);
  addEdge(adjList, 0, 3);
  addEdge(adjList, 1, 2);
  addEdge(adjList, 2, 3);
  

  console.log(adjList);
  let result = isBipartite(noOfNodes, adjList);
  console.log(+result);
}

// Time Complexity: O(V + 2E), Where V = Vertices, 2E is for total degrees as we traverse all adjacent nodes.

// Space Complexity: O(3V) ~ O(V), Space for DFS stack space, colour array and an adjacency list.
main();
