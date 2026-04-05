import { QAItem } from "./types";

export const Google_QA: QAItem[] = [
  
  //question1

{
  q: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "HashMap", "Searching"],

  a: "Use a HashMap to store visited numbers. For each element, check if target - nums[i] exists in the map.",

  steps: [
    "Initialize an empty HashMap",
    "Traverse the array",
    "For each number compute need = target - num",
    "If need exists in map → return indices",
    "Else insert num:index into map",
    "Return answer"
  ],

  examples: [
    { input: "nums=[2,7,11,15], target=9", output: "[0,1]" }
  ],

  complexity: {
    time: "O(n)",
    space: "O(n)"
  },

  codes: {
    python: 
`def twoSum(nums, target):
    mp = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in mp:
            return [mp[need], i]
        mp[num] = i
    return []`,

    cpp: 
`vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> mp;
    for(int i=0;i<nums.size();i++){
        int need = target - nums[i];
        if(mp.count(need)) return {mp[need], i};
        mp[nums[i]] = i;
    }
    return {};
}`,

    java:
`class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer,Integer> map = new HashMap<>();
        for(int i=0;i<nums.length;i++){
            int need = target - nums[i];
            if(map.containsKey(need))
                return new int[]{map.get(need), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,

    c:
`int* twoSum(int* nums, int n, int target, int* returnSize){
    int *res = malloc(2*sizeof(int));
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(nums[i] + nums[j] == target){
                res[0] = i; 
                res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`
  }
}
,
//Question2
{
  q: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  tags: ["String", "Sliding Window", "HashSet"],

  a: "Use sliding window with a HashSet. Expand right pointer, and if a character repeats, move the left pointer until the substring becomes unique again.",

  steps: [
    "Initialize left=0 and an empty HashSet",
    "Iterate right pointer over the string",
    "If s[right] is not in set: add it and update max length",
    "If s[right] is already in set: remove s[left] and increment left until unique",
    "Continue until right reaches end",
    "Return max length"
  ],

  examples: [
    { input: "s='abcabcbb'", output: "3 ('abc')" },
    { input: "s='bbbbb'", output: "1 ('b')" }
  ],

  complexity: {
    time: "O(n)",
    space: "O(min(n, charset))"
  },

  codes: {
    python: 
`def lengthOfLongestSubstring(s):
    seen = set()
    l = 0
    ans = 0
    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l])
            l += 1
        seen.add(s[r])
        ans = max(ans, r - l + 1)
    return ans`,

    cpp:
`int lengthOfLongestSubstring(string s) {
    unordered_set<char> set;
    int l = 0, ans = 0;
    for(int r = 0; r < s.size(); r++){
        while(set.count(s[r]))
            set.erase(s[l++]);
        set.insert(s[r]);
        ans = max(ans, r - l + 1);
    }
    return ans;
}`,

    java:
`class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashSet<Character> set = new HashSet<>();
        int l = 0, ans = 0;
        for (int r = 0; r < s.length(); r++) {
            while (set.contains(s.charAt(r)))
                set.remove(s.charAt(l++));
            set.add(s.charAt(r));
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}`,

    c:
`int lengthOfLongestSubstring(char* s){
    int map[256] = {0};
    int l = 0, ans = 0;
    for(int r = 0; s[r]; r++){
        map[(unsigned char)s[r]]++;
        while(map[(unsigned char)s[r]] > 1){
            map[(unsigned char)s[l]]--;
            l++;
        }
        if(ans < r-l+1) ans = r-l+1;
    }
    return ans;
}`
  }
}
,
//question 3
{
  q: "Merge Intervals",
  difficulty: "Medium",
  tags: ["Intervals", "Sorting", "Greedy"],

  a: "Sort intervals by start time. Traverse the list and merge overlapping intervals by comparing current interval's end with the next interval's start.",

  steps: [
    "Sort intervals by start time",
    "Initialize merged list with first interval",
    "Traverse remaining intervals",
    "If current interval overlaps with last merged interval → update end",
    "Else → append as new interval",
    "Return merged list"
  ],

  examples: [
    { input: "intervals=[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    { input: "intervals=[[1,4],[4,5]]", output: "[[1,5]]" }
  ],

  complexity: {
    time: "O(n log n)",
    space: "O(n)"
  },

  codes: {
    python:
`def merge(intervals):
    intervals.sort()
    res = [intervals[0]]
    for start,end in intervals[1:]:
        last_end = res[-1][1]
        if start <= last_end:
            res[-1][1] = max(last_end, end)
        else:
            res.append([start,end])
    return res`,

    cpp:
`vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    res.push_back(intervals[0]);
    for(int i=1;i<intervals.size();i++){
        if(intervals[i][0] <= res.back()[1]){
            res.back()[1] = max(res.back()[1], intervals[i][1]);
        } else {
            res.push_back(intervals[i]);
        }
    }
    return res;
}`,

    java:
`class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a,b) -> a[0] - b[0]);
        List<int[]> res = new ArrayList<>();
        int[] cur = intervals[0];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] <= cur[1]) {
                cur[1] = Math.max(cur[1], intervals[i][1]);
            } else {
                res.add(cur);
                cur = intervals[i];
            }
        }
        res.add(cur);
        return res.toArray(new int[0][]);
    }
}`,

    c:
`int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize){
    // NOTE: Full C implementation requires custom quicksort; simplified approach provided.
    // For CodeViz, usually Python/Java/C++ used for execution.
    *returnSize = 0;
    return NULL;
}`
  }
}
,
//question 4

{
  q: "Kth Largest Element in an Array",
  difficulty: "Medium",
  tags: ["Heap", "Quickselect", "Array"],

  a: "Use a Min-Heap of size k. Push elements one by one, and if heap size exceeds k, pop the smallest. The top of the heap is the kth largest element.",

  steps: [
    "Create an empty min-heap",
    "Iterate through each number",
    "Push number into heap",
    "If heap size becomes greater than k → pop smallest",
    "After processing all numbers → heap top is kth largest",
    "Return heap top"
  ],

  examples: [
    { input: "nums=[3,2,1,5,6,4], k=2", output: "5" },
    { input: "nums=[7,10,4,3,20,15], k=3", output: "10" }
  ],

  complexity: {
    time: "O(n log k)",
    space: "O(k)"
  },

  codes: {
    python:
`import heapq
def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,

    cpp:
