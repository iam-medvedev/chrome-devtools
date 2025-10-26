// gen/front_end/third_party/puppeteer/package/lib/esm/third_party/rxjs/rxjs.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from2.length, ar; i < l; i++) {
    if (ar || !(i in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
      ar[i] = from2[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var timeoutProvider = {
  setTimeout: function(handler, timeout2) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout2], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout2], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}
function noop() {
}
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x) {
  return x;
}
function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source2 = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source2) : source2 ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source2) {
  return isFunction(source2 === null || source2 === void 0 ? void 0 : source2.lift);
}
function operate(init) {
  return function(source2) {
    if (hasLift(source2)) {
      return source2.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source2) {
    return new AnonymousSubject(destination, source2);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source2) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source2;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};
var ReplaySubject = function(_super) {
  __extends(ReplaySubject2, _super);
  function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }
    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }
    if (_timestampProvider === void 0) {
      _timestampProvider = dateTimestampProvider;
    }
    var _this = _super.call(this) || this;
    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }
  ReplaySubject2.prototype.next = function(value) {
    var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    var subscription = this._innerSubscribe(subscriber);
    var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
    var copy = _buffer.slice();
    for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  };
  ReplaySubject2.prototype._trimBuffer = function() {
    var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();
      var last2 = 0;
      for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last2 = i;
      }
      last2 && _buffer.splice(0, last2 + 1);
    }
  };
  return ReplaySubject2;
}(Subject);
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return this;
  };
  return Action2;
}(Subscription);
var intervalProvider = {
  setInterval: function(handler, timeout2) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout2], __read(args)));
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout2], __read(args)));
  },
  clearInterval: function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay2);
    }
    this.pending = true;
    this.delay = delay2;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay2);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && this.delay === delay2 && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay2) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay2);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay2, state) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay2);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});
function isScheduler(value) {
  return value && isFunction(value.schedule);
}
function last(arr) {
  return arr[arr.length - 1];
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          if (false) return [3, 8];
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process2(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process2(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay2, repeat) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay2));
    } else {
      this.unsubscribe();
    }
  }, delay2);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return operate(function(source2, subscriber) {
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay2);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay2);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay2);
    }));
  });
}
function subscribeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return operate(function(source2, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source2.subscribe(subscriber);
    }, delay2));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator2;
    executeSchedule(subscriber, scheduler, function() {
      iterator2 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator2.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});
function firstValueFrom(source2, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var subscriber = new SafeSubscriber({
      next: function(value) {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: function() {
        if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
    source2.subscribe(subscriber);
  });
}
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
function map(project, thisArg) {
  return operate(function(source2, subscriber) {
    var index = 0;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
var isArray = Array.isArray;
function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map(function(args) {
    return callOrApply(fn, args);
  });
}
var isArray2 = Array.isArray;
var objectProto = Object.prototype;
function mergeInternals(source2, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source2.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source2, subscriber) {
    return mergeInternals(source2, subscriber, project, concurrent);
  });
}
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
function concatAll() {
  return mergeAll(1);
}
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}
function defer(observableFactory) {
  return new Observable(function(subscriber) {
    innerFrom(observableFactory()).subscribe(subscriber);
  });
}
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
  if (!add) {
    if (isArrayLike(target)) {
      return mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom(target));
    }
  }
  if (!add) {
    throw new TypeError("Invalid event target");
  }
  return new Observable(function(subscriber) {
    var handler = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    };
    add(handler);
    return function() {
      return remove(handler);
    };
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }
  if (scheduler === void 0) {
    scheduler = async;
  }
  var intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  var sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
var NEVER = new Observable(noop);
var isArray3 = Array.isArray;
function argsOrArgArray(args) {
  return args.length === 1 && isArray3(args[0]) ? args[0] : args;
}
function filter(predicate, thisArg) {
  return operate(function(source2, subscriber) {
    var index = 0;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
function race() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  sources = argsOrArgArray(sources);
  return sources.length === 1 ? innerFrom(sources[0]) : new Observable(raceInit(sources));
}
function raceInit(sources) {
  return function(subscriber) {
    var subscriptions = [];
    var _loop_1 = function(i2) {
      subscriptions.push(innerFrom(sources[i2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (subscriptions) {
          for (var s = 0; s < subscriptions.length; s++) {
            s !== i2 && subscriptions[s].unsubscribe();
          }
          subscriptions = null;
        }
        subscriber.next(value);
      })));
    };
    for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
      _loop_1(i);
    }
  };
}
function catchError(selector) {
  return operate(function(source2, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source2.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom(selector(err, catchError(selector)(source2)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
function defaultIfEmpty(defaultValue) {
  return operate(function(source2, subscriber) {
    var hasValue = false;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      subscriber.next(value);
    }, function() {
      if (!hasValue) {
        subscriber.next(defaultValue);
      }
      subscriber.complete();
    }));
  });
}
function take(count) {
  return count <= 0 ? function() {
    return EMPTY;
  } : operate(function(source2, subscriber) {
    var seen = 0;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      if (++seen <= count) {
        subscriber.next(value);
        if (count <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}
function ignoreElements() {
  return operate(function(source2, subscriber) {
    source2.subscribe(createOperatorSubscriber(subscriber, noop));
  });
}
function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = identity;
  }
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return operate(function(source2, subscriber) {
    var previousKey;
    var first2 = true;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var currentKey = keySelector(value);
      if (first2 || !comparator(previousKey, currentKey)) {
        first2 = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
function defaultCompare(a, b) {
  return a === b;
}
function throwIfEmpty(errorFactory) {
  if (errorFactory === void 0) {
    errorFactory = defaultErrorFactory;
  }
  return operate(function(source2, subscriber) {
    var hasValue = false;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      subscriber.next(value);
    }, function() {
      return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
    }));
  });
}
function defaultErrorFactory() {
  return new EmptyError();
}
function first(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function(source2) {
    return source2.pipe(predicate ? filter(function(v, i) {
      return predicate(v, i, source2);
    }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function() {
      return new EmptyError();
    }));
  };
}
function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return operate(function(source2, subscriber) {
    var state = seed;
    return mergeInternals(source2, subscriber, function(value, index) {
      return accumulator(state, value, index);
    }, concurrent, function(value) {
      state = value;
    }, false, void 0, function() {
      return state = null;
    });
  });
}
function raceWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return !otherSources.length ? identity : operate(function(source2, subscriber) {
    raceInit(__spreadArray([source2], __read(otherSources)))(subscriber);
  });
}
function retry(configOrCount) {
  if (configOrCount === void 0) {
    configOrCount = Infinity;
  }
  var config2;
  if (configOrCount && typeof configOrCount === "object") {
    config2 = configOrCount;
  } else {
    config2 = {
      count: configOrCount
    };
  }
  var _a = config2.count, count = _a === void 0 ? Infinity : _a, delay2 = config2.delay, _b = config2.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
  return count <= 0 ? identity : operate(function(source2, subscriber) {
    var soFar = 0;
    var innerSub;
    var subscribeForRetry = function() {
      var syncUnsub = false;
      innerSub = source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (resetOnSuccess) {
          soFar = 0;
        }
        subscriber.next(value);
      }, void 0, function(err) {
        if (soFar++ < count) {
          var resub_1 = function() {
            if (innerSub) {
              innerSub.unsubscribe();
              innerSub = null;
              subscribeForRetry();
            } else {
              syncUnsub = true;
            }
          };
          if (delay2 != null) {
            var notifier = typeof delay2 === "number" ? timer(delay2) : innerFrom(delay2(err, soFar));
            var notifierSubscriber_1 = createOperatorSubscriber(subscriber, function() {
              notifierSubscriber_1.unsubscribe();
              resub_1();
            }, function() {
              subscriber.complete();
            });
            notifier.subscribe(notifierSubscriber_1);
          } else {
            resub_1();
          }
        } else {
          subscriber.error(err);
        }
      }));
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        subscribeForRetry();
      }
    };
    subscribeForRetry();
  });
}
function startWith() {
  var values = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  var scheduler = popScheduler(values);
  return operate(function(source2, subscriber) {
    (scheduler ? concat(values, source2, scheduler) : concat(values, source2)).subscribe(subscriber);
  });
}
function switchMap(project, resultSelector) {
  return operate(function(source2, subscriber) {
    var innerSubscriber = null;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      return isComplete && !innerSubscriber && subscriber.complete();
    };
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index++;
      innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function() {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function() {
      isComplete = true;
      checkComplete();
    }));
  });
}
function takeUntil(notifier) {
  return operate(function(source2, subscriber) {
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
      return subscriber.complete();
    }, noop));
    !subscriber.closed && source2.subscribe(subscriber);
  });
}
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate(function(source2, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source2.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}

// gen/front_end/third_party/puppeteer/package/lib/esm/third_party/mitt/mitt.js
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/disposable.js
Symbol.dispose ??= Symbol("dispose");
Symbol.asyncDispose ??= Symbol("asyncDispose");
var disposeSymbol = Symbol.dispose;
var asyncDisposeSymbol = Symbol.asyncDispose;
var DisposableStackPolyfill = class _DisposableStackPolyfill {
  #disposed = false;
  #stack = [];
  /**
   * Returns a value indicating whether the stack has been disposed.
   */
  get disposed() {
    return this.#disposed;
  }
  /**
   * Alias for `[Symbol.dispose]()`.
   */
  dispose() {
    this[disposeSymbol]();
  }
  /**
   * Adds a disposable resource to the top of stack, returning the resource.
   * Has no effect if provided `null` or `undefined`.
   *
   * @param value - A `Disposable` object, `null`, or `undefined`.
   * `null` and `undefined` will not be added, but will be returned.
   * @returns The provided `value`.
   */
  use(value) {
    if (value && typeof value[disposeSymbol] === "function") {
      this.#stack.push(value);
    }
    return value;
  }
  /**
   * Adds a non-disposable resource and a disposal callback to the top of the stack.
   *
   * @param value - A resource to be disposed.
   * @param onDispose - A callback invoked to dispose the provided value.
   * Will be invoked with `value` as the first parameter.
   * @returns The provided `value`.
   */
  adopt(value, onDispose) {
    this.#stack.push({
      [disposeSymbol]() {
        onDispose(value);
      }
    });
    return value;
  }
  /**
   * Add a disposal callback to the top of the stack to be invoked when stack is disposed.
   * @param onDispose - A callback to invoke when this object is disposed.
   */
  defer(onDispose) {
    this.#stack.push({
      [disposeSymbol]() {
        onDispose();
      }
    });
  }
  /**
   * Move all resources out of this stack and into a new `DisposableStack`, and
   * marks this stack as disposed.
   * @returns The new `DisposableStack`.
   *
   * @example
   *
   * ```ts
   * class C {
   *   #res1: Disposable;
   *   #res2: Disposable;
   *   #disposables: DisposableStack;
   *   constructor() {
   *     // stack will be disposed when exiting constructor for any reason
   *     using stack = new DisposableStack();
   *
   *     // get first resource
   *     this.#res1 = stack.use(getResource1());
   *
   *     // get second resource. If this fails, both `stack` and `#res1` will be disposed.
   *     this.#res2 = stack.use(getResource2());
   *
   *     // all operations succeeded, move resources out of `stack` so that
   *     // they aren't disposed when constructor exits
   *     this.#disposables = stack.move();
   *   }
   *
   *   [disposeSymbol]() {
   *     this.#disposables.dispose();
   *   }
   * }
   * ```
   */
  move() {
    if (this.#disposed) {
      throw new ReferenceError("A disposed stack can not use anything new");
    }
    const stack = new _DisposableStackPolyfill();
    stack.#stack = this.#stack;
    this.#stack = [];
    this.#disposed = true;
    return stack;
  }
  /**
   * Disposes each resource in the stack in last-in-first-out (LIFO) manner.
   */
  [disposeSymbol]() {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    const errors = [];
    for (const resource of this.#stack.reverse()) {
      try {
        resource[disposeSymbol]();
      } catch (e) {
        errors.push(e);
      }
    }
    if (errors.length === 1) {
      throw errors[0];
    } else if (errors.length > 1) {
      let suppressed = null;
      for (const error of errors) {
        if (suppressed === null) {
          suppressed = error;
        } else {
          suppressed = new SuppressedErrorPolyfill(error, suppressed);
        }
      }
      throw suppressed;
    }
  }
  [Symbol.toStringTag] = "DisposableStack";
};
var DisposableStack = globalThis.DisposableStack ?? DisposableStackPolyfill;
var AsyncDisposableStackPolyfill = class _AsyncDisposableStackPolyfill {
  #disposed = false;
  #stack = [];
  /**
   * Returns a value indicating whether the stack has been disposed.
   */
  get disposed() {
    return this.#disposed;
  }
  /**
   * Alias for `[Symbol.asyncDispose]()`.
   */
  async disposeAsync() {
    await this[asyncDisposeSymbol]();
  }
  /**
   * Adds a AsyncDisposable resource to the top of stack, returning the resource.
   * Has no effect if provided `null` or `undefined`.
   *
   * @param value - A `AsyncDisposable` object, `null`, or `undefined`.
   * `null` and `undefined` will not be added, but will be returned.
   * @returns The provided `value`.
   */
  use(value) {
    if (value) {
      const asyncDispose = value[asyncDisposeSymbol];
      const dispose = value[disposeSymbol];
      if (typeof asyncDispose === "function") {
        this.#stack.push(value);
      } else if (typeof dispose === "function") {
        this.#stack.push({
          [asyncDisposeSymbol]: async () => {
            value[disposeSymbol]();
          }
        });
      }
    }
    return value;
  }
  /**
   * Adds a non-disposable resource and a disposal callback to the top of the stack.
   *
   * @param value - A resource to be disposed.
   * @param onDispose - A callback invoked to dispose the provided value.
   * Will be invoked with `value` as the first parameter.
   * @returns The provided `value`.
   */
  adopt(value, onDispose) {
    this.#stack.push({
      [asyncDisposeSymbol]() {
        return onDispose(value);
      }
    });
    return value;
  }
  /**
   * Add a disposal callback to the top of the stack to be invoked when stack is disposed.
   * @param onDispose - A callback to invoke when this object is disposed.
   */
  defer(onDispose) {
    this.#stack.push({
      [asyncDisposeSymbol]() {
        return onDispose();
      }
    });
  }
  /**
   * Move all resources out of this stack and into a new `DisposableStack`, and
   * marks this stack as disposed.
   * @returns The new `AsyncDisposableStack`.
   *
   * @example
   *
   * ```ts
   * class C {
   *   #res1: Disposable;
   *   #res2: Disposable;
   *   #disposables: DisposableStack;
   *   constructor() {
   *     // stack will be disposed when exiting constructor for any reason
   *     using stack = new DisposableStack();
   *
   *     // get first resource
   *     this.#res1 = stack.use(getResource1());
   *
   *     // get second resource. If this fails, both `stack` and `#res1` will be disposed.
   *     this.#res2 = stack.use(getResource2());
   *
   *     // all operations succeeded, move resources out of `stack` so that
   *     // they aren't disposed when constructor exits
   *     this.#disposables = stack.move();
   *   }
   *
   *   [disposeSymbol]() {
   *     this.#disposables.dispose();
   *   }
   * }
   * ```
   */
  move() {
    if (this.#disposed) {
      throw new ReferenceError("A disposed stack can not use anything new");
    }
    const stack = new _AsyncDisposableStackPolyfill();
    stack.#stack = this.#stack;
    this.#stack = [];
    this.#disposed = true;
    return stack;
  }
  /**
   * Disposes each resource in the stack in last-in-first-out (LIFO) manner.
   */
  async [asyncDisposeSymbol]() {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    const errors = [];
    for (const resource of this.#stack.reverse()) {
      try {
        await resource[asyncDisposeSymbol]();
      } catch (e) {
        errors.push(e);
      }
    }
    if (errors.length === 1) {
      throw errors[0];
    } else if (errors.length > 1) {
      let suppressed = null;
      for (const error of errors) {
        if (suppressed === null) {
          suppressed = error;
        } else {
          suppressed = new SuppressedErrorPolyfill(error, suppressed);
        }
      }
      throw suppressed;
    }
  }
  [Symbol.toStringTag] = "AsyncDisposableStack";
};
var AsyncDisposableStack = globalThis.AsyncDisposableStack ?? AsyncDisposableStackPolyfill;
var SuppressedErrorPolyfill = class extends Error {
  #error;
  #suppressed;
  constructor(error, suppressed, message = "An error was suppressed during disposal") {
    super(message);
    this.name = "SuppressedError";
    this.#error = error;
    this.#suppressed = suppressed;
  }
  /**
   * The primary error that occurred during disposal.
   */
  get error() {
    return this.#error;
  }
  /**
   * The suppressed error i.e. the error that was suppressed
   * because it occurred later in the flow after the original error.
   */
  get suppressed() {
    return this.#suppressed;
  }
};
var SuppressedError2 = globalThis.SuppressedError ?? SuppressedErrorPolyfill;

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/EventEmitter.js
var EventEmitter = class {
  #emitter;
  #handlers = /* @__PURE__ */ new Map();
  /**
   * If you pass an emitter, the returned emitter will wrap the passed emitter.
   *
   * @internal
   */
  constructor(emitter = mitt_default(/* @__PURE__ */ new Map())) {
    this.#emitter = emitter;
  }
  /**
   * Bind an event listener to fire when an event occurs.
   * @param type - the event type you'd like to listen to. Can be a string or symbol.
   * @param handler - the function to be called when the event occurs.
   * @returns `this` to enable you to chain method calls.
   */
  on(type, handler) {
    const handlers = this.#handlers.get(type);
    if (handlers === void 0) {
      this.#handlers.set(type, [handler]);
    } else {
      handlers.push(handler);
    }
    this.#emitter.on(type, handler);
    return this;
  }
  /**
   * Remove an event listener from firing.
   * @param type - the event type you'd like to stop listening to.
   * @param handler - the function that should be removed.
   * @returns `this` to enable you to chain method calls.
   */
  off(type, handler) {
    const handlers = this.#handlers.get(type) ?? [];
    if (handler === void 0) {
      for (const handler2 of handlers) {
        this.#emitter.off(type, handler2);
      }
      this.#handlers.delete(type);
      return this;
    }
    const index = handlers.lastIndexOf(handler);
    if (index > -1) {
      this.#emitter.off(type, ...handlers.splice(index, 1));
    }
    return this;
  }
  /**
   * Emit an event and call any associated listeners.
   *
   * @param type - the event you'd like to emit
   * @param eventData - any data you'd like to emit with the event
   * @returns `true` if there are any listeners, `false` if there are not.
   */
  emit(type, event) {
    this.#emitter.emit(type, event);
    return this.listenerCount(type) > 0;
  }
  /**
   * Like `on` but the listener will only be fired once and then it will be removed.
   * @param type - the event you'd like to listen to
   * @param handler - the handler function to run when the event occurs
   * @returns `this` to enable you to chain method calls.
   */
  once(type, handler) {
    const onceHandler = (eventData) => {
      handler(eventData);
      this.off(type, onceHandler);
    };
    return this.on(type, onceHandler);
  }
  /**
   * Gets the number of listeners for a given event.
   *
   * @param type - the event to get the listener count for
   * @returns the number of listeners bound to the given event
   */
  listenerCount(type) {
    return this.#handlers.get(type)?.length || 0;
  }
  /**
   * Removes all listeners. If given an event argument, it will remove only
   * listeners for that event.
   *
   * @param type - the event to remove listeners for.
   * @returns `this` to enable you to chain method calls.
   */
  removeAllListeners(type) {
    if (type !== void 0) {
      return this.off(type);
    }
    this[disposeSymbol]();
    return this;
  }
  /**
   * @internal
   */
  [disposeSymbol]() {
    for (const [type, handlers] of this.#handlers) {
      for (const handler of handlers) {
        this.#emitter.off(type, handler);
      }
    }
    this.#handlers.clear();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/environment.js
var isNode = !!(typeof process !== "undefined" && process.version);
var environment = {
  value: {
    get fs() {
      throw new Error("fs is not available in this environment");
    },
    get ScreenRecorder() {
      throw new Error("ScreenRecorder is not available in this environment");
    }
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/assert.js
var assert = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/encoding.js
function stringToTypedArray(string, base64Encoded = false) {
  if (base64Encoded) {
    if (typeof Buffer === "function") {
      return Buffer.from(string, "base64");
    }
    return Uint8Array.from(atob(string), (m) => {
      return m.codePointAt(0);
    });
  }
  return new TextEncoder().encode(string);
}
function stringToBase64(str) {
  return typedArrayToBase64(new TextEncoder().encode(str));
}
function typedArrayToBase64(typedArray) {
  const chunkSize = 65534;
  const chunks = [];
  for (let i = 0; i < typedArray.length; i += chunkSize) {
    const chunk = typedArray.subarray(i, i + chunkSize);
    chunks.push(String.fromCodePoint.apply(null, chunk));
  }
  const binaryString = chunks.join("");
  return btoa(binaryString);
}
function mergeUint8Arrays(items) {
  let length = 0;
  for (const item of items) {
    length += item.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const item of items) {
    result.set(item, offset);
    offset += item.length;
  }
  return result;
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/version.js
var packageVersion = "24.26.1";

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/Debug.js
var debugModule = null;
async function importDebug() {
  if (!debugModule) {
    debugModule = (await import("debug")).default;
  }
  return debugModule;
}
var debug = (prefix) => {
  if (isNode) {
    return async (...logArgs) => {
      if (captureLogs) {
        capturedLogs.push(prefix + logArgs);
      }
      (await importDebug())(prefix)(logArgs);
    };
  }
  return (...logArgs) => {
    const debugLevel = globalThis.__PUPPETEER_DEBUG;
    if (!debugLevel) {
      return;
    }
    const everythingShouldBeLogged = debugLevel === "*";
    const prefixMatchesDebugLevel = everythingShouldBeLogged || /**
     * If the debug level is `foo*`, that means we match any prefix that
     * starts with `foo`. If the level is `foo`, we match only the prefix
     * `foo`.
     */
    (debugLevel.endsWith("*") ? prefix.startsWith(debugLevel) : prefix === debugLevel);
    if (!prefixMatchesDebugLevel) {
      return;
    }
    console.log(`${prefix}:`, ...logArgs);
  };
};
var capturedLogs = [];
var captureLogs = false;

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/Errors.js
var PuppeteerError = class extends Error {
  /**
   * @internal
   */
  constructor(message, options) {
    super(message, options);
    this.name = this.constructor.name;
  }
  /**
   * @internal
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var TimeoutError = class extends PuppeteerError {
};
var TouchError = class extends PuppeteerError {
};
var ProtocolError = class extends PuppeteerError {
  #code;
  #originalMessage = "";
  set code(code) {
    this.#code = code;
  }
  /**
   * @readonly
   * @public
   */
  get code() {
    return this.#code;
  }
  set originalMessage(originalMessage) {
    this.#originalMessage = originalMessage;
  }
  /**
   * @readonly
   * @public
   */
  get originalMessage() {
    return this.#originalMessage;
  }
};
var UnsupportedOperation = class extends PuppeteerError {
};
var TargetCloseError = class extends ProtocolError {
};
var ConnectionClosedError = class extends ProtocolError {
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/PDFOptions.js
var paperFormats = {
  letter: {
    cm: { width: 21.59, height: 27.94 },
    in: { width: 8.5, height: 11 }
  },
  legal: {
    cm: { width: 21.59, height: 35.56 },
    in: { width: 8.5, height: 14 }
  },
  tabloid: {
    cm: { width: 27.94, height: 43.18 },
    in: { width: 11, height: 17 }
  },
  ledger: {
    cm: { width: 43.18, height: 27.94 },
    in: { width: 17, height: 11 }
  },
  a0: {
    cm: { width: 84.1, height: 118.9 },
    in: { width: 33.1102, height: 46.811 }
  },
  a1: {
    cm: { width: 59.4, height: 84.1 },
    in: { width: 23.3858, height: 33.1102 }
  },
  a2: {
    cm: { width: 42, height: 59.4 },
    in: { width: 16.5354, height: 23.3858 }
  },
  a3: {
    cm: { width: 29.7, height: 42 },
    in: { width: 11.6929, height: 16.5354 }
  },
  a4: {
    cm: { width: 21, height: 29.7 },
    in: { width: 8.2677, height: 11.6929 }
  },
  a5: {
    cm: { width: 14.8, height: 21 },
    in: { width: 5.8268, height: 8.2677 }
  },
  a6: {
    cm: { width: 10.5, height: 14.8 },
    in: { width: 4.1339, height: 5.8268 }
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/util.js
var debugError = debug("puppeteer:error");
var DEFAULT_VIEWPORT = Object.freeze({ width: 800, height: 600 });
var SOURCE_URL = Symbol("Source URL for Puppeteer evaluation scripts");
var PuppeteerURL = class _PuppeteerURL {
  static INTERNAL_URL = "pptr:internal";
  static fromCallSite(functionName, site) {
    const url = new _PuppeteerURL();
    url.#functionName = functionName;
    url.#siteString = site.toString();
    return url;
  }
  static parse = (url) => {
    url = url.slice("pptr:".length);
    const [functionName = "", siteString = ""] = url.split(";");
    const puppeteerUrl = new _PuppeteerURL();
    puppeteerUrl.#functionName = functionName;
    puppeteerUrl.#siteString = decodeURIComponent(siteString);
    return puppeteerUrl;
  };
  static isPuppeteerURL = (url) => {
    return url.startsWith("pptr:");
  };
  #functionName;
  #siteString;
  get functionName() {
    return this.#functionName;
  }
  get siteString() {
    return this.#siteString;
  }
  toString() {
    return `pptr:${[
      this.#functionName,
      encodeURIComponent(this.#siteString)
    ].join(";")}`;
  }
};
var withSourcePuppeteerURLIfNone = (functionName, object) => {
  if (Object.prototype.hasOwnProperty.call(object, SOURCE_URL)) {
    return object;
  }
  const original = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => {
    return stack[2];
  };
  const site = new Error().stack;
  Error.prepareStackTrace = original;
  return Object.assign(object, {
    [SOURCE_URL]: PuppeteerURL.fromCallSite(functionName, site)
  });
};
var getSourcePuppeteerURLIfAvailable = (object) => {
  if (Object.prototype.hasOwnProperty.call(object, SOURCE_URL)) {
    return object[SOURCE_URL];
  }
  return void 0;
};
var isString = (obj) => {
  return typeof obj === "string" || obj instanceof String;
};
var isNumber = (obj) => {
  return typeof obj === "number" || obj instanceof Number;
};
function evaluationString(fun, ...args) {
  if (isString(fun)) {
    assert(args.length === 0, "Cannot evaluate a string with arguments");
    return fun;
  }
  function serializeArgument(arg) {
    if (Object.is(arg, void 0)) {
      return "undefined";
    }
    return JSON.stringify(arg);
  }
  return `(${fun})(${args.map(serializeArgument).join(",")})`;
}
async function getReadableAsTypedArray(readable, path) {
  const buffers = [];
  const reader = readable.getReader();
  if (path) {
    const fileHandle = await environment.value.fs.promises.open(path, "w+");
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        buffers.push(value);
        await fileHandle.writeFile(value);
      }
    } finally {
      await fileHandle.close();
    }
  } else {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      buffers.push(value);
    }
  }
  try {
    const concat2 = mergeUint8Arrays(buffers);
    if (concat2.length === 0) {
      return null;
    }
    return concat2;
  } catch (error) {
    debugError(error);
    return null;
  }
}
async function getReadableFromProtocolStream(client, handle) {
  return new ReadableStream({
    async pull(controller) {
      const { data, base64Encoded, eof } = await client.send("IO.read", {
        handle
      });
      controller.enqueue(stringToTypedArray(data, base64Encoded ?? false));
      if (eof) {
        await client.send("IO.close", { handle });
        controller.close();
      }
    }
  });
}
function validateDialogType(type) {
  let dialogType = null;
  const validDialogTypes = /* @__PURE__ */ new Set([
    "alert",
    "confirm",
    "prompt",
    "beforeunload"
  ]);
  if (validDialogTypes.has(type)) {
    dialogType = type;
  }
  assert(dialogType, `Unknown javascript dialog type: ${type}`);
  return dialogType;
}
function timeout(ms, cause) {
  return ms === 0 ? NEVER : timer(ms).pipe(map(() => {
    throw new TimeoutError(`Timed out after waiting ${ms}ms`, { cause });
  }));
}
var UTILITY_WORLD_NAME = "__puppeteer_utility_world__" + packageVersion;
var SOURCE_URL_REGEX = /^[\x20\t]*\/\/[@#] sourceURL=\s{0,10}(\S*?)\s{0,10}$/m;
function getSourceUrlComment(url) {
  return `//# sourceURL=${url}`;
}
var NETWORK_IDLE_TIME = 500;
function parsePDFOptions(options = {}, lengthUnit = "in") {
  const defaults = {
    scale: 1,
    displayHeaderFooter: false,
    headerTemplate: "",
    footerTemplate: "",
    printBackground: false,
    landscape: false,
    pageRanges: "",
    preferCSSPageSize: false,
    omitBackground: false,
    outline: false,
    tagged: true,
    waitForFonts: true
  };
  let width = 8.5;
  let height = 11;
  if (options.format) {
    const format = paperFormats[options.format.toLowerCase()][lengthUnit];
    assert(format, "Unknown paper format: " + options.format);
    width = format.width;
    height = format.height;
  } else {
    width = convertPrintParameterToInches(options.width, lengthUnit) ?? width;
    height = convertPrintParameterToInches(options.height, lengthUnit) ?? height;
  }
  const margin = {
    top: convertPrintParameterToInches(options.margin?.top, lengthUnit) || 0,
    left: convertPrintParameterToInches(options.margin?.left, lengthUnit) || 0,
    bottom: convertPrintParameterToInches(options.margin?.bottom, lengthUnit) || 0,
    right: convertPrintParameterToInches(options.margin?.right, lengthUnit) || 0
  };
  if (options.outline) {
    options.tagged = true;
  }
  return {
    ...defaults,
    ...options,
    width,
    height,
    margin
  };
}
var unitToPixels = {
  px: 1,
  in: 96,
  cm: 37.8,
  mm: 3.78
};
function convertPrintParameterToInches(parameter, lengthUnit = "in") {
  if (typeof parameter === "undefined") {
    return void 0;
  }
  let pixels;
  if (isNumber(parameter)) {
    pixels = parameter;
  } else if (isString(parameter)) {
    const text = parameter;
    let unit = text.substring(text.length - 2).toLowerCase();
    let valueText = "";
    if (unit in unitToPixels) {
      valueText = text.substring(0, text.length - 2);
    } else {
      unit = "px";
      valueText = text;
    }
    const value = Number(valueText);
    assert(!isNaN(value), "Failed to parse parameter value: " + text);
    pixels = value * unitToPixels[unit];
  } else {
    throw new Error("page.pdf() Cannot handle parameter type: " + typeof parameter);
  }
  return pixels / unitToPixels[lengthUnit];
}
function fromEmitterEvent(emitter, eventName) {
  return new Observable((subscriber) => {
    const listener = (event) => {
      subscriber.next(event);
    };
    emitter.on(eventName, listener);
    return () => {
      emitter.off(eventName, listener);
    };
  });
}
function fromAbortSignal(signal, cause) {
  return signal ? fromEvent(signal, "abort").pipe(map(() => {
    if (signal.reason instanceof Error) {
      signal.reason.cause = cause;
      throw signal.reason;
    }
    throw new Error(signal.reason, { cause });
  })) : NEVER;
}
function filterAsync(predicate) {
  return mergeMap((value) => {
    return from(Promise.resolve(predicate(value))).pipe(filter((isMatch) => {
      return isMatch;
    }), map(() => {
      return value;
    }));
  });
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Browser.js
var WEB_PERMISSION_TO_PROTOCOL_PERMISSION = /* @__PURE__ */ new Map([
  ["accelerometer", "sensors"],
  ["ambient-light-sensor", "sensors"],
  ["background-sync", "backgroundSync"],
  ["camera", "videoCapture"],
  ["clipboard-read", "clipboardReadWrite"],
  ["clipboard-sanitized-write", "clipboardSanitizedWrite"],
  ["clipboard-write", "clipboardReadWrite"],
  ["geolocation", "geolocation"],
  ["gyroscope", "sensors"],
  ["idle-detection", "idleDetection"],
  ["keyboard-lock", "keyboardLock"],
  ["magnetometer", "sensors"],
  ["microphone", "audioCapture"],
  ["midi", "midi"],
  ["notifications", "notifications"],
  ["payment-handler", "paymentHandler"],
  ["persistent-storage", "durableStorage"],
  ["pointer-lock", "pointerLock"],
  // chrome-specific permissions we have.
  ["midi-sysex", "midiSysex"]
]);
var Browser = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * Waits until a {@link Target | target} matching the given `predicate`
   * appears and returns it.
   *
   * This will look all open {@link BrowserContext | browser contexts}.
   *
   * @example Finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browser.waitForTarget(
   *   target => target.url() === 'https://www.example.com/',
   * );
   * ```
   */
  async waitForTarget(predicate, options = {}) {
    const { timeout: ms = 3e4, signal } = options;
    return await firstValueFrom(merge(fromEmitterEvent(
      this,
      "targetcreated"
      /* BrowserEvent.TargetCreated */
    ), fromEmitterEvent(
      this,
      "targetchanged"
      /* BrowserEvent.TargetChanged */
    ), from(this.targets())).pipe(filterAsync(predicate), raceWith(fromAbortSignal(signal), timeout(ms))));
  }
  /**
   * Gets a list of all open {@link Page | pages} inside this {@link Browser}.
   *
   * If there are multiple {@link BrowserContext | browser contexts}, this
   * returns all {@link Page | pages} in all
   * {@link BrowserContext | browser contexts}.
   *
   * @remarks Non-visible {@link Page | pages}, such as `"background_page"`,
   * will not be listed here. You can find them using {@link Target.page}.
   */
  async pages() {
    const contextPages = await Promise.all(this.browserContexts().map((context2) => {
      return context2.pages();
    }));
    return contextPages.reduce((acc, x) => {
      return acc.concat(x);
    }, []);
  }
  /**
   * Returns all cookies in the default {@link BrowserContext}.
   *
   * @remarks
   *
   * Shortcut for
   * {@link BrowserContext.cookies | browser.defaultBrowserContext().cookies()}.
   */
  async cookies() {
    return await this.defaultBrowserContext().cookies();
  }
  /**
   * Sets cookies in the default {@link BrowserContext}.
   *
   * @remarks
   *
   * Shortcut for
   * {@link BrowserContext.setCookie | browser.defaultBrowserContext().setCookie()}.
   */
  async setCookie(...cookies) {
    return await this.defaultBrowserContext().setCookie(...cookies);
  }
  /**
   * Removes cookies from the default {@link BrowserContext}.
   *
   * @remarks
   *
   * Shortcut for
   * {@link BrowserContext.deleteCookie | browser.defaultBrowserContext().deleteCookie()}.
   */
  async deleteCookie(...cookies) {
    return await this.defaultBrowserContext().deleteCookie(...cookies);
  }
  /**
   * Deletes cookies matching the provided filters from the default
   * {@link BrowserContext}.
   *
   * @remarks
   *
   * Shortcut for
   * {@link BrowserContext.deleteMatchingCookies |
   * browser.defaultBrowserContext().deleteMatchingCookies()}.
   */
  async deleteMatchingCookies(...filters) {
    return await this.defaultBrowserContext().deleteMatchingCookies(...filters);
  }
  /**
   * Whether Puppeteer is connected to this {@link Browser | browser}.
   *
   * @deprecated Use {@link Browser | Browser.connected}.
   */
  isConnected() {
    return this.connected;
  }
  /** @internal */
  [disposeSymbol]() {
    if (this.process()) {
      return void this.close().catch(debugError);
    }
    return void this.disconnect().catch(debugError);
  }
  /** @internal */
  [asyncDisposeSymbol]() {
    if (this.process()) {
      return this.close();
    }
    return this.disconnect();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/CDPSession.js
var CDPSessionEvent;
(function(CDPSessionEvent2) {
  CDPSessionEvent2.Disconnected = Symbol("CDPSession.Disconnected");
  CDPSessionEvent2.Swapped = Symbol("CDPSession.Swapped");
  CDPSessionEvent2.Ready = Symbol("CDPSession.Ready");
  CDPSessionEvent2.SessionAttached = "sessionattached";
  CDPSessionEvent2.SessionDetached = "sessiondetached";
})(CDPSessionEvent || (CDPSessionEvent = {}));
var CDPSession = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * Parent session in terms of CDP's auto-attach mechanism.
   *
   * @internal
   */
  parentSession() {
    return void 0;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/Deferred.js
var Deferred = class _Deferred {
  static create(opts) {
    return new _Deferred(opts);
  }
  static async race(awaitables) {
    const deferredWithTimeout = /* @__PURE__ */ new Set();
    try {
      const promises = awaitables.map((value) => {
        if (value instanceof _Deferred) {
          if (value.#timeoutId) {
            deferredWithTimeout.add(value);
          }
          return value.valueOrThrow();
        }
        return value;
      });
      return await Promise.race(promises);
    } finally {
      for (const deferred of deferredWithTimeout) {
        deferred.reject(new Error("Timeout cleared"));
      }
    }
  }
  #isResolved = false;
  #isRejected = false;
  #value;
  // SAFETY: This is ensured by #taskPromise.
  #resolve;
  // TODO: Switch to Promise.withResolvers with Node 22
  #taskPromise = new Promise((resolve) => {
    this.#resolve = resolve;
  });
  #timeoutId;
  #timeoutError;
  constructor(opts) {
    if (opts && opts.timeout > 0) {
      this.#timeoutError = new TimeoutError(opts.message);
      this.#timeoutId = setTimeout(() => {
        this.reject(this.#timeoutError);
      }, opts.timeout);
    }
  }
  #finish(value) {
    clearTimeout(this.#timeoutId);
    this.#value = value;
    this.#resolve();
  }
  resolve(value) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isResolved = true;
    this.#finish(value);
  }
  reject(error) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isRejected = true;
    this.#finish(error);
  }
  resolved() {
    return this.#isResolved;
  }
  finished() {
    return this.#isResolved || this.#isRejected;
  }
  value() {
    return this.#value;
  }
  #promise;
  valueOrThrow() {
    if (!this.#promise) {
      this.#promise = (async () => {
        await this.#taskPromise;
        if (this.#isRejected) {
          throw this.#value;
        }
        return this.#value;
      })();
    }
    return this.#promise;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/Mutex.js
var Mutex = class _Mutex {
  static Guard = class Guard {
    #mutex;
    #onRelease;
    constructor(mutex, onRelease) {
      this.#mutex = mutex;
      this.#onRelease = onRelease;
    }
    [disposeSymbol]() {
      this.#onRelease?.();
      return this.#mutex.release();
    }
  };
  #locked = false;
  #acquirers = [];
  // This is FIFO.
  async acquire(onRelease) {
    if (!this.#locked) {
      this.#locked = true;
      return new _Mutex.Guard(this);
    }
    const deferred = Deferred.create();
    this.#acquirers.push(deferred.resolve.bind(deferred));
    await deferred.valueOrThrow();
    return new _Mutex.Guard(this, onRelease);
  }
  release() {
    const resolve = this.#acquirers.shift();
    if (!resolve) {
      this.#locked = false;
      return;
    }
    resolve();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/BrowserContext.js
var BrowserContext = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * If defined, indicates an ongoing screenshot opereation.
   */
  #pageScreenshotMutex;
  #screenshotOperationsCount = 0;
  /**
   * @internal
   */
  startScreenshot() {
    const mutex = this.#pageScreenshotMutex || new Mutex();
    this.#pageScreenshotMutex = mutex;
    this.#screenshotOperationsCount++;
    return mutex.acquire(() => {
      this.#screenshotOperationsCount--;
      if (this.#screenshotOperationsCount === 0) {
        this.#pageScreenshotMutex = void 0;
      }
    });
  }
  /**
   * @internal
   */
  waitForScreenshotOperations() {
    return this.#pageScreenshotMutex?.acquire();
  }
  /**
   * Waits until a {@link Target | target} matching the given `predicate`
   * appears and returns it.
   *
   * This will look all open {@link BrowserContext | browser contexts}.
   *
   * @example Finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browserContext.waitForTarget(
   *   target => target.url() === 'https://www.example.com/',
   * );
   * ```
   */
  async waitForTarget(predicate, options = {}) {
    const { timeout: ms = 3e4 } = options;
    return await firstValueFrom(merge(fromEmitterEvent(
      this,
      "targetcreated"
      /* BrowserContextEvent.TargetCreated */
    ), fromEmitterEvent(
      this,
      "targetchanged"
      /* BrowserContextEvent.TargetChanged */
    ), from(this.targets())).pipe(filterAsync(predicate), raceWith(timeout(ms))));
  }
  /**
   * Removes cookie in this browser context.
   *
   * @param cookies - Complete {@link Cookie | cookie} object to be removed.
   */
  async deleteCookie(...cookies) {
    return await this.setCookie(...cookies.map((cookie) => {
      return {
        ...cookie,
        expires: 1
      };
    }));
  }
  /**
   * Deletes cookies matching the provided filters in this browser context.
   *
   * @param filters - {@link DeleteCookiesRequest}
   */
  async deleteMatchingCookies(...filters) {
    const cookies = await this.cookies();
    const cookiesToDelete = cookies.filter((cookie) => {
      return filters.some((filter2) => {
        if (filter2.name === cookie.name) {
          if (filter2.domain !== void 0 && filter2.domain === cookie.domain) {
            return true;
          }
          if (filter2.path !== void 0 && filter2.path === cookie.path) {
            return true;
          }
          if (filter2.partitionKey !== void 0 && cookie.partitionKey !== void 0) {
            if (typeof cookie.partitionKey !== "object") {
              throw new Error("Unexpected string partition key");
            }
            if (typeof filter2.partitionKey === "string") {
              if (filter2.partitionKey === cookie.partitionKey?.sourceOrigin) {
                return true;
              }
            } else {
              if (filter2.partitionKey.sourceOrigin === cookie.partitionKey?.sourceOrigin) {
                return true;
              }
            }
          }
          if (filter2.url !== void 0) {
            const url = new URL(filter2.url);
            if (url.hostname === cookie.domain && url.pathname === cookie.path) {
              return true;
            }
          }
          return true;
        }
        return false;
      });
    });
    await this.deleteCookie(...cookiesToDelete);
  }
  /**
   * Whether this {@link BrowserContext | browser context} is closed.
   */
  get closed() {
    return !this.browser().browserContexts().includes(this);
  }
  /**
   * Identifier for this {@link BrowserContext | browser context}.
   */
  get id() {
    return void 0;
  }
  /** @internal */
  [disposeSymbol]() {
    return void this.close().catch(debugError);
  }
  /** @internal */
  [asyncDisposeSymbol]() {
    return this.close();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/TimeoutSettings.js
var DEFAULT_TIMEOUT = 3e4;
var TimeoutSettings = class {
  #defaultTimeout;
  #defaultNavigationTimeout;
  constructor() {
    this.#defaultTimeout = null;
    this.#defaultNavigationTimeout = null;
  }
  setDefaultTimeout(timeout2) {
    this.#defaultTimeout = timeout2;
  }
  setDefaultNavigationTimeout(timeout2) {
    this.#defaultNavigationTimeout = timeout2;
  }
  navigationTimeout() {
    if (this.#defaultNavigationTimeout !== null) {
      return this.#defaultNavigationTimeout;
    }
    if (this.#defaultTimeout !== null) {
      return this.#defaultTimeout;
    }
    return DEFAULT_TIMEOUT;
  }
  timeout() {
    if (this.#defaultTimeout !== null) {
      return this.#defaultTimeout;
    }
    return DEFAULT_TIMEOUT;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/decorators.js
var __addDisposableResource = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var instances = /* @__PURE__ */ new WeakSet();
function moveable(Class, _) {
  let hasDispose = false;
  if (Class.prototype[disposeSymbol]) {
    const dispose = Class.prototype[disposeSymbol];
    Class.prototype[disposeSymbol] = function() {
      if (instances.has(this)) {
        instances.delete(this);
        return;
      }
      return dispose.call(this);
    };
    hasDispose = true;
  }
  if (Class.prototype[asyncDisposeSymbol]) {
    const asyncDispose = Class.prototype[asyncDisposeSymbol];
    Class.prototype[asyncDisposeSymbol] = function() {
      if (instances.has(this)) {
        instances.delete(this);
        return;
      }
      return asyncDispose.call(this);
    };
    hasDispose = true;
  }
  if (hasDispose) {
    Class.prototype.move = function() {
      instances.add(this);
      return this;
    };
  }
  return Class;
}
function throwIfDisposed(message = (value) => {
  return `Attempted to use disposed ${value.constructor.name}.`;
}) {
  return (target, _) => {
    return function(...args) {
      if (this.disposed) {
        throw new Error(message(this));
      }
      return target.call(this, ...args);
    };
  };
}
function invokeAtMostOnceForArguments(target, _) {
  const cache = /* @__PURE__ */ new WeakMap();
  let cacheDepth = -1;
  return function(...args) {
    if (cacheDepth === -1) {
      cacheDepth = args.length;
    }
    if (cacheDepth !== args.length) {
      throw new Error("Memoized method was called with the wrong number of arguments");
    }
    let freshArguments = false;
    let cacheIterator = cache;
    for (const arg of args) {
      if (cacheIterator.has(arg)) {
        cacheIterator = cacheIterator.get(arg);
      } else {
        freshArguments = true;
        cacheIterator.set(arg, /* @__PURE__ */ new WeakMap());
        cacheIterator = cacheIterator.get(arg);
      }
    }
    if (!freshArguments) {
      return;
    }
    return target.call(this, ...args);
  };
}
function guarded(getKey = function() {
  return this;
}) {
  return (target, _) => {
    const mutexes = /* @__PURE__ */ new WeakMap();
    return async function(...args) {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        const key = getKey.call(this);
        let mutex = mutexes.get(key);
        if (!mutex) {
          mutex = new Mutex();
          mutexes.set(key, mutex);
        }
        const _2 = __addDisposableResource(env_1, await mutex.acquire(), true);
        return await target.call(this, ...args);
      } catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
      } finally {
        const result_1 = __disposeResources(env_1);
        if (result_1)
          await result_1;
      }
    };
  };
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/locators/locators.js
var __addDisposableResource2 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources2 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var LocatorEvent;
(function(LocatorEvent2) {
  LocatorEvent2["Action"] = "action";
})(LocatorEvent || (LocatorEvent = {}));
var Locator = class extends EventEmitter {
  /**
   * Creates a race between multiple locators trying to locate elements in
   * parallel but ensures that only a single element receives the action.
   *
   * @public
   */
  static race(locators) {
    return RaceLocator.create(locators);
  }
  /**
   * @internal
   */
  visibility = null;
  /**
   * @internal
   */
  _timeout = 3e4;
  #ensureElementIsInTheViewport = true;
  #waitForEnabled = true;
  #waitForStableBoundingBox = true;
  /**
   * @internal
   */
  operators = {
    conditions: (conditions, signal) => {
      return mergeMap((handle) => {
        return merge(...conditions.map((condition) => {
          return condition(handle, signal);
        })).pipe(defaultIfEmpty(handle));
      });
    },
    retryAndRaceWithSignalAndTimer: (signal, cause) => {
      const candidates = [];
      if (signal) {
        candidates.push(fromAbortSignal(signal, cause));
      }
      candidates.push(timeout(this._timeout, cause));
      return pipe(retry({ delay: RETRY_DELAY }), raceWith(...candidates));
    }
  };
  // Determines when the locator will timeout for actions.
  get timeout() {
    return this._timeout;
  }
  /**
   * Creates a new locator instance by cloning the current locator and setting
   * the total timeout for the locator actions.
   *
   * Pass `0` to disable timeout.
   *
   * @defaultValue `Page.getDefaultTimeout()`
   */
  setTimeout(timeout2) {
    const locator = this._clone();
    locator._timeout = timeout2;
    return locator;
  }
  /**
   * Creates a new locator instance by cloning the current locator with the
   * visibility property changed to the specified value.
   */
  setVisibility(visibility) {
    const locator = this._clone();
    locator.visibility = visibility;
    return locator;
  }
  /**
   * Creates a new locator instance by cloning the current locator and
   * specifying whether to wait for input elements to become enabled before the
   * action. Applicable to `click` and `fill` actions.
   *
   * @defaultValue `true`
   */
  setWaitForEnabled(value) {
    const locator = this._clone();
    locator.#waitForEnabled = value;
    return locator;
  }
  /**
   * Creates a new locator instance by cloning the current locator and
   * specifying whether the locator should scroll the element into viewport if
   * it is not in the viewport already.
   *
   * @defaultValue `true`
   */
  setEnsureElementIsInTheViewport(value) {
    const locator = this._clone();
    locator.#ensureElementIsInTheViewport = value;
    return locator;
  }
  /**
   * Creates a new locator instance by cloning the current locator and
   * specifying whether the locator has to wait for the element's bounding box
   * to be same between two consecutive animation frames.
   *
   * @defaultValue `true`
   */
  setWaitForStableBoundingBox(value) {
    const locator = this._clone();
    locator.#waitForStableBoundingBox = value;
    return locator;
  }
  /**
   * @internal
   */
  copyOptions(locator) {
    this._timeout = locator._timeout;
    this.visibility = locator.visibility;
    this.#waitForEnabled = locator.#waitForEnabled;
    this.#ensureElementIsInTheViewport = locator.#ensureElementIsInTheViewport;
    this.#waitForStableBoundingBox = locator.#waitForStableBoundingBox;
    return this;
  }
  /**
   * If the element has a "disabled" property, wait for the element to be
   * enabled.
   */
  #waitForEnabledIfNeeded = (handle, signal) => {
    if (!this.#waitForEnabled) {
      return EMPTY;
    }
    return from(handle.frame.waitForFunction((element) => {
      if (!(element instanceof HTMLElement)) {
        return true;
      }
      const isNativeFormControl = [
        "BUTTON",
        "INPUT",
        "SELECT",
        "TEXTAREA",
        "OPTION",
        "OPTGROUP"
      ].includes(element.nodeName);
      return !isNativeFormControl || !element.hasAttribute("disabled");
    }, {
      timeout: this._timeout,
      signal
    }, handle)).pipe(ignoreElements());
  };
  /**
   * Compares the bounding box of the element for two consecutive animation
   * frames and waits till they are the same.
   */
  #waitForStableBoundingBoxIfNeeded = (handle) => {
    if (!this.#waitForStableBoundingBox) {
      return EMPTY;
    }
    return defer(() => {
      return from(handle.evaluate((element) => {
        return new Promise((resolve) => {
          window.requestAnimationFrame(() => {
            const rect1 = element.getBoundingClientRect();
            window.requestAnimationFrame(() => {
              const rect2 = element.getBoundingClientRect();
              resolve([
                {
                  x: rect1.x,
                  y: rect1.y,
                  width: rect1.width,
                  height: rect1.height
                },
                {
                  x: rect2.x,
                  y: rect2.y,
                  width: rect2.width,
                  height: rect2.height
                }
              ]);
            });
          });
        });
      }));
    }).pipe(first(([rect1, rect2]) => {
      return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
    }), retry({ delay: RETRY_DELAY }), ignoreElements());
  };
  /**
   * Checks if the element is in the viewport and auto-scrolls it if it is not.
   */
  #ensureElementIsInTheViewportIfNeeded = (handle) => {
    if (!this.#ensureElementIsInTheViewport) {
      return EMPTY;
    }
    return from(handle.isIntersectingViewport({ threshold: 0 })).pipe(filter((isIntersectingViewport) => {
      return !isIntersectingViewport;
    }), mergeMap(() => {
      return from(handle.scrollIntoView());
    }), mergeMap(() => {
      return defer(() => {
        return from(handle.isIntersectingViewport({ threshold: 0 }));
      }).pipe(first(identity), retry({ delay: RETRY_DELAY }), ignoreElements());
    }));
  };
  #click(options) {
    const signal = options?.signal;
    const cause = new Error("Locator.click");
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded,
      this.#waitForEnabledIfNeeded
    ], signal), tap(() => {
      return this.emit(LocatorEvent.Action, void 0);
    }), mergeMap((handle) => {
      return from(handle.click(options)).pipe(catchError((err) => {
        void handle.dispose().catch(debugError);
        throw err;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
  }
  #fill(value, options) {
    const signal = options?.signal;
    const cause = new Error("Locator.fill");
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded,
      this.#waitForEnabledIfNeeded
    ], signal), tap(() => {
      return this.emit(LocatorEvent.Action, void 0);
    }), mergeMap((handle) => {
      return from(handle.evaluate((el) => {
        if (el instanceof HTMLSelectElement) {
          return "select";
        }
        if (el instanceof HTMLTextAreaElement) {
          return "typeable-input";
        }
        if (el instanceof HTMLInputElement) {
          if ((/* @__PURE__ */ new Set([
            "textarea",
            "text",
            "url",
            "tel",
            "search",
            "password",
            "number",
            "email"
          ])).has(el.type)) {
            return "typeable-input";
          } else {
            return "other-input";
          }
        }
        if (el.isContentEditable) {
          return "contenteditable";
        }
        return "unknown";
      })).pipe(mergeMap((inputType) => {
        switch (inputType) {
          case "select":
            return from(handle.select(value).then(noop));
          case "contenteditable":
          case "typeable-input":
            return from(handle.evaluate((input, newValue) => {
              const currentValue = input.isContentEditable ? input.innerText : input.value;
              if (newValue.length <= currentValue.length || !newValue.startsWith(input.value)) {
                if (input.isContentEditable) {
                  input.innerText = "";
                } else {
                  input.value = "";
                }
                return newValue;
              }
              const originalValue = input.isContentEditable ? input.innerText : input.value;
              if (input.isContentEditable) {
                input.innerText = "";
                input.innerText = originalValue;
              } else {
                input.value = "";
                input.value = originalValue;
              }
              return newValue.substring(originalValue.length);
            }, value)).pipe(mergeMap((textToType) => {
              return from(handle.type(textToType));
            }));
          case "other-input":
            return from(handle.focus()).pipe(mergeMap(() => {
              return from(handle.evaluate((input, value2) => {
                input.value = value2;
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.dispatchEvent(new Event("change", { bubbles: true }));
              }, value));
            }));
          case "unknown":
            throw new Error(`Element cannot be filled out.`);
        }
      })).pipe(catchError((err) => {
        void handle.dispose().catch(debugError);
        throw err;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
  }
  #hover(options) {
    const signal = options?.signal;
    const cause = new Error("Locator.hover");
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded
    ], signal), tap(() => {
      return this.emit(LocatorEvent.Action, void 0);
    }), mergeMap((handle) => {
      return from(handle.hover()).pipe(catchError((err) => {
        void handle.dispose().catch(debugError);
        throw err;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
  }
  #scroll(options) {
    const signal = options?.signal;
    const cause = new Error("Locator.scroll");
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded
    ], signal), tap(() => {
      return this.emit(LocatorEvent.Action, void 0);
    }), mergeMap((handle) => {
      return from(handle.evaluate((el, scrollTop, scrollLeft) => {
        if (scrollTop !== void 0) {
          el.scrollTop = scrollTop;
        }
        if (scrollLeft !== void 0) {
          el.scrollLeft = scrollLeft;
        }
      }, options?.scrollTop, options?.scrollLeft)).pipe(catchError((err) => {
        void handle.dispose().catch(debugError);
        throw err;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
  }
  /**
   * Clones the locator.
   */
  clone() {
    return this._clone();
  }
  /**
   * Waits for the locator to get a handle from the page.
   *
   * @public
   */
  async waitHandle(options) {
    const cause = new Error("Locator.waitHandle");
    return await firstValueFrom(this._wait(options).pipe(this.operators.retryAndRaceWithSignalAndTimer(options?.signal, cause)));
  }
  /**
   * Waits for the locator to get the serialized value from the page.
   *
   * Note this requires the value to be JSON-serializable.
   *
   * @public
   */
  async wait(options) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      const handle = __addDisposableResource2(env_1, await this.waitHandle(options), false);
      return await handle.jsonValue();
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources2(env_1);
    }
  }
  /**
   * Maps the locator using the provided mapper.
   *
   * @public
   */
  map(mapper) {
    return new MappedLocator(this._clone(), (handle) => {
      return handle.evaluateHandle(mapper);
    });
  }
  /**
   * Creates an expectation that is evaluated against located values.
   *
   * If the expectations do not match, then the locator will retry.
   *
   * @public
   */
  filter(predicate) {
    return new FilteredLocator(this._clone(), async (handle, signal) => {
      await handle.frame.waitForFunction(predicate, { signal, timeout: this._timeout }, handle);
      return true;
    });
  }
  /**
   * Creates an expectation that is evaluated against located handles.
   *
   * If the expectations do not match, then the locator will retry.
   *
   * @internal
   */
  filterHandle(predicate) {
    return new FilteredLocator(this._clone(), predicate);
  }
  /**
   * Maps the locator using the provided mapper.
   *
   * @internal
   */
  mapHandle(mapper) {
    return new MappedLocator(this._clone(), mapper);
  }
  /**
   * Clicks the located element.
   */
  click(options) {
    return firstValueFrom(this.#click(options));
  }
  /**
   * Fills out the input identified by the locator using the provided value. The
   * type of the input is determined at runtime and the appropriate fill-out
   * method is chosen based on the type. `contenteditable`, select, textarea and
   * input elements are supported.
   */
  fill(value, options) {
    return firstValueFrom(this.#fill(value, options));
  }
  /**
   * Hovers over the located element.
   */
  hover(options) {
    return firstValueFrom(this.#hover(options));
  }
  /**
   * Scrolls the located element.
   */
  scroll(options) {
    return firstValueFrom(this.#scroll(options));
  }
};
var FunctionLocator = class _FunctionLocator extends Locator {
  static create(pageOrFrame, func) {
    return new _FunctionLocator(pageOrFrame, func).setTimeout("getDefaultTimeout" in pageOrFrame ? pageOrFrame.getDefaultTimeout() : pageOrFrame.page().getDefaultTimeout());
  }
  #pageOrFrame;
  #func;
  constructor(pageOrFrame, func) {
    super();
    this.#pageOrFrame = pageOrFrame;
    this.#func = func;
  }
  _clone() {
    return new _FunctionLocator(this.#pageOrFrame, this.#func);
  }
  _wait(options) {
    const signal = options?.signal;
    return defer(() => {
      return from(this.#pageOrFrame.waitForFunction(this.#func, {
        timeout: this.timeout,
        signal
      }));
    }).pipe(throwIfEmpty());
  }
};
var DelegatedLocator = class extends Locator {
  #delegate;
  constructor(delegate) {
    super();
    this.#delegate = delegate;
    this.copyOptions(this.#delegate);
  }
  get delegate() {
    return this.#delegate;
  }
  setTimeout(timeout2) {
    const locator = super.setTimeout(timeout2);
    locator.#delegate = this.#delegate.setTimeout(timeout2);
    return locator;
  }
  setVisibility(visibility) {
    const locator = super.setVisibility(visibility);
    locator.#delegate = locator.#delegate.setVisibility(visibility);
    return locator;
  }
  setWaitForEnabled(value) {
    const locator = super.setWaitForEnabled(value);
    locator.#delegate = this.#delegate.setWaitForEnabled(value);
    return locator;
  }
  setEnsureElementIsInTheViewport(value) {
    const locator = super.setEnsureElementIsInTheViewport(value);
    locator.#delegate = this.#delegate.setEnsureElementIsInTheViewport(value);
    return locator;
  }
  setWaitForStableBoundingBox(value) {
    const locator = super.setWaitForStableBoundingBox(value);
    locator.#delegate = this.#delegate.setWaitForStableBoundingBox(value);
    return locator;
  }
};
var FilteredLocator = class _FilteredLocator extends DelegatedLocator {
  #predicate;
  constructor(base, predicate) {
    super(base);
    this.#predicate = predicate;
  }
  _clone() {
    return new _FilteredLocator(this.delegate.clone(), this.#predicate).copyOptions(this);
  }
  _wait(options) {
    return this.delegate._wait(options).pipe(mergeMap((handle) => {
      return from(Promise.resolve(this.#predicate(handle, options?.signal))).pipe(filter((value) => {
        return value;
      }), map(() => {
        return handle;
      }));
    }), throwIfEmpty());
  }
};
var MappedLocator = class _MappedLocator extends DelegatedLocator {
  #mapper;
  constructor(base, mapper) {
    super(base);
    this.#mapper = mapper;
  }
  _clone() {
    return new _MappedLocator(this.delegate.clone(), this.#mapper).copyOptions(this);
  }
  _wait(options) {
    return this.delegate._wait(options).pipe(mergeMap((handle) => {
      return from(Promise.resolve(this.#mapper(handle, options?.signal)));
    }));
  }
};
var NodeLocator = class _NodeLocator extends Locator {
  static create(pageOrFrame, selector) {
    return new _NodeLocator(pageOrFrame, selector).setTimeout("getDefaultTimeout" in pageOrFrame ? pageOrFrame.getDefaultTimeout() : pageOrFrame.page().getDefaultTimeout());
  }
  static createFromHandle(pageOrFrame, handle) {
    return new _NodeLocator(pageOrFrame, handle).setTimeout("getDefaultTimeout" in pageOrFrame ? pageOrFrame.getDefaultTimeout() : pageOrFrame.page().getDefaultTimeout());
  }
  #pageOrFrame;
  #selectorOrHandle;
  constructor(pageOrFrame, selectorOrHandle) {
    super();
    this.#pageOrFrame = pageOrFrame;
    this.#selectorOrHandle = selectorOrHandle;
  }
  /**
   * Waits for the element to become visible or hidden. visibility === 'visible'
   * means that the element has a computed style, the visibility property other
   * than 'hidden' or 'collapse' and non-empty bounding box. visibility ===
   * 'hidden' means the opposite of that.
   */
  #waitForVisibilityIfNeeded = (handle) => {
    if (!this.visibility) {
      return EMPTY;
    }
    return (() => {
      switch (this.visibility) {
        case "hidden":
          return defer(() => {
            return from(handle.isHidden());
          });
        case "visible":
          return defer(() => {
            return from(handle.isVisible());
          });
      }
    })().pipe(first(identity), retry({ delay: RETRY_DELAY }), ignoreElements());
  };
  _clone() {
    return new _NodeLocator(
      this.#pageOrFrame,
      // @ts-expect-error TSC does cannot parse private overloads.
      this.#selectorOrHandle
    ).copyOptions(this);
  }
  _wait(options) {
    const signal = options?.signal;
    return defer(() => {
      if (typeof this.#selectorOrHandle === "string") {
        return from(this.#pageOrFrame.waitForSelector(this.#selectorOrHandle, {
          visible: false,
          timeout: this._timeout,
          signal
        }));
      } else {
        return of(this.#selectorOrHandle);
      }
    }).pipe(filter((value) => {
      return value !== null;
    }), throwIfEmpty(), this.operators.conditions([this.#waitForVisibilityIfNeeded], signal));
  }
};
function checkLocatorArray(locators) {
  for (const locator of locators) {
    if (!(locator instanceof Locator)) {
      throw new Error("Unknown locator for race candidate");
    }
  }
  return locators;
}
var RaceLocator = class _RaceLocator extends Locator {
  static create(locators) {
    const array = checkLocatorArray(locators);
    return new _RaceLocator(array);
  }
  #locators;
  constructor(locators) {
    super();
    this.#locators = locators;
  }
  _clone() {
    return new _RaceLocator(this.#locators.map((locator) => {
      return locator.clone();
    })).copyOptions(this);
  }
  _wait(options) {
    return race(...this.#locators.map((locator) => {
      return locator._wait(options);
    }));
  }
};
var RETRY_DELAY = 100;

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Page.js
var __runInitializers = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __addDisposableResource3 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources3 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
function setDefaultScreenshotOptions(options) {
  options.optimizeForSpeed ??= false;
  options.type ??= "png";
  options.fromSurface ??= true;
  options.fullPage ??= false;
  options.omitBackground ??= false;
  options.encoding ??= "binary";
  options.captureBeyondViewport ??= true;
}
var Page = (() => {
  let _classSuper = EventEmitter;
  let _instanceExtraInitializers = [];
  let _screenshot_decorators;
  return class Page extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate(this, null, _screenshot_decorators, { kind: "method", name: "screenshot", static: false, private: false, access: { has: (obj) => "screenshot" in obj, get: (obj) => obj.screenshot }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    /**
     * @internal
     */
    _isDragging = (__runInitializers(this, _instanceExtraInitializers), false);
    /**
     * @internal
     */
    _timeoutSettings = new TimeoutSettings();
    #requestHandlers = /* @__PURE__ */ new WeakMap();
    #inflight$ = new ReplaySubject(1);
    /**
     * @internal
     */
    constructor() {
      super();
      fromEmitterEvent(
        this,
        "request"
        /* PageEvent.Request */
      ).pipe(mergeMap((originalRequest) => {
        return concat(of(1), merge(fromEmitterEvent(
          this,
          "requestfailed"
          /* PageEvent.RequestFailed */
        ), fromEmitterEvent(
          this,
          "requestfinished"
          /* PageEvent.RequestFinished */
        ), fromEmitterEvent(
          this,
          "response"
          /* PageEvent.Response */
        ).pipe(map((response) => {
          return response.request();
        }))).pipe(filter((request) => {
          return request.id === originalRequest.id;
        }), take(1), map(() => {
          return -1;
        })));
      }), mergeScan((acc, addend) => {
        return of(acc + addend);
      }, 0), takeUntil(fromEmitterEvent(
        this,
        "close"
        /* PageEvent.Close */
      )), startWith(0)).subscribe(this.#inflight$);
    }
    /**
     * Listen to page events.
     *
     * @remarks
     * This method exists to define event typings and handle proper wireup of
     * cooperative request interception. Actual event listening and dispatching is
     * delegated to {@link EventEmitter}.
     *
     * @internal
     */
    on(type, handler) {
      if (type !== "request") {
        return super.on(type, handler);
      }
      let wrapper = this.#requestHandlers.get(handler);
      if (wrapper === void 0) {
        wrapper = (event) => {
          event.enqueueInterceptAction(() => {
            return handler(event);
          });
        };
        this.#requestHandlers.set(handler, wrapper);
      }
      return super.on(type, wrapper);
    }
    /**
     * @internal
     */
    off(type, handler) {
      if (type === "request") {
        handler = this.#requestHandlers.get(handler) || handler;
      }
      return super.off(type, handler);
    }
    /**
     * {@inheritDoc Accessibility}
     */
    get accessibility() {
      return this.mainFrame().accessibility;
    }
    locator(input) {
      if (typeof input === "string") {
        return NodeLocator.create(this, input);
      } else {
        return FunctionLocator.create(this, input);
      }
    }
    /**
     * A shortcut for {@link Locator.race} that does not require static imports.
     *
     * @internal
     */
    locatorRace(locators) {
      return Locator.race(locators);
    }
    /**
     * Finds the first element that matches the selector. If no element matches
     * the selector, the return value resolves to `null`.
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     *
     * @remarks
     *
     * Shortcut for {@link Frame.$ | Page.mainFrame().$(selector) }.
     */
    async $(selector) {
      return await this.mainFrame().$(selector);
    }
    /**
     * Finds elements on the page that match the selector. If no elements
     * match the selector, the return value resolves to `[]`.
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     *
     * @remarks
     *
     * Shortcut for {@link Frame.$$ | Page.mainFrame().$$(selector) }.
     */
    async $$(selector, options) {
      return await this.mainFrame().$$(selector, options);
    }
    /**
     * @remarks
     *
     * The only difference between {@link Page.evaluate | page.evaluate} and
     * `page.evaluateHandle` is that `evaluateHandle` will return the value
     * wrapped in an in-page object.
     *
     * If the function passed to `page.evaluateHandle` returns a Promise, the
     * function will wait for the promise to resolve and return its value.
     *
     * You can pass a string instead of a function (although functions are
     * recommended as they are easier to debug and use with TypeScript):
     *
     * @example
     *
     * ```ts
     * const aHandle = await page.evaluateHandle('document');
     * ```
     *
     * @example
     * {@link JSHandle} instances can be passed as arguments to the `pageFunction`:
     *
     * ```ts
     * const aHandle = await page.evaluateHandle(() => document.body);
     * const resultHandle = await page.evaluateHandle(
     *   body => body.innerHTML,
     *   aHandle,
     * );
     * console.log(await resultHandle.jsonValue());
     * await resultHandle.dispose();
     * ```
     *
     * Most of the time this function returns a {@link JSHandle},
     * but if `pageFunction` returns a reference to an element,
     * you instead get an {@link ElementHandle} back:
     *
     * @example
     *
     * ```ts
     * const button = await page.evaluateHandle(() =>
     *   document.querySelector('button'),
     * );
     * // can call `click` because `button` is an `ElementHandle`
     * await button.click();
     * ```
     *
     * The TypeScript definitions assume that `evaluateHandle` returns
     * a `JSHandle`, but if you know it's going to return an
     * `ElementHandle`, pass it as the generic argument:
     *
     * ```ts
     * const button = await page.evaluateHandle<ElementHandle>(...);
     * ```
     *
     * @param pageFunction - a function that is run within the page
     * @param args - arguments to be passed to the pageFunction
     */
    async evaluateHandle(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
      return await this.mainFrame().evaluateHandle(pageFunction, ...args);
    }
    /**
     * This method finds the first element within the page that matches the selector
     * and passes the result as the first argument to the `pageFunction`.
     *
     * @remarks
     *
     * If no element is found matching `selector`, the method will throw an error.
     *
     * If `pageFunction` returns a promise `$eval` will wait for the promise to
     * resolve and then return its value.
     *
     * @example
     *
     * ```ts
     * const searchValue = await page.$eval('#search', el => el.value);
     * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
     * const html = await page.$eval('.main-container', el => el.outerHTML);
     * ```
     *
     * If you are using TypeScript, you may have to provide an explicit type to the
     * first argument of the `pageFunction`.
     * By default it is typed as `Element`, but you may need to provide a more
     * specific sub-type:
     *
     * @example
     *
     * ```ts
     * // if you don't provide HTMLInputElement here, TS will error
     * // as `value` is not on `Element`
     * const searchValue = await page.$eval(
     *   '#search',
     *   (el: HTMLInputElement) => el.value,
     * );
     * ```
     *
     * The compiler should be able to infer the return type
     * from the `pageFunction` you provide. If it is unable to, you can use the generic
     * type to tell the compiler what return type you expect from `$eval`:
     *
     * @example
     *
     * ```ts
     * // The compiler can infer the return type in this case, but if it can't
     * // or if you want to be more explicit, provide it as the generic type.
     * const searchValue = await page.$eval<string>(
     *   '#search',
     *   (el: HTMLInputElement) => el.value,
     * );
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param pageFunction - the function to be evaluated in the page context.
     * Will be passed the result of the element matching the selector as its
     * first argument.
     * @param args - any additional arguments to pass through to `pageFunction`.
     *
     * @returns The result of calling `pageFunction`. If it returns an element it
     * is wrapped in an {@link ElementHandle}, else the raw value itself is
     * returned.
     */
    async $eval(selector, pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
      return await this.mainFrame().$eval(selector, pageFunction, ...args);
    }
    /**
     * This method returns all elements matching the selector and passes the
     * resulting array as the first argument to the `pageFunction`.
     *
     * @remarks
     * If `pageFunction` returns a promise `$$eval` will wait for the promise to
     * resolve and then return its value.
     *
     * @example
     *
     * ```ts
     * // get the amount of divs on the page
     * const divCount = await page.$$eval('div', divs => divs.length);
     *
     * // get the text content of all the `.options` elements:
     * const options = await page.$$eval('div > span.options', options => {
     *   return options.map(option => option.textContent);
     * });
     * ```
     *
     * If you are using TypeScript, you may have to provide an explicit type to the
     * first argument of the `pageFunction`.
     * By default it is typed as `Element[]`, but you may need to provide a more
     * specific sub-type:
     *
     * @example
     *
     * ```ts
     * await page.$$eval('input', elements => {
     *   return elements.map(e => e.value);
     * });
     * ```
     *
     * The compiler should be able to infer the return type
     * from the `pageFunction` you provide. If it is unable to, you can use the generic
     * type to tell the compiler what return type you expect from `$$eval`:
     *
     * @example
     *
     * ```ts
     * const allInputValues = await page.$$eval('input', elements =>
     *   elements.map(e => e.textContent),
     * );
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param pageFunction - the function to be evaluated in the page context.
     * Will be passed an array of matching elements as its first argument.
     * @param args - any additional arguments to pass through to `pageFunction`.
     *
     * @returns The result of calling `pageFunction`. If it returns an element it
     * is wrapped in an {@link ElementHandle}, else the raw value itself is
     * returned.
     */
    async $$eval(selector, pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
      return await this.mainFrame().$$eval(selector, pageFunction, ...args);
    }
    /**
     * Adds a `<script>` tag into the page with the desired URL or content.
     *
     * @remarks
     * Shortcut for
     * {@link Frame.addScriptTag | page.mainFrame().addScriptTag(options)}.
     *
     * @param options - Options for the script.
     * @returns An {@link ElementHandle | element handle} to the injected
     * `<script>` element.
     */
    async addScriptTag(options) {
      return await this.mainFrame().addScriptTag(options);
    }
    async addStyleTag(options) {
      return await this.mainFrame().addStyleTag(options);
    }
    /**
     * The page's URL.
     *
     * @remarks
     *
     * Shortcut for {@link Frame.url | page.mainFrame().url()}.
     */
    url() {
      return this.mainFrame().url();
    }
    /**
     * The full HTML contents of the page, including the DOCTYPE.
     */
    async content() {
      return await this.mainFrame().content();
    }
    /**
     * Set the content of the page.
     *
     * @param html - HTML markup to assign to the page.
     * @param options - Parameters that has some properties.
     */
    async setContent(html, options) {
      await this.mainFrame().setContent(html, options);
    }
    /**
     * {@inheritDoc Frame.goto}
     */
    async goto(url, options) {
      return await this.mainFrame().goto(url, options);
    }
    /**
     * Waits for the page to navigate to a new URL or to reload. It is useful when
     * you run code that will indirectly cause the page to navigate.
     *
     * @example
     *
     * ```ts
     * const [response] = await Promise.all([
     *   page.waitForNavigation(), // The promise resolves after navigation has finished
     *   page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
     * ]);
     * ```
     *
     * @remarks
     *
     * Usage of the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
     * to change the URL is considered a navigation.
     *
     * @param options - Navigation parameters which might have the following
     * properties:
     * @returns A `Promise` which resolves to the main resource response.
     *
     * - In case of multiple redirects, the navigation will resolve with the
     *   response of the last redirect.
     * - In case of navigation to a different anchor or navigation due to History
     *   API usage, the navigation will resolve with `null`.
     */
    async waitForNavigation(options = {}) {
      return await this.mainFrame().waitForNavigation(options);
    }
    /**
     * @param urlOrPredicate - A URL or predicate to wait for
     * @param options - Optional waiting parameters
     * @returns Promise which resolves to the matched request
     * @example
     *
     * ```ts
     * const firstRequest = await page.waitForRequest(
     *   'https://example.com/resource',
     * );
     * const finalRequest = await page.waitForRequest(
     *   request => request.url() === 'https://example.com',
     * );
     * return finalRequest.response()?.ok();
     * ```
     *
     * @remarks
     * Optional Waiting Parameters have:
     *
     * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass
     *   `0` to disable the timeout. The default value can be changed by using the
     *   {@link Page.setDefaultTimeout} method.
     */
    waitForRequest(urlOrPredicate, options = {}) {
      const { timeout: ms = this._timeoutSettings.timeout(), signal } = options;
      if (typeof urlOrPredicate === "string") {
        const url = urlOrPredicate;
        urlOrPredicate = (request) => {
          return request.url() === url;
        };
      }
      const observable$ = fromEmitterEvent(
        this,
        "request"
        /* PageEvent.Request */
      ).pipe(filterAsync(urlOrPredicate), raceWith(timeout(ms), fromAbortSignal(signal), fromEmitterEvent(
        this,
        "close"
        /* PageEvent.Close */
      ).pipe(map(() => {
        throw new TargetCloseError("Page closed!");
      }))));
      return firstValueFrom(observable$);
    }
    /**
     * @param urlOrPredicate - A URL or predicate to wait for.
     * @param options - Optional waiting parameters
     * @returns Promise which resolves to the matched response.
     * @example
     *
     * ```ts
     * const firstResponse = await page.waitForResponse(
     *   'https://example.com/resource',
     * );
     * const finalResponse = await page.waitForResponse(
     *   response =>
     *     response.url() === 'https://example.com' && response.status() === 200,
     * );
     * const finalResponse = await page.waitForResponse(async response => {
     *   return (await response.text()).includes('<html>');
     * });
     * return finalResponse.ok();
     * ```
     *
     * @remarks
     * Optional Parameter have:
     *
     * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
     *   pass `0` to disable the timeout. The default value can be changed by using
     *   the {@link Page.setDefaultTimeout} method.
     */
    waitForResponse(urlOrPredicate, options = {}) {
      const { timeout: ms = this._timeoutSettings.timeout(), signal } = options;
      if (typeof urlOrPredicate === "string") {
        const url = urlOrPredicate;
        urlOrPredicate = (response) => {
          return response.url() === url;
        };
      }
      const observable$ = fromEmitterEvent(
        this,
        "response"
        /* PageEvent.Response */
      ).pipe(filterAsync(urlOrPredicate), raceWith(timeout(ms), fromAbortSignal(signal), fromEmitterEvent(
        this,
        "close"
        /* PageEvent.Close */
      ).pipe(map(() => {
        throw new TargetCloseError("Page closed!");
      }))));
      return firstValueFrom(observable$);
    }
    /**
     * Waits for the network to be idle.
     *
     * @remarks The function will always wait at least the
     * set {@link WaitForNetworkIdleOptions.idleTime | IdleTime}.
     *
     * @param options - Options to configure waiting behavior.
     * @returns A promise which resolves once the network is idle.
     */
    waitForNetworkIdle(options = {}) {
      return firstValueFrom(this.waitForNetworkIdle$(options));
    }
    /**
     * @internal
     */
    waitForNetworkIdle$(options = {}) {
      const { timeout: ms = this._timeoutSettings.timeout(), idleTime = NETWORK_IDLE_TIME, concurrency = 0, signal } = options;
      return this.#inflight$.pipe(map((inflight) => {
        return inflight > concurrency;
      }), distinctUntilChanged(), switchMap((isInflightOverConcurrency) => {
        if (isInflightOverConcurrency) {
          return EMPTY;
        }
        return timer(idleTime);
      }), map(() => {
      }), raceWith(timeout(ms), fromAbortSignal(signal), fromEmitterEvent(
        this,
        "close"
        /* PageEvent.Close */
      ).pipe(map(() => {
        throw new TargetCloseError("Page closed!");
      }))));
    }
    /**
     * Waits for a frame matching the given conditions to appear.
     *
     * @example
     *
     * ```ts
     * const frame = await page.waitForFrame(async frame => {
     *   const frameElement = await frame.frameElement();
     *   if (!frameElement) {
     *     return false;
     *   }
     *   const name = await frameElement.evaluate(el => el.getAttribute('name'));
     *   return name === 'test';
     * });
     * ```
     */
    async waitForFrame(urlOrPredicate, options = {}) {
      const { timeout: ms = this.getDefaultTimeout(), signal } = options;
      const predicate = isString(urlOrPredicate) ? (frame) => {
        return urlOrPredicate === frame.url();
      } : urlOrPredicate;
      return await firstValueFrom(merge(fromEmitterEvent(
        this,
        "frameattached"
        /* PageEvent.FrameAttached */
      ), fromEmitterEvent(
        this,
        "framenavigated"
        /* PageEvent.FrameNavigated */
      ), from(this.frames())).pipe(filterAsync(predicate), first(), raceWith(timeout(ms), fromAbortSignal(signal), fromEmitterEvent(
        this,
        "close"
        /* PageEvent.Close */
      ).pipe(map(() => {
        throw new TargetCloseError("Page closed.");
      })))));
    }
    /**
     * Emulates a given device's metrics and user agent.
     *
     * To aid emulation, Puppeteer provides a list of known devices that can be
     * via {@link KnownDevices}.
     *
     * @remarks
     * This method is a shortcut for calling two methods:
     * {@link Page.(setUserAgent:2) } and {@link Page.setViewport}.
     *
     * This method will resize the page. A lot of websites don't expect phones to
     * change size, so you should emulate before navigating to the page.
     *
     * @example
     *
     * ```ts
     * import {KnownDevices} from 'puppeteer';
     * const iPhone = KnownDevices['iPhone 15 Pro'];
     *
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * await page.emulate(iPhone);
     * await page.goto('https://www.google.com');
     * // other actions...
     * await browser.close();
     * ```
     */
    async emulate(device) {
      await Promise.all([
        this.setUserAgent({ userAgent: device.userAgent }),
        this.setViewport(device.viewport)
      ]);
    }
    /**
     * Evaluates a function in the page's context and returns the result.
     *
     * If the function passed to `page.evaluate` returns a Promise, the
     * function will wait for the promise to resolve and return its value.
     *
     * @example
     *
     * ```ts
     * const result = await frame.evaluate(() => {
     *   return Promise.resolve(8 * 7);
     * });
     * console.log(result); // prints "56"
     * ```
     *
     * You can pass a string instead of a function (although functions are
     * recommended as they are easier to debug and use with TypeScript):
     *
     * @example
     *
     * ```ts
     * const aHandle = await page.evaluate('1 + 2');
     * ```
     *
     * To get the best TypeScript experience, you should pass in as the
     * generic the type of `pageFunction`:
     *
     * ```ts
     * const aHandle = await page.evaluate(() => 2);
     * ```
     *
     * @example
     *
     * {@link ElementHandle} instances (including {@link JSHandle}s) can be passed
     * as arguments to the `pageFunction`:
     *
     * ```ts
     * const bodyHandle = await page.$('body');
     * const html = await page.evaluate(body => body.innerHTML, bodyHandle);
     * await bodyHandle.dispose();
     * ```
     *
     * @param pageFunction - a function that is run within the page
     * @param args - arguments to be passed to the pageFunction
     *
     * @returns the return value of `pageFunction`.
     */
    async evaluate(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
      return await this.mainFrame().evaluate(pageFunction, ...args);
    }
    /**
     * @internal
     */
    async _maybeWriteTypedArrayToFile(path, typedArray) {
      if (!path) {
        return;
      }
      await environment.value.fs.promises.writeFile(path, typedArray);
    }
    /**
     * Captures a screencast of this {@link Page | page}.
     *
     * @example
     * Recording a {@link Page | page}:
     *
     * ```
     * import puppeteer from 'puppeteer';
     *
     * // Launch a browser
     * const browser = await puppeteer.launch();
     *
     * // Create a new page
     * const page = await browser.newPage();
     *
     * // Go to your site.
     * await page.goto("https://www.example.com");
     *
     * // Start recording.
     * const recorder = await page.screencast({path: 'recording.webm'});
     *
     * // Do something.
     *
     * // Stop recording.
     * await recorder.stop();
     *
     * browser.close();
     * ```
     *
     * @param options - Configures screencast behavior.
     *
     * @experimental
     *
     * @remarks
     *
     * By default, all recordings will be {@link https://www.webmproject.org/ | WebM} format using
     * the {@link https://www.webmproject.org/vp9/ | VP9} video codec, with a frame rate of 30 FPS.
     *
     * You must have {@link https://ffmpeg.org/ | ffmpeg} installed on your system.
     */
    async screencast(options = {}) {
      const ScreenRecorder = environment.value.ScreenRecorder;
      const [width, height, devicePixelRatio] = await this.#getNativePixelDimensions();
      let crop;
      if (options.crop) {
        const { x, y, width: cropWidth, height: cropHeight } = roundRectangle(normalizeRectangle(options.crop));
        if (x < 0 || y < 0) {
          throw new Error(`\`crop.x\` and \`crop.y\` must be greater than or equal to 0.`);
        }
        if (cropWidth <= 0 || cropHeight <= 0) {
          throw new Error(`\`crop.height\` and \`crop.width\` must be greater than or equal to 0.`);
        }
        const viewportWidth = width / devicePixelRatio;
        const viewportHeight = height / devicePixelRatio;
        if (x + cropWidth > viewportWidth) {
          throw new Error(`\`crop.width\` cannot be larger than the viewport width (${viewportWidth}).`);
        }
        if (y + cropHeight > viewportHeight) {
          throw new Error(`\`crop.height\` cannot be larger than the viewport height (${viewportHeight}).`);
        }
        crop = {
          x: x * devicePixelRatio,
          y: y * devicePixelRatio,
          width: cropWidth * devicePixelRatio,
          height: cropHeight * devicePixelRatio
        };
      }
      if (options.speed !== void 0 && options.speed <= 0) {
        throw new Error(`\`speed\` must be greater than 0.`);
      }
      if (options.scale !== void 0 && options.scale <= 0) {
        throw new Error(`\`scale\` must be greater than 0.`);
      }
      const recorder = new ScreenRecorder(this, width, height, {
        ...options,
        crop
      });
      try {
        await this._startScreencast();
      } catch (error) {
        void recorder.stop();
        throw error;
      }
      if (options.path) {
        const { createWriteStream } = environment.value.fs;
        const stream = createWriteStream(options.path, "binary");
        recorder.pipe(stream);
      }
      return recorder;
    }
    #screencastSessionCount = 0;
    #startScreencastPromise;
    /**
     * @internal
     */
    async _startScreencast() {
      ++this.#screencastSessionCount;
      if (!this.#startScreencastPromise) {
        this.#startScreencastPromise = this.mainFrame().client.send("Page.startScreencast", { format: "png" }).then(() => {
          return new Promise((resolve) => {
            return this.mainFrame().client.once("Page.screencastFrame", () => {
              return resolve();
            });
          });
        });
      }
      await this.#startScreencastPromise;
    }
    /**
     * @internal
     */
    async _stopScreencast() {
      --this.#screencastSessionCount;
      if (!this.#startScreencastPromise) {
        return;
      }
      this.#startScreencastPromise = void 0;
      if (this.#screencastSessionCount === 0) {
        await this.mainFrame().client.send("Page.stopScreencast");
      }
    }
    /**
     * Gets the native, non-emulated dimensions of the viewport.
     */
    async #getNativePixelDimensions() {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        const viewport = this.viewport();
        const stack = __addDisposableResource3(env_1, new DisposableStack(), false);
        if (viewport && viewport.deviceScaleFactor !== 0) {
          await this.setViewport({ ...viewport, deviceScaleFactor: 0 });
          stack.defer(() => {
            void this.setViewport(viewport).catch(debugError);
          });
        }
        return await this.mainFrame().isolatedRealm().evaluate(() => {
          return [
            window.visualViewport.width * window.devicePixelRatio,
            window.visualViewport.height * window.devicePixelRatio,
            window.devicePixelRatio
          ];
        });
      } catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
      } finally {
        __disposeResources3(env_1);
      }
    }
    async screenshot(userOptions = {}) {
      const env_2 = { stack: [], error: void 0, hasError: false };
      try {
        const _guard = __addDisposableResource3(env_2, await this.browserContext().startScreenshot(), false);
        const options = {
          ...userOptions,
          clip: userOptions.clip ? {
            ...userOptions.clip
          } : void 0
        };
        if (options.type === void 0 && options.path !== void 0) {
          const filePath = options.path;
          const extension = filePath.slice(filePath.lastIndexOf(".") + 1).toLowerCase();
          switch (extension) {
            case "png":
              options.type = "png";
              break;
            case "jpeg":
            case "jpg":
              options.type = "jpeg";
              break;
            case "webp":
              options.type = "webp";
              break;
          }
        }
        if (options.quality !== void 0) {
          if (options.quality < 0 || options.quality > 100) {
            throw new Error(`Expected 'quality' (${options.quality}) to be between 0 and 100, inclusive.`);
          }
          if (options.type === void 0 || !["jpeg", "webp"].includes(options.type)) {
            throw new Error(`${options.type ?? "png"} screenshots do not support 'quality'.`);
          }
        }
        if (options.clip) {
          if (options.clip.width <= 0) {
            throw new Error("'width' in 'clip' must be positive.");
          }
          if (options.clip.height <= 0) {
            throw new Error("'height' in 'clip' must be positive.");
          }
        }
        setDefaultScreenshotOptions(options);
        const stack = __addDisposableResource3(env_2, new AsyncDisposableStack(), true);
        if (options.clip) {
          if (options.fullPage) {
            throw new Error("'clip' and 'fullPage' are mutually exclusive");
          }
          options.clip = roundRectangle(normalizeRectangle(options.clip));
        } else {
          if (options.fullPage) {
            if (!options.captureBeyondViewport) {
              const scrollDimensions = await this.mainFrame().isolatedRealm().evaluate(() => {
                const element = document.documentElement;
                return {
                  width: element.scrollWidth,
                  height: element.scrollHeight
                };
              });
              const viewport = this.viewport();
              await this.setViewport({
                ...viewport,
                ...scrollDimensions
              });
              stack.defer(async () => {
                await this.setViewport(viewport).catch(debugError);
              });
            }
          } else {
            options.captureBeyondViewport = false;
          }
        }
        const data = await this._screenshot(options);
        if (options.encoding === "base64") {
          return data;
        }
        const typedArray = stringToTypedArray(data, true);
        await this._maybeWriteTypedArrayToFile(options.path, typedArray);
        return typedArray;
      } catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
      } finally {
        const result_1 = __disposeResources3(env_2);
        if (result_1)
          await result_1;
      }
    }
    /**
     * The page's title
     *
     * @remarks
     *
     * Shortcut for {@link Frame.title | page.mainFrame().title()}.
     */
    async title() {
      return await this.mainFrame().title();
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.mouse} to click in the center of the
     * element. If there's no element matching `selector`, the method throws an
     * error.
     *
     * @remarks
     *
     * Bear in mind that if `click()` triggers a navigation event and
     * there's a separate `page.waitForNavigation()` promise to be resolved, you
     * may end up with a race condition that yields unexpected results. The
     * correct pattern for click and wait for navigation is the following:
     *
     * ```ts
     * const [response] = await Promise.all([
     *   page.waitForNavigation(waitOptions),
     *   page.click(selector, clickOptions),
     * ]);
     * ```
     *
     * Shortcut for {@link Frame.click | page.mainFrame().click(selector[, options]) }.
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}. If there are
     * multiple elements satisfying the `selector`, the first will be clicked
     * @param options - `Object`
     * @returns Promise which resolves when the element matching `selector` is
     * successfully clicked. The Promise will be rejected if there is no element
     * matching `selector`.
     */
    click(selector, options) {
      return this.mainFrame().click(selector, options);
    }
    /**
     * This method fetches an element with `selector` and focuses it. If
     * there's no element matching `selector`, the method throws an error.
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * If there are multiple elements satisfying the selector, the first
     * will be focused.
     * @returns Promise which resolves when the element matching selector
     * is successfully focused. The promise will be rejected if there is
     * no element matching selector.
     *
     * @remarks
     *
     * Shortcut for
     * {@link Frame.focus | page.mainFrame().focus(selector)}.
     */
    focus(selector) {
      return this.mainFrame().focus(selector);
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.mouse}
     * to hover over the center of the element.
     * If there's no element matching `selector`, the method throws an error.
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}. If there are
     * multiple elements satisfying the `selector`, the first will be hovered.
     * @returns Promise which resolves when the element matching `selector` is
     * successfully hovered. Promise gets rejected if there's no element matching
     * `selector`.
     *
     * @remarks
     *
     * Shortcut for {@link Page.hover | page.mainFrame().hover(selector)}.
     */
    hover(selector) {
      return this.mainFrame().hover(selector);
    }
    /**
     * Triggers a `change` and `input` event once all the provided options have been
     * selected. If there's no `<select>` element matching `selector`, the method
     * throws an error.
     *
     * @example
     *
     * ```ts
     * page.select('select#colors', 'blue'); // single selection
     * page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param values - Values of options to select. If the `<select>` has the
     * `multiple` attribute, all values are considered, otherwise only the first one
     * is taken into account.
     * @returns
     *
     * @remarks
     *
     * Shortcut for {@link Frame.select | page.mainFrame().select()}
     */
    select(selector, ...values) {
      return this.mainFrame().select(selector, ...values);
    }
    /**
     * This method fetches an element with `selector`, scrolls it into view if
     * needed, and then uses {@link Page.touchscreen}
     * to tap in the center of the element.
     * If there's no element matching `selector`, the method throws an error.
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}. If there are multiple elements satisfying the
     * selector, the first will be tapped.
     *
     * @remarks
     *
     * Shortcut for {@link Frame.tap | page.mainFrame().tap(selector)}.
     */
    tap(selector) {
      return this.mainFrame().tap(selector);
    }
    /**
     * Sends a `keydown`, `keypress/input`, and `keyup` event for each character
     * in the text.
     *
     * To press a special key, like `Control` or `ArrowDown`, use {@link Keyboard.press}.
     * @example
     *
     * ```ts
     * await page.type('#mytextarea', 'Hello');
     * // Types instantly
     * await page.type('#mytextarea', 'World', {delay: 100});
     * // Types slower, like a user
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param text - A text to type into a focused element.
     * @param options - have property `delay` which is the Time to wait between
     * key presses in milliseconds. Defaults to `0`.
     * @returns
     */
    type(selector, text, options) {
      return this.mainFrame().type(selector, text, options);
    }
    /**
     * Wait for the `selector` to appear in page. If at the moment of calling the
     * method the `selector` already exists, the method will return immediately. If
     * the `selector` doesn't appear after the `timeout` milliseconds of waiting, the
     * function will throw.
     *
     * @example
     * This method works across navigations:
     *
     * ```ts
     * import puppeteer from 'puppeteer';
     *
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * let currentURL;
     * page
     *   .waitForSelector('img')
     *   .then(() => console.log('First URL with image: ' + currentURL));
     * for (currentURL of [
     *   'https://example.com',
     *   'https://google.com',
     *   'https://bbc.com',
     * ]) {
     *   await page.goto(currentURL);
     * }
     * await browser.close();
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param options - Optional waiting parameters
     * @returns Promise which resolves when element specified by selector string
     * is added to DOM. Resolves to `null` if waiting for hidden: `true` and
     * selector is not found in DOM.
     *
     * @remarks
     * The optional Parameter in Arguments `options` are:
     *
     * - `visible`: A boolean wait for element to be present in DOM and to be
     *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
     *   properties. Defaults to `false`.
     *
     * - `hidden`: Wait for element to not be found in the DOM or to be hidden,
     *   i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to
     *   `false`.
     *
     * - `timeout`: maximum time to wait for in milliseconds. Defaults to `30000`
     *   (30 seconds). Pass `0` to disable timeout. The default value can be changed
     *   by using the {@link Page.setDefaultTimeout} method.
     */
    async waitForSelector(selector, options = {}) {
      return await this.mainFrame().waitForSelector(selector, options);
    }
    /**
     * Waits for the provided function, `pageFunction`, to return a truthy value when
     * evaluated in the page's context.
     *
     * @example
     * {@link Page.waitForFunction} can be used to observe a viewport size change:
     *
     * ```ts
     * import puppeteer from 'puppeteer';
     *
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * const watchDog = page.waitForFunction('window.innerWidth < 100');
     * await page.setViewport({width: 50, height: 50});
     * await watchDog;
     * await browser.close();
     * ```
     *
     * @example
     * Arguments can be passed from Node.js to `pageFunction`:
     *
     * ```ts
     * const selector = '.foo';
     * await page.waitForFunction(
     *   selector => !!document.querySelector(selector),
     *   {},
     *   selector,
     * );
     * ```
     *
     * @example
     * The provided `pageFunction` can be asynchronous:
     *
     * ```ts
     * const username = 'github-username';
     * await page.waitForFunction(
     *   async username => {
     *     const githubResponse = await fetch(
     *       `https://api.github.com/users/${username}`,
     *     );
     *     const githubUser = await githubResponse.json();
     *     // show the avatar
     *     const img = document.createElement('img');
     *     img.src = githubUser.avatar_url;
     *     // wait 3 seconds
     *     await new Promise((resolve, reject) => setTimeout(resolve, 3000));
     *     img.remove();
     *   },
     *   {},
     *   username,
     * );
     * ```
     *
     * @param pageFunction - Function to be evaluated in browser context until it returns a
     * truthy value.
     * @param options - Options for configuring waiting behavior.
     */
    waitForFunction(pageFunction, options, ...args) {
      return this.mainFrame().waitForFunction(pageFunction, options, ...args);
    }
    /** @internal */
    [(_screenshot_decorators = [guarded(function() {
      return this.browser();
    })], disposeSymbol)]() {
      return void this.close().catch(debugError);
    }
    /** @internal */
    [asyncDisposeSymbol]() {
      return this.close();
    }
  };
})();
function normalizeRectangle(clip) {
  return {
    ...clip,
    ...clip.width < 0 ? {
      x: clip.x + clip.width,
      width: -clip.width
    } : {
      x: clip.x,
      width: clip.width
    },
    ...clip.height < 0 ? {
      y: clip.y + clip.height,
      height: -clip.height
    } : {
      y: clip.y,
      height: clip.height
    }
  };
}
function roundRectangle(clip) {
  const x = Math.round(clip.x);
  const y = Math.round(clip.y);
  const width = Math.round(clip.width + clip.x - x);
  const height = Math.round(clip.height + clip.y - y);
  return { ...clip, x, y, width, height };
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/ConsoleMessage.js
var ConsoleMessage = class {
  #type;
  #text;
  #args;
  #stackTraceLocations;
  #frame;
  /**
   * @internal
   */
  constructor(type, text, args, stackTraceLocations, frame) {
    this.#type = type;
    this.#text = text;
    this.#args = args;
    this.#stackTraceLocations = stackTraceLocations;
    this.#frame = frame;
  }
  /**
   * The type of the console message.
   */
  type() {
    return this.#type;
  }
  /**
   * The text of the console message.
   */
  text() {
    return this.#text;
  }
  /**
   * An array of arguments passed to the console.
   */
  args() {
    return this.#args;
  }
  /**
   * The location of the console message.
   */
  location() {
    return this.#stackTraceLocations[0] ?? (this.#frame ? { url: this.#frame.url() } : {});
  }
  /**
   * The array of locations on the stack of the console message.
   */
  stackTrace() {
    return this.#stackTraceLocations;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/FileChooser.js
var FileChooser = class {
  #element;
  #multiple;
  #handled = false;
  /**
   * @internal
   */
  constructor(element, multiple) {
    this.#element = element;
    this.#multiple = multiple;
  }
  /**
   * Whether file chooser allow for
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple | multiple}
   * file selection.
   */
  isMultiple() {
    return this.#multiple;
  }
  /**
   * Accept the file chooser request with the given file paths.
   *
   * @remarks This will not validate whether the file paths exists. Also, if a
   * path is relative, then it is resolved against the
   * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
   * For locals script connecting to remote chrome environments, paths must be
   * absolute.
   */
  async accept(paths) {
    assert(!this.#handled, "Cannot accept FileChooser which is already handled!");
    this.#handled = true;
    await this.#element.uploadFile(...paths);
  }
  /**
   * Closes the file chooser without selecting any files.
   */
  async cancel() {
    assert(!this.#handled, "Cannot cancel FileChooser which is already handled!");
    this.#handled = true;
    await this.#element.evaluate((element) => {
      element.dispatchEvent(new Event("cancel", { bubbles: true }));
    });
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/NetworkManagerEvents.js
var NetworkManagerEvent;
(function(NetworkManagerEvent2) {
  NetworkManagerEvent2.Request = Symbol("NetworkManager.Request");
  NetworkManagerEvent2.RequestServedFromCache = Symbol("NetworkManager.RequestServedFromCache");
  NetworkManagerEvent2.Response = Symbol("NetworkManager.Response");
  NetworkManagerEvent2.RequestFailed = Symbol("NetworkManager.RequestFailed");
  NetworkManagerEvent2.RequestFinished = Symbol("NetworkManager.RequestFinished");
})(NetworkManagerEvent || (NetworkManagerEvent = {}));

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/ErrorLike.js
function isErrorLike(obj) {
  return typeof obj === "object" && obj !== null && "name" in obj && "message" in obj;
}
function rewriteError(error, message, originalMessage) {
  error.message = message;
  error.originalMessage = originalMessage ?? error.originalMessage;
  return error;
}
function createProtocolErrorMessage(object) {
  let message = object.error.message;
  if (object.error && typeof object.error === "object" && "data" in object.error) {
    message += ` ${object.error.data}`;
  }
  return message;
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/JSHandle.js
var __runInitializers2 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __addDisposableResource4 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources4 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var JSHandle = (() => {
  let _classDecorators = [moveable];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getProperty_decorators;
  let _getProperties_decorators;
  var JSHandle2 = class {
    static {
      _classThis = this;
    }
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      __esDecorate2(this, null, _getProperty_decorators, { kind: "method", name: "getProperty", static: false, private: false, access: { has: (obj) => "getProperty" in obj, get: (obj) => obj.getProperty }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate2(this, null, _getProperties_decorators, { kind: "method", name: "getProperties", static: false, private: false, access: { has: (obj) => "getProperties" in obj, get: (obj) => obj.getProperties }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate2(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
      JSHandle2 = _classThis = _classDescriptor.value;
      if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
      __runInitializers2(_classThis, _classExtraInitializers);
    }
    /**
     * @internal
     */
    constructor() {
      __runInitializers2(this, _instanceExtraInitializers);
    }
    /**
     * Evaluates the given function with the current handle as its first argument.
     */
    async evaluate(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
      return await this.realm.evaluate(pageFunction, this, ...args);
    }
    /**
     * Evaluates the given function with the current handle as its first argument.
     *
     */
    async evaluateHandle(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
      return await this.realm.evaluateHandle(pageFunction, this, ...args);
    }
    /**
     * @internal
     */
    async getProperty(propertyName) {
      return await this.evaluateHandle((object, propertyName2) => {
        return object[propertyName2];
      }, propertyName);
    }
    /**
     * Gets a map of handles representing the properties of the current handle.
     *
     * @example
     *
     * ```ts
     * const listHandle = await page.evaluateHandle(() => document.body.children);
     * const properties = await listHandle.getProperties();
     * const children = [];
     * for (const property of properties.values()) {
     *   const element = property.asElement();
     *   if (element) {
     *     children.push(element);
     *   }
     * }
     * children; // holds elementHandles to all children of document.body
     * ```
     */
    async getProperties() {
      const propertyNames = await this.evaluate((object) => {
        const enumerableProperties = [];
        const descriptors = Object.getOwnPropertyDescriptors(object);
        for (const propertyName in descriptors) {
          if (descriptors[propertyName]?.enumerable) {
            enumerableProperties.push(propertyName);
          }
        }
        return enumerableProperties;
      });
      const map2 = /* @__PURE__ */ new Map();
      const results = await Promise.all(propertyNames.map((key) => {
        return this.getProperty(key);
      }));
      for (const [key, value] of Object.entries(propertyNames)) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
          const handle = __addDisposableResource4(env_1, results[key], false);
          if (handle) {
            map2.set(value, handle.move());
          }
        } catch (e_1) {
          env_1.error = e_1;
          env_1.hasError = true;
        } finally {
          __disposeResources4(env_1);
        }
      }
      return map2;
    }
    /** @internal */
    [(_getProperty_decorators = [throwIfDisposed()], _getProperties_decorators = [throwIfDisposed()], disposeSymbol)]() {
      return void this.dispose().catch(debugError);
    }
    /** @internal */
    [asyncDisposeSymbol]() {
      return this.dispose();
    }
  };
  return JSHandle2 = _classThis;
})();

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Binding.js
var __addDisposableResource5 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources5 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var Binding = class {
  #name;
  #fn;
  #initSource;
  constructor(name, fn, initSource) {
    this.#name = name;
    this.#fn = fn;
    this.#initSource = initSource;
  }
  get name() {
    return this.#name;
  }
  get initSource() {
    return this.#initSource;
  }
  /**
   * @param context - Context to run the binding in; the context should have
   * the binding added to it beforehand.
   * @param id - ID of the call. This should come from the CDP
   * `onBindingCalled` response.
   * @param args - Plain arguments from CDP.
   */
  async run(context2, id, args, isTrivial) {
    const stack = new DisposableStack();
    try {
      if (!isTrivial) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
          const handles = __addDisposableResource5(env_1, await context2.evaluateHandle((name, seq) => {
            return globalThis[name].args.get(seq);
          }, this.#name, id), false);
          const properties = await handles.getProperties();
          for (const [index, handle] of properties) {
            if (index in args) {
              switch (handle.remoteObject().subtype) {
                case "node":
                  args[+index] = handle;
                  break;
                default:
                  stack.use(handle);
              }
            } else {
              stack.use(handle);
            }
          }
        } catch (e_1) {
          env_1.error = e_1;
          env_1.hasError = true;
        } finally {
          __disposeResources5(env_1);
        }
      }
      await context2.evaluate((name, seq, result) => {
        const callbacks = globalThis[name].callbacks;
        callbacks.get(seq).resolve(result);
        callbacks.delete(seq);
      }, this.#name, id, await this.#fn(...args));
      for (const arg of args) {
        if (arg instanceof JSHandle) {
          stack.use(arg);
        }
      }
    } catch (error) {
      if (isErrorLike(error)) {
        await context2.evaluate((name, seq, message, stack2) => {
          const error2 = new Error(message);
          error2.stack = stack2;
          const callbacks = globalThis[name].callbacks;
          callbacks.get(seq).reject(error2);
          callbacks.delete(seq);
        }, this.#name, id, error.message, error.stack).catch(debugError);
      } else {
        await context2.evaluate((name, seq, error2) => {
          const callbacks = globalThis[name].callbacks;
          callbacks.get(seq).reject(error2);
          callbacks.delete(seq);
        }, this.#name, id, error).catch(debugError);
      }
    }
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/incremental-id-generator.js
function createIncrementalIdGenerator() {
  let id = 0;
  return () => {
    if (id === Number.MAX_SAFE_INTEGER) {
      id = 0;
    }
    return ++id;
  };
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/CallbackRegistry.js
var idGenerator = createIncrementalIdGenerator();
var CallbackRegistry = class {
  #callbacks = /* @__PURE__ */ new Map();
  #idGenerator = idGenerator;
  create(label, timeout2, request) {
    const callback = new Callback(this.#idGenerator(), label, timeout2);
    this.#callbacks.set(callback.id, callback);
    try {
      request(callback.id);
    } catch (error) {
      callback.promise.catch(debugError).finally(() => {
        this.#callbacks.delete(callback.id);
      });
      callback.reject(error);
      throw error;
    }
    return callback.promise.finally(() => {
      this.#callbacks.delete(callback.id);
    });
  }
  reject(id, message, originalMessage) {
    const callback = this.#callbacks.get(id);
    if (!callback) {
      return;
    }
    this._reject(callback, message, originalMessage);
  }
  rejectRaw(id, error) {
    const callback = this.#callbacks.get(id);
    if (!callback) {
      return;
    }
    callback.reject(error);
  }
  _reject(callback, errorMessage, originalMessage) {
    let error;
    let message;
    if (errorMessage instanceof ProtocolError) {
      error = errorMessage;
      error.cause = callback.error;
      message = errorMessage.message;
    } else {
      error = callback.error;
      message = errorMessage;
    }
    callback.reject(rewriteError(error, `Protocol error (${callback.label}): ${message}`, originalMessage));
  }
  resolve(id, value) {
    const callback = this.#callbacks.get(id);
    if (!callback) {
      return;
    }
    callback.resolve(value);
  }
  clear() {
    for (const callback of this.#callbacks.values()) {
      this._reject(callback, new TargetCloseError("Target closed"));
    }
    this.#callbacks.clear();
  }
  /**
   * @internal
   */
  getPendingProtocolErrors() {
    const result = [];
    for (const callback of this.#callbacks.values()) {
      result.push(new Error(`${callback.label} timed out. Trace: ${callback.error.stack}`));
    }
    return result;
  }
};
var Callback = class {
  #id;
  #error = new ProtocolError();
  #deferred = Deferred.create();
  #timer;
  #label;
  constructor(id, label, timeout2) {
    this.#id = id;
    this.#label = label;
    if (timeout2) {
      this.#timer = setTimeout(() => {
        this.#deferred.reject(rewriteError(this.#error, `${label} timed out. Increase the 'protocolTimeout' setting in launch/connect calls for a higher timeout if needed.`));
      }, timeout2);
    }
  }
  resolve(value) {
    clearTimeout(this.#timer);
    this.#deferred.resolve(value);
  }
  reject(error) {
    clearTimeout(this.#timer);
    this.#deferred.reject(error);
  }
  get id() {
    return this.#id;
  }
  get promise() {
    return this.#deferred.valueOrThrow();
  }
  get error() {
    return this.#error;
  }
  get label() {
    return this.#label;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/CdpSession.js
var CdpCDPSession = class extends CDPSession {
  #sessionId;
  #targetType;
  #callbacks = new CallbackRegistry();
  #connection;
  #parentSessionId;
  #target;
  #rawErrors = false;
  #detached = false;
  /**
   * @internal
   */
  constructor(connection, targetType, sessionId, parentSessionId, rawErrors) {
    super();
    this.#connection = connection;
    this.#targetType = targetType;
    this.#sessionId = sessionId;
    this.#parentSessionId = parentSessionId;
    this.#rawErrors = rawErrors;
  }
  /**
   * Sets the {@link CdpTarget} associated with the session instance.
   *
   * @internal
   */
  setTarget(target) {
    this.#target = target;
  }
  /**
   * Gets the {@link CdpTarget} associated with the session instance.
   *
   * @internal
   */
  target() {
    assert(this.#target, "Target must exist");
    return this.#target;
  }
  connection() {
    return this.#connection;
  }
  get detached() {
    return this.#connection._closed || this.#detached;
  }
  parentSession() {
    if (!this.#parentSessionId) {
      return this;
    }
    const parent = this.#connection?.session(this.#parentSessionId);
    return parent ?? void 0;
  }
  send(method, params, options) {
    if (this.detached) {
      return Promise.reject(new TargetCloseError(`Protocol error (${method}): Session closed. Most likely the ${this.#targetType} has been closed.`));
    }
    return this.#connection._rawSend(this.#callbacks, method, params, this.#sessionId, options);
  }
  /**
   * @internal
   */
  onMessage(object) {
    if (object.id) {
      if (object.error) {
        if (this.#rawErrors) {
          this.#callbacks.rejectRaw(object.id, object.error);
        } else {
          this.#callbacks.reject(object.id, createProtocolErrorMessage(object), object.error.message);
        }
      } else {
        this.#callbacks.resolve(object.id, object.result);
      }
    } else {
      assert(!object.id);
      this.emit(object.method, object.params);
    }
  }
  /**
   * Detaches the cdpSession from the target. Once detached, the cdpSession object
   * won't emit any events and can't be used to send messages.
   */
  async detach() {
    if (this.detached) {
      throw new Error(`Session already detached. Most likely the ${this.#targetType} has been closed.`);
    }
    await this.#connection.send("Target.detachFromTarget", {
      sessionId: this.#sessionId
    });
    this.#detached = true;
  }
  /**
   * @internal
   */
  onClosed() {
    this.#callbacks.clear();
    this.#detached = true;
    this.emit(CDPSessionEvent.Disconnected, void 0);
  }
  /**
   * Returns the session's id.
   */
  id() {
    return this.#sessionId;
  }
  /**
   * @internal
   */
  getPendingProtocolErrors() {
    return this.#callbacks.getPendingProtocolErrors();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Connection.js
var debugProtocolSend = debug("puppeteer:protocol:SEND \u25BA");
var debugProtocolReceive = debug("puppeteer:protocol:RECV \u25C0");
var Connection = class extends EventEmitter {
  #url;
  #transport;
  #delay;
  #timeout;
  #sessions = /* @__PURE__ */ new Map();
  #closed = false;
  #manuallyAttached = /* @__PURE__ */ new Set();
  #callbacks;
  #rawErrors = false;
  constructor(url, transport, delay = 0, timeout2, rawErrors = false) {
    super();
    this.#rawErrors = rawErrors;
    this.#callbacks = new CallbackRegistry();
    this.#url = url;
    this.#delay = delay;
    this.#timeout = timeout2 ?? 18e4;
    this.#transport = transport;
    this.#transport.onmessage = this.onMessage.bind(this);
    this.#transport.onclose = this.#onClose.bind(this);
  }
  static fromSession(session) {
    return session.connection();
  }
  /**
   * @internal
   */
  get delay() {
    return this.#delay;
  }
  get timeout() {
    return this.#timeout;
  }
  /**
   * @internal
   */
  get _closed() {
    return this.#closed;
  }
  /**
   * @internal
   */
  get _sessions() {
    return this.#sessions;
  }
  /**
   * @internal
   */
  _session(sessionId) {
    return this.#sessions.get(sessionId) || null;
  }
  /**
   * @param sessionId - The session id
   * @returns The current CDP session if it exists
   */
  session(sessionId) {
    return this._session(sessionId);
  }
  url() {
    return this.#url;
  }
  send(method, params, options) {
    return this._rawSend(this.#callbacks, method, params, void 0, options);
  }
  /**
   * @internal
   */
  _rawSend(callbacks, method, params, sessionId, options) {
    if (this.#closed) {
      return Promise.reject(new ConnectionClosedError("Connection closed."));
    }
    return callbacks.create(method, options?.timeout ?? this.#timeout, (id) => {
      const stringifiedMessage = JSON.stringify({
        method,
        params,
        id,
        sessionId
      });
      debugProtocolSend(stringifiedMessage);
      this.#transport.send(stringifiedMessage);
    });
  }
  /**
   * @internal
   */
  async closeBrowser() {
    await this.send("Browser.close");
  }
  /**
   * @internal
   */
  async onMessage(message) {
    if (this.#delay) {
      await new Promise((r) => {
        return setTimeout(r, this.#delay);
      });
    }
    debugProtocolReceive(message);
    const object = JSON.parse(message);
    if (object.method === "Target.attachedToTarget") {
      const sessionId = object.params.sessionId;
      const session = new CdpCDPSession(this, object.params.targetInfo.type, sessionId, object.sessionId, this.#rawErrors);
      this.#sessions.set(sessionId, session);
      this.emit(CDPSessionEvent.SessionAttached, session);
      const parentSession = this.#sessions.get(object.sessionId);
      if (parentSession) {
        parentSession.emit(CDPSessionEvent.SessionAttached, session);
      }
    } else if (object.method === "Target.detachedFromTarget") {
      const session = this.#sessions.get(object.params.sessionId);
      if (session) {
        session.onClosed();
        this.#sessions.delete(object.params.sessionId);
        this.emit(CDPSessionEvent.SessionDetached, session);
        const parentSession = this.#sessions.get(object.sessionId);
        if (parentSession) {
          parentSession.emit(CDPSessionEvent.SessionDetached, session);
        }
      }
    }
    if (object.sessionId) {
      const session = this.#sessions.get(object.sessionId);
      if (session) {
        session.onMessage(object);
      }
    } else if (object.id) {
      if (object.error) {
        if (this.#rawErrors) {
          this.#callbacks.rejectRaw(object.id, object.error);
        } else {
          this.#callbacks.reject(object.id, createProtocolErrorMessage(object), object.error.message);
        }
      } else {
        this.#callbacks.resolve(object.id, object.result);
      }
    } else {
      this.emit(object.method, object.params);
    }
  }
  #onClose() {
    if (this.#closed) {
      return;
    }
    this.#closed = true;
    this.#transport.onmessage = void 0;
    this.#transport.onclose = void 0;
    this.#callbacks.clear();
    for (const session of this.#sessions.values()) {
      session.onClosed();
    }
    this.#sessions.clear();
    this.emit(CDPSessionEvent.Disconnected, void 0);
  }
  dispose() {
    this.#onClose();
    this.#transport.close();
  }
  /**
   * @internal
   */
  isAutoAttached(targetId) {
    return !this.#manuallyAttached.has(targetId);
  }
  /**
   * @internal
   */
  async _createSession(targetInfo, isAutoAttachEmulated = true) {
    if (!isAutoAttachEmulated) {
      this.#manuallyAttached.add(targetInfo.targetId);
    }
    const { sessionId } = await this.send("Target.attachToTarget", {
      targetId: targetInfo.targetId,
      flatten: true
    });
    this.#manuallyAttached.delete(targetInfo.targetId);
    const session = this.#sessions.get(sessionId);
    if (!session) {
      throw new Error("CDPSession creation failed.");
    }
    return session;
  }
  /**
   * @param targetInfo - The target info
   * @returns The CDP session that is created
   */
  async createSession(targetInfo) {
    return await this._createSession(targetInfo, false);
  }
  /**
   * @internal
   */
  getPendingProtocolErrors() {
    const result = [];
    result.push(...this.#callbacks.getPendingProtocolErrors());
    for (const session of this.#sessions.values()) {
      result.push(...session.getPendingProtocolErrors());
    }
    return result;
  }
};
function isTargetClosedError(error) {
  return error instanceof TargetCloseError;
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Coverage.js
var Coverage = class {
  #jsCoverage;
  #cssCoverage;
  /**
   * @internal
   */
  constructor(client) {
    this.#jsCoverage = new JSCoverage(client);
    this.#cssCoverage = new CSSCoverage(client);
  }
  /**
   * @internal
   */
  updateClient(client) {
    this.#jsCoverage.updateClient(client);
    this.#cssCoverage.updateClient(client);
  }
  /**
   * @param options - Set of configurable options for coverage defaults to
   * `resetOnNavigation : true, reportAnonymousScripts : false,`
   * `includeRawScriptCoverage : false, useBlockCoverage : true`
   * @returns Promise that resolves when coverage is started.
   *
   * @remarks
   * Anonymous scripts are ones that don't have an associated url. These are
   * scripts that are dynamically created on the page using `eval` or
   * `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous
   * scripts URL will start with `debugger://VM` (unless a magic //# sourceURL
   * comment is present, in which case that will the be URL).
   */
  async startJSCoverage(options = {}) {
    return await this.#jsCoverage.start(options);
  }
  /**
   * Promise that resolves to the array of coverage reports for
   * all scripts.
   *
   * @remarks
   * JavaScript Coverage doesn't include anonymous scripts by default.
   * However, scripts with sourceURLs are reported.
   */
  async stopJSCoverage() {
    return await this.#jsCoverage.stop();
  }
  /**
   * @param options - Set of configurable options for coverage, defaults to
   * `resetOnNavigation : true`
   * @returns Promise that resolves when coverage is started.
   */
  async startCSSCoverage(options = {}) {
    return await this.#cssCoverage.start(options);
  }
  /**
   * Promise that resolves to the array of coverage reports
   * for all stylesheets.
   *
   * @remarks
   * CSS Coverage doesn't include dynamically injected style tags
   * without sourceURLs.
   */
  async stopCSSCoverage() {
    return await this.#cssCoverage.stop();
  }
};
var JSCoverage = class {
  #client;
  #enabled = false;
  #scriptURLs = /* @__PURE__ */ new Map();
  #scriptSources = /* @__PURE__ */ new Map();
  #subscriptions;
  #resetOnNavigation = false;
  #reportAnonymousScripts = false;
  #includeRawScriptCoverage = false;
  /**
   * @internal
   */
  constructor(client) {
    this.#client = client;
  }
  /**
   * @internal
   */
  updateClient(client) {
    this.#client = client;
  }
  async start(options = {}) {
    assert(!this.#enabled, "JSCoverage is already enabled");
    const { resetOnNavigation = true, reportAnonymousScripts = false, includeRawScriptCoverage = false, useBlockCoverage = true } = options;
    this.#resetOnNavigation = resetOnNavigation;
    this.#reportAnonymousScripts = reportAnonymousScripts;
    this.#includeRawScriptCoverage = includeRawScriptCoverage;
    this.#enabled = true;
    this.#scriptURLs.clear();
    this.#scriptSources.clear();
    this.#subscriptions = new DisposableStack();
    const clientEmitter = this.#subscriptions.use(new EventEmitter(this.#client));
    clientEmitter.on("Debugger.scriptParsed", this.#onScriptParsed.bind(this));
    clientEmitter.on("Runtime.executionContextsCleared", this.#onExecutionContextsCleared.bind(this));
    await Promise.all([
      this.#client.send("Profiler.enable"),
      this.#client.send("Profiler.startPreciseCoverage", {
        callCount: this.#includeRawScriptCoverage,
        detailed: useBlockCoverage
      }),
      this.#client.send("Debugger.enable"),
      this.#client.send("Debugger.setSkipAllPauses", { skip: true })
    ]);
  }
  #onExecutionContextsCleared() {
    if (!this.#resetOnNavigation) {
      return;
    }
    this.#scriptURLs.clear();
    this.#scriptSources.clear();
  }
  async #onScriptParsed(event) {
    if (PuppeteerURL.isPuppeteerURL(event.url)) {
      return;
    }
    if (!event.url && !this.#reportAnonymousScripts) {
      return;
    }
    try {
      const response = await this.#client.send("Debugger.getScriptSource", {
        scriptId: event.scriptId
      });
      this.#scriptURLs.set(event.scriptId, event.url);
      this.#scriptSources.set(event.scriptId, response.scriptSource);
    } catch (error) {
      debugError(error);
    }
  }
  async stop() {
    assert(this.#enabled, "JSCoverage is not enabled");
    this.#enabled = false;
    const result = await Promise.all([
      this.#client.send("Profiler.takePreciseCoverage"),
      this.#client.send("Profiler.stopPreciseCoverage"),
      this.#client.send("Profiler.disable"),
      this.#client.send("Debugger.disable")
    ]);
    this.#subscriptions?.dispose();
    const coverage = [];
    const profileResponse = result[0];
    for (const entry of profileResponse.result) {
      let url = this.#scriptURLs.get(entry.scriptId);
      if (!url && this.#reportAnonymousScripts) {
        url = "debugger://VM" + entry.scriptId;
      }
      const text = this.#scriptSources.get(entry.scriptId);
      if (text === void 0 || url === void 0) {
        continue;
      }
      const flattenRanges = [];
      for (const func of entry.functions) {
        flattenRanges.push(...func.ranges);
      }
      const ranges = convertToDisjointRanges(flattenRanges);
      if (!this.#includeRawScriptCoverage) {
        coverage.push({ url, ranges, text });
      } else {
        coverage.push({ url, ranges, text, rawScriptCoverage: entry });
      }
    }
    return coverage;
  }
};
var CSSCoverage = class {
  #client;
  #enabled = false;
  #stylesheetURLs = /* @__PURE__ */ new Map();
  #stylesheetSources = /* @__PURE__ */ new Map();
  #eventListeners;
  #resetOnNavigation = false;
  constructor(client) {
    this.#client = client;
  }
  /**
   * @internal
   */
  updateClient(client) {
    this.#client = client;
  }
  async start(options = {}) {
    assert(!this.#enabled, "CSSCoverage is already enabled");
    const { resetOnNavigation = true } = options;
    this.#resetOnNavigation = resetOnNavigation;
    this.#enabled = true;
    this.#stylesheetURLs.clear();
    this.#stylesheetSources.clear();
    this.#eventListeners = new DisposableStack();
    const clientEmitter = this.#eventListeners.use(new EventEmitter(this.#client));
    clientEmitter.on("CSS.styleSheetAdded", this.#onStyleSheet.bind(this));
    clientEmitter.on("Runtime.executionContextsCleared", this.#onExecutionContextsCleared.bind(this));
    await Promise.all([
      this.#client.send("DOM.enable"),
      this.#client.send("CSS.enable"),
      this.#client.send("CSS.startRuleUsageTracking")
    ]);
  }
  #onExecutionContextsCleared() {
    if (!this.#resetOnNavigation) {
      return;
    }
    this.#stylesheetURLs.clear();
    this.#stylesheetSources.clear();
  }
  async #onStyleSheet(event) {
    const header = event.header;
    if (!header.sourceURL) {
      return;
    }
    try {
      const response = await this.#client.send("CSS.getStyleSheetText", {
        styleSheetId: header.styleSheetId
      });
      this.#stylesheetURLs.set(header.styleSheetId, header.sourceURL);
      this.#stylesheetSources.set(header.styleSheetId, response.text);
    } catch (error) {
      debugError(error);
    }
  }
  async stop() {
    assert(this.#enabled, "CSSCoverage is not enabled");
    this.#enabled = false;
    const ruleTrackingResponse = await this.#client.send("CSS.stopRuleUsageTracking");
    await Promise.all([
      this.#client.send("CSS.disable"),
      this.#client.send("DOM.disable")
    ]);
    this.#eventListeners?.dispose();
    const styleSheetIdToCoverage = /* @__PURE__ */ new Map();
    for (const entry of ruleTrackingResponse.ruleUsage) {
      let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
      if (!ranges) {
        ranges = [];
        styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
      }
      ranges.push({
        startOffset: entry.startOffset,
        endOffset: entry.endOffset,
        count: entry.used ? 1 : 0
      });
    }
    const coverage = [];
    for (const styleSheetId of this.#stylesheetURLs.keys()) {
      const url = this.#stylesheetURLs.get(styleSheetId);
      assert(typeof url !== "undefined", `Stylesheet URL is undefined (styleSheetId=${styleSheetId})`);
      const text = this.#stylesheetSources.get(styleSheetId);
      assert(typeof text !== "undefined", `Stylesheet text is undefined (styleSheetId=${styleSheetId})`);
      const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
      coverage.push({ url, ranges, text });
    }
    return coverage;
  }
};
function convertToDisjointRanges(nestedRanges) {
  const points = [];
  for (const range of nestedRanges) {
    points.push({ offset: range.startOffset, type: 0, range });
    points.push({ offset: range.endOffset, type: 1, range });
  }
  points.sort((a, b) => {
    if (a.offset !== b.offset) {
      return a.offset - b.offset;
    }
    if (a.type !== b.type) {
      return b.type - a.type;
    }
    const aLength = a.range.endOffset - a.range.startOffset;
    const bLength = b.range.endOffset - b.range.startOffset;
    if (a.type === 0) {
      return bLength - aLength;
    }
    return aLength - bLength;
  });
  const hitCountStack = [];
  const results = [];
  let lastOffset = 0;
  for (const point of points) {
    if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
      const lastResult = results[results.length - 1];
      if (lastResult && lastResult.end === lastOffset) {
        lastResult.end = point.offset;
      } else {
        results.push({ start: lastOffset, end: point.offset });
      }
    }
    lastOffset = point.offset;
    if (point.type === 0) {
      hitCountStack.push(point.range.count);
    } else {
      hitCountStack.pop();
    }
  }
  return results.filter((range) => {
    return range.end - range.start > 0;
  });
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Dialog.js
var Dialog = class {
  #type;
  #message;
  #defaultValue;
  /**
   * @internal
   */
  handled = false;
  /**
   * @internal
   */
  constructor(type, message, defaultValue = "") {
    this.#type = type;
    this.#message = message;
    this.#defaultValue = defaultValue;
  }
  /**
   * The type of the dialog.
   */
  type() {
    return this.#type;
  }
  /**
   * The message displayed in the dialog.
   */
  message() {
    return this.#message;
  }
  /**
   * The default value of the prompt, or an empty string if the dialog
   * is not a `prompt`.
   */
  defaultValue() {
    return this.#defaultValue;
  }
  /**
   * A promise that resolves when the dialog has been accepted.
   *
   * @param promptText - optional text that will be entered in the dialog
   * prompt. Has no effect if the dialog's type is not `prompt`.
   *
   */
  async accept(promptText) {
    assert(!this.handled, "Cannot accept dialog which is already handled!");
    this.handled = true;
    await this.handle({
      accept: true,
      text: promptText
    });
  }
  /**
   * A promise which will resolve once the dialog has been dismissed
   */
  async dismiss() {
    assert(!this.handled, "Cannot dismiss dialog which is already handled!");
    this.handled = true;
    await this.handle({
      accept: false
    });
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Dialog.js
var CdpDialog = class extends Dialog {
  #client;
  constructor(client, type, message, defaultValue = "") {
    super(type, message, defaultValue);
    this.#client = client;
  }
  async handle(options) {
    await this.#client.send("Page.handleJavaScriptDialog", {
      accept: options.accept,
      promptText: options.text
    });
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/EmulationManager.js
var __runInitializers3 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate3 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __setFunctionName = function(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var EmulatedState = class {
  #state;
  #clientProvider;
  #updater;
  constructor(initialState, clientProvider, updater) {
    this.#state = initialState;
    this.#clientProvider = clientProvider;
    this.#updater = updater;
    this.#clientProvider.registerState(this);
  }
  async setState(state) {
    this.#state = state;
    await this.sync();
  }
  get state() {
    return this.#state;
  }
  async sync() {
    await Promise.all(this.#clientProvider.clients().map((client) => {
      return this.#updater(client, this.#state);
    }));
  }
};
var EmulationManager = (() => {
  let _instanceExtraInitializers = [];
  let _private_applyViewport_decorators;
  let _private_applyViewport_descriptor;
  let _private_emulateIdleState_decorators;
  let _private_emulateIdleState_descriptor;
  let _private_emulateTimezone_decorators;
  let _private_emulateTimezone_descriptor;
  let _private_emulateVisionDeficiency_decorators;
  let _private_emulateVisionDeficiency_descriptor;
  let _private_emulateCpuThrottling_decorators;
  let _private_emulateCpuThrottling_descriptor;
  let _private_emulateMediaFeatures_decorators;
  let _private_emulateMediaFeatures_descriptor;
  let _private_emulateMediaType_decorators;
  let _private_emulateMediaType_descriptor;
  let _private_setGeolocation_decorators;
  let _private_setGeolocation_descriptor;
  let _private_setDefaultBackgroundColor_decorators;
  let _private_setDefaultBackgroundColor_descriptor;
  let _private_setJavaScriptEnabled_decorators;
  let _private_setJavaScriptEnabled_descriptor;
  return class EmulationManager {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _private_applyViewport_decorators = [invokeAtMostOnceForArguments];
      _private_emulateIdleState_decorators = [invokeAtMostOnceForArguments];
      _private_emulateTimezone_decorators = [invokeAtMostOnceForArguments];
      _private_emulateVisionDeficiency_decorators = [invokeAtMostOnceForArguments];
      _private_emulateCpuThrottling_decorators = [invokeAtMostOnceForArguments];
      _private_emulateMediaFeatures_decorators = [invokeAtMostOnceForArguments];
      _private_emulateMediaType_decorators = [invokeAtMostOnceForArguments];
      _private_setGeolocation_decorators = [invokeAtMostOnceForArguments];
      _private_setDefaultBackgroundColor_decorators = [invokeAtMostOnceForArguments];
      _private_setJavaScriptEnabled_decorators = [invokeAtMostOnceForArguments];
      __esDecorate3(this, _private_applyViewport_descriptor = { value: __setFunctionName(async function(client, viewportState) {
        if (!viewportState.viewport) {
          await Promise.all([
            client.send("Emulation.clearDeviceMetricsOverride"),
            client.send("Emulation.setTouchEmulationEnabled", {
              enabled: false
            })
          ]).catch(debugError);
          return;
        }
        const { viewport } = viewportState;
        const mobile = viewport.isMobile || false;
        const width = viewport.width;
        const height = viewport.height;
        const deviceScaleFactor = viewport.deviceScaleFactor ?? 1;
        const screenOrientation = viewport.isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
        const hasTouch = viewport.hasTouch || false;
        await Promise.all([
          client.send("Emulation.setDeviceMetricsOverride", {
            mobile,
            width,
            height,
            deviceScaleFactor,
            screenOrientation
          }).catch((err) => {
            if (err.message.includes("Target does not support metrics override")) {
              debugError(err);
              return;
            }
            throw err;
          }),
          client.send("Emulation.setTouchEmulationEnabled", {
            enabled: hasTouch
          })
        ]);
      }, "#applyViewport") }, _private_applyViewport_decorators, { kind: "method", name: "#applyViewport", static: false, private: true, access: { has: (obj) => #applyViewport in obj, get: (obj) => obj.#applyViewport }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_emulateIdleState_descriptor = { value: __setFunctionName(async function(client, idleStateState) {
        if (!idleStateState.active) {
          return;
        }
        if (idleStateState.overrides) {
          await client.send("Emulation.setIdleOverride", {
            isUserActive: idleStateState.overrides.isUserActive,
            isScreenUnlocked: idleStateState.overrides.isScreenUnlocked
          });
        } else {
          await client.send("Emulation.clearIdleOverride");
        }
      }, "#emulateIdleState") }, _private_emulateIdleState_decorators, { kind: "method", name: "#emulateIdleState", static: false, private: true, access: { has: (obj) => #emulateIdleState in obj, get: (obj) => obj.#emulateIdleState }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_emulateTimezone_descriptor = { value: __setFunctionName(async function(client, timezoneState) {
        if (!timezoneState.active) {
          return;
        }
        try {
          await client.send("Emulation.setTimezoneOverride", {
            timezoneId: timezoneState.timezoneId || ""
          });
        } catch (error) {
          if (isErrorLike(error) && error.message.includes("Invalid timezone")) {
            throw new Error(`Invalid timezone ID: ${timezoneState.timezoneId}`);
          }
          throw error;
        }
      }, "#emulateTimezone") }, _private_emulateTimezone_decorators, { kind: "method", name: "#emulateTimezone", static: false, private: true, access: { has: (obj) => #emulateTimezone in obj, get: (obj) => obj.#emulateTimezone }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_emulateVisionDeficiency_descriptor = { value: __setFunctionName(async function(client, visionDeficiency) {
        if (!visionDeficiency.active) {
          return;
        }
        await client.send("Emulation.setEmulatedVisionDeficiency", {
          type: visionDeficiency.visionDeficiency || "none"
        });
      }, "#emulateVisionDeficiency") }, _private_emulateVisionDeficiency_decorators, { kind: "method", name: "#emulateVisionDeficiency", static: false, private: true, access: { has: (obj) => #emulateVisionDeficiency in obj, get: (obj) => obj.#emulateVisionDeficiency }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_emulateCpuThrottling_descriptor = { value: __setFunctionName(async function(client, state) {
        if (!state.active) {
          return;
        }
        await client.send("Emulation.setCPUThrottlingRate", {
          rate: state.factor ?? 1
        });
      }, "#emulateCpuThrottling") }, _private_emulateCpuThrottling_decorators, { kind: "method", name: "#emulateCpuThrottling", static: false, private: true, access: { has: (obj) => #emulateCpuThrottling in obj, get: (obj) => obj.#emulateCpuThrottling }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_emulateMediaFeatures_descriptor = { value: __setFunctionName(async function(client, state) {
        if (!state.active) {
          return;
        }
        await client.send("Emulation.setEmulatedMedia", {
          features: state.mediaFeatures
        });
      }, "#emulateMediaFeatures") }, _private_emulateMediaFeatures_decorators, { kind: "method", name: "#emulateMediaFeatures", static: false, private: true, access: { has: (obj) => #emulateMediaFeatures in obj, get: (obj) => obj.#emulateMediaFeatures }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_emulateMediaType_descriptor = { value: __setFunctionName(async function(client, state) {
        if (!state.active) {
          return;
        }
        await client.send("Emulation.setEmulatedMedia", {
          media: state.type || ""
        });
      }, "#emulateMediaType") }, _private_emulateMediaType_decorators, { kind: "method", name: "#emulateMediaType", static: false, private: true, access: { has: (obj) => #emulateMediaType in obj, get: (obj) => obj.#emulateMediaType }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_setGeolocation_descriptor = { value: __setFunctionName(async function(client, state) {
        if (!state.active) {
          return;
        }
        await client.send("Emulation.setGeolocationOverride", state.geoLocation ? {
          longitude: state.geoLocation.longitude,
          latitude: state.geoLocation.latitude,
          accuracy: state.geoLocation.accuracy
        } : void 0);
      }, "#setGeolocation") }, _private_setGeolocation_decorators, { kind: "method", name: "#setGeolocation", static: false, private: true, access: { has: (obj) => #setGeolocation in obj, get: (obj) => obj.#setGeolocation }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_setDefaultBackgroundColor_descriptor = { value: __setFunctionName(async function(client, state) {
        if (!state.active) {
          return;
        }
        await client.send("Emulation.setDefaultBackgroundColorOverride", {
          color: state.color
        });
      }, "#setDefaultBackgroundColor") }, _private_setDefaultBackgroundColor_decorators, { kind: "method", name: "#setDefaultBackgroundColor", static: false, private: true, access: { has: (obj) => #setDefaultBackgroundColor in obj, get: (obj) => obj.#setDefaultBackgroundColor }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate3(this, _private_setJavaScriptEnabled_descriptor = { value: __setFunctionName(async function(client, state) {
        if (!state.active) {
          return;
        }
        await client.send("Emulation.setScriptExecutionDisabled", {
          value: !state.javaScriptEnabled
        });
      }, "#setJavaScriptEnabled") }, _private_setJavaScriptEnabled_decorators, { kind: "method", name: "#setJavaScriptEnabled", static: false, private: true, access: { has: (obj) => #setJavaScriptEnabled in obj, get: (obj) => obj.#setJavaScriptEnabled }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    #client = __runInitializers3(this, _instanceExtraInitializers);
    #emulatingMobile = false;
    #hasTouch = false;
    #states = [];
    #viewportState = new EmulatedState({
      active: false
    }, this, this.#applyViewport);
    #idleOverridesState = new EmulatedState({
      active: false
    }, this, this.#emulateIdleState);
    #timezoneState = new EmulatedState({
      active: false
    }, this, this.#emulateTimezone);
    #visionDeficiencyState = new EmulatedState({
      active: false
    }, this, this.#emulateVisionDeficiency);
    #cpuThrottlingState = new EmulatedState({
      active: false
    }, this, this.#emulateCpuThrottling);
    #mediaFeaturesState = new EmulatedState({
      active: false
    }, this, this.#emulateMediaFeatures);
    #mediaTypeState = new EmulatedState({
      active: false
    }, this, this.#emulateMediaType);
    #geoLocationState = new EmulatedState({
      active: false
    }, this, this.#setGeolocation);
    #defaultBackgroundColorState = new EmulatedState({
      active: false
    }, this, this.#setDefaultBackgroundColor);
    #javascriptEnabledState = new EmulatedState({
      javaScriptEnabled: true,
      active: false
    }, this, this.#setJavaScriptEnabled);
    #secondaryClients = /* @__PURE__ */ new Set();
    constructor(client) {
      this.#client = client;
    }
    updateClient(client) {
      this.#client = client;
      this.#secondaryClients.delete(client);
    }
    registerState(state) {
      this.#states.push(state);
    }
    clients() {
      return [this.#client, ...Array.from(this.#secondaryClients)];
    }
    async registerSpeculativeSession(client) {
      this.#secondaryClients.add(client);
      client.once(CDPSessionEvent.Disconnected, () => {
        this.#secondaryClients.delete(client);
      });
      void Promise.all(this.#states.map((s) => {
        return s.sync().catch(debugError);
      }));
    }
    get javascriptEnabled() {
      return this.#javascriptEnabledState.state.javaScriptEnabled;
    }
    async emulateViewport(viewport) {
      const currentState = this.#viewportState.state;
      if (!viewport && !currentState.active) {
        return false;
      }
      await this.#viewportState.setState(viewport ? {
        viewport,
        active: true
      } : {
        active: false
      });
      const mobile = viewport?.isMobile || false;
      const hasTouch = viewport?.hasTouch || false;
      const reloadNeeded = this.#emulatingMobile !== mobile || this.#hasTouch !== hasTouch;
      this.#emulatingMobile = mobile;
      this.#hasTouch = hasTouch;
      return reloadNeeded;
    }
    get #applyViewport() {
      return _private_applyViewport_descriptor.value;
    }
    async emulateIdleState(overrides) {
      await this.#idleOverridesState.setState({
        active: true,
        overrides
      });
    }
    get #emulateIdleState() {
      return _private_emulateIdleState_descriptor.value;
    }
    get #emulateTimezone() {
      return _private_emulateTimezone_descriptor.value;
    }
    async emulateTimezone(timezoneId) {
      await this.#timezoneState.setState({
        timezoneId,
        active: true
      });
    }
    get #emulateVisionDeficiency() {
      return _private_emulateVisionDeficiency_descriptor.value;
    }
    async emulateVisionDeficiency(type) {
      const visionDeficiencies = /* @__PURE__ */ new Set([
        "none",
        "achromatopsia",
        "blurredVision",
        "deuteranopia",
        "protanopia",
        "reducedContrast",
        "tritanopia"
      ]);
      assert(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
      await this.#visionDeficiencyState.setState({
        active: true,
        visionDeficiency: type
      });
    }
    get #emulateCpuThrottling() {
      return _private_emulateCpuThrottling_descriptor.value;
    }
    async emulateCPUThrottling(factor) {
      assert(factor === null || factor >= 1, "Throttling rate should be greater or equal to 1");
      await this.#cpuThrottlingState.setState({
        active: true,
        factor: factor ?? void 0
      });
    }
    get #emulateMediaFeatures() {
      return _private_emulateMediaFeatures_descriptor.value;
    }
    async emulateMediaFeatures(features) {
      if (Array.isArray(features)) {
        for (const mediaFeature of features) {
          const name = mediaFeature.name;
          assert(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), "Unsupported media feature: " + name);
        }
      }
      await this.#mediaFeaturesState.setState({
        active: true,
        mediaFeatures: features
      });
    }
    get #emulateMediaType() {
      return _private_emulateMediaType_descriptor.value;
    }
    async emulateMediaType(type) {
      assert(type === "screen" || type === "print" || (type ?? void 0) === void 0, "Unsupported media type: " + type);
      await this.#mediaTypeState.setState({
        type,
        active: true
      });
    }
    get #setGeolocation() {
      return _private_setGeolocation_descriptor.value;
    }
    async setGeolocation(options) {
      const { longitude, latitude, accuracy = 0 } = options;
      if (longitude < -180 || longitude > 180) {
        throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
      }
      if (latitude < -90 || latitude > 90) {
        throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
      }
      if (accuracy < 0) {
        throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
      }
      await this.#geoLocationState.setState({
        active: true,
        geoLocation: {
          longitude,
          latitude,
          accuracy
        }
      });
    }
    get #setDefaultBackgroundColor() {
      return _private_setDefaultBackgroundColor_descriptor.value;
    }
    /**
     * Resets default white background
     */
    async resetDefaultBackgroundColor() {
      await this.#defaultBackgroundColorState.setState({
        active: true,
        color: void 0
      });
    }
    /**
     * Hides default white background
     */
    async setTransparentBackgroundColor() {
      await this.#defaultBackgroundColorState.setState({
        active: true,
        color: { r: 0, g: 0, b: 0, a: 0 }
      });
    }
    get #setJavaScriptEnabled() {
      return _private_setJavaScriptEnabled_descriptor.value;
    }
    async setJavaScriptEnabled(enabled) {
      await this.#javascriptEnabledState.setState({
        active: true,
        javaScriptEnabled: enabled
      });
    }
  };
})();

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/AsyncIterableUtil.js
var AsyncIterableUtil = class {
  static async *map(iterable, map2) {
    for await (const value of iterable) {
      yield await map2(value);
    }
  }
  static async *flatMap(iterable, map2) {
    for await (const value of iterable) {
      yield* map2(value);
    }
  }
  static async collect(iterable) {
    const result = [];
    for await (const value of iterable) {
      result.push(value);
    }
    return result;
  }
  static async first(iterable) {
    for await (const value of iterable) {
      return value;
    }
    return;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/ElementHandleSymbol.js
var _isElementHandle = Symbol("_isElementHandle");

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/util/Function.js
var createdFunctions = /* @__PURE__ */ new Map();
var createFunction = (functionValue) => {
  let fn = createdFunctions.get(functionValue);
  if (fn) {
    return fn;
  }
  fn = new Function(`return ${functionValue}`)();
  createdFunctions.set(functionValue, fn);
  return fn;
};
function stringifyFunction(fn) {
  let value = fn.toString();
  if (value.match(/^(async )*function(\(|\s)/) || value.match(/^(async )*function\s*\*\s*/)) {
    return value;
  }
  const isArrow = value.startsWith("(") || value.match(/^async\s*\(/) || value.match(/^(async)*\s*(?:[$_\p{ID_Start}])(?:[$\u200C\u200D\p{ID_Continue}])*\s*=>/u);
  if (isArrow) {
    return value;
  }
  let prefix = "function ";
  if (value.startsWith("async ")) {
    prefix = `async ${prefix}`;
    value = value.substring("async ".length);
  }
  return `${prefix}${value}`;
}
var interpolateFunction = (fn, replacements) => {
  let value = stringifyFunction(fn);
  for (const [name, jsValue] of Object.entries(replacements)) {
    value = value.replace(
      new RegExp(`PLACEHOLDER\\(\\s*(?:'${name}'|"${name}")\\s*\\)`, "g"),
      // Wrapping this ensures tersers that accidentally inline PLACEHOLDER calls
      // are still valid. Without, we may get calls like ()=>{...}() which is
      // not valid.
      `(${jsValue})`
    );
  }
  return createFunction(value);
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/HandleIterator.js
var __addDisposableResource6 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources6 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var DEFAULT_BATCH_SIZE = 20;
async function* fastTransposeIteratorHandle(iterator2, size) {
  const env_1 = { stack: [], error: void 0, hasError: false };
  try {
    const array = __addDisposableResource6(env_1, await iterator2.evaluateHandle(async (iterator3, size2) => {
      const results = [];
      while (results.length < size2) {
        const result = await iterator3.next();
        if (result.done) {
          break;
        }
        results.push(result.value);
      }
      return results;
    }, size), false);
    const properties = await array.getProperties();
    const handles = properties.values();
    const stack = __addDisposableResource6(env_1, new DisposableStack(), false);
    stack.defer(() => {
      for (const handle_1 of handles) {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
          const handle = __addDisposableResource6(env_2, handle_1, false);
          handle[disposeSymbol]();
        } catch (e_2) {
          env_2.error = e_2;
          env_2.hasError = true;
        } finally {
          __disposeResources6(env_2);
        }
      }
    });
    yield* handles;
    return properties.size === 0;
  } catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
  } finally {
    __disposeResources6(env_1);
  }
}
async function* transposeIteratorHandle(iterator2) {
  let size = DEFAULT_BATCH_SIZE;
  while (!(yield* fastTransposeIteratorHandle(iterator2, size))) {
    size <<= 1;
  }
}
async function* transposeIterableHandle(handle) {
  const env_3 = { stack: [], error: void 0, hasError: false };
  try {
    const generatorHandle = __addDisposableResource6(env_3, await handle.evaluateHandle((iterable) => {
      return async function* () {
        yield* iterable;
      }();
    }), false);
    yield* transposeIteratorHandle(generatorHandle);
  } catch (e_3) {
    env_3.error = e_3;
    env_3.hasError = true;
  } finally {
    __disposeResources6(env_3);
  }
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/LazyArg.js
var LazyArg = class _LazyArg {
  static create = (get) => {
    return new _LazyArg(get);
  };
  #get;
  constructor(get) {
    this.#get = get;
  }
  async get(context2) {
    return await this.#get(context2);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/QueryHandler.js
var __addDisposableResource7 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources7 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var QueryHandler = class {
  // Either one of these may be implemented, but at least one must be.
  static querySelectorAll;
  static querySelector;
  static get _querySelector() {
    if (this.querySelector) {
      return this.querySelector;
    }
    if (!this.querySelectorAll) {
      throw new Error("Cannot create default `querySelector`.");
    }
    return this.querySelector = interpolateFunction(async (node, selector, PuppeteerUtil) => {
      const querySelectorAll = PLACEHOLDER("querySelectorAll");
      const results = querySelectorAll(node, selector, PuppeteerUtil);
      for await (const result of results) {
        return result;
      }
      return null;
    }, {
      querySelectorAll: stringifyFunction(this.querySelectorAll)
    });
  }
  static get _querySelectorAll() {
    if (this.querySelectorAll) {
      return this.querySelectorAll;
    }
    if (!this.querySelector) {
      throw new Error("Cannot create default `querySelectorAll`.");
    }
    return this.querySelectorAll = interpolateFunction(async function* (node, selector, PuppeteerUtil) {
      const querySelector = PLACEHOLDER("querySelector");
      const result = await querySelector(node, selector, PuppeteerUtil);
      if (result) {
        yield result;
      }
    }, {
      querySelector: stringifyFunction(this.querySelector)
    });
  }
  /**
   * Queries for multiple nodes given a selector and {@link ElementHandle}.
   *
   * Akin to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll | Document.querySelectorAll()}.
   */
  static async *queryAll(element, selector) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      const handle = __addDisposableResource7(env_1, await element.evaluateHandle(this._querySelectorAll, selector, LazyArg.create((context2) => {
        return context2.puppeteerUtil;
      })), false);
      yield* transposeIterableHandle(handle);
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources7(env_1);
    }
  }
  /**
   * Queries for a single node given a selector and {@link ElementHandle}.
   *
   * Akin to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector}.
   */
  static async queryOne(element, selector) {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      const result = __addDisposableResource7(env_2, await element.evaluateHandle(this._querySelector, selector, LazyArg.create((context2) => {
        return context2.puppeteerUtil;
      })), false);
      if (!(_isElementHandle in result)) {
        return null;
      }
      return result.move();
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      __disposeResources7(env_2);
    }
  }
  /**
   * Waits until a single node appears for a given selector and
   * {@link ElementHandle}.
   *
   * This will always query the handle in the Puppeteer world and migrate the
   * result to the main world.
   */
  static async waitFor(elementOrFrame, selector, options) {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
      let frame;
      const element = __addDisposableResource7(env_3, await (async () => {
        if (!(_isElementHandle in elementOrFrame)) {
          frame = elementOrFrame;
          return;
        }
        frame = elementOrFrame.frame;
        return await frame.isolatedRealm().adoptHandle(elementOrFrame);
      })(), false);
      const { visible = false, hidden = false, timeout: timeout2, signal } = options;
      const polling = visible || hidden ? "raf" : options.polling;
      try {
        const env_4 = { stack: [], error: void 0, hasError: false };
        try {
          signal?.throwIfAborted();
          const handle = __addDisposableResource7(env_4, await frame.isolatedRealm().waitForFunction(async (PuppeteerUtil, query, selector2, root, visible2) => {
            const querySelector = PuppeteerUtil.createFunction(query);
            const node = await querySelector(root ?? document, selector2, PuppeteerUtil);
            return PuppeteerUtil.checkVisibility(node, visible2);
          }, {
            polling,
            root: element,
            timeout: timeout2,
            signal
          }, LazyArg.create((context2) => {
            return context2.puppeteerUtil;
          }), stringifyFunction(this._querySelector), selector, element, visible ? true : hidden ? false : void 0), false);
          if (signal?.aborted) {
            throw signal.reason;
          }
          if (!(_isElementHandle in handle)) {
            return null;
          }
          return await frame.mainRealm().transferHandle(handle);
        } catch (e_3) {
          env_4.error = e_3;
          env_4.hasError = true;
        } finally {
          __disposeResources7(env_4);
        }
      } catch (error) {
        if (!isErrorLike(error)) {
          throw error;
        }
        if (error.name === "AbortError") {
          throw error;
        }
        const waitForSelectorError = new (error instanceof TimeoutError ? TimeoutError : Error)(`Waiting for selector \`${selector}\` failed`);
        waitForSelectorError.cause = error;
        throw waitForSelectorError;
      }
    } catch (e_4) {
      env_3.error = e_4;
      env_3.hasError = true;
    } finally {
      __disposeResources7(env_3);
    }
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/AriaQueryHandler.js
var isKnownAttribute = (attribute) => {
  return ["name", "role"].includes(attribute);
};
var ATTRIBUTE_REGEXP = /\[\s*(?<attribute>\w+)\s*=\s*(?<quote>"|')(?<value>\\.|.*?(?=\k<quote>))\k<quote>\s*\]/g;
var parseARIASelector = (selector) => {
  if (selector.length > 1e4) {
    throw new Error(`Selector ${selector} is too long`);
  }
  const queryOptions = {};
  const defaultName = selector.replace(ATTRIBUTE_REGEXP, (_, attribute, __, value) => {
    assert(isKnownAttribute(attribute), `Unknown aria attribute "${attribute}" in selector`);
    queryOptions[attribute] = value;
    return "";
  });
  if (defaultName && !queryOptions.name) {
    queryOptions.name = defaultName;
  }
  return queryOptions;
};
var ARIAQueryHandler = class extends QueryHandler {
  static querySelector = async (node, selector, { ariaQuerySelector }) => {
    return await ariaQuerySelector(node, selector);
  };
  static async *queryAll(element, selector) {
    const { name, role } = parseARIASelector(selector);
    yield* element.queryAXTree(name, role);
  }
  static queryOne = async (element, selector) => {
    return await AsyncIterableUtil.first(this.queryAll(element, selector)) ?? null;
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/CSSQueryHandler.js
var CSSQueryHandler = class extends QueryHandler {
  static querySelector = (element, selector, { cssQuerySelector }) => {
    return cssQuerySelector(element, selector);
  };
  static querySelectorAll = (element, selector, { cssQuerySelectorAll }) => {
    return cssQuerySelectorAll(element, selector);
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/generated/injected.js
var source = '"use strict";var g=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var Y=Object.prototype.hasOwnProperty;var l=(t,e)=>{for(var r in e)g(t,r,{get:e[r],enumerable:!0})},G=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of B(e))!Y.call(t,s)&&s!==r&&g(t,s,{get:()=>e[s],enumerable:!(o=X(e,s))||o.enumerable});return t};var J=t=>G(g({},"__esModule",{value:!0}),t);var pe={};l(pe,{default:()=>he});module.exports=J(pe);var N=class extends Error{constructor(e,r){super(e,r),this.name=this.constructor.name}get[Symbol.toStringTag](){return this.constructor.name}},p=class extends N{};var c=class t{static create(e){return new t(e)}static async race(e){let r=new Set;try{let o=e.map(s=>s instanceof t?(s.#s&&r.add(s),s.valueOrThrow()):s);return await Promise.race(o)}finally{for(let o of r)o.reject(new Error("Timeout cleared"))}}#e=!1;#r=!1;#o;#t;#a=new Promise(e=>{this.#t=e});#s;#i;constructor(e){e&&e.timeout>0&&(this.#i=new p(e.message),this.#s=setTimeout(()=>{this.reject(this.#i)},e.timeout))}#l(e){clearTimeout(this.#s),this.#o=e,this.#t()}resolve(e){this.#r||this.#e||(this.#e=!0,this.#l(e))}reject(e){this.#r||this.#e||(this.#r=!0,this.#l(e))}resolved(){return this.#e}finished(){return this.#e||this.#r}value(){return this.#o}#n;valueOrThrow(){return this.#n||(this.#n=(async()=>{if(await this.#a,this.#r)throw this.#o;return this.#o})()),this.#n}};var L=new Map,W=t=>{let e=L.get(t);return e||(e=new Function(`return ${t}`)(),L.set(t,e),e)};var b={};l(b,{ariaQuerySelector:()=>z,ariaQuerySelectorAll:()=>x});var z=(t,e)=>globalThis.__ariaQuerySelector(t,e),x=async function*(t,e){yield*await globalThis.__ariaQuerySelectorAll(t,e)};var E={};l(E,{cssQuerySelector:()=>K,cssQuerySelectorAll:()=>Z});var K=(t,e)=>t.querySelector(e),Z=function(t,e){return t.querySelectorAll(e)};var A={};l(A,{customQuerySelectors:()=>P});var v=class{#e=new Map;register(e,r){if(!r.queryOne&&r.queryAll){let o=r.queryAll;r.queryOne=(s,i)=>{for(let n of o(s,i))return n;return null}}else if(r.queryOne&&!r.queryAll){let o=r.queryOne;r.queryAll=(s,i)=>{let n=o(s,i);return n?[n]:[]}}else if(!r.queryOne||!r.queryAll)throw new Error("At least one query method must be defined.");this.#e.set(e,{querySelector:r.queryOne,querySelectorAll:r.queryAll})}unregister(e){this.#e.delete(e)}get(e){return this.#e.get(e)}clear(){this.#e.clear()}},P=new v;var R={};l(R,{pierceQuerySelector:()=>ee,pierceQuerySelectorAll:()=>te});var ee=(t,e)=>{let r=null,o=s=>{let i=document.createTreeWalker(s,NodeFilter.SHOW_ELEMENT);do{let n=i.currentNode;n.shadowRoot&&o(n.shadowRoot),!(n instanceof ShadowRoot)&&n!==s&&!r&&n.matches(e)&&(r=n)}while(!r&&i.nextNode())};return t instanceof Document&&(t=t.documentElement),o(t),r},te=(t,e)=>{let r=[],o=s=>{let i=document.createTreeWalker(s,NodeFilter.SHOW_ELEMENT);do{let n=i.currentNode;n.shadowRoot&&o(n.shadowRoot),!(n instanceof ShadowRoot)&&n!==s&&n.matches(e)&&r.push(n)}while(i.nextNode())};return t instanceof Document&&(t=t.documentElement),o(t),r};var u=(t,e)=>{if(!t)throw new Error(e)};var y=class{#e;#r;#o;#t;constructor(e,r){this.#e=e,this.#r=r}async start(){let e=this.#t=c.create(),r=await this.#e();if(r){e.resolve(r);return}this.#o=new MutationObserver(async()=>{let o=await this.#e();o&&(e.resolve(o),await this.stop())}),this.#o.observe(this.#r,{childList:!0,subtree:!0,attributes:!0})}async stop(){u(this.#t,"Polling never started."),this.#t.finished()||this.#t.reject(new Error("Polling stopped")),this.#o&&(this.#o.disconnect(),this.#o=void 0)}result(){return u(this.#t,"Polling never started."),this.#t.valueOrThrow()}},w=class{#e;#r;constructor(e){this.#e=e}async start(){let e=this.#r=c.create(),r=await this.#e();if(r){e.resolve(r);return}let o=async()=>{if(e.finished())return;let s=await this.#e();if(!s){window.requestAnimationFrame(o);return}e.resolve(s),await this.stop()};window.requestAnimationFrame(o)}async stop(){u(this.#r,"Polling never started."),this.#r.finished()||this.#r.reject(new Error("Polling stopped"))}result(){return u(this.#r,"Polling never started."),this.#r.valueOrThrow()}},T=class{#e;#r;#o;#t;constructor(e,r){this.#e=e,this.#r=r}async start(){let e=this.#t=c.create(),r=await this.#e();if(r){e.resolve(r);return}this.#o=setInterval(async()=>{let o=await this.#e();o&&(e.resolve(o),await this.stop())},this.#r)}async stop(){u(this.#t,"Polling never started."),this.#t.finished()||this.#t.reject(new Error("Polling stopped")),this.#o&&(clearInterval(this.#o),this.#o=void 0)}result(){return u(this.#t,"Polling never started."),this.#t.valueOrThrow()}};var _={};l(_,{PCombinator:()=>H,pQuerySelector:()=>fe,pQuerySelectorAll:()=>$});var a=class{static async*map(e,r){for await(let o of e)yield await r(o)}static async*flatMap(e,r){for await(let o of e)yield*r(o)}static async collect(e){let r=[];for await(let o of e)r.push(o);return r}static async first(e){for await(let r of e)return r}};var C={};l(C,{textQuerySelectorAll:()=>m});var re=new Set(["checkbox","image","radio"]),oe=t=>t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement&&!re.has(t.type),se=new Set(["SCRIPT","STYLE"]),f=t=>!se.has(t.nodeName)&&!document.head?.contains(t),I=new WeakMap,F=t=>{for(;t;)I.delete(t),t instanceof ShadowRoot?t=t.host:t=t.parentNode},j=new WeakSet,ne=new MutationObserver(t=>{for(let e of t)F(e.target)}),d=t=>{let e=I.get(t);if(e||(e={full:"",immediate:[]},!f(t)))return e;let r="";if(oe(t))e.full=t.value,e.immediate.push(t.value),t.addEventListener("input",o=>{F(o.target)},{once:!0,capture:!0});else{for(let o=t.firstChild;o;o=o.nextSibling){if(o.nodeType===Node.TEXT_NODE){e.full+=o.nodeValue??"",r+=o.nodeValue??"";continue}r&&e.immediate.push(r),r="",o.nodeType===Node.ELEMENT_NODE&&(e.full+=d(o).full)}r&&e.immediate.push(r),t instanceof Element&&t.shadowRoot&&(e.full+=d(t.shadowRoot).full),j.has(t)||(ne.observe(t,{childList:!0,characterData:!0,subtree:!0}),j.add(t))}return I.set(t,e),e};var m=function*(t,e){let r=!1;for(let o of t.childNodes)if(o instanceof Element&&f(o)){let s;o.shadowRoot?s=m(o.shadowRoot,e):s=m(o,e);for(let i of s)yield i,r=!0}r||t instanceof Element&&f(t)&&d(t).full.includes(e)&&(yield t)};var k={};l(k,{checkVisibility:()=>le,pierce:()=>S,pierceAll:()=>O});var ie=["hidden","collapse"],le=(t,e)=>{if(!t)return e===!1;if(e===void 0)return t;let r=t.nodeType===Node.TEXT_NODE?t.parentElement:t,o=window.getComputedStyle(r),s=o&&!ie.includes(o.visibility)&&!ae(r);return e===s?t:!1};function ae(t){let e=t.getBoundingClientRect();return e.width===0||e.height===0}var ce=t=>"shadowRoot"in t&&t.shadowRoot instanceof ShadowRoot;function*S(t){ce(t)?yield t.shadowRoot:yield t}function*O(t){t=S(t).next().value,yield t;let e=[document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT)];for(let r of e){let o;for(;o=r.nextNode();)o.shadowRoot&&(yield o.shadowRoot,e.push(document.createTreeWalker(o.shadowRoot,NodeFilter.SHOW_ELEMENT)))}}var D={};l(D,{xpathQuerySelectorAll:()=>q});var q=function*(t,e,r=-1){let s=(t.ownerDocument||document).evaluate(e,t,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE),i=[],n;for(;(n=s.iterateNext())&&(i.push(n),!(r&&i.length===r)););for(let h=0;h<i.length;h++)n=i[h],yield n,delete i[h]};var ue=/[-\\w\\P{ASCII}*]/u,H=(r=>(r.Descendent=">>>",r.Child=">>>>",r))(H||{}),V=t=>"querySelectorAll"in t,Q=class{#e;#r=[];#o=void 0;elements;constructor(e,r){this.elements=[e],this.#e=r,this.#t()}async run(){if(typeof this.#o=="string")switch(this.#o.trimStart()){case":scope":this.#t();break}for(;this.#o!==void 0;this.#t()){let e=this.#o;typeof e=="string"?e[0]&&ue.test(e[0])?this.elements=a.flatMap(this.elements,async function*(r){V(r)&&(yield*r.querySelectorAll(e))}):this.elements=a.flatMap(this.elements,async function*(r){if(!r.parentElement){if(!V(r))return;yield*r.querySelectorAll(e);return}let o=0;for(let s of r.parentElement.children)if(++o,s===r)break;yield*r.parentElement.querySelectorAll(`:scope>:nth-child(${o})${e}`)}):this.elements=a.flatMap(this.elements,async function*(r){switch(e.name){case"text":yield*m(r,e.value);break;case"xpath":yield*q(r,e.value);break;case"aria":yield*x(r,e.value);break;default:let o=P.get(e.name);if(!o)throw new Error(`Unknown selector type: ${e.name}`);yield*o.querySelectorAll(r,e.value)}})}}#t(){if(this.#r.length!==0){this.#o=this.#r.shift();return}if(this.#e.length===0){this.#o=void 0;return}let e=this.#e.shift();switch(e){case">>>>":{this.elements=a.flatMap(this.elements,S),this.#t();break}case">>>":{this.elements=a.flatMap(this.elements,O),this.#t();break}default:this.#r=e,this.#t();break}}},M=class{#e=new WeakMap;calculate(e,r=[]){if(e===null)return r;e instanceof ShadowRoot&&(e=e.host);let o=this.#e.get(e);if(o)return[...o,...r];let s=0;for(let n=e.previousSibling;n;n=n.previousSibling)++s;let i=this.calculate(e.parentNode,[s]);return this.#e.set(e,i),[...i,...r]}},U=(t,e)=>{if(t.length+e.length===0)return 0;let[r=-1,...o]=t,[s=-1,...i]=e;return r===s?U(o,i):r<s?-1:1},de=async function*(t){let e=new Set;for await(let o of t)e.add(o);let r=new M;yield*[...e.values()].map(o=>[o,r.calculate(o)]).sort(([,o],[,s])=>U(o,s)).map(([o])=>o)},$=function(t,e){let r=JSON.parse(e);if(r.some(o=>{let s=0;return o.some(i=>(typeof i=="string"?++s:s=0,s>1))}))throw new Error("Multiple deep combinators found in sequence.");return de(a.flatMap(r,o=>{let s=new Q(t,o);return s.run(),s.elements}))},fe=async function(t,e){for await(let r of $(t,e))return r;return null};var me=Object.freeze({...b,...A,...R,..._,...C,...k,...D,...E,Deferred:c,createFunction:W,createTextContent:d,IntervalPoller:T,isSuitableNodeForTextMatching:f,MutationPoller:y,RAFPoller:w}),he=me;\n';

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/ScriptInjector.js
var ScriptInjector = class {
  #updated = false;
  #amendments = /* @__PURE__ */ new Set();
  // Appends a statement of the form `(PuppeteerUtil) => {...}`.
  append(statement) {
    this.#update(() => {
      this.#amendments.add(statement);
    });
  }
  pop(statement) {
    this.#update(() => {
      this.#amendments.delete(statement);
    });
  }
  inject(inject, force = false) {
    if (this.#updated || force) {
      inject(this.#get());
    }
    this.#updated = false;
  }
  #update(callback) {
    callback();
    this.#updated = true;
  }
  #get() {
    return `(() => {
      const module = {};
      ${source}
      ${[...this.#amendments].map((statement) => {
      return `(${statement})(module.exports.default);`;
    }).join("")}
      return module.exports.default;
    })()`;
  }
};
var scriptInjector = new ScriptInjector();

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/CustomQueryHandler.js
var CustomQueryHandlerRegistry = class {
  #handlers = /* @__PURE__ */ new Map();
  get(name) {
    const handler = this.#handlers.get(name);
    return handler ? handler[1] : void 0;
  }
  /**
   * Registers a {@link CustomQueryHandler | custom query handler}.
   *
   * @remarks
   * After registration, the handler can be used everywhere where a selector is
   * expected by prepending the selection string with `<name>/`. The name is
   * only allowed to consist of lower- and upper case latin letters.
   *
   * @example
   *
   * ```ts
   * Puppeteer.customQueryHandlers.register('lit', { … });
   * const aHandle = await page.$('lit/…');
   * ```
   *
   * @param name - Name to register under.
   * @param queryHandler - {@link CustomQueryHandler | Custom query handler} to
   * register.
   */
  register(name, handler) {
    assert(!this.#handlers.has(name), `Cannot register over existing handler: ${name}`);
    assert(/^[a-zA-Z]+$/.test(name), `Custom query handler names may only contain [a-zA-Z]`);
    assert(handler.queryAll || handler.queryOne, `At least one query method must be implemented.`);
    const Handler = class extends QueryHandler {
      static querySelectorAll = interpolateFunction((node, selector, PuppeteerUtil) => {
        return PuppeteerUtil.customQuerySelectors.get(PLACEHOLDER("name")).querySelectorAll(node, selector);
      }, { name: JSON.stringify(name) });
      static querySelector = interpolateFunction((node, selector, PuppeteerUtil) => {
        return PuppeteerUtil.customQuerySelectors.get(PLACEHOLDER("name")).querySelector(node, selector);
      }, { name: JSON.stringify(name) });
    };
    const registerScript = interpolateFunction((PuppeteerUtil) => {
      PuppeteerUtil.customQuerySelectors.register(PLACEHOLDER("name"), {
        queryAll: PLACEHOLDER("queryAll"),
        queryOne: PLACEHOLDER("queryOne")
      });
    }, {
      name: JSON.stringify(name),
      queryAll: handler.queryAll ? stringifyFunction(handler.queryAll) : String(void 0),
      queryOne: handler.queryOne ? stringifyFunction(handler.queryOne) : String(void 0)
    }).toString();
    this.#handlers.set(name, [registerScript, Handler]);
    scriptInjector.append(registerScript);
  }
  /**
   * Unregisters the {@link CustomQueryHandler | custom query handler} for the
   * given name.
   *
   * @throws `Error` if there is no handler under the given name.
   */
  unregister(name) {
    const handler = this.#handlers.get(name);
    if (!handler) {
      throw new Error(`Cannot unregister unknown handler: ${name}`);
    }
    scriptInjector.pop(handler[0]);
    this.#handlers.delete(name);
  }
  /**
   * Gets the names of all {@link CustomQueryHandler | custom query handlers}.
   */
  names() {
    return [...this.#handlers.keys()];
  }
  /**
   * Unregisters all custom query handlers.
   */
  clear() {
    for (const [registerScript] of this.#handlers) {
      scriptInjector.pop(registerScript);
    }
    this.#handlers.clear();
  }
};
var customQueryHandlers = new CustomQueryHandlerRegistry();

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/PierceQueryHandler.js
var PierceQueryHandler = class extends QueryHandler {
  static querySelector = (element, selector, { pierceQuerySelector }) => {
    return pierceQuerySelector(element, selector);
  };
  static querySelectorAll = (element, selector, { pierceQuerySelectorAll }) => {
    return pierceQuerySelectorAll(element, selector);
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/PQueryHandler.js
var PQueryHandler = class extends QueryHandler {
  static querySelectorAll = (element, selector, { pQuerySelectorAll }) => {
    return pQuerySelectorAll(element, selector);
  };
  static querySelector = (element, selector, { pQuerySelector }) => {
    return pQuerySelector(element, selector);
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/third_party/parsel-js/parsel-js.js
var TOKENS = {
  attribute: /\[\s*(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(\s(?<caseSensitive>[iIsS]))?\s*)?\]/gu,
  id: /#(?<name>[-\w\P{ASCII}]+)/gu,
  class: /\.(?<name>[-\w\P{ASCII}]+)/gu,
  comma: /\s*,\s*/g,
  combinator: /\s*[\s>+~]\s*/g,
  "pseudo-element": /::(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu,
  "pseudo-class": /:(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu,
  universal: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?\*/gu,
  type: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)/gu
  // this must be last
};
var TRIM_TOKENS = /* @__PURE__ */ new Set(["combinator", "comma"]);
var getArgumentPatternByType = (type) => {
  switch (type) {
    case "pseudo-element":
    case "pseudo-class":
      return new RegExp(TOKENS[type].source.replace("(?<argument>\xB6*)", "(?<argument>.*)"), "gu");
    default:
      return TOKENS[type];
  }
};
function gobbleParens(text, offset) {
  let nesting = 0;
  let result = "";
  for (; offset < text.length; offset++) {
    const char = text[offset];
    switch (char) {
      case "(":
        ++nesting;
        break;
      case ")":
        --nesting;
        break;
    }
    result += char;
    if (nesting === 0) {
      return result;
    }
  }
  return result;
}
function tokenizeBy(text, grammar = TOKENS) {
  if (!text) {
    return [];
  }
  const tokens = [text];
  for (const [type, pattern] of Object.entries(grammar)) {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (typeof token !== "string") {
        continue;
      }
      pattern.lastIndex = 0;
      const match = pattern.exec(token);
      if (!match) {
        continue;
      }
      const from2 = match.index - 1;
      const args = [];
      const content = match[0];
      const before = token.slice(0, from2 + 1);
      if (before) {
        args.push(before);
      }
      args.push({
        ...match.groups,
        type,
        content
      });
      const after = token.slice(from2 + content.length + 1);
      if (after) {
        args.push(after);
      }
      tokens.splice(i, 1, ...args);
    }
  }
  let offset = 0;
  for (const token of tokens) {
    switch (typeof token) {
      case "string":
        throw new Error(`Unexpected sequence ${token} found at index ${offset}`);
      case "object":
        offset += token.content.length;
        token.pos = [offset - token.content.length, offset];
        if (TRIM_TOKENS.has(token.type)) {
          token.content = token.content.trim() || " ";
        }
        break;
    }
  }
  return tokens;
}
var STRING_PATTERN = /(['"])([^\\\n]*?)\1/g;
var ESCAPE_PATTERN = /\\./g;
function tokenize(selector, grammar = TOKENS) {
  selector = selector.trim();
  if (selector === "") {
    return [];
  }
  const replacements = [];
  selector = selector.replace(ESCAPE_PATTERN, (value, offset) => {
    replacements.push({ value, offset });
    return "\uE000".repeat(value.length);
  });
  selector = selector.replace(STRING_PATTERN, (value, quote, content, offset) => {
    replacements.push({ value, offset });
    return `${quote}${"\uE001".repeat(content.length)}${quote}`;
  });
  {
    let pos = 0;
    let offset;
    while ((offset = selector.indexOf("(", pos)) > -1) {
      const value = gobbleParens(selector, offset);
      replacements.push({ value, offset });
      selector = `${selector.substring(0, offset)}(${"\xB6".repeat(value.length - 2)})${selector.substring(offset + value.length)}`;
      pos = offset + value.length;
    }
  }
  const tokens = tokenizeBy(selector, grammar);
  const changedTokens = /* @__PURE__ */ new Set();
  for (const replacement of replacements.reverse()) {
    for (const token of tokens) {
      const { offset, value } = replacement;
      if (!(token.pos[0] <= offset && offset + value.length <= token.pos[1])) {
        continue;
      }
      const { content } = token;
      const tokenOffset = offset - token.pos[0];
      token.content = content.slice(0, tokenOffset) + value + content.slice(tokenOffset + value.length);
      if (token.content !== content) {
        changedTokens.add(token);
      }
    }
  }
  for (const token of changedTokens) {
    const pattern = getArgumentPatternByType(token.type);
    if (!pattern) {
      throw new Error(`Unknown token type: ${token.type}`);
    }
    pattern.lastIndex = 0;
    const match = pattern.exec(token.content);
    if (!match) {
      throw new Error(`Unable to parse content for ${token.type}: ${token.content}`);
    }
    Object.assign(token, match.groups);
  }
  return tokens;
}
function stringify(listOrNode) {
  if (Array.isArray(listOrNode)) {
    return listOrNode.map((token) => token.content).join("");
  }
  switch (listOrNode.type) {
    case "list":
      return listOrNode.list.map(stringify).join(",");
    case "relative":
      return listOrNode.combinator + stringify(listOrNode.right);
    case "complex":
      return stringify(listOrNode.left) + listOrNode.combinator + stringify(listOrNode.right);
    case "compound":
      return listOrNode.list.map(stringify).join("");
    default:
      return listOrNode.content;
  }
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/PSelectorParser.js
TOKENS["nesting"] = /&/g;
TOKENS["combinator"] = /\s*(>>>>?|[\s>+~])\s*/g;
var ESCAPE_REGEXP = /\\[\s\S]/g;
var unquote = (text) => {
  if (text.length <= 1) {
    return text;
  }
  if ((text[0] === '"' || text[0] === "'") && text.endsWith(text[0])) {
    text = text.slice(1, -1);
  }
  return text.replace(ESCAPE_REGEXP, (match) => {
    return match[1];
  });
};
function parsePSelectors(selector) {
  let isPureCSS = true;
  let hasAria = false;
  let hasPseudoClasses = false;
  const tokens = tokenize(selector);
  if (tokens.length === 0) {
    return [[], isPureCSS, hasPseudoClasses, false];
  }
  let compoundSelector = [];
  let complexSelector = [compoundSelector];
  const selectors = [complexSelector];
  const storage = [];
  for (const token of tokens) {
    switch (token.type) {
      case "combinator":
        switch (token.content) {
          case ">>>":
            isPureCSS = false;
            if (storage.length) {
              compoundSelector.push(stringify(storage));
              storage.splice(0);
            }
            compoundSelector = [];
            complexSelector.push(
              ">>>"
              /* PCombinator.Descendent */
            );
            complexSelector.push(compoundSelector);
            continue;
          case ">>>>":
            isPureCSS = false;
            if (storage.length) {
              compoundSelector.push(stringify(storage));
              storage.splice(0);
            }
            compoundSelector = [];
            complexSelector.push(
              ">>>>"
              /* PCombinator.Child */
            );
            complexSelector.push(compoundSelector);
            continue;
        }
        break;
      case "pseudo-element":
        if (!token.name.startsWith("-p-")) {
          break;
        }
        isPureCSS = false;
        if (storage.length) {
          compoundSelector.push(stringify(storage));
          storage.splice(0);
        }
        const name = token.name.slice(3);
        if (name === "aria") {
          hasAria = true;
        }
        compoundSelector.push({
          name,
          value: unquote(token.argument ?? "")
        });
        continue;
      case "pseudo-class":
        hasPseudoClasses = true;
        break;
      case "comma":
        if (storage.length) {
          compoundSelector.push(stringify(storage));
          storage.splice(0);
        }
        compoundSelector = [];
        complexSelector = [compoundSelector];
        selectors.push(complexSelector);
        continue;
    }
    storage.push(token);
  }
  if (storage.length) {
    compoundSelector.push(stringify(storage));
  }
  return [selectors, isPureCSS, hasPseudoClasses, hasAria];
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/TextQueryHandler.js
var TextQueryHandler = class extends QueryHandler {
  static querySelectorAll = (element, selector, { textQuerySelectorAll }) => {
    return textQuerySelectorAll(element, selector);
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/XPathQueryHandler.js
var XPathQueryHandler = class extends QueryHandler {
  static querySelectorAll = (element, selector, { xpathQuerySelectorAll }) => {
    return xpathQuerySelectorAll(element, selector);
  };
  static querySelector = (element, selector, { xpathQuerySelectorAll }) => {
    for (const result of xpathQuerySelectorAll(element, selector, 1)) {
      return result;
    }
    return null;
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/GetQueryHandler.js
var BUILTIN_QUERY_HANDLERS = {
  aria: ARIAQueryHandler,
  pierce: PierceQueryHandler,
  xpath: XPathQueryHandler,
  text: TextQueryHandler
};
var QUERY_SEPARATORS = ["=", "/"];
function getQueryHandlerAndSelector(selector) {
  for (const handlerMap of [
    customQueryHandlers.names().map((name) => {
      return [name, customQueryHandlers.get(name)];
    }),
    Object.entries(BUILTIN_QUERY_HANDLERS)
  ]) {
    for (const [name, QueryHandler2] of handlerMap) {
      for (const separator of QUERY_SEPARATORS) {
        const prefix = `${name}${separator}`;
        if (selector.startsWith(prefix)) {
          selector = selector.slice(prefix.length);
          return {
            updatedSelector: selector,
            polling: name === "aria" ? "raf" : "mutation",
            QueryHandler: QueryHandler2
          };
        }
      }
    }
  }
  try {
    const [pSelector, isPureCSS, hasPseudoClasses, hasAria] = parsePSelectors(selector);
    if (isPureCSS) {
      return {
        updatedSelector: selector,
        polling: hasPseudoClasses ? "raf" : "mutation",
        QueryHandler: CSSQueryHandler
      };
    }
    return {
      updatedSelector: JSON.stringify(pSelector),
      polling: hasAria ? "raf" : "mutation",
      QueryHandler: PQueryHandler
    };
  } catch {
    return {
      updatedSelector: selector,
      polling: "mutation",
      QueryHandler: CSSQueryHandler
    };
  }
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Frame.js
var __runInitializers4 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate4 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __addDisposableResource8 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources8 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var FrameEvent;
(function(FrameEvent2) {
  FrameEvent2.FrameNavigated = Symbol("Frame.FrameNavigated");
  FrameEvent2.FrameSwapped = Symbol("Frame.FrameSwapped");
  FrameEvent2.LifecycleEvent = Symbol("Frame.LifecycleEvent");
  FrameEvent2.FrameNavigatedWithinDocument = Symbol("Frame.FrameNavigatedWithinDocument");
  FrameEvent2.FrameDetached = Symbol("Frame.FrameDetached");
  FrameEvent2.FrameSwappedByActivation = Symbol("Frame.FrameSwappedByActivation");
})(FrameEvent || (FrameEvent = {}));
var throwIfDetached = throwIfDisposed((frame) => {
  return `Attempted to use detached Frame '${frame._id}'.`;
});
var Frame = (() => {
  let _classSuper = EventEmitter;
  let _instanceExtraInitializers = [];
  let _frameElement_decorators;
  let _evaluateHandle_decorators;
  let _evaluate_decorators;
  let _locator_decorators;
  let _$_decorators;
  let _$$_decorators;
  let _$eval_decorators;
  let _$$eval_decorators;
  let _waitForSelector_decorators;
  let _waitForFunction_decorators;
  let _content_decorators;
  let _addScriptTag_decorators;
  let _addStyleTag_decorators;
  let _click_decorators;
  let _focus_decorators;
  let _hover_decorators;
  let _select_decorators;
  let _tap_decorators;
  let _type_decorators;
  let _title_decorators;
  return class Frame extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _frameElement_decorators = [throwIfDetached];
      _evaluateHandle_decorators = [throwIfDetached];
      _evaluate_decorators = [throwIfDetached];
      _locator_decorators = [throwIfDetached];
      _$_decorators = [throwIfDetached];
      _$$_decorators = [throwIfDetached];
      _$eval_decorators = [throwIfDetached];
      _$$eval_decorators = [throwIfDetached];
      _waitForSelector_decorators = [throwIfDetached];
      _waitForFunction_decorators = [throwIfDetached];
      _content_decorators = [throwIfDetached];
      _addScriptTag_decorators = [throwIfDetached];
      _addStyleTag_decorators = [throwIfDetached];
      _click_decorators = [throwIfDetached];
      _focus_decorators = [throwIfDetached];
      _hover_decorators = [throwIfDetached];
      _select_decorators = [throwIfDetached];
      _tap_decorators = [throwIfDetached];
      _type_decorators = [throwIfDetached];
      _title_decorators = [throwIfDetached];
      __esDecorate4(this, null, _frameElement_decorators, { kind: "method", name: "frameElement", static: false, private: false, access: { has: (obj) => "frameElement" in obj, get: (obj) => obj.frameElement }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _evaluateHandle_decorators, { kind: "method", name: "evaluateHandle", static: false, private: false, access: { has: (obj) => "evaluateHandle" in obj, get: (obj) => obj.evaluateHandle }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _evaluate_decorators, { kind: "method", name: "evaluate", static: false, private: false, access: { has: (obj) => "evaluate" in obj, get: (obj) => obj.evaluate }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _locator_decorators, { kind: "method", name: "locator", static: false, private: false, access: { has: (obj) => "locator" in obj, get: (obj) => obj.locator }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _$_decorators, { kind: "method", name: "$", static: false, private: false, access: { has: (obj) => "$" in obj, get: (obj) => obj.$ }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _$$_decorators, { kind: "method", name: "$$", static: false, private: false, access: { has: (obj) => "$$" in obj, get: (obj) => obj.$$ }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _$eval_decorators, { kind: "method", name: "$eval", static: false, private: false, access: { has: (obj) => "$eval" in obj, get: (obj) => obj.$eval }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _$$eval_decorators, { kind: "method", name: "$$eval", static: false, private: false, access: { has: (obj) => "$$eval" in obj, get: (obj) => obj.$$eval }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _waitForSelector_decorators, { kind: "method", name: "waitForSelector", static: false, private: false, access: { has: (obj) => "waitForSelector" in obj, get: (obj) => obj.waitForSelector }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _waitForFunction_decorators, { kind: "method", name: "waitForFunction", static: false, private: false, access: { has: (obj) => "waitForFunction" in obj, get: (obj) => obj.waitForFunction }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _content_decorators, { kind: "method", name: "content", static: false, private: false, access: { has: (obj) => "content" in obj, get: (obj) => obj.content }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _addScriptTag_decorators, { kind: "method", name: "addScriptTag", static: false, private: false, access: { has: (obj) => "addScriptTag" in obj, get: (obj) => obj.addScriptTag }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _addStyleTag_decorators, { kind: "method", name: "addStyleTag", static: false, private: false, access: { has: (obj) => "addStyleTag" in obj, get: (obj) => obj.addStyleTag }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _click_decorators, { kind: "method", name: "click", static: false, private: false, access: { has: (obj) => "click" in obj, get: (obj) => obj.click }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _focus_decorators, { kind: "method", name: "focus", static: false, private: false, access: { has: (obj) => "focus" in obj, get: (obj) => obj.focus }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _hover_decorators, { kind: "method", name: "hover", static: false, private: false, access: { has: (obj) => "hover" in obj, get: (obj) => obj.hover }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _select_decorators, { kind: "method", name: "select", static: false, private: false, access: { has: (obj) => "select" in obj, get: (obj) => obj.select }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _tap_decorators, { kind: "method", name: "tap", static: false, private: false, access: { has: (obj) => "tap" in obj, get: (obj) => obj.tap }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _type_decorators, { kind: "method", name: "type", static: false, private: false, access: { has: (obj) => "type" in obj, get: (obj) => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate4(this, null, _title_decorators, { kind: "method", name: "title", static: false, private: false, access: { has: (obj) => "title" in obj, get: (obj) => obj.title }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    /**
     * @internal
     */
    _id = __runInitializers4(this, _instanceExtraInitializers);
    /**
     * @internal
     */
    _parentId;
    /**
     * @internal
     */
    _name;
    /**
     * @internal
     */
    _hasStartedLoading = false;
    /**
     * @internal
     */
    constructor() {
      super();
    }
    #_document;
    /**
     * @internal
     */
    #document() {
      if (!this.#_document) {
        this.#_document = this.mainRealm().evaluateHandle(() => {
          return document;
        });
      }
      return this.#_document;
    }
    /**
     * Used to clear the document handle that has been destroyed.
     *
     * @internal
     */
    clearDocumentHandle() {
      this.#_document = void 0;
    }
    /**
     * @returns The frame element associated with this frame (if any).
     */
    async frameElement() {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        const parentFrame = this.parentFrame();
        if (!parentFrame) {
          return null;
        }
        const list = __addDisposableResource8(env_1, await parentFrame.isolatedRealm().evaluateHandle(() => {
          return document.querySelectorAll("iframe,frame");
        }), false);
        for await (const iframe_1 of transposeIterableHandle(list)) {
          const env_2 = { stack: [], error: void 0, hasError: false };
          try {
            const iframe = __addDisposableResource8(env_2, iframe_1, false);
            const frame = await iframe.contentFrame();
            if (frame?._id === this._id) {
              return await parentFrame.mainRealm().adoptHandle(iframe);
            }
          } catch (e_1) {
            env_2.error = e_1;
            env_2.hasError = true;
          } finally {
            __disposeResources8(env_2);
          }
        }
        return null;
      } catch (e_2) {
        env_1.error = e_2;
        env_1.hasError = true;
      } finally {
        __disposeResources8(env_1);
      }
    }
    /**
     * Behaves identically to {@link Page.evaluateHandle} except it's run within
     * the context of this frame.
     *
     * See {@link Page.evaluateHandle} for details.
     */
    async evaluateHandle(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
      return await this.mainRealm().evaluateHandle(pageFunction, ...args);
    }
    /**
     * Behaves identically to {@link Page.evaluate} except it's run within
     * the context of this frame.
     *
     * See {@link Page.evaluate} for details.
     */
    async evaluate(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
      return await this.mainRealm().evaluate(pageFunction, ...args);
    }
    /**
     * @internal
     */
    locator(input) {
      if (typeof input === "string") {
        return NodeLocator.create(this, input);
      } else {
        return FunctionLocator.create(this, input);
      }
    }
    /**
     * Queries the frame for an element matching the given selector.
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     *
     * @returns A {@link ElementHandle | element handle} to the first element
     * matching the given selector. Otherwise, `null`.
     */
    async $(selector) {
      const document2 = await this.#document();
      return await document2.$(selector);
    }
    /**
     * Queries the frame for all elements matching the given selector.
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     *
     * @returns An array of {@link ElementHandle | element handles} that point to
     * elements matching the given selector.
     */
    async $$(selector, options) {
      const document2 = await this.#document();
      return await document2.$$(selector, options);
    }
    /**
     * Runs the given function on the first element matching the given selector in
     * the frame.
     *
     * If the given function returns a promise, then this method will wait till
     * the promise resolves.
     *
     * @example
     *
     * ```ts
     * const searchValue = await frame.$eval('#search', el => el.value);
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param pageFunction - The function to be evaluated in the frame's context.
     * The first element matching the selector will be passed to the function as
     * its first argument.
     * @param args - Additional arguments to pass to `pageFunction`.
     * @returns A promise to the result of the function.
     */
    async $eval(selector, pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
      const document2 = await this.#document();
      return await document2.$eval(selector, pageFunction, ...args);
    }
    /**
     * Runs the given function on an array of elements matching the given selector
     * in the frame.
     *
     * If the given function returns a promise, then this method will wait till
     * the promise resolves.
     *
     * @example
     *
     * ```ts
     * const divsCounts = await frame.$$eval('div', divs => divs.length);
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param pageFunction - The function to be evaluated in the frame's context.
     * An array of elements matching the given selector will be passed to the
     * function as its first argument.
     * @param args - Additional arguments to pass to `pageFunction`.
     * @returns A promise to the result of the function.
     */
    async $$eval(selector, pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
      const document2 = await this.#document();
      return await document2.$$eval(selector, pageFunction, ...args);
    }
    /**
     * Waits for an element matching the given selector to appear in the frame.
     *
     * This method works across navigations.
     *
     * @example
     *
     * ```ts
     * import puppeteer from 'puppeteer';
     *
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * let currentURL;
     * page
     *   .mainFrame()
     *   .waitForSelector('img')
     *   .then(() => console.log('First URL with image: ' + currentURL));
     *
     * for (currentURL of [
     *   'https://example.com',
     *   'https://google.com',
     *   'https://bbc.com',
     * ]) {
     *   await page.goto(currentURL);
     * }
     * await browser.close();
     * ```
     *
     * @param selector - The selector to query and wait for.
     * @param options - Options for customizing waiting behavior.
     * @returns An element matching the given selector.
     * @throws Throws if an element matching the given selector doesn't appear.
     */
    async waitForSelector(selector, options = {}) {
      const { updatedSelector, QueryHandler: QueryHandler2, polling } = getQueryHandlerAndSelector(selector);
      return await QueryHandler2.waitFor(this, updatedSelector, {
        polling,
        ...options
      });
    }
    /**
     * @example
     * The `waitForFunction` can be used to observe viewport size change:
     *
     * ```ts
     * import puppeteer from 'puppeteer';
     *
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * const watchDog = page
     *   .mainFrame()
     *   .waitForFunction('window.innerWidth < 100');
     * page.setViewport({width: 50, height: 50});
     * await watchDog;
     * await browser.close();
     * ```
     *
     * To pass arguments from Node.js to the predicate of `page.waitForFunction` function:
     *
     * ```ts
     * const selector = '.foo';
     * await frame.waitForFunction(
     *   selector => !!document.querySelector(selector),
     *   {}, // empty options object
     *   selector,
     * );
     * ```
     *
     * @param pageFunction - the function to evaluate in the frame context.
     * @param options - options to configure the polling method and timeout.
     * @param args - arguments to pass to the `pageFunction`.
     * @returns the promise which resolve when the `pageFunction` returns a truthy value.
     */
    async waitForFunction(pageFunction, options = {}, ...args) {
      return await this.mainRealm().waitForFunction(pageFunction, options, ...args);
    }
    /**
     * The full HTML contents of the frame, including the DOCTYPE.
     */
    async content() {
      return await this.evaluate(() => {
        let content = "";
        for (const node of document.childNodes) {
          switch (node) {
            case document.documentElement:
              content += document.documentElement.outerHTML;
              break;
            default:
              content += new XMLSerializer().serializeToString(node);
              break;
          }
        }
        return content;
      });
    }
    /**
     * @internal
     */
    async setFrameContent(content) {
      return await this.evaluate((html) => {
        document.open();
        document.write(html);
        document.close();
      }, content);
    }
    /**
     * The frame's `name` attribute as specified in the tag.
     *
     * @remarks
     * If the name is empty, it returns the `id` attribute instead.
     *
     * @remarks
     * This value is calculated once when the frame is created, and will not
     * update if the attribute is changed later.
     *
     * @deprecated Use
     *
     * ```ts
     * const element = await frame.frameElement();
     * const nameOrId = await element.evaluate(frame => frame.name ?? frame.id);
     * ```
     */
    name() {
      return this._name || "";
    }
    /**
     * Is`true` if the frame has been detached. Otherwise, `false`.
     *
     * @deprecated Use the `detached` getter.
     */
    isDetached() {
      return this.detached;
    }
    /**
     * @internal
     */
    get disposed() {
      return this.detached;
    }
    /**
     * Adds a `<script>` tag into the page with the desired url or content.
     *
     * @param options - Options for the script.
     * @returns An {@link ElementHandle | element handle} to the injected
     * `<script>` element.
     */
    async addScriptTag(options) {
      let { content = "", type } = options;
      const { path } = options;
      if (+!!options.url + +!!path + +!!content !== 1) {
        throw new Error("Exactly one of `url`, `path`, or `content` must be specified.");
      }
      if (path) {
        content = await environment.value.fs.promises.readFile(path, "utf8");
        content += `//# sourceURL=${path.replace(/\n/g, "")}`;
      }
      type = type ?? "text/javascript";
      return await this.mainRealm().transferHandle(await this.isolatedRealm().evaluateHandle(async ({ url, id, type: type2, content: content2 }) => {
        return await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.type = type2;
          script.text = content2;
          script.addEventListener("error", (event) => {
            reject(new Error(event.message ?? "Could not load script"));
          }, { once: true });
          if (id) {
            script.id = id;
          }
          if (url) {
            script.src = url;
            script.addEventListener("load", () => {
              resolve(script);
            }, { once: true });
            document.head.appendChild(script);
          } else {
            document.head.appendChild(script);
            resolve(script);
          }
        });
      }, { ...options, type, content }));
    }
    /**
     * @internal
     */
    async addStyleTag(options) {
      let { content = "" } = options;
      const { path } = options;
      if (+!!options.url + +!!path + +!!content !== 1) {
        throw new Error("Exactly one of `url`, `path`, or `content` must be specified.");
      }
      if (path) {
        content = await environment.value.fs.promises.readFile(path, "utf8");
        content += "/*# sourceURL=" + path.replace(/\n/g, "") + "*/";
        options.content = content;
      }
      return await this.mainRealm().transferHandle(await this.isolatedRealm().evaluateHandle(async ({ url, content: content2 }) => {
        return await new Promise((resolve, reject) => {
          let element;
          if (!url) {
            element = document.createElement("style");
            element.appendChild(document.createTextNode(content2));
          } else {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            element = link;
          }
          element.addEventListener("load", () => {
            resolve(element);
          }, { once: true });
          element.addEventListener("error", (event) => {
            reject(new Error(event.message ?? "Could not load style"));
          }, { once: true });
          document.head.appendChild(element);
          return element;
        });
      }, options));
    }
    /**
     * Clicks the first element found that matches `selector`.
     *
     * @remarks
     * If `click()` triggers a navigation event and there's a separate
     * `page.waitForNavigation()` promise to be resolved, you may end up with a
     * race condition that yields unexpected results. The correct pattern for
     * click and wait for navigation is the following:
     *
     * ```ts
     * const [response] = await Promise.all([
     *   page.waitForNavigation(waitOptions),
     *   frame.click(selector, clickOptions),
     * ]);
     * ```
     *
     * @param selector - The selector to query for.
     */
    async click(selector, options = {}) {
      const env_3 = { stack: [], error: void 0, hasError: false };
      try {
        const handle = __addDisposableResource8(env_3, await this.$(selector), false);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.click(options);
        await handle.dispose();
      } catch (e_3) {
        env_3.error = e_3;
        env_3.hasError = true;
      } finally {
        __disposeResources8(env_3);
      }
    }
    /**
     * Focuses the first element that matches the `selector`.
     *
     * @param selector - The selector to query for.
     * @throws Throws if there's no element matching `selector`.
     */
    async focus(selector) {
      const env_4 = { stack: [], error: void 0, hasError: false };
      try {
        const handle = __addDisposableResource8(env_4, await this.$(selector), false);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.focus();
      } catch (e_4) {
        env_4.error = e_4;
        env_4.hasError = true;
      } finally {
        __disposeResources8(env_4);
      }
    }
    /**
     * Hovers the pointer over the center of the first element that matches the
     * `selector`.
     *
     * @param selector - The selector to query for.
     * @throws Throws if there's no element matching `selector`.
     */
    async hover(selector) {
      const env_5 = { stack: [], error: void 0, hasError: false };
      try {
        const handle = __addDisposableResource8(env_5, await this.$(selector), false);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.hover();
      } catch (e_5) {
        env_5.error = e_5;
        env_5.hasError = true;
      } finally {
        __disposeResources8(env_5);
      }
    }
    /**
     * Selects a set of value on the first `<select>` element that matches the
     * `selector`.
     *
     * @example
     *
     * ```ts
     * frame.select('select#colors', 'blue'); // single selection
     * frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
     * ```
     *
     * @param selector - The selector to query for.
     * @param values - The array of values to select. If the `<select>` has the
     * `multiple` attribute, all values are considered, otherwise only the first
     * one is taken into account.
     * @returns the list of values that were successfully selected.
     * @throws Throws if there's no `<select>` matching `selector`.
     */
    async select(selector, ...values) {
      const env_6 = { stack: [], error: void 0, hasError: false };
      try {
        const handle = __addDisposableResource8(env_6, await this.$(selector), false);
        assert(handle, `No element found for selector: ${selector}`);
        return await handle.select(...values);
      } catch (e_6) {
        env_6.error = e_6;
        env_6.hasError = true;
      } finally {
        __disposeResources8(env_6);
      }
    }
    /**
     * Taps the first element that matches the `selector`.
     *
     * @param selector - The selector to query for.
     * @throws Throws if there's no element matching `selector`.
     */
    async tap(selector) {
      const env_7 = { stack: [], error: void 0, hasError: false };
      try {
        const handle = __addDisposableResource8(env_7, await this.$(selector), false);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.tap();
      } catch (e_7) {
        env_7.error = e_7;
        env_7.hasError = true;
      } finally {
        __disposeResources8(env_7);
      }
    }
    /**
     * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character
     * in the text.
     *
     * @remarks
     * To press a special key, like `Control` or `ArrowDown`, use
     * {@link Keyboard.press}.
     *
     * @example
     *
     * ```ts
     * await frame.type('#mytextarea', 'Hello'); // Types instantly
     * await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
     * ```
     *
     * @param selector - the selector for the element to type into. If there are
     * multiple the first will be used.
     * @param text - text to type into the element
     * @param options - takes one option, `delay`, which sets the time to wait
     * between key presses in milliseconds. Defaults to `0`.
     */
    async type(selector, text, options) {
      const env_8 = { stack: [], error: void 0, hasError: false };
      try {
        const handle = __addDisposableResource8(env_8, await this.$(selector), false);
        assert(handle, `No element found for selector: ${selector}`);
        await handle.type(text, options);
      } catch (e_8) {
        env_8.error = e_8;
        env_8.hasError = true;
      } finally {
        __disposeResources8(env_8);
      }
    }
    /**
     * The frame's title.
     */
    async title() {
      return await this.isolatedRealm().evaluate(() => {
        return document.title;
      });
    }
  };
})();

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/CdpPreloadScript.js
var CdpPreloadScript = class {
  /**
   * This is the ID of the preload script returned by
   * Page.addScriptToEvaluateOnNewDocument in the main frame.
   *
   * Sub-frames would get a different CDP ID because
   * addScriptToEvaluateOnNewDocument is called for each subframe. But
   * users only see this ID and subframe IDs are internal to Puppeteer.
   */
  #id;
  #source;
  #frameToId = /* @__PURE__ */ new WeakMap();
  constructor(mainFrame, id, source2) {
    this.#id = id;
    this.#source = source2;
    this.#frameToId.set(mainFrame, id);
  }
  get id() {
    return this.#id;
  }
  get source() {
    return this.#source;
  }
  getIdForFrame(frame) {
    return this.#frameToId.get(frame);
  }
  setIdForFrame(frame, identifier) {
    this.#frameToId.set(frame, identifier);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/DeviceRequestPrompt.js
var DeviceRequestPromptDevice = class {
  /**
   * Device id during a prompt.
   */
  id;
  /**
   * Device name as it appears in a prompt.
   */
  name;
  /**
   * @internal
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
};
var DeviceRequestPrompt = class {
  #client;
  #timeoutSettings;
  #id;
  #handled = false;
  #updateDevicesHandle = this.#updateDevices.bind(this);
  #waitForDevicePromises = /* @__PURE__ */ new Set();
  /**
   * Current list of selectable devices.
   */
  devices = [];
  /**
   * @internal
   */
  constructor(client, timeoutSettings, firstEvent) {
    this.#client = client;
    this.#timeoutSettings = timeoutSettings;
    this.#id = firstEvent.id;
    this.#client.on("DeviceAccess.deviceRequestPrompted", this.#updateDevicesHandle);
    this.#client.on("Target.detachedFromTarget", () => {
      this.#client = null;
    });
    this.#updateDevices(firstEvent);
  }
  #updateDevices(event) {
    if (event.id !== this.#id) {
      return;
    }
    for (const rawDevice of event.devices) {
      if (this.devices.some((device) => {
        return device.id === rawDevice.id;
      })) {
        continue;
      }
      const newDevice = new DeviceRequestPromptDevice(rawDevice.id, rawDevice.name);
      this.devices.push(newDevice);
      for (const waitForDevicePromise of this.#waitForDevicePromises) {
        if (waitForDevicePromise.filter(newDevice)) {
          waitForDevicePromise.promise.resolve(newDevice);
        }
      }
    }
  }
  /**
   * Resolve to the first device in the prompt matching a filter.
   */
  async waitForDevice(filter2, options = {}) {
    for (const device of this.devices) {
      if (filter2(device)) {
        return device;
      }
    }
    const { timeout: timeout2 = this.#timeoutSettings.timeout() } = options;
    const deferred = Deferred.create({
      message: `Waiting for \`DeviceRequestPromptDevice\` failed: ${timeout2}ms exceeded`,
      timeout: timeout2
    });
    if (options.signal) {
      options.signal.addEventListener("abort", () => {
        deferred.reject(options.signal?.reason);
      }, { once: true });
    }
    const handle = { filter: filter2, promise: deferred };
    this.#waitForDevicePromises.add(handle);
    try {
      return await deferred.valueOrThrow();
    } finally {
      this.#waitForDevicePromises.delete(handle);
    }
  }
  /**
   * Select a device in the prompt's list.
   */
  async select(device) {
    assert(this.#client !== null, "Cannot select device through detached session!");
    assert(this.devices.includes(device), "Cannot select unknown device!");
    assert(!this.#handled, "Cannot select DeviceRequestPrompt which is already handled!");
    this.#client.off("DeviceAccess.deviceRequestPrompted", this.#updateDevicesHandle);
    this.#handled = true;
    return await this.#client.send("DeviceAccess.selectPrompt", {
      id: this.#id,
      deviceId: device.id
    });
  }
  /**
   * Cancel the prompt.
   */
  async cancel() {
    assert(this.#client !== null, "Cannot cancel prompt through detached session!");
    assert(!this.#handled, "Cannot cancel DeviceRequestPrompt which is already handled!");
    this.#client.off("DeviceAccess.deviceRequestPrompted", this.#updateDevicesHandle);
    this.#handled = true;
    return await this.#client.send("DeviceAccess.cancelPrompt", { id: this.#id });
  }
};
var DeviceRequestPromptManager = class {
  #client;
  #timeoutSettings;
  #deviceRequestPromptDeferreds = /* @__PURE__ */ new Set();
  /**
   * @internal
   */
  constructor(client, timeoutSettings) {
    this.#client = client;
    this.#timeoutSettings = timeoutSettings;
    this.#client.on("DeviceAccess.deviceRequestPrompted", (event) => {
      this.#onDeviceRequestPrompted(event);
    });
    this.#client.on("Target.detachedFromTarget", () => {
      this.#client = null;
    });
  }
  /**
   * Wait for device prompt created by an action like calling WebBluetooth's
   * requestDevice.
   */
  async waitForDevicePrompt(options = {}) {
    assert(this.#client !== null, "Cannot wait for device prompt through detached session!");
    const needsEnable = this.#deviceRequestPromptDeferreds.size === 0;
    let enablePromise;
    if (needsEnable) {
      enablePromise = this.#client.send("DeviceAccess.enable");
    }
    const { timeout: timeout2 = this.#timeoutSettings.timeout() } = options;
    const deferred = Deferred.create({
      message: `Waiting for \`DeviceRequestPrompt\` failed: ${timeout2}ms exceeded`,
      timeout: timeout2
    });
    if (options.signal) {
      options.signal.addEventListener("abort", () => {
        deferred.reject(options.signal?.reason);
      }, { once: true });
    }
    this.#deviceRequestPromptDeferreds.add(deferred);
    try {
      const [result] = await Promise.all([
        deferred.valueOrThrow(),
        enablePromise
      ]);
      return result;
    } finally {
      this.#deviceRequestPromptDeferreds.delete(deferred);
    }
  }
  /**
   * @internal
   */
  #onDeviceRequestPrompted(event) {
    if (!this.#deviceRequestPromptDeferreds.size) {
      return;
    }
    assert(this.#client !== null);
    const devicePrompt = new DeviceRequestPrompt(this.#client, this.#timeoutSettings, event);
    for (const promise of this.#deviceRequestPromptDeferreds) {
      promise.resolve(devicePrompt);
    }
    this.#deviceRequestPromptDeferreds.clear();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/ElementHandle.js
var __runInitializers5 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate5 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __addDisposableResource9 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources9 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var __setFunctionName2 = function(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
function bindIsolatedHandle(target, _) {
  return async function(...args) {
    if (this.realm === this.frame.isolatedRealm()) {
      return await target.call(this, ...args);
    }
    let adoptedThis;
    if (this["isolatedHandle"]) {
      adoptedThis = this["isolatedHandle"];
    } else {
      this["isolatedHandle"] = adoptedThis = await this.frame.isolatedRealm().adoptHandle(this);
    }
    const result = await target.call(adoptedThis, ...args);
    if (result === adoptedThis) {
      return this;
    }
    if (result instanceof JSHandle) {
      return await this.realm.transferHandle(result);
    }
    if (Array.isArray(result)) {
      await Promise.all(result.map(async (item, index, result2) => {
        if (item instanceof JSHandle) {
          result2[index] = await this.realm.transferHandle(item);
        }
      }));
    }
    if (result instanceof Map) {
      await Promise.all([...result.entries()].map(async ([key, value]) => {
        if (value instanceof JSHandle) {
          result.set(key, await this.realm.transferHandle(value));
        }
      }));
    }
    return result;
  };
}
var ElementHandle = (() => {
  let _classSuper = JSHandle;
  let _instanceExtraInitializers = [];
  let _getProperty_decorators;
  let _getProperties_decorators;
  let _jsonValue_decorators;
  let _$_decorators;
  let _$$_decorators;
  let _private_$$_decorators;
  let _private_$$_descriptor;
  let _waitForSelector_decorators;
  let _isVisible_decorators;
  let _isHidden_decorators;
  let _toElement_decorators;
  let _clickablePoint_decorators;
  let _hover_decorators;
  let _click_decorators;
  let _drag_decorators;
  let _dragEnter_decorators;
  let _dragOver_decorators;
  let _drop_decorators;
  let _dragAndDrop_decorators;
  let _select_decorators;
  let _tap_decorators;
  let _touchStart_decorators;
  let _touchMove_decorators;
  let _touchEnd_decorators;
  let _focus_decorators;
  let _type_decorators;
  let _press_decorators;
  let _boundingBox_decorators;
  let _boxModel_decorators;
  let _screenshot_decorators;
  let _isIntersectingViewport_decorators;
  let _scrollIntoView_decorators;
  let _asLocator_decorators;
  return class ElementHandle2 extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _getProperty_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _getProperties_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _jsonValue_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _$_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _$$_decorators = [throwIfDisposed()];
      _private_$$_decorators = [bindIsolatedHandle];
      _waitForSelector_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _isVisible_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _isHidden_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _toElement_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _clickablePoint_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _hover_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _click_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _drag_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _dragEnter_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _dragOver_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _drop_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _dragAndDrop_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _select_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _tap_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _touchStart_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _touchMove_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _touchEnd_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _focus_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _type_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _press_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _boundingBox_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _boxModel_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _screenshot_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _isIntersectingViewport_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _scrollIntoView_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _asLocator_decorators = [throwIfDisposed()];
      __esDecorate5(this, null, _getProperty_decorators, { kind: "method", name: "getProperty", static: false, private: false, access: { has: (obj) => "getProperty" in obj, get: (obj) => obj.getProperty }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _getProperties_decorators, { kind: "method", name: "getProperties", static: false, private: false, access: { has: (obj) => "getProperties" in obj, get: (obj) => obj.getProperties }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _jsonValue_decorators, { kind: "method", name: "jsonValue", static: false, private: false, access: { has: (obj) => "jsonValue" in obj, get: (obj) => obj.jsonValue }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _$_decorators, { kind: "method", name: "$", static: false, private: false, access: { has: (obj) => "$" in obj, get: (obj) => obj.$ }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _$$_decorators, { kind: "method", name: "$$", static: false, private: false, access: { has: (obj) => "$$" in obj, get: (obj) => obj.$$ }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, _private_$$_descriptor = { value: __setFunctionName2(async function(selector) {
        return await this.#$$impl(selector);
      }, "#$$") }, _private_$$_decorators, { kind: "method", name: "#$$", static: false, private: true, access: { has: (obj) => #$$ in obj, get: (obj) => obj.#$$ }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _waitForSelector_decorators, { kind: "method", name: "waitForSelector", static: false, private: false, access: { has: (obj) => "waitForSelector" in obj, get: (obj) => obj.waitForSelector }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _isVisible_decorators, { kind: "method", name: "isVisible", static: false, private: false, access: { has: (obj) => "isVisible" in obj, get: (obj) => obj.isVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _isHidden_decorators, { kind: "method", name: "isHidden", static: false, private: false, access: { has: (obj) => "isHidden" in obj, get: (obj) => obj.isHidden }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _toElement_decorators, { kind: "method", name: "toElement", static: false, private: false, access: { has: (obj) => "toElement" in obj, get: (obj) => obj.toElement }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _clickablePoint_decorators, { kind: "method", name: "clickablePoint", static: false, private: false, access: { has: (obj) => "clickablePoint" in obj, get: (obj) => obj.clickablePoint }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _hover_decorators, { kind: "method", name: "hover", static: false, private: false, access: { has: (obj) => "hover" in obj, get: (obj) => obj.hover }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _click_decorators, { kind: "method", name: "click", static: false, private: false, access: { has: (obj) => "click" in obj, get: (obj) => obj.click }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _drag_decorators, { kind: "method", name: "drag", static: false, private: false, access: { has: (obj) => "drag" in obj, get: (obj) => obj.drag }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _dragEnter_decorators, { kind: "method", name: "dragEnter", static: false, private: false, access: { has: (obj) => "dragEnter" in obj, get: (obj) => obj.dragEnter }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _dragOver_decorators, { kind: "method", name: "dragOver", static: false, private: false, access: { has: (obj) => "dragOver" in obj, get: (obj) => obj.dragOver }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _drop_decorators, { kind: "method", name: "drop", static: false, private: false, access: { has: (obj) => "drop" in obj, get: (obj) => obj.drop }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _dragAndDrop_decorators, { kind: "method", name: "dragAndDrop", static: false, private: false, access: { has: (obj) => "dragAndDrop" in obj, get: (obj) => obj.dragAndDrop }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _select_decorators, { kind: "method", name: "select", static: false, private: false, access: { has: (obj) => "select" in obj, get: (obj) => obj.select }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _tap_decorators, { kind: "method", name: "tap", static: false, private: false, access: { has: (obj) => "tap" in obj, get: (obj) => obj.tap }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _touchStart_decorators, { kind: "method", name: "touchStart", static: false, private: false, access: { has: (obj) => "touchStart" in obj, get: (obj) => obj.touchStart }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _touchMove_decorators, { kind: "method", name: "touchMove", static: false, private: false, access: { has: (obj) => "touchMove" in obj, get: (obj) => obj.touchMove }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _touchEnd_decorators, { kind: "method", name: "touchEnd", static: false, private: false, access: { has: (obj) => "touchEnd" in obj, get: (obj) => obj.touchEnd }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _focus_decorators, { kind: "method", name: "focus", static: false, private: false, access: { has: (obj) => "focus" in obj, get: (obj) => obj.focus }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _type_decorators, { kind: "method", name: "type", static: false, private: false, access: { has: (obj) => "type" in obj, get: (obj) => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _press_decorators, { kind: "method", name: "press", static: false, private: false, access: { has: (obj) => "press" in obj, get: (obj) => obj.press }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _boundingBox_decorators, { kind: "method", name: "boundingBox", static: false, private: false, access: { has: (obj) => "boundingBox" in obj, get: (obj) => obj.boundingBox }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _boxModel_decorators, { kind: "method", name: "boxModel", static: false, private: false, access: { has: (obj) => "boxModel" in obj, get: (obj) => obj.boxModel }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _screenshot_decorators, { kind: "method", name: "screenshot", static: false, private: false, access: { has: (obj) => "screenshot" in obj, get: (obj) => obj.screenshot }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _isIntersectingViewport_decorators, { kind: "method", name: "isIntersectingViewport", static: false, private: false, access: { has: (obj) => "isIntersectingViewport" in obj, get: (obj) => obj.isIntersectingViewport }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _scrollIntoView_decorators, { kind: "method", name: "scrollIntoView", static: false, private: false, access: { has: (obj) => "scrollIntoView" in obj, get: (obj) => obj.scrollIntoView }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate5(this, null, _asLocator_decorators, { kind: "method", name: "asLocator", static: false, private: false, access: { has: (obj) => "asLocator" in obj, get: (obj) => obj.asLocator }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    /**
     * @internal
     * Cached isolatedHandle to prevent
     * trying to adopt it multiple times
     */
    isolatedHandle = __runInitializers5(this, _instanceExtraInitializers);
    /**
     * @internal
     */
    handle;
    /**
     * @internal
     */
    constructor(handle) {
      super();
      this.handle = handle;
      this[_isElementHandle] = true;
    }
    /**
     * @internal
     */
    get id() {
      return this.handle.id;
    }
    /**
     * @internal
     */
    get disposed() {
      return this.handle.disposed;
    }
    /**
     * @internal
     */
    async getProperty(propertyName) {
      return await this.handle.getProperty(propertyName);
    }
    /**
     * @internal
     */
    async getProperties() {
      return await this.handle.getProperties();
    }
    /**
     * @internal
     */
    async evaluate(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
      return await this.handle.evaluate(pageFunction, ...args);
    }
    /**
     * @internal
     */
    async evaluateHandle(pageFunction, ...args) {
      pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
      return await this.handle.evaluateHandle(pageFunction, ...args);
    }
    /**
     * @internal
     */
    async jsonValue() {
      return await this.handle.jsonValue();
    }
    /**
     * @internal
     */
    toString() {
      return this.handle.toString();
    }
    /**
     * @internal
     */
    remoteObject() {
      return this.handle.remoteObject();
    }
    /**
     * @internal
     */
    async dispose() {
      await Promise.all([this.handle.dispose(), this.isolatedHandle?.dispose()]);
    }
    /**
     * @internal
     */
    asElement() {
      return this;
    }
    /**
     * Queries the current element for an element matching the given selector.
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @returns A {@link ElementHandle | element handle} to the first element
     * matching the given selector. Otherwise, `null`.
     */
    async $(selector) {
      const { updatedSelector, QueryHandler: QueryHandler2 } = getQueryHandlerAndSelector(selector);
      return await QueryHandler2.queryOne(this, updatedSelector);
    }
    /**
     * Queries the current element for all elements matching the given selector.
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @returns An array of {@link ElementHandle | element handles} that point to
     * elements matching the given selector.
     */
    async $$(selector, options) {
      if (options?.isolate === false) {
        return await this.#$$impl(selector);
      }
      return await this.#$$(selector);
    }
    /**
     * Isolates {@link ElementHandle.$$} if needed.
     *
     * @internal
     */
    get #$$() {
      return _private_$$_descriptor.value;
    }
    /**
     * Implementation for {@link ElementHandle.$$}.
     *
     * @internal
     */
    async #$$impl(selector) {
      const { updatedSelector, QueryHandler: QueryHandler2 } = getQueryHandlerAndSelector(selector);
      return await AsyncIterableUtil.collect(QueryHandler2.queryAll(this, updatedSelector));
    }
    /**
     * Runs the given function on the first element matching the given selector in
     * the current element.
     *
     * If the given function returns a promise, then this method will wait till
     * the promise resolves.
     *
     * @example
     *
     * ```ts
     * const tweetHandle = await page.$('.tweet');
     * expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe(
     *   '100',
     * );
     * expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe(
     *   '10',
     * );
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param pageFunction - The function to be evaluated in this element's page's
     * context. The first element matching the selector will be passed in as the
     * first argument.
     * @param args - Additional arguments to pass to `pageFunction`.
     * @returns A promise to the result of the function.
     */
    async $eval(selector, pageFunction, ...args) {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
        const elementHandle = __addDisposableResource9(env_1, await this.$(selector), false);
        if (!elementHandle) {
          throw new Error(`Error: failed to find element matching selector "${selector}"`);
        }
        return await elementHandle.evaluate(pageFunction, ...args);
      } catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
      } finally {
        __disposeResources9(env_1);
      }
    }
    /**
     * Runs the given function on an array of elements matching the given selector
     * in the current element.
     *
     * If the given function returns a promise, then this method will wait till
     * the promise resolves.
     *
     * @example
     * HTML:
     *
     * ```html
     * <div class="feed">
     *   <div class="tweet">Hello!</div>
     *   <div class="tweet">Hi!</div>
     * </div>
     * ```
     *
     * JavaScript:
     *
     * ```ts
     * const feedHandle = await page.$('.feed');
     *
     * const listOfTweets = await feedHandle.$$eval('.tweet', nodes =>
     *   nodes.map(n => n.innerText),
     * );
     * ```
     *
     * @param selector -
     * {@link https://pptr.dev/guides/page-interactions#selectors | selector}
     * to query the page for.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | CSS selectors}
     * can be passed as-is and a
     * {@link https://pptr.dev/guides/page-interactions#non-css-selectors | Puppeteer-specific selector syntax}
     * allows querying by
     * {@link https://pptr.dev/guides/page-interactions#text-selectors--p-text | text},
     * {@link https://pptr.dev/guides/page-interactions#aria-selectors--p-aria | a11y role and name},
     * and
     * {@link https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath | xpath}
     * and
     * {@link https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom | combining these queries across shadow roots}.
     * Alternatively, you can specify the selector type using a
     * {@link https://pptr.dev/guides/page-interactions#prefixed-selector-syntax | prefix}.
     * @param pageFunction - The function to be evaluated in the element's page's
     * context. An array of elements matching the given selector will be passed to
     * the function as its first argument.
     * @param args - Additional arguments to pass to `pageFunction`.
     * @returns A promise to the result of the function.
     */
    async $$eval(selector, pageFunction, ...args) {
      const env_2 = { stack: [], error: void 0, hasError: false };
      try {
        pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
        const results = await this.$$(selector);
        const elements = __addDisposableResource9(env_2, await this.evaluateHandle((_, ...elements2) => {
          return elements2;
        }, ...results), false);
        const [result] = await Promise.all([
          elements.evaluate(pageFunction, ...args),
          ...results.map((results2) => {
            return results2.dispose();
          })
        ]);
        return result;
      } catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
      } finally {
        __disposeResources9(env_2);
      }
    }
    /**
     * Wait for an element matching the given selector to appear in the current
     * element.
     *
     * Unlike {@link Frame.waitForSelector}, this method does not work across
     * navigations or if the element is detached from DOM.
     *
     * @example
     *
     * ```ts
     * import puppeteer from 'puppeteer';
     *
     * const browser = await puppeteer.launch();
     * const page = await browser.newPage();
     * let currentURL;
     * page
     *   .mainFrame()
     *   .waitForSelector('img')
     *   .then(() => console.log('First URL with image: ' + currentURL));
     *
     * for (currentURL of [
     *   'https://example.com',
     *   'https://google.com',
     *   'https://bbc.com',
     * ]) {
     *   await page.goto(currentURL);
     * }
     * await browser.close();
     * ```
     *
     * @param selector - The selector to query and wait for.
     * @param options - Options for customizing waiting behavior.
     * @returns An element matching the given selector.
     * @throws Throws if an element matching the given selector doesn't appear.
     */
    async waitForSelector(selector, options = {}) {
      const { updatedSelector, QueryHandler: QueryHandler2, polling } = getQueryHandlerAndSelector(selector);
      return await QueryHandler2.waitFor(this, updatedSelector, {
        polling,
        ...options
      });
    }
    async #checkVisibility(visibility) {
      return await this.evaluate(async (element, PuppeteerUtil, visibility2) => {
        return Boolean(PuppeteerUtil.checkVisibility(element, visibility2));
      }, LazyArg.create((context2) => {
        return context2.puppeteerUtil;
      }), visibility);
    }
    /**
     * An element is considered to be visible if all of the following is
     * true:
     *
     * - the element has
     *   {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle | computed styles}.
     *
     * - the element has a non-empty
     *   {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect | bounding client rect}.
     *
     * - the element's {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility | visibility}
     *   is not `hidden` or `collapse`.
     */
    async isVisible() {
      return await this.#checkVisibility(true);
    }
    /**
     * An element is considered to be hidden if at least one of the following is true:
     *
     * - the element has no
     *   {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle | computed styles}.
     *
     * - the element has an empty
     *   {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect | bounding client rect}.
     *
     * - the element's {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility | visibility}
     *   is `hidden` or `collapse`.
     */
    async isHidden() {
      return await this.#checkVisibility(false);
    }
    /**
     * Converts the current handle to the given element type.
     *
     * @example
     *
     * ```ts
     * const element: ElementHandle<Element> = await page.$(
     *   '.class-name-of-anchor',
     * );
     * // DO NOT DISPOSE `element`, this will be always be the same handle.
     * const anchor: ElementHandle<HTMLAnchorElement> =
     *   await element.toElement('a');
     * ```
     *
     * @param tagName - The tag name of the desired element type.
     * @throws An error if the handle does not match. **The handle will not be
     * automatically disposed.**
     */
    async toElement(tagName) {
      const isMatchingTagName = await this.evaluate((node, tagName2) => {
        return node.nodeName === tagName2.toUpperCase();
      }, tagName);
      if (!isMatchingTagName) {
        throw new Error(`Element is not a(n) \`${tagName}\` element`);
      }
      return this;
    }
    /**
     * Returns the middle point within an element unless a specific offset is provided.
     */
    async clickablePoint(offset) {
      const box = await this.#clickableBox();
      if (!box) {
        throw new Error("Node is either not clickable or not an Element");
      }
      if (offset !== void 0) {
        return {
          x: box.x + offset.x,
          y: box.y + offset.y
        };
      }
      return {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2
      };
    }
    /**
     * This method scrolls element into view if needed, and then
     * uses {@link Page.mouse} to hover over the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async hover() {
      await this.scrollIntoViewIfNeeded();
      const { x, y } = await this.clickablePoint();
      await this.frame.page().mouse.move(x, y);
    }
    /**
     * This method scrolls element into view if needed, and then
     * uses {@link Page.mouse} to click in the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async click(options = {}) {
      await this.scrollIntoViewIfNeeded();
      const { x, y } = await this.clickablePoint(options.offset);
      try {
        await this.frame.page().mouse.click(x, y, options);
      } finally {
        if (options.debugHighlight) {
          await this.frame.page().evaluate((x2, y2) => {
            const highlight = document.createElement("div");
            highlight.innerHTML = `<style>
        @scope {
          :scope {
              position: fixed;
              left: ${x2}px;
              top: ${y2}px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              animation: colorChange 10s 1 normal;
              animation-fill-mode: forwards;
          }

          @keyframes colorChange {
              from {
                  background-color: red;
              }
              to {
                  background-color: #FADADD00;
              }
          }
        }
      </style>`;
            highlight.addEventListener("animationend", () => {
              highlight.remove();
            }, { once: true });
            document.body.append(highlight);
          }, x, y);
        }
      }
    }
    /**
     * Drags an element over the given element or point.
     *
     * @returns DEPRECATED. When drag interception is enabled, the drag payload is
     * returned.
     */
    async drag(target) {
      await this.scrollIntoViewIfNeeded();
      const page = this.frame.page();
      if (page.isDragInterceptionEnabled()) {
        const source2 = await this.clickablePoint();
        if (target instanceof ElementHandle2) {
          target = await target.clickablePoint();
        }
        return await page.mouse.drag(source2, target);
      }
      try {
        if (!page._isDragging) {
          page._isDragging = true;
          await this.hover();
          await page.mouse.down();
        }
        if (target instanceof ElementHandle2) {
          await target.hover();
        } else {
          await page.mouse.move(target.x, target.y);
        }
      } catch (error) {
        page._isDragging = false;
        throw error;
      }
    }
    /**
     * @deprecated Do not use. `dragenter` will automatically be performed during dragging.
     */
    async dragEnter(data = { items: [], dragOperationsMask: 1 }) {
      const page = this.frame.page();
      await this.scrollIntoViewIfNeeded();
      const target = await this.clickablePoint();
      await page.mouse.dragEnter(target, data);
    }
    /**
     * @deprecated Do not use. `dragover` will automatically be performed during dragging.
     */
    async dragOver(data = { items: [], dragOperationsMask: 1 }) {
      const page = this.frame.page();
      await this.scrollIntoViewIfNeeded();
      const target = await this.clickablePoint();
      await page.mouse.dragOver(target, data);
    }
    /**
     * @internal
     */
    async drop(dataOrElement = {
      items: [],
      dragOperationsMask: 1
    }) {
      const page = this.frame.page();
      if ("items" in dataOrElement) {
        await this.scrollIntoViewIfNeeded();
        const destination = await this.clickablePoint();
        await page.mouse.drop(destination, dataOrElement);
      } else {
        await dataOrElement.drag(this);
        page._isDragging = false;
        await page.mouse.up();
      }
    }
    /**
     * @deprecated Use `ElementHandle.drop` instead.
     */
    async dragAndDrop(target, options) {
      const page = this.frame.page();
      assert(page.isDragInterceptionEnabled(), "Drag Interception is not enabled!");
      await this.scrollIntoViewIfNeeded();
      const startPoint = await this.clickablePoint();
      const targetPoint = await target.clickablePoint();
      await page.mouse.dragAndDrop(startPoint, targetPoint, options);
    }
    /**
     * Triggers a `change` and `input` event once all the provided options have been
     * selected. If there's no `<select>` element matching `selector`, the method
     * throws an error.
     *
     * @example
     *
     * ```ts
     * handle.select('blue'); // single selection
     * handle.select('red', 'green', 'blue'); // multiple selections
     * ```
     *
     * @param values - Values of options to select. If the `<select>` has the
     * `multiple` attribute, all values are considered, otherwise only the first
     * one is taken into account.
     */
    async select(...values) {
      for (const value of values) {
        assert(isString(value), 'Values must be strings. Found value "' + value + '" of type "' + typeof value + '"');
      }
      return await this.evaluate((element, vals) => {
        const values2 = new Set(vals);
        if (!(element instanceof HTMLSelectElement)) {
          throw new Error("Element is not a <select> element.");
        }
        const selectedValues = /* @__PURE__ */ new Set();
        if (!element.multiple) {
          for (const option of element.options) {
            option.selected = false;
          }
          for (const option of element.options) {
            if (values2.has(option.value)) {
              option.selected = true;
              selectedValues.add(option.value);
              break;
            }
          }
        } else {
          for (const option of element.options) {
            option.selected = values2.has(option.value);
            if (option.selected) {
              selectedValues.add(option.value);
            }
          }
        }
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
        return [...selectedValues.values()];
      }, values);
    }
    /**
     * This method scrolls element into view if needed, and then uses
     * {@link Touchscreen.tap} to tap in the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    async tap() {
      await this.scrollIntoViewIfNeeded();
      const { x, y } = await this.clickablePoint();
      await this.frame.page().touchscreen.tap(x, y);
    }
    /**
     * This method scrolls the element into view if needed, and then
     * starts a touch in the center of the element.
     * @returns A {@link TouchHandle} representing the touch that was started
     */
    async touchStart() {
      await this.scrollIntoViewIfNeeded();
      const { x, y } = await this.clickablePoint();
      return await this.frame.page().touchscreen.touchStart(x, y);
    }
    /**
     * This method scrolls the element into view if needed, and then
     * moves the touch to the center of the element.
     * @param touch - An optional {@link TouchHandle}. If provided, this touch
     * will be moved. If not provided, the first active touch will be moved.
     */
    async touchMove(touch) {
      await this.scrollIntoViewIfNeeded();
      const { x, y } = await this.clickablePoint();
      if (touch) {
        return await touch.move(x, y);
      }
      await this.frame.page().touchscreen.touchMove(x, y);
    }
    async touchEnd() {
      await this.scrollIntoViewIfNeeded();
      await this.frame.page().touchscreen.touchEnd();
    }
    /**
     * Calls {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus | focus} on the element.
     */
    async focus() {
      await this.evaluate((element) => {
        if (!(element instanceof HTMLElement)) {
          throw new Error("Cannot focus non-HTMLElement");
        }
        return element.focus();
      });
    }
    /**
     * Focuses the element, and then sends a `keydown`, `keypress`/`input`, and
     * `keyup` event for each character in the text.
     *
     * To press a special key, like `Control` or `ArrowDown`,
     * use {@link ElementHandle.press}.
     *
     * @example
     *
     * ```ts
     * await elementHandle.type('Hello'); // Types instantly
     * await elementHandle.type('World', {delay: 100}); // Types slower, like a user
     * ```
     *
     * @example
     * An example of typing into a text field and then submitting the form:
     *
     * ```ts
     * const elementHandle = await page.$('input');
     * await elementHandle.type('some text');
     * await elementHandle.press('Enter');
     * ```
     *
     * @param options - Delay in milliseconds. Defaults to 0.
     */
    async type(text, options) {
      await this.focus();
      await this.frame.page().keyboard.type(text, options);
    }
    /**
     * Focuses the element, and then uses {@link Keyboard.down} and {@link Keyboard.up}.
     *
     * @remarks
     * If `key` is a single character and no modifier keys besides `Shift`
     * are being held down, a `keypress`/`input` event will also be generated.
     * The `text` option can be specified to force an input event to be generated.
     *
     * **NOTE** Modifier keys DO affect `elementHandle.press`. Holding down `Shift`
     * will type the text in upper case.
     *
     * @param key - Name of key to press, such as `ArrowLeft`.
     * See {@link KeyInput} for a list of all key names.
     */
    async press(key, options) {
      await this.focus();
      await this.frame.page().keyboard.press(key, options);
    }
    async #clickableBox() {
      const boxes = await this.evaluate((element) => {
        if (!(element instanceof Element)) {
          return null;
        }
        return [...element.getClientRects()].map((rect) => {
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        });
      });
      if (!boxes?.length) {
        return null;
      }
      await this.#intersectBoundingBoxesWithFrame(boxes);
      let frame = this.frame;
      let parentFrame;
      while (parentFrame = frame?.parentFrame()) {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
          const handle = __addDisposableResource9(env_3, await frame.frameElement(), false);
          if (!handle) {
            throw new Error("Unsupported frame type");
          }
          const parentBox = await handle.evaluate((element) => {
            if (element.getClientRects().length === 0) {
              return null;
            }
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return {
              left: rect.left + parseInt(style.paddingLeft, 10) + parseInt(style.borderLeftWidth, 10),
              top: rect.top + parseInt(style.paddingTop, 10) + parseInt(style.borderTopWidth, 10)
            };
          });
          if (!parentBox) {
            return null;
          }
          for (const box2 of boxes) {
            box2.x += parentBox.left;
            box2.y += parentBox.top;
          }
          await handle.#intersectBoundingBoxesWithFrame(boxes);
          frame = parentFrame;
        } catch (e_3) {
          env_3.error = e_3;
          env_3.hasError = true;
        } finally {
          __disposeResources9(env_3);
        }
      }
      const box = boxes.find((box2) => {
        return box2.width >= 1 && box2.height >= 1;
      });
      if (!box) {
        return null;
      }
      return {
        x: box.x,
        y: box.y,
        height: box.height,
        width: box.width
      };
    }
    async #intersectBoundingBoxesWithFrame(boxes) {
      const { documentWidth, documentHeight } = await this.frame.isolatedRealm().evaluate(() => {
        return {
          documentWidth: document.documentElement.clientWidth,
          documentHeight: document.documentElement.clientHeight
        };
      });
      for (const box of boxes) {
        intersectBoundingBox(box, documentWidth, documentHeight);
      }
    }
    /**
     * This method returns the bounding box of the element (relative to the main frame),
     * or `null` if the element is {@link https://drafts.csswg.org/css-display-4/#box-generation | not part of the layout}
     * (example: `display: none`).
     */
    async boundingBox() {
      const box = await this.evaluate((element) => {
        if (!(element instanceof Element)) {
          return null;
        }
        if (element.getClientRects().length === 0) {
          return null;
        }
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      });
      if (!box) {
        return null;
      }
      const offset = await this.#getTopLeftCornerOfFrame();
      if (!offset) {
        return null;
      }
      return {
        x: box.x + offset.x,
        y: box.y + offset.y,
        height: box.height,
        width: box.width
      };
    }
    /**
     * This method returns boxes of the element,
     * or `null` if the element is {@link https://drafts.csswg.org/css-display-4/#box-generation | not part of the layout}
     * (example: `display: none`).
     *
     * @remarks
     *
     * Boxes are represented as an array of points;
     * Each Point is an object `{x, y}`. Box points are sorted clock-wise.
     */
    async boxModel() {
      const model = await this.evaluate((element) => {
        if (!(element instanceof Element)) {
          return null;
        }
        if (element.getClientRects().length === 0) {
          return null;
        }
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const offsets = {
          padding: {
            left: parseInt(style.paddingLeft, 10),
            top: parseInt(style.paddingTop, 10),
            right: parseInt(style.paddingRight, 10),
            bottom: parseInt(style.paddingBottom, 10)
          },
          margin: {
            left: -parseInt(style.marginLeft, 10),
            top: -parseInt(style.marginTop, 10),
            right: -parseInt(style.marginRight, 10),
            bottom: -parseInt(style.marginBottom, 10)
          },
          border: {
            left: parseInt(style.borderLeft, 10),
            top: parseInt(style.borderTop, 10),
            right: parseInt(style.borderRight, 10),
            bottom: parseInt(style.borderBottom, 10)
          }
        };
        const border = [
          { x: rect.left, y: rect.top },
          { x: rect.left + rect.width, y: rect.top },
          { x: rect.left + rect.width, y: rect.top + rect.height },
          { x: rect.left, y: rect.top + rect.height }
        ];
        const padding = transformQuadWithOffsets(border, offsets.border);
        const content = transformQuadWithOffsets(padding, offsets.padding);
        const margin = transformQuadWithOffsets(border, offsets.margin);
        return {
          content,
          padding,
          border,
          margin,
          width: rect.width,
          height: rect.height
        };
        function transformQuadWithOffsets(quad, offsets2) {
          return [
            {
              x: quad[0].x + offsets2.left,
              y: quad[0].y + offsets2.top
            },
            {
              x: quad[1].x - offsets2.right,
              y: quad[1].y + offsets2.top
            },
            {
              x: quad[2].x - offsets2.right,
              y: quad[2].y - offsets2.bottom
            },
            {
              x: quad[3].x + offsets2.left,
              y: quad[3].y - offsets2.bottom
            }
          ];
        }
      });
      if (!model) {
        return null;
      }
      const offset = await this.#getTopLeftCornerOfFrame();
      if (!offset) {
        return null;
      }
      for (const attribute of [
        "content",
        "padding",
        "border",
        "margin"
      ]) {
        for (const point of model[attribute]) {
          point.x += offset.x;
          point.y += offset.y;
        }
      }
      return model;
    }
    async #getTopLeftCornerOfFrame() {
      const point = { x: 0, y: 0 };
      let frame = this.frame;
      let parentFrame;
      while (parentFrame = frame?.parentFrame()) {
        const env_4 = { stack: [], error: void 0, hasError: false };
        try {
          const handle = __addDisposableResource9(env_4, await frame.frameElement(), false);
          if (!handle) {
            throw new Error("Unsupported frame type");
          }
          const parentBox = await handle.evaluate((element) => {
            if (element.getClientRects().length === 0) {
              return null;
            }
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return {
              left: rect.left + parseInt(style.paddingLeft, 10) + parseInt(style.borderLeftWidth, 10),
              top: rect.top + parseInt(style.paddingTop, 10) + parseInt(style.borderTopWidth, 10)
            };
          });
          if (!parentBox) {
            return null;
          }
          point.x += parentBox.left;
          point.y += parentBox.top;
          frame = parentFrame;
        } catch (e_4) {
          env_4.error = e_4;
          env_4.hasError = true;
        } finally {
          __disposeResources9(env_4);
        }
      }
      return point;
    }
    async screenshot(options = {}) {
      const { scrollIntoView = true, clip } = options;
      const page = this.frame.page();
      if (scrollIntoView) {
        await this.scrollIntoViewIfNeeded();
      }
      const elementClip = await this.#nonEmptyVisibleBoundingBox();
      const [pageLeft, pageTop] = await this.evaluate(() => {
        if (!window.visualViewport) {
          throw new Error("window.visualViewport is not supported.");
        }
        return [
          window.visualViewport.pageLeft,
          window.visualViewport.pageTop
        ];
      });
      elementClip.x += pageLeft;
      elementClip.y += pageTop;
      if (clip) {
        elementClip.x += clip.x;
        elementClip.y += clip.y;
        elementClip.height = clip.height;
        elementClip.width = clip.width;
      }
      return await page.screenshot({ ...options, clip: elementClip });
    }
    async #nonEmptyVisibleBoundingBox() {
      const box = await this.boundingBox();
      assert(box, "Node is either not visible or not an HTMLElement");
      assert(box.width !== 0, "Node has 0 width.");
      assert(box.height !== 0, "Node has 0 height.");
      return box;
    }
    /**
     * @internal
     */
    async assertConnectedElement() {
      const error = await this.evaluate(async (element) => {
        if (!element.isConnected) {
          return "Node is detached from document";
        }
        if (element.nodeType !== Node.ELEMENT_NODE) {
          return "Node is not of type HTMLElement";
        }
        return;
      });
      if (error) {
        throw new Error(error);
      }
    }
    /**
     * @internal
     */
    async scrollIntoViewIfNeeded() {
      if (await this.isIntersectingViewport({
        threshold: 1
      })) {
        return;
      }
      await this.scrollIntoView();
    }
    /**
     * Resolves to true if the element is visible in the current viewport. If an
     * element is an SVG, we check if the svg owner element is in the viewport
     * instead. See https://crbug.com/963246.
     *
     * @param options - Threshold for the intersection between 0 (no intersection) and 1
     * (full intersection). Defaults to 1.
     */
    async isIntersectingViewport(options = {}) {
      const env_5 = { stack: [], error: void 0, hasError: false };
      try {
        await this.assertConnectedElement();
        const handle = await this.#asSVGElementHandle();
        const target = __addDisposableResource9(env_5, handle && await handle.#getOwnerSVGElement(), false);
        return await (target ?? this).evaluate(async (element, threshold) => {
          const visibleRatio = await new Promise((resolve) => {
            const observer = new IntersectionObserver((entries) => {
              resolve(entries[0].intersectionRatio);
              observer.disconnect();
            });
            observer.observe(element);
          });
          return threshold === 1 ? visibleRatio === 1 : visibleRatio > threshold;
        }, options.threshold ?? 0);
      } catch (e_5) {
        env_5.error = e_5;
        env_5.hasError = true;
      } finally {
        __disposeResources9(env_5);
      }
    }
    /**
     * Scrolls the element into view using either the automation protocol client
     * or by calling element.scrollIntoView.
     */
    async scrollIntoView() {
      await this.assertConnectedElement();
      await this.evaluate(async (element) => {
        element.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: "instant"
        });
      });
    }
    /**
     * Creates a locator based on an ElementHandle. This would not allow
     * refreshing the element handle if it is stale but it allows re-using other
     * locator pre-conditions.
     */
    asLocator() {
      return NodeLocator.createFromHandle(this.frame, this);
    }
    /**
     * Returns true if an element is an SVGElement (included svg, path, rect
     * etc.).
     */
    async #asSVGElementHandle() {
      if (await this.evaluate((element) => {
        return element instanceof SVGElement;
      })) {
        return this;
      } else {
        return null;
      }
    }
    async #getOwnerSVGElement() {
      return await this.evaluateHandle((element) => {
        if (element instanceof SVGSVGElement) {
          return element;
        }
        return element.ownerSVGElement;
      });
    }
  };
})();
function intersectBoundingBox(box, width, height) {
  box.width = Math.max(box.x >= 0 ? Math.min(width - box.x, box.width) : Math.min(width, box.width + box.x), 0);
  box.height = Math.max(box.y >= 0 ? Math.min(height - box.y, box.height) : Math.min(height, box.height + box.y), 0);
  box.x = Math.max(box.x, 0);
  box.y = Math.max(box.y, 0);
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/utils.js
function createEvaluationError(details) {
  let name;
  let message;
  if (!details.exception) {
    name = "Error";
    message = details.text;
  } else if ((details.exception.type !== "object" || details.exception.subtype !== "error") && !details.exception.objectId) {
    return valueFromRemoteObject(details.exception);
  } else {
    const detail = getErrorDetails(details);
    name = detail.name;
    message = detail.message;
  }
  const messageHeight = message.split("\n").length;
  const error = new Error(message);
  error.name = name;
  const stackLines = error.stack.split("\n");
  const messageLines = stackLines.splice(0, messageHeight);
  stackLines.shift();
  if (details.stackTrace && stackLines.length < Error.stackTraceLimit) {
    for (const frame of details.stackTrace.callFrames.reverse()) {
      if (PuppeteerURL.isPuppeteerURL(frame.url) && frame.url !== PuppeteerURL.INTERNAL_URL) {
        const url = PuppeteerURL.parse(frame.url);
        stackLines.unshift(`    at ${frame.functionName || url.functionName} (${url.functionName} at ${url.siteString}, <anonymous>:${frame.lineNumber}:${frame.columnNumber})`);
      } else {
        stackLines.push(`    at ${frame.functionName || "<anonymous>"} (${frame.url}:${frame.lineNumber}:${frame.columnNumber})`);
      }
      if (stackLines.length >= Error.stackTraceLimit) {
        break;
      }
    }
  }
  error.stack = [...messageLines, ...stackLines].join("\n");
  return error;
}
var getErrorDetails = (details) => {
  let name = "";
  let message;
  const lines = details.exception?.description?.split("\n    at ") ?? [];
  const size = Math.min(details.stackTrace?.callFrames.length ?? 0, lines.length - 1);
  lines.splice(-size, size);
  if (details.exception?.className) {
    name = details.exception.className;
  }
  message = lines.join("\n");
  if (name && message.startsWith(`${name}: `)) {
    message = message.slice(name.length + 2);
  }
  return { message, name };
};
function createClientError(details) {
  let name;
  let message;
  if (!details.exception) {
    name = "Error";
    message = details.text;
  } else if ((details.exception.type !== "object" || details.exception.subtype !== "error") && !details.exception.objectId) {
    return valueFromRemoteObject(details.exception);
  } else {
    const detail = getErrorDetails(details);
    name = detail.name;
    message = detail.message;
  }
  const error = new Error(message);
  error.name = name;
  const messageHeight = error.message.split("\n").length;
  const messageLines = error.stack.split("\n").splice(0, messageHeight);
  const stackLines = [];
  if (details.stackTrace) {
    for (const frame of details.stackTrace.callFrames) {
      stackLines.push(`    at ${frame.functionName || "<anonymous>"} (${frame.url}:${frame.lineNumber + 1}:${frame.columnNumber + 1})`);
      if (stackLines.length >= Error.stackTraceLimit) {
        break;
      }
    }
  }
  error.stack = [...messageLines, ...stackLines].join("\n");
  return error;
}
function valueFromRemoteObject(remoteObject) {
  assert(!remoteObject.objectId, "Cannot extract value when objectId is given");
  if (remoteObject.unserializableValue) {
    if (remoteObject.type === "bigint") {
      return BigInt(remoteObject.unserializableValue.replace("n", ""));
    }
    switch (remoteObject.unserializableValue) {
      case "-0":
        return -0;
      case "NaN":
        return NaN;
      case "Infinity":
        return Infinity;
      case "-Infinity":
        return -Infinity;
      default:
        throw new Error("Unsupported unserializable value: " + remoteObject.unserializableValue);
    }
  }
  return remoteObject.value;
}
function addPageBinding(type, name, prefix) {
  if (globalThis[name]) {
    return;
  }
  Object.assign(globalThis, {
    [name](...args) {
      const callPuppeteer = globalThis[name];
      callPuppeteer.args ??= /* @__PURE__ */ new Map();
      callPuppeteer.callbacks ??= /* @__PURE__ */ new Map();
      const seq = (callPuppeteer.lastSeq ?? 0) + 1;
      callPuppeteer.lastSeq = seq;
      callPuppeteer.args.set(seq, args);
      globalThis[prefix + name](JSON.stringify({
        type,
        name,
        seq,
        args,
        isTrivial: !args.some((value) => {
          return value instanceof Node;
        })
      }));
      return new Promise((resolve, reject) => {
        callPuppeteer.callbacks.set(seq, {
          resolve(value) {
            callPuppeteer.args.delete(seq);
            resolve(value);
          },
          reject(value) {
            callPuppeteer.args.delete(seq);
            reject(value);
          }
        });
      });
    }
  });
}
var CDP_BINDING_PREFIX = "puppeteer_";
function pageBindingInitString(type, name) {
  return evaluationString(addPageBinding, type, name, CDP_BINDING_PREFIX);
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/JSHandle.js
var CdpJSHandle = class extends JSHandle {
  #disposed = false;
  #remoteObject;
  #world;
  constructor(world, remoteObject) {
    super();
    this.#world = world;
    this.#remoteObject = remoteObject;
  }
  get disposed() {
    return this.#disposed;
  }
  get realm() {
    return this.#world;
  }
  get client() {
    return this.realm.environment.client;
  }
  async jsonValue() {
    if (!this.#remoteObject.objectId) {
      return valueFromRemoteObject(this.#remoteObject);
    }
    const value = await this.evaluate((object) => {
      return object;
    });
    if (value === void 0) {
      throw new Error("Could not serialize referenced object");
    }
    return value;
  }
  /**
   * Either `null` or the handle itself if the handle is an
   * instance of {@link ElementHandle}.
   */
  asElement() {
    return null;
  }
  async dispose() {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    await releaseObject(this.client, this.#remoteObject);
  }
  toString() {
    if (!this.#remoteObject.objectId) {
      return "JSHandle:" + valueFromRemoteObject(this.#remoteObject);
    }
    const type = this.#remoteObject.subtype || this.#remoteObject.type;
    return "JSHandle@" + type;
  }
  get id() {
    return this.#remoteObject.objectId;
  }
  remoteObject() {
    return this.#remoteObject;
  }
  async getProperties() {
    const response = await this.client.send("Runtime.getProperties", {
      objectId: this.#remoteObject.objectId,
      ownProperties: true
    });
    const result = /* @__PURE__ */ new Map();
    for (const property of response.result) {
      if (!property.enumerable || !property.value) {
        continue;
      }
      result.set(property.name, this.#world.createCdpHandle(property.value));
    }
    return result;
  }
};
async function releaseObject(client, remoteObject) {
  if (!remoteObject.objectId) {
    return;
  }
  await client.send("Runtime.releaseObject", { objectId: remoteObject.objectId }).catch((error) => {
    debugError(error);
  });
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/ElementHandle.js
var __runInitializers6 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate6 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var NON_ELEMENT_NODE_ROLES = /* @__PURE__ */ new Set(["StaticText", "InlineTextBox"]);
var CdpElementHandle = (() => {
  let _classSuper = ElementHandle;
  let _instanceExtraInitializers = [];
  let _contentFrame_decorators;
  let _scrollIntoView_decorators;
  let _uploadFile_decorators;
  let _autofill_decorators;
  return class CdpElementHandle extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _contentFrame_decorators = [throwIfDisposed()];
      _scrollIntoView_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _uploadFile_decorators = [throwIfDisposed(), bindIsolatedHandle];
      _autofill_decorators = [throwIfDisposed()];
      __esDecorate6(this, null, _contentFrame_decorators, { kind: "method", name: "contentFrame", static: false, private: false, access: { has: (obj) => "contentFrame" in obj, get: (obj) => obj.contentFrame }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate6(this, null, _scrollIntoView_decorators, { kind: "method", name: "scrollIntoView", static: false, private: false, access: { has: (obj) => "scrollIntoView" in obj, get: (obj) => obj.scrollIntoView }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate6(this, null, _uploadFile_decorators, { kind: "method", name: "uploadFile", static: false, private: false, access: { has: (obj) => "uploadFile" in obj, get: (obj) => obj.uploadFile }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate6(this, null, _autofill_decorators, { kind: "method", name: "autofill", static: false, private: false, access: { has: (obj) => "autofill" in obj, get: (obj) => obj.autofill }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    #backendNodeId = __runInitializers6(this, _instanceExtraInitializers);
    constructor(world, remoteObject) {
      super(new CdpJSHandle(world, remoteObject));
    }
    get realm() {
      return this.handle.realm;
    }
    get client() {
      return this.handle.client;
    }
    remoteObject() {
      return this.handle.remoteObject();
    }
    get #frameManager() {
      return this.frame._frameManager;
    }
    get frame() {
      return this.realm.environment;
    }
    async contentFrame() {
      const nodeInfo = await this.client.send("DOM.describeNode", {
        objectId: this.id
      });
      if (typeof nodeInfo.node.frameId !== "string") {
        return null;
      }
      return this.#frameManager.frame(nodeInfo.node.frameId);
    }
    async scrollIntoView() {
      await this.assertConnectedElement();
      try {
        await this.client.send("DOM.scrollIntoViewIfNeeded", {
          objectId: this.id
        });
      } catch (error) {
        debugError(error);
        await super.scrollIntoView();
      }
    }
    async uploadFile(...files) {
      const isMultiple = await this.evaluate((element) => {
        return element.multiple;
      });
      assert(files.length <= 1 || isMultiple, "Multiple file uploads only work with <input type=file multiple>");
      const path = environment.value.path;
      if (path) {
        files = files.map((filePath) => {
          if (path.win32.isAbsolute(filePath) || path.posix.isAbsolute(filePath)) {
            return filePath;
          } else {
            return path.resolve(filePath);
          }
        });
      }
      if (files.length === 0) {
        await this.evaluate((element) => {
          element.files = new DataTransfer().files;
          element.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
          element.dispatchEvent(new Event("change", { bubbles: true }));
        });
        return;
      }
      const { node: { backendNodeId } } = await this.client.send("DOM.describeNode", {
        objectId: this.id
      });
      await this.client.send("DOM.setFileInputFiles", {
        objectId: this.id,
        files,
        backendNodeId
      });
    }
    async autofill(data) {
      const nodeInfo = await this.client.send("DOM.describeNode", {
        objectId: this.handle.id
      });
      const fieldId = nodeInfo.node.backendNodeId;
      const frameId = this.frame._id;
      await this.client.send("Autofill.trigger", {
        fieldId,
        frameId,
        card: data.creditCard
      });
    }
    async *queryAXTree(name, role) {
      const { nodes } = await this.client.send("Accessibility.queryAXTree", {
        objectId: this.id,
        accessibleName: name,
        role
      });
      const results = nodes.filter((node) => {
        if (node.ignored) {
          return false;
        }
        if (!node.role) {
          return false;
        }
        if (NON_ELEMENT_NODE_ROLES.has(node.role.value)) {
          return false;
        }
        return true;
      });
      return yield* AsyncIterableUtil.map(results, (node) => {
        return this.realm.adoptBackendNode(node.backendDOMNodeId);
      });
    }
    async backendNodeId() {
      if (this.#backendNodeId) {
        return this.#backendNodeId;
      }
      const { node } = await this.client.send("DOM.describeNode", {
        objectId: this.handle.id
      });
      this.#backendNodeId = node.backendNodeId;
      return this.#backendNodeId;
    }
  };
})();

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/ExecutionContext.js
var __addDisposableResource10 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources10 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var ariaQuerySelectorBinding = new Binding("__ariaQuerySelector", ARIAQueryHandler.queryOne, "");
var ariaQuerySelectorAllBinding = new Binding("__ariaQuerySelectorAll", async (element, selector) => {
  const results = ARIAQueryHandler.queryAll(element, selector);
  return await element.realm.evaluateHandle((...elements) => {
    return elements;
  }, ...await AsyncIterableUtil.collect(results));
}, "");
var ExecutionContext = class extends EventEmitter {
  #client;
  #world;
  #id;
  #name;
  #disposables = new DisposableStack();
  constructor(client, contextPayload, world) {
    super();
    this.#client = client;
    this.#world = world;
    this.#id = contextPayload.id;
    if (contextPayload.name) {
      this.#name = contextPayload.name;
    }
    const clientEmitter = this.#disposables.use(new EventEmitter(this.#client));
    clientEmitter.on("Runtime.bindingCalled", this.#onBindingCalled.bind(this));
    clientEmitter.on("Runtime.executionContextDestroyed", async (event) => {
      if (event.executionContextId === this.#id) {
        this[disposeSymbol]();
      }
    });
    clientEmitter.on("Runtime.executionContextsCleared", async () => {
      this[disposeSymbol]();
    });
    clientEmitter.on("Runtime.consoleAPICalled", this.#onConsoleAPI.bind(this));
    clientEmitter.on(CDPSessionEvent.Disconnected, () => {
      this[disposeSymbol]();
    });
  }
  // Contains mapping from functions that should be bound to Puppeteer functions.
  #bindings = /* @__PURE__ */ new Map();
  // If multiple waitFor are set up asynchronously, we need to wait for the
  // first one to set up the binding in the page before running the others.
  #mutex = new Mutex();
  async #addBinding(binding) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      if (this.#bindings.has(binding.name)) {
        return;
      }
      const _ = __addDisposableResource10(env_1, await this.#mutex.acquire(), false);
      try {
        await this.#client.send("Runtime.addBinding", this.#name ? {
          name: CDP_BINDING_PREFIX + binding.name,
          executionContextName: this.#name
        } : {
          name: CDP_BINDING_PREFIX + binding.name,
          executionContextId: this.#id
        });
        await this.evaluate(addPageBinding, "internal", binding.name, CDP_BINDING_PREFIX);
        this.#bindings.set(binding.name, binding);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("Execution context was destroyed")) {
            return;
          }
          if (error.message.includes("Cannot find context with specified id")) {
            return;
          }
        }
        debugError(error);
      }
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources10(env_1);
    }
  }
  async #onBindingCalled(event) {
    if (event.executionContextId !== this.#id) {
      return;
    }
    let payload;
    try {
      payload = JSON.parse(event.payload);
    } catch {
      return;
    }
    const { type, name, seq, args, isTrivial } = payload;
    if (type !== "internal") {
      this.emit("bindingcalled", event);
      return;
    }
    if (!this.#bindings.has(name)) {
      this.emit("bindingcalled", event);
      return;
    }
    try {
      const binding = this.#bindings.get(name);
      await binding?.run(this, seq, args, isTrivial);
    } catch (err) {
      debugError(err);
    }
  }
  get id() {
    return this.#id;
  }
  #onConsoleAPI(event) {
    if (event.executionContextId !== this.#id) {
      return;
    }
    this.emit("consoleapicalled", event);
  }
  #bindingsInstalled = false;
  #puppeteerUtil;
  get puppeteerUtil() {
    let promise = Promise.resolve();
    if (!this.#bindingsInstalled) {
      promise = Promise.all([
        this.#addBindingWithoutThrowing(ariaQuerySelectorBinding),
        this.#addBindingWithoutThrowing(ariaQuerySelectorAllBinding)
      ]);
      this.#bindingsInstalled = true;
    }
    scriptInjector.inject((script) => {
      if (this.#puppeteerUtil) {
        void this.#puppeteerUtil.then((handle) => {
          void handle.dispose();
        });
      }
      this.#puppeteerUtil = promise.then(() => {
        return this.evaluateHandle(script);
      });
    }, !this.#puppeteerUtil);
    return this.#puppeteerUtil;
  }
  async #addBindingWithoutThrowing(binding) {
    try {
      await this.#addBinding(binding);
    } catch (err) {
      debugError(err);
    }
  }
  /**
   * Evaluates the given function.
   *
   * @example
   *
   * ```ts
   * const executionContext = await page.mainFrame().executionContext();
   * const result = await executionContext.evaluate(() => Promise.resolve(8 * 7))* ;
   * console.log(result); // prints "56"
   * ```
   *
   * @example
   * A string can also be passed in instead of a function:
   *
   * ```ts
   * console.log(await executionContext.evaluate('1 + 2')); // prints "3"
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const oneHandle = await executionContext.evaluateHandle(() => 1);
   * const twoHandle = await executionContext.evaluateHandle(() => 2);
   * const result = await executionContext.evaluate(
   *   (a, b) => a + b,
   *   oneHandle,
   *   twoHandle,
   * );
   * await oneHandle.dispose();
   * await twoHandle.dispose();
   * console.log(result); // prints '3'.
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns The result of evaluating the function. If the result is an object,
   * a vanilla object containing the serializable properties of the result is
   * returned.
   */
  async evaluate(pageFunction, ...args) {
    return await this.#evaluate(true, pageFunction, ...args);
  }
  /**
   * Evaluates the given function.
   *
   * Unlike {@link ExecutionContext.evaluate | evaluate}, this method returns a
   * handle to the result of the function.
   *
   * This method may be better suited if the object cannot be serialized (e.g.
   * `Map`) and requires further manipulation.
   *
   * @example
   *
   * ```ts
   * const context = await page.mainFrame().executionContext();
   * const handle: JSHandle<typeof globalThis> = await context.evaluateHandle(
   *   () => Promise.resolve(self),
   * );
   * ```
   *
   * @example
   * A string can also be passed in instead of a function.
   *
   * ```ts
   * const handle: JSHandle<number> = await context.evaluateHandle('1 + 2');
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const bodyHandle: ElementHandle<HTMLBodyElement> =
   *   await context.evaluateHandle(() => {
   *     return document.body;
   *   });
   * const stringHandle: JSHandle<string> = await context.evaluateHandle(
   *   body => body.innerHTML,
   *   body,
   * );
   * console.log(await stringHandle.jsonValue()); // prints body's innerHTML
   * // Always dispose your garbage! :)
   * await bodyHandle.dispose();
   * await stringHandle.dispose();
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns A {@link JSHandle | handle} to the result of evaluating the
   * function. If the result is a `Node`, then this will return an
   * {@link ElementHandle | element handle}.
   */
  async evaluateHandle(pageFunction, ...args) {
    return await this.#evaluate(false, pageFunction, ...args);
  }
  async #evaluate(returnByValue, pageFunction, ...args) {
    const sourceUrlComment = getSourceUrlComment(getSourcePuppeteerURLIfAvailable(pageFunction)?.toString() ?? PuppeteerURL.INTERNAL_URL);
    if (isString(pageFunction)) {
      const contextId = this.#id;
      const expression = pageFunction;
      const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : `${expression}
${sourceUrlComment}
`;
      const { exceptionDetails: exceptionDetails2, result: remoteObject2 } = await this.#client.send("Runtime.evaluate", {
        expression: expressionWithSourceUrl,
        contextId,
        returnByValue,
        awaitPromise: true,
        userGesture: true
      }).catch(rewriteError2);
      if (exceptionDetails2) {
        throw createEvaluationError(exceptionDetails2);
      }
      if (returnByValue) {
        return valueFromRemoteObject(remoteObject2);
      }
      return this.#world.createCdpHandle(remoteObject2);
    }
    const functionDeclaration = stringifyFunction(pageFunction);
    const functionDeclarationWithSourceUrl = SOURCE_URL_REGEX.test(functionDeclaration) ? functionDeclaration : `${functionDeclaration}
${sourceUrlComment}
`;
    let callFunctionOnPromise;
    try {
      callFunctionOnPromise = this.#client.send("Runtime.callFunctionOn", {
        functionDeclaration: functionDeclarationWithSourceUrl,
        executionContextId: this.#id,
        // LazyArgs are used only internally and should not affect the order
        // evaluate calls for the public APIs.
        arguments: args.some((arg) => {
          return arg instanceof LazyArg;
        }) ? await Promise.all(args.map((arg) => {
          return convertArgumentAsync(this, arg);
        })) : args.map((arg) => {
          return convertArgument(this, arg);
        }),
        returnByValue,
        awaitPromise: true,
        userGesture: true
      });
    } catch (error) {
      if (error instanceof TypeError && error.message.startsWith("Converting circular structure to JSON")) {
        error.message += " Recursive objects are not allowed.";
      }
      throw error;
    }
    const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError2);
    if (exceptionDetails) {
      throw createEvaluationError(exceptionDetails);
    }
    if (returnByValue) {
      return valueFromRemoteObject(remoteObject);
    }
    return this.#world.createCdpHandle(remoteObject);
    async function convertArgumentAsync(context2, arg) {
      if (arg instanceof LazyArg) {
        arg = await arg.get(context2);
      }
      return convertArgument(context2, arg);
    }
    function convertArgument(context2, arg) {
      if (typeof arg === "bigint") {
        return { unserializableValue: `${arg.toString()}n` };
      }
      if (Object.is(arg, -0)) {
        return { unserializableValue: "-0" };
      }
      if (Object.is(arg, Infinity)) {
        return { unserializableValue: "Infinity" };
      }
      if (Object.is(arg, -Infinity)) {
        return { unserializableValue: "-Infinity" };
      }
      if (Object.is(arg, NaN)) {
        return { unserializableValue: "NaN" };
      }
      const objectHandle = arg && (arg instanceof CdpJSHandle || arg instanceof CdpElementHandle) ? arg : null;
      if (objectHandle) {
        if (objectHandle.realm !== context2.#world) {
          throw new Error("JSHandles can be evaluated only in the context they were created!");
        }
        if (objectHandle.disposed) {
          throw new Error("JSHandle is disposed!");
        }
        if (objectHandle.remoteObject().unserializableValue) {
          return {
            unserializableValue: objectHandle.remoteObject().unserializableValue
          };
        }
        if (!objectHandle.remoteObject().objectId) {
          return { value: objectHandle.remoteObject().value };
        }
        return { objectId: objectHandle.remoteObject().objectId };
      }
      return { value: arg };
    }
  }
  [disposeSymbol]() {
    this.#disposables.dispose();
    this.emit("disposed", void 0);
  }
};
var rewriteError2 = (error) => {
  if (error.message.includes("Object reference chain is too long")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.includes("Object couldn't be returned by value")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.endsWith("Cannot find context with specified id") || error.message.endsWith("Inspected target navigated or closed")) {
    throw new Error("Execution context was destroyed, most likely because of a navigation.");
  }
  throw error;
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Accessibility.js
var __addDisposableResource11 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources11 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var Accessibility = class {
  #realm;
  #frameId;
  /**
   * @internal
   */
  constructor(realm, frameId = "") {
    this.#realm = realm;
    this.#frameId = frameId;
  }
  /**
   * Captures the current state of the accessibility tree.
   * The returned object represents the root accessible node of the page.
   *
   * @remarks
   *
   * **NOTE** The Chrome accessibility tree contains nodes that go unused on
   * most platforms and by most screen readers. Puppeteer will discard them as
   * well for an easier to process tree, unless `interestingOnly` is set to
   * `false`.
   *
   * @example
   * An example of dumping the entire accessibility tree:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * console.log(snapshot);
   * ```
   *
   * @example
   * An example of logging the focused node's name:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * const node = findFocusedNode(snapshot);
   * console.log(node && node.name);
   *
   * function findFocusedNode(node) {
   *   if (node.focused) return node;
   *   for (const child of node.children || []) {
   *     const foundNode = findFocusedNode(child);
   *     return foundNode;
   *   }
   *   return null;
   * }
   * ```
   *
   * @returns An AXNode object representing the snapshot.
   */
  async snapshot(options = {}) {
    const { interestingOnly = true, root = null, includeIframes = false } = options;
    const { nodes } = await this.#realm.environment.client.send("Accessibility.getFullAXTree", {
      frameId: this.#frameId
    });
    let backendNodeId;
    if (root) {
      const { node } = await this.#realm.environment.client.send("DOM.describeNode", {
        objectId: root.id
      });
      backendNodeId = node.backendNodeId;
    }
    const defaultRoot = AXNode.createTree(this.#realm, nodes);
    const populateIframes = async (root2) => {
      if (root2.payload.role?.value === "Iframe") {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
          if (!root2.payload.backendDOMNodeId) {
            return;
          }
          const handle = __addDisposableResource11(env_1, await this.#realm.adoptBackendNode(root2.payload.backendDOMNodeId), false);
          if (!handle || !("contentFrame" in handle)) {
            return;
          }
          const frame = await handle.contentFrame();
          if (!frame) {
            return;
          }
          const iframeSnapshot = await frame.accessibility.snapshot(options);
          root2.iframeSnapshot = iframeSnapshot ?? void 0;
        } catch (e_1) {
          env_1.error = e_1;
          env_1.hasError = true;
        } finally {
          __disposeResources11(env_1);
        }
      }
      for (const child of root2.children) {
        await populateIframes(child);
      }
    };
    let needle = defaultRoot;
    if (!defaultRoot) {
      return null;
    }
    if (includeIframes) {
      await populateIframes(defaultRoot);
    }
    if (backendNodeId) {
      needle = defaultRoot.find((node) => {
        return node.payload.backendDOMNodeId === backendNodeId;
      });
    }
    if (!needle) {
      return null;
    }
    if (!interestingOnly) {
      return this.serializeTree(needle)[0] ?? null;
    }
    const interestingNodes = /* @__PURE__ */ new Set();
    this.collectInterestingNodes(interestingNodes, defaultRoot, false);
    return this.serializeTree(needle, interestingNodes)[0] ?? null;
  }
  serializeTree(node, interestingNodes) {
    const children = [];
    for (const child of node.children) {
      children.push(...this.serializeTree(child, interestingNodes));
    }
    if (interestingNodes && !interestingNodes.has(node)) {
      return children;
    }
    const serializedNode = node.serialize();
    if (children.length) {
      serializedNode.children = children;
    }
    if (node.iframeSnapshot) {
      if (!serializedNode.children) {
        serializedNode.children = [];
      }
      serializedNode.children.push(node.iframeSnapshot);
    }
    return [serializedNode];
  }
  collectInterestingNodes(collection, node, insideControl) {
    if (node.isInteresting(insideControl) || node.iframeSnapshot) {
      collection.add(node);
    }
    if (node.isLeafNode()) {
      return;
    }
    insideControl = insideControl || node.isControl();
    for (const child of node.children) {
      this.collectInterestingNodes(collection, child, insideControl);
    }
  }
};
var AXNode = class _AXNode {
  payload;
  children = [];
  iframeSnapshot;
  #richlyEditable = false;
  #editable = false;
  #focusable = false;
  #hidden = false;
  #name;
  #role;
  #ignored;
  #cachedHasFocusableChild;
  #realm;
  constructor(realm, payload) {
    this.payload = payload;
    this.#name = this.payload.name ? this.payload.name.value : "";
    this.#role = this.payload.role ? this.payload.role.value : "Unknown";
    this.#ignored = this.payload.ignored;
    this.#realm = realm;
    for (const property of this.payload.properties || []) {
      if (property.name === "editable") {
        this.#richlyEditable = property.value.value === "richtext";
        this.#editable = true;
      }
      if (property.name === "focusable") {
        this.#focusable = property.value.value;
      }
      if (property.name === "hidden") {
        this.#hidden = property.value.value;
      }
    }
  }
  #isPlainTextField() {
    if (this.#richlyEditable) {
      return false;
    }
    if (this.#editable) {
      return true;
    }
    return this.#role === "textbox" || this.#role === "searchbox";
  }
  #isTextOnlyObject() {
    const role = this.#role;
    return role === "LineBreak" || role === "text" || role === "InlineTextBox" || role === "StaticText";
  }
  #hasFocusableChild() {
    if (this.#cachedHasFocusableChild === void 0) {
      this.#cachedHasFocusableChild = false;
      for (const child of this.children) {
        if (child.#focusable || child.#hasFocusableChild()) {
          this.#cachedHasFocusableChild = true;
          break;
        }
      }
    }
    return this.#cachedHasFocusableChild;
  }
  find(predicate) {
    if (predicate(this)) {
      return this;
    }
    for (const child of this.children) {
      const result = child.find(predicate);
      if (result) {
        return result;
      }
    }
    return null;
  }
  isLeafNode() {
    if (!this.children.length) {
      return true;
    }
    if (this.#isPlainTextField() || this.#isTextOnlyObject()) {
      return true;
    }
    switch (this.#role) {
      case "doc-cover":
      case "graphics-symbol":
      case "img":
      case "image":
      case "Meter":
      case "scrollbar":
      case "slider":
      case "separator":
      case "progressbar":
        return true;
      default:
        break;
    }
    if (this.#hasFocusableChild()) {
      return false;
    }
    if (this.#role === "heading" && this.#name) {
      return true;
    }
    return false;
  }
  isControl() {
    switch (this.#role) {
      case "button":
      case "checkbox":
      case "ColorWell":
      case "combobox":
      case "DisclosureTriangle":
      case "listbox":
      case "menu":
      case "menubar":
      case "menuitem":
      case "menuitemcheckbox":
      case "menuitemradio":
      case "radio":
      case "scrollbar":
      case "searchbox":
      case "slider":
      case "spinbutton":
      case "switch":
      case "tab":
      case "textbox":
      case "tree":
      case "treeitem":
        return true;
      default:
        return false;
    }
  }
  isLandmark() {
    switch (this.#role) {
      case "banner":
      case "complementary":
      case "contentinfo":
      case "form":
      case "main":
      case "navigation":
      case "region":
      case "search":
        return true;
      default:
        return false;
    }
  }
  isInteresting(insideControl) {
    const role = this.#role;
    if (role === "Ignored" || this.#hidden || this.#ignored) {
      return false;
    }
    if (this.isLandmark()) {
      return true;
    }
    if (this.#focusable || this.#richlyEditable) {
      return true;
    }
    if (this.isControl()) {
      return true;
    }
    if (insideControl) {
      return false;
    }
    return this.isLeafNode() && !!this.#name;
  }
  serialize() {
    const properties = /* @__PURE__ */ new Map();
    for (const property of this.payload.properties || []) {
      properties.set(property.name.toLowerCase(), property.value.value);
    }
    if (this.payload.name) {
      properties.set("name", this.payload.name.value);
    }
    if (this.payload.value) {
      properties.set("value", this.payload.value.value);
    }
    if (this.payload.description) {
      properties.set("description", this.payload.description.value);
    }
    const node = {
      role: this.#role,
      elementHandle: async () => {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
          if (!this.payload.backendDOMNodeId) {
            return null;
          }
          const handle = __addDisposableResource11(env_2, await this.#realm.adoptBackendNode(this.payload.backendDOMNodeId), false);
          return await handle.evaluateHandle((node2) => {
            return node2.nodeType === Node.TEXT_NODE ? node2.parentElement : node2;
          });
        } catch (e_2) {
          env_2.error = e_2;
          env_2.hasError = true;
        } finally {
          __disposeResources11(env_2);
        }
      }
    };
    const userStringProperties = [
      "name",
      "value",
      "description",
      "keyshortcuts",
      "roledescription",
      "valuetext",
      "url"
    ];
    const getUserStringPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const userStringProperty of userStringProperties) {
      if (!properties.has(userStringProperty)) {
        continue;
      }
      node[userStringProperty] = getUserStringPropertyValue(userStringProperty);
    }
    const booleanProperties = [
      "disabled",
      "expanded",
      "focused",
      "modal",
      "multiline",
      "multiselectable",
      "readonly",
      "required",
      "selected"
    ];
    const getBooleanPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const booleanProperty of booleanProperties) {
      if (booleanProperty === "focused" && this.#role === "RootWebArea") {
        continue;
      }
      const value = getBooleanPropertyValue(booleanProperty);
      if (!value) {
        continue;
      }
      node[booleanProperty] = getBooleanPropertyValue(booleanProperty);
    }
    const tristateProperties = ["checked", "pressed"];
    for (const tristateProperty of tristateProperties) {
      if (!properties.has(tristateProperty)) {
        continue;
      }
      const value = properties.get(tristateProperty);
      node[tristateProperty] = value === "mixed" ? "mixed" : value === "true" ? true : false;
    }
    const numericalProperties = [
      "level",
      "valuemax",
      "valuemin"
    ];
    const getNumericalPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const numericalProperty of numericalProperties) {
      if (!properties.has(numericalProperty)) {
        continue;
      }
      node[numericalProperty] = getNumericalPropertyValue(numericalProperty);
    }
    const tokenProperties = [
      "autocomplete",
      "haspopup",
      "invalid",
      "orientation"
    ];
    const getTokenPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const tokenProperty of tokenProperties) {
      const value = getTokenPropertyValue(tokenProperty);
      if (!value || value === "false") {
        continue;
      }
      node[tokenProperty] = getTokenPropertyValue(tokenProperty);
    }
    return node;
  }
  static createTree(realm, payloads) {
    const nodeById = /* @__PURE__ */ new Map();
    for (const payload of payloads) {
      nodeById.set(payload.nodeId, new _AXNode(realm, payload));
    }
    for (const node of nodeById.values()) {
      for (const childId of node.payload.childIds || []) {
        const child = nodeById.get(childId);
        if (child) {
          node.children.push(child);
        }
      }
    }
    return nodeById.values().next().value ?? null;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/FrameManagerEvents.js
var FrameManagerEvent;
(function(FrameManagerEvent2) {
  FrameManagerEvent2.FrameAttached = Symbol("FrameManager.FrameAttached");
  FrameManagerEvent2.FrameNavigated = Symbol("FrameManager.FrameNavigated");
  FrameManagerEvent2.FrameDetached = Symbol("FrameManager.FrameDetached");
  FrameManagerEvent2.FrameSwapped = Symbol("FrameManager.FrameSwapped");
  FrameManagerEvent2.LifecycleEvent = Symbol("FrameManager.LifecycleEvent");
  FrameManagerEvent2.FrameNavigatedWithinDocument = Symbol("FrameManager.FrameNavigatedWithinDocument");
  FrameManagerEvent2.ConsoleApiCalled = Symbol("FrameManager.ConsoleApiCalled");
  FrameManagerEvent2.BindingCalled = Symbol("FrameManager.BindingCalled");
})(FrameManagerEvent || (FrameManagerEvent = {}));

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/WaitTask.js
var WaitTask = class {
  #world;
  #polling;
  #root;
  #fn;
  #args;
  #timeout;
  #genericError = new Error("Waiting failed");
  #timeoutError;
  #result = Deferred.create();
  #poller;
  #signal;
  #reruns = [];
  constructor(world, options, fn, ...args) {
    this.#world = world;
    this.#polling = options.polling;
    this.#root = options.root;
    this.#signal = options.signal;
    this.#signal?.addEventListener("abort", this.#onAbortSignal, {
      once: true
    });
    switch (typeof fn) {
      case "string":
        this.#fn = `() => {return (${fn});}`;
        break;
      default:
        this.#fn = stringifyFunction(fn);
        break;
    }
    this.#args = args;
    this.#world.taskManager.add(this);
    if (options.timeout) {
      this.#timeoutError = new TimeoutError(`Waiting failed: ${options.timeout}ms exceeded`);
      this.#timeout = setTimeout(() => {
        void this.terminate(this.#timeoutError);
      }, options.timeout);
    }
    void this.rerun();
  }
  get result() {
    return this.#result.valueOrThrow();
  }
  async rerun() {
    for (const prev of this.#reruns) {
      prev.abort();
    }
    this.#reruns.length = 0;
    const controller = new AbortController();
    this.#reruns.push(controller);
    try {
      switch (this.#polling) {
        case "raf":
          this.#poller = await this.#world.evaluateHandle(({ RAFPoller, createFunction: createFunction2 }, fn, ...args) => {
            const fun = createFunction2(fn);
            return new RAFPoller(() => {
              return fun(...args);
            });
          }, LazyArg.create((context2) => {
            return context2.puppeteerUtil;
          }), this.#fn, ...this.#args);
          break;
        case "mutation":
          this.#poller = await this.#world.evaluateHandle(({ MutationPoller, createFunction: createFunction2 }, root, fn, ...args) => {
            const fun = createFunction2(fn);
            return new MutationPoller(() => {
              return fun(...args);
            }, root || document);
          }, LazyArg.create((context2) => {
            return context2.puppeteerUtil;
          }), this.#root, this.#fn, ...this.#args);
          break;
        default:
          this.#poller = await this.#world.evaluateHandle(({ IntervalPoller, createFunction: createFunction2 }, ms, fn, ...args) => {
            const fun = createFunction2(fn);
            return new IntervalPoller(() => {
              return fun(...args);
            }, ms);
          }, LazyArg.create((context2) => {
            return context2.puppeteerUtil;
          }), this.#polling, this.#fn, ...this.#args);
          break;
      }
      await this.#poller.evaluate((poller) => {
        void poller.start();
      });
      const result = await this.#poller.evaluateHandle((poller) => {
        return poller.result();
      });
      this.#result.resolve(result);
      await this.terminate();
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      const badError = this.getBadError(error);
      if (badError) {
        this.#genericError.cause = badError;
        await this.terminate(this.#genericError);
      }
    }
  }
  async terminate(error) {
    this.#world.taskManager.delete(this);
    this.#signal?.removeEventListener("abort", this.#onAbortSignal);
    clearTimeout(this.#timeout);
    if (error && !this.#result.finished()) {
      this.#result.reject(error);
    }
    if (this.#poller) {
      try {
        await this.#poller.evaluate(async (poller) => {
          await poller.stop();
        });
        if (this.#poller) {
          await this.#poller.dispose();
          this.#poller = void 0;
        }
      } catch {
      }
    }
  }
  /**
   * Not all errors lead to termination. They usually imply we need to rerun the task.
   */
  getBadError(error) {
    if (isErrorLike(error)) {
      if (error.message.includes("Execution context is not available in detached frame")) {
        return new Error("Waiting failed: Frame detached");
      }
      if (error.message.includes("Execution context was destroyed")) {
        return;
      }
      if (error.message.includes("Cannot find context with specified id")) {
        return;
      }
      if (error.message.includes("DiscardedBrowsingContextError")) {
        return;
      }
      return error;
    }
    return new Error("WaitTask failed with an error", {
      cause: error
    });
  }
  #onAbortSignal = () => {
    void this.terminate(this.#signal?.reason);
  };
};
var TaskManager = class {
  #tasks = /* @__PURE__ */ new Set();
  add(task) {
    this.#tasks.add(task);
  }
  delete(task) {
    this.#tasks.delete(task);
  }
  terminateAll(error) {
    for (const task of this.#tasks) {
      void task.terminate(error);
    }
    this.#tasks.clear();
  }
  async rerunAll() {
    await Promise.all([...this.#tasks].map((task) => {
      return task.rerun();
    }));
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Realm.js
var Realm = class {
  timeoutSettings;
  taskManager = new TaskManager();
  constructor(timeoutSettings) {
    this.timeoutSettings = timeoutSettings;
  }
  async waitForFunction(pageFunction, options = {}, ...args) {
    const { polling = "raf", timeout: timeout2 = this.timeoutSettings.timeout(), root, signal } = options;
    if (typeof polling === "number" && polling < 0) {
      throw new Error("Cannot poll with non-positive interval");
    }
    const waitTask = new WaitTask(this, {
      polling,
      root,
      timeout: timeout2,
      signal
    }, pageFunction, ...args);
    return await waitTask.result;
  }
  get disposed() {
    return this.#disposed;
  }
  #disposed = false;
  /** @internal */
  dispose() {
    this.#disposed = true;
    this.taskManager.terminateAll(new Error("waitForFunction failed: frame got detached."));
  }
  /** @internal */
  [disposeSymbol]() {
    this.dispose();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/IsolatedWorld.js
var IsolatedWorld = class extends Realm {
  #context;
  #emitter = new EventEmitter();
  #frameOrWorker;
  constructor(frameOrWorker, timeoutSettings) {
    super(timeoutSettings);
    this.#frameOrWorker = frameOrWorker;
  }
  get environment() {
    return this.#frameOrWorker;
  }
  get client() {
    return this.#frameOrWorker.client;
  }
  get emitter() {
    return this.#emitter;
  }
  setContext(context2) {
    this.#context?.[disposeSymbol]();
    context2.once("disposed", this.#onContextDisposed.bind(this));
    context2.on("consoleapicalled", this.#onContextConsoleApiCalled.bind(this));
    context2.on("bindingcalled", this.#onContextBindingCalled.bind(this));
    this.#context = context2;
    this.#emitter.emit("context", context2);
    void this.taskManager.rerunAll();
  }
  #onContextDisposed() {
    this.#context = void 0;
    if ("clearDocumentHandle" in this.#frameOrWorker) {
      this.#frameOrWorker.clearDocumentHandle();
    }
  }
  #onContextConsoleApiCalled(event) {
    this.#emitter.emit("consoleapicalled", event);
  }
  #onContextBindingCalled(event) {
    this.#emitter.emit("bindingcalled", event);
  }
  hasContext() {
    return !!this.#context;
  }
  get context() {
    return this.#context;
  }
  #executionContext() {
    if (this.disposed) {
      throw new Error(`Execution context is not available in detached frame or worker "${this.environment.url()}" (are you trying to evaluate?)`);
    }
    return this.#context;
  }
  /**
   * Waits for the next context to be set on the isolated world.
   */
  async #waitForExecutionContext() {
    const error = new Error("Execution context was destroyed");
    const result = await firstValueFrom(fromEmitterEvent(this.#emitter, "context").pipe(raceWith(fromEmitterEvent(this.#emitter, "disposed").pipe(map(() => {
      throw error;
    })), timeout(this.timeoutSettings.timeout()))));
    return result;
  }
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    let context2 = this.#executionContext();
    if (!context2) {
      context2 = await this.#waitForExecutionContext();
    }
    return await context2.evaluateHandle(pageFunction, ...args);
  }
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    let context2 = this.#executionContext();
    if (!context2) {
      context2 = await this.#waitForExecutionContext();
    }
    return await context2.evaluate(pageFunction, ...args);
  }
  async adoptBackendNode(backendNodeId) {
    let context2 = this.#executionContext();
    if (!context2) {
      context2 = await this.#waitForExecutionContext();
    }
    const { object } = await this.client.send("DOM.resolveNode", {
      backendNodeId,
      executionContextId: context2.id
    });
    return this.createCdpHandle(object);
  }
  async adoptHandle(handle) {
    if (handle.realm === this) {
      return await handle.evaluateHandle((value) => {
        return value;
      });
    }
    const nodeInfo = await this.client.send("DOM.describeNode", {
      objectId: handle.id
    });
    return await this.adoptBackendNode(nodeInfo.node.backendNodeId);
  }
  async transferHandle(handle) {
    if (handle.realm === this) {
      return handle;
    }
    if (handle.remoteObject().objectId === void 0) {
      return handle;
    }
    const info = await this.client.send("DOM.describeNode", {
      objectId: handle.remoteObject().objectId
    });
    const newHandle = await this.adoptBackendNode(info.node.backendNodeId);
    await handle.dispose();
    return newHandle;
  }
  /**
   * @internal
   */
  createCdpHandle(remoteObject) {
    if (remoteObject.subtype === "node") {
      return new CdpElementHandle(this, remoteObject);
    }
    return new CdpJSHandle(this, remoteObject);
  }
  [disposeSymbol]() {
    this.#context?.[disposeSymbol]();
    this.#emitter.emit("disposed", void 0);
    super[disposeSymbol]();
    this.#emitter.removeAllListeners();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/IsolatedWorlds.js
var MAIN_WORLD = Symbol("mainWorld");
var PUPPETEER_WORLD = Symbol("puppeteerWorld");

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/LifecycleWatcher.js
var puppeteerToProtocolLifecycle = /* @__PURE__ */ new Map([
  ["load", "load"],
  ["domcontentloaded", "DOMContentLoaded"],
  ["networkidle0", "networkIdle"],
  ["networkidle2", "networkAlmostIdle"]
]);
var LifecycleWatcher = class {
  #expectedLifecycle;
  #frame;
  #timeout;
  #navigationRequest = null;
  #subscriptions = new DisposableStack();
  #initialLoaderId;
  #terminationDeferred;
  #sameDocumentNavigationDeferred = Deferred.create();
  #lifecycleDeferred = Deferred.create();
  #newDocumentNavigationDeferred = Deferred.create();
  #error = new Error("LifecycleWatcher terminated");
  #hasSameDocumentNavigation;
  #swapped;
  #navigationResponseReceived;
  constructor(networkManager, frame, waitUntil, timeout2, signal) {
    if (Array.isArray(waitUntil)) {
      waitUntil = waitUntil.slice();
    } else if (typeof waitUntil === "string") {
      waitUntil = [waitUntil];
    }
    this.#initialLoaderId = frame._loaderId;
    this.#expectedLifecycle = waitUntil.map((value) => {
      const protocolEvent = puppeteerToProtocolLifecycle.get(value);
      assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
      return protocolEvent;
    });
    signal?.addEventListener("abort", () => {
      if (signal.reason instanceof Error) {
        signal.reason.cause = this.#error;
      }
      this.#terminationDeferred.reject(signal.reason);
    });
    this.#frame = frame;
    this.#timeout = timeout2;
    const frameManagerEmitter = this.#subscriptions.use(new EventEmitter(frame._frameManager));
    frameManagerEmitter.on(FrameManagerEvent.LifecycleEvent, this.#checkLifecycleComplete.bind(this));
    const frameEmitter = this.#subscriptions.use(new EventEmitter(frame));
    frameEmitter.on(FrameEvent.FrameNavigatedWithinDocument, this.#navigatedWithinDocument.bind(this));
    frameEmitter.on(FrameEvent.FrameNavigated, this.#navigated.bind(this));
    frameEmitter.on(FrameEvent.FrameSwapped, this.#frameSwapped.bind(this));
    frameEmitter.on(FrameEvent.FrameSwappedByActivation, this.#frameSwapped.bind(this));
    frameEmitter.on(FrameEvent.FrameDetached, this.#onFrameDetached.bind(this));
    const networkManagerEmitter = this.#subscriptions.use(new EventEmitter(networkManager));
    networkManagerEmitter.on(NetworkManagerEvent.Request, this.#onRequest.bind(this));
    networkManagerEmitter.on(NetworkManagerEvent.Response, this.#onResponse.bind(this));
    networkManagerEmitter.on(NetworkManagerEvent.RequestFailed, this.#onRequestFailed.bind(this));
    this.#terminationDeferred = Deferred.create({
      timeout: this.#timeout,
      message: `Navigation timeout of ${this.#timeout} ms exceeded`
    });
    this.#checkLifecycleComplete();
  }
  #onRequest(request) {
    if (request.frame() !== this.#frame || !request.isNavigationRequest()) {
      return;
    }
    this.#navigationRequest = request;
    this.#navigationResponseReceived?.resolve();
    this.#navigationResponseReceived = Deferred.create();
    if (request.response() !== null) {
      this.#navigationResponseReceived?.resolve();
    }
  }
  #onRequestFailed(request) {
    if (this.#navigationRequest?.id !== request.id) {
      return;
    }
    this.#navigationResponseReceived?.resolve();
  }
  #onResponse(response) {
    if (this.#navigationRequest?.id !== response.request().id) {
      return;
    }
    this.#navigationResponseReceived?.resolve();
  }
  #onFrameDetached(frame) {
    if (this.#frame === frame) {
      this.#error.message = "Navigating frame was detached";
      this.#terminationDeferred.resolve(this.#error);
      return;
    }
    this.#checkLifecycleComplete();
  }
  async navigationResponse() {
    await this.#navigationResponseReceived?.valueOrThrow();
    return this.#navigationRequest ? this.#navigationRequest.response() : null;
  }
  sameDocumentNavigationPromise() {
    return this.#sameDocumentNavigationDeferred.valueOrThrow();
  }
  newDocumentNavigationPromise() {
    return this.#newDocumentNavigationDeferred.valueOrThrow();
  }
  lifecyclePromise() {
    return this.#lifecycleDeferred.valueOrThrow();
  }
  terminationPromise() {
    return this.#terminationDeferred.valueOrThrow();
  }
  #navigatedWithinDocument() {
    this.#hasSameDocumentNavigation = true;
    this.#checkLifecycleComplete();
  }
  #navigated(navigationType) {
    if (navigationType === "BackForwardCacheRestore") {
      return this.#frameSwapped();
    }
    this.#checkLifecycleComplete();
  }
  #frameSwapped() {
    this.#swapped = true;
    this.#checkLifecycleComplete();
  }
  #checkLifecycleComplete() {
    if (!checkLifecycle(this.#frame, this.#expectedLifecycle)) {
      return;
    }
    this.#lifecycleDeferred.resolve();
    if (this.#hasSameDocumentNavigation) {
      this.#sameDocumentNavigationDeferred.resolve(void 0);
    }
    if (this.#swapped || this.#frame._loaderId !== this.#initialLoaderId) {
      this.#newDocumentNavigationDeferred.resolve(void 0);
    }
    function checkLifecycle(frame, expectedLifecycle) {
      for (const event of expectedLifecycle) {
        if (!frame._lifecycleEvents.has(event)) {
          return false;
        }
      }
      for (const child of frame.childFrames()) {
        if (child._hasStartedLoading && !checkLifecycle(child, expectedLifecycle)) {
          return false;
        }
      }
      return true;
    }
  }
  dispose() {
    this.#subscriptions.dispose();
    this.#error.cause = new Error("LifecycleWatcher disposed");
    this.#terminationDeferred.resolve(this.#error);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Frame.js
var __runInitializers7 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate7 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context2 = {};
    for (var p in contextIn) context2[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context2.access[p] = contextIn.access[p];
    context2.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context2);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var CdpFrame = (() => {
  let _classSuper = Frame;
  let _instanceExtraInitializers = [];
  let _goto_decorators;
  let _waitForNavigation_decorators;
  let _setContent_decorators;
  let _addPreloadScript_decorators;
  let _addExposedFunctionBinding_decorators;
  let _removeExposedFunctionBinding_decorators;
  let _waitForDevicePrompt_decorators;
  return class CdpFrame extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      __esDecorate7(this, null, _goto_decorators, { kind: "method", name: "goto", static: false, private: false, access: { has: (obj) => "goto" in obj, get: (obj) => obj.goto }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate7(this, null, _waitForNavigation_decorators, { kind: "method", name: "waitForNavigation", static: false, private: false, access: { has: (obj) => "waitForNavigation" in obj, get: (obj) => obj.waitForNavigation }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate7(this, null, _setContent_decorators, { kind: "method", name: "setContent", static: false, private: false, access: { has: (obj) => "setContent" in obj, get: (obj) => obj.setContent }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate7(this, null, _addPreloadScript_decorators, { kind: "method", name: "addPreloadScript", static: false, private: false, access: { has: (obj) => "addPreloadScript" in obj, get: (obj) => obj.addPreloadScript }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate7(this, null, _addExposedFunctionBinding_decorators, { kind: "method", name: "addExposedFunctionBinding", static: false, private: false, access: { has: (obj) => "addExposedFunctionBinding" in obj, get: (obj) => obj.addExposedFunctionBinding }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate7(this, null, _removeExposedFunctionBinding_decorators, { kind: "method", name: "removeExposedFunctionBinding", static: false, private: false, access: { has: (obj) => "removeExposedFunctionBinding" in obj, get: (obj) => obj.removeExposedFunctionBinding }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate7(this, null, _waitForDevicePrompt_decorators, { kind: "method", name: "waitForDevicePrompt", static: false, private: false, access: { has: (obj) => "waitForDevicePrompt" in obj, get: (obj) => obj.waitForDevicePrompt }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    #url = (__runInitializers7(this, _instanceExtraInitializers), "");
    #detached = false;
    #client;
    _frameManager;
    _loaderId = "";
    _lifecycleEvents = /* @__PURE__ */ new Set();
    _id;
    _parentId;
    accessibility;
    worlds;
    constructor(frameManager, frameId, parentFrameId, client) {
      super();
      this._frameManager = frameManager;
      this.#url = "";
      this._id = frameId;
      this._parentId = parentFrameId;
      this.#detached = false;
      this.#client = client;
      this._loaderId = "";
      this.worlds = {
        [MAIN_WORLD]: new IsolatedWorld(this, this._frameManager.timeoutSettings),
        [PUPPETEER_WORLD]: new IsolatedWorld(this, this._frameManager.timeoutSettings)
      };
      this.accessibility = new Accessibility(this.worlds[MAIN_WORLD], frameId);
      this.on(FrameEvent.FrameSwappedByActivation, () => {
        this._onLoadingStarted();
        this._onLoadingStopped();
      });
      this.worlds[MAIN_WORLD].emitter.on("consoleapicalled", this.#onMainWorldConsoleApiCalled.bind(this));
      this.worlds[MAIN_WORLD].emitter.on("bindingcalled", this.#onMainWorldBindingCalled.bind(this));
    }
    #onMainWorldConsoleApiCalled(event) {
      this._frameManager.emit(FrameManagerEvent.ConsoleApiCalled, [
        this.worlds[MAIN_WORLD],
        event
      ]);
    }
    #onMainWorldBindingCalled(event) {
      this._frameManager.emit(FrameManagerEvent.BindingCalled, [
        this.worlds[MAIN_WORLD],
        event
      ]);
    }
    /**
     * This is used internally in DevTools.
     *
     * @internal
     */
    _client() {
      return this.#client;
    }
    /**
     * Updates the frame ID with the new ID. This happens when the main frame is
     * replaced by a different frame.
     */
    updateId(id) {
      this._id = id;
    }
    updateClient(client) {
      this.#client = client;
    }
    page() {
      return this._frameManager.page();
    }
    async goto(url, options = {}) {
      const { referer = this._frameManager.networkManager.extraHTTPHeaders()["referer"], referrerPolicy = this._frameManager.networkManager.extraHTTPHeaders()["referer-policy"], waitUntil = ["load"], timeout: timeout2 = this._frameManager.timeoutSettings.navigationTimeout() } = options;
      let ensureNewDocumentNavigation = false;
      const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout2);
      let error = await Deferred.race([
        navigate(this.#client, url, referer, referrerPolicy ? referrerPolicyToProtocol(referrerPolicy) : void 0, this._id),
        watcher.terminationPromise()
      ]);
      if (!error) {
        error = await Deferred.race([
          watcher.terminationPromise(),
          ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise()
        ]);
      }
      try {
        if (error) {
          throw error;
        }
        return await watcher.navigationResponse();
      } finally {
        watcher.dispose();
      }
      async function navigate(client, url2, referrer, referrerPolicy2, frameId) {
        try {
          const response = await client.send("Page.navigate", {
            url: url2,
            referrer,
            frameId,
            referrerPolicy: referrerPolicy2
          });
          ensureNewDocumentNavigation = !!response.loaderId;
          if (response.errorText === "net::ERR_HTTP_RESPONSE_CODE_FAILURE") {
            return null;
          }
          return response.errorText ? new Error(`${response.errorText} at ${url2}`) : null;
        } catch (error2) {
          if (isErrorLike(error2)) {
            return error2;
          }
          throw error2;
        }
      }
    }
    async waitForNavigation(options = {}) {
      const { waitUntil = ["load"], timeout: timeout2 = this._frameManager.timeoutSettings.navigationTimeout(), signal } = options;
      const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout2, signal);
      const error = await Deferred.race([
        watcher.terminationPromise(),
        ...options.ignoreSameDocumentNavigation ? [] : [watcher.sameDocumentNavigationPromise()],
        watcher.newDocumentNavigationPromise()
      ]);
      try {
        if (error) {
          throw error;
        }
        const result = await Deferred.race([watcher.terminationPromise(), watcher.navigationResponse()]);
        if (result instanceof Error) {
          throw error;
        }
        return result || null;
      } finally {
        watcher.dispose();
      }
    }
    get client() {
      return this.#client;
    }
    mainRealm() {
      return this.worlds[MAIN_WORLD];
    }
    isolatedRealm() {
      return this.worlds[PUPPETEER_WORLD];
    }
    async setContent(html, options = {}) {
      const { waitUntil = ["load"], timeout: timeout2 = this._frameManager.timeoutSettings.navigationTimeout() } = options;
      await this.setFrameContent(html);
      const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout2);
      const error = await Deferred.race([
        watcher.terminationPromise(),
        watcher.lifecyclePromise()
      ]);
      watcher.dispose();
      if (error) {
        throw error;
      }
    }
    url() {
      return this.#url;
    }
    parentFrame() {
      return this._frameManager._frameTree.parentFrame(this._id) || null;
    }
    childFrames() {
      return this._frameManager._frameTree.childFrames(this._id);
    }
    #deviceRequestPromptManager() {
      return this._frameManager._deviceRequestPromptManager(this.#client);
    }
    async addPreloadScript(preloadScript) {
      const parentFrame = this.parentFrame();
      if (parentFrame && this.#client === parentFrame.client) {
        return;
      }
      if (preloadScript.getIdForFrame(this)) {
        return;
      }
      const { identifier } = await this.#client.send("Page.addScriptToEvaluateOnNewDocument", {
        source: preloadScript.source
      });
      preloadScript.setIdForFrame(this, identifier);
    }
    async addExposedFunctionBinding(binding) {
      if (this !== this._frameManager.mainFrame() && !this._hasStartedLoading) {
        return;
      }
      await Promise.all([
        this.#client.send("Runtime.addBinding", {
          name: CDP_BINDING_PREFIX + binding.name
        }),
        this.evaluate(binding.initSource).catch(debugError)
      ]);
    }
    async removeExposedFunctionBinding(binding) {
      if (this !== this._frameManager.mainFrame() && !this._hasStartedLoading) {
        return;
      }
      await Promise.all([
        this.#client.send("Runtime.removeBinding", {
          name: CDP_BINDING_PREFIX + binding.name
        }),
        this.evaluate((name) => {
          globalThis[name] = void 0;
        }, binding.name).catch(debugError)
      ]);
    }
    async waitForDevicePrompt(options = {}) {
      return await this.#deviceRequestPromptManager().waitForDevicePrompt(options);
    }
    _navigated(framePayload) {
      this._name = framePayload.name;
      this.#url = `${framePayload.url}${framePayload.urlFragment || ""}`;
    }
    _navigatedWithinDocument(url) {
      this.#url = url;
    }
    _onLifecycleEvent(loaderId, name) {
      if (name === "init") {
        this._loaderId = loaderId;
        this._lifecycleEvents.clear();
      }
      this._lifecycleEvents.add(name);
    }
    _onLoadingStopped() {
      this._lifecycleEvents.add("DOMContentLoaded");
      this._lifecycleEvents.add("load");
    }
    _onLoadingStarted() {
      this._hasStartedLoading = true;
    }
    get detached() {
      return this.#detached;
    }
    [(_goto_decorators = [throwIfDetached], _waitForNavigation_decorators = [throwIfDetached], _setContent_decorators = [throwIfDetached], _addPreloadScript_decorators = [throwIfDetached], _addExposedFunctionBinding_decorators = [throwIfDetached], _removeExposedFunctionBinding_decorators = [throwIfDetached], _waitForDevicePrompt_decorators = [throwIfDetached], disposeSymbol)]() {
      if (this.#detached) {
        return;
      }
      this.#detached = true;
      this.worlds[MAIN_WORLD][disposeSymbol]();
      this.worlds[PUPPETEER_WORLD][disposeSymbol]();
    }
    exposeFunction() {
      throw new UnsupportedOperation();
    }
    async frameElement() {
      const parent = this.parentFrame();
      if (!parent) {
        return null;
      }
      const { backendNodeId } = await parent.client.send("DOM.getFrameOwner", {
        frameId: this._id
      });
      return await parent.mainRealm().adoptBackendNode(backendNodeId);
    }
  };
})();
function referrerPolicyToProtocol(referrerPolicy) {
  return referrerPolicy.replaceAll(/-./g, (match) => {
    return match[1].toUpperCase();
  });
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/FrameTree.js
var FrameTree = class {
  #frames = /* @__PURE__ */ new Map();
  // frameID -> parentFrameID
  #parentIds = /* @__PURE__ */ new Map();
  // frameID -> childFrameIDs
  #childIds = /* @__PURE__ */ new Map();
  #mainFrame;
  #isMainFrameStale = false;
  #waitRequests = /* @__PURE__ */ new Map();
  getMainFrame() {
    return this.#mainFrame;
  }
  getById(frameId) {
    return this.#frames.get(frameId);
  }
  /**
   * Returns a promise that is resolved once the frame with
   * the given ID is added to the tree.
   */
  waitForFrame(frameId) {
    const frame = this.getById(frameId);
    if (frame) {
      return Promise.resolve(frame);
    }
    const deferred = Deferred.create();
    const callbacks = this.#waitRequests.get(frameId) || /* @__PURE__ */ new Set();
    callbacks.add(deferred);
    return deferred.valueOrThrow();
  }
  frames() {
    return Array.from(this.#frames.values());
  }
  addFrame(frame) {
    this.#frames.set(frame._id, frame);
    if (frame._parentId) {
      this.#parentIds.set(frame._id, frame._parentId);
      if (!this.#childIds.has(frame._parentId)) {
        this.#childIds.set(frame._parentId, /* @__PURE__ */ new Set());
      }
      this.#childIds.get(frame._parentId).add(frame._id);
    } else if (!this.#mainFrame || this.#isMainFrameStale) {
      this.#mainFrame = frame;
      this.#isMainFrameStale = false;
    }
    this.#waitRequests.get(frame._id)?.forEach((request) => {
      return request.resolve(frame);
    });
  }
  removeFrame(frame) {
    this.#frames.delete(frame._id);
    this.#parentIds.delete(frame._id);
    if (frame._parentId) {
      this.#childIds.get(frame._parentId)?.delete(frame._id);
    } else {
      this.#isMainFrameStale = true;
    }
  }
  childFrames(frameId) {
    const childIds = this.#childIds.get(frameId);
    if (!childIds) {
      return [];
    }
    return Array.from(childIds).map((id) => {
      return this.getById(id);
    }).filter((frame) => {
      return frame !== void 0;
    });
  }
  parentFrame(frameId) {
    const parentId = this.#parentIds.get(frameId);
    return parentId ? this.getById(parentId) : void 0;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/HTTPRequest.js
var HTTPRequest = class {
  /**
   * @internal
   */
  _interceptionId;
  /**
   * @internal
   */
  _failureText = null;
  /**
   * @internal
   */
  _response = null;
  /**
   * @internal
   */
  _fromMemoryCache = false;
  /**
   * @internal
   */
  _redirectChain = [];
  /**
   * @internal
   */
  interception = {
    enabled: false,
    handled: false,
    handlers: [],
    resolutionState: {
      action: InterceptResolutionAction.None
    },
    requestOverrides: {},
    response: null,
    abortReason: null
  };
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * The `ContinueRequestOverrides` that will be used
   * if the interception is allowed to continue (ie, `abort()` and
   * `respond()` aren't called).
   */
  continueRequestOverrides() {
    return this.interception.requestOverrides;
  }
  /**
   * The `ResponseForRequest` that gets used if the
   * interception is allowed to respond (ie, `abort()` is not called).
   */
  responseForRequest() {
    return this.interception.response;
  }
  /**
   * The most recent reason for aborting the request
   */
  abortErrorReason() {
    return this.interception.abortReason;
  }
  /**
   * An InterceptResolutionState object describing the current resolution
   * action and priority.
   *
   * InterceptResolutionState contains:
   * action: InterceptResolutionAction
   * priority?: number
   *
   * InterceptResolutionAction is one of: `abort`, `respond`, `continue`,
   * `disabled`, `none`, or `already-handled`.
   */
  interceptResolutionState() {
    if (!this.interception.enabled) {
      return { action: InterceptResolutionAction.Disabled };
    }
    if (this.interception.handled) {
      return { action: InterceptResolutionAction.AlreadyHandled };
    }
    return { ...this.interception.resolutionState };
  }
  /**
   * Is `true` if the intercept resolution has already been handled,
   * `false` otherwise.
   */
  isInterceptResolutionHandled() {
    return this.interception.handled;
  }
  /**
   * Adds an async request handler to the processing queue.
   * Deferred handlers are not guaranteed to execute in any particular order,
   * but they are guaranteed to resolve before the request interception
   * is finalized.
   */
  enqueueInterceptAction(pendingHandler) {
    this.interception.handlers.push(pendingHandler);
  }
  /**
   * Awaits pending interception handlers and then decides how to fulfill
   * the request interception.
   */
  async finalizeInterceptions() {
    await this.interception.handlers.reduce((promiseChain, interceptAction) => {
      return promiseChain.then(interceptAction);
    }, Promise.resolve());
    this.interception.handlers = [];
    const { action } = this.interceptResolutionState();
    switch (action) {
      case "abort":
        return await this._abort(this.interception.abortReason);
      case "respond":
        if (this.interception.response === null) {
          throw new Error("Response is missing for the interception");
        }
        return await this._respond(this.interception.response);
      case "continue":
        return await this._continue(this.interception.requestOverrides);
    }
  }
  /**
   * @internal
   */
  verifyInterception() {
    assert(this.interception.enabled, "Request Interception is not enabled!");
    assert(!this.interception.handled, "Request is already handled!");
  }
  /**
   * Continues request with optional request overrides.
   *
   * @example
   *
   * ```ts
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   // Override headers
   *   const headers = Object.assign({}, request.headers(), {
   *     foo: 'bar', // set "foo" header
   *     origin: undefined, // remove "origin" header
   *   });
   *   request.continue({headers});
   * });
   * ```
   *
   * @param overrides - optional overrides to apply to the request.
   * @param priority - If provided, intercept is resolved using cooperative
   * handling rules. Otherwise, intercept is resolved immediately.
   *
   * @remarks
   *
   * To use this, request interception should be enabled with
   * {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   */
  async continue(overrides = {}, priority) {
    this.verifyInterception();
    if (!this.canBeIntercepted()) {
      return;
    }
    if (priority === void 0) {
      return await this._continue(overrides);
    }
    this.interception.requestOverrides = overrides;
    if (this.interception.resolutionState.priority === void 0 || priority > this.interception.resolutionState.priority) {
      this.interception.resolutionState = {
        action: InterceptResolutionAction.Continue,
        priority
      };
      return;
    }
    if (priority === this.interception.resolutionState.priority) {
      if (this.interception.resolutionState.action === "abort" || this.interception.resolutionState.action === "respond") {
        return;
      }
      this.interception.resolutionState.action = InterceptResolutionAction.Continue;
    }
    return;
  }
  /**
   * Fulfills a request with the given response.
   *
   * @example
   * An example of fulfilling all requests with 404 responses:
   *
   * ```ts
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   request.respond({
   *     status: 404,
   *     contentType: 'text/plain',
   *     body: 'Not Found!',
   *   });
   * });
   * ```
   *
   * NOTE: Mocking responses for dataURL requests is not supported.
   * Calling `request.respond` for a dataURL request is a noop.
   *
   * @param response - the response to fulfill the request with.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   */
  async respond(response, priority) {
    this.verifyInterception();
    if (!this.canBeIntercepted()) {
      return;
    }
    if (priority === void 0) {
      return await this._respond(response);
    }
    this.interception.response = response;
    if (this.interception.resolutionState.priority === void 0 || priority > this.interception.resolutionState.priority) {
      this.interception.resolutionState = {
        action: InterceptResolutionAction.Respond,
        priority
      };
      return;
    }
    if (priority === this.interception.resolutionState.priority) {
      if (this.interception.resolutionState.action === "abort") {
        return;
      }
      this.interception.resolutionState.action = InterceptResolutionAction.Respond;
    }
  }
  /**
   * Aborts a request.
   *
   * @param errorCode - optional error code to provide.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   *
   * @remarks
   *
   * To use this, request interception should be enabled with
   * {@link Page.setRequestInterception}. If it is not enabled, this method will
   * throw an exception immediately.
   */
  async abort(errorCode = "failed", priority) {
    this.verifyInterception();
    if (!this.canBeIntercepted()) {
      return;
    }
    const errorReason = errorReasons[errorCode];
    assert(errorReason, "Unknown error code: " + errorCode);
    if (priority === void 0) {
      return await this._abort(errorReason);
    }
    this.interception.abortReason = errorReason;
    if (this.interception.resolutionState.priority === void 0 || priority >= this.interception.resolutionState.priority) {
      this.interception.resolutionState = {
        action: InterceptResolutionAction.Abort,
        priority
      };
      return;
    }
  }
  /**
   * @internal
   */
  static getResponse(body) {
    const byteBody = isString(body) ? new TextEncoder().encode(body) : body;
    return {
      contentLength: byteBody.byteLength,
      base64: typedArrayToBase64(byteBody)
    };
  }
};
var InterceptResolutionAction;
(function(InterceptResolutionAction2) {
  InterceptResolutionAction2["Abort"] = "abort";
  InterceptResolutionAction2["Respond"] = "respond";
  InterceptResolutionAction2["Continue"] = "continue";
  InterceptResolutionAction2["Disabled"] = "disabled";
  InterceptResolutionAction2["None"] = "none";
  InterceptResolutionAction2["AlreadyHandled"] = "already-handled";
})(InterceptResolutionAction || (InterceptResolutionAction = {}));
function headersArray(headers) {
  const result = [];
  for (const name in headers) {
    const value = headers[name];
    if (!Object.is(value, void 0)) {
      const values = Array.isArray(value) ? value : [value];
      result.push(...values.map((value2) => {
        return { name, value: value2 + "" };
      }));
    }
  }
  return result;
}
var STATUS_TEXTS = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "Switch Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};
var errorReasons = {
  aborted: "Aborted",
  accessdenied: "AccessDenied",
  addressunreachable: "AddressUnreachable",
  blockedbyclient: "BlockedByClient",
  blockedbyresponse: "BlockedByResponse",
  connectionaborted: "ConnectionAborted",
  connectionclosed: "ConnectionClosed",
  connectionfailed: "ConnectionFailed",
  connectionrefused: "ConnectionRefused",
  connectionreset: "ConnectionReset",
  internetdisconnected: "InternetDisconnected",
  namenotresolved: "NameNotResolved",
  timedout: "TimedOut",
  failed: "Failed"
};
function handleError(error) {
  if (error.originalMessage.includes("Invalid header") || error.originalMessage.includes("Unsafe header") || error.originalMessage.includes('Expected "header"') || // WebDriver BiDi error for invalid values, for example, headers.
  error.originalMessage.includes("invalid argument")) {
    throw error;
  }
  debugError(error);
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/HTTPRequest.js
var CdpHTTPRequest = class extends HTTPRequest {
  id;
  #client;
  #isNavigationRequest;
  #url;
  #resourceType;
  #method;
  #hasPostData = false;
  #postData;
  #headers = {};
  #frame;
  #initiator;
  get client() {
    return this.#client;
  }
  set client(newClient) {
    this.#client = newClient;
  }
  constructor(client, frame, interceptionId, allowInterception, data, redirectChain) {
    super();
    this.#client = client;
    this.id = data.requestId;
    this.#isNavigationRequest = data.requestId === data.loaderId && data.type === "Document";
    this._interceptionId = interceptionId;
    this.#url = data.request.url + (data.request.urlFragment ?? "");
    this.#resourceType = (data.type || "other").toLowerCase();
    this.#method = data.request.method;
    this.#postData = data.request.postData;
    this.#hasPostData = data.request.hasPostData ?? false;
    this.#frame = frame;
    this._redirectChain = redirectChain;
    this.#initiator = data.initiator;
    this.interception.enabled = allowInterception;
    for (const [key, value] of Object.entries(data.request.headers)) {
      this.#headers[key.toLowerCase()] = value;
    }
  }
  url() {
    return this.#url;
  }
  resourceType() {
    return this.#resourceType;
  }
  method() {
    return this.#method;
  }
  postData() {
    return this.#postData;
  }
  hasPostData() {
    return this.#hasPostData;
  }
  async fetchPostData() {
    try {
      const result = await this.#client.send("Network.getRequestPostData", {
        requestId: this.id
      });
      return result.postData;
    } catch (err) {
      debugError(err);
      return;
    }
  }
  headers() {
    return structuredClone(this.#headers);
  }
  response() {
    return this._response;
  }
  frame() {
    return this.#frame;
  }
  isNavigationRequest() {
    return this.#isNavigationRequest;
  }
  initiator() {
    return this.#initiator;
  }
  redirectChain() {
    return this._redirectChain.slice();
  }
  failure() {
    if (!this._failureText) {
      return null;
    }
    return {
      errorText: this._failureText
    };
  }
  canBeIntercepted() {
    return !this.url().startsWith("data:") && !this._fromMemoryCache;
  }
  /**
   * @internal
   */
  async _continue(overrides = {}) {
    const { url, method, postData, headers } = overrides;
    this.interception.handled = true;
    const postDataBinaryBase64 = postData ? stringToBase64(postData) : void 0;
    if (this._interceptionId === void 0) {
      throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.continueRequest");
    }
    await this.#client.send("Fetch.continueRequest", {
      requestId: this._interceptionId,
      url,
      method,
      postData: postDataBinaryBase64,
      headers: headers ? headersArray(headers) : void 0
    }).catch((error) => {
      this.interception.handled = false;
      return handleError(error);
    });
  }
  async _respond(response) {
    this.interception.handled = true;
    let parsedBody;
    if (response.body) {
      parsedBody = HTTPRequest.getResponse(response.body);
    }
    const responseHeaders = {};
    if (response.headers) {
      for (const header of Object.keys(response.headers)) {
        const value = response.headers[header];
        responseHeaders[header.toLowerCase()] = Array.isArray(value) ? value.map((item) => {
          return String(item);
        }) : String(value);
      }
    }
    if (response.contentType) {
      responseHeaders["content-type"] = response.contentType;
    }
    if (parsedBody?.contentLength && !("content-length" in responseHeaders)) {
      responseHeaders["content-length"] = String(parsedBody.contentLength);
    }
    const status = response.status || 200;
    if (this._interceptionId === void 0) {
      throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.fulfillRequest");
    }
    await this.#client.send("Fetch.fulfillRequest", {
      requestId: this._interceptionId,
      responseCode: status,
      responsePhrase: STATUS_TEXTS[status],
      responseHeaders: headersArray(responseHeaders),
      body: parsedBody?.base64
    }).catch((error) => {
      this.interception.handled = false;
      return handleError(error);
    });
  }
  async _abort(errorReason) {
    this.interception.handled = true;
    if (this._interceptionId === void 0) {
      throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.failRequest");
    }
    await this.#client.send("Fetch.failRequest", {
      requestId: this._interceptionId,
      errorReason: errorReason || "Failed"
    }).catch(handleError);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/HTTPResponse.js
var HTTPResponse = class {
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * True if the response was successful (status in the range 200-299).
   */
  ok() {
    const status = this.status();
    return status === 0 || status >= 200 && status <= 299;
  }
  /**
   * {@inheritDoc HTTPResponse.content}
   */
  async buffer() {
    const content = await this.content();
    return Buffer.from(content);
  }
  /**
   * Promise which resolves to a text (utf8) representation of response body.
   */
  async text() {
    const content = await this.content();
    return new TextDecoder().decode(content);
  }
  /**
   * Promise which resolves to a JSON representation of response body.
   *
   * @remarks
   *
   * This method will throw if the response body is not parsable via
   * `JSON.parse`.
   */
  async json() {
    const content = await this.text();
    return JSON.parse(content);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/SecurityDetails.js
var SecurityDetails = class {
  #subjectName;
  #issuer;
  #validFrom;
  #validTo;
  #protocol;
  #sanList;
  /**
   * @internal
   */
  constructor(securityPayload) {
    this.#subjectName = securityPayload.subjectName;
    this.#issuer = securityPayload.issuer;
    this.#validFrom = securityPayload.validFrom;
    this.#validTo = securityPayload.validTo;
    this.#protocol = securityPayload.protocol;
    this.#sanList = securityPayload.sanList;
  }
  /**
   * The name of the issuer of the certificate.
   */
  issuer() {
    return this.#issuer;
  }
  /**
   * {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the start of the certificate's validity.
   */
  validFrom() {
    return this.#validFrom;
  }
  /**
   * {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the end of the certificate's validity.
   */
  validTo() {
    return this.#validTo;
  }
  /**
   * The security protocol being used, e.g. "TLS 1.2".
   */
  protocol() {
    return this.#protocol;
  }
  /**
   * The name of the subject to which the certificate was issued.
   */
  subjectName() {
    return this.#subjectName;
  }
  /**
   * The list of {@link https://en.wikipedia.org/wiki/Subject_Alternative_Name | subject alternative names (SANs)} of the certificate.
   */
  subjectAlternativeNames() {
    return this.#sanList;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/HTTPResponse.js
var CdpHTTPResponse = class extends HTTPResponse {
  #request;
  #contentPromise = null;
  #bodyLoadedDeferred = Deferred.create();
  #remoteAddress;
  #status;
  #statusText;
  #fromDiskCache;
  #fromServiceWorker;
  #headers = {};
  #securityDetails;
  #timing;
  constructor(request, responsePayload, extraInfo) {
    super();
    this.#request = request;
    this.#remoteAddress = {
      ip: responsePayload.remoteIPAddress,
      port: responsePayload.remotePort
    };
    this.#statusText = this.#parseStatusTextFromExtraInfo(extraInfo) || responsePayload.statusText;
    this.#fromDiskCache = !!responsePayload.fromDiskCache;
    this.#fromServiceWorker = !!responsePayload.fromServiceWorker;
    this.#status = extraInfo ? extraInfo.statusCode : responsePayload.status;
    const headers = extraInfo ? extraInfo.headers : responsePayload.headers;
    for (const [key, value] of Object.entries(headers)) {
      this.#headers[key.toLowerCase()] = value;
    }
    this.#securityDetails = responsePayload.securityDetails ? new SecurityDetails(responsePayload.securityDetails) : null;
    this.#timing = responsePayload.timing || null;
  }
  #parseStatusTextFromExtraInfo(extraInfo) {
    if (!extraInfo || !extraInfo.headersText) {
      return;
    }
    const firstLine = extraInfo.headersText.split("\r", 1)[0];
    if (!firstLine || firstLine.length > 1e3) {
      return;
    }
    const match = firstLine.match(/[^ ]* [^ ]* (.*)/);
    if (!match) {
      return;
    }
    const statusText = match[1];
    if (!statusText) {
      return;
    }
    return statusText;
  }
  _resolveBody(err) {
    if (err) {
      return this.#bodyLoadedDeferred.reject(err);
    }
    return this.#bodyLoadedDeferred.resolve();
  }
  remoteAddress() {
    return this.#remoteAddress;
  }
  url() {
    return this.#request.url();
  }
  status() {
    return this.#status;
  }
  statusText() {
    return this.#statusText;
  }
  headers() {
    return this.#headers;
  }
  securityDetails() {
    return this.#securityDetails;
  }
  timing() {
    return this.#timing;
  }
  content() {
    if (!this.#contentPromise) {
      this.#contentPromise = this.#bodyLoadedDeferred.valueOrThrow().then(async () => {
        try {
          const response = await this.#request.client.send("Network.getResponseBody", {
            requestId: this.#request.id
          });
          return stringToTypedArray(response.body, response.base64Encoded);
        } catch (error) {
          if (error instanceof ProtocolError && error.originalMessage === "No resource with given identifier found") {
            throw new ProtocolError("Could not load response body for this request. This might happen if the request is a preflight request.");
          }
          throw error;
        }
      });
    }
    return this.#contentPromise;
  }
  request() {
    return this.#request;
  }
  fromCache() {
    return this.#fromDiskCache || this.#request._fromMemoryCache;
  }
  fromServiceWorker() {
    return this.#fromServiceWorker;
  }
  frame() {
    return this.#request.frame();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/NetworkEventManager.js
var NetworkEventManager = class {
  /**
   * There are four possible orders of events:
   * A. `_onRequestWillBeSent`
   * B. `_onRequestWillBeSent`, `_onRequestPaused`
   * C. `_onRequestPaused`, `_onRequestWillBeSent`
   * D. `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`
   * (see crbug.com/1196004)
   *
   * For `_onRequest` we need the event from `_onRequestWillBeSent` and
   * optionally the `interceptionId` from `_onRequestPaused`.
   *
   * If request interception is disabled, call `_onRequest` once per call to
   * `_onRequestWillBeSent`.
   * If request interception is enabled, call `_onRequest` once per call to
   * `_onRequestPaused` (once per `interceptionId`).
   *
   * Events are stored to allow for subsequent events to call `_onRequest`.
   *
   * Note that (chains of) redirect requests have the same `requestId` (!) as
   * the original request. We have to anticipate series of events like these:
   * A. `_onRequestWillBeSent`,
   * `_onRequestWillBeSent`, ...
   * B. `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestWillBeSent`, `_onRequestPaused`, ...
   * C. `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestPaused`, `_onRequestWillBeSent`, ...
   * D. `_onRequestPaused`, `_onRequestWillBeSent`,
   * `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`, ...
   * (see crbug.com/1196004)
   */
  #requestWillBeSentMap = /* @__PURE__ */ new Map();
  #requestPausedMap = /* @__PURE__ */ new Map();
  #httpRequestsMap = /* @__PURE__ */ new Map();
  /*
   * The below maps are used to reconcile Network.responseReceivedExtraInfo
   * events with their corresponding request. Each response and redirect
   * response gets an ExtraInfo event, and we don't know which will come first.
   * This means that we have to store a Response or an ExtraInfo for each
   * response, and emit the event when we get both of them. In addition, to
   * handle redirects, we have to make them Arrays to represent the chain of
   * events.
   */
  #responseReceivedExtraInfoMap = /* @__PURE__ */ new Map();
  #queuedRedirectInfoMap = /* @__PURE__ */ new Map();
  #queuedEventGroupMap = /* @__PURE__ */ new Map();
  forget(networkRequestId) {
    this.#requestWillBeSentMap.delete(networkRequestId);
    this.#requestPausedMap.delete(networkRequestId);
    this.#queuedEventGroupMap.delete(networkRequestId);
    this.#queuedRedirectInfoMap.delete(networkRequestId);
    this.#responseReceivedExtraInfoMap.delete(networkRequestId);
  }
  responseExtraInfo(networkRequestId) {
    if (!this.#responseReceivedExtraInfoMap.has(networkRequestId)) {
      this.#responseReceivedExtraInfoMap.set(networkRequestId, []);
    }
    return this.#responseReceivedExtraInfoMap.get(networkRequestId);
  }
  queuedRedirectInfo(fetchRequestId) {
    if (!this.#queuedRedirectInfoMap.has(fetchRequestId)) {
      this.#queuedRedirectInfoMap.set(fetchRequestId, []);
    }
    return this.#queuedRedirectInfoMap.get(fetchRequestId);
  }
  queueRedirectInfo(fetchRequestId, redirectInfo) {
    this.queuedRedirectInfo(fetchRequestId).push(redirectInfo);
  }
  takeQueuedRedirectInfo(fetchRequestId) {
    return this.queuedRedirectInfo(fetchRequestId).shift();
  }
  inFlightRequestsCount() {
    let inFlightRequestCounter = 0;
    for (const request of this.#httpRequestsMap.values()) {
      if (!request.response()) {
        inFlightRequestCounter++;
      }
    }
    return inFlightRequestCounter;
  }
  storeRequestWillBeSent(networkRequestId, event) {
    this.#requestWillBeSentMap.set(networkRequestId, event);
  }
  getRequestWillBeSent(networkRequestId) {
    return this.#requestWillBeSentMap.get(networkRequestId);
  }
  forgetRequestWillBeSent(networkRequestId) {
    this.#requestWillBeSentMap.delete(networkRequestId);
  }
  getRequestPaused(networkRequestId) {
    return this.#requestPausedMap.get(networkRequestId);
  }
  forgetRequestPaused(networkRequestId) {
    this.#requestPausedMap.delete(networkRequestId);
  }
  storeRequestPaused(networkRequestId, event) {
    this.#requestPausedMap.set(networkRequestId, event);
  }
  getRequest(networkRequestId) {
    return this.#httpRequestsMap.get(networkRequestId);
  }
  storeRequest(networkRequestId, request) {
    this.#httpRequestsMap.set(networkRequestId, request);
  }
  forgetRequest(networkRequestId) {
    this.#httpRequestsMap.delete(networkRequestId);
  }
  getQueuedEventGroup(networkRequestId) {
    return this.#queuedEventGroupMap.get(networkRequestId);
  }
  queueEventGroup(networkRequestId, event) {
    this.#queuedEventGroupMap.set(networkRequestId, event);
  }
  forgetQueuedEventGroup(networkRequestId) {
    this.#queuedEventGroupMap.delete(networkRequestId);
  }
  printState() {
    function replacer(_key, value) {
      if (value instanceof Map) {
        return {
          dataType: "Map",
          value: Array.from(value.entries())
          // or with spread: value: [...value]
        };
      } else if (value instanceof CdpHTTPRequest) {
        return {
          dataType: "CdpHTTPRequest",
          value: `${value.id}: ${value.url()}`
        };
      }
      {
        return value;
      }
    }
    console.log("httpRequestsMap", JSON.stringify(this.#httpRequestsMap, replacer, 2));
    console.log("requestWillBeSentMap", JSON.stringify(this.#requestWillBeSentMap, replacer, 2));
    console.log("requestWillBeSentMap", JSON.stringify(this.#responseReceivedExtraInfoMap, replacer, 2));
    console.log("requestWillBeSentMap", JSON.stringify(this.#requestPausedMap, replacer, 2));
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/NetworkManager.js
var NetworkManager = class extends EventEmitter {
  #frameManager;
  #networkEventManager = new NetworkEventManager();
  #extraHTTPHeaders;
  #credentials = null;
  #attemptedAuthentications = /* @__PURE__ */ new Set();
  #userRequestInterceptionEnabled = false;
  #protocolRequestInterceptionEnabled;
  #userCacheDisabled;
  #emulatedNetworkConditions;
  #userAgent;
  #userAgentMetadata;
  #platform;
  #handlers = [
    ["Fetch.requestPaused", this.#onRequestPaused],
    ["Fetch.authRequired", this.#onAuthRequired],
    ["Network.requestWillBeSent", this.#onRequestWillBeSent],
    ["Network.requestServedFromCache", this.#onRequestServedFromCache],
    ["Network.responseReceived", this.#onResponseReceived],
    ["Network.loadingFinished", this.#onLoadingFinished],
    ["Network.loadingFailed", this.#onLoadingFailed],
    ["Network.responseReceivedExtraInfo", this.#onResponseReceivedExtraInfo],
    [CDPSessionEvent.Disconnected, this.#removeClient]
  ];
  #clients = /* @__PURE__ */ new Map();
  #networkEnabled = true;
  constructor(frameManager, networkEnabled) {
    super();
    this.#frameManager = frameManager;
    this.#networkEnabled = networkEnabled ?? true;
  }
  #canIgnoreError(error) {
    return isErrorLike(error) && (isTargetClosedError(error) || error.message.includes("Not supported"));
  }
  async addClient(client) {
    if (!this.#networkEnabled || this.#clients.has(client)) {
      return;
    }
    const subscriptions = new DisposableStack();
    this.#clients.set(client, subscriptions);
    const clientEmitter = subscriptions.use(new EventEmitter(client));
    for (const [event, handler] of this.#handlers) {
      clientEmitter.on(event, (arg) => {
        return handler.bind(this)(client, arg);
      });
    }
    try {
      await Promise.all([
        client.send("Network.enable"),
        this.#applyExtraHTTPHeaders(client),
        this.#applyNetworkConditions(client),
        this.#applyProtocolCacheDisabled(client),
        this.#applyProtocolRequestInterception(client),
        this.#applyUserAgent(client)
      ]);
    } catch (error) {
      if (this.#canIgnoreError(error)) {
        return;
      }
      throw error;
    }
  }
  async #removeClient(client) {
    this.#clients.get(client)?.dispose();
    this.#clients.delete(client);
  }
  async authenticate(credentials) {
    this.#credentials = credentials;
    const enabled = this.#userRequestInterceptionEnabled || !!this.#credentials;
    if (enabled === this.#protocolRequestInterceptionEnabled) {
      return;
    }
    this.#protocolRequestInterceptionEnabled = enabled;
    await this.#applyToAllClients(this.#applyProtocolRequestInterception.bind(this));
  }
  async setExtraHTTPHeaders(headers) {
    const extraHTTPHeaders = {};
    for (const [key, value] of Object.entries(headers)) {
      assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
      extraHTTPHeaders[key.toLowerCase()] = value;
    }
    this.#extraHTTPHeaders = extraHTTPHeaders;
    await this.#applyToAllClients(this.#applyExtraHTTPHeaders.bind(this));
  }
  async #applyExtraHTTPHeaders(client) {
    if (this.#extraHTTPHeaders === void 0) {
      return;
    }
    try {
      await client.send("Network.setExtraHTTPHeaders", {
        headers: this.#extraHTTPHeaders
      });
    } catch (error) {
      if (this.#canIgnoreError(error)) {
        return;
      }
      throw error;
    }
  }
  extraHTTPHeaders() {
    return Object.assign({}, this.#extraHTTPHeaders);
  }
  inFlightRequestsCount() {
    return this.#networkEventManager.inFlightRequestsCount();
  }
  async setOfflineMode(value) {
    if (!this.#emulatedNetworkConditions) {
      this.#emulatedNetworkConditions = {
        offline: false,
        upload: -1,
        download: -1,
        latency: 0
      };
    }
    this.#emulatedNetworkConditions.offline = value;
    await this.#applyToAllClients(this.#applyNetworkConditions.bind(this));
  }
  async emulateNetworkConditions(networkConditions) {
    if (!this.#emulatedNetworkConditions) {
      this.#emulatedNetworkConditions = {
        offline: networkConditions?.offline ?? false,
        upload: -1,
        download: -1,
        latency: 0
      };
    }
    this.#emulatedNetworkConditions.upload = networkConditions ? networkConditions.upload : -1;
    this.#emulatedNetworkConditions.download = networkConditions ? networkConditions.download : -1;
    this.#emulatedNetworkConditions.latency = networkConditions ? networkConditions.latency : 0;
    this.#emulatedNetworkConditions.offline = networkConditions?.offline ?? false;
    await this.#applyToAllClients(this.#applyNetworkConditions.bind(this));
  }
  async #applyToAllClients(fn) {
    await Promise.all(Array.from(this.#clients.keys()).map((client) => {
      return fn(client);
    }));
  }
  async #applyNetworkConditions(client) {
    if (this.#emulatedNetworkConditions === void 0) {
      return;
    }
    try {
      await client.send("Network.emulateNetworkConditions", {
        offline: this.#emulatedNetworkConditions.offline,
        latency: this.#emulatedNetworkConditions.latency,
        uploadThroughput: this.#emulatedNetworkConditions.upload,
        downloadThroughput: this.#emulatedNetworkConditions.download
      });
    } catch (error) {
      if (this.#canIgnoreError(error)) {
        return;
      }
      throw error;
    }
  }
  async setUserAgent(userAgent, userAgentMetadata, platform) {
    this.#userAgent = userAgent;
    this.#userAgentMetadata = userAgentMetadata;
    this.#platform = platform;
    await this.#applyToAllClients(this.#applyUserAgent.bind(this));
  }
  async #applyUserAgent(client) {
    if (this.#userAgent === void 0) {
      return;
    }
    try {
      await client.send("Network.setUserAgentOverride", {
        userAgent: this.#userAgent,
        userAgentMetadata: this.#userAgentMetadata,
        platform: this.#platform
      });
    } catch (error) {
      if (this.#canIgnoreError(error)) {
        return;
      }
      throw error;
    }
  }
  async setCacheEnabled(enabled) {
    this.#userCacheDisabled = !enabled;
    await this.#applyToAllClients(this.#applyProtocolCacheDisabled.bind(this));
  }
  async setRequestInterception(value) {
    this.#userRequestInterceptionEnabled = value;
    const enabled = this.#userRequestInterceptionEnabled || !!this.#credentials;
    if (enabled === this.#protocolRequestInterceptionEnabled) {
      return;
    }
    this.#protocolRequestInterceptionEnabled = enabled;
    await this.#applyToAllClients(this.#applyProtocolRequestInterception.bind(this));
  }
  async #applyProtocolRequestInterception(client) {
    if (this.#protocolRequestInterceptionEnabled === void 0) {
      return;
    }
    if (this.#userCacheDisabled === void 0) {
      this.#userCacheDisabled = false;
    }
    try {
      if (this.#protocolRequestInterceptionEnabled) {
        await Promise.all([
          this.#applyProtocolCacheDisabled(client),
          client.send("Fetch.enable", {
            handleAuthRequests: true,
            patterns: [{ urlPattern: "*" }]
          })
        ]);
      } else {
        await Promise.all([
          this.#applyProtocolCacheDisabled(client),
          client.send("Fetch.disable")
        ]);
      }
    } catch (error) {
      if (this.#canIgnoreError(error)) {
        return;
      }
      throw error;
    }
  }
  async #applyProtocolCacheDisabled(client) {
    if (this.#userCacheDisabled === void 0) {
      return;
    }
    try {
      await client.send("Network.setCacheDisabled", {
        cacheDisabled: this.#userCacheDisabled
      });
    } catch (error) {
      if (this.#canIgnoreError(error)) {
        return;
      }
      throw error;
    }
  }
  #onRequestWillBeSent(client, event) {
    if (this.#userRequestInterceptionEnabled && !event.request.url.startsWith("data:")) {
      const { requestId: networkRequestId } = event;
      this.#networkEventManager.storeRequestWillBeSent(networkRequestId, event);
      const requestPausedEvent = this.#networkEventManager.getRequestPaused(networkRequestId);
      if (requestPausedEvent) {
        const { requestId: fetchRequestId } = requestPausedEvent;
        this.#patchRequestEventHeaders(event, requestPausedEvent);
        this.#onRequest(client, event, fetchRequestId);
        this.#networkEventManager.forgetRequestPaused(networkRequestId);
      }
      return;
    }
    this.#onRequest(client, event, void 0);
  }
  #onAuthRequired(client, event) {
    let response = "Default";
    if (this.#attemptedAuthentications.has(event.requestId)) {
      response = "CancelAuth";
    } else if (this.#credentials) {
      response = "ProvideCredentials";
      this.#attemptedAuthentications.add(event.requestId);
    }
    const { username, password } = this.#credentials || {
      username: void 0,
      password: void 0
    };
    client.send("Fetch.continueWithAuth", {
      requestId: event.requestId,
      authChallengeResponse: { response, username, password }
    }).catch(debugError);
  }
  /**
   * CDP may send a Fetch.requestPaused without or before a
   * Network.requestWillBeSent
   *
   * CDP may send multiple Fetch.requestPaused
   * for the same Network.requestWillBeSent.
   */
  #onRequestPaused(client, event) {
    if (!this.#userRequestInterceptionEnabled && this.#protocolRequestInterceptionEnabled) {
      client.send("Fetch.continueRequest", {
        requestId: event.requestId
      }).catch(debugError);
    }
    const { networkId: networkRequestId, requestId: fetchRequestId } = event;
    if (!networkRequestId) {
      this.#onRequestWithoutNetworkInstrumentation(client, event);
      return;
    }
    const requestWillBeSentEvent = (() => {
      const requestWillBeSentEvent2 = this.#networkEventManager.getRequestWillBeSent(networkRequestId);
      if (requestWillBeSentEvent2 && (requestWillBeSentEvent2.request.url !== event.request.url || requestWillBeSentEvent2.request.method !== event.request.method)) {
        this.#networkEventManager.forgetRequestWillBeSent(networkRequestId);
        return;
      }
      return requestWillBeSentEvent2;
    })();
    if (requestWillBeSentEvent) {
      this.#patchRequestEventHeaders(requestWillBeSentEvent, event);
      this.#onRequest(client, requestWillBeSentEvent, fetchRequestId);
    } else {
      this.#networkEventManager.storeRequestPaused(networkRequestId, event);
    }
  }
  #patchRequestEventHeaders(requestWillBeSentEvent, requestPausedEvent) {
    requestWillBeSentEvent.request.headers = {
      ...requestWillBeSentEvent.request.headers,
      // includes extra headers, like: Accept, Origin
      ...requestPausedEvent.request.headers
    };
  }
  #onRequestWithoutNetworkInstrumentation(client, event) {
    const frame = event.frameId ? this.#frameManager.frame(event.frameId) : null;
    const request = new CdpHTTPRequest(client, frame, event.requestId, this.#userRequestInterceptionEnabled, event, []);
    this.emit(NetworkManagerEvent.Request, request);
    void request.finalizeInterceptions();
  }
  #onRequest(client, event, fetchRequestId, fromMemoryCache = false) {
    let redirectChain = [];
    if (event.redirectResponse) {
      let redirectResponseExtraInfo = null;
      if (event.redirectHasExtraInfo) {
        redirectResponseExtraInfo = this.#networkEventManager.responseExtraInfo(event.requestId).shift();
        if (!redirectResponseExtraInfo) {
          this.#networkEventManager.queueRedirectInfo(event.requestId, {
            event,
            fetchRequestId
          });
          return;
        }
      }
      const request2 = this.#networkEventManager.getRequest(event.requestId);
      if (request2) {
        this.#handleRequestRedirect(client, request2, event.redirectResponse, redirectResponseExtraInfo);
        redirectChain = request2._redirectChain;
      }
    }
    const frame = event.frameId ? this.#frameManager.frame(event.frameId) : null;
    const request = new CdpHTTPRequest(client, frame, fetchRequestId, this.#userRequestInterceptionEnabled, event, redirectChain);
    request._fromMemoryCache = fromMemoryCache;
    this.#networkEventManager.storeRequest(event.requestId, request);
    this.emit(NetworkManagerEvent.Request, request);
    void request.finalizeInterceptions();
  }
  #onRequestServedFromCache(client, event) {
    const requestWillBeSentEvent = this.#networkEventManager.getRequestWillBeSent(event.requestId);
    let request = this.#networkEventManager.getRequest(event.requestId);
    if (request) {
      request._fromMemoryCache = true;
    }
    if (!request && requestWillBeSentEvent) {
      this.#onRequest(client, requestWillBeSentEvent, void 0, true);
      request = this.#networkEventManager.getRequest(event.requestId);
    }
    if (!request) {
      debugError(new Error(`Request ${event.requestId} was served from cache but we could not find the corresponding request object`));
      return;
    }
    this.emit(NetworkManagerEvent.RequestServedFromCache, request);
  }
  #handleRequestRedirect(_client, request, responsePayload, extraInfo) {
    const response = new CdpHTTPResponse(request, responsePayload, extraInfo);
    request._response = response;
    request._redirectChain.push(request);
    response._resolveBody(new Error("Response body is unavailable for redirect responses"));
    this.#forgetRequest(request, false);
    this.emit(NetworkManagerEvent.Response, response);
    this.emit(NetworkManagerEvent.RequestFinished, request);
  }
  #emitResponseEvent(_client, responseReceived, extraInfo) {
    const request = this.#networkEventManager.getRequest(responseReceived.requestId);
    if (!request) {
      return;
    }
    const extraInfos = this.#networkEventManager.responseExtraInfo(responseReceived.requestId);
    if (extraInfos.length) {
      debugError(new Error("Unexpected extraInfo events for request " + responseReceived.requestId));
    }
    if (responseReceived.response.fromDiskCache) {
      extraInfo = null;
    }
    const response = new CdpHTTPResponse(request, responseReceived.response, extraInfo);
    request._response = response;
    this.emit(NetworkManagerEvent.Response, response);
  }
  #onResponseReceived(client, event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    let extraInfo = null;
    if (request && !request._fromMemoryCache && event.hasExtraInfo) {
      extraInfo = this.#networkEventManager.responseExtraInfo(event.requestId).shift();
      if (!extraInfo) {
        this.#networkEventManager.queueEventGroup(event.requestId, {
          responseReceivedEvent: event
        });
        return;
      }
    }
    this.#emitResponseEvent(client, event, extraInfo);
  }
  #onResponseReceivedExtraInfo(client, event) {
    const redirectInfo = this.#networkEventManager.takeQueuedRedirectInfo(event.requestId);
    if (redirectInfo) {
      this.#networkEventManager.responseExtraInfo(event.requestId).push(event);
      this.#onRequest(client, redirectInfo.event, redirectInfo.fetchRequestId);
      return;
    }
    const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
      this.#networkEventManager.forgetQueuedEventGroup(event.requestId);
      this.#emitResponseEvent(client, queuedEvents.responseReceivedEvent, event);
      if (queuedEvents.loadingFinishedEvent) {
        this.#emitLoadingFinished(client, queuedEvents.loadingFinishedEvent);
      }
      if (queuedEvents.loadingFailedEvent) {
        this.#emitLoadingFailed(client, queuedEvents.loadingFailedEvent);
      }
      return;
    }
    this.#networkEventManager.responseExtraInfo(event.requestId).push(event);
  }
  #forgetRequest(request, events) {
    const requestId = request.id;
    const interceptionId = request._interceptionId;
    this.#networkEventManager.forgetRequest(requestId);
    if (interceptionId !== void 0) {
      this.#attemptedAuthentications.delete(interceptionId);
    }
    if (events) {
      this.#networkEventManager.forget(requestId);
    }
  }
  #onLoadingFinished(client, event) {
    const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
      queuedEvents.loadingFinishedEvent = event;
    } else {
      this.#emitLoadingFinished(client, event);
    }
  }
  #emitLoadingFinished(client, event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    if (!request) {
      return;
    }
    this.#adoptCdpSessionIfNeeded(client, request);
    if (request.response()) {
      request.response()?._resolveBody();
    }
    this.#forgetRequest(request, true);
    this.emit(NetworkManagerEvent.RequestFinished, request);
  }
  #onLoadingFailed(client, event) {
    const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
      queuedEvents.loadingFailedEvent = event;
    } else {
      this.#emitLoadingFailed(client, event);
    }
  }
  #emitLoadingFailed(client, event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    if (!request) {
      return;
    }
    this.#adoptCdpSessionIfNeeded(client, request);
    request._failureText = event.errorText;
    const response = request.response();
    if (response) {
      response._resolveBody();
    }
    this.#forgetRequest(request, true);
    this.emit(NetworkManagerEvent.RequestFailed, request);
  }
  #adoptCdpSessionIfNeeded(client, request) {
    if (client !== request.client) {
      request.client = client;
    }
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/FrameManager.js
var TIME_FOR_WAITING_FOR_SWAP = 100;
var FrameManager = class extends EventEmitter {
  #page;
  #networkManager;
  #timeoutSettings;
  #isolatedWorlds = /* @__PURE__ */ new Set();
  #client;
  #scriptsToEvaluateOnNewDocument = /* @__PURE__ */ new Map();
  #bindings = /* @__PURE__ */ new Set();
  _frameTree = new FrameTree();
  /**
   * Set of frame IDs stored to indicate if a frame has received a
   * frameNavigated event so that frame tree responses could be ignored as the
   * frameNavigated event usually contains the latest information.
   */
  #frameNavigatedReceived = /* @__PURE__ */ new Set();
  #deviceRequestPromptManagerMap = /* @__PURE__ */ new WeakMap();
  #frameTreeHandled;
  get timeoutSettings() {
    return this.#timeoutSettings;
  }
  get networkManager() {
    return this.#networkManager;
  }
  get client() {
    return this.#client;
  }
  constructor(client, page, timeoutSettings) {
    super();
    this.#client = client;
    this.#page = page;
    this.#networkManager = new NetworkManager(this, page.browser().isNetworkEnabled());
    this.#timeoutSettings = timeoutSettings;
    this.setupEventListeners(this.#client);
    client.once(CDPSessionEvent.Disconnected, () => {
      this.#onClientDisconnect().catch(debugError);
    });
  }
  /**
   * Called when the frame's client is disconnected. We don't know if the
   * disconnect means that the frame is removed or if it will be replaced by a
   * new frame. Therefore, we wait for a swap event.
   */
  async #onClientDisconnect() {
    const mainFrame = this._frameTree.getMainFrame();
    if (!mainFrame) {
      return;
    }
    if (!this.#page.browser().connected) {
      this.#removeFramesRecursively(mainFrame);
      return;
    }
    for (const child of mainFrame.childFrames()) {
      this.#removeFramesRecursively(child);
    }
    const swapped = Deferred.create({
      timeout: TIME_FOR_WAITING_FOR_SWAP,
      message: "Frame was not swapped"
    });
    mainFrame.once(FrameEvent.FrameSwappedByActivation, () => {
      swapped.resolve();
    });
    try {
      await swapped.valueOrThrow();
    } catch {
      this.#removeFramesRecursively(mainFrame);
    }
  }
  /**
   * When the main frame is replaced by another main frame,
   * we maintain the main frame object identity while updating
   * its frame tree and ID.
   */
  async swapFrameTree(client) {
    this.#client = client;
    const frame = this._frameTree.getMainFrame();
    if (frame) {
      this.#frameNavigatedReceived.add(this.#client.target()._targetId);
      this._frameTree.removeFrame(frame);
      frame.updateId(this.#client.target()._targetId);
      this._frameTree.addFrame(frame);
      frame.updateClient(client);
    }
    this.setupEventListeners(client);
    client.once(CDPSessionEvent.Disconnected, () => {
      this.#onClientDisconnect().catch(debugError);
    });
    await this.initialize(client, frame);
    await this.#networkManager.addClient(client);
    if (frame) {
      frame.emit(FrameEvent.FrameSwappedByActivation, void 0);
    }
  }
  async registerSpeculativeSession(client) {
    await this.#networkManager.addClient(client);
  }
  setupEventListeners(session) {
    session.on("Page.frameAttached", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onFrameAttached(session, event.frameId, event.parentFrameId);
    });
    session.on("Page.frameNavigated", async (event) => {
      this.#frameNavigatedReceived.add(event.frame.id);
      await this.#frameTreeHandled?.valueOrThrow();
      void this.#onFrameNavigated(event.frame, event.type);
    });
    session.on("Page.navigatedWithinDocument", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onFrameNavigatedWithinDocument(event.frameId, event.url);
    });
    session.on("Page.frameDetached", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onFrameDetached(event.frameId, event.reason);
    });
    session.on("Page.frameStartedLoading", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onFrameStartedLoading(event.frameId);
    });
    session.on("Page.frameStoppedLoading", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onFrameStoppedLoading(event.frameId);
    });
    session.on("Runtime.executionContextCreated", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onExecutionContextCreated(event.context, session);
    });
    session.on("Page.lifecycleEvent", async (event) => {
      await this.#frameTreeHandled?.valueOrThrow();
      this.#onLifecycleEvent(event);
    });
  }
  async initialize(client, frame) {
    try {
      this.#frameTreeHandled?.resolve();
      this.#frameTreeHandled = Deferred.create();
      await Promise.all([
        this.#networkManager.addClient(client),
        client.send("Page.enable"),
        client.send("Page.getFrameTree").then(({ frameTree }) => {
          this.#handleFrameTree(client, frameTree);
          this.#frameTreeHandled?.resolve();
        }),
        client.send("Page.setLifecycleEventsEnabled", { enabled: true }),
        client.send("Runtime.enable").then(() => {
          return this.#createIsolatedWorld(client, UTILITY_WORLD_NAME);
        }),
        ...(frame ? Array.from(this.#scriptsToEvaluateOnNewDocument.values()) : []).map((script) => {
          return frame?.addPreloadScript(script);
        }),
        ...(frame ? Array.from(this.#bindings.values()) : []).map((binding) => {
          return frame?.addExposedFunctionBinding(binding);
        })
      ]);
    } catch (error) {
      this.#frameTreeHandled?.resolve();
      if (isErrorLike(error) && isTargetClosedError(error)) {
        return;
      }
      throw error;
    }
  }
  page() {
    return this.#page;
  }
  mainFrame() {
    const mainFrame = this._frameTree.getMainFrame();
    assert(mainFrame, "Requesting main frame too early!");
    return mainFrame;
  }
  frames() {
    return Array.from(this._frameTree.frames());
  }
  frame(frameId) {
    return this._frameTree.getById(frameId) || null;
  }
  async addExposedFunctionBinding(binding) {
    this.#bindings.add(binding);
    await Promise.all(this.frames().map(async (frame) => {
      return await frame.addExposedFunctionBinding(binding);
    }));
  }
  async removeExposedFunctionBinding(binding) {
    this.#bindings.delete(binding);
    await Promise.all(this.frames().map(async (frame) => {
      return await frame.removeExposedFunctionBinding(binding);
    }));
  }
  async evaluateOnNewDocument(source2) {
    const { identifier } = await this.mainFrame()._client().send("Page.addScriptToEvaluateOnNewDocument", {
      source: source2
    });
    const preloadScript = new CdpPreloadScript(this.mainFrame(), identifier, source2);
    this.#scriptsToEvaluateOnNewDocument.set(identifier, preloadScript);
    await Promise.all(this.frames().map(async (frame) => {
      return await frame.addPreloadScript(preloadScript);
    }));
    return { identifier };
  }
  async removeScriptToEvaluateOnNewDocument(identifier) {
    const preloadScript = this.#scriptsToEvaluateOnNewDocument.get(identifier);
    if (!preloadScript) {
      throw new Error(`Script to evaluate on new document with id ${identifier} not found`);
    }
    this.#scriptsToEvaluateOnNewDocument.delete(identifier);
    await Promise.all(this.frames().map((frame) => {
      const identifier2 = preloadScript.getIdForFrame(frame);
      if (!identifier2) {
        return;
      }
      return frame._client().send("Page.removeScriptToEvaluateOnNewDocument", {
        identifier: identifier2
      }).catch(debugError);
    }));
  }
  onAttachedToTarget(target) {
    if (target._getTargetInfo().type !== "iframe") {
      return;
    }
    const frame = this.frame(target._getTargetInfo().targetId);
    if (frame) {
      frame.updateClient(target._session());
    }
    this.setupEventListeners(target._session());
    void this.initialize(target._session(), frame);
  }
  _deviceRequestPromptManager(client) {
    let manager = this.#deviceRequestPromptManagerMap.get(client);
    if (manager === void 0) {
      manager = new DeviceRequestPromptManager(client, this.#timeoutSettings);
      this.#deviceRequestPromptManagerMap.set(client, manager);
    }
    return manager;
  }
  #onLifecycleEvent(event) {
    const frame = this.frame(event.frameId);
    if (!frame) {
      return;
    }
    frame._onLifecycleEvent(event.loaderId, event.name);
    this.emit(FrameManagerEvent.LifecycleEvent, frame);
    frame.emit(FrameEvent.LifecycleEvent, void 0);
  }
  #onFrameStartedLoading(frameId) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    frame._onLoadingStarted();
  }
  #onFrameStoppedLoading(frameId) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    frame._onLoadingStopped();
    this.emit(FrameManagerEvent.LifecycleEvent, frame);
    frame.emit(FrameEvent.LifecycleEvent, void 0);
  }
  #handleFrameTree(session, frameTree) {
    if (frameTree.frame.parentId) {
      this.#onFrameAttached(session, frameTree.frame.id, frameTree.frame.parentId);
    }
    if (!this.#frameNavigatedReceived.has(frameTree.frame.id)) {
      void this.#onFrameNavigated(frameTree.frame, "Navigation");
    } else {
      this.#frameNavigatedReceived.delete(frameTree.frame.id);
    }
    if (!frameTree.childFrames) {
      return;
    }
    for (const child of frameTree.childFrames) {
      this.#handleFrameTree(session, child);
    }
  }
  #onFrameAttached(session, frameId, parentFrameId) {
    let frame = this.frame(frameId);
    if (frame) {
      const parentFrame = this.frame(parentFrameId);
      if (session && parentFrame && frame.client !== parentFrame?.client) {
        frame.updateClient(session);
      }
      return;
    }
    frame = new CdpFrame(this, frameId, parentFrameId, session);
    this._frameTree.addFrame(frame);
    this.emit(FrameManagerEvent.FrameAttached, frame);
  }
  async #onFrameNavigated(framePayload, navigationType) {
    const frameId = framePayload.id;
    const isMainFrame = !framePayload.parentId;
    let frame = this._frameTree.getById(frameId);
    if (frame) {
      for (const child of frame.childFrames()) {
        this.#removeFramesRecursively(child);
      }
    }
    if (isMainFrame) {
      if (frame) {
        this._frameTree.removeFrame(frame);
        frame._id = frameId;
      } else {
        frame = new CdpFrame(this, frameId, void 0, this.#client);
      }
      this._frameTree.addFrame(frame);
    }
    frame = await this._frameTree.waitForFrame(frameId);
    frame._navigated(framePayload);
    this.emit(FrameManagerEvent.FrameNavigated, frame);
    frame.emit(FrameEvent.FrameNavigated, navigationType);
  }
  async #createIsolatedWorld(session, name) {
    const key = `${session.id()}:${name}`;
    if (this.#isolatedWorlds.has(key)) {
      return;
    }
    await session.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `//# sourceURL=${PuppeteerURL.INTERNAL_URL}`,
      worldName: name
    });
    await Promise.all(this.frames().filter((frame) => {
      return frame.client === session;
    }).map((frame) => {
      return session.send("Page.createIsolatedWorld", {
        frameId: frame._id,
        worldName: name,
        grantUniveralAccess: true
      }).catch(debugError);
    }));
    this.#isolatedWorlds.add(key);
  }
  #onFrameNavigatedWithinDocument(frameId, url) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    frame._navigatedWithinDocument(url);
    this.emit(FrameManagerEvent.FrameNavigatedWithinDocument, frame);
    frame.emit(FrameEvent.FrameNavigatedWithinDocument, void 0);
    this.emit(FrameManagerEvent.FrameNavigated, frame);
    frame.emit(FrameEvent.FrameNavigated, "Navigation");
  }
  #onFrameDetached(frameId, reason) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    switch (reason) {
      case "remove":
        this.#removeFramesRecursively(frame);
        break;
      case "swap":
        this.emit(FrameManagerEvent.FrameSwapped, frame);
        frame.emit(FrameEvent.FrameSwapped, void 0);
        break;
    }
  }
  #onExecutionContextCreated(contextPayload, session) {
    const auxData = contextPayload.auxData;
    const frameId = auxData && auxData.frameId;
    const frame = typeof frameId === "string" ? this.frame(frameId) : void 0;
    let world;
    if (frame) {
      if (frame.client !== session) {
        return;
      }
      if (contextPayload.auxData && contextPayload.auxData["isDefault"]) {
        world = frame.worlds[MAIN_WORLD];
      } else if (contextPayload.name === UTILITY_WORLD_NAME) {
        world = frame.worlds[PUPPETEER_WORLD];
      }
    }
    if (!world) {
      return;
    }
    const context2 = new ExecutionContext(frame?.client || this.#client, contextPayload, world);
    world.setContext(context2);
  }
  #removeFramesRecursively(frame) {
    for (const child of frame.childFrames()) {
      this.#removeFramesRecursively(child);
    }
    frame[disposeSymbol]();
    this._frameTree.removeFrame(frame);
    this.emit(FrameManagerEvent.FrameDetached, frame);
    frame.emit(FrameEvent.FrameDetached, frame);
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Input.js
var Keyboard = class {
  /**
   * @internal
   */
  constructor() {
  }
};
var MouseButton = Object.freeze({
  Left: "left",
  Right: "right",
  Middle: "middle",
  Back: "back",
  Forward: "forward"
});
var Mouse = class {
  /**
   * @internal
   */
  constructor() {
  }
};
var Touchscreen = class {
  /**
   * @internal
   */
  idGenerator = createIncrementalIdGenerator();
  /**
   * @internal
   */
  touches = [];
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * @internal
   */
  removeHandle(handle) {
    const index = this.touches.indexOf(handle);
    if (index === -1) {
      return;
    }
    this.touches.splice(index, 1);
  }
  /**
   * Dispatches a `touchstart` and `touchend` event.
   * @param x - Horizontal position of the tap.
   * @param y - Vertical position of the tap.
   */
  async tap(x, y) {
    const touch = await this.touchStart(x, y);
    await touch.end();
  }
  /**
   * Dispatches a `touchMove` event on the first touch that is active.
   * @param x - Horizontal position of the move.
   * @param y - Vertical position of the move.
   *
   * @remarks
   *
   * Not every `touchMove` call results in a `touchmove` event being emitted,
   * depending on the browser's optimizations. For example, Chrome
   * {@link https://developer.chrome.com/blog/a-more-compatible-smoother-touch/#chromes-new-model-the-throttled-async-touchmove-model | throttles}
   * touch move events.
   */
  async touchMove(x, y) {
    const touch = this.touches[0];
    if (!touch) {
      throw new TouchError("Must start a new Touch first");
    }
    return await touch.move(x, y);
  }
  /**
   * Dispatches a `touchend` event on the first touch that is active.
   */
  async touchEnd() {
    const touch = this.touches.shift();
    if (!touch) {
      throw new TouchError("Must start a new Touch first");
    }
    await touch.end();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/common/USKeyboardLayout.js
var _keyDefinitions = {
  "0": { keyCode: 48, key: "0", code: "Digit0" },
  "1": { keyCode: 49, key: "1", code: "Digit1" },
  "2": { keyCode: 50, key: "2", code: "Digit2" },
  "3": { keyCode: 51, key: "3", code: "Digit3" },
  "4": { keyCode: 52, key: "4", code: "Digit4" },
  "5": { keyCode: 53, key: "5", code: "Digit5" },
  "6": { keyCode: 54, key: "6", code: "Digit6" },
  "7": { keyCode: 55, key: "7", code: "Digit7" },
  "8": { keyCode: 56, key: "8", code: "Digit8" },
  "9": { keyCode: 57, key: "9", code: "Digit9" },
  Power: { key: "Power", code: "Power" },
  Eject: { key: "Eject", code: "Eject" },
  Abort: { keyCode: 3, code: "Abort", key: "Cancel" },
  Help: { keyCode: 6, code: "Help", key: "Help" },
  Backspace: { keyCode: 8, code: "Backspace", key: "Backspace" },
  Tab: { keyCode: 9, code: "Tab", key: "Tab" },
  Numpad5: {
    keyCode: 12,
    shiftKeyCode: 101,
    key: "Clear",
    code: "Numpad5",
    shiftKey: "5",
    location: 3
  },
  NumpadEnter: {
    keyCode: 13,
    code: "NumpadEnter",
    key: "Enter",
    text: "\r",
    location: 3
  },
  Enter: { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\r": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\n": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  ShiftLeft: { keyCode: 16, code: "ShiftLeft", key: "Shift", location: 1 },
  ShiftRight: { keyCode: 16, code: "ShiftRight", key: "Shift", location: 2 },
  ControlLeft: {
    keyCode: 17,
    code: "ControlLeft",
    key: "Control",
    location: 1
  },
  ControlRight: {
    keyCode: 17,
    code: "ControlRight",
    key: "Control",
    location: 2
  },
  AltLeft: { keyCode: 18, code: "AltLeft", key: "Alt", location: 1 },
  AltRight: { keyCode: 18, code: "AltRight", key: "Alt", location: 2 },
  Pause: { keyCode: 19, code: "Pause", key: "Pause" },
  CapsLock: { keyCode: 20, code: "CapsLock", key: "CapsLock" },
  Escape: { keyCode: 27, code: "Escape", key: "Escape" },
  Convert: { keyCode: 28, code: "Convert", key: "Convert" },
  NonConvert: { keyCode: 29, code: "NonConvert", key: "NonConvert" },
  Space: { keyCode: 32, code: "Space", key: " " },
  Numpad9: {
    keyCode: 33,
    shiftKeyCode: 105,
    key: "PageUp",
    code: "Numpad9",
    shiftKey: "9",
    location: 3
  },
  PageUp: { keyCode: 33, code: "PageUp", key: "PageUp" },
  Numpad3: {
    keyCode: 34,
    shiftKeyCode: 99,
    key: "PageDown",
    code: "Numpad3",
    shiftKey: "3",
    location: 3
  },
  PageDown: { keyCode: 34, code: "PageDown", key: "PageDown" },
  End: { keyCode: 35, code: "End", key: "End" },
  Numpad1: {
    keyCode: 35,
    shiftKeyCode: 97,
    key: "End",
    code: "Numpad1",
    shiftKey: "1",
    location: 3
  },
  Home: { keyCode: 36, code: "Home", key: "Home" },
  Numpad7: {
    keyCode: 36,
    shiftKeyCode: 103,
    key: "Home",
    code: "Numpad7",
    shiftKey: "7",
    location: 3
  },
  ArrowLeft: { keyCode: 37, code: "ArrowLeft", key: "ArrowLeft" },
  Numpad4: {
    keyCode: 37,
    shiftKeyCode: 100,
    key: "ArrowLeft",
    code: "Numpad4",
    shiftKey: "4",
    location: 3
  },
  Numpad8: {
    keyCode: 38,
    shiftKeyCode: 104,
    key: "ArrowUp",
    code: "Numpad8",
    shiftKey: "8",
    location: 3
  },
  ArrowUp: { keyCode: 38, code: "ArrowUp", key: "ArrowUp" },
  ArrowRight: { keyCode: 39, code: "ArrowRight", key: "ArrowRight" },
  Numpad6: {
    keyCode: 39,
    shiftKeyCode: 102,
    key: "ArrowRight",
    code: "Numpad6",
    shiftKey: "6",
    location: 3
  },
  Numpad2: {
    keyCode: 40,
    shiftKeyCode: 98,
    key: "ArrowDown",
    code: "Numpad2",
    shiftKey: "2",
    location: 3
  },
  ArrowDown: { keyCode: 40, code: "ArrowDown", key: "ArrowDown" },
  Select: { keyCode: 41, code: "Select", key: "Select" },
  Open: { keyCode: 43, code: "Open", key: "Execute" },
  PrintScreen: { keyCode: 44, code: "PrintScreen", key: "PrintScreen" },
  Insert: { keyCode: 45, code: "Insert", key: "Insert" },
  Numpad0: {
    keyCode: 45,
    shiftKeyCode: 96,
    key: "Insert",
    code: "Numpad0",
    shiftKey: "0",
    location: 3
  },
  Delete: { keyCode: 46, code: "Delete", key: "Delete" },
  NumpadDecimal: {
    keyCode: 46,
    shiftKeyCode: 110,
    code: "NumpadDecimal",
    key: "\0",
    shiftKey: ".",
    location: 3
  },
  Digit0: { keyCode: 48, code: "Digit0", shiftKey: ")", key: "0" },
  Digit1: { keyCode: 49, code: "Digit1", shiftKey: "!", key: "1" },
  Digit2: { keyCode: 50, code: "Digit2", shiftKey: "@", key: "2" },
  Digit3: { keyCode: 51, code: "Digit3", shiftKey: "#", key: "3" },
  Digit4: { keyCode: 52, code: "Digit4", shiftKey: "$", key: "4" },
  Digit5: { keyCode: 53, code: "Digit5", shiftKey: "%", key: "5" },
  Digit6: { keyCode: 54, code: "Digit6", shiftKey: "^", key: "6" },
  Digit7: { keyCode: 55, code: "Digit7", shiftKey: "&", key: "7" },
  Digit8: { keyCode: 56, code: "Digit8", shiftKey: "*", key: "8" },
  Digit9: { keyCode: 57, code: "Digit9", shiftKey: "(", key: "9" },
  KeyA: { keyCode: 65, code: "KeyA", shiftKey: "A", key: "a" },
  KeyB: { keyCode: 66, code: "KeyB", shiftKey: "B", key: "b" },
  KeyC: { keyCode: 67, code: "KeyC", shiftKey: "C", key: "c" },
  KeyD: { keyCode: 68, code: "KeyD", shiftKey: "D", key: "d" },
  KeyE: { keyCode: 69, code: "KeyE", shiftKey: "E", key: "e" },
  KeyF: { keyCode: 70, code: "KeyF", shiftKey: "F", key: "f" },
  KeyG: { keyCode: 71, code: "KeyG", shiftKey: "G", key: "g" },
  KeyH: { keyCode: 72, code: "KeyH", shiftKey: "H", key: "h" },
  KeyI: { keyCode: 73, code: "KeyI", shiftKey: "I", key: "i" },
  KeyJ: { keyCode: 74, code: "KeyJ", shiftKey: "J", key: "j" },
  KeyK: { keyCode: 75, code: "KeyK", shiftKey: "K", key: "k" },
  KeyL: { keyCode: 76, code: "KeyL", shiftKey: "L", key: "l" },
  KeyM: { keyCode: 77, code: "KeyM", shiftKey: "M", key: "m" },
  KeyN: { keyCode: 78, code: "KeyN", shiftKey: "N", key: "n" },
  KeyO: { keyCode: 79, code: "KeyO", shiftKey: "O", key: "o" },
  KeyP: { keyCode: 80, code: "KeyP", shiftKey: "P", key: "p" },
  KeyQ: { keyCode: 81, code: "KeyQ", shiftKey: "Q", key: "q" },
  KeyR: { keyCode: 82, code: "KeyR", shiftKey: "R", key: "r" },
  KeyS: { keyCode: 83, code: "KeyS", shiftKey: "S", key: "s" },
  KeyT: { keyCode: 84, code: "KeyT", shiftKey: "T", key: "t" },
  KeyU: { keyCode: 85, code: "KeyU", shiftKey: "U", key: "u" },
  KeyV: { keyCode: 86, code: "KeyV", shiftKey: "V", key: "v" },
  KeyW: { keyCode: 87, code: "KeyW", shiftKey: "W", key: "w" },
  KeyX: { keyCode: 88, code: "KeyX", shiftKey: "X", key: "x" },
  KeyY: { keyCode: 89, code: "KeyY", shiftKey: "Y", key: "y" },
  KeyZ: { keyCode: 90, code: "KeyZ", shiftKey: "Z", key: "z" },
  MetaLeft: { keyCode: 91, code: "MetaLeft", key: "Meta", location: 1 },
  MetaRight: { keyCode: 92, code: "MetaRight", key: "Meta", location: 2 },
  ContextMenu: { keyCode: 93, code: "ContextMenu", key: "ContextMenu" },
  NumpadMultiply: {
    keyCode: 106,
    code: "NumpadMultiply",
    key: "*",
    location: 3
  },
  NumpadAdd: { keyCode: 107, code: "NumpadAdd", key: "+", location: 3 },
  NumpadSubtract: {
    keyCode: 109,
    code: "NumpadSubtract",
    key: "-",
    location: 3
  },
  NumpadDivide: { keyCode: 111, code: "NumpadDivide", key: "/", location: 3 },
  F1: { keyCode: 112, code: "F1", key: "F1" },
  F2: { keyCode: 113, code: "F2", key: "F2" },
  F3: { keyCode: 114, code: "F3", key: "F3" },
  F4: { keyCode: 115, code: "F4", key: "F4" },
  F5: { keyCode: 116, code: "F5", key: "F5" },
  F6: { keyCode: 117, code: "F6", key: "F6" },
  F7: { keyCode: 118, code: "F7", key: "F7" },
  F8: { keyCode: 119, code: "F8", key: "F8" },
  F9: { keyCode: 120, code: "F9", key: "F9" },
  F10: { keyCode: 121, code: "F10", key: "F10" },
  F11: { keyCode: 122, code: "F11", key: "F11" },
  F12: { keyCode: 123, code: "F12", key: "F12" },
  F13: { keyCode: 124, code: "F13", key: "F13" },
  F14: { keyCode: 125, code: "F14", key: "F14" },
  F15: { keyCode: 126, code: "F15", key: "F15" },
  F16: { keyCode: 127, code: "F16", key: "F16" },
  F17: { keyCode: 128, code: "F17", key: "F17" },
  F18: { keyCode: 129, code: "F18", key: "F18" },
  F19: { keyCode: 130, code: "F19", key: "F19" },
  F20: { keyCode: 131, code: "F20", key: "F20" },
  F21: { keyCode: 132, code: "F21", key: "F21" },
  F22: { keyCode: 133, code: "F22", key: "F22" },
  F23: { keyCode: 134, code: "F23", key: "F23" },
  F24: { keyCode: 135, code: "F24", key: "F24" },
  NumLock: { keyCode: 144, code: "NumLock", key: "NumLock" },
  ScrollLock: { keyCode: 145, code: "ScrollLock", key: "ScrollLock" },
  AudioVolumeMute: {
    keyCode: 173,
    code: "AudioVolumeMute",
    key: "AudioVolumeMute"
  },
  AudioVolumeDown: {
    keyCode: 174,
    code: "AudioVolumeDown",
    key: "AudioVolumeDown"
  },
  AudioVolumeUp: { keyCode: 175, code: "AudioVolumeUp", key: "AudioVolumeUp" },
  MediaTrackNext: {
    keyCode: 176,
    code: "MediaTrackNext",
    key: "MediaTrackNext"
  },
  MediaTrackPrevious: {
    keyCode: 177,
    code: "MediaTrackPrevious",
    key: "MediaTrackPrevious"
  },
  MediaStop: { keyCode: 178, code: "MediaStop", key: "MediaStop" },
  MediaPlayPause: {
    keyCode: 179,
    code: "MediaPlayPause",
    key: "MediaPlayPause"
  },
  Semicolon: { keyCode: 186, code: "Semicolon", shiftKey: ":", key: ";" },
  Equal: { keyCode: 187, code: "Equal", shiftKey: "+", key: "=" },
  NumpadEqual: { keyCode: 187, code: "NumpadEqual", key: "=", location: 3 },
  Comma: { keyCode: 188, code: "Comma", shiftKey: "<", key: "," },
  Minus: { keyCode: 189, code: "Minus", shiftKey: "_", key: "-" },
  Period: { keyCode: 190, code: "Period", shiftKey: ">", key: "." },
  Slash: { keyCode: 191, code: "Slash", shiftKey: "?", key: "/" },
  Backquote: { keyCode: 192, code: "Backquote", shiftKey: "~", key: "`" },
  BracketLeft: { keyCode: 219, code: "BracketLeft", shiftKey: "{", key: "[" },
  Backslash: { keyCode: 220, code: "Backslash", shiftKey: "|", key: "\\" },
  BracketRight: { keyCode: 221, code: "BracketRight", shiftKey: "}", key: "]" },
  Quote: { keyCode: 222, code: "Quote", shiftKey: '"', key: "'" },
  AltGraph: { keyCode: 225, code: "AltGraph", key: "AltGraph" },
  Props: { keyCode: 247, code: "Props", key: "CrSel" },
  Cancel: { keyCode: 3, key: "Cancel", code: "Abort" },
  Clear: { keyCode: 12, key: "Clear", code: "Numpad5", location: 3 },
  Shift: { keyCode: 16, key: "Shift", code: "ShiftLeft", location: 1 },
  Control: { keyCode: 17, key: "Control", code: "ControlLeft", location: 1 },
  Alt: { keyCode: 18, key: "Alt", code: "AltLeft", location: 1 },
  Accept: { keyCode: 30, key: "Accept" },
  ModeChange: { keyCode: 31, key: "ModeChange" },
  " ": { keyCode: 32, key: " ", code: "Space" },
  Print: { keyCode: 42, key: "Print" },
  Execute: { keyCode: 43, key: "Execute", code: "Open" },
  "\0": { keyCode: 46, key: "\0", code: "NumpadDecimal", location: 3 },
  a: { keyCode: 65, key: "a", code: "KeyA" },
  b: { keyCode: 66, key: "b", code: "KeyB" },
  c: { keyCode: 67, key: "c", code: "KeyC" },
  d: { keyCode: 68, key: "d", code: "KeyD" },
  e: { keyCode: 69, key: "e", code: "KeyE" },
  f: { keyCode: 70, key: "f", code: "KeyF" },
  g: { keyCode: 71, key: "g", code: "KeyG" },
  h: { keyCode: 72, key: "h", code: "KeyH" },
  i: { keyCode: 73, key: "i", code: "KeyI" },
  j: { keyCode: 74, key: "j", code: "KeyJ" },
  k: { keyCode: 75, key: "k", code: "KeyK" },
  l: { keyCode: 76, key: "l", code: "KeyL" },
  m: { keyCode: 77, key: "m", code: "KeyM" },
  n: { keyCode: 78, key: "n", code: "KeyN" },
  o: { keyCode: 79, key: "o", code: "KeyO" },
  p: { keyCode: 80, key: "p", code: "KeyP" },
  q: { keyCode: 81, key: "q", code: "KeyQ" },
  r: { keyCode: 82, key: "r", code: "KeyR" },
  s: { keyCode: 83, key: "s", code: "KeyS" },
  t: { keyCode: 84, key: "t", code: "KeyT" },
  u: { keyCode: 85, key: "u", code: "KeyU" },
  v: { keyCode: 86, key: "v", code: "KeyV" },
  w: { keyCode: 87, key: "w", code: "KeyW" },
  x: { keyCode: 88, key: "x", code: "KeyX" },
  y: { keyCode: 89, key: "y", code: "KeyY" },
  z: { keyCode: 90, key: "z", code: "KeyZ" },
  Meta: { keyCode: 91, key: "Meta", code: "MetaLeft", location: 1 },
  "*": { keyCode: 106, key: "*", code: "NumpadMultiply", location: 3 },
  "+": { keyCode: 107, key: "+", code: "NumpadAdd", location: 3 },
  "-": { keyCode: 109, key: "-", code: "NumpadSubtract", location: 3 },
  "/": { keyCode: 111, key: "/", code: "NumpadDivide", location: 3 },
  ";": { keyCode: 186, key: ";", code: "Semicolon" },
  "=": { keyCode: 187, key: "=", code: "Equal" },
  ",": { keyCode: 188, key: ",", code: "Comma" },
  ".": { keyCode: 190, key: ".", code: "Period" },
  "`": { keyCode: 192, key: "`", code: "Backquote" },
  "[": { keyCode: 219, key: "[", code: "BracketLeft" },
  "\\": { keyCode: 220, key: "\\", code: "Backslash" },
  "]": { keyCode: 221, key: "]", code: "BracketRight" },
  "'": { keyCode: 222, key: "'", code: "Quote" },
  Attn: { keyCode: 246, key: "Attn" },
  CrSel: { keyCode: 247, key: "CrSel", code: "Props" },
  ExSel: { keyCode: 248, key: "ExSel" },
  EraseEof: { keyCode: 249, key: "EraseEof" },
  Play: { keyCode: 250, key: "Play" },
  ZoomOut: { keyCode: 251, key: "ZoomOut" },
  ")": { keyCode: 48, key: ")", code: "Digit0" },
  "!": { keyCode: 49, key: "!", code: "Digit1" },
  "@": { keyCode: 50, key: "@", code: "Digit2" },
  "#": { keyCode: 51, key: "#", code: "Digit3" },
  $: { keyCode: 52, key: "$", code: "Digit4" },
  "%": { keyCode: 53, key: "%", code: "Digit5" },
  "^": { keyCode: 54, key: "^", code: "Digit6" },
  "&": { keyCode: 55, key: "&", code: "Digit7" },
  "(": { keyCode: 57, key: "(", code: "Digit9" },
  A: { keyCode: 65, key: "A", code: "KeyA" },
  B: { keyCode: 66, key: "B", code: "KeyB" },
  C: { keyCode: 67, key: "C", code: "KeyC" },
  D: { keyCode: 68, key: "D", code: "KeyD" },
  E: { keyCode: 69, key: "E", code: "KeyE" },
  F: { keyCode: 70, key: "F", code: "KeyF" },
  G: { keyCode: 71, key: "G", code: "KeyG" },
  H: { keyCode: 72, key: "H", code: "KeyH" },
  I: { keyCode: 73, key: "I", code: "KeyI" },
  J: { keyCode: 74, key: "J", code: "KeyJ" },
  K: { keyCode: 75, key: "K", code: "KeyK" },
  L: { keyCode: 76, key: "L", code: "KeyL" },
  M: { keyCode: 77, key: "M", code: "KeyM" },
  N: { keyCode: 78, key: "N", code: "KeyN" },
  O: { keyCode: 79, key: "O", code: "KeyO" },
  P: { keyCode: 80, key: "P", code: "KeyP" },
  Q: { keyCode: 81, key: "Q", code: "KeyQ" },
  R: { keyCode: 82, key: "R", code: "KeyR" },
  S: { keyCode: 83, key: "S", code: "KeyS" },
  T: { keyCode: 84, key: "T", code: "KeyT" },
  U: { keyCode: 85, key: "U", code: "KeyU" },
  V: { keyCode: 86, key: "V", code: "KeyV" },
  W: { keyCode: 87, key: "W", code: "KeyW" },
  X: { keyCode: 88, key: "X", code: "KeyX" },
  Y: { keyCode: 89, key: "Y", code: "KeyY" },
  Z: { keyCode: 90, key: "Z", code: "KeyZ" },
  ":": { keyCode: 186, key: ":", code: "Semicolon" },
  "<": { keyCode: 188, key: "<", code: "Comma" },
  _: { keyCode: 189, key: "_", code: "Minus" },
  ">": { keyCode: 190, key: ">", code: "Period" },
  "?": { keyCode: 191, key: "?", code: "Slash" },
  "~": { keyCode: 192, key: "~", code: "Backquote" },
  "{": { keyCode: 219, key: "{", code: "BracketLeft" },
  "|": { keyCode: 220, key: "|", code: "Backslash" },
  "}": { keyCode: 221, key: "}", code: "BracketRight" },
  '"': { keyCode: 222, key: '"', code: "Quote" },
  SoftLeft: { key: "SoftLeft", code: "SoftLeft", location: 4 },
  SoftRight: { key: "SoftRight", code: "SoftRight", location: 4 },
  Camera: { keyCode: 44, key: "Camera", code: "Camera", location: 4 },
  Call: { key: "Call", code: "Call", location: 4 },
  EndCall: { keyCode: 95, key: "EndCall", code: "EndCall", location: 4 },
  VolumeDown: {
    keyCode: 182,
    key: "VolumeDown",
    code: "VolumeDown",
    location: 4
  },
  VolumeUp: { keyCode: 183, key: "VolumeUp", code: "VolumeUp", location: 4 }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Input.js
var CdpKeyboard = class extends Keyboard {
  #client;
  #pressedKeys = /* @__PURE__ */ new Set();
  _modifiers = 0;
  constructor(client) {
    super();
    this.#client = client;
  }
  updateClient(client) {
    this.#client = client;
  }
  async down(key, options = {
    text: void 0,
    commands: []
  }) {
    const description = this.#keyDescriptionForString(key);
    const autoRepeat = this.#pressedKeys.has(description.code);
    this.#pressedKeys.add(description.code);
    this._modifiers |= this.#modifierBit(description.key);
    const text = options.text === void 0 ? description.text : options.text;
    await this.#client.send("Input.dispatchKeyEvent", {
      type: text ? "keyDown" : "rawKeyDown",
      modifiers: this._modifiers,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      key: description.key,
      text,
      unmodifiedText: text,
      autoRepeat,
      location: description.location,
      isKeypad: description.location === 3,
      commands: options.commands
    });
  }
  #modifierBit(key) {
    if (key === "Alt") {
      return 1;
    }
    if (key === "Control") {
      return 2;
    }
    if (key === "Meta") {
      return 4;
    }
    if (key === "Shift") {
      return 8;
    }
    return 0;
  }
  #keyDescriptionForString(keyString) {
    const shift = this._modifiers & 8;
    const description = {
      key: "",
      keyCode: 0,
      code: "",
      text: "",
      location: 0
    };
    const definition = _keyDefinitions[keyString];
    assert(definition, `Unknown key: "${keyString}"`);
    if (definition.key) {
      description.key = definition.key;
    }
    if (shift && definition.shiftKey) {
      description.key = definition.shiftKey;
    }
    if (definition.keyCode) {
      description.keyCode = definition.keyCode;
    }
    if (shift && definition.shiftKeyCode) {
      description.keyCode = definition.shiftKeyCode;
    }
    if (definition.code) {
      description.code = definition.code;
    }
    if (definition.location) {
      description.location = definition.location;
    }
    if (description.key.length === 1) {
      description.text = description.key;
    }
    if (definition.text) {
      description.text = definition.text;
    }
    if (shift && definition.shiftText) {
      description.text = definition.shiftText;
    }
    if (this._modifiers & ~8) {
      description.text = "";
    }
    return description;
  }
  async up(key) {
    const description = this.#keyDescriptionForString(key);
    this._modifiers &= ~this.#modifierBit(description.key);
    this.#pressedKeys.delete(description.code);
    await this.#client.send("Input.dispatchKeyEvent", {
      type: "keyUp",
      modifiers: this._modifiers,
      key: description.key,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      location: description.location
    });
  }
  async sendCharacter(char) {
    await this.#client.send("Input.insertText", { text: char });
  }
  charIsKey(char) {
    return !!_keyDefinitions[char];
  }
  async type(text, options = {}) {
    const delay = options.delay || void 0;
    for (const char of text) {
      if (this.charIsKey(char)) {
        await this.press(char, { delay });
      } else {
        if (delay) {
          await new Promise((f) => {
            return setTimeout(f, delay);
          });
        }
        await this.sendCharacter(char);
      }
    }
  }
  async press(key, options = {}) {
    const { delay = null } = options;
    await this.down(key, options);
    if (delay) {
      await new Promise((f) => {
        return setTimeout(f, options.delay);
      });
    }
    await this.up(key);
  }
};
var getFlag = (button) => {
  switch (button) {
    case MouseButton.Left:
      return 1;
    case MouseButton.Right:
      return 2;
    case MouseButton.Middle:
      return 4;
    case MouseButton.Back:
      return 8;
    case MouseButton.Forward:
      return 16;
  }
};
var getButtonFromPressedButtons = (buttons) => {
  if (buttons & 1) {
    return MouseButton.Left;
  } else if (buttons & 2) {
    return MouseButton.Right;
  } else if (buttons & 4) {
    return MouseButton.Middle;
  } else if (buttons & 8) {
    return MouseButton.Back;
  } else if (buttons & 16) {
    return MouseButton.Forward;
  }
  return "none";
};
var CdpMouse = class extends Mouse {
  #client;
  #keyboard;
  constructor(client, keyboard) {
    super();
    this.#client = client;
    this.#keyboard = keyboard;
  }
  updateClient(client) {
    this.#client = client;
  }
  #_state = {
    position: { x: 0, y: 0 },
    buttons: 0
  };
  get #state() {
    return Object.assign({ ...this.#_state }, ...this.#transactions);
  }
  // Transactions can run in parallel, so we store each of thme in this array.
  #transactions = [];
  #createTransaction() {
    const transaction = {};
    this.#transactions.push(transaction);
    const popTransaction = () => {
      this.#transactions.splice(this.#transactions.indexOf(transaction), 1);
    };
    return {
      update: (updates) => {
        Object.assign(transaction, updates);
      },
      commit: () => {
        this.#_state = { ...this.#_state, ...transaction };
        popTransaction();
      },
      rollback: popTransaction
    };
  }
  /**
   * This is a shortcut for a typical update, commit/rollback lifecycle based on
   * the error of the action.
   */
  async #withTransaction(action) {
    const { update, commit, rollback } = this.#createTransaction();
    try {
      await action(update);
      commit();
    } catch (error) {
      rollback();
      throw error;
    }
  }
  async reset() {
    const actions = [];
    for (const [flag, button] of [
      [1, MouseButton.Left],
      [4, MouseButton.Middle],
      [2, MouseButton.Right],
      [16, MouseButton.Forward],
      [8, MouseButton.Back]
    ]) {
      if (this.#state.buttons & flag) {
        actions.push(this.up({ button }));
      }
    }
    if (this.#state.position.x !== 0 || this.#state.position.y !== 0) {
      actions.push(this.move(0, 0));
    }
    await Promise.all(actions);
  }
  async move(x, y, options = {}) {
    const { steps = 1 } = options;
    const from2 = this.#state.position;
    const to = { x, y };
    for (let i = 1; i <= steps; i++) {
      await this.#withTransaction((updateState) => {
        updateState({
          position: {
            x: from2.x + (to.x - from2.x) * (i / steps),
            y: from2.y + (to.y - from2.y) * (i / steps)
          }
        });
        const { buttons, position } = this.#state;
        return this.#client.send("Input.dispatchMouseEvent", {
          type: "mouseMoved",
          modifiers: this.#keyboard._modifiers,
          buttons,
          button: getButtonFromPressedButtons(buttons),
          ...position
        });
      });
    }
  }
  async down(options = {}) {
    const { button = MouseButton.Left, clickCount = 1 } = options;
    const flag = getFlag(button);
    if (!flag) {
      throw new Error(`Unsupported mouse button: ${button}`);
    }
    if (this.#state.buttons & flag) {
      throw new Error(`'${button}' is already pressed.`);
    }
    await this.#withTransaction((updateState) => {
      updateState({
        buttons: this.#state.buttons | flag
      });
      const { buttons, position } = this.#state;
      return this.#client.send("Input.dispatchMouseEvent", {
        type: "mousePressed",
        modifiers: this.#keyboard._modifiers,
        clickCount,
        buttons,
        button,
        ...position
      });
    });
  }
  async up(options = {}) {
    const { button = MouseButton.Left, clickCount = 1 } = options;
    const flag = getFlag(button);
    if (!flag) {
      throw new Error(`Unsupported mouse button: ${button}`);
    }
    if (!(this.#state.buttons & flag)) {
      throw new Error(`'${button}' is not pressed.`);
    }
    await this.#withTransaction((updateState) => {
      updateState({
        buttons: this.#state.buttons & ~flag
      });
      const { buttons, position } = this.#state;
      return this.#client.send("Input.dispatchMouseEvent", {
        type: "mouseReleased",
        modifiers: this.#keyboard._modifiers,
        clickCount,
        buttons,
        button,
        ...position
      });
    });
  }
  async click(x, y, options = {}) {
    const { delay, count = 1, clickCount = count } = options;
    if (count < 1) {
      throw new Error("Click must occur a positive number of times.");
    }
    const actions = [this.move(x, y)];
    if (clickCount === count) {
      for (let i = 1; i < count; ++i) {
        actions.push(this.down({ ...options, clickCount: i }), this.up({ ...options, clickCount: i }));
      }
    }
    actions.push(this.down({ ...options, clickCount }));
    if (typeof delay === "number") {
      await Promise.all(actions);
      actions.length = 0;
      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
    actions.push(this.up({ ...options, clickCount }));
    await Promise.all(actions);
  }
  async wheel(options = {}) {
    const { deltaX = 0, deltaY = 0 } = options;
    const { position, buttons } = this.#state;
    await this.#client.send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      pointerType: "mouse",
      modifiers: this.#keyboard._modifiers,
      deltaY,
      deltaX,
      buttons,
      ...position
    });
  }
  async drag(start, target) {
    const promise = new Promise((resolve) => {
      this.#client.once("Input.dragIntercepted", (event) => {
        return resolve(event.data);
      });
    });
    await this.move(start.x, start.y);
    await this.down();
    await this.move(target.x, target.y);
    return await promise;
  }
  async dragEnter(target, data) {
    await this.#client.send("Input.dispatchDragEvent", {
      type: "dragEnter",
      x: target.x,
      y: target.y,
      modifiers: this.#keyboard._modifiers,
      data
    });
  }
  async dragOver(target, data) {
    await this.#client.send("Input.dispatchDragEvent", {
      type: "dragOver",
      x: target.x,
      y: target.y,
      modifiers: this.#keyboard._modifiers,
      data
    });
  }
  async drop(target, data) {
    await this.#client.send("Input.dispatchDragEvent", {
      type: "drop",
      x: target.x,
      y: target.y,
      modifiers: this.#keyboard._modifiers,
      data
    });
  }
  async dragAndDrop(start, target, options = {}) {
    const { delay = null } = options;
    const data = await this.drag(start, target);
    await this.dragEnter(target, data);
    await this.dragOver(target, data);
    if (delay) {
      await new Promise((resolve) => {
        return setTimeout(resolve, delay);
      });
    }
    await this.drop(target, data);
    await this.up();
  }
};
var CdpTouchHandle = class {
  #started = false;
  #touchScreen;
  #touchPoint;
  #client;
  #keyboard;
  constructor(client, touchScreen, keyboard, touchPoint) {
    this.#client = client;
    this.#touchScreen = touchScreen;
    this.#keyboard = keyboard;
    this.#touchPoint = touchPoint;
  }
  updateClient(client) {
    this.#client = client;
  }
  async start() {
    if (this.#started) {
      throw new TouchError("Touch has already started");
    }
    await this.#client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [this.#touchPoint],
      modifiers: this.#keyboard._modifiers
    });
    this.#started = true;
  }
  move(x, y) {
    this.#touchPoint.x = Math.round(x);
    this.#touchPoint.y = Math.round(y);
    return this.#client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [this.#touchPoint],
      modifiers: this.#keyboard._modifiers
    });
  }
  async end() {
    await this.#client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [this.#touchPoint],
      modifiers: this.#keyboard._modifiers
    });
    this.#touchScreen.removeHandle(this);
  }
};
var CdpTouchscreen = class extends Touchscreen {
  #client;
  #keyboard;
  constructor(client, keyboard) {
    super();
    this.#client = client;
    this.#keyboard = keyboard;
  }
  updateClient(client) {
    this.#client = client;
    this.touches.forEach((t) => {
      t.updateClient(client);
    });
  }
  async touchStart(x, y) {
    const id = this.idGenerator();
    const touchPoint = {
      x: Math.round(x),
      y: Math.round(y),
      radiusX: 0.5,
      radiusY: 0.5,
      force: 0.5,
      id
    };
    const touch = new CdpTouchHandle(this.#client, this, this.#keyboard, touchPoint);
    await touch.start();
    this.touches.push(touch);
    return touch;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Tracing.js
var Tracing = class {
  #client;
  #recording = false;
  #path;
  /**
   * @internal
   */
  constructor(client) {
    this.#client = client;
  }
  /**
   * @internal
   */
  updateClient(client) {
    this.#client = client;
  }
  /**
   * Starts a trace for the current page.
   * @remarks
   * Only one trace can be active at a time per browser.
   *
   * @param options - Optional `TracingOptions`.
   */
  async start(options = {}) {
    assert(!this.#recording, "Cannot start recording trace while already recording trace.");
    const defaultCategories = [
      "-*",
      "devtools.timeline",
      "v8.execute",
      "disabled-by-default-devtools.timeline",
      "disabled-by-default-devtools.timeline.frame",
      "toplevel",
      "blink.console",
      "blink.user_timing",
      "latencyInfo",
      "disabled-by-default-devtools.timeline.stack",
      "disabled-by-default-v8.cpu_profiler"
    ];
    const { path, screenshots = false, categories = defaultCategories } = options;
    if (screenshots) {
      categories.push("disabled-by-default-devtools.screenshot");
    }
    const excludedCategories = categories.filter((cat) => {
      return cat.startsWith("-");
    }).map((cat) => {
      return cat.slice(1);
    });
    const includedCategories = categories.filter((cat) => {
      return !cat.startsWith("-");
    });
    this.#path = path;
    this.#recording = true;
    await this.#client.send("Tracing.start", {
      transferMode: "ReturnAsStream",
      traceConfig: {
        excludedCategories,
        includedCategories
      }
    });
  }
  /**
   * Stops a trace started with the `start` method.
   * @returns Promise which resolves to buffer with trace data.
   */
  async stop() {
    const contentDeferred = Deferred.create();
    this.#client.once("Tracing.tracingComplete", async (event) => {
      try {
        assert(event.stream, 'Missing "stream"');
        const readable = await getReadableFromProtocolStream(this.#client, event.stream);
        const typedArray = await getReadableAsTypedArray(readable, this.#path);
        contentDeferred.resolve(typedArray ?? void 0);
      } catch (error) {
        if (isErrorLike(error)) {
          contentDeferred.reject(error);
        } else {
          contentDeferred.reject(new Error(`Unknown error: ${error}`));
        }
      }
    });
    await this.#client.send("Tracing.end");
    this.#recording = false;
    return await contentDeferred.valueOrThrow();
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/Target.js
var TargetType;
(function(TargetType2) {
  TargetType2["PAGE"] = "page";
  TargetType2["BACKGROUND_PAGE"] = "background_page";
  TargetType2["SERVICE_WORKER"] = "service_worker";
  TargetType2["SHARED_WORKER"] = "shared_worker";
  TargetType2["BROWSER"] = "browser";
  TargetType2["WEBVIEW"] = "webview";
  TargetType2["OTHER"] = "other";
  TargetType2["TAB"] = "tab";
})(TargetType || (TargetType = {}));
var Target = class {
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.
   */
  async worker() {
    return null;
  }
  /**
   * If the target is not of type `"page"`, `"webview"` or `"background_page"`,
   * returns `null`.
   */
  async page() {
    return null;
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/api/WebWorker.js
var WebWorker = class extends EventEmitter {
  /**
   * @internal
   */
  timeoutSettings = new TimeoutSettings();
  #url;
  /**
   * @internal
   */
  constructor(url) {
    super();
    this.#url = url;
  }
  /**
   * The URL of this web worker.
   */
  url() {
    return this.#url;
  }
  /**
   * Evaluates a given function in the {@link WebWorker | worker}.
   *
   * @remarks If the given function returns a promise,
   * {@link WebWorker.evaluate | evaluate} will wait for the promise to resolve.
   *
   * As a rule of thumb, if the return value of the given function is more
   * complicated than a JSON object (e.g. most classes), then
   * {@link WebWorker.evaluate | evaluate} will _likely_ return some truncated
   * value (or `{}`). This is because we are not returning the actual return
   * value, but a deserialized version as a result of transferring the return
   * value through a protocol to Puppeteer.
   *
   * In general, you should use
   * {@link WebWorker.evaluateHandle | evaluateHandle} if
   * {@link WebWorker.evaluate | evaluate} cannot serialize the return value
   * properly or you need a mutable {@link JSHandle | handle} to the return
   * object.
   *
   * @param func - Function to be evaluated.
   * @param args - Arguments to pass into `func`.
   * @returns The result of `func`.
   */
  async evaluate(func, ...args) {
    func = withSourcePuppeteerURLIfNone(this.evaluate.name, func);
    return await this.mainRealm().evaluate(func, ...args);
  }
  /**
   * Evaluates a given function in the {@link WebWorker | worker}.
   *
   * @remarks If the given function returns a promise,
   * {@link WebWorker.evaluate | evaluate} will wait for the promise to resolve.
   *
   * In general, you should use
   * {@link WebWorker.evaluateHandle | evaluateHandle} if
   * {@link WebWorker.evaluate | evaluate} cannot serialize the return value
   * properly or you need a mutable {@link JSHandle | handle} to the return
   * object.
   *
   * @param func - Function to be evaluated.
   * @param args - Arguments to pass into `func`.
   * @returns A {@link JSHandle | handle} to the return value of `func`.
   */
  async evaluateHandle(func, ...args) {
    func = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, func);
    return await this.mainRealm().evaluateHandle(func, ...args);
  }
  async close() {
    throw new UnsupportedOperation("WebWorker.close() is not supported");
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/WebWorker.js
var CdpWebWorker = class extends WebWorker {
  #world;
  #client;
  #id;
  #targetType;
  constructor(client, url, targetId, targetType, consoleAPICalled, exceptionThrown, networkManager) {
    super(url);
    this.#id = targetId;
    this.#client = client;
    this.#targetType = targetType;
    this.#world = new IsolatedWorld(this, new TimeoutSettings());
    this.#client.once("Runtime.executionContextCreated", async (event) => {
      this.#world.setContext(new ExecutionContext(client, event.context, this.#world));
    });
    this.#world.emitter.on("consoleapicalled", async (event) => {
      try {
        return consoleAPICalled(event.type, event.args.map((object) => {
          return new CdpJSHandle(this.#world, object);
        }), event.stackTrace);
      } catch (err) {
        debugError(err);
      }
    });
    this.#client.on("Runtime.exceptionThrown", exceptionThrown);
    this.#client.once(CDPSessionEvent.Disconnected, () => {
      this.#world.dispose();
    });
    networkManager?.addClient(this.#client).catch(debugError);
    this.#client.send("Runtime.enable").catch(debugError);
  }
  mainRealm() {
    return this.#world;
  }
  get client() {
    return this.#client;
  }
  async close() {
    switch (this.#targetType) {
      case TargetType.SERVICE_WORKER:
      case TargetType.SHARED_WORKER: {
        await this.client.connection()?.send("Target.closeTarget", {
          targetId: this.#id
        });
        await this.client.connection()?.send("Target.detachFromTarget", {
          sessionId: this.client.id()
        });
        break;
      }
      default:
        await this.evaluate(() => {
          self.close();
        });
    }
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Page.js
var __addDisposableResource12 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources12 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
function convertConsoleMessageLevel(method) {
  switch (method) {
    case "warning":
      return "warn";
    default:
      return method;
  }
}
var CdpPage = class _CdpPage extends Page {
  static async _create(client, target, defaultViewport) {
    const page = new _CdpPage(client, target);
    await page.#initialize();
    if (defaultViewport) {
      try {
        await page.setViewport(defaultViewport);
      } catch (err) {
        if (isErrorLike(err) && isTargetClosedError(err)) {
          debugError(err);
        } else {
          throw err;
        }
      }
    }
    return page;
  }
  #closed = false;
  #targetManager;
  #primaryTargetClient;
  #primaryTarget;
  #tabTargetClient;
  #tabTarget;
  #keyboard;
  #mouse;
  #touchscreen;
  #frameManager;
  #emulationManager;
  #tracing;
  #bindings = /* @__PURE__ */ new Map();
  #exposedFunctions = /* @__PURE__ */ new Map();
  #coverage;
  #viewport;
  #workers = /* @__PURE__ */ new Map();
  #fileChooserDeferreds = /* @__PURE__ */ new Set();
  #sessionCloseDeferred = Deferred.create();
  #serviceWorkerBypassed = false;
  #userDragInterceptionEnabled = false;
  constructor(client, target) {
    super();
    this.#primaryTargetClient = client;
    this.#tabTargetClient = client.parentSession();
    assert(this.#tabTargetClient, "Tab target session is not defined.");
    this.#tabTarget = this.#tabTargetClient.target();
    assert(this.#tabTarget, "Tab target is not defined.");
    this.#primaryTarget = target;
    this.#targetManager = target._targetManager();
    this.#keyboard = new CdpKeyboard(client);
    this.#mouse = new CdpMouse(client, this.#keyboard);
    this.#touchscreen = new CdpTouchscreen(client, this.#keyboard);
    this.#frameManager = new FrameManager(client, this, this._timeoutSettings);
    this.#emulationManager = new EmulationManager(client);
    this.#tracing = new Tracing(client);
    this.#coverage = new Coverage(client);
    this.#viewport = null;
    const frameManagerEmitter = new EventEmitter(this.#frameManager);
    frameManagerEmitter.on(FrameManagerEvent.FrameAttached, (frame) => {
      this.emit("frameattached", frame);
    });
    frameManagerEmitter.on(FrameManagerEvent.FrameDetached, (frame) => {
      this.emit("framedetached", frame);
    });
    frameManagerEmitter.on(FrameManagerEvent.FrameNavigated, (frame) => {
      this.emit("framenavigated", frame);
    });
    frameManagerEmitter.on(FrameManagerEvent.ConsoleApiCalled, ([world, event]) => {
      this.#onConsoleAPI(world, event);
    });
    frameManagerEmitter.on(FrameManagerEvent.BindingCalled, ([world, event]) => {
      void this.#onBindingCalled(world, event);
    });
    const networkManagerEmitter = new EventEmitter(this.#frameManager.networkManager);
    networkManagerEmitter.on(NetworkManagerEvent.Request, (request) => {
      this.emit("request", request);
    });
    networkManagerEmitter.on(NetworkManagerEvent.RequestServedFromCache, (request) => {
      this.emit("requestservedfromcache", request);
    });
    networkManagerEmitter.on(NetworkManagerEvent.Response, (response) => {
      this.emit("response", response);
    });
    networkManagerEmitter.on(NetworkManagerEvent.RequestFailed, (request) => {
      this.emit("requestfailed", request);
    });
    networkManagerEmitter.on(NetworkManagerEvent.RequestFinished, (request) => {
      this.emit("requestfinished", request);
    });
    this.#tabTargetClient.on(CDPSessionEvent.Swapped, this.#onActivation.bind(this));
    this.#tabTargetClient.on(CDPSessionEvent.Ready, this.#onSecondaryTarget.bind(this));
    this.#targetManager.on("targetGone", this.#onDetachedFromTarget);
    this.#tabTarget._isClosedDeferred.valueOrThrow().then(() => {
      this.#targetManager.off("targetGone", this.#onDetachedFromTarget);
      this.emit("close", void 0);
      this.#closed = true;
    }).catch(debugError);
    this.#setupPrimaryTargetListeners();
    this.#attachExistingTargets();
  }
  #attachExistingTargets() {
    const queue = [];
    for (const childTarget of this.#targetManager.getChildTargets(this.#primaryTarget)) {
      queue.push(childTarget);
    }
    let idx = 0;
    while (idx < queue.length) {
      const next = queue[idx];
      idx++;
      const session = next._session();
      if (session) {
        this.#onAttachedToTarget(session);
      }
      for (const childTarget of this.#targetManager.getChildTargets(next)) {
        queue.push(childTarget);
      }
    }
  }
  async #onActivation(newSession) {
    assert(newSession instanceof CdpCDPSession, "CDPSession is not instance of CdpCDPSession");
    this.#primaryTargetClient = newSession;
    this.#primaryTarget = newSession.target();
    assert(this.#primaryTarget, "Missing target on swap");
    this.#keyboard.updateClient(newSession);
    this.#mouse.updateClient(newSession);
    this.#touchscreen.updateClient(newSession);
    this.#emulationManager.updateClient(newSession);
    this.#tracing.updateClient(newSession);
    this.#coverage.updateClient(newSession);
    await this.#frameManager.swapFrameTree(newSession);
    this.#setupPrimaryTargetListeners();
  }
  async #onSecondaryTarget(session) {
    assert(session instanceof CdpCDPSession);
    if (session.target()._subtype() !== "prerender") {
      return;
    }
    this.#frameManager.registerSpeculativeSession(session).catch(debugError);
    this.#emulationManager.registerSpeculativeSession(session).catch(debugError);
  }
  /**
   * Sets up listeners for the primary target. The primary target can change
   * during a navigation to a prerended page.
   */
  #setupPrimaryTargetListeners() {
    const clientEmitter = new EventEmitter(this.#primaryTargetClient);
    clientEmitter.on(CDPSessionEvent.Ready, this.#onAttachedToTarget);
    clientEmitter.on(CDPSessionEvent.Disconnected, () => {
      this.#sessionCloseDeferred.reject(new TargetCloseError("Target closed"));
    });
    clientEmitter.on("Page.domContentEventFired", () => {
      this.emit("domcontentloaded", void 0);
    });
    clientEmitter.on("Page.loadEventFired", () => {
      this.emit("load", void 0);
    });
    clientEmitter.on("Page.javascriptDialogOpening", this.#onDialog.bind(this));
    clientEmitter.on("Runtime.exceptionThrown", this.#handleException.bind(this));
    clientEmitter.on("Inspector.targetCrashed", this.#onTargetCrashed.bind(this));
    clientEmitter.on("Performance.metrics", this.#emitMetrics.bind(this));
    clientEmitter.on("Log.entryAdded", this.#onLogEntryAdded.bind(this));
    clientEmitter.on("Page.fileChooserOpened", this.#onFileChooser.bind(this));
  }
  #onDetachedFromTarget = (target) => {
    const sessionId = target._session()?.id();
    const worker = this.#workers.get(sessionId);
    if (!worker) {
      return;
    }
    this.#workers.delete(sessionId);
    this.emit("workerdestroyed", worker);
  };
  #onAttachedToTarget = (session) => {
    assert(session instanceof CdpCDPSession);
    this.#frameManager.onAttachedToTarget(session.target());
    if (session.target()._getTargetInfo().type === "worker") {
      const worker = new CdpWebWorker(session, session.target().url(), session.target()._targetId, session.target().type(), this.#addConsoleMessage.bind(this), this.#handleException.bind(this), this.#frameManager.networkManager);
      this.#workers.set(session.id(), worker);
      this.emit("workercreated", worker);
    }
    session.on(CDPSessionEvent.Ready, this.#onAttachedToTarget);
  };
  async #initialize() {
    try {
      await Promise.all([
        this.#frameManager.initialize(this.#primaryTargetClient),
        this.#primaryTargetClient.send("Performance.enable"),
        this.#primaryTargetClient.send("Log.enable")
      ]);
    } catch (err) {
      if (isErrorLike(err) && isTargetClosedError(err)) {
        debugError(err);
      } else {
        throw err;
      }
    }
  }
  async resize(params) {
    const { windowId } = await this.#primaryTargetClient.send("Browser.getWindowForTarget");
    await this.#primaryTargetClient.send("Browser.setContentsSize", {
      windowId,
      width: params.contentWidth,
      height: params.contentHeight
    });
  }
  async #onFileChooser(event) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      if (!this.#fileChooserDeferreds.size) {
        return;
      }
      const frame = this.#frameManager.frame(event.frameId);
      assert(frame, "This should never happen.");
      const handle = __addDisposableResource12(env_1, await frame.worlds[MAIN_WORLD].adoptBackendNode(event.backendNodeId), false);
      const fileChooser = new FileChooser(handle.move(), event.mode !== "selectSingle");
      for (const promise of this.#fileChooserDeferreds) {
        promise.resolve(fileChooser);
      }
      this.#fileChooserDeferreds.clear();
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources12(env_1);
    }
  }
  _client() {
    return this.#primaryTargetClient;
  }
  isServiceWorkerBypassed() {
    return this.#serviceWorkerBypassed;
  }
  isDragInterceptionEnabled() {
    return this.#userDragInterceptionEnabled;
  }
  isJavaScriptEnabled() {
    return this.#emulationManager.javascriptEnabled;
  }
  async waitForFileChooser(options = {}) {
    const needsEnable = this.#fileChooserDeferreds.size === 0;
    const { timeout: timeout2 = this._timeoutSettings.timeout() } = options;
    const deferred = Deferred.create({
      message: `Waiting for \`FileChooser\` failed: ${timeout2}ms exceeded`,
      timeout: timeout2
    });
    if (options.signal) {
      options.signal.addEventListener("abort", () => {
        deferred.reject(options.signal?.reason);
      }, { once: true });
    }
    this.#fileChooserDeferreds.add(deferred);
    let enablePromise;
    if (needsEnable) {
      enablePromise = this.#primaryTargetClient.send("Page.setInterceptFileChooserDialog", {
        enabled: true
      });
    }
    try {
      const [result] = await Promise.all([
        deferred.valueOrThrow(),
        enablePromise
      ]);
      return result;
    } catch (error) {
      this.#fileChooserDeferreds.delete(deferred);
      throw error;
    }
  }
  async setGeolocation(options) {
    return await this.#emulationManager.setGeolocation(options);
  }
  target() {
    return this.#primaryTarget;
  }
  browser() {
    return this.#primaryTarget.browser();
  }
  browserContext() {
    return this.#primaryTarget.browserContext();
  }
  #onTargetCrashed() {
    this.emit("error", new Error("Page crashed!"));
  }
  #onLogEntryAdded(event) {
    const { level, text, args, source: source2, url, lineNumber } = event.entry;
    if (args) {
      args.map((arg) => {
        void releaseObject(this.#primaryTargetClient, arg);
      });
    }
    if (source2 !== "worker") {
      this.emit("console", new ConsoleMessage(convertConsoleMessageLevel(level), text, [], [{ url, lineNumber }]));
    }
  }
  mainFrame() {
    return this.#frameManager.mainFrame();
  }
  get keyboard() {
    return this.#keyboard;
  }
  get touchscreen() {
    return this.#touchscreen;
  }
  get coverage() {
    return this.#coverage;
  }
  get tracing() {
    return this.#tracing;
  }
  frames() {
    return this.#frameManager.frames();
  }
  workers() {
    return Array.from(this.#workers.values());
  }
  async setRequestInterception(value) {
    return await this.#frameManager.networkManager.setRequestInterception(value);
  }
  async setBypassServiceWorker(bypass) {
    this.#serviceWorkerBypassed = bypass;
    return await this.#primaryTargetClient.send("Network.setBypassServiceWorker", { bypass });
  }
  async setDragInterception(enabled) {
    this.#userDragInterceptionEnabled = enabled;
    return await this.#primaryTargetClient.send("Input.setInterceptDrags", {
      enabled
    });
  }
  async setOfflineMode(enabled) {
    return await this.#frameManager.networkManager.setOfflineMode(enabled);
  }
  async emulateNetworkConditions(networkConditions) {
    return await this.#frameManager.networkManager.emulateNetworkConditions(networkConditions);
  }
  setDefaultNavigationTimeout(timeout2) {
    this._timeoutSettings.setDefaultNavigationTimeout(timeout2);
  }
  setDefaultTimeout(timeout2) {
    this._timeoutSettings.setDefaultTimeout(timeout2);
  }
  getDefaultTimeout() {
    return this._timeoutSettings.timeout();
  }
  getDefaultNavigationTimeout() {
    return this._timeoutSettings.navigationTimeout();
  }
  async queryObjects(prototypeHandle) {
    assert(!prototypeHandle.disposed, "Prototype JSHandle is disposed!");
    assert(prototypeHandle.id, "Prototype JSHandle must not be referencing primitive value");
    const response = await this.mainFrame().client.send("Runtime.queryObjects", {
      prototypeObjectId: prototypeHandle.id
    });
    return this.mainFrame().mainRealm().createCdpHandle(response.objects);
  }
  async cookies(...urls) {
    const originalCookies = (await this.#primaryTargetClient.send("Network.getCookies", {
      urls: urls.length ? urls : [this.url()]
    })).cookies;
    const unsupportedCookieAttributes = ["sourcePort"];
    const filterUnsupportedAttributes = (cookie) => {
      for (const attr of unsupportedCookieAttributes) {
        delete cookie[attr];
      }
      return cookie;
    };
    return originalCookies.map(filterUnsupportedAttributes).map((cookie) => {
      return {
        ...cookie,
        // TODO: a breaking change is needed in Puppeteer types to support other
        // partition keys.
        partitionKey: cookie.partitionKey ? cookie.partitionKey.topLevelSite : void 0
      };
    });
  }
  async deleteCookie(...cookies) {
    const pageURL = this.url();
    for (const cookie of cookies) {
      const item = {
        ...cookie,
        partitionKey: convertCookiesPartitionKeyFromPuppeteerToCdp(cookie.partitionKey)
      };
      if (!cookie.url && pageURL.startsWith("http")) {
        item.url = pageURL;
      }
      await this.#primaryTargetClient.send("Network.deleteCookies", item);
      if (pageURL.startsWith("http") && !item.partitionKey) {
        const url = new URL(pageURL);
        await this.#primaryTargetClient.send("Network.deleteCookies", {
          ...item,
          partitionKey: {
            topLevelSite: url.origin.replace(`:${url.port}`, ""),
            hasCrossSiteAncestor: false
          }
        });
      }
    }
  }
  async setCookie(...cookies) {
    const pageURL = this.url();
    const startsWithHTTP = pageURL.startsWith("http");
    const items = cookies.map((cookie) => {
      const item = Object.assign({}, cookie);
      if (!item.url && startsWithHTTP) {
        item.url = pageURL;
      }
      assert(item.url !== "about:blank", `Blank page can not have cookie "${item.name}"`);
      assert(!String.prototype.startsWith.call(item.url || "", "data:"), `Data URL page can not have cookie "${item.name}"`);
      return item;
    });
    await this.deleteCookie(...items);
    if (items.length) {
      await this.#primaryTargetClient.send("Network.setCookies", {
        cookies: items.map((cookieParam) => {
          return {
            ...cookieParam,
            partitionKey: convertCookiesPartitionKeyFromPuppeteerToCdp(cookieParam.partitionKey)
          };
        })
      });
    }
  }
  async exposeFunction(name, pptrFunction) {
    if (this.#bindings.has(name)) {
      throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
    }
    const source2 = pageBindingInitString("exposedFun", name);
    let binding;
    switch (typeof pptrFunction) {
      case "function":
        binding = new Binding(name, pptrFunction, source2);
        break;
      default:
        binding = new Binding(name, pptrFunction.default, source2);
        break;
    }
    this.#bindings.set(name, binding);
    const [{ identifier }] = await Promise.all([
      this.#frameManager.evaluateOnNewDocument(source2),
      this.#frameManager.addExposedFunctionBinding(binding)
    ]);
    this.#exposedFunctions.set(name, identifier);
  }
  async removeExposedFunction(name) {
    const exposedFunctionId = this.#exposedFunctions.get(name);
    if (!exposedFunctionId) {
      throw new Error(`Function with name "${name}" does not exist`);
    }
    const binding = this.#bindings.get(name);
    this.#exposedFunctions.delete(name);
    this.#bindings.delete(name);
    await Promise.all([
      this.#frameManager.removeScriptToEvaluateOnNewDocument(exposedFunctionId),
      this.#frameManager.removeExposedFunctionBinding(binding)
    ]);
  }
  async authenticate(credentials) {
    return await this.#frameManager.networkManager.authenticate(credentials);
  }
  async setExtraHTTPHeaders(headers) {
    return await this.#frameManager.networkManager.setExtraHTTPHeaders(headers);
  }
  async setUserAgent(userAgentOrOptions, userAgentMetadata) {
    if (typeof userAgentOrOptions === "string") {
      return await this.#frameManager.networkManager.setUserAgent(userAgentOrOptions, userAgentMetadata);
    } else {
      const userAgent = userAgentOrOptions.userAgent ?? await this.browser().userAgent();
      return await this.#frameManager.networkManager.setUserAgent(userAgent, userAgentOrOptions.userAgentMetadata, userAgentOrOptions.platform);
    }
  }
  async metrics() {
    const response = await this.#primaryTargetClient.send("Performance.getMetrics");
    return this.#buildMetricsObject(response.metrics);
  }
  #emitMetrics(event) {
    this.emit("metrics", {
      title: event.title,
      metrics: this.#buildMetricsObject(event.metrics)
    });
  }
  #buildMetricsObject(metrics) {
    const result = {};
    for (const metric of metrics || []) {
      if (supportedMetrics.has(metric.name)) {
        result[metric.name] = metric.value;
      }
    }
    return result;
  }
  #handleException(exception) {
    this.emit("pageerror", createClientError(exception.exceptionDetails));
  }
  #onConsoleAPI(world, event) {
    const values = event.args.map((arg) => {
      return world.createCdpHandle(arg);
    });
    this.#addConsoleMessage(convertConsoleMessageLevel(event.type), values, event.stackTrace);
  }
  async #onBindingCalled(world, event) {
    let payload;
    try {
      payload = JSON.parse(event.payload);
    } catch {
      return;
    }
    const { type, name, seq, args, isTrivial } = payload;
    if (type !== "exposedFun") {
      return;
    }
    const context2 = world.context;
    if (!context2) {
      return;
    }
    const binding = this.#bindings.get(name);
    await binding?.run(context2, seq, args, isTrivial);
  }
  #addConsoleMessage(eventType, args, stackTrace) {
    if (!this.listenerCount(
      "console"
      /* PageEvent.Console */
    )) {
      args.forEach((arg) => {
        return arg.dispose();
      });
      return;
    }
    const textTokens = [];
    for (const arg of args) {
      const remoteObject = arg.remoteObject();
      if (remoteObject.objectId) {
        textTokens.push(arg.toString());
      } else {
        textTokens.push(valueFromRemoteObject(remoteObject));
      }
    }
    const stackTraceLocations = [];
    if (stackTrace) {
      for (const callFrame of stackTrace.callFrames) {
        stackTraceLocations.push({
          url: callFrame.url,
          lineNumber: callFrame.lineNumber,
          columnNumber: callFrame.columnNumber
        });
      }
    }
    const message = new ConsoleMessage(convertConsoleMessageLevel(eventType), textTokens.join(" "), args, stackTraceLocations);
    this.emit("console", message);
  }
  #onDialog(event) {
    const type = validateDialogType(event.type);
    const dialog = new CdpDialog(this.#primaryTargetClient, type, event.message, event.defaultPrompt);
    this.emit("dialog", dialog);
  }
  async reload(options) {
    const [result] = await Promise.all([
      this.waitForNavigation({
        ...options,
        ignoreSameDocumentNavigation: true
      }),
      this.#primaryTargetClient.send("Page.reload")
    ]);
    return result;
  }
  async createCDPSession() {
    return await this.target().createCDPSession();
  }
  async goBack(options = {}) {
    return await this.#go(-1, options);
  }
  async goForward(options = {}) {
    return await this.#go(1, options);
  }
  async #go(delta, options) {
    const history = await this.#primaryTargetClient.send("Page.getNavigationHistory");
    const entry = history.entries[history.currentIndex + delta];
    if (!entry) {
      throw new Error("History entry to navigate to not found.");
    }
    const result = await Promise.all([
      this.waitForNavigation(options),
      this.#primaryTargetClient.send("Page.navigateToHistoryEntry", {
        entryId: entry.id
      })
    ]);
    return result[0];
  }
  async bringToFront() {
    await this.#primaryTargetClient.send("Page.bringToFront");
  }
  async setJavaScriptEnabled(enabled) {
    return await this.#emulationManager.setJavaScriptEnabled(enabled);
  }
  async setBypassCSP(enabled) {
    await this.#primaryTargetClient.send("Page.setBypassCSP", { enabled });
  }
  async emulateMediaType(type) {
    return await this.#emulationManager.emulateMediaType(type);
  }
  async emulateCPUThrottling(factor) {
    return await this.#emulationManager.emulateCPUThrottling(factor);
  }
  async emulateMediaFeatures(features) {
    return await this.#emulationManager.emulateMediaFeatures(features);
  }
  async emulateTimezone(timezoneId) {
    return await this.#emulationManager.emulateTimezone(timezoneId);
  }
  async emulateIdleState(overrides) {
    return await this.#emulationManager.emulateIdleState(overrides);
  }
  async emulateVisionDeficiency(type) {
    return await this.#emulationManager.emulateVisionDeficiency(type);
  }
  async setViewport(viewport) {
    const needsReload = await this.#emulationManager.emulateViewport(viewport);
    this.#viewport = viewport;
    if (needsReload) {
      await this.reload();
    }
  }
  viewport() {
    return this.#viewport;
  }
  async evaluateOnNewDocument(pageFunction, ...args) {
    const source2 = evaluationString(pageFunction, ...args);
    return await this.#frameManager.evaluateOnNewDocument(source2);
  }
  async removeScriptToEvaluateOnNewDocument(identifier) {
    return await this.#frameManager.removeScriptToEvaluateOnNewDocument(identifier);
  }
  async setCacheEnabled(enabled = true) {
    await this.#frameManager.networkManager.setCacheEnabled(enabled);
  }
  async _screenshot(options) {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      const { fromSurface, omitBackground, optimizeForSpeed, quality, clip: userClip, type, captureBeyondViewport } = options;
      const stack = __addDisposableResource12(env_2, new AsyncDisposableStack(), true);
      if (omitBackground && (type === "png" || type === "webp")) {
        await this.#emulationManager.setTransparentBackgroundColor();
        stack.defer(async () => {
          await this.#emulationManager.resetDefaultBackgroundColor().catch(debugError);
        });
      }
      let clip = userClip;
      if (clip && !captureBeyondViewport) {
        const viewport = await this.mainFrame().isolatedRealm().evaluate(() => {
          const { height, pageLeft: x, pageTop: y, width } = window.visualViewport;
          return { x, y, height, width };
        });
        clip = getIntersectionRect(clip, viewport);
      }
      const { data } = await this.#primaryTargetClient.send("Page.captureScreenshot", {
        format: type,
        optimizeForSpeed,
        fromSurface,
        ...quality !== void 0 ? { quality: Math.round(quality) } : {},
        ...clip ? { clip: { ...clip, scale: clip.scale ?? 1 } } : {},
        captureBeyondViewport
      });
      return data;
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      const result_1 = __disposeResources12(env_2);
      if (result_1)
        await result_1;
    }
  }
  async createPDFStream(options = {}) {
    const { timeout: ms = this._timeoutSettings.timeout() } = options;
    const { landscape, displayHeaderFooter, headerTemplate, footerTemplate, printBackground, scale, width: paperWidth, height: paperHeight, margin, pageRanges, preferCSSPageSize, omitBackground, tagged: generateTaggedPDF, outline: generateDocumentOutline, waitForFonts } = parsePDFOptions(options);
    if (omitBackground) {
      await this.#emulationManager.setTransparentBackgroundColor();
    }
    if (waitForFonts) {
      await firstValueFrom(from(this.mainFrame().isolatedRealm().evaluate(() => {
        return document.fonts.ready;
      })).pipe(raceWith(timeout(ms))));
    }
    const printCommandPromise = this.#primaryTargetClient.send("Page.printToPDF", {
      transferMode: "ReturnAsStream",
      landscape,
      displayHeaderFooter,
      headerTemplate,
      footerTemplate,
      printBackground,
      scale,
      paperWidth,
      paperHeight,
      marginTop: margin.top,
      marginBottom: margin.bottom,
      marginLeft: margin.left,
      marginRight: margin.right,
      pageRanges,
      preferCSSPageSize,
      generateTaggedPDF,
      generateDocumentOutline
    });
    const result = await firstValueFrom(from(printCommandPromise).pipe(raceWith(timeout(ms))));
    if (omitBackground) {
      await this.#emulationManager.resetDefaultBackgroundColor();
    }
    assert(result.stream, "`stream` is missing from `Page.printToPDF");
    return await getReadableFromProtocolStream(this.#primaryTargetClient, result.stream);
  }
  async pdf(options = {}) {
    const { path = void 0 } = options;
    const readable = await this.createPDFStream(options);
    const typedArray = await getReadableAsTypedArray(readable, path);
    assert(typedArray, "Could not create typed array");
    return typedArray;
  }
  async close(options = { runBeforeUnload: void 0 }) {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
      const _guard = __addDisposableResource12(env_3, await this.browserContext().waitForScreenshotOperations(), false);
      const connection = this.#primaryTargetClient.connection();
      assert(connection, "Connection closed. Most likely the page has been closed.");
      const runBeforeUnload = !!options.runBeforeUnload;
      if (runBeforeUnload) {
        await this.#primaryTargetClient.send("Page.close");
      } else {
        await connection.send("Target.closeTarget", {
          targetId: this.#primaryTarget._targetId
        });
        await this.#tabTarget._isClosedDeferred.valueOrThrow();
      }
    } catch (e_3) {
      env_3.error = e_3;
      env_3.hasError = true;
    } finally {
      __disposeResources12(env_3);
    }
  }
  isClosed() {
    return this.#closed;
  }
  get mouse() {
    return this.#mouse;
  }
  /**
   * This method is typically coupled with an action that triggers a device
   * request from an api such as WebBluetooth.
   *
   * :::caution
   *
   * This must be called before the device request is made. It will not return a
   * currently active device prompt.
   *
   * :::
   *
   * @example
   *
   * ```ts
   * const [devicePrompt] = Promise.all([
   *   page.waitForDevicePrompt(),
   *   page.click('#connect-bluetooth'),
   * ]);
   * await devicePrompt.select(
   *   await devicePrompt.waitForDevice(({name}) => name.includes('My Device')),
   * );
   * ```
   */
  async waitForDevicePrompt(options = {}) {
    return await this.mainFrame().waitForDevicePrompt(options);
  }
};
var supportedMetrics = /* @__PURE__ */ new Set([
  "Timestamp",
  "Documents",
  "Frames",
  "JSEventListeners",
  "Nodes",
  "LayoutCount",
  "RecalcStyleCount",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ScriptDuration",
  "TaskDuration",
  "JSHeapUsedSize",
  "JSHeapTotalSize"
]);
function getIntersectionRect(clip, viewport) {
  const x = Math.max(clip.x, viewport.x);
  const y = Math.max(clip.y, viewport.y);
  return {
    x,
    y,
    width: Math.max(Math.min(clip.x + clip.width, viewport.x + viewport.width) - x, 0),
    height: Math.max(Math.min(clip.y + clip.height, viewport.y + viewport.height) - y, 0)
  };
}
function convertCookiesPartitionKeyFromPuppeteerToCdp(partitionKey) {
  if (partitionKey === void 0) {
    return void 0;
  }
  if (typeof partitionKey === "string") {
    return {
      topLevelSite: partitionKey,
      hasCrossSiteAncestor: false
    };
  }
  return {
    topLevelSite: partitionKey.sourceOrigin,
    hasCrossSiteAncestor: partitionKey.hasCrossSiteAncestor ?? false
  };
}

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/BrowserContext.js
var __addDisposableResource13 = function(env, value, async2) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async2) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async2) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async: async2 });
  } else if (async2) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources13 = /* @__PURE__ */ function(SuppressedError3) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError3(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
}(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var CdpBrowserContext = class extends BrowserContext {
  #connection;
  #browser;
  #id;
  constructor(connection, browser, contextId) {
    super();
    this.#connection = connection;
    this.#browser = browser;
    this.#id = contextId;
  }
  get id() {
    return this.#id;
  }
  targets() {
    return this.#browser.targets().filter((target) => {
      return target.browserContext() === this;
    });
  }
  async pages() {
    const pages = await Promise.all(this.targets().filter((target) => {
      return target.type() === "page" || target.type() === "other" && this.#browser._getIsPageTargetCallback()?.(target);
    }).map((target) => {
      return target.page();
    }));
    return pages.filter((page) => {
      return !!page;
    });
  }
  async overridePermissions(origin, permissions) {
    const protocolPermissions = permissions.map((permission) => {
      const protocolPermission = WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission);
      if (!protocolPermission) {
        throw new Error("Unknown permission: " + permission);
      }
      return protocolPermission;
    });
    await this.#connection.send("Browser.grantPermissions", {
      origin,
      browserContextId: this.#id || void 0,
      permissions: protocolPermissions
    });
  }
  async clearPermissionOverrides() {
    await this.#connection.send("Browser.resetPermissions", {
      browserContextId: this.#id || void 0
    });
  }
  async newPage() {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      const _guard = __addDisposableResource13(env_1, await this.waitForScreenshotOperations(), false);
      return await this.#browser._createPageInContext(this.#id);
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      __disposeResources13(env_1);
    }
  }
  browser() {
    return this.#browser;
  }
  async close() {
    assert(this.#id, "Default BrowserContext cannot be closed!");
    await this.#browser._disposeContext(this.#id);
  }
  async cookies() {
    const { cookies } = await this.#connection.send("Storage.getCookies", {
      browserContextId: this.#id
    });
    return cookies.map((cookie) => {
      return {
        ...cookie,
        partitionKey: cookie.partitionKey ? {
          sourceOrigin: cookie.partitionKey.topLevelSite,
          hasCrossSiteAncestor: cookie.partitionKey.hasCrossSiteAncestor
        } : void 0
      };
    });
  }
  async setCookie(...cookies) {
    return await this.#connection.send("Storage.setCookies", {
      browserContextId: this.#id,
      cookies: cookies.map((cookie) => {
        return {
          ...cookie,
          partitionKey: convertCookiesPartitionKeyFromPuppeteerToCdp(cookie.partitionKey)
        };
      })
    });
  }
  async setDownloadBehavior(downloadBehavior) {
    await this.#connection.send("Browser.setDownloadBehavior", {
      behavior: downloadBehavior.policy,
      downloadPath: downloadBehavior.downloadPath,
      browserContextId: this.#id
    });
  }
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Target.js
var InitializationStatus;
(function(InitializationStatus2) {
  InitializationStatus2["SUCCESS"] = "success";
  InitializationStatus2["ABORTED"] = "aborted";
})(InitializationStatus || (InitializationStatus = {}));
var CdpTarget = class extends Target {
  #browserContext;
  #session;
  #targetInfo;
  #targetManager;
  #sessionFactory;
  #childTargets = /* @__PURE__ */ new Set();
  _initializedDeferred = Deferred.create();
  _isClosedDeferred = Deferred.create();
  _targetId;
  /**
   * To initialize the target for use, call initialize.
   *
   * @internal
   */
  constructor(targetInfo, session, browserContext, targetManager, sessionFactory) {
    super();
    this.#session = session;
    this.#targetManager = targetManager;
    this.#targetInfo = targetInfo;
    this.#browserContext = browserContext;
    this._targetId = targetInfo.targetId;
    this.#sessionFactory = sessionFactory;
    if (this.#session) {
      this.#session.setTarget(this);
    }
  }
  async asPage() {
    const session = this._session();
    if (!session) {
      return await this.createCDPSession().then((client) => {
        return CdpPage._create(client, this, null);
      });
    }
    return await CdpPage._create(session, this, null);
  }
  _subtype() {
    return this.#targetInfo.subtype;
  }
  _session() {
    return this.#session;
  }
  _addChildTarget(target) {
    this.#childTargets.add(target);
  }
  _removeChildTarget(target) {
    this.#childTargets.delete(target);
  }
  _childTargets() {
    return this.#childTargets;
  }
  _sessionFactory() {
    if (!this.#sessionFactory) {
      throw new Error("sessionFactory is not initialized");
    }
    return this.#sessionFactory;
  }
  createCDPSession() {
    if (!this.#sessionFactory) {
      throw new Error("sessionFactory is not initialized");
    }
    return this.#sessionFactory(false).then((session) => {
      session.setTarget(this);
      return session;
    });
  }
  url() {
    return this.#targetInfo.url;
  }
  type() {
    const type = this.#targetInfo.type;
    switch (type) {
      case "page":
        return TargetType.PAGE;
      case "background_page":
        return TargetType.BACKGROUND_PAGE;
      case "service_worker":
        return TargetType.SERVICE_WORKER;
      case "shared_worker":
        return TargetType.SHARED_WORKER;
      case "browser":
        return TargetType.BROWSER;
      case "webview":
        return TargetType.WEBVIEW;
      case "tab":
        return TargetType.TAB;
      default:
        return TargetType.OTHER;
    }
  }
  _targetManager() {
    if (!this.#targetManager) {
      throw new Error("targetManager is not initialized");
    }
    return this.#targetManager;
  }
  _getTargetInfo() {
    return this.#targetInfo;
  }
  browser() {
    if (!this.#browserContext) {
      throw new Error("browserContext is not initialized");
    }
    return this.#browserContext.browser();
  }
  browserContext() {
    if (!this.#browserContext) {
      throw new Error("browserContext is not initialized");
    }
    return this.#browserContext;
  }
  opener() {
    const { openerId } = this.#targetInfo;
    if (!openerId) {
      return;
    }
    return this.browser().targets().find((target) => {
      return target._targetId === openerId;
    });
  }
  _targetInfoChanged(targetInfo) {
    this.#targetInfo = targetInfo;
    this._checkIfInitialized();
  }
  _initialize() {
    this._initializedDeferred.resolve(InitializationStatus.SUCCESS);
  }
  _isTargetExposed() {
    return this.type() !== TargetType.TAB && !this._subtype();
  }
  _checkIfInitialized() {
    if (!this._initializedDeferred.resolved()) {
      this._initializedDeferred.resolve(InitializationStatus.SUCCESS);
    }
  }
};
var PageTarget = class _PageTarget extends CdpTarget {
  #defaultViewport;
  pagePromise;
  constructor(targetInfo, session, browserContext, targetManager, sessionFactory, defaultViewport) {
    super(targetInfo, session, browserContext, targetManager, sessionFactory);
    this.#defaultViewport = defaultViewport ?? void 0;
  }
  _initialize() {
    this._initializedDeferred.valueOrThrow().then(async (result) => {
      if (result === InitializationStatus.ABORTED) {
        return;
      }
      const opener = this.opener();
      if (!(opener instanceof _PageTarget)) {
        return;
      }
      if (!opener || !opener.pagePromise || this.type() !== "page") {
        return true;
      }
      const openerPage = await opener.pagePromise;
      if (!openerPage.listenerCount(
        "popup"
        /* PageEvent.Popup */
      )) {
        return true;
      }
      const popupPage = await this.page();
      openerPage.emit("popup", popupPage);
      return true;
    }).catch(debugError);
    this._checkIfInitialized();
  }
  async page() {
    if (!this.pagePromise) {
      const session = this._session();
      this.pagePromise = (session ? Promise.resolve(session) : this._sessionFactory()(
        /* isAutoAttachEmulated=*/
        false
      )).then((client) => {
        return CdpPage._create(client, this, this.#defaultViewport ?? null);
      });
    }
    return await this.pagePromise ?? null;
  }
  _checkIfInitialized() {
    if (this._initializedDeferred.resolved()) {
      return;
    }
    if (this._getTargetInfo().url !== "") {
      this._initializedDeferred.resolve(InitializationStatus.SUCCESS);
    }
  }
};
var DevToolsTarget = class extends PageTarget {
};
var WorkerTarget = class extends CdpTarget {
  #workerPromise;
  async worker() {
    if (!this.#workerPromise) {
      const session = this._session();
      this.#workerPromise = (session ? Promise.resolve(session) : this._sessionFactory()(
        /* isAutoAttachEmulated=*/
        false
      )).then((client) => {
        return new CdpWebWorker(
          client,
          this._getTargetInfo().url,
          this._targetId,
          this.type(),
          () => {
          },
          () => {
          },
          void 0
          /* networkManager */
        );
      });
    }
    return await this.#workerPromise;
  }
};
var OtherTarget = class extends CdpTarget {
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/TargetManager.js
function isPageTargetBecomingPrimary(target, newTargetInfo) {
  return Boolean(target._subtype()) && !newTargetInfo.subtype;
}
var TargetManager = class extends EventEmitter {
  #connection;
  /**
   * Keeps track of the following events: 'Target.targetCreated',
   * 'Target.targetDestroyed', 'Target.targetInfoChanged'.
   *
   * A target becomes discovered when 'Target.targetCreated' is received.
   * A target is removed from this map once 'Target.targetDestroyed' is
   * received.
   *
   * `targetFilterCallback` has no effect on this map.
   */
  #discoveredTargetsByTargetId = /* @__PURE__ */ new Map();
  /**
   * A target is added to this map once TargetManager has created
   * a Target and attached at least once to it.
   */
  #attachedTargetsByTargetId = /* @__PURE__ */ new Map();
  /**
   * Tracks which sessions attach to which target.
   */
  #attachedTargetsBySessionId = /* @__PURE__ */ new Map();
  /**
   * If a target was filtered out by `targetFilterCallback`, we still receive
   * events about it from CDP, but we don't forward them to the rest of Puppeteer.
   */
  #ignoredTargets = /* @__PURE__ */ new Set();
  #targetFilterCallback;
  #targetFactory;
  #attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap();
  #detachedFromTargetListenersBySession = /* @__PURE__ */ new WeakMap();
  #initializeDeferred = Deferred.create();
  #targetsIdsForInit = /* @__PURE__ */ new Set();
  #waitForInitiallyDiscoveredTargets = true;
  #discoveryFilter = [{}];
  constructor(connection, targetFactory, targetFilterCallback, waitForInitiallyDiscoveredTargets = true) {
    super();
    this.#connection = connection;
    this.#targetFilterCallback = targetFilterCallback;
    this.#targetFactory = targetFactory;
    this.#waitForInitiallyDiscoveredTargets = waitForInitiallyDiscoveredTargets;
    this.#connection.on("Target.targetCreated", this.#onTargetCreated);
    this.#connection.on("Target.targetDestroyed", this.#onTargetDestroyed);
    this.#connection.on("Target.targetInfoChanged", this.#onTargetInfoChanged);
    this.#connection.on(CDPSessionEvent.SessionDetached, this.#onSessionDetached);
    this.#setupAttachmentListeners(this.#connection);
  }
  #storeExistingTargetsForInit = () => {
    if (!this.#waitForInitiallyDiscoveredTargets) {
      return;
    }
    for (const [targetId, targetInfo] of this.#discoveredTargetsByTargetId.entries()) {
      const targetForFilter = new CdpTarget(targetInfo, void 0, void 0, this, void 0);
      const isPageOrFrame = targetInfo.type === "page" || targetInfo.type === "iframe";
      const isExtension = targetInfo.url.startsWith("chrome-extension://");
      if ((!this.#targetFilterCallback || this.#targetFilterCallback(targetForFilter)) && isPageOrFrame && !isExtension) {
        this.#targetsIdsForInit.add(targetId);
      }
    }
  };
  async initialize() {
    await this.#connection.send("Target.setDiscoverTargets", {
      discover: true,
      filter: this.#discoveryFilter
    });
    this.#storeExistingTargetsForInit();
    await this.#connection.send("Target.setAutoAttach", {
      waitForDebuggerOnStart: true,
      flatten: true,
      autoAttach: true,
      filter: [
        {
          type: "page",
          exclude: true
        },
        ...this.#discoveryFilter
      ]
    });
    this.#finishInitializationIfReady();
    await this.#initializeDeferred.valueOrThrow();
  }
  getChildTargets(target) {
    return target._childTargets();
  }
  dispose() {
    this.#connection.off("Target.targetCreated", this.#onTargetCreated);
    this.#connection.off("Target.targetDestroyed", this.#onTargetDestroyed);
    this.#connection.off("Target.targetInfoChanged", this.#onTargetInfoChanged);
    this.#connection.off(CDPSessionEvent.SessionDetached, this.#onSessionDetached);
    this.#removeAttachmentListeners(this.#connection);
  }
  getAvailableTargets() {
    return this.#attachedTargetsByTargetId;
  }
  #setupAttachmentListeners(session) {
    const listener = (event) => {
      void this.#onAttachedToTarget(session, event);
    };
    assert(!this.#attachedToTargetListenersBySession.has(session));
    this.#attachedToTargetListenersBySession.set(session, listener);
    session.on("Target.attachedToTarget", listener);
    const detachedListener = (event) => {
      return this.#onDetachedFromTarget(session, event);
    };
    assert(!this.#detachedFromTargetListenersBySession.has(session));
    this.#detachedFromTargetListenersBySession.set(session, detachedListener);
    session.on("Target.detachedFromTarget", detachedListener);
  }
  #removeAttachmentListeners(session) {
    const listener = this.#attachedToTargetListenersBySession.get(session);
    if (listener) {
      session.off("Target.attachedToTarget", listener);
      this.#attachedToTargetListenersBySession.delete(session);
    }
    if (this.#detachedFromTargetListenersBySession.has(session)) {
      session.off("Target.detachedFromTarget", this.#detachedFromTargetListenersBySession.get(session));
      this.#detachedFromTargetListenersBySession.delete(session);
    }
  }
  #onSessionDetached = (session) => {
    this.#removeAttachmentListeners(session);
  };
  #onTargetCreated = async (event) => {
    this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
    this.emit("targetDiscovered", event.targetInfo);
    if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
      if (this.#attachedTargetsByTargetId.has(event.targetInfo.targetId)) {
        return;
      }
      const target = this.#targetFactory(event.targetInfo, void 0);
      target._initialize();
      this.#attachedTargetsByTargetId.set(event.targetInfo.targetId, target);
    }
  };
  #onTargetDestroyed = (event) => {
    const targetInfo = this.#discoveredTargetsByTargetId.get(event.targetId);
    this.#discoveredTargetsByTargetId.delete(event.targetId);
    this.#finishInitializationIfReady(event.targetId);
    if (targetInfo?.type === "service_worker" && this.#attachedTargetsByTargetId.has(event.targetId)) {
      const target = this.#attachedTargetsByTargetId.get(event.targetId);
      if (target) {
        this.emit("targetGone", target);
        this.#attachedTargetsByTargetId.delete(event.targetId);
      }
    }
  };
  #onTargetInfoChanged = (event) => {
    this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
    if (this.#ignoredTargets.has(event.targetInfo.targetId) || !this.#attachedTargetsByTargetId.has(event.targetInfo.targetId) || !event.targetInfo.attached) {
      return;
    }
    const target = this.#attachedTargetsByTargetId.get(event.targetInfo.targetId);
    if (!target) {
      return;
    }
    const previousURL = target.url();
    const wasInitialized = target._initializedDeferred.value() === InitializationStatus.SUCCESS;
    if (isPageTargetBecomingPrimary(target, event.targetInfo)) {
      const session = target?._session();
      assert(session, "Target that is being activated is missing a CDPSession.");
      session.parentSession()?.emit(CDPSessionEvent.Swapped, session);
    }
    target._targetInfoChanged(event.targetInfo);
    if (wasInitialized && previousURL !== target.url()) {
      this.emit("targetChanged", {
        target,
        wasInitialized,
        previousURL
      });
    }
  };
  #onAttachedToTarget = async (parentSession, event) => {
    const targetInfo = event.targetInfo;
    const session = this.#connection._session(event.sessionId);
    if (!session) {
      throw new Error(`Session ${event.sessionId} was not created.`);
    }
    const silentDetach = async () => {
      await session.send("Runtime.runIfWaitingForDebugger").catch(debugError);
      await parentSession.send("Target.detachFromTarget", {
        sessionId: session.id()
      }).catch(debugError);
    };
    if (!this.#connection.isAutoAttached(targetInfo.targetId)) {
      return;
    }
    if (targetInfo.type === "service_worker") {
      this.#finishInitializationIfReady(targetInfo.targetId);
      await silentDetach();
      if (this.#attachedTargetsByTargetId.has(targetInfo.targetId)) {
        return;
      }
      const target2 = this.#targetFactory(targetInfo);
      target2._initialize();
      this.#attachedTargetsByTargetId.set(targetInfo.targetId, target2);
      this.emit("targetAvailable", target2);
      return;
    }
    const isExistingTarget = this.#attachedTargetsByTargetId.has(targetInfo.targetId);
    const target = isExistingTarget ? this.#attachedTargetsByTargetId.get(targetInfo.targetId) : this.#targetFactory(targetInfo, session, parentSession instanceof CdpCDPSession ? parentSession : void 0);
    if (this.#targetFilterCallback && !this.#targetFilterCallback(target)) {
      this.#ignoredTargets.add(targetInfo.targetId);
      this.#finishInitializationIfReady(targetInfo.targetId);
      await silentDetach();
      return;
    }
    this.#setupAttachmentListeners(session);
    if (isExistingTarget) {
      session.setTarget(target);
      this.#attachedTargetsBySessionId.set(session.id(), this.#attachedTargetsByTargetId.get(targetInfo.targetId));
    } else {
      target._initialize();
      this.#attachedTargetsByTargetId.set(targetInfo.targetId, target);
      this.#attachedTargetsBySessionId.set(session.id(), target);
    }
    const parentTarget = parentSession instanceof CDPSession ? parentSession.target() : null;
    parentTarget?._addChildTarget(target);
    parentSession.emit(CDPSessionEvent.Ready, session);
    this.#targetsIdsForInit.delete(target._targetId);
    if (!isExistingTarget) {
      this.emit("targetAvailable", target);
    }
    this.#finishInitializationIfReady();
    await Promise.all([
      session.send("Target.setAutoAttach", {
        waitForDebuggerOnStart: true,
        flatten: true,
        autoAttach: true,
        filter: this.#discoveryFilter
      }),
      session.send("Runtime.runIfWaitingForDebugger")
    ]).catch(debugError);
  };
  #finishInitializationIfReady(targetId) {
    if (targetId !== void 0) {
      this.#targetsIdsForInit.delete(targetId);
    }
    if (this.#targetsIdsForInit.size === 0) {
      this.#initializeDeferred.resolve();
    }
  }
  #onDetachedFromTarget = (parentSession, event) => {
    const target = this.#attachedTargetsBySessionId.get(event.sessionId);
    this.#attachedTargetsBySessionId.delete(event.sessionId);
    if (!target) {
      return;
    }
    if (parentSession instanceof CDPSession) {
      parentSession.target()._removeChildTarget(target);
    }
    this.#attachedTargetsByTargetId.delete(target._targetId);
    this.emit("targetGone", target);
  };
};

// gen/front_end/third_party/puppeteer/package/lib/esm/puppeteer/cdp/Browser.js
var CdpBrowser = class _CdpBrowser extends Browser {
  protocol = "cdp";
  static async _create(connection, contextIds, acceptInsecureCerts, defaultViewport, downloadBehavior, process3, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets = true, networkEnabled = true, handleDevToolsAsPage = false) {
    const browser = new _CdpBrowser(connection, contextIds, defaultViewport, process3, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets, networkEnabled, handleDevToolsAsPage);
    if (acceptInsecureCerts) {
      await connection.send("Security.setIgnoreCertificateErrors", {
        ignore: true
      });
    }
    await browser._attach(downloadBehavior);
    return browser;
  }
  #defaultViewport;
  #process;
  #connection;
  #closeCallback;
  #targetFilterCallback;
  #isPageTargetCallback;
  #defaultContext;
  #contexts = /* @__PURE__ */ new Map();
  #networkEnabled = true;
  #targetManager;
  #handleDevToolsAsPage = false;
  constructor(connection, contextIds, defaultViewport, process3, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets = true, networkEnabled = true, handleDevToolsAsPage = false) {
    super();
    this.#networkEnabled = networkEnabled;
    this.#defaultViewport = defaultViewport;
    this.#process = process3;
    this.#connection = connection;
    this.#closeCallback = closeCallback || (() => {
    });
    this.#targetFilterCallback = targetFilterCallback || (() => {
      return true;
    });
    this.#handleDevToolsAsPage = handleDevToolsAsPage;
    this.#setIsPageTargetCallback(isPageTargetCallback);
    this.#targetManager = new TargetManager(connection, this.#createTarget, this.#targetFilterCallback, waitForInitiallyDiscoveredTargets);
    this.#defaultContext = new CdpBrowserContext(this.#connection, this);
    for (const contextId of contextIds) {
      this.#contexts.set(contextId, new CdpBrowserContext(this.#connection, this, contextId));
    }
  }
  #emitDisconnected = () => {
    this.emit("disconnected", void 0);
  };
  async _attach(downloadBehavior) {
    this.#connection.on(CDPSessionEvent.Disconnected, this.#emitDisconnected);
    if (downloadBehavior) {
      await this.#defaultContext.setDownloadBehavior(downloadBehavior);
    }
    this.#targetManager.on("targetAvailable", this.#onAttachedToTarget);
    this.#targetManager.on("targetGone", this.#onDetachedFromTarget);
    this.#targetManager.on("targetChanged", this.#onTargetChanged);
    this.#targetManager.on("targetDiscovered", this.#onTargetDiscovered);
    await this.#targetManager.initialize();
  }
  _detach() {
    this.#connection.off(CDPSessionEvent.Disconnected, this.#emitDisconnected);
    this.#targetManager.off("targetAvailable", this.#onAttachedToTarget);
    this.#targetManager.off("targetGone", this.#onDetachedFromTarget);
    this.#targetManager.off("targetChanged", this.#onTargetChanged);
    this.#targetManager.off("targetDiscovered", this.#onTargetDiscovered);
  }
  process() {
    return this.#process ?? null;
  }
  _targetManager() {
    return this.#targetManager;
  }
  #setIsPageTargetCallback(isPageTargetCallback) {
    this.#isPageTargetCallback = isPageTargetCallback || ((target) => {
      return target.type() === "page" || target.type() === "background_page" || target.type() === "webview" || this.#handleDevToolsAsPage && target.type() === "other" && target.url().startsWith("devtools://");
    });
  }
  _getIsPageTargetCallback() {
    return this.#isPageTargetCallback;
  }
  async createBrowserContext(options = {}) {
    const { proxyServer, proxyBypassList, downloadBehavior } = options;
    const { browserContextId } = await this.#connection.send("Target.createBrowserContext", {
      proxyServer,
      proxyBypassList: proxyBypassList && proxyBypassList.join(",")
    });
    const context2 = new CdpBrowserContext(this.#connection, this, browserContextId);
    if (downloadBehavior) {
      await context2.setDownloadBehavior(downloadBehavior);
    }
    this.#contexts.set(browserContextId, context2);
    return context2;
  }
  browserContexts() {
    return [this.#defaultContext, ...Array.from(this.#contexts.values())];
  }
  defaultBrowserContext() {
    return this.#defaultContext;
  }
  async _disposeContext(contextId) {
    if (!contextId) {
      return;
    }
    await this.#connection.send("Target.disposeBrowserContext", {
      browserContextId: contextId
    });
    this.#contexts.delete(contextId);
  }
  #createTarget = (targetInfo, session) => {
    const { browserContextId } = targetInfo;
    const context2 = browserContextId && this.#contexts.has(browserContextId) ? this.#contexts.get(browserContextId) : this.#defaultContext;
    if (!context2) {
      throw new Error("Missing browser context");
    }
    const createSession = (isAutoAttachEmulated) => {
      return this.#connection._createSession(targetInfo, isAutoAttachEmulated);
    };
    const otherTarget = new OtherTarget(targetInfo, session, context2, this.#targetManager, createSession);
    if (targetInfo.url?.startsWith("devtools://")) {
      return new DevToolsTarget(targetInfo, session, context2, this.#targetManager, createSession, this.#defaultViewport ?? null);
    }
    if (this.#isPageTargetCallback(otherTarget)) {
      return new PageTarget(targetInfo, session, context2, this.#targetManager, createSession, this.#defaultViewport ?? null);
    }
    if (targetInfo.type === "service_worker" || targetInfo.type === "shared_worker") {
      return new WorkerTarget(targetInfo, session, context2, this.#targetManager, createSession);
    }
    return otherTarget;
  };
  #onAttachedToTarget = async (target) => {
    if (target._isTargetExposed() && await target._initializedDeferred.valueOrThrow() === InitializationStatus.SUCCESS) {
      this.emit("targetcreated", target);
      target.browserContext().emit("targetcreated", target);
    }
  };
  #onDetachedFromTarget = async (target) => {
    target._initializedDeferred.resolve(InitializationStatus.ABORTED);
    target._isClosedDeferred.resolve();
    if (target._isTargetExposed() && await target._initializedDeferred.valueOrThrow() === InitializationStatus.SUCCESS) {
      this.emit("targetdestroyed", target);
      target.browserContext().emit("targetdestroyed", target);
    }
  };
  #onTargetChanged = ({ target }) => {
    this.emit("targetchanged", target);
    target.browserContext().emit("targetchanged", target);
  };
  #onTargetDiscovered = (targetInfo) => {
    this.emit("targetdiscovered", targetInfo);
  };
  wsEndpoint() {
    return this.#connection.url();
  }
  async newPage() {
    return await this.#defaultContext.newPage();
  }
  async _createPageInContext(contextId) {
    const { targetId } = await this.#connection.send("Target.createTarget", {
      url: "about:blank",
      browserContextId: contextId || void 0
    });
    const target = await this.waitForTarget((t) => {
      return t._targetId === targetId;
    });
    if (!target) {
      throw new Error(`Missing target for page (id = ${targetId})`);
    }
    const initialized = await target._initializedDeferred.valueOrThrow() === InitializationStatus.SUCCESS;
    if (!initialized) {
      throw new Error(`Failed to create target for page (id = ${targetId})`);
    }
    const page = await target.page();
    if (!page) {
      throw new Error(`Failed to create a page for context (id = ${contextId})`);
    }
    return page;
  }
  async installExtension(path) {
    const { id } = await this.#connection.send("Extensions.loadUnpacked", { path });
    return id;
  }
  uninstallExtension(id) {
    return this.#connection.send("Extensions.uninstall", { id });
  }
  targets() {
    return Array.from(this.#targetManager.getAvailableTargets().values()).filter((target) => {
      return target._isTargetExposed() && target._initializedDeferred.value() === InitializationStatus.SUCCESS;
    });
  }
  target() {
    const browserTarget = this.targets().find((target) => {
      return target.type() === "browser";
    });
    if (!browserTarget) {
      throw new Error("Browser target is not found");
    }
    return browserTarget;
  }
  async version() {
    const version = await this.#getVersion();
    return version.product;
  }
  async userAgent() {
    const version = await this.#getVersion();
    return version.userAgent;
  }
  async close() {
    await this.#closeCallback.call(null);
    await this.disconnect();
  }
  disconnect() {
    this.#targetManager.dispose();
    this.#connection.dispose();
    this._detach();
    return Promise.resolve();
  }
  get connected() {
    return !this.#connection._closed;
  }
  #getVersion() {
    return this.#connection.send("Browser.getVersion");
  }
  get debugInfo() {
    return {
      pendingProtocolErrors: this.#connection.getPendingProtocolErrors()
    };
  }
  isNetworkEnabled() {
    return this.#networkEnabled;
  }
};
export {
  CdpBrowser as Browser,
  Connection,
  CdpElementHandle as ElementHandle,
  CdpFrame as Frame,
  CdpPage as Page,
  CdpTarget as Target
};
/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2018 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2019 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=puppeteer.js.map
