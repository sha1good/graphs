// // Approach:
// // We’ll be using Dijkstra’s Algorithm with a slight modification for solving this particular problem.

// // Initial configuration:

// // Source Node: Before starting off with the Algorithm, we need to define a source node from which the shortest distances to every other node would be calculated.
// // Priority Queue: Define a Priority Queue which would contain pairs of the type {dist, node}, where ‘dist’ indicates the currently updated value of the shortest distance from the source to the ‘node’.
// // Dist Array: Define a dist array initialized with a large integer number at the start indicating that the nodes are unvisited initially. This array stores the shortest distances to all the nodes from the source node.
// // Parent Array: This array’s sole purpose is to store the parent of a particular node i.e., the node from where that node came while traversing through the graph by Dijkstra’s Algorithm.
// // The Algorithm consists of the following steps :

// // We start by initializing an adjacency list which will store all the adjacent nodes for a particular node along with the weights associated with them.
// // Then, as a part of the initial configuration, we define a dist array to store the updated shortest distances for each node, a priority queue for storing the distance-node pairs, and a source node.
// // In addition to this, we also declare a ‘parent’ array which would store the parent node for each node and will update itself to a different parent if a shorter path from a node is found at some point in time.
// // At the start, all nodes’ parents have been set to the nodes themselves to indicate that the traversal has not yet been started.
// // For every node at the top of the queue, we pop the element out and look out for its adjacent nodes. If the current reachable distance is better than the previous distance (dis + edW < dist[adjNode]), indicated by the distance array, we update the distance and push it into the queue.
// // A node with a lower distance would be at the top of the priority queue as opposed to a node with a higher distance because we are using a min-heap.
// // In addition to the previous step, we will also update the parent array to the node from where the current node came while traversing.
// // By following step 5 repeatedly until our queue becomes empty, we would get the minimum distance from the source node to all other nodes and also our parent array would be updated according to the shortest path.
// // Now, we run a loop starting from the destination node storing the node’s parent and then moving to the parent again (backtrack) till the parent[node] becomes equal to the node itself.
// // At last, we reverse the array in which the path is being stored as the path is in reverse order. Finally, we return the ‘path’ array.
// // Here’s a quick demonstration of the algorithm :

// // In a similar way, we can perform the iterations for all the other nodes and hence return the path.

// // Note: If you wish to see the dry run of the above approach, you can watch the video attached to this article.

// // Intuition:

// // The intuition behind the above problem is based on Dijkstra’s Algorithm with a combination of a little bit of memoization in order to print the shortest possible path and not just calculate the shortest distance between the source and the destination node. In order to print the path we will try to remember the node from which we came while traversing each node by Dijkstra’s Algorithm along with calculating the shortest distance.

// // An array called ‘parent’ can be used for this purpose which would store the parent node for each node and will update itself if a shorter path from a node is found at some point in time. This will help us to print the path easily at the end by backtracking through the parent array till we reach the source node.

function MinHeap(compare) {
  let heap = [];

  function enqueue(element) {
    heap.push(element);
    heapifyUp();
  }

  function dequeue() {
    if (isEmpty()) {
      return null;
    }

    if (heap.length === 1) {
      return heap.pop();
    }

    const root = heap[0];
    heap[0] = heap.pop();
    heapifyDown();

    return root;
  }

  function isEmpty() {
    return heap.length === 0;
  }

  function heapifyUp() {
    let index = heap.length - 1; // get the  index of the last element from the heap
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (compare(heap[index], heap[parentIndex])) {
        swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  function heapifyDown() {
    let index = 0;
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestChildIndex = index;

      if (
        leftChildIndex < heap.length &&
        compare(heap[leftChildIndex], heap[smallestChildIndex])
      ) {
        smallestChildIndex = leftChildIndex;
      }
      if (
        rightChildIndex < heap.length &&
        compare(heap[rightChildIndex], heap[smallestChildIndex])
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex !== index) {
        swap(index, smallestChildIndex);
        index = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }

  return { enqueue, dequeue, isEmpty };
}
function dijkstra(noOfNodes, edges, source) {
  // Create an adjacency list of pairs of the form node1 -> {node2, edge weight}
  // where the edge weight is the weight of the edge from node1 to node2.
  const adj = Array.from(Array(noOfNodes + 1), () => []);
  let parent = Array(noOfNodes + 1).fill(0);

  for (let i = 1; i <= noOfNodes; i++) parent[i] = i;

  for (let it of edges) {
    adj[it[0]].push([it[1], it[2]]);
    adj[it[1]].push([it[0], it[2]]);
  }
  // Create a priority queue for storing the nodes as a pair {dist,node}
  // where dist is the distance from source to the node.
  const pq = new MinHeap((a, b) => a[0] < b[0]);

  // Initialising distTo list with a large number to
  // indicate the nodes are unvisited initially.
  // This list contains distance from source to the nodes.
  const distance = new Array(noOfNodes + 1).fill(Infinity);

  // Source initialised with dist=0.
  distance[source] = 0;
  pq.enqueue([source, 0]);

  // Now, pop the minimum distance node first from the min-heap
  // and traverse for all its adjacent nodes.
  while (!pq.isEmpty()) {
    let [node, dist] = pq.dequeue();
    // Check for all adjacent nodes of the popped out
    // element whether the prev dist is larger than current or not.

    for (let [v, weight] of adj[node]) {
      //   let v = it[0]
      //   let weight = it[1]

      if (dist + weight < distance[v]) {
        distance[v] = dist + weight;
        // If current distance is smaller,
        // push it into the queue.
        pq.enqueue([v, dist + weight]);
        // Update the parent of the adjNode to the recent
        // node where it came from.
        parent[v] = node;
      }
    }
  }

  // If distance to a node could not be found, return an array containing -1.
  if (distance[noOfNodes] === Infinity) return [-1];

  // Store the final path in the ‘path’ array.
  let path = [];
  let currentNode = noOfNodes;

  // Iterate backwards from destination to source through the parent array.
  while (parent[currentNode] !== currentNode) {
    path.push(currentNode);
    currentNode = parent[currentNode];
  }

  //Now the  final element will not satify the above condition, so we
  // we need to push it manually to our path
  path.push(1);

  // Since the path stored is in a reverse order, we reverse the array
  // to get the final answer and then return the array.
  return path.reverse();
}

function main() {
  const noOfNodes = 5;
  let source = 1;
  const edges = [
    [1, 2, 2],
    [2, 5, 5],
    [2, 3, 4],
    [1, 4, 1],
    [4, 3, 3],
    [3, 5, 1],
  ];
  let result = dijkstra(noOfNodes, edges, source);
  for (let res of result) {
    console.log(res);
  }

  console.log();
}

main();

// Time Complexity: O( E log(V) ) { for Dijkstra’s Algorithm } + O(V) { for backtracking in order to find the parent for each node } Where E = Number of edges and V = Number of Nodes.

// Space Complexity: O( |E| + |V| ) { for priority queue and dist array } + O( |V| ) { for storing the final path } Where E = Number of edges and V = Number of Nodes.
