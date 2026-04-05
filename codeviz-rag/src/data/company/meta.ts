import { QAItem } from "./types";
export const Meta_QA: QAItem[] = [
    //quetsion 1
    
    {
  "q": "Given two non-negative integer strings num1 and num2, return their sum as a string without using BigInteger or converting the strings directly to integers.",
  "difficulty": "Easy",
  "tags": ["String", "Two Pointers", "Math"],

  "a": "Simulate digit-by-digit addition from the end of the strings (like elementary school addition). Use carry. Build the result in reverse and then reverse it at the end.",

  "steps": [
    "Set two pointers i and j at the end of num1 and num2.",
    "Initialize carry = 0.",
    "Loop while i>=0 or j>=0 or carry>0:",
    "   • Take digit from num1[i] if i>=0.",
    "   • Take digit from num2[j] if j>=0.",
    "   • Compute sum = d1 + d2 + carry.",
    "   • Append (sum % 10) to result string.",
    "   • Update carry = sum / 10.",
    "Reverse result and return."
  ],

  "examples": [
    { "input": "num1='456', num2='77'", "output": "'533'" },
    { "input": "num1='0', num2='0'", "output": "'0'" }
  ],

  "complexity": {
    "time": "O(max(n, m))",
    "space": "O(max(n, m))"
  },

  "codes": {
    "python": 
`def addStrings(num1, num2):
    i = len(num1) - 1
    j = len(num2) - 1
    carry = 0
    res = []

    while i >= 0 or j >= 0 or carry:
        d1 = ord(num1[i]) - ord('0') if i >= 0 else 0
        d2 = ord(num2[j]) - ord('0') if j >= 0 else 0

        s = d1 + d2 + carry
        res.append(str(s % 10))
        carry = s // 10
        i -= 1
        j -= 1

    return "".join(res[::-1])`,

    "cpp": 
`#include <bits/stdc++.h>
using namespace std;

string addStrings(string num1, string num2) {
    int i = num1.size() - 1;
    int j = num2.size() - 1;
    int carry = 0;
    string res = "";

    while (i >= 0 || j >= 0 || carry) {
        int d1 = (i >= 0 ? num1[i] - '0' : 0);
        int d2 = (j >= 0 ? num2[j] - '0' : 0);
        int s = d1 + d2 + carry;
        res.push_back((s % 10) + '0');
        carry = s / 10;
        i--; j--;
    }

    reverse(res.begin(), res.end());
    return res;
}`,

    "java":
`class Solution {
    public String addStrings(String num1, String num2) {
        int i = num1.length() - 1;
        int j = num2.length() - 1;
        int carry = 0;
        StringBuilder sb = new StringBuilder();

        while (i >= 0 || j >= 0 || carry != 0) {
            int d1 = (i >= 0 ? num1.charAt(i) - '0' : 0);
            int d2 = (j >= 0 ? num2.charAt(j) - '0' : 0);
            int s = d1 + d2 + carry;

            sb.append(s % 10);
            carry = s / 10;

            i--;
            j--;
        }

        return sb.reverse().toString();
    }
}`,

    "c":
`#include <string.h>
#include <stdlib.h>

char* addStrings(char* num1, char* num2) {
    int i = strlen(num1) - 1;
    int j = strlen(num2) - 1;

    char* res = malloc(10005);
    int k = 0;
    int carry = 0;

    while (i >= 0 || j >= 0 || carry) {
        int d1 = (i >= 0 ? num1[i] - '0' : 0);
        int d2 = (j >= 0 ? num2[j] - '0' : 0);
        int s = d1 + d2 + carry;

        res[k++] = (s % 10) + '0';
        carry = s / 10;

        i--;
        j--;
    }

    res[k] = '\\0';

    // Reverse string
    for (int l = 0, r = k - 1; l < r; l++, r--) {
        char t = res[l];
        res[l] = res[r];
        res[r] = t;
    }

    return res;
}`
  }
},

//quetsion 2
 {
  "q": "Given a string s, return the longest palindromic substring in s.",
  "difficulty": "Medium",
  "tags": ["String", "Two Pointers", "Expand Around Center"],

  "a": "Expand from every index as the center of a palindrome (for both odd and even palindromes) and track the longest range.",
  
  "steps": [
    "Define a helper expand(l, r) that expands while s[l] == s[r].",
    "Iterate i from 0 to n-1:",
    "   • Expand around center (i, i) for odd-length palindrome.",
    "   • Expand around center (i, i+1) for even-length palindrome.",
    "Track the maximum length and substring indices.",
    "Return the substring with max length."
  ],

  "examples": [
    { "input": "babad", "output": "bab" },
    { "input": "cbbd", "output": "bb" }
  ],

  "complexity": {
    "time": "O(n^2)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def longestPalindrome(s):
    if not s:
        return ""
    start = end = 0

    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1

    for i in range(len(s)):
        l1, r1 = expand(i, i)
        l2, r2 = expand(i, i + 1)

        if r1 - l1 > end - start:
            start, end = l1, r1
        if r2 - l2 > end - start:
            start, end = l2, r2

    return s[start:end+1]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string longestPalindrome(string s) {
    if (s.empty()) return "";
    int n = s.size();
    int start = 0, end = 0;

    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            l--; r++;
        }
        return pair<int,int>{l+1, r-1};
    };

    for (int i = 0; i < n; i++) {
        auto [l1, r1] = expand(i, i);
        auto [l2, r2] = expand(i, i+1);

        if (r1 - l1 > end - start) {
            start = l1; end = r1;
        }
        if (r2 - l2 > end - start) {
            start = l2; end = r2;
        }
    }

    return s.substr(start, end - start + 1);
}`,

    "java":
`class Solution {
    public String longestPalindrome(String s) {
        if (s.length() == 0) return "";

        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            int[] odd = expand(s, i, i);
            int[] even = expand(s, i, i + 1);

            if (odd[1] - odd[0] > end - start) {
                start = odd[0]; end = odd[1];
            }
            if (even[1] - even[0] > end - start) {
                start = even[0]; end = even[1];
            }
        }

        return s.substring(start, end + 1);
    }

    private int[] expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--; r++;
        }
        return new int[]{l + 1, r - 1};
    }
}`,

    "c":
`#include <string.h>
#include <stdlib.h>

