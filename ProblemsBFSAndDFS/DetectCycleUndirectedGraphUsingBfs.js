// Initial configuration:
// Queue: Define a queue and insert the source node along with parent data (<source node, parent>). For example, (2, 1) means 2 is the source node and 1 is its parent node.
// Visited array: an array initialized to 0 indicating unvisited nodes.
// The algorithm steps are as follows:

// For BFS traversal, we need a queue data structure and a visited array.
// Push the pair of the source node and its parent data (<source, parent>) in the queue, and mark the node as visited. The parent will be needed so that we don’t do a backward traversal in the graph, we just move frontwards.
// Start the BFS traversal, pop out an element from the queue every time and travel to all its unvisited neighbors using an adjacency list.
// Repeat the steps either until the queue becomes empty, or a node appears to be already visited which is not the parent, even though we traveled in different directions during the traversal, indicating there is a cycle.
// If the queue becomes empty and no such node is found then there is no cycle in the graph.
// A graph can have connected components as well. In such cases, if any component forms a cycle then the graph is said to have a cycle. We can follow the algorithm for the same:

function detectCycleUtil(node, adjList, visited) {
  //Visit the first node and marked it visited
  visited[node] = 1;
  // Create a queue to store each node and its parent
  let queue = [];
  queue.push([0, -1]);
  // traverse until queue is not empty
  while (queue.length !== 0) {
    // remove the currnent node  and its parent and check of neighboring  or adjacent nodes
    let [currentNode, parent] = queue.shift();
    //Loop  through the curent Node neighbour
    for (let adjacentNode of adjList[currentNode]) {
      // if adjacent node is unvisited
      if (!visited[adjacentNode]) {
        visited[adjacentNode] = 1;
        queue.push(adjacentNode, currentNode);
      }
      // if adjacent node is visited and is not it's own parent node
      else if (parent !== adjacentNode) {
        return true;
      }
    }
  }

  // // otherwise there's no cycle
  return false;
}
function detectCycleUsingBfs(noOfNodes, adjList) {
  // initialise  all the  as unvisited
  let visited = new Array(noOfNodes).fill(0);
  // Look through all those nodes and check Whether they are cycle
  for (let i = 0; i < noOfNodes; i++) {
    if (!visited[i]) {
      if (detectCycleUtil(i, adjList, visited)) return true;
    }
  }
  return false;
}
// function addEdgeUtil(adjList, u, v) {
//   adjList[u].push(v);
//   adjList[v].push(u);
//   console.log(adjList);
// }
function main() {
  let noOfNodes = 4;
  let adjList = [[], [2], [1, 3], [2]];

  //   addEdgeUtil(adjList, "", "");
  //   addEdgeUtil(adjList, 2, "");
  //   addEdgeUtil(adjList, 1, 3);
  //   addEdgeUtil(adjList, 2, 0);

  const result = detectCycleUsingBfs(noOfNodes, adjList);
  console.log(+result);   // I used the unary operator + here because I want to change false boolean to number 0
}

// Time Complexity: O(N + 2E) + O(N), Where N = Nodes, 2E is for total degrees as we traverse all adjacent nodes. 
// In the case of connected components of a graph, it will take another O(N) time.

// Space Complexity: O(N) + O(N) ~ O(N), Space for queue data structure and visited array.
main();
