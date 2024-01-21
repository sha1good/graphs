// // Approach:
// // Note:

// // Here we will perform the disjoint set operations on the indices of the accounts considering them as the nodes.
// // As in each account, the first element is the name, we will start iterating from the second element in each account to visit only the emails sequentially.
// // The algorithm steps are the following:

// // First, we will create a map data structure. Then we will store each email with the respective index of the account(the email belongs to) in that map data structure.
// // While doing so, if we encounter an email again(i.e. If any index is previously assigned for the email), we will perform union(either unionBySize() or unionByRank()) of the current index and the previously assigned index.
// // After completing step 2, now it’s time to merge the accounts. For merging, we will iterate over all the emails individually and find the ultimate parent(using the findUPar() method) of the assigned index of every email. Then we will add the email of the current account to the index(account index) that is the ultimate parent. Thus the accounts will be merged.
// // Finally, we will sort the emails for every account separately and store the final results in the answer array accordingly.

// Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

// Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

// After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

// Example 1:

// Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
// Explanation:
// The first and second John's are the same person as they have the common email "johnsmith@mail.com".
// The third John and Mary are different people as none of their email addresses are used by other accounts.
// We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'],
// ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
// Example 2:

// Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
// Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]

class DisjointSetBySize {
  constructor(n) {
    this.size = new Array(n + 1).fill(0);
    this.parent = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  findUltimateParent(node) {
    if (node === this.parent[node]) {
      return node; // parent of 1 is 1
    }
    return (this.parent[node] = this.findUltimateParent(this.parent[node]));
  }

  unionBySize(u, v) {
    const ultimateParentOfU = this.findUltimateParent(u);
    const ultimateParentOfV = this.findUltimateParent(v);

    if (ultimateParentOfU === ultimateParentOfV) return;

    if (this.size[ultimateParentOfV] < this.size[ultimateParentOfU]) {
      // join v to u
      this.parent[ultimateParentOfV] = ultimateParentOfU;
      this.size[ultimateParentOfU] += this.size[ultimateParentOfV];
    } else {
      this.parent[ultimateParentOfU] = ultimateParentOfV;
      // if their ultimate parent are the same thing , so the  size that we attached to  will increase
      this.size[ultimateParentOfV] += this.size[ultimateParentOfU];
    }
  }
}

class Solution {
  accountsMerge(accounts) {
    let n = accounts.length;
    let ds = new DisjointSetBySize(n);
    //accounts.sort((a, b) => a - b);

    //console.log(accounts);
    let mapMailNode = new Map();
    for (let i = 0; i < n; i++) {
      // I  am starting the inner loop here from 1 because I email actually start from 1 index
      for (let j = 1; j < accounts[i].length; j++) {
        let mail = accounts[i][j];

        if (!mapMailNode.has(mail)) {
          mapMailNode.set(mail, i);
        } else {
          ds.unionBySize(i, mapMailNode.get(mail));
        }
      }
    }

    let mergeMail = Array.from({ length: n }, () => []);
    // Loop through the map
    for (let [mail, node] of mapMailNode) {
      let parentNode = ds.findUltimateParent(node);
      mergeMail[parentNode].push(mail);
    }

    //console.log(mergeMail);
    let result = [];

    for (let i = 0; i < n; i++) {
      if (mergeMail[i].length === 0) continue;
      mergeMail[i].sort();
      console.log(mergeMail[i]);
      let temp = [accounts[i][0], ...mergeMail[i]];
      result.push(temp);
    }
    // Sort the final result array based on the first element of each sub-array
    result.sort((a, b) => a[0].localeCompare(b[0]));
    return result;
  }
}
function main() {
  let accounts = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ];

  let obj = new Solution();

  let result = obj.accountsMerge(accounts);
  console.log(result);
  //   for (let res of result) {
  //     console.log(`${res[0]}, ${res.slice(1).join(" ")}`);
  //   }
  //   console.log();
}

main();
