// Problem Statement: Given an undirected graph, return a vector of all nodes by traversing the graph using depth-first search (DFS).

// Approach:
// DFS is a traversal technique which involves the idea of recursion and backtracking. DFS goes in-depth, i.e., traverses all nodes by going ahead, and when there are no further nodes to traverse in the current path, then it backtracks on the same path and traverses other unvisited nodes.

// In DFS, we start with a node ‘v’, mark it as visited and store it in the solution vector. It is unexplored as its adjacent nodes are not visited.
// We run through all the adjacent nodes, and call the recursive dfs function to explore the node ‘v’ which has not been visited previously. This leads to the exploration of another node ‘u’ which is its adjacent node and is not visited.
// The adjacency list stores the list of neighbours for any node. Pick the neighbour list of node ‘v’ and run a for loop on the list of neighbours (say nodes ‘u’ and ‘w’ are in the list). We go in-depth with each node. When node ‘u’ is explored completely then it backtracks and explores node ‘w’.
// This traversal terminates when all the nodes are completely explored.
// In this way, all the nodes are traversed in a depthwise manner.

function dfs(node, adjList, visited, list) {
  visited[node] = 1;
  list.push(node);

  // traverse all  the  neighbours that particular node
  for (let it of adjList[node]) {
    // if it has not been visited, that is when I will visit it, otherwise, I will not
    if (!visited[it]) {
      dfs(it, adjList, visited, list);
    }
  }
  // If all neighbors have been visited, add a return statement
  return;
}

// Function to return a list containing the DFS traversal of the graph.
function dfsOfGraph(noOfNodes, adjList) {
  //Create a visited array
  let visited = new Array(noOfNodes).fill(0);
  let start = 0;

  // create a list to store dfs
  let list = [];
  // call dfs for starting node
  dfs(start, adjList, visited, list);

  return list;
}

function addEdge(adjList, u, v) {
  adjList[u].push(v);
  adjList[v].push(u); // This is traversal
}

function printResult(result) {
  for (let i = 0; i < result.length; i++) {
    console.log("The result  of the dfs graphs ", result[i]);
  }
}
function main() {
  const adjList = Array.from({ length: 5 }, () => []);
  addEdge(adjList, 0, 1);
  addEdge(adjList, 0, 2);
  addEdge(adjList, 0, 4);
  addEdge(adjList, 4, 3);

 console.log(adjList)

  let result = dfsOfGraph(5, adjList);

  printResult(result);
}

// Time Complexity: For an undirected graph, O(N) + O(2E),
// For a directed graph, O(N) + O(E), Because for every node we are calling the recursive function once,
//  the time taken is O(N) and 2E is for total degrees as we traverse for all adjacent nodes.
main();
