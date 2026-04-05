import { QAItem } from "./types";
export const Tesla_QA: QAItem[] = [
     //quetsion 1

     {
  "q": "Given the root of a binary tree, return the level order traversal of its nodes' values.",
  "difficulty": "Medium",
  "tags": ["Tree", "BFS", "Queue"],

  "a": "Use BFS with a queue. Push root, then repeatedly pop nodes level by level. For each popped node, push its children to the queue.",

  "steps": [
    "If root is null, return empty list.",
    "Initialize queue and push root.",
    "While queue not empty:",
    "    • Determine level size.",
    "    • Pop size nodes and append their values to current level list.",
    "    • Push children of each popped node.",
    "Append each level list to result.",
    "Return result."
  ],

  "examples": [
    { "input": "[3,9,20,null,null,15,7]", "output": "[[3],[9,20],[15,7]]" },
    { "input": "[]", "output": "[]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    if not root:
        return []

    q = deque([root])
    res = []

    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct TreeNode {
//     int val;
//     TreeNode *left, *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int size = q.size();
        vector<int> level;

        while (size--) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }

        res.push_back(level);
    }

    return res;
}`,

    "java":
`import java.util.*;

// class TreeNode {
//     int val;
//     TreeNode left, right;
//     TreeNode(int x) { val = x; }
// }

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();

            while (size-- > 0) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }

            res.add(level);
        }
        return res;
    }
}`,

    "c":
`#include <stdlib.h>

// struct TreeNode {
//     int val;
//     struct TreeNode *left, *right;
// };

int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    if (!root) {
        *returnSize = 0;
        return NULL;
    }

    struct TreeNode* queue[10000];
    int front = 0, rear = 0;
    queue[rear++] = root;

    int** res = malloc(1000 * sizeof(int*));
    *returnColumnSizes = malloc(1000 * sizeof(int));
    int levels = 0;

    while (front < rear) {
        int size = rear - front;
        res[levels] = malloc(size * sizeof(int));
        (*returnColumnSizes)[levels] = size;

        for (int i = 0; i < size; i++) {
            struct TreeNode* node = queue[front++];
            res[levels][i] = node->val;

            if (node->left) queue[rear++] = node->left;
            if (node->right) queue[rear++] = node->right;
        }
        levels++;
    }

    *returnSize = levels;
    return res;
}`
  }
},

    //quetsion 2

    {
  "q": "A peak element is an element that is strictly greater than its neighbors. Given an integer array nums, return the index of any peak element. You may assume nums[-1] = nums[n] = -∞.",
  "difficulty": "Medium",
  "tags": ["Binary Search", "Array"],

  "a": "Use binary search: If nums[mid] < nums[mid+1], move right; otherwise move left. The search converges to a peak index.",

  "steps": [
    "Initialize left = 0, right = n - 1.",
    "While left < right:",
    "   • mid = (left + right) // 2.",
    "   • If nums[mid] < nums[mid+1], peak lies on the right half → left = mid + 1.",
    "   • Else peak lies on the left half (including mid) → right = mid.",
    "Return left (or right) because they converge to a peak position."
  ],

  "examples": [
    { "input": "[1,2,3,1]", "output": "2" },
    { "input": "[1,2,1,3,5,6,4]", "output": "1 or 5 (any peak is acceptable)" }
  ],

  "complexity": {
    "time": "O(log n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def findPeakElement(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < nums[mid + 1]:
            left = mid + 1
        else:
            right = mid
    return left`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int findPeakElement(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;

    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] < nums[mid + 1])
            left = mid + 1;
        else
            right = mid;
    }
    return left;
}`,

    "java":
`class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1;

        while (left < right) {
            int mid = (left + right) / 2;

            if (nums[mid] < nums[mid + 1])
                left = mid + 1;
            else
                right = mid;
        }
        return left;
    }
}`,

    "c":
`#include <stdio.h>

/**
 * Note: The returned value must be malloced, assume caller calls free().
 */

int findPeakElement(int* nums, int numsSize) {
    int left = 0;
    int right = numsSize - 1;

    while (left < right) {
        int mid = (left + right) / 2;

        // If right neighbor is bigger → peak must be to the right
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } 
        // Else peak is to the left (including mid)
        else {
            right = mid;
        }
    }

    return left;   // left == right contains a peak element index
}

