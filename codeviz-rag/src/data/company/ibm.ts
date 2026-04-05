import { QAItem } from "./types";
export const IBM_QA: QAItem[] = [
//question 1
    {
  "q": "Given a singly linked list, reverse the list and return the new head.",
  "difficulty": "Easy",
  "tags": ["Linked List", "Iteration"],

  "a": "Use three pointers: prev, curr, next. Traverse through the list and reverse each link one by one.",

  "steps": [
    "Initialize prev = null and curr = head.",
    "Loop until curr becomes null:",
    "    • Save curr.next in nxt.",
    "    • Set curr.next = prev to reverse the pointer.",
    "    • Move prev = curr.",
    "    • Move curr = nxt.",
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
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

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

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

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
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;

    while (curr != NULL) {
        struct ListNode* nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}

int main() {
    struct ListNode a = {1, NULL};
    struct ListNode b = {2, NULL};
    struct ListNode c = {3, NULL};
    a.next = &b;
    b.next = &c;

    struct ListNode* result = reverseList(&a);
    while (result) {
        printf("%d ", result->val);
        result = result->next;
    }
    return 0;
}`
  }
},

//question 2

{
  "q": "Given the head of a linked list, determine if the linked list has a cycle in it. A cycle occurs when a node’s next pointer points to a previous node.",
  "difficulty": "Easy",
  "tags": ["Linked List", "Two Pointers", "Cycle Detection"],

  "a": "Use Floyd’s Cycle Detection (Tortoise and Hare). Move one pointer by 1 and another by 2. If they ever meet, a cycle exists.",

  "steps": [
    "Initialize two pointers: slow = head, fast = head.",
    "Move slow by 1 step and fast by 2 steps in each iteration.",
    "If fast or fast.next becomes null → no cycle.",
    "If slow == fast at any moment → cycle found.",
    "Return true if a cycle exists, false otherwise."
  ],

  "examples": [
    { "input": "[3,2,0,-4], pos = 1", "output": "true" },
    { "input": "[1], pos = -1", "output": "false" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def hasCycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) return true;
    }
    return false;
}`,

    "java":
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast)
                return true;
        }
        return false;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

int hasCycle(struct ListNode* head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast)
            return 1;
    }
    return 0;
}

int main() {
    struct ListNode a = {3, NULL};
    struct ListNode b = {2, NULL};
    struct ListNode c = {0, NULL};
    struct ListNode d = {-4, NULL};

    a.next = &b;
    b.next = &c;
    c.next = &d;
    d.next = &b; // cycle

    printf("%s\\n", hasCycle(&a) ? "true" : "false");

    return 0;
}`
  }
},
//question 3


{
  "q": "Given the heads of two sorted linked lists, merge them into a single sorted linked list and return its head.",
  "difficulty": "Easy",
  "tags": ["Linked List", "Two Pointers"],

  "a": "Use two pointers to compare nodes from both lists and build a merged list. Always attach the smaller node and move that list’s pointer forward.",

  "steps": [
    "Create a dummy node to serve as the starting point.",
    "Maintain a tail pointer that builds the new list.",
    "While both lists are non-empty:",
    "    • Compare l1.val and l2.val.",
    "    • Attach the smaller node to tail.",
    "    • Move the pointer of the chosen list.",
    "Attach the remaining list if one becomes empty.",
    "Return dummy.next as the final merged head."
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

    tail.next = l1 or l2
    return dummy.next`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

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
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

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

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode dummy;
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

    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

