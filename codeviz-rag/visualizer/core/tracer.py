import sys
from copy import deepcopy

def safe_deepcopy(obj):
    try:
        if hasattr(obj, "next") and (hasattr(obj, "value") or hasattr(obj, "val")):
            new = obj.__class__(safe_get_value(obj))
            new.next = safe_deepcopy(obj.next)
            return new
        return deepcopy(obj)
    except:
        return obj


def safe_copy_env(env):
    out = {}
    for k, v in env.items():
        if k.startswith("__"):
            continue
        out[k] = safe_deepcopy(v)
    return out


def safe_get_value(obj):
    return getattr(obj, "value", getattr(obj, "val", None))


def run_and_trace(code_text: str):
    snapshots = []

    USER_FILE = "<usercode>"
    compiled = compile(code_text, USER_FILE, "exec")

    def trace_func(frame, event, arg):
        if frame.f_code.co_filename != USER_FILE:
            return trace_func

        if event == "line":
            locs = safe_copy_env(frame.f_locals)
            globs = safe_copy_env(frame.f_globals)

            state = {}
            state.update(globs)
            state.update(locs)
            state["__line__"] = frame.f_lineno

            snapshots.append(state)

        return trace_func

    snapshots.append({"__line__": 0})

    env = {}

    try:
        sys.settrace(trace_func)
        exec(compiled, env, env)
    except Exception as e:
        snapshots.append({"__error__": repr(e)})
    finally:
        sys.settrace(None)

    final_state = safe_copy_env(env)
    final_state["__line__"] = -1
    snapshots.append(final_state)

    return snapshots
