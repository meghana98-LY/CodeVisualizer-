
# Binary Tree Node
class Node:
    def __init__(self, key):
        self.val = key
        self.left = None
        self.right = None

# Insert into binary tree (level order)
def insert(root, key):
    if root is None:
        return Node(key)

    queue = [root]

    while queue:
        temp = queue.pop(0)

        if temp.left is None:
            temp.left = Node(key)
            return root
        else:
            queue.append(temp.left)

        if temp.right is None:
            temp.right = Node(key)
            return root
        else:
            queue.append(temp.right)

    return root

# ---- Program execution ----

root = Node(10)

for value in [5, 15, 3, 7, 12, 18]:
    insert(root, value)

print("Done creating BST")
