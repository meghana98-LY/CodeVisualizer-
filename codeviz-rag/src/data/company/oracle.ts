import { QAItem } from "./types";
export const Oracle_QA: QAItem[] = [
     //quetsion 1

     {
  "q": "Given a sorted array nums, remove the duplicates in-place such that each element appears only once. Return the new length.",
  "difficulty": "Easy",
  "tags": ["Array", "Two Pointers", "In-place"],

  "a": "Use a slow pointer to track the unique position. Traverse with a fast pointer; when nums[i] != nums[slow], increment slow and copy nums[i] to nums[slow].",

  "steps": [
    "If array empty, return 0.",
    "Initialize slow = 0.",
    "For i from 1 to n-1:",
    "   • If nums[i] != nums[slow], increment slow and write nums[i] to nums[slow].",
    "Return slow + 1."
  ],

  "examples": [
    { "input": "[1,1,2]", "output": "2 (array becomes [1,2,_])" },
    { "input": "[0,0,1,1,1,2,2,3,3,4]", "output": "5 ([0,1,2,3,4,_...])" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def removeDuplicates(nums):
    if not nums:
        return 0
    slow = 0
    for i in range(1, len(nums)):
        if nums[i] != nums[slow]:
            slow += 1
            nums[slow] = nums[i]
    return slow + 1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int slow = 0;

    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] != nums[slow]) {
            slow++;
            nums[slow] = nums[i];
        }
    }
    return slow + 1;
}`,

    "java":
`class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int slow = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[slow]) {
                slow++;
                nums[slow] = nums[i];
            }
        }
        return slow + 1;
    }
}`,

    "c":
`#include <stdio.h>

int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0;

    int slow = 0;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] != nums[slow]) {
            slow++;
            nums[slow] = nums[i];
        }
    }
    return slow + 1;
}

int main() {
    int nums[] = {1,1,2};
    int size = sizeof(nums)/sizeof(nums[0]);
    int newLen = removeDuplicates(nums, size);

    printf("New length: %d\\n", newLen);
    return 0;
}`
  }
},

    //quetsion 2

    {
  "q": "Given an array of strings, find the longest common prefix among them. If no common prefix exists, return an empty string.",
  "difficulty": "Easy",
  "tags": ["String"],

  "a": "Use the first string as reference. Compare character by character with all other strings, shrinking prefix when mismatch occurs.",

  "steps": [
    "If list empty, return empty string.",
    "Set prefix = first string.",
    "For each remaining string:",
    "   • While current string does not start with prefix:",
    "       - remove last character from prefix.",
    "   • If prefix becomes empty, break.",
    "Return prefix."
  ],

  "examples": [
    { "input": "[\"flower\",\"flow\",\"flight\"]", "output": "\"fl\"" },
    { "input": "[\"dog\",\"racecar\",\"car\"]", "output": "\"\"" }
  ],

  "complexity": {
    "time": "O(n * m)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def longestCommonPrefix(strs):
    if not strs:
        return ""

    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if prefix == "":
                return ""
    return prefix`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";

    string prefix = strs[0];

    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix.pop_back();
            if (prefix.empty()) return "";
        }
    }

    return prefix;
}`,

    "java":
`class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";

        String prefix = strs[0];

        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty())
                    return "";
            }
        }

        return prefix;
    }
}`,

    "c":
`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";

    char* prefix = malloc(1000);
    strcpy(prefix, strs[0]);

    for (int i = 1; i < strsSize; i++) {
        while (strncmp(strs[i], prefix, strlen(prefix)) != 0) {
            prefix[strlen(prefix) - 1] = '\\0';
            if (strlen(prefix) == 0)
                return prefix;
        }
    }

    return prefix;
}

