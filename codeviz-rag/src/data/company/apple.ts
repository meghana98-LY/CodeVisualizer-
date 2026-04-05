import { QAItem } from "./types";
export const Apple_QA: QAItem[] = [
     //quetsion 1
     {
  "q": "Convert an integer to a Roman numeral. Given an integer between 1 and 3999, return its Roman numeral representation.",
  "difficulty": "Medium",
  "tags": ["Math", "String", "Greedy"],

  "a": "Use greedy mapping of integer values to Roman symbols. Keep subtracting the largest possible Roman value and append its symbol to the result.",

  "steps": [
    "Create a list of Roman numeral pairs: (value, symbol).",
    "Loop through each pair:",
    "  • While num >= value, append symbol to result and subtract value.",
    "Continue until num is 0.",
    "Return the result string."
  ],

  "examples": [
    { "input": "58", "output": "LVIII" },
    { "input": "1994", "output": "MCMXCIV" }
  ],

  "complexity": {
    "time": "O(1)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def intToRoman(num):
    vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
    res = []

    for v, s in zip(vals, syms):
        while num >= v:
            res.append(s)
            num -= v

    return "".join(res)`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string intToRoman(int num) {
    vector<int> vals = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
    vector<string> syms = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
    string res = "";

    for (int i = 0; i < vals.size(); i++) {
        while (num >= vals[i]) {
            res += syms[i];
            num -= vals[i];
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
                sb.append(syms[i]);
                num -= vals[i];
            }
        }
        return sb.toString();
    }
}`,

    "c":
`#include <stdlib.h>
#include <string.h>

char* intToRoman(int num) {
    int vals[] = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
    char* syms[] = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};

    char* res = malloc(32); 
    res[0] = '\\0';

    for (int i = 0; i < 13; i++) {
        while (num >= vals[i]) {
            strcat(res, syms[i]);
            num -= vals[i];
        }
    }

    return res;
}`
  }
},

    //quetsion 2

    {
  "q": "Given a string s, return true if the string can be made into a palindrome by deleting at most one character.",
  "difficulty": "Easy",
  "tags": ["Two Pointers", "String"],

  "a": "Use two pointers from both ends. When characters mismatch, try skipping either the left or the right character. If either resulting substring is a palindrome, return true.",

  "steps": [
    "Set left = 0, right = len(s)-1.",
    "While left < right:",
    "  • If s[left] == s[right], move pointers inward.",
    "  • If mismatch occurs, check:",
    "       - whether s[left+1:right+1] is palindrome",
    "       - OR s[left:right] is palindrome",
    "  • If either is true, return true.",
    "If no mismatches or valid deletions found, return true."
  ],

  "examples": [
    { "input": "aba", "output": "true" },
    { "input": "abca", "output": "true" },
    { "input": "abc", "output": "false" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def validPalindrome(s):
    def isPal(l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]:
            return isPal(l+1, r) or isPal(l, r-1)
        l += 1
        r -= 1

    return True`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool isPal(const string &s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

bool validPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l] != s[r])
            return isPal(s, l+1, r) || isPal(s, l, r-1);
        l++; r--;
    }
    return true;
}`,

    "java":
`class Solution {
    private boolean isPal(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++; r--;
        }
        return true;
    }

    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;

        while (l < r) {
            if (s.charAt(l) != s.charAt(r))
                return isPal(s, l+1, r) || isPal(s, l, r-1);
            l++; r--;
        }
        return true;
    }
}`,

    "c":
`#include <stdbool.h>
#include <string.h>

bool isPal(const char* s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

bool validPalindrome(char* s) {
    int l = 0, r = strlen(s) - 1;

    while (l < r) {
        if (s[l] != s[r])
            return isPal(s, l+1, r) || isPal(s, l, r-1);
        l++; r--;
    }
    return true;
}`
  }
},

    //quetsion 3
    
    {
  "q": "Given an array of intervals where each interval is [start, end], merge all overlapping intervals and return the non-overlapping intervals sorted by start time.",
  "difficulty": "Medium",
  "tags": ["Intervals", "Sorting"],

  "a": "Sort intervals by start time. Iterate through them and merge if the current interval overlaps with the previous one; otherwise push it to the result.",

  "steps": [
    "Sort intervals by start time.",
    "Initialize an empty result list.",
    "Loop through intervals:",
    "   • If result is empty OR current.start > last.end → append interval.",
    "   • Else update last.end = max(last.end, current.end).",
    "Return the merged result."
  ],

  "examples": [
    { "input": "[[1,3],[2,6],[8,10],[15,18]]", "output": "[[1,6],[8,10],[15,18]]" },
    { "input": "[[1,4],[4,5]]", "output": "[[1,5]]" }
  ],

  "complexity": {
    "time": "O(n log n) due to sorting",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def merge(intervals):
    intervals.sort()
    res = []

    for start, end in intervals:
        if not res or start > res[-1][1]:
            res.append([start, end])
        else:
            res[-1][1] = max(res[-1][1], end)

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;

    for (auto &iv : intervals) {
        if (res.empty() || iv[0] > res.back()[1]) {
            res.push_back(iv);
        } else {
            res.back()[1] = max(res.back()[1], iv[1]);
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

        for (int[] iv : intervals) {
            if (res.isEmpty() || iv[0] > res.get(res.size()-1)[1]) {
                res.add(iv);
            } else {
                res.get(res.size()-1)[1] = Math.max(res.get(res.size()-1)[1], iv[1]);
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

    qsort(intervals, intervalsSize, sizeof(int*), cmp);

    int** res = malloc(intervalsSize * sizeof(int*));
    *returnColumnSizes = malloc(intervalsSize * sizeof(int));
    int idx = 0;

    for (int i = 0; i < intervalsSize; i++) {
        int start = intervals[i][0];
        int end = intervals[i][1];

        if (idx == 0 || start > res[idx-1][1]) {
            res[idx] = malloc(2 * sizeof(int));
            res[idx][0] = start;
            res[idx][1] = end;
            (*returnColumnSizes)[idx] = 2;
            idx++;
        } else {
            if (end > res[idx-1][1])
                res[idx-1][1] = end;
        }
    }

    *returnSize = idx;
    return res;
}`
  }
},

    //quetsion 4

    {
  "q": "Design a data structure that follows the Least Recently Used (LRU) cache policy. Implement get(key) and put(key, value) both in O(1) time.",
  "difficulty": "Medium",
  "tags": ["Design", "HashMap", "Doubly Linked List"],

  "a": "Use a combination of a HashMap (key → node) and a doubly linked list that stores nodes in order of recent usage. Most recently used at head, least at tail. On get/put, move accessed/updated node to head.",

  "steps": [
    "Create a doubly linked list with dummy head and dummy tail.",
    "Use a HashMap to store key → node mappings.",
    "get(key):",
    "   • If key not found, return -1.",
    "   • Move the accessed node to head.",
    "put(key,value):",
    "   • If key exists, update value and move node to head.",
    "   • Else create a new node, add it to head, and add to hash map.",
    "   • If size exceeds capacity, remove the tail node and delete from map."
  ],

  "examples": [
    { "input": "LRUCache(2), put(1,1), put(2,2), get(1)", "output": "1" },
    { "input": "put(3,3) → evicts 2, get(2)", "output": "-1" }
  ],

  "complexity": {
    "time": "O(1) for get and put",
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
        self.head = self.Node(0,0)
        self.tail = self.Node(0,0)
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
        Node(int k, int v): key(k), val(v), prev(NULL), next(NULL) {}
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
        node->prev->next = node->next;
        node->next->prev = node->prev;
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
    Map<Integer, Node> map;
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

    if (node) removeNode(node);

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
},

    //quetsion 5

    {
  "q": "Given two binary strings a and b, return their sum as a binary string.",
  "difficulty": "Easy",
  "tags": ["String", "Binary", "Two Pointers"],

  "a": "Start from the end of both strings, add digits with carry, append result, and reverse at the end.",

  "steps": [
    "Set i to end of a, j to end of b, carry = 0.",
    "Loop while i >= 0 or j >= 0 or carry > 0:",
    "   • Extract digit from a and b if in bounds.",
    "   • Compute sum = d1 + d2 + carry.",
    "   • Append sum % 2 to result.",
    "   • Update carry = sum // 2.",
    "Reverse and return the final binary string."
  ],

  "examples": [
    { "input": "a = '11', b = '1'", "output": "100" },
    { "input": "a = '1010', b = '1011'", "output": "10101" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def addBinary(a, b):
    i, j = len(a)-1, len(b)-1
    carry = 0
    res = []

    while i >= 0 or j >= 0 or carry:
        d1 = int(a[i]) if i >= 0 else 0
        d2 = int(b[j]) if j >= 0 else 0
        s = d1 + d2 + carry
        res.append(str(s % 2))
        carry = s // 2
        i -= 1
        j -= 1

    return "".join(res[::-1])`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string addBinary(string a, string b) {
    int i = a.size() - 1, j = b.size() - 1;
    int carry = 0;
    string res = "";

    while (i >= 0 || j >= 0 || carry) {
        int d1 = (i >= 0 ? a[i] - '0' : 0);
        int d2 = (j >= 0 ? b[j] - '0' : 0);
        int s = d1 + d2 + carry;

        res.push_back((s % 2) + '0');
        carry = s / 2;
        i--; j--;
    }

    reverse(res.begin(), res.end());
    return res;
}`,

    "java":
`class Solution {
    public String addBinary(String a, String b) {
        int i = a.length() - 1, j = b.length() - 1;
        int carry = 0;
        StringBuilder sb = new StringBuilder();

        while (i >= 0 || j >= 0 || carry != 0) {
            int d1 = (i >= 0 ? a.charAt(i) - '0' : 0);
            int d2 = (j >= 0 ? b.charAt(j) - '0' : 0);

            int s = d1 + d2 + carry;
            sb.append(s % 2);
            carry = s / 2;

            i--; j--;
        }

        return sb.reverse().toString();
    }
}`,

    "c":
`#include <stdlib.h>
#include <string.h>

char* addBinary(char* a, char* b) {
    int i = strlen(a) - 1;
    int j = strlen(b) - 1;

    char* res = malloc(10005);
    int k = 0;
    int carry = 0;

    while (i >= 0 || j >= 0 || carry) {
        int d1 = (i >= 0 ? a[i] - '0' : 0);
        int d2 = (j >= 0 ? b[j] - '0' : 0);
        int s = d1 + d2 + carry;

        res[k++] = (s % 2) + '0';
        carry = s / 2;
        i--; j--;
    }

    res[k] = '\\0';

    for (int l = 0, r = k - 1; l < r; l++, r--) {
        char temp = res[l];
        res[l] = res[r];
        res[r] = temp;
    }

    return res;
}`
  }
},

    //quetsion 6

    {
  "q": "Given the head of a singly linked list, reverse the list and return the reversed list.",
  "difficulty": "Easy",
  "tags": ["Linked List", "Iteration", "Recursion"],

  "a": "Use iterative pointer reversal: maintain prev, curr, next. Update pointers step by step until the list is reversed.",

  "steps": [
    "Initialize prev = null, curr = head.",
    "While curr is not null:",
    "   • Save next = curr.next.",
    "   • Set curr.next = prev.",
    "   • Move prev = curr.",
    "   • Move curr = next.",
    "Return prev as the new head."
  ],

  "examples": [
    { "input": "[1,2,3,4,5]", "output": "[5,4,3,2,1]" },
    { "input": "[1,2]", "output": "[2,1]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverseList(head):
    prev = None
    curr = head

    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    return prev`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct ListNode {
//     int val;
//     ListNode* next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    ListNode* curr = head;

    while (curr) {
        ListNode* nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}`,

    "java":
`// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;

        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        return prev;
    }
}`,

    "c":
`#include <stdlib.h>

// struct ListNode {
//     int val;
//     struct ListNode* next;
// };

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;

    while (curr) {
        struct ListNode* nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }

    return prev;
}`
  }
},

    //quetsion 7

    {
  "q": "A peak element is an element that is strictly greater than its neighbors. Given an array nums, return the index of any peak element in O(log n) time.",
  "difficulty": "Medium",
  "tags": ["Binary Search", "Array"],

  "a": "Use binary search. If mid element is less than its right neighbor, the peak lies on the right side; otherwise, it lies on the left side.",

  "steps": [
    "Set left = 0, right = n-1.",
    "While left < right:",
    "   • mid = (left + right) // 2.",
    "   • If nums[mid] < nums[mid + 1], move left = mid + 1.",
    "   • Else move right = mid.",
    "Return left (or right) — the index of a peak."
  ],

  "examples": [
    { "input": "[1,2,3,1]", "output": "2" },
    { "input": "[1,2,1,3,5,6,4]", "output": "5" }
  ],

  "complexity": {
    "time": "O(log n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def findPeakElement(nums):
    l, r = 0, len(nums) - 1

    while l < r:
        mid = (l + r) // 2
        if nums[mid] < nums[mid + 1]:
            l = mid + 1
        else:
            r = mid
    return l`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int findPeakElement(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;

    while (l < r) {
        int mid = (l + r) / 2;
        if (nums[mid] < nums[mid + 1])
            l = mid + 1;
        else
            r = mid;
    }

    return l;
}`,

    "java":
`class Solution {
    public int findPeakElement(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int mid = (l + r) / 2;

            if (nums[mid] < nums[mid + 1])
                l = mid + 1;
            else
                r = mid;
        }
        return l;
    }
}`,

    "c":
`int findPeakElement(int* nums, int numsSize) {
    int l = 0, r = numsSize - 1;

    while (l < r) {
        int mid = (l + r) / 2;

        if (nums[mid] < nums[mid + 1])
            l = mid + 1;
        else
            r = mid;
    }
    return l;
}`
  }
},

    //quetsion 8

    {
  "q": "Given an n x n 2D matrix, rotate it by 90 degrees clockwise in-place.",
  "difficulty": "Medium",
  "tags": ["Matrix", "Two Pointers", "In-Place"],

  "a": "First transpose the matrix (swap rows with columns). Then reverse each row to complete the 90-degree clockwise rotation.",

  "steps": [
    "For each i < j, swap matrix[i][j] with matrix[j][i] to transpose.",
    "For each row, reverse the entire row.",
    "This produces a 90-degree clockwise rotated matrix in-place."
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
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    for i in range(n):
        matrix[i].reverse()`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();

    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(matrix[i][j], matrix[j][i]);

    for (int i = 0; i < n; i++)
        reverse(matrix[i].begin(), matrix[i].end());
}`,

    "java":
`class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        for (int i = 0; i < n; i++) {
            int l = 0, r = n - 1;
            while (l < r) {
                int tmp = matrix[i][l];
                matrix[i][l] = matrix[i][r];
                matrix[i][r] = tmp;
                l++; r--;
            }
        }
    }
}`,

    "c":
`#include <stdlib.h>

void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    int n = matrixSize;

    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }

    for (int i = 0; i < n; i++) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = matrix[i][l];
            matrix[i][l] = matrix[i][r];
            matrix[i][r] = temp;
            l++; r--;
        }
    }
}`
  }
},

    //quetsion 9

    {
  "q": "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i < j < k and nums[i] + nums[j] + nums[k] = 0.",
  "difficulty": "Medium",
  "tags": ["Two Pointers", "Sorting", "Array"],

  "a": "Sort the array and use a loop fixing one number. Then apply two pointers on the remaining subarray to find pairs that sum to -nums[i], while skipping duplicates.",

  "steps": [
    "Sort the array.",
    "Loop i from 0 to n-3:",
    "   • Skip duplicates for i.",
    "   • Use two pointers l = i+1, r = n-1.",
    "   • If sum < 0 → move l++.",
    "   • If sum > 0 → move r--.",
    "   • If sum == 0 → record triplet and skip duplicates.",
    "Return all unique triplets."
  ],

  "examples": [
    { "input": "[-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]" },
    { "input": "[0,1,1]", "output": "[]" }
  ],

  "complexity": {
    "time": "O(n^2)",
    "space": "O(1) excluding output"
  },

  "codes": {
    "python":
`def threeSum(nums):
    nums.sort()
    res = []
    n = len(nums)

    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        l, r = i + 1, n - 1

        while l < r:
            s = nums[i] + nums[l] + nums[r]

            if s < 0:
                l += 1
            elif s > 0:
                r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1
                while l < r and nums[l] == nums[l - 1]:
                    l += 1
                while l < r and nums[r] == nums[r + 1]:
                    r -= 1

    return res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;

    int n = nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int l = i + 1, r = n - 1;

        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];

            if (s < 0) l++;
            else if (s > 0) r--;
            else {
                res.push_back({nums[i], nums[l], nums[r]});
                l++; r--;
                while (l < r && nums[l] == nums[l - 1]) l++;
                while (l < r && nums[r] == nums[r + 1]) r--;
            }
        }
    }

    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();

        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int l = i + 1, r = n - 1;

            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];

                if (s < 0) l++;
                else if (s > 0) r--;
                else {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
        }

        return res;
    }
}`,

    "c":
`#include <stdlib.h>

