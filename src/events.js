var events = function() {
    "use strict";
    var gn = Object.defineProperty;
    var It = x => {
        throw TypeError(x)
    }
    ;
    var yn = (x, w, E) => w in x ? gn(x, w, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: E
    }) : x[w] = E;
    var it = (x, w, E) => yn(x, typeof w != "symbol" ? w + "" : w, E)
      , ot = (x, w, E) => w.has(x) || It("Cannot " + E);
    var Ze = (x, w, E) => (ot(x, w, "read from private field"),
    E ? E.call(x) : w.get(x))
      , Ie = (x, w, E) => w.has(x) ? It("Cannot add the same private member more than once") : w instanceof WeakSet ? w.add(x) : w.set(x, E)
      , jt = (x, w, E, F) => (ot(x, w, "write to private field"),
    F ? F.call(x, E) : w.set(x, E),
    E)
      , Ge = (x, w, E) => (ot(x, w, "access private method"),
    E);
    var Ct, Rt, qe, ae, Ye, K, At, dt;
    var x = typeof global == "object" && global && global.Object === Object && global
      , w = typeof self == "object" && self && self.Object === Object && self
      , E = x || w || Function("return this")()
      , F = E.Symbol
      , ct = Object.prototype
      , Lt = ct.hasOwnProperty
      , Pt = ct.toString
      , de = F ? F.toStringTag : void 0;
    function $t(r) {
        var e = Lt.call(r, de)
          , t = r[de];
        try {
            r[de] = void 0;
            var n = !0
        } catch {}
        var s = Pt.call(r);
        return n && (e ? r[de] = t : delete r[de]),
        s
    }
    var Vt = Object.prototype
      , Mt = Vt.toString;
    function Dt(r) {
        return Mt.call(r)
    }
    var zt = "[object Null]"
      , Ut = "[object Undefined]"
      , ut = F ? F.toStringTag : void 0;
    function Bt(r) {
        return r == null ? r === void 0 ? Ut : zt : ut && ut in Object(r) ? $t(r) : Dt(r)
    }
    function Wt(r) {
        return r != null && typeof r == "object"
    }
    var qt = "[object Symbol]";
    function Yt(r) {
        return typeof r == "symbol" || Wt(r) && Bt(r) == qt
    }
    var Gt = /\s/;
    function Ft(r) {
        for (var e = r.length; e-- && Gt.test(r.charAt(e)); )
            ;
        return e
    }
    var Ht = /^\s+/;
    function Jt(r) {
        return r && r.slice(0, Ft(r) + 1).replace(Ht, "")
    }
    function Fe(r) {
        var e = typeof r;
        return r != null && (e == "object" || e == "function")
    }
    var lt = NaN
      , Xt = /^[-+]0x[0-9a-f]+$/i
      , Kt = /^0b[01]+$/i
      , Qt = /^0o[0-7]+$/i
      , er = parseInt;
    function ft(r) {
        if (typeof r == "number")
            return r;
        if (Yt(r))
            return lt;
        if (Fe(r)) {
            var e = typeof r.valueOf == "function" ? r.valueOf() : r;
            r = Fe(e) ? e + "" : e
        }
        if (typeof r != "string")
            return r === 0 ? r : +r;
        r = Jt(r);
        var t = Kt.test(r);
        return t || Qt.test(r) ? er(r.slice(2), t ? 2 : 8) : Xt.test(r) ? lt : +r
    }
    var He = function() {
        return E.Date.now()
    }
      , tr = "Expected a function"
      , rr = Math.max
      , nr = Math.min;
    function sr(r, e, t) {
        var n, s, a, o, i, c, u = 0, m = !1, T = !1, b = !0;
        if (typeof r != "function")
            throw new TypeError(tr);
        e = ft(e) || 0,
        Fe(t) && (m = !!t.leading,
        T = "maxWait"in t,
        a = T ? rr(ft(t.maxWait) || 0, e) : a,
        b = "trailing"in t ? !!t.trailing : b);
        function C(S) {
            var G = n
              , Re = s;
            return n = s = void 0,
            u = S,
            o = r.apply(Re, G),
            o
        }
        function z(S) {
            return u = S,
            i = setTimeout(V, e),
            m ? C(S) : o
        }
        function ie(S) {
            var G = S - c
              , Re = S - u
              , Zt = e - G;
            return T ? nr(Zt, a - Re) : Zt
        }
        function $(S) {
            var G = S - c
              , Re = S - u;
            return c === void 0 || G >= e || G < 0 || T && Re >= a
        }
        function V() {
            var S = He();
            if ($(S))
                return oe(S);
            i = setTimeout(V, ie(S))
        }
        function oe(S) {
            return i = void 0,
            b && n ? C(S) : (n = s = void 0,
            o)
        }
        function Ce() {
            i !== void 0 && clearTimeout(i),
            u = 0,
            n = c = s = i = void 0
        }
        function vn() {
            return i === void 0 ? o : oe(He())
        }
        function at() {
            var S = He()
              , G = $(S);
            if (n = arguments,
            s = this,
            c = S,
            G) {
                if (i === void 0)
                    return z(c);
                if (T)
                    return clearTimeout(i),
                    i = setTimeout(V, e),
                    C(c)
            }
            return i === void 0 && (i = setTimeout(V, e)),
            o
        }
        return at.cancel = Ce,
        at.flush = vn,
        at
    }
    const ht = 3 ** 9
      , ar = r => r.split("").map(e => e.charCodeAt(0) + ht).join(",")
      , mt = r => String.fromCharCode(...r.split(",").map(e => Number(e) - ht))
      , pt = typeof process < "u" && process.server || !1
      , ir = typeof process < "u" && process.dev || !1;
    typeof navigator < "u" && navigator.userAgent.toLowerCase().includes("mac"),
    typeof navigator < "u" && navigator.userAgent.toLowerCase().includes("windows");
    var or = ["19782,19800,19797,19798,19794,19797,19785,19800,19791,19729,19782,19794,19792"];
    const dr = pt ? {} : self;
    Number(!pt && (ir || or.includes(ar(dr[mt("19791,19794,19782,19780,19799,19788,19794,19793")][mt("19787,19794,19798,19799,19793,19780,19792,19784")]))));
    const cr = {
        createChannel: e => ({
            send: (s, a, o, i) => {
                const c = {
                    targets: s,
                    name: a,
                    payload: o
                };
                return typeof i < "u" ? chrome.tabs.sendMessage(i, c) : chrome.runtime.sendMessage(c)
            }
            ,
            listen: (s, a) => {
                const o = (c, u, m) => {
                    if (c.targets.includes(e) && c.name === s)
                        return Promise.resolve(a(c.payload, u)).then(m),
                        !0
                }
                ;
                return chrome.runtime.onMessage.addListener(o),
                {
                    removeListener: () => chrome.runtime.onMessage.removeListener(o)
                }
            }
        })
    }
      , ur = (r, e) => {
        const t = `__cursorful_${r}`;
        t in window && window[t]();
        const n = e() || ( () => {}
        );
        window[t] = n
    }
    ;
    chrome.runtime.getURL("/record.html");
    const lr = () => ({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio,
        screen: {
            width: window.screen.width,
            height: window.screen.height
        },
        browser: {
            width: window.outerWidth,
            height: window.outerHeight,
            x: window.screenLeft,
            y: window.screenTop
        }
    });
    chrome.runtime.getURL("/libav"),
    chrome.runtime.getURL("/_favicon");
    var _;
    (function(r) {
        r.assertEqual = s => s;
        function e(s) {}
        r.assertIs = e;
        function t(s) {
            throw new Error
        }
        r.assertNever = t,
        r.arrayToEnum = s => {
            const a = {};
            for (const o of s)
                a[o] = o;
            return a
        }
        ,
        r.getValidEnumValues = s => {
            const a = r.objectKeys(s).filter(i => typeof s[s[i]] != "number")
              , o = {};
            for (const i of a)
                o[i] = s[i];
            return r.objectValues(o)
        }
        ,
        r.objectValues = s => r.objectKeys(s).map(function(a) {
            return s[a]
        }),
        r.objectKeys = typeof Object.keys == "function" ? s => Object.keys(s) : s => {
            const a = [];
            for (const o in s)
                Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
            return a
        }
        ,
        r.find = (s, a) => {
            for (const o of s)
                if (a(o))
                    return o
        }
        ,
        r.isInteger = typeof Number.isInteger == "function" ? s => Number.isInteger(s) : s => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
        function n(s, a=" | ") {
            return s.map(o => typeof o == "string" ? `'${o}'` : o).join(a)
        }
        r.joinValues = n,
        r.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a
    }
    )(_ || (_ = {}));
    var Je;
    (function(r) {
        r.mergeShapes = (e, t) => ({
            ...e,
            ...t
        })
    }
    )(Je || (Je = {}));
    const f = _.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"])
      , U = r => {
        switch (typeof r) {
        case "undefined":
            return f.undefined;
        case "string":
            return f.string;
        case "number":
            return isNaN(r) ? f.nan : f.number;
        case "boolean":
            return f.boolean;
        case "function":
            return f.function;
        case "bigint":
            return f.bigint;
        case "symbol":
            return f.symbol;
        case "object":
            return Array.isArray(r) ? f.array : r === null ? f.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? f.promise : typeof Map < "u" && r instanceof Map ? f.map : typeof Set < "u" && r instanceof Set ? f.set : typeof Date < "u" && r instanceof Date ? f.date : f.object;
        default:
            return f.unknown
        }
    }
      , d = _.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"])
      , fr = r => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
    class R extends Error {
        constructor(e) {
            super(),
            this.issues = [],
            this.addIssue = n => {
                this.issues = [...this.issues, n]
            }
            ,
            this.addIssues = (n=[]) => {
                this.issues = [...this.issues, ...n]
            }
            ;
            const t = new.target.prototype;
            Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t,
            this.name = "ZodError",
            this.issues = e
        }
        get errors() {
            return this.issues
        }
        format(e) {
            const t = e || function(a) {
                return a.message
            }
              , n = {
                _errors: []
            }
              , s = a => {
                for (const o of a.issues)
                    if (o.code === "invalid_union")
                        o.unionErrors.map(s);
                    else if (o.code === "invalid_return_type")
                        s(o.returnTypeError);
                    else if (o.code === "invalid_arguments")
                        s(o.argumentsError);
                    else if (o.path.length === 0)
                        n._errors.push(t(o));
                    else {
                        let i = n
                          , c = 0;
                        for (; c < o.path.length; ) {
                            const u = o.path[c];
                            c === o.path.length - 1 ? (i[u] = i[u] || {
                                _errors: []
                            },
                            i[u]._errors.push(t(o))) : i[u] = i[u] || {
                                _errors: []
                            },
                            i = i[u],
                            c++
                        }
                    }
            }
            ;
            return s(this),
            n
        }
        static assert(e) {
            if (!(e instanceof R))
                throw new Error(`Not a ZodError: ${e}`)
        }
        toString() {
            return this.message
        }
        get message() {
            return JSON.stringify(this.issues, _.jsonStringifyReplacer, 2)
        }
        get isEmpty() {
            return this.issues.length === 0
        }
        flatten(e=t => t.message) {
            const t = {}
              , n = [];
            for (const s of this.issues)
                s.path.length > 0 ? (t[s.path[0]] = t[s.path[0]] || [],
                t[s.path[0]].push(e(s))) : n.push(e(s));
            return {
                formErrors: n,
                fieldErrors: t
            }
        }
        get formErrors() {
            return this.flatten()
        }
    }
    R.create = r => new R(r);
    const Q = (r, e) => {
        let t;
        switch (r.code) {
        case d.invalid_type:
            r.received === f.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
            break;
        case d.invalid_literal:
            t = `Invalid literal value, expected ${JSON.stringify(r.expected, _.jsonStringifyReplacer)}`;
            break;
        case d.unrecognized_keys:
            t = `Unrecognized key(s) in object: ${_.joinValues(r.keys, ", ")}`;
            break;
        case d.invalid_union:
            t = "Invalid input";
            break;
        case d.invalid_union_discriminator:
            t = `Invalid discriminator value. Expected ${_.joinValues(r.options)}`;
            break;
        case d.invalid_enum_value:
            t = `Invalid enum value. Expected ${_.joinValues(r.options)}, received '${r.received}'`;
            break;
        case d.invalid_arguments:
            t = "Invalid function arguments";
            break;
        case d.invalid_return_type:
            t = "Invalid function return type";
            break;
        case d.invalid_date:
            t = "Invalid date";
            break;
        case d.invalid_string:
            typeof r.validation == "object" ? "includes"in r.validation ? (t = `Invalid input: must include "${r.validation.includes}"`,
            typeof r.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith"in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith"in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : _.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
            break;
        case d.too_small:
            r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : t = "Invalid input";
            break;
        case d.too_big:
            r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? t = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : t = "Invalid input";
            break;
        case d.custom:
            t = "Invalid input";
            break;
        case d.invalid_intersection_types:
            t = "Intersection results could not be merged";
            break;
        case d.not_multiple_of:
            t = `Number must be a multiple of ${r.multipleOf}`;
            break;
        case d.not_finite:
            t = "Number must be finite";
            break;
        default:
            t = e.defaultError,
            _.assertNever(r)
        }
        return {
            message: t
        }
    }
    ;
    let vt = Q;
    function hr(r) {
        vt = r
    }
    function je() {
        return vt
    }
    const Ae = r => {
        const {data: e, path: t, errorMaps: n, issueData: s} = r
          , a = [...t, ...s.path || []]
          , o = {
            ...s,
            path: a
        };
        if (s.message !== void 0)
            return {
                ...s,
                path: a,
                message: s.message
            };
        let i = "";
        const c = n.filter(u => !!u).slice().reverse();
        for (const u of c)
            i = u(o, {
                data: e,
                defaultError: i
            }).message;
        return {
            ...s,
            path: a,
            message: i
        }
    }
      , mr = [];
    function l(r, e) {
        const t = je()
          , n = Ae({
            issueData: e,
            data: r.data,
            path: r.path,
            errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, t, t === Q ? void 0 : Q].filter(s => !!s)
        });
        r.common.issues.push(n)
    }
    class N {
        constructor() {
            this.value = "valid"
        }
        dirty() {
            this.value === "valid" && (this.value = "dirty")
        }
        abort() {
            this.value !== "aborted" && (this.value = "aborted")
        }
        static mergeArray(e, t) {
            const n = [];
            for (const s of t) {
                if (s.status === "aborted")
                    return v;
                s.status === "dirty" && e.dirty(),
                n.push(s.value)
            }
            return {
                status: e.value,
                value: n
            }
        }
        static async mergeObjectAsync(e, t) {
            const n = [];
            for (const s of t) {
                const a = await s.key
                  , o = await s.value;
                n.push({
                    key: a,
                    value: o
                })
            }
            return N.mergeObjectSync(e, n)
        }
        static mergeObjectSync(e, t) {
            const n = {};
            for (const s of t) {
                const {key: a, value: o} = s;
                if (a.status === "aborted" || o.status === "aborted")
                    return v;
                a.status === "dirty" && e.dirty(),
                o.status === "dirty" && e.dirty(),
                a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (n[a.value] = o.value)
            }
            return {
                status: e.value,
                value: n
            }
        }
    }
    const v = Object.freeze({
        status: "aborted"
    })
      , ee = r => ({
        status: "dirty",
        value: r
    })
      , O = r => ({
        status: "valid",
        value: r
    })
      , Xe = r => r.status === "aborted"
      , Ke = r => r.status === "dirty"
      , ce = r => r.status === "valid"
      , ue = r => typeof Promise < "u" && r instanceof Promise;
    function Le(r, e, t, n) {
        if (typeof e == "function" ? r !== e || !n : !e.has(r))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return e.get(r)
    }
    function gt(r, e, t, n, s) {
        if (typeof e == "function" ? r !== e || !s : !e.has(r))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return e.set(r, t),
        t
    }
    typeof SuppressedError == "function" && SuppressedError;
    var h;
    (function(r) {
        r.errToObj = e => typeof e == "string" ? {
            message: e
        } : e || {},
        r.toString = e => typeof e == "string" ? e : e == null ? void 0 : e.message
    }
    )(h || (h = {}));
    var le, fe;
    class A {
        constructor(e, t, n, s) {
            this._cachedPath = [],
            this.parent = e,
            this.data = t,
            this._path = n,
            this._key = s
        }
        get path() {
            return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)),
            this._cachedPath
        }
    }
    const yt = (r, e) => {
        if (ce(e))
            return {
                success: !0,
                data: e.value
            };
        if (!r.common.issues.length)
            throw new Error("Validation failed but no issues detected.");
        return {
            success: !1,
            get error() {
                if (this._error)
                    return this._error;
                const t = new R(r.common.issues);
                return this._error = t,
                this._error
            }
        }
    }
    ;
    function g(r) {
        if (!r)
            return {};
        const {errorMap: e, invalid_type_error: t, required_error: n, description: s} = r;
        if (e && (t || n))
            throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
        return e ? {
            errorMap: e,
            description: s
        } : {
            errorMap: (o, i) => {
                var c, u;
                const {message: m} = r;
                return o.code === "invalid_enum_value" ? {
                    message: m ?? i.defaultError
                } : typeof i.data > "u" ? {
                    message: (c = m ?? n) !== null && c !== void 0 ? c : i.defaultError
                } : o.code !== "invalid_type" ? {
                    message: i.defaultError
                } : {
                    message: (u = m ?? t) !== null && u !== void 0 ? u : i.defaultError
                }
            }
            ,
            description: s
        }
    }
    class y {
        constructor(e) {
            this.spa = this.safeParseAsync,
            this._def = e,
            this.parse = this.parse.bind(this),
            this.safeParse = this.safeParse.bind(this),
            this.parseAsync = this.parseAsync.bind(this),
            this.safeParseAsync = this.safeParseAsync.bind(this),
            this.spa = this.spa.bind(this),
            this.refine = this.refine.bind(this),
            this.refinement = this.refinement.bind(this),
            this.superRefine = this.superRefine.bind(this),
            this.optional = this.optional.bind(this),
            this.nullable = this.nullable.bind(this),
            this.nullish = this.nullish.bind(this),
            this.array = this.array.bind(this),
            this.promise = this.promise.bind(this),
            this.or = this.or.bind(this),
            this.and = this.and.bind(this),
            this.transform = this.transform.bind(this),
            this.brand = this.brand.bind(this),
            this.default = this.default.bind(this),
            this.catch = this.catch.bind(this),
            this.describe = this.describe.bind(this),
            this.pipe = this.pipe.bind(this),
            this.readonly = this.readonly.bind(this),
            this.isNullable = this.isNullable.bind(this),
            this.isOptional = this.isOptional.bind(this)
        }
        get description() {
            return this._def.description
        }
        _getType(e) {
            return U(e.data)
        }
        _getOrReturnCtx(e, t) {
            return t || {
                common: e.parent.common,
                data: e.data,
                parsedType: U(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent
            }
        }
        _processInputParams(e) {
            return {
                status: new N,
                ctx: {
                    common: e.parent.common,
                    data: e.data,
                    parsedType: U(e.data),
                    schemaErrorMap: this._def.errorMap,
                    path: e.path,
                    parent: e.parent
                }
            }
        }
        _parseSync(e) {
            const t = this._parse(e);
            if (ue(t))
                throw new Error("Synchronous parse encountered promise.");
            return t
        }
        _parseAsync(e) {
            const t = this._parse(e);
            return Promise.resolve(t)
        }
        parse(e, t) {
            const n = this.safeParse(e, t);
            if (n.success)
                return n.data;
            throw n.error
        }
        safeParse(e, t) {
            var n;
            const s = {
                common: {
                    issues: [],
                    async: (n = t == null ? void 0 : t.async) !== null && n !== void 0 ? n : !1,
                    contextualErrorMap: t == null ? void 0 : t.errorMap
                },
                path: (t == null ? void 0 : t.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: U(e)
            }
              , a = this._parseSync({
                data: e,
                path: s.path,
                parent: s
            });
            return yt(s, a)
        }
        async parseAsync(e, t) {
            const n = await this.safeParseAsync(e, t);
            if (n.success)
                return n.data;
            throw n.error
        }
        async safeParseAsync(e, t) {
            const n = {
                common: {
                    issues: [],
                    contextualErrorMap: t == null ? void 0 : t.errorMap,
                    async: !0
                },
                path: (t == null ? void 0 : t.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: U(e)
            }
              , s = this._parse({
                data: e,
                path: n.path,
                parent: n
            })
              , a = await (ue(s) ? s : Promise.resolve(s));
            return yt(n, a)
        }
        refine(e, t) {
            const n = s => typeof t == "string" || typeof t > "u" ? {
                message: t
            } : typeof t == "function" ? t(s) : t;
            return this._refinement( (s, a) => {
                const o = e(s)
                  , i = () => a.addIssue({
                    code: d.custom,
                    ...n(s)
                });
                return typeof Promise < "u" && o instanceof Promise ? o.then(c => c ? !0 : (i(),
                !1)) : o ? !0 : (i(),
                !1)
            }
            )
        }
        refinement(e, t) {
            return this._refinement( (n, s) => e(n) ? !0 : (s.addIssue(typeof t == "function" ? t(n, s) : t),
            !1))
        }
        _refinement(e) {
            return new j({
                schema: this,
                typeName: p.ZodEffects,
                effect: {
                    type: "refinement",
                    refinement: e
                }
            })
        }
        superRefine(e) {
            return this._refinement(e)
        }
        optional() {
            return P.create(this, this._def)
        }
        nullable() {
            return Y.create(this, this._def)
        }
        nullish() {
            return this.nullable().optional()
        }
        array() {
            return I.create(this, this._def)
        }
        promise() {
            return se.create(this, this._def)
        }
        or(e) {
            return ve.create([this, e], this._def)
        }
        and(e) {
            return ge.create(this, e, this._def)
        }
        transform(e) {
            return new j({
                ...g(this._def),
                schema: this,
                typeName: p.ZodEffects,
                effect: {
                    type: "transform",
                    transform: e
                }
            })
        }
        default(e) {
            const t = typeof e == "function" ? e : () => e;
            return new we({
                ...g(this._def),
                innerType: this,
                defaultValue: t,
                typeName: p.ZodDefault
            })
        }
        brand() {
            return new tt({
                typeName: p.ZodBranded,
                type: this,
                ...g(this._def)
            })
        }
        catch(e) {
            const t = typeof e == "function" ? e : () => e;
            return new ke({
                ...g(this._def),
                innerType: this,
                catchValue: t,
                typeName: p.ZodCatch
            })
        }
        describe(e) {
            const t = this.constructor;
            return new t({
                ...this._def,
                description: e
            })
        }
        pipe(e) {
            return Te.create(this, e)
        }
        readonly() {
            return Ee.create(this)
        }
        isOptional() {
            return this.safeParse(void 0).success
        }
        isNullable() {
            return this.safeParse(null).success
        }
    }
    const pr = /^c[^\s-]{8,}$/i
      , vr = /^[0-9a-z]+$/
      , gr = /^[0-9A-HJKMNP-TV-Z]{26}$/
      , yr = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i
      , _r = /^[a-z0-9_-]{21}$/i
      , br = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/
      , xr = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
      , wr = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
    let Qe;
    const kr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
      , Tr = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/
      , Er = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
      , _t = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))"
      , Sr = new RegExp(`^${_t}$`);
    function bt(r) {
        let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
        return r.precision ? e = `${e}\\.\\d{${r.precision}}` : r.precision == null && (e = `${e}(\\.\\d+)?`),
        e
    }
    function Nr(r) {
        return new RegExp(`^${bt(r)}$`)
    }
    function xt(r) {
        let e = `${_t}T${bt(r)}`;
        const t = [];
        return t.push(r.local ? "Z?" : "Z"),
        r.offset && t.push("([+-]\\d{2}:?\\d{2})"),
        e = `${e}(${t.join("|")})`,
        new RegExp(`^${e}$`)
    }
    function Or(r, e) {
        return !!((e === "v4" || !e) && kr.test(r) || (e === "v6" || !e) && Tr.test(r))
    }
    class Z extends y {
        _parse(e) {
            if (this._def.coerce && (e.data = String(e.data)),
            this._getType(e) !== f.string) {
                const a = this._getOrReturnCtx(e);
                return l(a, {
                    code: d.invalid_type,
                    expected: f.string,
                    received: a.parsedType
                }),
                v
            }
            const n = new N;
            let s;
            for (const a of this._def.checks)
                if (a.kind === "min")
                    e.data.length < a.value && (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.too_small,
                        minimum: a.value,
                        type: "string",
                        inclusive: !0,
                        exact: !1,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "max")
                    e.data.length > a.value && (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.too_big,
                        maximum: a.value,
                        type: "string",
                        inclusive: !0,
                        exact: !1,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "length") {
                    const o = e.data.length > a.value
                      , i = e.data.length < a.value;
                    (o || i) && (s = this._getOrReturnCtx(e, s),
                    o ? l(s, {
                        code: d.too_big,
                        maximum: a.value,
                        type: "string",
                        inclusive: !0,
                        exact: !0,
                        message: a.message
                    }) : i && l(s, {
                        code: d.too_small,
                        minimum: a.value,
                        type: "string",
                        inclusive: !0,
                        exact: !0,
                        message: a.message
                    }),
                    n.dirty())
                } else if (a.kind === "email")
                    xr.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "email",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "emoji")
                    Qe || (Qe = new RegExp(wr,"u")),
                    Qe.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "emoji",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "uuid")
                    yr.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "uuid",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "nanoid")
                    _r.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "nanoid",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "cuid")
                    pr.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "cuid",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "cuid2")
                    vr.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "cuid2",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "ulid")
                    gr.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "ulid",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty());
                else if (a.kind === "url")
                    try {
                        new URL(e.data)
                    } catch {
                        s = this._getOrReturnCtx(e, s),
                        l(s, {
                            validation: "url",
                            code: d.invalid_string,
                            message: a.message
                        }),
                        n.dirty()
                    }
                else
                    a.kind === "regex" ? (a.regex.lastIndex = 0,
                    a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "regex",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.invalid_string,
                        validation: {
                            includes: a.value,
                            position: a.position
                        },
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.invalid_string,
                        validation: {
                            startsWith: a.value
                        },
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.invalid_string,
                        validation: {
                            endsWith: a.value
                        },
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "datetime" ? xt(a).test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.invalid_string,
                        validation: "datetime",
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "date" ? Sr.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.invalid_string,
                        validation: "date",
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "time" ? Nr(a).test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        code: d.invalid_string,
                        validation: "time",
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "duration" ? br.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "duration",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "ip" ? Or(e.data, a.version) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "ip",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty()) : a.kind === "base64" ? Er.test(e.data) || (s = this._getOrReturnCtx(e, s),
                    l(s, {
                        validation: "base64",
                        code: d.invalid_string,
                        message: a.message
                    }),
                    n.dirty()) : _.assertNever(a);
            return {
                status: n.value,
                value: e.data
            }
        }
        _regex(e, t, n) {
            return this.refinement(s => e.test(s), {
                validation: t,
                code: d.invalid_string,
                ...h.errToObj(n)
            })
        }
        _addCheck(e) {
            return new Z({
                ...this._def,
                checks: [...this._def.checks, e]
            })
        }
        email(e) {
            return this._addCheck({
                kind: "email",
                ...h.errToObj(e)
            })
        }
        url(e) {
            return this._addCheck({
                kind: "url",
                ...h.errToObj(e)
            })
        }
        emoji(e) {
            return this._addCheck({
                kind: "emoji",
                ...h.errToObj(e)
            })
        }
        uuid(e) {
            return this._addCheck({
                kind: "uuid",
                ...h.errToObj(e)
            })
        }
        nanoid(e) {
            return this._addCheck({
                kind: "nanoid",
                ...h.errToObj(e)
            })
        }
        cuid(e) {
            return this._addCheck({
                kind: "cuid",
                ...h.errToObj(e)
            })
        }
        cuid2(e) {
            return this._addCheck({
                kind: "cuid2",
                ...h.errToObj(e)
            })
        }
        ulid(e) {
            return this._addCheck({
                kind: "ulid",
                ...h.errToObj(e)
            })
        }
        base64(e) {
            return this._addCheck({
                kind: "base64",
                ...h.errToObj(e)
            })
        }
        ip(e) {
            return this._addCheck({
                kind: "ip",
                ...h.errToObj(e)
            })
        }
        datetime(e) {
            var t, n;
            return typeof e == "string" ? this._addCheck({
                kind: "datetime",
                precision: null,
                offset: !1,
                local: !1,
                message: e
            }) : this._addCheck({
                kind: "datetime",
                precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
                offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
                local: (n = e == null ? void 0 : e.local) !== null && n !== void 0 ? n : !1,
                ...h.errToObj(e == null ? void 0 : e.message)
            })
        }
        date(e) {
            return this._addCheck({
                kind: "date",
                message: e
            })
        }
        time(e) {
            return typeof e == "string" ? this._addCheck({
                kind: "time",
                precision: null,
                message: e
            }) : this._addCheck({
                kind: "time",
                precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
                ...h.errToObj(e == null ? void 0 : e.message)
            })
        }
        duration(e) {
            return this._addCheck({
                kind: "duration",
                ...h.errToObj(e)
            })
        }
        regex(e, t) {
            return this._addCheck({
                kind: "regex",
                regex: e,
                ...h.errToObj(t)
            })
        }
        includes(e, t) {
            return this._addCheck({
                kind: "includes",
                value: e,
                position: t == null ? void 0 : t.position,
                ...h.errToObj(t == null ? void 0 : t.message)
            })
        }
        startsWith(e, t) {
            return this._addCheck({
                kind: "startsWith",
                value: e,
                ...h.errToObj(t)
            })
        }
        endsWith(e, t) {
            return this._addCheck({
                kind: "endsWith",
                value: e,
                ...h.errToObj(t)
            })
        }
        min(e, t) {
            return this._addCheck({
                kind: "min",
                value: e,
                ...h.errToObj(t)
            })
        }
        max(e, t) {
            return this._addCheck({
                kind: "max",
                value: e,
                ...h.errToObj(t)
            })
        }
        length(e, t) {
            return this._addCheck({
                kind: "length",
                value: e,
                ...h.errToObj(t)
            })
        }
        nonempty(e) {
            return this.min(1, h.errToObj(e))
        }
        trim() {
            return new Z({
                ...this._def,
                checks: [...this._def.checks, {
                    kind: "trim"
                }]
            })
        }
        toLowerCase() {
            return new Z({
                ...this._def,
                checks: [...this._def.checks, {
                    kind: "toLowerCase"
                }]
            })
        }
        toUpperCase() {
            return new Z({
                ...this._def,
                checks: [...this._def.checks, {
                    kind: "toUpperCase"
                }]
            })
        }
        get isDatetime() {
            return !!this._def.checks.find(e => e.kind === "datetime")
        }
        get isDate() {
            return !!this._def.checks.find(e => e.kind === "date")
        }
        get isTime() {
            return !!this._def.checks.find(e => e.kind === "time")
        }
        get isDuration() {
            return !!this._def.checks.find(e => e.kind === "duration")
        }
        get isEmail() {
            return !!this._def.checks.find(e => e.kind === "email")
        }
        get isURL() {
            return !!this._def.checks.find(e => e.kind === "url")
        }
        get isEmoji() {
            return !!this._def.checks.find(e => e.kind === "emoji")
        }
        get isUUID() {
            return !!this._def.checks.find(e => e.kind === "uuid")
        }
        get isNANOID() {
            return !!this._def.checks.find(e => e.kind === "nanoid")
        }
        get isCUID() {
            return !!this._def.checks.find(e => e.kind === "cuid")
        }
        get isCUID2() {
            return !!this._def.checks.find(e => e.kind === "cuid2")
        }
        get isULID() {
            return !!this._def.checks.find(e => e.kind === "ulid")
        }
        get isIP() {
            return !!this._def.checks.find(e => e.kind === "ip")
        }
        get isBase64() {
            return !!this._def.checks.find(e => e.kind === "base64")
        }
        get minLength() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "min" && (e === null || t.value > e) && (e = t.value);
            return e
        }
        get maxLength() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "max" && (e === null || t.value < e) && (e = t.value);
            return e
        }
    }
    Z.create = r => {
        var e;
        return new Z({
            checks: [],
            typeName: p.ZodString,
            coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
            ...g(r)
        })
    }
    ;
    function Cr(r, e) {
        const t = (r.toString().split(".")[1] || "").length
          , n = (e.toString().split(".")[1] || "").length
          , s = t > n ? t : n
          , a = parseInt(r.toFixed(s).replace(".", ""))
          , o = parseInt(e.toFixed(s).replace(".", ""));
        return a % o / Math.pow(10, s)
    }
    class B extends y {
        constructor() {
            super(...arguments),
            this.min = this.gte,
            this.max = this.lte,
            this.step = this.multipleOf
        }
        _parse(e) {
            if (this._def.coerce && (e.data = Number(e.data)),
            this._getType(e) !== f.number) {
                const a = this._getOrReturnCtx(e);
                return l(a, {
                    code: d.invalid_type,
                    expected: f.number,
                    received: a.parsedType
                }),
                v
            }
            let n;
            const s = new N;
            for (const a of this._def.checks)
                a.kind === "int" ? _.isInteger(e.data) || (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.invalid_type,
                    expected: "integer",
                    received: "float",
                    message: a.message
                }),
                s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.too_small,
                    minimum: a.value,
                    type: "number",
                    inclusive: a.inclusive,
                    exact: !1,
                    message: a.message
                }),
                s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.too_big,
                    maximum: a.value,
                    type: "number",
                    inclusive: a.inclusive,
                    exact: !1,
                    message: a.message
                }),
                s.dirty()) : a.kind === "multipleOf" ? Cr(e.data, a.value) !== 0 && (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.not_multiple_of,
                    multipleOf: a.value,
                    message: a.message
                }),
                s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.not_finite,
                    message: a.message
                }),
                s.dirty()) : _.assertNever(a);
            return {
                status: s.value,
                value: e.data
            }
        }
        gte(e, t) {
            return this.setLimit("min", e, !0, h.toString(t))
        }
        gt(e, t) {
            return this.setLimit("min", e, !1, h.toString(t))
        }
        lte(e, t) {
            return this.setLimit("max", e, !0, h.toString(t))
        }
        lt(e, t) {
            return this.setLimit("max", e, !1, h.toString(t))
        }
        setLimit(e, t, n, s) {
            return new B({
                ...this._def,
                checks: [...this._def.checks, {
                    kind: e,
                    value: t,
                    inclusive: n,
                    message: h.toString(s)
                }]
            })
        }
        _addCheck(e) {
            return new B({
                ...this._def,
                checks: [...this._def.checks, e]
            })
        }
        int(e) {
            return this._addCheck({
                kind: "int",
                message: h.toString(e)
            })
        }
        positive(e) {
            return this._addCheck({
                kind: "min",
                value: 0,
                inclusive: !1,
                message: h.toString(e)
            })
        }
        negative(e) {
            return this._addCheck({
                kind: "max",
                value: 0,
                inclusive: !1,
                message: h.toString(e)
            })
        }
        nonpositive(e) {
            return this._addCheck({
                kind: "max",
                value: 0,
                inclusive: !0,
                message: h.toString(e)
            })
        }
        nonnegative(e) {
            return this._addCheck({
                kind: "min",
                value: 0,
                inclusive: !0,
                message: h.toString(e)
            })
        }
        multipleOf(e, t) {
            return this._addCheck({
                kind: "multipleOf",
                value: e,
                message: h.toString(t)
            })
        }
        finite(e) {
            return this._addCheck({
                kind: "finite",
                message: h.toString(e)
            })
        }
        safe(e) {
            return this._addCheck({
                kind: "min",
                inclusive: !0,
                value: Number.MIN_SAFE_INTEGER,
                message: h.toString(e)
            })._addCheck({
                kind: "max",
                inclusive: !0,
                value: Number.MAX_SAFE_INTEGER,
                message: h.toString(e)
            })
        }
        get minValue() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "min" && (e === null || t.value > e) && (e = t.value);
            return e
        }
        get maxValue() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "max" && (e === null || t.value < e) && (e = t.value);
            return e
        }
        get isInt() {
            return !!this._def.checks.find(e => e.kind === "int" || e.kind === "multipleOf" && _.isInteger(e.value))
        }
        get isFinite() {
            let e = null
              , t = null;
            for (const n of this._def.checks) {
                if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
                    return !0;
                n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value)
            }
            return Number.isFinite(t) && Number.isFinite(e)
        }
    }
    B.create = r => new B({
        checks: [],
        typeName: p.ZodNumber,
        coerce: (r == null ? void 0 : r.coerce) || !1,
        ...g(r)
    });
    class W extends y {
        constructor() {
            super(...arguments),
            this.min = this.gte,
            this.max = this.lte
        }
        _parse(e) {
            if (this._def.coerce && (e.data = BigInt(e.data)),
            this._getType(e) !== f.bigint) {
                const a = this._getOrReturnCtx(e);
                return l(a, {
                    code: d.invalid_type,
                    expected: f.bigint,
                    received: a.parsedType
                }),
                v
            }
            let n;
            const s = new N;
            for (const a of this._def.checks)
                a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.too_small,
                    type: "bigint",
                    minimum: a.value,
                    inclusive: a.inclusive,
                    message: a.message
                }),
                s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.too_big,
                    type: "bigint",
                    maximum: a.value,
                    inclusive: a.inclusive,
                    message: a.message
                }),
                s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n),
                l(n, {
                    code: d.not_multiple_of,
                    multipleOf: a.value,
                    message: a.message
                }),
                s.dirty()) : _.assertNever(a);
            return {
                status: s.value,
                value: e.data
            }
        }
        gte(e, t) {
            return this.setLimit("min", e, !0, h.toString(t))
        }
        gt(e, t) {
            return this.setLimit("min", e, !1, h.toString(t))
        }
        lte(e, t) {
            return this.setLimit("max", e, !0, h.toString(t))
        }
        lt(e, t) {
            return this.setLimit("max", e, !1, h.toString(t))
        }
        setLimit(e, t, n, s) {
            return new W({
                ...this._def,
                checks: [...this._def.checks, {
                    kind: e,
                    value: t,
                    inclusive: n,
                    message: h.toString(s)
                }]
            })
        }
        _addCheck(e) {
            return new W({
                ...this._def,
                checks: [...this._def.checks, e]
            })
        }
        positive(e) {
            return this._addCheck({
                kind: "min",
                value: BigInt(0),
                inclusive: !1,
                message: h.toString(e)
            })
        }
        negative(e) {
            return this._addCheck({
                kind: "max",
                value: BigInt(0),
                inclusive: !1,
                message: h.toString(e)
            })
        }
        nonpositive(e) {
            return this._addCheck({
                kind: "max",
                value: BigInt(0),
                inclusive: !0,
                message: h.toString(e)
            })
        }
        nonnegative(e) {
            return this._addCheck({
                kind: "min",
                value: BigInt(0),
                inclusive: !0,
                message: h.toString(e)
            })
        }
        multipleOf(e, t) {
            return this._addCheck({
                kind: "multipleOf",
                value: e,
                message: h.toString(t)
            })
        }
        get minValue() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "min" && (e === null || t.value > e) && (e = t.value);
            return e
        }
        get maxValue() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "max" && (e === null || t.value < e) && (e = t.value);
            return e
        }
    }
    W.create = r => {
        var e;
        return new W({
            checks: [],
            typeName: p.ZodBigInt,
            coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
            ...g(r)
        })
    }
    ;
    class he extends y {
        _parse(e) {
            if (this._def.coerce && (e.data = !!e.data),
            this._getType(e) !== f.boolean) {
                const n = this._getOrReturnCtx(e);
                return l(n, {
                    code: d.invalid_type,
                    expected: f.boolean,
                    received: n.parsedType
                }),
                v
            }
            return O(e.data)
        }
    }
    he.create = r => new he({
        typeName: p.ZodBoolean,
        coerce: (r == null ? void 0 : r.coerce) || !1,
        ...g(r)
    });
    class H extends y {
        _parse(e) {
            if (this._def.coerce && (e.data = new Date(e.data)),
            this._getType(e) !== f.date) {
                const a = this._getOrReturnCtx(e);
                return l(a, {
                    code: d.invalid_type,
                    expected: f.date,
                    received: a.parsedType
                }),
                v
            }
            if (isNaN(e.data.getTime())) {
                const a = this._getOrReturnCtx(e);
                return l(a, {
                    code: d.invalid_date
                }),
                v
            }
            const n = new N;
            let s;
            for (const a of this._def.checks)
                a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s),
                l(s, {
                    code: d.too_small,
                    message: a.message,
                    inclusive: !0,
                    exact: !1,
                    minimum: a.value,
                    type: "date"
                }),
                n.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s),
                l(s, {
                    code: d.too_big,
                    message: a.message,
                    inclusive: !0,
                    exact: !1,
                    maximum: a.value,
                    type: "date"
                }),
                n.dirty()) : _.assertNever(a);
            return {
                status: n.value,
                value: new Date(e.data.getTime())
            }
        }
        _addCheck(e) {
            return new H({
                ...this._def,
                checks: [...this._def.checks, e]
            })
        }
        min(e, t) {
            return this._addCheck({
                kind: "min",
                value: e.getTime(),
                message: h.toString(t)
            })
        }
        max(e, t) {
            return this._addCheck({
                kind: "max",
                value: e.getTime(),
                message: h.toString(t)
            })
        }
        get minDate() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "min" && (e === null || t.value > e) && (e = t.value);
            return e != null ? new Date(e) : null
        }
        get maxDate() {
            let e = null;
            for (const t of this._def.checks)
                t.kind === "max" && (e === null || t.value < e) && (e = t.value);
            return e != null ? new Date(e) : null
        }
    }
    H.create = r => new H({
        checks: [],
        coerce: (r == null ? void 0 : r.coerce) || !1,
        typeName: p.ZodDate,
        ...g(r)
    });
    class Pe extends y {
        _parse(e) {
            if (this._getType(e) !== f.symbol) {
                const n = this._getOrReturnCtx(e);
                return l(n, {
                    code: d.invalid_type,
                    expected: f.symbol,
                    received: n.parsedType
                }),
                v
            }
            return O(e.data)
        }
    }
    Pe.create = r => new Pe({
        typeName: p.ZodSymbol,
        ...g(r)
    });
    class me extends y {
        _parse(e) {
            if (this._getType(e) !== f.undefined) {
                const n = this._getOrReturnCtx(e);
                return l(n, {
                    code: d.invalid_type,
                    expected: f.undefined,
                    received: n.parsedType
                }),
                v
            }
            return O(e.data)
        }
    }
    me.create = r => new me({
        typeName: p.ZodUndefined,
        ...g(r)
    });
    class pe extends y {
        _parse(e) {
            if (this._getType(e) !== f.null) {
                const n = this._getOrReturnCtx(e);
                return l(n, {
                    code: d.invalid_type,
                    expected: f.null,
                    received: n.parsedType
                }),
                v
            }
            return O(e.data)
        }
    }
    pe.create = r => new pe({
        typeName: p.ZodNull,
        ...g(r)
    });
    class te extends y {
        constructor() {
            super(...arguments),
            this._any = !0
        }
        _parse(e) {
            return O(e.data)
        }
    }
    te.create = r => new te({
        typeName: p.ZodAny,
        ...g(r)
    });
    class J extends y {
        constructor() {
            super(...arguments),
            this._unknown = !0
        }
        _parse(e) {
            return O(e.data)
        }
    }
    J.create = r => new J({
        typeName: p.ZodUnknown,
        ...g(r)
    });
    class M extends y {
        _parse(e) {
            const t = this._getOrReturnCtx(e);
            return l(t, {
                code: d.invalid_type,
                expected: f.never,
                received: t.parsedType
            }),
            v
        }
    }
    M.create = r => new M({
        typeName: p.ZodNever,
        ...g(r)
    });
    class $e extends y {
        _parse(e) {
            if (this._getType(e) !== f.undefined) {
                const n = this._getOrReturnCtx(e);
                return l(n, {
                    code: d.invalid_type,
                    expected: f.void,
                    received: n.parsedType
                }),
                v
            }
            return O(e.data)
        }
    }
    $e.create = r => new $e({
        typeName: p.ZodVoid,
        ...g(r)
    });
    class I extends y {
        _parse(e) {
            const {ctx: t, status: n} = this._processInputParams(e)
              , s = this._def;
            if (t.parsedType !== f.array)
                return l(t, {
                    code: d.invalid_type,
                    expected: f.array,
                    received: t.parsedType
                }),
                v;
            if (s.exactLength !== null) {
                const o = t.data.length > s.exactLength.value
                  , i = t.data.length < s.exactLength.value;
                (o || i) && (l(t, {
                    code: o ? d.too_big : d.too_small,
                    minimum: i ? s.exactLength.value : void 0,
                    maximum: o ? s.exactLength.value : void 0,
                    type: "array",
                    inclusive: !0,
                    exact: !0,
                    message: s.exactLength.message
                }),
                n.dirty())
            }
            if (s.minLength !== null && t.data.length < s.minLength.value && (l(t, {
                code: d.too_small,
                minimum: s.minLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: s.minLength.message
            }),
            n.dirty()),
            s.maxLength !== null && t.data.length > s.maxLength.value && (l(t, {
                code: d.too_big,
                maximum: s.maxLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: s.maxLength.message
            }),
            n.dirty()),
            t.common.async)
                return Promise.all([...t.data].map( (o, i) => s.type._parseAsync(new A(t,o,t.path,i)))).then(o => N.mergeArray(n, o));
            const a = [...t.data].map( (o, i) => s.type._parseSync(new A(t,o,t.path,i)));
            return N.mergeArray(n, a)
        }
        get element() {
            return this._def.type
        }
        min(e, t) {
            return new I({
                ...this._def,
                minLength: {
                    value: e,
                    message: h.toString(t)
                }
            })
        }
        max(e, t) {
            return new I({
                ...this._def,
                maxLength: {
                    value: e,
                    message: h.toString(t)
                }
            })
        }
        length(e, t) {
            return new I({
                ...this._def,
                exactLength: {
                    value: e,
                    message: h.toString(t)
                }
            })
        }
        nonempty(e) {
            return this.min(1, e)
        }
    }
    I.create = (r, e) => new I({
        type: r,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: p.ZodArray,
        ...g(e)
    });
    function re(r) {
        if (r instanceof k) {
            const e = {};
            for (const t in r.shape) {
                const n = r.shape[t];
                e[t] = P.create(re(n))
            }
            return new k({
                ...r._def,
                shape: () => e
            })
        } else
            return r instanceof I ? new I({
                ...r._def,
                type: re(r.element)
            }) : r instanceof P ? P.create(re(r.unwrap())) : r instanceof Y ? Y.create(re(r.unwrap())) : r instanceof L ? L.create(r.items.map(e => re(e))) : r
    }
    class k extends y {
        constructor() {
            super(...arguments),
            this._cached = null,
            this.nonstrict = this.passthrough,
            this.augment = this.extend
        }
        _getCached() {
            if (this._cached !== null)
                return this._cached;
            const e = this._def.shape()
              , t = _.objectKeys(e);
            return this._cached = {
                shape: e,
                keys: t
            }
        }
        _parse(e) {
            if (this._getType(e) !== f.object) {
                const u = this._getOrReturnCtx(e);
                return l(u, {
                    code: d.invalid_type,
                    expected: f.object,
                    received: u.parsedType
                }),
                v
            }
            const {status: n, ctx: s} = this._processInputParams(e)
              , {shape: a, keys: o} = this._getCached()
              , i = [];
            if (!(this._def.catchall instanceof M && this._def.unknownKeys === "strip"))
                for (const u in s.data)
                    o.includes(u) || i.push(u);
            const c = [];
            for (const u of o) {
                const m = a[u]
                  , T = s.data[u];
                c.push({
                    key: {
                        status: "valid",
                        value: u
                    },
                    value: m._parse(new A(s,T,s.path,u)),
                    alwaysSet: u in s.data
                })
            }
            if (this._def.catchall instanceof M) {
                const u = this._def.unknownKeys;
                if (u === "passthrough")
                    for (const m of i)
                        c.push({
                            key: {
                                status: "valid",
                                value: m
                            },
                            value: {
                                status: "valid",
                                value: s.data[m]
                            }
                        });
                else if (u === "strict")
                    i.length > 0 && (l(s, {
                        code: d.unrecognized_keys,
                        keys: i
                    }),
                    n.dirty());
                else if (u !== "strip")
                    throw new Error("Internal ZodObject error: invalid unknownKeys value.")
            } else {
                const u = this._def.catchall;
                for (const m of i) {
                    const T = s.data[m];
                    c.push({
                        key: {
                            status: "valid",
                            value: m
                        },
                        value: u._parse(new A(s,T,s.path,m)),
                        alwaysSet: m in s.data
                    })
                }
            }
            return s.common.async ? Promise.resolve().then(async () => {
                const u = [];
                for (const m of c) {
                    const T = await m.key
                      , b = await m.value;
                    u.push({
                        key: T,
                        value: b,
                        alwaysSet: m.alwaysSet
                    })
                }
                return u
            }
            ).then(u => N.mergeObjectSync(n, u)) : N.mergeObjectSync(n, c)
        }
        get shape() {
            return this._def.shape()
        }
        strict(e) {
            return h.errToObj,
            new k({
                ...this._def,
                unknownKeys: "strict",
                ...e !== void 0 ? {
                    errorMap: (t, n) => {
                        var s, a, o, i;
                        const c = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, t, n).message) !== null && o !== void 0 ? o : n.defaultError;
                        return t.code === "unrecognized_keys" ? {
                            message: (i = h.errToObj(e).message) !== null && i !== void 0 ? i : c
                        } : {
                            message: c
                        }
                    }
                } : {}
            })
        }
        strip() {
            return new k({
                ...this._def,
                unknownKeys: "strip"
            })
        }
        passthrough() {
            return new k({
                ...this._def,
                unknownKeys: "passthrough"
            })
        }
        extend(e) {
            return new k({
                ...this._def,
                shape: () => ({
                    ...this._def.shape(),
                    ...e
                })
            })
        }
        merge(e) {
            return new k({
                unknownKeys: e._def.unknownKeys,
                catchall: e._def.catchall,
                shape: () => ({
                    ...this._def.shape(),
                    ...e._def.shape()
                }),
                typeName: p.ZodObject
            })
        }
        setKey(e, t) {
            return this.augment({
                [e]: t
            })
        }
        catchall(e) {
            return new k({
                ...this._def,
                catchall: e
            })
        }
        pick(e) {
            const t = {};
            return _.objectKeys(e).forEach(n => {
                e[n] && this.shape[n] && (t[n] = this.shape[n])
            }
            ),
            new k({
                ...this._def,
                shape: () => t
            })
        }
        omit(e) {
            const t = {};
            return _.objectKeys(this.shape).forEach(n => {
                e[n] || (t[n] = this.shape[n])
            }
            ),
            new k({
                ...this._def,
                shape: () => t
            })
        }
        deepPartial() {
            return re(this)
        }
        partial(e) {
            const t = {};
            return _.objectKeys(this.shape).forEach(n => {
                const s = this.shape[n];
                e && !e[n] ? t[n] = s : t[n] = s.optional()
            }
            ),
            new k({
                ...this._def,
                shape: () => t
            })
        }
        required(e) {
            const t = {};
            return _.objectKeys(this.shape).forEach(n => {
                if (e && !e[n])
                    t[n] = this.shape[n];
                else {
                    let a = this.shape[n];
                    for (; a instanceof P; )
                        a = a._def.innerType;
                    t[n] = a
                }
            }
            ),
            new k({
                ...this._def,
                shape: () => t
            })
        }
        keyof() {
            return wt(_.objectKeys(this.shape))
        }
    }
    k.create = (r, e) => new k({
        shape: () => r,
        unknownKeys: "strip",
        catchall: M.create(),
        typeName: p.ZodObject,
        ...g(e)
    }),
    k.strictCreate = (r, e) => new k({
        shape: () => r,
        unknownKeys: "strict",
        catchall: M.create(),
        typeName: p.ZodObject,
        ...g(e)
    }),
    k.lazycreate = (r, e) => new k({
        shape: r,
        unknownKeys: "strip",
        catchall: M.create(),
        typeName: p.ZodObject,
        ...g(e)
    });
    class ve extends y {
        _parse(e) {
            const {ctx: t} = this._processInputParams(e)
              , n = this._def.options;
            function s(a) {
                for (const i of a)
                    if (i.result.status === "valid")
                        return i.result;
                for (const i of a)
                    if (i.result.status === "dirty")
                        return t.common.issues.push(...i.ctx.common.issues),
                        i.result;
                const o = a.map(i => new R(i.ctx.common.issues));
                return l(t, {
                    code: d.invalid_union,
                    unionErrors: o
                }),
                v
            }
            if (t.common.async)
                return Promise.all(n.map(async a => {
                    const o = {
                        ...t,
                        common: {
                            ...t.common,
                            issues: []
                        },
                        parent: null
                    };
                    return {
                        result: await a._parseAsync({
                            data: t.data,
                            path: t.path,
                            parent: o
                        }),
                        ctx: o
                    }
                }
                )).then(s);
            {
                let a;
                const o = [];
                for (const c of n) {
                    const u = {
                        ...t,
                        common: {
                            ...t.common,
                            issues: []
                        },
                        parent: null
                    }
                      , m = c._parseSync({
                        data: t.data,
                        path: t.path,
                        parent: u
                    });
                    if (m.status === "valid")
                        return m;
                    m.status === "dirty" && !a && (a = {
                        result: m,
                        ctx: u
                    }),
                    u.common.issues.length && o.push(u.common.issues)
                }
                if (a)
                    return t.common.issues.push(...a.ctx.common.issues),
                    a.result;
                const i = o.map(c => new R(c));
                return l(t, {
                    code: d.invalid_union,
                    unionErrors: i
                }),
                v
            }
        }
        get options() {
            return this._def.options
        }
    }
    ve.create = (r, e) => new ve({
        options: r,
        typeName: p.ZodUnion,
        ...g(e)
    });
    const D = r => r instanceof _e ? D(r.schema) : r instanceof j ? D(r.innerType()) : r instanceof be ? [r.value] : r instanceof q ? r.options : r instanceof xe ? _.objectValues(r.enum) : r instanceof we ? D(r._def.innerType) : r instanceof me ? [void 0] : r instanceof pe ? [null] : r instanceof P ? [void 0, ...D(r.unwrap())] : r instanceof Y ? [null, ...D(r.unwrap())] : r instanceof tt || r instanceof Ee ? D(r.unwrap()) : r instanceof ke ? D(r._def.innerType) : [];
    class Ve extends y {
        _parse(e) {
            const {ctx: t} = this._processInputParams(e);
            if (t.parsedType !== f.object)
                return l(t, {
                    code: d.invalid_type,
                    expected: f.object,
                    received: t.parsedType
                }),
                v;
            const n = this.discriminator
              , s = t.data[n]
              , a = this.optionsMap.get(s);
            return a ? t.common.async ? a._parseAsync({
                data: t.data,
                path: t.path,
                parent: t
            }) : a._parseSync({
                data: t.data,
                path: t.path,
                parent: t
            }) : (l(t, {
                code: d.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [n]
            }),
            v)
        }
        get discriminator() {
            return this._def.discriminator
        }
        get options() {
            return this._def.options
        }
        get optionsMap() {
            return this._def.optionsMap
        }
        static create(e, t, n) {
            const s = new Map;
            for (const a of t) {
                const o = D(a.shape[e]);
                if (!o.length)
                    throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
                for (const i of o) {
                    if (s.has(i))
                        throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(i)}`);
                    s.set(i, a)
                }
            }
            return new Ve({
                typeName: p.ZodDiscriminatedUnion,
                discriminator: e,
                options: t,
                optionsMap: s,
                ...g(n)
            })
        }
    }
    function et(r, e) {
        const t = U(r)
          , n = U(e);
        if (r === e)
            return {
                valid: !0,
                data: r
            };
        if (t === f.object && n === f.object) {
            const s = _.objectKeys(e)
              , a = _.objectKeys(r).filter(i => s.indexOf(i) !== -1)
              , o = {
                ...r,
                ...e
            };
            for (const i of a) {
                const c = et(r[i], e[i]);
                if (!c.valid)
                    return {
                        valid: !1
                    };
                o[i] = c.data
            }
            return {
                valid: !0,
                data: o
            }
        } else if (t === f.array && n === f.array) {
            if (r.length !== e.length)
                return {
                    valid: !1
                };
            const s = [];
            for (let a = 0; a < r.length; a++) {
                const o = r[a]
                  , i = e[a]
                  , c = et(o, i);
                if (!c.valid)
                    return {
                        valid: !1
                    };
                s.push(c.data)
            }
            return {
                valid: !0,
                data: s
            }
        } else
            return t === f.date && n === f.date && +r == +e ? {
                valid: !0,
                data: r
            } : {
                valid: !1
            }
    }
    class ge extends y {
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e)
              , s = (a, o) => {
                if (Xe(a) || Xe(o))
                    return v;
                const i = et(a.value, o.value);
                return i.valid ? ((Ke(a) || Ke(o)) && t.dirty(),
                {
                    status: t.value,
                    value: i.data
                }) : (l(n, {
                    code: d.invalid_intersection_types
                }),
                v)
            }
            ;
            return n.common.async ? Promise.all([this._def.left._parseAsync({
                data: n.data,
                path: n.path,
                parent: n
            }), this._def.right._parseAsync({
                data: n.data,
                path: n.path,
                parent: n
            })]).then( ([a,o]) => s(a, o)) : s(this._def.left._parseSync({
                data: n.data,
                path: n.path,
                parent: n
            }), this._def.right._parseSync({
                data: n.data,
                path: n.path,
                parent: n
            }))
        }
    }
    ge.create = (r, e, t) => new ge({
        left: r,
        right: e,
        typeName: p.ZodIntersection,
        ...g(t)
    });
    class L extends y {
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e);
            if (n.parsedType !== f.array)
                return l(n, {
                    code: d.invalid_type,
                    expected: f.array,
                    received: n.parsedType
                }),
                v;
            if (n.data.length < this._def.items.length)
                return l(n, {
                    code: d.too_small,
                    minimum: this._def.items.length,
                    inclusive: !0,
                    exact: !1,
                    type: "array"
                }),
                v;
            !this._def.rest && n.data.length > this._def.items.length && (l(n, {
                code: d.too_big,
                maximum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: "array"
            }),
            t.dirty());
            const a = [...n.data].map( (o, i) => {
                const c = this._def.items[i] || this._def.rest;
                return c ? c._parse(new A(n,o,n.path,i)) : null
            }
            ).filter(o => !!o);
            return n.common.async ? Promise.all(a).then(o => N.mergeArray(t, o)) : N.mergeArray(t, a)
        }
        get items() {
            return this._def.items
        }
        rest(e) {
            return new L({
                ...this._def,
                rest: e
            })
        }
    }
    L.create = (r, e) => {
        if (!Array.isArray(r))
            throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
        return new L({
            items: r,
            typeName: p.ZodTuple,
            rest: null,
            ...g(e)
        })
    }
    ;
    class ye extends y {
        get keySchema() {
            return this._def.keyType
        }
        get valueSchema() {
            return this._def.valueType
        }
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e);
            if (n.parsedType !== f.object)
                return l(n, {
                    code: d.invalid_type,
                    expected: f.object,
                    received: n.parsedType
                }),
                v;
            const s = []
              , a = this._def.keyType
              , o = this._def.valueType;
            for (const i in n.data)
                s.push({
                    key: a._parse(new A(n,i,n.path,i)),
                    value: o._parse(new A(n,n.data[i],n.path,i)),
                    alwaysSet: i in n.data
                });
            return n.common.async ? N.mergeObjectAsync(t, s) : N.mergeObjectSync(t, s)
        }
        get element() {
            return this._def.valueType
        }
        static create(e, t, n) {
            return t instanceof y ? new ye({
                keyType: e,
                valueType: t,
                typeName: p.ZodRecord,
                ...g(n)
            }) : new ye({
                keyType: Z.create(),
                valueType: e,
                typeName: p.ZodRecord,
                ...g(t)
            })
        }
    }
    class Me extends y {
        get keySchema() {
            return this._def.keyType
        }
        get valueSchema() {
            return this._def.valueType
        }
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e);
            if (n.parsedType !== f.map)
                return l(n, {
                    code: d.invalid_type,
                    expected: f.map,
                    received: n.parsedType
                }),
                v;
            const s = this._def.keyType
              , a = this._def.valueType
              , o = [...n.data.entries()].map( ([i,c], u) => ({
                key: s._parse(new A(n,i,n.path,[u, "key"])),
                value: a._parse(new A(n,c,n.path,[u, "value"]))
            }));
            if (n.common.async) {
                const i = new Map;
                return Promise.resolve().then(async () => {
                    for (const c of o) {
                        const u = await c.key
                          , m = await c.value;
                        if (u.status === "aborted" || m.status === "aborted")
                            return v;
                        (u.status === "dirty" || m.status === "dirty") && t.dirty(),
                        i.set(u.value, m.value)
                    }
                    return {
                        status: t.value,
                        value: i
                    }
                }
                )
            } else {
                const i = new Map;
                for (const c of o) {
                    const u = c.key
                      , m = c.value;
                    if (u.status === "aborted" || m.status === "aborted")
                        return v;
                    (u.status === "dirty" || m.status === "dirty") && t.dirty(),
                    i.set(u.value, m.value)
                }
                return {
                    status: t.value,
                    value: i
                }
            }
        }
    }
    Me.create = (r, e, t) => new Me({
        valueType: e,
        keyType: r,
        typeName: p.ZodMap,
        ...g(t)
    });
    class X extends y {
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e);
            if (n.parsedType !== f.set)
                return l(n, {
                    code: d.invalid_type,
                    expected: f.set,
                    received: n.parsedType
                }),
                v;
            const s = this._def;
            s.minSize !== null && n.data.size < s.minSize.value && (l(n, {
                code: d.too_small,
                minimum: s.minSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: s.minSize.message
            }),
            t.dirty()),
            s.maxSize !== null && n.data.size > s.maxSize.value && (l(n, {
                code: d.too_big,
                maximum: s.maxSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: s.maxSize.message
            }),
            t.dirty());
            const a = this._def.valueType;
            function o(c) {
                const u = new Set;
                for (const m of c) {
                    if (m.status === "aborted")
                        return v;
                    m.status === "dirty" && t.dirty(),
                    u.add(m.value)
                }
                return {
                    status: t.value,
                    value: u
                }
            }
            const i = [...n.data.values()].map( (c, u) => a._parse(new A(n,c,n.path,u)));
            return n.common.async ? Promise.all(i).then(c => o(c)) : o(i)
        }
        min(e, t) {
            return new X({
                ...this._def,
                minSize: {
                    value: e,
                    message: h.toString(t)
                }
            })
        }
        max(e, t) {
            return new X({
                ...this._def,
                maxSize: {
                    value: e,
                    message: h.toString(t)
                }
            })
        }
        size(e, t) {
            return this.min(e, t).max(e, t)
        }
        nonempty(e) {
            return this.min(1, e)
        }
    }
    X.create = (r, e) => new X({
        valueType: r,
        minSize: null,
        maxSize: null,
        typeName: p.ZodSet,
        ...g(e)
    });
    class ne extends y {
        constructor() {
            super(...arguments),
            this.validate = this.implement
        }
        _parse(e) {
            const {ctx: t} = this._processInputParams(e);
            if (t.parsedType !== f.function)
                return l(t, {
                    code: d.invalid_type,
                    expected: f.function,
                    received: t.parsedType
                }),
                v;
            function n(i, c) {
                return Ae({
                    data: i,
                    path: t.path,
                    errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, je(), Q].filter(u => !!u),
                    issueData: {
                        code: d.invalid_arguments,
                        argumentsError: c
                    }
                })
            }
            function s(i, c) {
                return Ae({
                    data: i,
                    path: t.path,
                    errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, je(), Q].filter(u => !!u),
                    issueData: {
                        code: d.invalid_return_type,
                        returnTypeError: c
                    }
                })
            }
            const a = {
                errorMap: t.common.contextualErrorMap
            }
              , o = t.data;
            if (this._def.returns instanceof se) {
                const i = this;
                return O(async function(...c) {
                    const u = new R([])
                      , m = await i._def.args.parseAsync(c, a).catch(C => {
                        throw u.addIssue(n(c, C)),
                        u
                    }
                    )
                      , T = await Reflect.apply(o, this, m);
                    return await i._def.returns._def.type.parseAsync(T, a).catch(C => {
                        throw u.addIssue(s(T, C)),
                        u
                    }
                    )
                })
            } else {
                const i = this;
                return O(function(...c) {
                    const u = i._def.args.safeParse(c, a);
                    if (!u.success)
                        throw new R([n(c, u.error)]);
                    const m = Reflect.apply(o, this, u.data)
                      , T = i._def.returns.safeParse(m, a);
                    if (!T.success)
                        throw new R([s(m, T.error)]);
                    return T.data
                })
            }
        }
        parameters() {
            return this._def.args
        }
        returnType() {
            return this._def.returns
        }
        args(...e) {
            return new ne({
                ...this._def,
                args: L.create(e).rest(J.create())
            })
        }
        returns(e) {
            return new ne({
                ...this._def,
                returns: e
            })
        }
        implement(e) {
            return this.parse(e)
        }
        strictImplement(e) {
            return this.parse(e)
        }
        static create(e, t, n) {
            return new ne({
                args: e || L.create([]).rest(J.create()),
                returns: t || J.create(),
                typeName: p.ZodFunction,
                ...g(n)
            })
        }
    }
    class _e extends y {
        get schema() {
            return this._def.getter()
        }
        _parse(e) {
            const {ctx: t} = this._processInputParams(e);
            return this._def.getter()._parse({
                data: t.data,
                path: t.path,
                parent: t
            })
        }
    }
    _e.create = (r, e) => new _e({
        getter: r,
        typeName: p.ZodLazy,
        ...g(e)
    });
    class be extends y {
        _parse(e) {
            if (e.data !== this._def.value) {
                const t = this._getOrReturnCtx(e);
                return l(t, {
                    received: t.data,
                    code: d.invalid_literal,
                    expected: this._def.value
                }),
                v
            }
            return {
                status: "valid",
                value: e.data
            }
        }
        get value() {
            return this._def.value
        }
    }
    be.create = (r, e) => new be({
        value: r,
        typeName: p.ZodLiteral,
        ...g(e)
    });
    function wt(r, e) {
        return new q({
            values: r,
            typeName: p.ZodEnum,
            ...g(e)
        })
    }
    class q extends y {
        constructor() {
            super(...arguments),
            le.set(this, void 0)
        }
        _parse(e) {
            if (typeof e.data != "string") {
                const t = this._getOrReturnCtx(e)
                  , n = this._def.values;
                return l(t, {
                    expected: _.joinValues(n),
                    received: t.parsedType,
                    code: d.invalid_type
                }),
                v
            }
            if (Le(this, le) || gt(this, le, new Set(this._def.values)),
            !Le(this, le).has(e.data)) {
                const t = this._getOrReturnCtx(e)
                  , n = this._def.values;
                return l(t, {
                    received: t.data,
                    code: d.invalid_enum_value,
                    options: n
                }),
                v
            }
            return O(e.data)
        }
        get options() {
            return this._def.values
        }
        get enum() {
            const e = {};
            for (const t of this._def.values)
                e[t] = t;
            return e
        }
        get Values() {
            const e = {};
            for (const t of this._def.values)
                e[t] = t;
            return e
        }
        get Enum() {
            const e = {};
            for (const t of this._def.values)
                e[t] = t;
            return e
        }
        extract(e, t=this._def) {
            return q.create(e, {
                ...this._def,
                ...t
            })
        }
        exclude(e, t=this._def) {
            return q.create(this.options.filter(n => !e.includes(n)), {
                ...this._def,
                ...t
            })
        }
    }
    le = new WeakMap,
    q.create = wt;
    class xe extends y {
        constructor() {
            super(...arguments),
            fe.set(this, void 0)
        }
        _parse(e) {
            const t = _.getValidEnumValues(this._def.values)
              , n = this._getOrReturnCtx(e);
            if (n.parsedType !== f.string && n.parsedType !== f.number) {
                const s = _.objectValues(t);
                return l(n, {
                    expected: _.joinValues(s),
                    received: n.parsedType,
                    code: d.invalid_type
                }),
                v
            }
            if (Le(this, fe) || gt(this, fe, new Set(_.getValidEnumValues(this._def.values))),
            !Le(this, fe).has(e.data)) {
                const s = _.objectValues(t);
                return l(n, {
                    received: n.data,
                    code: d.invalid_enum_value,
                    options: s
                }),
                v
            }
            return O(e.data)
        }
        get enum() {
            return this._def.values
        }
    }
    fe = new WeakMap,
    xe.create = (r, e) => new xe({
        values: r,
        typeName: p.ZodNativeEnum,
        ...g(e)
    });
    class se extends y {
        unwrap() {
            return this._def.type
        }
        _parse(e) {
            const {ctx: t} = this._processInputParams(e);
            if (t.parsedType !== f.promise && t.common.async === !1)
                return l(t, {
                    code: d.invalid_type,
                    expected: f.promise,
                    received: t.parsedType
                }),
                v;
            const n = t.parsedType === f.promise ? t.data : Promise.resolve(t.data);
            return O(n.then(s => this._def.type.parseAsync(s, {
                path: t.path,
                errorMap: t.common.contextualErrorMap
            })))
        }
    }
    se.create = (r, e) => new se({
        type: r,
        typeName: p.ZodPromise,
        ...g(e)
    });
    class j extends y {
        innerType() {
            return this._def.schema
        }
        sourceType() {
            return this._def.schema._def.typeName === p.ZodEffects ? this._def.schema.sourceType() : this._def.schema
        }
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e)
              , s = this._def.effect || null
              , a = {
                addIssue: o => {
                    l(n, o),
                    o.fatal ? t.abort() : t.dirty()
                }
                ,
                get path() {
                    return n.path
                }
            };
            if (a.addIssue = a.addIssue.bind(a),
            s.type === "preprocess") {
                const o = s.transform(n.data, a);
                if (n.common.async)
                    return Promise.resolve(o).then(async i => {
                        if (t.value === "aborted")
                            return v;
                        const c = await this._def.schema._parseAsync({
                            data: i,
                            path: n.path,
                            parent: n
                        });
                        return c.status === "aborted" ? v : c.status === "dirty" || t.value === "dirty" ? ee(c.value) : c
                    }
                    );
                {
                    if (t.value === "aborted")
                        return v;
                    const i = this._def.schema._parseSync({
                        data: o,
                        path: n.path,
                        parent: n
                    });
                    return i.status === "aborted" ? v : i.status === "dirty" || t.value === "dirty" ? ee(i.value) : i
                }
            }
            if (s.type === "refinement") {
                const o = i => {
                    const c = s.refinement(i, a);
                    if (n.common.async)
                        return Promise.resolve(c);
                    if (c instanceof Promise)
                        throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                    return i
                }
                ;
                if (n.common.async === !1) {
                    const i = this._def.schema._parseSync({
                        data: n.data,
                        path: n.path,
                        parent: n
                    });
                    return i.status === "aborted" ? v : (i.status === "dirty" && t.dirty(),
                    o(i.value),
                    {
                        status: t.value,
                        value: i.value
                    })
                } else
                    return this._def.schema._parseAsync({
                        data: n.data,
                        path: n.path,
                        parent: n
                    }).then(i => i.status === "aborted" ? v : (i.status === "dirty" && t.dirty(),
                    o(i.value).then( () => ({
                        status: t.value,
                        value: i.value
                    }))))
            }
            if (s.type === "transform")
                if (n.common.async === !1) {
                    const o = this._def.schema._parseSync({
                        data: n.data,
                        path: n.path,
                        parent: n
                    });
                    if (!ce(o))
                        return o;
                    const i = s.transform(o.value, a);
                    if (i instanceof Promise)
                        throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
                    return {
                        status: t.value,
                        value: i
                    }
                } else
                    return this._def.schema._parseAsync({
                        data: n.data,
                        path: n.path,
                        parent: n
                    }).then(o => ce(o) ? Promise.resolve(s.transform(o.value, a)).then(i => ({
                        status: t.value,
                        value: i
                    })) : o);
            _.assertNever(s)
        }
    }
    j.create = (r, e, t) => new j({
        schema: r,
        typeName: p.ZodEffects,
        effect: e,
        ...g(t)
    }),
    j.createWithPreprocess = (r, e, t) => new j({
        schema: e,
        effect: {
            type: "preprocess",
            transform: r
        },
        typeName: p.ZodEffects,
        ...g(t)
    });
    class P extends y {
        _parse(e) {
            return this._getType(e) === f.undefined ? O(void 0) : this._def.innerType._parse(e)
        }
        unwrap() {
            return this._def.innerType
        }
    }
    P.create = (r, e) => new P({
        innerType: r,
        typeName: p.ZodOptional,
        ...g(e)
    });
    class Y extends y {
        _parse(e) {
            return this._getType(e) === f.null ? O(null) : this._def.innerType._parse(e)
        }
        unwrap() {
            return this._def.innerType
        }
    }
    Y.create = (r, e) => new Y({
        innerType: r,
        typeName: p.ZodNullable,
        ...g(e)
    });
    class we extends y {
        _parse(e) {
            const {ctx: t} = this._processInputParams(e);
            let n = t.data;
            return t.parsedType === f.undefined && (n = this._def.defaultValue()),
            this._def.innerType._parse({
                data: n,
                path: t.path,
                parent: t
            })
        }
        removeDefault() {
            return this._def.innerType
        }
    }
    we.create = (r, e) => new we({
        innerType: r,
        typeName: p.ZodDefault,
        defaultValue: typeof e.default == "function" ? e.default : () => e.default,
        ...g(e)
    });
    class ke extends y {
        _parse(e) {
            const {ctx: t} = this._processInputParams(e)
              , n = {
                ...t,
                common: {
                    ...t.common,
                    issues: []
                }
            }
              , s = this._def.innerType._parse({
                data: n.data,
                path: n.path,
                parent: {
                    ...n
                }
            });
            return ue(s) ? s.then(a => ({
                status: "valid",
                value: a.status === "valid" ? a.value : this._def.catchValue({
                    get error() {
                        return new R(n.common.issues)
                    },
                    input: n.data
                })
            })) : {
                status: "valid",
                value: s.status === "valid" ? s.value : this._def.catchValue({
                    get error() {
                        return new R(n.common.issues)
                    },
                    input: n.data
                })
            }
        }
        removeCatch() {
            return this._def.innerType
        }
    }
    ke.create = (r, e) => new ke({
        innerType: r,
        typeName: p.ZodCatch,
        catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
        ...g(e)
    });
    class De extends y {
        _parse(e) {
            if (this._getType(e) !== f.nan) {
                const n = this._getOrReturnCtx(e);
                return l(n, {
                    code: d.invalid_type,
                    expected: f.nan,
                    received: n.parsedType
                }),
                v
            }
            return {
                status: "valid",
                value: e.data
            }
        }
    }
    De.create = r => new De({
        typeName: p.ZodNaN,
        ...g(r)
    });
    const Rr = Symbol("zod_brand");
    class tt extends y {
        _parse(e) {
            const {ctx: t} = this._processInputParams(e)
              , n = t.data;
            return this._def.type._parse({
                data: n,
                path: t.path,
                parent: t
            })
        }
        unwrap() {
            return this._def.type
        }
    }
    class Te extends y {
        _parse(e) {
            const {status: t, ctx: n} = this._processInputParams(e);
            if (n.common.async)
                return (async () => {
                    const a = await this._def.in._parseAsync({
                        data: n.data,
                        path: n.path,
                        parent: n
                    });
                    return a.status === "aborted" ? v : a.status === "dirty" ? (t.dirty(),
                    ee(a.value)) : this._def.out._parseAsync({
                        data: a.value,
                        path: n.path,
                        parent: n
                    })
                }
                )();
            {
                const s = this._def.in._parseSync({
                    data: n.data,
                    path: n.path,
                    parent: n
                });
                return s.status === "aborted" ? v : s.status === "dirty" ? (t.dirty(),
                {
                    status: "dirty",
                    value: s.value
                }) : this._def.out._parseSync({
                    data: s.value,
                    path: n.path,
                    parent: n
                })
            }
        }
        static create(e, t) {
            return new Te({
                in: e,
                out: t,
                typeName: p.ZodPipeline
            })
        }
    }
    class Ee extends y {
        _parse(e) {
            const t = this._def.innerType._parse(e)
              , n = s => (ce(s) && (s.value = Object.freeze(s.value)),
            s);
            return ue(t) ? t.then(s => n(s)) : n(t)
        }
        unwrap() {
            return this._def.innerType
        }
    }
    Ee.create = (r, e) => new Ee({
        innerType: r,
        typeName: p.ZodReadonly,
        ...g(e)
    });
    function kt(r, e={}, t) {
        return r ? te.create().superRefine( (n, s) => {
            var a, o;
            if (!r(n)) {
                const i = typeof e == "function" ? e(n) : typeof e == "string" ? {
                    message: e
                } : e
                  , c = (o = (a = i.fatal) !== null && a !== void 0 ? a : t) !== null && o !== void 0 ? o : !0
                  , u = typeof i == "string" ? {
                    message: i
                } : i;
                s.addIssue({
                    code: "custom",
                    ...u,
                    fatal: c
                })
            }
        }
        ) : te.create()
    }
    const Zr = {
        object: k.lazycreate
    };
    var p;
    (function(r) {
        r.ZodString = "ZodString",
        r.ZodNumber = "ZodNumber",
        r.ZodNaN = "ZodNaN",
        r.ZodBigInt = "ZodBigInt",
        r.ZodBoolean = "ZodBoolean",
        r.ZodDate = "ZodDate",
        r.ZodSymbol = "ZodSymbol",
        r.ZodUndefined = "ZodUndefined",
        r.ZodNull = "ZodNull",
        r.ZodAny = "ZodAny",
        r.ZodUnknown = "ZodUnknown",
        r.ZodNever = "ZodNever",
        r.ZodVoid = "ZodVoid",
        r.ZodArray = "ZodArray",
        r.ZodObject = "ZodObject",
        r.ZodUnion = "ZodUnion",
        r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
        r.ZodIntersection = "ZodIntersection",
        r.ZodTuple = "ZodTuple",
        r.ZodRecord = "ZodRecord",
        r.ZodMap = "ZodMap",
        r.ZodSet = "ZodSet",
        r.ZodFunction = "ZodFunction",
        r.ZodLazy = "ZodLazy",
        r.ZodLiteral = "ZodLiteral",
        r.ZodEnum = "ZodEnum",
        r.ZodEffects = "ZodEffects",
        r.ZodNativeEnum = "ZodNativeEnum",
        r.ZodOptional = "ZodOptional",
        r.ZodNullable = "ZodNullable",
        r.ZodDefault = "ZodDefault",
        r.ZodCatch = "ZodCatch",
        r.ZodPromise = "ZodPromise",
        r.ZodBranded = "ZodBranded",
        r.ZodPipeline = "ZodPipeline",
        r.ZodReadonly = "ZodReadonly"
    }
    )(p || (p = {}));
    const Ir = (r, e={
        message: `Input not instance of ${r.name}`
    }) => kt(t => t instanceof r, e)
      , Tt = Z.create
      , Et = B.create
      , jr = De.create
      , Ar = W.create
      , St = he.create
      , Lr = H.create
      , Pr = Pe.create
      , $r = me.create
      , Vr = pe.create
      , Mr = te.create
      , Dr = J.create
      , zr = M.create
      , Ur = $e.create
      , Br = I.create
      , Wr = k.create
      , qr = k.strictCreate
      , Yr = ve.create
      , Gr = Ve.create
      , Fr = ge.create
      , Hr = L.create
      , Jr = ye.create
      , Xr = Me.create
      , Kr = X.create
      , Qr = ne.create
      , en = _e.create
      , tn = be.create
      , rn = q.create
      , nn = xe.create
      , sn = se.create
      , Nt = j.create
      , an = P.create
      , on = Y.create
      , dn = j.createWithPreprocess
      , cn = Te.create;
    var Se = Object.freeze({
        __proto__: null,
        defaultErrorMap: Q,
        setErrorMap: hr,
        getErrorMap: je,
        makeIssue: Ae,
        EMPTY_PATH: mr,
        addIssueToContext: l,
        ParseStatus: N,
        INVALID: v,
        DIRTY: ee,
        OK: O,
        isAborted: Xe,
        isDirty: Ke,
        isValid: ce,
        isAsync: ue,
        get util() {
            return _
        },
        get objectUtil() {
            return Je
        },
        ZodParsedType: f,
        getParsedType: U,
        ZodType: y,
        datetimeRegex: xt,
        ZodString: Z,
        ZodNumber: B,
        ZodBigInt: W,
        ZodBoolean: he,
        ZodDate: H,
        ZodSymbol: Pe,
        ZodUndefined: me,
        ZodNull: pe,
        ZodAny: te,
        ZodUnknown: J,
        ZodNever: M,
        ZodVoid: $e,
        ZodArray: I,
        ZodObject: k,
        ZodUnion: ve,
        ZodDiscriminatedUnion: Ve,
        ZodIntersection: ge,
        ZodTuple: L,
        ZodRecord: ye,
        ZodMap: Me,
        ZodSet: X,
        ZodFunction: ne,
        ZodLazy: _e,
        ZodLiteral: be,
        ZodEnum: q,
        ZodNativeEnum: xe,
        ZodPromise: se,
        ZodEffects: j,
        ZodTransformer: j,
        ZodOptional: P,
        ZodNullable: Y,
        ZodDefault: we,
        ZodCatch: ke,
        ZodNaN: De,
        BRAND: Rr,
        ZodBranded: tt,
        ZodPipeline: Te,
        ZodReadonly: Ee,
        custom: kt,
        Schema: y,
        ZodSchema: y,
        late: Zr,
        get ZodFirstPartyTypeKind() {
            return p
        },
        coerce: {
            string: r => Z.create({
                ...r,
                coerce: !0
            }),
            number: r => B.create({
                ...r,
                coerce: !0
            }),
            boolean: r => he.create({
                ...r,
                coerce: !0
            }),
            bigint: r => W.create({
                ...r,
                coerce: !0
            }),
            date: r => H.create({
                ...r,
                coerce: !0
            })
        },
        any: Mr,
        array: Br,
        bigint: Ar,
        boolean: St,
        date: Lr,
        discriminatedUnion: Gr,
        effect: Nt,
        enum: rn,
        function: Qr,
        instanceof: Ir,
        intersection: Fr,
        lazy: en,
        literal: tn,
        map: Xr,
        nan: jr,
        nativeEnum: nn,
        never: zr,
        null: Vr,
        nullable: on,
        number: Et,
        object: Wr,
        oboolean: () => St().optional(),
        onumber: () => Et().optional(),
        optional: an,
        ostring: () => Tt().optional(),
        pipeline: cn,
        preprocess: dn,
        promise: sn,
        record: Jr,
        set: Kr,
        strictObject: qr,
        string: Tt,
        symbol: Pr,
        transformer: Nt,
        tuple: Hr,
        undefined: $r,
        union: Yr,
        unknown: Dr,
        void: Ur,
        NEVER: v,
        ZodIssueCode: d,
        quotelessJson: fr,
        ZodError: R
    });
    const un = ["google", "userInfo", "uuid"];
    Se.object({
        type: Se.enum(un),
        accountId: Se.string(),
        email: Se.string(),
        browser: Se.string()
    }).strict();
    var Ne = (r => (r.Offscreen = "offscreen",
    r.Events = "events",
    r.SameTab = "same-tab",
    r.Background = "background",
    r.Editor = "editor",
    r.Brave = "brave",
    r.Licenses = "licenses",
    r.SmoothScrolling = "smooth-scrolling",
    r.Record = "record",
    r))(Ne || {})
      , rt = (r => (r.Start = "start-recording",
    r.RecordEvents = "record-events",
    r.Pause = "pause-recording",
    r.Resume = "resume-recording",
    r.Stop = "stop-recording",
    r.MouseEvent = "mouse-event",
    r.KeyboardEvent = "keyboard-event",
    r.ResizeEvent = "resize-event",
    r.BoundsEvent = "bounds-event",
    r.EditorReady = "editor-ready",
    r.Recordings = "recordings",
    r.NavEvent = "nav-event",
    r.Unload = "unload",
    r.Started = "started",
    r.CreateTab = "create-tab",
    r.UpdateTab = "update-tab",
    r.StorageGetLicense = "storage-get-license",
    r.StorageLicense = "storage-license",
    r.StorageSetLicense = "storage-set-license",
    r.StorageLicenseChange = "storage-license-change",
    r.GetBrowserProfile = "get-browser-profile",
    r.BrowserProfile = "browser-profile",
    r.WaitVisible = "wait-visible",
    r.CanInject = "can-inject",
    r.SmoothScroll = "smooth-scroll",
    r.LoadLatest = "load-latest",
    r))(rt || {});
    function En(r) {
        return r
    }
    const ln = {
        registration: "runtime",
        matches: ["<all_urls>"],
        main() {
            ur(Ne.Events, () => {
                console.log("Cursorful events script injected");
                const r = cr.createChannel(Ne.Events)
                  , e = window.self !== window.top
                  , t = (b, C, z) => {
                    e && z ? window.parent.postMessage({
                        cursorful: {
                            type: b,
                            event: C
                        }
                    }, "*") : r.send([Ne.Offscreen, Ne.Background], b, C)
                }
                ;
                let n;
                const s = b => (a = !0,
                n = lr(),
                t(rt.ResizeEvent, {
                    eventName: "resize",
                    timeStamp: 0,
                    timeOrigin: 0,
                    timeMs: 0,
                    ...n,
                    source: `events:${b}`
                }, !1));
                let a = !0;
                const o = sr( () => {
                    a = !0,
                    s("debounced-resize")
                }
                , 200, {
                    leading: !0
                })
                  , i = () => {
                    window.devicePixelRatio !== (n == null ? void 0 : n.dpr) && s("dpr-resize"),
                    o()
                }
                ;
                window.addEventListener("resize", i, {
                    capture: !0
                });
                const c = ["mousedown", "mousemove", "mouseup", "dragstart", "drag", "dragend"]
                  , u = {
                    dragstart: "mousedown",
                    dragend: "mouseup"
                }
                  , m = b => {
                    if (b.data.cursorful) {
                        b.stopImmediatePropagation();
                        const {type: C, event: z} = b.data.cursorful
                          , ie = b.source;
                        let $;
                        try {
                            $ = ie.frameElement
                        } catch {}
                        if ($ = $ || Array.from(document.getElementsByTagName("iframe")).find(Ce => Ce.contentWindow === ie),
                        !$)
                            throw new Error("frameElement not found");
                        const {left: V, top: oe} = $.getBoundingClientRect();
                        z.clientX += V,
                        z.clientY += oe,
                        t(C, z, !0)
                    }
                }
                ;
                window.addEventListener("message", m, {
                    capture: !0
                });
                const T = b => {
                    if (!b.isTrusted || ![0].includes(b.button))
                        return;
                    const {screenX: C, screenY: z, pageX: ie, pageY: $} = b;
                    let V = {
                        eventName: u[b.type] || b.type,
                        timeStamp: 0,
                        timeOrigin: 0,
                        timeMs: 0,
                        screenX: C,
                        screenY: z,
                        pageX: ie,
                        pageY: $
                    };
                    if (!e || a) {
                        const {clientX: oe, clientY: Ce} = b;
                        V = {
                            ...V,
                            clientX: oe,
                            clientY: Ce
                        }
                    }
                    t(rt.MouseEvent, V, a),
                    a = !1
                }
                ;
                return c.forEach(b => {
                    window.addEventListener(b, T, {
                        capture: !0,
                        passive: !0
                    })
                }
                ),
                () => {
                    window.removeEventListener("resize", i, {
                        capture: !0
                    }),
                    window.removeEventListener("message", m, {
                        capture: !0
                    }),
                    c.forEach(b => {
                        window.removeEventListener(b, T, {
                            capture: !0
                        })
                    }
                    )
                }
            }
            )
        }
    }
      , ze = ((Rt = (Ct = globalThis.browser) == null ? void 0 : Ct.runtime) == null ? void 0 : Rt.id) == null ? globalThis.chrome : globalThis.browser;
    function Ue(r, ...e) {}
    const fn = {
        debug: (...r) => Ue(console.debug, ...r),
        log: (...r) => Ue(console.log, ...r),
        warn: (...r) => Ue(console.warn, ...r),
        error: (...r) => Ue(console.error, ...r)
    }
      , hn = {
        BASE_URL: "/",
        BROWSER: "chrome",
        CHROME: !0,
        COMMAND: "build",
        DEV: !1,
        EDGE: !1,
        ENTRYPOINT: "events",
        FIREFOX: !1,
        MANIFEST_VERSION: 3,
        MODE: "production",
        OPERA: !1,
        PROD: !0,
        SAFARI: !1,
        SSR: !1,
        VITE_CJS_IGNORE_WARNING: "true"
    }
      , We = class We extends Event {
        constructor(e, t) {
            super(We.EVENT_NAME, {}),
            this.newUrl = e,
            this.oldUrl = t
        }
    }
    ;
    it(We, "EVENT_NAME", Ot("wxt:locationchange"));
    let nt = We;
    function Ot(r) {
        var t;
        const e = typeof hn > "u" ? "build" : "events";
        return `${(t = ze == null ? void 0 : ze.runtime) == null ? void 0 : t.id}:${e}:${r}`
    }
    function mn(r) {
        let e, t;
        return {
            run() {
                e == null && (t = new URL(location.href),
                e = r.setInterval( () => {
                    let n = new URL(location.href);
                    n.href !== t.href && (window.dispatchEvent(new nt(n,t)),
                    t = n)
                }
                , 1e3))
            }
        }
    }
    const Oe = class Oe {
        constructor(e, t) {
            Ie(this, K);
            Ie(this, qe, window.self === window.top);
            Ie(this, ae);
            Ie(this, Ye, mn(this));
            this.contentScriptName = e,
            this.options = t,
            jt(this, ae, new AbortController),
            Ze(this, qe) ? (Ge(this, K, dt).call(this, {
                ignoreFirstEvent: !0
            }),
            Ge(this, K, At).call(this)) : Ge(this, K, dt).call(this)
        }
        get signal() {
            return Ze(this, ae).signal
        }
        abort(e) {
            return Ze(this, ae).abort(e)
        }
        get isInvalid() {
            return ze.runtime.id == null && this.notifyInvalidated(),
            this.signal.aborted
        }
        get isValid() {
            return !this.isInvalid
        }
        onInvalidated(e) {
            return this.signal.addEventListener("abort", e),
            () => this.signal.removeEventListener("abort", e)
        }
        block() {
            return new Promise( () => {}
            )
        }
        setInterval(e, t) {
            const n = setInterval( () => {
                this.isValid && e()
            }
            , t);
            return this.onInvalidated( () => clearInterval(n)),
            n
        }
        setTimeout(e, t) {
            const n = setTimeout( () => {
                this.isValid && e()
            }
            , t);
            return this.onInvalidated( () => clearTimeout(n)),
            n
        }
        requestAnimationFrame(e) {
            const t = requestAnimationFrame( (...n) => {
                this.isValid && e(...n)
            }
            );
            return this.onInvalidated( () => cancelAnimationFrame(t)),
            t
        }
        requestIdleCallback(e, t) {
            const n = requestIdleCallback( (...s) => {
                this.signal.aborted || e(...s)
            }
            , t);
            return this.onInvalidated( () => cancelIdleCallback(n)),
            n
        }
        addEventListener(e, t, n, s) {
            var a;
            t === "wxt:locationchange" && this.isValid && Ze(this, Ye).run(),
            (a = e.addEventListener) == null || a.call(e, t.startsWith("wxt:") ? Ot(t) : t, n, {
                ...s,
                signal: this.signal
            })
        }
        notifyInvalidated() {
            this.abort("Content script context invalidated"),
            fn.debug(`Content script "${this.contentScriptName}" context invalidated`)
        }
    }
    ;
    qe = new WeakMap,
    ae = new WeakMap,
    Ye = new WeakMap,
    K = new WeakSet,
    At = function() {
        window.postMessage({
            type: Oe.SCRIPT_STARTED_MESSAGE_TYPE,
            contentScriptName: this.contentScriptName
        }, "*")
    }
    ,
    dt = function(e) {
        let t = !0;
        const n = s => {
            var a, o;
            if (((a = s.data) == null ? void 0 : a.type) === Oe.SCRIPT_STARTED_MESSAGE_TYPE && ((o = s.data) == null ? void 0 : o.contentScriptName) === this.contentScriptName) {
                const i = t;
                if (t = !1,
                i && (e != null && e.ignoreFirstEvent))
                    return;
                this.notifyInvalidated()
            }
        }
        ;
        addEventListener("message", n),
        this.onInvalidated( () => removeEventListener("message", n))
    }
    ,
    it(Oe, "SCRIPT_STARTED_MESSAGE_TYPE", "wxt:content-script-started");
    let st = Oe;
    function Sn() {}
    function Be(r, ...e) {}
    const pn = {
        debug: (...r) => Be(console.debug, ...r),
        log: (...r) => Be(console.log, ...r),
        warn: (...r) => Be(console.warn, ...r),
        error: (...r) => Be(console.error, ...r)
    };
    return (async () => {
        try {
            const {main: r, ...e} = ln
              , t = new st("events",e);
            return await r(t)
        } catch (r) {
            throw pn.error('The content script "events" crashed on startup!', r),
            r
        }
    }
    )()
}();
events;