int main() {
    int nums[] = {1, 2, 3, 1};
    int size = sizeof(nums) / sizeof(nums[0]);

    int peak = findPeakElement(nums, size);
    printf("Peak index: %d\n", peak); // Expected: 2

    return 0;
}

`
  }
},

    //quetsion 3
    
    {
  "q": "There are n gas stations along a circular route. You have two arrays: gas[i] and cost[i]. Starting at a station i, you gain gas[i] fuel, and moving to station i+1 costs cost[i] fuel. Return the starting station index if you can travel the entire circuit once; otherwise return -1.",
  "difficulty": "Medium",
  "tags": ["Greedy", "Array"],

  "a": "If total gas < total cost, answer is immediately -1. Otherwise, use greedy: track tank and whenever tank becomes negative, reset start to the next index.",
  
  "steps": [
    "If sum(gas) < sum(cost), return -1 immediately.",
    "Initialize start = 0, tank = 0.",
    "Traverse all stations i:",
    "    • tank += gas[i] - cost[i]",
    "    • If tank < 0: reset start = i + 1 and tank = 0",
    "Return start."
  ],

  "examples": [
    { "input": "gas=[1,2,3,4,5], cost=[3,4,5,1,2]", "output": "3" },
    { "input": "gas=[2,3,4], cost=[3,4,3]", "output": "-1" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def canCompleteCircuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1

    start = 0
    tank = 0

    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0

    return start`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    if (accumulate(gas.begin(), gas.end(), 0) <
        accumulate(cost.begin(), cost.end(), 0))
        return -1;

    int start = 0, tank = 0;

    for (int i = 0; i < gas.size(); i++) {
        tank += gas[i] - cost[i];
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }

    return start;
}`,

    "java":
`class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
        }

        if (totalGas < totalCost)
            return -1;

        int start = 0, tank = 0;

        for (int i = 0; i < gas.length; i++) {
            tank += gas[i] - cost[i];
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }

        return start;
    }
}`,

    "c":
`#include <stdio.h>

int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize) {
    int totalGas = 0, totalCost = 0;

    for (int i = 0; i < gasSize; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }

    if (totalGas < totalCost)
        return -1;

    int start = 0;
    int tank = 0;

    for (int i = 0; i < gasSize; i++) {
        tank += gas[i] - cost[i];

        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }

    return start;
}

int main() {
    int gas[] = {1,2,3,4,5};
    int cost[] = {3,4,5,1,2};
    int n = 5;

    int ans = canCompleteCircuit(gas, n, cost, n);
    printf("Start index: %d\n", ans); // Expected: 3

    return 0;
}`
  }
},

    //quetsion 4

    {
  "q": "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals and return the result.",
  "difficulty": "Medium",
  "tags": ["Sorting", "Intervals"],

  "a": "Sort intervals by start time. Then scan from left to right, merging whenever the current interval overlaps with the previous merged interval.",
  
  "steps": [
    "Sort intervals by start time.",
    "Initialize merged list.",
    "For each interval:",
    "    • If merged is empty OR current.start > last.end → append interval.",
    "    • Else overlap exists → last.end = max(last.end, current.end).",
    "Return merged list."
  ],

  "examples": [
    { "input": "[[1,3],[2,6],[8,10],[15,18]]", "output": "[[1,6],[8,10],[15,18]]" },
    { "input": "[[1,4],[4,5]]", "output": "[[1,5]]" }
  ],

  "complexity": {
    "time": "O(n log n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def merge(intervals):
    intervals.sort()

    merged = []
    for it in intervals:
        if not merged or it[0] > merged[-1][1]:
            merged.append(it)
        else:
            merged[-1][1] = max(merged[-1][1], it[1])

    return merged`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    vector<vector<int>> res;
    for (auto &it : intervals) {
        if (res.empty() || it[0] > res.back()[1]) {
            res.push_back(it);
        } else {
            res.back()[1] = max(res.back()[1], it[1]);
        }
    }
    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a,b) -> a[0] - b[0]);

        List<int[]> res = new ArrayList<>();

        for (int[] it : intervals) {
            if (res.isEmpty() || it[0] > res.get(res.size()-1)[1]) {
                res.add(it);
            } else {
                res.get(res.size()-1)[1] = Math.max(res.get(res.size()-1)[1], it[1]);
            }
        }

        return res.toArray(new int[res.size()][]);
    }
}`,

    "c":
`#include <stdlib.h>

