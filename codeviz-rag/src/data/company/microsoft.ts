import { QAItem } from "./types";
export const Microsoft_QA: QAItem[] = [
    //quetsion1
    {
  "q": "Evaluate the given string expression containing +, -, *, / without parentheses.",
  "difficulty": "Medium",
  "tags": ["Stack", "Math", "String"],
  "a": "Use a stack to handle multiplication/division immediately and push results. Finally, sum the stack values.",
  "steps": [
    "Initialize a stack and a current number variable.",
    "Iterate through the string and build numbers.",
    "On encountering an operator, apply previous operator logic:",
    "If + push num, if - push -num, if * multiply top, if / divide top.",
    "At the end, sum the stack."
  ],
  "examples": [
    { "input": "3+2*2", "output": "7" }
  ],
  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },
  
  "codes": {
    "python": 
`def calculate(s):
    s += "+"
    num = 0
    stack = []
    op = "+"
    for c in s:
        if c.isdigit():
            num = num * 10 + int(c)
        elif c != " ":
            if op == "+":
                stack.append(num)
            elif op == "-":
                stack.append(-num)
            elif op == "*":
                stack[-1] = stack[-1] * num
            elif op == "/":
                stack[-1] = int(stack[-1] / num)
            op = c
            num = 0
    return sum(stack)`,

    "cpp": 
`int calculate(string s) {
    s += "+";
    long num = 0;
    char op = '+';
    stack<long> st;

    for(char c : s) {
        if(isdigit(c)) {
            num = num * 10 + (c - '0');
        } else if(c != ' ') {
            if(op == '+') st.push(num);
            else if(op == '-') st.push(-num);
            else if(op == '*') { long x = st.top(); st.pop(); st.push(x * num); }
            else if(op == '/') { long x = st.top(); st.pop(); st.push(x / num); }
            op = c;
            num = 0;
        }
    }

    long res = 0;
    while(!st.empty()) {
        res += st.top();
        st.pop();
    }
    return res;
}`,

    "java":
`class Solution {
    public int calculate(String s) {
        s += "+";
        Stack<Integer> st = new Stack<>();
        int num = 0;
        char op = '+';

        for(char c : s.toCharArray()) {
            if(Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } else if(c != ' ') {
                if(op == '+') st.push(num);
                else if(op == '-') st.push(-num);
                else if(op == '*') st.push(st.pop() * num);
                else if(op == '/') st.push(st.pop() / num);
                op = c;
                num = 0;
            }
        }

        int res = 0;
        for(int x : st) res += x;
        return res;
    }
}`,

    "c":
`int calculate(char* s){
    int stack[10000];
    int top = -1;
    int num = 0;
    char op = '+';
    int n = strlen(s);
    char temp[10005];

    strcpy(temp, s);
    temp[n] = '+';
    temp[n+1] = '\\0';

    for(int i = 0; temp[i]; i++){
        char c = temp[i];

        if(isdigit(c)){
            num = num * 10 + (c - '0');
        } 
        else if(c != ' '){
            if(op == '+') stack[++top] = num;
            else if(op == '-') stack[++top] = -num;
            else if(op == '*') stack[top] = stack[top] * num;
            else if(op == '/') stack[top] = stack[top] / num;

            op = c;
            num = 0;
        }
    }

    int res = 0;
    for(int i = 0; i <= top; i++){
        res += stack[i];
    }

    return res;
}`
  }
}
,