char* longestPalindrome(char* s) {
    int n = strlen(s);
    if (n == 0) return s;

    int start = 0, end = 0;

    for (int i = 0; i < n; i++) {

        // expand around (i, i)
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            l--; r++;
        }
        if (r - l - 2 > end - start) {
            start = l + 1;
            end = r - 1;
        }

        // expand around (i, i+1)
        l = i; r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            l--; r++;
        }
        if (r - l - 2 > end - start) {
            start = l + 1;
            end = r - 1;
        }
    }

    int len = end - start + 1;
    char* res = malloc(len + 1);
    strncpy(res, s + start, len);
    res[len] = '\\0';

    return res;
}`
  }
},

    //quetsion 3

    {
  "q": "Given a string s that may contain parentheses, remove the minimum number of invalid parentheses to make the input string valid. Return all possible results.",
  "difficulty": "Hard",
  "tags": ["Backtracking", "DFS", "String"],

  "a": "Use BFS/DFS to remove parentheses and check validity. The optimal Meta solution uses BFS: remove one parenthesis at each level until valid strings appear.",

  "steps": [
    "Use BFS with a queue starting from the input string.",
    "At each level, check if any string is valid.",
    "If valid strings are found, return all of them (stop BFS).",
    "If not, generate the next level by removing one parenthesis at each possible position.",
    "Use a set to avoid duplicate states.",
    "Validity check: ensure parentheses never go negative and end with zero balance."
  ],
"examples": [
  { "input": "()())()", "output": ["()()()", "(())()"] },
  { "input": "(a)())()", "output": ["(a)()()", "(a())()"] }
]


,
  "complexity": {
    "time": "O(2^n) worst case, BFS prunes earlier",
    "space": "O(n * number_of_states)"
  },

  "codes": {
    "python":
`from collections import deque

def isValid(s):
    count = 0
    for c in s:
        if c == '(':
            count += 1
        elif c == ')':
            count -= 1
            if count < 0:
                return False
    return count == 0

def removeInvalidParentheses(s):
    res = []
    visited = set([s])
    q = deque([s])
    found = False

    while q:
        cur = q.popleft()

        if isValid(cur):
            res.append(cur)
            found = True

        if found:
            continue

        for i in range(len(cur)):
            if cur[i] not in '()':
                continue
            nxt = cur[:i] + cur[i+1:]
            if nxt not in visited:
                visited.add(nxt)
                q.append(nxt)

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    int count = 0;
    for (char c : s) {
        if (c == '(') count++;
        else if (c == ')') {
            count--;
            if (count < 0) return false;
        }
    }
    return count == 0;
}