int main() {
    char* arr[] = {"flower", "flow", "flight"};
    char* ans = longestCommonPrefix(arr, 3);
    printf("LCP: %s\\n", ans);
    free(ans);
    return 0;
}`
  }
},

    //quetsion 3
    

    {
  "q": "Given a string s containing only the characters '(', ')', '{', '}', '[' and ']', determine if the string is valid. A string is valid if brackets close in the correct order.",
  "difficulty": "Easy",
  "tags": ["Stack", "String"],

  "a": "Use a stack. Push each opening bracket. For every closing bracket, check if the stack top is the correct matching opening. If mismatch, return false. In the end, stack must be empty.",

  "steps": [
    "Initialize an empty stack.",
    "Traverse each character in the string:",
    "  • If '(', '{', '[' → push onto stack.",
    "  • If ')', '}', ']' → check if stack is non-empty and top matches.",
    "If mismatch or stack empty during closing bracket → return false.",
    "After loop, return true only if stack is empty."
  ],

  "examples": [
    { "input": "\"()\"", "output": "true" },
    { "input": "\"(]\"", "output": "false" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n)"
  },

  "codes": {
    "python":
`def isValid(s):
    stack = []
    pairs = {')':'(', '}':'{', ']':'['}

    for ch in s:
        if ch in '({[':
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()

    return len(stack) == 0`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char,char> mp = {{')','('}, {'}','{'}, {']','['}};

    for (char c : s) {
        if (c=='(' || c=='{' || c=='[') {
            st.push(c);
        } else {
            if (st.empty() || st.top() != mp[c])
                return false;
            st.pop();
        }
    }
    return st.empty();
}`,

    "java":
`import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        Map<Character,Character> mp = new HashMap<>();
        mp.put(')', '(');
        mp.put('}', '{');
        mp.put(']', '[');

        for (char c : s.toCharArray()) {
            if (mp.containsValue(c)) {
                st.push(c);
            } else {
                if (st.isEmpty() || st.peek() != mp.get(c))
                    return false;
                st.pop();
            }
        }
        return st.isEmpty();
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool isValid(char* s) {
    int len = 0;
    while (s[len] != '\\0') len++;

    char* stack = malloc(len);
    int top = -1;

    for (int i = 0; i < len; i++) {
        char c = s[i];

        if (c=='(' || c=='{' || c=='[') {
            stack[++top] = c;
        } else {
            if (top == -1) { free(stack); return false; }

            char open = stack[top--];

            if ((c == ')' && open != '(') ||
                (c == '}' && open != '{') ||
                (c == ']' && open != '[')) {
                free(stack);
                return false;
            }
        }
    }

    bool valid = (top == -1);
    free(stack);
    return valid;
}

int main() {
    char s[] = "()[]{}";
    printf("Valid: %s\\n", isValid(s) ? "true" : "false");
    return 0;
}`
  }
},

    //quetsion 4

    {
  "q": "Implement strStr(). Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
  "difficulty": "Easy",
  "tags": ["String", "Two Pointers"],

  "a": "Use sliding window: try to match needle starting at each index in haystack. Break early if remaining length is smaller than needle. Return first matching index.",

  "steps": [
    "If needle is empty return 0.",
    "Let n = len(haystack), m = len(needle).",
    "Loop i from 0 to n - m:",
    "   • Compare haystack[i : i+m] with needle.",
    "   • If match, return i.",
    "Return -1 if no match found."
  ],

  "examples": [
    { "input": "haystack = \"hello\", needle = \"ll\"", "output": "2" },
    { "input": "haystack = \"aaaaa\", needle = \"bba\"", "output": "-1" }
  ],

  "complexity": {
    "time": "O(n * m)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def strStr(haystack, needle):
    if needle == "":
        return 0

    n, m = len(haystack), len(needle)

    for i in range(n - m + 1):
        if haystack[i:i+m] == needle:
            return i
    return -1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;

    int n = haystack.size();
    int m = needle.size();

    for (int i = 0; i <= n - m; i++) {
        if (haystack.substr(i, m) == needle)
            return i;
    }
    return -1;
}`,

    "java":
`class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.length() == 0) return 0;

        int n = haystack.length();
        int m = needle.length();

        for (int i = 0; i <= n - m; i++) {
            if (haystack.substring(i, i + m).equals(needle))
                return i;
        }
        return -1;
    }
}`,

    "c":
`#include <stdio.h>
#include <string.h>