int cmp(const void* a, const void* b) {
    int* x = *(int**)a;
    int* y = *(int**)b;
    return x[0] - y[0];
}

int** merge(int** intervals, int intervalsSize, int* intervalsColSize, 
            int* returnSize, int** returnColumnSizes) {

    if (intervalsSize == 0) {
        *returnSize = 0;
        return NULL;
    }

    qsort(intervals, intervalsSize, sizeof(int*), cmp);

    int** res = malloc(intervalsSize * sizeof(int*));
    *returnColumnSizes = malloc(intervalsSize * sizeof(int));
    int idx = 0;

    res[0] = malloc(2 * sizeof(int));
    res[0][0] = intervals[0][0];
    res[0][1] = intervals[0][1];
    (*returnColumnSizes)[0] = 2;
    idx = 1;

    for (int i = 1; i < intervalsSize; i++) {
        int start = intervals[i][0];
        int end = intervals[i][1];

        int* last = res[idx - 1];

        if (start > last[1]) {
            res[idx] = malloc(2 * sizeof(int));
            res[idx][0] = start;
            res[idx][1] = end;
            (*returnColumnSizes)[idx] = 2;
            idx++;
        } else {
            last[1] = (end > last[1]) ? end : last[1];
        }
    }

    *returnSize = idx;
    return res;
}

int main() {
    int intervalsArr[4][2] = {{1,3}, {2,6}, {8,10}, {15,18}};
    int* intervals[4];
    int colSize[4];

    for (int i = 0; i < 4; i++) {
        intervals[i] = intervalsArr[i];
        colSize[i] = 2;
    }

    int returnSize;
    int* returnColumnSizes;

    int** ans = merge(intervals, 4, colSize, &returnSize, &returnColumnSizes);

    for (int i = 0; i < returnSize; i++) {
        printf("[%d,%d] ", ans[i][0], ans[i][1]);
    }
    printf("\\n");

    return 0;
}`
  }
},

    //quetsion 5

    {
  "q": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as: left subtree < node < right subtree, recursively.",
  "difficulty": "Medium",
  "tags": ["Tree", "DFS", "Recursion"],

  "a": "Use DFS with range limits. Each node must be strictly within (min, max). For left subtree: (min, node.val). For right subtree: (node.val, max).",

  "steps": [
    "Define helper(node, minVal, maxVal).",
    "If node is null → return true.",
    "If node.val <= minVal OR node.val >= maxVal → return false.",
    "Recursively check:",
    "    • left subtree in (minVal, node.val)",
    "    • right subtree in (node.val, maxVal)",
    "Return true only if both subtrees are valid."
  ],

  "examples": [
    { "input": "[2,1,3]", "output": "true" },
    { "input": "[5,1,4,null,null,3,6]", "output": "false" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(h) recursion stack"
  },

  "codes": {
    "python":
`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

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
//     TreeNode *left, *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