int main() {
    struct ListNode a = {1, NULL};
    struct ListNode b = {2, NULL};
    struct ListNode c = {4, NULL};
    a.next = &b; b.next = &c;

    struct ListNode d = {1, NULL};
    struct ListNode e = {3, NULL};
    struct ListNode f = {4, NULL};
    d.next = &e; e.next = &f;

    struct ListNode* res = mergeTwoLists(&a, &d);
    while (res) {
        printf("%d ", res->val);
        res = res->next;
    }
    return 0;
}`
  }
},
//question 4


{
  "q": "Given the head of a linked list, remove the nth node from the end of the list and return the updated head.",
  "difficulty": "Medium",
  "tags": ["Linked List", "Two Pointers"],

  "a": "Use two pointers with a gap of n. Move fast pointer n steps ahead, then move both slow and fast until fast reaches null. Slow will be just before the node to delete.",

  "steps": [
    "Create a dummy node pointing to head.",
    "Set slow = dummy, fast = dummy.",
    "Move fast forward n steps.",
    "Move both pointers until fast reaches the end.",
    "Delete slow.next.",
    "Return dummy.next."
  ],

  "examples": [
    { "input": "[1,2,3,4,5], n = 2", "output": "[1,2,3,5]" },
    { "input": "[1], n = 1", "output": "[]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy

    for _ in range(n):
        fast = fast.next

    while fast.next:
        slow = slow.next
        fast = fast.next

    slow.next = slow.next.next
    return dummy.next`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;

    ListNode* slow = &dummy;
    ListNode* fast = &dummy;

    for (int i = 0; i < n; i++)
        fast = fast->next;

    while (fast->next) {
        slow = slow->next;
        fast = fast->next;
    }

    slow->next = slow->next->next;
    return dummy.next;
}`,

    "java":
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode slow = dummy;
        ListNode fast = dummy;

        for (int i = 0; i < n; i++)
            fast = fast.next;

        while (fast.next != null) {
            slow = slow.next;
            fast = fast.next;
        }

        slow.next = slow.next.next;

        return dummy.next;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    struct ListNode dummy;
    dummy.next = head;

    struct ListNode* slow = &dummy;
    struct ListNode* fast = &dummy;

    for (int i = 0; i < n; i++)
        fast = fast->next;

    while (fast->next) {
        slow = slow->next;
        fast = fast->next;
    }

    slow->next = slow->next->next;
    return dummy.next;
}

int main() {
    struct ListNode a = {1,NULL};
    struct ListNode b = {2,NULL};
    struct ListNode c = {3,NULL};
    struct ListNode d = {4,NULL};
    struct ListNode e = {5,NULL};

    a.next = &b; b.next = &c; c.next = &d; d.next = &e;

    struct ListNode* res = removeNthFromEnd(&a, 2);
    while (res) {
        printf("%d ", res->val);
        res = res->next;
    }
    return 0;
}`
  }
},
//question 5
{
  "q": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return the sum as a linked list.",
  "difficulty": "Medium",
  "tags": ["Linked List", "Math"],

  "a": "Traverse both lists while adding corresponding digits along with carry. Create new nodes as you go. If carry remains at the end, append a new node.",

  "steps": [
    "Create a dummy node and a current pointer.",
    "Initialize carry = 0.",
    "Loop while l1 or l2 or carry exists:",
    "    • Extract values x and y from the nodes.",
    "    • Compute sum = x + y + carry.",
    "    • Update carry = sum // 10.",
    "    • Create a new node with value sum % 10.",
    "    • Move pointers forward.",
    "Return dummy.next."
  ],

  "examples": [
    { "input": "l1 = [2,4,3], l2 = [5,6,4]", "output": "[7,0,8]" },
    { "input": "l1 = [0], l2 = [0]", "output": "[0]" }
  ],

  "complexity": {
    "time": "O(max(n, m))",
    "space": "O(max(n, m))"
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
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0

        total = x + y + carry
        carry = total // 10

        curr.next = ListNode(total % 10)
        curr = curr.next

        if l1: l1 = l1.next
        if l2: l2 = l2.next

    return dummy.next`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;

    while (l1 || l2 || carry) {
        int x = l1 ? l1->val : 0;
        int y = l2 ? l2->val : 0;

        int sum = x + y + carry;
        carry = sum / 10;

        curr->next = new ListNode(sum % 10);
        curr = curr->next;

        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }

    return dummy.next;
}`,

    "java":
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry > 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;

            int sum = x + y + carry;
            carry = sum / 10;

            curr.next = new ListNode(sum % 10);
            curr = curr.next;

            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        return dummy.next;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* newNode(int x) {
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = x;
    node->next = NULL;
    return node;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode dummy;
    dummy.next = NULL;
    struct ListNode* curr = &dummy;
    int carry = 0;

    while (l1 || l2 || carry) {
        int x = l1 ? l1->val : 0;
        int y = l2 ? l2->val : 0;

        int total = x + y + carry;
        carry = total / 10;

        curr->next = newNode(total % 10);
        curr = curr->next;

        if (l1) l1 = l1->next;
        if (l2) l2 = l2->next;
    }

    return dummy.next;
}

int main() {
    struct ListNode a = {2,NULL};
    struct ListNode b = {4,NULL};
    struct ListNode c = {3,NULL};
    a.next = &b; b.next = &c;

    struct ListNode d = {5,NULL};
    struct ListNode e = {6,NULL};
    struct ListNode f = {4,NULL};
    d.next = &e; e.next = &f;

    struct ListNode* res = addTwoNumbers(&a, &d);
    while (res) {
        printf("%d ", res->val);
        res = res->next;
    }
    return 0;
}`
  }
},

//question 6


{
  "q": "Given the head of a linked list, determine whether the list is a palindrome.",
  "difficulty": "Medium",
  "tags": ["Linked List", "Two Pointers", "Reversing"],

  "a": "Find the middle of the list using slow and fast pointers. Reverse the second half and compare both halves.",

  "steps": [
    "Use slow and fast pointers to reach the middle.",
    "Reverse the second half of the list.",
    "Compare values from head and reversed half.",
    "If all values match → palindrome.",
    "Return true or false."
  ],

  "examples": [
    { "input": "[1,2,2,1]", "output": "true" },
    { "input": "[1,2]", "output": "false" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

def isPalindrome(head):
    if not head or not head.next:
        return True

    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    second = reverseList(slow)

    first = head
    while second:
        if first.val != second.val:
            return False
        first = first.next
        second = second.next

    return True`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

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
}

bool isPalindrome(ListNode* head) {
    if (!head || !head->next) return true;

    ListNode *slow = head, *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    ListNode* second = reverseList(slow);
    ListNode* first = head;

    while (second) {
        if (first->val != second->val) return false;
        first = first->next;
        second = second->next;
    }

    return true;
}`,

    "java":
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    private ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }

    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        ListNode slow = head, fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode second = reverseList(slow);
        ListNode first = head;

        while (second != null) {
            if (first.val != second.val)
                return false;
            first = first.next;
            second = second.next;
        }

        return true;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

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
}

int isPalindrome(struct ListNode* head) {
    if (!head || !head->next) return 1;

    struct ListNode *slow = head, *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    struct ListNode* second = reverseList(slow);
    struct ListNode* first = head;

    while (second) {
        if (first->val != second->val)
            return 0;
        first = first->next;
        second = second->next;
    }

    return 1;
}

int main() {
    struct ListNode a = {1,NULL};
    struct ListNode b = {2,NULL};
    struct ListNode c = {2,NULL};
    struct ListNode d = {1,NULL};

    a.next = &b; b.next = &c; c.next = &d;

    printf("%s\\n", isPalindrome(&a) ? "true" : "false");
    return 0;
}`
  }
},

