function DetectCycleUndirectedGraphUsingDfs(node, parent, visited, adjList) {
  visited[node] = 1;
  // visit adjacent nodes
  for (let adjacentNode of adjList[node]) {
    // unvisited adjacent node
    if (!visited[adjacentNode]) {
      if (
        DetectCycleUndirectedGraphUsingDfs(
          adjacentNode,
          parent,
          visited,
          adjList
        ) === true
      )
        return true;
    }
    // visited node but not a parent node
    else if (adjacentNode !== parent) {
      return true;
    }
  }
  // no cyclic found!
  return false;
}

function detectCycleUsingDfs(noOfNodes, adjList) {
  let visited = new Array(noOfNodes).fill(0);
  // for graph with connected components
  for (let i = 0; i < noOfNodes, i++; ) {
    if (!visited[i]) {
      if (DetectCycleUndirectedGraphUsingDfs(i, -1, visited, adjList) === true)
        return true;
    }
  }

  return false;
}

function main() {
  let noOfNodes = 4;
  let adjList = [[], [2], [1, 3], [2]];

  //   addEdgeUtil(adjList, "", "");
  //   addEdgeUtil(adjList, 2, "");
  //   addEdgeUtil(adjList, 1, 3);
  //   addEdgeUtil(adjList, 2, 0);

  const result = detectCycleUsingDfs(noOfNodes, adjList);
  console.log(+result); // I used the unary operator + here because I want to change false boolean to number 0
}

main();
