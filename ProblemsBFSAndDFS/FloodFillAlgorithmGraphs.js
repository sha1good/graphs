// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

// You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on.
// Replace the color of all of the aforementioned pixels with color.

// The algorithm steps are as follows:

// Initial DFS call will start with the starting pixel (sr, sc) and make sure to store the initial colour.
// Now, either we can use the same matrix to replace the colour of all of the aforementioned pixels with the newColor or create a replica of the given matrix. It is advised to use another matrix because we work on the data and not tamper with it. So we will create a copy of the input matrix.
// Check for the neighbours of the respective pixel that has the same initial colour and has not been visited or coloured. DFS call goes first in the depth on either of the neighbours.
// We go to all 4 directions and check for unvisited neighbours with the same initial colour. To travel 4 directions we will use nested loops, you can find the implementation details in the code.
// DFS function call will make sure that it starts the DFS call from that unvisited neighbour, and colours all the pixels that have the same initial colour, and at the same time it will also mark them as visited.
// In this way, “flood fill” will be performed. It doesn’t matter how we are colouring the pixels, we just want to colour all of the aforementioned pixels with the newColor. So, we can use any of the traversal techniques.

// Consider the following example to understand how DFS traverses the pixels and colours them accordingly

function dfs(
  row,
  col,
  initialColor,
  newColor,
  gridResult,
  image,
  delRow,
  delCol
) {
  //  marked the initial Color with the new Color
  gridResult[row][col] = newColor;

  let n = image.length;
  let m = image[0].length;

  // there are exactly 4 neighbours, so loop through it
  for (let i = 0; i < 4; i++) {
    let nRow = row + delRow[i];
    let nCol = col + delCol[i];

    //Check if it is a valid boundary
    // then check  if initial color and its neighbour has the same value and it is unvisited pixel
    // then color it
    if (
      nRow >= 0 &&
      nRow < n &&
      nCol >= 0 &&
      nCol < m &&
      image[nRow][nCol] === initialColor &&
      gridResult[nRow][nCol] !== newColor
    ) {
      dfs(
        nRow,
        nCol,
        initialColor,
        newColor,
        gridResult,
        image,
        delRow,
        delCol
      );
    }
  }

  return;
}

function floodFill(src, sc, newColor, image) {
  // get initial color
  let initialColor = image[src][sc];
  // create a shallow copy of the image
  let gridResult = [...image].map((row) => [...row]);

  // delta row and delta column for neighbours
  let delRow = [-1, 0, 1, 0];
  let delCol = [0, 1, 0, -1];

  dfs(src, sc, initialColor, newColor, gridResult, image, delRow, delCol);
  return gridResult;
}

function printResult(result) {
  for (let i of result) {
    for (let j of i) process.stdout.write(j + " ");
    console.log();
  }
}

function main() {
  let image = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ];
  let src = 1,
    sc = 1,
    newColor = 2;
  let result = floodFill(src, sc, newColor, image);
  console.log(result);
  printResult(result);
}

main();

// Time Complexity: O(NxM + NxMx4) ~ O(N x M)

// For the worst case, all of the pixels will have the same colour, 
//so DFS function will be called for (N x M) nodes and for every node we are traversing for 4 neighbours, 
//so it will take O(N x M x 4) time.

// Space Complexity: O(N x M) + O(N x M)

// O(N x M) for copied input array and recursive stack space takes up N x M locations at max.
