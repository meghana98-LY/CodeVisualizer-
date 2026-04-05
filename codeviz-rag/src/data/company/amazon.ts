// src/data/company/amazon.ts

import { QAItem } from "./types";

export const Amazon_QA: QAItem[] = [
//Question1
  {
  q: "Reorder Log Files",
  difficulty: "Medium",
  tags: ["Sorting", "Strings", "Amazon-OA"],

  a: "Separate logs into digit-logs and letter-logs. Sort letter-logs lexicographically by content, then identifier. Keep digit-logs in original order. Concatenate letter-logs first, then digit-logs.",

  steps: [
    "Initialize two lists: letterLogs and digitLogs",
    "For each log: split into identifier and content",
    "If content starts with a digit → push to digitLogs",
    "Else → push to letterLogs",
    "Sort letterLogs by (content, identifier)",
    "Return letterLogs + digitLogs"
  ],

  examples: [
    {
      input: "logs=['dig1 8 1 5 1','let1 art can','dig2 3 6','let2 own kit dig','let3 art zero']",
      output: "['let1 art can','let3 art zero','let2 own kit dig','dig1 8 1 5 1','dig2 3 6']"
    }
  ],

  complexity: {
    time: "O(n log n)",
    space: "O(n)"
  },

  codes: {
    python:
`def reorderLogFiles(logs):
    letters = []
    digits = []
    for log in logs:
        id_, rest = log.split(" ", 1)
        if rest[0].isdigit():
            digits.append(log)
        else:
            letters.append((rest, id_))
    letters.sort()
    return [f"{id_} {rest}" for rest, id_ in letters] + digits`,

    cpp:
`vector<string> reorderLogFiles(vector<string>& logs) {
    vector<pair<string,string>> letters;
    vector<string> digits;

    for (string &log : logs) {
        int pos = log.find(' ');
        string id = log.substr(0, pos);
        string rest = log.substr(pos + 1);

        if (isdigit(rest[0]))
            digits.push_back(log);
        else
            letters.push_back({rest, id});
    }

    sort(letters.begin(), letters.end(),
        [](auto &a, auto &b){
            return a.first == b.first ? a.second < b.second : a.first < b.first;
        });

    vector<string> res;
    for (auto &p : letters)
        res.push_back(p.second + " " + p.first);
    res.insert(res.end(), digits.begin(), digits.end());
    return res;
}`,

    java:
`class Solution {
    public String[] reorderLogFiles(String[] logs) {
        List<String> letter = new ArrayList<>();
        List<String> digit = new ArrayList<>();

        for (String log : logs) {
            int idx = log.indexOf(" ");
            if (Character.isDigit(log.charAt(idx + 1)))
                digit.add(log);
            else
                letter.add(log);
        }

        Collections.sort(letter, (a, b) -> {
            int i1 = a.indexOf(" "), i2 = b.indexOf(" ");
            String c1 = a.substring(i1 + 1), c2 = b.substring(i2 + 1);
            if (c1.equals(c2))
                return a.substring(0, i1).compareTo(b.substring(0, i2));
            return c1.compareTo(c2);
        });

        letter.addAll(digit);
        return letter.toArray(new String[0]);
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int isDigitLog(const char *log) {
    // Find the first space
    const char *p = strchr(log, ' ');
    if (!p) return 0;
    p++; // move to content
    return isdigit(*p);
}

// Extract identifier and content
void splitLog(const char *log, char *id, char *content) {
    const char *p = strchr(log, ' ');
    int idLen = p - log;
    strncpy(id, log, idLen);
    id[idLen] = '\0';
    strcpy(content, p + 1);
}

int cmpLogs(const void *a, const void *b) {
    char idA[100], idB[100];
    char contA[100], contB[100];

    splitLog(*(char **)a, idA, contA);
    splitLog(*(char **)b, idB, contB);

    int cmp = strcmp(contA, contB);
    if (cmp != 0) return cmp;

    return strcmp(idA, idB);
}

char **reorderLogFiles(char **logs, int logsSize, int *returnSize) {
    char **letters = malloc(logsSize * sizeof(char *));
    char **digits = malloc(logsSize * sizeof(char *));
    int lCount = 0, dCount = 0;

    for (int i = 0; i < logsSize; i++) {
        if (isDigitLog(logs[i]))
            digits[dCount++] = logs[i];
        else
            letters[lCount++] = logs[i];
    }

    // sort only letter logs
    qsort(letters, lCount, sizeof(char *), cmpLogs);

    // prepare return array
    char **res = malloc(logsSize * sizeof(char *));
    int idx = 0;

    for (int i = 0; i < lCount; i++)
        res[idx++] = letters[i];
    for (int i = 0; i < dCount; i++)
        res[idx++] = digits[i];

    *returnSize = logsSize;
    free(letters);
    free(digits);
    return res;
}

// ----------- Sample Test Code -------------
int main() {
    char *logs[] = {
        "dig1 8 1 5 1",
        "let1 art can",
        "dig2 3 6",
        "let2 own kit dig",
        "let3 art zero"
    };
    int n = 5;
    int outSize;

    char **result = reorderLogFiles(logs, n, &outSize);

    for (int i = 0; i < outSize; i++)
        printf("%s\n", result[i]);

    free(result);
    return 0;
}

`
  }
},


//question 2

{
  q: "Most Common Word",
  difficulty: "Easy",
  tags: ["String", "HashMap", "Parsing", "Amazon-OA"],

  a: "Normalize paragraph by converting to lowercase and removing punctuation. Split into words, count occurrences using a HashMap, and return the most frequent word that is not in the banned list.",

  steps: [
    "Convert paragraph to lowercase",
    "Replace punctuation with spaces",
    "Split into words",
    "Insert banned words into a HashSet",
    "Count all non-banned words using HashMap",
    "Track the word with the highest frequency",
    "Return the most common valid word"
  ],

  examples: [
    {
      input: "paragraph='Bob hit a ball, the hit BALL flew far after it was hit.' banned=['hit']",
      output: "'ball'"
    }
  ],

  complexity: {
    time: "O(n)",
    space: "O(n)"
  },

  codes: {
    python:
`import re
def mostCommonWord(paragraph, banned):
    banned = set(banned)
    words = re.findall(r'[a-zA-Z]+', paragraph.lower())
    
    freq = {}
    for w in words:
        if w not in banned:
            freq[w] = freq.get(w, 0) + 1

    return max(freq, key=freq.get)`,
    
    cpp:
`string mostCommonWord(string paragraph, vector<string>& banned) {
    unordered_set<string> ban(banned.begin(), banned.end());
    unordered_map<string,int> freq;
    string word;

    for (char &c : paragraph) {
        c = isalpha(c) ? tolower(c) : ' ';
    }

    stringstream ss(paragraph);
    while (ss >> word) {
        if (!ban.count(word))
            freq[word]++;
    }

    string ans;
    int maxf = 0;
    for (auto &p : freq) {
        if (p.second > maxf) {
            maxf = p.second;
            ans = p.first;
        }
    }
    return ans;
}`,

    java:
`class Solution {
    public String mostCommonWord(String paragraph, String[] banned) {
        Set<String> ban = new HashSet<>(Arrays.asList(banned));
        Map<String, Integer> freq = new HashMap<>();

        paragraph = paragraph.replaceAll("[^a-zA-Z]", " ").toLowerCase();
        for (String w : paragraph.split("\\s+")) {
            if (w.length() > 0 && !ban.contains(w))
                freq.put(w, freq.getOrDefault(w, 0) + 1);
        }

        String ans = "";
        int max = 0;
        for (String w : freq.keySet()) {
            if (freq.get(w) > max) {
                max = freq.get(w);
                ans = w;
            }
        }
        return ans;
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define TABLE_SIZE 5000

// Convert string to lowercase
void toLower(char *s) {
    for (int i = 0; s[i]; i++)
        s[i] = tolower(s[i]);
}

// Replace non-letter characters with space
void normalize(char *s) {
    for (int i = 0; s[i]; i++)
        if (!isalpha(s[i])) s[i] = ' ';
}

// Simple hash function
unsigned long hash(const char *str) {
    unsigned long h = 5381;
    int c;
    while ((c = *str++))
        h = ((h << 5) + h) + c;
    return h % TABLE_SIZE;
}

// Hash table for counting words
typedef struct {
    char word[50];
    int count;
    int used;
} Entry;

Entry freqTable[TABLE_SIZE];

// Insert or update frequency table
void addWord(const char *w) {
    unsigned long idx = hash(w);

    while (freqTable[idx].used) {
        if (strcmp(freqTable[idx].word, w) == 0) {
            freqTable[idx].count++;
            return;
        }
        idx = (idx + 1) % TABLE_SIZE;
    }

    strcpy(freqTable[idx].word, w);
    freqTable[idx].count = 1;
    freqTable[idx].used = 1;
}

// Check if a word is banned
int isBanned(char **banned, int bannedSize, const char *w) {
    for (int i = 0; i < bannedSize; i++)
        if (strcmp(banned[i], w) == 0)
            return 1;
    return 0;
}

// Main function: returns most common non-banned word
char *mostCommonWord(char *paragraph, char **banned, int bannedSize) {
    static char result[50];

    toLower(paragraph);
    normalize(paragraph);

    memset(freqTable, 0, sizeof(freqTable));

    char *token = strtok(paragraph, " ");
    while (token) {
        if (!isBanned(banned, bannedSize, token)) {
            if (strlen(token) > 0)
                addWord(token);
        }
        token = strtok(NULL, " ");
    }

    int maxCount = 0;
    result[0] = '\0';

    for (int i = 0; i < TABLE_SIZE; i++) {
        if (freqTable[i].used && freqTable[i].count > maxCount) {
            maxCount = freqTable[i].count;
            strcpy(result, freqTable[i].word);
        }
    }
    return result;
}

// ------------ Test Driver --------------
int main() {
    char paragraph[] = "Bob hit a ball, the hit BALL flew far after it was hit.";
    char *banned[] = {"hit"};

    char *ans = mostCommonWord(paragraph, banned, 1);
    printf("Most common word: %s\n", ans);

    return 0;
}

`
  }
}
,

//question 3

{
  q: "Top K Frequent Elements",
  difficulty: "Medium",
  tags: ["Heap", "HashMap", "Bucket Sort", "Amazon-OA"],

  a: "Count frequencies of all numbers using a HashMap. Use either a min-heap of size k OR bucket sort. Amazon often prefers the bucket sort method because it runs in linear time.",

  steps: [
    "Create a HashMap to count frequencies",
    "Create buckets where index = frequency",
    "Push each number into bucket[freq]",
    "Traverse buckets from highest freq to lowest",
    "Collect k most frequent numbers",
    "Return the result"
  ],

  examples: [
    {
      input: "nums=[1,1,1,2,2,3], k=2",
      output: "[1,2]"
    },
    {
      input: "nums=[4,1,-1,2,-1,2,3], k=2",
      output: "[-1,2]"
    }
  ],

  complexity: {
    time: "O(n)",
    space: "O(n)"
  },

  codes: {
    python:
`from collections import defaultdict

def topKFrequent(nums, k):
    freq = defaultdict(int)
    for n in nums:
        freq[n] += 1

    buckets = [[] for _ in range(len(nums) + 1)]
    for num, count in freq.items():
        buckets[count].append(num)

    res = []
    for count in range(len(buckets)-1, 0, -1):
        for num in buckets[count]:
            res.append(num)
            if len(res) == k:
                return res
    return res`,

    cpp:
`vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    for (int n : nums) freq[n]++;

    vector<vector<int>> buckets(nums.size() + 1);
    for (auto &p : freq)
        buckets[p.second].push_back(p.first);

    vector<int> res;
    for (int i = buckets.size()-1; i > 0; i--) {
        for (int n : buckets[i]) {
            res.push_back(n);
            if (res.size() == k) return res;
        }
    }
    return res;
}`,

    java:
`class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums)
            freq.put(n, freq.getOrDefault(n, 0) + 1);

        List<Integer>[] buckets = new List[nums.length + 1];
        for (int i = 0; i < buckets.length; i++)
            buckets[i] = new ArrayList<>();

        for (int num : freq.keySet())
            buckets[freq.get(num)].add(num);

        int[] res = new int[k];
        int idx = 0;

        for (int i = buckets.length - 1; i > 0 && idx < k; i--) {
            for (int num : buckets[i]) {
                res[idx++] = num;
                if (idx == k) break;
            }
        }
        return res;
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10007   // large prime for hashing

// Structure to store number and its frequency
typedef struct {
    int key;
    int freq;
    int used;
} Entry;

Entry table[TABLE_SIZE];

// Hash function
unsigned long hash(int x) {
    return (unsigned long)(x * 2654435761u) % TABLE_SIZE;
}

// Insert / update frequency in hash table
void insertFreq(int num) {
    unsigned long idx = hash(num);

    while (table[idx].used) {
        if (table[idx].key == num) {
            table[idx].freq++;
            return;
        }
        idx = (idx + 1) % TABLE_SIZE;
    }

    table[idx].used = 1;
    table[idx].key = num;
    table[idx].freq = 1;
}

// Struct used for sorting
typedef struct {
    int num;
    int freq;
} Pair;

// Compare for qsort (descending freq)
int cmp(const void *a, const void *b) {
    Pair *x = (Pair *)a;
    Pair *y = (Pair *)b;
    return y->freq - x->freq;  // descending
}

// Main function
int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    memset(table, 0, sizeof(table));

    // Count frequencies
    for (int i = 0; i < numsSize; i++)
        insertFreq(nums[i]);

    // Move used entries into array
    Pair *arr = malloc(numsSize * sizeof(Pair));
    int count = 0;

    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table[i].used) {
            arr[count].num = table[i].key;
            arr[count].freq = table[i].freq;
            count++;
        }
    }

    // Sort by frequency
    qsort(arr, count, sizeof(Pair), cmp);

    // Prepare result
    int *res = malloc(k * sizeof(int));
    for (int i = 0; i < k; i++)
        res[i] = arr[i].num;

    *returnSize = k;
    free(arr);
    return res;
}

// ----------------- Test Code -----------------
int main() {
    int nums[] = {1,1,1,2,2,3};
    int n = 6, k = 2;
    int outSize;

    int *ans = topKFrequent(nums, n, k, &outSize);

    printf("Top %d frequent: ", k);
    for (int i = 0; i < outSize; i++)
        printf("%d ", ans[i]);
    printf("\n");

    free(ans);
    return 0;
}
`
  }
}
,

//question4
{
  q: "Minimum Number of Arrows to Burst Balloons",
  difficulty: "Medium",
  tags: ["Greedy", "Intervals", "Sorting"],

  a: "Sort balloons by end coordinate. Shoot one arrow at the end of the first balloon, and then only shoot a new arrow when the next balloon starts after the current arrow point.",

  steps: [
    "If no balloons → return 0",
    "Sort intervals by their end coordinate",
    "Shoot first arrow at end of first balloon",
    "Iterate through remaining balloons:",
    "   - If balloon.start <= arrowPos → same arrow bursts it",
    "   - Else → new arrow required, update arrowPos",
    "Return number of arrows"
  ],

  examples: [
    {
      input: "points=[[10,16],[2,8],[1,6],[7,12]]",
      output: "2"
    },
    {
      input: "points=[[1,2],[3,4],[5,6],[7,8]]",
      output: "4"
    }
  ],

  complexity: {
    time: "O(n log n)",
    space: "O(1)"
  },

  codes: {
    python:
`def findMinArrowShots(points):
    if not points:
        return 0

    points.sort(key=lambda x: x[1])
    arrows = 1
    arrow_pos = points[0][1]

    for start, end in points[1:]:
        if start > arrow_pos:
            arrows += 1
            arrow_pos = end
    return arrows`,

    cpp:
`int findMinArrowShots(vector<vector<int>>& points) {
    if (points.empty()) return 0;

    sort(points.begin(), points.end(),
        [](auto &a, auto &b){ return a[1] < b[1]; });

    int arrows = 1;
    int arrowPos = points[0][1];

    for (int i = 1; i < points.size(); i++) {
        if (points[i][0] > arrowPos) {
            arrows++;
            arrowPos = points[i][1];
        }
    }
    return arrows;
}`,

    java:
`class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points.length == 0) return 0;

        Arrays.sort(points, (a,b) -> a[1] - b[1]);

        int arrows = 1;
        int arrowPos = points[0][1];

        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > arrowPos) {
                arrows++;
                arrowPos = points[i][1];
            }
        }
        return arrows;
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>

// Comparison for qsort: sort by end coordinate (points[i][1])
int cmp(const void *a, const void *b) {
    int *x = *(int **)a;
    int *y = *(int **)b;
    return x[1] - y[1];
}

int findMinArrowShots(int **points, int pointsSize, int *pointsColSize) {
    if (pointsSize == 0)
        return 0;

    // Sort intervals by ending point
    qsort(points, pointsSize, sizeof(int *), cmp);

    int arrows = 1;
    int arrowPos = points[0][1];

    for (int i = 1; i < pointsSize; i++) {
        int start = points[i][0];
        int end   = points[i][1];

        if (start > arrowPos) {
            arrows++;
            arrowPos = end;
        }
    }

    return arrows;
}


// ---------------------- TEST CODE --------------------------
int main() {
    int a[] = {10, 16};
    int b[] = {2, 8};
    int c[] = {1, 6};
    int d[] = {7, 12};

    int *points[] = {a, b, c, d};
    int cols = 2;

    int result = findMinArrowShots(points, 4, &cols);
    printf("Minimum arrows: %d\n", result);   // Expected: 2

    return 0;
}
`
  }
},

//question5

{
  q: "Five Star Sellers – Increase Ratings to Reach Threshold",
  difficulty: "Medium",
  tags: ["Greedy", "Priority Queue", "Amazon-OA", "Math"],

  a: "Each product is rated as five-star reviews / total reviews. Each time you add one five-star review, the gain in rating decreases. Use a max-heap to always upgrade the product that gives the highest marginal increase until the overall average threshold is met.",

  steps: [
    "Convert each product rating into: currentFive / currentTotal",
    "Compute its marginal gain if we add one 5-star review",
    "Push (gain, product) into a max-heap",
    "While average rating < threshold:",
    "   - Pop product with highest gain",
    "   - Add one 5-star review → update numbers",
    "   - Recompute gain and push back into heap",
    "Count number of additions",
    "Return the count"
  ],

  examples: [
    {
      input: "ratings=[[4,4],[1,2],[3,6]], threshold=77%",
      output: "3"
    },
    {
      input: "ratings=[[2,4],[3,9],[1,3]], threshold=60%",
      output: "2"
    }
  ],

  complexity: {
    time: "O(n log n)",
    space: "O(n)"
  },

  codes: {
    python:
`import heapq

def fiveStarSellers(ratings, threshold):
    def gain(five, total):
        return (five + 1) / (total + 1) - five / total

    pq = []
    for five, total in ratings:
        heapq.heappush(pq, (-gain(five, total), five, total))

    def avg():
        s = 0
        for f, t in ratings:
            s += f / t
        return (s / len(ratings)) * 100

    ops = 0
    while avg() < threshold:
        g, f, t = heapq.heappop(pq)
        g = -g

        idx = ratings.index([f, t])
        ratings[idx] = [f + 1, t + 1]

        f += 1
        t += 1
        heapq.heappush(pq, (-gain(f, t), f, t))

        ops += 1

    return ops`,

    cpp:
`struct Node {
    double gain;
    int f, t;
    bool operator<(const Node& other) const {
        return gain < other.gain;
    }
};

double getGain(int f, int t){
    return (double)(f+1)/(t+1) - (double)f/t;
}

int fiveStarSellers(vector<vector<int>>& ratings, int threshold) {
    priority_queue<Node> pq;
    int n = ratings.size();

    for (auto &r : ratings)
        pq.push({getGain(r[0], r[1]), r[0], r[1]});

    auto avg = [&](){
        double sum = 0;
        for (auto &r : ratings)
            sum += (double)r[0] / r[1];
        return (sum / n) * 100;
    };

    int ops = 0;
    while (avg() < threshold) {
        auto top = pq.top(); pq.pop();

        for (auto &r : ratings) {
            if (r[0] == top.f && r[1] == top.t) {
                r[0]++; r[1]++;
                break;
            }
        }

        pq.push({getGain(top.f+1, top.t+1), top.f+1, top.t+1});
        ops++;
    }
    return ops;
}`,

    java:
`class Solution {
    static double gain(int f, int t){
        return (double)(f+1)/(t+1) - (double)f/t;
    }

    public int fiveStarSellers(int[][] ratings, int threshold) {
        PriorityQueue<double[]> pq = new PriorityQueue<>((a,b) -> Double.compare(b[0], a[0]));

        for (int[] r : ratings)
            pq.add(new double[]{gain(r[0], r[1]), r[0], r[1]});

        int ops = 0;
        while (true) {
            double total = 0;
            for (int[] r : ratings)
                total += (double)r[0] / r[1];
            if ((total / ratings.length) * 100 >= threshold)
                return ops;

            double[] top = pq.poll();
            int f = (int)top[1], t = (int)top[2];

            for (int[] r : ratings)
                if (r[0] == f && r[1] == t) {
                    r[0]++; r[1]++;
                    break;
                }

            pq.add(new double[]{gain(f+1, t+1), f+1, t+1});
            ops++;
        }
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    double gain;
    int f, t;
    int idx; // index in ratings
} Node;

typedef struct {
    Node *arr;
    int size;
} MaxHeap;

// Calculate marginal gain
double gain(int f, int t) {
    return (double)(f + 1) / (t + 1) - (double)f / t;
}

// Swap utility
void swap(Node *a, Node *b) {
    Node temp = *a;
    *a = *b;
    *b = temp;
}

// Push to heap
void heapPush(MaxHeap *h, Node item) {
    int i = h->size++;
    h->arr[i] = item;

    while (i > 0) {
        int parent = (i - 1) / 2;
        if (h->arr[parent].gain >= h->arr[i].gain) break;
        swap(&h->arr[parent], &h->arr[i]);
        i = parent;
    }
}

// Pop max-gain element
Node heapPop(MaxHeap *h) {
    Node top = h->arr[0];
    h->arr[0] = h->arr[--h->size];

    int i = 0;
    while (1) {
        int left = 2*i + 1, right = 2*i + 2, largest = i;

        if (left < h->size && h->arr[left].gain > h->arr[largest].gain)
            largest = left;
        if (right < h->size && h->arr[right].gain > h->arr[largest].gain)
            largest = right;

        if (largest == i) break;
        swap(&h->arr[i], &h->arr[largest]);
        i = largest;
    }
    return top;
}

// Calculate average rating %
double avg(int ratings[][2], int n) {
    double sum = 0;
    for (int i = 0; i < n; i++)
        sum += (double)ratings[i][0] / ratings[i][1];
    return (sum / n) * 100.0;
}

// Main function equivalent to Python version
int fiveStarSellers(int ratings[][2], int n, double threshold) {
    MaxHeap heap;
    heap.arr = (Node *)malloc(sizeof(Node) * n * 1000); // enough ops
    heap.size = 0;

    // Initialize heap with gains
    for (int i = 0; i < n; i++) {
        int f = ratings[i][0];
        int t = ratings[i][1];
        heapPush(&heap, (Node){ gain(f, t), f, t, i });
    }

    int ops = 0;

    while (avg(ratings, n) < threshold) {
        Node top = heapPop(&heap);

        int f = top.f + 1;
        int t = top.t + 1;

        // update ratings array
        ratings[top.idx][0] = f;
        ratings[top.idx][1] = t;

        // push updated entry
        heapPush(&heap, (Node){ gain(f, t), f, t, top.idx });

        ops++;
    }

    free(heap.arr);
    return ops;
}

// -------------------- TEST --------------------
int main() {
    int ratings[3][2] = {{4,4}, {1,2}, {3,6}};
    double threshold = 77.0;

    int result = fiveStarSellers(ratings, 3, threshold);
    printf("Operations needed: %d\n", result);  // Expected: 3

    return 0;
}

`
  }
},

//quetsion6

{
  q: "Task Scheduler",
  difficulty: "Medium",
  tags: ["Greedy", "Heap", "Counting", "Simulation"],

  a: "Count the frequency of each task. The idea is to always run the most frequent tasks first while respecting the cooldown n. Use a max-heap: pick the top k tasks in each cycle (k = n+1), reduce their counts, and push back. Continue until all tasks are done.",

  steps: [
    "Count frequencies of each task using a HashMap",
    "Push all frequencies into a max-heap",
    "While heap is not empty:",
    "   - Run up to n+1 tasks from heap",
    "   - Reduce their counts",
    "   - Reinsert tasks with remaining counts",
    "   - If heap empty → break early",
    "Return total intervals taken"
  ],

  examples: [
    {
      input: "tasks=['A','A','A','B','B','B'], n=2",
      output: "8"
    },
    {
      input: "tasks=['A','C','A','B','D','B'], n=1",
      output: "6"
    }
  ],

  complexity: {
    time: "O(n log k)",
    space: "O(k)"
  },

  codes: {
    python:
`from heapq import heappush, heappop

def leastInterval(tasks, n):
    freq = {}
    for t in tasks:
        freq[t] = freq.get(t, 0) + 1

    maxHeap = []
    for f in freq.values():
        heappush(maxHeap, -f)

    time = 0
    while maxHeap:
        temp = []
        for _ in range(n + 1):
            if maxHeap:
                f = -heappop(maxHeap)
                if f > 1:
                    temp.append(f - 1)
            time += 1
            if not maxHeap and not temp:
                return time

        for f in temp:
            heappush(maxHeap, -f)

    return time`,

    cpp:
`int leastInterval(vector<char>& tasks, int n) {
    unordered_map<char,int> freq;
    for(char t : tasks) freq[t]++;

    priority_queue<int> pq;
    for(auto &p : freq) pq.push(p.second);

    int time = 0;
    while(!pq.empty()) {
        vector<int> tmp;
        for(int i=0;i<=n;i++){
            if(!pq.empty()) {
                int f = pq.top(); pq.pop();
                if(f > 1) tmp.push_back(f-1);
            }
            time++;
            if(pq.empty() && tmp.empty()) 
                return time;
        }
        for(int f : tmp) pq.push(f);
    }
    return time;
}`,

    java:
`class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char c : tasks) freq[c - 'A']++;

        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int f : freq) if (f > 0) pq.add(f);

        int time = 0;
        while (!pq.isEmpty()) {
            List<Integer> temp = new ArrayList<>();
            for (int i = 0; i <= n; i++) {
                if (!pq.isEmpty()) {
                    int f = pq.poll();
                    if (f > 1) temp.add(f - 1);
                }
                time++;
                if (pq.isEmpty() && temp.isEmpty())
                    return time;
            }
            for (int f : temp) pq.add(f);
        }
        return time;
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int arr[1000];
    int size;
} MaxHeap;

// Swap
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

// Push into max-heap
void heapPush(MaxHeap *h, int val) {
    int i = h->size++;
    h->arr[i] = val;
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (h->arr[parent] >= h->arr[i]) break;
        swap(&h->arr[parent], &h->arr[i]);
        i = parent;
    }
}

// Pop the maximum
int heapPop(MaxHeap *h) {
    int top = h->arr[0];
    h->arr[0] = h->arr[--h->size];

    int i = 0;
    while (1) {
        int left = 2 * i + 1, right = 2 * i + 2, largest = i;

        if (left < h->size && h->arr[left] > h->arr[largest])
            largest = left;
        if (right < h->size && h->arr[right] > h->arr[largest])
            largest = right;

        if (largest == i) break;
        swap(&h->arr[i], &h->arr[largest]);
        i = largest;
    }
    return top;
}

// Main function
int leastInterval(char *tasks, int tasksSize, int n) {
    int freq[26] = {0};

    // Count frequencies
    for (int i = 0; i < tasksSize; i++)
        freq[tasks[i] - 'A']++;

    MaxHeap heap = { .size = 0 };

    // Insert into max heap
    for (int i = 0; i < 26; i++)
        if (freq[i] > 0)
            heapPush(&heap, freq[i]);

    int time = 0;

    while (heap.size > 0) {
        int temp[26];
        int tempCount = 0;

        // Process n+1 tasks
        for (int i = 0; i <= n; i++) {
            if (heap.size > 0) {
                int f = heapPop(&heap);
                if (f > 1)
                    temp[tempCount++] = f - 1;
            }
            time++;

            if (heap.size == 0 && tempCount == 0)
                return time;  // finished
        }

        // Reinsert remaining tasks
        for (int i = 0; i < tempCount; i++)
            heapPush(&heap, temp[i]);
    }

    return time;
}

int main() {
    char tasks[] = {'A','A','A','B','B','B'};
    int n = 2;
    int result = leastInterval(tasks, 6, n);

    printf("Least intervals required: %d\n", result); // Expected: 8
    return 0;
}
`
  }
},

//quetsion7

{
  q: "Meeting Rooms II – Minimum Number of Conference Rooms",
  difficulty: "Medium",
  tags: ["Heap", "Intervals", "Greedy", "Amazon-Interview"],

  a: "Sort all meetings by start time. Use a min-heap to store end times. For each meeting: if the earliest finishing meeting ends before the new one starts, reuse that room (pop from heap). Otherwise, allocate a new room (push). The heap size at the end is the minimum number of rooms required.",

  steps: [
    "If no meetings → return 0",
    "Sort intervals by start time",
    "Initialize a min-heap for meeting end times",
    "Push the end time of the first meeting",
    "For each next meeting:",
    "  - If its start time >= min-heap top → pop (reuse room)",
    "  - Push its end time (allocate room)",
    "Return heap size (number of rooms)"
  ],

  examples: [
    {
      input: "intervals=[[0,30],[5,10],[15,20]]",
      output: "2"
    },
    {
      input: "intervals=[[7,10],[2,4]]",
      output: "1"
    }
  ],

  complexity: {
    time: "O(n log n)",
    space: "O(n)"
  },

  codes: {
    python:
`import heapq

def minMeetingRooms(intervals):
    if not intervals:
        return 0

    intervals.sort()
    heap = []
    heapq.heappush(heap, intervals[0][1])

    for start, end in intervals[1:]:
        if start >= heap[0]:
            heapq.heappop(heap)
        heapq.heappush(heap, end)

    return len(heap)`,

    cpp:
`int minMeetingRooms(vector<vector<int>>& intervals) {
    if(intervals.empty()) return 0;

    sort(intervals.begin(), intervals.end());
    priority_queue<int, vector<int>, greater<int>> pq;

    pq.push(intervals[0][1]);

    for(int i = 1; i < intervals.size(); i++) {
        if(intervals[i][0] >= pq.top())
            pq.pop();
        pq.push(intervals[i][1]);
    }
    return pq.size();
}`,

    java:
`class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;

        Arrays.sort(intervals, (a,b) -> a[0] - b[0]);

        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(intervals[0][1]);

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= pq.peek())
                pq.poll();
            pq.add(intervals[i][1]);
        }

        return pq.size();
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>

// Sort intervals by start time
int cmpIntervals(const void *a, const void *b) {
    int *x = *(int **)a;
    int *y = *(int **)b;
    return x[0] - y[0];
}

// -------- MIN HEAP OF END TIMES --------
typedef struct {
    int arr[1000];
    int size;
} MinHeap;

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void heapPush(MinHeap *h, int val) {
    int i = h->size++;
    h->arr[i] = val;

    // bubble up
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (h->arr[parent] <= h->arr[i]) break;
        swap(&h->arr[parent], &h->arr[i]);
        i = parent;
    }
}

int heapPop(MinHeap *h) {
    int top = h->arr[0];
    h->arr[0] = h->arr[--h->size];

    int i = 0;

    // bubble down
    while (1) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int smallest = i;

        if (left < h->size && h->arr[left] < h->arr[smallest])
            smallest = left;
        if (right < h->size && h->arr[right] < h->arr[smallest])
            smallest = right;

        if (smallest == i) break;

        swap(&h->arr[i], &h->arr[smallest]);
        i = smallest;
    }

    return top;
}

// -------- MAIN FUNCTION --------
int minMeetingRooms(int **intervals, int intervalsSize) {
    if (intervalsSize == 0)
        return 0;

    // Sort by start
    qsort(intervals, intervalsSize, sizeof(int *), cmpIntervals);

    MinHeap heap = { .size = 0 };

    // first meeting's end time
    heapPush(&heap, intervals[0][1]);

    for (int i = 1; i < intervalsSize; i++) {
        int start = intervals[i][0];
        int end   = intervals[i][1];

        // if current meeting starts after earliest free room
        if (start >= heap.arr[0])
            heapPop(&heap);

        heapPush(&heap, end);
    }

    // heap size = number of rooms used
    return heap.size;
}

// ------------ TEST ---------------
int main() {
    int a[] = {0, 30};
    int b[] = {5, 10};
    int c[] = {15, 20};
    int *intervals[] = {a, b, c};

    int rooms = minMeetingRooms(intervals, 3);
    printf("Minimum rooms required: %d\n", rooms);   // Expected: 2

    return 0;
}
`
  }
},

//question 8

{
  q: "Substrings With K Distinct Characters",
  difficulty: "Medium",
  tags: ["Sliding Window", "HashMap", "Two Pointers", "Amazon-OA"],

  a: "Use a sliding window with a HashMap. Expand the right pointer and track frequencies. When distinct characters exceed K, shrink the window from the left. Count valid substrings for each right pointer when window contains exactly K distinct characters.",

  steps: [
    "Initialize left=0 and HashMap freq",
    "Iterate right pointer over string",
    "Add s[right] to freq",
    "If freq size > K → shrink window by moving left pointer",
    "If freq size == K:",
    "   - Count valid substrings ending at right",
    "Continue until end of string"
  ],

  examples: [
    {
      input: "s='pqpqs', k=2",
      output: "7"
    },
    {
      input: "s='aabab', k=3",
      output: "0"
    }
  ],

  complexity: {
    time: "O(n)",
    space: "O(k)"
  },

  codes: {
    python:
`def substrKDistinct(s, k):
    def atMost(k):
        freq = {}
        left = 0
        count = 0
        for right, c in enumerate(s):
            freq[c] = freq.get(c, 0) + 1
            while len(freq) > k:
                freq[s[left]] -= 1
                if freq[s[left]] == 0:
                    del freq[s[left]]
                left += 1
            count += right - left + 1
        return count
    return atMost(k) - atMost(k-1)`,
    
    cpp:
`int atMost(string s, int k) {
    unordered_map<char,int> mp;
    int left = 0, ans = 0;
    for(int right = 0; right < s.size(); right++){
        mp[s[right]]++;
        while(mp.size() > k){
            mp[s[left]]--;
            if(mp[s[left]] == 0) mp.erase(s[left]);
            left++;
        }
        ans += right - left + 1;
    }
    return ans;
}

int substrKDistinct(string s, int k) {
    return atMost(s, k) - atMost(s, k-1);
}`,

    java:
`class Solution {
    private int atMost(String s, int k) {
        Map<Character,Integer> map = new HashMap<>();
        int left = 0, ans = 0;
        for (int right = 0; right < s.length(); right++) {
            map.put(s.charAt(right), map.getOrDefault(s.charAt(right), 0) + 1);
            while (map.size() > k) {
                char c = s.charAt(left);
                map.put(c, map.get(c) - 1);
                if (map.get(c) == 0) map.remove(c);
                left++;
            }
            ans += right - left + 1;
        }
        return ans;
    }

    public int substrKDistinct(String s, int k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
}`,

    c:
`#include <stdio.h>
#include <string.h>

int atMost(char *s, int k) {
    int freq[256] = {0};
    int left = 0, count = 0;
    int distinct = 0;
    int n = strlen(s);

    for (int right = 0; right < n; right++) {
        unsigned char c = s[right];

        if (freq[c] == 0)
            distinct++;

        freq[c]++;

        while (distinct > k) {
            unsigned char lc = s[left];
            freq[lc]--;
            if (freq[lc] == 0)
                distinct--;
            left++;
        }

        count += right - left + 1;
    }
    return count;
}

int substrKDistinct(char *s, int k) {
    if (k == 0) return 0;
    return atMost(s, k) - atMost(s, k - 1);
}

// ----------- TEST CODE -------------
int main() {
    char s1[] = "pqpqs";
    int k1 = 2;
    printf("Result 1: %d\n", substrKDistinct(s1, k1));   // Expected: 7

    char s2[] = "aabab";
    int k2 = 3;
    printf("Result 2: %d\n", substrKDistinct(s2, k2));   // Expected: 0

    return 0;
}
`
  }
},

//question 9

{
  q: "Amazon Fresh Promotion – Shopping Pattern Validation",
  difficulty: "Medium",
  tags: ["Pattern Matching", "Arrays", "Simulation", "Amazon-OA"],

  a: "Given a list of code groups and a list of items in the shopping cart, check if the customer wins the promotion. Each group must appear in order. 'anything' matches any item. Use two pointers to match each group against the cart sequentially.",

  steps: [
    "Initialize groupIndex = 0 and itemIndex = 0",
    "While groupIndex < numberOfGroups AND itemIndex < cartSize:",
    "   - Try matching current group with cart starting at itemIndex",
    "   - For each word in group:",
    "         If word == 'anything' OR matches cart → continue",
    "         Else → break (group not matched here)",
    "   - If entire group matched → move to next group",
    "   - Else → move itemIndex by 1",
    "At end: if all groups matched → return 1 else 0"
  ],

  examples: [
    {
      input: "codeList=[['apple','apple'],['banana','anything','banana']], cart=['orange','apple','apple','banana','grapes','banana']",
      output: "1"
    },
    {
      input: "codeList=[['apple','apple'],['banana','anything','banana']], cart=['banana','apple','apple','banana']",
      output: "0"
    }
  ],

  complexity: {
    time: "O(n * m)",
    space: "O(1)"
  },

  codes: {
    python:
`def freshPromotion(codeList, cart):
    if not codeList:
        return 1

    g = i = 0

    while g < len(codeList) and i < len(cart):
        group = codeList[g]
        k = 0
        j = i

        while j < len(cart) and k < len(group):
            if group[k] == "anything" or group[k] == cart[j]:
                k += 1
                j += 1
            else:
                break

        if k == len(group):
            g += 1
            i = j
        else:
            i += 1

    return 1 if g == len(codeList) else 0`,

    cpp:
`int freshPromotion(vector<vector<string>>& codeList, vector<string>& cart) {
    if (codeList.empty()) return 1;

    int g = 0, i = 0;

    while (g < codeList.size() && i < cart.size()) {
        auto &group = codeList[g];
        int k = 0, j = i;

        while (j < cart.size() && k < group.size()) {
            if (group[k] == "anything" || group[k] == cart[j]) {
                k++; j++;
            }
            else break;
        }

        if (k == group.size()) {
            g++;
            i = j;
        } else {
            i++;
        }
    }

    return g == codeList.size() ? 1 : 0;
}`,

    java:
`class Solution {
    public int freshPromotion(List<List<String>> codeList, String[] cart) {
        if (codeList.isEmpty()) return 1;

        int g = 0, i = 0;

        while (g < codeList.size() && i < cart.length) {
            List<String> group = codeList.get(g);
            int k = 0, j = i;

            while (j < cart.length && k < group.size()) {
                if (group.get(k).equals("anything") || group.get(k).equals(cart[j])) {
                    k++; j++;
                } else break;
            }

            if (k == group.size()) {
                g++;
                i = j;
            } else {
                i++;
            }
        }
        return g == codeList.size() ? 1 : 0;
    }
}`,

    c:
`#include <stdio.h>
#include <string.h>

// Compare a group with cart starting at index i
int matchGroup(char **group, int groupSize, char **cart, int cartSize, int startIndex) {
    int k = 0, j = startIndex;

    while (j < cartSize && k < groupSize) {
        if (strcmp(group[k], "anything") == 0 || strcmp(group[k], cart[j]) == 0) {
            k++;
            j++;
        } else {
            return -1; // group does not match here
        }
    }

    if (k == groupSize)
        return j; // return new cart index after matching group
    
    return -1; // incomplete match
}

// Main function
int freshPromotion(char ***codeList, int codeListSize, int *groupSizes,
                   char **cart, int cartSize) {

    if (codeListSize == 0)
        return 1;

    int g = 0; // index in codeList
    int i = 0; // index in cart

    while (g < codeListSize && i < cartSize) {
        int newIndex = matchGroup(codeList[g], groupSizes[g], cart, cartSize, i);

        if (newIndex != -1) {
            // group matched completely
            g++;
            i = newIndex;
        } else {
            // try matching at next cart position
            i++;
        }
    }

    return (g == codeListSize) ? 1 : 0;
}


// ---------------------- TEST -------------------------
int main() {
    // Example 1
    char *group1[] = {"apple", "apple"};
    char *group2[] = {"banana", "anything", "banana"};

    char **codeList[] = {group1, group2};
    int groupSizes[] = {2, 3};

    char *cart[] = {"orange","apple","apple","banana","grapes","banana"};

    int result = freshPromotion(codeList, 2, groupSizes, cart, 6);
    printf("Result: %d\n", result);  // Expected: 1

    return 0;
}
`
  }
},

//question 10

{
  q: "Shopping Patterns – Minimum Score of a Group of 3",
  difficulty: "Hard",
  tags: ["Graph", "HashMap", "Triangles", "Amazon-OA"],

  a: "You are given an undirected graph where each edge indicates two users made common purchases. Find all triangles (groups of 3 fully connected users). For each triangle (a,b,c), compute score = degree(a) + degree(b) + degree(c) - 6. Return the minimum score across all triangles. If no triangle exists, return -1.",

  steps: [
    "Build adjacency list for all users",
    "Also maintain degree for each user",
    "For each edge (u, v), ensure we iterate only smaller degree first",
    "Check intersection between neighbors(u) and neighbors(v)",
    "Each intersection node w forms a triangle (u, v, w)",
    "Compute score = deg(u) + deg(v) + deg(w) - 6",
    "Keep track of minimum score",
    "Return -1 if no triangle found, else minimum score"
  ],

  examples: [
    {
      input: "n=6, edges=[[1,2],[2,3],[3,1],[4,5],[5,6]]",
      output: "0  // triangle is (1,2,3), each degree=2, so 2+2+2-6 = 0"
    },
    {
      input: "n=4, edges=[[1,2],[2,3],[3,4]]",
      output: "-1 // no triangle"
    }
  ],

  complexity: {
    time: "O(E * sqrt(V))  (optimized triangle search)",
    space: "O(V + E)"
  },

  codes: {
    python:
`from collections import defaultdict

def shoppingPatterns(n, edges):
    adj = defaultdict(set)
    deg = [0] * (n + 1)

    for u, v in edges:
        adj[u].add(v)
        adj[v].add(u)
        deg[u] += 1
        deg[v] += 1

    ans = float('inf')

    for u, v in edges:
        # iterate smaller degree neighbor first
        if len(adj[u]) > len(adj[v]):
            u, v = v, u
        
        # intersection gives triangles
        for w in adj[u]:
            if w in adj[v]:
                score = deg[u] + deg[v] + deg[w] - 6
                ans = min(ans, score)

    return ans if ans != float('inf') else -1`,

    cpp:
`int shoppingPatterns(int n, vector<vector<int>>& edges) {
    vector<unordered_set<int>> adj(n+1);
    vector<int> deg(n+1, 0);

    for(auto &e : edges){
        int u = e[0], v = e[1];
        adj[u].insert(v);
        adj[v].insert(u);
        deg[u]++; deg[v]++;
    }

    int ans = INT_MAX;

    for(auto &e : edges){
        int u = e[0], v = e[1];

        if(adj[u].size() > adj[v].size())
            swap(u, v);

        for(int w : adj[u]){
            if(adj[v].count(w)){
                int score = deg[u] + deg[v] + deg[w] - 6;
                ans = min(ans, score);
            }
        }
    }
    return ans == INT_MAX ? -1 : ans;
}`,

    java:
`class Solution {
    public int shoppingPatterns(int n, int[][] edges) {
        List<Set<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new HashSet<>());

        int[] deg = new int[n + 1];

        for (int[] e : edges) {
            int u = e[0], v = e[1];
            adj.get(u).add(v);
            adj.get(v).add(u);
            deg[u]++; deg[v]++;
        }

        int ans = Integer.MAX_VALUE;

        for (int[] e : edges) {
            int u = e[0], v = e[1];
            if (adj.get(u).size() > adj.get(v).size()) {
                int t = u; u = v; v = t;
            }

            for (int w : adj.get(u)) {
                if (adj.get(v).contains(w)) {
                    int score = deg[u] + deg[v] + deg[w] - 6;
                    ans = Math.min(ans, score);
                }
            }
        }
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}`,

    c:
`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int shoppingPatterns(int n, int edges[][2], int edgesSize) {
    // adjacency list using int** with dynamic arrays
    int **adj = malloc((n + 1) * sizeof(int *));
    int *adjSize = calloc(n + 1, sizeof(int));
    int *deg = calloc(n + 1, sizeof(int));

    // initialize empty adjacency lists
    for (int i = 0; i <= n; i++) {
        adj[i] = malloc((n + 1) * sizeof(int)); // upper bound
        adjSize[i] = 0;
    }

    // Build graph
    for (int i = 0; i < edgesSize; i++) {
        int u = edges[i][0];
        int v = edges[i][1];

        adj[u][adjSize[u]++] = v;
        adj[v][adjSize[v]++] = u;

        deg[u]++;
        deg[v]++;
    }

    int ans = 1e9; // infinity substitute

    // Enumerate each edge like Python
    for (int i = 0; i < edgesSize; i++) {
        int u = edges[i][0];
        int v = edges[i][1];

        // swap to ensure smaller-degree node first
        if (deg[u] > deg[v]) {
            int tmp = u; u = v; v = tmp;
        }

        // For each neighbor w of u, check if w is also neighbor of v
        for (int x = 0; x < adjSize[u]; x++) {
            int w = adj[u][x];

            // Check if v and w are connected
            for (int y = 0; y < adjSize[v]; y++) {
                if (adj[v][y] == w) {
                    int score = deg[u] + deg[v] + deg[w] - 6;
                    if (score < ans) ans = score;
                }
            }
        }
    }

    // Free memory
    for (int i = 0; i <= n; i++)
        free(adj[i]);
    free(adj);
    free(adjSize);
    free(deg);

    return (ans == 1e9) ? -1 : ans;
}


// -------------------- TEST CODE -------------------------
int main() {
    int n = 6;
    int edges[][2] = {
        {1,2}, {2,3}, {3,1},   // triangle
        {4,5}, {5,6}           // no triangle here
    };
    int edgesSize = 5;

    printf("Minimum score: %d\n", shoppingPatterns(n, edges, edgesSize));
    return 0;
}
`
  }
}


];
