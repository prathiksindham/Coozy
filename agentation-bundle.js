(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = /* @__PURE__ */ Symbol.for("react.element");
      var n = /* @__PURE__ */ Symbol.for("react.portal");
      var p = /* @__PURE__ */ Symbol.for("react.fragment");
      var q = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var r = /* @__PURE__ */ Symbol.for("react.profiler");
      var t = /* @__PURE__ */ Symbol.for("react.provider");
      var u = /* @__PURE__ */ Symbol.for("react.context");
      var v = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var w = /* @__PURE__ */ Symbol.for("react.suspense");
      var x = /* @__PURE__ */ Symbol.for("react.memo");
      var y = /* @__PURE__ */ Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = /* @__PURE__ */ Symbol.for("react.element");
      var wa = /* @__PURE__ */ Symbol.for("react.portal");
      var ya = /* @__PURE__ */ Symbol.for("react.fragment");
      var za = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var Aa = /* @__PURE__ */ Symbol.for("react.profiler");
      var Ba = /* @__PURE__ */ Symbol.for("react.provider");
      var Ca = /* @__PURE__ */ Symbol.for("react.context");
      var Da = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var Ea = /* @__PURE__ */ Symbol.for("react.suspense");
      var Fa = /* @__PURE__ */ Symbol.for("react.suspense_list");
      var Ga = /* @__PURE__ */ Symbol.for("react.memo");
      var Ha = /* @__PURE__ */ Symbol.for("react.lazy");
      var Ia = /* @__PURE__ */ Symbol.for("react.offscreen");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = (function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      })(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r) break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r === c && ++l === e && (h = g);
                  r === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r;
                  r = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X) throw Error(p(160));
            Zj(f, g, e);
            X = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = /* @__PURE__ */ Symbol.for("react.element");
      var l = /* @__PURE__ */ Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/agentation/dist/index.mjs
  function getState() {
    if (typeof window === "undefined") {
      return {
        frozen: false,
        installed: true,
        // prevent patching on server
        origSetTimeout: setTimeout,
        origSetInterval: setInterval,
        origRAF: (cb) => 0,
        pausedAnimations: [],
        frozenTimeoutQueue: [],
        frozenRAFQueue: []
      };
    }
    const w = window;
    if (!w[STATE_KEY]) {
      w[STATE_KEY] = {
        frozen: false,
        installed: false,
        origSetTimeout: null,
        origSetInterval: null,
        origRAF: null,
        pausedAnimations: [],
        frozenTimeoutQueue: [],
        frozenRAFQueue: []
      };
    }
    return w[STATE_KEY];
  }
  function isAgentationElement(el) {
    if (!el) return false;
    return EXCLUDE_ATTRS.some((attr) => !!el.closest?.(`[${attr}]`));
  }
  function freeze() {
    if (typeof document === "undefined") return;
    if (_s.frozen) return;
    _s.frozen = true;
    _s.frozenTimeoutQueue = [];
    _s.frozenRAFQueue = [];
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
    }
    style.textContent = `
    *${NOT_SELECTORS},
    *${NOT_SELECTORS}::before,
    *${NOT_SELECTORS}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
    document.head.appendChild(style);
    _s.pausedAnimations = [];
    try {
      document.getAnimations().forEach((anim) => {
        if (anim.playState !== "running") return;
        const target = anim.effect?.target;
        if (!isAgentationElement(target)) {
          anim.pause();
          _s.pausedAnimations.push(anim);
        }
      });
    } catch {
    }
    document.querySelectorAll("video").forEach((video) => {
      if (!video.paused) {
        video.dataset.wasPaused = "false";
        video.pause();
      }
    });
  }
  function unfreeze() {
    if (typeof document === "undefined") return;
    if (!_s.frozen) return;
    _s.frozen = false;
    const timeoutQueue = _s.frozenTimeoutQueue;
    _s.frozenTimeoutQueue = [];
    for (const cb of timeoutQueue) {
      _s.origSetTimeout(() => {
        if (_s.frozen) {
          _s.frozenTimeoutQueue.push(cb);
          return;
        }
        try {
          cb();
        } catch (e) {
          console.warn("[agentation] Error replaying queued timeout:", e);
        }
      }, 0);
    }
    const rafQueue = _s.frozenRAFQueue;
    _s.frozenRAFQueue = [];
    for (const cb of rafQueue) {
      _s.origRAF((ts) => {
        if (_s.frozen) {
          _s.frozenRAFQueue.push(cb);
          return;
        }
        cb(ts);
      });
    }
    for (const anim of _s.pausedAnimations) {
      try {
        anim.play();
      } catch (e) {
        console.warn("[agentation] Error resuming animation:", e);
      }
    }
    _s.pausedAnimations = [];
    document.getElementById(STYLE_ID)?.remove();
    document.querySelectorAll("video").forEach((video) => {
      if (video.dataset.wasPaused === "false") {
        video.play().catch(() => {
        });
        delete video.dataset.wasPaused;
      }
    });
  }
  function focusBypassingTraps(el) {
    if (!el) return;
    const trap = (e) => e.stopImmediatePropagation();
    document.addEventListener("focusin", trap, true);
    document.addEventListener("focusout", trap, true);
    try {
      el.focus();
    } finally {
      document.removeEventListener("focusin", trap, true);
      document.removeEventListener("focusout", trap, true);
    }
  }
  function Bar({ w, h = 3, strong }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        style: {
          width: typeof w === "number" ? `${w}px` : w,
          height: h,
          borderRadius: 2,
          background: strong ? "var(--agd-bar-strong)" : "var(--agd-bar)",
          flexShrink: 0
        }
      }
    );
  }
  function Block({
    w,
    h,
    radius = 3,
    style
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        style: {
          width: typeof w === "number" ? `${w}px` : w,
          height: typeof h === "number" ? `${h}px` : h,
          borderRadius: radius,
          border: "1px dashed var(--agd-stroke)",
          background: "var(--agd-fill)",
          flexShrink: 0,
          ...style
        }
      }
    );
  }
  function Circle({ size }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        style: {
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1px dashed var(--agd-stroke)",
          background: "var(--agd-fill)",
          flexShrink: 0
        }
      }
    );
  }
  function NavigationSkeleton({ width, height }) {
    const pad = Math.max(8, height * 0.2);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", height: "100%", padding: `0 ${pad}px`, gap: width * 0.02 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: Math.max(20, height * 0.5), h: Math.max(12, height * 0.4), radius: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", gap: width * 0.03, marginLeft: width * 0.04 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.06 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.07 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.05 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.06 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: width * 0.1, h: Math.min(28, height * 0.5), radius: 4 })
    ] });
  }
  function HeroSkeleton({ width, height, text }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: height * 0.05 }, children: [
      text ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: Math.min(20, height * 0.08), fontWeight: 600, color: "var(--agd-text-3)", textAlign: "center", maxWidth: "80%" }, children: text }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5, h: Math.max(6, height * 0.04), strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.6 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: Math.min(140, width * 0.2), h: Math.min(36, height * 0.12), radius: 6, style: { marginTop: height * 0.06 } })
    ] });
  }
  function SidebarSkeleton({ width, height }) {
    const items = Math.max(3, Math.floor(height / 36));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { padding: width * 0.08, display: "flex", flexDirection: "column", gap: height * 0.03 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.6, h: 4, strong: true }),
      Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: 10, h: 10, radius: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * (0.4 + i * 17 % 30 / 100) })
      ] }, i))
    ] });
  }
  function FooterSkeleton({ width, height }) {
    const cols = Math.max(2, Math.min(4, Math.floor(width / 160)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", padding: `${height * 0.12}px ${width * 0.03}px`, gap: width * 0.05 }, children: Array.from({ length: cols }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 3, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "80%", h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "70%", h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 2 })
    ] }, i)) });
  }
  function ModalSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { padding: "10px 12px", borderBottom: "1px solid var(--agd-stroke)", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 4, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 14, height: 14, border: "1px solid var(--agd-stroke)", borderRadius: 3 } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "90%" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "70%" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "80%" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { padding: "10px 12px", borderTop: "1px solid var(--agd-stroke)", display: "flex", justifyContent: "flex-end", gap: 8 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: 70, h: 26, radius: 4 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: 70, h: 26, radius: 4, style: { background: "var(--agd-bar)" } })
      ] })
    ] });
  }
  function CardSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { height: "40%", background: "var(--agd-fill)", borderBottom: "1px dashed var(--agd-stroke)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 5 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "70%", h: 4, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "95%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "85%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "50%", h: 2 })
      ] })
    ] });
  }
  function TextSkeleton({ width, height, text }) {
    if (text) {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { padding: 4, fontSize: Math.min(14, height * 0.3), lineHeight: 1.5, color: "var(--agd-text-3)", wordBreak: "break-word", overflow: "hidden" }, children: text });
    }
    const lines = Math.max(2, Math.floor(height / 18));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 6, padding: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.6, h: 5, strong: true }),
      Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${70 + i * 13 % 25}%`, h: 2 }, i))
    ] });
  }
  function ImageSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { height: "100%", position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, preserveAspectRatio: "none", fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: "0", y1: "0", x2: width, y2: height, stroke: "var(--agd-stroke)", strokeWidth: "1" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: width, y1: "0", x2: "0", y2: height, stroke: "var(--agd-stroke)", strokeWidth: "1" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width * 0.3, cy: height * 0.3, r: Math.min(width, height) * 0.08, fill: "var(--agd-fill)", stroke: "var(--agd-stroke)", strokeWidth: "0.8" })
    ] }) });
  }
  function TableSkeleton({ width, height }) {
    const cols = Math.max(2, Math.min(5, Math.floor(width / 100)));
    const rows = Math.max(2, Math.min(6, Math.floor(height / 32)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", borderBottom: "1px solid var(--agd-stroke)", padding: "6px 0" }, children: Array.from({ length: cols }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, padding: "0 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "70%", h: 3, strong: true }) }, i)) }),
      Array.from({ length: rows }, (_, r) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", borderBottom: "1px solid rgba(255,255,255,0.03)", padding: "6px 0" }, children: Array.from({ length: cols }, (_2, c) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, padding: "0 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${50 + (r * 7 + c * 13) % 40}%`, h: 2 }) }, c)) }, r))
    ] });
  }
  function ListSkeleton({ width, height }) {
    const items = Math.max(2, Math.floor(height / 28));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 4, padding: 4 }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 8 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${55 + i * 17 % 35}%`, h: 2 })
    ] }, i)) });
  }
  function ButtonSkeleton({ width, height, text }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
      height: "100%",
      borderRadius: Math.min(8, height / 3),
      border: "1px solid var(--agd-stroke)",
      background: "var(--agd-fill)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: text ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: Math.min(13, height * 0.4), fontWeight: 500, color: "var(--agd-text-3)", letterSpacing: "-0.01em" }, children: text }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: Math.max(20, width * 0.5), h: 3, strong: true }) });
  }
  function InputSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 4, height: "100%", justifyContent: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: Math.min(80, width * 0.3), h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
        height: Math.min(36, height * 0.6),
        borderRadius: 4,
        border: "1px dashed var(--agd-stroke)",
        background: "var(--agd-fill)",
        display: "flex",
        alignItems: "center",
        paddingLeft: 8
      }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "40%", h: 2 }) })
    ] });
  }
  function FormSkeleton({ width, height }) {
    const fields = Math.max(2, Math.min(5, Math.floor(height / 56)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: height * 0.04, padding: 8 }, children: [
      Array.from({ length: fields }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 60 + i * 17 % 30, h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: 28, radius: 4 })
      ] }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: Math.min(120, width * 0.35), h: 30, radius: 6, style: { marginTop: 8, alignSelf: "flex-end", background: "var(--agd-bar)" } })
    ] });
  }
  function TabsSkeleton({ width, height }) {
    const tabCount = Math.max(2, Math.min(4, Math.floor(width / 120)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", gap: 2, borderBottom: "1px solid var(--agd-stroke)" }, children: Array.from({ length: tabCount }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { padding: "8px 12px", borderBottom: i === 0 ? "2px solid var(--agd-bar-strong)" : "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 60, h: 3, strong: i === 0 }) }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "80%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "65%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "75%", h: 2 })
      ] })
    ] });
  }
  function AvatarSkeleton({ width, height }) {
    const r = Math.min(width, height) / 2;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width / 2, cy: height / 2, r: r - 1, stroke: "var(--agd-stroke)", fill: "var(--agd-fill)", strokeWidth: "1.5", strokeDasharray: "3 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width / 2, cy: height * 0.38, r: r * 0.28, stroke: "var(--agd-stroke)", fill: "var(--agd-fill)", strokeWidth: "0.8" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: `M${width / 2 - r * 0.55} ${height * 0.78} C${width / 2 - r * 0.55} ${height * 0.55} ${width / 2 + r * 0.55} ${height * 0.55} ${width / 2 + r * 0.55} ${height * 0.78}`,
          stroke: "var(--agd-stroke)",
          fill: "var(--agd-fill)",
          strokeWidth: "0.8"
        }
      )
    ] });
  }
  function BadgeSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
      height: "100%",
      borderRadius: height / 2,
      border: "1px solid var(--agd-stroke)",
      background: "var(--agd-fill)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: Math.max(16, width * 0.5), h: 2, strong: true }) });
  }
  function HeaderSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: height * 0.08 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5, h: Math.max(5, height * 0.06), strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.35 })
    ] });
  }
  function SectionSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", height: "100%", gap: height * 0.04, padding: width * 0.04 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 4, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.7 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", gap: width * 0.03, marginTop: height * 0.06 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "33%", h: "100%", radius: 4 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "33%", h: "100%", radius: 4 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "33%", h: "100%", radius: 4 })
      ] })
    ] });
  }
  function GridSkeleton({ width, height }) {
    const cols = Math.max(2, Math.min(4, Math.floor(width / 140)));
    const rows = Math.max(1, Math.min(3, Math.floor(height / 120)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 6, height: "100%" }, children: Array.from({ length: cols * rows }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: "100%", radius: 4 }, i)) });
  }
  function DropdownSkeleton({ width, height }) {
    const items = Math.max(2, Math.floor((height - 32) / 28));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { padding: "6px 8px", borderBottom: "1px solid var(--agd-stroke)" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5, h: 3, strong: true }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, padding: 4, display: "flex", flexDirection: "column", gap: 2 }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { padding: "4px 6px", borderRadius: 3, background: i === 0 ? "var(--agd-fill)" : "transparent" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${50 + i * 17 % 35}%`, h: 2, strong: i === 0 }) }, i)) })
    ] });
  }
  function ToggleSkeleton({ width, height }) {
    const r = Math.min(width, height) / 2;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "1", y: "1", width: width - 2, height: height - 2, rx: r, stroke: "var(--agd-stroke)", strokeWidth: "1" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width - r, cy: height / 2, r: r * 0.7, fill: "var(--agd-bar)" })
    ] });
  }
  function SearchSkeleton({ width, height }) {
    const r = Math.min(height / 2, 20);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: r, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", padding: `0 ${r * 0.6}px`, gap: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: Math.min(14, height * 0.4) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "50%", h: 2 })
    ] });
  }
  function ToastSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: 8, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: Math.min(20, height * 0.5) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 3 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "80%", h: 2 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 14, height: 14, border: "1px solid var(--agd-stroke)", borderRadius: 3, flexShrink: 0 } })
    ] });
  }
  function ProgressSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "0", y: "0", width, height, rx: height / 2, stroke: "var(--agd-stroke)", strokeWidth: "0.8" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "1", y: "1", width: width * 0.65, height: height - 2, rx: (height - 2) / 2, fill: "var(--agd-bar)" })
    ] });
  }
  function ChartSkeleton({ width, height }) {
    const bars = Math.max(3, Math.min(7, Math.floor(width / 50)));
    const barW = width / (bars * 2);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "0 4px", borderBottom: "1px solid var(--agd-stroke)" }, children: Array.from({ length: bars }, (_, i) => {
      const h = 30 + (i * 37 + 17) % 55;
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: barW, h: `${h}%`, radius: 2 }, i);
    }) });
  }
  function VideoSkeleton({ width, height }) {
    const btnR = Math.min(width, height) * 0.12;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: "100%", radius: 4 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { position: "absolute", width: btnR * 2, height: btnR * 2, borderRadius: "50%", border: "1.5px solid var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 0, height: 0, borderLeft: `${btnR * 0.6}px solid var(--agd-bar-strong)`, borderTop: `${btnR * 0.4}px solid transparent`, borderBottom: `${btnR * 0.4}px solid transparent`, marginLeft: btnR * 0.15 } }) })
    ] });
  }
  function TooltipSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, width: "100%", borderRadius: 6, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 2 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 8, height: 8, background: "var(--agd-fill)", border: "1px dashed var(--agd-stroke)", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", marginTop: -5 } })
    ] });
  }
  function BreadcrumbSkeleton({ width, height }) {
    const items = Math.max(2, Math.min(4, Math.floor(width / 80)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", height: "100%", gap: 4 }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      i > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { color: "var(--agd-stroke)", fontSize: 10 }, children: "/" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 40 + i * 13 % 20, h: 2, strong: i === items - 1 })
    ] }, i)) });
  }
  function PaginationSkeleton({ width, height }) {
    const count = Math.max(3, Math.min(5, Math.floor(width / 40)));
    const sz = Math.min(28, height * 0.8);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: 4 }, children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: sz, h: sz, radius: 4, style: i === 1 ? { background: "var(--agd-bar)" } : void 0 }, i)) });
  }
  function DividerSkeleton({ width }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", height: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", height: 1, background: "var(--agd-stroke)" } }) });
  }
  function AccordionSkeleton({ width, height }) {
    const items = Math.max(2, Math.min(4, Math.floor(height / 40)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", flexDirection: "column", height: "100%" }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { borderBottom: "1px solid var(--agd-stroke)", padding: "8px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: i === 0 ? 2 : 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${40 + i * 17 % 25}%`, h: 3, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 8, color: "var(--agd-stroke)" }, children: i === 0 ? "\u25BC" : "\u25B6" })
    ] }, i)) });
  }
  function CarouselSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", gap: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", gap: 6, alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 12, color: "var(--agd-stroke)" }, children: "\u2039" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: "100%", radius: 4 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 12, color: "var(--agd-stroke)" }, children: "\u203A" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", justifyContent: "center", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 5 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 5 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 5 })
      ] })
    ] });
  }
  function PricingSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: 10, gap: height * 0.04 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4, h: 3, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 6, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 4, width: "100%", padding: "8px 0" }, children: Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 5 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${50 + i * 17 % 35}%`, h: 2 })
      ] }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: width * 0.7, h: Math.min(32, height * 0.1), radius: 6, style: { background: "var(--agd-bar)" } })
    ] });
  }
  function TestimonialSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", padding: 10, gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 18, lineHeight: 1, color: "var(--agd-stroke)", fontFamily: "serif" }, children: "\u201C" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "90%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "75%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 2 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 20 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 60, h: 3, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 40, h: 2 })
        ] })
      ] })
    ] });
  }
  function CtaSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: height * 0.08 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5, h: Math.max(4, height * 0.05), strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.35 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: Math.min(140, width * 0.25), h: Math.min(32, height * 0.15), radius: 6, style: { marginTop: height * 0.04, background: "var(--agd-bar)" } })
    ] });
  }
  function AlertSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: 6, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 16, height: 16, borderRadius: "50%", border: "1.5px solid var(--agd-bar-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 2, height: 6, background: "var(--agd-bar-strong)", borderRadius: 1 } }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 3 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "40%", h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "70%", h: 2 })
      ] })
    ] });
  }
  function BannerSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", background: "var(--agd-fill)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 12px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4, h: 3, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: 60, h: Math.min(24, height * 0.6), radius: 4 })
    ] });
  }
  function StatSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: height * 0.06 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5, h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4, h: Math.max(8, height * 0.18), strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 2 })
    ] });
  }
  function StepperSkeleton({ width, height }) {
    const steps = Math.max(3, Math.min(5, Math.floor(width / 100)));
    const dotR = Math.min(12, height * 0.35);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", padding: "0 8px" }, children: Array.from({ length: steps }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 0, flex: 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: dotR, height: dotR, borderRadius: "50%", border: "1.5px solid var(--agd-stroke)", background: i === 0 ? "var(--agd-bar)" : "transparent", flexShrink: 0 } }),
      i < steps - 1 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, height: 1, background: "var(--agd-stroke)", margin: "0 4px" } })
    ] }, i)) });
  }
  function TagSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: 4, border: "1px solid var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "0 6px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: Math.max(16, width * 0.5), h: 2, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 8, height: 8, borderRadius: "50%", border: "1px solid var(--agd-stroke)", flexShrink: 0 } })
    ] });
  }
  function RatingSkeleton({ width, height }) {
    const stars = 5;
    const sz = Math.min(height * 0.7, width / (stars * 1.5));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: sz * 0.2 }, children: Array.from({ length: stars }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: sz, height: sz, viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M8 1.5l2 4 4.5.7-3.25 3.1.75 4.5L8 11.4l-4 2.4.75-4.5L1.5 6.2 6 5.5z", stroke: "var(--agd-stroke)", strokeWidth: "0.8", fill: i < 3 ? "var(--agd-bar)" : "none" }) }, i)) });
  }
  function MapSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", position: "relative", borderRadius: 4, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", overflow: "hidden" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", style: { position: "absolute", inset: 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: 0, y1: height * 0.3, x2: width, y2: height * 0.7, stroke: "var(--agd-stroke)", strokeWidth: "0.5", opacity: ".2" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: 0, y1: height * 0.6, x2: width, y2: height * 0.2, stroke: "var(--agd-stroke)", strokeWidth: "0.5", opacity: ".15" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: width * 0.4, y1: 0, x2: width * 0.6, y2: height, stroke: "var(--agd-stroke)", strokeWidth: "0.5", opacity: ".15" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -100%)" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "16", height: "22", viewBox: "0 0 16 22", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z", fill: "var(--agd-bar)", opacity: ".4" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "8", cy: "8", r: "3", fill: "var(--agd-fill)" })
      ] }) })
    ] });
  }
  function TimelineSkeleton({ width, height }) {
    const items = Math.max(3, Math.min(5, Math.floor(height / 60)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", height: "100%", padding: "8px 0" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 16, display: "flex", flexDirection: "column", alignItems: "center" }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 8 }),
        i < items - 1 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, width: 1, background: "var(--agd-stroke)" } })
      ] }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around", paddingLeft: 8 }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${35 + i * 13 % 25}%`, h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${50 + i * 17 % 30}%`, h: 2 })
      ] }, i)) })
    ] });
  }
  function FileUploadSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: 8, border: "2px dashed var(--agd-stroke)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: height * 0.06 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M12 16V4m0 0l-4 4m4-4l4 4", stroke: "var(--agd-stroke)", strokeWidth: "1.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2", stroke: "var(--agd-stroke)", strokeWidth: "1.5" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4, h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.25, h: 2 })
    ] });
  }
  function CodeBlockSkeleton({ width, height }) {
    const lines = Math.max(3, Math.min(8, Math.floor(height / 20)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: 6, background: "var(--agd-fill)", border: "1px solid var(--agd-stroke)", padding: 8, display: "flex", flexDirection: "column", gap: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: 3, marginBottom: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 6 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 6 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: 6 })
      ] }),
      Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", gap: 6, paddingLeft: i > 0 && i < lines - 1 ? 12 : 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${25 + i * 23 % 50}%`, h: 2, strong: i === 0 }) }, i))
    ] });
  }
  function CalendarSkeleton({ width, height }) {
    const cols = 7;
    const rows = 5;
    const cellSz = Math.min((width - 16) / cols, (height - 40) / (rows + 1));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 8, color: "var(--agd-stroke)" }, children: "\u2039" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 8, color: "var(--agd-stroke)" }, children: "\u203A" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2, padding: "0 4px", flex: 1 }, children: [
        Array.from({ length: cols }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: cellSz * 0.6 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: cellSz * 0.5, h: 2 }) }, `h${i}`)),
        Array.from({ length: cols * rows }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: cellSz }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: cellSz * 0.6, height: cellSz * 0.6, borderRadius: "50%", background: i === 12 ? "var(--agd-bar)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 2, height: 2, borderRadius: 1, background: "var(--agd-bar-strong)", opacity: i === 12 ? 1 : 0.3 } }) }) }, i))
      ] })
    ] });
  }
  function NotificationSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", borderRadius: 8, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: Math.min(32, height * 0.55) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 3 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "50%", h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "75%", h: 2 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 30, h: 2 })
    ] });
  }
  function ProductCardSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { height: "50%", background: "var(--agd-fill)", borderBottom: "1px dashed var(--agd-stroke)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 5 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "65%", h: 4, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "40%", h: 3 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "30%", h: 5, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: Math.min(70, width * 0.3), h: 26, radius: 4, style: { background: "var(--agd-bar)" } })
        ] })
      ] })
    ] });
  }
  function ProfileSkeleton({ width, height }) {
    const avatarSz = Math.min(48, height * 0.3);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: height * 0.06 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: avatarSz }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.45, h: 4, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: width * 0.08, marginTop: height * 0.04 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 20, h: 3, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 28, h: 2 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 20, h: 3, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 28, h: 2 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 20, h: 3, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 28, h: 2 })
        ] })
      ] })
    ] });
  }
  function DrawerSkeleton({ width, height }) {
    const panelW = Math.max(width * 0.6, 80);
    const items = Math.max(3, Math.floor(height / 40));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: width - panelW, background: "var(--agd-fill)", opacity: 0.3 } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, borderLeft: "1px solid var(--agd-stroke)", display: "flex", flexDirection: "column", padding: width * 0.04 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: height * 0.06 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: panelW * 0.4, h: 4, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 12, height: 12, border: "1px solid var(--agd-stroke)", borderRadius: 3 } })
        ] }),
        Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { padding: "6px 0" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${50 + i * 17 % 35}%`, h: 2, strong: i === 0 }) }, i))
      ] })
    ] });
  }
  function PopoverSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, width: "100%", borderRadius: 8, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", padding: 10, display: "flex", flexDirection: "column", gap: 5 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "70%", h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "90%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 2 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 10, height: 10, background: "var(--agd-fill)", border: "1px dashed var(--agd-stroke)", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", marginTop: -6 } })
    ] });
  }
  function LogoSkeleton({ width, height }) {
    const iconSz = Math.min(height * 0.7, width * 0.3);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", alignItems: "center", gap: width * 0.08 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: iconSz, h: iconSz, radius: iconSz * 0.25 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.45, h: Math.max(4, height * 0.2), strong: true })
    ] });
  }
  function FaqSkeleton({ width, height }) {
    const items = Math.max(2, Math.min(5, Math.floor(height / 56)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", flexDirection: "column", height: "100%" }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { borderBottom: "1px solid var(--agd-stroke)", padding: "8px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: i === 0 ? 2 : 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 9, fontWeight: 700, color: "var(--agd-stroke)" }, children: "Q" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * (0.3 + i * 13 % 25 / 100), h: 3, strong: true })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 8, color: "var(--agd-stroke)" }, children: i === 0 ? "\u25BC" : "\u25B6" })
    ] }, i)) });
  }
  function GallerySkeleton({ width, height }) {
    const cols = Math.max(2, Math.min(4, Math.floor(width / 120)));
    const rows = Math.max(1, Math.min(3, Math.floor(height / 120)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 4, height: "100%" }, children: Array.from({ length: cols * rows }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { borderRadius: 4, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: "0 0 100 100", preserveAspectRatio: "none", fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: "0", y1: "0", x2: "100", y2: "100", stroke: "var(--agd-stroke)", strokeWidth: "0.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: "100", y1: "0", x2: "0", y2: "100", stroke: "var(--agd-stroke)", strokeWidth: "0.5" })
    ] }) }, i)) });
  }
  function CheckboxSkeleton({ width, height }) {
    const sz = Math.min(width, height);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "1", y: (height - sz + 2) / 2, width: sz - 2, height: sz - 2, rx: sz * 0.15, stroke: "var(--agd-stroke)", strokeWidth: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M${sz * 0.25} ${height / 2}l${sz * 0.2} ${sz * 0.2} ${sz * 0.3}-${sz * 0.35}`, stroke: "var(--agd-bar)", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  function RadioSkeleton({ width, height }) {
    const r = Math.min(width, height) / 2 - 1;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width / 2, cy: height / 2, r, stroke: "var(--agd-stroke)", strokeWidth: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width / 2, cy: height / 2, r: r * 0.45, fill: "var(--agd-bar)" })
    ] });
  }
  function SliderSkeleton({ width, height }) {
    const trackH = Math.max(2, height * 0.12);
    const thumbR = Math.min(height * 0.35, 10);
    const fillW = width * 0.55;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", alignItems: "center", position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", height: trackH, borderRadius: trackH / 2, background: "var(--agd-fill)", border: "1px solid var(--agd-stroke)", position: "relative" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: fillW, height: "100%", borderRadius: trackH / 2, background: "var(--agd-bar)" } }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { position: "absolute", left: fillW - thumbR, width: thumbR * 2, height: thumbR * 2, borderRadius: "50%", border: "1.5px solid var(--agd-stroke)", background: "var(--agd-fill)" } })
    ] });
  }
  function DatePickerSkeleton({ width, height }) {
    const inputH = Math.min(36, height * 0.15);
    const cols = 7;
    const rows = 4;
    const cellSz = Math.min((width - 16) / cols, (height - inputH - 40) / (rows + 1));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", gap: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: inputH, borderRadius: 4, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", padding: "0 8px", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "40%", h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "2", y: "3", width: "12", height: "11", rx: "1", stroke: "var(--agd-stroke)", strokeWidth: "1" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: "2", y1: "6", x2: "14", y2: "6", stroke: "var(--agd-stroke)", strokeWidth: "0.5" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, borderRadius: 6, border: "1px dashed var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 6px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 7, color: "var(--agd-stroke)" }, children: "\u2039" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.25, h: 2, strong: true }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 7, color: "var(--agd-stroke)" }, children: "\u203A" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1, padding: "0 4px", flex: 1 }, children: Array.from({ length: cols * rows }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: cellSz }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: cellSz * 0.5, height: cellSz * 0.5, borderRadius: "50%", background: i === 10 ? "var(--agd-bar)" : "transparent" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: 1.5, height: 1.5, borderRadius: 1, background: "var(--agd-bar-strong)", opacity: i === 10 ? 1 : 0.25 } }) }) }) }, i)) })
      ] })
    ] });
  }
  function SkeletonSkeletonRenderer({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", gap: height * 0.08, padding: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", height: height * 0.2, borderRadius: 4, background: "var(--agd-fill)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "70%", height: Math.max(6, height * 0.1), borderRadius: 3, background: "var(--agd-fill)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "90%", height: Math.max(4, height * 0.06), borderRadius: 3, background: "var(--agd-fill)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "50%", height: Math.max(4, height * 0.06), borderRadius: 3, background: "var(--agd-fill)" } })
    ] });
  }
  function ChipSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { height: "100%", display: "flex", alignItems: "center", gap: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", flex: 1, borderRadius: height / 2, border: "1px solid var(--agd-stroke)", background: "var(--agd-fill)", display: "flex", alignItems: "center", padding: `0 ${height * 0.3}px`, gap: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: "60%", h: 2, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: Math.max(6, height * 0.3), height: Math.max(6, height * 0.3), borderRadius: "50%", border: "1px solid var(--agd-stroke)", flexShrink: 0, marginLeft: "auto" } })
    ] }) });
  }
  function IconSkeleton({ width, height }) {
    const sz = Math.min(width, height);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "path",
      {
        d: `M${width / 2} ${(height - sz) / 2 + sz * 0.1}l${sz * 0.12} ${sz * 0.25} ${sz * 0.28} ${sz * 0.04}-${sz * 0.2} ${sz * 0.2} ${sz * 0.05} ${sz * 0.28}-${sz * 0.25}-${sz * 0.12}-${sz * 0.25} ${sz * 0.12} ${sz * 0.05}-${sz * 0.28}-${sz * 0.2}-${sz * 0.2} ${sz * 0.28}-${sz * 0.04}z`,
        stroke: "var(--agd-stroke)",
        strokeWidth: "1",
        fill: "var(--agd-fill)"
      }
    ) });
  }
  function SpinnerSkeleton({ width, height }) {
    const r = Math.min(width, height) / 2 - 2;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "100%", height: "100%", viewBox: `0 0 ${width} ${height}`, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: width / 2, cy: height / 2, r, stroke: "var(--agd-stroke)", strokeWidth: "1.5", opacity: ".2" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: `M${width / 2} ${height / 2 - r}a${r} ${r} 0 0 1 ${r} ${r}`, stroke: "var(--agd-bar-strong)", strokeWidth: "1.5", strokeLinecap: "round" })
    ] });
  }
  function FeatureSkeleton({ width, height }) {
    const iconSz = Math.min(36, height * 0.25, width * 0.12);
    const items = Math.max(1, Math.min(3, Math.floor(height / 80)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-around", padding: 8 }, children: Array.from({ length: items }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: width * 0.04, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: iconSz, h: iconSz, radius: iconSz * 0.25 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${40 + i * 13 % 20}%`, h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: `${60 + i * 17 % 25}%`, h: 2 })
      ] })
    ] }, i)) });
  }
  function TeamSkeleton({ width, height }) {
    const cols = Math.max(2, Math.min(4, Math.floor(width / 120)));
    const avatarSz = Math.min(36, height * 0.25);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: height * 0.06, padding: height * 0.06 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.3, h: 4, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { display: "flex", gap: width * 0.06, justifyContent: "center", flex: 1, alignItems: "center" }, children: Array.from({ length: cols }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Circle, { size: avatarSz }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.12, h: 3, strong: true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.08, h: 2 })
      ] }, i)) })
    ] });
  }
  function LoginSkeleton({ width, height }) {
    const fields = Math.max(2, Math.min(3, Math.floor(height / 80)));
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: width * 0.06, gap: height * 0.04 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.5, h: Math.max(5, height * 0.04), strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.35, h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", display: "flex", flexDirection: "column", gap: height * 0.03, marginTop: height * 0.04 }, children: Array.from({ length: fields }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: Math.min(60, width * 0.2), h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: Math.min(32, height * 0.1), radius: 4 })
      ] }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: Math.min(36, height * 0.12), radius: 6, style: { marginTop: height * 0.03, background: "var(--agd-bar)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4, h: 2 })
    ] });
  }
  function ContactSkeleton({ width, height }) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { height: "100%", display: "flex", flexDirection: "column", padding: width * 0.04, gap: height * 0.03 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.4, h: 4, strong: true }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: width * 0.6, h: 2 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: 6, marginTop: height * 0.03 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 3 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 50, h: 2 }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: Math.min(28, height * 0.1), radius: 4 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 3 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 40, h: 2 }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: Math.min(28, height * 0.1), radius: 4 })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 50, h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: Math.min(28, height * 0.1), radius: 4 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 3, flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Bar, { w: 60, h: 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: "100%", h: "100%", radius: 4 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Block, { w: Math.min(120, width * 0.3), h: Math.min(30, height * 0.1), radius: 6, style: { alignSelf: "flex-end", background: "var(--agd-bar)" } })
    ] });
  }
  function Skeleton({ type, width, height, text }) {
    const Renderer = SKELETON_RENDERERS[type];
    if (!Renderer) {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { fontSize: 10, fontWeight: 600, color: "var(--agd-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.5 }, children: type }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { width: "100%", height: "100%", padding: 8, position: "relative", pointerEvents: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Renderer, { width, height, text }) });
  }
  function computeSnap(rect, others, excludeIds, activeEdges, extraRects) {
    let bestDx = Infinity;
    let bestDy = Infinity;
    const mL = rect.x, mR = rect.x + rect.width, mCx = rect.x + rect.width / 2;
    const mT = rect.y, mB = rect.y + rect.height, mCy = rect.y + rect.height / 2;
    const checkAll = !activeEdges;
    const xFroms = checkAll ? [mL, mR, mCx] : [
      ...activeEdges.left ? [mL] : [],
      ...activeEdges.right ? [mR] : []
    ];
    const yFroms = checkAll ? [mT, mB, mCy] : [
      ...activeEdges.top ? [mT] : [],
      ...activeEdges.bottom ? [mB] : []
    ];
    const allTargets = [];
    for (const o of others) {
      if (!excludeIds.has(o.id)) allTargets.push(o);
    }
    if (extraRects) allTargets.push(...extraRects);
    for (const o of allTargets) {
      const oL = o.x, oR = o.x + o.width, oCx = o.x + o.width / 2;
      const oT = o.y, oB = o.y + o.height, oCy = o.y + o.height / 2;
      for (const from of xFroms) {
        for (const to of [oL, oR, oCx]) {
          const d = to - from;
          if (Math.abs(d) < SNAP_THRESHOLD && Math.abs(d) < Math.abs(bestDx)) bestDx = d;
        }
      }
      for (const from of yFroms) {
        for (const to of [oT, oB, oCy]) {
          const d = to - from;
          if (Math.abs(d) < SNAP_THRESHOLD && Math.abs(d) < Math.abs(bestDy)) bestDy = d;
        }
      }
    }
    const dx = Math.abs(bestDx) < SNAP_THRESHOLD ? bestDx : 0;
    const dy = Math.abs(bestDy) < SNAP_THRESHOLD ? bestDy : 0;
    const guides = [];
    const seen = /* @__PURE__ */ new Set();
    const sL = mL + dx, sR = mR + dx, sCx = mCx + dx;
    const sT = mT + dy, sB = mB + dy, sCy = mCy + dy;
    for (const o of allTargets) {
      const oL = o.x, oR = o.x + o.width, oCx = o.x + o.width / 2;
      const oT = o.y, oB = o.y + o.height, oCy = o.y + o.height / 2;
      for (const xPos of [oL, oCx, oR]) {
        for (const sx of [sL, sCx, sR]) {
          if (Math.abs(sx - xPos) < 0.5) {
            const key = `x:${Math.round(xPos)}`;
            if (!seen.has(key)) {
              seen.add(key);
              guides.push({ axis: "x", pos: xPos });
            }
          }
        }
      }
      for (const yPos of [oT, oCy, oB]) {
        for (const sy of [sT, sCy, sB]) {
          if (Math.abs(sy - yPos) < 0.5) {
            const key = `y:${Math.round(yPos)}`;
            if (!seen.has(key)) {
              seen.add(key);
              guides.push({ axis: "y", pos: yPos });
            }
          }
        }
      }
    }
    return { dx, dy, guides };
  }
  function generateId() {
    return `dp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }
  function DesignMode({
    placements,
    onChange,
    activeComponent,
    onActiveComponentChange,
    isDarkMode,
    exiting,
    onInteractionChange,
    className: extraClassName,
    passthrough,
    extraSnapRects,
    onSelectionChange,
    deselectSignal,
    onDragMove,
    onDragEnd,
    clearSignal,
    wireframe
  }) {
    const [selectedIds, setSelectedIds] = (0, import_react4.useState)(/* @__PURE__ */ new Set());
    const [drawBox, setDrawBox] = (0, import_react4.useState)(null);
    const [selectBox, setSelectBox] = (0, import_react4.useState)(null);
    const [sizeIndicator, setSizeIndicator] = (0, import_react4.useState)(null);
    const [guides, setGuides] = (0, import_react4.useState)([]);
    const [editingId, setEditingId] = (0, import_react4.useState)(null);
    const [editExiting, setEditExiting] = (0, import_react4.useState)(false);
    const editHadTextRef = (0, import_react4.useRef)(false);
    const [exitingIds, setExitingIds] = (0, import_react4.useState)(/* @__PURE__ */ new Set());
    const lastAnnotationTextRef = (0, import_react4.useRef)(/* @__PURE__ */ new Map());
    const overlayRef = (0, import_react4.useRef)(null);
    const interactionRef = (0, import_react4.useRef)(null);
    const placementsRef = (0, import_react4.useRef)(placements);
    placementsRef.current = placements;
    const onSelectionChangeRef = (0, import_react4.useRef)(onSelectionChange);
    onSelectionChangeRef.current = onSelectionChange;
    const onDragMoveRef = (0, import_react4.useRef)(onDragMove);
    onDragMoveRef.current = onDragMove;
    const onDragEndRef = (0, import_react4.useRef)(onDragEnd);
    onDragEndRef.current = onDragEnd;
    const deselectRef = (0, import_react4.useRef)(deselectSignal);
    (0, import_react4.useEffect)(() => {
      if (deselectSignal !== deselectRef.current) {
        deselectRef.current = deselectSignal;
        setSelectedIds(/* @__PURE__ */ new Set());
      }
    }, [deselectSignal]);
    const clearRef = (0, import_react4.useRef)(clearSignal);
    (0, import_react4.useEffect)(() => {
      if (clearSignal !== void 0 && clearSignal !== clearRef.current) {
        clearRef.current = clearSignal;
        const allIds = new Set(placementsRef.current.map((p) => p.id));
        if (allIds.size > 0) {
          setExitingIds(allIds);
          setSelectedIds(/* @__PURE__ */ new Set());
          interactionRef.current = null;
          originalSetTimeout(() => {
            onChange([]);
            setExitingIds(/* @__PURE__ */ new Set());
          }, 180);
        }
      }
    }, [clearSignal, onChange]);
    (0, import_react4.useEffect)(() => {
      const handleKeyDown = (e) => {
        const target = e.target;
        const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
        if (isTyping) return;
        if ((e.key === "Backspace" || e.key === "Delete") && selectedIds.size > 0) {
          e.preventDefault();
          const toDelete = new Set(selectedIds);
          setExitingIds(toDelete);
          setSelectedIds(/* @__PURE__ */ new Set());
          originalSetTimeout(() => {
            onChange(placementsRef.current.filter((p) => !toDelete.has(p.id)));
            setExitingIds(/* @__PURE__ */ new Set());
          }, 180);
          return;
        }
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && selectedIds.size > 0) {
          e.preventDefault();
          const step = e.shiftKey ? 20 : 1;
          const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
          const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
          onChange(
            placements.map(
              (p) => selectedIds.has(p.id) ? { ...p, x: Math.max(0, p.x + dx), y: Math.max(0, p.y + dy) } : p
            )
          );
          return;
        }
        if (e.key === "Escape") {
          if (activeComponent) {
            onActiveComponentChange(null);
          } else if (selectedIds.size > 0) {
            setSelectedIds(/* @__PURE__ */ new Set());
          }
          return;
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedIds, activeComponent, placements, onChange, onActiveComponentChange]);
    const handleOverlayMouseDown = (0, import_react4.useCallback)(
      (e) => {
        if (e.button !== 0) return;
        if (passthrough) return;
        const target = e.target;
        if (target.closest(`.${styles_module_default3.placement}`)) return;
        e.preventDefault();
        e.stopPropagation();
        const scrollY2 = window.scrollY;
        const startX = e.clientX;
        const startY = e.clientY;
        if (activeComponent) {
          interactionRef.current = "place";
          onInteractionChange?.(true);
          let isDrag = false;
          let endX = startX;
          let endY = startY;
          const onMove = (ev) => {
            endX = ev.clientX;
            endY = ev.clientY;
            const dx = Math.abs(endX - startX);
            const dy = Math.abs(endY - startY);
            if (dx > 5 || dy > 5) isDrag = true;
            if (isDrag) {
              const x = Math.min(startX, endX);
              const y = Math.min(startY, endY);
              const w = Math.abs(endX - startX);
              const h = Math.abs(endY - startY);
              setDrawBox({ x, y, w, h });
              setSizeIndicator({ x: ev.clientX + 12, y: ev.clientY + 12, text: `${Math.round(w)} \xD7 ${Math.round(h)}` });
            }
          };
          const onUp = (ev) => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
            setDrawBox(null);
            setSizeIndicator(null);
            interactionRef.current = null;
            onInteractionChange?.(false);
            const def = DEFAULT_SIZES[activeComponent];
            let x, y, w, h;
            if (isDrag) {
              x = Math.min(startX, endX);
              y = Math.min(startY, endY) + scrollY2;
              w = Math.max(MIN_SIZE, Math.abs(endX - startX));
              h = Math.max(MIN_SIZE, Math.abs(endY - startY));
            } else {
              w = def.width;
              h = def.height;
              x = startX - w / 2;
              y = startY + scrollY2 - h / 2;
            }
            x = Math.max(0, x);
            y = Math.max(0, y);
            const placement = {
              id: generateId(),
              type: activeComponent,
              x,
              y,
              width: w,
              height: h,
              scrollY: scrollY2,
              timestamp: Date.now()
            };
            const next = [...placements, placement];
            onChange(next);
            setSelectedIds(/* @__PURE__ */ new Set([placement.id]));
            onActiveComponentChange(null);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        } else {
          if (!e.shiftKey) {
            setSelectedIds(/* @__PURE__ */ new Set());
          }
          interactionRef.current = "select";
          let isDrag = false;
          const onMove = (ev) => {
            const dx = Math.abs(ev.clientX - startX);
            const dy = Math.abs(ev.clientY - startY);
            if (dx > 4 || dy > 4) isDrag = true;
            if (isDrag) {
              const x = Math.min(startX, ev.clientX);
              const y = Math.min(startY, ev.clientY);
              setSelectBox({ x, y, w: Math.abs(ev.clientX - startX), h: Math.abs(ev.clientY - startY) });
            }
          };
          const onUp = (ev) => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
            interactionRef.current = null;
            if (isDrag) {
              const boxX = Math.min(startX, ev.clientX);
              const boxY = Math.min(startY, ev.clientY) + scrollY2;
              const boxW = Math.abs(ev.clientX - startX);
              const boxH = Math.abs(ev.clientY - startY);
              const newSelected = new Set(e.shiftKey ? selectedIds : /* @__PURE__ */ new Set());
              for (const p of placements) {
                const pScreenY = p.y - scrollY2;
                if (p.x + p.width > boxX && p.x < boxX + boxW && p.y + p.height > boxY && p.y < boxY + boxH) {
                  newSelected.add(p.id);
                }
              }
              setSelectedIds(newSelected);
            }
            setSelectBox(null);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }
      },
      [activeComponent, passthrough, placements, onChange, selectedIds]
    );
    const handlePlacementMouseDown = (0, import_react4.useCallback)(
      (e, id) => {
        if (e.button !== 0) return;
        const target = e.target;
        if (target.closest(`.${styles_module_default3.handle}`) || target.closest(`.${styles_module_default3.deleteButton}`)) return;
        e.preventDefault();
        e.stopPropagation();
        let newSelected;
        if (e.shiftKey) {
          newSelected = new Set(selectedIds);
          if (newSelected.has(id)) newSelected.delete(id);
          else newSelected.add(id);
        } else if (!selectedIds.has(id)) {
          newSelected = /* @__PURE__ */ new Set([id]);
        } else {
          newSelected = new Set(selectedIds);
        }
        setSelectedIds(newSelected);
        const changed = newSelected.size !== selectedIds.size || [...newSelected].some((x) => !selectedIds.has(x));
        if (changed) onSelectionChangeRef.current?.(newSelected, e.shiftKey);
        const scrollY2 = window.scrollY;
        const startX = e.clientX;
        const startY = e.clientY;
        const startPositions = /* @__PURE__ */ new Map();
        for (const p of placements) {
          if (newSelected.has(p.id)) {
            startPositions.set(p.id, { x: p.x, y: p.y });
          }
        }
        interactionRef.current = "move";
        onInteractionChange?.(true);
        let moved = false;
        let duplicated = false;
        let basePlacements = placements;
        let lastSnappedDx = 0, lastSnappedDy = 0;
        const selSizes = /* @__PURE__ */ new Map();
        for (const p of placements) {
          if (startPositions.has(p.id)) selSizes.set(p.id, { w: p.width, h: p.height });
        }
        const onMove = (ev) => {
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
          if (!moved) return;
          if (ev.altKey && !duplicated) {
            duplicated = true;
            const clones = [];
            for (const p of placements) {
              if (startPositions.has(p.id)) {
                clones.push({ ...p, id: generateId(), timestamp: Date.now() });
              }
            }
            basePlacements = [...placements, ...clones];
          }
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const [id2, start] of startPositions) {
            const sz = selSizes.get(id2);
            if (!sz) continue;
            minX = Math.min(minX, start.x + dx);
            minY = Math.min(minY, start.y + dy);
            maxX = Math.max(maxX, start.x + dx + sz.w);
            maxY = Math.max(maxY, start.y + dy + sz.h);
          }
          const selRect = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
          const { dx: snapDx, dy: snapDy, guides: newGuides } = computeSnap(selRect, basePlacements, new Set(startPositions.keys()), void 0, extraSnapRects);
          setGuides(newGuides);
          const snappedDx = dx + snapDx;
          const snappedDy = dy + snapDy;
          lastSnappedDx = snappedDx;
          lastSnappedDy = snappedDy;
          onChange(
            basePlacements.map((p) => {
              const start = startPositions.get(p.id);
              if (!start) return p;
              return { ...p, x: Math.max(0, start.x + snappedDx), y: Math.max(0, start.y + snappedDy) };
            })
          );
          onDragMoveRef.current?.(snappedDx, snappedDy);
        };
        const onUp = () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
          interactionRef.current = null;
          onInteractionChange?.(false);
          setGuides([]);
          onDragEndRef.current?.(lastSnappedDx, lastSnappedDy, moved);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      },
      [selectedIds, placements, onChange, onInteractionChange]
    );
    const handleResizeMouseDown = (0, import_react4.useCallback)(
      (e, id, dir) => {
        e.preventDefault();
        e.stopPropagation();
        const comp = placements.find((p) => p.id === id);
        if (!comp) return;
        setSelectedIds(/* @__PURE__ */ new Set([id]));
        interactionRef.current = "resize";
        onInteractionChange?.(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const startW = comp.width;
        const startH = comp.height;
        const startLeft = comp.x;
        const startTop = comp.y;
        const activeEdges = {
          left: dir.includes("w"),
          right: dir.includes("e"),
          top: dir.includes("n"),
          bottom: dir.includes("s")
        };
        const onMove = (ev) => {
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          let nw = startW, nh = startH, nx = startLeft, ny = startTop;
          if (dir.includes("e")) nw = Math.max(MIN_SIZE, startW + dx);
          if (dir.includes("w")) {
            nw = Math.max(MIN_SIZE, startW - dx);
            nx = startLeft + startW - nw;
          }
          if (dir.includes("s")) nh = Math.max(MIN_SIZE, startH + dy);
          if (dir.includes("n")) {
            nh = Math.max(MIN_SIZE, startH - dy);
            ny = startTop + startH - nh;
          }
          const rect = { x: nx, y: ny, width: nw, height: nh };
          const { dx: snapDx, dy: snapDy, guides: newGuides } = computeSnap(rect, placementsRef.current, /* @__PURE__ */ new Set([id]), activeEdges, extraSnapRects);
          setGuides(newGuides);
          if (snapDx !== 0) {
            if (activeEdges.right) nw += snapDx;
            else if (activeEdges.left) {
              nx += snapDx;
              nw -= snapDx;
            }
          }
          if (snapDy !== 0) {
            if (activeEdges.bottom) nh += snapDy;
            else if (activeEdges.top) {
              ny += snapDy;
              nh -= snapDy;
            }
          }
          onChange(
            placementsRef.current.map(
              (p) => p.id === id ? { ...p, x: nx, y: ny, width: nw, height: nh } : p
            )
          );
          setSizeIndicator({
            x: ev.clientX + 12,
            y: ev.clientY + 12,
            text: `${Math.round(nw)} \xD7 ${Math.round(nh)}`
          });
        };
        const onUp = () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
          setSizeIndicator(null);
          interactionRef.current = null;
          onInteractionChange?.(false);
          setGuides([]);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      },
      [placements, onChange, onInteractionChange]
    );
    const handleDelete = (0, import_react4.useCallback)(
      (id) => {
        interactionRef.current = null;
        setExitingIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        originalSetTimeout(() => {
          onChange(placementsRef.current.filter((p) => p.id !== id));
          setExitingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 180);
      },
      [onChange]
    );
    const TEXT_TYPES = /* @__PURE__ */ new Set(["text", "hero", "button", "badge", "cta", "toast", "modal", "card", "navigation", "tabs", "input", "search", "breadcrumb", "pricing", "testimonial", "alert", "banner", "tag", "notification", "stat", "productCard"]);
    const TEXT_PLACEHOLDERS = {
      hero: "Headline text",
      button: "Button label",
      badge: "Badge label",
      cta: "Call to action text",
      toast: "Notification message",
      modal: "Dialog title",
      card: "Card title",
      navigation: "Brand / nav items",
      tabs: "Tab labels",
      input: "Placeholder text",
      search: "Search placeholder",
      pricing: "Plan name or price",
      testimonial: "Quote text",
      alert: "Alert message",
      banner: "Banner text",
      tag: "Tag label",
      notification: "Notification message",
      stat: "Metric value",
      productCard: "Product name"
    };
    const handleDoubleClick = (0, import_react4.useCallback)((id) => {
      const p = placements.find((pl) => pl.id === id);
      if (!p) return;
      editHadTextRef.current = !!p.text;
      setEditingId(id);
      setEditExiting(false);
    }, [placements]);
    const dismissEdit = (0, import_react4.useCallback)(() => {
      if (!editingId) return;
      setEditExiting(true);
      originalSetTimeout(() => {
        setEditingId(null);
        setEditExiting(false);
      }, 150);
    }, [editingId]);
    (0, import_react4.useEffect)(() => {
      if (exiting && editingId) dismissEdit();
    }, [exiting]);
    const submitEdit = (0, import_react4.useCallback)((text) => {
      if (!editingId) return;
      onChange(placements.map((p) => p.id === editingId ? { ...p, text: text.trim() || void 0 } : p));
      dismissEdit();
    }, [editingId, placements, onChange, dismissEdit]);
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const cornerHandles = ["nw", "ne", "se", "sw"];
    const arrowColor = wireframe ? "#f97316" : "#3c82f7";
    const edgeHandles = [
      { dir: "n", cls: styles_module_default3.edgeN, arrow: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "8", height: "6", viewBox: "0 0 8 6", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M4 0.5L1 4.5h6z", fill: arrowColor }) }) },
      { dir: "e", cls: styles_module_default3.edgeE, arrow: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "6", height: "8", viewBox: "0 0 6 8", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M5.5 4L1.5 1v6z", fill: arrowColor }) }) },
      { dir: "s", cls: styles_module_default3.edgeS, arrow: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "8", height: "6", viewBox: "0 0 8 6", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M4 5.5L1 1.5h6z", fill: arrowColor }) }) },
      { dir: "w", cls: styles_module_default3.edgeW, arrow: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "6", height: "8", viewBox: "0 0 6 8", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M0.5 4L4.5 1v6z", fill: arrowColor }) }) }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          ref: overlayRef,
          className: `${styles_module_default3.overlay} ${!isDarkMode ? styles_module_default3.light : ""} ${activeComponent ? styles_module_default3.placing : ""} ${passthrough ? styles_module_default3.passthrough : ""} ${exiting ? styles_module_default3.overlayExiting : ""} ${wireframe ? styles_module_default3.wireframe : ""}${extraClassName ? ` ${extraClassName}` : ""}`,
          "data-feedback-toolbar": true,
          onMouseDown: handleOverlayMouseDown,
          children: placements.map((p) => {
            const isSelected = selectedIds.has(p.id);
            const label = COMPONENT_MAP[p.type]?.label || p.type;
            const screenY = p.y - scrollY;
            return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "div",
              {
                "data-design-placement": p.id,
                className: `${styles_module_default3.placement} ${isSelected ? styles_module_default3.selected : ""} ${exitingIds.has(p.id) ? styles_module_default3.exiting : ""}`,
                style: {
                  left: p.x,
                  top: screenY,
                  width: p.width,
                  height: p.height,
                  position: "fixed"
                },
                onMouseDown: (e) => handlePlacementMouseDown(e, p.id),
                onDoubleClick: () => handleDoubleClick(p.id),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: styles_module_default3.placementLabel, children: label }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `${styles_module_default3.placementAnnotation} ${p.text ? styles_module_default3.annotationVisible : ""}`, children: (() => {
                    if (p.text) lastAnnotationTextRef.current.set(p.id, p.text);
                    return p.text || lastAnnotationTextRef.current.get(p.id) || "";
                  })() }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: styles_module_default3.placementContent, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Skeleton, { type: p.type, width: p.width, height: p.height, text: p.text }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "div",
                    {
                      className: styles_module_default3.deleteButton,
                      onMouseDown: (e) => e.stopPropagation(),
                      onClick: () => handleDelete(p.id),
                      children: "\u2715"
                    }
                  ),
                  cornerHandles.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "div",
                    {
                      className: `${styles_module_default3.handle} ${styles_module_default3[`handle${dir.charAt(0).toUpperCase()}${dir.slice(1)}`]}`,
                      onMouseDown: (e) => handleResizeMouseDown(e, p.id, dir)
                    },
                    dir
                  )),
                  edgeHandles.map(({ dir, cls, arrow }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "div",
                    {
                      className: `${styles_module_default3.edgeHandle} ${cls}`,
                      onMouseDown: (e) => handleResizeMouseDown(e, p.id, dir),
                      children: arrow
                    },
                    dir
                  ))
                ]
              },
              p.id
            );
          })
        }
      ),
      editingId && (() => {
        const ep = placements.find((p) => p.id === editingId);
        if (!ep) return null;
        const ey = ep.y - scrollY;
        const centerX = ep.x + ep.width / 2;
        const aboveY = ey - 8;
        const belowY = ey + ep.height + 8;
        const fitsAbove = aboveY > 200;
        const fitsBelow = belowY < window.innerHeight - 100;
        const popupLeft = Math.max(160, Math.min(window.innerWidth - 160, centerX));
        let popupStyle;
        if (fitsAbove) {
          popupStyle = { left: popupLeft, bottom: window.innerHeight - aboveY };
        } else if (fitsBelow) {
          popupStyle = { left: popupLeft, top: belowY };
        } else {
          popupStyle = { left: popupLeft, top: Math.max(80, window.innerHeight / 2 - 80) };
        }
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          AnnotationPopupCSS,
          {
            element: COMPONENT_MAP[ep.type]?.label || ep.type,
            placeholder: TEXT_PLACEHOLDERS[ep.type] || "Label or content text",
            initialValue: ep.text ?? "",
            submitLabel: editHadTextRef.current ? "Save" : "Set",
            onSubmit: submitEdit,
            onCancel: dismissEdit,
            onDelete: editHadTextRef.current ? () => {
              submitEdit("");
            } : void 0,
            isExiting: editExiting,
            lightMode: !isDarkMode,
            style: popupStyle
          }
        );
      })(),
      drawBox && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: styles_module_default3.drawBox,
          style: { left: drawBox.x, top: drawBox.y, width: drawBox.w, height: drawBox.h },
          "data-feedback-toolbar": true
        }
      ),
      selectBox && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: styles_module_default3.selectBox,
          style: { left: selectBox.x, top: selectBox.y, width: selectBox.w, height: selectBox.h },
          "data-feedback-toolbar": true
        }
      ),
      sizeIndicator && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: styles_module_default3.sizeIndicator,
          style: { left: sizeIndicator.x, top: sizeIndicator.y },
          "data-feedback-toolbar": true,
          children: sizeIndicator.text
        }
      ),
      guides.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: styles_module_default3.guideLine,
          style: g.axis === "x" ? { position: "fixed", left: g.pos, top: 0, width: 1, bottom: 0 } : { position: "fixed", left: 0, top: g.pos - scrollY, right: 0, height: 1 },
          "data-feedback-toolbar": true
        },
        `${g.axis}-${g.pos}-${i}`
      ))
    ] });
  }
  function scrollFadeClass(el) {
    if (!el) return "";
    const top = el.scrollTop > 2;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
    return `${top ? styles_module_default3.fadeTop : ""} ${bottom ? styles_module_default3.fadeBottom : ""}`;
  }
  function PaletteIconSvg({ type }) {
    switch (type) {
      case "navigation":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "4", width: "18", height: "8", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2.5", y: "7", width: "3", height: "1.5", rx: ".5", fill: s, opacity: ".4" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "7", width: "2.5", height: "1.5", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11", y: "7", width: "2.5", height: "1.5", rx: ".5", fill: s, opacity: ".25" })
        ] });
      case "header":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "2", width: "18", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "5.5", width: "8", height: "2", rx: ".5", fill: s, opacity: ".35" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "9", width: "12", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "hero":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "1", width: "18", height: "14", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "5", width: "10", height: "1.5", rx: ".5", fill: s, opacity: ".35" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "8", width: "6", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7.5", y: "10.5", width: "5", height: "2.5", rx: "1", stroke: s, strokeWidth: sw })
        ] });
      case "section":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "1", width: "18", height: "14", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "4", width: "6", height: "1", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "6.5", width: "14", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "9", width: "10", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "sidebar":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "1", width: "7", height: "14", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2.5", y: "4", width: "4", height: "1", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2.5", y: "6.5", width: "3.5", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2.5", y: "9", width: "4", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "footer":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "7", width: "18", height: "8", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "9.5", width: "4", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "9.5", width: "4", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "15", y: "9.5", width: "3", height: "1", rx: ".5", fill: s, opacity: ".2" })
        ] });
      case "modal":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "2", width: "14", height: "12", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "4.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "7", width: "10", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11", y: "11", width: "5", height: "2", rx: ".75", stroke: s, strokeWidth: sw })
        ] });
      case "divider":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "2", y1: "8", x2: "18", y2: "8", stroke: s, strokeWidth: "0.5", opacity: ".3" }) });
      case "card":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1", width: "16", height: "14", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1", width: "16", height: "5.5", rx: "1", fill: s, opacity: ".04" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "8.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "11", width: "11", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "text":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "4", width: "14", height: "1.5", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7", width: "11", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "9.5", width: "13", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "12", width: "8", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "image":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "16", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "2", y1: "2", x2: "18", y2: "14", stroke: s, strokeWidth: ".3", opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "18", y1: "2", x2: "2", y2: "14", stroke: s, strokeWidth: ".3", opacity: ".25" })
        ] });
      case "video":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "16", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M8.5 5.5v5l4.5-2.5z", stroke: s, strokeWidth: sw, fill: s, opacity: ".15" })
        ] });
      case "table":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "2", width: "18", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "1", y1: "5.5", x2: "19", y2: "5.5", stroke: s, strokeWidth: ".3", opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "1", y1: "9", x2: "19", y2: "9", stroke: s, strokeWidth: ".3", opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "7", y1: "2", x2: "7", y2: "14", stroke: s, strokeWidth: ".3", opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "13", y1: "2", x2: "13", y2: "14", stroke: s, strokeWidth: ".3", opacity: ".25" })
        ] });
      case "grid":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "2", width: "7", height: "5.5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11.5", y: "2", width: "7", height: "5.5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "9.5", width: "7", height: "5.5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11.5", y: "9.5", width: "7", height: "5.5", rx: "1", stroke: s, strokeWidth: sw })
        ] });
      case "list":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "3.5", cy: "4.5", r: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6.5", y: "4", width: "10", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "3.5", cy: "8", r: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6.5", y: "7.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "3.5", cy: "11.5", r: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6.5", y: "11", width: "11", height: "1", rx: ".5", fill: s, opacity: ".2" })
        ] });
      case "chart":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "9", width: "2.5", height: "4", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "6", width: "2.5", height: "7", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11", y: "3", width: "2.5", height: "10", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "15", y: "5", width: "2.5", height: "8", rx: ".5", fill: s, opacity: ".2" })
        ] });
      case "accordion":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "2", width: "17", height: "4", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "3.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "7.5", width: "17", height: "3", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "12", width: "17", height: "3", rx: "1", stroke: s, strokeWidth: sw })
        ] });
      case "carousel":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "2", width: "14", height: "10", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M1.5 7L3 8.5 1.5 10", stroke: s, strokeWidth: sw, opacity: ".35" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M18.5 7L17 8.5 18.5 10", stroke: s, strokeWidth: sw, opacity: ".35" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "8.5", cy: "14", r: ".6", fill: s, opacity: ".35" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "14", r: ".6", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "11.5", cy: "14", r: ".6", fill: s, opacity: ".15" })
        ] });
      case "button":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "5", width: "14", height: "6", rx: "2", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6.5", y: "7.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".25" })
        ] });
      case "input":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "4", width: "5.5", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "6.5", width: "16", height: "5.5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3.5", y: "8.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "search":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "4.5", width: "16", height: "7", rx: "3.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "6", cy: "8", r: "2", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "7.5", y1: "9.5", x2: "9", y2: "11", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9.5", y: "7.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "form":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1.5", width: "5.5", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "3.5", width: "16", height: "3", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "8", width: "7", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "10", width: "16", height: "3", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "12", y: "14", width: "6", height: "2", rx: ".75", stroke: s, strokeWidth: sw })
        ] });
      case "tabs":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "5", width: "18", height: "10", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "2", width: "6", height: "3.5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2.5", y: "3.25", width: "3", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "2", width: "6", height: "3.5", rx: ".75", stroke: s, strokeWidth: sw })
        ] });
      case "dropdown":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "16", height: "4", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3.5", y: "3.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M15 3.5l1.5 1.5L18 3.5", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7", width: "16", height: "7", rx: "1", stroke: s, strokeWidth: sw, strokeDasharray: "2 1", opacity: ".3" })
        ] });
      case "toggle":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "5", width: "12", height: "6", rx: "3", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "13", cy: "8", r: "2", fill: s, opacity: ".3" })
        ] });
      case "avatar":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "8", r: "6", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "6.5", r: "2", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M6.5 13c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5", stroke: s, strokeWidth: sw })
        ] });
      case "badge":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "5", width: "14", height: "6", rx: "3", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "7.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".25" })
        ] });
      case "breadcrumb":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "7", width: "3.5", height: "1", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M6.5 7l1 1-1 1", stroke: s, strokeWidth: sw, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "7", width: "3.5", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M14 7l1 1-1 1", stroke: s, strokeWidth: sw, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "16.5", y: "7", width: "2", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "pagination":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "5.5", width: "3.5", height: "5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6.5", y: "5.5", width: "3.5", height: "5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11", y: "5.5", width: "3.5", height: "5", rx: "1", fill: s, opacity: ".15", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "15.5", y: "5.5", width: "3.5", height: "5", rx: "1", stroke: s, strokeWidth: sw })
        ] });
      case "progress":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7", width: "16", height: "2", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7", width: "10", height: "2", rx: "1", fill: s, opacity: ".2" })
        ] });
      case "toast":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "4", width: "16", height: "8", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5", cy: "8", r: "1.5", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "8", y: "6.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "8", y: "9", width: "5", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "tooltip":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "3", width: "14", height: "7", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5.5", y: "5.5", width: "9", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M9 10l1 2.5 1-2.5", stroke: s, strokeWidth: sw })
        ] });
      case "pricing":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1", width: "16", height: "14", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "3", width: "8", height: "1.5", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "5.5", width: "6", height: "2", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "9", width: "10", height: "1", rx: ".5", fill: s, opacity: ".1" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "11", width: "10", height: "1", rx: ".5", fill: s, opacity: ".1" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "13", width: "8", height: "1.5", rx: ".5", fill: s, opacity: ".2" })
        ] });
      case "testimonial":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1", width: "16", height: "14", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("text", { x: "4", y: "5.5", fontSize: "4", fill: s, opacity: ".2", fontFamily: "serif", children: "\u201C" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "7", width: "12", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "9", width: "9", height: "1", rx: ".5", fill: s, opacity: ".12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5.5", cy: "12.5", r: "1.5", stroke: s, strokeWidth: sw, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "8", y: "12", width: "5", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "cta":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "2", width: "18", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "4.5", width: "10", height: "1.5", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "7.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "10", width: "6", height: "2.5", rx: "1", stroke: s, strokeWidth: sw })
        ] });
      case "alert":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "4", width: "16", height: "8", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "6", cy: "8", r: "2", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "6", y1: "7", x2: "6", y2: "8.5", stroke: s, strokeWidth: "0.6", opacity: ".5" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "6", cy: "9.3", r: ".3", fill: s, opacity: ".5" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9.5", y: "7", width: "6", height: "1", rx: ".5", fill: s, opacity: ".2" })
        ] });
      case "banner":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "5", width: "18", height: "6", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "7.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "14", y: "7", width: "3.5", height: "2", rx: ".75", stroke: s, strokeWidth: sw })
        ] });
      case "stat":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "2", width: "14", height: "12", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "4.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "7", width: "10", height: "2.5", rx: ".5", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "11", width: "6", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "stepper":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "4", cy: "8", r: "2", fill: s, opacity: ".2", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "6", y1: "8", x2: "8", y2: "8", stroke: s, strokeWidth: ".4", opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "8", r: "2", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "12", y1: "8", x2: "14", y2: "8", stroke: s, strokeWidth: ".4", opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "16", cy: "8", r: "2", stroke: s, strokeWidth: sw })
        ] });
      case "tag":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "5", width: "14", height: "6", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5.5", y: "7.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "14", y1: "6.5", x2: "15.5", y2: "9.5", stroke: s, strokeWidth: sw, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "15.5", y1: "6.5", x2: "14", y2: "9.5", stroke: s, strokeWidth: sw, opacity: ".2" })
        ] });
      case "rating":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M4 5.5l1 2 2.2.3-1.6 1.5.4 2.2L4 10.3l-2 1.2.4-2.2L.8 7.8 3 7.5z", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M10 5.5l1 2 2.2.3-1.6 1.5.4 2.2L10 10.3l-2 1.2.4-2.2L6.8 7.8 9 7.5z", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M16 5.5l1 2 2.2.3-1.6 1.5.4 2.2L16 10.3l-2 1.2.4-2.2-1.6-1.5 2.2-.3z", stroke: s, strokeWidth: sw, opacity: ".25" })
        ] });
      case "map":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "16", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "2", y1: "6", x2: "18", y2: "10", stroke: s, strokeWidth: ".3", opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "7", y1: "2", x2: "11", y2: "14", stroke: s, strokeWidth: ".3", opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M10 5c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z", fill: s, opacity: ".15", stroke: s, strokeWidth: sw })
        ] });
      case "timeline":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "5", y1: "2", x2: "5", y2: "14", stroke: s, strokeWidth: ".4", opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5", cy: "4", r: "1.5", fill: s, opacity: ".2", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "8", y: "3", width: "8", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5", cy: "8.5", r: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "8", y: "7.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5", cy: "13", r: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "8", y: "12", width: "7", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "fileUpload":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "2", width: "14", height: "12", rx: "1.5", stroke: s, strokeWidth: sw, strokeDasharray: "2 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M10 10V5.5m0 0L7.5 8m2.5-2.5L12.5 8", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "11.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".15" })
        ] });
      case "codeBlock":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "16", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "4", cy: "4", r: ".6", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5.5", cy: "4", r: ".6", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "7", cy: "4", r: ".6", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "7", width: "7", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "9", width: "5", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "11", width: "8", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "calendar":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "3", width: "16", height: "12", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "2", y1: "6.5", x2: "18", y2: "6.5", stroke: s, strokeWidth: ".4", opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "4", width: "1", height: "1.5", rx: ".3", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "14", y: "4", width: "1", height: "1.5", rx: ".3", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "7", cy: "9", r: ".6", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "9", r: ".6", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "13", cy: "9", r: ".6", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "7", cy: "12", r: ".6", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "12", r: ".6", fill: s, opacity: ".2" })
        ] });
      case "notification":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "3", width: "16", height: "10", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5.5", cy: "8", r: "2", stroke: s, strokeWidth: sw, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "6", width: "6", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "8.5", width: "4.5", height: "1", rx: ".5", fill: s, opacity: ".12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "16.5", cy: "4.5", r: "1.5", fill: s, opacity: ".25" })
        ] });
      case "productCard":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "1", width: "14", height: "14", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "1", width: "14", height: "6", rx: "1", fill: s, opacity: ".04" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "8.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "10.5", width: "4", height: "1.5", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "12", y: "12", width: "4", height: "2", rx: ".75", stroke: s, strokeWidth: sw })
        ] });
      case "profile":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "5", r: "3", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "10", width: "10", height: "1.5", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "12.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "drawer":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "1", width: "10", height: "14", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "10.5", y: "4", width: "5", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "10.5", y: "6.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "10.5", y: "9", width: "6", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "1", width: "7", height: "14", rx: "1", stroke: s, strokeWidth: sw, opacity: ".15" })
        ] });
      case "popover":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "2", width: "14", height: "9", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "4.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "7", width: "6", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M9 11l1 2.5 1-2.5", stroke: s, strokeWidth: sw })
        ] });
      case "logo":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "3", width: "10", height: "10", rx: "2", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M5 9.5l2-4 2 4", stroke: s, strokeWidth: sw, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "14", y: "6", width: "4", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "14", y: "8.5", width: "3", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "faq":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("text", { x: "2.5", y: "5.5", fontSize: "4", fill: s, opacity: ".3", fontWeight: "bold", children: "?" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "3", width: "10", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "5.5", width: "8", height: "1", rx: ".5", fill: s, opacity: ".12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("text", { x: "2.5", y: "11.5", fontSize: "4", fill: s, opacity: ".3", fontWeight: "bold", children: "?" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "9", width: "9", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7", y: "11.5", width: "7", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "gallery":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "1.5", width: "5", height: "5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7.5", y: "1.5", width: "5", height: "5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "13.5", y: "1.5", width: "5", height: "5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "9.5", width: "5", height: "5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7.5", y: "9.5", width: "5", height: "5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "13.5", y: "9.5", width: "5", height: "5", rx: ".75", stroke: s, strokeWidth: sw })
        ] });
      case "checkbox":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "4", width: "8", height: "8", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M7.5 8l1.5 1.5 3-3", stroke: s, strokeWidth: sw, opacity: ".35" })
        ] });
      case "radio":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "8", r: "4", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "8", r: "2", fill: s, opacity: ".3" })
        ] });
      case "slider":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7.5", width: "16", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7.5", width: "10", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "12", cy: "8", r: "2.5", stroke: s, strokeWidth: sw })
        ] });
      case "datePicker":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1", width: "16", height: "5", rx: "1", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3.5", y: "3", width: "5", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "14", y: "2.5", width: "2.5", height: "2", rx: ".5", fill: s, opacity: ".12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7", width: "16", height: "8", rx: "1", stroke: s, strokeWidth: sw, strokeDasharray: "2 1", opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "6", cy: "10", r: ".6", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "10", r: ".6", fill: s, opacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "14", cy: "10", r: ".6", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "6", cy: "13", r: ".6", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "13", r: ".6", fill: s, opacity: ".2" })
        ] });
      case "skeleton":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "16", height: "3", rx: "1", fill: s, opacity: ".08" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "7", width: "10", height: "2", rx: ".75", fill: s, opacity: ".08" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "11", width: "13", height: "2", rx: ".75", fill: s, opacity: ".08" })
        ] });
      case "chip":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1.5", y: "5", width: "10", height: "6", rx: "3", fill: s, opacity: ".08", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "7.5", width: "4", height: "1", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "9.5", y1: "6.5", x2: "10.5", y2: "9.5", stroke: s, strokeWidth: sw, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("line", { x1: "10.5", y1: "6.5", x2: "9.5", y2: "9.5", stroke: s, strokeWidth: sw, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "13", y: "5", width: "5.5", height: "6", rx: "3", stroke: s, strokeWidth: sw, opacity: ".25" })
        ] });
      case "icon":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M10 3l1.5 3 3.5.5-2.5 2.5.5 3.5L10 11l-3 1.5.5-3.5L5 6.5l3.5-.5z", stroke: s, strokeWidth: sw, opacity: ".3" }) });
      case "spinner":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "8", r: "5", stroke: s, strokeWidth: sw, opacity: ".12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M10 3a5 5 0 0 1 5 5", stroke: s, strokeWidth: sw, opacity: ".35", strokeLinecap: "round" })
        ] });
      case "feature":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "2", width: "5", height: "5", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M4.5 3.5v3m-1.5-1.5h3", stroke: s, strokeWidth: sw, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "2.5", width: "8", height: "1.5", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "5.5", width: "6", height: "1", rx: ".5", fill: s, opacity: ".12" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "10", width: "5", height: "5", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "10.5", width: "7", height: "1.5", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "9", y: "13.5", width: "5", height: "1", rx: ".5", fill: s, opacity: ".12" })
        ] });
      case "team":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "5", cy: "5", r: "2.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2.5", y: "9", width: "5", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "15", cy: "5", r: "2.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "12.5", y: "9", width: "5", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "10", cy: "5", r: "2.5", stroke: s, strokeWidth: sw, opacity: ".5" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "7.5", y: "9", width: "5", height: "1", rx: ".5", fill: s, opacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "12", width: "12", height: "1", rx: ".5", fill: s, opacity: ".1" })
        ] });
      case "login":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "3", y: "1", width: "14", height: "14", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6", y: "3", width: "8", height: "1.5", rx: ".5", fill: s, opacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "5.5", width: "10", height: "3", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "5", y: "9.5", width: "10", height: "3", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "6.5", y: "13.5", width: "7", height: "2", rx: ".75", fill: s, opacity: ".2" })
        ] });
      case "contact":
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 20 16", width: "20", height: "16", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "1", width: "16", height: "14", rx: "1.5", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "3", width: "5", height: "1", rx: ".5", fill: s, opacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "5", width: "12", height: "2.5", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "4", y: "8.5", width: "12", height: "4", rx: ".75", stroke: s, strokeWidth: sw }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "11", y: "13.5", width: "5", height: "1.5", rx: ".5", fill: s, opacity: ".2" })
        ] });
      default:
        return null;
    }
  }
  function ComponentGrid({ activeType, onSelect, onDragStart, scrollRef, fadeClass, blankCanvas }) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { ref: scrollRef, className: `${styles_module_default3.placeScroll} ${fadeClass || ""}`, children: COMPONENT_REGISTRY.map((section) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: styles_module_default3.paletteSection, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: styles_module_default3.paletteSectionTitle, children: section.section }),
      section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "div",
        {
          className: `${styles_module_default3.paletteItem} ${activeType === item.type ? styles_module_default3.active : ""} ${blankCanvas ? styles_module_default3.wireframe : ""}`,
          onClick: () => onSelect(item.type),
          onMouseDown: (e) => {
            if (e.button === 0) onDragStart(item.type, e);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: styles_module_default3.paletteItemIcon, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PaletteIconSvg, { type: item.type }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: styles_module_default3.paletteItemLabel, children: item.label })
          ]
        },
        item.type
      ))
    ] }, section.section)) });
  }
  function RollingCount({ value, suffix }) {
    const [prev, setPrev] = (0, import_react5.useState)(null);
    const [prevSuffix, setPrevSuffix] = (0, import_react5.useState)(suffix);
    const [dir, setDir] = (0, import_react5.useState)("up");
    const cur = (0, import_react5.useRef)(value);
    const curSuffix = (0, import_react5.useRef)(suffix);
    const timer = (0, import_react5.useRef)();
    const suffixChanged = prev !== null && prevSuffix !== suffix;
    (0, import_react5.useEffect)(() => {
      if (value !== cur.current) {
        if (value === 0) {
          cur.current = value;
          curSuffix.current = suffix;
          setPrev(null);
          return;
        }
        setDir(value > cur.current ? "up" : "down");
        setPrev(cur.current);
        setPrevSuffix(curSuffix.current);
        cur.current = value;
        curSuffix.current = suffix;
        clearTimeout(timer.current);
        timer.current = originalSetTimeout(() => setPrev(null), 250);
      } else {
        curSuffix.current = suffix;
      }
    }, [value, suffix]);
    if (prev === null) return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      value,
      suffix ? ` ${suffix}` : ""
    ] });
    if (suffixChanged) {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: styles_module_default3.rollingWrap, children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { style: { visibility: "hidden" }, children: [
          value,
          " ",
          suffix
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: `${styles_module_default3.rollingNum} ${dir === "up" ? styles_module_default3.exitUp : styles_module_default3.exitDown}`, children: [
          prev,
          " ",
          prevSuffix
        ] }, `o${prev}-${value}`),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: `${styles_module_default3.rollingNum} ${dir === "up" ? styles_module_default3.enterUp : styles_module_default3.enterDown}`, children: [
          value,
          " ",
          suffix
        ] }, `n${value}`)
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: styles_module_default3.rollingWrap, children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: { visibility: "hidden" }, children: value }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: `${styles_module_default3.rollingNum} ${dir === "up" ? styles_module_default3.exitUp : styles_module_default3.exitDown}`, children: prev }, `o${prev}-${value}`),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: `${styles_module_default3.rollingNum} ${dir === "up" ? styles_module_default3.enterUp : styles_module_default3.enterDown}`, children: value }, `n${value}`)
      ] }),
      suffix ? ` ${suffix}` : ""
    ] });
  }
  function DesignPalette({
    activeType,
    onSelect,
    isDarkMode,
    sectionCount,
    onDetectSections,
    visible,
    onExited,
    placementCount,
    onClearPlacements,
    onDragStart,
    blankCanvas,
    onBlankCanvasChange,
    wireframePurpose,
    onWireframePurposeChange,
    Tooltip: Tooltip2
  }) {
    const [mounted, setMounted] = (0, import_react5.useState)(false);
    const [animClass, setAnimClass] = (0, import_react5.useState)("exit");
    const [footerVisible, setFooterVisible] = (0, import_react5.useState)(false);
    const [footerCollapsed, setFooterCollapsed] = (0, import_react5.useState)(true);
    const lastFooterCount = (0, import_react5.useRef)(0);
    const lastFooterSuffix = (0, import_react5.useRef)("");
    const rafRef = (0, import_react5.useRef)(0);
    const exitTimerRef = (0, import_react5.useRef)();
    const placeScrollRef = (0, import_react5.useRef)(null);
    const [placeFade, setPlaceFade] = (0, import_react5.useState)("");
    (0, import_react5.useEffect)(() => {
      if (visible) {
        setMounted(true);
        clearTimeout(exitTimerRef.current);
        cancelAnimationFrame(rafRef.current);
        rafRef.current = originalRequestAnimationFrame(() => {
          rafRef.current = originalRequestAnimationFrame(() => {
            setAnimClass("enter");
          });
        });
      } else {
        cancelAnimationFrame(rafRef.current);
        setAnimClass("exit");
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = originalSetTimeout(() => {
          setMounted(false);
          onExited?.();
        }, 200);
      }
      return () => cancelAnimationFrame(rafRef.current);
    }, [visible]);
    const hasFooterContent = placementCount > 0 || sectionCount > 0;
    const totalCount = placementCount + sectionCount;
    if (totalCount > 0) {
      lastFooterCount.current = totalCount;
      lastFooterSuffix.current = blankCanvas ? totalCount === 1 ? "Component" : "Components" : totalCount === 1 ? "Change" : "Changes";
    }
    (0, import_react5.useEffect)(() => {
      if (hasFooterContent) {
        if (!footerVisible) {
          setFooterCollapsed(true);
          setFooterVisible(true);
          originalRequestAnimationFrame(() => {
            originalRequestAnimationFrame(() => {
              setFooterCollapsed(false);
            });
          });
        } else {
          setFooterCollapsed(false);
        }
      } else {
        setFooterCollapsed(true);
        const t = originalSetTimeout(() => setFooterVisible(false), 300);
        return () => clearTimeout(t);
      }
    }, [hasFooterContent]);
    (0, import_react5.useEffect)(() => {
      if (!mounted) return;
      const el = placeScrollRef.current;
      if (!el) return;
      const update = () => setPlaceFade(scrollFadeClass(el));
      update();
      el.addEventListener("scroll", update, { passive: true });
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => {
        el.removeEventListener("scroll", update);
        ro.disconnect();
      };
    }, [mounted]);
    if (!mounted) return null;
    const footerParts = [];
    if (placementCount > 0) footerParts.push("placed");
    if (sectionCount > 0) footerParts.push("captured");
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        className: `${styles_module_default3.palette} ${styles_module_default3[animClass]} ${!isDarkMode ? styles_module_default3.light : ""}`,
        "data-feedback-toolbar": true,
        "data-agentation-palette": true,
        onClick: (e) => e.stopPropagation(),
        onMouseDown: (e) => e.stopPropagation(),
        onTransitionEnd: (e) => {
          if (e.target !== e.currentTarget) return;
          if (!visible) {
            clearTimeout(exitTimerRef.current);
            setMounted(false);
            setAnimClass("exit");
            onExited?.();
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: styles_module_default3.paletteHeader, children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: styles_module_default3.paletteHeaderTitle, children: "Layout Mode" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: styles_module_default3.paletteHeaderDesc, children: [
              "Rearrange and resize existing elements, add new components, and explore layout ideas. Agent results may vary.",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: "https://agentation.dev/features#layout-mode", target: "_blank", rel: "noopener noreferrer", children: "Learn more." })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              className: `${styles_module_default3.canvasToggle} ${blankCanvas ? styles_module_default3.active : ""}`,
              onClick: () => onBlankCanvasChange(!blankCanvas),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: styles_module_default3.canvasToggleIcon, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 14 14", width: "14", height: "14", fill: "none", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "1", y: "1", width: "12", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "1" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "4.5", cy: "4.5", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "7", cy: "4.5", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "9.5", cy: "4.5", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "4.5", cy: "7", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "7", cy: "7", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "9.5", cy: "7", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "4.5", cy: "9.5", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "7", cy: "9.5", r: "0.8", fill: "currentColor", opacity: ".6" }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: "9.5", cy: "9.5", r: "0.8", fill: "currentColor", opacity: ".6" })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: styles_module_default3.canvasToggleLabel, children: "Wireframe New Page" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: `${styles_module_default3.wireframePurposeWrap} ${!blankCanvas ? styles_module_default3.collapsed : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: styles_module_default3.wireframePurposeInner, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "textarea",
            {
              className: styles_module_default3.wireframePurposeInput,
              placeholder: "Describe this page to provide additional context for your agent.",
              value: wireframePurpose,
              onChange: (e) => onWireframePurposeChange(e.target.value),
              rows: 2
            }
          ) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            ComponentGrid,
            {
              activeType,
              onSelect,
              onDragStart,
              scrollRef: placeScrollRef,
              fadeClass: placeFade,
              blankCanvas
            }
          ),
          footerVisible && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: `${styles_module_default3.paletteFooterWrap} ${footerCollapsed ? styles_module_default3.footerHidden : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: styles_module_default3.paletteFooterInner, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: styles_module_default3.paletteFooterInnerContent, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: styles_module_default3.paletteFooter, children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: styles_module_default3.paletteFooterCount, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RollingCount, { value: lastFooterCount.current, suffix: lastFooterSuffix.current }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: styles_module_default3.paletteFooterClear, onClick: onClearPlacements, children: "Clear" })
          ] }) }) }) })
        ]
      }
    );
  }
  function getParentElement(element) {
    if (element.parentElement) {
      return element.parentElement;
    }
    const root = element.getRootNode();
    if (root instanceof ShadowRoot) {
      return root.host;
    }
    return null;
  }
  function closestCrossingShadow(element, selector) {
    let current = element;
    while (current) {
      if (current.matches(selector)) return current;
      current = getParentElement(current);
    }
    return null;
  }
  function getElementPath(target, maxDepth = 4) {
    const parts = [];
    let current = target;
    let depth = 0;
    while (current && depth < maxDepth) {
      const tag = current.tagName.toLowerCase();
      if (tag === "html" || tag === "body") break;
      let identifier = tag;
      if (current.id) {
        identifier = `#${current.id}`;
      } else if (current.className && typeof current.className === "string") {
        const meaningfulClass = current.className.split(/\s+/).find((c) => c.length > 2 && !c.match(/^[a-z]{1,2}$/) && !c.match(/[A-Z0-9]{5,}/));
        if (meaningfulClass) {
          identifier = `.${meaningfulClass.split("_")[0]}`;
        }
      }
      const nextParent = getParentElement(current);
      if (!current.parentElement && nextParent) {
        identifier = `\u27E8shadow\u27E9 ${identifier}`;
      }
      parts.unshift(identifier);
      current = nextParent;
      depth++;
    }
    return parts.join(" > ");
  }
  function identifyElement(target) {
    const path = getElementPath(target);
    if (target.dataset.element) {
      return { name: target.dataset.element, path };
    }
    const tag = target.tagName.toLowerCase();
    if (["path", "circle", "rect", "line", "g"].includes(tag)) {
      const svg = closestCrossingShadow(target, "svg");
      if (svg) {
        const parent = getParentElement(svg);
        if (parent instanceof HTMLElement) {
          const parentName = identifyElement(parent).name;
          return { name: `graphic in ${parentName}`, path };
        }
      }
      return { name: "graphic element", path };
    }
    if (tag === "svg") {
      const parent = getParentElement(target);
      if (parent?.tagName.toLowerCase() === "button") {
        const btnText = parent.textContent?.trim();
        return { name: btnText ? `icon in "${btnText}" button` : "button icon", path };
      }
      return { name: "icon", path };
    }
    if (tag === "button") {
      const text = target.textContent?.trim();
      const ariaLabel = target.getAttribute("aria-label");
      if (ariaLabel) return { name: `button [${ariaLabel}]`, path };
      return { name: text ? `button "${text.slice(0, 25)}"` : "button", path };
    }
    if (tag === "a") {
      const text = target.textContent?.trim();
      const href = target.getAttribute("href");
      if (text) return { name: `link "${text.slice(0, 25)}"`, path };
      if (href) return { name: `link to ${href.slice(0, 30)}`, path };
      return { name: "link", path };
    }
    if (tag === "input") {
      const type = target.getAttribute("type") || "text";
      const placeholder = target.getAttribute("placeholder");
      const name = target.getAttribute("name");
      if (placeholder) return { name: `input "${placeholder}"`, path };
      if (name) return { name: `input [${name}]`, path };
      return { name: `${type} input`, path };
    }
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
      const text = target.textContent?.trim();
      return { name: text ? `${tag} "${text.slice(0, 35)}"` : tag, path };
    }
    if (tag === "p") {
      const text = target.textContent?.trim();
      if (text) return { name: `paragraph: "${text.slice(0, 40)}${text.length > 40 ? "..." : ""}"`, path };
      return { name: "paragraph", path };
    }
    if (tag === "span" || tag === "label") {
      const text = target.textContent?.trim();
      if (text && text.length < 40) return { name: `"${text}"`, path };
      return { name: tag, path };
    }
    if (tag === "li") {
      const text = target.textContent?.trim();
      if (text && text.length < 40) return { name: `list item: "${text.slice(0, 35)}"`, path };
      return { name: "list item", path };
    }
    if (tag === "blockquote") return { name: "blockquote", path };
    if (tag === "code") {
      const text = target.textContent?.trim();
      if (text && text.length < 30) return { name: `code: \`${text}\``, path };
      return { name: "code", path };
    }
    if (tag === "pre") return { name: "code block", path };
    if (tag === "img") {
      const alt = target.getAttribute("alt");
      return { name: alt ? `image "${alt.slice(0, 30)}"` : "image", path };
    }
    if (tag === "video") return { name: "video", path };
    if (["div", "section", "article", "nav", "header", "footer", "aside", "main"].includes(tag)) {
      const className = target.className;
      const role = target.getAttribute("role");
      const ariaLabel = target.getAttribute("aria-label");
      if (ariaLabel) return { name: `${tag} [${ariaLabel}]`, path };
      if (role) return { name: `${role}`, path };
      if (typeof className === "string" && className) {
        const words = className.split(/[\s_-]+/).map((c) => c.replace(/[A-Z0-9]{5,}.*$/, "")).filter((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c)).slice(0, 2);
        if (words.length > 0) return { name: words.join(" "), path };
      }
      return { name: tag === "div" ? "container" : tag, path };
    }
    return { name: tag, path };
  }
  function getNearbyText(element) {
    const texts = [];
    const ownText = element.textContent?.trim();
    if (ownText && ownText.length < 100) {
      texts.push(ownText);
    }
    const prev = element.previousElementSibling;
    if (prev) {
      const prevText = prev.textContent?.trim();
      if (prevText && prevText.length < 50) {
        texts.unshift(`[before: "${prevText.slice(0, 40)}"]`);
      }
    }
    const next = element.nextElementSibling;
    if (next) {
      const nextText = next.textContent?.trim();
      if (nextText && nextText.length < 50) {
        texts.push(`[after: "${nextText.slice(0, 40)}"]`);
      }
    }
    return texts.join(" ");
  }
  function getNearbyElements(element) {
    const parent = getParentElement(element);
    if (!parent) return "";
    const elementRoot = element.getRootNode();
    const children = elementRoot instanceof ShadowRoot && element.parentElement ? Array.from(element.parentElement.children) : Array.from(parent.children);
    const siblings = children.filter(
      (child) => child !== element && child instanceof HTMLElement
    );
    if (siblings.length === 0) return "";
    const siblingIds = siblings.slice(0, 4).map((sib) => {
      const tag = sib.tagName.toLowerCase();
      const className = sib.className;
      let cls = "";
      if (typeof className === "string" && className) {
        const meaningful = className.split(/\s+/).map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, "")).find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
        if (meaningful) cls = `.${meaningful}`;
      }
      if (tag === "button" || tag === "a") {
        const text = sib.textContent?.trim().slice(0, 15);
        if (text) return `${tag}${cls} "${text}"`;
      }
      return `${tag}${cls}`;
    });
    const parentTag = parent.tagName.toLowerCase();
    let parentId = parentTag;
    if (typeof parent.className === "string" && parent.className) {
      const parentCls = parent.className.split(/\s+/).map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, "")).find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
      if (parentCls) parentId = `.${parentCls}`;
    }
    const total = parent.children.length;
    const suffix = total > siblingIds.length + 1 ? ` (${total} total in ${parentId})` : "";
    return siblingIds.join(", ") + suffix;
  }
  function getElementClasses(target) {
    const className = target.className;
    if (typeof className !== "string" || !className) return "";
    const classes = className.split(/\s+/).filter((c) => c.length > 0).map((c) => {
      const match = c.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);
      return match ? match[1] : c;
    }).filter((c, i, arr) => arr.indexOf(c) === i);
    return classes.join(", ");
  }
  function getDetailedComputedStyles(target) {
    if (typeof window === "undefined") return {};
    const styles = window.getComputedStyle(target);
    const result = {};
    const tag = target.tagName.toLowerCase();
    let properties;
    if (TEXT_ELEMENTS.has(tag)) {
      properties = ["color", "fontSize", "fontWeight", "fontFamily", "lineHeight"];
    } else if (tag === "button" || tag === "a" && target.getAttribute("role") === "button") {
      properties = ["backgroundColor", "color", "padding", "borderRadius", "fontSize"];
    } else if (FORM_INPUT_ELEMENTS.has(tag)) {
      properties = ["backgroundColor", "color", "padding", "borderRadius", "fontSize"];
    } else if (MEDIA_ELEMENTS.has(tag)) {
      properties = ["width", "height", "objectFit", "borderRadius"];
    } else if (CONTAINER_ELEMENTS.has(tag)) {
      properties = ["display", "padding", "margin", "gap", "backgroundColor"];
    } else {
      properties = ["color", "fontSize", "margin", "padding", "backgroundColor"];
    }
    for (const prop of properties) {
      const cssPropertyName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
      const value = styles.getPropertyValue(cssPropertyName);
      if (value && !DEFAULT_STYLE_VALUES.has(value)) {
        result[prop] = value;
      }
    }
    return result;
  }
  function getForensicComputedStyles(target) {
    if (typeof window === "undefined") return "";
    const styles = window.getComputedStyle(target);
    const parts = [];
    for (const prop of FORENSIC_PROPERTIES) {
      const cssPropertyName = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
      const value = styles.getPropertyValue(cssPropertyName);
      if (value && !DEFAULT_STYLE_VALUES.has(value)) {
        parts.push(`${cssPropertyName}: ${value}`);
      }
    }
    return parts.join("; ");
  }
  function parseComputedStylesString(stylesStr) {
    if (!stylesStr) return void 0;
    const result = {};
    const parts = stylesStr.split(";").map((p) => p.trim()).filter(Boolean);
    for (const part of parts) {
      const colonIndex = part.indexOf(":");
      if (colonIndex > 0) {
        const key = part.slice(0, colonIndex).trim();
        const value = part.slice(colonIndex + 1).trim();
        if (key && value) {
          result[key] = value;
        }
      }
    }
    return Object.keys(result).length > 0 ? result : void 0;
  }
  function getAccessibilityInfo(target) {
    const parts = [];
    const role = target.getAttribute("role");
    const ariaLabel = target.getAttribute("aria-label");
    const ariaDescribedBy = target.getAttribute("aria-describedby");
    const tabIndex = target.getAttribute("tabindex");
    const ariaHidden = target.getAttribute("aria-hidden");
    if (role) parts.push(`role="${role}"`);
    if (ariaLabel) parts.push(`aria-label="${ariaLabel}"`);
    if (ariaDescribedBy) parts.push(`aria-describedby="${ariaDescribedBy}"`);
    if (tabIndex) parts.push(`tabindex=${tabIndex}`);
    if (ariaHidden === "true") parts.push("aria-hidden");
    const focusable = target.matches("a, button, input, select, textarea, [tabindex]");
    if (focusable) parts.push("focusable");
    return parts.join(", ");
  }
  function getFullElementPath(target) {
    const parts = [];
    let current = target;
    while (current && current.tagName.toLowerCase() !== "html") {
      const tag = current.tagName.toLowerCase();
      let identifier = tag;
      if (current.id) {
        identifier = `${tag}#${current.id}`;
      } else if (current.className && typeof current.className === "string") {
        const cls = current.className.split(/\s+/).map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, "")).find((c) => c.length > 2);
        if (cls) identifier = `${tag}.${cls}`;
      }
      const nextParent = getParentElement(current);
      if (!current.parentElement && nextParent) {
        identifier = `\u27E8shadow\u27E9 ${identifier}`;
      }
      parts.unshift(identifier);
      current = nextParent;
    }
    return parts.join(" > ");
  }
  function isEffectivelyFixed(el) {
    let current = el;
    while (current && current !== document.body && current !== document.documentElement) {
      const pos = window.getComputedStyle(current).position;
      if (pos === "fixed" || pos === "sticky") return true;
      current = current.parentElement;
    }
    return false;
  }
  function generateSelector(el) {
    const tag = el.tagName.toLowerCase();
    if (["nav", "header", "footer", "main"].includes(tag)) {
      if (document.querySelectorAll(tag).length === 1) {
        return tag;
      }
    }
    if (el.id) {
      return `#${CSS.escape(el.id)}`;
    }
    if (el.className && typeof el.className === "string") {
      const classes = el.className.split(/\s+/).filter((c) => c.length > 0);
      const meaningful = classes.find(
        (c) => c.length > 2 && !/^[a-zA-Z0-9]{6,}$/.test(c) && !/^[a-z]{1,2}$/.test(c)
      );
      if (meaningful) {
        const selector = `${tag}.${CSS.escape(meaningful)}`;
        if (document.querySelectorAll(selector).length === 1) {
          return selector;
        }
      }
    }
    const parent = el.parentElement;
    if (parent) {
      const children = Array.from(parent.children);
      const index = children.indexOf(el) + 1;
      const parentSelector = parent === document.body ? "body" : generateSelector(parent);
      return `${parentSelector} > ${tag}:nth-child(${index})`;
    }
    return tag;
  }
  function labelSection(el) {
    const tag = el.tagName.toLowerCase();
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel;
    const role = el.getAttribute("role");
    if (role && SECTION_ROLES[role]) return SECTION_ROLES[role];
    if (TAG_LABELS[tag]) return TAG_LABELS[tag];
    const heading = el.querySelector("h1, h2, h3, h4, h5, h6");
    if (heading) {
      const text = heading.textContent?.trim();
      if (text && text.length <= 50) return text;
      if (text) return text.slice(0, 47) + "...";
    }
    const { name } = identifyElement(el);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  function getCleanClassName(el) {
    const className = el.className;
    if (typeof className !== "string" || !className) return null;
    const meaningful = className.split(/\s+/).map((c) => c.replace(/[_][a-zA-Z0-9]{5,}.*$/, "")).find((c) => c.length > 2 && !/^[a-z]{1,2}$/.test(c));
    return meaningful || null;
  }
  function getTextSnippet(el) {
    const text = el.textContent?.trim();
    if (!text) return null;
    const clean = text.replace(/\s+/g, " ");
    if (clean.length <= 30) return clean;
    return clean.slice(0, 30) + "\u2026";
  }
  function detectPageSections() {
    const main = document.querySelector("main") || document.body;
    const candidates = Array.from(main.children);
    let allCandidates = candidates;
    if (main !== document.body && candidates.length < 3) {
      allCandidates = Array.from(document.body.children);
    }
    const sections = [];
    allCandidates.forEach((el, index) => {
      if (!(el instanceof HTMLElement)) return;
      const tag = el.tagName.toLowerCase();
      if (SKIP_TAGS.has(tag)) return;
      if (el.hasAttribute("data-feedback-toolbar")) return;
      if (el.closest("[data-feedback-toolbar]")) return;
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      const rect = el.getBoundingClientRect();
      if (rect.height < MIN_SECTION_HEIGHT) return;
      const isSemantic = SECTION_TAGS.has(tag);
      const hasRole = el.getAttribute("role") && SECTION_ROLES[el.getAttribute("role")];
      const isSignificantDiv = tag === "div" && rect.height >= 60;
      if (!isSemantic && !hasRole && !isSignificantDiv) return;
      const scrollY = window.scrollY;
      const isFixed = isEffectivelyFixed(el);
      const sectionRect = {
        x: rect.x,
        y: isFixed ? rect.y : rect.y + scrollY,
        width: rect.width,
        height: rect.height
      };
      sections.push({
        id: `rs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        label: labelSection(el),
        tagName: tag,
        selector: generateSelector(el),
        role: el.getAttribute("role"),
        className: getCleanClassName(el),
        textSnippet: getTextSnippet(el),
        originalRect: sectionRect,
        currentRect: { ...sectionRect },
        originalIndex: index,
        isFixed
      });
    });
    return sections;
  }
  function captureElement(el) {
    const scrollY = window.scrollY;
    const rect = el.getBoundingClientRect();
    const isFixed = isEffectivelyFixed(el);
    const sectionRect = {
      x: rect.x,
      y: isFixed ? rect.y : rect.y + scrollY,
      width: rect.width,
      height: rect.height
    };
    const parent = el.parentElement;
    let originalIndex = 0;
    if (parent) {
      originalIndex = Array.from(parent.children).indexOf(el);
    }
    return {
      id: `rs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label: labelSection(el),
      tagName: el.tagName.toLowerCase(),
      selector: generateSelector(el),
      role: el.getAttribute("role"),
      className: getCleanClassName(el),
      textSnippet: getTextSnippet(el),
      originalRect: sectionRect,
      currentRect: { ...sectionRect },
      originalIndex,
      isFixed
    };
  }
  function computeSectionSnap(rect, sections, excludeIds, extraRects) {
    let bestDx = Infinity;
    let bestDy = Infinity;
    const mL = rect.x, mR = rect.x + rect.width, mCx = rect.x + rect.width / 2;
    const mT = rect.y, mB = rect.y + rect.height, mCy = rect.y + rect.height / 2;
    const allTargets = [];
    for (const s2 of sections) {
      if (!excludeIds.has(s2.id)) allTargets.push(s2.currentRect);
    }
    if (extraRects) allTargets.push(...extraRects);
    for (const o of allTargets) {
      const oL = o.x, oR = o.x + o.width, oCx = o.x + o.width / 2;
      const oT = o.y, oB = o.y + o.height, oCy = o.y + o.height / 2;
      for (const from of [mL, mR, mCx]) {
        for (const to of [oL, oR, oCx]) {
          const d = to - from;
          if (Math.abs(d) < SNAP_THRESHOLD2 && Math.abs(d) < Math.abs(bestDx)) bestDx = d;
        }
      }
      for (const from of [mT, mB, mCy]) {
        for (const to of [oT, oB, oCy]) {
          const d = to - from;
          if (Math.abs(d) < SNAP_THRESHOLD2 && Math.abs(d) < Math.abs(bestDy)) bestDy = d;
        }
      }
    }
    const dx = Math.abs(bestDx) < SNAP_THRESHOLD2 ? bestDx : 0;
    const dy = Math.abs(bestDy) < SNAP_THRESHOLD2 ? bestDy : 0;
    const guides = [];
    const seen = /* @__PURE__ */ new Set();
    const sL = mL + dx, sR = mR + dx, sCx = mCx + dx;
    const sT = mT + dy, sB = mB + dy, sCy = mCy + dy;
    for (const o of allTargets) {
      const oL = o.x, oR = o.x + o.width, oCx = o.x + o.width / 2;
      const oT = o.y, oB = o.y + o.height, oCy = o.y + o.height / 2;
      for (const xPos of [oL, oCx, oR]) {
        for (const sx of [sL, sCx, sR]) {
          if (Math.abs(sx - xPos) < 0.5) {
            const key = `x:${Math.round(xPos)}`;
            if (!seen.has(key)) {
              seen.add(key);
              guides.push({ axis: "x", pos: xPos });
            }
          }
        }
      }
      for (const yPos of [oT, oCy, oB]) {
        for (const sy of [sT, sCy, sB]) {
          if (Math.abs(sy - yPos) < 0.5) {
            const key = `y:${Math.round(yPos)}`;
            if (!seen.has(key)) {
              seen.add(key);
              guides.push({ axis: "y", pos: yPos });
            }
          }
        }
      }
    }
    return { dx, dy, guides };
  }
  function pickTarget(el) {
    let current = el;
    while (current && current !== document.body && current !== document.documentElement) {
      if (current.closest("[data-feedback-toolbar]")) return null;
      if (SKIP_TAGS2.has(current.tagName.toLowerCase())) {
        current = current.parentElement;
        continue;
      }
      const rect = current.getBoundingClientRect();
      if (rect.width >= MIN_CAPTURE_SIZE && rect.height >= MIN_CAPTURE_SIZE) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }
  function RearrangeOverlay({ rearrangeState, onChange, isDarkMode, exiting, className: extraClassName, blankCanvas, extraSnapRects, onSelectionChange, deselectSignal, onDragMove, onDragEnd, clearSignal }) {
    const { sections } = rearrangeState;
    const rearrangeStateRef = (0, import_react6.useRef)(rearrangeState);
    rearrangeStateRef.current = rearrangeState;
    const [selectedIds, setSelectedIds] = (0, import_react6.useState)(/* @__PURE__ */ new Set());
    const [exitingAll, setExitingAll] = (0, import_react6.useState)(false);
    const clearRef = (0, import_react6.useRef)(clearSignal);
    (0, import_react6.useEffect)(() => {
      if (clearSignal !== void 0 && clearSignal !== clearRef.current) {
        clearRef.current = clearSignal;
        if (sections.length > 0) {
          setExitingAll(true);
        }
      }
    }, [clearSignal, sections.length]);
    const deselectRef = (0, import_react6.useRef)(deselectSignal);
    (0, import_react6.useEffect)(() => {
      if (deselectSignal !== deselectRef.current) {
        deselectRef.current = deselectSignal;
        setSelectedIds(/* @__PURE__ */ new Set());
      }
    }, [deselectSignal]);
    const [editingId, setEditingId] = (0, import_react6.useState)(null);
    const [editExiting, setEditExiting] = (0, import_react6.useState)(false);
    const editHadNoteRef = (0, import_react6.useRef)(false);
    const handleDoubleClick = (0, import_react6.useCallback)((id) => {
      const s2 = sections.find((sec) => sec.id === id);
      if (!s2) return;
      editHadNoteRef.current = !!s2.note;
      setEditingId(id);
      setEditExiting(false);
    }, [sections]);
    const dismissEdit = (0, import_react6.useCallback)(() => {
      if (!editingId) return;
      setEditExiting(true);
      originalSetTimeout(() => {
        setEditingId(null);
        setEditExiting(false);
      }, 150);
    }, [editingId]);
    const submitEdit = (0, import_react6.useCallback)((text) => {
      if (!editingId) return;
      onChange({
        ...rearrangeState,
        sections: sections.map((s2) => s2.id === editingId ? { ...s2, note: text.trim() || void 0 } : s2)
      });
      dismissEdit();
    }, [editingId, sections, rearrangeState, onChange, dismissEdit]);
    (0, import_react6.useEffect)(() => {
      if (exiting && editingId) dismissEdit();
    }, [exiting]);
    const [exitingIds, setExitingIds] = (0, import_react6.useState)(/* @__PURE__ */ new Set());
    const lastNoteTextRef = (0, import_react6.useRef)(/* @__PURE__ */ new Map());
    const [hoverHighlight, setHoverHighlight] = (0, import_react6.useState)(null);
    const [sizeIndicator, setSizeIndicator] = (0, import_react6.useState)(null);
    const [snapGuides, setSnapGuides] = (0, import_react6.useState)([]);
    const [scrollY, setScrollY] = (0, import_react6.useState)(0);
    const interactionRef = (0, import_react6.useRef)(null);
    const seenGhostIdsRef = (0, import_react6.useRef)(/* @__PURE__ */ new Set());
    const firstActionRef = (0, import_react6.useRef)(/* @__PURE__ */ new Map());
    const [dragPositions, setDragPositions] = (0, import_react6.useState)(/* @__PURE__ */ new Map());
    const [exitingConnectors, setExitingConnectors] = (0, import_react6.useState)(/* @__PURE__ */ new Map());
    const prevChangedIdsRef = (0, import_react6.useRef)(/* @__PURE__ */ new Set());
    const lastChangedRectsRef = (0, import_react6.useRef)(/* @__PURE__ */ new Map());
    const onSelectionChangeRef = (0, import_react6.useRef)(onSelectionChange);
    onSelectionChangeRef.current = onSelectionChange;
    const onDragMoveRef = (0, import_react6.useRef)(onDragMove);
    onDragMoveRef.current = onDragMove;
    const onDragEndRef = (0, import_react6.useRef)(onDragEnd);
    onDragEndRef.current = onDragEnd;
    (0, import_react6.useEffect)(() => {
      if (blankCanvas) setSelectedIds(/* @__PURE__ */ new Set());
    }, [blankCanvas]);
    const [outlinesReady, setOutlinesReady] = (0, import_react6.useState)(
      () => !rearrangeState.sections.some((s2) => {
        const o = s2.originalRect, c = s2.currentRect;
        return Math.abs(o.x - c.x) > 1 || Math.abs(o.y - c.y) > 1 || Math.abs(o.width - c.width) > 1 || Math.abs(o.height - c.height) > 1;
      })
    );
    (0, import_react6.useEffect)(() => {
      if (!outlinesReady) {
        const timer = originalSetTimeout(() => setOutlinesReady(true), 380);
        return () => clearTimeout(timer);
      }
    }, []);
    const capturedSelectors = (0, import_react6.useRef)(/* @__PURE__ */ new Set());
    (0, import_react6.useEffect)(() => {
      capturedSelectors.current = new Set(sections.map((s2) => s2.selector));
    }, [sections]);
    (0, import_react6.useEffect)(() => {
      const onScroll = () => setScrollY(window.scrollY);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, []);
    (0, import_react6.useEffect)(() => {
      const handleMouseMove = (e) => {
        if (interactionRef.current) {
          setHoverHighlight(null);
          return;
        }
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) {
          setHoverHighlight(null);
          return;
        }
        if (el.closest("[data-feedback-toolbar]")) {
          setHoverHighlight(null);
          return;
        }
        if (el.closest("[data-design-placement]")) {
          setHoverHighlight(null);
          return;
        }
        if (el.closest("[data-annotation-popup]")) {
          setHoverHighlight(null);
          return;
        }
        const target = pickTarget(el);
        if (!target) {
          setHoverHighlight(null);
          return;
        }
        for (const sel of capturedSelectors.current) {
          try {
            const captured = document.querySelector(sel);
            if (captured && (captured === target || target.contains(captured))) {
              setHoverHighlight(null);
              return;
            }
          } catch {
          }
        }
        const rect = target.getBoundingClientRect();
        setHoverHighlight({ x: rect.x, y: rect.y, w: rect.width, h: rect.height });
      };
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [sections]);
    (0, import_react6.useEffect)(() => {
      const prev = document.body.style.userSelect;
      document.body.style.userSelect = "none";
      return () => {
        document.body.style.userSelect = prev;
      };
    }, []);
    (0, import_react6.useEffect)(() => {
      const handleMouseDown = (e) => {
        if (interactionRef.current) return;
        if (e.button !== 0) return;
        const el = e.target;
        if (!el || el.closest("[data-feedback-toolbar]")) return;
        if (el.closest("[data-design-placement]")) return;
        if (el.closest("[data-annotation-popup]")) return;
        const target = pickTarget(el);
        let alreadyCaptured = false;
        if (target) {
          for (const sel of capturedSelectors.current) {
            try {
              const captured = document.querySelector(sel);
              if (captured && (captured === target || target.contains(captured))) {
                alreadyCaptured = true;
                break;
              }
            } catch {
            }
          }
        }
        const isShift = !!(e.shiftKey || e.metaKey || e.ctrlKey);
        if (target && !alreadyCaptured) {
          e.preventDefault();
          e.stopPropagation();
          const section = captureElement(target);
          const newSections = [...sections, section];
          const newOrder = [...rearrangeState.originalOrder, section.id];
          onChange({
            ...rearrangeState,
            sections: newSections,
            originalOrder: newOrder
          });
          const newIds = /* @__PURE__ */ new Set([section.id]);
          setSelectedIds(newIds);
          onSelectionChangeRef.current?.(newIds, isShift);
          setHoverHighlight(null);
          const startX = e.clientX;
          const startY = e.clientY;
          const startPos = { x: section.currentRect.x, y: section.currentRect.y };
          const origRect = section.originalRect;
          let moved = false;
          let lastDx = 0, lastDy = 0;
          interactionRef.current = "move";
          const onMove = (ev) => {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            if (!moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) moved = true;
            if (!moved) return;
            const rect = { x: startPos.x + dx, y: startPos.y + dy, width: section.currentRect.width, height: section.currentRect.height };
            const snap = computeSectionSnap(rect, newSections, /* @__PURE__ */ new Set([section.id]), extraSnapRects);
            setSnapGuides(snap.guides);
            const snappedDx = dx + snap.dx;
            const snappedDy = dy + snap.dy;
            lastDx = snappedDx;
            lastDy = snappedDy;
            const outlineEl = document.querySelector(`[data-rearrange-section="${section.id}"]`);
            if (outlineEl) outlineEl.style.transform = `translate(${snappedDx}px, ${snappedDy}px)`;
            setDragPositions(/* @__PURE__ */ new Map([[section.id, { x: startPos.x + snappedDx, y: startPos.y + snappedDy, width: section.currentRect.width, height: section.currentRect.height }]]));
            onDragMoveRef.current?.(snappedDx, snappedDy);
          };
          const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
            interactionRef.current = null;
            setSnapGuides([]);
            setDragPositions(/* @__PURE__ */ new Map());
            const outlineEl = document.querySelector(`[data-rearrange-section="${section.id}"]`);
            if (outlineEl) outlineEl.style.transform = "";
            if (moved) {
              onChange({
                ...rearrangeState,
                sections: newSections.map(
                  (s2) => s2.id === section.id ? { ...s2, currentRect: { ...s2.currentRect, x: Math.max(0, startPos.x + lastDx), y: Math.max(0, startPos.y + lastDy) } } : s2
                ),
                originalOrder: newOrder
              });
            }
            onDragEndRef.current?.(lastDx, lastDy, moved);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        } else if (alreadyCaptured && target) {
          e.preventDefault();
          for (const s2 of sections) {
            try {
              const captured = document.querySelector(s2.selector);
              if (captured && captured === target) {
                const newIds = /* @__PURE__ */ new Set([s2.id]);
                setSelectedIds(newIds);
                onSelectionChangeRef.current?.(newIds, isShift);
                return;
              }
            } catch {
            }
          }
          if (!isShift) {
            setSelectedIds(/* @__PURE__ */ new Set());
            onSelectionChangeRef.current?.(/* @__PURE__ */ new Set(), false);
          }
        } else {
          if (!isShift) {
            setSelectedIds(/* @__PURE__ */ new Set());
            onSelectionChangeRef.current?.(/* @__PURE__ */ new Set(), false);
          }
        }
      };
      document.addEventListener("mousedown", handleMouseDown, true);
      return () => document.removeEventListener("mousedown", handleMouseDown, true);
    }, [sections, rearrangeState, onChange]);
    (0, import_react6.useEffect)(() => {
      const handleKeyDown = (e) => {
        const t = e.target;
        if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
        if ((e.key === "Backspace" || e.key === "Delete") && selectedIds.size > 0) {
          e.preventDefault();
          const idsToDelete = new Set(selectedIds);
          setExitingIds((prev) => {
            const next = new Set(prev);
            for (const id of idsToDelete) next.add(id);
            return next;
          });
          setSelectedIds(/* @__PURE__ */ new Set());
          originalSetTimeout(() => {
            const rs = rearrangeStateRef.current;
            onChange({
              ...rs,
              sections: rs.sections.filter((s2) => !idsToDelete.has(s2.id)),
              originalOrder: rs.originalOrder.filter((id) => !idsToDelete.has(id))
            });
            setExitingIds((prev) => {
              const next = new Set(prev);
              for (const id of idsToDelete) next.delete(id);
              return next;
            });
          }, 180);
          return;
        }
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && selectedIds.size > 0) {
          e.preventDefault();
          const step = e.shiftKey ? 20 : 1;
          const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
          const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
          onChange({
            ...rearrangeState,
            sections: sections.map(
              (s2) => selectedIds.has(s2.id) ? { ...s2, currentRect: { ...s2.currentRect, x: Math.max(0, s2.currentRect.x + dx), y: Math.max(0, s2.currentRect.y + dy) } } : s2
            )
          });
          return;
        }
        if (e.key === "Escape" && selectedIds.size > 0) {
          setSelectedIds(/* @__PURE__ */ new Set());
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedIds, sections, rearrangeState, onChange]);
    const handleOutlineMouseDown = (0, import_react6.useCallback)(
      (e, id) => {
        if (e.button !== 0) return;
        const target = e.target;
        if (target.closest(`.${styles_module_default3.handle}`) || target.closest(`.${styles_module_default3.deleteButton}`)) return;
        e.preventDefault();
        e.stopPropagation();
        let newSelected;
        if (e.shiftKey || e.metaKey || e.ctrlKey) {
          newSelected = new Set(selectedIds);
          if (newSelected.has(id)) newSelected.delete(id);
          else newSelected.add(id);
        } else if (!selectedIds.has(id)) {
          newSelected = /* @__PURE__ */ new Set([id]);
        } else {
          newSelected = new Set(selectedIds);
        }
        setSelectedIds(newSelected);
        const changed = newSelected.size !== selectedIds.size || [...newSelected].some((x) => !selectedIds.has(x));
        if (changed) onSelectionChangeRef.current?.(newSelected, !!(e.shiftKey || e.metaKey || e.ctrlKey));
        const startX = e.clientX;
        const startY = e.clientY;
        const startPositions = /* @__PURE__ */ new Map();
        for (const s2 of sections) {
          if (newSelected.has(s2.id)) {
            startPositions.set(s2.id, { x: s2.currentRect.x, y: s2.currentRect.y });
          }
        }
        interactionRef.current = "move";
        let moved = false;
        let lastDx = 0, lastDy = 0;
        const dragEls = /* @__PURE__ */ new Map();
        for (const s2 of sections) {
          if (newSelected.has(s2.id)) {
            const outlineEl = document.querySelector(`[data-rearrange-section="${s2.id}"]`);
            dragEls.set(s2.id, {
              outlineEl,
              curW: s2.currentRect.width,
              curH: s2.currentRect.height
            });
          }
        }
        const onMove = (ev) => {
          const rawDx = ev.clientX - startX;
          const rawDy = ev.clientY - startY;
          if (rawDx === 0 && rawDy === 0) return;
          moved = true;
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const [id2, { curW, curH }] of dragEls) {
            const start = startPositions.get(id2);
            if (!start) continue;
            const cx = start.x + rawDx, cy = start.y + rawDy;
            minX = Math.min(minX, cx);
            minY = Math.min(minY, cy);
            maxX = Math.max(maxX, cx + curW);
            maxY = Math.max(maxY, cy + curH);
          }
          const snap = computeSectionSnap(
            { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
            sections,
            newSelected,
            extraSnapRects
          );
          const dx = rawDx + snap.dx;
          const dy = rawDy + snap.dy;
          lastDx = dx;
          lastDy = dy;
          setSnapGuides(snap.guides);
          for (const [, { outlineEl }] of dragEls) {
            if (outlineEl) {
              outlineEl.style.transform = `translate(${dx}px, ${dy}px)`;
            }
          }
          const livePos = /* @__PURE__ */ new Map();
          for (const [id2, { curW, curH }] of dragEls) {
            const start = startPositions.get(id2);
            if (start) {
              const pos = { x: Math.max(0, start.x + dx), y: Math.max(0, start.y + dy), width: curW, height: curH };
              livePos.set(id2, pos);
            }
          }
          setDragPositions(livePos);
          onDragMoveRef.current?.(dx, dy);
        };
        const onUp = (ev) => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
          interactionRef.current = null;
          setSnapGuides([]);
          setDragPositions(/* @__PURE__ */ new Map());
          for (const [, { outlineEl }] of dragEls) {
            if (outlineEl) outlineEl.style.transform = "";
          }
          if (moved) {
            const totalDx = ev.clientX - startX;
            const totalDy = ev.clientY - startY;
            if (Math.abs(totalDx) < 5 && Math.abs(totalDy) < 5) {
              onChange({
                ...rearrangeState,
                sections: sections.map((s2) => {
                  const start = startPositions.get(s2.id);
                  if (!start) return s2;
                  return { ...s2, currentRect: { ...s2.currentRect, x: start.x, y: start.y } };
                })
              });
            } else {
              onChange({
                ...rearrangeState,
                sections: sections.map((s2) => {
                  const start = startPositions.get(s2.id);
                  if (!start) return s2;
                  return { ...s2, currentRect: { ...s2.currentRect, x: Math.max(0, start.x + lastDx), y: Math.max(0, start.y + lastDy) } };
                })
              });
              onDragEndRef.current?.(lastDx, lastDy, true);
              return;
            }
          }
          onDragEndRef.current?.(0, 0, false);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      },
      [selectedIds, sections, rearrangeState, onChange]
    );
    const handleResizeMouseDown = (0, import_react6.useCallback)(
      (e, id, dir) => {
        e.preventDefault();
        e.stopPropagation();
        const section = sections.find((s2) => s2.id === id);
        if (!section) return;
        setSelectedIds(/* @__PURE__ */ new Set([id]));
        interactionRef.current = "resize";
        const startX = e.clientX;
        const startY = e.clientY;
        const startRect = { ...section.currentRect };
        const origRect = section.originalRect;
        const aspectRatio = startRect.width / startRect.height;
        let lastRect = { ...startRect };
        const resizeOutlineEl = document.querySelector(`[data-rearrange-section="${id}"]`);
        const onMove = (ev) => {
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          let nx = startRect.x, ny = startRect.y, nw = startRect.width, nh = startRect.height;
          if (dir.includes("e")) nw = Math.max(MIN_SIZE2, startRect.width + dx);
          if (dir.includes("w")) {
            nw = Math.max(MIN_SIZE2, startRect.width - dx);
            nx = startRect.x + startRect.width - nw;
          }
          if (dir.includes("s")) nh = Math.max(MIN_SIZE2, startRect.height + dy);
          if (dir.includes("n")) {
            nh = Math.max(MIN_SIZE2, startRect.height - dy);
            ny = startRect.y + startRect.height - nh;
          }
          if (ev.shiftKey) {
            const isCorner = dir.length === 2;
            if (isCorner) {
              const wDelta = Math.abs(nw - startRect.width);
              const hDelta = Math.abs(nh - startRect.height);
              if (wDelta > hDelta) {
                nh = nw / aspectRatio;
              } else {
                nw = nh * aspectRatio;
              }
              if (dir.includes("w")) nx = startRect.x + startRect.width - nw;
              if (dir.includes("n")) ny = startRect.y + startRect.height - nh;
            } else {
              if (dir === "e" || dir === "w") {
                nh = nw / aspectRatio;
              } else {
                nw = nh * aspectRatio;
              }
              if (dir === "w") nx = startRect.x + startRect.width - nw;
              if (dir === "n") ny = startRect.y + startRect.height - nh;
            }
          }
          lastRect = { x: nx, y: ny, width: nw, height: nh };
          if (resizeOutlineEl) {
            resizeOutlineEl.style.left = `${nx}px`;
            resizeOutlineEl.style.top = `${ny - scrollY}px`;
            resizeOutlineEl.style.width = `${nw}px`;
            resizeOutlineEl.style.height = `${nh}px`;
          }
          setSizeIndicator({ x: ev.clientX + 12, y: ev.clientY + 12, text: `${Math.round(nw)} \xD7 ${Math.round(nh)}` });
          setDragPositions(/* @__PURE__ */ new Map([[id, lastRect]]));
        };
        const onUp = () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
          setSizeIndicator(null);
          interactionRef.current = null;
          setDragPositions(/* @__PURE__ */ new Map());
          onChange({
            ...rearrangeState,
            sections: sections.map((s2) => s2.id === id ? { ...s2, currentRect: lastRect } : s2)
          });
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      },
      [sections, rearrangeState, onChange, scrollY]
    );
    const handleDelete = (0, import_react6.useCallback)(
      (id) => {
        setExitingIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        originalSetTimeout(() => {
          const rs = rearrangeStateRef.current;
          onChange({
            ...rs,
            sections: rs.sections.filter((s2) => s2.id !== id),
            originalOrder: rs.originalOrder.filter((oid) => oid !== id)
          });
          setExitingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 180);
      },
      [onChange]
    );
    const hasChanged = (s2) => {
      const o = s2.originalRect, c = s2.currentRect;
      return Math.abs(o.x - c.x) > 1 || Math.abs(o.y - c.y) > 1 || Math.abs(o.width - c.width) > 1 || Math.abs(o.height - c.height) > 1;
    };
    const isMoved = (s2) => {
      const o = s2.originalRect, c = s2.currentRect;
      return Math.abs(o.x - c.x) > 1 || Math.abs(o.y - c.y) > 1;
    };
    const isResized = (s2) => {
      const o = s2.originalRect, c = s2.currentRect;
      return Math.abs(o.width - c.width) > 1 || Math.abs(o.height - c.height) > 1;
    };
    for (const s2 of sections) {
      if (!firstActionRef.current.has(s2.id)) {
        if (isMoved(s2)) firstActionRef.current.set(s2.id, "move");
        else if (isResized(s2)) firstActionRef.current.set(s2.id, "resize");
      }
    }
    for (const id of firstActionRef.current.keys()) {
      if (!sections.some((s2) => s2.id === id)) firstActionRef.current.delete(id);
    }
    const visibleSections = sections.filter((s2) => {
      try {
        if (exitingIds.has(s2.id)) return true;
        if (selectedIds.has(s2.id)) return true;
        const el = document.querySelector(s2.selector);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const expected = s2.originalRect;
        const sizeDiff = Math.abs(rect.width - expected.width) + Math.abs(rect.height - expected.height);
        return sizeDiff < 200;
      } catch {
        return false;
      }
    });
    const changedSections = visibleSections.filter((s2) => hasChanged(s2));
    const unchangedSections = visibleSections.filter((s2) => !hasChanged(s2));
    const currentChangedIds = new Set(changedSections.map((s2) => s2.id));
    for (const id of seenGhostIdsRef.current) {
      if (!currentChangedIds.has(id)) seenGhostIdsRef.current.delete(id);
    }
    const changedKey = [...currentChangedIds].sort().join(",");
    for (const s2 of changedSections) {
      lastChangedRectsRef.current.set(s2.id, { currentRect: s2.currentRect, originalRect: s2.originalRect, isFixed: s2.isFixed });
    }
    (0, import_react6.useEffect)(() => {
      const prev = prevChangedIdsRef.current;
      prevChangedIdsRef.current = currentChangedIds;
      const exiting2 = /* @__PURE__ */ new Map();
      for (const id of prev) {
        if (!currentChangedIds.has(id)) {
          if (!sections.some((s2) => s2.id === id)) continue;
          const last = lastChangedRectsRef.current.get(id);
          if (last) {
            exiting2.set(id, { orig: last.originalRect, target: last.currentRect, isFixed: last.isFixed });
            lastChangedRectsRef.current.delete(id);
          }
        }
      }
      if (exiting2.size > 0) {
        setExitingConnectors((prev2) => {
          const next = new Map(prev2);
          for (const [id, data] of exiting2) next.set(id, data);
          return next;
        });
        const timer = originalSetTimeout(() => {
          setExitingConnectors((prev2) => {
            const next = new Map(prev2);
            for (const id of exiting2.keys()) next.delete(id);
            return next;
          });
        }, 250);
        return () => clearTimeout(timer);
      }
    }, [changedKey, sections]);
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
        "div",
        {
          className: `${styles_module_default3.rearrangeOverlay} ${!isDarkMode ? styles_module_default3.light : ""} ${exiting ? styles_module_default3.overlayExiting : ""}${extraClassName ? ` ${extraClassName}` : ""}`,
          "data-feedback-toolbar": true,
          children: [
            hoverHighlight && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "div",
              {
                className: styles_module_default3.hoverHighlight,
                style: { left: hoverHighlight.x, top: hoverHighlight.y, width: hoverHighlight.w, height: hoverHighlight.h }
              }
            ),
            unchangedSections.map((section) => {
              const rect = section.currentRect;
              const screenY = section.isFixed ? rect.y : rect.y - scrollY;
              const color = SECTION_COLOR;
              const isSelected = selectedIds.has(section.id);
              return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
                "div",
                {
                  "data-rearrange-section": section.id,
                  className: `${styles_module_default3.sectionOutline} ${isSelected ? styles_module_default3.selected : ""} ${exitingAll || exiting || exitingIds.has(section.id) ? styles_module_default3.exiting : ""}`,
                  style: { left: rect.x, top: screenY, width: rect.width, height: rect.height, borderColor: color.border, backgroundColor: color.bg, ...outlinesReady ? {} : { opacity: 0, animation: "none", transition: "none" } },
                  onMouseDown: (e) => handleOutlineMouseDown(e, section.id),
                  onDoubleClick: () => handleDoubleClick(section.id),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: styles_module_default3.sectionLabel, style: { backgroundColor: color.pill }, children: section.label }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `${styles_module_default3.sectionAnnotation} ${section.note ? styles_module_default3.annotationVisible : ""}`, children: (() => {
                      if (section.note) lastNoteTextRef.current.set(section.id, section.note);
                      return section.note || lastNoteTextRef.current.get(section.id) || "";
                    })() }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: styles_module_default3.sectionDimensions, children: [
                      Math.round(rect.width),
                      " \xD7 ",
                      Math.round(rect.height)
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                      "div",
                      {
                        className: styles_module_default3.deleteButton,
                        onMouseDown: (e) => e.stopPropagation(),
                        onClick: () => handleDelete(section.id),
                        children: "\u2715"
                      }
                    ),
                    HANDLES.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                      "div",
                      {
                        className: `${styles_module_default3.handle} ${styles_module_default3[`handle${dir.charAt(0).toUpperCase()}${dir.slice(1)}`]}`,
                        onMouseDown: (e) => handleResizeMouseDown(e, section.id, dir)
                      },
                      dir
                    ))
                  ]
                },
                section.id
              );
            }),
            changedSections.map((section) => {
              const rect = section.currentRect;
              const screenY = section.isFixed ? rect.y : rect.y - scrollY;
              const isSelected = selectedIds.has(section.id);
              const moved = isMoved(section);
              const resized = isResized(section);
              const settled = !isSelected;
              if (blankCanvas && settled) return null;
              const isNewGhost = !seenGhostIdsRef.current.has(section.id);
              if (isNewGhost) seenGhostIdsRef.current.add(section.id);
              return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
                "div",
                {
                  "data-rearrange-section": section.id,
                  className: `${styles_module_default3.ghostOutline} ${isSelected ? styles_module_default3.selected : ""} ${exitingAll || exiting || exitingIds.has(section.id) ? styles_module_default3.exiting : ""}`,
                  style: { left: rect.x, top: screenY, width: rect.width, height: rect.height, ...outlinesReady ? {} : { opacity: 0, animation: "none", transition: "none" }, ...!isNewGhost ? { animation: "none" } : {} },
                  onMouseDown: (e) => handleOutlineMouseDown(e, section.id),
                  onDoubleClick: () => handleDoubleClick(section.id),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: styles_module_default3.sectionLabel, style: { backgroundColor: SECTION_COLOR.pill }, children: section.label }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `${styles_module_default3.sectionAnnotation} ${section.note ? styles_module_default3.annotationVisible : ""}`, children: (() => {
                      if (section.note) lastNoteTextRef.current.set(section.id, section.note);
                      return section.note || lastNoteTextRef.current.get(section.id) || "";
                    })() }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: styles_module_default3.sectionDimensions, children: [
                      Math.round(rect.width),
                      " \xD7 ",
                      Math.round(rect.height)
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                      "div",
                      {
                        className: styles_module_default3.deleteButton,
                        onMouseDown: (e) => e.stopPropagation(),
                        onClick: () => handleDelete(section.id),
                        children: "\u2715"
                      }
                    ),
                    HANDLES.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                      "div",
                      {
                        className: `${styles_module_default3.handle} ${styles_module_default3[`handle${dir.charAt(0).toUpperCase()}${dir.slice(1)}`]}`,
                        onMouseDown: (e) => handleResizeMouseDown(e, section.id, dir)
                      },
                      dir
                    )),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: styles_module_default3.ghostBadge, children: (() => {
                      const first = firstActionRef.current.get(section.id);
                      if (moved && resized) {
                        const [a, b] = first === "resize" ? ["Resize", "Move"] : ["Move", "Resize"];
                        return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
                          "Suggested ",
                          a,
                          " ",
                          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: styles_module_default3.ghostBadgeExtra, children: [
                            "& ",
                            b
                          ] })
                        ] });
                      }
                      return `Suggested ${resized ? "Resize" : "Move"}`;
                    })() })
                  ]
                },
                section.id
              );
            })
          ]
        }
      ),
      !blankCanvas && (() => {
        const connectorSections = [];
        for (const s2 of changedSections) {
          const livePos = dragPositions.get(s2.id);
          connectorSections.push({ id: s2.id, orig: s2.originalRect, target: livePos || s2.currentRect, isFixed: s2.isFixed, isSelected: selectedIds.has(s2.id), isExiting: exitingIds.has(s2.id) });
        }
        for (const [id, pos] of dragPositions) {
          if (!connectorSections.some((c) => c.id === id)) {
            const s2 = sections.find((sec) => sec.id === id);
            if (s2) connectorSections.push({ id, orig: s2.originalRect, target: pos, isFixed: s2.isFixed, isSelected: selectedIds.has(id) });
          }
        }
        for (const [id, data] of exitingConnectors) {
          if (!connectorSections.some((c) => c.id === id)) {
            connectorSections.push({ id, orig: data.orig, target: data.target, isFixed: data.isFixed, isSelected: false, isExiting: true });
          }
        }
        if (connectorSections.length === 0) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { className: `${styles_module_default3.connectorSvg} ${exitingAll || exiting ? styles_module_default3.connectorExiting : ""}`, children: [
          connectorSections.map(({ id, orig, target, isFixed, isSelected, isExiting }) => {
            const ox = orig.x + orig.width / 2;
            const oy = (isFixed ? orig.y : orig.y - scrollY) + orig.height / 2;
            const cx = target.x + target.width / 2;
            const cy = (isFixed ? target.y : target.y - scrollY) + target.height / 2;
            const ddx = cx - ox;
            const ddy = cy - oy;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dist < 2) return null;
            const proximityScale = Math.min(1, dist / 40);
            const perpOffset = Math.min(dist * 0.3, 60);
            const nx = dist > 0 ? -ddy / dist : 0;
            const ny = dist > 0 ? ddx / dist : 0;
            const cpx = (ox + cx) / 2 + nx * perpOffset;
            const cpy = (oy + cy) / 2 + ny * perpOffset;
            const isDragging = dragPositions.has(id);
            const baseOpacity = isDragging || isSelected ? 1 : 0.4;
            const dotBaseOpacity = isDragging || isSelected ? 1 : 0.5;
            return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("g", { className: isExiting ? styles_module_default3.connectorExiting : "", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "path",
                {
                  className: styles_module_default3.connectorLine,
                  d: `M ${ox} ${oy} Q ${cpx} ${cpy} ${cx} ${cy}`,
                  fill: "none",
                  stroke: "rgba(59, 130, 246, 0.45)",
                  strokeWidth: "1.5",
                  opacity: baseOpacity * proximityScale
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: styles_module_default3.connectorDot, cx: ox, cy: oy, r: 4 * proximityScale, fill: "rgba(59, 130, 246, 0.8)", stroke: "#fff", strokeWidth: "1.5", opacity: dotBaseOpacity * proximityScale, filter: "url(#connDotShadow)" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: styles_module_default3.connectorDot, cx, cy, r: 4 * proximityScale, fill: "rgba(59, 130, 246, 0.8)", stroke: "#fff", strokeWidth: "1.5", opacity: dotBaseOpacity * proximityScale, filter: "url(#connDotShadow)" })
            ] }, `conn-${id}`);
          }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("filter", { id: "connDotShadow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("feDropShadow", { dx: "0", dy: "0.5", stdDeviation: "1", floodOpacity: "0.15" }) }) })
        ] });
      })(),
      editingId && (() => {
        const es = sections.find((s2) => s2.id === editingId);
        if (!es) return null;
        const rect = es.currentRect;
        const screenY = es.isFixed ? rect.y : rect.y - scrollY;
        const centerX = rect.x + rect.width / 2;
        const aboveY = screenY - 8;
        const belowY = screenY + rect.height + 8;
        const fitsAbove = aboveY > 200;
        const fitsBelow = belowY < window.innerHeight - 100;
        const popupLeft = Math.max(160, Math.min(window.innerWidth - 160, centerX));
        let popupStyle;
        if (fitsAbove) {
          popupStyle = { left: popupLeft, bottom: window.innerHeight - aboveY };
        } else if (fitsBelow) {
          popupStyle = { left: popupLeft, top: belowY };
        } else {
          popupStyle = { left: popupLeft, top: Math.max(80, window.innerHeight / 2 - 80) };
        }
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          AnnotationPopupCSS,
          {
            element: es.label,
            placeholder: "Add a note about this section",
            initialValue: es.note ?? "",
            submitLabel: editHadNoteRef.current ? "Save" : "Set",
            onSubmit: submitEdit,
            onCancel: dismissEdit,
            onDelete: editHadNoteRef.current ? () => {
              submitEdit("");
            } : void 0,
            isExiting: editExiting,
            lightMode: !isDarkMode,
            style: popupStyle
          }
        );
      })(),
      sizeIndicator && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: styles_module_default3.sizeIndicator, style: { left: sizeIndicator.x, top: sizeIndicator.y }, "data-feedback-toolbar": true, children: sizeIndicator.text }),
      snapGuides.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "div",
        {
          className: styles_module_default3.guideLine,
          style: g.axis === "x" ? { position: "fixed", left: g.pos, top: 0, width: 1, height: "100vh" } : { position: "fixed", left: 0, top: g.pos - scrollY, width: "100vw", height: 1 }
        },
        `${g.axis}-${g.pos}-${i}`
      ))
    ] });
  }
  function collectDOMCandidates() {
    const main = document.querySelector("main") || document.body;
    const results = [];
    const topLevel = Array.from(main.children);
    const roots = main !== document.body && topLevel.length < 3 ? Array.from(document.body.children) : topLevel;
    for (const el of roots) {
      if (!(el instanceof HTMLElement)) continue;
      if (SKIP_TAGS3.has(el.tagName.toLowerCase())) continue;
      if (el.hasAttribute("data-feedback-toolbar")) continue;
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.height < 10 || rect.width < 10) continue;
      results.push({
        label: labelSection(el),
        selector: generateSelector(el),
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        area: rect.width * rect.height
      });
      for (const child of Array.from(el.children)) {
        if (!(child instanceof HTMLElement)) continue;
        if (SKIP_TAGS3.has(child.tagName.toLowerCase())) continue;
        if (child.hasAttribute("data-feedback-toolbar")) continue;
        const childStyle = window.getComputedStyle(child);
        if (childStyle.display === "none" || childStyle.visibility === "hidden") continue;
        const cr = child.getBoundingClientRect();
        if (cr.height < 10 || cr.width < 10) continue;
        results.push({
          label: labelSection(child),
          selector: generateSelector(child),
          top: cr.top,
          bottom: cr.bottom,
          left: cr.left,
          right: cr.right,
          area: cr.width * cr.height
        });
      }
    }
    return results;
  }
  function explicitToCandidates(items) {
    const scrollY = window.scrollY;
    return items.map(({ label, selector, rect }) => {
      const top = rect.y - scrollY;
      return {
        label,
        selector,
        top,
        bottom: top + rect.height,
        left: rect.x,
        right: rect.x + rect.width,
        area: rect.width * rect.height
      };
    });
  }
  function toViewportEdges(r) {
    const scrollY = window.scrollY;
    const top = r.y - scrollY;
    const left = r.x;
    return {
      top,
      bottom: top + r.height,
      left,
      right: left + r.width,
      area: r.width * r.height
    };
  }
  function getSpatialContext(targetRect, siblings) {
    const candidates = siblings ? explicitToCandidates(siblings) : collectDOMCandidates();
    const target = toViewportEdges(targetRect);
    let above = null;
    let below = null;
    let left = null;
    let right = null;
    let containedIn = null;
    for (const c of candidates) {
      if (Math.abs(c.left - target.left) < 2 && Math.abs(c.top - target.top) < 2 && Math.abs(c.right - c.left - targetRect.width) < 2 && Math.abs(c.bottom - c.top - targetRect.height) < 2) {
        continue;
      }
      if (c.left <= target.left + 2 && c.right >= target.right - 2 && c.top <= target.top + 2 && c.bottom >= target.bottom - 2 && c.area > target.area * 1.5) {
        if (!containedIn || c.area < containedIn._area) {
          containedIn = { label: c.label, selector: c.selector, _area: c.area };
        }
      }
      const hOverlap = target.right > c.left + 5 && target.left < c.right - 5;
      const vOverlap = target.bottom > c.top + 5 && target.top < c.bottom - 5;
      if (hOverlap && c.bottom <= target.top + 5) {
        const gap = Math.round(target.top - c.bottom);
        if (!above || gap < above._dist) {
          above = { label: c.label, selector: c.selector, gap: Math.max(0, gap), _dist: gap };
        }
      }
      if (hOverlap && c.top >= target.bottom - 5) {
        const gap = Math.round(c.top - target.bottom);
        if (!below || gap < below._dist) {
          below = { label: c.label, selector: c.selector, gap: Math.max(0, gap), _dist: gap };
        }
      }
      if (vOverlap && c.right <= target.left + 5) {
        const gap = Math.round(target.left - c.right);
        if (!left || gap < left._dist) {
          left = { label: c.label, selector: c.selector, gap: Math.max(0, gap), _dist: gap };
        }
      }
      if (vOverlap && c.left >= target.right - 5) {
        const gap = Math.round(c.left - target.right);
        if (!right || gap < right._dist) {
          right = { label: c.label, selector: c.selector, gap: Math.max(0, gap), _dist: gap };
        }
      }
    }
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const alignment = getAlignment(targetRect, viewportWidth);
    const clean = (n) => {
      if (!n) return null;
      return { label: n.label, selector: n.selector, gap: n.gap };
    };
    const outOfBounds = detectBoundsOverflow(
      target,
      targetRect,
      viewportWidth,
      viewportHeight,
      containedIn ? { label: containedIn.label, selector: containedIn.selector, _area: containedIn._area } : null,
      candidates
    );
    return {
      above: clean(above),
      below: clean(below),
      left: clean(left),
      right: clean(right),
      alignment,
      containedIn: containedIn ? { label: containedIn.label, selector: containedIn.selector } : null,
      outOfBounds
    };
  }
  function detectBoundsOverflow(targetEdges, targetRect, viewportWidth, viewportHeight, container, candidates) {
    const result = {};
    let hasOverflow = false;
    const vpOverflow = [];
    if (targetEdges.left < -2) vpOverflow.push("left");
    if (targetEdges.right > viewportWidth + 2) vpOverflow.push("right");
    if (targetEdges.top < -2) vpOverflow.push("top");
    if (targetEdges.bottom > viewportHeight + 2) vpOverflow.push("bottom");
    if (vpOverflow.length > 0) {
      result.viewport = vpOverflow;
      hasOverflow = true;
    }
    if (container) {
      const cont = candidates.find(
        (c) => c.label === container.label && c.selector === container.selector && Math.abs(c.area - container._area) < 10
      );
      if (cont) {
        const contOverflow = [];
        if (targetEdges.left < cont.left - 2) contOverflow.push("left");
        if (targetEdges.right > cont.right + 2) contOverflow.push("right");
        if (targetEdges.top < cont.top - 2) contOverflow.push("top");
        if (targetEdges.bottom > cont.bottom + 2) contOverflow.push("bottom");
        if (contOverflow.length > 0) {
          result.container = { label: container.label, edges: contOverflow };
          hasOverflow = true;
        }
      }
    }
    return hasOverflow ? result : null;
  }
  function getAlignment(rect, viewportWidth) {
    const ratio = rect.width / viewportWidth;
    if (ratio > 0.85) return "full-width";
    const centerX = rect.x + rect.width / 2;
    const viewportCenter = viewportWidth / 2;
    const offset = centerX - viewportCenter;
    const tolerance = viewportWidth * 0.08;
    if (Math.abs(offset) < tolerance) return "center";
    if (offset < 0) return "left";
    return "right";
  }
  function formatAlignment(alignment) {
    switch (alignment) {
      case "full-width":
        return "full-width";
      case "center":
        return "centered";
      case "left":
        return "left-aligned";
      case "right":
        return "right-aligned";
    }
  }
  function formatSpatialLines(ctx, options = {}) {
    const lines = [];
    if (ctx.above) {
      lines.push(`Below \`${ctx.above.label}\`${ctx.above.gap > 0 ? ` (${ctx.above.gap}px gap)` : ""}`);
    }
    if (ctx.below) {
      lines.push(`Above \`${ctx.below.label}\`${ctx.below.gap > 0 ? ` (${ctx.below.gap}px gap)` : ""}`);
    }
    if (options.includeLeftRight) {
      if (ctx.left) {
        lines.push(`Right of \`${ctx.left.label}\`${ctx.left.gap > 0 ? ` (${ctx.left.gap}px gap)` : ""}`);
      }
      if (ctx.right) {
        lines.push(`Left of \`${ctx.right.label}\`${ctx.right.gap > 0 ? ` (${ctx.right.gap}px gap)` : ""}`);
      }
    }
    const alignStr = formatAlignment(ctx.alignment);
    if (ctx.containedIn) {
      lines.push(`${alignStr.charAt(0).toUpperCase() + alignStr.slice(1)} in \`${ctx.containedIn.label}\``);
    } else {
      lines.push(`${alignStr.charAt(0).toUpperCase() + alignStr.slice(1)} in page`);
    }
    if (options.includePixelRef && options.pixelRef) {
      lines.push(`Pixel ref: \`${options.pixelRef}\``);
    }
    if (ctx.outOfBounds) {
      if (ctx.outOfBounds.viewport) {
        lines.push(`**Outside viewport** (${ctx.outOfBounds.viewport.join(", ")} edge${ctx.outOfBounds.viewport.length > 1 ? "s" : ""})`);
      }
      if (ctx.outOfBounds.container) {
        lines.push(`**Outside \`${ctx.outOfBounds.container.label}\`** (${ctx.outOfBounds.container.edges.join(", ")} edge${ctx.outOfBounds.container.edges.length > 1 ? "s" : ""})`);
      }
    }
    return lines;
  }
  function formatPositionSummary(ctx, coords, size) {
    const parts = [];
    if (ctx.above) parts.push(`below \`${ctx.above.label}\``);
    if (ctx.below) parts.push(`above \`${ctx.below.label}\``);
    if (ctx.left) parts.push(`right of \`${ctx.left.label}\``);
    if (ctx.right) parts.push(`left of \`${ctx.right.label}\``);
    if (ctx.containedIn) parts.push(`inside \`${ctx.containedIn.label}\``);
    parts.push(formatAlignment(ctx.alignment));
    if (ctx.outOfBounds?.viewport) {
      parts.push(`**outside viewport** (${ctx.outOfBounds.viewport.join(", ")})`);
    }
    if (ctx.outOfBounds?.container) {
      parts.push(`**outside \`${ctx.outOfBounds.container.label}\`** (${ctx.outOfBounds.container.edges.join(", ")})`);
    }
    const sizeStr = size ? `, ${Math.round(size.width)}\xD7${Math.round(size.height)}px` : "";
    return `at (${Math.round(coords.x)}, ${Math.round(coords.y)})${sizeStr}: ${parts.join(", ")}`;
  }
  function detectGroups(items) {
    if (items.length < 2) return [];
    const groups = [];
    const used = /* @__PURE__ */ new Set();
    for (let i = 0; i < items.length; i++) {
      if (used.has(i)) continue;
      const row = [i];
      for (let j = i + 1; j < items.length; j++) {
        if (used.has(j)) continue;
        if (Math.abs(items[i].rect.y - items[j].rect.y) < GROUP_TOLERANCE) {
          row.push(j);
        }
      }
      if (row.length >= 2) {
        const members = row.map((idx) => items[idx]);
        members.sort((a, b) => a.rect.x - b.rect.x);
        const gaps = [];
        for (let k = 0; k < members.length - 1; k++) {
          gaps.push(Math.round(members[k + 1].rect.x - (members[k].rect.x + members[k].rect.width)));
        }
        const avgY = Math.round(members.reduce((sum, m) => sum + m.rect.y, 0) / members.length);
        groups.push({
          labels: members.map((m) => m.label),
          type: "row",
          sharedEdge: avgY,
          gaps,
          avgGap: gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : 0
        });
        row.forEach((idx) => used.add(idx));
      }
    }
    for (let i = 0; i < items.length; i++) {
      if (used.has(i)) continue;
      const col = [i];
      for (let j = i + 1; j < items.length; j++) {
        if (used.has(j)) continue;
        if (Math.abs(items[i].rect.x - items[j].rect.x) < GROUP_TOLERANCE) {
          col.push(j);
        }
      }
      if (col.length >= 2) {
        const members = col.map((idx) => items[idx]);
        members.sort((a, b) => a.rect.y - b.rect.y);
        const gaps = [];
        for (let k = 0; k < members.length - 1; k++) {
          gaps.push(Math.round(members[k + 1].rect.y - (members[k].rect.y + members[k].rect.height)));
        }
        const avgX = Math.round(members.reduce((sum, m) => sum + m.rect.x, 0) / members.length);
        groups.push({
          labels: members.map((m) => m.label),
          type: "column",
          sharedEdge: avgX,
          gaps,
          avgGap: gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : 0
        });
        col.forEach((idx) => used.add(idx));
      }
    }
    return groups;
  }
  function analyzeLayoutPatterns(sections) {
    if (sections.length < 2) return [];
    const origGroups = detectGroups(sections.map((s2) => ({ label: s2.label, rect: s2.originalRect })));
    const currGroups = detectGroups(sections.map((s2) => ({ label: s2.label, rect: s2.currentRect })));
    const lines = [];
    const described = /* @__PURE__ */ new Set();
    for (const og of origGroups) {
      const ogSet = new Set(og.labels);
      let bestMatch = null;
      let bestOverlap = 0;
      for (const cg of currGroups) {
        const overlap = cg.labels.filter((l) => ogSet.has(l)).length;
        if (overlap >= 2 && overlap > bestOverlap) {
          bestMatch = cg;
          bestOverlap = overlap;
        }
      }
      if (bestMatch) {
        const sharedLabels = bestMatch.labels.filter((l) => ogSet.has(l));
        const names = sharedLabels.join(", ");
        if (bestMatch.type !== og.type) {
          const fromAxis = og.type === "row" ? "y" : "x";
          const toAxis = bestMatch.type === "row" ? "y" : "x";
          lines.push(
            `**${names}**: ${og.type} (${fromAxis}\u2248${og.sharedEdge}, ${og.avgGap}px gaps) \u2192 ${bestMatch.type} (${toAxis}\u2248${bestMatch.sharedEdge}, ${bestMatch.avgGap}px gaps)`
          );
        } else if (Math.abs(og.sharedEdge - bestMatch.sharedEdge) > 20 || Math.abs(og.avgGap - bestMatch.avgGap) > 5) {
          const axis = og.type === "row" ? "y" : "x";
          const posChange = Math.abs(og.sharedEdge - bestMatch.sharedEdge) > 20 ? ` ${axis}: ${og.sharedEdge} \u2192 ${bestMatch.sharedEdge}` : "";
          const gapChange = Math.abs(og.avgGap - bestMatch.avgGap) > 5 ? ` gaps: ${og.avgGap}px \u2192 ${bestMatch.avgGap}px` : "";
          lines.push(`**${names}**: ${og.type} shifted \u2014${posChange}${gapChange}`);
        }
        sharedLabels.forEach((l) => described.add(l));
      } else {
        const names = og.labels.join(", ");
        const axis = og.type === "row" ? "y" : "x";
        lines.push(`**${names}**: ${og.type} (${axis}\u2248${og.sharedEdge}) dissolved`);
        og.labels.forEach((l) => described.add(l));
      }
    }
    for (const cg of currGroups) {
      if (cg.labels.every((l) => described.has(l))) continue;
      const newLabels = cg.labels.filter((l) => !described.has(l));
      if (newLabels.length < 2) continue;
      const wasGrouped = origGroups.some((og) => {
        const overlap = og.labels.filter((l) => cg.labels.includes(l));
        return overlap.length >= 2;
      });
      if (!wasGrouped) {
        const axis = cg.type === "row" ? "y" : "x";
        lines.push(`**${cg.labels.join(", ")}**: new ${cg.type} (${axis}\u2248${cg.sharedEdge}, ${cg.avgGap}px gaps)`);
        cg.labels.forEach((l) => described.add(l));
      }
    }
    const ungroupedCurr = sections.filter((s2) => !described.has(s2.label));
    if (ungroupedCurr.length >= 2) {
      const byX = {};
      for (const s2 of ungroupedCurr) {
        const x = Math.round(s2.currentRect.x / 5) * 5;
        (byX[x] ?? (byX[x] = [])).push(s2.label);
      }
      for (const [x, labels] of Object.entries(byX)) {
        if (labels.length >= 2) {
          lines.push(`**${labels.join(", ")}**: shared left edge at x\u2248${x}`);
        }
      }
    }
    return lines;
  }
  function getPageLayout(viewport) {
    if (typeof document === "undefined") return { viewport, contentArea: null };
    const candidates = [];
    const seen = /* @__PURE__ */ new Set();
    const addCandidate = (el) => {
      if (seen.has(el)) return;
      if (!(el instanceof HTMLElement)) return;
      if (el.hasAttribute("data-feedback-toolbar")) return;
      if (SKIP_TAGS3.has(el.tagName.toLowerCase())) return;
      seen.add(el);
      candidates.push(el);
    };
    const main = document.querySelector("main");
    if (main) addCandidate(main);
    const roleMain = document.querySelector("[role='main']");
    if (roleMain) addCandidate(roleMain);
    for (const l1 of Array.from(document.body.children)) {
      addCandidate(l1);
      if (l1.children) {
        for (const l2 of Array.from(l1.children)) {
          addCandidate(l2);
          if (l2.children) {
            for (const l3 of Array.from(l2.children)) {
              addCandidate(l3);
            }
          }
        }
      }
    }
    let bestContainer = null;
    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      if (rect.height < 50) continue;
      const style = getComputedStyle(el);
      if (style.maxWidth && style.maxWidth !== "none" && style.maxWidth !== "0px") {
        if (!bestContainer || rect.width < bestContainer.rect.width) {
          bestContainer = { el, rect };
        }
        continue;
      }
      if (!bestContainer && rect.width < viewport.width - 20 && rect.width > 100) {
        bestContainer = { el, rect };
      }
    }
    if (bestContainer) {
      const { el, rect } = bestContainer;
      return {
        viewport,
        contentArea: {
          width: Math.round(rect.width),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          centerX: Math.round(rect.left + rect.width / 2),
          selector: generateSelector(el)
        }
      };
    }
    return { viewport, contentArea: null };
  }
  function getElementCSSContext(selector) {
    if (typeof document === "undefined") return null;
    const el = document.querySelector(selector);
    if (!el?.parentElement) return null;
    const ps = getComputedStyle(el.parentElement);
    const result = {
      parentDisplay: ps.display,
      parentSelector: generateSelector(el.parentElement)
    };
    if (ps.display.includes("flex")) {
      result.flexDirection = ps.flexDirection;
    }
    if (ps.display.includes("grid") && ps.gridTemplateColumns !== "none") {
      result.gridCols = ps.gridTemplateColumns;
    }
    if (ps.gap && ps.gap !== "normal" && ps.gap !== "0px") {
      result.gap = ps.gap;
    }
    return result;
  }
  function formatCSSPosition(rect, layout) {
    const ref = layout.contentArea;
    const containerWidth = ref ? ref.width : layout.viewport.width;
    const containerLeft = ref ? ref.left : 0;
    const containerCenterX = ref ? ref.centerX : Math.round(layout.viewport.width / 2);
    const leftInContainer = Math.round(rect.x - containerLeft);
    const rightInContainer = Math.round(containerLeft + containerWidth - (rect.x + rect.width));
    const widthPct = (rect.width / containerWidth * 100).toFixed(1);
    const centerX = rect.x + rect.width / 2;
    const isCentered = Math.abs(centerX - containerCenterX) < 20;
    const isFullWidth = rect.width / containerWidth > 0.95;
    const parts = [];
    if (isFullWidth) {
      parts.push("`width: 100%` of container");
    } else {
      parts.push(`left \`${leftInContainer}px\` in container, right \`${rightInContainer}px\`, width \`${widthPct}%\` (\`${Math.round(rect.width)}px\`)`);
    }
    if (isCentered && !isFullWidth) {
      parts.push("centered \u2014 `margin-inline: auto`");
    }
    return parts.join(" \u2014 ");
  }
  function formatReferenceFrame(layout) {
    const { viewport, contentArea } = layout;
    let out = "### Reference Frame\n";
    out += `- Viewport: \`${viewport.width}\xD7${viewport.height}px\`
`;
    if (contentArea) {
      const ca = contentArea;
      out += `- Content area: \`${ca.width}px\` wide, left edge at \`x=${ca.left}\`, right at \`x=${ca.right}\` (\`${ca.selector}\`)
`;
      out += `- Pixel \u2192 CSS translation:
`;
      out += `  - **Horizontal position in container**: \`element.x - ${ca.left}\` \u2192 use as \`margin-left\` or \`left\`
`;
      out += `  - **Width as % of container**: \`element.width / ${ca.width} \xD7 100\` \u2192 use as \`width: X%\`
`;
      out += `  - **Vertical gap between elements**: \`nextElement.y - (prevElement.y + prevElement.height)\` \u2192 use as \`margin-top\` or \`gap\`
`;
      out += `  - **Centered**: if \`|element.centerX - ${ca.centerX}| < 20px\` \u2192 use \`margin-inline: auto\`
`;
    } else {
      out += `- No distinct content container \u2014 elements positioned relative to full viewport
`;
      out += `- Pixel \u2192 CSS translation:
`;
      out += `  - **Width as % of viewport**: \`element.width / ${viewport.width} \xD7 100\` \u2192 use as \`width: X%\`
`;
      out += `  - **Centered**: if \`|(element.x + element.width/2) - ${Math.round(viewport.width / 2)}| < 20px\` \u2192 use \`margin-inline: auto\`
`;
    }
    out += "\n";
    return out;
  }
  function formatParentContext(selector) {
    const ctx = getElementCSSContext(selector);
    if (!ctx) return null;
    let desc = `\`${ctx.parentDisplay}\``;
    if (ctx.flexDirection) desc += `, flex-direction: \`${ctx.flexDirection}\``;
    if (ctx.gridCols) desc += `, grid-template-columns: \`${ctx.gridCols}\``;
    if (ctx.gap) desc += `, gap: \`${ctx.gap}\``;
    return `Parent: ${desc} (\`${ctx.parentSelector}\`)`;
  }
  function generateDesignOutput(placements, viewport, options, detailLevel = "standard") {
    if (placements.length === 0) return "";
    const sorted = [...placements].sort((a, b) => {
      if (Math.abs(a.y - b.y) < 20) return a.x - b.x;
      return a.y - b.y;
    });
    let out = "";
    if (options?.blankCanvas) {
      out += `## Wireframe: New Page

`;
      if (options.wireframePurpose) {
        out += `> **Purpose:** ${options.wireframePurpose}
>
`;
      }
      out += `> ${placements.length} component${placements.length !== 1 ? "s" : ""} placed \u2014 this is a standalone wireframe, not related to the current page.
>
> This wireframe is a rough sketch for exploring ideas.

`;
    } else {
      out += `## Design Layout

> ${placements.length} component${placements.length !== 1 ? "s" : ""} placed

`;
    }
    if (detailLevel === "compact") {
      out += "### Components\n";
      sorted.forEach((c, i) => {
        const label = COMPONENT_MAP[c.type]?.label || c.type;
        out += `${i + 1}. **${label}** \u2014 \`${Math.round(c.width)}\xD7${Math.round(c.height)}px\` at \`(${Math.round(c.x)}, ${Math.round(c.y)})\`
`;
      });
      return out;
    }
    const layout = getPageLayout(viewport);
    out += formatReferenceFrame(layout);
    out += "### Components\n";
    sorted.forEach((c, i) => {
      const label = COMPONENT_MAP[c.type]?.label || c.type;
      const rect = { x: c.x, y: c.y, width: c.width, height: c.height };
      out += `${i + 1}. **${label}** \u2014 \`${Math.round(c.width)}\xD7${Math.round(c.height)}px\` at \`(${Math.round(c.x)}, ${Math.round(c.y)})\`
`;
      const ctx = getSpatialContext(rect);
      const includeLeftRight = detailLevel === "detailed" || detailLevel === "forensic";
      const lines = formatSpatialLines(ctx, { includeLeftRight });
      for (const line of lines) {
        out += `   - ${line}
`;
      }
      const cssPos = formatCSSPosition(rect, layout);
      if (cssPos) {
        out += `   - CSS: ${cssPos}
`;
      }
    });
    out += "\n### Layout Analysis\n";
    const rows = [];
    for (const c of sorted) {
      const existing = rows.find((r) => Math.abs(r.y - c.y) < 30);
      if (existing) {
        existing.items.push(c);
      } else {
        rows.push({ y: c.y, items: [c] });
      }
    }
    rows.sort((a, b) => a.y - b.y);
    rows.forEach((row, i) => {
      row.items.sort((a, b) => a.x - b.x);
      const labels = row.items.map((c) => COMPONENT_MAP[c.type]?.label || c.type);
      if (row.items.length === 1) {
        const c = row.items[0];
        const isFullWidth = c.width > viewport.width * 0.8;
        out += `- Row ${i + 1} (y\u2248${Math.round(row.y)}): ${labels[0]}${isFullWidth ? " \u2014 full width" : ""}
`;
      } else {
        out += `- Row ${i + 1} (y\u2248${Math.round(row.y)}): ${labels.join(" | ")} \u2014 ${row.items.length} items side by side
`;
      }
    });
    if (detailLevel === "detailed" || detailLevel === "forensic") {
      out += "\n### Spacing & Gaps\n";
      for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];
        const labelA = COMPONENT_MAP[a.type]?.label || a.type;
        const labelB = COMPONENT_MAP[b.type]?.label || b.type;
        const vGap = Math.round(b.y - (a.y + a.height));
        const hGap = Math.round(b.x - (a.x + a.width));
        if (Math.abs(a.y - b.y) < 30) {
          out += `- ${labelA} \u2192 ${labelB}: \`${hGap}px\` horizontal gap
`;
        } else {
          out += `- ${labelA} \u2192 ${labelB}: \`${vGap}px\` vertical gap
`;
        }
      }
      if (detailLevel === "forensic" && sorted.length > 2) {
        out += "\n### All Pairwise Gaps\n";
        for (let i = 0; i < sorted.length; i++) {
          for (let j = i + 1; j < sorted.length; j++) {
            const a = sorted[i];
            const b = sorted[j];
            const labelA = COMPONENT_MAP[a.type]?.label || a.type;
            const labelB = COMPONENT_MAP[b.type]?.label || b.type;
            const vGap = Math.round(b.y - (a.y + a.height));
            const hGap = Math.round(b.x - (a.x + a.width));
            out += `- ${labelA} \u2194 ${labelB}: h=\`${hGap}px\` v=\`${vGap}px\`
`;
          }
        }
      }
      if (detailLevel === "forensic") {
        out += "\n### Z-Order (placement order)\n";
        placements.forEach((c, i) => {
          const label = COMPONENT_MAP[c.type]?.label || c.type;
          out += `${i}. ${label} at \`(${Math.round(c.x)}, ${Math.round(c.y)})\`
`;
        });
      }
    }
    out += "\n### Suggested Implementation\n";
    const hasNav = sorted.some((c) => c.type === "navigation");
    const hasHero = sorted.some((c) => c.type === "hero");
    const hasSidebar = sorted.some((c) => c.type === "sidebar");
    const hasFooter = sorted.some((c) => c.type === "footer");
    const cards = sorted.filter((c) => c.type === "card");
    const forms = sorted.filter((c) => c.type === "form");
    const tables = sorted.filter((c) => c.type === "table");
    const modals = sorted.filter((c) => c.type === "modal");
    if (hasNav) out += "- Top navigation bar with logo + nav links + CTA\n";
    if (hasHero) out += "- Hero section with heading, subtext, and call-to-action\n";
    if (hasSidebar) out += "- Sidebar layout \u2014 use CSS Grid with sidebar + main content area\n";
    if (cards.length > 1) out += `- ${cards.length}-column card grid \u2014 use CSS Grid or Flexbox
`;
    else if (cards.length === 1) out += "- Card component with image + content area\n";
    if (forms.length > 0) out += `- ${forms.length} form${forms.length > 1 ? "s" : ""} \u2014 add proper labels, validation, and submit handling
`;
    if (tables.length > 0) out += "- Data table \u2014 consider sortable columns and pagination\n";
    if (modals.length > 0) out += "- Modal dialog \u2014 add overlay backdrop and focus trapping\n";
    if (hasFooter) out += "- Multi-column footer with links\n";
    if (detailLevel === "detailed" || detailLevel === "forensic") {
      out += "\n### CSS Suggestions\n";
      if (hasSidebar) {
        const sidebar = sorted.find((c) => c.type === "sidebar");
        out += `- \`display: grid; grid-template-columns: ${Math.round(sidebar.width)}px 1fr;\`
`;
      }
      if (cards.length > 1) {
        const cardW = Math.round(cards[0].width);
        out += `- \`display: grid; grid-template-columns: repeat(${cards.length}, ${cardW}px); gap: 16px;\`
`;
      }
      if (hasNav) {
        out += `- Navigation: \`position: sticky; top: 0; z-index: 50;\`
`;
      }
    }
    return out;
  }
  function generateRearrangeOutput(state, detailLevel = "standard", viewport) {
    const { sections } = state;
    const changed = [];
    for (const s2 of sections) {
      const o = s2.originalRect;
      const c = s2.currentRect;
      const posMoved = Math.abs(o.x - c.x) > 1 || Math.abs(o.y - c.y) > 1;
      const sizeChanged = Math.abs(o.width - c.width) > 1 || Math.abs(o.height - c.height) > 1;
      if (!posMoved && !sizeChanged) {
        if (detailLevel === "forensic") {
          changed.push({ section: s2, posMoved: false, sizeChanged: false });
        }
        continue;
      }
      changed.push({ section: s2, posMoved, sizeChanged });
    }
    if (changed.length === 0) return "";
    if (detailLevel !== "forensic" && changed.every((e) => !e.posMoved && !e.sizeChanged)) return "";
    let out = "## Suggested Layout Changes\n\n";
    const vw = viewport ? viewport.width : typeof window !== "undefined" ? window.innerWidth : 0;
    const vh = viewport ? viewport.height : typeof window !== "undefined" ? window.innerHeight : 0;
    const layout = getPageLayout({ width: vw, height: vh });
    if (detailLevel !== "compact") {
      out += formatReferenceFrame(layout);
    }
    if (detailLevel === "forensic") {
      out += `> Detected at: \`${new Date(state.detectedAt).toISOString()}\`
`;
      out += `> Total sections: ${sections.length}

`;
    }
    const siblingCandidates = (rects) => sections.map((s2) => ({
      label: s2.label,
      selector: s2.selector,
      rect: rects === "original" ? s2.originalRect : s2.currentRect
    }));
    out += "**Changes:**\n";
    for (const { section: s2, posMoved, sizeChanged } of changed) {
      const o = s2.originalRect;
      const c = s2.currentRect;
      if (!posMoved && !sizeChanged) {
        out += `- ${s2.label} \u2014 unchanged at (${Math.round(c.x)}, ${Math.round(c.y)}) ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`;
        continue;
      }
      if (detailLevel === "compact") {
        if (posMoved && sizeChanged) {
          out += `- Suggested: move **${s2.label}** to (${Math.round(c.x)}, ${Math.round(c.y)}) ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`;
        } else if (posMoved) {
          out += `- Suggested: move **${s2.label}** to (${Math.round(c.x)}, ${Math.round(c.y)})
`;
        } else {
          out += `- Suggested: resize **${s2.label}** to ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`;
        }
        continue;
      }
      if (posMoved && sizeChanged) {
        out += `- Suggested: move and resize **${s2.label}**
`;
      } else if (posMoved) {
        out += `- Suggested: move **${s2.label}**
`;
      } else {
        out += `- Suggested: resize **${s2.label}** from ${Math.round(o.width)}\xD7${Math.round(o.height)}px to ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`;
      }
      if (posMoved) {
        const origCtx = getSpatialContext(o, siblingCandidates("original"));
        const currCtx = getSpatialContext(c, siblingCandidates("current"));
        const wasSize = sizeChanged ? { width: o.width, height: o.height } : void 0;
        out += `  - Currently ${formatPositionSummary(origCtx, { x: o.x, y: o.y }, wasSize)}
`;
        const nowSize = sizeChanged ? { width: c.width, height: c.height } : void 0;
        const coordStr = `at (${Math.round(c.x)}, ${Math.round(c.y)})`;
        const sizeStr = nowSize ? `, ${Math.round(nowSize.width)}\xD7${Math.round(nowSize.height)}px` : "";
        const includeLeftRight = detailLevel === "detailed" || detailLevel === "forensic";
        const nowLines = formatSpatialLines(currCtx, { includeLeftRight });
        if (nowLines.length > 0) {
          out += `  - Suggested position ${coordStr}${sizeStr}: ${nowLines[0]}
`;
          for (let i = 1; i < nowLines.length; i++) {
            out += `    ${nowLines[i]}
`;
          }
        } else {
          out += `  - Suggested position ${coordStr}${sizeStr}
`;
        }
        const cssPos = formatCSSPosition(c, layout);
        if (cssPos) {
          out += `  - CSS: ${cssPos}
`;
        }
      }
      const parentCtx = formatParentContext(s2.selector);
      if (parentCtx) {
        out += `  - ${parentCtx}
`;
      }
      out += `  - Selector: \`${s2.selector}\`
`;
      if (detailLevel === "detailed" || detailLevel === "forensic") {
        const ident = s2.className ? `${s2.tagName}.${s2.className.split(" ")[0]}` : s2.tagName;
        if (ident !== s2.selector) {
          out += `  - Element: \`${ident}\`
`;
        }
        if (s2.role) out += `  - Role: \`${s2.role}\`
`;
        if (detailLevel === "forensic" && s2.textSnippet) {
          out += `  - Text: "${s2.textSnippet}"
`;
        }
      }
      if (detailLevel === "forensic") {
        out += `  - Original rect: \`{ x: ${Math.round(o.x)}, y: ${Math.round(o.y)}, w: ${Math.round(o.width)}, h: ${Math.round(o.height)} }\`
`;
        out += `  - Current rect: \`{ x: ${Math.round(c.x)}, y: ${Math.round(c.y)}, w: ${Math.round(c.width)}, h: ${Math.round(c.height)} }\`
`;
      }
    }
    if (detailLevel !== "compact") {
      const movedSections = changed.filter((e) => e.posMoved).map((e) => ({
        label: e.section.label,
        originalRect: e.section.originalRect,
        currentRect: e.section.currentRect
      }));
      const patterns = analyzeLayoutPatterns(movedSections);
      if (patterns.length > 0) {
        out += "\n### Layout Summary\n";
        for (const line of patterns) {
          out += `- ${line}
`;
        }
      }
    }
    if (detailLevel !== "compact" && sections.length > 1) {
      out += "\n### All Sections (current positions)\n";
      const sortedSections = [...sections].sort((a, b) => {
        if (Math.abs(a.currentRect.y - b.currentRect.y) < 20) return a.currentRect.x - b.currentRect.x;
        return a.currentRect.y - b.currentRect.y;
      });
      for (const s2 of sortedSections) {
        const r = s2.currentRect;
        const moved = Math.abs(r.x - s2.originalRect.x) > 1 || Math.abs(r.y - s2.originalRect.y) > 1 || Math.abs(r.width - s2.originalRect.width) > 1 || Math.abs(r.height - s2.originalRect.height) > 1;
        out += `- ${s2.label}: \`${Math.round(r.width)}\xD7${Math.round(r.height)}px\` at \`(${Math.round(r.x)}, ${Math.round(r.y)})\`${moved ? " \u2190 suggested" : ""}
`;
      }
    }
    return out;
  }
  function getStorageKey(pathname) {
    return `${STORAGE_PREFIX}${pathname}`;
  }
  function loadAnnotations(pathname) {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(getStorageKey(pathname));
      if (!stored) return [];
      const data = JSON.parse(stored);
      const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1e3;
      return data.filter((a) => !a.timestamp || a.timestamp > cutoff);
    } catch {
      return [];
    }
  }
  function saveAnnotations(pathname, annotations) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(getStorageKey(pathname), JSON.stringify(annotations));
    } catch {
    }
  }
  function loadAllAnnotations() {
    const result = /* @__PURE__ */ new Map();
    if (typeof window === "undefined") return result;
    try {
      const cutoff = Date.now() - DEFAULT_RETENTION_DAYS * 24 * 60 * 60 * 1e3;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_PREFIX)) {
          const pathname = key.slice(STORAGE_PREFIX.length);
          const stored = localStorage.getItem(key);
          if (stored) {
            const data = JSON.parse(stored);
            const filtered = data.filter(
              (a) => !a.timestamp || a.timestamp > cutoff
            );
            if (filtered.length > 0) {
              result.set(pathname, filtered);
            }
          }
        }
      }
    } catch {
    }
    return result;
  }
  function saveAnnotationsWithSyncMarker(pathname, annotations, sessionId) {
    const marked = annotations.map((annotation) => ({
      ...annotation,
      _syncedTo: sessionId
    }));
    saveAnnotations(pathname, marked);
  }
  function loadDesignPlacements(pathname) {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(`${DESIGN_PREFIX}${pathname}`);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  function saveDesignPlacements(pathname, placements) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(`${DESIGN_PREFIX}${pathname}`, JSON.stringify(placements));
    } catch {
    }
  }
  function clearDesignPlacements(pathname) {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(`${DESIGN_PREFIX}${pathname}`);
    } catch {
    }
  }
  function loadRearrangeState(pathname) {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(`${REARRANGE_PREFIX}${pathname}`);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  function saveRearrangeState(pathname, state) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(`${REARRANGE_PREFIX}${pathname}`, JSON.stringify(state));
    } catch {
    }
  }
  function clearRearrangeState(pathname) {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(`${REARRANGE_PREFIX}${pathname}`);
    } catch {
    }
  }
  function loadWireframeState(pathname) {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(`${WIREFRAME_PREFIX}${pathname}`);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  function saveWireframeState(pathname, state) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(`${WIREFRAME_PREFIX}${pathname}`, JSON.stringify(state));
    } catch {
    }
  }
  function clearWireframeState(pathname) {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(`${WIREFRAME_PREFIX}${pathname}`);
    } catch {
    }
  }
  function getSessionStorageKey(pathname) {
    return `${SESSION_PREFIX}${pathname}`;
  }
  function loadSessionId(pathname) {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(getSessionStorageKey(pathname));
    } catch {
      return null;
    }
  }
  function saveSessionId(pathname, sessionId) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(getSessionStorageKey(pathname), sessionId);
    } catch {
    }
  }
  function clearSessionId(pathname) {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(getSessionStorageKey(pathname));
    } catch {
    }
  }
  function loadToolbarHidden() {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(TOOLBAR_HIDDEN_SESSION_KEY) === "1";
    } catch {
      return false;
    }
  }
  function saveToolbarHidden(hidden) {
    if (typeof window === "undefined") return;
    try {
      if (hidden) {
        sessionStorage.setItem(TOOLBAR_HIDDEN_SESSION_KEY, "1");
      } else {
        sessionStorage.removeItem(TOOLBAR_HIDDEN_SESSION_KEY);
      }
    } catch {
    }
  }
  async function createSession(endpoint, url) {
    const response = await fetch(`${endpoint}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.status}`);
    }
    return response.json();
  }
  async function getSession(endpoint, sessionId) {
    const response = await fetch(`${endpoint}/sessions/${sessionId}`);
    if (!response.ok) {
      throw new Error(`Failed to get session: ${response.status}`);
    }
    return response.json();
  }
  async function syncAnnotation(endpoint, sessionId, annotation) {
    const response = await fetch(`${endpoint}/sessions/${sessionId}/annotations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(annotation)
    });
    if (!response.ok) {
      throw new Error(`Failed to sync annotation: ${response.status}`);
    }
    return response.json();
  }
  async function updateAnnotation(endpoint, annotationId, data) {
    const response = await fetch(`${endpoint}/annotations/${annotationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Failed to update annotation: ${response.status}`);
    }
    return response.json();
  }
  async function deleteAnnotation(endpoint, annotationId) {
    const response = await fetch(`${endpoint}/annotations/${annotationId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete annotation: ${response.status}`);
    }
  }
  function resolveConfig(config) {
    const mode = config?.mode ?? "filtered";
    let skipExact = DEFAULT_SKIP_EXACT;
    if (config?.skipExact) {
      const additional = config.skipExact instanceof Set ? config.skipExact : new Set(config.skipExact);
      skipExact = /* @__PURE__ */ new Set([...DEFAULT_SKIP_EXACT, ...additional]);
    }
    return {
      maxComponents: config?.maxComponents ?? 6,
      maxDepth: config?.maxDepth ?? 30,
      mode,
      skipExact,
      skipPatterns: config?.skipPatterns ? [...DEFAULT_SKIP_PATTERNS, ...config.skipPatterns] : DEFAULT_SKIP_PATTERNS,
      userPatterns: config?.userPatterns ?? DEFAULT_USER_PATTERNS,
      filter: config?.filter
    };
  }
  function normalizeComponentName(name) {
    return name.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
  }
  function getAncestorClasses(element, maxDepth = 10) {
    const classes = /* @__PURE__ */ new Set();
    let current = element;
    let depth = 0;
    while (current && depth < maxDepth) {
      if (current.className && typeof current.className === "string") {
        current.className.split(/\s+/).forEach((cls) => {
          if (cls.length > 1) {
            const normalized = cls.replace(/[_][a-zA-Z0-9]{5,}.*$/, "").toLowerCase();
            if (normalized.length > 1) {
              classes.add(normalized);
            }
          }
        });
      }
      current = current.parentElement;
      depth++;
    }
    return classes;
  }
  function componentCorrelatesWithDOM(componentName, domClasses) {
    const normalized = normalizeComponentName(componentName);
    for (const cls of domClasses) {
      if (cls === normalized) return true;
      const componentWords = normalized.split("-").filter((w) => w.length > 2);
      const classWords = cls.split("-").filter((w) => w.length > 2);
      for (const cWord of componentWords) {
        for (const dWord of classWords) {
          if (cWord === dWord || cWord.includes(dWord) || dWord.includes(cWord)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function shouldIncludeComponent(name, depth, config, domClasses) {
    if (config.filter) {
      return config.filter(name, depth);
    }
    switch (config.mode) {
      case "all":
        return true;
      case "filtered":
        if (config.skipExact.has(name)) {
          return false;
        }
        if (config.skipPatterns.some((p) => p.test(name))) {
          return false;
        }
        return true;
      case "smart":
        if (config.skipExact.has(name)) {
          return false;
        }
        if (config.skipPatterns.some((p) => p.test(name))) {
          return false;
        }
        if (domClasses && componentCorrelatesWithDOM(name, domClasses)) {
          return true;
        }
        if (config.userPatterns.some((p) => p.test(name))) {
          return true;
        }
        return false;
      default:
        return true;
    }
  }
  function hasReactFiber(element) {
    return Object.keys(element).some(
      (key) => key.startsWith("__reactFiber$") || key.startsWith("__reactInternalInstance$") || key.startsWith("__reactProps$")
    );
  }
  function isReactPage() {
    if (reactDetectionCache !== null) {
      return reactDetectionCache;
    }
    if (typeof document === "undefined") {
      return false;
    }
    if (document.body && hasReactFiber(document.body)) {
      reactDetectionCache = true;
      return true;
    }
    const commonRoots = ["#root", "#app", "#__next", "[data-reactroot]"];
    for (const selector of commonRoots) {
      const el = document.querySelector(selector);
      if (el && hasReactFiber(el)) {
        reactDetectionCache = true;
        return true;
      }
    }
    if (document.body) {
      for (const child of document.body.children) {
        if (hasReactFiber(child)) {
          reactDetectionCache = true;
          return true;
        }
      }
    }
    reactDetectionCache = false;
    return false;
  }
  function getReactFiberKey(element) {
    const keys = Object.keys(element);
    return keys.find(
      (key) => key.startsWith("__reactFiber$") || key.startsWith("__reactInternalInstance$")
    ) || null;
  }
  function getFiberFromElement(element) {
    const key = getReactFiberKey(element);
    if (!key) return null;
    return element[key];
  }
  function getComponentNameFromType(type) {
    if (!type) return null;
    if (type.displayName) return type.displayName;
    if (type.name) return type.name;
    return null;
  }
  function getComponentNameFromFiber(fiber) {
    const { tag, type, elementType } = fiber;
    if (tag === FiberTags.HostComponent || tag === FiberTags.HostText || tag === FiberTags.HostHoistable || tag === FiberTags.HostSingleton) {
      return null;
    }
    if (tag === FiberTags.Fragment || tag === FiberTags.Mode || tag === FiberTags.Profiler || tag === FiberTags.DehydratedFragment) {
      return null;
    }
    if (tag === FiberTags.HostRoot || tag === FiberTags.HostPortal || tag === FiberTags.ScopeComponent || tag === FiberTags.OffscreenComponent || tag === FiberTags.LegacyHiddenComponent || tag === FiberTags.CacheComponent || tag === FiberTags.TracingMarkerComponent || tag === FiberTags.Throw || tag === FiberTags.ViewTransitionComponent || tag === FiberTags.ActivityComponent) {
      return null;
    }
    if (tag === FiberTags.ForwardRef) {
      const elType = elementType;
      if (elType?.render) {
        const innerName = getComponentNameFromType(elType.render);
        if (innerName) return innerName;
      }
      if (elType?.displayName) return elType.displayName;
      return getComponentNameFromType(type);
    }
    if (tag === FiberTags.MemoComponent || tag === FiberTags.SimpleMemoComponent) {
      const elType = elementType;
      if (elType?.type) {
        const innerName = getComponentNameFromType(elType.type);
        if (innerName) return innerName;
      }
      if (elType?.displayName) return elType.displayName;
      return getComponentNameFromType(type);
    }
    if (tag === FiberTags.ContextProvider) {
      const elType = type;
      if (elType?._context?.displayName) {
        return `${elType._context.displayName}.Provider`;
      }
      return null;
    }
    if (tag === FiberTags.ContextConsumer) {
      const elType = type;
      if (elType?.displayName) {
        return `${elType.displayName}.Consumer`;
      }
      return null;
    }
    if (tag === FiberTags.LazyComponent) {
      const elType = elementType;
      if (elType?._status === 1 && elType._result) {
        return getComponentNameFromType(elType._result);
      }
      return null;
    }
    if (tag === FiberTags.SuspenseComponent || tag === FiberTags.SuspenseListComponent) {
      return null;
    }
    if (tag === FiberTags.IncompleteClassComponent || tag === FiberTags.IncompleteFunctionComponent) {
      return getComponentNameFromType(type);
    }
    if (tag === FiberTags.FunctionComponent || tag === FiberTags.ClassComponent || tag === FiberTags.IndeterminateComponent) {
      return getComponentNameFromType(type);
    }
    return null;
  }
  function isMinifiedName(name) {
    if (name.length <= 2) return true;
    if (name.length <= 3 && name === name.toLowerCase()) return true;
    return false;
  }
  function getReactComponentName(element, config) {
    const resolved = resolveConfig(config);
    const useCache = resolved.mode === "all";
    if (useCache) {
      const cached = componentCacheAllRef.map.get(element);
      if (cached !== void 0) {
        return cached;
      }
    }
    if (!isReactPage()) {
      const result2 = { path: null, components: [] };
      if (useCache) {
        componentCacheAllRef.map.set(element, result2);
      }
      return result2;
    }
    const domClasses = resolved.mode === "smart" ? getAncestorClasses(element) : void 0;
    const components = [];
    try {
      let fiber = getFiberFromElement(element);
      let depth = 0;
      while (fiber && depth < resolved.maxDepth && components.length < resolved.maxComponents) {
        const name = getComponentNameFromFiber(fiber);
        if (name && !isMinifiedName(name) && shouldIncludeComponent(name, depth, resolved, domClasses)) {
          components.push(name);
        }
        fiber = fiber.return;
        depth++;
      }
    } catch {
      const result2 = { path: null, components: [] };
      if (useCache) {
        componentCacheAllRef.map.set(element, result2);
      }
      return result2;
    }
    if (components.length === 0) {
      const result2 = { path: null, components: [] };
      if (useCache) {
        componentCacheAllRef.map.set(element, result2);
      }
      return result2;
    }
    const path = components.slice().reverse().map((c) => `<${c}>`).join(" ");
    const result = { path, components };
    if (useCache) {
      componentCacheAllRef.map.set(element, result);
    }
    return result;
  }
  function getFiberFromElement2(element) {
    if (!element || typeof element !== "object") {
      return null;
    }
    const keys = Object.keys(element);
    const fiberKey = keys.find((key) => key.startsWith("__reactFiber$"));
    if (fiberKey) {
      return element[fiberKey] || null;
    }
    const instanceKey = keys.find((key) => key.startsWith("__reactInternalInstance$"));
    if (instanceKey) {
      return element[instanceKey] || null;
    }
    const possibleFiberKey = keys.find((key) => {
      if (!key.startsWith("__react")) return false;
      const value = element[key];
      return value && typeof value === "object" && "_debugSource" in value;
    });
    if (possibleFiberKey) {
      return element[possibleFiberKey] || null;
    }
    return null;
  }
  function getComponentName(fiber) {
    if (!fiber.type) {
      return null;
    }
    if (typeof fiber.type === "string") {
      return null;
    }
    if (typeof fiber.type === "object" || typeof fiber.type === "function") {
      const type = fiber.type;
      if (type.displayName) {
        return type.displayName;
      }
      if (type.name) {
        return type.name;
      }
    }
    return null;
  }
  function findDebugSource(fiber, maxDepth = 50) {
    let current = fiber;
    let depth = 0;
    while (current && depth < maxDepth) {
      if (current._debugSource) {
        return {
          source: current._debugSource,
          componentName: getComponentName(current)
        };
      }
      if (current._debugOwner?._debugSource) {
        return {
          source: current._debugOwner._debugSource,
          componentName: getComponentName(current._debugOwner)
        };
      }
      current = current.return;
      depth++;
    }
    return null;
  }
  function findDebugSourceReact19(fiber) {
    let current = fiber;
    let depth = 0;
    const maxDepth = 50;
    while (current && depth < maxDepth) {
      const anyFiber = current;
      const possibleSourceKeys = [
        "_debugSource",
        "__source",
        "_source",
        "debugSource"
      ];
      for (const key of possibleSourceKeys) {
        const source = anyFiber[key];
        if (source && typeof source === "object" && "fileName" in source) {
          return {
            source,
            componentName: getComponentName(current)
          };
        }
      }
      if (current.memoizedProps) {
        const props = current.memoizedProps;
        if (props.__source && typeof props.__source === "object") {
          const source = props.__source;
          if (source.fileName && source.lineNumber) {
            return {
              source: {
                fileName: source.fileName,
                lineNumber: source.lineNumber,
                columnNumber: source.columnNumber
              },
              componentName: getComponentName(current)
            };
          }
        }
      }
      current = current.return;
      depth++;
    }
    return null;
  }
  function unwrapComponentType(fiber) {
    const tag = fiber.tag;
    const type = fiber.type;
    const elementType = fiber.elementType;
    if (typeof type === "string" || type == null) return null;
    if (typeof type === "function" && type.prototype?.isReactComponent) {
      return null;
    }
    if ((tag === FIBER_TAGS.FunctionComponent || tag === FIBER_TAGS.IndeterminateComponent) && typeof type === "function") {
      return type;
    }
    if (tag === FIBER_TAGS.ForwardRef && elementType) {
      const render = elementType.render;
      if (typeof render === "function") return render;
    }
    if ((tag === FIBER_TAGS.MemoComponent || tag === FIBER_TAGS.SimpleMemoComponent) && elementType) {
      const inner = elementType.type;
      if (typeof inner === "function") return inner;
    }
    if (typeof type === "function") return type;
    return null;
  }
  function getReactDispatcher() {
    const reactModule = import_react7.default;
    const r19 = reactModule.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (r19 && "H" in r19) {
      return {
        get: () => r19.H,
        set: (d) => {
          r19.H = d;
        }
      };
    }
    const r18 = reactModule.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    if (r18) {
      const dispatcher = r18.ReactCurrentDispatcher;
      if (dispatcher && "current" in dispatcher) {
        return {
          get: () => dispatcher.current,
          set: (d) => {
            dispatcher.current = d;
          }
        };
      }
    }
    return null;
  }
  function parseComponentFrame(stack) {
    const lines = stack.split("\n");
    const skipPatterns = [
      /source-location/,
      /\/dist\/index\./,
      // Our bundled output (dist/index.mjs, dist/index.js)
      /node_modules\//,
      // Any package in node_modules
      /react-dom/,
      /react\.development/,
      /react\.production/,
      /chunk-[A-Z0-9]+/i,
      /react-stack-bottom-frame/,
      /react-reconciler/,
      /scheduler/,
      /<anonymous>/
      // Proxy handler frames
    ];
    const v8Re = /^\s*at\s+(?:.*?\s+\()?(.+?):(\d+):(\d+)\)?$/;
    const webkitRe = /^[^@]*@(.+?):(\d+):(\d+)$/;
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (skipPatterns.some((p) => p.test(trimmed))) continue;
      const match = v8Re.exec(trimmed) || webkitRe.exec(trimmed);
      if (match) {
        return {
          fileName: match[1],
          line: parseInt(match[2], 10),
          column: parseInt(match[3], 10)
        };
      }
    }
    return null;
  }
  function cleanSourcePath(rawPath) {
    let path = rawPath;
    path = path.replace(/[?#].*$/, "");
    path = path.replace(/^turbopack:\/\/\/\[project\]\//, "");
    path = path.replace(/^webpack-internal:\/\/\/\.\//, "");
    path = path.replace(/^webpack-internal:\/\/\//, "");
    path = path.replace(/^webpack:\/\/\/\.\//, "");
    path = path.replace(/^webpack:\/\/\//, "");
    path = path.replace(/^turbopack:\/\/\//, "");
    path = path.replace(/^https?:\/\/[^/]+\//, "");
    path = path.replace(/^file:\/\/\//, "/");
    path = path.replace(/^\([^)]+\)\/\.\//, "");
    path = path.replace(/^\.\//, "");
    return path;
  }
  function probeComponentSource(fiber) {
    const fn = unwrapComponentType(fiber);
    if (!fn) return null;
    if (sourceProbeCache.has(fn)) {
      return sourceProbeCache.get(fn);
    }
    const dispatcher = getReactDispatcher();
    if (!dispatcher) {
      sourceProbeCache.set(fn, null);
      return null;
    }
    const original = dispatcher.get();
    let result = null;
    try {
      const stackCapturingDispatcher = new Proxy(
        {},
        {
          get() {
            throw new Error("probe");
          }
        }
      );
      dispatcher.set(stackCapturingDispatcher);
      try {
        fn({});
      } catch (e) {
        if (e instanceof Error && e.message === "probe" && e.stack) {
          const frame = parseComponentFrame(e.stack);
          if (frame) {
            const cleaned = cleanSourcePath(frame.fileName);
            result = {
              fileName: cleaned,
              lineNumber: frame.line,
              columnNumber: frame.column,
              componentName: getComponentName(fiber) || void 0
            };
          }
        }
      }
    } finally {
      dispatcher.set(original);
    }
    sourceProbeCache.set(fn, result);
    return result;
  }
  function probeSourceWalk(fiber, maxDepth = 15) {
    let current = fiber;
    let depth = 0;
    while (current && depth < maxDepth) {
      const source = probeComponentSource(current);
      if (source) return source;
      current = current.return;
      depth++;
    }
    return null;
  }
  function getSourceLocation(element) {
    const fiber = getFiberFromElement2(element);
    if (!fiber) {
      return {
        found: false,
        reason: "no-fiber",
        isReactApp: false,
        isProduction: false
      };
    }
    let debugInfo = findDebugSource(fiber);
    if (!debugInfo) {
      debugInfo = findDebugSourceReact19(fiber);
    }
    if (debugInfo?.source) {
      return {
        found: true,
        source: {
          fileName: debugInfo.source.fileName,
          lineNumber: debugInfo.source.lineNumber,
          columnNumber: debugInfo.source.columnNumber,
          componentName: debugInfo.componentName || void 0
        },
        isReactApp: true,
        isProduction: false
      };
    }
    const probed = probeSourceWalk(fiber);
    if (probed) {
      return { found: true, source: probed, isReactApp: true, isProduction: false };
    }
    return {
      found: false,
      reason: "no-debug-source",
      isReactApp: true,
      isProduction: false
    };
  }
  function formatSourceLocation(source, format = "path") {
    const { fileName, lineNumber, columnNumber } = source;
    let location = `${fileName}:${lineNumber}`;
    if (columnNumber !== void 0) {
      location += `:${columnNumber}`;
    }
    if (format === "vscode") {
      return `vscode://file${fileName.startsWith("/") ? "" : "/"}${location}`;
    }
    return location;
  }
  function findNearestComponentSource(element, maxAncestors = 10) {
    let current = element;
    let depth = 0;
    while (current && depth < maxAncestors) {
      const result = getSourceLocation(current);
      if (result.found) {
        return result;
      }
      current = current.parentElement;
      depth++;
    }
    return getSourceLocation(element);
  }
  function generateOutput(annotations, pathname, detailLevel = "standard") {
    if (annotations.length === 0) return "";
    const viewport = typeof window !== "undefined" ? `${window.innerWidth}\xD7${window.innerHeight}` : "unknown";
    let output = `## Page Feedback: ${pathname}
`;
    if (detailLevel === "forensic") {
      output += `
**Environment:**
`;
      output += `- Viewport: ${viewport}
`;
      if (typeof window !== "undefined") {
        output += `- URL: ${window.location.href}
`;
        output += `- User Agent: ${navigator.userAgent}
`;
        output += `- Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}
`;
        output += `- Device Pixel Ratio: ${window.devicePixelRatio}
`;
      }
      output += `
---
`;
    } else if (detailLevel !== "compact") {
      output += `**Viewport:** ${viewport}
`;
    }
    output += "\n";
    annotations.forEach((a, i) => {
      if (detailLevel === "compact") {
        output += `${i + 1}. **${a.element}**${a.sourceFile ? ` (${a.sourceFile})` : ""}: ${a.comment}`;
        if (a.selectedText) {
          output += ` (re: "${a.selectedText.slice(0, 30)}${a.selectedText.length > 30 ? "..." : ""}")`;
        }
        output += "\n";
      } else if (detailLevel === "forensic") {
        output += `### ${i + 1}. ${a.element}
`;
        if (a.isMultiSelect && a.fullPath) {
          output += `*Forensic data shown for first element of selection*
`;
        }
        if (a.fullPath) {
          output += `**Full DOM Path:** ${a.fullPath}
`;
        }
        if (a.cssClasses) {
          output += `**CSS Classes:** ${a.cssClasses}
`;
        }
        if (a.boundingBox) {
          output += `**Position:** x:${Math.round(a.boundingBox.x)}, y:${Math.round(a.boundingBox.y)} (${Math.round(a.boundingBox.width)}\xD7${Math.round(a.boundingBox.height)}px)
`;
        }
        output += `**Annotation at:** ${a.x.toFixed(1)}% from left, ${Math.round(a.y)}px from top
`;
        if (a.selectedText) {
          output += `**Selected text:** "${a.selectedText}"
`;
        }
        if (a.nearbyText && !a.selectedText) {
          output += `**Context:** ${a.nearbyText.slice(0, 100)}
`;
        }
        if (a.computedStyles) {
          output += `**Computed Styles:** ${a.computedStyles}
`;
        }
        if (a.accessibility) {
          output += `**Accessibility:** ${a.accessibility}
`;
        }
        if (a.nearbyElements) {
          output += `**Nearby Elements:** ${a.nearbyElements}
`;
        }
        if (a.sourceFile) {
          output += `**Source:** ${a.sourceFile}
`;
        }
        if (a.reactComponents) {
          output += `**React:** ${a.reactComponents}
`;
        }
        output += `**Feedback:** ${a.comment}

`;
      } else {
        output += `### ${i + 1}. ${a.element}
`;
        output += `**Location:** ${a.elementPath}
`;
        if (a.sourceFile) {
          output += `**Source:** ${a.sourceFile}
`;
        }
        if (a.reactComponents) {
          output += `**React:** ${a.reactComponents}
`;
        }
        if (detailLevel === "detailed") {
          if (a.cssClasses) {
            output += `**Classes:** ${a.cssClasses}
`;
          }
          if (a.boundingBox) {
            output += `**Position:** ${Math.round(a.boundingBox.x)}px, ${Math.round(a.boundingBox.y)}px (${Math.round(a.boundingBox.width)}\xD7${Math.round(a.boundingBox.height)}px)
`;
          }
        }
        if (a.selectedText) {
          output += `**Selected text:** "${a.selectedText}"
`;
        }
        if (detailLevel === "detailed" && a.nearbyText && !a.selectedText) {
          output += `**Context:** ${a.nearbyText.slice(0, 100)}
`;
        }
        output += `**Feedback:** ${a.comment}

`;
      }
    });
    return output.trim();
  }
  function AnnotationMarker({
    annotation,
    globalIndex,
    layerIndex,
    layerSize,
    isExiting,
    isClearing,
    isAnimated,
    isHovered,
    isDeleting,
    isEditingAny,
    renumberFrom,
    markerClickBehavior,
    tooltipStyle,
    onHoverEnter,
    onHoverLeave,
    onClick,
    onContextMenu
  }) {
    const showDeleteState = (isHovered || isDeleting) && !isEditingAny;
    const showDeleteHover = showDeleteState && markerClickBehavior === "delete";
    const isMulti = annotation.isMultiSelect;
    const markerColor = isMulti ? "var(--agentation-color-green)" : "var(--agentation-color-accent)";
    const animClass = isExiting ? styles_module_default5.exit : isClearing ? styles_module_default5.clearing : !isAnimated ? styles_module_default5.enter : "";
    const animationDelay = isExiting ? `${(layerSize - 1 - layerIndex) * 20}ms` : `${layerIndex * 20}ms`;
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "div",
      {
        className: `${styles_module_default5.marker} ${isMulti ? styles_module_default5.multiSelect : ""} ${animClass} ${showDeleteHover ? styles_module_default5.hovered : ""}`,
        "data-annotation-marker": true,
        style: {
          left: `${annotation.x}%`,
          top: annotation.y,
          backgroundColor: showDeleteHover ? void 0 : markerColor,
          animationDelay
        },
        onMouseEnter: () => onHoverEnter(annotation),
        onMouseLeave: onHoverLeave,
        onClick: (e) => {
          e.stopPropagation();
          if (!isExiting) onClick(annotation);
        },
        onContextMenu: onContextMenu ? (e) => {
          if (markerClickBehavior === "delete") {
            e.preventDefault();
            e.stopPropagation();
            if (!isExiting) onContextMenu(annotation);
          }
        } : void 0,
        children: [
          showDeleteState ? showDeleteHover ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(IconXmark, { size: isMulti ? 18 : 16 }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(IconEdit, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "span",
            {
              className: renumberFrom !== null && globalIndex >= renumberFrom ? styles_module_default5.renumber : void 0,
              children: globalIndex + 1
            }
          ),
          isHovered && !isEditingAny && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
            "div",
            {
              className: `${styles_module_default5.markerTooltip} ${styles_module_default5.enter}`,
              style: tooltipStyle,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: styles_module_default5.markerQuote, children: [
                  annotation.element,
                  annotation.selectedText && ` "${annotation.selectedText.slice(0, 30)}${annotation.selectedText.length > 30 ? "..." : ""}"`
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: styles_module_default5.markerNote, children: annotation.comment })
              ]
            }
          )
        ]
      }
    );
  }
  function PendingMarker({
    x,
    y,
    isMultiSelect,
    isExiting
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "div",
      {
        className: `${styles_module_default5.marker} ${styles_module_default5.pending} ${isMultiSelect ? styles_module_default5.multiSelect : ""} ${isExiting ? styles_module_default5.exit : styles_module_default5.enter}`,
        style: {
          left: `${x}%`,
          top: y,
          backgroundColor: isMultiSelect ? "var(--agentation-color-green)" : "var(--agentation-color-accent)"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(IconPlus, { size: 12 })
      }
    );
  }
  function ExitingMarker({ annotation, fixed }) {
    const isMulti = annotation.isMultiSelect;
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "div",
      {
        className: `${styles_module_default5.marker} ${fixed ? styles_module_default5.fixed : ""} ${styles_module_default5.hovered} ${isMulti ? styles_module_default5.multiSelect : ""} ${styles_module_default5.exit}`,
        "data-annotation-marker": true,
        style: {
          left: `${annotation.x}%`,
          top: annotation.y
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(IconXmark, { size: isMulti ? 12 : 10 })
      }
    );
  }
  function SettingsPanel({
    settings,
    onSettingsChange,
    isDarkMode,
    onToggleTheme,
    isDevMode,
    connectionStatus,
    endpoint,
    isVisible,
    toolbarNearBottom,
    settingsPage,
    onSettingsPageChange,
    onHideToolbar
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "div",
      {
        className: `${styles_module_default9.settingsPanel} ${isVisible ? styles_module_default9.enter : styles_module_default9.exit}`,
        style: toolbarNearBottom ? { bottom: "auto", top: "calc(100% + 0.5rem)" } : void 0,
        "data-agentation-settings-panel": true,
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsPanelContainer, children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
            "div",
            {
              className: `${styles_module_default9.settingsPage} ${settingsPage === "automations" ? styles_module_default9.slideLeft : ""}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsHeader, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("a", { className: styles_module_default9.settingsBrand, href: "https://agentation.com", target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("svg", { width: "72", height: "16", viewBox: "0 0 676 151", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M79.6666 100.561L104.863 15.5213C107.828 4.03448 99.1201 -3.00582 88.7449 1.25541L3.52015 39.6065C1.48217 40.5329 0 42.7562 0 45.1647C0 48.6848 2.77907 51.4639 6.29922 51.4639C7.22558 51.4639 8.15193 51.2786 9.07829 50.9081L93.7472 12.7422C97.2674 11.0748 93.7472 8.29572 92.6356 12.1864L67.624 97.2259C66.5123 100.931 69.4767 105.193 73.7379 105.193C76.517 105.193 79.1108 103.155 79.6666 100.561ZM663.641 100.005C665.679 107.231 677.537 104.081 675.499 96.8553L666.05 66.2856C663.456 57.7631 655.489 55.7251 648.82 61.098L618.991 86.6654C617.324 87.9623 621.029 89.815 621.214 88.1476L625.846 61.6538C626.958 55.3546 624.179 50.5375 615.841 50.5375L579.158 51.0934C576.008 51.0934 578.417 53.8724 578.417 57.022C578.417 60.1716 580.825 61.6538 583.975 61.6538L616.212 60.9127C616.397 60.9127 614.544 59.6158 614.544 59.8011L609.727 88.7034C607.875 99.6344 617.694 102.784 626.031 95.7437L655.86 70.1763L654.192 69.6205L663.641 100.005ZM571.191 89.0739C555.443 88.7034 562.298 61.4685 578.787 61.8391C594.72 62.0243 587.124 89.2592 571.191 89.0739ZM571.006 100.375C601.575 100.931 611.024 51.6492 579.158 51.0934C547.847 50.5375 540.065 99.8197 571.006 100.375ZM521.909 46.4616C525.985 46.4616 529.505 42.9414 529.505 38.6802C529.505 34.4189 525.985 31.0841 521.909 31.0841C517.833 31.0841 514.127 34.6042 514.127 38.6802C514.127 42.7562 517.648 46.4616 521.909 46.4616ZM472.256 103.525C493.192 103.71 515.98 73.3259 519.13 62.3949L509.866 60.9127C505.234 73.3259 497.638 101.672 519.871 102.043C536.545 102.228 552.479 85.3685 563.595 70.1763C564.151 69.2499 564.706 68.1383 564.706 66.8414C564.706 63.6918 563.965 61.098 560.816 61.098C558.963 61.098 557.296 62.0243 556.184 63.5065C546.365 77.0313 530.802 90.9266 522.094 90.7414C511.904 90.5561 517.462 71.4732 519.871 64.9887C523.391 55.7251 512.831 53.5019 509.681 60.9127C506.531 68.6941 488.19 92.4088 475.035 92.2235C467.439 92.0383 464.29 83.8863 472.441 59.9864L486.707 17.7445C487.634 14.4097 485.41 10.519 481.334 10.519C478.741 10.519 476.517 12.1864 475.962 14.4097L461.696 56.4662C451.506 86.4801 455.211 103.155 472.256 103.525ZM447.43 42.5709L496.527 41.4593C499.306 41.4593 501.529 39.0507 501.529 36.2717C501.529 33.3073 499.306 31.0841 496.341 31.0841L447.245 32.1957C444.466 32.1957 442.242 34.4189 442.242 37.3833C442.242 40.1624 444.466 42.5709 447.43 42.5709ZM422.974 106.304C435.387 106.489 457.249 94.8173 472.441 53.8724C473.553 50.7228 472.071 48.3143 468.365 48.3143C466.142 48.3143 464.29 49.6112 463.548 51.6492C450.394 87.2212 431.682 96.1142 424.456 95.929C419.454 95.929 417.972 93.3352 418.713 85.5538C419.454 78.1429 410.376 74.9933 406.114 81.1073C401.297 87.777 394.442 94.2615 385.549 94.0763C370.172 93.891 376.471 67.0267 399.815 67.3972C408.338 67.5825 414.452 71.4732 417.045 76.6608C417.786 78.3282 419.454 79.6251 421.492 79.6251C424.271 79.6251 426.679 77.2166 426.679 74.4375C426.679 73.6964 426.494 72.9553 426.124 72.2143C421.862 63.6918 412.414 57.3926 400 57.2073C363.502 56.6515 353.497 104.451 383.326 104.822C397.036 105.193 410.005 94.0763 413.34 85.9243C412.599 86.8507 408.338 86.6654 408.523 84.4422C407.411 97.4111 410.931 106.119 422.974 106.304ZM335.897 104.266C335.897 115.012 347.569 117.606 347.569 103.34C347.569 89.0739 358.5 54.4282 361.464 45.1647L396.666 43.6825C405.929 43.1267 404.262 33.1221 397.036 33.3073L364.984 34.4189L368.875 22.7469C369.801 20.1531 370.542 17.9298 370.542 16.2624C370.542 13.4833 368.504 11.8159 365.911 11.8159C362.946 11.8159 360.352 12.7422 357.573 21.0794L352.942 35.16L330.153 36.0864C326.263 36.4569 323.483 38.1244 323.483 41.6445C323.483 45.5352 326.448 47.0174 330.709 46.8321L349.421 45.9058C345.901 56.6515 335.897 90.7414 335.897 104.266ZM186.939 78.6988C193.979 56.4662 212.877 54.984 212.877 62.9507C212.877 68.3236 203.984 77.0313 186.939 78.6988ZM113.942 150.955C142.844 152.437 159.704 111.492 160.63 80.5515C161.556 73.3259 153.96 70.3616 148.773 75.7344C141.918 83.1453 129.505 93.1499 119.685 93.1499C103.011 93.1499 116.165 59.8011 143.956 59.8011C149.514 59.8011 153.59 61.6538 156.184 64.0623C160.815 68.3236 170.82 62.0243 165.818 56.0957C161.927 51.4639 155.072 48.129 144.882 48.129C102.455 48.129 83.7426 105.007 116.721 105.007C134.692 105.007 151.367 88.3329 155.257 82.7747C154.516 83.5158 149.329 81.2925 149.699 79.4398L149.143 83.5158C148.958 107.045 134.322 141.506 116.536 139.838C113.386 139.468 112.089 137.43 112.089 134.836C112.089 128.907 122.094 119.273 145.067 113.53C159.518 109.824 152.293 101.487 143.4 104.081C111.163 113.53 99.6759 127.425 99.6759 137.8C99.6759 145.026 105.605 150.584 113.942 150.955ZM194.72 109.454C214.359 109.454 239 95.3732 251.228 77.9577C250.301 82.96 246.596 96.8553 246.596 101.487C246.596 110.01 254.748 109.454 261.232 102.784L288.097 75.5491L290.32 85.7391C293.284 99.4491 299.213 104.822 308.847 104.822C326.263 104.822 342.196 85.7391 349.421 74.8081L344.049 63.6918C339.787 74.8081 321.631 92.5941 311.626 92.5941C306.994 92.5941 304.771 89.815 303.289 83.7011L300.325 71.2879C297.916 60.7275 289.023 58.3189 279.018 68.1383L261.788 84.8127L264.382 69.991C266.235 59.2453 255.674 58.1337 250.116 65.915C241.779 77.0313 216.767 97.7817 196.387 97.7817C187.865 97.7817 185.456 93.7057 185.456 88.3329C230.848 84.998 239.185 47.2027 208.986 47.2027C172.858 47.2027 157.11 109.454 194.72 109.454Z", fill: "currentColor" }) }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: styles_module_default9.settingsVersion, children: [
                    "v",
                    "3.0.2"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    "button",
                    {
                      className: styles_module_default9.themeToggle,
                      onClick: onToggleTheme,
                      title: isDarkMode ? "Switch to light mode" : "Switch to dark mode",
                      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: styles_module_default9.themeIconWrapper, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                        "span",
                        {
                          className: styles_module_default9.themeIcon,
                          children: isDarkMode ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconSun, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconMoon, { size: 20 })
                        },
                        isDarkMode ? "sun" : "moon"
                      ) })
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.divider }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsSection, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsRow, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsLabel, children: [
                      "Output Detail",
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(HelpTooltip, { content: "Controls how much detail is included in the copied output" })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                      "button",
                      {
                        className: styles_module_default9.cycleButton,
                        onClick: () => {
                          const currentIndex = OUTPUT_DETAIL_OPTIONS.findIndex(
                            (opt) => opt.value === settings.outputDetail
                          );
                          const nextIndex = (currentIndex + 1) % OUTPUT_DETAIL_OPTIONS.length;
                          onSettingsChange({
                            outputDetail: OUTPUT_DETAIL_OPTIONS[nextIndex].value
                          });
                        },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            "span",
                            {
                              className: styles_module_default9.cycleButtonText,
                              children: OUTPUT_DETAIL_OPTIONS.find(
                                (opt) => opt.value === settings.outputDetail
                              )?.label
                            },
                            settings.outputDetail
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: styles_module_default9.cycleDots, children: OUTPUT_DETAIL_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            "span",
                            {
                              className: `${styles_module_default9.cycleDot} ${settings.outputDetail === option.value ? styles_module_default9.active : ""}`
                            },
                            option.value
                          )) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                    "div",
                    {
                      className: `${styles_module_default9.settingsRow} ${styles_module_default9.settingsRowMarginTop} ${!isDevMode ? styles_module_default9.settingsRowDisabled : ""}`,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsLabel, children: [
                          "React Components",
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            HelpTooltip,
                            {
                              content: !isDevMode ? "Disabled \u2014 production builds minify component names, making detection unreliable. Use in development mode." : "Include React component names in annotations"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                          Switch,
                          {
                            checked: isDevMode && settings.reactEnabled,
                            onChange: (e) => onSettingsChange({ reactEnabled: e.target.checked }),
                            disabled: !isDevMode
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                    "div",
                    {
                      className: `${styles_module_default9.settingsRow} ${styles_module_default9.settingsRowMarginTop}`,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsLabel, children: [
                          "Hide Until Restart",
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(HelpTooltip, { content: "Hides the toolbar until you open a new tab" })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                          Switch,
                          {
                            checked: false,
                            onChange: (e) => {
                              if (e.target.checked) onHideToolbar();
                            }
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.divider }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsSection, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    "div",
                    {
                      className: `${styles_module_default9.settingsLabel} ${styles_module_default9.settingsLabelMarker}`,
                      children: "Marker Color"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.colorOptions, children: COLOR_OPTIONS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    "button",
                    {
                      className: `${styles_module_default9.colorOption} ${settings.annotationColorId === color.id ? styles_module_default9.selected : ""}`,
                      style: {
                        "--swatch": color.srgb,
                        "--swatch-p3": color.p3
                      },
                      onClick: () => onSettingsChange({ annotationColorId: color.id }),
                      title: color.label,
                      type: "button"
                    },
                    color.id
                  )) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.divider }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsSection, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    CheckboxField,
                    {
                      className: "checkbox-field",
                      label: "Clear on copy/send",
                      checked: settings.autoClearAfterCopy,
                      onChange: (e) => onSettingsChange({ autoClearAfterCopy: e.target.checked }),
                      tooltip: "Automatically clear annotations after copying"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    CheckboxField,
                    {
                      className: styles_module_default9.checkboxField,
                      label: "Block page interactions",
                      checked: settings.blockInteractions,
                      onChange: (e) => onSettingsChange({ blockInteractions: e.target.checked })
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.divider }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                  "button",
                  {
                    className: styles_module_default9.settingsNavLink,
                    onClick: () => onSettingsPageChange("automations"),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: "Manage MCP & Webhooks" }),
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: styles_module_default9.settingsNavLinkRight, children: [
                        endpoint && connectionStatus !== "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                          "span",
                          {
                            className: `${styles_module_default9.mcpNavIndicator} ${styles_module_default9[connectionStatus]}`
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                          "svg",
                          {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                              "path",
                              {
                                d: "M7.5 12.5L12 8L7.5 3.5",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                              }
                            )
                          }
                        )
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
            "div",
            {
              className: `${styles_module_default9.settingsPage} ${styles_module_default9.automationsPage} ${settingsPage === "automations" ? styles_module_default9.slideIn : ""}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                  "button",
                  {
                    className: styles_module_default9.settingsBackButton,
                    onClick: () => onSettingsPageChange("main"),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconChevronLeft, { size: 16 }),
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: "Manage MCP & Webhooks" })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.divider }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsSection, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsRow, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: styles_module_default9.automationHeader, children: [
                      "MCP Connection",
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(HelpTooltip, { content: "Connect via Model Context Protocol to let AI agents like Claude Code receive annotations in real-time." })
                    ] }),
                    endpoint && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                      "div",
                      {
                        className: `${styles_module_default9.mcpStatusDot} ${styles_module_default9[connectionStatus]}`,
                        title: connectionStatus === "connected" ? "Connected" : connectionStatus === "connecting" ? "Connecting..." : "Disconnected"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                    "p",
                    {
                      className: styles_module_default9.automationDescription,
                      style: { paddingBottom: 6 },
                      children: [
                        "MCP connection allows agents to receive and act on annotations.",
                        " ",
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                          "a",
                          {
                            href: "https://agentation.dev/mcp",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: styles_module_default9.learnMoreLink,
                            children: "Learn more"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: styles_module_default9.divider }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                  "div",
                  {
                    className: `${styles_module_default9.settingsSection} ${styles_module_default9.settingsSectionGrow}`,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.settingsRow, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: styles_module_default9.automationHeader, children: [
                          "Webhooks",
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(HelpTooltip, { content: "Send annotation data to any URL endpoint when annotations change. Useful for custom integrations." })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: styles_module_default9.autoSendContainer, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            "label",
                            {
                              htmlFor: "agentation-auto-send",
                              className: `${styles_module_default9.autoSendLabel} ${settings.webhooksEnabled ? styles_module_default9.active : ""} ${!settings.webhookUrl ? styles_module_default9.disabled : ""}`,
                              children: "Auto-Send"
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            Switch,
                            {
                              id: "agentation-auto-send",
                              checked: settings.webhooksEnabled,
                              onChange: (e) => onSettingsChange({
                                webhooksEnabled: e.target.checked
                              }),
                              disabled: !settings.webhookUrl
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: styles_module_default9.automationDescription, children: "The webhook URL will receive live annotation changes and annotation data." }),
                      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                        "textarea",
                        {
                          className: styles_module_default9.webhookUrlInput,
                          placeholder: "Webhook URL",
                          value: settings.webhookUrl,
                          onKeyDown: (e) => e.stopPropagation(),
                          onChange: (e) => onSettingsChange({ webhookUrl: e.target.value })
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] })
      }
    );
  }
  function identifyElementWithReact(element, reactMode = "filtered") {
    const { name: elementName, path } = identifyElement(element);
    if (reactMode === "off") {
      return { name: elementName, elementName, path, reactComponents: null };
    }
    const reactInfo = getReactComponentName(element, { mode: reactMode });
    return {
      name: reactInfo.path ? `${reactInfo.path} ${elementName}` : elementName,
      elementName,
      path,
      reactComponents: reactInfo.path
    };
  }
  function deepElementFromPoint(x, y) {
    let element = document.elementFromPoint(x, y);
    if (!element) return null;
    while (element?.shadowRoot) {
      const deeper = element.shadowRoot.elementFromPoint(x, y);
      if (!deeper || deeper === element) break;
      element = deeper;
    }
    return element;
  }
  function isElementFixed(element) {
    let current = element;
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const position = style.position;
      if (position === "fixed" || position === "sticky") {
        return true;
      }
      current = current.parentElement;
    }
    return false;
  }
  function isRenderableAnnotation(annotation) {
    return annotation.status !== "resolved" && annotation.status !== "dismissed";
  }
  function detectSourceFile(element) {
    const result = getSourceLocation(element);
    const loc = result.found ? result : findNearestComponentSource(element);
    if (loc.found && loc.source) {
      return formatSourceLocation(loc.source, "path");
    }
    return void 0;
  }
  function PageFeedbackToolbarCSS({
    demoAnnotations,
    demoDelay = 1e3,
    enableDemoMode = false,
    onAnnotationAdd,
    onAnnotationDelete,
    onAnnotationUpdate,
    onAnnotationsClear,
    onCopy,
    onSubmit,
    copyToClipboard = true,
    endpoint,
    sessionId: initialSessionId,
    onSessionCreated,
    webhookUrl,
    className: userClassName
  } = {}) {
    const [isActive, setIsActive] = (0, import_react.useState)(false);
    const [annotations, setAnnotations] = (0, import_react.useState)([]);
    const [showMarkers, setShowMarkers] = (0, import_react.useState)(true);
    const [isToolbarHidden, setIsToolbarHidden] = (0, import_react.useState)(() => loadToolbarHidden());
    const [isToolbarHiding, setIsToolbarHiding] = (0, import_react.useState)(false);
    const portalWrapperRef = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      const stop = (e) => {
        const wrapper = portalWrapperRef.current;
        if (wrapper && wrapper.contains(e.target)) {
          e.stopPropagation();
        }
      };
      const events = ["mousedown", "click", "pointerdown"];
      events.forEach((evt) => document.body.addEventListener(evt, stop));
      return () => {
        events.forEach((evt) => document.body.removeEventListener(evt, stop));
      };
    }, []);
    const [markersVisible, setMarkersVisible] = (0, import_react.useState)(false);
    const [markersExiting, setMarkersExiting] = (0, import_react.useState)(false);
    const [hoverInfo, setHoverInfo] = (0, import_react.useState)(null);
    const [hoverPosition, setHoverPosition] = (0, import_react.useState)({ x: 0, y: 0 });
    const [pendingAnnotation, setPendingAnnotation] = (0, import_react.useState)(null);
    const [copied, setCopied] = (0, import_react.useState)(false);
    const [sendState, setSendState] = (0, import_react.useState)("idle");
    const [cleared, setCleared] = (0, import_react.useState)(false);
    const [isClearing, setIsClearing] = (0, import_react.useState)(false);
    const [hoveredMarkerId, setHoveredMarkerId] = (0, import_react.useState)(null);
    const [hoveredTargetElement, setHoveredTargetElement] = (0, import_react.useState)(null);
    const [hoveredTargetElements, setHoveredTargetElements] = (0, import_react.useState)([]);
    const [deletingMarkerId, setDeletingMarkerId] = (0, import_react.useState)(null);
    const [renumberFrom, setRenumberFrom] = (0, import_react.useState)(null);
    const [editingAnnotation, setEditingAnnotation] = (0, import_react.useState)(
      null
    );
    const [editingTargetElement, setEditingTargetElement] = (0, import_react.useState)(null);
    const [editingTargetElements, setEditingTargetElements] = (0, import_react.useState)([]);
    const [scrollY, setScrollY] = (0, import_react.useState)(0);
    const [isScrolling, setIsScrolling] = (0, import_react.useState)(false);
    const [mounted, setMounted] = (0, import_react.useState)(false);
    const [isFrozen, setIsFrozen] = (0, import_react.useState)(false);
    const [showSettings, setShowSettings] = (0, import_react.useState)(false);
    const [showSettingsVisible, setShowSettingsVisible] = (0, import_react.useState)(false);
    const [settingsPage, setSettingsPage] = (0, import_react.useState)(
      "main"
    );
    const [tooltipsHidden, setTooltipsHidden] = (0, import_react.useState)(false);
    const [isDesignMode, setIsDesignMode] = (0, import_react.useState)(false);
    const [designOverlayExiting, setDesignOverlayExiting] = (0, import_react.useState)(false);
    const [designPlacements, setDesignPlacements] = (0, import_react.useState)([]);
    const [activeDesignComponent, setActiveDesignComponent] = (0, import_react.useState)(null);
    const designPlacementsLoaded = (0, import_react.useRef)(false);
    const [blankCanvas, setBlankCanvas] = (0, import_react.useState)(false);
    const [canvasReady, setCanvasReady] = (0, import_react.useState)(false);
    const [canvasOpacity, setCanvasOpacity] = (0, import_react.useState)(1);
    const [canvasPurpose, setCanvasPurpose] = (0, import_react.useState)("new-page");
    const [wireframePurpose, setWireframePurpose] = (0, import_react.useState)("");
    const [designInteracting, setDesignInteracting] = (0, import_react.useState)(false);
    const [rearrangeState, setRearrangeState] = (0, import_react.useState)(null);
    const rearrangeLoaded = (0, import_react.useRef)(false);
    const exploreStashRef = (0, import_react.useRef)({ rearrange: null, placements: [] });
    const wireframeStashRef = (0, import_react.useRef)({ rearrange: null, placements: [] });
    const [designDeselectSignal, setDesignDeselectSignal] = (0, import_react.useState)(0);
    const [rearrangeDeselectSignal, setRearrangeDeselectSignal] = (0, import_react.useState)(0);
    const [designClearSignal, setDesignClearSignal] = (0, import_react.useState)(0);
    const [rearrangeClearSignal, setRearrangeClearSignal] = (0, import_react.useState)(0);
    const designSelectedIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
    const rearrangeSelectedIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
    const crossDragStartRef = (0, import_react.useRef)(null);
    const designExitTimer = (0, import_react.useRef)();
    const canvasShouldBeVisible = isDesignMode && isActive && !designOverlayExiting && blankCanvas;
    (0, import_react.useEffect)(() => {
      if (canvasShouldBeVisible) {
        setCanvasReady(false);
        const raf = originalRequestAnimationFrame(() => {
          setCanvasReady(true);
        });
        return () => cancelAnimationFrame(raf);
      } else {
        setCanvasReady(false);
      }
    }, [canvasShouldBeVisible]);
    const placementAnnotationMap = (0, import_react.useRef)(/* @__PURE__ */ new Map());
    const rearrangeAnnotationMap = (0, import_react.useRef)(/* @__PURE__ */ new Map());
    const rearrangeDebounceTimer = (0, import_react.useRef)();
    const [isDrawMode, setIsDrawMode] = (0, import_react.useState)(false);
    const [drawStrokes, setDrawStrokes] = (0, import_react.useState)([]);
    const drawStrokesRef = (0, import_react.useRef)(drawStrokes);
    drawStrokesRef.current = drawStrokes;
    const [hoveredDrawingIdx, setHoveredDrawingIdx] = (0, import_react.useState)(null);
    const drawCanvasRef = (0, import_react.useRef)(null);
    const isDrawingRef = (0, import_react.useRef)(false);
    const currentStrokeRef = (0, import_react.useRef)([]);
    const dimAmountRef = (0, import_react.useRef)(0);
    const visualHighlightRef = (0, import_react.useRef)(null);
    const exitingStrokeIdRef = (0, import_react.useRef)(null);
    const exitingAlphaRef = (0, import_react.useRef)(1);
    const [tooltipSessionActive, setTooltipSessionActive] = (0, import_react.useState)(false);
    const tooltipSessionTimerRef = (0, import_react.useRef)(
      null
    );
    const [pendingMultiSelectElements, setPendingMultiSelectElements] = (0, import_react.useState)([]);
    const modifiersHeldRef = (0, import_react.useRef)({ cmd: false, shift: false });
    const hideTooltipsUntilMouseLeave = () => {
      setTooltipsHidden(true);
    };
    const showTooltipsAgain = () => {
      setTooltipsHidden(false);
    };
    const handleControlsMouseEnter = () => {
      if (!tooltipSessionActive) {
        tooltipSessionTimerRef.current = originalSetTimeout(
          () => setTooltipSessionActive(true),
          850
        );
      }
    };
    const handleControlsMouseLeave = () => {
      if (tooltipSessionTimerRef.current) {
        clearTimeout(tooltipSessionTimerRef.current);
        tooltipSessionTimerRef.current = null;
      }
      setTooltipSessionActive(false);
      showTooltipsAgain();
    };
    (0, import_react.useEffect)(() => {
      return () => {
        if (tooltipSessionTimerRef.current)
          clearTimeout(tooltipSessionTimerRef.current);
      };
    }, []);
    const [settings, setSettings] = (0, import_react.useState)(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("feedback-toolbar-settings") ?? "");
        return {
          ...DEFAULT_SETTINGS,
          ...saved,
          annotationColorId: COLOR_OPTIONS.find((c) => c.id === saved.annotationColorId) ? saved.annotationColorId : DEFAULT_SETTINGS.annotationColorId
        };
      } catch {
        return DEFAULT_SETTINGS;
      }
    });
    const [isDarkMode, setIsDarkMode] = (0, import_react.useState)(true);
    const [showEntranceAnimation, setShowEntranceAnimation] = (0, import_react.useState)(false);
    const toggleTheme = () => {
      portalWrapperRef.current?.classList.add(styles_module_default4.disableTransitions);
      setIsDarkMode((previous) => !previous);
      originalRequestAnimationFrame(() => {
        portalWrapperRef.current?.classList.remove(styles_module_default4.disableTransitions);
      });
    };
    const isDevMode = false;
    const effectiveReactMode = isDevMode && settings.reactEnabled ? OUTPUT_TO_REACT_MODE[settings.outputDetail] : "off";
    const [currentSessionId, setCurrentSessionId] = (0, import_react.useState)(
      initialSessionId ?? null
    );
    const sessionInitializedRef = (0, import_react.useRef)(false);
    const [connectionStatus, setConnectionStatus] = (0, import_react.useState)(endpoint ? "connecting" : "disconnected");
    const [toolbarPosition, setToolbarPosition] = (0, import_react.useState)(null);
    const [isDraggingToolbar, setIsDraggingToolbar] = (0, import_react.useState)(false);
    const [dragStartPos, setDragStartPos] = (0, import_react.useState)(null);
    const justFinishedToolbarDragRef = (0, import_react.useRef)(false);
    const [animatedMarkers, setAnimatedMarkers] = (0, import_react.useState)(
      /* @__PURE__ */ new Set()
    );
    const [exitingMarkers, setExitingMarkers] = (0, import_react.useState)(/* @__PURE__ */ new Set());
    const [pendingExiting, setPendingExiting] = (0, import_react.useState)(false);
    const [editExiting, setEditExiting] = (0, import_react.useState)(false);
    const [isDragging, setIsDragging] = (0, import_react.useState)(false);
    const mouseDownPosRef = (0, import_react.useRef)(null);
    const dragStartRef = (0, import_react.useRef)(null);
    const dragRectRef = (0, import_react.useRef)(null);
    const highlightsContainerRef = (0, import_react.useRef)(null);
    const justFinishedDragRef = (0, import_react.useRef)(false);
    const lastElementUpdateRef = (0, import_react.useRef)(0);
    const recentlyAddedIdRef = (0, import_react.useRef)(null);
    const prevConnectionStatusRef = (0, import_react.useRef)(null);
    const DRAG_THRESHOLD = 8;
    const ELEMENT_UPDATE_THROTTLE = 50;
    const popupRef = (0, import_react.useRef)(null);
    const editPopupRef = (0, import_react.useRef)(null);
    const scrollTimeoutRef = (0, import_react.useRef)(null);
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
    (0, import_react.useEffect)(() => {
      if (showSettings) {
        setShowSettingsVisible(true);
      } else {
        setTooltipsHidden(false);
        setSettingsPage("main");
        const timer = originalSetTimeout(() => setShowSettingsVisible(false), 0);
        return () => clearTimeout(timer);
      }
    }, [showSettings]);
    const shouldShowMarkers = isActive && showMarkers && !isDesignMode;
    (0, import_react.useEffect)(() => {
      if (shouldShowMarkers) {
        setMarkersExiting(false);
        setMarkersVisible(true);
        setAnimatedMarkers(/* @__PURE__ */ new Set());
        const timer = originalSetTimeout(() => {
          setAnimatedMarkers((prev) => {
            const newSet = new Set(prev);
            annotations.forEach((a) => newSet.add(a.id));
            return newSet;
          });
        }, 350);
        return () => clearTimeout(timer);
      } else if (markersVisible) {
        setMarkersExiting(true);
        const timer = originalSetTimeout(() => {
          setMarkersVisible(false);
          setMarkersExiting(false);
        }, 250);
        return () => clearTimeout(timer);
      }
    }, [shouldShowMarkers]);
    (0, import_react.useEffect)(() => {
      setMounted(true);
      setScrollY(window.scrollY);
      const stored = loadAnnotations(pathname);
      setAnnotations(stored.filter(isRenderableAnnotation));
      if (!hasPlayedEntranceAnimation) {
        setShowEntranceAnimation(true);
        hasPlayedEntranceAnimation = true;
        originalSetTimeout(() => setShowEntranceAnimation(false), 750);
      }
      try {
        const savedTheme = localStorage.getItem("feedback-toolbar-theme");
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === "dark");
        }
      } catch (e) {
      }
      try {
        const savedPosition = localStorage.getItem("feedback-toolbar-position");
        if (savedPosition) {
          const pos = JSON.parse(savedPosition);
          if (typeof pos.x === "number" && typeof pos.y === "number") {
            setToolbarPosition(pos);
          }
        }
      } catch (e) {
      }
    }, [pathname]);
    (0, import_react.useEffect)(() => {
      if (mounted) {
        localStorage.setItem(
          "feedback-toolbar-settings",
          JSON.stringify(settings)
        );
      }
    }, [settings, mounted]);
    (0, import_react.useEffect)(() => {
      if (mounted) {
        localStorage.setItem(
          "feedback-toolbar-theme",
          isDarkMode ? "dark" : "light"
        );
      }
    }, [isDarkMode, mounted]);
    const prevDraggingRef = (0, import_react.useRef)(false);
    (0, import_react.useEffect)(() => {
      const wasDragging = prevDraggingRef.current;
      prevDraggingRef.current = isDraggingToolbar;
      if (wasDragging && !isDraggingToolbar && toolbarPosition && mounted) {
        localStorage.setItem(
          "feedback-toolbar-position",
          JSON.stringify(toolbarPosition)
        );
      }
    }, [isDraggingToolbar, toolbarPosition, mounted]);
    (0, import_react.useEffect)(() => {
      if (!endpoint || !mounted || sessionInitializedRef.current) return;
      sessionInitializedRef.current = true;
      setConnectionStatus("connecting");
      const initSession = async () => {
        try {
          const storedSessionId = loadSessionId(pathname);
          const sessionIdToJoin = initialSessionId || storedSessionId;
          let sessionEstablished = false;
          if (sessionIdToJoin) {
            try {
              const session = await getSession(endpoint, sessionIdToJoin);
              setCurrentSessionId(session.id);
              setConnectionStatus("connected");
              saveSessionId(pathname, session.id);
              sessionEstablished = true;
              const allLocalAnnotations = loadAnnotations(pathname);
              const serverIds = new Set(session.annotations.map((a) => a.id));
              const localToMerge = allLocalAnnotations.filter((a) => {
                if (serverIds.has(a.id)) return false;
                return true;
              });
              if (localToMerge.length > 0) {
                const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
                const pageUrl = `${baseUrl}${pathname}`;
                const results = await Promise.allSettled(
                  localToMerge.map(
                    (annotation) => syncAnnotation(endpoint, session.id, {
                      ...annotation,
                      sessionId: session.id,
                      url: pageUrl
                    })
                  )
                );
                const syncedAnnotations = results.map((result, i) => {
                  if (result.status === "fulfilled") {
                    return result.value;
                  }
                  console.warn(
                    "[Agentation] Failed to sync annotation:",
                    result.reason
                  );
                  return localToMerge[i];
                });
                const allAnnotations = [
                  ...session.annotations,
                  ...syncedAnnotations
                ];
                setAnnotations(allAnnotations.filter(isRenderableAnnotation));
                saveAnnotationsWithSyncMarker(
                  pathname,
                  allAnnotations.filter(isRenderableAnnotation),
                  session.id
                );
              } else {
                setAnnotations(
                  session.annotations.filter(isRenderableAnnotation)
                );
                saveAnnotationsWithSyncMarker(
                  pathname,
                  session.annotations.filter(isRenderableAnnotation),
                  session.id
                );
              }
            } catch (joinError) {
              console.warn(
                "[Agentation] Could not join session, creating new:",
                joinError
              );
              clearSessionId(pathname);
            }
          }
          if (!sessionEstablished) {
            const currentUrl = typeof window !== "undefined" ? window.location.href : "/";
            const session = await createSession(endpoint, currentUrl);
            setCurrentSessionId(session.id);
            setConnectionStatus("connected");
            saveSessionId(pathname, session.id);
            onSessionCreated?.(session.id);
            const allAnnotations = loadAllAnnotations();
            const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
            const syncPromises = [];
            for (const [pagePath, annotations2] of allAnnotations) {
              const unsyncedAnnotations = annotations2.filter(
                (a) => !a._syncedTo
              );
              if (unsyncedAnnotations.length === 0) continue;
              const pageUrl = `${baseUrl}${pagePath}`;
              const isCurrentPage = pagePath === pathname;
              syncPromises.push(
                (async () => {
                  try {
                    const targetSession = isCurrentPage ? session : await createSession(endpoint, pageUrl);
                    const results = await Promise.allSettled(
                      unsyncedAnnotations.map(
                        (annotation) => syncAnnotation(endpoint, targetSession.id, {
                          ...annotation,
                          sessionId: targetSession.id,
                          url: pageUrl
                        })
                      )
                    );
                    const syncedAnnotations = results.map((result, i) => {
                      if (result.status === "fulfilled") {
                        return result.value;
                      }
                      console.warn(
                        "[Agentation] Failed to sync annotation:",
                        result.reason
                      );
                      return unsyncedAnnotations[i];
                    });
                    const renderableSyncedAnnotations = syncedAnnotations.filter(
                      isRenderableAnnotation
                    );
                    saveAnnotationsWithSyncMarker(
                      pagePath,
                      renderableSyncedAnnotations,
                      targetSession.id
                    );
                    if (isCurrentPage) {
                      const originalIds = new Set(
                        unsyncedAnnotations.map((a) => a.id)
                      );
                      setAnnotations((prev) => {
                        const newDuringSync = prev.filter(
                          (a) => !originalIds.has(a.id)
                        );
                        return [...renderableSyncedAnnotations, ...newDuringSync];
                      });
                    }
                  } catch (err) {
                    console.warn(
                      `[Agentation] Failed to sync annotations for ${pagePath}:`,
                      err
                    );
                  }
                })()
              );
            }
            await Promise.allSettled(syncPromises);
          }
        } catch (error) {
          setConnectionStatus("disconnected");
          console.warn(
            "[Agentation] Failed to initialize session, using local storage:",
            error
          );
        }
      };
      initSession();
    }, [endpoint, initialSessionId, mounted, onSessionCreated, pathname]);
    (0, import_react.useEffect)(() => {
      if (!endpoint || !mounted) return;
      const checkHealth = async () => {
        try {
          const response = await fetch(`${endpoint}/health`);
          if (response.ok) {
            setConnectionStatus("connected");
          } else {
            setConnectionStatus("disconnected");
          }
        } catch {
          setConnectionStatus("disconnected");
        }
      };
      checkHealth();
      const interval = originalSetInterval(checkHealth, 1e4);
      return () => clearInterval(interval);
    }, [endpoint, mounted]);
    (0, import_react.useEffect)(() => {
      if (!endpoint || !mounted || !currentSessionId) return;
      const eventSource = new EventSource(
        `${endpoint}/sessions/${currentSessionId}/events`
      );
      const removedStatuses = ["resolved", "dismissed"];
      const handler = (e) => {
        try {
          const event = JSON.parse(e.data);
          if (removedStatuses.includes(event.payload?.status)) {
            const id = event.payload.id;
            const kind = event.payload.kind;
            if (kind === "placement") {
              for (const [placementId, annotationId] of placementAnnotationMap.current) {
                if (annotationId === id) {
                  placementAnnotationMap.current.delete(placementId);
                  setDesignPlacements((prev) => prev.filter((p) => p.id !== placementId));
                  break;
                }
              }
            } else if (kind === "rearrange") {
              for (const [sectionId, annotationId] of rearrangeAnnotationMap.current) {
                if (annotationId === id) {
                  rearrangeAnnotationMap.current.delete(sectionId);
                  setRearrangeState((prev) => {
                    if (!prev) return null;
                    const remaining = prev.sections.filter((s2) => s2.id !== sectionId);
                    if (remaining.length === 0) return null;
                    return { ...prev, sections: remaining };
                  });
                  break;
                }
              }
            } else {
              setExitingMarkers((prev) => new Set(prev).add(id));
              originalSetTimeout(() => {
                setAnnotations((prev) => prev.filter((a) => a.id !== id));
                setExitingMarkers((prev) => {
                  const next = new Set(prev);
                  next.delete(id);
                  return next;
                });
              }, 150);
            }
          }
        } catch {
        }
      };
      eventSource.addEventListener("annotation.updated", handler);
      return () => {
        eventSource.removeEventListener("annotation.updated", handler);
        eventSource.close();
      };
    }, [endpoint, mounted, currentSessionId]);
    (0, import_react.useEffect)(() => {
      if (!endpoint || !mounted) return;
      const wasDisconnected = prevConnectionStatusRef.current === "disconnected";
      const isNowConnected = connectionStatus === "connected";
      prevConnectionStatusRef.current = connectionStatus;
      if (wasDisconnected && isNowConnected) {
        const syncLocalAnnotations = async () => {
          try {
            const localAnnotations = loadAnnotations(pathname);
            if (localAnnotations.length === 0) return;
            const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
            const pageUrl = `${baseUrl}${pathname}`;
            let sessionId = currentSessionId;
            let serverAnnotations = [];
            if (sessionId) {
              try {
                const session = await getSession(endpoint, sessionId);
                serverAnnotations = session.annotations;
              } catch {
                sessionId = null;
              }
            }
            if (!sessionId) {
              const newSession = await createSession(endpoint, pageUrl);
              sessionId = newSession.id;
              setCurrentSessionId(sessionId);
              saveSessionId(pathname, sessionId);
            }
            const serverIds = new Set(serverAnnotations.map((a) => a.id));
            const unsyncedLocal = localAnnotations.filter((a) => !serverIds.has(a.id));
            if (unsyncedLocal.length > 0) {
              const results = await Promise.allSettled(
                unsyncedLocal.map(
                  (annotation) => syncAnnotation(endpoint, sessionId, {
                    ...annotation,
                    sessionId,
                    url: pageUrl
                  })
                )
              );
              const syncedAnnotations = results.map((result, i) => {
                if (result.status === "fulfilled") {
                  return result.value;
                }
                console.warn("[Agentation] Failed to sync annotation on reconnect:", result.reason);
                return unsyncedLocal[i];
              });
              const allAnnotations = [...serverAnnotations, ...syncedAnnotations];
              const renderableAnnotations = allAnnotations.filter(
                isRenderableAnnotation
              );
              setAnnotations(renderableAnnotations);
              saveAnnotationsWithSyncMarker(
                pathname,
                renderableAnnotations,
                sessionId
              );
            }
          } catch (err) {
            console.warn("[Agentation] Failed to sync on reconnect:", err);
          }
        };
        syncLocalAnnotations();
      }
    }, [connectionStatus, endpoint, mounted, currentSessionId, pathname]);
    const hideToolbarTemporarily = (0, import_react.useCallback)(() => {
      if (isToolbarHiding) return;
      setIsToolbarHiding(true);
      setShowSettings(false);
      setIsActive(false);
      originalSetTimeout(() => {
        saveToolbarHidden(true);
        setIsToolbarHidden(true);
        setIsToolbarHiding(false);
      }, 400);
    }, [isToolbarHiding]);
    (0, import_react.useEffect)(() => {
      if (!enableDemoMode) return;
      if (!mounted || !demoAnnotations || demoAnnotations.length === 0) return;
      if (annotations.length > 0) return;
      const timeoutIds = [];
      timeoutIds.push(
        originalSetTimeout(() => {
          setIsActive(true);
        }, demoDelay - 200)
      );
      demoAnnotations.forEach((demo, index) => {
        const annotationDelay = demoDelay + index * 300;
        timeoutIds.push(
          originalSetTimeout(() => {
            const element = document.querySelector(demo.selector);
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const { name, path } = identifyElement(element);
            const newAnnotation = {
              id: `demo-${Date.now()}-${index}`,
              x: (rect.left + rect.width / 2) / window.innerWidth * 100,
              y: rect.top + rect.height / 2 + window.scrollY,
              comment: demo.comment,
              element: name,
              elementPath: path,
              timestamp: Date.now(),
              selectedText: demo.selectedText,
              boundingBox: {
                x: rect.left,
                y: rect.top + window.scrollY,
                width: rect.width,
                height: rect.height
              },
              nearbyText: getNearbyText(element),
              cssClasses: getElementClasses(element)
            };
            setAnnotations((prev) => [...prev, newAnnotation]);
          }, annotationDelay)
        );
      });
      return () => {
        timeoutIds.forEach(clearTimeout);
      };
    }, [enableDemoMode, mounted, demoAnnotations, demoDelay]);
    (0, import_react.useEffect)(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = originalSetTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);
    (0, import_react.useEffect)(() => {
      if (mounted && annotations.length > 0) {
        if (currentSessionId) {
          saveAnnotationsWithSyncMarker(pathname, annotations, currentSessionId);
        } else {
          saveAnnotations(pathname, annotations);
        }
      } else if (mounted && annotations.length === 0) {
        localStorage.removeItem(getStorageKey(pathname));
      }
    }, [annotations, pathname, mounted, currentSessionId]);
    (0, import_react.useEffect)(() => {
      if (mounted && !designPlacementsLoaded.current) {
        designPlacementsLoaded.current = true;
        const stored = loadDesignPlacements(pathname);
        if (stored.length > 0) setDesignPlacements(stored);
      }
    }, [mounted, pathname]);
    (0, import_react.useEffect)(() => {
      if (mounted && designPlacementsLoaded.current && !blankCanvas) {
        if (designPlacements.length > 0) {
          saveDesignPlacements(pathname, designPlacements);
        } else {
          clearDesignPlacements(pathname);
        }
      }
    }, [designPlacements, pathname, mounted, blankCanvas]);
    (0, import_react.useEffect)(() => {
      if (mounted && !rearrangeLoaded.current) {
        rearrangeLoaded.current = true;
        const stored = loadRearrangeState(pathname);
        if (stored) {
          const migrated = {
            ...stored,
            sections: stored.sections.map((s2) => ({
              ...s2,
              currentRect: s2.currentRect ?? { ...s2.originalRect }
            }))
          };
          setRearrangeState(migrated);
        }
      }
    }, [mounted, pathname]);
    (0, import_react.useEffect)(() => {
      if (mounted && rearrangeLoaded.current && !blankCanvas) {
        if (rearrangeState) {
          saveRearrangeState(pathname, rearrangeState);
        } else {
          clearRearrangeState(pathname);
        }
      }
    }, [rearrangeState, pathname, mounted, blankCanvas]);
    const wireframeLoaded = (0, import_react.useRef)(false);
    (0, import_react.useEffect)(() => {
      if (mounted && !wireframeLoaded.current) {
        wireframeLoaded.current = true;
        const stored = loadWireframeState(pathname);
        if (stored) {
          wireframeStashRef.current = {
            rearrange: stored.rearrange,
            placements: stored.placements || []
          };
          if (stored.purpose) setWireframePurpose(stored.purpose);
        }
      }
    }, [mounted, pathname]);
    (0, import_react.useEffect)(() => {
      if (!mounted || !wireframeLoaded.current) return;
      const stash = wireframeStashRef.current;
      if (blankCanvas) {
        const hasContent = (rearrangeState?.sections?.length ?? 0) > 0 || designPlacements.length > 0 || wireframePurpose;
        if (hasContent) {
          saveWireframeState(pathname, { rearrange: rearrangeState, placements: designPlacements, purpose: wireframePurpose });
        } else {
          clearWireframeState(pathname);
        }
      } else {
        const hasContent = (stash.rearrange?.sections?.length ?? 0) > 0 || stash.placements.length > 0 || wireframePurpose;
        if (hasContent) {
          saveWireframeState(pathname, { rearrange: stash.rearrange, placements: stash.placements, purpose: wireframePurpose });
        } else {
          clearWireframeState(pathname);
        }
      }
    }, [rearrangeState, designPlacements, wireframePurpose, blankCanvas, pathname, mounted]);
    (0, import_react.useEffect)(() => {
      if (isDesignMode && !rearrangeState) {
        setRearrangeState({
          sections: [],
          originalOrder: [],
          detectedAt: Date.now()
        });
      }
    }, [isDesignMode, rearrangeState]);
    (0, import_react.useEffect)(() => {
      if (!endpoint || !currentSessionId) return;
      const currentMap = placementAnnotationMap.current;
      const currentIds = new Set(designPlacements.map((p) => p.id));
      for (const p of designPlacements) {
        if (currentMap.has(p.id)) continue;
        currentMap.set(p.id, "");
        const pageUrl = typeof window !== "undefined" ? window.location.pathname + window.location.search + window.location.hash : pathname;
        syncAnnotation(endpoint, currentSessionId, {
          id: p.id,
          x: p.x / window.innerWidth * 100,
          y: p.y,
          comment: `Place ${p.type} at (${Math.round(p.x)}, ${Math.round(p.y)}), ${p.width}\xD7${p.height}px${p.text ? ` \u2014 "${p.text}"` : ""}`,
          element: `[design:${p.type}]`,
          elementPath: "[placement]",
          timestamp: p.timestamp,
          url: pageUrl,
          intent: "change",
          severity: "important",
          kind: "placement",
          placement: {
            componentType: p.type,
            width: p.width,
            height: p.height,
            scrollY: p.scrollY,
            text: p.text
          }
        }).then((serverAnnotation) => {
          if (currentMap.has(p.id)) {
            currentMap.set(p.id, serverAnnotation.id);
          }
        }).catch((err) => {
          console.warn("[Agentation] Failed to sync placement annotation:", err);
          currentMap.delete(p.id);
        });
      }
      for (const [placementId, annotationId] of currentMap) {
        if (!currentIds.has(placementId)) {
          currentMap.delete(placementId);
          if (annotationId) {
            deleteAnnotation(endpoint, annotationId).catch(() => {
            });
          }
        }
      }
    }, [designPlacements, endpoint, currentSessionId, pathname]);
    (0, import_react.useEffect)(() => {
      if (!endpoint || !currentSessionId) return;
      if (rearrangeDebounceTimer.current) {
        clearTimeout(rearrangeDebounceTimer.current);
      }
      rearrangeDebounceTimer.current = originalSetTimeout(() => {
        const currentMap = rearrangeAnnotationMap.current;
        if (!rearrangeState || rearrangeState.sections.length === 0) {
          for (const [, annotationId] of currentMap) {
            if (annotationId) {
              deleteAnnotation(endpoint, annotationId).catch(() => {
              });
            }
          }
          currentMap.clear();
          return;
        }
        const currentIds = new Set(rearrangeState.sections.map((s2) => s2.id));
        const pageUrl = typeof window !== "undefined" ? window.location.pathname + window.location.search + window.location.hash : pathname;
        for (const section of rearrangeState.sections) {
          const orig = section.originalRect;
          const curr = section.currentRect;
          const hasMoved = Math.abs(orig.x - curr.x) > 1 || Math.abs(orig.y - curr.y) > 1 || Math.abs(orig.width - curr.width) > 1 || Math.abs(orig.height - curr.height) > 1;
          if (!hasMoved) {
            const existingId = currentMap.get(section.id);
            if (existingId) {
              currentMap.delete(section.id);
              deleteAnnotation(endpoint, existingId).catch(() => {
              });
            }
            continue;
          }
          const existingAnnotationId = currentMap.get(section.id);
          if (existingAnnotationId) {
            updateAnnotation(endpoint, existingAnnotationId, {
              comment: `Move ${section.label} section (${section.tagName}) \u2014 from (${Math.round(orig.x)},${Math.round(orig.y)}) ${Math.round(orig.width)}\xD7${Math.round(orig.height)} to (${Math.round(curr.x)},${Math.round(curr.y)}) ${Math.round(curr.width)}\xD7${Math.round(curr.height)}`
            }).catch((err) => {
              console.warn("[Agentation] Failed to update rearrange annotation:", err);
            });
          } else {
            currentMap.set(section.id, "");
            syncAnnotation(endpoint, currentSessionId, {
              id: section.id,
              x: curr.x / window.innerWidth * 100,
              y: curr.y,
              comment: `Move ${section.label} section (${section.tagName}) \u2014 from (${Math.round(orig.x)},${Math.round(orig.y)}) ${Math.round(orig.width)}\xD7${Math.round(orig.height)} to (${Math.round(curr.x)},${Math.round(curr.y)}) ${Math.round(curr.width)}\xD7${Math.round(curr.height)}`,
              element: section.selector,
              elementPath: "[rearrange]",
              timestamp: Date.now(),
              url: pageUrl,
              intent: "change",
              severity: "important",
              kind: "rearrange",
              rearrange: {
                selector: section.selector,
                label: section.label,
                tagName: section.tagName,
                originalRect: orig,
                currentRect: curr
              }
            }).then((serverAnnotation) => {
              if (currentMap.has(section.id)) {
                currentMap.set(section.id, serverAnnotation.id);
              }
            }).catch((err) => {
              console.warn("[Agentation] Failed to sync rearrange annotation:", err);
              currentMap.delete(section.id);
            });
          }
        }
        for (const [sectionId, annotationId] of currentMap) {
          if (!currentIds.has(sectionId)) {
            currentMap.delete(sectionId);
            if (annotationId) {
              deleteAnnotation(endpoint, annotationId).catch(() => {
              });
            }
          }
        }
      }, 300);
      return () => {
        if (rearrangeDebounceTimer.current) {
          clearTimeout(rearrangeDebounceTimer.current);
        }
      };
    }, [rearrangeState, endpoint, currentSessionId, pathname]);
    const rearrangeMovedEls = (0, import_react.useRef)(/* @__PURE__ */ new Map());
    (0, import_react.useLayoutEffect)(() => {
      const sections = rearrangeState?.sections ?? [];
      const active = /* @__PURE__ */ new Set();
      if ((isDesignMode || designOverlayExiting) && isActive) {
        for (const s2 of sections) {
          active.add(s2.id);
          try {
            const el = document.querySelector(s2.selector);
            if (!el) continue;
            if (!rearrangeMovedEls.current.has(s2.id)) {
              const origStyles = {
                transform: el.style.transform,
                transformOrigin: el.style.transformOrigin,
                opacity: el.style.opacity,
                position: el.style.position,
                zIndex: el.style.zIndex,
                display: el.style.display
              };
              const ancestors = [];
              let parent = el.parentElement;
              while (parent && parent !== document.body) {
                const cs = getComputedStyle(parent);
                if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") {
                  ancestors.push({ el: parent, overflow: parent.style.overflow });
                  parent.style.overflow = "visible";
                }
                parent = parent.parentElement;
              }
              const computed = getComputedStyle(el);
              if (computed.display === "inline") {
                el.style.display = "inline-block";
              }
              rearrangeMovedEls.current.set(s2.id, { el, origStyles, ancestors });
              el.style.transformOrigin = "top left";
              el.style.zIndex = "9999";
            }
          } catch {
          }
        }
      }
      for (const [id, entry] of rearrangeMovedEls.current) {
        if (!active.has(id)) {
          const { el, origStyles, ancestors } = entry;
          el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
          el.style.transform = origStyles.transform;
          el.style.transformOrigin = origStyles.transformOrigin;
          el.style.opacity = origStyles.opacity;
          el.style.position = origStyles.position;
          el.style.zIndex = origStyles.zIndex;
          rearrangeMovedEls.current.delete(id);
          originalSetTimeout(() => {
            el.style.transition = "";
            el.style.display = origStyles.display;
            for (const a of ancestors) {
              a.el.style.overflow = a.overflow;
            }
          }, 450);
        }
      }
    }, [rearrangeState, isDesignMode, designOverlayExiting, isActive]);
    (0, import_react.useEffect)(() => {
      return () => {
        for (const [, entry] of rearrangeMovedEls.current) {
          const { el, origStyles, ancestors } = entry;
          el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
          el.style.transform = origStyles.transform;
          el.style.transformOrigin = origStyles.transformOrigin;
          el.style.opacity = origStyles.opacity;
          el.style.position = origStyles.position;
          el.style.zIndex = origStyles.zIndex;
          originalSetTimeout(() => {
            el.style.transition = "";
            el.style.display = origStyles.display;
            for (const a of ancestors) {
              a.el.style.overflow = a.overflow;
            }
          }, 450);
        }
        rearrangeMovedEls.current.clear();
      };
    }, []);
    const closeDesignMode = (0, import_react.useCallback)(() => {
      setDesignOverlayExiting(true);
      setIsDesignMode(false);
      setActiveDesignComponent(null);
      clearTimeout(designExitTimer.current);
      designExitTimer.current = originalSetTimeout(() => {
        setDesignOverlayExiting(false);
      }, 300);
    }, []);
    const deactivate = (0, import_react.useCallback)(() => {
      if (isDesignMode) {
        setDesignOverlayExiting(true);
        setIsDesignMode(false);
        setActiveDesignComponent(null);
        clearTimeout(designExitTimer.current);
        designExitTimer.current = originalSetTimeout(() => {
          setDesignOverlayExiting(false);
        }, 300);
      }
      setIsActive(false);
    }, [isDesignMode]);
    const freezeAnimations = (0, import_react.useCallback)(() => {
      if (isFrozen) return;
      freeze();
      setIsFrozen(true);
    }, [isFrozen]);
    const unfreezeAnimations = (0, import_react.useCallback)(() => {
      if (!isFrozen) return;
      unfreeze();
      setIsFrozen(false);
    }, [isFrozen]);
    const toggleFreeze = (0, import_react.useCallback)(() => {
      if (isFrozen) {
        unfreezeAnimations();
      } else {
        freezeAnimations();
      }
    }, [isFrozen, freezeAnimations, unfreezeAnimations]);
    const createMultiSelectPendingAnnotation = (0, import_react.useCallback)(() => {
      if (pendingMultiSelectElements.length === 0) return;
      const firstItem = pendingMultiSelectElements[0];
      const firstEl = firstItem.element;
      const isMulti = pendingMultiSelectElements.length > 1;
      const freshRects = pendingMultiSelectElements.map(
        (item) => item.element.getBoundingClientRect()
      );
      if (!isMulti) {
        const rect = freshRects[0];
        const isFixed = isElementFixed(firstEl);
        setPendingAnnotation({
          x: rect.left / window.innerWidth * 100,
          y: isFixed ? rect.top : rect.top + window.scrollY,
          clientY: rect.top,
          element: firstItem.name,
          elementPath: firstItem.path,
          boundingBox: {
            x: rect.left,
            y: isFixed ? rect.top : rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
          },
          isFixed,
          fullPath: getFullElementPath(firstEl),
          accessibility: getAccessibilityInfo(firstEl),
          computedStyles: getForensicComputedStyles(firstEl),
          computedStylesObj: getDetailedComputedStyles(firstEl),
          nearbyElements: getNearbyElements(firstEl),
          cssClasses: getElementClasses(firstEl),
          nearbyText: getNearbyText(firstEl),
          reactComponents: firstItem.reactComponents,
          sourceFile: detectSourceFile(firstEl)
        });
      } else {
        const bounds = {
          left: Math.min(...freshRects.map((r) => r.left)),
          top: Math.min(...freshRects.map((r) => r.top)),
          right: Math.max(...freshRects.map((r) => r.right)),
          bottom: Math.max(...freshRects.map((r) => r.bottom))
        };
        const names = pendingMultiSelectElements.slice(0, 5).map((item) => item.name).join(", ");
        const suffix = pendingMultiSelectElements.length > 5 ? ` +${pendingMultiSelectElements.length - 5} more` : "";
        const elementBoundingBoxes = freshRects.map((rect) => ({
          x: rect.left,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        }));
        const lastItem = pendingMultiSelectElements[pendingMultiSelectElements.length - 1];
        const lastEl = lastItem.element;
        const lastRect = freshRects[freshRects.length - 1];
        const lastCenterX = lastRect.left + lastRect.width / 2;
        const lastCenterY = lastRect.top + lastRect.height / 2;
        const lastIsFixed = isElementFixed(lastEl);
        setPendingAnnotation({
          x: lastCenterX / window.innerWidth * 100,
          y: lastIsFixed ? lastCenterY : lastCenterY + window.scrollY,
          clientY: lastCenterY,
          element: `${pendingMultiSelectElements.length} elements: ${names}${suffix}`,
          elementPath: "multi-select",
          boundingBox: {
            x: bounds.left,
            y: bounds.top + window.scrollY,
            width: bounds.right - bounds.left,
            height: bounds.bottom - bounds.top
          },
          isMultiSelect: true,
          isFixed: lastIsFixed,
          elementBoundingBoxes,
          multiSelectElements: pendingMultiSelectElements.map((item) => item.element),
          targetElement: lastEl,
          // Anchor marker/popup to last clicked element
          fullPath: getFullElementPath(firstEl),
          accessibility: getAccessibilityInfo(firstEl),
          computedStyles: getForensicComputedStyles(firstEl),
          computedStylesObj: getDetailedComputedStyles(firstEl),
          nearbyElements: getNearbyElements(firstEl),
          cssClasses: getElementClasses(firstEl),
          nearbyText: getNearbyText(firstEl),
          sourceFile: detectSourceFile(firstEl)
        });
      }
      setPendingMultiSelectElements([]);
      setHoverInfo(null);
    }, [pendingMultiSelectElements]);
    (0, import_react.useEffect)(() => {
      if (!isActive) {
        setPendingAnnotation(null);
        setEditingAnnotation(null);
        setEditingTargetElement(null);
        setEditingTargetElements([]);
        setHoverInfo(null);
        setShowSettings(false);
        setPendingMultiSelectElements([]);
        modifiersHeldRef.current = { cmd: false, shift: false };
        if (isFrozen) {
          unfreezeAnimations();
        }
      }
    }, [isActive, isFrozen, unfreezeAnimations]);
    (0, import_react.useEffect)(() => {
      return () => {
        unfreeze();
      };
    }, []);
    (0, import_react.useEffect)(() => {
      if (!isActive) return;
      const textElementsSelector = [
        "p",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "li",
        "td",
        "th",
        "label",
        "blockquote",
        "figcaption",
        "caption",
        "legend",
        "dt",
        "dd",
        "pre",
        "code",
        "em",
        "strong",
        "b",
        "i",
        "u",
        "s",
        "a",
        "time",
        "address",
        "cite",
        "q",
        "abbr",
        "dfn",
        "mark",
        "small",
        "sub",
        "sup",
        "[contenteditable]"
      ].join(", ");
      const notAgentationSelector = `:not([data-agentation-root]):not([data-agentation-root] *)`;
      const style = document.createElement("style");
      style.id = "feedback-cursor-styles";
      style.textContent = `
      body ${notAgentationSelector} {
        cursor: crosshair !important;
      }

      body :is(${textElementsSelector})${notAgentationSelector} {
        cursor: text !important;
      }
    `;
      document.head.appendChild(style);
      return () => {
        const existingStyle = document.getElementById("feedback-cursor-styles");
        if (existingStyle) existingStyle.remove();
      };
    }, [isActive]);
    (0, import_react.useEffect)(() => {
      if (hoveredDrawingIdx !== null && isActive) {
        document.documentElement.setAttribute("data-drawing-hover", "");
        return () => document.documentElement.removeAttribute("data-drawing-hover");
      }
    }, [hoveredDrawingIdx, isActive]);
    (0, import_react.useEffect)(() => {
      if (!isActive || pendingAnnotation || isDrawMode || isDesignMode) return;
      const handleMouseMove = (e) => {
        const target = e.composedPath()[0] || e.target;
        if (closestCrossingShadow(target, "[data-feedback-toolbar]")) {
          setHoverInfo(null);
          return;
        }
        const elementUnder = deepElementFromPoint(e.clientX, e.clientY);
        if (!elementUnder || closestCrossingShadow(elementUnder, "[data-feedback-toolbar]")) {
          setHoverInfo(null);
          return;
        }
        const { name, elementName, path, reactComponents } = identifyElementWithReact(elementUnder, effectiveReactMode);
        const rect = elementUnder.getBoundingClientRect();
        setHoverInfo({
          element: name,
          elementName,
          elementPath: path,
          rect,
          reactComponents
        });
        setHoverPosition({ x: e.clientX, y: e.clientY });
      };
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [isActive, pendingAnnotation, isDrawMode, isDesignMode, effectiveReactMode, drawStrokes]);
    const startEditAnnotation = (0, import_react.useCallback)((annotation) => {
      setEditingAnnotation(annotation);
      setHoveredMarkerId(null);
      setHoveredTargetElement(null);
      setHoveredTargetElements([]);
      if (annotation.elementBoundingBoxes?.length) {
        const elements = [];
        for (const bb of annotation.elementBoundingBoxes) {
          const centerX = bb.x + bb.width / 2;
          const centerY = bb.y + bb.height / 2 - window.scrollY;
          const el = deepElementFromPoint(centerX, centerY);
          if (el) elements.push(el);
        }
        setEditingTargetElements(elements);
        setEditingTargetElement(null);
      } else if (annotation.boundingBox) {
        const bb = annotation.boundingBox;
        const centerX = bb.x + bb.width / 2;
        const centerY = annotation.isFixed ? bb.y + bb.height / 2 : bb.y + bb.height / 2 - window.scrollY;
        const el = deepElementFromPoint(centerX, centerY);
        if (el) {
          const elRect = el.getBoundingClientRect();
          const widthRatio = elRect.width / bb.width;
          const heightRatio = elRect.height / bb.height;
          if (widthRatio < 0.5 || heightRatio < 0.5) {
            setEditingTargetElement(null);
          } else {
            setEditingTargetElement(el);
          }
        } else {
          setEditingTargetElement(null);
        }
        setEditingTargetElements([]);
      } else {
        setEditingTargetElement(null);
        setEditingTargetElements([]);
      }
    }, []);
    (0, import_react.useEffect)(() => {
      if (!isActive || isDrawMode || isDesignMode) return;
      const handleClick = (e) => {
        if (justFinishedDragRef.current) {
          justFinishedDragRef.current = false;
          return;
        }
        const target = e.composedPath()[0] || e.target;
        if (closestCrossingShadow(target, "[data-feedback-toolbar]")) return;
        if (closestCrossingShadow(target, "[data-annotation-popup]")) return;
        if (closestCrossingShadow(target, "[data-annotation-marker]")) return;
        if (e.metaKey && e.shiftKey && !pendingAnnotation && !editingAnnotation) {
          e.preventDefault();
          e.stopPropagation();
          const elementUnder2 = deepElementFromPoint(e.clientX, e.clientY);
          if (!elementUnder2) return;
          const rect2 = elementUnder2.getBoundingClientRect();
          const { name: name2, path: path2, reactComponents: reactComponents2 } = identifyElementWithReact(
            elementUnder2,
            effectiveReactMode
          );
          const existingIndex = pendingMultiSelectElements.findIndex(
            (item) => item.element === elementUnder2
          );
          if (existingIndex >= 0) {
            setPendingMultiSelectElements(
              (prev) => prev.filter((_, i) => i !== existingIndex)
            );
          } else {
            setPendingMultiSelectElements((prev) => [
              ...prev,
              {
                element: elementUnder2,
                rect: rect2,
                name: name2,
                path: path2,
                reactComponents: reactComponents2 ?? void 0
              }
            ]);
          }
          return;
        }
        const isInteractive = closestCrossingShadow(
          target,
          "button, a, input, select, textarea, [role='button'], [onclick]"
        );
        if (settings.blockInteractions && isInteractive) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (pendingAnnotation) {
          if (isInteractive && !settings.blockInteractions) {
            return;
          }
          e.preventDefault();
          popupRef.current?.shake();
          return;
        }
        if (editingAnnotation) {
          if (isInteractive && !settings.blockInteractions) {
            return;
          }
          e.preventDefault();
          editPopupRef.current?.shake();
          return;
        }
        e.preventDefault();
        const elementUnder = deepElementFromPoint(e.clientX, e.clientY);
        if (!elementUnder) return;
        const { name, path, reactComponents } = identifyElementWithReact(
          elementUnder,
          effectiveReactMode
        );
        const rect = elementUnder.getBoundingClientRect();
        const x = e.clientX / window.innerWidth * 100;
        const isFixed = isElementFixed(elementUnder);
        const y = isFixed ? e.clientY : e.clientY + window.scrollY;
        const selection = window.getSelection();
        let selectedText;
        if (selection && selection.toString().trim().length > 0) {
          selectedText = selection.toString().trim().slice(0, 500);
        }
        const computedStylesObj = getDetailedComputedStyles(elementUnder);
        const computedStylesStr = getForensicComputedStyles(elementUnder);
        setPendingAnnotation({
          x,
          y,
          clientY: e.clientY,
          element: name,
          elementPath: path,
          selectedText,
          boundingBox: {
            x: rect.left,
            y: isFixed ? rect.top : rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
          },
          nearbyText: getNearbyText(elementUnder),
          cssClasses: getElementClasses(elementUnder),
          isFixed,
          fullPath: getFullElementPath(elementUnder),
          accessibility: getAccessibilityInfo(elementUnder),
          computedStyles: computedStylesStr,
          computedStylesObj,
          nearbyElements: getNearbyElements(elementUnder),
          reactComponents: reactComponents ?? void 0,
          sourceFile: detectSourceFile(elementUnder),
          targetElement: elementUnder
          // Store for live position queries
        });
        setHoverInfo(null);
      };
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    }, [
      isActive,
      isDrawMode,
      isDesignMode,
      pendingAnnotation,
      editingAnnotation,
      settings.blockInteractions,
      effectiveReactMode,
      pendingMultiSelectElements
    ]);
    (0, import_react.useEffect)(() => {
      if (!isActive) return;
      const handleKeyDown = (e) => {
        if (e.key === "Meta") modifiersHeldRef.current.cmd = true;
        if (e.key === "Shift") modifiersHeldRef.current.shift = true;
      };
      const handleKeyUp = (e) => {
        const wasHoldingBoth = modifiersHeldRef.current.cmd && modifiersHeldRef.current.shift;
        if (e.key === "Meta") modifiersHeldRef.current.cmd = false;
        if (e.key === "Shift") modifiersHeldRef.current.shift = false;
        const nowHoldingBoth = modifiersHeldRef.current.cmd && modifiersHeldRef.current.shift;
        if (wasHoldingBoth && !nowHoldingBoth && pendingMultiSelectElements.length > 0) {
          createMultiSelectPendingAnnotation();
        }
      };
      const handleBlur = () => {
        modifiersHeldRef.current = { cmd: false, shift: false };
        setPendingMultiSelectElements([]);
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", handleBlur);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("blur", handleBlur);
      };
    }, [isActive, pendingMultiSelectElements, createMultiSelectPendingAnnotation]);
    (0, import_react.useEffect)(() => {
      if (!isActive || pendingAnnotation || isDrawMode || isDesignMode) return;
      const handleMouseDown = (e) => {
        const target = e.composedPath()[0] || e.target;
        if (closestCrossingShadow(target, "[data-feedback-toolbar]")) return;
        if (closestCrossingShadow(target, "[data-annotation-marker]")) return;
        if (closestCrossingShadow(target, "[data-annotation-popup]")) return;
        const textTags = /* @__PURE__ */ new Set([
          "P",
          "SPAN",
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
          "LI",
          "TD",
          "TH",
          "LABEL",
          "BLOCKQUOTE",
          "FIGCAPTION",
          "CAPTION",
          "LEGEND",
          "DT",
          "DD",
          "PRE",
          "CODE",
          "EM",
          "STRONG",
          "B",
          "I",
          "U",
          "S",
          "A",
          "TIME",
          "ADDRESS",
          "CITE",
          "Q",
          "ABBR",
          "DFN",
          "MARK",
          "SMALL",
          "SUB",
          "SUP"
        ]);
        if (textTags.has(target.tagName) || target.isContentEditable) {
          return;
        }
        e.preventDefault();
        mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
      };
      document.addEventListener("mousedown", handleMouseDown);
      return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isActive, pendingAnnotation, isDrawMode, isDesignMode]);
    (0, import_react.useEffect)(() => {
      if (!isActive || pendingAnnotation) return;
      const handleMouseMove = (e) => {
        if (!mouseDownPosRef.current) return;
        const dx = e.clientX - mouseDownPosRef.current.x;
        const dy = e.clientY - mouseDownPosRef.current.y;
        const distance = dx * dx + dy * dy;
        const thresholdSq = DRAG_THRESHOLD * DRAG_THRESHOLD;
        if (!isDragging && distance >= thresholdSq) {
          dragStartRef.current = mouseDownPosRef.current;
          setIsDragging(true);
          e.preventDefault();
        }
        if ((isDragging || distance >= thresholdSq) && dragStartRef.current) {
          if (dragRectRef.current) {
            const left2 = Math.min(dragStartRef.current.x, e.clientX);
            const top2 = Math.min(dragStartRef.current.y, e.clientY);
            const width = Math.abs(e.clientX - dragStartRef.current.x);
            const height = Math.abs(e.clientY - dragStartRef.current.y);
            dragRectRef.current.style.transform = `translate(${left2}px, ${top2}px)`;
            dragRectRef.current.style.width = `${width}px`;
            dragRectRef.current.style.height = `${height}px`;
          }
          const now = Date.now();
          if (now - lastElementUpdateRef.current < ELEMENT_UPDATE_THROTTLE) {
            return;
          }
          lastElementUpdateRef.current = now;
          const startX = dragStartRef.current.x;
          const startY = dragStartRef.current.y;
          const left = Math.min(startX, e.clientX);
          const top = Math.min(startY, e.clientY);
          const right = Math.max(startX, e.clientX);
          const bottom = Math.max(startY, e.clientY);
          const midX = (left + right) / 2;
          const midY = (top + bottom) / 2;
          const candidateElements = /* @__PURE__ */ new Set();
          const points = [
            [left, top],
            [right, top],
            [left, bottom],
            [right, bottom],
            [midX, midY],
            [midX, top],
            [midX, bottom],
            [left, midY],
            [right, midY]
          ];
          for (const [x, y] of points) {
            const elements = document.elementsFromPoint(x, y);
            for (const el of elements) {
              if (el instanceof HTMLElement) candidateElements.add(el);
            }
          }
          const nearbyElements = document.querySelectorAll(
            "button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav"
          );
          for (const el of nearbyElements) {
            if (el instanceof HTMLElement) {
              const rect = el.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const centerInside = centerX >= left && centerX <= right && centerY >= top && centerY <= bottom;
              const overlapX = Math.min(rect.right, right) - Math.max(rect.left, left);
              const overlapY = Math.min(rect.bottom, bottom) - Math.max(rect.top, top);
              const overlapArea = overlapX > 0 && overlapY > 0 ? overlapX * overlapY : 0;
              const elementArea = rect.width * rect.height;
              const overlapRatio = elementArea > 0 ? overlapArea / elementArea : 0;
              if (centerInside || overlapRatio > 0.5) {
                candidateElements.add(el);
              }
            }
          }
          const allMatching = [];
          const meaningfulTags = /* @__PURE__ */ new Set([
            "BUTTON",
            "A",
            "INPUT",
            "IMG",
            "P",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "LI",
            "LABEL",
            "TD",
            "TH",
            "SECTION",
            "ARTICLE",
            "ASIDE",
            "NAV"
          ]);
          for (const el of candidateElements) {
            if (closestCrossingShadow(el, "[data-feedback-toolbar]") || closestCrossingShadow(el, "[data-annotation-marker]"))
              continue;
            const rect = el.getBoundingClientRect();
            if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.5)
              continue;
            if (rect.width < 10 || rect.height < 10) continue;
            if (rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top) {
              const tagName = el.tagName;
              let shouldInclude = meaningfulTags.has(tagName);
              if (!shouldInclude && (tagName === "DIV" || tagName === "SPAN")) {
                const hasText = el.textContent && el.textContent.trim().length > 0;
                const isInteractive = el.onclick !== null || el.getAttribute("role") === "button" || el.getAttribute("role") === "link" || el.classList.contains("clickable") || el.hasAttribute("data-clickable");
                if ((hasText || isInteractive) && !el.querySelector("p, h1, h2, h3, h4, h5, h6, button, a")) {
                  shouldInclude = true;
                }
              }
              if (shouldInclude) {
                let dominated = false;
                for (const existingRect of allMatching) {
                  if (existingRect.left <= rect.left && existingRect.right >= rect.right && existingRect.top <= rect.top && existingRect.bottom >= rect.bottom) {
                    dominated = true;
                    break;
                  }
                }
                if (!dominated) allMatching.push(rect);
              }
            }
          }
          if (highlightsContainerRef.current) {
            const container = highlightsContainerRef.current;
            while (container.children.length > allMatching.length) {
              container.removeChild(container.lastChild);
            }
            allMatching.forEach((rect, i) => {
              let div = container.children[i];
              if (!div) {
                div = document.createElement("div");
                div.className = styles_module_default4.selectedElementHighlight;
                container.appendChild(div);
              }
              div.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
              div.style.width = `${rect.width}px`;
              div.style.height = `${rect.height}px`;
            });
          }
        }
      };
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [isActive, pendingAnnotation, isDragging, DRAG_THRESHOLD]);
    (0, import_react.useEffect)(() => {
      if (!isActive) return;
      const handleMouseUp = (e) => {
        const wasDragging = isDragging;
        const dragStart = dragStartRef.current;
        if (isDragging && dragStart) {
          justFinishedDragRef.current = true;
          const left = Math.min(dragStart.x, e.clientX);
          const top = Math.min(dragStart.y, e.clientY);
          const right = Math.max(dragStart.x, e.clientX);
          const bottom = Math.max(dragStart.y, e.clientY);
          const allMatching = [];
          const selector = "button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th";
          document.querySelectorAll(selector).forEach((el) => {
            if (!(el instanceof HTMLElement)) return;
            if (closestCrossingShadow(el, "[data-feedback-toolbar]") || closestCrossingShadow(el, "[data-annotation-marker]"))
              return;
            const rect = el.getBoundingClientRect();
            if (rect.width > window.innerWidth * 0.8 && rect.height > window.innerHeight * 0.5)
              return;
            if (rect.width < 10 || rect.height < 10) return;
            if (rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top) {
              allMatching.push({ element: el, rect });
            }
          });
          const finalElements = allMatching.filter(
            ({ element: el }) => !allMatching.some(
              ({ element: other }) => other !== el && el.contains(other)
            )
          );
          const x = e.clientX / window.innerWidth * 100;
          const y = e.clientY + window.scrollY;
          if (finalElements.length > 0) {
            const bounds = finalElements.reduce(
              (acc, { rect }) => ({
                left: Math.min(acc.left, rect.left),
                top: Math.min(acc.top, rect.top),
                right: Math.max(acc.right, rect.right),
                bottom: Math.max(acc.bottom, rect.bottom)
              }),
              {
                left: Infinity,
                top: Infinity,
                right: -Infinity,
                bottom: -Infinity
              }
            );
            const elementNames = finalElements.slice(0, 5).map(({ element }) => identifyElement(element).name).join(", ");
            const suffix = finalElements.length > 5 ? ` +${finalElements.length - 5} more` : "";
            const firstElement = finalElements[0].element;
            const firstElementComputedStyles = getDetailedComputedStyles(firstElement);
            const firstElementComputedStylesStr = getForensicComputedStyles(firstElement);
            setPendingAnnotation({
              x,
              y,
              clientY: e.clientY,
              element: `${finalElements.length} elements: ${elementNames}${suffix}`,
              elementPath: "multi-select",
              boundingBox: {
                x: bounds.left,
                y: bounds.top + window.scrollY,
                width: bounds.right - bounds.left,
                height: bounds.bottom - bounds.top
              },
              isMultiSelect: true,
              // Forensic data from first element
              fullPath: getFullElementPath(firstElement),
              accessibility: getAccessibilityInfo(firstElement),
              computedStyles: firstElementComputedStylesStr,
              computedStylesObj: firstElementComputedStyles,
              nearbyElements: getNearbyElements(firstElement),
              cssClasses: getElementClasses(firstElement),
              nearbyText: getNearbyText(firstElement),
              sourceFile: detectSourceFile(firstElement)
            });
          } else {
            const width = Math.abs(right - left);
            const height = Math.abs(bottom - top);
            if (width > 20 && height > 20) {
              setPendingAnnotation({
                x,
                y,
                clientY: e.clientY,
                element: "Area selection",
                elementPath: `region at (${Math.round(left)}, ${Math.round(top)})`,
                boundingBox: {
                  x: left,
                  y: top + window.scrollY,
                  width,
                  height
                },
                isMultiSelect: true
              });
            }
          }
          setHoverInfo(null);
        } else if (wasDragging) {
          justFinishedDragRef.current = true;
        }
        mouseDownPosRef.current = null;
        dragStartRef.current = null;
        setIsDragging(false);
        if (highlightsContainerRef.current) {
          highlightsContainerRef.current.innerHTML = "";
        }
      };
      document.addEventListener("mouseup", handleMouseUp);
      return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [isActive, isDragging]);
    const fireWebhook = (0, import_react.useCallback)(
      async (event, payload, force) => {
        const targetUrl = settings.webhookUrl || webhookUrl;
        if (!targetUrl || !settings.webhooksEnabled && !force) return false;
        try {
          const response = await fetch(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event,
              timestamp: Date.now(),
              url: typeof window !== "undefined" ? window.location.href : void 0,
              ...payload
            })
          });
          return response.ok;
        } catch (error) {
          console.warn("[Agentation] Webhook failed:", error);
          return false;
        }
      },
      [webhookUrl, settings.webhookUrl, settings.webhooksEnabled]
    );
    const addAnnotation = (0, import_react.useCallback)(
      (comment) => {
        if (!pendingAnnotation) return;
        const newAnnotation = {
          id: Date.now().toString(),
          x: pendingAnnotation.x,
          y: pendingAnnotation.y,
          comment,
          element: pendingAnnotation.element,
          elementPath: pendingAnnotation.elementPath,
          timestamp: Date.now(),
          selectedText: pendingAnnotation.selectedText,
          boundingBox: pendingAnnotation.boundingBox,
          nearbyText: pendingAnnotation.nearbyText,
          cssClasses: pendingAnnotation.cssClasses,
          isMultiSelect: pendingAnnotation.isMultiSelect,
          isFixed: pendingAnnotation.isFixed,
          fullPath: pendingAnnotation.fullPath,
          accessibility: pendingAnnotation.accessibility,
          computedStyles: pendingAnnotation.computedStyles,
          nearbyElements: pendingAnnotation.nearbyElements,
          reactComponents: pendingAnnotation.reactComponents,
          sourceFile: pendingAnnotation.sourceFile,
          elementBoundingBoxes: pendingAnnotation.elementBoundingBoxes,
          // Protocol fields for server sync
          ...endpoint && currentSessionId ? {
            sessionId: currentSessionId,
            url: typeof window !== "undefined" ? window.location.href : void 0,
            status: "pending"
          } : {}
        };
        setAnnotations((prev) => [...prev, newAnnotation]);
        recentlyAddedIdRef.current = newAnnotation.id;
        originalSetTimeout(() => {
          recentlyAddedIdRef.current = null;
        }, 300);
        originalSetTimeout(() => {
          setAnimatedMarkers((prev) => new Set(prev).add(newAnnotation.id));
        }, 250);
        onAnnotationAdd?.(newAnnotation);
        fireWebhook("annotation.add", { annotation: newAnnotation });
        setPendingExiting(true);
        originalSetTimeout(() => {
          setPendingAnnotation(null);
          setPendingExiting(false);
        }, 150);
        window.getSelection()?.removeAllRanges();
        if (endpoint && currentSessionId) {
          syncAnnotation(endpoint, currentSessionId, newAnnotation).then((serverAnnotation) => {
            if (serverAnnotation.id !== newAnnotation.id) {
              setAnnotations(
                (prev) => prev.map(
                  (a) => a.id === newAnnotation.id ? { ...a, id: serverAnnotation.id } : a
                )
              );
              setAnimatedMarkers((prev) => {
                const next = new Set(prev);
                next.delete(newAnnotation.id);
                next.add(serverAnnotation.id);
                return next;
              });
            }
          }).catch((error) => {
            console.warn("[Agentation] Failed to sync annotation:", error);
          });
        }
      },
      [
        pendingAnnotation,
        onAnnotationAdd,
        fireWebhook,
        endpoint,
        currentSessionId
      ]
    );
    const cancelAnnotation = (0, import_react.useCallback)(() => {
      setPendingExiting(true);
      originalSetTimeout(() => {
        setPendingAnnotation(null);
        setPendingExiting(false);
      }, 150);
    }, []);
    const deleteAnnotation2 = (0, import_react.useCallback)(
      (id) => {
        const deletedIndex = annotations.findIndex((a) => a.id === id);
        const deletedAnnotation = annotations[deletedIndex];
        if (editingAnnotation?.id === id) {
          setEditExiting(true);
          originalSetTimeout(() => {
            setEditingAnnotation(null);
            setEditingTargetElement(null);
            setEditingTargetElements([]);
            setEditExiting(false);
          }, 150);
        }
        setDeletingMarkerId(id);
        setExitingMarkers((prev) => new Set(prev).add(id));
        if (deletedAnnotation) {
          onAnnotationDelete?.(deletedAnnotation);
          fireWebhook("annotation.delete", { annotation: deletedAnnotation });
        }
        if (endpoint) {
          deleteAnnotation(endpoint, id).catch((error) => {
            console.warn(
              "[Agentation] Failed to delete annotation from server:",
              error
            );
          });
        }
        originalSetTimeout(() => {
          setAnnotations((prev) => prev.filter((a) => a.id !== id));
          setExitingMarkers((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setDeletingMarkerId(null);
          if (deletedIndex < annotations.length - 1) {
            setRenumberFrom(deletedIndex);
            originalSetTimeout(() => setRenumberFrom(null), 200);
          }
        }, 150);
      },
      [annotations, editingAnnotation, onAnnotationDelete, fireWebhook, endpoint]
    );
    const handleMarkerHover = (0, import_react.useCallback)(
      (annotation) => {
        if (!annotation) {
          setHoveredMarkerId(null);
          setHoveredTargetElement(null);
          setHoveredTargetElements([]);
          return;
        }
        setHoveredMarkerId(annotation.id);
        if (annotation.elementBoundingBoxes?.length) {
          const elements = [];
          for (const bb of annotation.elementBoundingBoxes) {
            const centerX = bb.x + bb.width / 2;
            const centerY = bb.y + bb.height / 2 - window.scrollY;
            const allEls = document.elementsFromPoint(centerX, centerY);
            const el = allEls.find(
              (e) => !e.closest("[data-annotation-marker]") && !e.closest("[data-agentation-root]")
            );
            if (el) elements.push(el);
          }
          setHoveredTargetElements(elements);
          setHoveredTargetElement(null);
        } else if (annotation.boundingBox) {
          const bb = annotation.boundingBox;
          const centerX = bb.x + bb.width / 2;
          const centerY = annotation.isFixed ? bb.y + bb.height / 2 : bb.y + bb.height / 2 - window.scrollY;
          const el = deepElementFromPoint(centerX, centerY);
          if (el) {
            const elRect = el.getBoundingClientRect();
            const widthRatio = elRect.width / bb.width;
            const heightRatio = elRect.height / bb.height;
            if (widthRatio < 0.5 || heightRatio < 0.5) {
              setHoveredTargetElement(null);
            } else {
              setHoveredTargetElement(el);
            }
          } else {
            setHoveredTargetElement(null);
          }
          setHoveredTargetElements([]);
        } else {
          setHoveredTargetElement(null);
          setHoveredTargetElements([]);
        }
      },
      []
    );
    const updateAnnotation2 = (0, import_react.useCallback)(
      (newComment) => {
        if (!editingAnnotation) return;
        const updatedAnnotation = { ...editingAnnotation, comment: newComment };
        setAnnotations(
          (prev) => prev.map(
            (a) => a.id === editingAnnotation.id ? updatedAnnotation : a
          )
        );
        onAnnotationUpdate?.(updatedAnnotation);
        fireWebhook("annotation.update", { annotation: updatedAnnotation });
        if (endpoint) {
          updateAnnotation(endpoint, editingAnnotation.id, {
            comment: newComment
          }).catch((error) => {
            console.warn(
              "[Agentation] Failed to update annotation on server:",
              error
            );
          });
        }
        setEditExiting(true);
        originalSetTimeout(() => {
          setEditingAnnotation(null);
          setEditingTargetElement(null);
          setEditingTargetElements([]);
          setEditExiting(false);
        }, 150);
      },
      [editingAnnotation, onAnnotationUpdate, fireWebhook, endpoint]
    );
    const cancelEditAnnotation = (0, import_react.useCallback)(() => {
      setEditExiting(true);
      originalSetTimeout(() => {
        setEditingAnnotation(null);
        setEditingTargetElement(null);
        setEditingTargetElements([]);
        setEditExiting(false);
      }, 150);
    }, []);
    const clearAll = (0, import_react.useCallback)(() => {
      const count = annotations.length;
      const hasDesign = designPlacements.length > 0 || !!rearrangeState;
      if (count === 0 && drawStrokes.length === 0 && !hasDesign) return;
      onAnnotationsClear?.(annotations);
      fireWebhook("annotations.clear", { annotations });
      if (endpoint) {
        Promise.all(
          annotations.map(
            (a) => deleteAnnotation(endpoint, a.id).catch((error) => {
              console.warn(
                "[Agentation] Failed to delete annotation from server:",
                error
              );
            })
          )
        );
        for (const [, annotationId] of placementAnnotationMap.current) {
          if (annotationId) {
            deleteAnnotation(endpoint, annotationId).catch(() => {
            });
          }
        }
        placementAnnotationMap.current.clear();
        for (const [, annotationId] of rearrangeAnnotationMap.current) {
          if (annotationId) {
            deleteAnnotation(endpoint, annotationId).catch(() => {
            });
          }
        }
        rearrangeAnnotationMap.current.clear();
      }
      setIsClearing(true);
      setCleared(true);
      setDrawStrokes([]);
      const canvas = drawCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (designPlacements.length > 0 || rearrangeState) {
        setDesignClearSignal((n) => n + 1);
        setRearrangeClearSignal((n) => n + 1);
        originalSetTimeout(() => {
          setDesignPlacements([]);
          setRearrangeState(null);
        }, 200);
      }
      if (blankCanvas) setBlankCanvas(false);
      if (wireframePurpose) setWireframePurpose("");
      wireframeStashRef.current = { rearrange: null, placements: [] };
      clearWireframeState(pathname);
      const totalAnimationTime = count * 30 + 200;
      originalSetTimeout(() => {
        setAnnotations([]);
        setAnimatedMarkers(/* @__PURE__ */ new Set());
        localStorage.removeItem(getStorageKey(pathname));
        setIsClearing(false);
      }, totalAnimationTime);
      originalSetTimeout(() => setCleared(false), 1500);
    }, [pathname, annotations, drawStrokes, designPlacements, rearrangeState, blankCanvas, wireframePurpose, onAnnotationsClear, fireWebhook, endpoint]);
    const copyOutput = (0, import_react.useCallback)(async () => {
      const displayUrl = typeof window !== "undefined" ? window.location.pathname + window.location.search + window.location.hash : pathname;
      const wireframeOnly = isDesignMode && blankCanvas;
      let output;
      if (wireframeOnly) {
        if (designPlacements.length === 0 && !rearrangeState && !wireframePurpose) return;
        output = "";
      } else {
        output = generateOutput(
          annotations,
          displayUrl,
          settings.outputDetail
        );
        if (!output && drawStrokes.length === 0 && designPlacements.length === 0 && !rearrangeState) return;
        if (!output) output = `## Page Feedback: ${displayUrl}
`;
      }
      if (!wireframeOnly && drawStrokes.length > 0) {
        const linkedDrawingIndices = /* @__PURE__ */ new Set();
        for (const a of annotations) {
          if (a.drawingIndex != null) linkedDrawingIndices.add(a.drawingIndex);
        }
        const canvas = drawCanvasRef.current;
        if (canvas) canvas.style.visibility = "hidden";
        const strokeDescriptions = [];
        const scrollY2 = window.scrollY;
        for (let strokeIdx = 0; strokeIdx < drawStrokes.length; strokeIdx++) {
          if (linkedDrawingIndices.has(strokeIdx)) continue;
          const stroke = drawStrokes[strokeIdx];
          if (stroke.points.length < 2) continue;
          const viewportPoints = stroke.fixed ? stroke.points : stroke.points.map((p) => ({ x: p.x, y: p.y - scrollY2 }));
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const p of viewportPoints) {
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
          }
          const bboxW = maxX - minX;
          const bboxH = maxY - minY;
          const bboxDiag = Math.hypot(bboxW, bboxH);
          const start = viewportPoints[0];
          const end = viewportPoints[viewportPoints.length - 1];
          const startEndDist = Math.hypot(end.x - start.x, end.y - start.y);
          let gesture;
          const closedLoop = startEndDist < bboxDiag * 0.35;
          const aspectRatio = bboxW / Math.max(bboxH, 1);
          if (closedLoop && bboxDiag > 20) {
            const edgeThreshold = Math.max(bboxW, bboxH) * 0.15;
            let edgePoints = 0;
            for (const p of viewportPoints) {
              const nearLeft = p.x - minX < edgeThreshold;
              const nearRight = maxX - p.x < edgeThreshold;
              const nearTop = p.y - minY < edgeThreshold;
              const nearBottom = maxY - p.y < edgeThreshold;
              if ((nearLeft || nearRight) && (nearTop || nearBottom)) edgePoints++;
            }
            gesture = edgePoints > viewportPoints.length * 0.15 ? "box" : "circle";
          } else if (aspectRatio > 3 && bboxH < 40) {
            gesture = "underline";
          } else if (startEndDist > bboxDiag * 0.5) {
            gesture = "arrow";
          } else {
            gesture = "drawing";
          }
          const sampleCount = Math.min(10, viewportPoints.length);
          const step = Math.max(1, Math.floor(viewportPoints.length / sampleCount));
          const seenElements = /* @__PURE__ */ new Set();
          const elementNames = [];
          const samplePoints = [start];
          for (let i = step; i < viewportPoints.length - 1; i += step) {
            samplePoints.push(viewportPoints[i]);
          }
          samplePoints.push(end);
          for (const p of samplePoints) {
            const el = deepElementFromPoint(p.x, p.y);
            if (!el || seenElements.has(el)) continue;
            if (closestCrossingShadow(el, "[data-feedback-toolbar]")) continue;
            seenElements.add(el);
            const { name } = identifyElement(el);
            if (!elementNames.includes(name)) {
              elementNames.push(name);
            }
          }
          const region = `${Math.round(minX)},${Math.round(minY)} \u2192 ${Math.round(maxX)},${Math.round(maxY)}`;
          let desc;
          if ((gesture === "circle" || gesture === "box") && elementNames.length > 0) {
            const verb = gesture === "box" ? "Boxed" : "Circled";
            desc = `${verb} **${elementNames[0]}**${elementNames.length > 1 ? ` (and ${elementNames.slice(1).join(", ")})` : ""} (region: ${region})`;
          } else if (gesture === "underline" && elementNames.length > 0) {
            desc = `Underlined **${elementNames[0]}** (${region})`;
          } else if (gesture === "arrow" && elementNames.length >= 2) {
            desc = `Arrow from **${elementNames[0]}** to **${elementNames[elementNames.length - 1]}** (${Math.round(start.x)},${Math.round(start.y)} \u2192 ${Math.round(end.x)},${Math.round(end.y)})`;
          } else if (elementNames.length > 0) {
            desc = `${gesture === "arrow" ? "Arrow" : "Drawing"} near **${elementNames.join("**, **")}** (region: ${region})`;
          } else {
            desc = `Drawing at ${region}`;
          }
          strokeDescriptions.push(desc);
        }
        if (canvas) canvas.style.visibility = "";
        if (strokeDescriptions.length > 0) {
          output += `
**Drawings:**
`;
          strokeDescriptions.forEach((d, i) => {
            output += `${i + 1}. ${d}
`;
          });
        }
      }
      if (designPlacements.length > 0 || wireframeOnly && wireframePurpose) {
        output += "\n" + generateDesignOutput(designPlacements, {
          width: window.innerWidth,
          height: window.innerHeight
        }, { blankCanvas, wireframePurpose: wireframePurpose || void 0 }, settings.outputDetail);
      }
      if (rearrangeState) {
        const rearrangeOutput = generateRearrangeOutput(rearrangeState, settings.outputDetail, {
          width: window.innerWidth,
          height: window.innerHeight
        });
        if (rearrangeOutput) {
          output += "\n" + rearrangeOutput;
        }
      }
      if (copyToClipboard) {
        try {
          await navigator.clipboard.writeText(output);
        } catch {
        }
      }
      onCopy?.(output);
      setCopied(true);
      originalSetTimeout(() => setCopied(false), 2e3);
      if (settings.autoClearAfterCopy) {
        originalSetTimeout(() => clearAll(), 500);
      }
    }, [
      annotations,
      drawStrokes,
      designPlacements,
      rearrangeState,
      blankCanvas,
      isDesignMode,
      canvasPurpose,
      wireframePurpose,
      pathname,
      settings.outputDetail,
      effectiveReactMode,
      settings.autoClearAfterCopy,
      clearAll,
      copyToClipboard,
      onCopy
    ]);
    const sendToWebhook = (0, import_react.useCallback)(async () => {
      const displayUrl = typeof window !== "undefined" ? window.location.pathname + window.location.search + window.location.hash : pathname;
      let output = generateOutput(
        annotations,
        displayUrl,
        settings.outputDetail
      );
      if (!output && designPlacements.length === 0 && !rearrangeState) return;
      if (!output) output = `## Page Feedback: ${displayUrl}
`;
      if (designPlacements.length > 0) {
        output += "\n" + generateDesignOutput(designPlacements, {
          width: window.innerWidth,
          height: window.innerHeight
        }, { blankCanvas, wireframePurpose: wireframePurpose || void 0 }, settings.outputDetail);
      }
      if (rearrangeState) {
        const rearrangeOutput = generateRearrangeOutput(rearrangeState, settings.outputDetail, {
          width: window.innerWidth,
          height: window.innerHeight
        });
        if (rearrangeOutput) {
          output += "\n" + rearrangeOutput;
        }
      }
      if (onSubmit) {
        onSubmit(output, annotations);
      }
      setSendState("sending");
      await new Promise((resolve) => originalSetTimeout(resolve, 150));
      const success = await fireWebhook("submit", { output, annotations }, true);
      setSendState(success ? "sent" : "failed");
      originalSetTimeout(() => setSendState("idle"), 2500);
      if (success && settings.autoClearAfterCopy) {
        originalSetTimeout(() => clearAll(), 500);
      }
    }, [
      onSubmit,
      fireWebhook,
      annotations,
      designPlacements,
      rearrangeState,
      blankCanvas,
      canvasPurpose,
      pathname,
      settings.outputDetail,
      effectiveReactMode,
      settings.autoClearAfterCopy,
      clearAll
    ]);
    (0, import_react.useEffect)(() => {
      if (!dragStartPos) return;
      const DRAG_THRESHOLD2 = 10;
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - dragStartPos.x;
        const deltaY = e.clientY - dragStartPos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (!isDraggingToolbar && distance > DRAG_THRESHOLD2) {
          setIsDraggingToolbar(true);
        }
        if (isDraggingToolbar || distance > DRAG_THRESHOLD2) {
          let newX = dragStartPos.toolbarX + deltaX;
          let newY = dragStartPos.toolbarY + deltaY;
          const padding = 20;
          const wrapperWidth = 337;
          const toolbarHeight = 44;
          const contentWidth = isActive ? connectionStatus === "connected" ? 297 : 257 : 44;
          const contentOffset = wrapperWidth - contentWidth;
          const minX = padding - contentOffset;
          const maxX = window.innerWidth - padding - wrapperWidth;
          newX = Math.max(minX, Math.min(maxX, newX));
          newY = Math.max(
            padding,
            Math.min(window.innerHeight - toolbarHeight - padding, newY)
          );
          setToolbarPosition({ x: newX, y: newY });
        }
      };
      const handleMouseUp = () => {
        if (isDraggingToolbar) {
          justFinishedToolbarDragRef.current = true;
        }
        setIsDraggingToolbar(false);
        setDragStartPos(null);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragStartPos, isDraggingToolbar, isActive, connectionStatus]);
    const handleToolbarMouseDown = (0, import_react.useCallback)(
      (e) => {
        if (e.target.closest("button") || e.target.closest("[data-agentation-settings-panel]")) {
          return;
        }
        const toolbarParent = e.currentTarget.parentElement;
        if (!toolbarParent) return;
        const rect = toolbarParent.getBoundingClientRect();
        const currentX = toolbarPosition?.x ?? rect.left;
        const currentY = toolbarPosition?.y ?? rect.top;
        setDragStartPos({
          x: e.clientX,
          y: e.clientY,
          toolbarX: currentX,
          toolbarY: currentY
        });
      },
      [toolbarPosition]
    );
    (0, import_react.useEffect)(() => {
      if (!toolbarPosition) return;
      const constrainPosition = () => {
        const padding = 20;
        const wrapperWidth = 337;
        const toolbarHeight = 44;
        let newX = toolbarPosition.x;
        let newY = toolbarPosition.y;
        const contentWidth = isActive ? connectionStatus === "connected" ? 297 : 257 : 44;
        const contentOffset = wrapperWidth - contentWidth;
        const minX = padding - contentOffset;
        const maxX = window.innerWidth - padding - wrapperWidth;
        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(
          padding,
          Math.min(window.innerHeight - toolbarHeight - padding, newY)
        );
        if (newX !== toolbarPosition.x || newY !== toolbarPosition.y) {
          setToolbarPosition({ x: newX, y: newY });
        }
      };
      constrainPosition();
      window.addEventListener("resize", constrainPosition);
      return () => window.removeEventListener("resize", constrainPosition);
    }, [toolbarPosition, isActive, connectionStatus]);
    (0, import_react.useEffect)(() => {
      const handleKeyDown = (e) => {
        const target = e.target;
        const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
        if (e.key === "Escape") {
          if (isDesignMode) {
            if (activeDesignComponent) {
              setActiveDesignComponent(null);
            } else {
              closeDesignMode();
            }
            return;
          }
          if (isDrawMode) {
            setIsDrawMode(false);
            return;
          }
          if (pendingMultiSelectElements.length > 0) {
            setPendingMultiSelectElements([]);
            return;
          }
          if (pendingAnnotation) {
          } else if (isActive) {
            hideTooltipsUntilMouseLeave();
            setIsActive(false);
          }
        }
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "f" || e.key === "F")) {
          e.preventDefault();
          hideTooltipsUntilMouseLeave();
          if (isActive) {
            deactivate();
          } else {
            setIsActive(true);
          }
          return;
        }
        if (isTyping || e.metaKey || e.ctrlKey) return;
        if (e.key === "p" || e.key === "P") {
          e.preventDefault();
          hideTooltipsUntilMouseLeave();
          toggleFreeze();
        }
        if (e.key === "l" || e.key === "L") {
          e.preventDefault();
          hideTooltipsUntilMouseLeave();
          if (isDrawMode) setIsDrawMode(false);
          if (showSettings) setShowSettings(false);
          if (pendingAnnotation) cancelAnnotation();
          if (isDesignMode) {
            closeDesignMode();
          } else {
            setIsDesignMode(true);
          }
        }
        if (e.key === "h" || e.key === "H") {
          if (annotations.length > 0) {
            e.preventDefault();
            hideTooltipsUntilMouseLeave();
            setShowMarkers((prev) => !prev);
          }
        }
        if (e.key === "c" || e.key === "C") {
          if (annotations.length > 0 || designPlacements.length > 0 || rearrangeState) {
            e.preventDefault();
            hideTooltipsUntilMouseLeave();
            copyOutput();
          }
        }
        if (e.key === "x" || e.key === "X") {
          if (annotations.length > 0 || designPlacements.length > 0 || rearrangeState) {
            e.preventDefault();
            hideTooltipsUntilMouseLeave();
            clearAll();
            if (designPlacements.length > 0) setDesignPlacements([]);
            if (rearrangeState) setRearrangeState(null);
          }
        }
        if (e.key === "s" || e.key === "S") {
          const hasValidWebhook = isValidUrl(settings.webhookUrl) || isValidUrl(webhookUrl || "");
          if (annotations.length > 0 && hasValidWebhook && sendState === "idle") {
            e.preventDefault();
            hideTooltipsUntilMouseLeave();
            sendToWebhook();
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      isActive,
      isDrawMode,
      isDesignMode,
      activeDesignComponent,
      designPlacements,
      rearrangeState,
      pendingAnnotation,
      annotations.length,
      settings.webhookUrl,
      webhookUrl,
      sendState,
      sendToWebhook,
      toggleFreeze,
      copyOutput,
      clearAll,
      pendingMultiSelectElements
    ]);
    if (!mounted) return null;
    if (isToolbarHidden) return null;
    const hasAnnotations = annotations.length > 0;
    const visibleAnnotations = annotations.filter(
      (a) => !exitingMarkers.has(a.id) && a.kind !== "placement" && a.kind !== "rearrange"
    );
    const hasVisibleAnnotations = visibleAnnotations.length > 0;
    const exitingAnnotationsList = annotations.filter(
      (a) => exitingMarkers.has(a.id)
    );
    const getTooltipPosition = (annotation) => {
      const tooltipMaxWidth = 200;
      const tooltipEstimatedHeight = 80;
      const markerSize = 22;
      const gap = 10;
      const markerX = annotation.x / 100 * window.innerWidth;
      const markerY = typeof annotation.y === "string" ? parseFloat(annotation.y) : annotation.y;
      const styles = {};
      const spaceBelow = window.innerHeight - markerY - markerSize - gap;
      if (spaceBelow < tooltipEstimatedHeight) {
        styles.top = "auto";
        styles.bottom = `calc(100% + ${gap}px)`;
      }
      const centerX = markerX - tooltipMaxWidth / 2;
      const edgePadding = 10;
      if (centerX < edgePadding) {
        const offset = edgePadding - centerX;
        styles.left = `calc(50% + ${offset}px)`;
      } else if (centerX + tooltipMaxWidth > window.innerWidth - edgePadding) {
        const overflow = centerX + tooltipMaxWidth - (window.innerWidth - edgePadding);
        styles.left = `calc(50% - ${overflow}px)`;
      }
      return styles;
    };
    return (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { ref: portalWrapperRef, style: { display: "contents" }, "data-agentation-theme": isDarkMode ? "dark" : "light", "data-agentation-accent": settings.annotationColorId, "data-agentation-root": "", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            className: `${styles_module_default4.toolbar}${userClassName ? ` ${userClassName}` : ""}`,
            "data-feedback-toolbar": true,
            "data-agentation-toolbar": true,
            style: toolbarPosition ? {
              left: toolbarPosition.x,
              top: toolbarPosition.y,
              right: "auto",
              bottom: "auto"
            } : void 0,
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "div",
              {
                className: `${styles_module_default4.toolbarContainer} ${isActive ? styles_module_default4.expanded : styles_module_default4.collapsed} ${showEntranceAnimation ? styles_module_default4.entrance : ""} ${isToolbarHiding ? styles_module_default4.hiding : ""} ${!settings.webhooksEnabled && (isValidUrl(settings.webhookUrl) || isValidUrl(webhookUrl || "")) ? styles_module_default4.serverConnected : ""}`,
                onClick: !isActive ? (e) => {
                  if (justFinishedToolbarDragRef.current) {
                    justFinishedToolbarDragRef.current = false;
                    e.preventDefault();
                    return;
                  }
                  setIsActive(true);
                } : void 0,
                onMouseDown: handleToolbarMouseDown,
                role: !isActive ? "button" : void 0,
                tabIndex: !isActive ? 0 : -1,
                title: !isActive ? "Start feedback mode" : void 0,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                    "div",
                    {
                      className: `${styles_module_default4.toggleContent} ${!isActive ? styles_module_default4.visible : styles_module_default4.hidden}`,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconListSparkle, { size: 24 }),
                        hasVisibleAnnotations && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                          "span",
                          {
                            className: `${styles_module_default4.badge} ${isActive ? styles_module_default4.fadeOut : ""} ${showEntranceAnimation ? styles_module_default4.entrance : ""}`,
                            children: visibleAnnotations.length
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                    "div",
                    {
                      className: `${styles_module_default4.controlsContent} ${isActive ? styles_module_default4.visible : styles_module_default4.hidden} ${toolbarPosition && toolbarPosition.y < 100 ? styles_module_default4.tooltipBelow : ""} ${tooltipsHidden || showSettings ? styles_module_default4.tooltipsHidden : ""} ${tooltipSessionActive ? styles_module_default4.tooltipsInSession : ""}`,
                      onMouseEnter: handleControlsMouseEnter,
                      onMouseLeave: handleControlsMouseLeave,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                          "div",
                          {
                            className: `${styles_module_default4.buttonWrapper} ${toolbarPosition && toolbarPosition.x < 120 ? styles_module_default4.buttonWrapperAlignLeft : ""}`,
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                                "button",
                                {
                                  className: styles_module_default4.controlButton,
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    hideTooltipsUntilMouseLeave();
                                    toggleFreeze();
                                  },
                                  "data-active": isFrozen,
                                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconPausePlayAnimated, { size: 24, isPaused: isFrozen })
                                }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                                isFrozen ? "Resume animations" : "Pause animations",
                                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "P" })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.buttonWrapper, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "button",
                            {
                              className: `${styles_module_default4.controlButton} ${!isDarkMode ? styles_module_default4.light : ""}`,
                              onClick: (e) => {
                                e.stopPropagation();
                                hideTooltipsUntilMouseLeave();
                                if (isDrawMode) setIsDrawMode(false);
                                if (showSettings) setShowSettings(false);
                                if (pendingAnnotation) cancelAnnotation();
                                if (isDesignMode) {
                                  closeDesignMode();
                                } else {
                                  setIsDesignMode(true);
                                }
                              },
                              "data-active": isDesignMode,
                              style: isDesignMode && blankCanvas ? { color: "#f97316", background: "rgba(249, 115, 22, 0.25)" } : void 0,
                              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconLayout, { size: 21 })
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                            isDesignMode ? "Exit layout mode" : "Layout mode",
                            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "L" })
                          ] })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.buttonWrapper, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "button",
                            {
                              className: styles_module_default4.controlButton,
                              onClick: (e) => {
                                e.stopPropagation();
                                hideTooltipsUntilMouseLeave();
                                setShowMarkers(!showMarkers);
                              },
                              disabled: !hasAnnotations || isDesignMode,
                              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconEyeAnimated, { size: 24, isOpen: showMarkers })
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                            showMarkers ? "Hide markers" : "Show markers",
                            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "H" })
                          ] })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.buttonWrapper, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "button",
                            {
                              className: `${styles_module_default4.controlButton} ${copied ? styles_module_default4.statusShowing : ""}`,
                              onClick: (e) => {
                                e.stopPropagation();
                                hideTooltipsUntilMouseLeave();
                                copyOutput();
                              },
                              disabled: isDesignMode && blankCanvas ? designPlacements.length === 0 && !rearrangeState?.sections?.length : !hasAnnotations && drawStrokes.length === 0 && designPlacements.length === 0 && !rearrangeState?.sections?.length,
                              "data-active": copied,
                              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconCopyAnimated, { size: 24, copied, tint: isDesignMode && blankCanvas && (designPlacements.length > 0 || !!rearrangeState?.sections?.length) ? "#f97316" : void 0 })
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                            isDesignMode && blankCanvas ? "Copy layout" : "Copy feedback",
                            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "C" })
                          ] })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                          "div",
                          {
                            className: `${styles_module_default4.buttonWrapper} ${styles_module_default4.sendButtonWrapper} ${isActive && !settings.webhooksEnabled && (isValidUrl(settings.webhookUrl) || isValidUrl(webhookUrl || "")) ? styles_module_default4.sendButtonVisible : ""}`,
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                                "button",
                                {
                                  className: `${styles_module_default4.controlButton} ${sendState === "sent" || sendState === "failed" ? styles_module_default4.statusShowing : ""}`,
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    hideTooltipsUntilMouseLeave();
                                    sendToWebhook();
                                  },
                                  disabled: !hasAnnotations || !isValidUrl(settings.webhookUrl) && !isValidUrl(webhookUrl || "") || sendState === "sending",
                                  "data-no-hover": sendState === "sent" || sendState === "failed",
                                  tabIndex: isValidUrl(settings.webhookUrl) || isValidUrl(webhookUrl || "") ? 0 : -1,
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconSendArrow, { size: 24, state: sendState }),
                                    hasAnnotations && sendState === "idle" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                                      "span",
                                      {
                                        className: styles_module_default4.buttonBadge,
                                        children: annotations.length
                                      }
                                    )
                                  ]
                                }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                                "Send Annotations",
                                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "S" })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.buttonWrapper, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "button",
                            {
                              className: styles_module_default4.controlButton,
                              onClick: (e) => {
                                e.stopPropagation();
                                hideTooltipsUntilMouseLeave();
                                clearAll();
                              },
                              disabled: !hasAnnotations && drawStrokes.length === 0 && designPlacements.length === 0 && !rearrangeState?.sections?.length,
                              "data-danger": true,
                              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconTrashAlt, { size: 24 })
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                            "Clear all",
                            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "X" })
                          ] })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.buttonWrapper, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "button",
                            {
                              className: styles_module_default4.controlButton,
                              onClick: (e) => {
                                e.stopPropagation();
                                hideTooltipsUntilMouseLeave();
                                if (isDesignMode) closeDesignMode();
                                setShowSettings(!showSettings);
                              },
                              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconGear, { size: 24 })
                            }
                          ),
                          endpoint && connectionStatus !== "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "span",
                            {
                              className: `${styles_module_default4.mcpIndicator} ${styles_module_default4[connectionStatus]} ${showSettings ? styles_module_default4.hidden : ""}`,
                              title: connectionStatus === "connected" ? "MCP Connected" : "MCP Connecting..."
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.buttonTooltip, children: "Settings" })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                          "div",
                          {
                            className: styles_module_default4.divider
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                          "div",
                          {
                            className: `${styles_module_default4.buttonWrapper} ${toolbarPosition && typeof window !== "undefined" && toolbarPosition.x > window.innerWidth - 120 ? styles_module_default4.buttonWrapperAlignRight : ""}`,
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                                "button",
                                {
                                  className: styles_module_default4.controlButton,
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    hideTooltipsUntilMouseLeave();
                                    deactivate();
                                  },
                                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconXmarkLarge, { size: 24 })
                                }
                              ),
                              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: styles_module_default4.buttonTooltip, children: [
                                "Exit",
                                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default4.shortcut, children: "Esc" })
                              ] })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    DesignPalette,
                    {
                      visible: isDesignMode && isActive,
                      activeType: activeDesignComponent,
                      onSelect: (type) => {
                        setActiveDesignComponent(activeDesignComponent === type ? null : type);
                      },
                      isDarkMode,
                      sectionCount: rearrangeState?.sections.length ?? 0,
                      onDetectSections: () => {
                        const sections = detectPageSections();
                        const existing = rearrangeState?.sections ?? [];
                        const existingSelectors = new Set(existing.map((s2) => s2.selector));
                        const newSections = sections.filter((s2) => !existingSelectors.has(s2.selector));
                        const merged = [...existing, ...newSections];
                        const mergedOrder = [...rearrangeState?.originalOrder ?? [], ...newSections.map((s2) => s2.id)];
                        setRearrangeState({
                          sections: merged,
                          originalOrder: mergedOrder,
                          detectedAt: Date.now()
                        });
                      },
                      placementCount: designPlacements.length,
                      onClearPlacements: () => {
                        setDesignClearSignal((n) => n + 1);
                        setRearrangeClearSignal((n) => n + 1);
                        originalSetTimeout(() => {
                          setRearrangeState({
                            sections: [],
                            originalOrder: [],
                            detectedAt: Date.now()
                          });
                        }, 200);
                      },
                      blankCanvas,
                      onBlankCanvasChange: (on) => {
                        const emptyRearrange = { sections: [], originalOrder: [], detectedAt: Date.now() };
                        if (on) {
                          exploreStashRef.current = { rearrange: rearrangeState, placements: designPlacements };
                          setRearrangeState(wireframeStashRef.current.rearrange || emptyRearrange);
                          setDesignPlacements(wireframeStashRef.current.placements);
                          setActiveDesignComponent(null);
                        } else {
                          wireframeStashRef.current = { rearrange: rearrangeState, placements: designPlacements };
                          setRearrangeState(exploreStashRef.current.rearrange || emptyRearrange);
                          setDesignPlacements(exploreStashRef.current.placements);
                        }
                        setBlankCanvas(on);
                      },
                      wireframePurpose,
                      onWireframePurposeChange: setWireframePurpose,
                      Tooltip: HelpTooltip,
                      onDragStart: (type, e) => {
                        e.preventDefault();
                        const def = DEFAULT_SIZES[type];
                        let preview = null;
                        let didDrag = false;
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const toolbar = e.target.closest("[data-feedback-toolbar]");
                        const toolbarTop = toolbar?.getBoundingClientRect().top ?? window.innerHeight;
                        const onMove = (ev) => {
                          const dx = ev.clientX - startX;
                          const dy = ev.clientY - startY;
                          if (!didDrag && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
                            didDrag = true;
                            preview = document.createElement("div");
                            preview.className = `${styles_module_default3.dragPreview}${blankCanvas ? ` ${styles_module_default3.dragPreviewWireframe}` : ""}`;
                            document.body.appendChild(preview);
                          }
                          if (!preview) return;
                          const dist = Math.max(0, toolbarTop - ev.clientY);
                          const progress = Math.min(1, dist / 180);
                          const eased = 1 - Math.pow(1 - progress, 2);
                          const minW = 28;
                          const minH = 20;
                          const maxW = Math.min(140, def.width * 0.18);
                          const maxH = Math.min(90, def.height * 0.18);
                          const w = minW + (maxW - minW) * eased;
                          const h = minH + (maxH - minH) * eased;
                          preview.style.width = `${w}px`;
                          preview.style.height = `${h}px`;
                          preview.style.left = `${ev.clientX - w / 2}px`;
                          preview.style.top = `${ev.clientY - h / 2}px`;
                          preview.style.opacity = `${0.5 + 0.5 * eased}`;
                          preview.textContent = eased > 0.25 ? type : "";
                        };
                        const onUp = (ev) => {
                          window.removeEventListener("mousemove", onMove);
                          window.removeEventListener("mouseup", onUp);
                          if (preview) document.body.removeChild(preview);
                          if (didDrag) {
                            const w = def.width;
                            const h = def.height;
                            const scrollY2 = window.scrollY;
                            const x = Math.max(0, ev.clientX - w / 2);
                            const y = Math.max(0, ev.clientY + scrollY2 - h / 2);
                            const placement = {
                              id: `dp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                              type,
                              x,
                              y,
                              width: w,
                              height: h,
                              scrollY: scrollY2,
                              timestamp: Date.now()
                            };
                            setDesignPlacements((prev) => [...prev, placement]);
                            setActiveDesignComponent(null);
                            designSelectedIdsRef.current = /* @__PURE__ */ new Set();
                            setDesignDeselectSignal((n) => n + 1);
                          }
                        };
                        window.addEventListener("mousemove", onMove);
                        window.addEventListener("mouseup", onUp);
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    SettingsPanel,
                    {
                      settings,
                      onSettingsChange: (patch) => setSettings((s2) => ({ ...s2, ...patch })),
                      isDarkMode,
                      onToggleTheme: toggleTheme,
                      isDevMode,
                      connectionStatus,
                      endpoint,
                      isVisible: showSettingsVisible,
                      toolbarNearBottom: !!toolbarPosition && toolbarPosition.y < 230,
                      settingsPage,
                      onSettingsPageChange: setSettingsPage,
                      onHideToolbar: hideToolbarTemporarily
                    }
                  )
                ]
              }
            )
          }
        ),
        (isDesignMode || designOverlayExiting) && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            className: `${styles_module_default3.blankCanvas} ${canvasReady ? styles_module_default3.visible : ""} ${designInteracting ? styles_module_default3.gridActive : ""}`,
            style: { "--canvas-opacity": canvasOpacity },
            "data-feedback-toolbar": true
          }
        ),
        isDesignMode && blankCanvas && canvasReady && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default3.wireframeNotice, "data-feedback-toolbar": true, children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default3.wireframeOpacityRow, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default3.wireframeOpacityLabel, children: "Toggle Opacity" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "input",
              {
                type: "range",
                className: styles_module_default3.wireframeOpacitySlider,
                min: 0,
                max: 1,
                step: 0.01,
                value: canvasOpacity,
                onChange: (e) => setCanvasOpacity(Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default3.wireframeNoticeTitleRow, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default3.wireframeNoticeTitle, children: "Wireframe Mode" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: styles_module_default3.wireframeNoticeDivider }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "button",
              {
                className: styles_module_default3.wireframeStartOver,
                onClick: () => {
                  setDesignClearSignal((n) => n + 1);
                  setRearrangeState({ sections: [], originalOrder: [], detectedAt: Date.now() });
                  wireframeStashRef.current = { rearrange: null, placements: [] };
                  setWireframePurpose("");
                  clearWireframeState(pathname);
                },
                children: "Start Over"
              }
            )
          ] }),
          "Drag components onto the canvas.",
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("br", {}),
          "Copied output will only include the wireframed layout."
        ] }),
        (isDesignMode || designOverlayExiting) && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          DesignMode,
          {
            placements: designPlacements,
            onChange: setDesignPlacements,
            activeComponent: designOverlayExiting ? null : activeDesignComponent,
            onActiveComponentChange: setActiveDesignComponent,
            isDarkMode,
            exiting: designOverlayExiting,
            onInteractionChange: setDesignInteracting,
            passthrough: !activeDesignComponent,
            extraSnapRects: rearrangeState?.sections.map((s2) => s2.currentRect),
            deselectSignal: designDeselectSignal,
            clearSignal: designClearSignal,
            wireframe: blankCanvas,
            onSelectionChange: (ids, isShift) => {
              designSelectedIdsRef.current = ids;
              if (!isShift) {
                rearrangeSelectedIdsRef.current = /* @__PURE__ */ new Set();
                setRearrangeDeselectSignal((n) => n + 1);
              }
            },
            onDragMove: (dx, dy) => {
              const selIds = rearrangeSelectedIdsRef.current;
              if (!selIds.size || !rearrangeState) return;
              if (!crossDragStartRef.current) {
                crossDragStartRef.current = /* @__PURE__ */ new Map();
                for (const s2 of rearrangeState.sections) {
                  if (selIds.has(s2.id)) {
                    crossDragStartRef.current.set(s2.id, { x: s2.currentRect.x, y: s2.currentRect.y });
                  }
                }
              }
              for (const s2 of rearrangeState.sections) {
                if (!selIds.has(s2.id)) continue;
                const start = crossDragStartRef.current.get(s2.id);
                if (!start) continue;
                const outlineEl = document.querySelector(`[data-rearrange-section="${s2.id}"]`);
                if (outlineEl) outlineEl.style.transform = `translate(${dx}px, ${dy}px)`;
              }
            },
            onDragEnd: (dx, dy, committed) => {
              const selIds = rearrangeSelectedIdsRef.current;
              const starts = crossDragStartRef.current;
              crossDragStartRef.current = null;
              if (!selIds.size || !rearrangeState || !starts) return;
              for (const id of selIds) {
                const el = document.querySelector(`[data-rearrange-section="${id}"]`);
                if (el) el.style.transform = "";
              }
              if (committed) {
                setRearrangeState((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    sections: prev.sections.map((s2) => {
                      const start = starts.get(s2.id);
                      if (!start) return s2;
                      return { ...s2, currentRect: { ...s2.currentRect, x: Math.max(0, start.x + dx), y: Math.max(0, start.y + dy) } };
                    })
                  };
                });
              }
            }
          }
        ),
        (isDesignMode || designOverlayExiting) && rearrangeState && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          RearrangeOverlay,
          {
            rearrangeState,
            onChange: setRearrangeState,
            isDarkMode,
            exiting: designOverlayExiting,
            blankCanvas,
            extraSnapRects: designPlacements.map((p) => ({ x: p.x, y: p.y, width: p.width, height: p.height })),
            clearSignal: rearrangeClearSignal,
            deselectSignal: rearrangeDeselectSignal,
            onSelectionChange: (ids, isShift) => {
              rearrangeSelectedIdsRef.current = ids;
              if (!isShift) {
                designSelectedIdsRef.current = /* @__PURE__ */ new Set();
                setDesignDeselectSignal((n) => n + 1);
              }
            },
            onDragMove: (dx, dy) => {
              const selIds = designSelectedIdsRef.current;
              if (!selIds.size) return;
              if (!crossDragStartRef.current) {
                crossDragStartRef.current = /* @__PURE__ */ new Map();
                for (const p of designPlacements) {
                  if (selIds.has(p.id)) {
                    crossDragStartRef.current.set(p.id, { x: p.x, y: p.y });
                  }
                }
              }
              for (const id of selIds) {
                const el = document.querySelector(`[data-design-placement="${id}"]`);
                if (el) el.style.transform = `translate(${dx}px, ${dy}px)`;
              }
            },
            onDragEnd: (dx, dy, committed) => {
              const selIds = designSelectedIdsRef.current;
              const starts = crossDragStartRef.current;
              crossDragStartRef.current = null;
              if (!selIds.size || !starts) return;
              for (const id of selIds) {
                const el = document.querySelector(`[data-design-placement="${id}"]`);
                if (el) el.style.transform = "";
              }
              if (committed) {
                setDesignPlacements((prev) => prev.map((p) => {
                  const start = starts.get(p.id);
                  if (!start) return p;
                  return { ...p, x: Math.max(0, start.x + dx), y: Math.max(0, start.y + dy) };
                }));
              }
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "canvas",
          {
            ref: drawCanvasRef,
            className: `${styles_module_default4.drawCanvas} ${isDrawMode ? styles_module_default4.active : ""}`,
            style: { opacity: shouldShowMarkers ? 1 : 0, transition: "opacity 0.15s ease" },
            "data-feedback-toolbar": true
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.markersLayer, "data-feedback-toolbar": true, children: [
          markersVisible && visibleAnnotations.filter((a) => !a.isFixed).map((annotation, layerIndex, arr) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            AnnotationMarker,
            {
              annotation,
              globalIndex: visibleAnnotations.findIndex((a) => a.id === annotation.id),
              layerIndex,
              layerSize: arr.length,
              isExiting: markersExiting,
              isClearing,
              isAnimated: animatedMarkers.has(annotation.id),
              isHovered: !markersExiting && hoveredMarkerId === annotation.id,
              isDeleting: deletingMarkerId === annotation.id,
              isEditingAny: !!editingAnnotation,
              renumberFrom,
              markerClickBehavior: settings.markerClickBehavior,
              tooltipStyle: getTooltipPosition(annotation),
              onHoverEnter: (a) => !markersExiting && a.id !== recentlyAddedIdRef.current && handleMarkerHover(a),
              onHoverLeave: () => handleMarkerHover(null),
              onClick: (a) => settings.markerClickBehavior === "delete" ? deleteAnnotation2(a.id) : startEditAnnotation(a),
              onContextMenu: startEditAnnotation
            },
            annotation.id
          )),
          markersVisible && !markersExiting && exitingAnnotationsList.filter((a) => !a.isFixed).map((a) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ExitingMarker, { annotation: a }, a.id))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: styles_module_default4.fixedMarkersLayer, "data-feedback-toolbar": true, children: [
          markersVisible && visibleAnnotations.filter((a) => a.isFixed).map((annotation, layerIndex, arr) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            AnnotationMarker,
            {
              annotation,
              globalIndex: visibleAnnotations.findIndex((a) => a.id === annotation.id),
              layerIndex,
              layerSize: arr.length,
              isExiting: markersExiting,
              isClearing,
              isAnimated: animatedMarkers.has(annotation.id),
              isHovered: !markersExiting && hoveredMarkerId === annotation.id,
              isDeleting: deletingMarkerId === annotation.id,
              isEditingAny: !!editingAnnotation,
              renumberFrom,
              markerClickBehavior: settings.markerClickBehavior,
              tooltipStyle: getTooltipPosition(annotation),
              onHoverEnter: (a) => !markersExiting && a.id !== recentlyAddedIdRef.current && handleMarkerHover(a),
              onHoverLeave: () => handleMarkerHover(null),
              onClick: (a) => settings.markerClickBehavior === "delete" ? deleteAnnotation2(a.id) : startEditAnnotation(a),
              onContextMenu: startEditAnnotation
            },
            annotation.id
          )),
          markersVisible && !markersExiting && exitingAnnotationsList.filter((a) => a.isFixed).map((a) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ExitingMarker, { annotation: a, fixed: true }, a.id))
        ] }),
        isActive && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          "div",
          {
            className: styles_module_default4.overlay,
            "data-feedback-toolbar": true,
            style: pendingAnnotation || editingAnnotation ? { zIndex: 99999 } : void 0,
            children: [
              hoverInfo?.rect && !pendingAnnotation && !isScrolling && !isDragging && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "div",
                {
                  className: `${styles_module_default4.hoverHighlight} ${styles_module_default4.enter}`,
                  style: {
                    left: hoverInfo.rect.left,
                    top: hoverInfo.rect.top,
                    width: hoverInfo.rect.width,
                    height: hoverInfo.rect.height,
                    borderColor: "color-mix(in srgb, var(--agentation-color-accent) 50%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--agentation-color-accent) 4%, transparent)"
                  }
                }
              ),
              pendingMultiSelectElements.filter((item) => document.contains(item.element)).map((item, index) => {
                const rect = item.element.getBoundingClientRect();
                const isMulti = pendingMultiSelectElements.length > 1;
                return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "div",
                  {
                    className: isMulti ? styles_module_default4.multiSelectOutline : styles_module_default4.singleSelectOutline,
                    style: {
                      position: "fixed",
                      left: rect.left,
                      top: rect.top,
                      width: rect.width,
                      height: rect.height,
                      ...isMulti ? {} : {
                        borderColor: "color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",
                        backgroundColor: "color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"
                      }
                    }
                  },
                  index
                );
              }),
              hoveredMarkerId && !pendingAnnotation && (() => {
                const hoveredAnnotation = annotations.find(
                  (a) => a.id === hoveredMarkerId
                );
                if (!hoveredAnnotation?.boundingBox) return null;
                if (hoveredAnnotation.elementBoundingBoxes?.length) {
                  if (hoveredTargetElements.length > 0) {
                    return hoveredTargetElements.filter((el) => document.contains(el)).map((el, index) => {
                      const rect2 = el.getBoundingClientRect();
                      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                        "div",
                        {
                          className: `${styles_module_default4.multiSelectOutline} ${styles_module_default4.enter}`,
                          style: {
                            left: rect2.left,
                            top: rect2.top,
                            width: rect2.width,
                            height: rect2.height
                          }
                        },
                        `hover-outline-live-${index}`
                      );
                    });
                  }
                  return hoveredAnnotation.elementBoundingBoxes.map(
                    (bb2, index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "div",
                      {
                        className: `${styles_module_default4.multiSelectOutline} ${styles_module_default4.enter}`,
                        style: {
                          left: bb2.x,
                          top: bb2.y - scrollY,
                          width: bb2.width,
                          height: bb2.height
                        }
                      },
                      `hover-outline-${index}`
                    )
                  );
                }
                const rect = hoveredTargetElement && document.contains(hoveredTargetElement) ? hoveredTargetElement.getBoundingClientRect() : null;
                const bb = rect ? { x: rect.left, y: rect.top, width: rect.width, height: rect.height } : {
                  x: hoveredAnnotation.boundingBox.x,
                  y: hoveredAnnotation.isFixed ? hoveredAnnotation.boundingBox.y : hoveredAnnotation.boundingBox.y - scrollY,
                  width: hoveredAnnotation.boundingBox.width,
                  height: hoveredAnnotation.boundingBox.height
                };
                const isMulti = hoveredAnnotation.isMultiSelect;
                return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "div",
                  {
                    className: `${isMulti ? styles_module_default4.multiSelectOutline : styles_module_default4.singleSelectOutline} ${styles_module_default4.enter}`,
                    style: {
                      left: bb.x,
                      top: bb.y,
                      width: bb.width,
                      height: bb.height,
                      ...isMulti ? {} : {
                        borderColor: "color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",
                        backgroundColor: "color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"
                      }
                    }
                  }
                );
              })(),
              hoverInfo && !pendingAnnotation && !isScrolling && !isDragging && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                "div",
                {
                  className: `${styles_module_default4.hoverTooltip} ${styles_module_default4.enter}`,
                  style: {
                    left: Math.max(
                      8,
                      Math.min(hoverPosition.x, window.innerWidth - 100)
                    ),
                    top: Math.max(
                      hoverPosition.y - (hoverInfo.reactComponents ? 48 : 32),
                      8
                    )
                  },
                  children: [
                    hoverInfo.reactComponents && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: styles_module_default4.hoverReactPath, children: hoverInfo.reactComponents }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: styles_module_default4.hoverElementName, children: hoverInfo.elementName })
                  ]
                }
              ),
              pendingAnnotation && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                pendingAnnotation.multiSelectElements?.length ? (
                  // Cmd+shift+click multi-select: show individual boxes with live positions
                  pendingAnnotation.multiSelectElements.filter((el) => document.contains(el)).map((el, index) => {
                    const rect = el.getBoundingClientRect();
                    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "div",
                      {
                        className: `${styles_module_default4.multiSelectOutline} ${pendingExiting ? styles_module_default4.exit : styles_module_default4.enter}`,
                        style: {
                          left: rect.left,
                          top: rect.top,
                          width: rect.width,
                          height: rect.height
                        }
                      },
                      `pending-multi-${index}`
                    );
                  })
                ) : (
                  // Single element or drag multi-select: show single box
                  pendingAnnotation.targetElement && document.contains(pendingAnnotation.targetElement) ? (
                    // Single-click: use live getBoundingClientRect for consistent positioning
                    (() => {
                      const rect = pendingAnnotation.targetElement.getBoundingClientRect();
                      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                        "div",
                        {
                          className: `${styles_module_default4.singleSelectOutline} ${pendingExiting ? styles_module_default4.exit : styles_module_default4.enter}`,
                          style: {
                            left: rect.left,
                            top: rect.top,
                            width: rect.width,
                            height: rect.height,
                            borderColor: "color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",
                            backgroundColor: "color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"
                          }
                        }
                      );
                    })()
                  ) : (
                    // Drag selection or fallback: use stored boundingBox
                    pendingAnnotation.boundingBox && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "div",
                      {
                        className: `${pendingAnnotation.isMultiSelect ? styles_module_default4.multiSelectOutline : styles_module_default4.singleSelectOutline} ${pendingExiting ? styles_module_default4.exit : styles_module_default4.enter}`,
                        style: {
                          left: pendingAnnotation.boundingBox.x,
                          top: pendingAnnotation.boundingBox.y - scrollY,
                          width: pendingAnnotation.boundingBox.width,
                          height: pendingAnnotation.boundingBox.height,
                          ...pendingAnnotation.isMultiSelect ? {} : {
                            borderColor: "color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",
                            backgroundColor: "color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"
                          }
                        }
                      }
                    )
                  )
                ),
                (() => {
                  const markerX = pendingAnnotation.x;
                  const markerY = pendingAnnotation.isFixed ? pendingAnnotation.y : pendingAnnotation.y - scrollY;
                  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      PendingMarker,
                      {
                        x: markerX,
                        y: markerY,
                        isMultiSelect: pendingAnnotation.isMultiSelect,
                        isExiting: pendingExiting
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      AnnotationPopupCSS,
                      {
                        ref: popupRef,
                        element: pendingAnnotation.element,
                        selectedText: pendingAnnotation.selectedText,
                        computedStyles: pendingAnnotation.computedStylesObj,
                        placeholder: pendingAnnotation.element === "Area selection" ? "What should change in this area?" : pendingAnnotation.isMultiSelect ? "Feedback for this group of elements..." : "What should change?",
                        onSubmit: addAnnotation,
                        onCancel: cancelAnnotation,
                        isExiting: pendingExiting,
                        lightMode: !isDarkMode,
                        accentColor: pendingAnnotation.isMultiSelect ? "var(--agentation-color-green)" : "var(--agentation-color-accent)",
                        style: {
                          // Popup is 280px wide, centered with translateX(-50%), so 140px each side
                          // Clamp so popup stays 20px from viewport edges
                          left: Math.max(
                            160,
                            Math.min(
                              window.innerWidth - 160,
                              markerX / 100 * window.innerWidth
                            )
                          ),
                          // Position popup above or below marker to keep marker visible
                          ...markerY > window.innerHeight - 290 ? { bottom: window.innerHeight - markerY + 20 } : { top: markerY + 20 }
                        }
                      }
                    )
                  ] });
                })()
              ] }),
              editingAnnotation && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                editingAnnotation.elementBoundingBoxes?.length ? (
                  // Cmd+shift+click: show individual element boxes (use live rects when available)
                  (() => {
                    if (editingTargetElements.length > 0) {
                      return editingTargetElements.filter((el) => document.contains(el)).map((el, index) => {
                        const rect = el.getBoundingClientRect();
                        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                          "div",
                          {
                            className: `${styles_module_default4.multiSelectOutline} ${styles_module_default4.enter}`,
                            style: {
                              left: rect.left,
                              top: rect.top,
                              width: rect.width,
                              height: rect.height
                            }
                          },
                          `edit-multi-live-${index}`
                        );
                      });
                    }
                    return editingAnnotation.elementBoundingBoxes.map(
                      (bb, index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                        "div",
                        {
                          className: `${styles_module_default4.multiSelectOutline} ${styles_module_default4.enter}`,
                          style: {
                            left: bb.x,
                            top: bb.y - scrollY,
                            width: bb.width,
                            height: bb.height
                          }
                        },
                        `edit-multi-${index}`
                      )
                    );
                  })()
                ) : (
                  // Single element or drag multi-select: show single box
                  (() => {
                    const rect = editingTargetElement && document.contains(editingTargetElement) ? editingTargetElement.getBoundingClientRect() : null;
                    const bb = rect ? { x: rect.left, y: rect.top, width: rect.width, height: rect.height } : editingAnnotation.boundingBox ? {
                      x: editingAnnotation.boundingBox.x,
                      y: editingAnnotation.isFixed ? editingAnnotation.boundingBox.y : editingAnnotation.boundingBox.y - scrollY,
                      width: editingAnnotation.boundingBox.width,
                      height: editingAnnotation.boundingBox.height
                    } : null;
                    if (!bb) return null;
                    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "div",
                      {
                        className: `${editingAnnotation.isMultiSelect ? styles_module_default4.multiSelectOutline : styles_module_default4.singleSelectOutline} ${styles_module_default4.enter}`,
                        style: {
                          left: bb.x,
                          top: bb.y,
                          width: bb.width,
                          height: bb.height,
                          ...editingAnnotation.isMultiSelect ? {} : {
                            borderColor: "color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",
                            backgroundColor: "color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"
                          }
                        }
                      }
                    );
                  })()
                ),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  AnnotationPopupCSS,
                  {
                    ref: editPopupRef,
                    element: editingAnnotation.element,
                    selectedText: editingAnnotation.selectedText,
                    computedStyles: parseComputedStylesString(
                      editingAnnotation.computedStyles
                    ),
                    placeholder: "Edit your feedback...",
                    initialValue: editingAnnotation.comment,
                    submitLabel: "Save",
                    onSubmit: updateAnnotation2,
                    onCancel: cancelEditAnnotation,
                    onDelete: () => deleteAnnotation2(editingAnnotation.id),
                    isExiting: editExiting,
                    lightMode: !isDarkMode,
                    accentColor: editingAnnotation.isMultiSelect ? "var(--agentation-color-green)" : "var(--agentation-color-accent)",
                    style: (() => {
                      const markerY = editingAnnotation.isFixed ? editingAnnotation.y : editingAnnotation.y - scrollY;
                      return {
                        // Popup is 280px wide, centered with translateX(-50%), so 140px each side
                        // Clamp so popup stays 20px from viewport edges
                        left: Math.max(
                          160,
                          Math.min(
                            window.innerWidth - 160,
                            editingAnnotation.x / 100 * window.innerWidth
                          )
                        ),
                        // Position popup above or below marker to keep marker visible
                        ...markerY > window.innerHeight - 290 ? { bottom: window.innerHeight - markerY + 20 } : { top: markerY + 20 }
                      };
                    })()
                  }
                )
              ] }),
              isDragging && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { ref: dragRectRef, className: styles_module_default4.dragSelection }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "div",
                  {
                    ref: highlightsContainerRef,
                    className: styles_module_default4.highlightsContainer
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      document.body
    );
  }
  var import_react, import_react_dom, import_react2, import_jsx_runtime, import_jsx_runtime2, import_react3, import_react_dom2, import_jsx_runtime3, import_jsx_runtime4, import_react4, import_jsx_runtime5, import_jsx_runtime6, import_react5, import_jsx_runtime7, import_react6, import_jsx_runtime8, import_react7, import_jsx_runtime9, import_jsx_runtime10, import_react8, import_jsx_runtime11, import_jsx_runtime12, import_jsx_runtime13, import_jsx_runtime14, css, classNames, styles_module_default, css2, classNames2, icon_transitions_module_default, IconPlus, IconListSparkle, IconHelp, IconCopyAnimated, IconSendArrow, IconEyeAnimated, IconPausePlayAnimated, IconGear, IconTrashAlt, IconXmark, IconXmarkLarge, IconSun, IconMoon, IconEdit, IconTrash, IconChevronLeft, IconLayout, EXCLUDE_ATTRS, NOT_SELECTORS, STYLE_ID, STATE_KEY, _s, originalSetTimeout, originalSetInterval, originalRequestAnimationFrame, AnnotationPopupCSS, Tooltip, css3, classNames3, styles_module_default2, HelpTooltip, DEFAULT_SIZES, COMPONENT_REGISTRY, COMPONENT_MAP, SKELETON_RENDERERS, css4, classNames4, styles_module_default3, MIN_SIZE, SNAP_THRESHOLD, s, sw, DEFAULT_STYLE_VALUES, TEXT_ELEMENTS, FORM_INPUT_ELEMENTS, MEDIA_ELEMENTS, CONTAINER_ELEMENTS, FORENSIC_PROPERTIES, SECTION_TAGS, SECTION_ROLES, TAG_LABELS, SKIP_TAGS, MIN_SECTION_HEIGHT, SECTION_COLOR, HANDLES, MIN_SIZE2, MIN_CAPTURE_SIZE, SNAP_THRESHOLD2, SKIP_TAGS2, SKIP_TAGS3, GROUP_TOLERANCE, STORAGE_PREFIX, DEFAULT_RETENTION_DAYS, DESIGN_PREFIX, REARRANGE_PREFIX, WIREFRAME_PREFIX, SESSION_PREFIX, TOOLBAR_HIDDEN_SESSION_KEY, FiberTags, DEFAULT_SKIP_EXACT, DEFAULT_SKIP_PATTERNS, DEFAULT_USER_PATTERNS, reactDetectionCache, componentCacheAll, componentCacheAllRef, FIBER_TAGS, sourceProbeCache, css5, classNames5, styles_module_default4, OUTPUT_DETAIL_OPTIONS, css6, classNames6, styles_module_default5, css7, classNames7, styles_module_default6, Switch, css8, classNames8, styles_module_default7, Checkbox, css9, classNames9, styles_module_default8, CheckboxField, css10, classNames10, styles_module_default9, hasPlayedEntranceAnimation, DEFAULT_SETTINGS, isValidUrl, OUTPUT_TO_REACT_MODE, COLOR_OPTIONS, injectAgentationColorTokens;
  var init_dist = __esm({
    "node_modules/agentation/dist/index.mjs"() {
      "use client";
      import_react = __toESM(require_react(), 1);
      import_react_dom = __toESM(require_react_dom(), 1);
      import_react2 = __toESM(require_react(), 1);
      import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
      import_react3 = __toESM(require_react(), 1);
      import_react_dom2 = __toESM(require_react_dom(), 1);
      import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
      import_react4 = __toESM(require_react(), 1);
      import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
      import_react5 = __toESM(require_react(), 1);
      import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
      import_react6 = __toESM(require_react(), 1);
      import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
      import_react7 = __toESM(require_react(), 1);
      import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
      import_react8 = __toESM(require_react(), 1);
      import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
      import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
      css = '.styles-module__popup___IhzrD svg[fill=none] {\n  fill: none !important;\n}\n.styles-module__popup___IhzrD svg[fill=none] :not([fill]) {\n  fill: none !important;\n}\n\n@keyframes styles-module__popupEnter___AuQDN {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) scale(0.95) translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) scale(1) translateY(0);\n  }\n}\n@keyframes styles-module__popupExit___JJKQX {\n  from {\n    opacity: 1;\n    transform: translateX(-50%) scale(1) translateY(0);\n  }\n  to {\n    opacity: 0;\n    transform: translateX(-50%) scale(0.95) translateY(4px);\n  }\n}\n@keyframes styles-module__shake___jdbWe {\n  0%, 100% {\n    transform: translateX(-50%) scale(1) translateY(0) translateX(0);\n  }\n  20% {\n    transform: translateX(-50%) scale(1) translateY(0) translateX(-3px);\n  }\n  40% {\n    transform: translateX(-50%) scale(1) translateY(0) translateX(3px);\n  }\n  60% {\n    transform: translateX(-50%) scale(1) translateY(0) translateX(-2px);\n  }\n  80% {\n    transform: translateX(-50%) scale(1) translateY(0) translateX(2px);\n  }\n}\n.styles-module__popup___IhzrD {\n  position: fixed;\n  transform: translateX(-50%);\n  width: 280px;\n  padding: 0.75rem 1rem 14px;\n  background: #1a1a1a;\n  border-radius: 16px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);\n  z-index: 100001;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  will-change: transform, opacity;\n  opacity: 0;\n}\n.styles-module__popup___IhzrD.styles-module__enter___L7U7N {\n  animation: styles-module__popupEnter___AuQDN 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n}\n.styles-module__popup___IhzrD.styles-module__entered___COX-w {\n  opacity: 1;\n  transform: translateX(-50%) scale(1) translateY(0);\n}\n.styles-module__popup___IhzrD.styles-module__exit___5eGjE {\n  animation: styles-module__popupExit___JJKQX 0.15s ease-in forwards;\n}\n.styles-module__popup___IhzrD.styles-module__entered___COX-w.styles-module__shake___jdbWe {\n  animation: styles-module__shake___jdbWe 0.25s ease-out;\n}\n\n.styles-module__header___wWsSi {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5625rem;\n}\n\n.styles-module__element___fTV2z {\n  font-size: 0.75rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.5);\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  flex: 1;\n}\n\n.styles-module__headerToggle___WpW0b {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  flex: 1;\n  min-width: 0;\n  text-align: left;\n}\n.styles-module__headerToggle___WpW0b .styles-module__element___fTV2z {\n  flex: 1;\n}\n\n.styles-module__chevron___ZZJlR {\n  color: rgba(255, 255, 255, 0.5);\n  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n  flex-shrink: 0;\n}\n.styles-module__chevron___ZZJlR.styles-module__expanded___2Hxgv {\n  transform: rotate(90deg);\n}\n\n.styles-module__stylesWrapper___pnHgy {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.styles-module__stylesWrapper___pnHgy.styles-module__expanded___2Hxgv {\n  grid-template-rows: 1fr;\n}\n\n.styles-module__stylesInner___YYZe2 {\n  overflow: hidden;\n}\n\n.styles-module__stylesBlock___VfQKn {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  margin-bottom: 0.5rem;\n  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;\n  font-size: 0.6875rem;\n  line-height: 1.5;\n}\n\n.styles-module__styleLine___1YQiD {\n  color: rgba(255, 255, 255, 0.85);\n  word-break: break-word;\n}\n\n.styles-module__styleProperty___84L1i {\n  color: #c792ea;\n}\n\n.styles-module__styleValue___q51-h {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n.styles-module__timestamp___Dtpsv {\n  font-size: 0.625rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, 0.35);\n  font-variant-numeric: tabular-nums;\n  margin-left: 0.5rem;\n  flex-shrink: 0;\n}\n\n.styles-module__quote___mcMmQ {\n  font-size: 12px;\n  font-style: italic;\n  color: rgba(255, 255, 255, 0.6);\n  margin-bottom: 0.5rem;\n  padding: 0.4rem 0.5rem;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 0.25rem;\n  line-height: 1.45;\n}\n\n.styles-module__textarea___jrSae {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0.5rem 0.625rem;\n  font-size: 0.8125rem;\n  font-family: inherit;\n  background: rgba(255, 255, 255, 0.05);\n  color: #fff;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 8px;\n  resize: none;\n  outline: none;\n  transition: border-color 0.15s ease;\n}\n.styles-module__textarea___jrSae:focus {\n  border-color: var(--agentation-color-blue);\n}\n.styles-module__textarea___jrSae.styles-module__green___99l3h:focus {\n  border-color: var(--agentation-color-green);\n}\n.styles-module__textarea___jrSae::placeholder {\n  color: rgba(255, 255, 255, 0.35);\n}\n.styles-module__textarea___jrSae::-webkit-scrollbar {\n  width: 6px;\n}\n.styles-module__textarea___jrSae::-webkit-scrollbar-track {\n  background: transparent;\n}\n.styles-module__textarea___jrSae::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 3px;\n}\n\n.styles-module__actions___D6x3f {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.375rem;\n  margin-top: 0.5rem;\n}\n\n.styles-module__cancel___hRjnL,\n.styles-module__submit___K-mIR {\n  padding: 0.4rem 0.875rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  border-radius: 1rem;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;\n}\n\n.styles-module__cancel___hRjnL {\n  background: transparent;\n  color: rgba(255, 255, 255, 0.5);\n}\n.styles-module__cancel___hRjnL:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: rgba(255, 255, 255, 0.8);\n}\n\n.styles-module__submit___K-mIR {\n  color: white;\n}\n.styles-module__submit___K-mIR:hover:not(:disabled) {\n  filter: brightness(0.9);\n}\n.styles-module__submit___K-mIR:disabled {\n  cursor: not-allowed;\n}\n\n.styles-module__deleteWrapper___oSjdo {\n  margin-right: auto;\n}\n\n.styles-module__deleteButton___4VuAE {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.4);\n  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;\n}\n.styles-module__deleteButton___4VuAE:hover {\n  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);\n  color: var(--agentation-color-red);\n}\n.styles-module__deleteButton___4VuAE:active {\n  transform: scale(0.92);\n}\n\n.styles-module__light___6AaSQ.styles-module__popup___IhzrD {\n  background: #fff;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);\n}\n.styles-module__light___6AaSQ .styles-module__element___fTV2z {\n  color: rgba(0, 0, 0, 0.6);\n}\n.styles-module__light___6AaSQ .styles-module__timestamp___Dtpsv {\n  color: rgba(0, 0, 0, 0.4);\n}\n.styles-module__light___6AaSQ .styles-module__chevron___ZZJlR {\n  color: rgba(0, 0, 0, 0.4);\n}\n.styles-module__light___6AaSQ .styles-module__stylesBlock___VfQKn {\n  background: rgba(0, 0, 0, 0.03);\n}\n.styles-module__light___6AaSQ .styles-module__styleLine___1YQiD {\n  color: rgba(0, 0, 0, 0.75);\n}\n.styles-module__light___6AaSQ .styles-module__styleProperty___84L1i {\n  color: #7c3aed;\n}\n.styles-module__light___6AaSQ .styles-module__styleValue___q51-h {\n  color: rgba(0, 0, 0, 0.75);\n}\n.styles-module__light___6AaSQ .styles-module__quote___mcMmQ {\n  color: rgba(0, 0, 0, 0.55);\n  background: rgba(0, 0, 0, 0.04);\n}\n.styles-module__light___6AaSQ .styles-module__textarea___jrSae {\n  background: rgba(0, 0, 0, 0.03);\n  color: #1a1a1a;\n  border-color: rgba(0, 0, 0, 0.12);\n}\n.styles-module__light___6AaSQ .styles-module__textarea___jrSae::placeholder {\n  color: rgba(0, 0, 0, 0.4);\n}\n.styles-module__light___6AaSQ .styles-module__textarea___jrSae::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.15);\n}\n.styles-module__light___6AaSQ .styles-module__cancel___hRjnL {\n  color: rgba(0, 0, 0, 0.5);\n}\n.styles-module__light___6AaSQ .styles-module__cancel___hRjnL:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: rgba(0, 0, 0, 0.75);\n}\n.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE {\n  color: rgba(0, 0, 0, 0.4);\n}\n.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE:hover {\n  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);\n  color: var(--agentation-color-red);\n}';
      classNames = { "popup": "styles-module__popup___IhzrD", "enter": "styles-module__enter___L7U7N", "popupEnter": "styles-module__popupEnter___AuQDN", "entered": "styles-module__entered___COX-w", "exit": "styles-module__exit___5eGjE", "popupExit": "styles-module__popupExit___JJKQX", "shake": "styles-module__shake___jdbWe", "header": "styles-module__header___wWsSi", "element": "styles-module__element___fTV2z", "headerToggle": "styles-module__headerToggle___WpW0b", "chevron": "styles-module__chevron___ZZJlR", "expanded": "styles-module__expanded___2Hxgv", "stylesWrapper": "styles-module__stylesWrapper___pnHgy", "stylesInner": "styles-module__stylesInner___YYZe2", "stylesBlock": "styles-module__stylesBlock___VfQKn", "styleLine": "styles-module__styleLine___1YQiD", "styleProperty": "styles-module__styleProperty___84L1i", "styleValue": "styles-module__styleValue___q51-h", "timestamp": "styles-module__timestamp___Dtpsv", "quote": "styles-module__quote___mcMmQ", "textarea": "styles-module__textarea___jrSae", "green": "styles-module__green___99l3h", "actions": "styles-module__actions___D6x3f", "cancel": "styles-module__cancel___hRjnL", "submit": "styles-module__submit___K-mIR", "deleteWrapper": "styles-module__deleteWrapper___oSjdo", "deleteButton": "styles-module__deleteButton___4VuAE", "light": "styles-module__light___6AaSQ" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-annotation-popup-css-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-annotation-popup-css-styles";
          document.head.appendChild(style);
        }
        style.textContent = css;
      }
      styles_module_default = classNames;
      css2 = ".icon-transitions-module__iconState___uqK9J {\n  transition: opacity 0.2s ease, transform 0.2s ease;\n  transform-origin: center;\n}\n\n.icon-transitions-module__iconStateFast___HxlMm {\n  transition: opacity 0.15s ease, transform 0.15s ease;\n  transform-origin: center;\n}\n\n.icon-transitions-module__iconFade___nPwXg {\n  transition: opacity 0.2s ease;\n}\n\n.icon-transitions-module__iconFadeFast___Ofb2t {\n  transition: opacity 0.15s ease;\n}\n\n.icon-transitions-module__visible___PlHsU {\n  opacity: 1 !important;\n}\n\n.icon-transitions-module__visibleScaled___8Qog- {\n  opacity: 1 !important;\n  transform: scale(1);\n}\n\n.icon-transitions-module__hidden___ETykt {\n  opacity: 0 !important;\n}\n\n.icon-transitions-module__hiddenScaled___JXn-m {\n  opacity: 0 !important;\n  transform: scale(0.8);\n}\n\n.icon-transitions-module__sending___uaLN- {\n  opacity: 0.5 !important;\n  transform: scale(0.8);\n}";
      classNames2 = { "iconState": "icon-transitions-module__iconState___uqK9J", "iconStateFast": "icon-transitions-module__iconStateFast___HxlMm", "iconFade": "icon-transitions-module__iconFade___nPwXg", "iconFadeFast": "icon-transitions-module__iconFadeFast___Ofb2t", "visible": "icon-transitions-module__visible___PlHsU", "visibleScaled": "icon-transitions-module__visibleScaled___8Qog-", "hidden": "icon-transitions-module__hidden___ETykt", "hiddenScaled": "icon-transitions-module__hiddenScaled___JXn-m", "sending": "icon-transitions-module__sending___uaLN-" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-components-icon-transitions");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-components-icon-transitions";
          document.head.appendChild(style);
        }
        style.textContent = css2;
      }
      icon_transitions_module_default = classNames2;
      IconPlus = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M8 3v10M3 8h10",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round"
        }
      ) });
      IconListSparkle = ({
        size = 24,
        style = {}
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: "url(#clip0_list_sparkle)", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M11.5 12L5.5 12",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M18.5 6.75L5.5 6.75",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M9.25 17.25L5.5 17.25",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinejoin: "round"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "clip0_list_sparkle", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "24", height: "24", fill: "white" }) }) })
      ] });
      IconHelp = ({
        size = 20,
        ...props
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          ...props,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "circle",
              {
                cx: "10",
                cy: "10",
                r: "5.375",
                stroke: "currentColor",
                strokeWidth: "1.25"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75",
                stroke: "currentColor",
                strokeWidth: "1.25",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "10", cy: "12.625", r: "0.625", fill: "currentColor" })
          ]
        }
      );
      IconCopyAnimated = ({
        size = 24,
        copied = false,
        tint
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: tint ? { color: tint, transition: "color 0.3s ease" } : void 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "g",
          {
            className: `${icon_transitions_module_default.iconState} ${copied ? icon_transitions_module_default.hiddenScaled : icon_transitions_module_default.visibleScaled}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "path",
                {
                  d: "M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z",
                  stroke: "currentColor",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "path",
                {
                  d: "M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "g",
          {
            className: `${icon_transitions_module_default.iconState} ${copied ? icon_transitions_module_default.visibleScaled : icon_transitions_module_default.hiddenScaled}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "path",
                {
                  d: "M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",
                  stroke: "var(--agentation-color-green)",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "path",
                {
                  d: "M15 10L11 14.25L9.25 12.25",
                  stroke: "var(--agentation-color-green)",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            ]
          }
        )
      ] });
      IconSendArrow = ({
        size = 24,
        state = "idle"
      }) => {
        const showArrow = state === "idle";
        const showCheck = state === "sent";
        const showError = state === "failed";
        const isSending = state === "sending";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "g",
            {
              className: `${icon_transitions_module_default.iconStateFast} ${showArrow ? icon_transitions_module_default.visibleScaled : isSending ? icon_transitions_module_default.sending : icon_transitions_module_default.hiddenScaled}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "path",
                {
                  d: "M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "g",
            {
              className: `${icon_transitions_module_default.iconStateFast} ${showCheck ? icon_transitions_module_default.visibleScaled : icon_transitions_module_default.hiddenScaled}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "path",
                  {
                    d: "M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",
                    stroke: "var(--agentation-color-green)",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "path",
                  {
                    d: "M15 10L11 14.25L9.25 12.25",
                    stroke: "var(--agentation-color-green)",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "g",
            {
              className: `${icon_transitions_module_default.iconStateFast} ${showError ? icon_transitions_module_default.visibleScaled : icon_transitions_module_default.hiddenScaled}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "path",
                  {
                    d: "M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",
                    stroke: "var(--agentation-color-red)",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "path",
                  {
                    d: "M12 8V12",
                    stroke: "var(--agentation-color-red)",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "circle",
                  {
                    cx: "12",
                    cy: "15",
                    r: "0.5",
                    fill: "var(--agentation-color-red)",
                    stroke: "var(--agentation-color-red)",
                    strokeWidth: "1"
                  }
                )
              ]
            }
          )
        ] });
      };
      IconEyeAnimated = ({
        size = 24,
        isOpen = true
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: `${icon_transitions_module_default.iconFade} ${isOpen ? icon_transitions_module_default.visible : icon_transitions_module_default.hidden}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: `${icon_transitions_module_default.iconFade} ${isOpen ? icon_transitions_module_default.hidden : icon_transitions_module_default.visible}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M5 19L19 5",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            }
          )
        ] })
      ] });
      IconPausePlayAnimated = ({
        size = 24,
        isPaused = false
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: `${icon_transitions_module_default.iconFadeFast} ${isPaused ? icon_transitions_module_default.hidden : icon_transitions_module_default.visible}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M8 6L8 18",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M16 18L16 6",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            className: `${icon_transitions_module_default.iconFadeFast} ${isPaused ? icon_transitions_module_default.visible : icon_transitions_module_default.hidden}`,
            d: "M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z",
            stroke: "currentColor",
            strokeWidth: "1.5"
          }
        )
      ] });
      IconGear = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "2.5", stroke: "currentColor", strokeWidth: "1.5" })
      ] });
      IconTrashAlt = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",
          fill: "currentColor"
        }
      ) });
      IconXmark = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: "url(#clip0_2_53)", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M16.25 16.25L7.75 7.75",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M7.75 16.25L16.25 7.75",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "clip0_2_53", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "24", height: "24", fill: "white" }) }) })
      ] });
      IconXmarkLarge = ({ size = 24 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M16.7198 6.21973C17.0127 5.92683 17.4874 5.92683 17.7803 6.21973C18.0732 6.51262 18.0732 6.9874 17.7803 7.28027L13.0606 12L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4875 18.0731 17.0127 18.0731 16.7198 17.7803L12.0001 13.0605L7.28033 17.7803C6.98746 18.0731 6.51268 18.0731 6.21979 17.7803C5.92689 17.4874 5.92689 17.0126 6.21979 16.7197L10.9395 12L6.21979 7.28027C5.92689 6.98738 5.92689 6.51262 6.21979 6.21973C6.51268 5.92683 6.98744 5.92683 7.28033 6.21973L12.0001 10.9395L16.7198 6.21973Z",
          fill: "currentColor"
        }
      ) });
      IconSun = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M10 3.9585V5.05698",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M10 14.9429V16.0414",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M5.7269 5.72656L6.50682 6.50649",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M13.4932 13.4932L14.2731 14.2731",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M3.95834 10H5.05683",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M14.9432 10H16.0417",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M5.7269 14.2731L6.50682 13.4932",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: "M13.4932 6.50649L14.2731 5.72656",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] });
      IconMoon = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z",
          stroke: "currentColor",
          strokeWidth: "1.13793",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ) });
      IconEdit = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375",
              stroke: "currentColor",
              strokeWidth: "0.9",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      );
      IconTrash = ({ size = 24 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4383 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",
              fill: "currentColor"
            }
          )
        }
      );
      IconChevronLeft = ({ size = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "svg",
        {
          width: size,
          height: size,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M8.5 3.5L4 8L8.5 12.5",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      );
      IconLayout = ({ size = 24 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            x: "3",
            y: "3",
            width: "18",
            height: "18",
            rx: "2",
            stroke: "currentColor",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "line",
          {
            x1: "3",
            y1: "9",
            x2: "21",
            y2: "9",
            stroke: "currentColor",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "line",
          {
            x1: "9",
            y1: "9",
            x2: "9",
            y2: "21",
            stroke: "currentColor",
            strokeWidth: "1.5"
          }
        )
      ] });
      EXCLUDE_ATTRS = [
        "data-feedback-toolbar",
        "data-annotation-popup",
        "data-annotation-marker"
      ];
      NOT_SELECTORS = EXCLUDE_ATTRS.flatMap((a) => [`:not([${a}])`, `:not([${a}] *)`]).join("");
      STYLE_ID = "feedback-freeze-styles";
      STATE_KEY = "__agentation_freeze";
      _s = getState();
      if (typeof window !== "undefined" && !_s.installed) {
        _s.origSetTimeout = window.setTimeout.bind(window);
        _s.origSetInterval = window.setInterval.bind(window);
        _s.origRAF = window.requestAnimationFrame.bind(window);
        window.setTimeout = (handler, timeout, ...args) => {
          if (typeof handler === "string") {
            return _s.origSetTimeout(handler, timeout);
          }
          return _s.origSetTimeout(
            (...a) => {
              if (_s.frozen) {
                _s.frozenTimeoutQueue.push(() => handler(...a));
              } else {
                handler(...a);
              }
            },
            timeout,
            ...args
          );
        };
        window.setInterval = (handler, timeout, ...args) => {
          if (typeof handler === "string") {
            return _s.origSetInterval(handler, timeout);
          }
          return _s.origSetInterval(
            (...a) => {
              if (!_s.frozen) handler(...a);
            },
            timeout,
            ...args
          );
        };
        window.requestAnimationFrame = (callback) => {
          return _s.origRAF((timestamp) => {
            if (_s.frozen) {
              _s.frozenRAFQueue.push(callback);
            } else {
              callback(timestamp);
            }
          });
        };
        _s.installed = true;
      }
      originalSetTimeout = _s.origSetTimeout;
      originalSetInterval = _s.origSetInterval;
      originalRequestAnimationFrame = _s.origRAF;
      AnnotationPopupCSS = (0, import_react2.forwardRef)(
        function AnnotationPopupCSS2({
          element,
          timestamp,
          selectedText,
          placeholder = "What should change?",
          initialValue = "",
          submitLabel = "Add",
          onSubmit,
          onCancel,
          onDelete,
          style,
          accentColor = "#3c82f7",
          isExiting = false,
          lightMode = false,
          computedStyles
        }, ref) {
          const [text, setText] = (0, import_react2.useState)(initialValue);
          const [isShaking, setIsShaking] = (0, import_react2.useState)(false);
          const [animState, setAnimState] = (0, import_react2.useState)("initial");
          const [isFocused, setIsFocused] = (0, import_react2.useState)(false);
          const [isStylesExpanded, setIsStylesExpanded] = (0, import_react2.useState)(false);
          const textareaRef = (0, import_react2.useRef)(null);
          const popupRef = (0, import_react2.useRef)(null);
          const cancelTimerRef = (0, import_react2.useRef)(null);
          const shakeTimerRef = (0, import_react2.useRef)(null);
          (0, import_react2.useEffect)(() => {
            if (isExiting && animState !== "exit") {
              setAnimState("exit");
            }
          }, [isExiting, animState]);
          (0, import_react2.useEffect)(() => {
            originalSetTimeout(() => {
              setAnimState("enter");
            }, 0);
            const enterTimer = originalSetTimeout(() => {
              setAnimState("entered");
            }, 200);
            const focusTimer = originalSetTimeout(() => {
              const textarea = textareaRef.current;
              if (textarea) {
                focusBypassingTraps(textarea);
                textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
                textarea.scrollTop = textarea.scrollHeight;
              }
            }, 50);
            return () => {
              clearTimeout(enterTimer);
              clearTimeout(focusTimer);
              if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
              if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
            };
          }, []);
          const shake = (0, import_react2.useCallback)(() => {
            if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
            setIsShaking(true);
            shakeTimerRef.current = originalSetTimeout(() => {
              setIsShaking(false);
              focusBypassingTraps(textareaRef.current);
            }, 250);
          }, []);
          (0, import_react2.useImperativeHandle)(ref, () => ({
            shake
          }), [shake]);
          const handleCancel = (0, import_react2.useCallback)(() => {
            setAnimState("exit");
            cancelTimerRef.current = originalSetTimeout(() => {
              onCancel();
            }, 150);
          }, [onCancel]);
          const handleSubmit = (0, import_react2.useCallback)(() => {
            if (!text.trim()) return;
            onSubmit(text.trim());
          }, [text, onSubmit]);
          const handleKeyDown = (0, import_react2.useCallback)(
            (e) => {
              e.stopPropagation();
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
              if (e.key === "Escape") {
                handleCancel();
              }
            },
            [handleSubmit, handleCancel]
          );
          const popupClassName = [
            styles_module_default.popup,
            lightMode ? styles_module_default.light : "",
            animState === "enter" ? styles_module_default.enter : "",
            animState === "entered" ? styles_module_default.entered : "",
            animState === "exit" ? styles_module_default.exit : "",
            isShaking ? styles_module_default.shake : ""
          ].filter(Boolean).join(" ");
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              ref: popupRef,
              className: popupClassName,
              "data-annotation-popup": true,
              style,
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: styles_module_default.header, children: [
                  computedStyles && Object.keys(computedStyles).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                    "button",
                    {
                      className: styles_module_default.headerToggle,
                      onClick: () => {
                        const wasExpanded = isStylesExpanded;
                        setIsStylesExpanded(!isStylesExpanded);
                        if (wasExpanded) {
                          originalSetTimeout(() => focusBypassingTraps(textareaRef.current), 0);
                        }
                      },
                      type: "button",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          "svg",
                          {
                            className: `${styles_module_default.chevron} ${isStylesExpanded ? styles_module_default.expanded : ""}`,
                            width: "14",
                            height: "14",
                            viewBox: "0 0 14 14",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                              "path",
                              {
                                d: "M5.5 10.25L9 7.25L5.75 4",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: styles_module_default.element, children: element })
                      ]
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: styles_module_default.element, children: element }),
                  timestamp && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: styles_module_default.timestamp, children: timestamp })
                ] }),
                computedStyles && Object.keys(computedStyles).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `${styles_module_default.stylesWrapper} ${isStylesExpanded ? styles_module_default.expanded : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: styles_module_default.stylesInner, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: styles_module_default.stylesBlock, children: Object.entries(computedStyles).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: styles_module_default.styleLine, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: styles_module_default.styleProperty, children: key.replace(/([A-Z])/g, "-$1").toLowerCase() }),
                  ": ",
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: styles_module_default.styleValue, children: value }),
                  ";"
                ] }, key)) }) }) }),
                selectedText && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: styles_module_default.quote, children: [
                  "\u201C",
                  selectedText.slice(0, 80),
                  selectedText.length > 80 ? "..." : "",
                  "\u201D"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "textarea",
                  {
                    ref: textareaRef,
                    className: styles_module_default.textarea,
                    style: { borderColor: isFocused ? accentColor : void 0 },
                    placeholder,
                    value: text,
                    onChange: (e) => setText(e.target.value),
                    onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocused(false),
                    rows: 2,
                    onKeyDown: handleKeyDown
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: styles_module_default.actions, children: [
                  onDelete && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: styles_module_default.deleteWrapper, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: styles_module_default.deleteButton, onClick: onDelete, type: "button", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconTrash, { size: 22 }) }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: styles_module_default.cancel, onClick: handleCancel, children: "Cancel" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "button",
                    {
                      className: styles_module_default.submit,
                      style: {
                        backgroundColor: accentColor,
                        opacity: text.trim() ? 1 : 0.4
                      },
                      onClick: handleSubmit,
                      disabled: !text.trim(),
                      children: submitLabel
                    }
                  )
                ] })
              ]
            }
          );
        }
      );
      Tooltip = ({
        content,
        children,
        ...props
      }) => {
        const [visible, setVisible] = (0, import_react3.useState)(false);
        const [shouldRender, setShouldRender] = (0, import_react3.useState)(false);
        const [position, setPosition] = (0, import_react3.useState)({ top: 0, right: 0 });
        const triggerRef = (0, import_react3.useRef)(null);
        const timeoutRef = (0, import_react3.useRef)(null);
        const exitTimeoutRef = (0, import_react3.useRef)(null);
        const updatePosition = () => {
          if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
              top: rect.top + rect.height / 2,
              right: window.innerWidth - rect.left + 8
            });
          }
        };
        const handleMouseEnter = () => {
          setShouldRender(true);
          if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
          }
          updatePosition();
          timeoutRef.current = originalSetTimeout(() => {
            setVisible(true);
          }, 500);
        };
        const handleMouseLeave = () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setVisible(false);
          exitTimeoutRef.current = originalSetTimeout(() => {
            setShouldRender(false);
          }, 150);
        };
        (0, import_react3.useEffect)(() => {
          return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
          };
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "span",
            {
              ref: triggerRef,
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              ...props,
              children
            }
          ),
          shouldRender && (0, import_react_dom2.createPortal)(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                "data-feedback-toolbar": true,
                style: {
                  position: "fixed",
                  top: position.top,
                  right: position.right,
                  transform: "translateY(-50%)",
                  padding: "6px 10px",
                  background: "#383838",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "14px",
                  borderRadius: "10px",
                  width: "180px",
                  textAlign: "left",
                  zIndex: 100020,
                  pointerEvents: "none",
                  boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.28)",
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.15s ease"
                },
                children: content
              }
            ),
            document.body
          )
        ] });
      };
      css3 = ".styles-module__tooltip___mcXL2 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: help;\n}\n\n.styles-module__tooltipIcon___Nq2nD {\n  transform: translateY(0.5px);\n  color: #fff;\n  opacity: 0.2;\n  transition: opacity 0.15s ease;\n  will-change: transform;\n}\n.styles-module__tooltip___mcXL2:hover .styles-module__tooltipIcon___Nq2nD {\n  opacity: 0.5;\n}\n[data-agentation-theme=light] .styles-module__tooltipIcon___Nq2nD {\n  color: #000;\n}";
      classNames3 = { "tooltip": "styles-module__tooltip___mcXL2", "tooltipIcon": "styles-module__tooltipIcon___Nq2nD" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-help-tooltip-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-help-tooltip-styles";
          document.head.appendChild(style);
        }
        style.textContent = css3;
      }
      styles_module_default2 = classNames3;
      HelpTooltip = ({ content }) => {
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Tooltip, { className: styles_module_default2.tooltip, content, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconHelp, { className: styles_module_default2.tooltipIcon }) });
      };
      DEFAULT_SIZES = {
        navigation: { width: 800, height: 56 },
        hero: { width: 800, height: 320 },
        header: { width: 800, height: 80 },
        section: { width: 800, height: 400 },
        sidebar: { width: 240, height: 400 },
        footer: { width: 800, height: 160 },
        modal: { width: 480, height: 300 },
        card: { width: 280, height: 240 },
        text: { width: 400, height: 120 },
        image: { width: 320, height: 200 },
        video: { width: 480, height: 270 },
        table: { width: 560, height: 220 },
        grid: { width: 600, height: 300 },
        list: { width: 300, height: 180 },
        chart: { width: 400, height: 240 },
        button: { width: 140, height: 40 },
        input: { width: 280, height: 56 },
        form: { width: 360, height: 320 },
        tabs: { width: 480, height: 240 },
        dropdown: { width: 200, height: 200 },
        toggle: { width: 44, height: 24 },
        search: { width: 320, height: 44 },
        avatar: { width: 48, height: 48 },
        badge: { width: 80, height: 28 },
        breadcrumb: { width: 300, height: 24 },
        pagination: { width: 300, height: 36 },
        progress: { width: 240, height: 8 },
        divider: { width: 600, height: 1 },
        accordion: { width: 400, height: 200 },
        carousel: { width: 600, height: 300 },
        toast: { width: 320, height: 64 },
        tooltip: { width: 180, height: 40 },
        pricing: { width: 300, height: 360 },
        testimonial: { width: 360, height: 200 },
        cta: { width: 600, height: 160 },
        alert: { width: 400, height: 56 },
        banner: { width: 800, height: 48 },
        stat: { width: 200, height: 120 },
        stepper: { width: 480, height: 48 },
        tag: { width: 72, height: 28 },
        rating: { width: 160, height: 28 },
        map: { width: 480, height: 300 },
        timeline: { width: 360, height: 320 },
        fileUpload: { width: 360, height: 180 },
        codeBlock: { width: 480, height: 200 },
        calendar: { width: 300, height: 300 },
        notification: { width: 360, height: 72 },
        productCard: { width: 280, height: 360 },
        profile: { width: 280, height: 200 },
        drawer: { width: 320, height: 400 },
        popover: { width: 240, height: 160 },
        logo: { width: 120, height: 40 },
        faq: { width: 560, height: 320 },
        gallery: { width: 560, height: 360 },
        checkbox: { width: 20, height: 20 },
        radio: { width: 20, height: 20 },
        slider: { width: 240, height: 32 },
        datePicker: { width: 300, height: 320 },
        skeleton: { width: 320, height: 120 },
        chip: { width: 96, height: 32 },
        icon: { width: 24, height: 24 },
        spinner: { width: 32, height: 32 },
        feature: { width: 360, height: 200 },
        team: { width: 560, height: 280 },
        login: { width: 360, height: 360 },
        contact: { width: 400, height: 320 }
      };
      COMPONENT_REGISTRY = [
        {
          section: "Layout",
          items: [
            { type: "navigation", label: "Navigation", ...DEFAULT_SIZES.navigation },
            { type: "header", label: "Header", ...DEFAULT_SIZES.header },
            { type: "hero", label: "Hero", ...DEFAULT_SIZES.hero },
            { type: "section", label: "Section", ...DEFAULT_SIZES.section },
            { type: "sidebar", label: "Sidebar", ...DEFAULT_SIZES.sidebar },
            { type: "footer", label: "Footer", ...DEFAULT_SIZES.footer },
            { type: "modal", label: "Modal", ...DEFAULT_SIZES.modal },
            { type: "banner", label: "Banner", ...DEFAULT_SIZES.banner },
            { type: "drawer", label: "Drawer", ...DEFAULT_SIZES.drawer },
            { type: "popover", label: "Popover", ...DEFAULT_SIZES.popover },
            { type: "divider", label: "Divider", ...DEFAULT_SIZES.divider }
          ]
        },
        {
          section: "Content",
          items: [
            { type: "card", label: "Card", ...DEFAULT_SIZES.card },
            { type: "text", label: "Text", ...DEFAULT_SIZES.text },
            { type: "image", label: "Image", ...DEFAULT_SIZES.image },
            { type: "video", label: "Video", ...DEFAULT_SIZES.video },
            { type: "table", label: "Table", ...DEFAULT_SIZES.table },
            { type: "grid", label: "Grid", ...DEFAULT_SIZES.grid },
            { type: "list", label: "List", ...DEFAULT_SIZES.list },
            { type: "chart", label: "Chart", ...DEFAULT_SIZES.chart },
            { type: "codeBlock", label: "Code Block", ...DEFAULT_SIZES.codeBlock },
            { type: "map", label: "Map", ...DEFAULT_SIZES.map },
            { type: "timeline", label: "Timeline", ...DEFAULT_SIZES.timeline },
            { type: "calendar", label: "Calendar", ...DEFAULT_SIZES.calendar },
            { type: "accordion", label: "Accordion", ...DEFAULT_SIZES.accordion },
            { type: "carousel", label: "Carousel", ...DEFAULT_SIZES.carousel },
            { type: "logo", label: "Logo", ...DEFAULT_SIZES.logo },
            { type: "faq", label: "FAQ", ...DEFAULT_SIZES.faq },
            { type: "gallery", label: "Gallery", ...DEFAULT_SIZES.gallery }
          ]
        },
        {
          section: "Controls",
          items: [
            { type: "button", label: "Button", ...DEFAULT_SIZES.button },
            { type: "input", label: "Input", ...DEFAULT_SIZES.input },
            { type: "search", label: "Search", ...DEFAULT_SIZES.search },
            { type: "form", label: "Form", ...DEFAULT_SIZES.form },
            { type: "tabs", label: "Tabs", ...DEFAULT_SIZES.tabs },
            { type: "dropdown", label: "Dropdown", ...DEFAULT_SIZES.dropdown },
            { type: "toggle", label: "Toggle", ...DEFAULT_SIZES.toggle },
            { type: "stepper", label: "Stepper", ...DEFAULT_SIZES.stepper },
            { type: "rating", label: "Rating", ...DEFAULT_SIZES.rating },
            { type: "fileUpload", label: "File Upload", ...DEFAULT_SIZES.fileUpload },
            { type: "checkbox", label: "Checkbox", ...DEFAULT_SIZES.checkbox },
            { type: "radio", label: "Radio", ...DEFAULT_SIZES.radio },
            { type: "slider", label: "Slider", ...DEFAULT_SIZES.slider },
            { type: "datePicker", label: "Date Picker", ...DEFAULT_SIZES.datePicker }
          ]
        },
        {
          section: "Elements",
          items: [
            { type: "avatar", label: "Avatar", ...DEFAULT_SIZES.avatar },
            { type: "badge", label: "Badge", ...DEFAULT_SIZES.badge },
            { type: "tag", label: "Tag", ...DEFAULT_SIZES.tag },
            { type: "breadcrumb", label: "Breadcrumb", ...DEFAULT_SIZES.breadcrumb },
            { type: "pagination", label: "Pagination", ...DEFAULT_SIZES.pagination },
            { type: "progress", label: "Progress", ...DEFAULT_SIZES.progress },
            { type: "alert", label: "Alert", ...DEFAULT_SIZES.alert },
            { type: "toast", label: "Toast", ...DEFAULT_SIZES.toast },
            { type: "notification", label: "Notification", ...DEFAULT_SIZES.notification },
            { type: "tooltip", label: "Tooltip", ...DEFAULT_SIZES.tooltip },
            { type: "stat", label: "Stat", ...DEFAULT_SIZES.stat },
            { type: "skeleton", label: "Skeleton", ...DEFAULT_SIZES.skeleton },
            { type: "chip", label: "Chip", ...DEFAULT_SIZES.chip },
            { type: "icon", label: "Icon", ...DEFAULT_SIZES.icon },
            { type: "spinner", label: "Spinner", ...DEFAULT_SIZES.spinner }
          ]
        },
        {
          section: "Blocks",
          items: [
            { type: "pricing", label: "Pricing", ...DEFAULT_SIZES.pricing },
            { type: "testimonial", label: "Testimonial", ...DEFAULT_SIZES.testimonial },
            { type: "cta", label: "CTA", ...DEFAULT_SIZES.cta },
            { type: "productCard", label: "Product Card", ...DEFAULT_SIZES.productCard },
            { type: "profile", label: "Profile", ...DEFAULT_SIZES.profile },
            { type: "feature", label: "Feature", ...DEFAULT_SIZES.feature },
            { type: "team", label: "Team", ...DEFAULT_SIZES.team },
            { type: "login", label: "Login", ...DEFAULT_SIZES.login },
            { type: "contact", label: "Contact", ...DEFAULT_SIZES.contact }
          ]
        }
      ];
      COMPONENT_MAP = {};
      for (const section of COMPONENT_REGISTRY) {
        for (const item of section.items) {
          COMPONENT_MAP[item.type] = item;
        }
      }
      SKELETON_RENDERERS = {
        navigation: NavigationSkeleton,
        hero: HeroSkeleton,
        sidebar: SidebarSkeleton,
        footer: FooterSkeleton,
        modal: ModalSkeleton,
        card: CardSkeleton,
        text: TextSkeleton,
        image: ImageSkeleton,
        table: TableSkeleton,
        list: ListSkeleton,
        button: ButtonSkeleton,
        input: InputSkeleton,
        form: FormSkeleton,
        tabs: TabsSkeleton,
        avatar: AvatarSkeleton,
        badge: BadgeSkeleton,
        header: HeaderSkeleton,
        section: SectionSkeleton,
        grid: GridSkeleton,
        dropdown: DropdownSkeleton,
        toggle: ToggleSkeleton,
        search: SearchSkeleton,
        toast: ToastSkeleton,
        progress: ProgressSkeleton,
        chart: ChartSkeleton,
        video: VideoSkeleton,
        tooltip: TooltipSkeleton,
        breadcrumb: BreadcrumbSkeleton,
        pagination: PaginationSkeleton,
        divider: DividerSkeleton,
        accordion: AccordionSkeleton,
        carousel: CarouselSkeleton,
        pricing: PricingSkeleton,
        testimonial: TestimonialSkeleton,
        cta: CtaSkeleton,
        alert: AlertSkeleton,
        banner: BannerSkeleton,
        stat: StatSkeleton,
        stepper: StepperSkeleton,
        tag: TagSkeleton,
        rating: RatingSkeleton,
        map: MapSkeleton,
        timeline: TimelineSkeleton,
        fileUpload: FileUploadSkeleton,
        codeBlock: CodeBlockSkeleton,
        calendar: CalendarSkeleton,
        notification: NotificationSkeleton,
        productCard: ProductCardSkeleton,
        profile: ProfileSkeleton,
        drawer: DrawerSkeleton,
        popover: PopoverSkeleton,
        logo: LogoSkeleton,
        faq: FaqSkeleton,
        gallery: GallerySkeleton,
        checkbox: CheckboxSkeleton,
        radio: RadioSkeleton,
        slider: SliderSkeleton,
        datePicker: DatePickerSkeleton,
        skeleton: SkeletonSkeletonRenderer,
        chip: ChipSkeleton,
        icon: IconSkeleton,
        spinner: SpinnerSkeleton,
        feature: FeatureSkeleton,
        team: TeamSkeleton,
        login: LoginSkeleton,
        contact: ContactSkeleton
      };
      css4 = 'svg[fill=none] {\n  fill: none !important;\n}\n\n.styles-module__overlayExiting___iEmYr {\n  opacity: 0 !important;\n  transition: opacity 0.25s ease !important;\n  pointer-events: none !important;\n}\n\n.styles-module__overlay___aWh-q {\n  position: fixed;\n  inset: 0;\n  z-index: 99995;\n  pointer-events: auto;\n  cursor: default;\n  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;\n  --agd-stroke: rgba(59, 130, 246, 0.35);\n  --agd-fill: rgba(59, 130, 246, 0.06);\n  --agd-bar: rgba(59, 130, 246, 0.18);\n  --agd-bar-strong: rgba(59, 130, 246, 0.28);\n  --agd-text-3: rgba(255, 255, 255, 0.6);\n  --agd-surface: #fff;\n}\n.styles-module__overlay___aWh-q.styles-module__light___ORIft {\n  --agd-surface: #fff;\n}\n.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) {\n  --agd-surface: #141414;\n}\n.styles-module__overlay___aWh-q.styles-module__wireframe___itvQU {\n  --agd-stroke: rgba(249, 115, 22, 0.35);\n  --agd-fill: rgba(249, 115, 22, 0.06);\n  --agd-bar: rgba(249, 115, 22, 0.18);\n  --agd-bar-strong: rgba(249, 115, 22, 0.28);\n}\n.styles-module__overlay___aWh-q.styles-module__placing___45yD8 {\n  cursor: crosshair;\n}\n.styles-module__overlay___aWh-q.styles-module__passthrough___xaFeE {\n  pointer-events: none;\n}\n\n.styles-module__blankCanvas___t2Eue {\n  position: fixed;\n  inset: 0;\n  z-index: 99994;\n  background: #fff;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.25s ease;\n}\n.styles-module__blankCanvas___t2Eue.styles-module__visible___OKKqX {\n  opacity: var(--canvas-opacity, 1);\n  pointer-events: auto;\n}\n.styles-module__blankCanvas___t2Eue::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);\n  background-size: 24px 24px;\n  background-position: 12px 12px;\n  pointer-events: none;\n  transition: opacity 0.2s ease;\n}\n.styles-module__blankCanvas___t2Eue.styles-module__gridActive___OZ-cf::after {\n  opacity: 1;\n  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.22) 1px, transparent 1px);\n}\n\n.styles-module__paletteHeader___-Q5gQ {\n  padding: 0 1rem 0.375rem;\n}\n\n.styles-module__paletteHeaderTitle___oHqZC {\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: #fff;\n  letter-spacing: -0.0094em;\n}\n.styles-module__light___ORIft .styles-module__paletteHeaderTitle___oHqZC {\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.styles-module__paletteHeaderDesc___6i74T {\n  font-size: 0.6875rem;\n  font-weight: 300;\n  color: rgba(255, 255, 255, 0.45);\n  margin-top: 2px;\n  line-height: 14px;\n}\n.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T {\n  color: rgba(0, 0, 0, 0.45);\n}\n.styles-module__paletteHeaderDesc___6i74T a {\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: underline dotted;\n  text-decoration-color: rgba(255, 255, 255, 0.2);\n  text-underline-offset: 2px;\n  transition: color 0.15s ease;\n}\n.styles-module__paletteHeaderDesc___6i74T a:hover {\n  color: #fff;\n}\n.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a {\n  color: rgba(0, 0, 0, 0.6);\n  text-decoration-color: rgba(0, 0, 0, 0.2);\n}\n.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a:hover {\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.styles-module__wireframePurposeWrap___To-tS {\n  display: grid;\n  grid-template-rows: 1fr;\n  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;\n  opacity: 1;\n}\n.styles-module__wireframePurposeWrap___To-tS.styles-module__collapsed___Ms9vS {\n  grid-template-rows: 0fr;\n  opacity: 0;\n}\n\n.styles-module__wireframePurposeInner___Lrahs {\n  overflow: hidden;\n}\n\n.styles-module__wireframePurposeInput___7EtBN {\n  display: block;\n  width: calc(100% - 2rem);\n  margin: 0.25rem 1rem 0.375rem;\n  padding: 0.375rem 0.5rem;\n  font-size: 0.8125rem;\n  font-family: inherit;\n  color: rgba(255, 255, 255, 0.85);\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 0.375rem;\n  resize: none;\n  outline: none;\n  transition: border-color 0.15s ease;\n  letter-spacing: -0.0094em;\n}\n.styles-module__wireframePurposeInput___7EtBN::placeholder {\n  color: rgba(255, 255, 255, 0.3);\n}\n.styles-module__wireframePurposeInput___7EtBN:focus {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgba(255, 255, 255, 0.05);\n}\n.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN {\n  color: rgba(0, 0, 0, 0.7);\n  background: rgba(0, 0, 0, 0.03);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN::placeholder {\n  color: rgba(0, 0, 0, 0.3);\n}\n.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN:focus {\n  border-color: rgba(0, 0, 0, 0.25);\n  background: rgba(0, 0, 0, 0.05);\n}\n\n.styles-module__canvasToggle___-QqSy {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  margin: 0.25rem 1rem 0.25rem;\n  padding: 0.375rem 0.5rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  border: 1px dashed rgba(255, 255, 255, 0.1);\n  background: transparent;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\n.styles-module__canvasToggle___-QqSy:hover {\n  background: rgba(255, 255, 255, 0.04);\n  border-color: rgba(255, 255, 255, 0.15);\n}\n.styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {\n  background: #f97316;\n  border-color: transparent;\n  border-style: solid;\n  box-shadow: none;\n}\n.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy {\n  border-color: rgba(0, 0, 0, 0.08);\n}\n.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy:hover {\n  background: rgba(0, 0, 0, 0.02);\n  border-color: rgba(0, 0, 0, 0.12);\n}\n.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {\n  background: #f97316;\n  border-color: transparent;\n  border-style: solid;\n  box-shadow: none;\n}\n\n.styles-module__canvasToggleIcon___7pJ82 {\n  width: 14px;\n  height: 14px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.35);\n}\n.styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {\n  color: rgba(255, 255, 255, 0.85);\n}\n.styles-module__light___ORIft .styles-module__canvasToggleIcon___7pJ82 {\n  color: rgba(0, 0, 0, 0.25);\n}\n.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n.styles-module__canvasToggleLabel___OanpY {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.6);\n  letter-spacing: -0.0094em;\n}\n.styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {\n  color: #fff;\n}\n.styles-module__light___ORIft .styles-module__canvasToggleLabel___OanpY {\n  color: rgba(0, 0, 0, 0.5);\n}\n.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {\n  color: #fff;\n}\n\n.styles-module__canvasPurposeWrap___hj6zk {\n  display: grid;\n  grid-template-rows: 1fr;\n  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;\n  opacity: 1;\n}\n.styles-module__canvasPurposeWrap___hj6zk.styles-module__collapsed___Ms9vS {\n  grid-template-rows: 0fr;\n  opacity: 0;\n}\n\n.styles-module__canvasPurposeInner___VWiyu {\n  overflow: hidden;\n}\n\n.styles-module__canvasPurposeToggle___byDH2 {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  margin: 0.375rem 1rem 0.375rem 1.1875rem;\n}\n.styles-module__canvasPurposeToggle___byDH2 input[type=checkbox] {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.styles-module__canvasPurposeCheck___xqd7l {\n  position: relative;\n  width: 14px;\n  height: 14px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  background: rgba(255, 255, 255, 0.05);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.25s ease, border-color 0.25s ease;\n}\n.styles-module__canvasPurposeCheck___xqd7l svg {\n  color: #1a1a1a;\n  opacity: 1;\n  transition: opacity 0.15s ease;\n}\n.styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgb(255, 255, 255);\n}\n.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  background: #fff;\n}\n.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH {\n  border-color: #1a1a1a;\n  background: #1a1a1a;\n}\n.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH svg {\n  color: #fff;\n}\n\n.styles-module__canvasPurposeLabel___Zu-tD {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.5);\n  letter-spacing: -0.0094em;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.styles-module__light___ORIft .styles-module__canvasPurposeLabel___Zu-tD {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__canvasPurposeHelp___jijwR {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: help;\n}\n.styles-module__canvasPurposeHelp___jijwR svg {\n  color: rgba(255, 255, 255, 0.2);\n  transform: translateY(2px);\n  transition: color 0.15s ease;\n}\n.styles-module__canvasPurposeHelp___jijwR:hover svg {\n  color: rgba(255, 255, 255, 0.5);\n}\n.styles-module__light___ORIft .styles-module__canvasPurposeHelp___jijwR svg {\n  color: rgba(0, 0, 0, 0.2);\n}\n.styles-module__light___ORIft .styles-module__canvasPurposeHelp___jijwR:hover svg {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__placement___zcxv8 {\n  position: absolute;\n  border: 1.5px dashed rgba(59, 130, 246, 0.4);\n  border-radius: 6px;\n  background: rgba(59, 130, 246, 0.08);\n  cursor: grab;\n  transition: box-shadow 0.15s, border-color 0.15s, opacity 0.15s ease, transform 0.15s ease;\n  user-select: none;\n  pointer-events: auto;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n  animation: styles-module__placementEnter___TdRhf 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);\n}\n.styles-module__placement___zcxv8:active {\n  cursor: grabbing;\n}\n.styles-module__placement___zcxv8:hover {\n  border-color: rgba(59, 130, 246, 0.5);\n  background: rgba(59, 130, 246, 0.1);\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.12);\n}\n.styles-module__placement___zcxv8.styles-module__selected___6yrp6 {\n  border-color: #3c82f7;\n  border-style: solid;\n  background: rgba(59, 130, 246, 0.1);\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.styles-module__wireframe___itvQU .styles-module__placement___zcxv8 {\n  border-color: rgba(249, 115, 22, 0.4);\n  background: rgba(249, 115, 22, 0.08);\n}\n.styles-module__wireframe___itvQU .styles-module__placement___zcxv8:hover {\n  border-color: rgba(249, 115, 22, 0.5);\n  background: rgba(249, 115, 22, 0.1);\n  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.12);\n}\n.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6 {\n  border-color: #f97316;\n  background: rgba(249, 115, 22, 0.1);\n  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);\n}\n.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {\n  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);\n}\n.styles-module__placement___zcxv8.styles-module__dragging___le6KZ {\n  opacity: 0.85;\n  z-index: 50;\n}\n.styles-module__placement___zcxv8.styles-module__exiting___YrM8F {\n  opacity: 0;\n  transform: scale(0.97);\n  pointer-events: none;\n  animation: none;\n  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);\n}\n\n.styles-module__placementContent___f64A4 {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.styles-module__placementLabel___0KvWl {\n  position: absolute;\n  top: -18px;\n  left: 0;\n  font-size: 10px;\n  font-weight: 600;\n  color: rgba(59, 130, 246, 0.7);\n  white-space: nowrap;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.5);\n}\n.styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {\n  color: #3c82f7;\n}\n.styles-module__wireframe___itvQU .styles-module__placementLabel___0KvWl {\n  color: rgba(249, 115, 22, 0.7);\n}\n.styles-module__wireframe___itvQU .styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {\n  color: #f97316;\n}\n\n.styles-module__placementAnnotation___78pTr {\n  position: absolute;\n  bottom: -18px;\n  left: 0;\n  right: 0;\n  font-weight: 450;\n  color: rgba(0, 0, 0, 0.5);\n  font-size: 10px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);\n  opacity: 0;\n  transform: translateY(-2px);\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.styles-module__placementAnnotation___78pTr.styles-module__annotationVisible___mrUyA {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.styles-module__sectionAnnotation___aUIs0 {\n  position: absolute;\n  bottom: -18px;\n  left: 0;\n  right: 0;\n  font-weight: 450;\n  color: rgba(59, 130, 246, 0.6);\n  font-size: 10px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);\n  opacity: 0;\n  transform: translateY(-2px);\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.styles-module__sectionAnnotation___aUIs0.styles-module__annotationVisible___mrUyA {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.styles-module__handle___Ikbxm {\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: #fff;\n  border: 1.5px solid #3c82f7;\n  border-radius: 2px;\n  z-index: 12;\n  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.12);\n  opacity: 0;\n  transform: scale(0.3);\n  pointer-events: none;\n  will-change: opacity, transform;\n  transition: opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.styles-module__placement___zcxv8:hover .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:hover .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:hover .styles-module__handle___Ikbxm, .styles-module__placement___zcxv8:active .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:active .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:active .styles-module__handle___Ikbxm, .styles-module__selected___6yrp6 .styles-module__handle___Ikbxm {\n  opacity: 1;\n  transform: scale(1);\n  pointer-events: auto;\n}\n.styles-module__sectionOutline___s0hy- .styles-module__handle___Ikbxm {\n  border-color: inherit;\n}\n.styles-module__wireframe___itvQU .styles-module__handle___Ikbxm {\n  border-color: #f97316;\n}\n\n.styles-module__handleNw___4TMIj {\n  top: -4px;\n  left: -4px;\n  cursor: nw-resize;\n}\n\n.styles-module__handleNe___mnsTh {\n  top: -4px;\n  right: -4px;\n  cursor: ne-resize;\n}\n\n.styles-module__handleSe___oSFnk {\n  bottom: -4px;\n  right: -4px;\n  cursor: se-resize;\n}\n\n.styles-module__handleSw___pi--Z {\n  bottom: -4px;\n  left: -4px;\n  cursor: sw-resize;\n}\n\n.styles-module__handleN___aBA-Q, .styles-module__handleE___0hM5u, .styles-module__handleS___JjDRv, .styles-module__handleW___ERWGQ {\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n.styles-module__edgeHandle___XxXdT {\n  position: absolute;\n  z-index: 11;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.styles-module__edgeHandle___XxXdT::after {\n  content: "";\n  position: absolute;\n  border-radius: 4px;\n  background: #3c82f7;\n}\n.styles-module__wireframe___itvQU .styles-module__edgeHandle___XxXdT::after {\n  background: #f97316;\n}\n.styles-module__edgeHandle___XxXdT::after {\n  opacity: 0;\n  transition: opacity 0.1s ease, transform 0.1s ease;\n  transform: scale(0.8);\n}\n.styles-module__edgeHandle___XxXdT:hover::after {\n  opacity: 0.85;\n  transform: scale(1);\n}\n.styles-module__edgeHandle___XxXdT svg {\n  position: relative;\n  z-index: 1;\n  opacity: 0;\n  transition: opacity 0.1s ease;\n  filter: drop-shadow(0 0 2px var(--agd-surface));\n}\n.styles-module__edgeHandle___XxXdT:hover svg {\n  opacity: 1;\n}\n\n.styles-module__edgeN___-JJDj, .styles-module__edgeS___66lMX {\n  left: 12px;\n  right: 12px;\n  height: 12px;\n  cursor: n-resize;\n}\n.styles-module__edgeN___-JJDj::after, .styles-module__edgeS___66lMX::after {\n  width: 24px;\n  height: 4px;\n}\n\n.styles-module__edgeN___-JJDj {\n  top: -6px;\n}\n\n.styles-module__edgeS___66lMX {\n  bottom: -6px;\n  cursor: s-resize;\n}\n\n.styles-module__edgeE___1bGDa, .styles-module__edgeW___lHQNo {\n  top: 12px;\n  bottom: 12px;\n  width: 12px;\n  cursor: e-resize;\n}\n.styles-module__edgeE___1bGDa::after, .styles-module__edgeW___lHQNo::after {\n  width: 4px;\n  height: 24px;\n}\n\n.styles-module__edgeE___1bGDa {\n  right: -6px;\n}\n\n.styles-module__edgeW___lHQNo {\n  left: -6px;\n  cursor: w-resize;\n}\n\n.styles-module__deleteButton___LkGCb {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  color: rgba(0, 0, 0, 0.35);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  line-height: 1;\n  z-index: 15;\n  pointer-events: none;\n  opacity: 0;\n  transform: scale(0.8);\n  will-change: opacity, transform;\n  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease, color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;\n}\n.styles-module__placement___zcxv8:hover .styles-module__deleteButton___LkGCb, .styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-:hover .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO:hover .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb {\n  opacity: 1;\n  transform: scale(1);\n  pointer-events: auto;\n}\n.styles-module__deleteButton___LkGCb:hover {\n  background: #ef4444;\n  color: #fff;\n  border-color: #ef4444;\n  box-shadow: 0 1px 4px rgba(239, 68, 68, 0.3);\n  transform: scale(1.1);\n}\n.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb {\n  background: rgba(40, 40, 40, 0.9);\n  border-color: rgba(255, 255, 255, 0.1);\n  color: rgba(255, 255, 255, 0.5);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n}\n.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover {\n  background: #ef4444;\n  color: #fff;\n  border-color: #ef4444;\n}\n\n.styles-module__drawBox___BrVAa {\n  position: fixed;\n  pointer-events: none;\n  z-index: 99996;\n  border: 2px solid #3c82f7;\n  border-radius: 6px;\n  background: rgba(59, 130, 246, 0.15);\n}\n\n.styles-module__selectBox___Iu8kB {\n  position: fixed;\n  pointer-events: none;\n  z-index: 99996;\n  border: 1px dashed #3c82f7;\n  background: rgba(59, 130, 246, 0.08);\n  border-radius: 2px;\n}\n\n.styles-module__sizeIndicator___7zJ4y {\n  position: fixed;\n  pointer-events: none;\n  z-index: 100001;\n  font-size: 10px;\n  color: #fff;\n  background: #3c82f7;\n  padding: 2px 6px;\n  border-radius: 4px;\n  white-space: nowrap;\n  font-weight: 500;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n}\n\n.styles-module__guideLine___DUQY2 {\n  pointer-events: none;\n  z-index: 100001;\n  background: #f0f;\n  opacity: 0.5;\n}\n\n.styles-module__dragPreview___onPbU {\n  position: fixed;\n  z-index: 100002;\n  pointer-events: none;\n  border: 1.5px dashed #3c82f7;\n  border-radius: 6px;\n  background: rgba(59, 130, 246, 0.1);\n  backdrop-filter: blur(8px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 9px;\n  font-weight: 600;\n  color: #3c82f7;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);\n  transition: width 0.08s ease, height 0.08s ease, opacity 0.08s ease;\n}\n\n.styles-module__dragPreviewWireframe___jsg0G {\n  border-color: #f97316;\n  background: rgba(249, 115, 22, 0.1);\n  color: #f97316;\n  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.15);\n}\n\n.styles-module__palette___C7iSH {\n  position: absolute;\n  right: 5px;\n  bottom: calc(100% + 0.5rem);\n  width: 256px;\n  overflow: hidden;\n  background: #1c1c1c;\n  border: none;\n  border-radius: 1rem;\n  padding: 13px 0 16px;\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);\n  z-index: 100001;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  cursor: default;\n  opacity: 0;\n  filter: blur(5px);\n}\n.styles-module__palette___C7iSH .styles-module__paletteItem___6TlnA,\n.styles-module__palette___C7iSH .styles-module__paletteItemLabel___6ncO4,\n.styles-module__palette___C7iSH .styles-module__paletteSectionTitle___PqnjX,\n.styles-module__palette___C7iSH .styles-module__paletteFooter___QYnAG {\n  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;\n}\n.styles-module__palette___C7iSH.styles-module__enter___6LYk5 {\n  opacity: 1;\n  transform: translateY(0);\n  filter: blur(0px);\n  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;\n}\n.styles-module__palette___C7iSH.styles-module__exit___iSGRw {\n  opacity: 0;\n  transform: translateY(6px);\n  filter: blur(5px);\n  pointer-events: none;\n  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;\n}\n.styles-module__palette___C7iSH.styles-module__light___ORIft {\n  background: #fff;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);\n}\n\n.styles-module__paletteSection___V8DEA {\n  padding: 0 1rem;\n}\n.styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {\n  margin-top: 0.5rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.07);\n}\n.styles-module__light___ORIft .styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {\n  border-top-color: rgba(0, 0, 0, 0.07);\n}\n\n.styles-module__paletteSectionTitle___PqnjX {\n  font-size: 0.6875rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, 0.5);\n  letter-spacing: -0.0094em;\n  padding: 0 0 3px 3px;\n}\n.styles-module__light___ORIft .styles-module__paletteSectionTitle___PqnjX {\n  color: rgba(0, 0, 0, 0.4);\n}\n\n.styles-module__paletteItem___6TlnA {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.25rem 0.25rem;\n  margin-bottom: 1px;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease;\n  border: 1px solid transparent;\n  user-select: none;\n  min-height: 24px;\n}\n.styles-module__paletteItem___6TlnA:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {\n  background: #3c82f7;\n  border-color: transparent;\n}\n.styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {\n  background: #f97316;\n}\n.styles-module__light___ORIft .styles-module__paletteItem___6TlnA:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {\n  background: #3c82f7;\n  border-color: transparent;\n}\n.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {\n  background: #f97316;\n}\n\n.styles-module__paletteItemIcon___0NPQK {\n  width: 20px;\n  height: 16px;\n  border-radius: 2px;\n  border: 1px dashed rgba(255, 255, 255, 0.15);\n  background: rgba(255, 255, 255, 0.04);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  overflow: hidden;\n  color: rgba(255, 255, 255, 0.45);\n}\n.styles-module__paletteItemIcon___0NPQK svg {\n  display: block;\n  width: 20px;\n  height: 16px;\n}\n.styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgba(255, 255, 255, 0.15);\n  color: #fff;\n}\n.styles-module__light___ORIft .styles-module__paletteItemIcon___0NPQK {\n  border-color: rgba(0, 0, 0, 0.12);\n  background: rgba(0, 0, 0, 0.02);\n  color: rgba(0, 0, 0, 0.4);\n}\n.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgba(255, 255, 255, 0.15);\n  color: #fff;\n}\n\n.styles-module__paletteItemLabel___6ncO4 {\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, 0.85);\n  letter-spacing: -0.0094em;\n  line-height: 1;\n  min-width: 0;\n}\n.styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {\n  color: #fff;\n  font-weight: 600;\n}\n.styles-module__light___ORIft .styles-module__paletteItemLabel___6ncO4 {\n  color: rgba(0, 0, 0, 0.7);\n}\n.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {\n  color: #fff;\n  font-weight: 600;\n}\n\n.styles-module__placeScroll___7sClM {\n  max-height: 240px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding-top: 0.25rem;\n}\n.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF {\n  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px);\n  mask-image: linear-gradient(to bottom, transparent 0, black 32px);\n}\n.styles-module__placeScroll___7sClM.styles-module__fadeBottom___x3ShT {\n  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);\n  mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);\n}\n.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF.styles-module__fadeBottom___x3ShT {\n  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);\n  mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);\n}\n.styles-module__placeScroll___7sClM::-webkit-scrollbar {\n  width: 3px;\n}\n.styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.12);\n  border-radius: 2px;\n}\n.styles-module__light___ORIft .styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.1);\n}\n\n.styles-module__paletteFooterWrap___71-fI {\n  display: grid;\n  grid-template-rows: 1fr;\n  transition: grid-template-rows 0.25s cubic-bezier(0.32, 0.72, 0, 1);\n}\n.styles-module__paletteFooterWrap___71-fI.styles-module__footerHidden___fJUik {\n  grid-template-rows: 0fr;\n}\n\n.styles-module__paletteFooterInnerContent___VC26h {\n  opacity: 1;\n  transform: translateY(0);\n  transition: opacity 0.15s ease, transform 0.15s ease;\n}\n.styles-module__footerHidden___fJUik .styles-module__paletteFooterInnerContent___VC26h {\n  opacity: 0;\n  transform: translateY(4px);\n}\n\n.styles-module__paletteFooterInner___dfylY {\n  overflow: hidden;\n}\n\n.styles-module__paletteFooter___QYnAG {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 24px;\n  padding: 0 1rem;\n  margin-top: 0.5rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.07);\n}\n.styles-module__light___ORIft .styles-module__paletteFooter___QYnAG {\n  border-top-color: rgba(0, 0, 0, 0.07);\n}\n\n.styles-module__paletteFooterCount___D3Fia {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  letter-spacing: -0.0094em;\n  color: rgba(255, 255, 255, 0.5);\n}\n.styles-module__light___ORIft .styles-module__paletteFooterCount___D3Fia {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__paletteFooterClear___ybBoa {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  letter-spacing: -0.0094em;\n  color: rgba(255, 255, 255, 0.5);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  font-family: inherit;\n  transition: color 0.15s ease;\n}\n.styles-module__paletteFooterClear___ybBoa:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa {\n  color: rgba(0, 0, 0, 0.5);\n}\n.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa:hover {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.styles-module__paletteFooterActions___fLzv8 {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.styles-module__rollingWrap___S75jM {\n  display: inline-block;\n  overflow: hidden;\n  height: 1.15em;\n  position: relative;\n  vertical-align: bottom;\n}\n\n.styles-module__rollingNum___1RKDx {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.styles-module__exitUp___AFDRW {\n  animation: styles-module__numExitUp___FRQqx 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;\n}\n\n.styles-module__enterUp___CPlXb {\n  animation: styles-module__numEnterUp___2Yd-w 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;\n}\n\n.styles-module__exitDown___-1yAy {\n  animation: styles-module__numExitDown___xm5by 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;\n}\n\n.styles-module__enterDown___DDuFR {\n  animation: styles-module__numEnterDown___hpxBk 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;\n}\n\n@keyframes styles-module__numExitUp___FRQqx {\n  from {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(-110%);\n    opacity: 0;\n  }\n}\n@keyframes styles-module__numEnterUp___2Yd-w {\n  from {\n    transform: translateY(110%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes styles-module__numExitDown___xm5by {\n  from {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(110%);\n    opacity: 0;\n  }\n}\n@keyframes styles-module__numEnterDown___hpxBk {\n  from {\n    transform: translateY(-110%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.styles-module__rearrangeOverlay___-3R3t {\n  position: fixed;\n  inset: 0;\n  z-index: 99995;\n  pointer-events: none;\n  cursor: default;\n  user-select: none;\n  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;\n}\n\n.styles-module__hoverHighlight___8eT-v {\n  position: fixed;\n  pointer-events: none;\n  z-index: 99994;\n  border: 2px dashed rgba(59, 130, 246, 0.5);\n  border-radius: 4px;\n  background: rgba(59, 130, 246, 0.06);\n  animation: styles-module__highlightFadeIn___Lg7KY 0.12s ease;\n}\n\n.styles-module__sectionOutline___s0hy- {\n  position: fixed;\n  border: 2px solid;\n  border-radius: 4px;\n  cursor: grab;\n}\n.styles-module__sectionOutline___s0hy-:active {\n  cursor: grabbing;\n}\n.styles-module__sectionOutline___s0hy- {\n  transition: box-shadow 0.15s, border-color 0.3s, background-color 0.3s, border-style 0s;\n  user-select: none;\n  pointer-events: auto;\n  animation: styles-module__sectionEnter___-8BXT 0.2s ease;\n}\n.styles-module__sectionOutline___s0hy-:hover {\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 {\n  border-style: solid;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6:hover {\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) {\n  border: 1.5px dashed rgba(150, 150, 150, 0.35);\n  background-color: transparent !important;\n  box-shadow: none;\n}\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover {\n  border-color: rgba(150, 150, 150, 0.6);\n  box-shadow: none;\n}\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionLabel___F80HQ {\n  opacity: 0;\n  transition: opacity 0.15s ease;\n}\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionLabel___F80HQ {\n  opacity: 1;\n}\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__movedBadge___s8z-q,\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionDimensions___RcJSL {\n  opacity: 0;\n  transition: opacity 0.15s ease;\n}\n.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionDimensions___RcJSL {\n  opacity: 1;\n}\n.styles-module__sectionOutline___s0hy-.styles-module__exiting___YrM8F {\n  opacity: 0;\n  transform: scale(0.97);\n  pointer-events: none;\n  animation: none;\n  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);\n}\n\n.styles-module__sectionLabel___F80HQ {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  font-size: 10px;\n  font-weight: 600;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 4px;\n  white-space: nowrap;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);\n  max-width: calc(100% - 8px);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.styles-module__movedBadge___s8z-q {\n  position: absolute;\n  bottom: 22px;\n  right: 4px;\n  font-size: 9px;\n  font-weight: 700;\n  color: #fff;\n  background: #22c55e;\n  padding: 2px 6px;\n  border-radius: 4px;\n  white-space: nowrap;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);\n  opacity: 0;\n  transform: scale(0.8);\n  transition: opacity 0.15s ease, transform 0.15s ease;\n}\n.styles-module__movedBadge___s8z-q.styles-module__badgeVisible___npbdS {\n  opacity: 1;\n  transform: scale(1);\n  transition: opacity 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1);\n}\n\n.styles-module__resizedBadge___u51V8 {\n  background: #3c82f7;\n  bottom: 40px;\n}\n\n.styles-module__sectionDimensions___RcJSL {\n  position: absolute;\n  bottom: 4px;\n  right: 4px;\n  font-size: 9px;\n  font-weight: 500;\n  color: rgba(255, 255, 255, 0.7);\n  background: rgba(0, 0, 0, 0.5);\n  padding: 1px 5px;\n  border-radius: 3px;\n  white-space: nowrap;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n}\n.styles-module__light___ORIft .styles-module__sectionDimensions___RcJSL {\n  color: rgba(0, 0, 0, 0.5);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.styles-module__wireframeNotice___4GJyB {\n  position: fixed;\n  bottom: 16px;\n  left: 24px;\n  z-index: 99995;\n  font-size: 9.5px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.4);\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  pointer-events: auto;\n  animation: styles-module__overlayFadeIn___aECVy 0.3s ease;\n  line-height: 1.5;\n  max-width: 280px;\n}\n\n.styles-module__wireframeOpacityRow___CJXzi {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n\n.styles-module__wireframeOpacityLabel___afkfT {\n  font-size: 9px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.32);\n  letter-spacing: 0.02em;\n  white-space: nowrap;\n  user-select: none;\n}\n\n.styles-module__wireframeOpacitySlider___YcoEs {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 56px;\n  height: 4px;\n  background: rgba(0, 0, 0, 0.08);\n  border-radius: 2px;\n  outline: none;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.15s ease;\n}\n.styles-module__wireframeOpacitySlider___YcoEs:hover {\n  background: rgba(0, 0, 0, 0.13);\n}\n.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #f97316;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb:hover {\n  background: rgb(224.4209205021, 95.3548117155, 5.7790794979);\n}\n.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-thumb {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #f97316;\n  border: none;\n  cursor: pointer;\n}\n.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-track {\n  background: rgba(0, 0, 0, 0.08);\n  height: 4px;\n  border-radius: 2px;\n}\n\n.styles-module__wireframeNoticeTitleRow___PJqyG {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  margin-bottom: 2px;\n}\n\n.styles-module__wireframeNoticeTitle___okr08 {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.55);\n}\n\n.styles-module__wireframeNoticeDivider___PNKQ6 {\n  width: 1px;\n  height: 8px;\n  background: rgba(0, 0, 0, 0.12);\n  margin: 0 8px;\n  flex-shrink: 0;\n}\n\n.styles-module__wireframeStartOver___YFk-I {\n  font-size: 9.5px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.35);\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: inherit;\n  text-decoration: none;\n  transition: color 0.12s ease;\n  white-space: nowrap;\n}\n.styles-module__wireframeStartOver___YFk-I:hover {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.styles-module__ghostOutline___po-kO {\n  position: fixed;\n  border: 1.5px dashed rgba(59, 130, 246, 0.4);\n  border-radius: 4px;\n  background: rgba(59, 130, 246, 0.04);\n  cursor: grab;\n  opacity: 0.5;\n  user-select: none;\n  pointer-events: auto;\n  animation: styles-module__ghostEnter___EC3Mb 0.25s ease;\n  transition: box-shadow 0.15s, border-color 0.3s, opacity 0.25s;\n}\n.styles-module__ghostOutline___po-kO:active {\n  cursor: grabbing;\n}\n.styles-module__ghostOutline___po-kO:hover {\n  opacity: 0.7;\n  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 {\n  opacity: 1;\n  border-style: solid;\n  border-width: 2px;\n  border-color: #3c82f7;\n  background: rgba(59, 130, 246, 0.08);\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.styles-module__ghostOutline___po-kO.styles-module__exiting___YrM8F {\n  opacity: 0;\n  transform: scale(0.97);\n  pointer-events: none;\n  animation: none;\n  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);\n}\n\n.styles-module__ghostBadge___tsQUK {\n  position: absolute;\n  bottom: calc(100% + 4px);\n  left: -1px;\n  font-size: 9px;\n  font-weight: 600;\n  color: rgba(59, 130, 246, 0.9);\n  background: rgba(59, 130, 246, 0.08);\n  border: 1px solid rgba(59, 130, 246, 0.2);\n  padding: 1px 5px;\n  border-radius: 3px;\n  white-space: nowrap;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  letter-spacing: 0.02em;\n  line-height: 1.2;\n  animation: styles-module__badgeSlideIn___typJ7 0.2s ease both;\n}\n\n@keyframes styles-module__badgeSlideIn___typJ7 {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.styles-module__ghostBadgeExtra___6CVoD {\n  display: inline;\n  animation: styles-module__badgeExtraIn___i4W8F 0.2s ease both;\n}\n\n@keyframes styles-module__badgeExtraIn___i4W8F {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.styles-module__originalOutline___Y6DD1 {\n  position: fixed;\n  border: 1.5px dashed rgba(150, 150, 150, 0.3);\n  border-radius: 4px;\n  background: transparent;\n  pointer-events: none;\n  user-select: none;\n  animation: styles-module__sectionEnter___-8BXT 0.2s ease;\n}\n\n.styles-module__originalLabel___HqI9g {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  font-size: 9px;\n  font-weight: 500;\n  color: rgba(150, 150, 150, 0.5);\n  padding: 1px 6px;\n  border-radius: 3px;\n  white-space: nowrap;\n  pointer-events: none;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  background: rgba(150, 150, 150, 0.08);\n}\n\n.styles-module__connectorSvg___Lovld {\n  position: fixed;\n  inset: 0;\n  width: 100vw;\n  height: 100vh;\n  pointer-events: none;\n  z-index: 99996;\n}\n\n.styles-module__connectorLine___XeWh- {\n  transition: opacity 0.2s ease;\n  animation: styles-module__connectorDraw___8sK5I 0.3s ease both;\n}\n\n.styles-module__connectorDot___yvf7C {\n  transform-box: fill-box;\n  transform-origin: center;\n  animation: styles-module__connectorDotIn___NwTUq 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;\n}\n\n@keyframes styles-module__connectorDraw___8sK5I {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes styles-module__connectorDotIn___NwTUq {\n  from {\n    transform: scale(0);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.styles-module__connectorExiting___2lLOs {\n  animation: styles-module__connectorOut___5QoPl 0.2s ease forwards;\n}\n.styles-module__connectorExiting___2lLOs .styles-module__connectorDot___yvf7C {\n  animation: styles-module__connectorDotOut___FEq7e 0.2s ease forwards;\n}\n\n@keyframes styles-module__connectorOut___5QoPl {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes styles-module__connectorDotOut___FEq7e {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0);\n    opacity: 0;\n  }\n}\n@keyframes styles-module__placementEnter___TdRhf {\n  from {\n    opacity: 0;\n    transform: scale(0.85);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes styles-module__sectionEnter___-8BXT {\n  from {\n    opacity: 0;\n    transform: scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes styles-module__highlightFadeIn___Lg7KY {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes styles-module__overlayFadeIn___aECVy {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes styles-module__ghostEnter___EC3Mb {\n  from {\n    opacity: 0;\n    transform: scale(0.96);\n  }\n  to {\n    opacity: 0.6;\n    transform: scale(1);\n  }\n}';
      classNames4 = { "overlayExiting": "styles-module__overlayExiting___iEmYr", "overlay": "styles-module__overlay___aWh-q", "overlayFadeIn": "styles-module__overlayFadeIn___aECVy", "light": "styles-module__light___ORIft", "wireframe": "styles-module__wireframe___itvQU", "placing": "styles-module__placing___45yD8", "passthrough": "styles-module__passthrough___xaFeE", "blankCanvas": "styles-module__blankCanvas___t2Eue", "visible": "styles-module__visible___OKKqX", "gridActive": "styles-module__gridActive___OZ-cf", "paletteHeader": "styles-module__paletteHeader___-Q5gQ", "paletteHeaderTitle": "styles-module__paletteHeaderTitle___oHqZC", "paletteHeaderDesc": "styles-module__paletteHeaderDesc___6i74T", "wireframePurposeWrap": "styles-module__wireframePurposeWrap___To-tS", "collapsed": "styles-module__collapsed___Ms9vS", "wireframePurposeInner": "styles-module__wireframePurposeInner___Lrahs", "wireframePurposeInput": "styles-module__wireframePurposeInput___7EtBN", "canvasToggle": "styles-module__canvasToggle___-QqSy", "active": "styles-module__active___hosp7", "canvasToggleIcon": "styles-module__canvasToggleIcon___7pJ82", "canvasToggleLabel": "styles-module__canvasToggleLabel___OanpY", "canvasPurposeWrap": "styles-module__canvasPurposeWrap___hj6zk", "canvasPurposeInner": "styles-module__canvasPurposeInner___VWiyu", "canvasPurposeToggle": "styles-module__canvasPurposeToggle___byDH2", "canvasPurposeCheck": "styles-module__canvasPurposeCheck___xqd7l", "checked": "styles-module__checked___-1JGH", "canvasPurposeLabel": "styles-module__canvasPurposeLabel___Zu-tD", "canvasPurposeHelp": "styles-module__canvasPurposeHelp___jijwR", "placement": "styles-module__placement___zcxv8", "placementEnter": "styles-module__placementEnter___TdRhf", "selected": "styles-module__selected___6yrp6", "dragging": "styles-module__dragging___le6KZ", "exiting": "styles-module__exiting___YrM8F", "placementContent": "styles-module__placementContent___f64A4", "placementLabel": "styles-module__placementLabel___0KvWl", "placementAnnotation": "styles-module__placementAnnotation___78pTr", "annotationVisible": "styles-module__annotationVisible___mrUyA", "sectionAnnotation": "styles-module__sectionAnnotation___aUIs0", "handle": "styles-module__handle___Ikbxm", "sectionOutline": "styles-module__sectionOutline___s0hy-", "ghostOutline": "styles-module__ghostOutline___po-kO", "handleNw": "styles-module__handleNw___4TMIj", "handleNe": "styles-module__handleNe___mnsTh", "handleSe": "styles-module__handleSe___oSFnk", "handleSw": "styles-module__handleSw___pi--Z", "handleN": "styles-module__handleN___aBA-Q", "handleE": "styles-module__handleE___0hM5u", "handleS": "styles-module__handleS___JjDRv", "handleW": "styles-module__handleW___ERWGQ", "edgeHandle": "styles-module__edgeHandle___XxXdT", "edgeN": "styles-module__edgeN___-JJDj", "edgeS": "styles-module__edgeS___66lMX", "edgeE": "styles-module__edgeE___1bGDa", "edgeW": "styles-module__edgeW___lHQNo", "deleteButton": "styles-module__deleteButton___LkGCb", "rearrangeOverlay": "styles-module__rearrangeOverlay___-3R3t", "drawBox": "styles-module__drawBox___BrVAa", "selectBox": "styles-module__selectBox___Iu8kB", "sizeIndicator": "styles-module__sizeIndicator___7zJ4y", "guideLine": "styles-module__guideLine___DUQY2", "dragPreview": "styles-module__dragPreview___onPbU", "dragPreviewWireframe": "styles-module__dragPreviewWireframe___jsg0G", "palette": "styles-module__palette___C7iSH", "paletteItem": "styles-module__paletteItem___6TlnA", "paletteItemLabel": "styles-module__paletteItemLabel___6ncO4", "paletteSectionTitle": "styles-module__paletteSectionTitle___PqnjX", "paletteFooter": "styles-module__paletteFooter___QYnAG", "enter": "styles-module__enter___6LYk5", "exit": "styles-module__exit___iSGRw", "paletteSection": "styles-module__paletteSection___V8DEA", "paletteItemIcon": "styles-module__paletteItemIcon___0NPQK", "placeScroll": "styles-module__placeScroll___7sClM", "fadeTop": "styles-module__fadeTop___KT9tF", "fadeBottom": "styles-module__fadeBottom___x3ShT", "paletteFooterWrap": "styles-module__paletteFooterWrap___71-fI", "footerHidden": "styles-module__footerHidden___fJUik", "paletteFooterInnerContent": "styles-module__paletteFooterInnerContent___VC26h", "paletteFooterInner": "styles-module__paletteFooterInner___dfylY", "paletteFooterCount": "styles-module__paletteFooterCount___D3Fia", "paletteFooterClear": "styles-module__paletteFooterClear___ybBoa", "paletteFooterActions": "styles-module__paletteFooterActions___fLzv8", "rollingWrap": "styles-module__rollingWrap___S75jM", "rollingNum": "styles-module__rollingNum___1RKDx", "exitUp": "styles-module__exitUp___AFDRW", "numExitUp": "styles-module__numExitUp___FRQqx", "enterUp": "styles-module__enterUp___CPlXb", "numEnterUp": "styles-module__numEnterUp___2Yd-w", "exitDown": "styles-module__exitDown___-1yAy", "numExitDown": "styles-module__numExitDown___xm5by", "enterDown": "styles-module__enterDown___DDuFR", "numEnterDown": "styles-module__numEnterDown___hpxBk", "hoverHighlight": "styles-module__hoverHighlight___8eT-v", "highlightFadeIn": "styles-module__highlightFadeIn___Lg7KY", "sectionEnter": "styles-module__sectionEnter___-8BXT", "settled": "styles-module__settled___b5U5o", "sectionLabel": "styles-module__sectionLabel___F80HQ", "movedBadge": "styles-module__movedBadge___s8z-q", "sectionDimensions": "styles-module__sectionDimensions___RcJSL", "badgeVisible": "styles-module__badgeVisible___npbdS", "resizedBadge": "styles-module__resizedBadge___u51V8", "wireframeNotice": "styles-module__wireframeNotice___4GJyB", "wireframeOpacityRow": "styles-module__wireframeOpacityRow___CJXzi", "wireframeOpacityLabel": "styles-module__wireframeOpacityLabel___afkfT", "wireframeOpacitySlider": "styles-module__wireframeOpacitySlider___YcoEs", "wireframeNoticeTitleRow": "styles-module__wireframeNoticeTitleRow___PJqyG", "wireframeNoticeTitle": "styles-module__wireframeNoticeTitle___okr08", "wireframeNoticeDivider": "styles-module__wireframeNoticeDivider___PNKQ6", "wireframeStartOver": "styles-module__wireframeStartOver___YFk-I", "ghostEnter": "styles-module__ghostEnter___EC3Mb", "ghostBadge": "styles-module__ghostBadge___tsQUK", "badgeSlideIn": "styles-module__badgeSlideIn___typJ7", "ghostBadgeExtra": "styles-module__ghostBadgeExtra___6CVoD", "badgeExtraIn": "styles-module__badgeExtraIn___i4W8F", "originalOutline": "styles-module__originalOutline___Y6DD1", "originalLabel": "styles-module__originalLabel___HqI9g", "connectorSvg": "styles-module__connectorSvg___Lovld", "connectorLine": "styles-module__connectorLine___XeWh-", "connectorDraw": "styles-module__connectorDraw___8sK5I", "connectorDot": "styles-module__connectorDot___yvf7C", "connectorDotIn": "styles-module__connectorDotIn___NwTUq", "connectorExiting": "styles-module__connectorExiting___2lLOs", "connectorOut": "styles-module__connectorOut___5QoPl", "connectorDotOut": "styles-module__connectorDotOut___FEq7e" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-design-mode-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-design-mode-styles";
          document.head.appendChild(style);
        }
        style.textContent = css4;
      }
      styles_module_default3 = classNames4;
      MIN_SIZE = 24;
      SNAP_THRESHOLD = 5;
      s = "currentColor";
      sw = "0.5";
      DEFAULT_STYLE_VALUES = /* @__PURE__ */ new Set([
        "none",
        "normal",
        "auto",
        "0px",
        "rgba(0, 0, 0, 0)",
        "transparent",
        "static",
        "visible"
      ]);
      TEXT_ELEMENTS = /* @__PURE__ */ new Set([
        "p",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "label",
        "li",
        "td",
        "th",
        "blockquote",
        "figcaption",
        "caption",
        "legend",
        "dt",
        "dd",
        "pre",
        "code",
        "em",
        "strong",
        "b",
        "i",
        "a",
        "time",
        "cite",
        "q"
      ]);
      FORM_INPUT_ELEMENTS = /* @__PURE__ */ new Set(["input", "textarea", "select"]);
      MEDIA_ELEMENTS = /* @__PURE__ */ new Set(["img", "video", "canvas", "svg"]);
      CONTAINER_ELEMENTS = /* @__PURE__ */ new Set([
        "div",
        "section",
        "article",
        "nav",
        "header",
        "footer",
        "aside",
        "main",
        "ul",
        "ol",
        "form",
        "fieldset"
      ]);
      FORENSIC_PROPERTIES = [
        // Colors
        "color",
        "backgroundColor",
        "borderColor",
        // Typography
        "fontSize",
        "fontWeight",
        "fontFamily",
        "lineHeight",
        "letterSpacing",
        "textAlign",
        // Box model
        "width",
        "height",
        "padding",
        "margin",
        "border",
        "borderRadius",
        // Layout & positioning
        "display",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "zIndex",
        "flexDirection",
        "justifyContent",
        "alignItems",
        "gap",
        // Visual effects
        "opacity",
        "visibility",
        "overflow",
        "boxShadow",
        // Transform
        "transform"
      ];
      SECTION_TAGS = /* @__PURE__ */ new Set([
        "nav",
        "header",
        "main",
        "section",
        "article",
        "footer",
        "aside"
      ]);
      SECTION_ROLES = {
        banner: "Header",
        navigation: "Navigation",
        main: "Main Content",
        contentinfo: "Footer",
        complementary: "Sidebar",
        region: "Section"
      };
      TAG_LABELS = {
        nav: "Navigation",
        header: "Header",
        main: "Main Content",
        section: "Section",
        article: "Article",
        footer: "Footer",
        aside: "Sidebar"
      };
      SKIP_TAGS = /* @__PURE__ */ new Set(["script", "style", "noscript", "link", "meta"]);
      MIN_SECTION_HEIGHT = 40;
      SECTION_COLOR = { bg: "rgba(59, 130, 246, 0.08)", border: "rgba(59, 130, 246, 0.5)", pill: "#3b82f6" };
      HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
      MIN_SIZE2 = 24;
      MIN_CAPTURE_SIZE = 16;
      SNAP_THRESHOLD2 = 5;
      SKIP_TAGS2 = /* @__PURE__ */ new Set(["script", "style", "noscript", "link", "meta", "br", "hr"]);
      SKIP_TAGS3 = /* @__PURE__ */ new Set(["script", "style", "noscript", "link", "meta", "br", "hr"]);
      GROUP_TOLERANCE = 15;
      STORAGE_PREFIX = "feedback-annotations-";
      DEFAULT_RETENTION_DAYS = 7;
      DESIGN_PREFIX = "agentation-design-";
      REARRANGE_PREFIX = "agentation-rearrange-";
      WIREFRAME_PREFIX = "agentation-wireframe-";
      SESSION_PREFIX = "agentation-session-";
      TOOLBAR_HIDDEN_SESSION_KEY = `${SESSION_PREFIX}toolbar-hidden`;
      FiberTags = {
        FunctionComponent: 0,
        ClassComponent: 1,
        IndeterminateComponent: 2,
        HostRoot: 3,
        HostPortal: 4,
        HostComponent: 5,
        // DOM elements like <div>
        HostText: 6,
        Fragment: 7,
        Mode: 8,
        ContextConsumer: 9,
        ContextProvider: 10,
        ForwardRef: 11,
        Profiler: 12,
        SuspenseComponent: 13,
        MemoComponent: 14,
        SimpleMemoComponent: 15,
        LazyComponent: 16,
        // React 18/19 additions
        IncompleteClassComponent: 17,
        DehydratedFragment: 18,
        SuspenseListComponent: 19,
        // Note: 20 is unused/reserved
        ScopeComponent: 21,
        OffscreenComponent: 22,
        LegacyHiddenComponent: 23,
        CacheComponent: 24,
        TracingMarkerComponent: 25,
        HostHoistable: 26,
        HostSingleton: 27,
        IncompleteFunctionComponent: 28,
        Throw: 29,
        ViewTransitionComponent: 30,
        ActivityComponent: 31
      };
      DEFAULT_SKIP_EXACT = /* @__PURE__ */ new Set([
        "Component",
        "PureComponent",
        "Fragment",
        "Suspense",
        "Profiler",
        "StrictMode",
        "Routes",
        "Route",
        "Outlet",
        // Framework internals - exact matches
        "Root",
        "ErrorBoundaryHandler",
        "HotReload",
        "Hot"
      ]);
      DEFAULT_SKIP_PATTERNS = [
        /Boundary$/,
        // ErrorBoundary, RedirectBoundary
        /BoundaryHandler$/,
        // ErrorBoundaryHandler
        /Provider$/,
        // ThemeProvider, Context.Provider
        /Consumer$/,
        // Context.Consumer
        /^(Inner|Outer)/,
        // InnerLayoutRouter
        /Router$/,
        // AppRouter, BrowserRouter
        /^Client(Page|Segment|Root)/,
        // ClientPageRoot, ClientSegmentRoot
        /^Segment(ViewNode|Node)$/,
        // Next.js App Router internals
        /^LayoutSegment/,
        // Next.js layout segment wrappers
        /^Server(Root|Component|Render)/,
        // ServerRoot (not ServerStatus)
        /^RSC/,
        // RSCComponent
        /Context$/,
        // LayoutRouterContext
        /^Hot(Reload)?$/,
        // HotReload (exact match to avoid false positives)
        /^(Dev|React)(Overlay|Tools|Root)/,
        // DevTools, ReactDevOverlay
        /Overlay$/,
        // ReactDevOverlay, ErrorOverlay
        /Handler$/,
        // ScrollAndFocusHandler, ErrorBoundaryHandler
        /^With[A-Z]/,
        // withRouter, WithAuth (HOCs)
        /Wrapper$/,
        // Generic wrappers
        /^Root$/
        // Generic Root component
      ];
      DEFAULT_USER_PATTERNS = [
        /Page$/,
        // HomePage, InstallPage
        /View$/,
        // ListView, DetailView
        /Screen$/,
        // HomeScreen
        /Section$/,
        // HeroSection
        /Card$/,
        // ProductCard
        /List$/,
        // UserList
        /Item$/,
        // ListItem, MenuItem
        /Form$/,
        // LoginForm
        /Modal$/,
        // ConfirmModal
        /Dialog$/,
        // AlertDialog
        /Button$/,
        // SubmitButton (but not all buttons)
        /Nav$/,
        // SideNav, TopNav
        /Header$/,
        // PageHeader
        /Footer$/,
        // PageFooter
        /Layout$/,
        // MainLayout (careful - could be framework)
        /Panel$/,
        // SidePanel
        /Tab$/,
        // SettingsTab
        /Menu$/
        // DropdownMenu
      ];
      reactDetectionCache = null;
      componentCacheAll = /* @__PURE__ */ new WeakMap();
      componentCacheAllRef = { map: componentCacheAll };
      FIBER_TAGS = {
        FunctionComponent: 0,
        ClassComponent: 1,
        IndeterminateComponent: 2,
        HostRoot: 3,
        HostPortal: 4,
        HostComponent: 5,
        HostText: 6,
        Fragment: 7,
        Mode: 8,
        ContextConsumer: 9,
        ContextProvider: 10,
        ForwardRef: 11,
        Profiler: 12,
        SuspenseComponent: 13,
        MemoComponent: 14,
        SimpleMemoComponent: 15,
        LazyComponent: 16
      };
      sourceProbeCache = /* @__PURE__ */ new Map();
      css5 = '.styles-module__toolbar___wNsdK svg[fill=none],\n.styles-module__markersLayer___-25j1 svg[fill=none],\n.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] {\n  fill: none !important;\n}\n.styles-module__toolbar___wNsdK svg[fill=none] :not([fill]),\n.styles-module__markersLayer___-25j1 svg[fill=none] :not([fill]),\n.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] :not([fill]) {\n  fill: none !important;\n}\n\n.styles-module__controlsContent___9GJWU :where(button, input, select, textarea, label) {\n  background: unset;\n  border: unset;\n  border-radius: unset;\n  padding: unset;\n  margin: unset;\n  color: unset;\n  font-family: unset;\n  font-weight: unset;\n  font-style: unset;\n  line-height: unset;\n  letter-spacing: unset;\n  text-transform: unset;\n  text-decoration: unset;\n  box-shadow: unset;\n  outline: unset;\n}\n\n@keyframes styles-module__toolbarEnter___u8RRu {\n  from {\n    opacity: 0;\n    transform: scale(0.5) rotate(90deg);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) rotate(0deg);\n  }\n}\n@keyframes styles-module__toolbarHide___y8kaT {\n  from {\n    opacity: 1;\n    transform: scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n@keyframes styles-module__badgeEnter___mVQLj {\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes styles-module__scaleIn___c-r1K {\n  from {\n    opacity: 0;\n    transform: scale(0.85);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes styles-module__scaleOut___Wctwz {\n  from {\n    opacity: 1;\n    transform: scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.85);\n  }\n}\n@keyframes styles-module__slideUp___kgD36 {\n  from {\n    opacity: 0;\n    transform: scale(0.85) translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n@keyframes styles-module__slideDown___zcdje {\n  from {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n  to {\n    opacity: 0;\n    transform: scale(0.85) translateY(8px);\n  }\n}\n@keyframes styles-module__fadeIn___b9qmf {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes styles-module__fadeOut___6Ut6- {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes styles-module__hoverHighlightIn___6WYHY {\n  from {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes styles-module__hoverTooltipIn___FYGQx {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.styles-module__disableTransitions___EopxO :is(*, *::before, *::after) {\n  transition: none !important;\n}\n\n.styles-module__toolbar___wNsdK {\n  position: fixed;\n  bottom: 1.25rem;\n  right: 1.25rem;\n  width: 337px;\n  z-index: 100000;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  pointer-events: none;\n  transition: left 0s, top 0s, right 0s, bottom 0s;\n}\n\n:where(.styles-module__toolbar___wNsdK) {\n  bottom: 1.25rem;\n  right: 1.25rem;\n}\n\n.styles-module__toolbarContainer___dIhma {\n  position: relative;\n  user-select: none;\n  margin-left: auto;\n  align-self: flex-end;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #1a1a1a;\n  color: #fff;\n  border: none;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1);\n  pointer-events: auto;\n  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n}\n.styles-module__toolbarContainer___dIhma.styles-module__entrance___sgHd8 {\n  animation: styles-module__toolbarEnter___u8RRu 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;\n}\n.styles-module__toolbarContainer___dIhma.styles-module__hiding___1td44 {\n  animation: styles-module__toolbarHide___y8kaT 0.4s cubic-bezier(0.4, 0, 1, 1) forwards;\n  pointer-events: none;\n}\n.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn {\n  width: 44px;\n  height: 44px;\n  border-radius: 22px;\n  padding: 0;\n  cursor: pointer;\n}\n.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn svg {\n  margin-top: -1px;\n}\n.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {\n  background: #2a2a2a;\n}\n.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:active {\n  transform: scale(0.95);\n}\n.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx {\n  height: 44px;\n  border-radius: 1.5rem;\n  padding: 0.375rem;\n  width: 297px;\n}\n.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx.styles-module__serverConnected___Gfbou {\n  width: 337px;\n}\n\n.styles-module__toggleContent___0yfyP {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.1s cubic-bezier(0.19, 1, 0.22, 1);\n}\n.styles-module__toggleContent___0yfyP.styles-module__visible___KHwEW {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n}\n.styles-module__toggleContent___0yfyP.styles-module__hidden___Ae8H4 {\n  opacity: 0;\n  pointer-events: none;\n}\n\n.styles-module__controlsContent___9GJWU {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  transition: filter 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);\n}\n.styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW {\n  opacity: 1;\n  filter: blur(0px);\n  transform: scale(1);\n  visibility: visible;\n  pointer-events: auto;\n}\n.styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {\n  pointer-events: none;\n  opacity: 0;\n  filter: blur(10px);\n  transform: scale(0.4);\n}\n\n.styles-module__badge___2XsgF {\n  position: absolute;\n  top: -13px;\n  right: -13px;\n  user-select: none;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 9px;\n  background-color: var(--agentation-color-accent);\n  color: white;\n  font-size: 0.625rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04);\n  opacity: 1;\n  transition: transform 0.3s ease, opacity 0.2s ease;\n  transform: scale(1);\n}\n.styles-module__badge___2XsgF.styles-module__fadeOut___6Ut6- {\n  opacity: 0;\n  transform: scale(0);\n  pointer-events: none;\n}\n.styles-module__badge___2XsgF.styles-module__entrance___sgHd8 {\n  animation: styles-module__badgeEnter___mVQLj 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) 0.4s both;\n}\n\n.styles-module__controlButton___8Q0jc {\n  position: relative;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.85);\n  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease, opacity 0.2s ease;\n}\n.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {\n  background: rgba(255, 255, 255, 0.12);\n  color: #fff;\n}\n.styles-module__controlButton___8Q0jc:active:not(:disabled) {\n  transform: scale(0.92);\n}\n.styles-module__controlButton___8Q0jc:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.styles-module__controlButton___8Q0jc[data-active=true] {\n  color: var(--agentation-color-blue);\n  background-color: color-mix(in srgb, var(--agentation-color-blue) 25%, transparent);\n}\n.styles-module__controlButton___8Q0jc[data-error=true] {\n  color: var(--agentation-color-red);\n  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);\n}\n.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {\n  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);\n  color: var(--agentation-color-red);\n}\n.styles-module__controlButton___8Q0jc[data-no-hover=true], .styles-module__controlButton___8Q0jc.styles-module__statusShowing___te6iu {\n  cursor: default;\n  pointer-events: none;\n  background: transparent !important;\n}\n.styles-module__controlButton___8Q0jc[data-auto-sync=true] {\n  color: var(--agentation-color-green);\n  background: transparent;\n  cursor: default;\n}\n.styles-module__controlButton___8Q0jc[data-failed=true] {\n  color: var(--agentation-color-red);\n  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);\n}\n\n.styles-module__buttonBadge___NeFWb {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: 8px;\n  background-color: var(--agentation-color-accent);\n  color: white;\n  font-size: 0.625rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 0 0 2px #1a1a1a, 0 1px 3px rgba(0, 0, 0, 0.2);\n  pointer-events: none;\n}\n[data-agentation-theme=light] .styles-module__buttonBadge___NeFWb {\n  box-shadow: 0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n\n@keyframes styles-module__mcpIndicatorPulseConnected___EDodZ {\n  0%, 100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);\n  }\n  50% {\n    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);\n  }\n}\n@keyframes styles-module__mcpIndicatorPulseConnecting___cCYte {\n  0%, 100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-yellow) 50%, transparent);\n  }\n  50% {\n    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-yellow) 0%, transparent);\n  }\n}\n.styles-module__mcpIndicator___zGJeL {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: background-color 0.3s ease, opacity 0.15s ease, transform 0.15s ease;\n  opacity: 1;\n  transform: scale(1);\n}\n.styles-module__mcpIndicator___zGJeL.styles-module__connected___7c28g {\n  background-color: var(--agentation-color-green);\n  animation: styles-module__mcpIndicatorPulseConnected___EDodZ 2.5s ease-in-out infinite;\n}\n.styles-module__mcpIndicator___zGJeL.styles-module__connecting___uo-CW {\n  background-color: var(--agentation-color-yellow);\n  animation: styles-module__mcpIndicatorPulseConnecting___cCYte 1.5s ease-in-out infinite;\n}\n.styles-module__mcpIndicator___zGJeL.styles-module__hidden___Ae8H4 {\n  opacity: 0;\n  transform: scale(0);\n  animation: none;\n}\n\n@keyframes styles-module__connectionPulse___-Zycw {\n  0%, 100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 0.6;\n    transform: scale(0.9);\n  }\n}\n.styles-module__connectionIndicatorWrapper___L-e-3 {\n  width: 8px;\n  height: 34px;\n  margin-left: 6px;\n  margin-right: 6px;\n}\n\n.styles-module__connectionIndicator___afk9p {\n  position: relative;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  opacity: 0;\n  transition: opacity 0.3s ease, background-color 0.3s ease;\n  cursor: default;\n}\n\n.styles-module__connectionIndicatorVisible___C-i5B {\n  opacity: 1;\n}\n\n.styles-module__connectionIndicatorConnected___IY8pR {\n  background-color: var(--agentation-color-green);\n  animation: styles-module__connectionPulse___-Zycw 2.5s ease-in-out infinite;\n}\n\n.styles-module__connectionIndicatorDisconnected___kmpaZ {\n  background-color: var(--agentation-color-red);\n  animation: none;\n}\n\n.styles-module__connectionIndicatorConnecting___QmSLH {\n  background-color: var(--agentation-color-yellow);\n  animation: styles-module__connectionPulse___-Zycw 1s ease-in-out infinite;\n}\n\n.styles-module__buttonWrapper___rBcdv {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {\n  opacity: 1;\n  visibility: visible;\n  transform: translateX(-50%) scale(1);\n  transition-delay: 0.85s;\n}\n.styles-module__buttonWrapper___rBcdv:has(.styles-module__controlButton___8Q0jc:disabled):hover .styles-module__buttonTooltip___Burd9 {\n  opacity: 0;\n  visibility: hidden;\n}\n\n.styles-module__tooltipsInSession___-0lHH .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {\n  transition-delay: 0s;\n}\n\n.styles-module__sendButtonWrapper___UUxG6 {\n  width: 0;\n  opacity: 0;\n  overflow: hidden;\n  pointer-events: none;\n  margin-left: -0.375rem;\n  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1), margin 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n}\n.styles-module__sendButtonWrapper___UUxG6 .styles-module__controlButton___8Q0jc {\n  transform: scale(0.8);\n  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n}\n.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU {\n  width: 34px;\n  opacity: 1;\n  overflow: visible;\n  pointer-events: auto;\n  margin-left: 0;\n}\n.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU .styles-module__controlButton___8Q0jc {\n  transform: scale(1);\n}\n\n.styles-module__buttonTooltip___Burd9 {\n  position: absolute;\n  bottom: calc(100% + 14px);\n  left: 50%;\n  transform: translateX(-50%) scale(0.95);\n  padding: 6px 10px;\n  background: #1a1a1a;\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 12px;\n  font-weight: 500;\n  border-radius: 8px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  z-index: 100001;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  transition: opacity 0.135s ease, transform 0.135s ease, visibility 0.135s ease;\n}\n.styles-module__buttonTooltip___Burd9::after {\n  content: "";\n  position: absolute;\n  top: calc(100% - 4px);\n  left: 50%;\n  transform: translateX(-50%) rotate(45deg);\n  width: 8px;\n  height: 8px;\n  background: #1a1a1a;\n  border-radius: 0 0 2px 0;\n}\n\n.styles-module__shortcut___lEAQk {\n  margin-left: 4px;\n  opacity: 0.5;\n}\n\n.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9 {\n  bottom: auto;\n  top: calc(100% + 14px);\n  transform: translateX(-50%) scale(0.95);\n}\n.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9::after {\n  top: -4px;\n  bottom: auto;\n  border-radius: 2px 0 0 0;\n}\n\n.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(-50%) scale(1);\n}\n\n.styles-module__tooltipsHidden___VtLJG .styles-module__buttonTooltip___Burd9 {\n  opacity: 0 !important;\n  visibility: hidden !important;\n  transition: none !important;\n}\n\n.styles-module__tooltipVisible___0jcCv,\n.styles-module__tooltipsHidden___VtLJG .styles-module__tooltipVisible___0jcCv {\n  opacity: 1 !important;\n  visibility: visible !important;\n  transform: translateX(-50%) scale(1) !important;\n  transition-delay: 0s !important;\n}\n\n.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {\n  left: 50%;\n  transform: translateX(-12px) scale(0.95);\n}\n.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9::after {\n  left: 16px;\n}\n.styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(-12px) scale(1);\n}\n\n.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(-12px) scale(0.95);\n}\n.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(-12px) scale(1);\n}\n\n.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {\n  left: 50%;\n  transform: translateX(calc(-100% + 12px)) scale(0.95);\n}\n.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9::after {\n  left: auto;\n  right: 8px;\n}\n.styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(calc(-100% + 12px)) scale(1);\n}\n\n.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(calc(-100% + 12px)) scale(0.95);\n}\n.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {\n  transform: translateX(calc(-100% + 12px)) scale(1);\n}\n\n.styles-module__divider___c--s1 {\n  width: 1px;\n  height: 12px;\n  background: rgba(255, 255, 255, 0.15);\n  margin: 0 0.125rem;\n}\n\n.styles-module__overlay___Q1O9y {\n  position: fixed;\n  inset: 0;\n  z-index: 99997;\n  pointer-events: none;\n}\n.styles-module__overlay___Q1O9y > * {\n  pointer-events: auto;\n}\n\n.styles-module__hoverHighlight___ogakW {\n  position: fixed;\n  border: 2px solid color-mix(in srgb, var(--agentation-color-accent) 50%, transparent);\n  border-radius: 4px;\n  background-color: color-mix(in srgb, var(--agentation-color-accent) 4%, transparent);\n  pointer-events: none !important;\n  box-sizing: border-box;\n  will-change: opacity;\n  contain: layout style;\n}\n.styles-module__hoverHighlight___ogakW.styles-module__enter___WFIki {\n  animation: styles-module__hoverHighlightIn___6WYHY 0.12s ease-out forwards;\n}\n\n.styles-module__multiSelectOutline___cSJ-m {\n  position: fixed;\n  border: 2px dashed color-mix(in srgb, var(--agentation-color-green) 60%, transparent);\n  border-radius: 4px;\n  pointer-events: none !important;\n  background-color: color-mix(in srgb, var(--agentation-color-green) 5%, transparent);\n  box-sizing: border-box;\n  will-change: opacity;\n}\n.styles-module__multiSelectOutline___cSJ-m.styles-module__enter___WFIki {\n  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;\n}\n.styles-module__multiSelectOutline___cSJ-m.styles-module__exit___fyOJ0 {\n  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;\n}\n\n.styles-module__singleSelectOutline___QhX-O {\n  position: fixed;\n  border: 2px solid color-mix(in srgb, var(--agentation-color-blue) 60%, transparent);\n  border-radius: 4px;\n  pointer-events: none !important;\n  background-color: color-mix(in srgb, var(--agentation-color-blue) 5%, transparent);\n  box-sizing: border-box;\n  will-change: opacity;\n}\n.styles-module__singleSelectOutline___QhX-O.styles-module__enter___WFIki {\n  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;\n}\n.styles-module__singleSelectOutline___QhX-O.styles-module__exit___fyOJ0 {\n  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;\n}\n\n.styles-module__hoverTooltip___bvLk7 {\n  position: fixed;\n  font-size: 0.6875rem;\n  font-weight: 500;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.85);\n  padding: 0.35rem 0.6rem;\n  border-radius: 0.375rem;\n  pointer-events: none !important;\n  white-space: nowrap;\n  max-width: 280px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.styles-module__hoverTooltip___bvLk7.styles-module__enter___WFIki {\n  animation: styles-module__hoverTooltipIn___FYGQx 0.1s ease-out forwards;\n}\n\n.styles-module__hoverReactPath___gx1IJ {\n  font-size: 0.625rem;\n  color: rgba(255, 255, 255, 0.6);\n  margin-bottom: 0.15rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.styles-module__hoverElementName___QMLMl {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.styles-module__markersLayer___-25j1 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 0;\n  z-index: 99998;\n  pointer-events: none;\n}\n.styles-module__markersLayer___-25j1 > * {\n  pointer-events: auto;\n}\n\n.styles-module__fixedMarkersLayer___ffyX6 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99998;\n  pointer-events: none;\n}\n.styles-module__fixedMarkersLayer___ffyX6 > * {\n  pointer-events: auto;\n}\n\n.styles-module__marker___6sQrs {\n  position: absolute;\n  width: 22px;\n  height: 22px;\n  background: var(--agentation-color-blue);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  transform: translate(-50%, -50%) scale(1);\n  opacity: 1;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);\n  user-select: none;\n  will-change: transform, opacity;\n  contain: layout style;\n  z-index: 1;\n}\n.styles-module__marker___6sQrs:hover {\n  z-index: 2;\n}\n.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7) {\n  transition: background-color 0.15s ease, transform 0.1s ease;\n}\n.styles-module__marker___6sQrs.styles-module__enter___WFIki {\n  animation: styles-module__markerIn___5FaAP 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.styles-module__marker___6sQrs.styles-module__exit___fyOJ0 {\n  animation: styles-module__markerOut___GU5jX 0.2s ease-out both;\n  pointer-events: none;\n}\n.styles-module__marker___6sQrs.styles-module__clearing___FQ--7 {\n  animation: styles-module__markerOut___GU5jX 0.15s ease-out both;\n  pointer-events: none;\n}\n.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7):hover {\n  transform: translate(-50%, -50%) scale(1.1);\n}\n.styles-module__marker___6sQrs.styles-module__pending___2IHLC {\n  position: fixed;\n  background-color: var(--agentation-color-blue);\n  cursor: default;\n}\n.styles-module__marker___6sQrs.styles-module__fixed___dBMHC {\n  position: fixed;\n}\n.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz {\n  background-color: var(--agentation-color-green);\n  width: 26px;\n  height: 26px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n}\n.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz.styles-module__pending___2IHLC {\n  background-color: var(--agentation-color-green);\n}\n.styles-module__marker___6sQrs.styles-module__hovered___ZgXIy {\n  background-color: var(--agentation-color-red);\n}\n\n.styles-module__renumber___nCTxD {\n  display: block;\n  animation: styles-module__renumberRoll___Wgbq3 0.2s ease-out;\n}\n\n@keyframes styles-module__renumberRoll___Wgbq3 {\n  0% {\n    transform: translateX(-40%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.styles-module__markerTooltip___aLJID {\n  position: absolute;\n  top: calc(100% + 10px);\n  left: 50%;\n  transform: translateX(-50%) scale(0.909);\n  z-index: 100002;\n  background: #1a1a1a;\n  padding: 8px 0.75rem;\n  border-radius: 0.75rem;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  font-weight: 400;\n  color: #fff;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);\n  min-width: 120px;\n  max-width: 200px;\n  pointer-events: none;\n  cursor: default;\n}\n.styles-module__markerTooltip___aLJID.styles-module__enter___WFIki {\n  animation: styles-module__tooltipIn___0N31w 0.1s ease-out forwards;\n}\n\n.styles-module__markerQuote___FHmrz {\n  display: block;\n  font-size: 12px;\n  font-style: italic;\n  color: rgba(255, 255, 255, 0.6);\n  margin-bottom: 0.3125rem;\n  line-height: 1.4;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.styles-module__markerNote___QkrrS {\n  display: block;\n  font-size: 13px;\n  font-weight: 400;\n  line-height: 1.4;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding-bottom: 2px;\n}\n\n.styles-module__markerHint___2iF-6 {\n  display: block;\n  font-size: 0.625rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.6);\n  margin-top: 0.375rem;\n  white-space: nowrap;\n}\n\n.styles-module__settingsPanel___OxX3Y {\n  position: absolute;\n  right: 5px;\n  bottom: calc(100% + 0.5rem);\n  z-index: 1;\n  overflow: hidden;\n  background: #1c1c1c;\n  border-radius: 1rem;\n  padding: 13px 0 16px;\n  min-width: 205px;\n  cursor: default;\n  opacity: 1;\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);\n  transition: background-color 0.25s ease, box-shadow 0.25s ease;\n}\n.styles-module__settingsPanel___OxX3Y::before, .styles-module__settingsPanel___OxX3Y::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 16px;\n  z-index: 2;\n  pointer-events: none;\n}\n.styles-module__settingsPanel___OxX3Y::before {\n  left: 0;\n  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);\n}\n.styles-module__settingsPanel___OxX3Y::after {\n  right: 0;\n  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);\n}\n.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9,\n.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM,\n.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18,\n.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq,\n.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2,\n.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX,\n.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw,\n.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY,\n.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz,\n.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa,\n.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax,\n.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr,\n.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp,\n.styles-module__settingsPanel___OxX3Y .styles-module__themeToggle___2rUjA {\n  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;\n}\n.styles-module__settingsPanel___OxX3Y.styles-module__enter___WFIki {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  filter: blur(0px);\n  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;\n}\n.styles-module__settingsPanel___OxX3Y.styles-module__exit___fyOJ0 {\n  opacity: 0;\n  transform: translateY(8px) scale(0.95);\n  filter: blur(5px);\n  pointer-events: none;\n  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y {\n  background: #1a1a1a;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX {\n  color: rgba(255, 255, 255, 0.6);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12 {\n  color: rgba(255, 255, 255, 0.85);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {\n  background: rgba(255, 255, 255, 0.15);\n  color: #fff;\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n.styles-module__settingsPanelContainer___Xksv8 {\n  overflow: visible;\n  position: relative;\n  display: flex;\n  padding: 0 1rem;\n}\n\n.styles-module__settingsPage___6YfHH {\n  min-width: 100%;\n  flex-shrink: 0;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n  transition-delay: 0s;\n  opacity: 1;\n}\n\n.styles-module__settingsPage___6YfHH.styles-module__slideLeft___Ps01J {\n  transform: translateX(-24px);\n  opacity: 0;\n  pointer-events: none;\n}\n\n.styles-module__automationsPage___uvCq6 {\n  position: absolute;\n  top: 0;\n  left: 24px;\n  width: 100%;\n  height: 100%;\n  padding: 3px 1rem 0;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.styles-module__automationsPage___uvCq6.styles-module__slideIn___4-qXe {\n  transform: translateX(-24px);\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.styles-module__settingsNavLink___wCzJt {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: 0;\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  transition: color 0.15s ease;\n}\n.styles-module__settingsNavLink___wCzJt:hover {\n  color: rgba(255, 255, 255, 0.9);\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt {\n  color: rgba(0, 0, 0, 0.5);\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n.styles-module__settingsNavLink___wCzJt svg {\n  color: rgba(255, 255, 255, 0.4);\n  transition: color 0.15s ease;\n}\n.styles-module__settingsNavLink___wCzJt:hover svg {\n  color: #fff;\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt svg {\n  color: rgba(0, 0, 0, 0.25);\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover svg {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.styles-module__settingsNavLinkRight___ZWwhj {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.styles-module__mcpNavIndicator___cl9pO {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.styles-module__mcpNavIndicator___cl9pO.styles-module__connected___7c28g {\n  background-color: var(--agentation-color-green);\n  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;\n}\n.styles-module__mcpNavIndicator___cl9pO.styles-module__connecting___uo-CW {\n  background-color: var(--agentation-color-yellow);\n  animation: styles-module__mcpPulse___uNggr 1.5s ease-in-out infinite;\n}\n\n.styles-module__settingsBackButton___bIe2j {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 0 12px 0;\n  margin: -6px 0 0.5rem 0;\n  border: none;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 0;\n  background: transparent;\n  font-family: inherit;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  letter-spacing: -0.15px;\n  color: #fff;\n  cursor: pointer;\n  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);\n}\n.styles-module__settingsBackButton___bIe2j svg {\n  opacity: 0.4;\n  flex-shrink: 0;\n  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);\n}\n.styles-module__settingsBackButton___bIe2j:hover {\n  border-bottom-color: rgba(255, 255, 255, 0.07);\n}\n.styles-module__settingsBackButton___bIe2j:hover svg {\n  opacity: 1;\n}\n[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j {\n  color: rgba(0, 0, 0, 0.85);\n  border-bottom-color: rgba(0, 0, 0, 0.08);\n}\n[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j:hover {\n  border-bottom-color: rgba(0, 0, 0, 0.08);\n}\n\n.styles-module__automationHeader___InP0r {\n  display: flex;\n  align-items: center;\n  gap: 0.125rem;\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: #fff;\n}\n[data-agentation-theme=light] .styles-module__automationHeader___InP0r {\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.styles-module__automationDescription___NKlmo {\n  font-size: 0.6875rem;\n  font-weight: 300;\n  color: rgba(255, 255, 255, 0.5);\n  margin-top: 2px;\n  line-height: 14px;\n}\n[data-agentation-theme=light] .styles-module__automationDescription___NKlmo {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__learnMoreLink___8xv-x {\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: underline dotted;\n  text-decoration-color: rgba(255, 255, 255, 0.2);\n  text-underline-offset: 2px;\n  transition: color 0.15s ease;\n}\n.styles-module__learnMoreLink___8xv-x:hover {\n  color: #fff;\n}\n[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x {\n  color: rgba(0, 0, 0, 0.6);\n  text-decoration-color: rgba(0, 0, 0, 0.2);\n}\n[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x:hover {\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.styles-module__autoSendRow___UblX5 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.styles-module__autoSendLabel___icDc2 {\n  font-size: 0.6875rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.4);\n  transition: color 0.15s ease;\n}\n.styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {\n  color: #66b8ff;\n  color: color(display-p3 0.4 0.72 1);\n}\n[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2 {\n  color: rgba(0, 0, 0, 0.4);\n}\n[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {\n  color: var(--agentation-color-blue);\n}\n\n.styles-module__webhookUrlInput___2375C {\n  display: block;\n  width: 100%;\n  flex: 1;\n  min-height: 60px;\n  box-sizing: border-box;\n  margin-top: 11px;\n  padding: 8px 10px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.03);\n  font-family: inherit;\n  font-size: 0.75rem;\n  font-weight: 400;\n  color: #fff;\n  outline: none;\n  resize: none;\n  user-select: text;\n  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;\n}\n.styles-module__webhookUrlInput___2375C::placeholder {\n  color: rgba(255, 255, 255, 0.3);\n}\n.styles-module__webhookUrlInput___2375C:focus {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgba(255, 255, 255, 0.08);\n}\n[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C {\n  border-color: rgba(0, 0, 0, 0.1);\n  background: rgba(0, 0, 0, 0.03);\n  color: rgba(0, 0, 0, 0.85);\n}\n[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C::placeholder {\n  color: rgba(0, 0, 0, 0.3);\n}\n[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C:focus {\n  border-color: rgba(0, 0, 0, 0.25);\n  background: rgba(0, 0, 0, 0.05);\n}\n\n.styles-module__settingsHeader___pwDY9 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 24px;\n  margin-bottom: 0.5rem;\n  padding-bottom: 9px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n}\n\n.styles-module__settingsBrand___0gJeM {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  letter-spacing: -0.0094em;\n  color: #fff;\n  text-decoration: none;\n}\n\n.styles-module__settingsBrandSlash___uTG18 {\n  color: var(--agentation-color-accent);\n  transition: color 0.2s ease;\n}\n\n.styles-module__settingsVersion___TUcFq {\n  font-size: 11px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.4);\n  margin-left: auto;\n  letter-spacing: -0.0094em;\n}\n\n.styles-module__settingsSection___m-YM2 + .styles-module__settingsSection___m-YM2 {\n  margin-top: 0.5rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.07);\n}\n.styles-module__settingsSection___m-YM2.styles-module__settingsSectionExtraPadding___jdhFV {\n  padding-top: calc(0.5rem + 4px);\n}\n\n.styles-module__settingsSectionGrow___h-5HZ {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.styles-module__settingsRow___3sdhc {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 24px;\n}\n.styles-module__settingsRow___3sdhc.styles-module__settingsRowMarginTop___zA0Sp {\n  margin-top: 8px;\n}\n\n.styles-module__dropdownContainer___BVnxe {\n  position: relative;\n}\n\n.styles-module__dropdownButton___16NPz {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.25rem 0.5rem;\n  border: none;\n  border-radius: 0.375rem;\n  background: transparent;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #fff;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n  letter-spacing: -0.0094em;\n}\n.styles-module__dropdownButton___16NPz:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.styles-module__dropdownButton___16NPz svg {\n  opacity: 0.6;\n}\n\n.styles-module__cycleButton___FMKfw {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0;\n  border: none;\n  background: transparent;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: #fff;\n  cursor: pointer;\n  letter-spacing: -0.0094em;\n}\n[data-agentation-theme=light] .styles-module__cycleButton___FMKfw {\n  color: rgba(0, 0, 0, 0.85);\n}\n.styles-module__cycleButton___FMKfw:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n\n.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {\n  color: rgba(255, 255, 255, 0.2);\n}\n[data-agentation-theme=light] .styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {\n  color: rgba(0, 0, 0, 0.2);\n}\n.styles-module__settingsRowDisabled___EgS0V .styles-module__toggleSwitch___l4Ygm {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n@keyframes styles-module__cycleTextIn___Q6zJf {\n  0% {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.styles-module__cycleButtonText___fD1LR {\n  display: inline-block;\n  animation: styles-module__cycleTextIn___Q6zJf 0.2s ease-out;\n}\n\n.styles-module__cycleDots___LWuoQ {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.styles-module__cycleDot___nPgLY {\n  width: 3px;\n  height: 3px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.3);\n  transform: scale(0.667);\n  transition: background-color 0.25s ease-out, transform 0.25s ease-out;\n}\n.styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {\n  background: #fff;\n  transform: scale(1);\n}\n[data-agentation-theme=light] .styles-module__cycleDot___nPgLY {\n  background: rgba(0, 0, 0, 0.2);\n}\n[data-agentation-theme=light] .styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.styles-module__dropdownMenu___k73ER {\n  position: absolute;\n  right: 0;\n  top: calc(100% + 0.25rem);\n  background: #1a1a1a;\n  border-radius: 0.5rem;\n  padding: 0.25rem;\n  min-width: 120px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);\n  z-index: 10;\n  animation: styles-module__scaleIn___c-r1K 0.15s ease-out;\n}\n\n.styles-module__dropdownItem___ylsLj {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0.625rem;\n  border: none;\n  border-radius: 0.375rem;\n  background: transparent;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, 0.85);\n  cursor: pointer;\n  text-align: left;\n  transition: background-color 0.15s ease, color 0.15s ease;\n  letter-spacing: -0.0094em;\n}\n.styles-module__dropdownItem___ylsLj:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.styles-module__dropdownItem___ylsLj.styles-module__selected___OwRqP {\n  background: rgba(255, 255, 255, 0.12);\n  color: #fff;\n  font-weight: 600;\n}\n\n.styles-module__settingsLabel___8UjfX {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  letter-spacing: -0.0094em;\n  color: rgba(255, 255, 255, 0.5);\n  display: flex;\n  align-items: center;\n  gap: 0.125rem;\n}\n[data-agentation-theme=light] .styles-module__settingsLabel___8UjfX {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__settingsLabelMarker___ewdtV {\n  padding-top: 3px;\n  margin-bottom: 10px;\n}\n\n.styles-module__settingsOptions___LyrBA {\n  display: flex;\n  gap: 0.25rem;\n}\n\n.styles-module__settingsOption___UNa12 {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.25rem;\n  padding: 0.375rem 0.5rem;\n  border: none;\n  border-radius: 0.375rem;\n  background: transparent;\n  font-size: 0.6875rem;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.7);\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n.styles-module__settingsOption___UNa12:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {\n  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);\n  color: var(--agentation-color-blue);\n}\n\n.styles-module__sliderContainer___ducXj {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.styles-module__slider___GLdxp {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.15);\n  border-radius: 2px;\n  outline: none;\n  cursor: pointer;\n}\n.styles-module__slider___GLdxp::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 14px;\n  height: 14px;\n  background: white;\n  border-radius: 50%;\n  cursor: pointer;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n.styles-module__slider___GLdxp::-moz-range-thumb {\n  width: 14px;\n  height: 14px;\n  background: white;\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n.styles-module__slider___GLdxp:hover::-webkit-slider-thumb {\n  transform: scale(1.15);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n}\n.styles-module__slider___GLdxp:hover::-moz-range-thumb {\n  transform: scale(1.15);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n}\n\n.styles-module__sliderLabels___FhLDB {\n  display: flex;\n  justify-content: space-between;\n}\n\n.styles-module__sliderLabel___U8sPr {\n  font-size: 0.625rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, 0.4);\n  cursor: pointer;\n  transition: color 0.15s ease;\n}\n.styles-module__sliderLabel___U8sPr:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n.styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.styles-module__colorOptions___iHCNX {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 0.375rem;\n  margin-bottom: 1px;\n}\n\n.styles-module__colorOption___IodiY {\n  display: block;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 2px solid transparent;\n  background-color: var(--swatch);\n  cursor: pointer;\n  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);\n}\n@supports (color: color(display-p3 0 0 0)) {\n  .styles-module__colorOption___IodiY {\n    background-color: var(--swatch-p3);\n  }\n}\n.styles-module__colorOption___IodiY:hover {\n  transform: scale(1.15);\n}\n.styles-module__colorOption___IodiY.styles-module__selected___OwRqP {\n  transform: scale(0.83);\n}\n\n.styles-module__colorOptionRing___U2xpo {\n  display: flex;\n  width: 24px;\n  height: 24px;\n  border: 2px solid transparent;\n  border-radius: 50%;\n  transition: border-color 0.3s ease;\n}\n.styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {\n  border-color: var(--swatch);\n}\n@supports (color: color(display-p3 0 0 0)) {\n  .styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {\n    border-color: var(--swatch-p3);\n  }\n}\n\n.styles-module__settingsToggle___fBrFn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n}\n.styles-module__settingsToggle___fBrFn + .styles-module__settingsToggle___fBrFn {\n  margin-top: calc(0.5rem + 6px);\n}\n.styles-module__settingsToggle___fBrFn input[type=checkbox] {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.styles-module__settingsToggle___fBrFn.styles-module__settingsToggleMarginBottom___MZUyF {\n  margin-bottom: calc(0.5rem + 6px);\n}\n\n.styles-module__customCheckbox___U39ax {\n  position: relative;\n  width: 14px;\n  height: 14px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n  background: rgba(255, 255, 255, 0.05);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background-color 0.25s ease, border-color 0.25s ease;\n}\n.styles-module__customCheckbox___U39ax svg {\n  color: #1a1a1a;\n  opacity: 1;\n  transition: opacity 0.15s ease;\n}\ninput[type=checkbox]:checked + .styles-module__customCheckbox___U39ax {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgb(255, 255, 255);\n}\n[data-agentation-theme=light] .styles-module__customCheckbox___U39ax {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  background: #fff;\n}\n[data-agentation-theme=light] .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo {\n  border-color: #1a1a1a;\n  background: #1a1a1a;\n}\n[data-agentation-theme=light] .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo svg {\n  color: #fff;\n}\n\n.styles-module__toggleLabel___Xm8Aa {\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.5);\n  letter-spacing: -0.0094em;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n[data-agentation-theme=light] .styles-module__toggleLabel___Xm8Aa {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__toggleSwitch___l4Ygm {\n  position: relative;\n  display: inline-block;\n  width: 24px;\n  height: 16px;\n  flex-shrink: 0;\n  cursor: pointer;\n  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.styles-module__toggleSwitch___l4Ygm input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn {\n  background-color: var(--agentation-color-blue);\n}\n.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn::before {\n  transform: translateX(8px);\n}\n.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw {\n  opacity: 0.4;\n}\n.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw .styles-module__toggleSlider___wprIn {\n  cursor: not-allowed;\n}\n\n.styles-module__toggleSlider___wprIn {\n  position: absolute;\n  cursor: pointer;\n  inset: 0;\n  border-radius: 16px;\n  background: #484848;\n}\n[data-agentation-theme=light] .styles-module__toggleSlider___wprIn {\n  background: #dddddd;\n}\n.styles-module__toggleSlider___wprIn::before {\n  content: "";\n  position: absolute;\n  height: 12px;\n  width: 12px;\n  left: 2px;\n  bottom: 2px;\n  background: white;\n  border-radius: 50%;\n  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n@keyframes styles-module__mcpPulse___uNggr {\n  0% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);\n  }\n  70% {\n    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);\n  }\n  100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);\n  }\n}\n@keyframes styles-module__mcpPulseError___fov9B {\n  0% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);\n  }\n  70% {\n    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);\n  }\n  100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);\n  }\n}\n.styles-module__mcpStatusDot___ibgkc {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.styles-module__mcpStatusDot___ibgkc.styles-module__connecting___uo-CW {\n  background-color: var(--agentation-color-yellow);\n  animation: styles-module__mcpPulse___uNggr 1.5s infinite;\n}\n.styles-module__mcpStatusDot___ibgkc.styles-module__connected___7c28g {\n  background-color: var(--agentation-color-green);\n  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;\n}\n.styles-module__mcpStatusDot___ibgkc.styles-module__disconnected___cHPxR {\n  background-color: var(--agentation-color-red);\n  animation: styles-module__mcpPulseError___fov9B 2s infinite;\n}\n\n.styles-module__drawCanvas___7cG9U {\n  position: fixed;\n  inset: 0;\n  z-index: 99996;\n  pointer-events: none !important;\n}\n.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6 {\n  pointer-events: auto !important;\n  cursor: crosshair !important;\n}\n.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6[data-stroke-hover] {\n  cursor: pointer !important;\n}\n\n.styles-module__dragSelection___kZLq2 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 60%, transparent);\n  border-radius: 4px;\n  background-color: color-mix(in srgb, var(--agentation-color-green) 8%, transparent);\n  pointer-events: none;\n  z-index: 99997;\n  will-change: transform, width, height;\n  contain: layout style;\n}\n\n.styles-module__dragCount___KM90j {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: var(--agentation-color-green);\n  color: white;\n  font-size: 0.875rem;\n  font-weight: 600;\n  padding: 0.25rem 0.5rem;\n  border-radius: 1rem;\n  min-width: 1.5rem;\n  text-align: center;\n}\n\n.styles-module__highlightsContainer___-0xzG {\n  position: fixed;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n  z-index: 99996;\n}\n\n.styles-module__selectedElementHighlight___fyVlI {\n  position: fixed;\n  top: 0;\n  left: 0;\n  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 50%, transparent);\n  border-radius: 4px;\n  background: color-mix(in srgb, var(--agentation-color-green) 6%, transparent);\n  pointer-events: none;\n  will-change: transform, width, height;\n  contain: layout style;\n}\n\n[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma {\n  background: #fff;\n  color: rgba(0, 0, 0, 0.85);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);\n}\n[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {\n  background: #f5f5f5;\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc {\n  color: rgba(0, 0, 0, 0.5);\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {\n  background: rgba(0, 0, 0, 0.06);\n  color: rgba(0, 0, 0, 0.85);\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-active=true] {\n  color: var(--agentation-color-blue);\n  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-error=true] {\n  color: var(--agentation-color-red);\n  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {\n  color: var(--agentation-color-red);\n  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-auto-sync=true] {\n  color: var(--agentation-color-green);\n  background: transparent;\n}\n[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-failed=true] {\n  color: var(--agentation-color-red);\n  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);\n}\n[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9 {\n  background: #fff;\n  color: rgba(0, 0, 0, 0.85);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);\n}\n[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9::after {\n  background: #fff;\n}\n[data-agentation-theme=light] .styles-module__divider___c--s1 {\n  background: rgba(0, 0, 0, 0.1);\n}';
      classNames5 = { "toolbar": "styles-module__toolbar___wNsdK", "markersLayer": "styles-module__markersLayer___-25j1", "fixedMarkersLayer": "styles-module__fixedMarkersLayer___ffyX6", "controlsContent": "styles-module__controlsContent___9GJWU", "disableTransitions": "styles-module__disableTransitions___EopxO", "toolbarContainer": "styles-module__toolbarContainer___dIhma", "entrance": "styles-module__entrance___sgHd8", "toolbarEnter": "styles-module__toolbarEnter___u8RRu", "hiding": "styles-module__hiding___1td44", "toolbarHide": "styles-module__toolbarHide___y8kaT", "collapsed": "styles-module__collapsed___Rydsn", "expanded": "styles-module__expanded___ofKPx", "serverConnected": "styles-module__serverConnected___Gfbou", "toggleContent": "styles-module__toggleContent___0yfyP", "visible": "styles-module__visible___KHwEW", "hidden": "styles-module__hidden___Ae8H4", "badge": "styles-module__badge___2XsgF", "fadeOut": "styles-module__fadeOut___6Ut6-", "badgeEnter": "styles-module__badgeEnter___mVQLj", "controlButton": "styles-module__controlButton___8Q0jc", "statusShowing": "styles-module__statusShowing___te6iu", "buttonBadge": "styles-module__buttonBadge___NeFWb", "mcpIndicator": "styles-module__mcpIndicator___zGJeL", "connected": "styles-module__connected___7c28g", "mcpIndicatorPulseConnected": "styles-module__mcpIndicatorPulseConnected___EDodZ", "connecting": "styles-module__connecting___uo-CW", "mcpIndicatorPulseConnecting": "styles-module__mcpIndicatorPulseConnecting___cCYte", "connectionIndicatorWrapper": "styles-module__connectionIndicatorWrapper___L-e-3", "connectionIndicator": "styles-module__connectionIndicator___afk9p", "connectionIndicatorVisible": "styles-module__connectionIndicatorVisible___C-i5B", "connectionIndicatorConnected": "styles-module__connectionIndicatorConnected___IY8pR", "connectionPulse": "styles-module__connectionPulse___-Zycw", "connectionIndicatorDisconnected": "styles-module__connectionIndicatorDisconnected___kmpaZ", "connectionIndicatorConnecting": "styles-module__connectionIndicatorConnecting___QmSLH", "buttonWrapper": "styles-module__buttonWrapper___rBcdv", "buttonTooltip": "styles-module__buttonTooltip___Burd9", "tooltipsInSession": "styles-module__tooltipsInSession___-0lHH", "sendButtonWrapper": "styles-module__sendButtonWrapper___UUxG6", "sendButtonVisible": "styles-module__sendButtonVisible___WPSQU", "shortcut": "styles-module__shortcut___lEAQk", "tooltipBelow": "styles-module__tooltipBelow___m6ats", "tooltipsHidden": "styles-module__tooltipsHidden___VtLJG", "tooltipVisible": "styles-module__tooltipVisible___0jcCv", "buttonWrapperAlignLeft": "styles-module__buttonWrapperAlignLeft___myzIp", "buttonWrapperAlignRight": "styles-module__buttonWrapperAlignRight___HCQFR", "divider": "styles-module__divider___c--s1", "overlay": "styles-module__overlay___Q1O9y", "hoverHighlight": "styles-module__hoverHighlight___ogakW", "enter": "styles-module__enter___WFIki", "hoverHighlightIn": "styles-module__hoverHighlightIn___6WYHY", "multiSelectOutline": "styles-module__multiSelectOutline___cSJ-m", "fadeIn": "styles-module__fadeIn___b9qmf", "exit": "styles-module__exit___fyOJ0", "singleSelectOutline": "styles-module__singleSelectOutline___QhX-O", "hoverTooltip": "styles-module__hoverTooltip___bvLk7", "hoverTooltipIn": "styles-module__hoverTooltipIn___FYGQx", "hoverReactPath": "styles-module__hoverReactPath___gx1IJ", "hoverElementName": "styles-module__hoverElementName___QMLMl", "marker": "styles-module__marker___6sQrs", "clearing": "styles-module__clearing___FQ--7", "markerIn": "styles-module__markerIn___5FaAP", "markerOut": "styles-module__markerOut___GU5jX", "pending": "styles-module__pending___2IHLC", "fixed": "styles-module__fixed___dBMHC", "multiSelect": "styles-module__multiSelect___YWiuz", "hovered": "styles-module__hovered___ZgXIy", "renumber": "styles-module__renumber___nCTxD", "renumberRoll": "styles-module__renumberRoll___Wgbq3", "markerTooltip": "styles-module__markerTooltip___aLJID", "tooltipIn": "styles-module__tooltipIn___0N31w", "markerQuote": "styles-module__markerQuote___FHmrz", "markerNote": "styles-module__markerNote___QkrrS", "markerHint": "styles-module__markerHint___2iF-6", "settingsPanel": "styles-module__settingsPanel___OxX3Y", "settingsHeader": "styles-module__settingsHeader___pwDY9", "settingsBrand": "styles-module__settingsBrand___0gJeM", "settingsBrandSlash": "styles-module__settingsBrandSlash___uTG18", "settingsVersion": "styles-module__settingsVersion___TUcFq", "settingsSection": "styles-module__settingsSection___m-YM2", "settingsLabel": "styles-module__settingsLabel___8UjfX", "cycleButton": "styles-module__cycleButton___FMKfw", "cycleDot": "styles-module__cycleDot___nPgLY", "dropdownButton": "styles-module__dropdownButton___16NPz", "toggleLabel": "styles-module__toggleLabel___Xm8Aa", "customCheckbox": "styles-module__customCheckbox___U39ax", "sliderLabel": "styles-module__sliderLabel___U8sPr", "slider": "styles-module__slider___GLdxp", "themeToggle": "styles-module__themeToggle___2rUjA", "settingsOption": "styles-module__settingsOption___UNa12", "selected": "styles-module__selected___OwRqP", "settingsPanelContainer": "styles-module__settingsPanelContainer___Xksv8", "settingsPage": "styles-module__settingsPage___6YfHH", "slideLeft": "styles-module__slideLeft___Ps01J", "automationsPage": "styles-module__automationsPage___uvCq6", "slideIn": "styles-module__slideIn___4-qXe", "settingsNavLink": "styles-module__settingsNavLink___wCzJt", "settingsNavLinkRight": "styles-module__settingsNavLinkRight___ZWwhj", "mcpNavIndicator": "styles-module__mcpNavIndicator___cl9pO", "mcpPulse": "styles-module__mcpPulse___uNggr", "settingsBackButton": "styles-module__settingsBackButton___bIe2j", "automationHeader": "styles-module__automationHeader___InP0r", "automationDescription": "styles-module__automationDescription___NKlmo", "learnMoreLink": "styles-module__learnMoreLink___8xv-x", "autoSendRow": "styles-module__autoSendRow___UblX5", "autoSendLabel": "styles-module__autoSendLabel___icDc2", "active": "styles-module__active___-zoN6", "webhookUrlInput": "styles-module__webhookUrlInput___2375C", "settingsSectionExtraPadding": "styles-module__settingsSectionExtraPadding___jdhFV", "settingsSectionGrow": "styles-module__settingsSectionGrow___h-5HZ", "settingsRow": "styles-module__settingsRow___3sdhc", "settingsRowMarginTop": "styles-module__settingsRowMarginTop___zA0Sp", "dropdownContainer": "styles-module__dropdownContainer___BVnxe", "settingsRowDisabled": "styles-module__settingsRowDisabled___EgS0V", "toggleSwitch": "styles-module__toggleSwitch___l4Ygm", "cycleButtonText": "styles-module__cycleButtonText___fD1LR", "cycleTextIn": "styles-module__cycleTextIn___Q6zJf", "cycleDots": "styles-module__cycleDots___LWuoQ", "dropdownMenu": "styles-module__dropdownMenu___k73ER", "scaleIn": "styles-module__scaleIn___c-r1K", "dropdownItem": "styles-module__dropdownItem___ylsLj", "settingsLabelMarker": "styles-module__settingsLabelMarker___ewdtV", "settingsOptions": "styles-module__settingsOptions___LyrBA", "sliderContainer": "styles-module__sliderContainer___ducXj", "sliderLabels": "styles-module__sliderLabels___FhLDB", "colorOptions": "styles-module__colorOptions___iHCNX", "colorOption": "styles-module__colorOption___IodiY", "colorOptionRing": "styles-module__colorOptionRing___U2xpo", "settingsToggle": "styles-module__settingsToggle___fBrFn", "settingsToggleMarginBottom": "styles-module__settingsToggleMarginBottom___MZUyF", "checked": "styles-module__checked___mnZLo", "toggleSlider": "styles-module__toggleSlider___wprIn", "disabled": "styles-module__disabled___332Jw", "mcpStatusDot": "styles-module__mcpStatusDot___ibgkc", "disconnected": "styles-module__disconnected___cHPxR", "mcpPulseError": "styles-module__mcpPulseError___fov9B", "drawCanvas": "styles-module__drawCanvas___7cG9U", "dragSelection": "styles-module__dragSelection___kZLq2", "dragCount": "styles-module__dragCount___KM90j", "highlightsContainer": "styles-module__highlightsContainer___-0xzG", "selectedElementHighlight": "styles-module__selectedElementHighlight___fyVlI", "scaleOut": "styles-module__scaleOut___Wctwz", "slideUp": "styles-module__slideUp___kgD36", "slideDown": "styles-module__slideDown___zcdje" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-page-toolbar-css-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-page-toolbar-css-styles";
          document.head.appendChild(style);
        }
        style.textContent = css5;
      }
      styles_module_default4 = classNames5;
      OUTPUT_DETAIL_OPTIONS = [
        { value: "compact", label: "Compact" },
        { value: "standard", label: "Standard" },
        { value: "detailed", label: "Detailed" },
        { value: "forensic", label: "Forensic" }
      ];
      css6 = '@keyframes styles-module__markerIn___x4G8D {\n  0% {\n    opacity: 0;\n    transform: translate(-50%, -50%) scale(0.3);\n  }\n  100% {\n    opacity: 1;\n    transform: translate(-50%, -50%) scale(1);\n  }\n}\n@keyframes styles-module__markerOut___6VhQN {\n  0% {\n    opacity: 1;\n    transform: translate(-50%, -50%) scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-50%, -50%) scale(0.3);\n  }\n}\n@keyframes styles-module__tooltipIn___aJslQ {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(2px) scale(0.891);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0) scale(0.909);\n  }\n}\n@keyframes styles-module__renumberRoll___akV9B {\n  0% {\n    transform: translateX(-40%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.styles-module__marker___9CKF7 {\n  position: absolute;\n  width: 22px;\n  height: 22px;\n  background: var(--agentation-color-blue);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  transform: translate(-50%, -50%) scale(1);\n  opacity: 1;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);\n  user-select: none;\n  will-change: transform, opacity;\n  contain: layout style;\n  z-index: 1;\n}\n.styles-module__marker___9CKF7:hover {\n  z-index: 2;\n}\n.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K) {\n  transition: background-color 0.15s ease, transform 0.1s ease;\n}\n.styles-module__marker___9CKF7.styles-module__enter___8kI3q {\n  animation: styles-module__markerIn___x4G8D 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.styles-module__marker___9CKF7.styles-module__exit___KBdR3 {\n  animation: styles-module__markerOut___6VhQN 0.2s ease-out both;\n  pointer-events: none;\n}\n.styles-module__marker___9CKF7.styles-module__clearing___8rM7K {\n  animation: styles-module__markerOut___6VhQN 0.15s ease-out both;\n  pointer-events: none;\n}\n.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):hover {\n  transform: translate(-50%, -50%) scale(1.1);\n}\n.styles-module__marker___9CKF7.styles-module__pending___BiY-U {\n  position: fixed;\n  background-color: var(--agentation-color-blue);\n  cursor: default;\n}\n.styles-module__marker___9CKF7.styles-module__fixed___aKrQO {\n  position: fixed;\n}\n.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC {\n  background-color: var(--agentation-color-green);\n  width: 26px;\n  height: 26px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n}\n.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC.styles-module__pending___BiY-U {\n  background-color: var(--agentation-color-green);\n}\n.styles-module__marker___9CKF7.styles-module__hovered___-mg2N {\n  background-color: var(--agentation-color-red);\n}\n\n.styles-module__renumber___16lvD {\n  display: block;\n  animation: styles-module__renumberRoll___akV9B 0.2s ease-out;\n}\n\n.styles-module__markerTooltip___-VUm- {\n  position: absolute;\n  top: calc(100% + 10px);\n  left: 50%;\n  transform: translateX(-50%) scale(0.909);\n  z-index: 100002;\n  background: #1a1a1a;\n  padding: 8px 0.75rem;\n  border-radius: 0.75rem;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n  font-weight: 400;\n  color: #fff;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);\n  min-width: 120px;\n  max-width: 200px;\n  pointer-events: none;\n  cursor: default;\n}\n.styles-module__markerTooltip___-VUm-.styles-module__enter___8kI3q {\n  animation: styles-module__tooltipIn___aJslQ 0.1s ease-out forwards;\n}\n\n.styles-module__markerQuote___tQake {\n  display: block;\n  font-size: 12px;\n  font-style: italic;\n  color: rgba(255, 255, 255, 0.6);\n  margin-bottom: 0.3125rem;\n  line-height: 1.4;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.styles-module__markerNote___Rh4eI {\n  display: block;\n  font-size: 13px;\n  font-weight: 400;\n  line-height: 1.4;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding-bottom: 2px;\n}\n\n[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- {\n  background: #fff;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);\n}\n[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- .styles-module__markerQuote___tQake {\n  color: rgba(0, 0, 0, 0.5);\n}\n[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- .styles-module__markerNote___Rh4eI {\n  color: rgba(0, 0, 0, 0.85);\n}';
      classNames6 = { "marker": "styles-module__marker___9CKF7", "enter": "styles-module__enter___8kI3q", "exit": "styles-module__exit___KBdR3", "clearing": "styles-module__clearing___8rM7K", "markerIn": "styles-module__markerIn___x4G8D", "markerOut": "styles-module__markerOut___6VhQN", "pending": "styles-module__pending___BiY-U", "fixed": "styles-module__fixed___aKrQO", "multiSelect": "styles-module__multiSelect___CPfTC", "hovered": "styles-module__hovered___-mg2N", "renumber": "styles-module__renumber___16lvD", "renumberRoll": "styles-module__renumberRoll___akV9B", "markerTooltip": "styles-module__markerTooltip___-VUm-", "tooltipIn": "styles-module__tooltipIn___aJslQ", "markerQuote": "styles-module__markerQuote___tQake", "markerNote": "styles-module__markerNote___Rh4eI" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-annotation-marker-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-annotation-marker-styles";
          document.head.appendChild(style);
        }
        style.textContent = css6;
      }
      styles_module_default5 = classNames6;
      css7 = ".styles-module__switchContainer___Ka-AB {\n  display: flex;\n  align-items: center;\n  position: relative;\n  padding: 2px;\n  width: 24px;\n  height: 16px;\n  border-radius: 8px;\n  background-color: #cdcdcd;\n  transition: background-color 0.15s, opacity 0.15s;\n}\n[data-agentation-theme=dark] .styles-module__switchContainer___Ka-AB {\n  background-color: #484848;\n}\n.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) {\n  background-color: var(--agentation-color-blue);\n}\n.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:disabled) {\n  opacity: 0.3;\n}\n\n.styles-module__switchInput___kYDSD {\n  position: absolute;\n  z-index: 1;\n  inset: 0;\n  border-radius: inherit;\n  opacity: 0;\n  cursor: pointer;\n}\n.styles-module__switchInput___kYDSD:disabled {\n  cursor: not-allowed;\n}\n\n.styles-module__switchThumb___4sCPH {\n  border-radius: 50%;\n  width: 12px;\n  height: 12px;\n  background-color: #fff;\n  transition: transform 0.15s;\n}\n.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) .styles-module__switchThumb___4sCPH {\n  transform: translateX(8px);\n}";
      classNames7 = { "switchContainer": "styles-module__switchContainer___Ka-AB", "switchInput": "styles-module__switchInput___kYDSD", "switchThumb": "styles-module__switchThumb___4sCPH" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-switch-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-switch-styles";
          document.head.appendChild(style);
        }
        style.textContent = css7;
      }
      styles_module_default6 = classNames7;
      Switch = ({ className = "", ...props }) => {
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: `${styles_module_default6.switchContainer} ${className}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("input", { className: styles_module_default6.switchInput, type: "checkbox", ...props }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: styles_module_default6.switchThumb })
        ] });
      };
      css8 = ".styles-module__checkboxContainer___joqZk {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  border: 1px solid rgba(26, 26, 26, 0.2);\n  border-radius: 4px;\n  width: 14px;\n  height: 14px;\n  background-color: #fff;\n  transition: background-color 0.2s ease;\n}\n[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk {\n  border-color: rgba(255, 255, 255, 0.2);\n  background-color: #252525;\n}\n.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {\n  background-color: #1a1a1a;\n}\n[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {\n  background-color: #fff;\n}\n\n.styles-module__checkboxInput___ECzzO {\n  position: absolute;\n  z-index: 1;\n  inset: -1px;\n  border-radius: inherit;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.styles-module__checkboxCheck___fUXpr {\n  color: #fafafa;\n}\n[data-agentation-theme=dark] .styles-module__checkboxCheck___fUXpr {\n  color: #1a1a1a;\n}\n\n.styles-module__checkboxCheckPath___cDyh8 {\n  stroke-dasharray: 9.29px;\n  stroke-dashoffset: 9.29px;\n  color: #fafafa;\n  transition: stroke-dashoffset 0.1s ease;\n}\n[data-agentation-theme=dark] .styles-module__checkboxCheckPath___cDyh8 {\n  color: #1a1a1a;\n}\n.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) .styles-module__checkboxCheckPath___cDyh8 {\n  transition-duration: 0.2s;\n  stroke-dashoffset: 0;\n}";
      classNames8 = { "checkboxContainer": "styles-module__checkboxContainer___joqZk", "checkboxInput": "styles-module__checkboxInput___ECzzO", "checkboxCheck": "styles-module__checkboxCheck___fUXpr", "checkboxCheckPath": "styles-module__checkboxCheckPath___cDyh8" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-checkbox-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-checkbox-styles";
          document.head.appendChild(style);
        }
        style.textContent = css8;
      }
      styles_module_default7 = classNames8;
      Checkbox = ({ className = "", ...props }) => {
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: `${styles_module_default7.checkboxContainer} ${className}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("input", { className: styles_module_default7.checkboxInput, type: "checkbox", ...props }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "svg",
            {
              className: styles_module_default7.checkboxCheck,
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              fill: "none",
              children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                "path",
                {
                  className: styles_module_default7.checkboxCheckPath,
                  d: "M3.94 7L6.13 9.19L10.5 4.81",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          )
        ] });
      };
      css9 = ".styles-module__container___w8eAF {\n  display: flex;\n  align-items: center;\n  height: 24px;\n}\n\n.styles-module__label___J5mxE {\n  padding-inline: 8px 2px;\n  line-height: 20px;\n  font-size: 13px;\n  letter-spacing: -0.15px;\n  color: rgba(26, 26, 26, 0.5);\n  cursor: pointer;\n}\n[data-agentation-theme=dark] .styles-module__label___J5mxE {\n  color: rgba(255, 255, 255, 0.5);\n}";
      classNames9 = { "container": "styles-module__container___w8eAF", "label": "styles-module__label___J5mxE" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-checkbox-field-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-checkbox-field-styles";
          document.head.appendChild(style);
        }
        style.textContent = css9;
      }
      styles_module_default8 = classNames9;
      CheckboxField = ({
        className = "",
        label,
        tooltip,
        checked,
        onChange,
        ...props
      }) => {
        const id = (0, import_react8.useId)();
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: `${styles_module_default8.container} ${className}`, ...props, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Checkbox, { id, onChange, checked }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { className: styles_module_default8.label, htmlFor: id, children: label }),
          tooltip && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(HelpTooltip, { content: tooltip })
        ] });
      };
      css10 = '@keyframes styles-module__cycleTextIn___VBNTi {\n  0% {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes styles-module__scaleIn___QpQ8E {\n  from {\n    opacity: 0;\n    transform: scale(0.85);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes styles-module__mcpPulse___5Q3Jj {\n  0% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);\n  }\n  70% {\n    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);\n  }\n  100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);\n  }\n}\n@keyframes styles-module__mcpPulseError___VHxhx {\n  0% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);\n  }\n  70% {\n    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);\n  }\n  100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);\n  }\n}\n@keyframes styles-module__themeIconIn___qUWMV {\n  0% {\n    opacity: 0;\n    transform: scale(0.8) rotate(-30deg);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1) rotate(0deg);\n  }\n}\n.styles-module__settingsPanel___qNkn- {\n  position: absolute;\n  right: 5px;\n  bottom: calc(100% + 0.5rem);\n  z-index: 1;\n  overflow: hidden;\n  background: #1c1c1c;\n  border-radius: 16px;\n  padding: 12px 0;\n  width: 100%;\n  max-width: 253px;\n  min-width: 205px;\n  cursor: default;\n  opacity: 1;\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);\n  transition: background-color 0.25s ease, box-shadow 0.25s ease;\n}\n.styles-module__settingsPanel___qNkn-::before, .styles-module__settingsPanel___qNkn-::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 16px;\n  z-index: 2;\n  pointer-events: none;\n}\n.styles-module__settingsPanel___qNkn-::before {\n  left: 0;\n  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);\n}\n.styles-module__settingsPanel___qNkn-::after {\n  right: 0;\n  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);\n}\n.styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP,\n.styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM,\n.styles-module__settingsPanel___qNkn- .styles-module__settingsBrandSlash___Q-AU9,\n.styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9,\n.styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4,\n.styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ,\n.styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3,\n.styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY,\n.styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8,\n.styles-module__settingsPanel___qNkn- .styles-module__sliderLabel___6K5v1,\n.styles-module__settingsPanel___qNkn- .styles-module__slider___v5z-c,\n.styles-module__settingsPanel___qNkn- .styles-module__themeToggle___3imlT {\n  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;\n}\n.styles-module__settingsPanel___qNkn-.styles-module__enter___wginS {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n  filter: blur(0px);\n  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;\n}\n.styles-module__settingsPanel___qNkn-.styles-module__exit___A4iJc {\n  opacity: 0;\n  transform: translateY(8px) scale(0.95);\n  filter: blur(5px);\n  pointer-events: none;\n  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- {\n  background: #1a1a1a;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {\n  color: rgba(255, 255, 255, 0.6);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH- {\n  color: rgba(255, 255, 255, 0.85);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-.styles-module__selected___k1-Vq {\n  background: rgba(255, 255, 255, 0.15);\n  color: #fff;\n}\n\n.styles-module__settingsPanelContainer___5it-H {\n  overflow: visible;\n  position: relative;\n  display: flex;\n  padding: 0 16px;\n}\n\n.styles-module__settingsPage___BMn-3 {\n  min-width: 100%;\n  flex-basis: 0;\n  flex-shrink: 0;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n  transition-delay: 0s;\n  opacity: 1;\n}\n\n.styles-module__settingsPage___BMn-3.styles-module__slideLeft___qUvW4 {\n  transform: translateX(-24px);\n  opacity: 0;\n  pointer-events: none;\n}\n\n.styles-module__automationsPage___N7By0 {\n  position: absolute;\n  top: 0;\n  left: 24px;\n  width: 100%;\n  height: 100%;\n  padding: 0 16px 4px;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.styles-module__automationsPage___N7By0.styles-module__slideIn___uXDSu {\n  transform: translateX(-24px);\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.styles-module__settingsHeader___Fn1DP {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 24px;\n}\n\n.styles-module__settingsBrand___OoKlM {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  letter-spacing: -0.0094em;\n  color: #fff;\n  text-decoration: none;\n}\n\n.styles-module__settingsBrandSlash___Q-AU9 {\n  color: var(--agentation-color-accent);\n  transition: color 0.2s ease;\n}\n\n.styles-module__settingsVersion___rXmL9 {\n  font-size: 11px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.4);\n  margin-left: auto;\n  letter-spacing: -0.0094em;\n}\n\n.styles-module__themeToggle___3imlT {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  margin-left: 8px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.4);\n  transition: background-color 0.15s ease, color 0.15s ease;\n  cursor: pointer;\n}\n.styles-module__themeToggle___3imlT:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: rgba(255, 255, 255, 0.8);\n}\n[data-agentation-theme=light] .styles-module__themeToggle___3imlT {\n  color: rgba(0, 0, 0, 0.4);\n}\n[data-agentation-theme=light] .styles-module__themeToggle___3imlT:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.styles-module__themeIconWrapper___pyaYa {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  width: 20px;\n  height: 20px;\n}\n\n.styles-module__themeIcon___w7lAm {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: styles-module__themeIconIn___qUWMV 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n}\n\n.styles-module__settingsSectionGrow___eZTRw {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.styles-module__settingsRow___y-tDE {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 24px;\n}\n.styles-module__settingsRow___y-tDE.styles-module__settingsRowMarginTop___uLpGb {\n  margin-top: 8px;\n}\n\n.styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {\n  color: rgba(255, 255, 255, 0.2);\n}\n[data-agentation-theme=light] .styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {\n  color: rgba(0, 0, 0, 0.2);\n}\n\n.styles-module__settingsLabel___VCVOQ {\n  display: flex;\n  align-items: center;\n  column-gap: 2px;\n  line-height: 20px;\n  font-size: 13px;\n  font-weight: 400;\n  letter-spacing: -0.15px;\n  color: rgba(255, 255, 255, 0.5);\n}\n[data-agentation-theme=light] .styles-module__settingsLabel___VCVOQ {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__cycleButton___XMBx3 {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0;\n  border: none;\n  background: transparent;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: #fff;\n  cursor: pointer;\n  letter-spacing: -0.0094em;\n}\n[data-agentation-theme=light] .styles-module__cycleButton___XMBx3 {\n  color: rgba(0, 0, 0, 0.85);\n}\n.styles-module__cycleButton___XMBx3:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n\n.styles-module__cycleButtonText___mbbnD {\n  display: inline-block;\n  animation: styles-module__cycleTextIn___VBNTi 0.2s ease-out;\n}\n\n.styles-module__cycleDots___ehp6i {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.styles-module__cycleDot___zgSXY {\n  width: 3px;\n  height: 3px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.3);\n  transform: scale(0.667);\n  transition: background-color 0.25s ease-out, transform 0.25s ease-out;\n}\n.styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {\n  background: #fff;\n  transform: scale(1);\n}\n[data-agentation-theme=light] .styles-module__cycleDot___zgSXY {\n  background: rgba(0, 0, 0, 0.2);\n}\n[data-agentation-theme=light] .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.styles-module__colorOptions___pbxZx {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 6px;\n  height: 26px;\n}\n\n.styles-module__colorOption___Co955 {\n  padding: 0;\n  position: relative;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  background-color: #fff;\n  cursor: pointer;\n}\n[data-agentation-theme=dark] .styles-module__colorOption___Co955 {\n  background-color: #1a1a1a;\n}\n.styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background-color: var(--swatch);\n  transition: opacity 0.2s, transform 0.2s;\n}\n@supports (color: color(display-p3 0 0 0)) {\n  .styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {\n    --color: var(--swatch-p3);\n  }\n}\n.styles-module__colorOption___Co955::after {\n  z-index: -1;\n  transform: scale(1.2);\n  opacity: 0;\n}\n.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::before {\n  transform: scale(0.8);\n}\n.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::after {\n  opacity: 1;\n}\n\n.styles-module__settingsNavLink___uYIwM {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  height: 24px;\n  padding: 0;\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  line-height: 20px;\n  font-size: 13px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.5);\n  transition: color 0.15s ease;\n  cursor: pointer;\n}\n.styles-module__settingsNavLink___uYIwM:hover {\n  color: rgba(255, 255, 255, 0.9);\n}\n.styles-module__settingsNavLink___uYIwM svg {\n  color: rgba(255, 255, 255, 0.4);\n  transition: color 0.15s ease;\n}\n.styles-module__settingsNavLink___uYIwM:hover svg {\n  color: #fff;\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM {\n  color: rgba(0, 0, 0, 0.5);\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover {\n  color: rgba(0, 0, 0, 0.8);\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM svg {\n  color: rgba(0, 0, 0, 0.25);\n}\n[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover svg {\n  color: rgba(0, 0, 0, 0.8);\n}\n\n.styles-module__settingsNavLinkRight___XBUzC {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.styles-module__settingsBackButton___fflll {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  height: 24px;\n  background: transparent;\n  font-family: inherit;\n  line-height: 20px;\n  font-size: 13px;\n  font-weight: 500;\n  letter-spacing: -0.15px;\n  color: #fff;\n  cursor: pointer;\n  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);\n}\n.styles-module__settingsBackButton___fflll svg {\n  opacity: 0.4;\n  flex-shrink: 0;\n  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);\n}\n.styles-module__settingsBackButton___fflll:hover svg {\n  opacity: 1;\n}\n[data-agentation-theme=light] .styles-module__settingsBackButton___fflll {\n  color: rgba(0, 0, 0, 0.85);\n  border-bottom-color: rgba(0, 0, 0, 0.08);\n}\n\n.styles-module__automationHeader___Avra9 {\n  display: flex;\n  align-items: center;\n  gap: 0.125rem;\n  font-size: 0.8125rem;\n  font-weight: 400;\n  color: #fff;\n}\n[data-agentation-theme=light] .styles-module__automationHeader___Avra9 {\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.styles-module__automationDescription___vFTmJ {\n  font-size: 0.6875rem;\n  font-weight: 300;\n  color: rgba(255, 255, 255, 0.5);\n  margin-top: 2px;\n  line-height: 14px;\n}\n[data-agentation-theme=light] .styles-module__automationDescription___vFTmJ {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.styles-module__learnMoreLink___cG7OI {\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration-line: underline;\n  text-decoration-style: dotted;\n  text-decoration-color: rgba(255, 255, 255, 0.2);\n  text-underline-offset: 2px;\n  transition: color 0.15s ease;\n}\n.styles-module__learnMoreLink___cG7OI:hover {\n  color: #fff;\n}\n[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI {\n  color: rgba(0, 0, 0, 0.6);\n  text-decoration-color: rgba(0, 0, 0, 0.2);\n}\n[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI:hover {\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.styles-module__autoSendContainer___VpkXk {\n  display: flex;\n  align-items: center;\n}\n\n.styles-module__autoSendLabel___ngNdC {\n  padding-inline-end: 8px;\n  font-size: 11px;\n  font-weight: 400;\n  color: rgba(255, 255, 255, 0.4);\n  transition: color 0.15s, opacity 0.15s;\n  cursor: pointer;\n}\n.styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {\n  color: #66b8ff;\n  color: color(display-p3 0.4 0.72 1);\n}\n[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC {\n  color: rgba(0, 0, 0, 0.4);\n}\n[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {\n  color: var(--agentation-color-blue);\n}\n.styles-module__autoSendLabel___ngNdC.styles-module__disabled___9AZYS {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n\n.styles-module__mcpStatusDot___8AMxP {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.styles-module__mcpStatusDot___8AMxP.styles-module__connecting___QEO1r {\n  background-color: var(--agentation-color-yellow);\n  animation: styles-module__mcpPulse___5Q3Jj 1.5s infinite;\n}\n.styles-module__mcpStatusDot___8AMxP.styles-module__connected___WyFkx {\n  background-color: var(--agentation-color-green);\n  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;\n}\n.styles-module__mcpStatusDot___8AMxP.styles-module__disconnected___mvmvQ {\n  background-color: var(--agentation-color-red);\n  animation: styles-module__mcpPulseError___VHxhx 2s infinite;\n}\n\n.styles-module__mcpNavIndicator___auBHI {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.styles-module__mcpNavIndicator___auBHI.styles-module__connected___WyFkx {\n  background-color: var(--agentation-color-green);\n  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;\n}\n.styles-module__mcpNavIndicator___auBHI.styles-module__connecting___QEO1r {\n  background-color: var(--agentation-color-yellow);\n  animation: styles-module__mcpPulse___5Q3Jj 1.5s ease-in-out infinite;\n}\n\n.styles-module__webhookUrlInput___WDDDC {\n  display: block;\n  width: 100%;\n  flex: 1;\n  min-height: 60px;\n  box-sizing: border-box;\n  margin-top: 11px;\n  padding: 8px 10px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.03);\n  font-family: inherit;\n  font-size: 0.75rem;\n  font-weight: 400;\n  color: #fff;\n  outline: none;\n  resize: none;\n  user-select: text;\n  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;\n}\n.styles-module__webhookUrlInput___WDDDC::placeholder {\n  color: rgba(255, 255, 255, 0.3);\n}\n.styles-module__webhookUrlInput___WDDDC:focus {\n  border-color: rgba(255, 255, 255, 0.3);\n  background: rgba(255, 255, 255, 0.08);\n}\n[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC {\n  border-color: rgba(0, 0, 0, 0.1);\n  background: rgba(0, 0, 0, 0.03);\n  color: rgba(0, 0, 0, 0.85);\n}\n[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC::placeholder {\n  color: rgba(0, 0, 0, 0.3);\n}\n[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC:focus {\n  border-color: rgba(0, 0, 0, 0.25);\n  background: rgba(0, 0, 0, 0.05);\n}\n\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- {\n  background: #fff;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::before {\n  background: linear-gradient(to right, #fff 0%, transparent 100%);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::after {\n  background: linear-gradient(to left, #fff 0%, transparent 100%);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP {\n  border-bottom-color: rgba(0, 0, 0, 0.08);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM {\n  color: #E5484D;\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9 {\n  color: rgba(0, 0, 0, 0.4);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4 {\n  border-top-color: rgba(0, 0, 0, 0.08);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {\n  color: rgba(0, 0, 0, 0.5);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3 {\n  color: rgba(0, 0, 0, 0.85);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY {\n  background: rgba(0, 0, 0, 0.2);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {\n  background: rgba(0, 0, 0, 0.7);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8 {\n  color: rgba(0, 0, 0, 0.85);\n}\n[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n\n.styles-module__checkboxField___ZrSqv:not(:first-child) {\n  margin-top: 8px;\n}\n\n.styles-module__divider___h6Yux {\n  margin-block: 8px;\n  width: 100%;\n  height: 1px;\n  background-color: rgba(26, 26, 26, 0.07);\n}\n[data-agentation-theme=dark] .styles-module__divider___h6Yux {\n  background-color: rgba(255, 255, 255, 0.07);\n}';
      classNames10 = { "settingsPanel": "styles-module__settingsPanel___qNkn-", "settingsHeader": "styles-module__settingsHeader___Fn1DP", "settingsBrand": "styles-module__settingsBrand___OoKlM", "settingsBrandSlash": "styles-module__settingsBrandSlash___Q-AU9", "settingsVersion": "styles-module__settingsVersion___rXmL9", "settingsSection": "styles-module__settingsSection___n5V-4", "settingsLabel": "styles-module__settingsLabel___VCVOQ", "cycleButton": "styles-module__cycleButton___XMBx3", "cycleDot": "styles-module__cycleDot___zgSXY", "dropdownButton": "styles-module__dropdownButton___mKHe8", "sliderLabel": "styles-module__sliderLabel___6K5v1", "slider": "styles-module__slider___v5z-c", "themeToggle": "styles-module__themeToggle___3imlT", "enter": "styles-module__enter___wginS", "exit": "styles-module__exit___A4iJc", "settingsOption": "styles-module__settingsOption___JoyH-", "selected": "styles-module__selected___k1-Vq", "settingsPanelContainer": "styles-module__settingsPanelContainer___5it-H", "settingsPage": "styles-module__settingsPage___BMn-3", "slideLeft": "styles-module__slideLeft___qUvW4", "automationsPage": "styles-module__automationsPage___N7By0", "slideIn": "styles-module__slideIn___uXDSu", "themeIconWrapper": "styles-module__themeIconWrapper___pyaYa", "themeIcon": "styles-module__themeIcon___w7lAm", "themeIconIn": "styles-module__themeIconIn___qUWMV", "settingsSectionGrow": "styles-module__settingsSectionGrow___eZTRw", "settingsRow": "styles-module__settingsRow___y-tDE", "settingsRowMarginTop": "styles-module__settingsRowMarginTop___uLpGb", "settingsRowDisabled": "styles-module__settingsRowDisabled___ydl3Q", "cycleButtonText": "styles-module__cycleButtonText___mbbnD", "cycleTextIn": "styles-module__cycleTextIn___VBNTi", "cycleDots": "styles-module__cycleDots___ehp6i", "active": "styles-module__active___dpAhM", "colorOptions": "styles-module__colorOptions___pbxZx", "colorOption": "styles-module__colorOption___Co955", "settingsNavLink": "styles-module__settingsNavLink___uYIwM", "settingsNavLinkRight": "styles-module__settingsNavLinkRight___XBUzC", "settingsBackButton": "styles-module__settingsBackButton___fflll", "automationHeader": "styles-module__automationHeader___Avra9", "automationDescription": "styles-module__automationDescription___vFTmJ", "learnMoreLink": "styles-module__learnMoreLink___cG7OI", "autoSendContainer": "styles-module__autoSendContainer___VpkXk", "autoSendLabel": "styles-module__autoSendLabel___ngNdC", "disabled": "styles-module__disabled___9AZYS", "mcpStatusDot": "styles-module__mcpStatusDot___8AMxP", "connecting": "styles-module__connecting___QEO1r", "mcpPulse": "styles-module__mcpPulse___5Q3Jj", "connected": "styles-module__connected___WyFkx", "disconnected": "styles-module__disconnected___mvmvQ", "mcpPulseError": "styles-module__mcpPulseError___VHxhx", "mcpNavIndicator": "styles-module__mcpNavIndicator___auBHI", "webhookUrlInput": "styles-module__webhookUrlInput___WDDDC", "checkboxField": "styles-module__checkboxField___ZrSqv", "divider": "styles-module__divider___h6Yux", "scaleIn": "styles-module__scaleIn___QpQ8E" };
      if (typeof document !== "undefined") {
        let style = document.getElementById("feedback-tool-styles-settings-panel-styles");
        if (!style) {
          style = document.createElement("style");
          style.id = "feedback-tool-styles-settings-panel-styles";
          document.head.appendChild(style);
        }
        style.textContent = css10;
      }
      styles_module_default9 = classNames10;
      hasPlayedEntranceAnimation = false;
      DEFAULT_SETTINGS = {
        outputDetail: "standard",
        autoClearAfterCopy: false,
        annotationColorId: "blue",
        blockInteractions: true,
        reactEnabled: true,
        markerClickBehavior: "edit",
        webhookUrl: "",
        webhooksEnabled: true
      };
      isValidUrl = (url) => {
        if (!url || !url.trim()) return false;
        try {
          const parsed = new URL(url.trim());
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      };
      OUTPUT_TO_REACT_MODE = {
        compact: "off",
        standard: "filtered",
        detailed: "smart",
        forensic: "all"
      };
      COLOR_OPTIONS = [
        { id: "indigo", label: "Indigo", srgb: "#6155F5", p3: "color(display-p3 0.38 0.33 0.96)" },
        { id: "blue", label: "Blue", srgb: "#0088FF", p3: "color(display-p3 0.00 0.53 1.00)" },
        { id: "cyan", label: "Cyan", srgb: "#00C3D0", p3: "color(display-p3 0.00 0.76 0.82)" },
        { id: "green", label: "Green", srgb: "#34C759", p3: "color(display-p3 0.20 0.78 0.35)" },
        { id: "yellow", label: "Yellow", srgb: "#FFCC00", p3: "color(display-p3 1.00 0.80 0.00)" },
        { id: "orange", label: "Orange", srgb: "#FF8D28", p3: "color(display-p3 1.00 0.55 0.16)" },
        { id: "red", label: "Red", srgb: "#FF383C", p3: "color(display-p3 1.00 0.22 0.24)" }
      ];
      injectAgentationColorTokens = () => {
        if (typeof document === "undefined") return;
        if (document.getElementById("agentation-color-tokens")) return;
        const style = document.createElement("style");
        style.id = "agentation-color-tokens";
        style.textContent = [
          ...COLOR_OPTIONS.map((c) => `
      [data-agentation-accent="${c.id}"] {
        --agentation-color-accent: ${c.srgb};
      }

      @supports (color: color(display-p3 0 0 0)) {
        [data-agentation-accent="${c.id}"] {
          --agentation-color-accent: ${c.p3};
        }
      }
    `),
          `:root {
      ${COLOR_OPTIONS.map((c) => `--agentation-color-${c.id}: ${c.srgb};`).join("\n")}
    }`,
          `@supports (color: color(display-p3 0 0 0)) {
      :root {
        ${COLOR_OPTIONS.map((c) => `--agentation-color-${c.id}: ${c.p3};`).join("\n")}
      }
    }`
        ].join("");
        document.head.appendChild(style);
      };
      injectAgentationColorTokens();
    }
  });

  // agentation-entry.js
  var require_agentation_entry = __commonJS({
    "agentation-entry.js"() {
      var import_react9 = __toESM(require_react());
      var import_client = __toESM(require_client());
      init_dist();
      var host = document.createElement("div");
      host.id = "agentation-root";
      document.body.appendChild(host);
      (0, import_client.createRoot)(host).render(
        import_react9.default.createElement(PageFeedbackToolbarCSS, {
          onSubmit: (output) => console.log("[agentation] annotations:\n" + output)
        })
      );
    }
  });
  require_agentation_entry();
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
