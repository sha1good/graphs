// Approach:
// The only way to optimize this problem to a greater extent is to use a hack that is mainly used in competitive programming.

// Initial configuration:

// Vector: Define a vector to store the final shortest sequences of transformation from the beginWord to the endWord.
// Map: A map of the form word -> level to store words along with the level on which they appear during the BFS traversal.
// Hash Set: Create a hash set to store the elements present in the word list to carry out the search and delete operations in O(1) time.
// Queue: Define a queue data structure to store the level-wise transformed words which also are present in the wordList.
// The Algorithm is divided into majorly 2 steps :

// Step 1: Finding the minimum number of steps to reach the endWord and storing the step number for every string in a data structure. So that we can backtrack at later stages.

// We follow a similar approach as that of the Word Ladder-I problem to find out the minimum number of steps in order to transform the beginWord to the endWord.
// First, insert the beginWord in a queue data structure and then start the BFS traversal.
// Now, we pop the first element out of the queue and carry out the BFS traversal where, for each word popped out of the queue, we try to replace every character with ‘a’ – ‘z’, and we get a transformed word. We check if the transformed word is present in the wordList or not.
// If the word is present, we push it in the queue as well as push in the map and increase the count of level by 1 in the map. If the word is not present, we simply move on to replacing the original character with the next character.
// Remember, we also need to delete the word from the wordList if it matches with the transformed word to ensure that we do not reach the same point again in the transformation which would only increase our sequence length.
// Now, we pop the next element out of the queue ds and if at any point in time, the transformed word becomes the same as the targetWord, we stop the BFS.

// Step 2: Backtrack in the map from end to beginning to get the answer sequences.

// We follow the DFS traversal here but in a reverse manner.
// Starting from only the targetWord in the sequence we replace the character by character from a-z in that word and check whether the transformed word is present in the map and at the previous level of the targetWord or not.
// If that is the case, we push the word into the sequence and then continue a similar traversal until we reach the beginWord.
// Following this technique eventually, we would get all the shortest possible sequences to reach from beginWord to targetWord but in reverse order. So the moment we encounter the beginWord in the traversal, we reverse the current sequence, insert it into the answer array and then re-reverse it to continue the DFS traversal as it is.

// Note: If you wish to see the dry run of the above approach, you can watch the video attached to this article.

// Intuition:
// The main reason why the previous approach was giving TLE over strict time constraints was that we used to store the whole updated sequence in a queue data structure which consumed a lot of time as well as space. Now, as the first step instead of storing the sequences, we just store the words as we progress during the BFS traversal. This would give us an idea about the length of the shortest sequences possible. We also store the words along with the level on which they appear during the traversal in a map data structure so that we can already make a count of the possible number of paths to reach the targetWord.In the next step, we backtrack from the end to begin to get the answer sequences. Through this, exploration of the paths would be minimal if we start from the back and unnecessary paths wouldn’t be explored.

function findLadders(beginWord, endWord, wordList) {
  const mpp = new Map();
  const ans = [];
  let b;

  function dfs(word, seq) {
    if (word === b) {
      seq.reverse();
      ans.push([...seq]);
      seq.reverse();
      return;
    }
    const sz = word.length;
    const steps = mpp.get(word);

    for (let i = 0; i < sz; i++) {
      const original = word[i];
      for (let ch = "a".charCodeAt(0); ch <= "z".charCodeAt(0); ch++) {
        let char = String.fromCharCode(ch);
        word = word.substring(0, i) + char + word.substring(i + 1);
        if (mpp.has(word) && mpp.get(word) + 1 === steps) {
          seq.push(word);
          dfs(word, seq);
          seq.pop();
        }
      }
      word = word.substring(0, i) + original + word.substring(i + 1);
    }
  }

  const st = new Set(wordList);
  const q = [beginWord];
  b = beginWord;
  mpp.set(beginWord, 1);
  st.delete(beginWord);

  while (q.length > 0) {
    let word = q.shift();
    let steps = mpp.get(word);

    if (word === endWord) break;

    for (let i = 0; i < word.length; i++) {
      const original = word[i];
      for (let ch = "a".charCodeAt(0); ch <= "z".charCodeAt(0); ch++) {
        let char = String.fromCharCode(ch);
        word = word.substring(0, i) + char + word.substring(i + 1);
        if (st.has(word)) {
          q.push(word);
          st.delete(word);
          mpp.set(word, steps + 1);
        }
      }
      word = word.substring(0, i) + original + word.substring(i + 1);
    }
  }

  if (mpp.has(endWord)) {
    const seq = [endWord];
    dfs(endWord, seq);
  }

  return ans;
}

function comp(a, b) {
  const x = a.join("");
  const y = b.join("");
  return x < y ? -1 : 1;
}

function main() {
  // const wordList = ['des', 'der', 'dfr', 'dgt', 'dfs'];
  // const startWord = 'der';
  // const targetWord = 'dfs';
  let wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
  //let startWord = "der", targetWord = "dfs";
  let startWord = "hit",
    targetWord = "cog";
  const ans = findLadders(startWord, targetWord, wordList);

  if (ans.length === 0) {
    console.log(-1);
  } else {
    ans.sort(comp);
    for (let i = 0; i < ans.length; i++) {
      console.log(ans[i].join(" "));
    }
  }
}

main();