//question 2
{
  "q": "Clone an undirected connected graph given a reference node.",
  "difficulty": "Medium",
  "tags": ["Graph", "DFS", "HashMap"],
  "a": "Use DFS/DFS with a hashmap mapping original nodes to cloned nodes.",
  "steps": [
    "Use a hashmap to store cloned nodes.",
    "Perform DFS on each original node.",
    "If a neighbor is not cloned, recursively clone it.",
    "Add cloned neighbors to the cloned node."
  ],
  "examples": [
    { "input": "Node with neighbors [2,4]", "output": "Deep copied graph" }
  ],
  "complexity": {
    "time": "O(V + E)",
    "space": "O(V)"
  },
  
  "codes": {
    "python": 
`class Solution:
    def cloneGraph(self, node):
        if not node:
            return None

        mp = {}

        def dfs(n):
            if n in mp:
                return mp[n]
            copy = Node(n.val)
            mp[n] = copy
            for nei in n.neighbors:
                copy.neighbors.append(dfs(nei))
            return copy

        return dfs(node)`,

    "cpp": 
`class Solution {
public:
    unordered_map<Node*, Node*> mp;

    Node* cloneGraph(Node* node) {
        if (!node) return NULL;
        return dfs(node);
    }

    Node* dfs(Node* cur) {
        if (mp.count(cur)) return mp[cur];

        Node* copy = new Node(cur->val);
        mp[cur] = copy;

        for (Node* nb : cur->neighbors)
            copy->neighbors.push_back(dfs(nb));

        return copy;
    }
};`,

    "java":
`class Solution {
    HashMap<Node, Node> map = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;
        return dfs(node);
    }

    Node dfs(Node cur) {
        if (map.containsKey(cur)) return map.get(cur);

        Node copy = new Node(cur.val);
        map.put(cur, copy);

        for (Node n : cur.neighbors)
            copy.neighbors.add(dfs(n));

        return copy;
    }
}`,

    "c":
`// Assuming Node structure:
// typedef struct Node {
//     int val;
//     int numNeighbors;
//     struct Node** neighbors;
// } Node;

Node* cloneDFS(Node* node, Node** visited) {
    if (!node) return NULL;

    if (visited[node->val]) 
        return visited[node->val];

    Node* copy = malloc(sizeof(Node));
    copy->val = node->val;
    copy->numNeighbors = node->numNeighbors;
    copy->neighbors = malloc(sizeof(Node*) * node->numNeighbors);

    visited[node->val] = copy;

    for (int i = 0; i < node->numNeighbors; i++) {
        copy->neighbors[i] = cloneDFS(node->neighbors[i], visited);
    }

    return copy;
}

Node* cloneGraph(Node* node) {
    if (!node) return NULL;

    Node* visited[1000] = {0};
    return cloneDFS(node, visited);
}`  
  }
}
,
//question 3
{
  "q": "Return true if all courses can be completed given prerequisites.",
  "difficulty": "Medium",
  "tags": ["Graph", "Topological Sort", "BFS"],
  "a": "Use Kahn’s algorithm to detect cycles in directed graph.",
  "steps": [
    "Build adjacency list and indegree array.",
    "Push all 0-indegree nodes into queue.",
    "Process nodes, reducing indegree of neighbors.",
    "If all nodes processed → no cycle.",
    "Else cycle exists."
  ],
  "examples": [
    { "input": "2 courses, prereq [[1,0]]", "output": "true" }
  ],
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

    q = deque([i for i in range(numCourses) if indeg[i] == 0])
    cnt = 0

    while q:
        x = q.popleft()
        cnt += 1
        for nei in adj[x]:
            indeg[nei] -= 1
            if indeg[nei] == 0:
                q.append(nei)

    return cnt == numCourses`,

    "cpp": 
`#include <bits/stdc++.h>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indeg(numCourses, 0);

    for (auto &p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        indeg[p[0]]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++)
        if (indeg[i] == 0)
            q.push(i);

    int cnt = 0;
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        cnt++;

        for (int nb : adj[x]) {
            indeg[nb]--;
            if (indeg[nb] == 0)
                q.push(nb);
        }
    }

    return cnt == numCourses;
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
            adj.get(p[1]).add(p[0]);
            indeg[p[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++)
            if (indeg[i] == 0)
                q.add(i);

        int cnt = 0;

        while (!q.isEmpty()) {
            int x = q.poll();
            cnt++;

            for (int nei : adj.get(x)) {
                indeg[nei]--;
                if (indeg[nei] == 0)
                    q.add(nei);
            }
        }

        return cnt == numCourses;
    }
}`,

    "c":
`#include <stdlib.h>
#include <string.h>

int canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {

    int** adj = malloc(numCourses * sizeof(int*));
    int* adjCount = calloc(numCourses, sizeof(int));
    int* indeg = calloc(numCourses, sizeof(int));

    for (int i = 0; i < numCourses; i++) {
        adj[i] = malloc(500 * sizeof(int));  // capacity for edges
    }

    for (int i = 0; i < prerequisitesSize; i++) {
        int a = prerequisites[i][0];
        int b = prerequisites[i][1];
        adj[b][adjCount[b]++] = a;
        indeg[a]++;
    }

    int* q = malloc(numCourses * sizeof(int));
    int front = 0, rear = 0;

    for (int i = 0; i < numCourses; i++)
        if (indeg[i] == 0)
            q[rear++] = i;

    int cnt = 0;

    while (front < rear) {
        int x = q[front++];
        cnt++;

        for (int i = 0; i < adjCount[x]; i++) {
            int nei = adj[x][i];
            indeg[nei]--;
            if (indeg[nei] == 0)
                q[rear++] = nei;
        }
    }

    free(indeg);
    for (int i = 0; i < numCourses; i++) free(adj[i]);
    free(adj);
    free(q);

    return cnt == numCourses;
}`
  }
}
,
//question 4
{
  "q": "Find the celebrity using knows(a,b) API.",
  "difficulty": "Medium",
  "tags": ["Two Pointers", "Logic"],
  "a": "Use elimination strategy: If A knows B → A cannot be celebrity; else B cannot be celebrity.",
  "steps": [
    "Start with candidate = 0.",
    "Check candidate with others.",
    "If candidate knows i → candidate = i.",
    "Finally verify candidate by checking all relations."
  ],
  "examples": [
    { "input": "Matrix of knows()", "output": "Index of celebrity or -1" }
  ],
  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },
 "codes": {
    "python": 
`# knows(a, b) API is assumed to be defined externally.
def findCelebrity(n):
    c = 0
    # Step 1: Find candidate
    for i in range(n):
        if knows(c, i):
            c = i
    
    # Step 2: Verify candidate
    for i in range(n):
        if i != c:
            if knows(c, i) or not knows(i, c):
                return -1
    return c`,

    "cpp": 
`// knows(a, b) API is assumed to be defined externally.
int findCelebrity(int n) {
    int c = 0;

    // Step 1: Find candidate
    for (int i = 1; i < n; i++) {
        if (knows(c, i))
            c = i;
    }

    // Step 2: Verify candidate
    for (int i = 0; i < n; i++) {
        if (i != c) {
            if (knows(c, i) || !knows(i, c))
                return -1;
        }
    }

    return c;
}`,

    "java":
`// knows(a, b) API is assumed to be defined externally.
public class Solution {
    public int findCelebrity(int n) {
        int c = 0;

        // Step 1: Find candidate
        for (int i = 1; i < n; i++) {
            if (knows(c, i))
                c = i;
        }

        // Step 2: Verify candidate
        for (int i = 0; i < n; i++) {
            if (i != c) {
                if (knows(c, i) || !knows(i, c))
                    return -1;
            }
        }

        return c;
    }
}`,

    "c":
`// knows(a, b) API must be provided externally in C.
int findCelebrity(int n) {
    int c = 0;

    // Step 1: Find candidate
    for (int i = 1; i < n; i++) {
        if (knows(c, i)) {
            c = i;
        }
    }

    // Step 2: Verify candidate
    for (int i = 0; i < n; i++) {
        if (i != c) {
            if (knows(c, i) || !knows(i, c)) {
                return -1;
            }
        }
    }

    return c;
}`
  }
}
,

//question 5
{
  "q": "Return K points closest to origin.",
  "difficulty": "Medium",
  "tags": ["Heap", "Geometry"],
  "a": "Use a max-heap of size K storing squared distances.",
  "steps": [
    "Compute squared distance for each point.",
    "Push into max-heap.",
    "If size > K, pop largest.",
    "Return heap elements."
  ],
  "examples": [
    { "input": "points=[[1,3],[-2,2]], K=1", "output": "[[-2,2]]" }
  ],
  "complexity": {
    "time": "O(n log K)",
    "space": "O(K)"
  },
  "codes": {
    "python": 
`import heapq

def kClosest(points, k):
    h = []
    for x, y in points:
        dist = -(x*x + y*y)
        heapq.heappush(h, (dist, [x, y]))
        if len(h) > k:
            heapq.heappop(h)
    return [pt for _, pt in h]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    priority_queue<pair<int, vector<int>>> pq;

    for (auto &p : points) {
        int dist = -(p[0]*p[0] + p[1]*p[1]);
        pq.push({dist, p});
        if (pq.size() > k)
            pq.pop();
    }

    vector<vector<int>> res;
    while (!pq.empty()) {
        res.push_back(pq.top().second);
        pq.pop();
    }
    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public int[][] kClosest(int[][] points, int k) {

        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(b[0], a[0])
        );

        for (int[] p : points) {
            int dist = -(p[0]*p[0] + p[1]*p[1]);
            pq.offer(new int[]{dist, p[0], p[1]});

            if (pq.size() > k)
                pq.poll();
        }

        int[][] res = new int[k][2];
        int i = 0;

        while (!pq.isEmpty()) {
            int[] arr = pq.poll();
            res[i][0] = arr[1];
            res[i][1] = arr[2];
            i++;
        }

        return res;
    }
}`,

    "c":
`#include <stdlib.h>

