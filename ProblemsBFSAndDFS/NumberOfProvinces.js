// There are n cities. Some of them are connected, while some are not.
// If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

// A province is a group of directly or indirectly connected cities and no other cities outside of the group.

// You are given an n x n matrix isConnected where isConnected[i][j] = 1
// if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

// Return the total number of provinces.

// Example 1:

// Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// Output: 2
// Example 2:

// Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// Output: 3

// Approach:
// A province is a group of directly or indirectly connected cities and no other cities outside of the group. Considering the above example, we can go from 1 to 2 as well as to 3, from every other node in a province we can go to each other. As we cannot go from 2 to 4 so it is not a province. We know about both the traversals, Breadth First Search (BFS) and Depth First Search (DFS). We can use any of the traversals to solve this problem because a traversal algorithm visits all the nodes in a graph. In any traversal technique, we have one starting node and it traverses all the nodes in the graph. Suppose there is an ‘N’ number of provinces so we need to call the traversal algorithm ‘N‘ times, i.e., there will be ‘N’ starting nodes. So, we just need to figure out the number of starting nodes.

// The algorithm steps are as follows:

// We need a visited array initialized to 0, representing the nodes that are not visited.
// Run the for loop looping from 0 to N, and call the DFS for the first unvisited node.
// DFS function call will make sure that it starts the DFS call from that unvisited node, and visits all the nodes that are in that province, and at the same time, it will also mark them as visited.
// Since the nodes traveled in a traversal will be marked as visited, they will no further be called for any further DFS traversal.
// Keep repeating these steps, for every node that you find unvisited, and visit the entire province.
// Add a counter variable to count the number of times the DFS function is called, as in this way we can count the total number of starting nodes, which will give us the number of provinces.

//function NumberOfProvinces() {}

function dfs(node, adjList, visited) {
  visited[node] = 1;

  for (let it of adjList[node]) {
    if (!visited[it]) {
      dfs(it, adjList, visited);
    }
  }

  return;
}
function numProvinces(noOfNodes, maxtrix) {
  let adjList = Array.from({ length: noOfNodes + 1 }, () => []);

  for (let i = 0; i < noOfNodes; i++) {
    for (j = 0; j < noOfNodes; j++) {
      // Self-nodes are not considered
      if (maxtrix[i][j] === 1 && i !== j) {
        adjList[i].push(j);
        adjList[j].push(i);
      }
      console.log(adjList);
    }
  }

  let visited = new Array(noOfNodes).fill(0);
  let count = 0;

  for (let i = 0; i < noOfNodes; i++) {
    if (!visited[i]) {
      // counter to count the number of provinces
      count++;
      dfs(i, adjList, visited);
    }
  }

  return count;
}

function printResult(result) {
  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }
}

// Time Complexity: O(N) + O(V+2E),
// Where O(N) is for outer loop and inner loop runs in total a single DFS over entire graph,
// and we know DFS takes a time of O(V+2E).

// Space Complexity: O(N) + O(N),Space for recursion stack space and visited array.
function main() {
  let maxtrix = [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
  ];
  let noOfNodes = maxtrix.length;
  let result = numProvinces(noOfNodes, maxtrix);
  console.log(result);
}

main();
