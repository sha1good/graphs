// Graph Representations
// After understanding the input format, let us try to understand how the graph can be stored. The two most commonly used representations for graphs are

// Adjacency Matrix
// Adjacency Lists
// Adjacency Matrix
// An adjacency matrix of a graph is a two-dimensional array of size n x n, where n is the number of nodes in the graph, with the property that a[ i ][ j ] = 1 if the edge (vᵢ, vⱼ) is in the set of edges, and a[ i ][ j ] = 0 if there is no such edge.

// Consider the example of the following undirected graph,

//const { resolve } = require("path");
// const readline = require("readline");

// async function main() {
//   const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   // Reading input values
//   const [n, m] = (await getInput("Enter n and m: ")).split(" ").map(Number);
//   // Creating adjacency matrix for undirected graph
//   // time complexity: O(n)  // One base Index = n+ 1, where n is the number of nodes in that graph
//   const adj = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

//   for (let i = 0; i < m; i++) {
//     const [u, v] = (await getInput(`Enter Edges ${i + 1}`))
//       .split(" ")
//       .map(Number);

//     adj[u][v] = 1;
//     adj[v][u] = 1; //this statement will be removed in case of directed graph
//   }

//   r1.close();
//   console.log(adj);
// }

// function getInput(question) {
//   return new Promise((resolve) => {
//     r1.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

// main();

//Time Complexity is O(n) and space complexity is O(n * n)
// const readline = require("readline");

// async function main() {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   // Reading input values
//   const [n, m] = (await getInput("Enter n and m: ", rl)).split(" ").map(Number);

//   // Creating adjacency matrix for undirected graph
//   // time complexity: O(n)
//   const adj = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

//   for (let i = 0; i < m; i++) {
//     const [u, v] = (await getInput(`Enter edge ${i + 1}: `, rl))
//       .split(" ")
//       .map(Number);
//     adj[u][v] = 1;
//     adj[v][u] = 1; // this statement will be removed in case of directed graph
//   }

//   rl.close();
//   console.log(adj);
// }

// function getInput(question, rl) {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

// main();

// Assuming you're using some form of input mechanism, like prompt in a browser environment.
// If you are using Node.js, you can use readline or other input mechanisms.

// // Function to take input similar to cin
// function input() {
//   return parseInt(prompt()); //Use appropriate input function based on your environment
// }

// // Function to create a 2D array and initialize with zeros
// function create2DArray(rows, cols) {
//   return Array.from({ length: rows }, () => Array(cols).fill(0));
// }

// // Main function
// function main() {
//   //const [u, v] = 0
//   let n, m;

//   n = input();
//   m = input();

//   // adjacency matrix for undirected graph
//   // time complexity: O(n)
//   let adj = create2DArray(n + 1, n + 1);

//   for (let i = 0; i < m; i++) {
//     let u, v; // These are  the edges
//     u = input();
//     v = input();

//     adj[u][v] = 1;
//     adj[v][u] = 1; // this statement will be removed in case of directed graph
//   }

//   return adj;
// }

// // Call the main function
// main();

//This is for adjacency matrix
//Time complexity is o(N) and Space complexity is O(N * N)
// const { read } = require("fs");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function create2DArray(rows, cols) {
//   return Array.from({ length: rows }, () => Array(cols).fill(0));
// }

// function main() {
//   rl.question("Enter the number of vertices (n): ", (n) => {
//     rl.question("Enter the number of edges (m): ", (m) => {
//       const adj = create2DArray(parseInt(n) + 1, parseInt(n) + 1);

//       for (let i = 0; i < m; i++) {
//         rl.question(`Enter edge ${i + 1} (u v): `, (edgeInput) => {
//           const [u, v] = edgeInput.split(" ").map(Number);
//           adj[u][v] = 1;
//           adj[v][u] = 1; // Remove this line for a directed graph

//           if (i === m - 1) {
//             // All edges have been processed, close the readline interface
//             rl.close();
//             console.log("Adjacency matrix:", adj);
//           }
//         });
//       }
//     });
//   });
// }

// main();

//This is for undirected graph
const readline = require("readline");

const readLn = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  readLn.question("Enter the number of nodes (n): ", (n) => {
    readLn.question("Enter the number of edges: ", (m) => {
      //Create an adjacent array n+ 1 for 1 base index and n for 0 base
      let adj = Array.from({ length: parseInt(n) + 1 }, () => []);

      for (let i = 0; i < m; i++) {
        readLn.question(`Enter the edge ${i + 1} (u v):`, (edgeInput) => {
          const [u, v] = edgeInput.split(" ").map(Number);
          adj[u].push(v);
          adj[v].push(u);

          if (i === m - 1) {
            // All edges have been processed, close the readline interface
            readLn.close();
            console.log("Adjacency list", adj);
          }
        });
      }
    });
  });
}


// Space complexity = O(2xE)

// This representation is much better than the adjacency matrix, 
// as matrix representation consumes n² locations, and most of them are unused.
main();



//This is for directed graph
const readline = require("readline");

const rLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  readLn.question("Enter the number of nodes (n): ", (n) => {
    readLn.question("Enter the number of edges: ", (m) => {
      //Create an adjacent array n+ 1 for 1 base index and n for 0 base
      let adj = Array.from({ length: parseInt(n) + 1 }, () => []);

      for (let i = 0; i < m; i++) {
        readLn.question(`Enter the edge ${i + 1} (u v):`, (edgeInput) => {
          const [u, v] = edgeInput.split(" ").map(Number);
          adj[u].push(v);
         

          if (i === m - 1) {
            // All edges have been processed, close the readline interface
            readLn.close();
            console.log("Adjacency list", adj);
          }
        });
      }
    });
  });
}


// For directed graphs, 
// if there is an edge between u and v it means the edge only goes from u to v, i.e., 
// v is the neighbor of u, but vice versa is not true. The space needed to represent 
// a directed graph using its adjacency list is E locations, where E denotes the number of edges,
//  as here each edge data appears only once.

// Space complexity = O(E)
main();



// But how are we going to implement it in the adjacency list?

// Earlier in the adjacency list, we were storing a list of integers in each index, 
// but for weighted graphs, we will store pairs (node, edge weight) in it.


// const n = 10;  // Replace 10 with your desired size
// const adjList = Array.from({ length: n + 1 }, () => []);

// // Example: Adding an edge from vertex 1 to vertex 2 with weight 3
// const u = 1, v = 2, weight = 3;
// adjList[u].push([v, weight]);

// // Print the adjacency list
// console.log(adjList);