typedef struct {
    int dist;
    int x;
    int y;
} Point;

int cmp(const void* a, const void* b) {
    Point* p1 = (Point*)a;
    Point* p2 = (Point*)b;
    return p1->dist - p2->dist;
}

int** kClosest(int** points, int pointsSize, int* pointsColSize,
               int k, int* returnSize, int** returnColumnSizes) {

    Point* arr = malloc(pointsSize * sizeof(Point));

    for (int i = 0; i < pointsSize; i++) {
        int x = points[i][0];
        int y = points[i][1];
        arr[i].x = x;
        arr[i].y = y;
        arr[i].dist = x*x + y*y;
    }

    qsort(arr, pointsSize, sizeof(Point), cmp);

    int** res = malloc(k * sizeof(int*));
    *returnColumnSizes = malloc(k * sizeof(int));
    *returnSize = k;

    for (int i = 0; i < k; i++) {
        res[i] = malloc(2 * sizeof(int));
        res[i][0] = arr[i].x;
        res[i][1] = arr[i].y;
        (*returnColumnSizes)[i] = 2;
    }

    free(arr);
    return res;
}`
  }
}
,
//question 6
{
  "q": "Check if string can be segmented into words in dictionary.",
  "difficulty": "Medium",
  "tags": ["DP", "String"],
  "a": "Use DP where dp[i] = true if substring(0,i) is breakable.",
  "steps": [
    "Initialize dp array of size n+1.",
    "dp[0] = true.",
    "For each index i, check all j < i.",
    "If dp[j]==true and s[j:i] in dict → dp[i] = true.",
    "Return dp[n]."
  ],
  "examples": [
    { "input": "s='leetcode', dict=['leet','code']", "output": "true" }
  ],
  "complexity": {
    "time": "O(n²)",
    "space": "O(n)"
  },
  "codes": {
    "python": 
`def wordBreak(s, wordDict):
    st = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True

    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in st:
                dp[i] = True
                break

    return dp[n]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> st(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && st.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}`,

    "java":
`import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {

        HashSet<String> set = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];

        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
}`,

    "c":
`#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

bool contains(char** dict, int dictSize, char* str) {
    for (int i = 0; i < dictSize; i++) {
        if (strcmp(dict[i], str) == 0)
            return true;
    }
    return false;
}

bool wordBreak(char* s, char** wordDict, int wordDictSize) {

    int n = strlen(s);
    bool* dp = calloc(n + 1, sizeof(bool));
    dp[0] = true;

    char temp[301];

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {

            if (dp[j]) {
                int len = i - j;
                strncpy(temp, s + j, len);
                temp[len] = '\0';

                if (contains(wordDict, wordDictSize, temp)) {
                    dp[i] = true;
                    break;
                }
            }
        }
    }

    bool result = dp[n];
    free(dp);
    return result;
}`
  }
}
,
//quetsion 7
{
  "q": "Design an algorithm to serialize and deserialize a binary tree.",
  "difficulty": "Medium",
  "tags": ["Tree", "DFS", "String"],
  "a": "Use preorder traversal with markers for null nodes.",
  "steps": [
    "For serialization, preorder: node,val,null markers.",
    "For deserialization, read tokens and rebuild recursively."
  ],
  "examples": [
    { "input": "Tree root=[1,2,3,null,null,4,5]", "output": "Serialized string" }
  ],
  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },
  "codes": {
    "python": 
`# Definition for a binary tree node:
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Codec:

    def serialize(self, root):
        res = []

        def dfs(node):
            if not node:
                res.append("N")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return ",".join(res)

    def deserialize(self, data):
        vals = iter(data.split(","))

        def build():
            v = next(vals)
            if v == "N":
                return None
            node = TreeNode(int(v))
            node.left = build()
            node.right = build()
            return node

        return build()`,

    "cpp":
`// Definition for a binary tree node.
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

