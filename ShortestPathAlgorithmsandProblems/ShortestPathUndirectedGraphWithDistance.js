// Approach:

// According to intuition, we will calculate the shortest path in an undirected graph having unit weights by using the Breadth First Search. BFS is a traversal technique where we visit the nodes level-wise, i.e., it visits the same level nodes simultaneously, and then moves to the next level.

// Initial configuration:

// Adjacency List: Create an adjacency list of the formed vector of pairs of size ‘N’, where each index denotes a node ‘u’ and contains a vector that consists of pairs denoting the adjacent nodes ‘v’ and the distance to that adjacent node from initial node ‘u’.
// Queue: Define a queue data structure to store the BFS traversal.
// Distance Array: Initialise this array by Max Integer value and then update the value for each node successively while calculating the shortest distance between the source and the current node.
// Resultant Array: Initialised with -1, this array stores the updated shortest distances from the source node after completion of the algorithm. The index which remains as -1 is said to be unreachable from the source node. This is required to return the answer according to the question.
// The shortest path in an undirected graph can be calculated by the following steps:

// Firstly, we convert the graph into an adjacency list which displays the adjacent nodes for each index represented by a node.
// Now, we create a dist array of size N initialized with a very large number which can never be the answer to indicate that initially, all the nodes are untraversed.
// Then, perform the standard BFS traversal.
// In every iteration, pick up the front() node, and then traverse for its adjacent nodes.  For every adjacent node, we will relax the distance to the adjacent node if (dist[node] + 1 < dist[adjNode]). Here dist[node] means the distance taken to reach the current node, and ‘1’ is the edge weight between the node and the adjNode. We will relax the edges if this distance is shorter than the previously taken distance. Every time a distance is updated for the adjacent node, we push that into the Queue with the increased distance.
// Let us understand it using an example below,

// Where nodes ‘1’ and ‘3’ are adjacent to node ‘0’.

// Once all the nodes have been iterated, the dist[] array will store the shortest paths.
// Create a resultant array and initialize it by -1 and put all the distances which are updated in the resultant array. If anyone still holds the Large Integer value which we assigned at the start, it means it is not reachable, and we don’t update our resultant array. The node which still remains marked as -1 is unreachable from the source node.
// Intuition:

// For finding the shortest path in an undirected graph with unit weight, the technique we use is the Breadth-First Search (BFS). Now, the question arises why do we use the BFS technique in finding the shortest path here when we could’ve easily used other standard graph shortest path algorithms to implement the same? If we start traversal from the src node, we move to other adjacent nodes, everyone is at a distance of 1, so everyone goes into the queue, then subsequently we get the next set of nodes at 1 more distance, making the distance to 2, and if you look at the queue closely, it will look something like below. Queue here acts as a sorted Queue, hence we don’t need any sorted ds which we generally require in the other graph algorithms.

function shortestPath(noOfNodes, edges, source) {
  // Let us create an adjacency list for our edges
  let adjList = Array.from({ length: noOfNodes }, () => []);
  for (let it of edges) {
    adjList[it[0]].push(it[1]);
    adjList[it[1]].push(it[0]);
  }

  //A dist array of size N initialised with a large number to
  //indicate that initially all the nodes are untraversed.
  let distance = new Array(noOfNodes).fill(Infinity);
  let queue = [];
  distance[source] = 0;
  queue.push(source);

  // Iterate through the queue till the queue is empty
  while (queue.length !== 0) {
    let node = queue.shift();

    for (let it of adjList[node]) {
      if (distance[node] + 1 < distance[it]) {
        distance[it] = distance[node] + 1;
        queue.push(it);
      }
    }
  }

  // Updated shortest distances are stored in the resultant array ‘ans’.
  // Unreachable nodes are marked as -1.
  let result = Array(noOfNodes).fill(-1);

  for (let i = 0; i < noOfNodes; i++) {
    if (distance[i] !== Infinity) {
      result[i] = distance[i];
    }
  }

  return result;
}

function main() {
  let edges = [
    [0, 1],
    [0, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [1, 2],
    [2, 6],
    [6, 7],
    [7, 8],
    [6, 8],
  ];
  let noOfNodes = 9;
  let source = 0;
  let result = shortestPath(noOfNodes, edges, source);

  for (let res of result) {
    console.log(res);
  }
  console.log();
}

main();

// Time Complexity: O(M) { for creating the adjacency list from given list ‘edges’} + O(N + 2M) { for the BFS Algorithm} + O(N) { for adding the final values of the shortest path in the resultant array} ~ O(N+2M).

// Where N= number of vertices and M= number of edges.

// Space Complexity:  O( N) {for the stack storing the BFS} + O(N) {for the resultant array} + O(N) {for the dist array storing updated shortest paths} + O( N+2M) {for the adjacency list} ~ O(N+M) .

// Where N= number of vertices and M= number of edges.
