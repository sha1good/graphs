// Approach:
// We’ll be using Priority Queue in this approach for finding the shortest distances from the source node to every other node through Dijkstra’s Algorithm.

// Initial configuration:

// Source Node: Before starting off with the Algorithm, we need to define a source node from which the shortest distances to every other node would be calculated.
// Priority Queue: Define a Priority Queue which would contain pairs of the type {dist, node}, where ‘dist’ indicates the currently updated value of the shortest distance from the source to the ‘node’.
// Dist Array: Define a dist array initialized with a large integer number at the start indicating that the nodes are unvisited initially. This array stores the shortest distances to all the nodes from the source node.
// The Algorithm consists of the following steps :

// We would be using a min-heap and a distance array of size V (where ‘V’ are the number of nodes in the graph) initialized with infinity (indicating that at present none of the nodes are reachable from the source node) and initialize the distance to source node as 0.
// We push the source node to the queue along with its distance which is also 0.
// For every node at the top of the queue, we pop the element out and look out for its adjacent nodes. If the current reachable distance is better than the previous distance indicated by the distance array, we update the distance and push it into the queue.
// A node with a lower distance would be at the top of the priority queue as opposed to a node with a higher distance because we are using a min-heap. By following step 3, until our queue becomes empty, we would get the minimum distance from the source node to all other nodes. We can then return the distance array. Here’s a quick demonstration of the algorithm :

// Note: Dijkstra’s Algorithm is not valid for negative weights or negative cycles.

// We can understand that by looking at the illustration below :

// Here, we initially mark the source node ‘0’ as 0 and node ‘1’ as INFINITY (as it is unvisited). Now, when we start applying the above algorithm on this we notice that both the nodes are updated each time we come to them again. This is due to the negative weight of ‘-2’ which makes the total distance to the node always lesser than the previous value. Therefore, due to inaccurate results, we assume the graph to always contain positive weights while using Dijkstra’s Algorithm.

// Note: If you wish to see the dry run of the above approach, you can watch the video attached to this article.

// Intuition:

// The above problem seems familiar to finding the shortest distance in the case of unit edge weights for undirected graphs. Hence, our first guess could be a BFS kind of approach. The only thing that we need to take care of is that for all the paths possible between a pair of nodes, we need to store the path with the minimum cost between them. That is, say we have a node that has been reached by two paths, one with a cost of 7 and another with a cost of say 9. It is obvious that the path with a cost of 7 would be more optimal than the path with a cost of 9.

// For knowing the intuition behind why Priority Queue is being used for storing distances of nodes from the source, please watch this video of the series to get a clear understanding of why instead a Queue is not being used in this approach.

// Function to find the shortest distance of all the vertices
// from the source vertex S.

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
function dijkstra(noOfNodes, adj, source) {
  // Create a priority queue for storing the nodes as a pair {dist,node}
  // where dist is the distance from source to the node.
  const pq = new MinHeap((a, b) => a[0] < b[0]);

  // Initialising distTo list with a large number to
  // indicate the nodes are unvisited initially.
  // This list contains distance from source to the nodes.
  const distance = new Array(noOfNodes).fill(Infinity);

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
      }
    }
  }
  return distance;
}

function main() {
  let noOfNodes = 3,
    source = 2;
  const adj = [
    [
      [1, 1],
      [2, 6],
    ],
    [
      [2, 3],
      [0, 1],
    ],
    [
      [0, 6],
      [1, 3],
    ],
  ];

  let result = dijkstra(noOfNodes, adj, source);
  for (let res of result) {
    console.log(res);
  }

  console.log();
}

main();

// Time Complexity: O( E log(V) ), Where E = Number of edges and V = Number of Nodes.

// Space Complexity: O( |E| + |V| ), Where E = Number of edges and V = Number of Nodes.
