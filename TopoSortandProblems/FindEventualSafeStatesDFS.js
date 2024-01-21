// Solution:

// A terminal node is a node without any outgoing edges(i.e outdegree = 0). Now a node is considered to be a safe node if all possible paths starting from it lead to a terminal node. Here we need to find out all safe nodes and return them sorted in ascending order.

// If we closely observe, all possible paths starting from a node are going to end at some terminal node unless there exists a cycle and the paths return back to themselves. Let’s understand it considering the below graph:

// In the above graph, there exists a cycle i.e 0->1->3->0, and node 7 is connected to the cycle with an incoming edge towards the cycle.
// Some paths starting from these nodes are definitely going to end somewhere in the cycle and not at any terminal node. So, these nodes are not safe nodes.
// Though node 2 is connected to the cycle, the edge is directed outwards the cycle and all the paths starting from it lead to the terminal node 5. So, it is a safe node and the rest of the nodes (4, 5, 6) are safe nodes as well.
// So, the intuition is to figure out the nodes which are either a part of a cycle or incoming to the cycle. We can do this easily using the cycle detection technique that was used previously to detect cycles in a directed graph (using DFS).

// Note: Points to remember that any node which is a part of a cycle or leads to the cycle through an incoming edge towards the cycle, cannot be a safe node. Apart from these types of nodes, every node is a safe node.

// Approach:
// We will be solving it using DFS traversal. DFS goes in-depth, i.e., traverses all nodes by going ahead, and when there are no further nodes to traverse in the current path, then it backtracks on the same path and traverses other unvisited nodes.

// The algorithm steps are as follows:

// We must traverse all components of the graph.
// Make sure to carry two visited arrays in the DFS call. One is a visited array(vis) and the other is a path-visited(pathVis) array. The visited array keeps a track of visited nodes, and the path-visited keeps a track of visited nodes in the current traversal only.
// Along with that, we will be carrying an extra array(check) to mark the safe nodes.
// While making a DFS call, at first we will mark the node as visited in both the arrays and then will traverse through its adjacent nodes. Now, there may be either of the three cases:
// Case 1: If the adjacent node is not visited, we will make a new DFS call recursively with that particular node.
// Case 2: If the adjacent node is visited and also on the same path(i.e marked visited in the pathVis array), we will return true, because it means it has a cycle, thereby the pathVis was true. Returning true will mean the end of the function call, as once we have got a cycle, there is no need to check for further adjacent nodes.
// Case 3: If the adjacent node is visited but not on the same path(i.e not marked in the pathVis array), we will continue to the next adjacent node, as it would have been marked as visited in some other path, and not on the current one.
// Finally, if there are no further nodes to visit, we will mark the node as safe in the check array and unmark the current node in the pathVis array and just return false. Then we will backtrack to the previous node with the returned value.
// The Point to remember is, while we enter we mark both the pathVis and vis as true, but at the end of traversal to all adjacent nodes, we just make sure to mark the current node safe and unmark the pathVis and still keep the vis marked as true, as it will avoid future extra traversal calls.

function dfs(node, adjList, visited, pathVis) {
  visited[node] = 1;
  pathVis[node] = 1;
  // traverse through all the adjacent nodes
  for (let adjacentNode of adjList[node]) {
    if (!visited[adjacentNode]) {
      if (dfs(adjacentNode, adjList, visited, pathVis) === true) {
        return true;
      }
    } else if (pathVis[adjacentNode]) {
      return true;
    }
  }

  pathVis[node] = 0;
  return false;
}

function eventualSafeNode(noOfNodes, adjList) {
  let visited = Array(noOfNodes + 1).fill(0);
  let pathVis = Array(noOfNodes + 1).fill(0);
  let result = [];
  // transverse through the  node
  for (let i = 0; i < noOfNodes; i++) {
    if (!visited[i]) {
      dfs(i, adjList, visited, pathVis);
    }
  }

  // Now, loop through all the nodes and return the path visited that is equal to 0
  // That is, that is your safe node
  for (let i = 0; i < noOfNodes; i++) {
    if (!pathVis[i]) {
      result.push(i);
    }
  }
  return result;
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
  ];
  let V = adj.length;

  let safeNodes = eventualSafeNode(V, adj);

  for (let node of safeNodes) {
    console.log(node);
  }

  console.log();
}

main();

// Time Complexity: O(V+E)+O(V), where V = no. of nodes and E = no. of edges.
// There can be at most V components. So, another O(V) time complexity.

// Space Complexity: O(3N) + O(N) ~ O(3N): O(3N)
// for three arrays required during dfs calls and O(N) for recursive stack space.
