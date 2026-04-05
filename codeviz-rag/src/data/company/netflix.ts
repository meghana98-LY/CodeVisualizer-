import { QAItem } from "./types";
export const Netflix_QA: QAItem[] = [
     //quetsion 1

     {
  "q": "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
  "difficulty": "Easy",
  "tags": ["Array", "HashMap"],

  "a": "Use a hashmap to store value → index. For each number, check if (target - current) exists in the map. If yes, return the indices.",

  "steps": [
    "Initialize an empty hashmap.",
    "Traverse array with index i:",
    "   • Compute required = target - nums[i].",
    "   • If required exists in map → return [map[required], i].",
    "   • Else put nums[i] in map with value i.",
    "If no solution found, return empty list."
  ],

  "examples": [
    { "input": "nums=[2,7,11,15], target=9", "output": "[0,1]" },
    { "input": "nums=[3,2,4], target=6", "output": "[1,2]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def twoSum(nums, target):
    mp = {}
    for i, n in enumerate(nums):
        need = target - n
        if need in mp:
            return [mp[need], i]
        mp[n] = i
    return []`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> mp;
    for(int i=0;i<nums.size();i++){
        int need = target - nums[i];
        if(mp.count(need))
            return {mp[need], i};
        mp[nums[i]] = i;
    }
    return {};
}`,

    "java":
`import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer,Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (map.containsKey(need))
                return new int[]{ map.get(need), i };
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,

    "c":
`#include <stdlib.h>

int* twoSum(int* nums, int n, int target, int* returnSize) {
    int* res = malloc(2 * sizeof(int));

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
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
},

    //quetsion 2

    {
  "q": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an O(n) solution.",
  "difficulty": "Medium",
  "tags": ["HashSet", "Array"],

  "a": "Insert all numbers into a hash set. For each number, check if it is the start of a sequence (i.e., num-1 not in set). Then count consecutive numbers forward.",
  
  "steps": [
    "Insert all numbers into a hash set.",
    "Initialize longest = 0.",
    "For each number n in set:",
    "   • Only start counting if (n - 1) is NOT in the set → ensures O(n).",
    "   • Let current = n.",
    "   • While (current + 1) exists → increment streak.",
    "   • Update longest = max(longest, streak).",
    "Return longest."
  ],

  "examples": [
    { "input": "[100,4,200,1,3,2]", "output": "4" },
    { "input": "[0,3,7,2,5,8,4,6,0,1]", "output": "9" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def longestConsecutive(nums):
    numSet = set(nums)
    longest = 0

    for n in numSet:
        if n - 1 not in numSet:
            current = n
            streak = 1

            while current + 1 in numSet:
                current += 1
                streak += 1

            longest = max(longest, streak)

    return longest`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> st(nums.begin(), nums.end());
    int longest = 0;

    for (int n : st) {
        if (!st.count(n - 1)) {
            int current = n;
            int streak = 1;

            while (st.count(current + 1)) {
                current++;
                streak++;
            }

            longest = max(longest, streak);
        }
    }

    return longest;
}`,

    "java":
`import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);

        int longest = 0;

        for (int n : set) {
            if (!set.contains(n - 1)) {
                int current = n;
                int streak = 1;

                while (set.contains(current + 1)) {
                    current++;
                    streak++;
                }

                longest = Math.max(longest, streak);
            }
        }

        return longest;
    }
}`,

    "c":
`#include <stdlib.h>

// simple hash set using sorted array approach (O(n log n))
int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) return 0;

    qsort(nums, numsSize, sizeof(int), 
        (int(*)(const void*, const void*)) 
        [](int* a, int* b){ return (*a - *b); }
    );

    int longest = 1, streak = 1;

    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == nums[i - 1]) continue;
        if (nums[i] == nums[i - 1] + 1)
            streak++;
        else
            streak = 1;

        if (streak > longest)
            longest = streak;
    }

    return longest;
}`
  }
},

    //quetsion 3
    

    {
  "q": "Given an integer array nums and an integer k, return the kth largest element in the array.",
  "difficulty": "Medium",
  "tags": ["Heap", "Quickselect", "Sorting"],

  "a": "The optimal solution uses Quickselect with average O(n). A simpler but still O(n log n) approach is using a min-heap of size k.",
  
  "steps": [
    "Use a min-heap of size k.",
    "Iterate through nums:",
    "   • Push each element into heap.",
    "   • If heap size > k, pop the smallest.",
    "At the end, the top of the heap is the kth largest element."
  ],

  "examples": [
    { "input": "nums=[3,2,1,5,6,4], k=2", "output": "5" },
    { "input": "nums=[3,2,3,1,2,4,5,5,6], k=4", "output": "4" }
  ],

  "complexity": {
    "time": "O(n log k)",
    "space": "O(k)"
  },

  "codes": {
    "python":
`import heapq

def findKthLargest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;

    for (int n : nums) {
        minHeap.push(n);
        if (minHeap.size() > k)
            minHeap.pop();
    }

    return minHeap.top();
}`,

    "java":
`import java.util.*;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int n : nums) {
            pq.offer(n);
            if (pq.size() > k)
                pq.poll();
        }

        return pq.peek();
    }
}`,

    "c":
`#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return (*(int*)b - *(int*)a);
}

int findKthLargest(int* nums, int numsSize, int k) {
    qsort(nums, numsSize, sizeof(int), cmp);
    return nums[k - 1];
}`
  }
},

    //quetsion 4

    {
  "q": "Given an array nums and an integer k, return the maximum value in each sliding window of size k.",
  "difficulty": "Hard",
  "tags": ["Deque", "Sliding Window", "Monotonic Queue"],

  "a": "Use a deque that stores indices of useful elements in decreasing order. The front of the deque holds the maximum of the current window.",
  
  "steps": [
    "Use a deque to store indices of elements in decreasing order of values.",
    "For each index i:",
    "   • Remove indices from back if nums[i] is greater.",
    "   • Add i to the deque.",
    "   • Remove front element if it is outside the window.",
    "   • When i >= k-1, record nums[deque.front()] as window max.",
    "Return all maxima."
  ],

  "examples": [
    { "input": "nums=[1,3,-1,-3,5,3,6,7], k=3", "output": "[3,3,5,5,6,7]" },
    { "input": "nums=[1], k=1", "output": "[1]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(k)"
  },

  "codes": {
    "python":
`from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()
    res = []

    for i in range(len(nums)):
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()

        dq.append(i)

        if dq[0] == i - k:
            dq.popleft()

        if i >= k - 1:
            res.append(nums[dq[0]])

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;

    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && nums[dq.back()] < nums[i])
            dq.pop_back();

        dq.push_back(i);

        if (dq.front() == i - k)
            dq.pop_front();

        if (i >= k - 1)
            res.push_back(nums[dq.front()]);
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> dq = new LinkedList<>();
        int[] res = new int[nums.length - k + 1];
        int idx = 0;

        for (int i = 0; i < nums.length; i++) {
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i])
                dq.pollLast();

            dq.offerLast(i);

            if (dq.peekFirst() == i - k)
                dq.pollFirst();

            if (i >= k - 1)
                res[idx++] = nums[dq.peekFirst()];
        }

        return res;
    }
}`,

    "c":
`#include <stdlib.h>

int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    if (numsSize == 0) {
        *returnSize = 0;
        return NULL;
    }

    int* res = malloc((numsSize - k + 1) * sizeof(int));
    int idx = 0;

    int* dq = malloc(numsSize * sizeof(int));
    int front = 0, rear = 0;

    for (int i = 0; i < numsSize; i++) {
        while (front < rear && nums[dq[rear - 1]] < nums[i])
            rear--;

        dq[rear++] = i;

        if (dq[front] == i - k)
            front++;

        if (i >= k - 1)
            res[idx++] = nums[dq[front]];
    }

    *returnSize = idx;
    free(dq);
    return res;
}`
  }
},

    //quetsion 5

    {
  "q": "Design and implement an LFU (Least Frequently Used) cache. Implement get(key) and put(key,value) in O(1) time.",
  "difficulty": "Hard",
  "tags": ["Design", "HashMap", "Double Linked List"],

  "a": "Maintain: (1) key → node map, (2) freq → DLL map, and (3) global minFreq. Each node stores key, value, frequency. On get(): update frequency lists. On put(): evict from DLL with minFreq.",

  "steps": [
    "Use a Node structure: key, val, freq, prev, next.",
    "Use a HashMap keyNode to map key → node.",
    "Use a HashMap freqList to map freq → doubly linked list of nodes.",
    "Track a variable minFreq which represents the lowest frequency currently in cache.",
    "On get(key):",
    "    • If key not exist return -1.",
    "    • Increase node.freq and move it to the next frequency list.",
    "    • Update minFreq if needed.",
    "On put(key,val):",
    "    • If capacity=0 return.",
    "    • If key exists: update value and handle frequency increment.",
    "    • Else if at capacity: evict LRU node from freqList[minFreq].",
    "    • Insert new node with freq=1 and set minFreq=1."
  ],

  "examples": [
    { "input": "LFUCache(2), put(1,1), put(2,2), get(1)", "output": "1" },
    { "input": "put(3,3) → evicts key 2 (LFU), get(2)", "output": "-1" }
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
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def remove_tail(self):
        if self.tail.prev == self.head:
            return None
        node = self.tail.prev
        self.remove(node)
        return node

class LFUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.minFreq = 0
        self.keyNode = {}
        self.freqList = {}

    def _update(self, node):
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
        self._update(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if self.cap == 0:
            return

        if key in self.keyNode:
            node = self.keyNode[key]
            node.val = value
            self._update(node)
            return

        if len(self.keyNode) == self.cap:
            node = self.freqList[self.minFreq].remove_tail()
            del self.keyNode[node.key]

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
    Node(int k, int v): key(k), val(v), freq(1), prev(NULL), next(NULL) {}
};

struct DLL {
    Node *head, *tail;
    DLL() {
        head = new Node(0,0);
        tail = new Node(0,0);
        head->next = tail;
        tail->prev = head;
    }
    void insertHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    Node* removeTail() {
        if (tail->prev == head) return NULL;
        Node* node = tail->prev;
        remove(node);
        return node;
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

    void update(Node* node) {
        int f = node->freq;
        freqList[f]->remove(node);

        if (f == minFreq && freqList[f]->head->next == freqList[f]->tail)
            minFreq++;

        node->freq++;
        if (!freqList.count(node->freq))
            freqList[node->freq] = new DLL();
        freqList[node->freq]->insertHead(node);
    }

    int get(int key) {
        if (!keyNode.count(key)) return -1;
        Node* node = keyNode[key];
        update(node);
        return node->val;
    }

    void put(int key, int value) {
        if (cap == 0) return;

        if (keyNode.count(key)) {
            Node* node = keyNode[key];
            node->val = value;
            update(node);
            return;
        }

        if (keyNode.size() == cap) {
            Node* node = freqList[minFreq]->removeTail();
            keyNode.erase(node->key);
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

        Node removeTail() {
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
            Node node = freqList.get(minFreq).removeTail();
            keyNode.remove(node.key);
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
#include <limits.h>
#include <stdbool.h>

// -------- Node structure ----------
typedef struct Node {
    int key, val, freq;
    struct Node *prev, *next;
} Node;

// -------- Doubly linked list --------
typedef struct DLL {
    Node *head, *tail;
} DLL;

DLL* createDLL() {
    DLL* list = malloc(sizeof(DLL));
    list->head = malloc(sizeof(Node));
    list->tail = malloc(sizeof(Node));
    list->head->next = list->tail;
    list->tail->prev = list->head;
    list->head->prev = NULL;
    list->tail->next = NULL;
    return list;
}

void insertHead(DLL* list, Node* n) {
    n->next = list->head->next;
    n->prev = list->head;
    list->head->next->prev = n;
    list->head->next = n;
}

void removeNode(DLL* list, Node* n) {
    n->prev->next = n->next;
    n->next->prev = n->prev;
}

Node* removeTail(DLL* list) {
    if (list->tail->prev == list->head) return NULL;
    Node* n = list->tail->prev;
    removeNode(list, n);
    return n;
}

// -------- LFU Cache structure --------
typedef struct {
    int cap, minFreq;
    Node** keyNode;  
    DLL** freqList;
} LFUCache;

LFUCache* lFUCacheCreate(int capacity) {
    LFUCache* obj = malloc(sizeof(LFUCache));
    obj->cap = capacity;
    obj->minFreq = 0;

    obj->keyNode = calloc(10001, sizeof(Node*));
    obj->freqList = calloc(10001, sizeof(DLL*));
    return obj;
}

void update(LFUCache* obj, Node* n) {
    int f = n->freq;
    removeNode(obj->freqList[f], n);

    if (f == obj->minFreq &&
        obj->freqList[f]->head->next == obj->freqList[f]->tail)
        obj->minFreq++;

    n->freq++;
    if (!obj->freqList[n->freq])
        obj->freqList[n->freq] = createDLL();

    insertHead(obj->freqList[n->freq], n);
}

int lFUCacheGet(LFUCache* obj, int key) {
    Node* n = obj->keyNode[key];
    if (!n) return -1;
    update(obj, n);
    return n->val;
}

void lFUCachePut(LFUCache* obj, int key, int value) {
    if (obj->cap == 0) return;

    Node* n = obj->keyNode[key];
    if (n) {
        n->val = value;
        update(obj, n);
        return;
    }

    if (obj->cap == 0) return;

    int count = 0;
    for (int i = 0; i < 10001; i++)
        if (obj->keyNode[i]) count++;

    if (count == obj->cap) {
        Node* toEvict = removeTail(obj->freqList[obj->minFreq]);
        obj->keyNode[toEvict->key] = NULL;
    }

    Node* newNode = malloc(sizeof(Node));
    newNode->key = key;
    newNode->val = value;
    newNode->freq = 1;

    obj->keyNode[key] = newNode;

    if (!obj->freqList[1])
        obj->freqList[1] = createDLL();

    insertHead(obj->freqList[1], newNode);
    obj->minFreq = 1;
}`
  }
},

    //quetsion 6

    {
  "q": "Given an array of k sorted linked lists, merge them into one sorted list and return it.",
  "difficulty": "Hard",
  "tags": ["LinkedList", "Heap", "Divide and Conquer"],

  "a": "Use a min-heap (priority queue). Push the head of each list into the heap. Repeatedly pop the smallest node and push its next node. Alternatively, use divide-and-conquer merging.",
  
  "steps": [
    "Create a min-heap storing (node value, list index, node pointer).",
    "Push the head of each non-empty list to the heap.",
    "Initialize a dummy node for result list.",
    "While heap is not empty:",
    "    • Pop smallest node.",
    "    • Append to result list.",
    "    • If popped node has next, push next into heap.",
    "Return merged list starting from dummy.next."
  ],

  "examples": [
    { "input": "[[1,4,5],[1,3,4],[2,6]]", "output": "[1,1,2,3,4,4,5,6]" },
    { "input": "[]", "output": "[]" }
  ],

  "complexity": {
    "time": "O(N log k)",
    "space": "O(k)"
  },

  "codes": {
    "python":
`import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

struct cmp {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, cmp> pq;

    for (auto node : lists)
        if (node) pq.push(node);

    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;

    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        curr->next = node;
        curr = curr->next;
        if (node->next)
            pq.push(node->next);
    }

    return dummy->next;
}`,

    "java":
`import java.util.*;

// class ListNode {
//     int val;
//     ListNode next;
//     ListNode() {}
//     ListNode(int val) { this.val = val; }
//     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
// }

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b) -> a.val - b.val);

        for (ListNode node : lists)
            if (node != null)
                pq.offer(node);

        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            curr.next = node;
            curr = curr.next;

            if (node.next != null)
                pq.offer(node.next);
        }

        return dummy.next;
    }
}`,

    "c":
`#include <stdlib.h>

// struct ListNode {
//     int val;
//     struct ListNode *next;
// };

// Min-heap for C
typedef struct {
    struct ListNode** arr;
    int size;
} MinHeap;

void heapify_down(MinHeap* h, int i) {
    int smallest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;

    if (l < h->size && h->arr[l]->val < h->arr[smallest]->val)
        smallest = l;
    if (r < h->size && h->arr[r]->val < h->arr[smallest]->val)
        smallest = r;

    if (smallest != i) {
        struct ListNode* temp = h->arr[i];
        h->arr[i] = h->arr[smallest];
        h->arr[smallest] = temp;
        heapify_down(h, smallest);
    }
}

void heapify_up(MinHeap* h, int i) {
    while (i != 0) {
        int p = (i - 1) / 2;
        if (h->arr[p]->val > h->arr[i]->val) {
            struct ListNode* temp = h->arr[p];
            h->arr[p] = h->arr[i];
            h->arr[i] = temp;
            i = p;
        } else break;
    }
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    MinHeap h;
    h.arr = malloc(sizeof(struct ListNode*) * listsSize);
    h.size = 0;

    for (int i = 0; i < listsSize; i++) {
        if (lists[i]) {
            h.arr[h.size++] = lists[i];
            heapify_up(&h, h.size - 1);
        }
    }

    struct ListNode* dummy = malloc(sizeof(struct ListNode));
    dummy->val = 0; dummy->next = NULL;
    struct ListNode* curr = dummy;

    while (h.size > 0) {
        struct ListNode* minNode = h.arr[0];
        curr->next = minNode;
        curr = curr->next;

        if (minNode->next) {
            h.arr[0] = minNode->next;
        } else {
            h.arr[0] = h.arr[h.size - 1];
            h.size--;
        }

        heapify_down(&h, 0);
    }

    return dummy->next;
}`
  }
},

    //quetsion 7

    {
  "q": "Design an LRU Cache with get(key) and put(key,value) both operating in O(1) time complexity.",
  "difficulty": "Medium",
  "tags": ["Design", "LinkedList", "HashMap"],

  "a": "Use a doubly linked list + hashmap. The DLL stores nodes in recency order (most recent at head). Hashmap stores key → node. On get/put, move node to head. On capacity overflow, remove tail node.",
  
  "steps": [
    "Use Node(key,val) storing prev and next pointers.",
    "Use a hashmap to map key → linked list node.",
    "Use a doubly linked list with head and tail sentinels.",
    "On get(key):",
    "    • If not found, return -1.",
    "    • Move the node to the head (most recent).",
    "    • Return its value.",
    "On put(key,val):",
    "    • If key exists, update value and move to head.",
    "    • Else create new node.",
    "    • If at capacity, remove tail node from DLL and hashmap.",
    "    • Insert new node at head."
  ],

  "examples": [
    { "input": "LRUCache(2), put(1,1), put(2,2), get(1)", "output": "1" },
    { "input": "put(3,3) → evict key 2, get(2)", "output": "-1" }
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
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.map = {}

        self.head = Node(0,0)
        self.tail = Node(0,0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def _insert_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        node = self.map[key]
        self._remove(node)
        self._insert_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            node = self.map[key]
            node.val = value
            self._remove(node)
            self._insert_head(node)
            return

        if len(self.map) == self.cap:
            toRemove = self.tail.prev
            self._remove(toRemove)
            del self.map[toRemove.key]

        newNode = Node(key, value)
        self.map[key] = newNode
        self._insert_head(newNode)`,

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

    void insertHead(Node* n) {
        n->next = head->next;
        n->prev = head;
        head->next->prev = n;
        head->next = n;
    }

    int get(int key) {
        if (!mp.count(key)) return -1;
        Node* node = mp[key];
        remove(node);
        insertHead(node);
        return node->val;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            Node* node = mp[key];
            node->val = value;
            remove(node);
            insertHead(node);
            return;
        }

        if (mp.size() == cap) {
            Node* toEvict = tail->prev;
            remove(toEvict);
            mp.erase(toEvict->key);
        }

        Node* newNode = new Node(key, value);
        mp[key] = newNode;
        insertHead(newNode);
    }
};`,

    "java":
`import java.util.*;

// class Node { }

class LRUCache {

    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    int cap;
    Map<Integer, Node> map = new HashMap<>();
    Node head, tail;

    public LRUCache(int capacity) {
        cap = capacity;
        head = new Node(0,0);
        tail = new Node(0,0);
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node n) {
        n.prev.next = n.next;
        n.next.prev = n.prev;
    }

    private void insertHead(Node n) {
        n.next = head.next;
        n.prev = head;
        head.next.prev = n;
        head.next = n;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node n = map.get(key);
        remove(n);
        insertHead(n);
        return n.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node n = map.get(key);
            n.val = value;
            remove(n);
            insertHead(n);
            return;
        }

        if (map.size() == cap) {
            Node toEvict = tail.prev;
            remove(toEvict);
            map.remove(toEvict.key);
        }

        Node newNode = new Node(key, value);
        map.put(key, newNode);
        insertHead(newNode);
    }
}`,

    "c":
`#include <stdlib.h>

// Node structure
typedef struct Node {
    int key, val;
    struct Node *prev, *next;
} Node;

typedef struct {
    int cap;
    Node** map;
    Node *head, *tail;
} LRUCache;

Node* newNode(int key, int val) {
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

    obj->head = newNode(0,0);
    obj->tail = newNode(0,0);
    obj->head->next = obj->tail;
    obj->tail->prev = obj->head;

    return obj;
}

void removeNode(LRUCache* obj, Node* n) {
    n->prev->next = n->next;
    n->next->prev = n->prev;
}

void insertHead(LRUCache* obj, Node* n) {
    n->next = obj->head->next;
    n->prev = obj->head;
    obj->head->next->prev = n;
    obj->head->next = n;
}

int lRUCacheGet(LRUCache* obj, int key) {
    Node* n = obj->map[key];
    if (!n) return -1;
    removeNode(obj, n);
    insertHead(obj, n);
    return n->val;
}

void lRUCachePut(LRUCache* obj, int key, int value) {
    Node* n = obj->map[key];
    if (n) {
        n->val = value;
        removeNode(obj, n);
        insertHead(obj, n);
        return;
    }

    int count = 0;
    for (int i = 0; i < 10001; i++)
        if (obj->map[i]) count++;

    if (count == obj->cap) {
        Node* toEvict = obj->tail->prev;
        obj->map[toEvict->key] = NULL;
        removeNode(obj, toEvict);
    }

    Node* newN = newNode(key, value);
    obj->map[key] = newN;
    insertHead(obj, newN);
}`
  }
},

    //quetsion 8

    {
  "q": "Given an encoded string s, return its decoded string. Encoding rule: k[encoded_string]. The encoded_string inside the square brackets is repeated exactly k times.",
  "difficulty": "Medium",
  "tags": ["Stack", "String"],

  "a": "Use two stacks: one for counts and one for partial strings. Traverse the string. When you hit '[', push current string and count. When you hit ']', pop and expand. Otherwise, accumulate chars.",
  
  "steps": [
    "Initialize count=0, current_string=\"\", and two stacks: countStack and stringStack.",
    "Traverse each character c in s:",
    "   • If digit → update count.",
    "   • If '[' → push count and current_string onto stacks; reset both.",
    "   • If letter → append to current_string.",
    "   • If ']' → pop last_string and repeat_count; current_string = last_string + current_string * repeat_count.",
    "Return current_string at end."
  ],

  "examples": [
    { "input": "\"3[a]2[bc]\"", "output": "\"aaabcbc\"" },
    { "input": "\"3[a2[c]]\"", "output": "\"accaccacc\"" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def decodeString(s):
    countStack = []
    stringStack = []
    curr = ""
    num = 0

    for c in s:
        if c.isdigit():
            num = num * 10 + int(c)
        elif c == '[':
            countStack.append(num)
            stringStack.append(curr)
            num = 0
            curr = ""
        elif c == ']':
            repeat = countStack.pop()
            prev = stringStack.pop()
            curr = prev + curr * repeat
        else:
            curr += c

    return curr`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string decodeString(string s) {
    stack<int> countSt;
    stack<string> strSt;
    string curr = "";
    int num = 0;

    for (char c : s) {
        if (isdigit(c)) {
            num = num * 10 + (c - '0');
        } 
        else if (c == '[') {
            countSt.push(num);
            strSt.push(curr);
            num = 0;
            curr = "";
        } 
        else if (c == ']') {
            int repeat = countSt.top(); countSt.pop();
            string prev = strSt.top(); strSt.pop();
            string temp = "";
            while (repeat--) temp += curr;
            curr = prev + temp;
        } 
        else {
            curr += c;
        }
    }

    return curr;
}`,

    "java":
`import java.util.*;

class Solution {
    public String decodeString(String s) {
        Stack<Integer> countSt = new Stack<>();
        Stack<String> strSt = new Stack<>();
        String curr = "";
        int num = 0;

        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                num = num * 10 + (c - '0');
            } 
            else if (c == '[') {
                countSt.push(num);
                strSt.push(curr);
                num = 0;
                curr = "";
            } 
            else if (c == ']') {
                int repeat = countSt.pop();
                String prev = strSt.pop();
                StringBuilder sb = new StringBuilder();

                while (repeat-- > 0)
                    sb.append(curr);

                curr = prev + sb.toString();
            } 
            else {
                curr += c;
            }
        }

        return curr;
    }
}`,

    "c":
`#include <stdlib.h>
#include <string.h>
#include <ctype.h>

char* decodeString(char* s) {
    char* stackStr[1000];
    int stackNum[1000];
    int top = -1;

    char* curr = malloc(10000);
    curr[0] = '\\0';

    int num = 0;

    for (int i = 0; s[i]; i++) {
        if (isdigit(s[i])) {
            num = num * 10 + (s[i] - '0');
        }
        else if (s[i] == '[') {
            top++;
            stackNum[top] = num;
            stackStr[top] = strdup(curr);
            num = 0;
            curr[0] = '\\0';
        }
        else if (s[i] == ']') {
            int repeat = stackNum[top];
            char* prev = stackStr[top];
            top--;

            char* buffer = malloc(10000);
            buffer[0] = '\\0';

            strcat(buffer, prev);
            for (int r = 0; r < repeat; r++)
                strcat(buffer, curr);

            free(curr);
            free(prev);

            curr = buffer;
        }
        else {
            int len = strlen(curr);
            curr[len] = s[i];
            curr[len + 1] = '\\0';
        }
    }

    return curr;
}`
  }
},

    //quetsion 9

    {
  "q": "Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays. The overall run time complexity must be O(log (m+n)).",
  "difficulty": "Hard",
  "tags": ["Binary Search", "Divide and Conquer"],

  "a": "Use binary search on the smaller array. Partition nums1 and nums2 such that left halves contain half of total elements. Ensure left_max ≤ right_min. If partition is valid, compute median. Otherwise move binary search boundaries.",

  "steps": [
    "Ensure nums1 is the smaller array. Let m = len(nums1), n = len(nums2).",
    "Set low = 0, high = m.",
    "Binary search:",
    "   • partition1 = (low+high)//2",
    "   • partition2 = (m+n+1)//2 - partition1",
    "Compute left1/right1 from nums1 and left2/right2 from nums2.",
    "Check if left1 <= right2 AND left2 <= right1:",
    "    • If valid, median is max(left1,left2) if odd length, else average of max(left1,left2) and min(right1,right2).",
    "Else if left1 > right2 → move left: high = partition1 - 1.",
    "Else move right: low = partition1 + 1."
  ],

  "examples": [
    { "input": "nums1=[1,3], nums2=[2]", "output": "2" },
    { "input": "nums1=[1,2], nums2=[3,4]", "output": "2.5" }
  ],

  "complexity": {
    "time": "O(log(min(m,n)))",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    low, high = 0, m

    while low <= high:
        p1 = (low + high) // 2
        p2 = (m + n + 1) // 2 - p1

        left1 = nums1[p1 - 1] if p1 > 0 else float('-inf')
        right1 = nums1[p1] if p1 < m else float('inf')

        left2 = nums2[p2 - 1] if p2 > 0 else float('-inf')
        right2 = nums2[p2] if p2 < n else float('inf')

        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 0:
                return (max(left1, left2) + min(right1, right2)) / 2
            else:
                return max(left1, left2)

        elif left1 > right2:
            high = p1 - 1
        else:
            low = p1 + 1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);

    int m = nums1.size(), n = nums2.size();
    int low = 0, high = m;

    while (low <= high) {
        int p1 = (low + high) / 2;
        int p2 = (m + n + 1) / 2 - p1;

        int left1 = (p1 == 0) ? INT_MIN : nums1[p1 - 1];
        int right1 = (p1 == m) ? INT_MAX : nums1[p1];

        int left2 = (p2 == 0) ? INT_MIN : nums2[p2 - 1];
        int right2 = (p2 == n) ? INT_MAX : nums2[p2];

        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 == 0)
                return (max(left1, left2) + min(right1, right2)) / 2.0;
            else
                return max(left1, left2);
        }
        else if (left1 > right2)
            high = p1 - 1;
        else
            low = p1 + 1;
    }
    return 0.0;
}`,

    "java":
`class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length)
            return findMedianSortedArrays(nums2, nums1);

        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;

        while (low <= high) {
            int p1 = (low + high) / 2;
            int p2 = (m + n + 1) / 2 - p1;

            int left1 = (p1 == 0) ? Integer.MIN_VALUE : nums1[p1 - 1];
            int right1 = (p1 == m) ? Integer.MAX_VALUE : nums1[p1];

            int left2 = (p2 == 0) ? Integer.MIN_VALUE : nums2[p2 - 1];
            int right2 = (p2 == n) ? Integer.MAX_VALUE : nums2[p2];

            if (left1 <= right2 && left2 <= right1) {
                if ((m + n) % 2 == 0)
                    return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
                else
                    return Math.max(left1, left2);
            }
            else if (left1 > right2)
                high = p1 - 1;
            else
                low = p1 + 1;
        }
        return 0.0;
    }
}`,

    "c":
`#include <limits.h>

double findMedianSortedArrays(int* nums1, int m, int* nums2, int n) {
    if (m > n) return findMedianSortedArrays(nums2, n, nums1, m);

    int low = 0, high = m;

    while (low <= high) {
        int p1 = (low + high) / 2;
        int p2 = (m + n + 1) / 2 - p1;

        int left1 = (p1 == 0) ? INT_MIN : nums1[p1 - 1];
        int right1 = (p1 == m) ? INT_MAX : nums1[p1];

        int left2 = (p2 == 0) ? INT_MIN : nums2[p2 - 1];
        int right2 = (p2 == n) ? INT_MAX : nums2[p2];

        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 == 0)
                return ( (left1 > left2 ? left1 : left2) + 
                         (right1 < right2 ? right1 : right2) ) / 2.0;
            else
                return (left1 > left2 ? left1 : left2);
        }
        else if (left1 > right2)
            high = p1 - 1;
        else
            low = p1 + 1;
    }

    return 0.0;
}`
  }
},

    //quetsion 10
    {
  "q": "Implement a Trie (prefix tree) with insert, search, and startsWith methods.",
  "difficulty": "Medium",
  "tags": ["Trie", "Design", "HashMap"],

  "a": "Each Trie node holds 26 children pointers and a boolean marking end-of-word. insert() walks and creates nodes. search() returns true only if end-of-word is true. startsWith() returns true if the prefix path exists.",
  
  "steps": [
    "Define TrieNode with: children[26] and bool end.",
    "insert(word):",
    "    • Traverse each char.",
    "    • Create missing nodes.",
    "    • Mark end=true at last node.",
    "search(word):",
    "    • Traverse path; if missing, return false.",
    "    • Return node.end.",
    "startsWith(prefix):",
    "    • Traverse; if missing return false.",
    "    • Else return true."
  ],

  "examples": [
    { "input": "insert('apple'), search('apple'), search('app')", "output": "true, false" },
    { "input": "insert('app'), search('app')", "output": "true" }
  ],

  "complexity": {
    "time": "O(L) per operation",
    "space": "O(26 * total nodes)"
  },

  "codes": {
    "python":
`class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct TrieNode {
    bool end;
    TrieNode* child[26];
    TrieNode() {
        end = false;
        memset(child, 0, sizeof(child));
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->child[idx])
                curr->child[idx] = new TrieNode();
            curr = curr->child[idx];
        }
        curr->end = true;
    }

    bool search(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->child[idx])
                return false;
            curr = curr->child[idx];
        }
        return curr->end;
    }

    bool startsWith(string prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->child[idx])
                return false;
            curr = curr->child[idx];
        }
        return true;
    }
};`,

    "java":
`class Trie {

    class Node {
        Node[] child = new Node[26];
        boolean end = false;
    }

    Node root;

    public Trie() {
        root = new Node();
    }

    public void insert(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.child[idx] == null)
                curr.child[idx] = new Node();
            curr = curr.child[idx];
        }
        curr.end = true;
    }

    public boolean search(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.child[idx] == null)
                return false;
            curr = curr.child[idx];
        }
        return curr.end;
    }

    public boolean startsWith(String prefix) {
        Node curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.child[idx] == null)
                return false;
            curr = curr.child[idx];
        }
        return true;
    }
}`,

    "c":
`#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

typedef struct TrieNode {
    bool end;
    struct TrieNode* child[26];
} TrieNode;

TrieNode* newNode() {
    TrieNode* n = malloc(sizeof(TrieNode));
    n->end = false;
    for (int i = 0; i < 26; i++)
        n->child[i] = NULL;
    return n;
}

typedef struct {
    TrieNode* root;
} Trie;

Trie* trieCreate() {
    Trie* t = malloc(sizeof(Trie));
    t->root = newNode();
    return t;
}

void trieInsert(Trie* t, char* word) {
    TrieNode* curr = t->root;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!curr->child[idx])
            curr->child[idx] = newNode();
        curr = curr->child[idx];
    }
    curr->end = true;
}

bool trieSearch(Trie* t, char* word) {
    TrieNode* curr = t->root;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!curr->child[idx])
            return false;
        curr = curr->child[idx];
    }
    return curr->end;
}

bool trieStartsWith(Trie* t, char* prefix) {
    TrieNode* curr = t->root;
    for (int i = 0; prefix[i]; i++) {
        int idx = prefix[i] - 'a';
        if (!curr->child[idx])
            return false;
        curr = curr->child[idx];
    }
    return true;
}`
  }
}

];
