import { QAItem } from "./types";
export const Adobe_QA: QAItem[] = [
    //quetsion 1

    {
  "q": "Given a string s, return the length of the longest substring without repeating characters.",
  "difficulty": "Medium",
  "tags": ["Sliding Window", "HashMap", "String"],

  "a": "Use a sliding window with a hash map to store last seen positions of characters. Move left pointer when duplicates appear and track max length.",

  "steps": [
    "Initialize hashmap lastSeen and two pointers left=0 and maxLen=0.",
    "Iterate through string with index right:",
    "   • If s[right] is already in hashmap and lastSeen[s[right]] >= left, move left to lastSeen[s[right]] + 1.",
    "   • Update lastSeen for current character.",
    "   • Update maxLen = max(maxLen, right-left+1).",
    "Return maxLen."
  ],

  "examples": [
    { "input": "abcabcbb", "output": "3" },
    { "input": "bbbbb", "output": "1" },
    { "input": "pwwkew", "output": "3" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1) (size of character map)"
  },

  "codes": {
    "python":
`def lengthOfLongestSubstring(s):
    lastSeen = {}
    left = 0
    maxLen = 0

    for right, ch in enumerate(s):
        if ch in lastSeen and lastSeen[ch] >= left:
            left = lastSeen[ch] + 1

        lastSeen[ch] = right
        maxLen = max(maxLen, right - left + 1)

    return maxLen`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<int> lastSeen(256, -1);
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        if (lastSeen[s[right]] >= left)
            left = lastSeen[s[right]] + 1;

        lastSeen[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,

    "java":
`import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastSeen = new int[256];
        Arrays.fill(lastSeen, -1);

        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            if (lastSeen[c] >= left)
                left = lastSeen[c] + 1;

            lastSeen[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,

    "c":
`#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int lastSeen[256];
    for (int i = 0; i < 256; i++)
        lastSeen[i] = -1;

    int left = 0, maxLen = 0;

    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char c = s[right];

        if (lastSeen[c] >= left)
            left = lastSeen[c] + 1;

        lastSeen[c] = right;

        int len = right - left + 1;
        if (len > maxLen)
            maxLen = len;
    }

    return maxLen;
}`
  }
},

    //quetsion 2

    {
  "q": "Given an array of integers heights representing the histogram's bar heights, return the area of the largest rectangle in the histogram.",
  "difficulty": "Hard",
  "tags": ["Monotonic Stack", "Array"],

  "a": "Use a monotonic increasing stack. When a bar is shorter than the bar on top of the stack, pop from stack and compute area with popped bar as the smallest height. Append 0 at end to force final pops.",

  "steps": [
    "Append a zero height to heights to ensure processing of all bars.",
    "Use a stack to store indices of increasing bar heights.",
    "For each index i:",
    "   • While stack not empty and heights[i] < heights[stack.top]:",
    "         - pop top index h",
    "         - compute width = i - 1 - stack.top (after pop) or i if stack empty",
    "         - update max area",
    "   • Push current index onto stack.",
    "Return max area."
  ],

  "examples": [
    { "input": "[2,1,5,6,2,3]", "output": "10" },
    { "input": "[2,4]", "output": "4" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def largestRectangleArea(heights):
    heights.append(0)
    stack = []
    maxArea = 0

    for i, h in enumerate(heights):
        while stack and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            maxArea = max(maxArea, height * width)
        stack.append(i)

    return maxArea`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    heights.push_back(0);
    stack<int> st;
    int maxArea = 0;

    for (int i = 0; i < heights.size(); i++) {
        while (!st.empty() && heights[i] < heights[st.top()]) {
            int height = heights[st.top()];
            st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }

    return maxArea;
}`,

    "java":
`import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int[] h = Arrays.copyOf(heights, heights.length + 1);
        h[h.length - 1] = 0;

        Stack<Integer> st = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i < h.length; i++) {
            while (!st.isEmpty() && h[i] < h[st.peek()]) {
                int height = h[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            st.push(i);
        }

        return maxArea;
    }
}`,

    "c":
`#include <stdlib.h>

int largestRectangleArea(int* heights, int heightsSize) {
    int* h = malloc((heightsSize + 1) * sizeof(int));
    for (int i = 0; i < heightsSize; i++)
        h[i] = heights[i];
    h[heightsSize] = 0;

    int* stack = malloc((heightsSize + 1) * sizeof(int));
    int top = -1;

    int maxArea = 0;

    for (int i = 0; i < heightsSize + 1; i++) {
        while (top != -1 && h[i] < h[stack[top]]) {
            int height = h[stack[top--]];
            int width = (top == -1) ? i : i - stack[top] - 1;
            int area = height * width;
            if (area > maxArea) maxArea = area;
        }
        stack[++top] = i;
    }

    free(h);
    free(stack);
    return maxArea;
}`
  }
},

    //quetsion 3
    
    {
  "q": "Given two words beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord. Only one letter can change at a time and transformed word must exist in wordList.",
  "difficulty": "Hard",
  "tags": ["BFS", "HashMap", "Graph"],

  "a": "Use BFS. At each step, generate all possible 1-letter variations. Push next valid words into queue and mark visited. The first time we reach endWord, return the level.",

  "steps": [
    "Put all dictionary words into a set for O(1) lookup.",
    "If endWord not in set, return 0 immediately.",
    "Use BFS with queue storing (currentWord, level).",
    "For each word, change each position a–z and check if new word is in the set.",
    "Push valid words to queue and remove from set to avoid revisits.",
    "When endWord is reached, return the level.",
    "If BFS ends without finding it, return 0."
  ],

  "examples": [
    { "input": "beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog']", "output": "5" },
    { "input": "beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log']", "output": "0" }
  ],

  "complexity": {
    "time": "O(N * 26 * L)",
    "space": "O(N)"
  },

  "codes": {
    "python":
`from collections import deque

def ladderLength(beginWord, endWord, wordList):
    wordSet = set(wordList)
    if endWord not in wordSet:
        return 0

    q = deque([(beginWord, 1)])

    while q:
        word, level = q.popleft()

        if word == endWord:
            return level

        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                newWord = word[:i] + c + word[i+1:]
                if newWord in wordSet:
                    wordSet.remove(newWord)
                    q.append((newWord, level + 1))

    return 0`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;

    queue<pair<string, int>> q;
    q.push({beginWord, 1});

    while (!q.empty()) {
        auto [word, level] = q.front();
        q.pop();

        if (word == endWord) return level;

        for (int i = 0; i < word.size(); i++) {
            string temp = word;
            for (char c = 'a'; c <= 'z'; c++) {
                temp[i] = c;

                if (wordSet.count(temp)) {
                    wordSet.erase(temp);
                    q.push({temp, level + 1});
                }
            }
        }
    }
    return 0;
}`,

    "java":
`import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {

        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(beginWord, 1));

        while (!q.isEmpty()) {
            Pair p = q.poll();
            String word = p.word;
            int level = p.level;

            if (word.equals(endWord)) return level;

            char[] arr = word.toCharArray();
            for (int i = 0; i < arr.length; i++) {
                char old = arr[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    arr[i] = c;
                    String next = new String(arr);

                    if (wordSet.contains(next)) {
                        wordSet.remove(next);
                        q.add(new Pair(next, level + 1));
                    }
                }
                arr[i] = old;
            }
        }

        return 0;
    }

    class Pair {
        String word;
        int level;
        Pair(String w, int l) { word = w; level = l; }
    }
}`,

    "c":
`#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

bool existsInSet(char** set, int size, char* word, int* indexOut) {
    for (int i = 0; i < size; i++) {
        if (set[i] && strcmp(set[i], word) == 0) {
            *indexOut = i;
            return true;
        }
    }
    return false;
}

int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {
    int L = strlen(beginWord);

    int qSize = 100000;
    char** qWord = malloc(qSize * sizeof(char*));
    int* qLevel = malloc(qSize * sizeof(int));
    int front = 0, rear = 0;

    qWord[rear] = strdup(beginWord);
    qLevel[rear] = 1;
    rear++;

    int idx;

    while (front < rear) {
        char* word = qWord[front];
        int level = qLevel[front];
        front++;

        if (strcmp(word, endWord) == 0) {
            return level;
        }

        for (int i = 0; i < L; i++) {
            char* temp = strdup(word);
            for (char c = 'a'; c <= 'z'; c++) {
                temp[i] = c;

                if (existsInSet(wordList, wordListSize, temp, &idx)) {
                    wordList[idx] = NULL;
                    qWord[rear] = strdup(temp);
                    qLevel[rear] = level + 1;
                    rear++;
                }
            }
            free(temp);
        }

        free(word);
    }

    return 0;
}`
  }
},

    //quetsion 4

    {
  "q": "Given an integer array nums and an integer k, return the k most frequent elements. Return the answer in any order.",
  "difficulty": "Medium",
  "tags": ["Heap", "HashMap", "Bucket Sort"],

  "a": "Count frequency using hashmap. Use a max-heap OR bucket sort. Best approach: bucket sort where index represents frequency.",
  
  "steps": [
    "Count frequencies of each number using a hashmap.",
    "Create buckets where bucket[i] holds numbers that appear i times.",
    "Traverse buckets from highest frequency to lowest.",
    "Collect numbers until you have k elements.",
    "Return the result."
  ],

  "examples": [
    { "input": "nums=[1,1,1,2,2,3], k=2", "output": "[1,2]" },
    { "input": "nums=[1], k=1", "output": "[1]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`from collections import defaultdict

def topKFrequent(nums, k):
    freq = defaultdict(int)

    for n in nums:
        freq[n] += 1

    buckets = [[] for _ in range(len(nums) + 1)]

    for num, f in freq.items():
        buckets[f].append(num)

    res = []
    for i in range(len(buckets)-1, -1, -1):
        for num in buckets[i]:
            res.append(num)
            if len(res) == k:
                return res

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int n : nums)
        freq[n]++;

    vector<vector<int>> buckets(nums.size() + 1);

    for (auto &p : freq)
        buckets[p.second].push_back(p.first);

    vector<int> res;

    for (int i = buckets.size() - 1; i >= 0 && res.size() < k; i--) {
        for (int num : buckets[i]) {
            res.push_back(num);
            if (res.size() == k)
                break;
        }
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        HashMap<Integer, Integer> freq = new HashMap<>();

        for (int n : nums)
            freq.put(n, freq.getOrDefault(n, 0) + 1);

        List<List<Integer>> buckets = new ArrayList<>();
        for (int i = 0; i <= nums.length; i++)
            buckets.add(new ArrayList<>());

        for (int key : freq.keySet())
            buckets.get(freq.get(key)).add(key);

        int[] res = new int[k];
        int idx = 0;

        for (int i = buckets.size() - 1; i >= 0 && idx < k; i--) {
            for (int num : buckets.get(i)) {
                res[idx++] = num;
                if (idx == k) break;
            }
        }

        return res;
    }
}`,

    "c":
`#include <stdlib.h>

typedef struct {
    int num;
    int freq;
} Pair;

int cmp(const void* a, const void* b) {
    Pair* x = (Pair*)a;
    Pair* y = (Pair*)b;
    return y->freq - x->freq;
}

int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    Pair* arr = malloc(numsSize * sizeof(Pair));
    int count = 0;

    for (int i = 0; i < numsSize; i++) {
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (arr[j].num == nums[i]) {
                arr[j].freq++;
                found = 1;
                break;
            }
        }
        if (!found) {
            arr[count].num = nums[i];
            arr[count].freq = 1;
            count++;
        }
    }

    qsort(arr, count, sizeof(Pair), cmp);

    int* res = malloc(k * sizeof(int));
    for (int i = 0; i < k; i++)
        res[i] = arr[i].num;

    *returnSize = k;
    free(arr);
    return res;
}`
  }
},

    //quetsion 5

    {
  "q": "Given two strings s and t, return the minimum window in s which contains all the characters in t. If no such window exists, return an empty string.",
  "difficulty": "Hard",
  "tags": ["Sliding Window", "HashMap", "Two Pointers"],

  "a": "Use sliding window with two hash maps: one for target frequencies, one for current window. Expand right pointer until all characters match, then shrink left pointer to minimize the window.",

  "steps": [
    "Count frequencies of characters in t using a hashmap.",
    "Use two pointers (left, right).",
    "Expand right pointer and update window counts.",
    "When all required characters are satisfied:",
    "    • Update minimum window size.",
    "    • Try to shrink window from left.",
    "Continue scanning until right reaches end.",
    "Return the minimum window found."
  ],

  "examples": [
    { "input": "s='ADOBECODEBANC', t='ABC'", "output": "'BANC'" },
    { "input": "s='a', t='a'", "output": "'a'" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`from collections import Counter