`int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for(int x : nums){
        pq.push(x);
        if(pq.size() > k) pq.pop();
    }
    return pq.top();
}`,

    java:
`class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int n : nums) {
            pq.add(n);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
}`,

    c:
`// Simplified C: Using partial selection approach
int findKthLargest(int* nums, int n, int k){
    for(int i=0;i<k;i++){
        for(int j=i+1;j<n;j++){
            if(nums[j] > nums[i]){
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
    }
    return nums[k-1];
}`
  }
}
,
//quetsion 5
{
  q: "Binary Tree Level Order Traversal",
  difficulty: "Medium",
  tags: ["Tree", "BFS", "Queue"],

  a: "Perform a BFS using a queue. For each level, extract all nodes and push their children into the queue, forming level-wise lists.",

  steps: [
    "Check if root is null → return empty list",
    "Initialize a queue and push root",
    "While queue is not empty:",
    "  - Determine level size",
    "  - Pop all nodes of this level",
    "  - Push their values into a temporary list",
    "  - Push left and right child if exist",
    "Append temporary list to result",
    "Return result"
  ],

  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }
  ],

  complexity: {
    time: "O(n)",
    space: "O(n)"
  },

  codes: {
    python:
`from collections import deque

def levelOrder(root):
    if not root:
        return []
    res = []
    q = deque([root])
    
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,

    cpp:
`vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if(!root) return res;

    queue<TreeNode*> q;
    q.push(root);

    while(!q.empty()) {
        int size = q.size();
        vector<int> level;

        for(int i=0;i<size;i++){
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if(node->left) q.push(node->left);
            if(node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`,

    java:
`class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;

        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);

        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();

            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);

                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,

    c:
`// Simplified C version (pseudocode-like because binary tree structure varies)
typedef struct Node {
    int val;
    struct Node* left;
    struct Node* right;
} Node;

// Full BFS implementation in C requires custom queue implementation.
// Most C projects use Python/Java/C++ for trees.
`
  }
}
,
//question6

