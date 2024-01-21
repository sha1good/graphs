// You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

// You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.

// Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.

// Example 1:

// Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
// Output: 4
// Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
// The four ways to get there in 7 minutes are:
// - 0 ➝ 6
// - 0 ➝ 4 ➝ 6
// - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
// - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
// Example 2:

// Input: n = 2, roads = [[1,0,10]]
// Output: 1
// Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.

// Approach:

// This problem is based on Dijkstra’s Algorithm where we count all the possible shortest paths from the source to the destination node.

// Initial configuration:

// Priority Queue: Define a Priority Queue which would contain pairs of the type {dist, node }, where ‘dist’ indicates the currently updated value of the shortest dist taken to reach from source to the current ‘node’.
// Distance Array: Define a distance array that would contain the minimum distance from the start node to the current node. If a cell is marked as ‘infinity’ then it is treated as unreachable/ unvisited.
// Source Node: Define the start node from where we have to calculate the total number of shortest paths.
// Ways Array: Define a ways array which would contain the number of possible shortest ways/paths for each node. Eventually, we would want to return ways[n-1] where n= Number of nodes.
// The Algorithm consists of the following steps :

// Start by creating an adjacency list, a priority queue that stores the dist-node pairs in the form {dist, node} and a dist array with each node initialized with a very large number ( to indicate that the nodes have not been visited initially).
// In addition to the standard configuration of Dijkstra’s algorithm, we have one more array in this problem by the name ‘ways’ which is initialized to ‘0’ for every node when they’re unvisited (so the number of ways is 0).
// Now, we push the start node to the queue along with its distance marked as ‘0’ and ways marked as ‘1’ initially because we’ve just started the algorithm.
// Pop the element from the front of the queue and look out for its adjacent nodes.
// If the current dist value for a number is better than the previous distance indicated by the distance array, we update the distance in the array and push it to the queue. Now, here side by side we also keep the number of ways to the ‘node’ the same as before.
// If the current dist value is the same as the previously stored dist value at the same index, increment the number of ways by 1 at that index.
// We repeat the above steps until the queue becomes empty or till we reach the destination.
// Return the ways[n-1] modulo 10^9+7 when the queue becomes empty.

function countPaths(noOfNodes, edges, source) {
  // Creating an adjacency list for the given graph.
  let adjList = Array.from({ length: noOfNodes + 1 }, () => []);

  for (let it of edges) {
    adjList[it[0]].push([it[1], it[2]]);
    adjList[it[1]].push([it[0], it[2]]);
  }

  let pq = [];

  pq.push([source, 0]);

  // Initializing the dist array and the ways array
  // along with their first indices.
  let ways = Array(noOfNodes + 1).fill(0);
  ways[source] = 1;

  let distance = Array(noOfNodes + 1).fill(Infinity);
  distance[source] = 0;

  let mod = 1e9 + 7;

  // Iterate through the graph with the help of priority queue
  // just as we do in Dijkstra's Algorithm.
  while (pq.length !== 0) {
    pq.sort((a, b) => a[2] - b[2]); // Sorting them base on their distance
    let [node, dist] = pq.shift();

    for (let [adjacentNode, edgeWeight] of adjList[node]) {
      // This ‘if’ condition signifies that this is the first
      // time we’re coming with this short distance, so we push
      // in PQ and keep the no. of ways the same.
      if (dist + edgeWeight < distance[adjacentNode]) {
        distance[adjacentNode] = dist + edgeWeight;
        pq.push([adjacentNode, dist + edgeWeight]);
        ways[adjacentNode] = ways[node];
      }
      // If we again encounter a node with the same short distance
      // as before, we simply increment the no. of ways.
      else if (dist + edgeWeight === distance[adjacentNode]) {
        ways[adjacentNode] = (ways[adjacentNode] + ways[node]) % mod;
      }
    }
  }

  return ways[noOfNodes] % mod;
}

function main() {
  // Driver Code
  let noOfNodes = 6;

  let edges = [
    [0, 6, 7],
    [0, 1, 2],
    [1, 2, 3],
    [1, 3, 3],
    [6, 3, 3],
    [3, 5, 1],
    [6, 5, 1],
    [2, 5, 1],
    [0, 4, 5],
    [4, 6, 2],
  ];

  let source = 0;

  let result = countPaths(noOfNodes, edges, source);

  console.log(result);
}

main();


// Time Complexity: O( E* log(V)) { As we are using simple Dijkstra’s algorithm here, the time complexity will be or the order E*log(V)}

// Where E = Number of edges and V = No. of vertices.

// Space Complexity :  O(N) { for dist array + ways array + approximate complexity for priority queue }

// Where, N = Number of nodes.