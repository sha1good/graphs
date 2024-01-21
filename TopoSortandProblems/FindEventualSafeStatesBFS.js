// There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

// A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

// Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

// Example 1:

// Illustration of graph
// Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
// Output: [2,4,5,6]
// Explanation: The given graph is shown above.
// Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
// Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
// Example 2:

// Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
// Output: [4]
// Explanation:
// Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.

// Constraints:

// n == graph.length
// 1 <= n <= 104
// 0 <= graph[i].length <= n
// 0 <= graph[i][j] <= n - 1
// graph[i] is sorted in a strictly increasing order.
// The graph may contain self-loops.
// The number of edges in the graph will be in the range [1, 4 * 104].

// Initially the terminal nodes are those who have outdegree 0
// but after reversal the terminal nodes becomes those which have indegree 0
// so we can apply Kahn's algo to find all the nodes connected to it  which have linear dependency on the terminal node or is on the path which leads to terminal node
// so if the nodes is a part of a cycle or points to a cycle , that path cannot lead to terminal node as each node in that  path will have cyclic dependency

// A terminal node is a node without any outgoing edges(i.e outdegree = 0). Now a node is considered to be a safe node if all possible paths starting from it lead to a terminal node. Here we need to find out all safe nodes and return them sorted in ascending order. If we closely observe, all possible paths starting from a node are going to end at some terminal node unless there exists a cycle and the paths return back to themselves. Let’s understand it considering the below graph:

// In the above graph, there exists a cycle i.e 0->1->3->0, and node 7 is connected to the cycle with an incoming edge towards the cycle.
// Some paths starting from these nodes are definitely going to end somewhere in the cycle and not at any terminal node. So, these nodes are not safe nodes.
// Though node 2 is connected to the cycle, the edge is directed outwards the cycle and all the paths starting from it lead to the terminal node 5. So, it is a safe node and the rest of the nodes (4, 5, 6) are safe nodes as well.
// So, the intuition is to figure out the nodes which are neither a part of a cycle nor connected to the cycle. We have previously solved this problem using the DFS traversal technique. Now, we are going to solve it using the BFS traversal technique especially using the topological sort algorithm. The topological sort algorithm will automatically exclude the nodes which are either forming a cycle or connected to a cycle. Note: Points to remember that any node which is a part of a cycle or leads to the cycle through an incoming edge towards the cycle, cannot be a safe node. Apart from these types of nodes, every node is a safe node.

// Approach:
// The node with outdegree 0 is considered to be a terminal node but the topological sort algorithm deals with the indegrees of the nodes. So, to use the topological sort algorithm, we will reverse every edge of the graph. Now, the nodes with indegree 0 become the terminal nodes. After this step, we will just follow the topological sort algorithm as it is.

// We will apply the BFS(Breadth First Search) traversal technique. Breadth First Search or BFS is a traversal technique where we visit the nodes level-wise, i.e., it visits the same level nodes simultaneously, and then moves to the next level.

// Initial Configuration:
// Indegree Array: Initially all elements are set to 0. Then, We will count the incoming edges for a node and store it in this array. For example, if indegree of node 3 is 2, indegree[3] = 2. If you don’t know how to find indegrees, you can refer to the step 2 in the algorithm.

// Queue: As we will use BFS, a queue is required. Initially, the node with indegree 0 will be pushed into the queue.

// safeNodes array: Initially empty and is used to store the safe nodes.

// The algorithm steps are as follows:

// First, we will reverse all the edges of the graph so that we can apply the topological sort algorithm afterward.
// Then, we will calculate the indegree of each node and store it in the indegree array. We can iterate through the given adj list, and simply for every node u->v, we can increase the indegree of v by 1 in the indegree array.
// Then, we will push the node(s) with indegree 0 into the queue.
// Then, we will pop a node from the queue including the node in our safeNodes array, and for all its adjacent nodes, we will decrease the indegree of that node by one. For example, if node u that has been popped out from the queue has an edge towards node v(u->v), we will decrease indegree[v] by 1.
// After that, if for any node the indegree becomes 0, we will push that node again into the queue.
// We will repeat steps 3 and 4 until the queue is completely empty. Finally, completing the BFS we will get the linear ordering of the nodes in the safeNodes array.
// Finally, the safeNodes array will only consist of the nodes that are neither a part of any cycle nor connected to any cycle. Then we will sort the final safeNodes array as the question requires the answer in sorted order.