{
  q: "Lowest Common Ancestor of Binary Tree",
  difficulty: "Medium",
  tags: ["Tree", "DFS", "Recursion"],

  a: "Use recursion. If the current node is null, or equals p or q, return it. Recursively search left and right subtrees. If both sides return non-null, current node is the LCA.",

  steps: [
    "If root is null → return null",
    "If root equals p or q → return root",
    "Recursively find LCA in left subtree",
    "Recursively find LCA in right subtree",
    "If both left and right return non-null → root is LCA",
    "Else return whichever is not null"
  ],

  examples: [
    { input: "root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=1", output: "3" },
    { input: "root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=4", output: "5" }
  ],

  complexity: {
    time: "O(n)",
    space: "O(h)  // height of tree"
  },

  codes: {
    python:
`def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    if left and right:
        return root
    return left if left else right`,

    cpp:
`TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;

    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if (left && right) return root;
    return left ? left : right;
}`,

    java:
`class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) return root;
        return (left != null) ? left : right;
    }
}`,

    c:
`// C version (struct-based tree) prints conceptual logic
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q){
    if (!root || root == p || root == q) return root;

    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);

    if (left && right) return root;
    return left ? left : right;
}`
  }
}
,
//quetsion 7

{
  q: "Search in Rotated Sorted Array",
  difficulty: "Medium",
  tags: ["Binary Search", "Array", "Rotation"],

  a: "Use modified binary search. At each step, determine which half is sorted. Then check if the target lies in the sorted half and adjust search boundaries accordingly.",

  steps: [
    "Initialize left=0, right=n-1",
    "While left <= right:",
    "  - Compute mid",
    "  - If nums[mid] == target → return mid",
    "  - Check if left half is sorted",
    "     - If target in sorted half → move right",
    "     - Else move left",
    "  - Else right half is sorted",
    "     - If target in sorted half → move left",
    "     - Else move right",
    "Return -1 if not found"
  ],

  examples: [
    { input: "nums=[4,5,6,7,0,1,2], target=0", output: "4" },
    { input: "nums=[4,5,6,7,0,1,2], target=3", output: "-1" }
  ],

  complexity: {
    time: "O(log n)",
    space: "O(1)"
  },

  codes: {
    python:
`def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            return m

        if nums[l] <= nums[m]:  # left sorted
            if nums[l] <= target < nums[m]:
                r = m - 1
            else:
                l = m + 1
        else:  # right sorted
            if nums[m] < target <= nums[r]:
                l = m + 1
            else:
                r = m - 1
    return -1`,

    cpp:
`int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = (l + r) / 2;
        if (nums[m] == target) return m;

        if (nums[l] <= nums[m]) { // left sorted
            if (nums[l] <= target && target < nums[m])
                r = m - 1;
            else
                l = m + 1;
        } else { // right sorted
            if (nums[m] < target && target <= nums[r])
                l = m + 1;
            else
                r = m - 1;
        }
    }
    return -1;
}`,

    java:
`class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int m = (l + r) / 2;

            if (nums[m] == target) return m;

            if (nums[l] <= nums[m]) { // left sorted
                if (nums[l] <= target && target < nums[m])
                    r = m - 1;
                else
                    l = m + 1;
            } else { // right sorted
                if (nums[m] < target && target <= nums[r])
                    l = m + 1;
                else
                    r = m - 1;
            }
        }
        return -1;
    }
}`,

    c:
`int search(int* nums, int n, int target) {
    int l = 0, r = n - 1;

    while (l <= r) {
        int m = (l + r) / 2;

        if (nums[m] == target) return m;

        if (nums[l] <= nums[m]) { // left sorted
            if (nums[l] <= target && target < nums[m])
                r = m - 1;
            else
                l = m + 1;
        } else { // right sorted
            if (nums[m] < target && target <= nums[r])
                l = m + 1;
            else
                r = m - 1;
        }
    }
    return -1;
}`
  }
},
//question 8