//question 7


{
  "q": "Given the heads of two singly linked lists, return the node at which the two lists intersect. If the two linked lists have no intersection, return null.",
  "difficulty": "Medium",
  "tags": ["Linked List", "Two Pointers"],

  "a": "Use two pointers p1 and p2. Move each through their list. When one reaches the end, redirect it to the other list’s head. They will meet at the intersection or null.",

  "steps": [
    "Initialize p1 = headA and p2 = headB.",
    "Move both pointers forward.",
    "When p1 reaches null, set p1 = headB.",
    "When p2 reaches null, set p2 = headA.",
    "Continue until p1 == p2.",
    "Return p1 (which may be null if no intersection)."
  ],

  "examples": [
    { "input": "A = [4,1,8,4,5], B = [5,6,1,8,4,5], intersection = 8", "output": "Node with value 8" },
    { "input": "A = [2,6,4], B = [1,5], intersection = null", "output": "null" }
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

def getIntersectionNode(headA, headB):
    if not headA or not headB:
        return None

    p1, p2 = headA, headB

    while p1 != p2:
        p1 = p1.next if p1 else headB
        p2 = p2.next if p2 else headA

    return p1`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    if (!headA || !headB) return NULL;

    ListNode* p1 = headA;
    ListNode* p2 = headB;

    while (p1 != p2) {
        p1 = p1 ? p1->next : headB;
        p2 = p2 ? p2->next : headA;
    }

    return p1;
}`,

    "java":
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;

        ListNode p1 = headA;
        ListNode p2 = headB;

        while (p1 != p2) {
            p1 = (p1 != null) ? p1.next : headB;
            p2 = (p2 != null) ? p2.next : headA;
        }

        return p1;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* getIntersectionNode(struct ListNode* headA, struct ListNode* headB) {
    if (!headA || !headB) return NULL;

    struct ListNode* p1 = headA;
    struct ListNode* p2 = headB;

    while (p1 != p2) {
        p1 = p1 ? p1->next : headB;
        p2 = p2 ? p2->next : headA;
    }

    return p1;
}

int main() {
    struct ListNode a1 = {4,NULL};
    struct ListNode a2 = {1,NULL};
    struct ListNode c1 = {8,NULL};
    struct ListNode c2 = {4,NULL};
    struct ListNode c3 = {5,NULL};

    a1.next = &a2; a2.next = &c1;
    c1.next = &c2; c2.next = &c3;

    struct ListNode b1 = {5,NULL};
    struct ListNode b2 = {6,NULL};
    struct ListNode b3 = {1,NULL};

    b1.next = &b2; b2.next = &b3; b3.next = &c1;

    struct ListNode* res = getIntersectionNode(&a1, &b1);
    if (res) printf("%d\\n", res->val);
    else printf("null\\n");

    return 0;
}`
  }
},

//question 8

{
  "q": "You are given a multilevel doubly linked list. Each node contains next, prev, and child pointers. Flatten the list so that all nodes appear in a single-level doubly linked list.",
  "difficulty": "Medium",
  "tags": ["Linked List", "DFS", "Stack"],

  "a": "Use DFS or a stack. Whenever a node has a child, insert the child list between the node and its next pointer, and continue flattening recursively.",

  "steps": [
    "Traverse the list using a pointer.",
    "If the current node has a child:",
    "    • Save next node.",
    "    • Connect current.next to child and set child.prev = current.",
    "    • Flatten the child list recursively.",
    "    • Connect the tail of the child list back to the saved next node.",
    "Continue until all children are processed."
  ],

  "examples": [
    { "input": "1 - 2 - 3, node 2 has child [4 - 5]", "output": "1 - 2 - 4 - 5 - 3" },
    { "input": "1 has child [2 has child [3]]", "output": "1 - 2 - 3" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(n) recursion or stack"
  },

  "codes": {
    "python":
`class Node:
    def __init__(self, val, prev=None, next=None, child=None):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child

def flatten(head):
    if not head:
        return head

    def dfs(node):
        curr = node
        last = None

        while curr:
            nxt = curr.next

            if curr.child:
                child_head = curr.child
                child_tail = dfs(child_head)

                curr.next = child_head
                child_head.prev = curr
                curr.child = None

                if nxt:
                    child_tail.next = nxt
                    nxt.prev = child_tail

                last = child_tail
                curr = child_tail
            else:
                last = curr

            curr = curr.next
        return last

    dfs(head)
    return head`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int val;
    Node* prev;
    Node* next;
    Node* child;

    Node(int _val) {
        val = _val;
        prev = next = child = NULL;
    }
};

Node* dfs(Node* head) {
    Node* curr = head;
    Node* last = head;

    while (curr) {
        Node* nxt = curr->next;

        if (curr->child) {
            Node* childHead = curr->child;
            Node* childTail = dfs(childHead);

            curr->next = childHead;
            childHead->prev = curr;
            curr->child = NULL;

            if (nxt) {
                childTail->next = nxt;
                nxt->prev = childTail;
            }
            last = childTail;
        } else {
            last = curr;
        }

        curr = nxt;
    }
    return last;
}

Node* flatten(Node* head) {
    if (!head) return head;
    dfs(head);
    return head;
}`,

    "java":
`class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
    public Node(int v) { val = v; }
}

class Solution {
    private Node dfs(Node node) {
        Node curr = node;
        Node last = node;

        while (curr != null) {
            Node nxt = curr.next;

            if (curr.child != null) {
                Node childHead = curr.child;
                Node childTail = dfs(childHead);

                curr.next = childHead;
                childHead.prev = curr;
                curr.child = null;

                if (nxt != null) {
                    childTail.next = nxt;
                    nxt.prev = childTail;
                }

                last = childTail;
                curr = childTail;
            } else {
                last = curr;
            }
            curr = curr.next;
        }
        return last;
    }

    public Node flatten(Node head) {
        if (head == null) return head;
        dfs(head);
        return head;
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* prev;
    struct Node* next;
    struct Node* child;
};

struct Node* dfs(struct Node* head) {
    struct Node* curr = head;
    struct Node* last = head;

    while (curr) {
        struct Node* nxt = curr->next;

        if (curr->child) {
            struct Node* childHead = curr->child;
            struct Node* childTail = dfs(childHead);

            curr->next = childHead;
            childHead->prev = curr;
            curr->child = NULL;

            if (nxt) {
                childTail->next = nxt;
                nxt->prev = childTail;
            }

            last = childTail;
            curr = childTail;
        } else {
            last = curr;
        }

        curr = curr->next;
    }
    return last;
}

struct Node* flatten(struct Node* head) {
    if (!head) return head;
    dfs(head);
    return head;
}`
  }
},
//question 9

