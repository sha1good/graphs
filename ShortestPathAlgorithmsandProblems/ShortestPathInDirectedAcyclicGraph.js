// Intuition:
// Finding the shortest path to a vertex is easy if you already know the shortest paths to all the vertices that can precede it. Processing the vertices in topological order ensures that by the time you get to a vertex, you’ve already processed all the vertices that can precede it which reduces the computation time significantly. In this approach, we traverse the nodes sequentially according to their reachability from the source.

// Dijkstra’s algorithm is necessary for graphs that can contain cycles because they can’t be topologically sorted. In other cases, the topological sort would work fine as we start from the first node, and then move on to the others in a directed manner.

// Approach:
// We will calculate the shortest path in a directed acyclic graph by using topological sort. Topological sort can be implemented in two ways- BFS and DFS. Here, we will be implementing using the DFS technique. Depth First Search, DFS is a traversal technique where we visit a node and then continue visiting its adjacent nodes until we reach the end point, i.e., it keeps on moving in the depth of a particular node and then backtracks when no further adjacent nodes are available.

// Initial configuration:
// Adjacency List: Create an adjacency list of the formed vector of pairs of size ‘N’, where each index denotes a node ‘u’ and contains a vector that consists of pairs denoting the adjacent nodes ‘v’ and the distance to that adjacent node from initial node ‘u’.
// Visited Array: Create a visited array and mark all the indices as unvisited (0) initially.
// Stack: Define a stack data structure to store the topological sort.
// Distance Array: Initialise this array by Max integer value and then update the value for each node successively while calculating the shortest distance between the source and the current node.
// The shortest path in a directed acyclic graph can be calculated by the following steps:

// Perform topological sort on the graph using BFS/DFS and store it in a stack. In order to get a hang of how the Topological Sort works, you can refer to this article for the same.
// Now, iterate on the topo sort. We can keep the generated topo sort in the stack only, and do an iteration on it, it reduces the extra space which would have been required to store it. Make sure for the source node, we will assign dist[src] = 0.
// For every node that comes out of the stack which contains our topo sort, we can traverse for all its adjacent nodes, and relax them.
// In order to relax them, we simply do a simple comparison of dist[node] + wt and dist[adjNode]. Here dist[node] means the distance taken to reach the current node, and it is the edge weight between the node and the adjNode.
// If (dist[node] + wt < dist[adjNode]), then we will go ahead and update the distance of the dist[adjNode] to the new found better path.
// Once all the nodes have been iterated, the dist[] array will store the shortest paths and we can then return it.

function dfs(node, stack, visited, adjList) {
  //This is the function to implement Topological sort.
  visited[node] = 1;

  // go through the adjacency of the current node and perform dfs
  for (let [it, _] of adjList[node]) {
    if (!visited[it]) {
      dfs(it, stack, visited, adjList);
    }
  }

  return stack.push(node);
}
function shortestPath(noOfNodes, edges, noOfEdges) {
  //We create a graph first in the form of an adjacency list.
  let adjList = Array.from(Array(noOfNodes), () => []);

  //Go across the edges to fill up the adjacency list
  for (let i = 0; i < noOfEdges; i++) {
    let u = edges[i][0];
    let v = edges[i][1];
    let weight = edges[i][2];

    adjList[u].push([v, weight]);
  }

  // A visited array is created with initially all the nodes marked as unvisited (0).
  let visited = Array(noOfNodes).fill(0);

  //Now, we perform topo sort using DFS technique
  //and store the result in the stack st.
  let stack = [];
  for (let i = 0; i < noOfNodes; i++) {
    if (!visited[i]) {
      dfs(i, stack, visited, adjList);
    }
  }

  // I will create a distance array of node length and marked them as  Infinity
  let distance = Array(noOfNodes).fill(Infinity);
  distance[0] = 0;
  while (stack.length !== 0) {
    let node = stack.pop();
    for (let [v, weight] of adjList[node]) {
      if (distance[node] + weight < distance[v]) {
        // update the distance
        distance[v] = distance[node] + weight;
      }
    }

    // for (let i = 0; i < adjList[node].length; i++) {
    //   let v = adjList[node][i][0];
    //   let weight = adjList[node][i][1];

    //   if (distance[node] + weight < distance[v]) {
    //     distance[v] = distance[node] + weight;
    //   }
    // }
  }

  // Loop through the  distance once more to check whether there is any cell of the array left with  Infinity
  for (let i = 0; i < noOfNodes; i++) {
    if (distance[i] === Infinity) {
      return -1;
    }
  }

  return distance;
}

function main() {
  let noOfNodes = 6;
  let edges = [
    [0, 1, 2],
    [0, 4, 1],
    [4, 5, 4],
    [4, 2, 2],
    [1, 2, 3],
    [2, 3, 6],
    [5, 3, 1],
  ];
  let noOfEdges = edges.length;

  let result = shortestPath(noOfNodes, edges, noOfEdges);
  for (let res of result) {
    console.log(res);
  }
  console.log();
}

main();

// Time Complexity: O(N+M) {for the topological sort} + O(N+M) {for relaxation of vertices, each node and its adjacent nodes get traversed} ~ O(N+M).

// Where N= number of vertices and M= number of edges.

// Space Complexity:  O( N) {for the stack storing the topological sort} + O(N) {for storing the shortest distance for each node} + O(N) {for the visited array} + O( N+2M) {for the adjacency list} ~ O(N+M) .

// Where N= number of vertices and M= number of edges.
