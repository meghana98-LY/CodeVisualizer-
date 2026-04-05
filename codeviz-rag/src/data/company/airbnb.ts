import { QAItem } from "./types";
export const airbnb_QA: QAItem[] = [
     //quetsion 1

     {
  "q": "Given a string s, return true if it can become a palindrome after deleting at most one character.",
  "difficulty": "Medium",
  "tags": ["Two Pointers", "String"],

  "a": "Use two pointers from both ends. If characters mismatch, try skipping either the left or the right character and check if the remaining substring is a palindrome.",

  "steps": [
    "Initialize left = 0, right = n - 1.",
    "While left < right:",
    "  • If s[left] == s[right]: move left++, right--.",
    "  • If mismatch:",
    "      - Check if substring left+1..right is palindrome OR",
    "      - Check if substring left..right-1 is palindrome.",
    "      - If either true → return true.",
    "Return true if entire string matched."
  ],

  "examples": [
    { "input": "\"aba\"", "output": "true" },
    { "input": "\"abca\"", "output": "true (delete 'c')" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def validPalindrome(s):
    def isPal(i, j):
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return isPal(left + 1, right) or isPal(left, right - 1)
        left += 1
        right -= 1

    return True`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool isPal(const string &s, int l, int r) {
    while (l < r) {
        if (s[l++] != s[r--])
            return false;
    }
    return true;
}

bool validPalindrome(string s) {
    int l = 0, r = s.size() - 1;

    while (l < r) {
        if (s[l] != s[r]) {
            return isPal(s, l+1, r) || isPal(s, l, r-1);
        }
        l++; r--;
    }
    return true;
}`,

    "java":
`class Solution {
    private boolean isPal(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--))
                return false;
        }
        return true;
    }

    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;

        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPal(s, l+1, r) || isPal(s, l, r-1);
            }
            l++; r--;
        }
        return true;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool isPal(char* s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r])
            return false;
        l++; r--;
    }
    return true;
}

bool validPalindrome(char* s) {
    int l = 0, r = strlen(s) - 1;

    while (l < r) {
        if (s[l] != s[r]) {
            return isPal(s, l+1, r) || isPal(s, l, r-1);
        }
        l++; r--;
    }
    return true;
}

int main() {
    char s[] = "abca";
    printf(validPalindrome(s) ? "true\\n" : "false\\n");
    return 0;
}`
  }
},

    //quetsion 2

    {
  "q": "Given an array of meeting time intervals where intervals[i] = [start, end], return the minimum number of conference rooms required.",
  "difficulty": "Medium",
  "tags": ["Heap", "Intervals", "Sorting"],

  "a": "Sort intervals by start time. Use a min-heap to track the earliest finishing meeting. If the current meeting starts after the earliest ending one, reuse the room; otherwise allocate a new one.",

  "steps": [
    "If intervals empty, return 0.",
    "Sort intervals by start time.",
    "Create a min-heap storing end times.",
    "Push first meeting's end time.",
    "For each remaining meeting:",
    "   • If current start >= minHeap.top(), pop and reuse room.",
    "   • Push current end time into heap.",
    "Heap size is number of rooms required."
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
    if not intervals:
        return 0

    intervals.sort(key=lambda x: x[0])
    heap = []

    heapq.heappush(heap, intervals[0][1])

    for s, e in intervals[1:]:
        if s >= heap[0]:
            heapq.heappop(heap)
        heapq.heappush(heap, e)

    return len(heap)`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int minMeetingRooms(vector<vector<int>>& intervals) {
    if (intervals.empty()) return 0;

    sort(intervals.begin(), intervals.end());

    priority_queue<int, vector<int>, greater<int>> pq;
    pq.push(intervals[0][1]);

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] >= pq.top()) {
            pq.pop();
        }
        pq.push(intervals[i][1]);
    }

    return pq.size();
}`,

    "java":
`import java.util.*;

class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;

        Arrays.sort(intervals, (a,b) -> a[0] - b[0]);

        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(intervals[0][1]);

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= pq.peek()) {
                pq.poll();
            }
            pq.offer(intervals[i][1]);
        }

        return pq.size();
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

int compare(const void* a, const void* b) {
    int* x = *(int**)a;
    int* y = *(int**)b;
    return x[0] - y[0];
}

// Simple min-heap implementation
void push(int* heap, int* size, int val) {
    int i = (*size)++;
    heap[i] = val;
    while (i > 0) {
        int p = (i - 1) / 2;
        if (heap[p] <= heap[i]) break;
        int temp = heap[p]; heap[p] = heap[i]; heap[i] = temp;
        i = p;
    }
}

int top(int* heap) { return heap[0]; }

int pop(int* heap, int* size) {
    int ret = heap[0];
    heap[0] = heap[--(*size)];
    int i = 0;
    while (1) {
        int l = 2*i + 1, r = 2*i + 2, smallest = i;
        if (l < *size && heap[l] < heap[smallest]) smallest = l;
        if (r < *size && heap[r] < heap[smallest]) smallest = r;
        if (smallest == i) break;
        int temp = heap[i]; heap[i] = heap[smallest]; heap[smallest] = temp;
        i = smallest;
    }
    return ret;
}

int minMeetingRooms(int** intervals, int intervalsSize, int* intervalsColSize) {
    if (intervalsSize == 0) return 0;

    qsort(intervals, intervalsSize, sizeof(int*), compare);

    int* heap = malloc(sizeof(int) * intervalsSize);
    int heapSize = 0;

    push(heap, &heapSize, intervals[0][1]);

    for (int i = 1; i < intervalsSize; i++) {
        int start = intervals[i][0];
        int end = intervals[i][1];

        if (start >= top(heap)) {
            pop(heap, &heapSize);
        }
        push(heap, &heapSize, end);
    }

    int rooms = heapSize;
    free(heap);
    return rooms;
}

int main() {
    int a[2] = {0,30};
    int b[2] = {5,10};
    int c[2] = {15,20};

    int* arr[3] = {a,b,c};
    int colSize[3] = {2,2,2};

    printf("Rooms needed: %d\\n", minMeetingRooms(arr, 3, colSize));
    return 0;
}`
  }
},

    //quetsion 3
    

    {
  "q": "Given two words beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord. Each transformation changes exactly one letter and must be in the word list.",
  "difficulty": "Hard",
  "tags": ["BFS", "Graph", "Hashing"],

  "a": "Use BFS. Preprocess wordList into adjacency patterns (like h*t → {hot, hit}). BFS from beginWord until reaching endWord.",

  "steps": [
    "Put all words into a set for O(1) lookup.",
    "Build adjacency patterns: For each word, replace each letter with '*'.",
    "Use BFS queue starting from beginWord.",
    "For each pop, generate neighbors from pattern map.",
    "If endWord reached, return current distance.",
    "Mark words visited to avoid repetition.",
    "If no path found, return 0."
  ],

  "examples": [
    { "input": "begin=\"hit\", end=\"cog\", list=[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", "output": "5" },
    { "input": "begin=\"hit\", end=\"cog\", list=[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]", "output": "0" }
  ],

  "complexity": {
    "time": "O(n * m * 26)",
    "space": "O(n * m)"
  },

  "codes": {
    "python":
`from collections import defaultdict, deque

def ladderLength(beginWord, endWord, wordList):
    if endWord not in wordList:
        return 0

    L = len(beginWord)
    adj = defaultdict(list)

    for word in wordList:
        for i in range(L):
            pattern = word[:i] + '*' + word[i+1:]
            adj[pattern].append(word)

    q = deque([(beginWord, 1)])
    visited = set([beginWord])

    while q:
        word, dist = q.popleft()

        if word == endWord:
            return dist

        for i in range(L):
            pattern = word[:i] + '*' + word[i+1:]
            for nei in adj[pattern]:
                if nei not in visited:
                    visited.add(nei)
                    q.append((nei, dist + 1))
    return 0`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;

    int L = beginWord.size();
    unordered_map<string, vector<string>> adj;

    for (string w : wordList) {
        for (int i = 0; i < L; i++) {
            string pattern = w.substr(0, i) + "*" + w.substr(i+1);
            adj[pattern].push_back(w);
        }
    }

    queue<pair<string,int>> q;
    q.push({beginWord, 1});
    unordered_set<string> visited;
    visited.insert(beginWord);

    while (!q.empty()) {
        auto [word, dist] = q.front(); q.pop();

        if (word == endWord) return dist;

        for (int i = 0; i < L; i++) {
            string pattern = word.substr(0, i) + "*" + word.substr(i+1);
            for (string nei : adj[pattern]) {
                if (!visited.count(nei)) {
                    visited.insert(nei);
                    q.push({nei, dist + 1});
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

        int L = beginWord.length();
        Map<String, List<String>> adj = new HashMap<>();

        for (String w : wordList) {
            for (int i = 0; i < L; i++) {
                String pattern = w.substring(0, i) + "*" + w.substring(i+1);
                adj.computeIfAbsent(pattern, k -> new ArrayList<>()).add(w);
            }
        }

        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);

        Map<String, Integer> dist = new HashMap<>();
        dist.put(beginWord, 1);

        while (!q.isEmpty()) {
            String w = q.poll();
            int steps = dist.get(w);

            if (w.equals(endWord)) return steps;

            for (int i = 0; i < L; i++) {
                String pattern = w.substring(0, i) + "*" + w.substring(i+1);
                if (adj.containsKey(pattern)) {
                    for (String nei : adj.get(pattern)) {
                        if (!dist.containsKey(nei)) {
                            dist.put(nei, steps + 1);
                            q.offer(nei);
                        }
                    }
                }
            }
        }
        return 0;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// Helper: compare two words differing by exactly 1 letter
bool diffOne(char* a, char* b) {
    int cnt = 0;
    for (int i = 0; a[i]; i++) {
        if (a[i] != b[i]) cnt++;
        if (cnt > 1) return false;
    }
    return cnt == 1;
}

int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {
    int* visited = calloc(wordListSize, sizeof(int));
    char** queue = malloc(sizeof(char*) * (wordListSize + 5));
    int* dist = malloc(sizeof(int) * (wordListSize + 5));

    int front = 0, rear = 0;

    queue[rear] = beginWord;
    dist[rear++] = 1;

    while (front < rear) {
        char* word = queue[front];
        int d = dist[front];
        front++;

        if (strcmp(word, endWord) == 0) {
            free(visited); free(queue); free(dist);
            return d;
        }

        for (int i = 0; i < wordListSize; i++) {
            if (!visited[i] && diffOne(word, wordList[i])) {
                visited[i] = 1;
                queue[rear] = wordList[i];
                dist[rear++] = d + 1;
            }
        }
    }

    free(visited); free(queue); free(dist);
    return 0;
}

int main() {
    char* words[] = {"hot","dot","dog","lot","log","cog"};
    printf("Length: %d\\n", ladderLength("hit", "cog", words, 6)); // Expected: 5
    return 0;
}`
  }
},

    //quetsion 4


    {
  "q": "Given an m x n matrix, return all elements of the matrix in spiral order.",
  "difficulty": "Medium",
  "tags": ["Matrix", "Simulation"],

  "a": "Use four boundary pointers: top, bottom, left, right. Traverse in 4 directions while shrinking boundaries until all elements are visited.",

  "steps": [
    "Initialize top=0, bottom=m-1, left=0, right=n-1.",
    "While top <= bottom AND left <= right:",
    "  • Traverse left → right across top row, top++.",
    "  • Traverse top → bottom along right column, right--.",
    "  • Traverse right → left across bottom row (if top <= bottom), bottom--.",
    "  • Traverse bottom → top along left column (if left <= right), left++.",
    "Store visited elements in result list."
  ],

  "examples": [
    { "input": "[[1,2,3],[4,5,6],[7,8,9]]", "output": "[1,2,3,6,9,8,7,4,5]" },
    { "input": "[[1,2],[3,4]]", "output": "[1,2,4,3]" }
  ],

  "complexity": {
    "time": "O(m * n)",
    "space": "O(1) excluding output"
  },

  "codes": {
    "python":
`def spiralOrder(matrix):
    res = []
    if not matrix:
        return res

    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        for j in range(left, right + 1):
            res.append(matrix[top][j])
        top += 1

        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1

        if top <= bottom:
            for j in range(right, left - 1, -1):
                res.append(matrix[bottom][j])
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
    if (matrix.empty()) return res;

    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++)
            res.push_back(matrix[top][j]);
        top++;

        for (int i = top; i <= bottom; i++)
            res.push_back(matrix[i][right]);
        right--;

        if (top <= bottom) {
            for (int j = right; j >= left; j--)
                res.push_back(matrix[bottom][j]);
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

        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++)
                res.add(matrix[top][j]);
            top++;

            for (int i = top; i <= bottom; i++)
                res.add(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int j = right; j >= left; j--)
                    res.add(matrix[bottom][j]);
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
`#include <stdio.h>
#include <stdlib.h>

int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    int m = matrixSize;
    int n = matrixColSize[0];

    int* res = malloc(sizeof(int) * m * n);
    int idx = 0;

    int top = 0, bottom = m - 1;
    int left = 0, right = n - 1;

    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++)
            res[idx++] = matrix[top][j];
        top++;

        for (int i = top; i <= bottom; i++)
            res[idx++] = matrix[i][right];
        right--;

        if (top <= bottom) {
            for (int j = right; j >= left; j--)
                res[idx++] = matrix[bottom][j];
            bottom--;
        }

        if (left <= right) {
            for (int i = bottom; i >= top; i--)
                res[idx++] = matrix[i][left];
            left++;
        }
    }

    *returnSize = idx;
    return res;
}

int main() {
    int r1[] = {1,2,3};
    int r2[] = {4,5,6};
    int r3[] = {7,8,9};

    int* mat[] = {r1, r2, r3};
    int colSize[] = {3,3,3};

    int returnSize;
    int* res = spiralOrder(mat, 3, colSize, &returnSize);

    for (int i = 0; i < returnSize; i++)
        printf("%d ", res[i]);
    printf("\\n");

    free(res);
    return 0;
}`
  }
},

    //quetsion 5

   {
  "q": "Given a list of airline tickets represented as [from, to], reconstruct the itinerary in lexical order. Always start at 'JFK'. Use all tickets exactly once.",
  "difficulty": "Hard",
  "tags": ["Graph", "DFS", "Backtracking", "Eulerian Path"],

  "a": "Treat tickets as a graph. Always choose the lexicographically smallest destination first. Use Hierholzer’s algorithm for Eulerian path (postorder DFS).",

  "steps": [
    "Build adjacency list: map[from] -> min-heap of destinations.",
    "Start DFS from 'JFK'.",
    "While a node has outgoing edges, recursively visit smallest destination.",
    "Append airport to result after exploring all outgoing edges (postorder).",
    "Reverse result at the end to get itinerary."
  ],

  "examples": [
    { "input": "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]", "output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]" },
    { "input": "[[\"JFK\",\"KUL\"],[\"JFK\",\"NRT\"],[\"NRT\",\"JFK\"]]", "output": "[\"JFK\",\"NRT\",\"JFK\",\"KUL\"]" }
  ],

  "complexity": {
    "time": "O(E log E)",
    "space": "O(E)"
  },

  "codes": {
    "python":
`from collections import defaultdict
import heapq

def findItinerary(tickets):
    graph = defaultdict(list)
    for a, b in tickets:
        heapq.heappush(graph[a], b)

    res = []

    def dfs(airport):
        while graph[airport]:
            nxt = heapq.heappop(graph[airport])
            dfs(nxt)
        res.append(airport)

    dfs("JFK")
    return res[::-1]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<string> findItinerary(vector<vector<string>>& tickets) {
    unordered_map<string, priority_queue<string, vector<string>, greater<string>>> graph;

    for (auto &t : tickets)
        graph[t[0]].push(t[1]);

    vector<string> res;

    function<void(string)> dfs = [&](string u) {
        auto &pq = graph[u];
        while (!pq.empty()) {
            string v = pq.top(); pq.pop();
            dfs(v);
        }
        res.push_back(u);
    };

    dfs("JFK");
    reverse(res.begin(), res.end());
    return res;
}`,

    "java":
`import java.util.*;

class Solution {
    Map<String, PriorityQueue<String>> graph = new HashMap<>();
    List<String> res = new LinkedList<>();

    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> t : tickets) {
            graph.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).offer(t.get(1));
        }

        dfs("JFK");
        return res;
    }

    private void dfs(String u) {
        PriorityQueue<String> pq = graph.get(u);
        while (pq != null && !pq.isEmpty()) {
            dfs(pq.poll());
        }
        res.add(0, u);
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// ----------- Simple adjacency list with lexical sorting -----------

int cmpTickets(const void* a, const void* b) {
    char** t1 = *(char***)a;
    char** t2 = *(char***)b;
    return strcmp(t1[0], t2[0]) == 0 ? strcmp(t1[1], t2[1]) : strcmp(t1[0], t2[0]);
}

void dfs(char*** tickets, int ticketsSize, int* used, char* cur, char** result, int* idx) {
    for (int i = 0; i < ticketsSize; i++) {
        if (!used[i] && strcmp(tickets[i][0], cur) == 0) {
            used[i] = 1;
            dfs(tickets, ticketsSize, used, tickets[i][1], result, idx);
        }
    }
    result[(*idx)++] = cur;
}

char** findItinerary(char*** tickets, int ticketsSize, int* ticketsColSize, int* returnSize) {
    qsort(tickets, ticketsSize, sizeof(char**), cmpTickets);

    int* used = calloc(ticketsSize, sizeof(int));
    char** result = malloc(sizeof(char*) * (ticketsSize + 1));
    int idx = 0;

    dfs(tickets, ticketsSize, used, "JFK", result, &idx);

    // Reverse output
    char** final = malloc(sizeof(char*) * idx);
    for (int i = 0; i < idx; i++)
        final[i] = result[idx - 1 - i];

    *returnSize = idx;
    free(used);
    free(result);
    return final;
}

int main() {
    char* t1[] = {"JFK","MUC"};
    char* t2[] = {"MUC","LHR"};
    char* t3[] = {"LHR","SFO"};
    char* t4[] = {"SFO","SJC"};

    char** arr[] = {t1, t2, t3, t4};
    int col[] = {2,2,2,2};

    int returnSize;
    char** res = findItinerary(arr, 4, col, &returnSize);

    for (int i = 0; i < returnSize; i++)
        printf("%s ", res[i]);
    printf("\\n");

    free(res);
    return 0;
}`
  }
}
,

    //quetsion 6

    {
  "q": "There are n houses in a row, each house can be painted one of three colors: red, blue, or green. The cost of painting each house a certain color is given in a cost matrix. Paint all houses such that no two adjacent houses have the same color and minimize the total cost.",
  "difficulty": "Medium",
  "tags": ["Dynamic Programming"],

  "a": "Use DP. dp[i][c] = cost of painting house i with color c + min cost of previous house with different color.",

  "steps": [
    "Let dp[i][0], dp[i][1], dp[i][2] represent min cost painting house i in colors R,G,B.",
    "Base case: dp[0][c] = cost[0][c].",
    "For each house i:",
    "  • dp[i][0] = cost[i][0] + min(dp[i-1][1], dp[i-1][2])",
    "  • dp[i][1] = cost[i][1] + min(dp[i-1][0], dp[i-1][2])",
    "  • dp[i][2] = cost[i][2] + min(dp[i-1][0], dp[i-1][1])",
    "Answer is min(dp[n-1][0], dp[n-1][1], dp[n-1][2])."
  ],

  "examples": [
    { "input": "[[17,2,17],[16,16,5],[14,3,19]]", "output": "10" },
    { "input": "[[7,6,2]]", "output": "2" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1) optimized"
  },

  "codes": {
    "python":
`def minCost(costs):
    if not costs:
        return 0

    for i in range(1, len(costs)):
        costs[i][0] += min(costs[i-1][1], costs[i-1][2])
        costs[i][1] += min(costs[i-1][0], costs[i-1][2])
        costs[i][2] += min(costs[i-1][0], costs[i-1][1])

    return min(costs[-1])`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int minCost(vector<vector<int>>& costs) {
    if (costs.empty()) return 0;

    for (int i = 1; i < costs.size(); i++) {
        costs[i][0] += min(costs[i-1][1], costs[i-1][2]);
        costs[i][1] += min(costs[i-1][0], costs[i-1][2]);
        costs[i][2] += min(costs[i-1][0], costs[i-1][1]);
    }

    return min({costs.back()[0], costs.back()[1], costs.back()[2]});
}`,

    "java":
`class Solution {
    public int minCost(int[][] costs) {
        if (costs.length == 0) return 0;

        for (int i = 1; i < costs.length; i++) {
            costs[i][0] += Math.min(costs[i-1][1], costs[i-1][2]);
            costs[i][1] += Math.min(costs[i-1][0], costs[i-1][2]);
            costs[i][2] += Math.min(costs[i-1][0], costs[i-1][1]);
        }

        int n = costs.length - 1;
        return Math.min(costs[n][0], Math.min(costs[n][1], costs[n][2]));
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

int minCost(int** costs, int costsSize, int* costsColSize) {
    if (costsSize == 0) return 0;

    for (int i = 1; i < costsSize; i++) {
        int r = costs[i][0];
        int g = costs[i][1];
        int b = costs[i][2];

        costs[i][0] = r + (costs[i-1][1] < costs[i-1][2] ? costs[i-1][1] : costs[i-1][2]);
        costs[i][1] = g + (costs[i-1][0] < costs[i-1][2] ? costs[i-1][0] : costs[i-1][2]);
        costs[i][2] = b + (costs[i-1][0] < costs[i-1][1] ? costs[i-1][0] : costs[i-1][1]);
    }

    int r = costs[costsSize-1][0];
    int g = costs[costsSize-1][1];
    int b = costs[costsSize-1][2];

    int min = r < g ? r : g;
    min = min < b ? min : b;
    return min;
}

int main() {
    int r1[] = {17,2,17};
    int r2[] = {16,16,5};
    int r3[] = {14,3,19};

    int* mat[] = {r1, r2, r3};
    int cols[] = {3,3,3};

    printf("Min cost: %d\\n", minCost(mat, 3, cols)); // Expected: 10
    return 0;
}`
  }
},

    //quetsion 7

    {
  "q": "Given a list of words sorted lexicographically according to an alien language, return a possible order of the language's letters. If no valid order exists, return an empty string.",
  "difficulty": "Hard",
  "tags": ["Graph", "Topological Sort", "DFS", "BFS"],

  "a": "Build a directed graph by comparing adjacent words and finding the first differing character. Then perform topological sort (Kahn’s BFS). If cycle exists → return empty string.",

  "steps": [
    "Initialize graph of all unique characters.",
    "Compare adjacent words:",
    "   • Find first differing character.",
    "   • Add edge: char1 → char2.",
    "   • If invalid prefix situation (e.g., 'abc' before 'ab'), return empty string.",
    "Compute indegree for all nodes.",
    "Use queue for Kahn's BFS topological sort.",
    "Pop nodes with indegree 0, append to result.",
    "Reduce indegree of neighbors.",
    "If result has all characters → valid order, else cycle → return empty."
  ],

  "examples": [
    { "input": "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", "output": "\"wertf\"" },
    { "input": "[\"z\",\"x\",\"z\"]", "output": "\"\" (cycle)" }
  ],

  "complexity": {
    "time": "O(C + W)",
    "space": "O(C)"
  },

  "codes": {
    "python":
`from collections import defaultdict, deque

def alienOrder(words):
    graph = defaultdict(set)
    indegree = {}

    for w in words:
        for c in w:
            indegree[c] = 0

    for w1, w2 in zip(words, words[1:]):
        if len(w1) > len(w2) and w1.startswith(w2):
            return ""
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                if c2 not in graph[c1]:
                    graph[c1].add(c2)
                    indegree[c2] += 1
                break

    q = deque([c for c in indegree if indegree[c] == 0])
    res = []

    while q:
        c = q.popleft()
        res.append(c)
        for nei in graph[c]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                q.append(nei)

    return "".join(res) if len(res) == len(indegree) else ""`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> graph;
    unordered_map<char, int> indegree;

    for (auto &w : words)
        for (char c : w)
            indegree[c] = 0;

    for (int i = 0; i < words.size() - 1; i++) {
        string w1 = words[i], w2 = words[i+1];
        if (w1.size() > w2.size() && w1.find(w2) == 0)
            return "";

        for (int j = 0; j < min(w1.size(), w2.size()); j++) {
            if (w1[j] != w2[j]) {
                if (!graph[w1[j]].count(w2[j])) {
                    graph[w1[j]].insert(w2[j]);
                    indegree[w2[j]]++;
                }
                break;
            }
        }
    }

    queue<char> q;
    for (auto &p : indegree)
        if (p.second == 0)
            q.push(p.first);

    string res;
    while (!q.empty()) {
        char c = q.front(); q.pop();
        res += c;

        for (char nei : graph[c]) {
            indegree[nei]--;
            if (indegree[nei] == 0)
                q.push(nei);
        }
    }

    return res.size() == indegree.size() ? res : "";
}`,

    "java":
`import java.util.*;

class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> graph = new HashMap<>();
        Map<Character, Integer> indegree = new HashMap<>();

        for (String w : words)
            for (char c : w.toCharArray())
                indegree.put(c, 0);

        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i+1];
            if (w1.length() > w2.length() && w1.startsWith(w2))
                return "";

            for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    graph.computeIfAbsent(w1.charAt(j), k -> new HashSet<>());
                    if (graph.get(w1.charAt(j)).add(w2.charAt(j)))
                        indegree.put(w2.charAt(j), indegree.get(w2.charAt(j)) + 1);
                    break;
                }
            }
        }

        Queue<Character> q = new LinkedList<>();
        for (char c : indegree.keySet())
            if (indegree.get(c) == 0)
                q.offer(c);

        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            char c = q.poll();
            sb.append(c);
            if (graph.containsKey(c)) {
                for (char nei : graph.get(c)) {
                    indegree.put(nei, indegree.get(nei) - 1);
                    if (indegree.get(nei) == 0)
                        q.offer(nei);
                }
            }
        }

        return sb.length() == indegree.size() ? sb.toString() : "";
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX 26

bool startsWith(char* a, char* b) {
    return strncmp(a, b, strlen(b)) == 0;
}

char* alienOrder(char** words, int wordsSize) {
    int graph[MAX][MAX] = {0};
    int indegree[MAX];
    int present[MAX] = {0};
    memset(indegree, 0, sizeof(indegree));

    for (int i = 0; i < wordsSize; i++)
        for (int j = 0; words[i][j]; j++)
            present[words[i][j] - 'a'] = 1;

    for (int i = 0; i < wordsSize - 1; i++) {
        char *w1 = words[i], *w2 = words[i+1];
        if (strlen(w1) > strlen(w2) && startsWith(w1, w2))
            return strdup("");

        int len = strlen(w1) < strlen(w2) ? strlen(w1) : strlen(w2);
        for (int j = 0; j < len; j++) {
            if (w1[j] != w2[j]) {
                int a = w1[j] - 'a';
                int b = w2[j] - 'a';
                if (!graph[a][b]) {
                    graph[a][b] = 1;
                    indegree[b]++;
                }
                break;
            }
        }
    }

    char* res = malloc(40);
    int idx = 0;

    int queue[MAX], front = 0, rear = 0;
    for (int i = 0; i < MAX; i++)
        if (present[i] && indegree[i] == 0)
            queue[rear++] = i;

    while (front < rear) {
        int c = queue[front++];
        res[idx++] = c + 'a';
        for (int nei = 0; nei < MAX; nei++) {
            if (graph[c][nei]) {
                indegree[nei]--;
                if (indegree[nei] == 0)
                    queue[rear++] = nei;
            }
        }
    }

    res[idx] = '\0';

    int total = 0;
    for (int i = 0; i < MAX; i++)
        if (present[i]) total++;

    if (idx != total)
        return strdup("");

    return res;
}

int main() {
    char* words[] = {"wrt","wrf","er","ett","rftt"};
    printf("Order: %s\\n", alienOrder(words, 5)); // Expected: wertf
    return 0;
}`
  }
},

    //quetsion 8

    {
  "q": "You are given a 2D board representing a Minesweeper game. 'M' = mine, 'E' = unrevealed empty cell. Clicking on a cell reveals it and expands recursively if it is blank. Return the updated board after clicking.",
  "difficulty": "Medium",
  "tags": ["DFS", "BFS", "Matrix"],

  "a": "If click is on a mine → change to 'X'. Else count adjacent mines. If count > 0 → place count. If count == 0 → reveal as 'B' and DFS neighbors.",
  
  "steps": [
    "If clicked cell is 'M', change to 'X' and return.",
    "Otherwise perform DFS:",
    "  • Count mines in 8 neighboring cells.",
    "  • If count > 0: write the count and stop.",
    "  • Else mark 'B' and recursively reveal all 'E' neighbors.",
    "Return board."
  ],

  "examples": [
    { "input": "board=[[‘E’,‘E’,‘E’],[‘E’,‘E’,‘M’],[‘E’,‘E’,‘E’]], click=[3,0]", "output": "updated board recursively" }
  ],

  "complexity": {
    "time": "O(m * n)",
    "space": "O(m * n) recursion stack"
  },

  "codes": {
    "python":
`def updateBoard(board, click):
    m, n = len(board), len(board[0])
    dirs = [(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]

    def dfs(x, y):
        if board[x][y] != 'E':
            return

        mines = 0
        for dx, dy in dirs:
            nx, ny = x+dx, y+dy
            if 0 <= nx < m and 0 <= ny < n and board[nx][ny] == 'M':
                mines += 1

        if mines > 0:
            board[x][y] = str(mines)
        else:
            board[x][y] = 'B'
            for dx, dy in dirs:
                nx, ny = x+dx, y+dy
                if 0 <= nx < m and 0 <= ny < n:
                    dfs(nx, ny)

    x, y = click
    if board[x][y] == 'M':
        board[x][y] = 'X'
    else:
        dfs(x, y)

    return board`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {
    int m = board.size(), n = board[0].size();
    vector<pair<int,int>> dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};

    function<void(int,int)> dfs = [&](int x, int y) {
        if (board[x][y] != 'E') return;

        int mines = 0;
        for (auto &d : dirs) {
            int nx = x + d.first, ny = y + d.second;
            if (nx>=0 && ny>=0 && nx<m && ny<n && board[nx][ny]=='M')
                mines++;
        }

        if (mines > 0) {
            board[x][y] = char(mines + '0');
        } else {
            board[x][y] = 'B';
            for (auto &d : dirs) {
                int nx = x + d.first, ny = y + d.second;
                if (nx>=0 && ny>=0 && nx<m && ny<n)
                    dfs(nx, ny);
            }
        }
    };

    int x = click[0], y = click[1];
    if (board[x][y] == 'M') {
        board[x][y] = 'X';
    } else {
        dfs(x, y);
    }

    return board;
}`,

    "java":
`import java.util.*;

class Solution {
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
    
    public char[][] updateBoard(char[][] board, int[] click) {
        int x = click[0], y = click[1];
        if (board[x][y] == 'M') {
            board[x][y] = 'X';
        } else {
            dfs(board, x, y);
        }
        return board;
    }

    private void dfs(char[][] board, int x, int y) {
        if (board[x][y] != 'E') return;

        int m = board.length, n = board[0].length;
        int mines = 0;

        for (int[] d : dirs) {
            int nx = x + d[0], ny = y + d[1];
            if (nx>=0 && ny>=0 && nx<m && ny<n && board[nx][ny]=='M')
                mines++;
        }

        if (mines > 0) {
            board[x][y] = (char)(mines + '0');
        } else {
            board[x][y] = 'B';
            for (int[] d : dirs) {
                int nx = x + d[0], ny = y + d[1];
                if (nx>=0 && ny>=0 && nx<m && ny<n)
                    dfs(board, nx, ny);
            }
        }
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

int dirs[8][2] = {
    {1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}
};

void dfs(char** board, int m, int n, int x, int y) {
    if (board[x][y] != 'E') return;

    int mines = 0;

    for (int k = 0; k < 8; k++) {
        int nx = x + dirs[k][0], ny = y + dirs[k][1];
        if (nx>=0 && ny>=0 && nx<m && ny<n && board[nx][ny]=='M')
            mines++;
    }

    if (mines > 0) {
        board[x][y] = mines + '0';
        return;
    }

    board[x][y] = 'B';

    for (int k = 0; k < 8; k++) {
        int nx = x + dirs[k][0], ny = y + dirs[k][1];
        if (nx>=0 && ny>=0 && nx<m && ny<n)
            dfs(board, m, n, nx, ny);
    }
}

char** updateBoard(char** board, int boardSize, int* boardColSize, int* returnSize, int** returnColSize, int* click, int clickSize) {
    int x = click[0], y = click[1];
    int m = boardSize, n = boardColSize[0];

    if (board[x][y] == 'M') {
        board[x][y] = 'X';
    } else {
        dfs(board, m, n, x, y);
    }

    *returnSize = m;
    *returnColSize = boardColSize;
    return board;
}

int main() {
    char r1[] = {'E','E','E'};
    char r2[] = {'E','E','M'};
    char r3[] = {'E','E','E'};

    char* board[] = {r1, r2, r3};
    int col[] = {3,3,3};
    int click[] = {3,0};

    int retSize;
    int* retCol;

    char** res = updateBoard(board, 3, col, &retSize, &retCol, click, 2);

    for (int i = 0; i < retSize; i++) {
        for (int j = 0; j < retCol[i]; j++)
            printf("%c ", res[i][j]);
        printf("\\n");
    }
    return 0;
}`
  }
},

    //quetsion 9


    {
  "q": "You are playing Zuma Game. Given a board string and hand string, return the minimum number of balls needed to clear the board. If impossible, return -1.",
  "difficulty": "Hard",
  "tags": ["DFS", "Backtracking", "Memoization"],

  "a": "Use DFS with memoization. For every position on board, try inserting a ball from hand. After insertion, repeatedly delete 3 or more consecutive balls (shrink). Recurse on the resulting board and remaining hand.",
  
  "steps": [
    "Sort hand to group same colors.",
    "Use DFS(board, hand):",
    "   • If board empty → return 0.",
    "   • If hand empty → return INF.",
    "   • For each position in board:",
    "       - For each unique ball in hand:",
    "           * If same as board[i] or helps form group of 3.",
    "           * Insert ball.",
    "           * Shrink board (remove >=3 groups).",
    "           * Recurse for cost + 1.",
    "Use memo to avoid repeated states.",
    "Return minimum moves or -1."
  ],

  "examples": [
    { "input": "board=\"WRRBBW\", hand=\"RB\"", "output": "-1" },
    { "input": "board=\"WWRRBBWW\", hand=\"WRBRW\"", "output": "2" }
  ],

  "complexity": {
    "time": "Exponential with pruning",
    "space": "O(n)"
  },

  "codes": {
    "python":
`from functools import lru_cache

def shrink(s):
    changed = True
    while changed:
        changed = False
        i = 0
        new_s = ""
        while i < len(s):
            j = i
            while j < len(s) and s[j] == s[i]:
                j += 1
            if j - i >= 3:
                changed = True
            else:
                new_s += s[i:j]
            i = j
        s = new_s
    return s

@lru_cache(None)
def dfs(board, hand):
    board = shrink(board)
    if not board:
        return 0
    if not hand:
        return float('inf')

    res = float('inf')

    for i in range(len(board) + 1):
        for j in range(len(hand)):
            if j > 0 and hand[j] == hand[j-1]:
                continue
            new_board = board[:i] + hand[j] + board[i:]
            new_hand = hand[:j] + hand[j+1:]
            temp = dfs(new_board, new_hand)
            if temp != float('inf'):
                res = min(res, 1 + temp)

    return res

def findMinStep(board, hand):
    res = dfs(board, ''.join(sorted(hand)))
    return -1 if res == float('inf') else res`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string shrinkBoard(string s) {
    bool changed = true;
    while (changed) {
        changed = false;
        string ns = "";
        for (int i = 0; i < s.size(); ) {
            int j = i;
            while (j < s.size() && s[j] == s[i]) j++;
            if (j - i >= 3) changed = true;
            else ns += s.substr(i, j - i);
            i = j;
        }
        s = ns;
    }
    return s;
}

unordered_map<string,int> memo;

int dfs(string board, string hand) {
    board = shrinkBoard(board);
    if (board.empty()) return 0;
    if (hand.empty()) return 1e9;

    string key = board + "#" + hand;
    if (memo.count(key)) return memo[key];

    int res = 1e9;

    for (int i = 0; i <= board.size(); i++) {
        for (int j = 0; j < hand.size(); j++) {
            if (j > 0 && hand[j] == hand[j-1]) continue;
            string nb = board.substr(0,i) + hand[j] + board.substr(i);
            string nh = hand.substr(0,j) + hand.substr(j+1);
            int t = dfs(nb, nh);
            if (t != 1e9) res = min(res, 1 + t);
        }
    }
    return memo[key] = res;
}

int findMinStep(string board, string hand) {
    sort(hand.begin(), hand.end());
    int ans = dfs(board, hand);
    return ans >= 1e9 ? -1 : ans;
}`,

    "java":
`import java.util.*;

class Solution {
    Map<String,Integer> memo = new HashMap<>();

    private String shrink(String s) {
        boolean changed = true;
        while (changed) {
            changed = false;
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < s.length();) {
                int j = i;
                while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
                if (j - i >= 3) changed = true;
                else sb.append(s.substring(i, j));
                i = j;
            }
            s = sb.toString();
        }
        return s;
    }

    private int dfs(String board, String hand) {
        board = shrink(board);
        if (board.length() == 0) return 0;
        if (hand.length() == 0) return (int)1e9;

        String key = board + "#" + hand;
        if (memo.containsKey(key)) return memo.get(key);

        int res = (int)1e9;

        for (int i = 0; i <= board.length(); i++) {
            for (int j = 0; j < hand.length(); j++) {
                if (j > 0 && hand.charAt(j) == hand.charAt(j-1)) continue;
                String nb = board.substring(0,i) + hand.charAt(j) + board.substring(i);
                String nh = hand.substring(0,j) + hand.substring(j+1);
                int t = dfs(nb, nh);
                if (t != 1e9) res = Math.min(res, 1 + t);
            }
        }

        memo.put(key, res);
        return res;
    }

    public int findMinStep(String board, String hand) {
        char[] arr = hand.toCharArray();
        Arrays.sort(arr);
        return (dfs(board, new String(arr)) >= 1e9) ? -1 : dfs(board, new String(arr));
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* shrink(char* s) {
    char* buff = malloc(256);
    strcpy(buff, s);

    int changed = 1;
    while (changed) {
        changed = 0;
        char* ns = malloc(256);
        int idx = 0;
        for (int i = 0; buff[i]; ) {
            int j = i;
            while (buff[j] && buff[j] == buff[i]) j++;
            if (j - i >= 3) changed = 1;
            else {
                for (int k = i; k < j; k++)
                    ns[idx++] = buff[k];
            }
            i = j;
        }
        ns[idx] = '\\0';
        free(buff);
        buff = ns;
    }
    return buff;
}

// NOTE: Full C DFS + memoization is extremely large.
// This is a working compact version.

typedef struct Node {
    char key[300];
    int val;
    struct Node* next;
} Node;

Node* memo = NULL;

int getMemo(char* key) {
    Node* cur = memo;
    while (cur) {
        if (strcmp(cur->key, key) == 0) return cur->val;
        cur = cur->next;
    }
    return -2;
}

void setMemo(char* key, int val) {
    Node* node = malloc(sizeof(Node));
    strcpy(node->key, key);
    node->val = val;
    node->next = memo;
    memo = node;
}

int dfs(char* board, char* hand) {
    char* sb = shrink(board);
    if (strlen(sb) == 0) { free(sb); return 0; }
    free(sb);

    if (strlen(hand) == 0) return 1000000000;

    char key[300];
    sprintf(key, "%s#%s", board, hand);
    int cached = getMemo(key);
    if (cached != -2) return cached;

    int best = 1000000000;

    int bl = strlen(board), hl = strlen(hand);

    for (int i = 0; i <= bl; i++) {
        for (int j = 0; j < hl; j++) {
            if (j > 0 && hand[j] == hand[j-1]) continue;

            char nb[300], nh[300];
            strncpy(nb, board, i);
            nb[i] = hand[j];
            strcpy(nb + i + 1, board + i);

            strcpy(nh, hand);
            memmove(nh + j, nh + j + 1, hl - j);

            int t = dfs(nb, nh);
            if (t != 1000000000 && t + 1 < best)
                best = t + 1;
        }
    }

    setMemo(key, best);
    return best;
}

int findMinStep(char* board, char* hand) {
    char hs[100];
    strcpy(hs, hand);
    // Simple sort
    for (int i = 0; hs[i]; i++)
        for (int j = i+1; hs[j]; j++)
            if (hs[j] < hs[i]) {
                char c = hs[i]; hs[i] = hs[j]; hs[j] = c;
            }
    int ans = dfs(board, hs);
    return ans >= 1000000000 ? -1 : ans;
}

int main() {
    printf("%d\\n", findMinStep("WWRRBBWW", "WRBRW")); // Expected: 2
    return 0;
}`
  }
},

    //quetsion 10

    {
  "q": "Given a 2x3 board of numbers [0..5], return the minimum number of moves to reach the target state '123450'. Each move swaps 0 with one of its neighbors.",
  "difficulty": "Hard",
  "tags": ["BFS", "Graph", "Hashing"],

  "a": "Treat the board as a string state. Use BFS to search states from start to goal. Precompute neighbors for each index: adjacency list. Continue until '123450' is found.",

  "steps": [
    "Convert board into string s (e.g., '123450').",
    "Target = '123450'.",
    "Use a queue for BFS and a visited set.",
    "Store neighbor positions for each index:",
    "   0 → [1,3]",
    "   1 → [0,2,4]",
    "   2 → [1,5]",
    "   3 → [0,4]",
    "   4 → [1,3,5]",
    "   5 → [2,4]",
    "For each popped state:",
    "   • If equals target → return distance.",
    "   • Generate all swaps of '0' with its neighbors.",
    "   • Push new unique states into queue.",
    "If BFS ends → return -1."
  ],

  "examples": [
    { "input": "[[1,2,3],[4,0,5]]", "output": "1" },
    { "input": "[[1,2,3],[5,4,0]]", "output": "-1 (unsolvable)" }
  ],

  "complexity": {
    "time": "O(6! = 720)",
    "space": "O(720)"
  },

  "codes": {
    "python":
`from collections import deque

def slidingPuzzle(board):
    start = ''.join(str(c) for row in board for c in row)
    target = "123450"

    neighbors = {
        0:[1,3], 1:[0,2,4], 2:[1,5],
        3:[0,4], 4:[1,3,5], 5:[2,4]
    }

    q = deque([(start, 0)])
    visited = {start}

    while q:
        state, steps = q.popleft()
        if state == target:
            return steps

        zero = state.index('0')
        for nei in neighbors[zero]:
            new_list = list(state)
            new_list[zero], new_list[nei] = new_list[nei], new_list[zero]
            new_state = ''.join(new_list)

            if new_state not in visited:
                visited.add(new_state)
                q.append((new_state, steps + 1))

    return -1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int slidingPuzzle(vector<vector<int>>& board) {
    string start = "";
    for (auto &r : board)
        for (int c : r)
            start += to_string(c);

    string target = "123450";

    unordered_map<int, vector<int>> adj = {
        {0,{1,3}}, {1,{0,2,4}}, {2,{1,5}},
        {3,{0,4}}, {4,{1,3,5}}, {5,{2,4}}
    };

    queue<pair<string,int>> q;
    unordered_set<string> vis;

    q.push({start, 0});
    vis.insert(start);

    while (!q.empty()) {
        auto [state, steps] = q.front(); q.pop();

        if (state == target) return steps;

        int zero = state.find('0');

        for (int nei : adj[zero]) {
            string ns = state;
            swap(ns[zero], ns[nei]);

            if (!vis.count(ns)) {
                vis.insert(ns);
                q.push({ns, steps + 1});
            }
        }
    }

    return -1;
}`,

    "java":
`import java.util.*;

class Solution {
    public int slidingPuzzle(int[][] board) {
        StringBuilder sb = new StringBuilder();
        for (int[] r : board)
            for (int c : r)
                sb.append(c);

        String start = sb.toString();
        String target = "123450";

        int[][] adj = {
            {1,3}, {0,2,4}, {1,5},
            {0,4}, {1,3,5}, {2,4}
        };

        Queue<String> q = new LinkedList<>();
        Set<String> vis = new HashSet<>();

        q.offer(start);
        vis.add(start);

        int steps = 0;

        while (!q.isEmpty()) {
            int size = q.size();

            while (size-- > 0) {
                String s = q.poll();
                if (s.equals(target)) return steps;

                int zero = s.indexOf('0');
                for (int nei : adj[zero]) {
                    char[] arr = s.toCharArray();
                    char temp = arr[zero]; arr[zero] = arr[nei]; arr[nei] = temp;
                    String ns = new String(arr);

                    if (!vis.contains(ns)) {
                        vis.add(ns);
                        q.offer(ns);
                    }
                }
            }
            steps++;
        }
        return -1;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int neighbors[6][3] = {
    {1,3,-1},     // 0
    {0,2,4},      // 1
    {1,5,-1},     // 2
    {0,4,-1},     // 3
    {1,3,5},      // 4
    {2,4,-1}      // 5
};

typedef struct Node {
    char state[7];
    int steps;
    struct Node* next;
} Node;

int visitedContains(char visited[][7], int vCount, char* state) {
    for (int i = 0; i < vCount; i++)
        if (strcmp(visited[i], state) == 0)
            return 1;
    return 0;
}

int slidingPuzzle(int board[2][3]) {
    char start[7], target[] = "123450";
    int idx = 0;

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            start[idx++] = board[i][j] + '0';
    start[6] = '\\0';

    Node* queue = malloc(sizeof(Node));
    strcpy(queue->state, start);
    queue->steps = 0;
    queue->next = NULL;

    Node* tail = queue;

    char visited[720][7];
    int vCount = 0;

    strcpy(visited[vCount++], start);

    while (queue) {
        Node* cur = queue;
        queue = queue->next;

        if (strcmp(cur->state, target) == 0) {
            int ans = cur->steps;
            free(cur);
            return ans;
        }

        int zero = strchr(cur->state, '0') - cur->state;

        for (int k = 0; k < 3 && neighbors[zero][k] != -1; k++) {
            int nei = neighbors[zero][k];

            char ns[7];
            strcpy(ns, cur->state);

            char tmp = ns[zero];
            ns[zero] = ns[nei];
            ns[nei] = tmp;

            if (!visitedContains(visited, vCount, ns)) {
                strcpy(visited[vCount++], ns);

                Node* newNode = malloc(sizeof(Node));
                strcpy(newNode->state, ns);
                newNode->steps = cur->steps + 1;
                newNode->next = NULL;

                tail->next = newNode;
                tail = newNode;
            }
        }

        free(cur);
    }

    return -1;
}

int main() {
    int board[2][3] = {{1,2,3},{4,0,5}};
    printf("%d\\n", slidingPuzzle(board));  // Expected: 1
    return 0;
}`
  }
}

];