{
  "q": "Given the head of a singly linked list, reorder it to follow the pattern: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...",
  "difficulty": "Medium",
  "tags": ["Linked List", "Two Pointers", "Reversing"],

  "a": "Find middle using slow-fast pointers, reverse the second half, then merge the two halves by alternating nodes.",

  "steps": [
    "Use slow and fast pointers to find the middle of the list.",
    "Reverse the second half of the list.",
    "Merge the first half and reversed second half in alternating manner.",
    "Stop when the second list becomes null."
  ],

  "examples": [
    { "input": "[1,2,3,4]", "output": "[1,4,2,3]" },
    { "input": "[1,2,3,4,5]", "output": "[1,5,2,4,3]" }
  ],

  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  },

  "codes": {
    "python":
`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

def reorderList(head):
    if not head or not head.next: 
        return

    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    second = reverseList(slow)
    first = head

    while second.next:
        tmp1 = first.next
        tmp2 = second.next

        first.next = second
        second.next = tmp1

        first = tmp1
        second = tmp2`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x): val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    while (head) {
        ListNode* nxt = head->next;
        head->next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}

void reorderList(ListNode* head) {
    if (!head || !head->next) return;

    ListNode *slow = head, *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    ListNode* second = reverseList(slow);
    ListNode* first = head;

    while (second->next) {
        ListNode* t1 = first->next;
        ListNode* t2 = second->next;

        first->next = second;
        second->next = t1;

        first = t1;
        second = t2;
    }
}`,

    "java":
`class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {

    private ListNode reverseList(ListNode head) {
        ListNode prev = null;
        while (head != null) {
            ListNode nxt = head.next;
            head.next = prev;
            prev = head;
            head = nxt;
        }
        return prev;
    }

    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;

        ListNode slow = head, fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode second = reverseList(slow);
        ListNode first = head;

        while (second.next != null) {
            ListNode t1 = first.next;
            ListNode t2 = second.next;

            first.next = second;
            second.next = t1;

            first = t1;
            second = t2;
        }
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    while (head) {
        struct ListNode* nxt = head->next;
        head->next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}

void reorderList(struct ListNode* head) {
    if (!head || !head->next) return;

    struct ListNode *slow = head, *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    struct ListNode* second = reverseList(slow);
    struct ListNode* first = head;

    while (second->next) {
        struct ListNode* t1 = first->next;
        struct ListNode* t2 = second->next;

        first->next = second;
        second->next = t1;

        first = t1;
        second = t2;
    }
}

int main() {
    struct ListNode a = {1,NULL};
    struct ListNode b = {2,NULL};
    struct ListNode c = {3,NULL};
    struct ListNode d = {4,NULL};

    a.next = &b; b.next = &c; c.next = &d;

    reorderList(&a);

    struct ListNode* p = &a;
    while (p) {
        printf("%d ", p->val);
        p = p->next;
    }
    return 0;
}`
  }
},

//question 10


{
  "q": "Design a data structure that follows the constraints of an LRU (Least Recently Used) Cache. Implement get(key) and put(key, value) both in O(1) time.",
  "difficulty": "Hard",
  "tags": ["Design", "HashMap", "Doubly Linked List"],

  "a": "Use a HashMap for fast lookup and a doubly linked list to store order of usage. Most recently used moves to the front. Least recently used is removed from the tail.",

  "steps": [
    "Use a doubly linked list to maintain usage order.",
    "Use a HashMap<Key, Node*> for O(1) node access.",
    "On get(key):",
    "    • If key not found → return -1.",
    "    • Move node to the head of the list.",
    "On put(key, value):",
    "    • If key exists, update value and move node to head.",
    "    • If cache is full, remove the tail node (LRU).",
    "    • Insert the new node at the head."
  ],

  "examples": [
    { "input": "put(1,1), put(2,2), get(1)", "output": "1" },
    { "input": "put(1,1), put(2,2), put(3,3) when capacity=2", "output": "Evicts key 2" }
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
        self.capacity = capacity
        self.map = {}
        
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def remove(self, node):
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def insert_at_front(self, node):
        n = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = n
        n.prev = node

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        node = self.map[key]
        self.remove(node)
        self.insert_at_front(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self.remove(self.map[key])
        node = Node(key, value)
        self.insert_at_front(node)
        self.map[key] = node

        if len(self.map) > self.capacity:
            lru = self.tail.prev
            self.remove(lru)
            del self.map[lru.key]`,

    "cpp":
`#include <bits/stdc++.h>
using namespace std;

struct Node {
    int key, val;
    Node* prev;
    Node* next;
    Node(int k, int v): key(k), val(v), prev(NULL), next(NULL) {}
};

class LRUCache {
public:
    int cap;
    unordered_map<int, Node*> mp;
    Node *head, *tail;

    LRUCache(int capacity) {
        cap = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    void remove(Node* node) {
        Node* p = node->prev;
        Node* n = node->next;
        p->next = n;
        n->prev = p;
    }

    void insertFront(Node* node) {
        Node* n = head->next;
        head->next = node;
        node->prev = head;
        node->next = n;
        n->prev = node;
    }

    int get(int key) {
        if (!mp.count(key)) return -1;
        Node* node = mp[key];
        remove(node);
        insertFront(node);
        return node->val;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            remove(mp[key]);
        }
        Node* node = new Node(key, value);
        insertFront(node);
        mp[key] = node;

        if (mp.size() > cap) {
            Node* lru = tail->prev;
            remove(lru);
            mp.erase(lru->key);
        }
    }
};`,

    "java":
`import java.util.*;

class Node {
    int key, val;
    Node prev, next;
    Node(int k, int v) { key = k; val = v; }
}

class LRUCache {
    private int cap;
    private Map<Integer, Node> map;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.cap = capacity;
        map = new HashMap<>();

        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertFront(Node node) {
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
        insertFront(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }

        Node node = new Node(key, value);
        insertFront(node);
        map.put(key, node);

        if (map.size() > cap) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
}`,

    "c":
`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key, val;
    struct Node* prev;
    struct Node* next;
};

struct LRUCache {
    int capacity;
    int size;
    struct Node* head;
    struct Node* tail;
    struct Node** map;
};

struct Node* newNode(int key, int val) {
    struct Node* n = malloc(sizeof(struct Node));
    n->key = key;
    n->val = val;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

struct LRUCache* lRUCacheCreate(int capacity) {
    struct LRUCache* c = malloc(sizeof(struct LRUCache));
    c->capacity = capacity;
    c->size = 0;
    c->map = calloc(10000, sizeof(struct Node*));

    c->head = newNode(0, 0);
    c->tail = newNode(0, 0);

    c->head->next = c->tail;
    c->tail->prev = c->head;

    return c;
}

void removeNode(struct Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

void insertFront(struct LRUCache* c, struct Node* node) {
    struct Node* n = c->head->next;
    c->head->next = node;
    node->prev = c->head;
    node->next = n;
    n->prev = node;
}

int lRUCacheGet(struct LRUCache* c, int key) {
    struct Node* node = c->map[key];
    if (!node) return -1;

    removeNode(node);
    insertFront(c, node);
    return node->val;
}

void lRUCachePut(struct LRUCache* c, int key, int value) {
    if (c->map[key]) {
        removeNode(c->map[key]);
    }

    struct Node* node = newNode(key, value);
    insertFront(c, node);
    c->map[key] = node;

    if (c->size < c->capacity) {
        c->size++;
    } else {
        struct Node* lru = c->tail->prev;
        removeNode(lru);
        c->map[lru->key] = NULL;
        free(lru);
    }
}`
  }
}









];