class Codec {
public:
    string serialize(TreeNode* root) {
        string res;
        ser(root, res);
        return res;
    }

    void ser(TreeNode* node, string &res) {
        if(!node) {
            res += "N,";
            return;
        }
        res += to_string(node->val) + ",";
        ser(node->left, res);
        ser(node->right, res);
    }

    TreeNode* deserialize(string data) {
        int idx = 0;
        return des(data, idx);
    }

    TreeNode* des(string &data, int &idx) {
        if(idx >= data.size()) return NULL;

        if(data[idx] == 'N') {
            idx += 2;
            return NULL;
        }

        bool neg = false;
        if(data[idx] == '-') { neg = true; idx++; }

        int num = 0;
        while(idx < data.size() && isdigit(data[idx])) {
            num = num * 10 + (data[idx] - '0');
            idx++;
        }
        if(neg) num = -num;
        idx++; // skip comma

        TreeNode* node = new TreeNode(num);
        node->left = des(data, idx);
        node->right = des(data, idx);
        return node;
    }
};`,

    "java":
`// Definition for a binary tree node.
// public class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode(int x) { val = x; }
// }

class Codec {

    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        ser(root, sb);
        return sb.toString();
    }

    void ser(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
            return;
        }
        sb.append(node.val).append(",");
        ser(node.left, sb);
        ser(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        String[] arr = data.split(",");
        int[] idx = {0};
        return des(arr, idx);
    }

    TreeNode des(String[] arr, int[] idx) {
        if (idx[0] >= arr.length) return null;

        if (arr[idx[0]].equals("N")) {
            idx[0]++;
            return null;
        }

        TreeNode node = new TreeNode(Integer.parseInt(arr[idx[0]++]));
        node.left = des(arr, idx);
        node.right = des(arr, idx);
        return node;
    }
}`,

    "c":
`// Definition for a binary tree node:
// struct TreeNode {
//     int val;
//     struct TreeNode *left;
//     struct TreeNode *right;
// };

void serializeHelper(struct TreeNode* root, char* res, int* pos) {
    if (!root) {
        sprintf(res + *pos, "N,");
        *pos += 2;
        return;
    }

    sprintf(res + *pos, "%d,", root->val);
    *pos += strlen(res + *pos);

    serializeHelper(root->left, res, pos);
    serializeHelper(root->right, res, pos);
}

char* serialize(struct TreeNode* root) {
    char* res = malloc(10000);
    int pos = 0;
    serializeHelper(root, res, &pos);
    return res;
}

struct TreeNode* deserializeHelper(char** data) {
    if((*data)[0] == 'N') {
        *data += 2;
        return NULL;
    }

    int val = atoi(*data);
    while(**data != ',') (*data)++;
    (*data)++;

    struct TreeNode* node = malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = deserializeHelper(data);
    node->right = deserializeHelper(data);
    return node;
}

struct TreeNode* deserialize(char* data) {
    return deserializeHelper(&data);
}`
  }
}
,
//quetsion 8

{
  "q": "Return elements of a matrix in spiral order.",
  "difficulty": "Easy",
  "tags": ["Matrix", "Simulation"],
  "a": "Use boundaries top, bottom, left, right and iterate layer by layer.",
  "steps": [
    "Traverse top row, then right column, bottom row, left column.",
    "Shrink boundaries after each traversal.",
    "Stop when left > right or top > bottom."
  ],
  "examples": [
    { "input": "[[1,2,3],[4,5,6],[7,8,9]]", "output": "[1,2,3,6,9,8,7,4,5]" }
  ],
  "complexity": {
    "time": "O(m*n)",
    "space": "O(1)"
  },
 
  "codes": {
    "python":
`def spiralOrder(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while left <= right and top <= bottom:

        for i in range(left, right + 1):
            res.append(matrix[top][i])
        top += 1

        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1

        if top <= bottom:
            for i in range(right, left - 1, -1):
                res.append(matrix[bottom][i])
            bottom -= 1

        if left <= right:
            for i in range(bottom, top - 1, -1):
                res.append(matrix[i][left])
            left += 1

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> res;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (left <= right && top <= bottom) {

        for (int i = left; i <= right; i++)
            res.push_back(matrix[top][i]);
        top++;

        for (int i = top; i <= bottom; i++)
            res.push_back(matrix[i][right]);
        right--;

        if (top <= bottom) {
            for (int i = right; i >= left; i--)
                res.push_back(matrix[bottom][i]);
            bottom--;
        }

        if (left <= right) {
            for (int i = bottom; i >= top; i--)
                res.push_back(matrix[i][left]);
            left++;
        }
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();

        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (left <= right && top <= bottom) {

            for (int i = left; i <= right; i++)
                res.add(matrix[top][i]);
            top++;

            for (int i = top; i <= bottom; i++)
                res.add(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int i = right; i >= left; i--)
                    res.add(matrix[bottom][i]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--)
                    res.add(matrix[i][left]);
                left++;
            }
        }

        return res;
    }
}`,

    "c":
`#include <stdlib.h>