function eventualSafeNodes(noOfNodes, adj) {
  // First, you have to reverse the node from outdegree to indegree
  let adjListRev = Array.from({ length: noOfNodes }, () => []);
  let indegree = Array(noOfNodes).fill(0);

  // Cos we can have multiple connected component
  // Loop throgh all the  nodes and for each each one, there is going to be
  // and adjacency list to get  your indegree from
  for (let i = 0; i < noOfNodes; i++) {
    for (let adjacentNode of adj[i]) {
      // i -> it  before
      // it -> i  nOw
      adjListRev[adjacentNode].push(i);
      indegree[i]++;
    }
  }

  // Loop through the node again to get the ones whose indegree value is 0
  // remove them and push them to your queue
  let queue = [];
  let result = [];
  for (let i = 0; i < noOfNodes; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  // traverse the whole  queue util it becomes empty and get the first element out

  while (queue.length !== 0) {
    let node = queue.shift();
    result.push(node);

    // Loop throgh the adjency node of this current node
    // and reduce the indegree value of those adjacency node
    // Once the indegree of that adjacency node becomes zero,
    // save it to the queue as well
    for (let adjacentNode of adjListRev[node]) {
      //
      indegree[adjacentNode]--;
      if (indegree[adjacentNode] === 0) {
        queue.push(adjacentNode);
      }
    }
  }

  return result.sort((a, b) => a - b);
}

function main() {
  let adj = [
    [1],
    [2],
    [3, 4],
    [4, 5],
    [6],
    [6],
    [7],
    [],
    [1, 9],
    [10],
    [8],
    [9],
  ]; //[[1, 2], [2, 3], [5], [0], [5], [], []];
  let noOfNodes = adj.length;

  let result = eventualSafeNodes(noOfNodes, adj);
  for (let res of result) {
    console.log(res);
  }

  console.log();
}

main();

function eventualSafeNode(V, adj) {
  let adjRev = Array.from({ length: V }, () => []);
  let indegree = Array(V).fill(0);

  // Reverse the edges to get the reversed adjacency list
  for (let i = 0; i < V; i++) {
    for (let it of adj[i]) {
      adjRev[it].push(i);
      indegree[i]++;
    }
  }

  let q = [];
  let safeNodes = [];

  // Enqueue nodes with zero indegree
  for (let i = 0; i < V; i++) {
    if (indegree[i] === 0) {
      q.push(i);
    }
  }

  while (q.length !== 0) {
    let node = q.shift();
    safeNodes.push(node);

    // Reduce the indegree of adjacent nodes
    for (let it of adjRev[node]) {
      indegree[it]--;
      if (indegree[it] === 0) {
        q.push(it);
      }
    }
  }

  return safeNodes.sort((a, b) => a - b);
}

console.log("=================================");

function Ola() {
  let adj = [
    [1],
    [2],
    [3, 4],
    [4, 5],
    [6],
    [6],
    [7],
    [],
    [1, 9],
    [10],
    [8],
    [9],
  ];
  let V = adj.length;

  let safeNodes = eventualSafeNode(V, adj);

  for (let node of safeNodes) {
    console.log(node);
  }

  console.log();
}

Ola();

// Time Complexity: O(V+E)+O(N*logN), where V = no. of nodes 
// and E = no. of edges. This is a simple BFS algorithm. Extra O(N*logN) for sorting the safeNodes array, 
// where N is the number of safe nodes.

// Space Complexity: O(N) + O(N) + O(N) ~ O(3N), O(N) for the indegree array, 
// O(N) for the queue data structure used in BFS(where N = no.of nodes), 
// and extra O(N) for the adjacency list to store the graph in a reversed order.