def minWindow(s, t):
    if not t or not s:
        return ""

    need = Counter(t)
    missing = len(t)
    left = start = end = 0

    for right, ch in enumerate(s, 1):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1

        if missing == 0:
            while left < right and need[s[left]] < 0:
                need[s[left]] += 1
                left += 1

            if end == 0 or right - left < end - start:
                start, end = left, right

            need[s[left]] += 1
            missing += 1
            left += 1

    return s[start:end]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string minWindow(string s, string t) {
    if (t.empty() || s.empty()) return "";

    unordered_map<char, int> need;
    for (char c : t) need[c]++;

    int missing = t.size();
    int left = 0, start = 0, minLen = INT_MAX;

    for (int right = 0; right < s.size(); right++) {
        if (need[s[right]] > 0)
            missing--;

        need[s[right]]--;

        while (missing == 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }

            need[s[left]]++;
            if (need[s[left]] > 0)
                missing++;

            left++;
        }
    }

    return (minLen == INT_MAX) ? "" : s.substr(start, minLen);
}`,

    "java":
`import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return "";

        int[] need = new int[128];
        for (char c : t.toCharArray())
            need[c]++;

        int required = t.length();
        int left = 0, minLen = Integer.MAX_VALUE, start = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            if (need[c] > 0)
                required--;

            need[c]--;

            while (required == 0) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    start = left;
                }

                char lc = s.charAt(left);
                need[lc]++;

                if (need[lc] > 0)
                    required++;

                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}`,

    "c":
`#include <string.h>
#include <limits.h>
#include <stdbool.h>
#include <stdlib.h>

