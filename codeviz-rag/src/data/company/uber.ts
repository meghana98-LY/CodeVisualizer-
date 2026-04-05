import { QAItem } from "./types";
export const Uber_QA: QAItem[] = [
     //quetsion 1
     {
  "q": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each node contains one digit. Add the two numbers and return the sum as a linked list.",
  "difficulty": "Medium",
  "tags": ["LinkedList", "Math"],

  "a": "Traverse both lists, add digit by digit along with carry. Create a new list for the result. Continue until both lists and carry are consumed.",

  "steps": [
    "Initialize a dummy head node.",
    "Set carry = 0.",
    "Traverse both lists l1 and l2:",
    "   • val = (l1.val if exists) + (l2.val if exists) + carry",
    "   • carry = val // 10",
    "   • create node with val % 10 and append to result",
    "Move l1 and l2 forward when possible.",
    "If carry > 0 at end, append new node with carry.",
    "Return dummy.next."
  ],

  "examples": [
    { "input": "l1 = [2,4,3], l2 = [5,6,4]", "output": "[7,0,8]" },
    { "input": "l1 = [0], l2 = [0]", "output": "[0]" }
  ],

  "complexity": {
    "time": "O(max(m,n))",
    "space": "O(max(m,n))"
  },

  "codes": {
    "python":
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    dummy = ListNode()
    curr = dummy
    carry = 0

    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0

        val = v1 + v2 + carry
        carry = val // 10

        curr.next = ListNode(val % 10)
        curr = curr.next

        if l1: l1 = l1.next
        if l2: l2 = l2.next

    return dummy.next`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;
    int carry = 0;

    while (l1 || l2 || carry) {
        int v1 = l1 ? l1->val : 0;
        int v2 = l2 ? l2->val : 0;

        int val = v1 + v2 + carry;
        carry = val / 10;

        curr->next = new ListNode(val % 10);
        curr = curr->next;

        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }

    return dummy->next;
}`,

    "java":
`// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x){ val=x; }
// }

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int v1 = (l1 != null) ? l1.val : 0;
            int v2 = (l2 != null) ? l2.val : 0;

            int val = v1 + v2 + carry;
            carry = val / 10;

            curr.next = new ListNode(val % 10);
            curr = curr.next;

            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        return dummy.next;
    }
}`,

    "c":
`#include <stdlib.h>

// struct ListNode {
//     int val;
//     struct ListNode* next;
// };

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode* dummy = malloc(sizeof(struct ListNode));
    dummy->val = 0;
    dummy->next = NULL;

    struct ListNode* curr = dummy;
    int carry = 0;

    while (l1 || l2 || carry) {
        int v1 = l1 ? l1->val : 0;
        int v2 = l2 ? l2->val : 0;

        int val = v1 + v2 + carry;
        carry = val / 10;

        struct ListNode* node = malloc(sizeof(struct ListNode));
        node->val = val % 10;
        node->next = NULL;

        curr->next = node;
        curr = curr->next;

        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }

    return dummy->next;
}`
  }
},

    //quetsion 2

    {
  "q": "Given an array of meeting time intervals where intervals[i] = [start, end], determine if a person can attend all meetings (i.e., no overlapping intervals).",
  "difficulty": "Easy",
  "tags": ["Sorting", "Intervals"],

  "a": "Sort intervals by start time. Then check if any interval’s start is less than the previous interval’s end. If yes, meetings overlap.",
  
  "steps": [
    "Sort intervals based on start time.",
    "Loop through intervals from i=1 to n-1:",
    "    • If intervals[i].start < intervals[i-1].end → overlap → return false.",
    "If loop finishes with no overlap, return true."
  ],

  "examples": [
    { "input": "[[0,30],[5,10],[15,20]]", "output": "false" },
    { "input": "[[7,10],[2,4]]", "output": "true" }
  ],

  "complexity": {
    "time": "O(n log n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def canAttendMeetings(intervals):
    intervals.sort(key=lambda x: x[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False
    return True`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool canAttendMeetings(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < intervals[i-1][1])
            return false;
    }
    return true;
}`,

    "java":
`import java.util.*;

class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a,b) -> a[0] - b[0]);

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i-1][1])
                return false;
        }

        return true;
    }
}`,

    "c":
`#include <stdlib.h>
#include <stdbool.h>

int cmp(const void* a, const void* b) {
    int* x = *(int**)a;
    int* y = *(int**)b;
    return x[0] - y[0];
}

bool canAttendMeetings(int** intervals, int intervalsSize, int* intervalsColSize) {
    qsort(intervals, intervalsSize, sizeof(int*), cmp);

    for (int i = 1; i < intervalsSize; i++) {
        if (intervals[i][0] < intervals[i-1][1])
            return false;
    }
    return true;
}`
  }
},

    //quetsion 3
    

    {
  "q": "Given an array of strings words and an integer k, return the k most frequent words. Sort by frequency, and for ties, lexicographically.",
  "difficulty": "Medium",
  "tags": ["Heap", "HashMap", "Sorting"],

  "a": "Use a hashmap to store frequencies. Then use a min-heap that stores (freq, word). For ties in freq, use lexicographical order. Maintain heap size k. Finally, extract results in reverse.",
  
  "steps": [
    "Count frequency of each word using hashmap.",
    "Use a min-heap of size k storing (freq, word).",
    "Push each (word,freq) into heap:",
    "    • If heap size > k, pop smallest.",
    "Extract words from heap and reverse to get correct order."
  ],

  "examples": [
    { "input": "words=['i','love','leetcode','i','love','coding'], k=2", "output": "['i','love']" },
    { "input": "words=['the','day','is','sunny','the','the','the','sunny','is','is'], k=4", "output": "['the','is','sunny','day']" }
  ],

  "complexity": {
    "time": "O(n log k)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`import heapq
from collections import Counter

def topKFrequent(words, k):
    freq = Counter(words)

    heap = []
    for w, c in freq.items():
        heapq.heappush(heap, (c, -ord(w[0]), w))
        if len(heap) > k:
            heapq.heappop(heap)

    res = []
    while heap:
        res.append(heapq.heappop(heap)[2])

    return res[::-1]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<string> topKFrequent(vector<string>& words, int k) {
    unordered_map<string,int> freq;
    for (auto &w : words) freq[w]++;

    auto cmp = [&](const pair<string,int>& a, const pair<string,int>& b){
        if (a.second == b.second) return a.first < b.first;
        return a.second > b.second;
    };

    priority_queue<
        pair<string,int>, 
        vector<pair<string,int>>, 
        decltype(cmp)
    > pq(cmp);

    for (auto &p : freq) {
        pq.push({p.first, p.second});
        if (pq.size() > k)
            pq.pop();
    }

    vector<string> res;
    while (!pq.empty()) {
        res.push_back(pq.top().first);
        pq.pop();
    }

    reverse(res.begin(), res.end());
    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String,Integer> freq = new HashMap<>();
        for (String w : words)
            freq.put(w, freq.getOrDefault(w, 0) + 1);

        PriorityQueue<String> pq = new PriorityQueue<>(
            (a,b) -> freq.get(a) == freq.get(b)
                     ? b.compareTo(a)
                     : freq.get(a) - freq.get(b)
        );

        for (String w : freq.keySet()) {
            pq.offer(w);
            if (pq.size() > k)
                pq.poll();
        }

        List<String> res = new ArrayList<>();
        while (!pq.isEmpty())
            res.add(pq.poll());

        Collections.reverse(res);
        return res;
    }
}`,

    "c":
`#include <stdlib.h>
#include <string.h>
#include <stdio.h>

typedef struct {
    char word[100];
    int freq;
} Pair;

int cmp(const void* a, const void* b) {
    Pair* x = (Pair*)a;
    Pair* y = (Pair*)b;

    if (x->freq == y->freq)
        return strcmp(x->word, y->word);

    return y->freq - x->freq;
}

char** topKFrequent(char** words, int wordsSize, int k, int* returnSize) {
    Pair* arr = malloc(wordsSize * sizeof(Pair));
    int count = 0;

    for (int i = 0; i < wordsSize; i++) {
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (strcmp(arr[j].word, words[i]) == 0) {
                arr[j].freq++;
                found = 1;
                break;
            }
        }
        if (!found) {
            strcpy(arr[count].word, words[i]);
            arr[count].freq = 1;
            count++;
        }
    }

    qsort(arr, count, sizeof(Pair), cmp);

    char** res = malloc(k * sizeof(char*));
    for (int i = 0; i < k; i++) {
        res[i] = strdup(arr[i].word);
    }

    *returnSize = k;
    free(arr);
    return res;
}`
  }
},

    //quetsion 4

    {
  "q": "Given a weighted graph represented as an adjacency list and a source node, compute the shortest distances from the source to all other nodes using Dijkstra's algorithm.",
  "difficulty": "Medium",
  "tags": ["Graph", "Dijkstra", "Priority Queue"],

  "a": "Use a min-heap (priority queue). Store (distance,node). Pop smallest distance, relax neighbors. If new_dist < old_dist, update and push back into heap.",

  "steps": [
    "Initialize dist[] with infinity; dist[source] = 0.",
    "Use a min-heap storing (distance, node).",
    "While heap is not empty:",
    "   • Pop smallest (d,u).",
    "   • If d > dist[u], continue (outdated entry).",
    "   • For each neighbor v with weight w:",
    "          if dist[u] + w < dist[v]: update dist[v] and push new value in heap.",
    "Return dist[] array."
  ],

  "examples": [
    { "input": "Graph: 0→(1,4),(2,1); 2→(1,2),(3,5); 1→(3,1). source=0", "output": "[0,3,1,4]" }
  ],

  "complexity": {
    "time": "O(E log V)",
    "space": "O(V + E)"
  },

  "codes": {
    "python":
`import heapq

def dijkstra(graph, source):
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0

    heap = [(0, source)]

    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue

        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))

    return dist`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& graph, int src) {
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;

    priority_queue<pair<int,int>,
                   vector<pair<int,int>>,
                   greater<pair<int,int>>> pq;

    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue;

        for (auto &p : graph[u]) {
            int v = p.first, w = p.second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,

    "java":
`import java.util.*;

class Solution {
    public int[] dijkstra(int n, List<List<int[]>> graph, int src) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a,b) -> a[0] - b[0]
        );

        pq.offer(new int[]{0, src});

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int d = top[0], u = top[1];

            if (d > dist[u]) continue;

            for (int[] edge : graph.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }

        return dist;
    }
}`,

    "c":
`#include <limits.h>
#include <stdlib.h>

