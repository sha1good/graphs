// Approach:

// We will apply the BFS(Breadth First Search) traversal technique. Breadth First Search or BFS is a traversal technique where we visit the nodes level-wise, i.e., it visits the same level nodes simultaneously, and then moves to the next level.

// Initial Configuration:

// Indegree Array: Initially all elements are set to 0. Then, We will count the incoming edges for a node and store it in this array. For example, if the indegree of node 3 is 2, indegree[3] = 2.

// Queue: As we will use BFS, a queue is required. Initially, the node with indegree 0 will be pushed into the queue.

// Answer array: Initially empty and is used to store the linear ordering.

// The algorithm steps are as follows:

// First, we will form the adjacency list of the graph using the pairs. For example, for the pair {u, v} we will add node v as an adjacent node of u in the list.
// Then, we will calculate the in-degree of each node and store it in the indegree array. We can iterate through the given adj list, and simply for every node u->v, we can increase the indegree of v by 1 in the indegree array.
// Initially, there will be always at least a single node whose indegree is 0. So, we will push the node(s) with indegree 0 into the queue.
// Then, we will pop a node from the queue including the node in our answer array, and for all its adjacent nodes, we will decrease the indegree of that node by one. For example, if node u that has been popped out from the queue has an edge towards node v(u->v), we will decrease indegree[v] by 1.
// After that, if for any node the indegree becomes 0, we will push that node again into the queue.
// We will repeat steps 3 and 4 until the queue is completely empty. Now, completing the BFS we will get the linear ordering of the nodes in the answer array.
// For the first problem(Course Schedule): We will return the answer array if the length of the ordering equals the number of tasks. Otherwise, we will return an empty array.
// For the Second problem(Prerequisite tasks): We will return true if the length of the ordering equals the number of tasks. otherwise, we will return false.

function CourseScheduleI(noOfNodes, Prerequisite) {
  //create a adjacency List of the same lenght of the prerequiste

  let adjList = Array.from({ length: noOfNodes }, () => []);
  //Loop through the Prerequisite  List
  for (let [first, second] of Prerequisite) {
    adjList[second].push(first);
  }

  //create an indegree of node lenght
  let indegree = new Array(noOfNodes).fill(0);
  let queue = [];
  // Cos we can have multiple connected component
  // Loop throgh all the  nodes and for each each one, there is going to be
  // and adjacency list to get  your indegree from
  for (let i = 0; i < noOfNodes; i++) {
    for (let adjacentNode of adjList[i]) {
      indegree[adjacentNode]++;
    }
  }
  // Loop through the node again to get the ones whose indegree value is 0
  // remove them and push them to your queue
  for (let i = 0; i < noOfNodes; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  let result = [];
  // traverse the whole  queue util it becomes empty and get the first element out
  while (queue.length !== 0) {
    let node = queue.shift();
    result.push(node);

    for (let adjacentNode of adjList[node]) {
      indegree[adjacentNode]--;
      if (indegree[adjacentNode] === 0) queue.push(adjacentNode);
    }
  }

  if (result.length === noOfNodes) return true;
  return false;
}

function main() {
  let adjList = [
    [1, 0],
    [0, 1],
  ];

  let noOfNodes = adjList.length;

  let result = CourseScheduleI(noOfNodes, adjList);
  //return result === true ? true : false;

  if (result) {
    console.log("true");
  } else {
    console.log(false);
  }
}

// Time Complexity: O(V+E), where V = no. of nodes and E = no. of edges. This is a simple BFS algorithm.

// Space Complexity: O(N) + O(N) ~ O(2N), O(N) for the indegree array,
//  and O(N) for the queue data structure used in BFS(where N = no.of nodes). 
// Extra O(N) for storing the topological sorting. Total ~ O(3N).
main();