char* minWindow(char* s, char* t) {
    int need[128] = {0};
    int missing = strlen(t);

    for (int i = 0; t[i]; i++)
        need[(unsigned char)t[i]]++;

    int left = 0, start = 0, minLen = INT_MAX;
    int slen = strlen(s);

    for (int right = 0; right < slen; right++) {
        if (need[(unsigned char)s[right]] > 0)
            missing--;

        need[(unsigned char)s[right]]--;

        while (missing == 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start = left;
            }

            need[(unsigned char)s[left]]++;
            if (need[(unsigned char)s[left]] > 0)
                missing++;

            left++;
        }
    }

    if (minLen == INT_MAX)
        return strdup("");

    char* res = malloc(minLen + 1);
    strncpy(res, s + start, minLen);
    res[minLen] = '\\0';
    return res;
}`
  }
},

    //quetsion 6


    {
  "q": "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
  "difficulty": "Medium",
  "tags": ["Backtracking", "DFS", "Bitmasking"],

  "a": "Use backtracking/DFS. At each index, choose either to include the element or skip it, generating all subsets.",
  
  "steps": [
    "Initialize empty result list.",
    "Define a DFS function taking current index and current subset.",
    "If index reaches end of nums → append subset to result.",
    "Else:",
    "   • Exclude nums[index] → DFS(index+1).",
    "   • Include nums[index] → DFS(index+1).",
    "Return result."
  ],

  "examples": [
    { "input": "[1,2,3]", "output": "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" },
    { "input": "[0]", "output": "[[],[0]]" }
  ],

  "complexity": {
    "time": "O(2^n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def subsets(nums):
    res = []
    subset = []

    def dfs(i):
        if i == len(nums):
            res.append(subset.copy())
            return

        dfs(i + 1)

        subset.append(nums[i])
        dfs(i + 1)
        subset.pop()

    dfs(0)
    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> subset;

    function<void(int)> dfs = [&](int i) {
        if (i == nums.size()) {
            res.push_back(subset);
            return;
        }

        dfs(i + 1);

        subset.push_back(nums[i]);
        dfs(i + 1);
        subset.pop_back();
    };

    dfs(0);
    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> curr = new ArrayList<>();

    public List<List<Integer>> subsets(int[] nums) {
        dfs(nums, 0);
        return res;
    }

    private void dfs(int[] nums, int i) {
        if (i == nums.length) {
            res.add(new ArrayList<>(curr));
            return;
        }

        dfs(nums, i + 1);

        curr.add(nums[i]);
        dfs(nums, i + 1);
        curr.remove(curr.size() - 1);
    }
}`,

    "c":