int strStr(char* haystack, char* needle) {
    if (needle[0] == '\\0')
        return 0;

    int n = strlen(haystack);
    int m = strlen(needle);

    for (int i = 0; i <= n - m; i++) {
        int match = 1;
        for (int j = 0; j < m; j++) {
            if (haystack[i + j] != needle[j]) {
                match = 0;
                break;
            }
        }
        if (match) return i;
    }

    return -1;
}

int main() {
    char hay[] = "hello";
    char needle[] = "ll";
    printf("Index: %d\\n", strStr(hay, needle)); // Output: 2
    return 0;
}`
  }
},

    //quetsion 5

    {
  "q": "Given an array nums, rotate the array to the right by k steps, where k is non-negative.",
  "difficulty": "Medium",
  "tags": ["Array", "Two Pointers", "Reversal"],

  "a": "Use the 3-step array reversal method: reverse entire array, reverse first k elements, reverse remaining n-k elements.",

  "steps": [
    "Normalize k = k % n.",
    "Reverse the entire array.",
    "Reverse the first k elements.",
    "Reverse the remaining part from k to n-1.",
    "Resulting array is rotated."
  ],

  "examples": [
    { "input": "nums=[1,2,3,4,5,6,7], k=3", "output": "[5,6,7,1,2,3,4]" },
    { "input": "nums=[-1,-100,3,99], k=2", "output": "[3,99,-1,-100]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def rotate(nums, k):
    n = len(nums)
    k %= n

    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

void reverseArr(vector<int>& nums, int l, int r) {
    while (l < r) swap(nums[l++], nums[r--]);
}

void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k %= n;

    reverseArr(nums, 0, n-1);
    reverseArr(nums, 0, k-1);
    reverseArr(nums, k, n-1);
}`,

    "java":
`class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;

        reverse(nums, 0, n-1);
        reverse(nums, 0, k-1);
        reverse(nums, k, n-1);
    }

    private void reverse(int[] arr, int l, int r) {
        while (l < r) {
            int temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++; r--;
        }
    }
}`,

    "c":