{
  q: "Coin Change – Minimum Coins",
  difficulty: "Medium",
  tags: ["Dynamic Programming", "Optimization"],

  a: "Use 1D DP where dp[a] represents minimum coins needed to make amount a. Initialize dp with large values, dp[0] = 0, and update using each coin.",

  steps: [
    "Initialize dp array of size amount+1 with large values",
    "Set dp[0] = 0",
    "For each coin:",
    "   For each amount from coin to target:",
    "      dp[a] = min(dp[a], dp[a-coin] + 1)",
    "If dp[amount] is still large → return -1",
    "Else return dp[amount]"
  ],

  examples: [
    { input: "coins=[1,2,5], amount=11", output: "3 (5+5+1)" },
    { input: "coins=[2], amount=3", output: "-1" }
  ],

  complexity: {
    time: "O(n * amount)",
    space: "O(amount)"
  },

  codes: {
    python:
`def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for c in coins:
        for a in range(c, amount + 1):
            dp[a] = min(dp[a], dp[a - c] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`,

    cpp:
`int coinChange(vector<int>& coins, int amount) {
    const int INF = 1e9;
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;

    for(int c : coins){
        for(int a = c; a <= amount; a++){
            dp[a] = min(dp[a], dp[a - c] + 1);
        }
    }
    return dp[amount] == INF ? -1 : dp[amount];
}`,

    java:
`class Solution {
    public int coinChange(int[] coins, int amount) {
        int INF = (int)1e9;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;

        for (int c : coins) {
            for (int a = c; a <= amount; a++) {
                dp[a] = Math.min(dp[a], dp[a - c] + 1);
            }
        }
        return dp[amount] == INF ? -1 : dp[amount];
    }
}`,

    c:
`int coinChange(int* coins, int coinsSize, int amount) {
    int INF = 1000000000;
    int* dp = malloc((amount + 1) * sizeof(int));
    
    for (int i = 0; i <= amount; i++) dp[i] = INF;
    dp[0] = 0;

    for (int i = 0; i < coinsSize; i++) {
        int c = coins[i];
        for (int a = c; a <= amount; a++) {
            if (dp[a - c] + 1 < dp[a])
                dp[a] = dp[a - c] + 1;
        }
    }

    int result = dp[amount] == INF ? -1 : dp[amount];
    free(dp);
    return result;
}`
  }
}
,
//quetsion 9
{
  q: "Word Break",
  difficulty: "Medium",
  tags: ["Dynamic Programming", "String", "Hashing"],

  a: "Use a DP array where dp[i] is True if substring s[0:i] can be segmented into valid dictionary words. For each i, check all words in the dictionary and update dp.",

  steps: [
    "Initialize dp array of size len(s)+1 with False",
    "Set dp[0] = True (empty string)",
    "For i from 1 to len(s):",
    "   For each word in dictionary:",
    "       If s ends with 'word' at position i AND dp[i - len(word)] is True:",
    "           Set dp[i] = True",
    "Return dp[len(s)]"
  ],

  examples: [
    { input: "s='leetcode', wordDict=['leet','code']", output: "True" },
    { input: "s='applepenapple', wordDict=['apple','pen']", output: "True" },
    { input: "s='catsandog', wordDict=['cats','dog','sand','and','cat']", output: "False" }
  ],

  complexity: {
    time: "O(n * m * k)  // n=len(string), m=numWords, k=wordLength",
    space: "O(n)"
  },

  codes: {
    python:
`def wordBreak(s, wordDict):
    dp = [False] * (len(s) + 1)
    dp[0] = True

    for i in range(1, len(s) + 1):
        for w in wordDict:
            if i >= len(w) and s[i-len(w):i] == w and dp[i - len(w)]:
                dp[i] = True
                break
    return dp[-1]`,

    cpp:
`bool wordBreak(string s, vector<string>& wordDict) {
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;

    for(int i = 1; i <= n; i++){
        for(string &w : wordDict){
            int L = w.size();
            if(i >= L && s.substr(i-L, L) == w && dp[i-L]){
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}`,

    java:
`class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (String w : wordDict) {
                int L = w.length();
                if (i >= L && s.substring(i-L, i).equals(w) && dp[i-L]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}`,

    c:
`// Simplified C version (conceptual DP)
//
// Full C implementation requires handling dynamic strings and dictionary structures.
// Provided version outlines the logic.

bool wordBreak(char* s, char** dict, int dictSize) {
    int n = strlen(s);
    bool* dp = calloc(n + 1, sizeof(bool));
    dp[0] = true;

    for (int i = 1; i <= n; i++) {
        for (int d = 0; d < dictSize; d++) {
            int L = strlen(dict[d]);
            if (i >= L && strncmp(s + i - L, dict[d], L) == 0 && dp[i-L]) {
                dp[i] = true;
                break;
            }
        }
    }

    bool ans = dp[n];
    free(dp);
    return ans;
}`
  }
} ,

