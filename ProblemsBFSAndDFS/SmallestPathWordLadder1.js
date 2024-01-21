// 127. Word Ladder
// Hard
// Topics
// Companies
// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

// Example 1:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5
// Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
// Example 2:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
// Output: 0
// Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

// Constraints:

// 1 <= beginWord.length <= 10
// endWord.length == beginWord.length
// 1 <= wordList.length <= 5000
// wordList[i].length == beginWord.length
// beginWord, endWord, and wordList[i] consist of lowercase English letters.
// beginWord != endWord
// All the words in wordList are unique.

function wordLadderLength(startWord, targetWord, wordList) {
  // Creating a queue ds of type {word,transitions to reach ‘word’}.
  let queue = [];
  // BFS traversal with pushing values in queue
  // when after a transformation, a word is found in wordList.
  let set = new Set(wordList);
  queue.push([startWord, 1]);
  // Then erase the start word from the set and not queeu oooo
  set.delete(startWord);

  // Now Iterate the queue till the queue is empty
  while (queue.length !== 0) {
    let [word, length] = queue.shift();

    // we return the steps as soon as
    // the first occurence of targetWord is found.
    if (word === targetWord) {
      return length;
    }

    for (let i = 0; i < word.length; i++) {
      let originalWord = word[i]; //d
      for (
        let charCode = "a".charCodeAt(0);
        charCode <= "z".charCodeAt(0);
        charCode++
      ) {
        let char = String.fromCharCode(charCode);
        let newWord = word.slice(0, i) + char + word.slice(i + 1); // Create a  new Copy of the word string

        console.log(newWord);
        // check if it exists in the set and push it in the queue.
        if (set.has(newWord)) {
          set.delete(newWord);
          queue.push([newWord, length + 1]);
        }
      }
      word = word.slice(0, i) + originalWord + word.slice(i + 1); // update the word back to its original value that is in the wordList
    }
}

  // If there is no transformation sequence possible
  return 0;
}

function main() {
  const wordList = ["hot", "dot", "dog", "lot", "log"];
  const startWord = "hit";
  const targetWord = "cog";

  const result = wordLadderLength(startWord, targetWord, wordList);
  console.log(result);
}

main();


// Time Complexity: O(N * M * 26)

// Where N = size of wordList Array and M = word length of words present in the wordList..

// Note that, hashing operations in an unordered set takes O(1) time, but if you want to use set here, then the time complexity would increase by a factor of log(N) as hashing operations in a set take O(log(N)) time.

// Space Complexity:  O( N )  + O(N) and 
// { for creating an set and copying all values from wordList into it  and Queue stack space used}

// Where N = size of wordList Array.

let alphabet = "";
for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
  alphabet += String.fromCharCode(i);
}

console.log("This si the alphabet " + alphabet);
