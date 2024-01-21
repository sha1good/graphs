// Given start, end, and an array arr of n numbers. At each step, the start is multiplied by any number in the array and then a mod operation with 100000 is done to get the new start.
// Your task is to find the minimum steps in which the end can be achieved starting from the start. If it is not possible to reach the end, then return -1.

// Example 2:

// Input:
// arr[] = {2, 5, 7}
// start = 3
// end = 30
// Output:
// 2
// Explanation:
// Step 1: 3*2 = 6 % 100000 = 6
// Step 2: 6*5 = 30 % 100000 = 30
// Therefore, in minimum 2 multiplications we reach the
// end number which is treated as a destination
// node of a graph here.
// Example 2:

// Input:
// arr[] = {3, 4, 65}
// start = 7
// end = 66175
// Output:
// 4
// Explanation:
// Step 1: 7*3 = 21 % 100000 = 21
// Step 2: 21*3 = 6 % 100000 = 63
// Step 3: 63*65 = 4095 % 100000 = 4095
// Step 4: 4095*65 = 266175 % 100000 = 66175
// Therefore, in minimum 4 multiplications we reach the end number which is treated as a destination node of a graph here.
// Solution

// Disclaimer: Don’t jump directly to the solution, try it out yourself first.

// Problem Link

// Note: In case any image/dry run is not clear please refer to the video attached at the bottom.

// Intuition: Since we need to find the minimum number of multiplications in order to attain the end number from the start number, the one standard algorithm that we can think of for finding the shortest/minimum paths is of course Dijkstra’s Algorithm. But a question may arise in our minds: how can we depict this problem in the form of a graph? So let us understand this through an illustration :

// As per the above image, we can clearly make out that the numbers after multiplication with the start number can be considered as nodes of a graph ranging from 0 to 99999 and the edges from each node will be the size of the given array i.e. the number of ways in which we can multiply a number. We update the distance array whenever we find a lesser number of multiplications in order to reach a node. In this way, whenever we reach the end number, the multiplications needed to reach it would always be minimum.

// Approach:

// This problem can be visualized as a graph problem as we need to find the minimum number of steps to reach an end number from the start following a number of multiplications. We would be solving it using Dijkstra’s Algorithm.

// Initial configuration:

// Queue: Define a Queue which would contain pairs of the type {steps, num }, where ‘steps’ indicates the currently updated value of no. of steps taken to reach from source to the current ‘num’.
// Distance Array: Define a distance array that would contain the minimum no. of multiplications/distance from the start number to the current number. If a cell is marked as ‘infinity’ then it is treated as unreachable/unattained.
// Start and End: Define the start and the end value which we have to reach through a series of multiplications.
// The Algorithm consists of the following steps :

// Start by creating a queue that stores the step-num pairs in the form {steps, num} and a dist array with each node initialized with a very large number ( to indicate that they’ve not been attained initially). The size of the ‘dist’ array is set to 100000 because it is the maximum number of distinct numbers that can be generated.
// We push the start number to the queue along with its steps marked as ‘0’ initially because we’ve just started the algorithm.
// Pop the element from the front of the queue and look out for its adjacent nodes (here, adjacent nodes can be regarded as the numbers which we get when we multiply the start number by each element from the arr).
// If the current dist value for a number is better than the previous distance indicated by the distance array, we update the distance/steps in the array and push it to the queue.
// We repeat the above three steps until the queue becomes empty or we reach the end number.
// Return the calculated number of steps after we reach the end number. If the queue becomes empty and we don’t encounter the required number, return ‘-1’ indicating that the following number is unattainable by multiplying the start number any number of times.

class Solution {
  minimumMultiplications(arr, start, end) {
    const q = [{ node: start, steps: 0 }];
    const dist = new Array(100000).fill(1e9);
    dist[start] = 0;
    const mod = 100000;

    while (q.length > 0) {
      const { node, steps } = q.shift();

      for (const it of arr) {
        const num = (it * node) % mod;

        if (steps + 1 < dist[num]) {
          dist[num] = steps + 1;

          if (num === end) return steps + 1;

          q.push({ node: num, steps: steps + 1 });
        }
      }
    }

    return -1;
  }
}

function main() {
  const start = 3;
  const end = 30;

  const arr = [2, 5, 7];

  const obj = new Solution();
  const ans = obj.minimumMultiplications(arr, start, end);

  console.log(ans);
}

main();


// Time Complexity : O(100000 * N) 

// Where ‘100000’ are the total possible numbers generated by multiplication (hypothetical) and N = size of the array with numbers of which each node could be multiplied.

// Space Complexity :  O(100000 * N) 

// Where ‘100000’ are the total possible numbers generated by multiplication (hypothetical) and N = size of the array with numbers of which each node could be multiplied. 100000 * N is the max possible queue size. 
// The space complexity of the dist array is constant.