int cmp(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    qsort(nums, numsSize, sizeof(int), cmp);

    int cap = numsSize * numsSize;
    int** res = malloc(cap * sizeof(int*));
    *returnColumnSizes = malloc(cap * sizeof(int));
    *returnSize = 0;

    for (int i = 0; i < numsSize - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int l = i + 1, r = numsSize - 1;

        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];

            if (s < 0) l++;
            else if (s > 0) r--;
            else {
                res[*returnSize] = malloc(3 * sizeof(int));
                res[*returnSize][0] = nums[i];
                res[*returnSize][1] = nums[l];
                res[*returnSize][2] = nums[r];
                (*returnColumnSizes)[*returnSize] = 3;
                (*returnSize)++;

                l++; r--;
                while (l < r && nums[l] == nums[l - 1]) l++;
                while (l < r && nums[r] == nums[r + 1]) r--;
            }
        }
    }

    return res;
}`
  }
},

    //quetsion 10

    {
  "q": "Given the root of a binary tree, return the level order traversal of its nodes' values, from left to right, level by level.",
  "difficulty": "Medium",
  "tags": ["Tree", "BFS", "Queue"],

  "a": "Use BFS with a queue. For each level, process all nodes currently in the queue, add their children to the queue, and collect values level by level.",

  "steps": [
    "If root is null, return empty list.",
    "Initialize a queue with root.",
    "While queue not empty:",
    "   • Determine queue size (number of nodes at current level).",
    "   • Pop each node, record its value, and push its children.",
    "Append each level's values to the result.",
    "Return the final list of levels."
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
`# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import deque

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
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
// };

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;

        while (sz--) {
            TreeNode* node = q.front();
            q.pop();
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
//     TreeNode left;
//     TreeNode right;
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

            for (int i = 0; i < size; i++) {
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
//     struct TreeNode *left;
//     struct TreeNode *right;
// };

typedef struct TreeNode TreeNode;

int** levelOrder(TreeNode* root, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    if (!root) return NULL;

    int cap = 1000;
    int** res = malloc(cap * sizeof(int*));
    *returnColumnSizes = malloc(cap * sizeof(int));

    TreeNode** q = malloc(cap * sizeof(TreeNode*));
    int front = 0, rear = 0;

    q[rear++] = root;

    while (front < rear) {
        int sz = rear - front;
        int* level = malloc(sz * sizeof(int));

        for (int i = 0; i < sz; i++) {
            TreeNode* node = q[front++];
            level[i] = node->val;

            if (node->left) q[rear++] = node->left;
            if (node->right) q[rear++] = node->right;
        }

        res[*returnSize] = level;
        (*returnColumnSizes)[*returnSize] = sz;
        (*returnSize)++;
    }

    return res;
}`
  }
}

];