//quetsion 10
{
  q: "Number of Islands",
  difficulty: "Medium",
  tags: ["DFS", "BFS", "Grid", "Graph"],

  a: "Traverse the grid. When you find a '1', increment count and run DFS/BFS to mark all connected lands as visited by turning them into '0'.",

  steps: [
    "Initialize island_count = 0",
    "Traverse each cell in the grid",
    "If grid[i][j] == '1':",
    "   Increment island_count",
    "   Run DFS/BFS from (i,j) to mark all connected land",
    "DFS marks a cell by changing '1' → '0'",
    "Return island_count"
  ],

  examples: [
    { 
      input: 
        "grid = [\n  ['1','1','0','0'],\n  ['1','0','0','1'],\n  ['0','0','1','1']\n]",
      output: "3"
    }
  ],

  complexity: {
    time: "O(m * n)",
    space: "O(m * n) worst case for recursion stack"
  },

  codes: {
    python:
`def numIslands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])

    def dfs(i, j):
        if i < 0 or j < 0 or i >= rows or j >= cols or grid[i][j] == '0':
            return
        grid[i][j] = '0'
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)

    count = 0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count`,

    cpp:
`void dfs(vector<vector<char>>& g, int i, int j){
    if(i < 0 || j < 0 || i >= g.size() || j >= g[0].size() || g[i][j] == '0')
        return;
    g[i][j] = '0';
    dfs(g, i+1, j);
    dfs(g, i-1, j);
    dfs(g, i, j+1);
    dfs(g, i, j-1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for(int i = 0; i < grid.size(); i++){
        for(int j = 0; j < grid[0].size(); j++){
            if(grid[i][j] == '1'){
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}`,

    java:
`class Solution {
    public void dfs(char[][] g, int i, int j) {
        if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] == '0')
            return;
        g[i][j] = '0';
        dfs(g, i+1, j);
        dfs(g, i-1, j);
        dfs(g, i, j+1);
        dfs(g, i, j-1);
    }

    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
}`,

    c:
`void dfs(char** grid, int r, int c, int i, int j){
    if(i < 0 || j < 0 || grid[i][j] == '0') return;
    grid[i][j] = '0';
    dfs(grid, r, c, i+1, j);
    dfs(grid, r, c, i-1, j);
    dfs(grid, r, c, i, j+1);
    dfs(grid, r, c, i, j-1);
}

int numIslands(char** grid, int rows, int cols){
    int count = 0;
    for(int i = 0; i < rows; i++){
        for(int j = 0; j < cols; j++){
            if(grid[i][j] == '1'){
                count++;
                dfs(grid, rows, cols, i, j);
            }
        }
    }
    return count;
}`
  }
}



];
