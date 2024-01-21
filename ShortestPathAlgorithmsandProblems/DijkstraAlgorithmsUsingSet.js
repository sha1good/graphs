// Approach:

// We’ll be using Set in this approach for finding the shortest distances from the source node to every other node through Dijkstra’s Algorithm.

// Initial configuration:

// Source Node: Before starting off with the Algorithm, we need to define a source node from which the shortest distances to every other node would be calculated.
// Set: Define a Set that would contain pairs of the type {dist, node}, where ‘dist’ indicates the currently updated value of the shortest distance from the source to the ‘node’.
// Dist Array: Define a dist array initialized with a large integer number at the start indicating that the nodes are unvisited initially. This array stores the shortest distances to all the nodes from the source node.
// The Algorithm consists of the following steps :

// We would be using a set and a distance array of size V (where ‘V’ are the number of nodes in the graph) initialized with infinity (indicating that at present none of the nodes are reachable from the source node) and initialize the distance to source node as 0.
// We push the source node to the set along with its distance which is also 0.
// Now, we start erasing the elements from the set and look out for their adjacent nodes one by one. If the current reachable distance is better than the previous distance indicated by the distance array, we update the distance and insert it in the set.
// A node with a lower distance would be first erased from the set as opposed to a node with a higher distance. By following step 3, until our set becomes empty, we would get the minimum distance from the source node to all other nodes. We can then return the distance array.
// The only difference between using a Priority Queue and a Set is that in a set we can check if there exists a pair with the same node but a greater distance than the current inserted node as there will be no point in keeping that node into the set if we come across a much better value than that. So, we simply delete the element with a greater distance value for the same node.
// Here’s a quick demonstration of the algorithm :

// Note: Dijkstra’s Algorithm is not valid for negative weights or negative cycles.

// We can understand that by looking at the illustration below :

// Here, we initially mark the source node ‘0’ as 0 and node ‘1’ as INFINITY (as it is unvisited). Now, when we start applying the above algorithm on this we notice that both the nodes are updated each time we come to them again. This is due to the negative weight of ‘-2’ which makes the total distance to the node always lesser than the previous value. Therefore, due to inaccurate results, we assume the graph to always contain positive weights while using Dijkstra’s Algorithm.

// Note: If you wish to see the dry run of the above approach, you can watch the video attached to this article.

// Intuition:

// The above problem implements a BFS kind of approach using the set data structure. The only thing that we need to take care of is that for all the paths possible between a pair of nodes, we need to store the path with the minimum cost between them. That is, say we have a node that has been reached by two paths, one with a cost of 7 and another with a cost of say 9. It is obvious that the path with a cost of 7 would be more optimal than the path with a cost of 9. A set data structure in C++ always stores the elements in increasing order i.e., when we erase from a set, the smallest valued elements get erased first.a

function dijkstra(noOfNodes, adj, source) {
  // Create a set ds for storing the nodes as a pair {node,  distance }
  // where dist is the distance from source to the node.
  // set stores the nodes in ascending order of the distances

  let st = new Set();

  // Initialising dist list with a large number to
  // indicate the nodes are unvisited initially.
  // This list contains distance from source to the nodes.

  let distance = Array(noOfNodes).fill(1e9);

  st.add([source, 0]);

  // Source initialised with dist=0

  distance[source] = 0;

  // Now, erase the minimum distance node first from the set
  // and traverse for all its adjacent nodes.

  while (st.size > 0) {
    let it = [...st.keys()][0];
    console.log(it)
    st.delete(it);
    const [node, dist] = it;
    for (let it of adj[node]) {
      let adjacentNode = it[0];
      let edgeWight = it[1];

      if (dist + edgeWight < distance[adjacentNode]) {
        // erase if it was visited previously at
        // a greater cost.
        if (distance[adjacentNode] !== 1e9)
          st.delete([adjacentNode, distance[adjacentNode]]);
        // If current distance is smaller,
        // push it into the set
        distance[adjacentNode] = dist + edgeWight;
        st.add([adjacentNode, distance[adjacentNode]]);
      }
    }
  }

  // Return the list containing shortest distances
  // from source to all the nodes.
  return distance;
}

function main() {
  // Driver code.
  const noOfNodes = 3,
    E = 3,
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

  const res = dijkstra(noOfNodes, adj, source);

  for (let i = 0; i < noOfNodes; i++) {
    console.log(res[i] + " ");
  }
  console.log();
}

main();


// Time Complexity : O( E log(V) ) 

// Where E = Number of edges and V = Number of Nodes.

// Space Complexity : O( |E| + |V| ) 

// Where E = Number of edges and V = Number of Nodes.