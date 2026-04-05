def safe_get(obj, attr, default=None):
    try:
        return getattr(obj, attr, default)
    except:
        return default

def is_linked_list_node(obj):
    if obj is None or isinstance(obj, type):
        return False
    return hasattr(obj, "next") and (hasattr(obj, "value") or hasattr(obj, "val"))

def safe_get_value(obj):
    return getattr(obj, "value", getattr(obj, "val", None))

def is_tree_node(obj):
    if obj is None or isinstance(obj, type):
        return False
    return hasattr(obj, "left") or hasattr(obj, "right")

def is_stack(name, value):
    return isinstance(value, list) and "stack" in name.lower()

def is_queue(name, value):
    return isinstance(value, list) and "queue" in name.lower()