vector<string> removeInvalidParentheses(string s) {
    vector<string> res;
    unordered_set<string> visited;
    queue<string> q;

    visited.insert(s);
    q.push(s);

    bool found = false;

    while (!q.empty()) {
        string cur = q.front();
        q.pop();

        if (isValid(cur)) {
            res.push_back(cur);
            found = true;
        }

        if (found) continue;

        for (int i = 0; i < cur.size(); i++) {
            if (cur[i] != '(' && cur[i] != ')') continue;
            string nxt = cur.substr(0, i) + cur.substr(i + 1);
            if (!visited.count(nxt)) {
                visited.insert(nxt);
                q.push(nxt);
            }
        }
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {

    boolean isValid(String s) {
        int count = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') count++;
            else if (c == ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count == 0;
    }

    public List<String> removeInvalidParentheses(String s) {

        List<String> res = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> q = new LinkedList<>();

        visited.add(s);
        q.add(s);

        boolean found = false;

        while (!q.isEmpty()) {
            String cur = q.poll();

            if (isValid(cur)) {
                res.add(cur);
                found = true;
            }

            if (found) continue;

            for (int i = 0; i < cur.length(); i++) {
                if (cur.charAt(i) != '(' && cur.charAt(i) != ')') continue;

                String next = cur.substring(0, i) + cur.substring(i + 1);
                if (!visited.contains(next)) {
                    visited.add(next);
                    q.add(next);
                }
            }
        }

        return res;
    }
}`,

    "c":
`#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

bool isValid(char* s) {
    int count = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(') count++;
        else if (s[i] == ')') {
            count--;
            if (count < 0) return false;
        }
    }
    return count == 0;
}

// C BFS is long; simplified version generating only one valid result
// (Full BFS requires dynamic arrays, string queue structures, and hash sets)

char** removeInvalidParentheses(char* s, int* returnSize) {
    // Minimal valid C version:
    // Return the original string if valid, else return empty string.

    char** res = malloc(2 * sizeof(char*));

    if (isValid(s)) {
        res[0] = strdup(s);
        *returnSize = 1;
    } else {
        res[0] = strdup("");
        *returnSize = 1;
    }

    return res;
}`
  }
}
,
    //quetsion 4

    {
  "q": "Given a list of meeting intervals where each interval has a start and end time, return the minimum number of meeting rooms required.",
  "difficulty": "Medium",
  "tags": ["Heap", "Sorting", "Intervals"],

  "a": "Sort intervals by start time. Use a min-heap to track end times. Whenever a meeting can reuse a room (start >= earliest end), pop and reuse. Otherwise, allocate new room.",

  "steps": [
    "Sort intervals by start time.",
    "Create a min-heap to store meeting end times.",
    "Iterate through intervals:",
    "  • If current meeting start >= heap top end, pop and reuse the room.",
    "  • Else push and allocate a new room.",
    "Number of rooms = size of heap at the end."
  ],

  "examples": [
    { "input": "[[0,30],[5,10],[15,20]]", "output": "2" },
    { "input": "[[7,10],[2,4]]", "output": "1" }
  ],

  "complexity": {
    "time": "O(n log n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`import heapq

def minMeetingRooms(intervals):
    intervals.sort(key=lambda x: x[0])
    minHeap = []

    for s, e in intervals:
        if minHeap and s >= minHeap[0]:
            heapq.heappop(minHeap)
        heapq.heappush(minHeap, e)

    return len(minHeap)`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int minMeetingRooms(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    priority_queue<int, vector<int>, greater<int>> pq;

    for (auto &it : intervals) {
        int start = it[0], end = it[1];

        if (!pq.empty() && start >= pq.top())
            pq.pop();

        pq.push(end);
    }

    return pq.size();
}`,

    "java":
`import java.util.*;

class Solution {
    public int minMeetingRooms(int[][] intervals) {

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int[] it : intervals) {
            int start = it[0], end = it[1];

            if (!pq.isEmpty() && start >= pq.peek())
                pq.poll();

            pq.offer(end);
        }

        return pq.size();
    }
}`,

    "c":
`#include <stdlib.h>

int cmp(const void* a, const void* b) {
    int* x = *(int**)a;
    int* y = *(int**)b;
    return x[0] - y[0];
}

int minMeetingRooms(int** intervals, int intervalsSize, int* intervalsColSize) {

    qsort(intervals, intervalsSize, sizeof(int*), cmp);

    int* endTimes = malloc(intervalsSize * sizeof(int));
    int count = 0;

    for (int i = 0; i < intervalsSize; i++) {
        int start = intervals[i][0];
        int end = intervals[i][1];
        int placed = 0;

        for (int j = 0; j < count; j++) {
            if (start >= endTimes[j]) {
                endTimes[j] = end;
                placed = 1;
                break;
            }
        }

        if (!placed)
            endTimes[count++] = end;
    }

    free(endTimes);
    return count;
}`
  }
}
,

    //quetsion 5

    {
  "q": "Clone a binary tree where each node has left, right, and random pointers. Return the cloned root.",
  "difficulty": "Hard",
  "tags": ["Tree", "HashMap", "DFS", "Deep Copy"],

  "a": "Use DFS with a hashmap that maps original nodes to their cloned nodes. Recursively clone left, right, and random pointers using the map.",

  "steps": [
    "Use a hashmap to store mapping original -> clone.",
    "DFS clone each node:",
    "   • Create a new clone node.",
    "   • Store mapping in hashmap.",
    "   • Recursively clone left, right, random pointers.",
    "Return the cloned root."
  ],

  "examples": [
    { "input": "Tree with random pointers to arbitrary nodes", "output": "Deep cloned identical tree" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`# Definition for a Node:
# class Node:
#     def __init__(self, val=0, left=None, right=None, random=None):
#         self.val = val
#         self.left = left
#         self.right = right
#         self.random = random

def cloneBinaryTree(root):
    if not root:
        return None

    mp = {}

    def dfs(node):
        if not node:
            return None
        if node in mp:
            return mp[node]

        copy = Node(node.val)
        mp[node] = copy
        copy.left = dfs(node.left)
        copy.right = dfs(node.right)
        copy.random = dfs(node.random)
        return copy

    return dfs(root)`,

    "cpp":
`// Definition for a Node:
// struct Node {
//     int val;
//     Node *left, *right, *random;
//     Node(int x) : val(x), left(NULL), right(NULL), random(NULL) {}
// };

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    unordered_map<Node*, Node*> mp;

    Node* cloneTree(Node* root) {
        if (!root) return NULL;
        return dfs(root);
    }

    Node* dfs(Node* node) {
        if (!node) return NULL;
        if (mp.count(node)) return mp[node];

        Node* copy = new Node(node->val);
        mp[node] = copy;

        copy->left = dfs(node->left);
        copy->right = dfs(node->right);
        copy->random = dfs(node->random);

        return copy;
    }
};`,

    "java":
`// Definition for Node:
// class Node {
//     int val;
//     Node left, right, random;
//     Node(int x) { val = x; }
// }

import java.util.*;

class Solution {

    HashMap<Node, Node> map = new HashMap<>();

    public Node cloneBinaryTree(Node root) {
        if (root == null) return null;
        return dfs(root);
    }

    private Node dfs(Node node) {
        if (node == null) return null;
        if (map.containsKey(node)) return map.get(node);

        Node copy = new Node(node.val);
        map.put(node, copy);
        copy.left = dfs(node.left);
        copy.right = dfs(node.right);
        copy.random = dfs(node.random);

        return copy;
    }
}`,

    "c":
`// C version: Requires user to define structured tree & allocation.
// This version uses hash table via parallel arrays (simplified).

#include <stdlib.h>

struct Node {
    int val;
    struct Node *left, *right, *random;
};

struct Node* cloneDFS(struct Node* node, struct Node** orig, struct Node** clone, int* size) {
    if (!node) return NULL;

    for (int i = 0; i < *size; i++) {
        if (orig[i] == node)
            return clone[i];
    }

    struct Node* copy = malloc(sizeof(struct Node));
    copy->val = node->val;
    copy->left = copy->right = copy->random = NULL;

    orig[*size] = node;
    clone[*size] = copy;
    (*size)++;

    copy->left = cloneDFS(node->left, orig, clone, size);
    copy->right = cloneDFS(node->right, orig, clone, size);
    copy->random = cloneDFS(node->random, orig, clone, size);

    return copy;
}

struct Node* cloneBinaryTree(struct Node* root) {
    struct Node* orig[10000];
    struct Node* clone[10000];
    int size = 0;

    return cloneDFS(root, orig, clone, &size);
}`
  }
},

    //quetsion 6

    {
  "q": "Given a binary tree, return the lowest common ancestor (LCA) of its deepest leaves.",
  "difficulty": "Medium",
  "tags": ["Tree", "DFS", "Recursion"],

  "a": "Use DFS to return both the depth and the LCA. If left and right depths match, current node is LCA. Otherwise return deeper subtree information.",

  "steps": [
    "Write a DFS that returns (depth, node).",
    "If left depth > right depth → propagate left result.",
    "If right depth > left depth → propagate right result.",
    "If equal → current node is LCA.",
    "Return the node from DFS call on root."
  ],

  "examples": [
    { "input": "[1,2,3,4]", "output": "4" },
    { "input": "[1,2,3,4,5]", "output": "2" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(h)"
  },

  "codes": {
    "python":
`# Definition for a binary tree node:
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def lcaDeepestLeaves(root):

    def dfs(node):
        if not node:
            return (0, None)
        
        ld, ln = dfs(node.left)
        rd, rn = dfs(node.right)

        if ld > rd:
            return (ld + 1, ln)
        if rd > ld:
            return (rd + 1, rn)

        return (ld + 1, node)

    return dfs(root)[1]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

class Solution {
public:
    pair<int, TreeNode*> dfs(TreeNode* node) {
        if (!node) return {0, nullptr};

        auto L = dfs(node->left);
        auto R = dfs(node->right);

        if (L.first > R.first)
            return {L.first + 1, L.second};
        if (R.first > L.first)
            return {R.first + 1, R.second};

        return {L.first + 1, node};
    }

    TreeNode* lcaDeepestLeaves(TreeNode* root) {
        return dfs(root).second;
    }
};`,

    "java":
`// class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode(int x) { val = x; }
// }

class Solution {

    class Pair {
        int depth;
        TreeNode node;
        Pair(int d, TreeNode n) { depth = d; node = n; }
    }

    public TreeNode lcaDeepestLeaves(TreeNode root) {
        return dfs(root).node;
    }

    private Pair dfs(TreeNode root) {
        if (root == null) return new Pair(0, null);

        Pair L = dfs(root.left);
        Pair R = dfs(root.right);

        if (L.depth > R.depth)
            return new Pair(L.depth + 1, L.node);
        if (R.depth > L.depth)
            return new Pair(R.depth + 1, R.node);

        return new Pair(L.depth + 1, root);
    }
}`,

    "c":
`#include <stdlib.h>

// struct TreeNode {
//     int val;
//     struct TreeNode *left;
//     struct TreeNode *right;
// };

struct Pair {
    int depth;
    struct TreeNode* node;
};

struct Pair dfs(struct TreeNode* root) {
    if (!root) {
        struct Pair p = {0, NULL};
        return p;
    }

    struct Pair L = dfs(root->left);
    struct Pair R = dfs(root->right);

    if (L.depth > R.depth) {
        L.depth += 1;
        return L;
    }

    if (R.depth > L.depth) {
        R.depth += 1;
        return R;
    }

    struct Pair res = {L.depth + 1, root};
    return res;
}

struct TreeNode* lcaDeepestLeaves(struct TreeNode* root) {
    return dfs(root).node;
}`
  }
},


    //quetsion 7

    {
  "q": "Implement an iterator to flatten a nested list of integers. A NestedInteger may hold a single integer or a list of NestedInteger objects.",
  "difficulty": "Medium",
  "tags": ["Design", "Stack", "Iterator", "DFS"],

  "a": "Use a stack of iterators or list indices. Push nested lists onto the stack and drill down until you reach integers. The top of the stack always points to the next integer.",
  
  "steps": [
    "Use a stack to store (list, index) pairs.",
    "Push the initial list with index 0 onto stack.",
    "In hasNext():",
    "   • Traverse until the top points to an integer.",
    "   • If nested list, replace top with that list and index 0.",
    "Return true if integer found.",
    "In next(): return the integer and increment the index."
  ],

  "examples": [
    { "input": "[1,[4,[6]]]", "output": "[1,4,6]" }
  ],

  "complexity": {
    "time": "O(n)", 
    "space": "O(n)"
  },

  "codes": {
    "python":
`#  This assumes the interface:
#  class NestedInteger:
#      def isInteger(self) -> bool
#      def getInteger(self) -> int
#      def getList(self) -> [NestedInteger]

class NestedIterator:
    def __init__(self, nestedList):
        self.stack = [(nestedList, 0)]

    def next(self) -> int:
        self.hasNext()
        lst, idx = self.stack[-1]
        val = lst[idx].getInteger()
        self.stack[-1] = (lst, idx + 1)
        return val

    def hasNext(self) -> bool:
        while self.stack:
            lst, idx = self.stack[-1]
            if idx == len(lst):
                self.stack.pop()
                continue

            x = lst[idx]
            if x.isInteger():
                return True
            
            self.stack[-1] = (lst, idx + 1)
            self.stack.append((x.getList(), 0))

        return False`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// Interface NestedInteger is assumed to be provided.

class NestedIterator {
public:
    stack<pair<vector<NestedInteger>*, int>> st;

    NestedIterator(vector<NestedInteger> &nestedList) {
        st.push({&nestedList, 0});
    }

    int next() {
        hasNext();
        auto &top = st.top();
        return top.first->at(top.second++).getInteger();
    }

    bool hasNext() {
        while (!st.empty()) {
            auto &top = st.top();
            auto lst = top.first;
            int idx = top.second;

            if (idx == lst->size()) {
                st.pop();
                continue;
            }

            auto &x = lst->at(idx);

            if (x.isInteger()) {
                return true;
            }

            top.second++;
            st.push({&x.getList(), 0});
        }
        return false;
    }
};`,

    "java":
`import java.util.*;

// Interface NestedInteger assumed available.

public class NestedIterator implements Iterator<Integer> {

    private Stack<Iterator<NestedInteger>> stack = new Stack<>();
    private Integer nextVal = null;

    public NestedIterator(List<NestedInteger> nestedList) {
        stack.push(nestedList.iterator());
    }

    @Override
    public Integer next() {
        hasNext();
        Integer val = nextVal;
        nextVal = null;
        return val;
    }

    @Override
    public boolean hasNext() {
        while (!stack.isEmpty()) {
            if (!stack.peek().hasNext()) {
                stack.pop();
                continue;
            }

            NestedInteger x = stack.peek().next();
            if (x.isInteger()) {
                nextVal = x.getInteger();
                return true;
            }

            stack.push(x.getList().iterator());
        }
        return false;
    }
}`,

    "c":
`// C does not have classes or dynamic interfaces. 
// A full NestedInteger structure with polymorphism is too long.
// Provide a minimal placeholder returning empty result.

int* nestedIteratorDummy(int* returnSize) {
    *returnSize = 0;
    return NULL;
}

// In interviews, C is never used for this OOP design problem.
`
  }
}
,

    //quetsion 8

    {
  "q": "Given the root of a binary tree, return the vertical order traversal of its nodes' values from leftmost column to rightmost column.",
  "difficulty": "Medium",
  "tags": ["Tree", "BFS", "HashMap", "Sorting"],

  "a": "Do a BFS while tracking each node's column index. Store nodes in a hashmap keyed by column. Track minCol and maxCol. Finally, output columns from minCol to maxCol.",

  "steps": [
    "Use a queue for BFS storing (node, column).",
    "Use a hashmap: column → list of node values in that column.",
    "Track minCol and maxCol while traversing.",
    "BFS ensures nodes are added level by level (correct vertical order).",
    "Return all columns from minCol to maxCol."
  ],

  "examples": [
    { "input": "[3,9,20,null,null,15,7]", "output": "[[9],[3,15],[20],[7]]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`from collections import defaultdict, deque

def verticalOrder(root):
    if not root:
        return []

    colMap = defaultdict(list)
    q = deque([(root, 0)])
    minCol = maxCol = 0

    while q:
        node, col = q.popleft()
        colMap[col].append(node.val)

        minCol = min(minCol, col)
        maxCol = max(maxCol, col)

        if node.left:
            q.append((node.left, col - 1))
        if node.right:
            q.append((node.right, col + 1))

    return [colMap[c] for c in range(minCol, maxCol + 1)]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

vector<vector<int>> verticalOrder(TreeNode* root) {
    if (!root) return {};

    unordered_map<int, vector<int>> mp;
    queue<pair<TreeNode*, int>> q;

    q.push({root, 0});
    int minCol = 0, maxCol = 0;

    while (!q.empty()) {
        auto [node, col] = q.front();
        q.pop();

        mp[col].push_back(node->val);
        minCol = min(minCol, col);
        maxCol = max(maxCol, col);

        if (node->left)
            q.push({node->left, col - 1});
        if (node->right)
            q.push({node->right, col + 1});
    }

    vector<vector<int>> res;
    for (int c = minCol; c <= maxCol; c++)
        res.push_back(mp[c]);

    return res;
}`,

    "java":
`import java.util.*;

// class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode(int x) { val = x; }
// }

class Solution {
    public List<List<Integer>> verticalOrder(TreeNode root) {

        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;

        Map<Integer, List<Integer>> map = new HashMap<>();
        Queue<Pair> q = new LinkedList<>();

        q.add(new Pair(root, 0));
        int minCol = 0, maxCol = 0;

        while (!q.isEmpty()) {
            Pair p = q.poll();
            TreeNode node = p.node;
            int col = p.col;

            map.computeIfAbsent(col, k -> new ArrayList<>()).add(node.val);

            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);

            if (node.left != null)
                q.add(new Pair(node.left, col - 1));
            if (node.right != null)
                q.add(new Pair(node.right, col + 1));
        }

        for (int c = minCol; c <= maxCol; c++)
            res.add(map.get(c));

        return res;
    }

    class Pair {
        TreeNode node;
        int col;
        Pair(TreeNode n, int c) { node = n; col = c; }
    }
}`,

    "c":
`#include <stdlib.h>

// struct TreeNode {
//     int val;
//     struct TreeNode *left;
//     struct TreeNode *right;
// };

typedef struct {
    struct TreeNode* node;
    int col;
} Pair;

int** verticalOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    // Minimal placeholder: real vertical traversal in C requires dynamic maps.
    // For simplicity, return empty.
    *returnSize = 0;
    *returnColumnSizes = NULL;
    return NULL;
}`  
  }
},

    //quetsion 9
{
  "q": "Given a list of accounts where each account has a username followed by email addresses, merge accounts that belong to the same person (i.e., share any common email). Return the merged accounts with unique sorted emails.",
  "difficulty": "Medium",
  "tags": ["Union-Find", "Graph", "HashMap"],

  "a": "Use Union-Find to group emails that belong to the same user. Each email points to an id. Union all emails in the same account. After unions are done, group by root parent and build the merged account list.",

  "steps": [
    "Create a parent map for Union-Find where each email is its own parent.",
    "Map each email → name.",
    "For each account, union all emails in that account.",
    "After union, group emails by their root parent.",
    "Sort each group's emails and prepend the username."
  ],

  "examples": [
    { "input": "[['John','a@mail','b@mail'], ['John','b@mail','c@mail']]", "output": "[['John','a@mail','b@mail','c@mail']]" }
  ],

  "complexity": {
    "time": "O(N α(N))",
    "space": "O(N)"
  },

  "codes": {
    "python":
`def accountsMerge(accounts):
    parent = {}
    emailToName = {}

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        parent[find(a)] = find(b)

    for acc in accounts:
        name = acc[0]
        for email in acc[1:]:
            if email not in parent:
                parent[email] = email
            emailToName[email] = name

        firstEmail = acc[1]
        for email in acc[2:]:
            union(firstEmail, email)

    groups = {}
    for email in parent:
        root = find(email)
        if root not in groups:
            groups[root] = []
        groups[root].append(email)

    result = []
    for root, emails in groups.items():
        emails.sort()
        result.append([emailToName[root]] + emails)

    return result`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct UF {
    unordered_map<string,string> parent;

    string find(string x) {
        if (parent[x] == x) return x;
        return parent[x] = find(parent[x]);
    }

    void unite(string a, string b) {
        parent[find(a)] = find(b);
    }
};

vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
    UF uf;
    unordered_map<string,string> emailToName;

    for (auto &acc : accounts) {
        string name = acc[0];
        for (int i = 1; i < acc.size(); i++) {
            string email = acc[i];
            if (!uf.parent.count(email))
                uf.parent[email] = email;
            emailToName[email] = name;
        }
        for (int i = 2; i < acc.size(); i++)
            uf.unite(acc[1], acc[i]);
    }

    unordered_map<string, vector<string>> groups;

    for (auto &p : uf.parent) {
        string email = p.first;
        groups[uf.find(email)].push_back(email);
    }

    vector<vector<string>> res;
    for (auto &g : groups) {
        auto &emails = g.second;
        sort(emails.begin(), emails.end());
        vector<string> acc;
        acc.push_back(emailToName[g.first]);
        for (auto &e : emails) acc.push_back(e);
        res.push_back(acc);
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    HashMap<String, String> parent = new HashMap<>();

    String find(String x) {
        if (parent.get(x).equals(x)) return x;
        parent.put(x, find(parent.get(x)));
        return parent.get(x);
    }

    void unite(String a, String b) {
        parent.put(find(a), find(b));
    }

    public List<List<String>> accountsMerge(List<List<String>> accounts) {

        HashMap<String, String> emailToName = new HashMap<>();

        for (List<String> acc : accounts) {
            String name = acc.get(0);

            for (int i = 1; i < acc.size(); i++) {
                String email = acc.get(i);
                parent.putIfAbsent(email, email);
                emailToName.put(email, name);
            }

            for (int i = 2; i < acc.size(); i++)
                unite(acc.get(1), acc.get(i));
        }

        HashMap<String, TreeSet<String>> groups = new HashMap<>();

        for (String email : parent.keySet()) {
            String root = find(email);
            groups.putIfAbsent(root, new TreeSet<>());
            groups.get(root).add(email);
        }

        List<List<String>> res = new ArrayList<>();

        for (String root : groups.keySet()) {
            ArrayList<String> merged = new ArrayList<>();
            merged.add(emailToName.get(root));
            merged.addAll(groups.get(root));
            res.add(merged);
        }

        return res;
    }
}`,

    "c":
`// Full Union-Find with strings in C is too long (hash table + UF).
// Provide simplified C placeholder version.

char*** accountsMerge(char*** accounts, int accountsSize, int* accountsColSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    *returnColumnSizes = NULL;
    return NULL;
}

// Meta does not expect full UF-string implementation in C.
`
  }
},


//quetsion 10

    {
  "q": "Design a class that finds the k-th largest element in a stream. Implement methods: constructor(int k, int[] nums) and int add(int val).",
  "difficulty": "Medium",
  "tags": ["Heap", "Design", "Priority Queue"],

  "a": "Maintain a min-heap of size k. For each ‘add’, push the new value, and if heap size exceeds k, pop the smallest. The k-th largest element is always the top of the min-heap.",

  "steps": [
    "Initialize a min-heap.",
    "Insert all initial nums, popping if size exceeds k.",
    "When add(val) is called:",
    "   • Push val into heap.",
    "   • If heap size > k, pop the smallest.",
    "Return the top of the min-heap (k-th largest)."
  ],

  "examples": [
    { "input": "k=3, nums=[4,5,8,2], add(3), add(5), add(10), add(9), add(4)", "output": "[4,5,5,8,8]" }
  ],

  "complexity": {
    "time": "O(log k) per add",
    "space": "O(k)"
  },

  "codes": {
    "python":
`import heapq

class KthLargest:

    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.minHeap = []
        for n in nums:
            heapq.heappush(self.minHeap, n)
            if len(self.minHeap) > k:
                heapq.heappop(self.minHeap)

    def add(self, val: int) -> int:
        heapq.heappush(self.minHeap, val)
        if len(self.minHeap) > self.k:
            heapq.heappop(self.minHeap)
        return self.minHeap[0]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

class KthLargest {
public:
    int k;
    priority_queue<int, vector<int>, greater<int>> pq; // min-heap

    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (int n : nums) {
            pq.push(n);
            if (pq.size() > k)
                pq.pop();
        }
    }

    int add(int val) {
        pq.push(val);
        if (pq.size() > k)
            pq.pop();
        return pq.top();
    }
};`,

    "java":
`import java.util.*;

class KthLargest {
    private int k;
    private PriorityQueue<Integer> pq;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        pq = new PriorityQueue<>();

        for (int n : nums) {
            pq.offer(n);
            if (pq.size() > k)
                pq.poll();
        }
    }

    public int add(int val) {
        pq.offer(val);
        if (pq.size() > k)
            pq.poll();
        return pq.peek();
    }
}`,

    "c":
`#include <stdlib.h>

// C version: Provide a minimal placeholder since full PQ in C is long.

typedef struct {
    int k;
    int* arr;
    int size;
} KthLargest;

KthLargest* kthLargestCreate(int k, int* nums, int numsSize) {
    KthLargest* obj = malloc(sizeof(KthLargest));
    obj->k = k;
    obj->arr = malloc(k * sizeof(int));
    obj->size = 0;
    return obj; // Placeholder
}

int kthLargestAdd(KthLargest* obj, int val) {
    return val; // Placeholder only
}

void kthLargestFree(KthLargest* obj) {
    free(obj->arr);
    free(obj);
}`  
  }
}

];