bool validate(TreeNode* node, long low, long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;

    return validate(node->left, low, node->val) &&
           validate(node->right, node->val, high);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`,

    "java":
`// class TreeNode {
//     int val;
//     TreeNode left, right;
//     TreeNode(int x) { val = x; }
// }

class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    boolean validate(TreeNode node, long low, long high) {
        if (node == null) return true;

        if (node.val <= low || node.val >= high)
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
//     struct TreeNode *left, *right;
// };

bool validate(struct TreeNode* node, long low, long high) {
    if (node == NULL) return true;

    if (node->val <= low || node->val >= high)
        return false;

    return validate(node->left, low, node->val) &&
           validate(node->right, node->val, high);
}

bool isValidBST(struct TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}

int main() {
    struct TreeNode n1 = {1, NULL, NULL};
    struct TreeNode n3 = {3, NULL, NULL};
    struct TreeNode root = {2, &n1, &n3};

    printf("Is valid BST: %s\n", isValidBST(&root) ? "true" : "false");

    return 0;
}`
  }
},

    //quetsion 6

    {
  "q": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) in O(1) time.",
  "difficulty": "Medium",
  "tags": ["Design", "HashMap", "Doubly Linked List"],

  "a": "Use a hashmap for O(1) lookup, and a doubly-linked list to track usage order. On get() or put(), move accessed item to the front. Evict from tail when capacity is exceeded.",
  
  "steps": [
    "Maintain a doubly linked list with most recently used at the front.",
    "Maintain a hashmap key → node for constant access.",
    "get(key):",
    "    • If key not found → return -1.",
    "    • Move node to head and return value.",
    "put(key, value):",
    "    • If key exists → update value + move node to head.",
    "    • If new key and capacity full → evict tail node.",
    "    • Insert new node at head."
  ],

  "examples": [
    { "input": "LRUCache(2); put(1,1); put(2,2); get(1)", "output": "1" },
    { "input": "put(3,3) → evicts key 2; get(2)", "output": "-1" }
  ],

  "complexity": {
    "time": "O(1) for get and put",
    "space": "O(capacity)"
  },

  "codes": {
    "python":
`class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.map = {}
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def insert(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        node = self.map[key]
        self.remove(node)
        self.insert(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            node = self.map[key]
            node.val = value
            self.remove(node)
            self.insert(node)
            return
        
        if len(self.map) == self.cap:
            lru = self.tail.prev
            self.remove(lru)
            del self.map[lru.key]

        newNode = Node(key, value)
        self.map[key] = newNode
        self.insert(newNode)`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct Node {
    int key, val;
    Node *prev, *next;
    Node(int k, int v): key(k), val(v), prev(NULL), next(NULL) {}
};

class LRUCache {
public:
    int cap;
    unordered_map<int, Node*> mp;
    Node *head, *tail;

    LRUCache(int capacity) {
        cap = capacity;
        head = new Node(0,0);
        tail = new Node(0,0);
        head->next = tail;
        tail->prev = head;
    }

    void remove(Node* n) {
        n->prev->next = n->next;
        n->next->prev = n->prev;
    }

    void insert(Node* n) {
        n->next = head->next;
        n->prev = head;
        head->next->prev = n;
        head->next = n;
    }

    int get(int key) {
        if (!mp.count(key)) return -1;
        Node* n = mp[key];
        remove(n);
        insert(n);
        return n->val;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            Node* n = mp[key];
            n->val = value;
            remove(n);
            insert(n);
            return;
        }

        if (mp.size() == cap) {
            Node* lru = tail->prev;
            remove(lru);
            mp.erase(lru->key);
        }

        Node* n = new Node(key, value);
        mp[key] = n;
        insert(n);
    }
};`,

    "java":
`import java.util.*;

class LRUCache {

    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key=k; val=v; }
    }

    Node head, tail;
    Map<Integer, Node> map;
    int cap;

    public LRUCache(int capacity) {
        cap = capacity;
        map = new HashMap<>();
        head = new Node(0,0);
        tail = new Node(0,0);
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node n) {
        n.prev.next = n.next;
        n.next.prev = n.prev;
    }

    private void insert(Node n) {
        n.next = head.next;
        n.prev = head;
        head.next.prev = n;
        head.next = n;
    }

    public int get(int key) {
        if (!map.containsKey(key))
            return -1;

        Node n = map.get(key);
        remove(n);
        insert(n);
        return n.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node n = map.get(key);
            n.val = value;
            remove(n);
            insert(n);
            return;
        }

        if (map.size() == cap) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }

        Node n = new Node(key, value);
        map.put(key, n);
        insert(n);
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key, val;
    struct Node *prev, *next;
} Node;

typedef struct {
    int cap;
    Node *head, *tail;
    Node **map;  // array of Node* indexed by key (simple approach)
} LRUCache;

void removeNode(LRUCache* obj, Node* n) {
    n->prev->next = n->next;
    n->next->prev = n->prev;
}

void insertNode(LRUCache* obj, Node* n) {
    n->next = obj->head->next;
    n->prev = obj->head;
    obj->head->next->prev = n;
    obj->head->next = n;
}

LRUCache* lRUCacheCreate(int capacity) {
    LRUCache* obj = malloc(sizeof(LRUCache));
    obj->cap = capacity;

    obj->map = calloc(10001, sizeof(Node*));  // supports keys up to 10000

    obj->head = malloc(sizeof(Node));
    obj->tail = malloc(sizeof(Node));

    obj->head->next = obj->tail;
    obj->tail->prev = obj->head;

    return obj;
}

int lRUCacheGet(LRUCache* obj, int key) {
    Node* n = obj->map[key];
    if (!n) return -1;

    removeNode(obj, n);
    insertNode(obj, n);

    return n->val;
}

void lRUCachePut(LRUCache* obj, int key, int value) {
    Node* n = obj->map[key];

    if (n) {
        n->val = value;
        removeNode(obj, n);
        insertNode(obj, n);
        return;
    }

    // count existing keys
    int count = 0;
    for (int i = 0; i < 10001; i++)
        if (obj->map[i]) count++;

    if (count == obj->cap) {
        Node* lru = obj->tail->prev;
        removeNode(obj, lru);
        obj->map[lru->key] = NULL;
        free(lru);
    }

    Node* newNode = malloc(sizeof(Node));
    newNode->key = key;
    newNode->val = value;

    obj->map[key] = newNode;
    insertNode(obj, newNode);
}

void lRUCacheFree(LRUCache* obj) {
    free(obj->map);
    free(obj->head);
    free(obj->tail);
    free(obj);
}`  
  }
},

    //quetsion 7

    {
  "q": "You are given numCourses and a list of prerequisite pairs. Determine if it is possible to finish all courses (i.e., the directed graph has no cycle).",
  "difficulty": "Medium",
  "tags": ["Graph", "Topological Sort", "DFS", "BFS"],

  "a": "Use DFS cycle detection or Kahn’s BFS topological sort. If any cycle exists in the directed graph, return false; otherwise return true.",
  
  "steps": [
    "Represent prerequisites as a directed graph.",
    "Use indegree[] to count incoming edges.",
    "Add all nodes with indegree 0 to queue (courses without prerequisites).",
    "Perform BFS topological sort:",
    "    • Pop a course, reduce indegree of its neighbors.",
    "    • When a neighbor's indegree becomes 0, push it to queue.",
    "Count processed courses.",
    "If count == numCourses → no cycle → return true.",
    "Else → cycle exists → return false."
  ],

  "examples": [
    { "input": "numCourses=2, prerequisites=[[1,0]]", "output": "true" },
    { "input": "numCourses=2, prerequisites=[[1,0],[0,1]]", "output": "false" }
  ],

  "complexity": {
    "time": "O(V + E)",
    "space": "O(V + E)"
  },

  "codes": {
    "python":
`from collections import deque

def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses

    for a, b in prerequisites:
        graph[b].append(a)
        indegree[a] += 1

    q = deque([i for i in range(numCourses) if indegree[i] == 0])
    visited = 0

    while q:
        course = q.popleft()
        visited += 1
        for nei in graph[course]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                q.append(nei)

    return visited == numCourses`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> indegree(numCourses, 0);

    for (auto &p : prerequisites) {
        graph[p[1]].push_back(p[0]);
        indegree[p[0]]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++)
        if (indegree[i] == 0)
            q.push(i);

    int visited = 0;
    while (!q.empty()) {
        int course = q.front(); q.pop();
        visited++;

        for (int nei : graph[course]) {
            indegree[nei]--;
            if (indegree[nei] == 0)
                q.push(nei);
        }
    }

    return visited == numCourses;
}`,

    "java":
`import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++)
            graph.add(new ArrayList<>());

        int[] indegree = new int[numCourses];

        for (int[] p : prerequisites) {
            graph.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0)
                q.offer(i);

        int visited = 0;
        while (!q.isEmpty()) {
            int course = q.poll();
            visited++;

            for (int nei : graph.get(course)) {
                indegree[nei]--;
                if (indegree[nei] == 0)
                    q.offer(nei);
            }
        }

        return visited == numCourses;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    int* indegree = calloc(numCourses, sizeof(int));
    int** graph = malloc(numCourses * sizeof(int*));
    int* graphSizes = calloc(numCourses, sizeof(int));

    for (int i = 0; i < numCourses; i++) {
        graph[i] = malloc(numCourses * sizeof(int)); // max edges worst case
    }

    // Build graph and indegree
    for (int i = 0; i < prerequisitesSize; i++) {
        int a = prerequisites[i][0];
        int b = prerequisites[i][1];
        graph[b][graphSizes[b]++] = a;
        indegree[a]++;
    }

    // Initialize queue
    int* queue = malloc(numCourses * sizeof(int));
    int front = 0, rear = 0;

    for (int i = 0; i < numCourses; i++)
        if (indegree[i] == 0)
            queue[rear++] = i;

    int visited = 0;

    while (front < rear) {
        int course = queue[front++];
        visited++;

        for (int i = 0; i < graphSizes[course]; i++) {
            int nei = graph[course][i];
            indegree[nei]--;
            if (indegree[nei] == 0)
                queue[rear++] = nei;
        }
    }

    free(indegree);
    for (int i = 0; i < numCourses; i++)
        free(graph[i]);
    free(graph);
    free(queue);

    return visited == numCourses;
}`
  }
},

    //quetsion 8

    {
  "q": "Convert an integer to a Roman numeral. 1 <= num <= 3999.",
  "difficulty": "Medium",
  "tags": ["Math", "Greedy", "String"],

  "a": "Use greedy approach: keep a list of Roman symbols and their values. Subtract the largest possible value repeatedly while appending its symbol. Continue until num becomes 0.",
  
  "steps": [
    "Prepare mappings: values = [1000,900,500,400,...,1]",
    "Prepare corresponding roman symbols = ['M','CM','D','CD',...,'I']",
    "Initialize empty string result",
    "Loop through values:",
    "    • while num >= values[i], subtract and append symbol",
    "Return result"
  ],

  "examples": [
    { "input": "58", "output": "\"LVIII\"" },
    { "input": "1994", "output": "\"MCMXCIV\"" }
  ],

  "complexity": {
    "time": "O(1) (max loop is fixed size)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def intToRoman(num):
    vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
    syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]

    res = ""
    for i in range(len(vals)):
        while num >= vals[i]:
            num -= vals[i]
            res += syms[i]
    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string intToRoman(int num) {
    vector<int> vals = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
    vector<string> syms = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};

    string res = "";
    for (int i = 0; i < vals.size(); i++) {
        while (num >= vals[i]) {
            num -= vals[i];
            res += syms[i];
        }
    }
    return res;
}`,

    "java":
`class Solution {
    public String intToRoman(int num) {
        int[] vals = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
        String[] syms = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < vals.length; i++) {
            while (num >= vals[i]) {
                num -= vals[i];
                sb.append(syms[i]);
            }
        }
        return sb.toString();
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* intToRoman(int num) {
    int vals[] = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
    char* syms[] = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};

    char* res = malloc(50 * sizeof(char)); // enough size for max Roman
    res[0] = '\\0';

    for (int i = 0; i < 13; i++) {
        while (num >= vals[i]) {
            num -= vals[i];
            strcat(res, syms[i]);
        }
    }

    return res;
}

int main() {
    int num = 1994;
    char* r = intToRoman(num);
    printf("Roman: %s\\n", r); // Expected: MCMXCIV
    free(r);
    return 0;
}`
  }
},

    //quetsion 9

    {
  "q": "Given an array of characters chars, compress it using run-length encoding in-place. Return the new length. Example: ['a','a','b','b','c','c','c'] becomes ['a','2','b','2','c','3'].",
  "difficulty": "Medium",
  "tags": ["Two Pointers", "String", "In-place"],

  "a": "Use a write pointer to write encoded output. Use a read pointer to scan characters. Count repeating characters and write char + count (if > 1).",

  "steps": [
    "Initialize read pointer i = 0 and write pointer w = 0.",
    "While i < n:",
    "  • Set j = i and count repeats while chars[j] == chars[i].",
    "  • Write chars[i] at chars[w++].",
    "  • If count > 1, convert count to digits and write into chars.",
    "  • Move i = j.",
    "Return w (compressed length)."
  ],

  "examples": [
    { "input": "['a','a','b','b','c','c','c']", "output": "6 (chars=['a','2','b','2','c','3'])" },
    { "input": "['a']", "output": "1" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def compress(chars):
    n = len(chars)
    w = 0
    i = 0

    while i < n:
        j = i
        while j < n and chars[j] == chars[i]:
            j += 1

        chars[w] = chars[i]
        w += 1

        count = j - i
        if count > 1:
            for c in str(count):
                chars[w] = c
                w += 1

        i = j

    return w`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int compress(vector<char>& chars) {
    int n = chars.size();
    int w = 0;

    for (int i = 0; i < n;) {
        int j = i;
        while (j < n && chars[j] == chars[i])
            j++;

        chars[w++] = chars[i];

        int count = j - i;
        if (count > 1) {
            string s = to_string(count);
            for (char c : s)
                chars[w++] = c;
        }

        i = j;
    }

    return w;
}`,

    "java":
`class Solution {
    public int compress(char[] chars) {
        int n = chars.length;
        int w = 0;

        for (int i = 0; i < n; ) {
            int j = i;
            while (j < n && chars[j] == chars[i])
                j++;

            chars[w++] = chars[i];

            int count = j - i;
            if (count > 1) {
                for (char c : String.valueOf(count).toCharArray())
                    chars[w++] = c;
            }

            i = j;
        }

        return w;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int compress(char* chars, int charsSize) {
    int w = 0;

    for (int i = 0; i < charsSize; ) {
        int j = i;
        while (j < charsSize && chars[j] == chars[i])
            j++;

        chars[w++] = chars[i];

        int count = j - i;
        if (count > 1) {
            char buffer[12]; // enough for int
            sprintf(buffer, "%d", count);
            for (int k = 0; buffer[k] != '\\0'; k++)
                chars[w++] = buffer[k];
        }

        i = j;
    }

    return w;
}

int main() {
    char arr[] = {'a','a','b','b','c','c','c'};
    int size = sizeof(arr)/sizeof(arr[0]);

    int newLen = compress(arr, size);

    printf("New length: %d\\n", newLen);
    printf("Compressed: ");
    for (int i = 0; i < newLen; i++)
        printf("%c ", arr[i]);
    printf("\\n");

    return 0;
}`
  }
},

    //quetsion 10

 {
  "q": "A message containing digits can be decoded using mapping: '1'->'A', ..., '26'->'Z'. Given a digit string s, return the number of ways to decode it.",
  "difficulty": "Medium",
  "tags": ["Dynamic Programming", "String"],

  "a": "Use DP. dp[i] = number of ways to decode the substring s[0..i-1]. A digit '0' is invalid alone; two-digit decode allowed if 10 <= value <= 26.",
  
  "steps": [
    "If s starts with '0', answer is 0.",
    "Initialize dp array of size n+1.",
    "dp[0] = 1, dp[1] = 1.",
    "For each index i from 2 to n:",
    "   • If s[i-1] != '0', dp[i] += dp[i-1].",
    "   • If s[i-2..i-1] is between '10' and '26', dp[i] += dp[i-2].",
    "Return dp[n]."
  ],

  "examples": [
    { "input": "\"12\"", "output": "2" },
    { "input": "\"226\"", "output": "3" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n) (can be optimized to O(1))"
  },

  "codes": {
    "python":
`def numDecodings(s):
    if not s or s[0] == '0':
        return 0

    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1

    for i in range(2, n + 1):
        if s[i-1] != '0':
            dp[i] += dp[i-1]

        two = int(s[i-2:i])
        if 10 <= two <= 26:
            dp[i] += dp[i-2]

    return dp[n]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int numDecodings(string s) {
    if (s.empty() || s[0] == '0') return 0;

    int n = s.size();
    vector<int> dp(n + 1, 0);
    dp[0] = dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        if (s[i-1] != '0')
            dp[i] += dp[i-1];

        int two = stoi(s.substr(i-2, 2));
        if (two >= 10 && two <= 26)
            dp[i] += dp[i-2];
    }

    return dp[n];
}`,

    "java":
`class Solution {
    public int numDecodings(String s) {
        if (s.length() == 0 || s.charAt(0) == '0')
            return 0;

        int n = s.length();
        int[] dp = new int[n + 1];

        dp[0] = dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            if (s.charAt(i-1) != '0')
                dp[i] += dp[i-1];

            int two = Integer.parseInt(s.substring(i-2, i));
            if (two >= 10 && two <= 26)
                dp[i] += dp[i-2];
        }

        return dp[n];
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int numDecodings(char* s) {
    int n = strlen(s);
    if (n == 0 || s[0] == '0')
        return 0;

    int* dp = (int*)malloc((n + 1) * sizeof(int));
    dp[0] = dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = 0;

        if (s[i-1] != '0')
            dp[i] += dp[i-1];

        int two = (s[i-2] - '0') * 10 + (s[i-1] - '0');
        if (two >= 10 && two <= 26)
            dp[i] += dp[i-2];
    }

    int ans = dp[n];
    free(dp);
    return ans;
}

int main() {
    char s[] = "226";
    printf("Ways: %d\\n", numDecodings(s)); // Expected: 3
    return 0;
}`
  }
}

];
