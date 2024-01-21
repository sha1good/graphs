// Given two distinct words startWord and targetWord, and a list denoting wordList of unique words of equal lengths. Find all shortest transformation sequence(s) from startWord to targetWord. You can return them in any order possible.

// In this problem statement, we need to keep the following conditions in mind:

// A word can only consist of lowercase characters.
// Only one letter can be changed in each transformation.
// Each transformed word must exist in the wordList including the targetWord.
// startWord may or may not be part of the wordList.
// Return an empty list if there is no such transformation sequence.

// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].

// Example 1:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
// Explanation: There are 2 shortest transformation sequences:
// "hit" -> "hot" -> "dot" -> "dog" -> "cog"
// "hit" -> "hot" -> "lot" -> "log" -> "cog"
// Example 2:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
// Output: []
// Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

// Constraints:

// 1 <= beginWord.length <= 5
// endWord.length == beginWord.length
// 1 <= wordList.length <= 500
// wordList[i].length == beginWord.length
// beginWord, endWord, and wordList[i] consist of lowercase English letters.
// beginWord != endWord
// All the words in wordList are unique.
// The sum of all shortest transformation sequences does not exceed 105.

// The Algorithm for this problem involves the following steps:

// Firstly, we start by creating a hash set to store all the elements present in the wordList which would make the search and delete operations faster for us to implement.
// Next, we create a Queue data structure for storing the successive sequences/ path in the form of a vector which on transformation would lead us to the target word.
// Now, we add the startWord to the queue as a List and also push it into the usedOnLevel vector to denote that this word is currently being used for transformation in this particular level.
// Pop the first element out of the queue and carry out the BFS traversal, where for each word that popped out from the back of the sequence present at the top of the queue, we check for all of its characters by replacing them with ‘a’ – ‘z’ if they are present in the wordList or not. In case a word is present in the wordList, we simply first push it onto the usedOnLevel vector and do not delete it from the wordList immediately.
// Now, push that word into the vector containing the previous sequence and add it to the queue. So we will get a new path, but we need to explore other paths as well, so pop the word out of the list to explore other paths.
// After completion of traversal on a particular level, we can now delete all the words that were currently being used on that level from the usedOnLevel vector which ensures that these words won’t be used again in the future, as using them in the later stages will mean that it won’t be the shortest path anymore.
// If at any point in time we find out that the last word in the sequence present at the top of the queue is equal to the target word, we simply push the sequence into the resultant vector if the resultant vector ‘ans’ is empty.
// If the vector is not empty, we check if the current sequence length is equal to the first element added in the ans vector or not. This has to be checked because we need the shortest possible transformation sequences.
// In case, there is no transformation sequence possible, we return an empty 2D vector.

function findSequences(startWord, targetWord, wordList) {
  // Push all values of wordList into a set
  // to make deletion from it easier and in less time complexity.

  if (!wordList.includes(targetWord)) return [];
  if (!wordList.includes(startWord)) wordList.push(startWord);
  console.log(wordList);
  let set = new Set(wordList);
  // Creating a queue ds which stores the words in a sequence which is
  // required to reach the targetWord after successive transformations.
  let queue = [];
  let result = [];

  let level = 0;

  // BFS traversal with pushing the new formed sequence in queue
  // when after a transformation, a word is found in wordList.

  queue.push([startWord]);

  // A vector defined to store the words being currently used
  // on a level during BFS.
  let usedOnLevelVector = [];
  usedOnLevelVector.push(startWord);

  // Iterate through the queue
  while (queue.length !== 0) {
    let vectorArray = queue.shift();

    // Now, erase all words that have been
    // used in the previous levels to transform to the new level

    if (vectorArray.length > level) {
      level++; // this shows i am in the second level
      // Delete from the set  if  you have completed the using the array pushed into the queue
      for (let word of usedOnLevelVector) {
        set.delete(word); // I am removing it from a set here
      }
    }

    //Get the last  element  from the veectorarray
    let word = vectorArray.pop();

    // store the answers if the end word of the vectorarray generated inside the queus matches with targetWord.
    // coz === coz
    if (word === targetWord) {
      // the first sequence where we reached end of that same word, I will push it
      if (result.length === 0) {
        // i.e my result array  is empty in the begining
        result.push([...vectorArray]);
      }
      // if the result already has vector array that I just pushed,
      // then i will compare the next vector array  with the  current lenght
      //of the first element in the  result array.
      //push to the result
      else if (result[0].length === vectorArray.length) {
        result.push([...vectorArray]);
      }
    }

    for (let i = 0; i < word.length; i++) {
      // Now, replace each character of ‘word’ with char
      // from a-z then check if ‘word’ exists in wordList.
      let original = word[i];

      for (
        let charCode = "a".charCodeAt(0);
        charCode <= "z".charCodeAt(0);
        charCode++
      ) {
        let char = String.fromCharCode(charCode);
        let newWord = word.slice(0, i) + char + word.slice(i + 1);

        if (set.has(newWord)) {
          // Check if the word is present in the wordList and
          // push the word along with the new sequence in the queue.
          vectorArray.push(newWord);
          queue.push([...vectorArray, newWord]);
          // mark as visited on the level
          usedOnLevelVector.push(newWord);
          // this way if I have [bat] in the vector array before, and I have used bat to form
          // another level  such as [bat, pat ], I will have to remove pat  again so that I can use
          //bat to form another sequence  using [bat] again to form [ bat, bot]
          vectorArray.pop();
        }
      }
      word = word.slice(0, i) + original + word.slice(i + 1);
    }
  }

  return result;
}

function main() {
  //let wordList = ["des", "der", "dfr", "dgt", "dfs"];
  let wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
  //let startWord = "der", targetWord = "dfs";
  let startWord = "hit",
    targetWord = "cog";
  let ans = findSequences(startWord, targetWord, wordList);
  //   ans.sort((a, b) => a - b);
  //   for (let i = 0; i < ans.length; i++) {
  //     for (j = 0; j < ans[i].length; j++) {
  //       console.log(ans[i][j]);
  //     }
  //   }
  console.log(ans);
}

main();