`#include <stdlib.h>

void dfs(int* nums, int numsSize, int i, int** res, int* colSizes, int* returnSize, int* path, int pathSize) {
    if (i == numsSize) {
        res[*returnSize] = malloc(pathSize * sizeof(int));
        for (int j = 0; j < pathSize; j++)
            res[*returnSize][j] = path[j];
        colSizes[*returnSize] = pathSize;
        (*returnSize)++;
        return;
    }

    dfs(nums, numsSize, i + 1, res, colSizes, returnSize, path, pathSize);

    path[pathSize] = nums[i];
    dfs(nums, numsSize, i + 1, res, colSizes, returnSize, path, pathSize + 1);
}

int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int total = 1 << numsSize;
    int** res = malloc(total * sizeof(int*));
    int* colSizes = malloc(total * sizeof(int));
    int* path = malloc(numsSize * sizeof(int));

    *returnSize = 0;
    dfs(nums, numsSize, 0, res, colSizes, returnSize, path, 0);

    *returnColumnSizes = colSizes;
    free(path);
    return res;
}`
  }
},

    //quetsion 7

    {
  "q": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST has the property that every node's value is strictly greater than all values in its left subtree and strictly less than all values in its right subtree.",
  "difficulty": "Medium",
  "tags": ["Tree", "DFS", "Recursion"],

  "a": "Use recursion with a valid range (min, max). Every node must lie strictly inside the range. For left subtree update max to node.val, for right subtree update min to node.val.",

  "steps": [
    "Define a helper function that takes a node and a range (low, high).",
    "If node is null → return true.",
    "If node.val is not inside (low < val < high) → return false.",
    "Recursively check left subtree with updated high = node.val.",
    "Recursively check right subtree with updated low = node.val.",
    "Return true only if both sides are valid."
  ],

  "examples": [
    { "input": "[2,1,3]", "output": "true" },
    { "input": "[5,1,4,null,null,3,6]", "output": "false" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(h) (height of tree)"
  },

  "codes": {
    "python":
`# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def isValidBST(root):
    def dfs(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)

    return dfs(root, float('-inf'), float('inf'))`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

bool dfs(TreeNode* node, long low, long high) {
    if (!node) return true;
    if (!(low < node->val && node->val < high)) return false;

    return dfs(node->left, low, node->val) &&
           dfs(node->right, node->val, high);
}

bool isValidBST(TreeNode* root) {
    return dfs(root, LONG_MIN, LONG_MAX);
}`,

    "java":
`// class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode(int x) { val = x; }
// }

class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long low, long high) {
        if (node == null) return true;

        if (!(low < node.val && node.val < high))
            return false;

        return validate(node.left, low, node.val) &&
               validate(node.right, node.val, high);
    }
}`,

    "c":
`#include <limits.h>
#include <stdbool.h>

// struct TreeNode {
//     int val;
//     struct TreeNode *left;
//     struct TreeNode *right;
// };

bool validate(struct TreeNode* node, long low, long high) {
    if (!node) return true;

    if (!(low < node->val && node->val < high))
        return false;

    return validate(node->left, low, node->val) &&
           validate(node->right, node->val, high);
}

bool isValidBST(struct TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`
  }
},

    //quetsion 8

    {
  "q": "Given a rotated sorted array nums and a target value, return the index of target. If it does not exist, return -1. You must write an O(log n) solution.",
  "difficulty": "Medium",
  "tags": ["Binary Search", "Array"],

  "a": "Use modified binary search. One half of the array is always sorted. Check which half is sorted, then decide whether to search that half or the other.",

  "steps": [
    "Initialize left=0, right=n-1.",
    "While left <= right:",
    "   • mid = (left + right) // 2.",
    "   • If nums[mid] == target → return mid.",
    "   • Check if left half is sorted (nums[left] <= nums[mid]).",
    "       - If target in this sorted half → move right = mid-1.",
    "       - Else search the right half.",
    "   • Else right half is sorted.",
    "       - If target in sorted right half → move left = mid+1.",
    "       - Else search left half.",
    "If not found, return -1."
  ],

  "examples": [
    { "input": "nums=[4,5,6,7,0,1,2], target=0", "output": "4" },
    { "input": "nums=[4,5,6,7,0,1,2], target=3", "output": "-1" }
  ],

  "complexity": {
    "time": "O(log n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;

    while (left <= right) {
        int mid = (left + right) / 2;

        if (nums[mid] == target) return mid;

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        else {
            if (nums[mid] < target && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }

    return -1;
}`,

    "java":
`class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;

            if (nums[mid] == target)
                return mid;

            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid])
                    right = mid - 1;
                else
                    left = mid + 1;
            }
            else {
                if (nums[mid] < target && target <= nums[right])
                    left = mid + 1;
                else
                    right = mid - 1;
            }
        }

        return -1;
    }
}`,

    "c":
`int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;

    while (left <= right) {
        int mid = (left + right) / 2;

        if (nums[mid] == target)
            return mid;

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        else {
            if (nums[mid] < target && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }

    return -1;
}`
  }
},

    //quetsion 9

    {
  "q": "You are given numCourses and an array prerequisites where prerequisites[i] = [a, b] means to take course a you must first take course b. Return true if it is possible to finish all courses.",
  "difficulty": "Medium",
  "tags": ["Graph", "Topological Sort", "BFS", "DFS"],

  "a": "Use topological sorting with Kahn’s algorithm. Compute indegrees, push all zero indegree nodes into a queue, and process them. If processed count equals numCourses, return true.",

  "steps": [
    "Build adjacency list for graph.",
    "Compute indegree of every course.",
    "Add all courses with indegree 0 to a queue.",
    "While queue not empty:",
    "    • Pop course u.",
    "    • Increment processed count.",
    "    • For each neighbor v, decrease indegree[v].",
    "    • If indegree[v] becomes 0, push to queue.",
    "If processed count == numCourses → return true, else false."
  ],

  "examples": [
    { "input": "numCourses=2, prerequisites=[[1,0]]", "output": "true" },
    { "input": "numCourses=2, prerequisites=[[1,0],[0,1]]", "output": "false" }
]
,

  "complexity": {
    "time": "O(V + E)",
    "space": "O(V + E)"
  },

  "codes": {
    "python":
`from collections import deque

def canFinish(numCourses, prerequisites):
    adj = [[] for _ in range(numCourses)]
    indeg = [0] * numCourses

    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1

    q = deque()
    for i in range(numCourses):
        if indeg[i] == 0:
            q.append(i)

    count = 0

    while q:
        u = q.popleft()
        count += 1

        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    return count == numCourses`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indeg(numCourses, 0);

    for (auto &p : prerequisites) {
        int a = p[0], b = p[1];
        adj[b].push_back(a);
        indeg[a]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++)
        if (indeg[i] == 0)
            q.push(i);

    int count = 0;

    while (!q.empty()) {
        int u = q.front(); q.pop();
        count++;

        for (int v : adj[u]) {
            indeg[v]--;
            if (indeg[v] == 0)
                q.push(v);
        }
    }

    return count == numCourses;
}`,

    "java":
`import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++)
            adj.add(new ArrayList<>());

        int[] indeg = new int[numCourses];

        for (int[] p : prerequisites) {
            int a = p[0], b = p[1];
            adj.get(b).add(a);
            indeg[a]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++)
            if (indeg[i] == 0)
                q.add(i);

        int count = 0;

        while (!q.isEmpty()) {
            int u = q.poll();
            count++;

            for (int v : adj.get(u)) {
                indeg[v]--;
                if (indeg[v] == 0)
                    q.add(v);
            }
        }

        return count == numCourses;
    }
}`,

    "c":
`#include <stdlib.h>

bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    int** adj = malloc(numCourses * sizeof(int*));
    int* adjSize = calloc(numCourses, sizeof(int));
    int* indeg = calloc(numCourses, sizeof(int));

    for (int i = 0; i < numCourses; i++)
        adj[i] = malloc(prerequisitesSize * sizeof(int));

    for (int i = 0; i < prerequisitesSize; i++) {
        int a = prerequisites[i][0];
        int b = prerequisites[i][1];
        adj[b][adjSize[b]++] = a;
        indeg[a]++;
    }

    int* queue = malloc(numCourses * sizeof(int));
    int front = 0, rear = 0;

    for (int i = 0; i < numCourses; i++)
        if (indeg[i] == 0)
            queue[rear++] = i;

    int count = 0;

    while (front < rear) {
        int u = queue[front++];
        count++;

        for (int i = 0; i < adjSize[u]; i++) {
            int v = adj[u][i];
            indeg[v]--;
            if (indeg[v] == 0)
                queue[rear++] = v;
        }
    }

    free(queue);
    for (int i = 0; i < numCourses; i++)
        free(adj[i]);
    free(adj);
    free(adjSize);
    free(indeg);

    return count == numCourses;
}`
  }
}
,
    //quetsion 10
    {
  "q": "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
  "difficulty": "Medium",
  "tags": ["DP", "Binary Search", "Greedy"],

  "a": "The optimal solution uses a greedy approach with binary search. Maintain a 'tails' array where tails[i] is the smallest ending value of an increasing subsequence of length i+1. For each number, use binary search to place it in tails.",

  "steps": [
    "Initialize an empty list tails.",
    "For each number x in nums:",
    "    • Binary search for the first index i in tails where tails[i] >= x.",
    "    • If i == length of tails, append x.",
    "    • Else replace tails[i] with x.",
    "The length of tails is the length of LIS."
  ],

  "examples": [
    { "input": "[10,9,2,5,3,7,101,18]", "output": "4" },
    { "input": "[0,1,0,3,2,3]", "output": "4" }
  ],

  "complexity": {
    "time": "O(n log n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`import bisect

def lengthOfLIS(nums):
    tails = []

    for x in nums:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x

    return len(tails)`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;

    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end())
            tails.push_back(x);
        else
            *it = x;
    }

    return tails.size();
}`,

    "java":
`import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();

        for (int x : nums) {
            int i = Collections.binarySearch(tails, x);
            if (i < 0) i = -(i + 1);

            if (i == tails.size())
                tails.add(x);
            else
                tails.set(i, x);
        }

        return tails.size();
    }
}`,

    "c":
`#include <stdlib.h>

int lengthOfLIS(int* nums, int numsSize) {
    int* tails = malloc(numsSize * sizeof(int));
    int size = 0;

    for (int i = 0; i < numsSize; i++) {
        int x = nums[i];
        int l = 0, r = size;

        while (l < r) {
            int mid = (l + r) / 2;
            if (tails[mid] < x)
                l = mid + 1;
            else
                r = mid;
        }

        tails[l] = x;
        if (l == size)
            size++;
    }

    free(tails);
    return size;
}`
  }
}

];
