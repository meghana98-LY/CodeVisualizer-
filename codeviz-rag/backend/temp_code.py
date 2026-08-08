# -------------------------------
# 1. Array (List in Python)
# -------------------------------
arr = [10, 20, 30, 40]
print("Array:", arr)
arr.append(50)
arr.remove(20)
print("Array after ops:", arr)

# -------------------------------
# 2. Linked List
# -------------------------------
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new = Node(data)
        new.next = self.head
        self.head = new

    def display(self):
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print()

ll = LinkedList()
ll.insert(10); ll.insert(20); ll.insert(30)
print("Linked List:")
ll.display()

# -------------------------------
# 3. Stack
# -------------------------------
stack = []
stack.append(10)
stack.append(20)
print("Stack pop:", stack.pop())

# -------------------------------
# 4. Queue
# -------------------------------
from collections import deque
queue = deque()
queue.append(10)
queue.append(20)
print("Queue dequeue:", queue.popleft())

# -------------------------------
# 5. Binary Tree
# -------------------------------
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None

def inorder(root):
    if root:
        inorder(root.left)
        print(root.data, end=" ")
        inorder(root.right)

root = TreeNode(10)
root.left = TreeNode(5)
root.right = TreeNode(15)
print("\nBinary Tree Inorder:")
inorder(root)
print()

# -------------------------------
# 6. Graph (Adjacency List)
# -------------------------------
graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"]
}
print("\nGraph neighbors of A:", graph["A"])

# -------------------------------
# 7. Heap (Priority Queue)
# -------------------------------
import heapq
heap = []
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
heapq.heappush(heap, 20)
print("Heap pop (min):", heapq.heappop(heap))

# -------------------------------
# 8. Hash Table (Dictionary)
# -------------------------------
hash_table = {}
hash_table["name"] = "Meghana"
hash_table["age"] = 22
print("Hash Table lookup:", hash_table["name"])

# -------------------------------
# 9. Set
# -------------------------------
s = {1, 2, 3}
s.add(4)
s.remove(2)
print("Set membership (3 in s):", 3 in s)