`#include <stdio.h>

void reverseArray(int* nums, int l, int r) {
    while (l < r) {
        int temp = nums[l];
        nums[l] = nums[r];
        nums[r] = temp;
        l++; r--;
    }
}

void rotate(int* nums, int numsSize, int k) {
    k %= numsSize;

    reverseArray(nums, 0, numsSize - 1);
    reverseArray(nums, 0, k - 1);
    reverseArray(nums, k, numsSize - 1);
}

int main() {
    int nums[] = {1,2,3,4,5,6,7};
    int n = 7;
    rotate(nums, n, 3);

    for (int i = 0; i < n; i++)
        printf("%d ", nums[i]); // Output: 5 6 7 1 2 3 4
    printf("\\n");

    return 0;
}`
  }
},

    //quetsion 6

    {
  "q": "Given an array nums and a value val, remove all instances of val in-place and return the new length. You must modify the array in-place.",
  "difficulty": "Easy",
  "tags": ["Array", "Two Pointers", "In-place"],

  "a": "Use a write pointer. Traverse array; if nums[i] != val, write nums[i] to nums[write], then increment write.",

  "steps": [
    "Initialize write = 0.",
    "For each index i in nums:",
    "    • If nums[i] != val → nums[write] = nums[i], write++.",
    "After loop, write is the new length.",
    "Array is modified in-place for first write elements."
  ],

  "examples": [
    { "input": "nums=[3,2,2,3], val=3", "output": "2 (nums becomes [2,2,_,_])" },
    { "input": "nums=[0,1,2,2,3,0,4,2], val=2", "output": "5" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def removeElement(nums, val):
    write = 0
    for num in nums:
        if num != val:
            nums[write] = num
            write += 1
    return write`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int removeElement(vector<int>& nums, int val) {
    int write = 0;
    for (int x : nums) {
        if (x != val)
            nums[write++] = x;
    }
    return write;
}`,

    "java":
`class Solution {
    public int removeElement(int[] nums, int val) {
        int write = 0;
        for (int x : nums) {
            if (x != val) {
                nums[write++] = x;
            }
        }
        return write;
    }
}`,

    "c":
`#include <stdio.h>

int removeElement(int* nums, int numsSize, int val) {
    int write = 0;

    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != val) {
            nums[write++] = nums[i];
        }
    }
    return write;
}

int main() {
    int nums[] = {3,2,2,3};
    int size = 4;

    int newLen = removeElement(nums, size, 3);

    printf("New length: %d\\n", newLen);  // Expected: 2

    for (int i = 0; i < newLen; i++)
        printf("%d ", nums[i]);
    printf("\\n");

    return 0;
}`
  }
},

    //quetsion 7

    {
  "q": "Given an array nums, find the majority element. The majority element is the element that appears more than n/2 times. It is guaranteed that a majority element always exists.",
  "difficulty": "Easy",
  "tags": ["Array", "Boyer-Moore"],

  "a": "Use Boyer-Moore Voting Algorithm: maintain a candidate and a counter. If count drops to 0, choose new candidate. Majority element is guaranteed to exist.",

  "steps": [
    "Initialize count = 0 and candidate = None.",
    "For each number:",
    "  • If count == 0, set candidate = number.",
    "  • If number == candidate, count++ else count--.",
    "Return candidate."
  ],

  "examples": [
    { "input": "[3,2,3]", "output": "3" },
    { "input": "[2,2,1,1,1,2,2]", "output": "2" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def majorityElement(nums):
    count = 0
    candidate = None

    for num in nums:
        if count == 0:
            candidate = num
        count += (1 if num == candidate else -1)

    return candidate`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int majorityElement(vector<int>& nums) {
    int count = 0;
    int candidate = 0;

    for (int x : nums) {
        if (count == 0)
            candidate = x;
        count += (x == candidate) ? 1 : -1;
    }

    return candidate;
}`,

    "java":
`class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;

        for (int x : nums) {
            if (count == 0)
                candidate = x;
            count += (x == candidate) ? 1 : -1;
        }

        return candidate;
    }
}`,

    "c":
`#include <stdio.h>

int majorityElement(int* nums, int numsSize) {
    int count = 0;
    int candidate = 0;

    for (int i = 0; i < numsSize; i++) {
        if (count == 0)
            candidate = nums[i];
        count += (nums[i] == candidate) ? 1 : -1;
    }

    return candidate;
}

int main() {
    int nums[] = {2,2,1,1,1,2,2};
    printf("Majority: %d\\n", majorityElement(nums, 7));
    return 0;
}`
  }
},

    //quetsion 8

{
  "q": "Given a sorted array of integers nums and a target value, return the index of target if found. If not found, return -1. Use binary search.",
  "difficulty": "Easy",
  "tags": ["Binary Search", "Array"],

  "a": "Use left, right pointers and mid = (left + right) // 2. If nums[mid] == target, return mid. If nums[mid] < target, search right half; else search left half.",

  "steps": [
    "Initialize left = 0, right = n - 1.",
    "While left <= right:",
    "   • mid = (left + right) // 2.",
    "   • If nums[mid] == target → return mid.",
    "   • If nums[mid] < target → left = mid + 1.",
    "   • Else → right = mid - 1.",
    "If loop ends → target not found → return -1."
  ],

  "examples": [
    { "input": "nums=[-1,0,3,5,9,12], target=9", "output": "4" },
    { "input": "nums=[-1,0,3,5,9,12], target=2", "output": "-1" }
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
        elif nums[mid] < target:
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

        if (nums[mid] == target)
            return mid;
        else if (nums[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
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
            else if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return -1;
    }
}`,

    "c":
`#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;

    while (left <= right) {
        int mid = (left + right) / 2;

        if (nums[mid] == target)
            return mid;
        else if (nums[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

int main() {
    int nums[] = {-1,0,3,5,9,12};
    printf("Index: %d\\n", search(nums, 6, 9)); // Expected: 4
    return 0;
}`
  }
},

    //quetsion 9


    {
  "q": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. Return the number of distinct ways to climb to the top.",
  "difficulty": "Easy",
  "tags": ["Dynamic Programming"],

  "a": "Use Fibonacci DP. ways[i] = ways[i-1] + ways[i-2]. Only the last two states are needed.",

  "steps": [
    "If n <= 2, return n.",
    "Initialize prev = 1, curr = 2.",
    "Loop from step 3 to n:",
    "    • next = prev + curr",
    "    • prev = curr",
    "    • curr = next",
    "Return curr."
  ],

  "examples": [
    { "input": "n = 2", "output": "2" },
    { "input": "n = 3", "output": "3" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`def climbStairs(n):
    if n <= 2:
        return n

    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    return curr`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) return n;

    int prev = 1, curr = 2;
    for (int i = 3; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}`,

    "java":
`class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;

        int prev = 1, curr = 2;

        for (int i = 3; i <= n; i++) {
            int next = prev + curr;
            prev = curr;
            curr = next;
        }

        return curr;
    }
}`,

    "c":
`#include <stdio.h>

int climbStairs(int n) {
    if (n <= 2)
        return n;

    int prev = 1, curr = 2;

    for (int i = 3; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }

    return curr;
}

int main() {
    printf("Ways: %d\\n", climbStairs(5)); // Expected: 8
    return 0;
}`
  }
},

    //quetsion 10

    {
  "q": "Merge two sorted linked lists and return the head of the merged sorted list.",
  "difficulty": "Easy",
  "tags": ["Linked List", "Two Pointers"],

  "a": "Use two pointers on both lists. Compare values and append the smaller node to the result. Continue until one list becomes empty. Append remaining nodes.",

  "steps": [
    "Create a dummy node to build the result list.",
    "Use a tail pointer to attach nodes.",
    "While both lists are non-empty:",
    "    • Compare list1.val and list2.val.",
    "    • Append the smaller to tail and move that list forward.",
    "After loop, append the remaining nodes from list1 or list2.",
    "Return dummy.next."
  ],

  "examples": [
    { "input": "l1 = [1,2,4], l2 = [1,3,4]", "output": "[1,1,2,3,4,4]" },
    { "input": "l1 = [], l2 = [0]", "output": "[0]" }
  ],

  "complexity": {
    "time": "O(n + m)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(l1, l2):
    dummy = ListNode()
    tail = dummy

    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    tail.next = l1 if l1 else l2
    return dummy.next`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

// struct ListNode {
//     int val;
//     ListNode *next;
//     ListNode(int x) : val(x), next(NULL) {}
// };

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (l1 && l2) {
        if (l1->val < l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }

    tail->next = l1 ? l1 : l2;

    return dummy.next;
}`,

    "java":
`// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }

        tail.next = (l1 != null) ? l1 : l2;

        return dummy.next;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

// struct ListNode {
//     int val;
//     struct ListNode* next;
// };

struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode dummy;
    dummy.val = 0;
    dummy.next = NULL;

    struct ListNode* tail = &dummy;

    while (l1 && l2) {
        if (l1->val < l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }

    tail->next = (l1 != NULL) ? l1 : l2;

    return dummy.next;
}

int main() {
    // Example manually created
    struct ListNode a = {1, NULL};
    struct ListNode b = {2, NULL};
    struct ListNode c = {4, NULL};
    a.next = &b; b.next = &c;

    struct ListNode x = {1, NULL};
    struct ListNode y = {3, NULL};
    struct ListNode z = {4, NULL};
    x.next = &y; y.next = &z;

    struct ListNode* result = mergeTwoLists(&a, &x);

    while (result) {
        printf("%d ", result->val);
        result = result->next;
    }
    printf("\\n");

    return 0;
}`
  }
}

];