int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    int m = matrixSize;
    int n = matrixColSize[0];

    int* res = malloc(m * n * sizeof(int));
    *returnSize = 0;

    int top = 0, bottom = m - 1;
    int left = 0, right = n - 1;

    while (left <= right && top <= bottom) {

        for (int i = left; i <= right; i++)
            res[(*returnSize)++] = matrix[top][i];
        top++;

        for (int i = top; i <= bottom; i++)
            res[(*returnSize)++] = matrix[i][right];
        right--;

        if (top <= bottom) {
            for (int i = right; i >= left; i--)
                res[(*returnSize)++] = matrix[bottom][i];
            bottom--;
        }

        if (left <= right) {
            for (int i = bottom; i >= top; i--)
                res[(*returnSize)++] = matrix[i][left];
            left++;
        }
    }

    return res;
}`
  }
}


,
//question 9

{
  "q": "Design LRU Cache with O(1) get and put.",
  "difficulty": "Hard",
  "tags": ["HashMap", "LinkedList"],
  "a": "Use HashMap + doubly linked list to track usage order.",
  "steps": [
    "Maintain DLL where head is most recent.",
    "Map stores key → node.",
    "On get, move node to head.",
    "On put, insert new or update existing.",
    "If over capacity, remove tail node."
  ],
  "examples": [
    { "input": "LRU capacity=2, operations=[put(1,1), put(2,2), get(1)]", "output": "1" }
  ],
  "complexity": {
    "time": "O(1)",
    "space": "O(capacity)"
  },
   "codes": {
    "python":
`class LRUCache:

    class Node:
        def __init__(self, key, val):
            self.key = key
            self.val = val
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}

        self.head = self.Node(0, 0)
        self.tail = self.Node(0, 0)

        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def _insert(self, node):
        n = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = n
        n.prev = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._insert(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])

        node = self.Node(key, value)
        self.cache[key] = node
        self._insert(node)

        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

class LRUCache {
public:
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(NULL), next(NULL) {}
    };

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

    void removeNode(Node* node) {
        Node* p = node->prev;
        Node* n = node->next;
        p->next = n;
        n->prev = p;
    }

    void insertNode(Node* node) {
        Node* n = head->next;
        head->next = node;
        node->prev = head;
        node->next = n;
        n->prev = node;
    }

    int get(int key) {
        if (!mp.count(key)) return -1;
        Node* node = mp[key];
        removeNode(node);
        insertNode(node);
        return node->val;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            removeNode(mp[key]);
        }
        Node* node = new Node(key, value);
        mp[key] = node;
        insertNode(node);

        if (mp.size() > cap) {
            Node* lru = tail->prev;
            removeNode(lru);
            mp.erase(lru->key);
        }
    }
};`,

    "java":
`import java.util.*;

class LRUCache {

    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    int cap;
    HashMap<Integer, Node> map;
    Node head, tail;