typedef struct {
    int node;
    int dist;
} Pair;

typedef struct {
    Pair* arr;
    int size;
} MinHeap;

void heapify_down(MinHeap* h, int i) {
    int smallest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;

    if (l < h->size && h->arr[l].dist < h->arr[smallest].dist)
        smallest = l;
    if (r < h->size && h->arr[r].dist < h->arr[smallest].dist)
        smallest = r;

    if (smallest != i) {
        Pair temp = h->arr[smallest];
        h->arr[smallest] = h->arr[i];
        h->arr[i] = temp;
        heapify_down(h, smallest);
    }
}

void heapify_up(MinHeap* h, int i) {
    while (i > 0) {
        int p = (i - 1) / 2;
        if (h->arr[p].dist > h->arr[i].dist) {
            Pair tmp = h->arr[p];
            h->arr[p] = h->arr[i];
            h->arr[i] = tmp;
            i = p;
        } else break;
    }
}

int* dijkstra(int** graph[], int* graphColSize, int n, int src) {
    int* dist = malloc(sizeof(int) * n);
    for (int i = 0; i < n; i++)
        dist[i] = INT_MAX;
    dist[src] = 0;

    MinHeap heap;
    heap.arr = malloc(sizeof(Pair) * 10000);
    heap.size = 0;

    heap.arr[heap.size++] = (Pair){src, 0};

    while (heap.size > 0) {
        Pair top = heap.arr[0];
        heap.arr[0] = heap.arr[--heap.size];
        heapify_down(&heap, 0);

        int u = top.node;
        int d = top.dist;

        if (d > dist[u]) continue;

        for (int i = 0; i < graphColSize[u]; i++) {
            int v = graph[u][i][0];
            int w = graph[u][i][1];

            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                heap.arr[heap.size] = (Pair){v, dist[v]};
                heapify_up(&heap, heap.size);
                heap.size++;
            }
        }
    }

    return dist;
}`
  }
},

    //quetsion 5

    {
  "q": "Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of neighbors.",
  "difficulty": "Medium",
  "tags": ["Graph", "DFS", "BFS", "HashMap"],

  "a": "Use DFS or BFS with a hashmap to store cloned nodes. For each original node, create a deep copy and recursively clone its neighbors. Hashmap prevents infinite loops.",
  
  "steps": [
    "Use a hashmap oldNode -> newNode.",
    "Start DFS or BFS from the given node.",
    "For each node:",
    "    • If cloned not exists, create new cloned node and map it.",
    "    • Recursively clone all neighbors and append them.",
    "Return cloned copy of start node."
  ],

  "examples": [
    { "input": "1 -- 2; 1 -- 4; 2 -- 3; 3 -- 4", "output": "Deep cloned graph with same structure" }
  ],

  "complexity": {
    "time": "O(V + E)",
    "space": "O(V)"
  },

  "codes": {
    "python":
`class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors else []

