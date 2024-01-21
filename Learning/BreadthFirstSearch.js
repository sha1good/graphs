// Breadth First Search (BFS): Level Order Traversal
// Problem Statement: Given an undirected graph,
//return a vector of all nodes by traversing the graph using breadth-first search (BFS).

// Approach:
// Initial Configuration:

// Queue data structure: follows FIFO, and will always contain the starting.
// Visited array: an array initialized to 0
// In BFS, we start with a “starting” node, mark it as visited, and push it into the queue data structure.
// In every iteration, we pop out the node ‘v’ and put it in the solution vector, as we are traversing this node.
// All the unvisited adjacent nodes from ‘v’ are visited next and are pushed into the queue. The list of adjacent neighbors of the node can be accessed from the adjacency list.
// Repeat steps 2 and 3 until the queue becomes empty, and this way you can easily traverse all the nodes in the graph.
// In this way, all the nodes are traversed in a breadthwise manner.

class Solution {
  // Function to return Breadth First Traversal of given graph.
  bfsOfGraph(noOfNodes, adj) {
    const visited = new Array(noOfNodes).fill(0);
    visited[0] = 1; // the first  node in the graphs has been visited
    const queue = []; // First in first out

    // push the initial starting node  to the queue
    queue.push(0);

    //Declare your Breadth First Search
    const bfs = [];
    // iterate till the queue is empty
    while (queue.length !== 0) {
      // get the first element in the queue  out
      const node = queue.shift();
      // Now store it in your bfs
      bfs.push(node);
      // traverse for all its neighbours  after removing it
      for (const neighbor of adj[node]) {
        // if the neighbour has previously not been visited,
        //  mark as visited  and store in Queue
        if (!visited[neighbor]) {
          visited[neighbor] = 1;
          queue.push(neighbor);
        }
      }
    }

    return bfs;
  }
}

function printResult(result) {
  for (let i = 0; i < result.length; i++) {
    console.log(result[i] + " ");
  }
}

function addEdge(adj, u, v) {
  adj[u].push(v);
  adj[v].push(u); // for undirected graph
}
function main() {
  const adj = Array.from({ length: 5 }, () => []);
  //const adj = new Array(5);

  addEdge(adj, 0, 1);
  addEdge(adj, 1, 2);
  addEdge(adj, 1, 3);
  addEdge(adj, 0, 4);

  const obj = new Solution();
  const result = obj.bfsOfGraph(5, adj);
  console.log(result);
  printResult(result);
}

main();

//Using function througthout

function bfsOfGraphUtil(noOfNodes, adj) {
  let visited = new Array(noOfNodes).fill(0);
  visited[0] = 1;

  let queue = [];
  queue.push(0);

  let bfs = [];
  // iterate till the queue is empty
  while (queue.length !== 0) {
    //get the first elemnt you push into the queue out.... first in first out
    let node = queue.shift();
    bfs.push(node);
    //iterate through the  neighbour of the current node you are in

    for (let neighbor of adj[node]) {
      // Check if the neighbourhood has  not been visited, visit  them and marked  store them in the queue
      if (!visited[neighbor]) {
        visited[neighbor] = 1;
        queue.push(neighbor);
      }
    }
  }
  return bfs;
}

function addEdgeUtil(adj, u, v) {
  adj[u].push(v);
  adj[v].push(u); // for undirected graph
  console.log(adj);
}
function printResultOutput(result) {
  for (let i = 0; i < result.length; i++) {
    console.log(" The result out for this bfs is: " + result[i]);
  }
}

function mainMethod() {
  const adj = Array.from({ length: 5 }, () => []);
  console.log(adj);

  addEdgeUtil(adj, 0, 1);
  addEdgeUtil(adj, 1, 2);
  addEdgeUtil(adj, 1, 3);
  addEdgeUtil(adj, 0, 4);

  const result = bfsOfGraphUtil(5, adj);

  printResultOutput(result);
}

// Output: 0 1 4 2 3
// Time Complexity: O(N) + O(2E), Where N = Nodes, 2E is for total degrees as we traverse all adjacent nodes.
// Space Complexity: O(3N) ~ O(N), Space for queue data structure visited array and an adjacency list
mainMethod();
