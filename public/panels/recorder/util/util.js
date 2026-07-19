var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/util/SharedObject.js
var SharedObject_exports = {};
__export(SharedObject_exports, {
  SharedObject: () => SharedObject
});
import * as Common from "./../../../core/common/common.js";
var SharedObject = class {
  #mutex = new Common.Mutex.Mutex();
  #counter = 0;
  #value;
  #create;
  #destroy;
  constructor(create, destroy) {
    this.#create = create;
    this.#destroy = destroy;
  }
  /**
   * @returns The shared object and a release function. If the release function
   * throws, you may attempt to call it again (however this probably implies
   * your destroy function is bad).
   */
  async acquire() {
    await this.#mutex.run(async () => {
      if (this.#counter === 0) {
        this.#value = await this.#create();
      }
      ++this.#counter;
    });
    return [this.#value, this.#release.bind(this, { released: false })];
  }
  /**
   * Automatically perform an acquire and release.
   *
   * **If the release fails**, then this will throw and the object will be
   * permanently alive. This is expected to be a fatal error and you should
   * debug your destroy function.
   */
  async run(action) {
    const [value, release] = await this.acquire();
    try {
      const result = await action(value);
      return result;
    } finally {
      await release();
    }
  }
  async #release(state) {
    if (state.released) {
      throw new Error("Attempted to release object multiple times.");
    }
    try {
      state.released = true;
      await this.#mutex.run(async () => {
        if (this.#counter === 1) {
          await this.#destroy(this.#value);
          this.#value = void 0;
        }
        --this.#counter;
      });
    } catch (error) {
      state.released = false;
      throw error;
    }
  }
};

// gen/front_end/panels/recorder/util/util.prebundle.js
var isDebugBuild = false;
var DEVTOOLS_RECORDER_WORLD_NAME = "devtools_recorder";
var InjectedScript = class {
  static #injectedScript;
  static async get() {
    if (!this.#injectedScript) {
      this.#injectedScript = (await fetch(new URL("../injected/injected.generated.js", import.meta.url))).text();
    }
    return await this.#injectedScript;
  }
};
var mod = (a, n) => {
  return (a % n + n) % n;
};
function assert(predicate, message = "Assertion failed!") {
  if (!predicate) {
    throw new Error(message);
  }
}
var deepFreeze = (object) => {
  for (const name of Reflect.ownKeys(object)) {
    const value = object[name];
    if (value && typeof value === "object" || typeof value === "function") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
};
var InsertAssignment = class {
  value;
  constructor(value) {
    this.value = value;
  }
};
var ArrayAssignments = class {
  value;
  constructor(value) {
    this.value = value;
  }
};
var immutableDeepAssign = (object, assignments) => {
  if (assignments instanceof ArrayAssignments) {
    assert(Array.isArray(object), `Expected an array. Got ${typeof object}.`);
    const updatedObject = [...object];
    const keys = Object.keys(assignments.value).sort((a, b) => Number(b) - Number(a));
    for (const key of keys) {
      const update = assignments.value[Number(key)];
      if (update === void 0) {
        updatedObject.splice(Number(key), 1);
      } else if (update instanceof InsertAssignment) {
        updatedObject.splice(Number(key), 0, update.value);
      } else {
        updatedObject[Number(key)] = immutableDeepAssign(updatedObject[key], update);
      }
    }
    return Object.freeze(updatedObject);
  }
  if (typeof assignments === "object" && !Array.isArray(assignments)) {
    assert(!Array.isArray(object), "Expected an object. Got an array.");
    const updatedObject = { ...object };
    const keys = Object.keys(assignments);
    for (const key of keys) {
      const update = assignments[key];
      if (update === void 0) {
        delete updatedObject[key];
      } else {
        updatedObject[key] = immutableDeepAssign(updatedObject[key], update);
      }
    }
    return Object.freeze(updatedObject);
  }
  return assignments;
};
export {
  ArrayAssignments,
  DEVTOOLS_RECORDER_WORLD_NAME,
  InjectedScript,
  InsertAssignment,
  SharedObject_exports as SharedObject,
  assert,
  deepFreeze,
  immutableDeepAssign,
  isDebugBuild,
  mod
};
//# sourceMappingURL=util.js.map