def cloneGraph(node):
    if not node:
        return None

    cloned = {}

    def dfs(n):
        if n in cloned:
            return cloned[n]

        copy = Node(n.val)
        cloned[n] = copy

        for nei in n.neighbors:
            copy.neighbors.append(dfs(nei))

        return copy

    return dfs(node)`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// class Node {
// public:
//     int val;
//     vector<Node*> neighbors;
//     Node() {}
//     Node(int _val) { val = _val; }
// };

Node* cloneGraphDFS(Node* node, unordered_map<Node*,Node*>& mp) {
    if (!node) return NULL;
    if (mp.count(node)) return mp[node];

    Node* copy = new Node(node->val);
    mp[node] = copy;

    for (auto nei : node->neighbors)
        copy->neighbors.push_back(cloneGraphDFS(nei, mp));

    return copy;
}

Node* cloneGraph(Node* node) {
    unordered_map<Node*,Node*> mp;
    return cloneGraphDFS(node, mp);
}`,

    "java":
`import java.util.*;

// class Node {
//     public int val;
//     public List<Node> neighbors;
//     public Node() {}
//     public Node(int val) { this.val = val; this.neighbors = new ArrayList<>(); }
// }

class Solution {

    Map<Node, Node> map = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;

        if (map.containsKey(node))
            return map.get(node);

        Node newNode = new Node(node.val);
        map.put(node, newNode);

        for (Node nei : node.neighbors)
            newNode.neighbors.add(cloneGraph(nei));

        return newNode;
    }
}`,

    "c":