    public LRUCache(int capacity) {
        cap = capacity;
        map = new HashMap<>();

        head = new Node(0,0);
        tail = new Node(0,0);
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insert(Node node) {
        Node n = head.next;
        head.next = node;
        node.prev = head;
        node.next = n;
        n.prev = node;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }

        Node node = new Node(key, value);
        map.put(key, node);
        insert(node);

        if (map.size() > cap) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
}`,

    "c":
`#include <stdlib.h>

typedef struct Node {
    int key, val;
    struct Node* prev;
    struct Node* next;
} Node;

typedef struct {
    int cap;
    Node** map;
    Node *head, *tail;
} LRUCache;

Node* createNode(int key, int val) {
    Node* n = malloc(sizeof(Node));
    n->key = key;
    n->val = val;
    n->prev = n->next = NULL;
    return n;
}

LRUCache* lRUCacheCreate(int capacity) {
    LRUCache* obj = malloc(sizeof(LRUCache));
    obj->cap = capacity;
    obj->map = calloc(10001, sizeof(Node*));

    obj->head = createNode(0,0);
    obj->tail = createNode(0,0);

    obj->head->next = obj->tail;
    obj->tail->prev = obj->head;

    return obj;
}

void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

void insertNode(LRUCache* obj, Node* node) {
    Node* n = obj->head->next;
    obj->head->next = node;
    node->prev = obj->head;
    node->next = n;
    n->prev = node;
}

int lRUCacheGet(LRUCache* obj, int key) {
    Node* node = obj->map[key];
    if (!node) return -1;

    removeNode(node);
    insertNode(obj, node);
    return node->val;
}

void lRUCachePut(LRUCache* obj, int key, int value) {
    Node* node = obj->map[key];

    if (node) {
        removeNode(node);
    }

    Node* newNode = createNode(key, value);
    obj->map[key] = newNode;
    insertNode(obj, newNode);

    int count = 0;
    for (int i = 0; i < 10001; i++)
        if (obj->map[i]) count++;

    if (count > obj->cap) {
        Node* lru = obj->tail->prev;
        obj->map[lru->key] = NULL;
        removeNode(lru);
        free(lru);
    }
}`
  }
}
,
//question 10

{
  "q": "Find all start indices of p's anagrams in s.",
  "difficulty": "Medium",
  "tags": ["Sliding Window", "Hashing"],
  "a": "Use fixed-size sliding window and compare character counts.",
  "steps": [
    "Use two frequency arrays for s and p.",
    "Slide window of size len(p).",
    "Update counts by adding right char & removing left char.",
    "If two freq arrays match → record index."
  ],
  "examples": [
    { "input": "s='cbaebabacd', p='abc'", "output": "[0,6]" }
  ],
  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },
  
  "codes": {
    "python":
`from collections import Counter

def findAnagrams(s, p):
    res = []
    k = len(p)

    pc = Counter(p)
    sc = Counter(s[:k])

    if sc == pc:
        res.append(0)

    for i in range(k, len(s)):
        sc[s[i]] += 1
        sc[s[i - k]] -= 1
        if sc[s[i - k]] == 0:
            del sc[s[i - k]]

        if sc == pc:
            res.append(i - k + 1)

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<int> findAnagrams(string s, string p) {
    vector<int> res;
    int n = s.size(), k = p.size();

    vector<int> pc(26,0), sc(26,0);

    for(char c : p) pc[c-'a']++;
    for(int i = 0; i < n; i++) {

        sc[s[i]-'a']++;

        if (i >= k)
            sc[s[i-k]-'a']--;

        if (i >= k-1 && sc == pc)
            res.push_back(i-k+1);
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), k = p.length();

        int[] pc = new int[26];
        int[] sc = new int[26];

        for (char c : p.toCharArray())
            pc[c - 'a']++;

        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            sc[s.charAt(i) - 'a']++;

            if (i >= k)
                sc[s.charAt(i - k) - 'a']--;

            if (i >= k - 1) {
                if (Arrays.equals(sc, pc))
                    res.add(i - k + 1);
            }
        }

        return res;
    }
}`,

    "c":
`#include <string.h>
#include <stdlib.h>

int* findAnagrams(char* s, char* p, int* returnSize) {
    int n = strlen(s);
    int k = strlen(p);

    int pc[26] = {0};
    int sc[26] = {0};

    for (int i = 0; i < k; i++)
        pc[p[i] - 'a']++;

    int* res = malloc(n * sizeof(int));
    *returnSize = 0;

    for (int i = 0; i < n; i++) {

        sc[s[i] - 'a']++;

        if (i >= k)
            sc[s[i - k] - 'a']--;

        int ok = 1;
        if (i >= k - 1) {
            for (int j = 0; j < 26; j++) {
                if (sc[j] != pc[j]) {
                    ok = 0;
                    break;
                }
            }
            if (ok)
                res[(*returnSize)++] = i - k + 1;
        }
    }

    return res;
}`
  }
}



];
