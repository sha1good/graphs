// Cheapest Flights Within K Stops
// There are n cities and m edges connected by some number of flights. You are given an array of flights where flights[i] = [ fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost price. You have also given three integers src, dst, and k, and return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

// Example 1:

// Input:
// n = 4
// flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
// src = 0
// dst = 3
// k = 1
// Output:
// 700
// Explanation:
// The optimal path with at most 1 stops from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
// Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
// Example 2:

// Input:
// n = 3
// flights = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0
// dst = 2
// k = 1
// Output:
// 200
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stops from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
// Disclaimer: Don’t jump directly to the solution, try it out yourself first.

// Problem Link

// Note: In case any image/dry run is not clear please refer to the video attached at the bottom.

// Intuition:

// Since in this problem, we have to calculate the minimum cost to reach the destination from the source but with a restriction on the number of stops, we would be using Dijkstra’s Algorithm. Now, one must wonder that based on what parameter we should add elements to the priority queue.

// Now, if we store the elements in the priority queue with the priority given to the minimum distance first, then after a few iterations we would realize that the Algorithm will halt when the number of stops would exceed. This may result in a wrong answer as it would not allow us to explore those paths which have more cost but fewer stops than the current answer.

// To tackle this issue, we store the elements in terms of the minimum number of stops in the priority queue so that when the algorithm halts, we can get the minimum cost within limits.

// Also, a point to note here is that do we really need a priority queue for carrying out the algorithm? The answer for that is No because when we are storing everything in terms of a number of stops, the stops are increasing monotonically which means that the number of sops is increasing by 1 and when we pop an element out of the queue, we are always popping the element with a lesser number of stops first. Replacing the priority queue with a simple queue will let us eliminate an extra log(N) of the complexity of insertion-deletion in a priority queue which would in turn make our algorithm a lot faster.

// Approach:

// Initial configuration:

// Queue: Define a Queue that would contain pairs of the type {stops, {node,dist} }, where ‘dist’ indicates the currently updated value of the distance from the source to the ‘node’ and ‘stops’ contains the number of nodes one has to traverse in order to reach node from src.
// Distance Array: Define a distance array that would contain the minimum cost/distance from the source cell to a particular cell. If a cell is marked as ‘infinity’ then it is treated as unreachable/unvisited.
// Source and Destination: Define the source and the destination from where the flights have to run.
// The Algorithm consists of the following steps :

// Start by creating an adjacency list, a queue that stores the distance-node and stops pairs in the form {stops,{node,dist}} and a dist array with each node initialized with a very large number ( to indicate that they’re unvisited initially) and the source node marked as ‘0’.
// We push the source cell to the queue along with its distance which is also 0 and the stops are marked as ‘0’ initially because we’ve just started.
// Pop the element at the front of the queue and look out for its adjacent nodes.
// If the current dist value of a node is better than the previous distance indicated by the distance array and the number of stops until now is less than K, we update the distance in the array and push it to the queue. Also, increase the stop count by 1.
// We repeat the above three steps until the queue becomes empty. Note that we do not stop the algorithm from just reaching the destination node as it may give incorrect results.
// Return the calculated distance/cost after we reach the required number of stops. If the queue becomes empty and we don’t encounter the destination node, return ‘-1’ indicating there’s no path from source to destination.

function cheapestFlight(noOfNodes, flights, source, destination, stops) {
  // Create the adjacency list to depict airports and flights in
  // the form of a graph.

  let adjList = Array.from({ length: noOfNodes + 1 }, () => []);

  // Loop through the  edges or  the list of  flights given to us
  for (let it of flights) {
    adjList[it[0]].push([it[1], it[2]]);
  }

 

  let queue = [];
  // [source, stop, distance]  where distance === cost
  queue.push([source, 0, 0]);
  console.log(queue)
  let distance = Array(noOfNodes + 1).fill(1e9);
  distance[0] = 0;

  while (queue.length !== 0) {
    console.log(queue)
    let [node, stop, dist] = queue.shift();

    // We stop the process as soon as the limit for the stops reaches.
    if (stop > stops) continue;

    // get the adjancency of that node
    for (let [v, edgeWight] of adjList[node]) {
      if (dist + edgeWight < distance[v]) {
        distance[v] = dist + edgeWight;
        queue.push([v, stop + 1, distance[v]]);
      }
    }
  }

  // If the destination node is unreachable return ‘-1’
  // else return the calculated distance from  source  to destination.

  if (distance[destination] === 1e9) return -1;
  return distance[destination];
}

function main() {
  const noOfNodes = 3;
  const source = 0;
  const destination = 3;
  const stops = 1;

  const flights = [
    [0, 1, 100],
    [1, 2, 100],
    [2, 0, 100],
    [1, 3, 600],
    [2, 3, 200],
  ];

  const ans = cheapestFlight(noOfNodes, flights, source, destination, stops);

  console.log(ans);
}

main();