`#include <stdlib.h>

// struct Node {
//     int val;
//     int numNeighbors;
//     struct Node** neighbors;
// };

struct Node* cloneDFS(struct Node* node, struct Node** visited) {
    if (!node) return NULL;
    if (visited[node->val] != NULL)
        return visited[node->val];

    struct Node* copy = malloc(sizeof(struct Node));
    copy->val = node->val;
    copy->numNeighbors = node->numNeighbors;
    copy->neighbors = malloc(sizeof(struct Node*) * node->numNeighbors);

    visited[node->val] = copy;

    for (int i = 0; i < node->numNeighbors; i++)
        copy->neighbors[i] = cloneDFS(node->neighbors[i], visited);

    return copy;
}

struct Node* cloneGraph(struct Node* node) {
    if (!node) return NULL;

    struct Node** visited = calloc(101, sizeof(struct Node*));
    return cloneDFS(node, visited);
}`
  }
},

    //quetsion 6

    {
  "q": "Given an array of points where points[i] = [x, y], return the k closest points to the origin (0,0). Distance is sqrt(x² + y²).",
  "difficulty": "Medium",
  "tags": ["Heap", "Sorting", "Geometry"],

  "a": "Use a max-heap of size k. For each point, compute its squared distance. Push into heap. If heap size > k, remove farthest point. Finally return the k points in heap.",
  
  "steps": [
    "Use a max-heap storing (-distance, x, y) or (distance, point) depending on language.",
    "Compute squared distance: x*x + y*y.",
    "Push each point.",
    "If heap size exceeds k, pop the farthest.",
    "Return contents of heap."
  ],

  "examples": [
    { "input": "points=[[1,3],[-2,2]], k=1", "output": "[[-2,2]]" },
    { "input": "points=[[3,3],[5,-1],[-2,4]], k=2", "output": "[[3,3],[-2,4]]" }
  ],

  "complexity": {
    "time": "O(n log k)",
    "space": "O(k)"
  },

  "codes": {
    "python":
`import heapq

def kClosest(points, k):
    heap = []

    for x, y in points:
        dist = x*x + y*y
        heapq.heappush(heap, (-dist, x, y))
        if len(heap) > k:
            heapq.heappop(heap)

    return [(x, y) for (_, x, y) in heap]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    priority_queue<pair<int, pair<int,int>>> pq;

    for (auto &p : points) {
        int x = p[0], y = p[1];
        int dist = x*x + y*y;
        pq.push({dist, {x,y}});
        if (pq.size() > k)
            pq.pop();
    }

    vector<vector<int>> res;
    while (!pq.empty()) {
        auto t = pq.top(); pq.pop();
        res.push_back({t.second.first, t.second.second});
    }
    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public int[][] kClosest(int[][] points, int k) {

        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a,b) -> (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1])
        );

        for (int[] p : points) {
            pq.offer(p);
            if (pq.size() > k)
                pq.poll();
        }

        int[][] res = new int[k][2];
        for (int i = 0; i < k; i++)
            res[i] = pq.poll();

        return res;
    }
}`,

    "c":
`#include <stdlib.h>

typedef struct {
    int x, y;
    int dist;
} Point;

int cmp(const void* a, const void* b) {
    Point* p1 = (Point*)a;
    Point* p2 = (Point*)b;
    return p1->dist - p2->dist;
}

int** kClosest(int** points, int pointsSize, int* pointsColSize, int k, int* returnSize, int** returnColumnSizes) {
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
    for (int i = 0; i < k; i++) {
        res[i] = malloc(2 * sizeof(int));
        res[i][0] = arr[i].x;
        res[i][1] = arr[i].y;
        (*returnColumnSizes)[i] = 2;
    }

    *returnSize = k;
    free(arr);
    return res;
}`
  }
},

    //quetsion 7

    {
  "q": "Design and implement an LFU Cache. Implement get(key) and put(key, value) such that each runs in O(1) average time.",
  "difficulty": "Hard",
  "tags": ["Design", "HashMap", "Doubly Linked List"],

  "a": "Use: (1) key→node map, (2) freq→DoublyLinkedList map, (3) minFreq tracker. On get(), update frequency list of node. On put(), if full, evict least-freq LRU node from freq[minFreq]. All operations stay O(1).",

  "steps": [
    "Create Node class: key, value, frequency, prev, next.",
    "Use keyNode map to track node for each key.",
    "Use freqList map from frequency to doubly-linked list of nodes.",
    "Track minFreq = lowest frequency present.",
    "get(key):",
    "   • If not in map, return -1.",
    "   • Increase node.freq, move node to next frequency list.",
    "   • Update minFreq if needed.",
    "put(key,value):",
    "   • If key exists → update value + update freq.",
    "   • If capacity full → evict tail node from freq[minFreq].",
    "   • Insert new node with freq=1 and set minFreq=1."
  ],

  "examples": [
    { "input": "LFUCache(2); put(1,1); put(2,2); get(1)", "output": "1" },
    { "input": "put(3,3) → evicts key 2; get(2)", "output": "-1" }
  ],

  "complexity": {
    "time": "O(1)",
    "space": "O(capacity)"
  },

  "codes": {
    "python":
`class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.freq = 1
        self.prev = None
        self.next = None

class DLL:
    def __init__(self):
        self.head = Node(0,0)
        self.tail = Node(0,0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def insert_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def pop_tail(self):
        if self.tail.prev == self.head:
            return None
        node = self.tail.prev
        self.remove(node)
        return node

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.keyNode = {}
        self.freqList = {}
        self.minFreq = 0

    def update(self, node):
        f = node.freq
        self.freqList[f].remove(node)
        if f == self.minFreq and self.freqList[f].head.next == self.freqList[f].tail:
            self.minFreq += 1

        node.freq += 1
        if node.freq not in self.freqList:
            self.freqList[node.freq] = DLL()
        self.freqList[node.freq].insert_head(node)

    def get(self, key: int) -> int:
        if key not in self.keyNode:
            return -1
        node = self.keyNode[key]
        self.update(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if self.cap == 0:
            return

        if key in self.keyNode:
            node = self.keyNode[key]
            node.val = value
            self.update(node)
            return

        if len(self.keyNode) == self.cap:
            evict = self.freqList[self.minFreq].pop_tail()
            del self.keyNode[evict.key]

        newNode = Node(key, value)
        self.keyNode[key] = newNode
        if 1 not in self.freqList:
            self.freqList[1] = DLL()
        self.freqList[1].insert_head(newNode)
        self.minFreq = 1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct Node {
    int key, val, freq;
    Node *prev, *next;
    Node(int k, int v) : key(k), val(v), freq(1), prev(NULL), next(NULL) {}
};

struct DLL {
    Node *head, *tail;
    DLL() {
        head = new Node(0,0);
        tail = new Node(0,0);
        head->next = tail;
        tail->prev = head;
    }
    void insertHead(Node* n) {
        n->next = head->next;
        n->prev = head;
        head->next->prev = n;
        head->next = n;
    }
    void remove(Node* n) {
        n->prev->next = n->next;
        n->next->prev = n->prev;
    }
    Node* popTail() {
        if (tail->prev == head) return NULL;
        Node* n = tail->prev;
        remove(n);
        return n;
    }
};

class LFUCache {
public:
    int cap, minFreq;
    unordered_map<int, Node*> keyNode;
    unordered_map<int, DLL*> freqList;

    LFUCache(int capacity) {
        cap = capacity;
        minFreq = 0;
    }

    void update(Node* n) {
        int f = n->freq;
        freqList[f]->remove(n);

        if (f == minFreq && freqList[f]->head->next == freqList[f]->tail)
            minFreq++;

        n->freq++;
        if (!freqList.count(n->freq))
            freqList[n->freq] = new DLL();
        freqList[n->freq]->insertHead(n);
    }

    int get(int key) {
        if (!keyNode.count(key)) return -1;
        Node* n = keyNode[key];
        update(n);
        return n->val;
    }

    void put(int key, int value) {
        if (cap == 0) return;

        if (keyNode.count(key)) {
            Node* n = keyNode[key];
            n->val = value;
            update(n);
            return;
        }

        if (keyNode.size() == cap) {
            Node* ev = freqList[minFreq]->popTail();
            keyNode.erase(ev->key);
        }

        Node* newNode = new Node(key, value);
        keyNode[key] = newNode;

        if (!freqList.count(1))
            freqList[1] = new DLL();

        freqList[1]->insertHead(newNode);
        minFreq = 1;
    }
};`,

    "java":
`import java.util.*;

class LFUCache {
    class Node {
        int key, val, freq;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; freq = 1; }
    }

    class DLL {
        Node head, tail;
        DLL() {
            head = new Node(0,0);
            tail = new Node(0,0);
            head.next = tail;
            tail.prev = head;
        }
        void insertHead(Node n) {
            n.next = head.next;
            n.prev = head;
            head.next.prev = n;
            head.next = n;
        }
        void remove(Node n) {
            n.prev.next = n.next;
            n.next.prev = n.prev;
        }
        Node popTail() {
            if (tail.prev == head) return null;
            Node n = tail.prev;
            remove(n);
            return n;
        }
    }

    int cap, minFreq;
    Map<Integer, Node> keyNode = new HashMap<>();
    Map<Integer, DLL> freqList = new HashMap<>();

    public LFUCache(int capacity) {
        cap = capacity;
        minFreq = 0;
    }

    private void update(Node n) {
        int f = n.freq;
        freqList.get(f).remove(n);

        if (f == minFreq && freqList.get(f).head.next == freqList.get(f).tail)
            minFreq++;

        n.freq++;

        freqList.putIfAbsent(n.freq, new DLL());
        freqList.get(n.freq).insertHead(n);
    }

    public int get(int key) {
        if (!keyNode.containsKey(key)) return -1;
        Node n = keyNode.get(key);
        update(n);
        return n.val;
    }

    public void put(int key, int value) {
        if (cap == 0) return;

        if (keyNode.containsKey(key)) {
            Node n = keyNode.get(key);
            n.val = value;
            update(n);
            return;
        }

        if (keyNode.size() == cap) {
            Node ev = freqList.get(minFreq).popTail();
            keyNode.remove(ev.key);
        }

        Node newNode = new Node(key, value);
        keyNode.put(key, newNode);

        freqList.putIfAbsent(1, new DLL());
        freqList.get(1).insertHead(newNode);

        minFreq = 1;
    }
}`,

    "c":
`#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int key, val, freq;
    struct Node *prev, *next;
} Node;

typedef struct DLL {
    Node *head, *tail;
} DLL;

DLL* newDLL() {
    DLL* d = malloc(sizeof(DLL));
    d->head = malloc(sizeof(Node));
    d->tail = malloc(sizeof(Node));
    d->head->next = d->tail;
    d->tail->prev = d->head;
    return d;
}

void insertHead(DLL* d, Node* n) {
    n->next = d->head->next;
    n->prev = d->head;
    d->head->next->prev = n;
    d->head->next = n;
}

void removeNode(DLL* d, Node* n) {
    n->prev->next = n->next;
    n->next->prev = n->prev;
}

Node* popTail(DLL* d) {
    if (d->tail->prev == d->head) return NULL;
    Node* n = d->tail->prev;
    removeNode(d, n);
    return n;
}

typedef struct {
    int cap, minFreq;
    Node** keyNode;
    DLL** freqList;
} LFUCache;

LFUCache* lFUCacheCreate(int capacity) {
    LFUCache* c = malloc(sizeof(LFUCache));
    c->cap = capacity;
    c->minFreq = 0;
    c->keyNode = calloc(10001, sizeof(Node*));
    c->freqList = calloc(10001, sizeof(DLL*));
    return c;
}

void update(LFUCache* c, Node* n) {
    int f = n->freq;
    removeNode(c->freqList[f], n);

    if (f == c->minFreq &&
        c->freqList[f]->head->next == c->freqList[f]->tail)
        c->minFreq++;

    n->freq++;
    if (!c->freqList[n->freq])
        c->freqList[n->freq] = newDLL();
    insertHead(c->freqList[n->freq], n);
}

int lFUCacheGet(LFUCache* c, int key) {
    Node* n = c->keyNode[key];
    if (!n) return -1;
    update(c, n);
    return n->val;
}

void lFUCachePut(LFUCache* c, int key, int value) {
    if (c->cap == 0) return;

    Node* n = c->keyNode[key];
    if (n) {
        n->val = value;
        update(c, n);
        return;
    }

    int count = 0;
    for (int i = 0; i < 10001; i++)
        if (c->keyNode[i]) count++;

    if (count == c->cap) {
        Node* ev = popTail(c->freqList[c->minFreq]);
        c->keyNode[ev->key] = NULL;
    }

    Node* newNode = malloc(sizeof(Node));
    newNode->key = key;
    newNode->val = value;
    newNode->freq = 1;

    c->keyNode[key] = newNode;

    if (!c->freqList[1])
        c->freqList[1] = newDLL();

    insertHead(c->freqList[1], newNode);
    c->minFreq = 1;
}`
  }
},

    //quetsion 8
    {
  "q": "Given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.",
  "difficulty": "Medium",
  "tags": ["Matrix", "In-place", "Simulation"],

  "a": "Rotate by two steps: (1) Transpose the matrix. (2) Reverse each row. Both operations are in-place, giving 90° clockwise rotation.",

  "steps": [
    "For i in range(n):",
    "   For j in range(i): swap matrix[i][j] and matrix[j][i] (transpose).",
    "For each row: reverse the row.",
    "Matrix is rotated in-place."
  ],

  "examples": [
    { "input": "[[1,2,3],[4,5,6],[7,8,9]]", "output": "[[7,4,1],[8,5,2],[9,6,3]]" },
    { "input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", "output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" }
  ],

  "complexity": {
    "time": "O(n^2)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def rotate(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    for i in range(n):
        matrix[i].reverse()`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();

    for (int i = 0; i < n; i++)
        for (int j = 0; j < i; j++)
            swap(matrix[i][j], matrix[j][i]);

    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}`,

    "java":
`class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}`,

    "c":
`#include <stdlib.h>

void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    int n = matrixSize;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    for (int i = 0; i < n; i++) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = matrix[i][l];
            matrix[i][l] = matrix[i][r];
            matrix[i][r] = temp;
            l++;
            r--;
        }
    }
}`
  }
},

    //quetsion 9

    {
  "q": "Given a string s, find the length of the longest substring without repeating characters.",
  "difficulty": "Medium",
  "tags": ["Sliding Window", "HashMap", "Two Pointers"],

  "a": "Use sliding window with a hash map storing last seen index of each character. Expand right pointer, and when characters repeat, move left pointer to max(lastSeen+1). Track maximum window size.",
  
  "steps": [
    "Use hashmap lastSeen to store index of each char.",
    "Initialize left = 0.",
    "For each index right:",
    "    • If s[right] already seen and lastSeen[s[right]] >= left:",
    "          move left = lastSeen[s[right]] + 1.",
    "    • Update lastSeen for s[right].",
    "    • Update maxLen = max(maxLen, right-left+1).",
    "Return maxLen."
  ],

  "examples": [
    { "input": "\"abcabcbb\"", "output": "3" },
    { "input": "\"bbbbb\"", "output": "1" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1) (ASCII char map)"
  },

  "codes": {
    "python":
`def lengthOfLongestSubstring(s):
    last = {}
    left = 0
    maxLen = 0

    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1

        last[ch] = right
        maxLen = max(maxLen, right - left + 1)

    return maxLen`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<int> last(256, -1);
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        if (last[s[right]] >= left)
            left = last[s[right]] + 1;

        last[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }

    return maxLen;
}`,

    "java":
`import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] last = new int[256];
        Arrays.fill(last, -1);

        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            if (last[c] >= left)
                left = last[c] + 1;

            last[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,

    "c":
`#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int last[256];
    for (int i = 0; i < 256; i++)
        last[i] = -1;

    int left = 0, maxLen = 0;

    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char c = s[right];

        if (last[c] >= left)
            left = last[c] + 1;

        last[c] = right;

        int currLen = right - left + 1;
        if (currLen > maxLen)
            maxLen = currLen;
    }

    return maxLen;
}`
  }
},

    //quetsion 10

    {
  "q": "Given an m x n grid of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
  "difficulty": "Medium",
  "tags": ["DFS", "BFS", "Matrix", "Graph"],

  "a": "Use DFS or BFS to traverse each unvisited '1'. Every time you find a '1', increment island count and mark all reachable '1's as visited by turning them to '0'.",
  
  "steps": [
    "Initialize count = 0.",
    "Traverse each cell in the grid.",
    "When you find a '1':",
    "   • Increase island count.",
    "   • Run DFS/BFS to mark connected land as visited by turning them into '0'.",
    "DFS explores up, down, left, right.",
    "Return count."
  ],

  "examples": [
    { "input": "[['1','1','0','0'],['1','0','0','1'],['0','0','1','1']]", "output": "3" },
    { "input": "[['1','1'],['1','1']]", "output": "1" }
  ],

  "complexity": {
    "time": "O(m*n)",
    "space": "O(m*n) worst (DFS stack)"
  },

  "codes": {
    "python":
`def numIslands(grid):
    if not grid:
        return 0

    m, n = len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    count = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)

    return count`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    int m = grid.size(), n = grid[0].size();
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == '0')
        return;

    grid[r][c] = '0';
    dfs(grid, r+1, c);
    dfs(grid, r-1, c);
    dfs(grid, r, c+1);
    dfs(grid, r, c-1);
}

int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size();
    int count = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }

    return count;
}`,

    "java":
`class Solution {

    void dfs(char[][] grid, int r, int c) {
        int m = grid.length, n = grid[0].length;

        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == '0')
            return;

        grid[r][c] = '0';

        dfs(grid, r+1, c);
        dfs(grid, r-1, c);
        dfs(grid, r, c+1);
        dfs(grid, r, c-1);
    }

    public int numIslands(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
}`,

    "c":
`#include <stdlib.h>

void dfs(char** grid, int r, int c, int m, int n) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == '0')
        return;

    grid[r][c] = '0';

    dfs(grid, r+1, c, m, n);
    dfs(grid, r-1, c, m, n);
    dfs(grid, r, c+1, m, n);
    dfs(grid, r, c-1, m, n);
}

int numIslands(char** grid, int gridSize, int* gridColSize) {
    int m = gridSize;
    int n = gridColSize[0];

    int count = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j, m, n);
            }
        }
    }

    return count;
}`
  }
}

];
