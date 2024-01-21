// Problem Statement: Given a Directed Acyclic Graph (DAG) with V vertices and E edges, Find any Topological Sorting of that Graph.

// Input: V = 4, E = 3

// Result: 3, 2, 1, 0
// Explanation: The necessary conditions for the ordering are:
// For edge 1 -> 0 node 1 must appear before node 0.
// For edge 2 -> 0 node 1 must appear before node 0.
// For edge 3 -> 0 node 1 must appear before node 0.

// [2, 3, 1, 0] is also another topological sorting for the graph.
// We will be solving it using the DFS traversal technique. DFS goes in-depth, i.e., traverses all nodes by going ahead, and when there are no further nodes to traverse in the current path, then it backtracks on the same path and traverses other unvisited nodes.

// The algorithm steps are as follows:

// We must traverse all components of the graph.
// Make sure to carry a visited array(all elements are initialized to 0) and a stack data structure, where we are going to store the nodes after completing the DFS call.
// In the DFS call, first, the current node is marked as visited. Then DFS call is made for all its adjacent nodes.
// After visiting all its adjacent nodes, DFS will backtrack to the previous node and meanwhile, the current node is pushed into the stack.
// Finally, we will get the stack containing one of the topological sortings of the graph.
// Note: If you wish to see the dry run of the above approach, you can watch the video attached to this article.

// Let’s quickly understand the algorithm considering the following graph:

// DFS will start from node 0 and mark it as visited. But it has no adjacent nodes. So the DFS will return putting node 0 into the stack( stack: {0} ).
// Then DFS will again start from node 1 and mark it as visited, but it also has no adjacent nodes. So node 1 is pushed into the stack( stack: {1, 0} ) and the DFS call will be over.
// Then DFS will start from node 2 and mark it as visited as well. It will again call DFS for its adjacent node 3 and mark 3 as visited. After visiting node 3, it will find out that only adjacent node 1 is previously visited.
// So it will backtrack to node 2, putting node 3 first and then node 2 into the stack ( stack: {2, 3, 1, 0} ).
// Again, DFS will start from node 4 and mark it as visited. It will find all its adjacent nodes 0 and 1 have been previously visited. So, node 4 will be pushed into the stack( stack: {4, 2, 3, 1, 0} ).
// Lastly, DFS will start from node 5 and mark it as visited. Again, it will find all its adjacent nodes 0 and 2 are previously visited. So, it will return putting node 5 into the stack( stack: {5, 4, 2, 3, 1, 0} ).
// Finally, the stack will contain {5, 4, 2, 3, 1, 0}, which is one of the topological sortings of the graph.
// Let’s understand how the linear orderings are maintained considering the following simple graph:

// The linear ordering for the above graph can be 1, 2, 3, 4, 5, 6 or 1, 2, 3, 4, 6, 5. If we closely observe this algorithm, it is designed in such a way that when the DFS call for a node is completed, the node is always kept in the stack. So for example, if the DFS call for 3 is over, we must have the nodes 3, 4, 5, and 6 linearly ordered in the stack. And this is true for every other node. Thus the linear ordering is always maintained for each node of the graph.

// Intuition:

// Since we are inserting the nodes into the stack after the completion of the traversal, we are making sure, there will be no one who appears afterward but may come before in the ordering as everyone during the traversal would have been inserted into the stack.

// Note: Points to remember, that node will be marked as visited immediately after making the DFS call and before returning from the DFS call, the node will be pushed into the stack.

function dfs(node, stack, visited, adj) {
  visited[node] = 1;

  for (let adjacentNode of adj[node]) {
    if (!visited[adjacentNode]) {
      dfs(adjacentNode, stack, visited, adj);
    }
  }

  return stack.push(node);
}

function topoSort(noOfNodes, adj) {
  let visited = Array(noOfNodes + 1).fill(0);
  let stack = [];
  let result = [];

  // traverse through your nodes
  for (let i = 0; i < noOfNodes; i++) {
    if (!visited[i]) {
      dfs(i, stack, visited, adj);
    }
  }

  // Now, Iterate through the stack till it is empty
  while (stack.length !== 0) {
    result.push(stack.pop());
  }

  return result;
}

function printResult(result) {
  for (let res of result) {
    console.log(res);
  }
}

function main() {
  let adjList = [[], [], [3], [1], [0, 1], [0, 2]];
  let noOfNodes = adjList.length;

  let result = topoSort(noOfNodes, adjList);

  printResult(result);
}

// Time Complexity: O(V+E)+O(V), where V = no. of nodes and E = no. of edges.
//There can be at most V components. So, another O(V) time complexity.

// Space Complexity: O(2N) + O(N) ~ O(2N): O(2N) for
// the visited array and the stack carried during
//DFS calls and O(N) for recursive stack space, where N = no. of nodes.
main();
