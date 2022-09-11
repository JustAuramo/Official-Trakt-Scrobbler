(() => {
    var t = {
            7017: (t, e, r) => {
                t.exports = r(7410)
            },
            8194: t => {
                function e(t) {
                    this.queue = [], this.timeslotRequests = 0, this.interceptors = {
                        request: null,
                        response: null
                    }, this.handleRequest = this.handleRequest.bind(this), this.handleResponse = this.handleResponse.bind(this), this.enable(t)
                }
                e.prototype.getMaxRPS = function () {
                    var t = this.perMilliseconds / 1e3;
                    return this.maxRequests / t
                }, e.prototype.setMaxRPS = function (t) {
                    this.setRateLimitOptions({
                        maxRequests: t,
                        perMilliseconds: 1e3
                    })
                }, e.prototype.setRateLimitOptions = function (t) {
                    t.maxRPS ? this.setMaxRPS(t.maxRPS) : (this.perMilliseconds = t.perMilliseconds, this.maxRequests = t.maxRequests)
                }, e.prototype.enable = function (t) {
                    function e(t) {
                        return Promise.reject(t)
                    }
                    this.interceptors.request = t.interceptors.request.use(this.handleRequest, e), this.interceptors.response = t.interceptors.response.use(this.handleResponse, e)
                }, e.prototype.handleRequest = function (t) {
                    return new Promise(function (e) {
                        this.push({
                            request: t,
                            resolve: function () {
                                e(t)
                            }
                        })
                    }.bind(this))
                }, e.prototype.handleResponse = function (t) {
                    return this.shift(), t
                }, e.prototype.push = function (t) {
                    for (var e = 0, r = this.queue.length, n = t.request.priority || 0; e < r && this.queue[e].priority >= n;) e++;
                    e < r ? this.queue.splice(e, 0, t) : this.queue.push(t), this.shiftInitial()
                }, e.prototype.shiftInitial = function () {
                    setTimeout(function () {
                        return this.shift()
                    }.bind(this), 0)
                }, e.prototype.shift = function () {
                    if (this.queue.length)
                        if (this.timeslotRequests !== this.maxRequests) {
                            var t = this.queue.shift();
                            t.resolve(), t.request.signal && t.request.signal.aborted ? this.shift() : (0 === this.timeslotRequests && (this.timeoutId = setTimeout(function () {
                                this.timeslotRequests = 0, this.shift()
                            }.bind(this), this.perMilliseconds), "function" == typeof this.timeoutId.unref && 0 === this.queue.length && this.timeoutId.unref()), this.timeslotRequests += 1)
                        } else this.timeoutId && "function" == typeof this.timeoutId.ref && this.timeoutId.ref()
                }, t.exports = function (t, r) {
                    var n = new e(t);
                    return n.setRateLimitOptions(r), t.getMaxRPS = e.prototype.getMaxRPS.bind(n), t.setMaxRPS = e.prototype.setMaxRPS.bind(n), t.setRateLimitOptions = e.prototype.setRateLimitOptions.bind(n), t
                }
            },
            6090: (t, e, r) => {
                t.exports = r(2363)
            },
            9339: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = r(3363),
                    o = r(7384),
                    a = r(2031),
                    s = r(1788),
                    c = r(6270),
                    u = r(1452),
                    l = r(9859),
                    h = r(3711),
                    f = r(6816);
                t.exports = function (t) {
                    return new Promise((function (e, r) {
                        var p, d = t.data,
                            m = t.headers,
                            v = t.responseType;

                        function g() {
                            t.cancelToken && t.cancelToken.unsubscribe(p), t.signal && t.signal.removeEventListener("abort", p)
                        }
                        n.isFormData(d) && delete m["Content-Type"];
                        var y = new XMLHttpRequest;
                        if (t.auth) {
                            var b = t.auth.username || "",
                                w = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
                            m.Authorization = "Basic " + btoa(b + ":" + w)
                        }
                        var x = s(t.baseURL, t.url);

                        function k() {
                            if (y) {
                                var n = "getAllResponseHeaders" in y ? c(y.getAllResponseHeaders()) : null,
                                    o = {
                                        data: v && "text" !== v && "json" !== v ? y.response : y.responseText,
                                        status: y.status,
                                        statusText: y.statusText,
                                        headers: n,
                                        config: t,
                                        request: y
                                    };
                                i((function (t) {
                                    e(t), g()
                                }), (function (t) {
                                    r(t), g()
                                }), o), y = null
                            }
                        }
                        if (y.open(t.method.toUpperCase(), a(x, t.params, t.paramsSerializer), !0), y.timeout = t.timeout, "onloadend" in y ? y.onloadend = k : y.onreadystatechange = function () {
                                y && 4 === y.readyState && (0 !== y.status || y.responseURL && 0 === y.responseURL.indexOf("file:")) && setTimeout(k)
                            }, y.onabort = function () {
                                y && (r(l("Request aborted", t, "ECONNABORTED", y)), y = null)
                            }, y.onerror = function () {
                                r(l("Network Error", t, null, y)), y = null
                            }, y.ontimeout = function () {
                                var e = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded",
                                    n = t.transitional || h;
                                t.timeoutErrorMessage && (e = t.timeoutErrorMessage), r(l(e, t, n.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", y)), y = null
                            }, n.isStandardBrowserEnv()) {
                            var S = (t.withCredentials || u(x)) && t.xsrfCookieName ? o.read(t.xsrfCookieName) : void 0;
                            S && (m[t.xsrfHeaderName] = S)
                        }
                        "setRequestHeader" in y && n.forEach(m, (function (t, e) {
                            void 0 === d && "content-type" === e.toLowerCase() ? delete m[e] : y.setRequestHeader(e, t)
                        })), n.isUndefined(t.withCredentials) || (y.withCredentials = !!t.withCredentials), v && "json" !== v && (y.responseType = t.responseType), "function" == typeof t.onDownloadProgress && y.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && y.upload && y.upload.addEventListener("progress", t.onUploadProgress), (t.cancelToken || t.signal) && (p = function (t) {
                            y && (r(!t || t && t.type ? new f("canceled") : t), y.abort(), y = null)
                        }, t.cancelToken && t.cancelToken.subscribe(p), t.signal && (t.signal.aborted ? p() : t.signal.addEventListener("abort", p))), d || (d = null), y.send(d)
                    }))
                }
            },
            2363: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = r(6887),
                    o = r(5478),
                    a = r(6111),
                    s = function t(e) {
                        var r = new o(e),
                            s = i(o.prototype.request, r);
                        return n.extend(s, o.prototype, r), n.extend(s, r), s.create = function (r) {
                            return t(a(e, r))
                        }, s
                    }(r(9301));
                s.Axios = o, s.Cancel = r(6816), s.CancelToken = r(3271), s.isCancel = r(5542), s.VERSION = r(2903).version, s.all = function (t) {
                    return Promise.all(t)
                }, s.spread = r(723), s.isAxiosError = r(4092), t.exports = s, t.exports.default = s
            },
            6816: t => {
                "use strict";

                function e(t) {
                    this.message = t
                }
                e.prototype.toString = function () {
                    return "Cancel" + (this.message ? ": " + this.message : "")
                }, e.prototype.__CANCEL__ = !0, t.exports = e
            },
            3271: (t, e, r) => {
                "use strict";
                var n = r(6816);

                function i(t) {
                    if ("function" != typeof t) throw new TypeError("executor must be a function.");
                    var e;
                    this.promise = new Promise((function (t) {
                        e = t
                    }));
                    var r = this;
                    this.promise.then((function (t) {
                        if (r._listeners) {
                            var e, n = r._listeners.length;
                            for (e = 0; e < n; e++) r._listeners[e](t);
                            r._listeners = null
                        }
                    })), this.promise.then = function (t) {
                        var e, n = new Promise((function (t) {
                            r.subscribe(t), e = t
                        })).then(t);
                        return n.cancel = function () {
                            r.unsubscribe(e)
                        }, n
                    }, t((function (t) {
                        r.reason || (r.reason = new n(t), e(r.reason))
                    }))
                }
                i.prototype.throwIfRequested = function () {
                    if (this.reason) throw this.reason
                }, i.prototype.subscribe = function (t) {
                    this.reason ? t(this.reason) : this._listeners ? this._listeners.push(t) : this._listeners = [t]
                }, i.prototype.unsubscribe = function (t) {
                    if (this._listeners) {
                        var e = this._listeners.indexOf(t); - 1 !== e && this._listeners.splice(e, 1)
                    }
                }, i.source = function () {
                    var t;
                    return {
                        token: new i((function (e) {
                            t = e
                        })),
                        cancel: t
                    }
                }, t.exports = i
            },
            5542: t => {
                "use strict";
                t.exports = function (t) {
                    return !(!t || !t.__CANCEL__)
                }
            },
            5478: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = r(2031),
                    o = r(9512),
                    a = r(5791),
                    s = r(6111),
                    c = r(7407),
                    u = c.validators;

                function l(t) {
                    this.defaults = t, this.interceptors = {
                        request: new o,
                        response: new o
                    }
                }
                l.prototype.request = function (t, e) {
                    "string" == typeof t ? (e = e || {}).url = t : e = t || {}, (e = s(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
                    var r = e.transitional;
                    void 0 !== r && c.assertOptions(r, {
                        silentJSONParsing: u.transitional(u.boolean),
                        forcedJSONParsing: u.transitional(u.boolean),
                        clarifyTimeoutError: u.transitional(u.boolean)
                    }, !1);
                    var n = [],
                        i = !0;
                    this.interceptors.request.forEach((function (t) {
                        "function" == typeof t.runWhen && !1 === t.runWhen(e) || (i = i && t.synchronous, n.unshift(t.fulfilled, t.rejected))
                    }));
                    var o, l = [];
                    if (this.interceptors.response.forEach((function (t) {
                            l.push(t.fulfilled, t.rejected)
                        })), !i) {
                        var h = [a, void 0];
                        for (Array.prototype.unshift.apply(h, n), h = h.concat(l), o = Promise.resolve(e); h.length;) o = o.then(h.shift(), h.shift());
                        return o
                    }
                    for (var f = e; n.length;) {
                        var p = n.shift(),
                            d = n.shift();
                        try {
                            f = p(f)
                        } catch (t) {
                            d(t);
                            break
                        }
                    }
                    try {
                        o = a(f)
                    } catch (t) {
                        return Promise.reject(t)
                    }
                    for (; l.length;) o = o.then(l.shift(), l.shift());
                    return o
                }, l.prototype.getUri = function (t) {
                    return t = s(this.defaults, t), i(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
                }, n.forEach(["delete", "get", "head", "options"], (function (t) {
                    l.prototype[t] = function (e, r) {
                        return this.request(s(r || {}, {
                            method: t,
                            url: e,
                            data: (r || {}).data
                        }))
                    }
                })), n.forEach(["post", "put", "patch"], (function (t) {
                    l.prototype[t] = function (e, r, n) {
                        return this.request(s(n || {}, {
                            method: t,
                            url: e,
                            data: r
                        }))
                    }
                })), t.exports = l
            },
            9512: (t, e, r) => {
                "use strict";
                var n = r(4521);

                function i() {
                    this.handlers = []
                }
                i.prototype.use = function (t, e, r) {
                    return this.handlers.push({
                        fulfilled: t,
                        rejected: e,
                        synchronous: !!r && r.synchronous,
                        runWhen: r ? r.runWhen : null
                    }), this.handlers.length - 1
                }, i.prototype.eject = function (t) {
                    this.handlers[t] && (this.handlers[t] = null)
                }, i.prototype.forEach = function (t) {
                    n.forEach(this.handlers, (function (e) {
                        null !== e && t(e)
                    }))
                }, t.exports = i
            },
            1788: (t, e, r) => {
                "use strict";
                var n = r(6842),
                    i = r(9335);
                t.exports = function (t, e) {
                    return t && !n(e) ? i(t, e) : e
                }
            },
            9859: (t, e, r) => {
                "use strict";
                var n = r(3648);
                t.exports = function (t, e, r, i, o) {
                    var a = new Error(t);
                    return n(a, e, r, i, o)
                }
            },
            5791: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = r(887),
                    o = r(5542),
                    a = r(9301),
                    s = r(6816);

                function c(t) {
                    if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted) throw new s("canceled")
                }
                t.exports = function (t) {
                    return c(t), t.headers = t.headers || {}, t.data = i.call(t, t.data, t.headers, t.transformRequest), t.headers = n.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (e) {
                        delete t.headers[e]
                    })), (t.adapter || a.adapter)(t).then((function (e) {
                        return c(t), e.data = i.call(t, e.data, e.headers, t.transformResponse), e
                    }), (function (e) {
                        return o(e) || (c(t), e && e.response && (e.response.data = i.call(t, e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
                    }))
                }
            },
            3648: t => {
                "use strict";
                t.exports = function (t, e, r, n, i) {
                    return t.config = e, r && (t.code = r), t.request = n, t.response = i, t.isAxiosError = !0, t.toJSON = function () {
                        return {
                            message: this.message,
                            name: this.name,
                            description: this.description,
                            number: this.number,
                            fileName: this.fileName,
                            lineNumber: this.lineNumber,
                            columnNumber: this.columnNumber,
                            stack: this.stack,
                            config: this.config,
                            code: this.code,
                            status: this.response && this.response.status ? this.response.status : null
                        }
                    }, t
                }
            },
            6111: (t, e, r) => {
                "use strict";
                var n = r(4521);
                t.exports = function (t, e) {
                    e = e || {};
                    var r = {};

                    function i(t, e) {
                        return n.isPlainObject(t) && n.isPlainObject(e) ? n.merge(t, e) : n.isPlainObject(e) ? n.merge({}, e) : n.isArray(e) ? e.slice() : e
                    }

                    function o(r) {
                        return n.isUndefined(e[r]) ? n.isUndefined(t[r]) ? void 0 : i(void 0, t[r]) : i(t[r], e[r])
                    }

                    function a(t) {
                        if (!n.isUndefined(e[t])) return i(void 0, e[t])
                    }

                    function s(r) {
                        return n.isUndefined(e[r]) ? n.isUndefined(t[r]) ? void 0 : i(void 0, t[r]) : i(void 0, e[r])
                    }

                    function c(r) {
                        return r in e ? i(t[r], e[r]) : r in t ? i(void 0, t[r]) : void 0
                    }
                    var u = {
                        url: a,
                        method: a,
                        data: a,
                        baseURL: s,
                        transformRequest: s,
                        transformResponse: s,
                        paramsSerializer: s,
                        timeout: s,
                        timeoutMessage: s,
                        withCredentials: s,
                        adapter: s,
                        responseType: s,
                        xsrfCookieName: s,
                        xsrfHeaderName: s,
                        onUploadProgress: s,
                        onDownloadProgress: s,
                        decompress: s,
                        maxContentLength: s,
                        maxBodyLength: s,
                        transport: s,
                        httpAgent: s,
                        httpsAgent: s,
                        cancelToken: s,
                        socketPath: s,
                        responseEncoding: s,
                        validateStatus: c
                    };
                    return n.forEach(Object.keys(t).concat(Object.keys(e)), (function (t) {
                        var e = u[t] || o,
                            i = e(t);
                        n.isUndefined(i) && e !== c || (r[t] = i)
                    })), r
                }
            },
            3363: (t, e, r) => {
                "use strict";
                var n = r(9859);
                t.exports = function (t, e, r) {
                    var i = r.config.validateStatus;
                    r.status && i && !i(r.status) ? e(n("Request failed with status code " + r.status, r.config, null, r.request, r)) : t(r)
                }
            },
            887: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = r(9301);
                t.exports = function (t, e, r) {
                    var o = this || i;
                    return n.forEach(r, (function (r) {
                        t = r.call(o, t, e)
                    })), t
                }
            },
            9301: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = r(8715),
                    o = r(3648),
                    a = r(3711),
                    s = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };

                function c(t, e) {
                    !n.isUndefined(t) && n.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e)
                }
                var u, l = {
                    transitional: a,
                    adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (u = r(9339)), u),
                    transformRequest: [function (t, e) {
                        return i(e, "Accept"), i(e, "Content-Type"), n.isFormData(t) || n.isArrayBuffer(t) || n.isBuffer(t) || n.isStream(t) || n.isFile(t) || n.isBlob(t) ? t : n.isArrayBufferView(t) ? t.buffer : n.isURLSearchParams(t) ? (c(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : n.isObject(t) || e && "application/json" === e["Content-Type"] ? (c(e, "application/json"), function (t, e, r) {
                            if (n.isString(t)) try {
                                return (0, JSON.parse)(t), n.trim(t)
                            } catch (t) {
                                if ("SyntaxError" !== t.name) throw t
                            }
                            return (0, JSON.stringify)(t)
                        }(t)) : t
                    }],
                    transformResponse: [function (t) {
                        var e = this.transitional || l.transitional,
                            r = e && e.silentJSONParsing,
                            i = e && e.forcedJSONParsing,
                            a = !r && "json" === this.responseType;
                        if (a || i && n.isString(t) && t.length) try {
                            return JSON.parse(t)
                        } catch (t) {
                            if (a) {
                                if ("SyntaxError" === t.name) throw o(t, this, "E_JSON_PARSE");
                                throw t
                            }
                        }
                        return t
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    validateStatus: function (t) {
                        return t >= 200 && t < 300
                    },
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        }
                    }
                };
                n.forEach(["delete", "get", "head"], (function (t) {
                    l.headers[t] = {}
                })), n.forEach(["post", "put", "patch"], (function (t) {
                    l.headers[t] = n.merge(s)
                })), t.exports = l
            },
            3711: t => {
                "use strict";
                t.exports = {
                    silentJSONParsing: !0,
                    forcedJSONParsing: !0,
                    clarifyTimeoutError: !1
                }
            },
            2903: t => {
                t.exports = {
                    version: "0.26.1"
                }
            },
            6887: t => {
                "use strict";
                t.exports = function (t, e) {
                    return function () {
                        for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];
                        return t.apply(e, r)
                    }
                }
            },
            2031: (t, e, r) => {
                "use strict";
                var n = r(4521);

                function i(t) {
                    return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
                }
                t.exports = function (t, e, r) {
                    if (!e) return t;
                    var o;
                    if (r) o = r(e);
                    else if (n.isURLSearchParams(e)) o = e.toString();
                    else {
                        var a = [];
                        n.forEach(e, (function (t, e) {
                            null != t && (n.isArray(t) ? e += "[]" : t = [t], n.forEach(t, (function (t) {
                                n.isDate(t) ? t = t.toISOString() : n.isObject(t) && (t = JSON.stringify(t)), a.push(i(e) + "=" + i(t))
                            })))
                        })), o = a.join("&")
                    }
                    if (o) {
                        var s = t.indexOf("#"); - 1 !== s && (t = t.slice(0, s)), t += (-1 === t.indexOf("?") ? "?" : "&") + o
                    }
                    return t
                }
            },
            9335: t => {
                "use strict";
                t.exports = function (t, e) {
                    return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
                }
            },
            7384: (t, e, r) => {
                "use strict";
                var n = r(4521);
                t.exports = n.isStandardBrowserEnv() ? {
                    write: function (t, e, r, i, o, a) {
                        var s = [];
                        s.push(t + "=" + encodeURIComponent(e)), n.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()), n.isString(i) && s.push("path=" + i), n.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ")
                    },
                    read: function (t) {
                        var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                        return e ? decodeURIComponent(e[3]) : null
                    },
                    remove: function (t) {
                        this.write(t, "", Date.now() - 864e5)
                    }
                } : {
                    write: function () {},
                    read: function () {
                        return null
                    },
                    remove: function () {}
                }
            },
            6842: t => {
                "use strict";
                t.exports = function (t) {
                    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
                }
            },
            4092: (t, e, r) => {
                "use strict";
                var n = r(4521);
                t.exports = function (t) {
                    return n.isObject(t) && !0 === t.isAxiosError
                }
            },
            1452: (t, e, r) => {
                "use strict";
                var n = r(4521);
                t.exports = n.isStandardBrowserEnv() ? function () {
                    var t, e = /(msie|trident)/i.test(navigator.userAgent),
                        r = document.createElement("a");

                    function i(t) {
                        var n = t;
                        return e && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
                            href: r.href,
                            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                            host: r.host,
                            search: r.search ? r.search.replace(/^\?/, "") : "",
                            hash: r.hash ? r.hash.replace(/^#/, "") : "",
                            hostname: r.hostname,
                            port: r.port,
                            pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
                        }
                    }
                    return t = i(window.location.href),
                        function (e) {
                            var r = n.isString(e) ? i(e) : e;
                            return r.protocol === t.protocol && r.host === t.host
                        }
                }() : function () {
                    return !0
                }
            },
            8715: (t, e, r) => {
                "use strict";
                var n = r(4521);
                t.exports = function (t, e) {
                    n.forEach(t, (function (r, n) {
                        n !== e && n.toUpperCase() === e.toUpperCase() && (t[e] = r, delete t[n])
                    }))
                }
            },
            6270: (t, e, r) => {
                "use strict";
                var n = r(4521),
                    i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
                t.exports = function (t) {
                    var e, r, o, a = {};
                    return t ? (n.forEach(t.split("\n"), (function (t) {
                        if (o = t.indexOf(":"), e = n.trim(t.substr(0, o)).toLowerCase(), r = n.trim(t.substr(o + 1)), e) {
                            if (a[e] && i.indexOf(e) >= 0) return;
                            a[e] = "set-cookie" === e ? (a[e] ? a[e] : []).concat([r]) : a[e] ? a[e] + ", " + r : r
                        }
                    })), a) : a
                }
            },
            723: t => {
                "use strict";
                t.exports = function (t) {
                    return function (e) {
                        return t.apply(null, e)
                    }
                }
            },
            7407: (t, e, r) => {
                "use strict";
                var n = r(2903).version,
                    i = {};
                ["object", "boolean", "number", "function", "string", "symbol"].forEach((function (t, e) {
                    i[t] = function (r) {
                        return typeof r === t || "a" + (e < 1 ? "n " : " ") + t
                    }
                }));
                var o = {};
                i.transitional = function (t, e, r) {
                    function i(t, e) {
                        return "[Axios v" + n + "] Transitional option '" + t + "'" + e + (r ? ". " + r : "")
                    }
                    return function (r, n, a) {
                        if (!1 === t) throw new Error(i(n, " has been removed" + (e ? " in " + e : "")));
                        return e && !o[n] && (o[n] = !0, console.warn(i(n, " has been deprecated since v" + e + " and will be removed in the near future"))), !t || t(r, n, a)
                    }
                }, t.exports = {
                    assertOptions: function (t, e, r) {
                        if ("object" != typeof t) throw new TypeError("options must be an object");
                        for (var n = Object.keys(t), i = n.length; i-- > 0;) {
                            var o = n[i],
                                a = e[o];
                            if (a) {
                                var s = t[o],
                                    c = void 0 === s || a(s, o, t);
                                if (!0 !== c) throw new TypeError("option " + o + " must be " + c)
                            } else if (!0 !== r) throw Error("Unknown option " + o)
                        }
                    },
                    validators: i
                }
            },
            4521: (t, e, r) => {
                "use strict";
                var n = r(6887),
                    i = Object.prototype.toString;

                function o(t) {
                    return Array.isArray(t)
                }

                function a(t) {
                    return void 0 === t
                }

                function s(t) {
                    return "[object ArrayBuffer]" === i.call(t)
                }

                function c(t) {
                    return null !== t && "object" == typeof t
                }

                function u(t) {
                    if ("[object Object]" !== i.call(t)) return !1;
                    var e = Object.getPrototypeOf(t);
                    return null === e || e === Object.prototype
                }

                function l(t) {
                    return "[object Function]" === i.call(t)
                }

                function h(t, e) {
                    if (null != t)
                        if ("object" != typeof t && (t = [t]), o(t))
                            for (var r = 0, n = t.length; r < n; r++) e.call(null, t[r], r, t);
                        else
                            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i], i, t)
                }
                t.exports = {
                    isArray: o,
                    isArrayBuffer: s,
                    isBuffer: function (t) {
                        return null !== t && !a(t) && null !== t.constructor && !a(t.constructor) && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
                    },
                    isFormData: function (t) {
                        return "[object FormData]" === i.call(t)
                    },
                    isArrayBufferView: function (t) {
                        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && s(t.buffer)
                    },
                    isString: function (t) {
                        return "string" == typeof t
                    },
                    isNumber: function (t) {
                        return "number" == typeof t
                    },
                    isObject: c,
                    isPlainObject: u,
                    isUndefined: a,
                    isDate: function (t) {
                        return "[object Date]" === i.call(t)
                    },
                    isFile: function (t) {
                        return "[object File]" === i.call(t)
                    },
                    isBlob: function (t) {
                        return "[object Blob]" === i.call(t)
                    },
                    isFunction: l,
                    isStream: function (t) {
                        return c(t) && l(t.pipe)
                    },
                    isURLSearchParams: function (t) {
                        return "[object URLSearchParams]" === i.call(t)
                    },
                    isStandardBrowserEnv: function () {
                        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
                    },
                    forEach: h,
                    merge: function t() {
                        var e = {};

                        function r(r, n) {
                            u(e[n]) && u(r) ? e[n] = t(e[n], r) : u(r) ? e[n] = t({}, r) : o(r) ? e[n] = r.slice() : e[n] = r
                        }
                        for (var n = 0, i = arguments.length; n < i; n++) h(arguments[n], r);
                        return e
                    },
                    extend: function (t, e, r) {
                        return h(e, (function (e, i) {
                            t[i] = r && "function" == typeof e ? n(e, r) : e
                        })), t
                    },
                    trim: function (t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                    },
                    stripBOM: function (t) {
                        return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
                    }
                }
            },
            7417: t => {
                "use strict";
                var e = function (t) {
                        return function (t) {
                            return !!t && "object" == typeof t
                        }(t) && ! function (t) {
                            var e = Object.prototype.toString.call(t);
                            return "[object RegExp]" === e || "[object Date]" === e || function (t) {
                                return t.$$typeof === r
                            }(t)
                        }(t)
                    },
                    r = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;

                function n(t, e) {
                    return !1 !== e.clone && e.isMergeableObject(t) ? s((r = t, Array.isArray(r) ? [] : {}), t, e) : t;
                    var r
                }

                function i(t, e, r) {
                    return t.concat(e).map((function (t) {
                        return n(t, r)
                    }))
                }

                function o(t) {
                    return Object.keys(t).concat(function (t) {
                        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter((function (e) {
                            return t.propertyIsEnumerable(e)
                        })) : []
                    }(t))
                }

                function a(t, e) {
                    try {
                        return e in t
                    } catch (t) {
                        return !1
                    }
                }

                function s(t, r, c) {
                    (c = c || {}).arrayMerge = c.arrayMerge || i, c.isMergeableObject = c.isMergeableObject || e, c.cloneUnlessOtherwiseSpecified = n;
                    var u = Array.isArray(r);
                    return u === Array.isArray(t) ? u ? c.arrayMerge(t, r, c) : function (t, e, r) {
                        var i = {};
                        return r.isMergeableObject(t) && o(t).forEach((function (e) {
                            i[e] = n(t[e], r)
                        })), o(e).forEach((function (o) {
                            (function (t, e) {
                                return a(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e))
                            })(t, o) || (a(t, o) && r.isMergeableObject(e[o]) ? i[o] = function (t, e) {
                                if (!e.customMerge) return s;
                                var r = e.customMerge(t);
                                return "function" == typeof r ? r : s
                            }(o, r)(t[o], e[o], r) : i[o] = n(e[o], r))
                        })), i
                    }(t, r, c) : n(r, c)
                }
                s.all = function (t, e) {
                    if (!Array.isArray(t)) throw new Error("first argument should be an array");
                    return t.reduce((function (t, r) {
                        return s(t, r, e)
                    }), {})
                };
                var c = s;
                t.exports = c
            },
            7410: t => {
                var e = function (t) {
                    "use strict";
                    var e, r = Object.prototype,
                        n = r.hasOwnProperty,
                        i = "function" == typeof Symbol ? Symbol : {},
                        o = i.iterator || "@@iterator",
                        a = i.asyncIterator || "@@asyncIterator",
                        s = i.toStringTag || "@@toStringTag";

                    function c(t, e, r) {
                        return Object.defineProperty(t, e, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }), t[e]
                    }
                    try {
                        c({}, "")
                    } catch (t) {
                        c = function (t, e, r) {
                            return t[e] = r
                        }
                    }

                    function u(t, e, r, n) {
                        var i = e && e.prototype instanceof v ? e : v,
                            o = Object.create(i.prototype),
                            a = new I(n || []);
                        return o._invoke = function (t, e, r) {
                            var n = h;
                            return function (i, o) {
                                if (n === p) throw new Error("Generator is already running");
                                if (n === d) {
                                    if ("throw" === i) throw o;
                                    return R()
                                }
                                for (r.method = i, r.arg = o;;) {
                                    var a = r.delegate;
                                    if (a) {
                                        var s = A(a, r);
                                        if (s) {
                                            if (s === m) continue;
                                            return s
                                        }
                                    }
                                    if ("next" === r.method) r.sent = r._sent = r.arg;
                                    else if ("throw" === r.method) {
                                        if (n === h) throw n = d, r.arg;
                                        r.dispatchException(r.arg)
                                    } else "return" === r.method && r.abrupt("return", r.arg);
                                    n = p;
                                    var c = l(t, e, r);
                                    if ("normal" === c.type) {
                                        if (n = r.done ? d : f, c.arg === m) continue;
                                        return {
                                            value: c.arg,
                                            done: r.done
                                        }
                                    }
                                    "throw" === c.type && (n = d, r.method = "throw", r.arg = c.arg)
                                }
                            }
                        }(t, r, a), o
                    }

                    function l(t, e, r) {
                        try {
                            return {
                                type: "normal",
                                arg: t.call(e, r)
                            }
                        } catch (t) {
                            return {
                                type: "throw",
                                arg: t
                            }
                        }
                    }
                    t.wrap = u;
                    var h = "suspendedStart",
                        f = "suspendedYield",
                        p = "executing",
                        d = "completed",
                        m = {};

                    function v() {}

                    function g() {}

                    function y() {}
                    var b = {};
                    c(b, o, (function () {
                        return this
                    }));
                    var w = Object.getPrototypeOf,
                        x = w && w(w(_([])));
                    x && x !== r && n.call(x, o) && (b = x);
                    var k = y.prototype = v.prototype = Object.create(b);

                    function S(t) {
                        ["next", "throw", "return"].forEach((function (e) {
                            c(t, e, (function (t) {
                                return this._invoke(e, t)
                            }))
                        }))
                    }

                    function O(t, e) {
                        function r(i, o, a, s) {
                            var c = l(t[i], t, o);
                            if ("throw" !== c.type) {
                                var u = c.arg,
                                    h = u.value;
                                return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then((function (t) {
                                    r("next", t, a, s)
                                }), (function (t) {
                                    r("throw", t, a, s)
                                })) : e.resolve(h).then((function (t) {
                                    u.value = t, a(u)
                                }), (function (t) {
                                    return r("throw", t, a, s)
                                }))
                            }
                            s(c.arg)
                        }
                        var i;
                        this._invoke = function (t, n) {
                            function o() {
                                return new e((function (e, i) {
                                    r(t, n, e, i)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    }

                    function A(t, r) {
                        var n = t.iterator[r.method];
                        if (n === e) {
                            if (r.delegate = null, "throw" === r.method) {
                                if (t.iterator.return && (r.method = "return", r.arg = e, A(t, r), "throw" === r.method)) return m;
                                r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return m
                        }
                        var i = l(n, t.iterator, r.arg);
                        if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, m;
                        var o = i.arg;
                        return o ? o.done ? (r[t.resultName] = o.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, m) : o : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, m)
                    }

                    function E(t) {
                        var e = {
                            tryLoc: t[0]
                        };
                        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                    }

                    function T(t) {
                        var e = t.completion || {};
                        e.type = "normal", delete e.arg, t.completion = e
                    }

                    function I(t) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], t.forEach(E, this), this.reset(!0)
                    }

                    function _(t) {
                        if (t) {
                            var r = t[o];
                            if (r) return r.call(t);
                            if ("function" == typeof t.next) return t;
                            if (!isNaN(t.length)) {
                                var i = -1,
                                    a = function r() {
                                        for (; ++i < t.length;)
                                            if (n.call(t, i)) return r.value = t[i], r.done = !1, r;
                                        return r.value = e, r.done = !0, r
                                    };
                                return a.next = a
                            }
                        }
                        return {
                            next: R
                        }
                    }

                    function R() {
                        return {
                            value: e,
                            done: !0
                        }
                    }
                    return g.prototype = y, c(k, "constructor", y), c(y, "constructor", g), g.displayName = c(y, s, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
                        var e = "function" == typeof t && t.constructor;
                        return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name))
                    }, t.mark = function (t) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, c(t, s, "GeneratorFunction")), t.prototype = Object.create(k), t
                    }, t.awrap = function (t) {
                        return {
                            __await: t
                        }
                    }, S(O.prototype), c(O.prototype, a, (function () {
                        return this
                    })), t.AsyncIterator = O, t.async = function (e, r, n, i, o) {
                        void 0 === o && (o = Promise);
                        var a = new O(u(e, r, n, i), o);
                        return t.isGeneratorFunction(r) ? a : a.next().then((function (t) {
                            return t.done ? t.value : a.next()
                        }))
                    }, S(k), c(k, s, "Generator"), c(k, o, (function () {
                        return this
                    })), c(k, "toString", (function () {
                        return "[object Generator]"
                    })), t.keys = function (t) {
                        var e = [];
                        for (var r in t) e.push(r);
                        return e.reverse(),
                            function r() {
                                for (; e.length;) {
                                    var n = e.pop();
                                    if (n in t) return r.value = n, r.done = !1, r
                                }
                                return r.done = !0, r
                            }
                    }, t.values = _, I.prototype = {
                        constructor: I,
                        reset: function (t) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(T), !t)
                                for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                        },
                        stop: function () {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ("throw" === t.type) throw t.arg;
                            return this.rval
                        },
                        dispatchException: function (t) {
                            if (this.done) throw t;
                            var r = this;

                            function i(n, i) {
                                return s.type = "throw", s.arg = t, r.next = n, i && (r.method = "next", r.arg = e), !!i
                            }
                            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                                var a = this.tryEntries[o],
                                    s = a.completion;
                                if ("root" === a.tryLoc) return i("end");
                                if (a.tryLoc <= this.prev) {
                                    var c = n.call(a, "catchLoc"),
                                        u = n.call(a, "finallyLoc");
                                    if (c && u) {
                                        if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                                        if (this.prev < a.finallyLoc) return i(a.finallyLoc)
                                    } else if (c) {
                                        if (this.prev < a.catchLoc) return i(a.catchLoc, !0)
                                    } else {
                                        if (!u) throw new Error("try statement without catch or finally");
                                        if (this.prev < a.finallyLoc) return i(a.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function (t, e) {
                            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                var i = this.tryEntries[r];
                                if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                                    var o = i;
                                    break
                                }
                            }
                            o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                            var a = o ? o.completion : {};
                            return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, m) : this.complete(a)
                        },
                        complete: function (t, e) {
                            if ("throw" === t.type) throw t.arg;
                            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), m
                        },
                        finish: function (t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var r = this.tryEntries[e];
                                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), T(r), m
                            }
                        },
                        catch: function (t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var r = this.tryEntries[e];
                                if (r.tryLoc === t) {
                                    var n = r.completion;
                                    if ("throw" === n.type) {
                                        var i = n.arg;
                                        T(r)
                                    }
                                    return i
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function (t, r, n) {
                            return this.delegate = {
                                iterator: _(t),
                                resultName: r,
                                nextLoc: n
                            }, "next" === this.method && (this.arg = e), m
                        }
                    }, t
                }(t.exports);
                try {
                    regeneratorRuntime = e
                } catch (t) {
                    "object" == typeof globalThis ? globalThis.regeneratorRuntime = e : Function("r", "regeneratorRuntime = r")(e)
                }
            },
            1995: function (t) {
                t.exports = function (t) {
                    var e = {};

                    function r(n) {
                        if (e[n]) return e[n].exports;
                        var i = e[n] = {
                            i: n,
                            l: !1,
                            exports: {}
                        };
                        return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
                    }
                    return r.m = t, r.c = e, r.d = function (t, e, n) {
                        r.o(t, e) || Object.defineProperty(t, e, {
                            enumerable: !0,
                            get: n
                        })
                    }, r.r = function (t) {
                        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                            value: "Module"
                        }), Object.defineProperty(t, "__esModule", {
                            value: !0
                        })
                    }, r.t = function (t, e) {
                        if (1 & e && (t = r(t)), 8 & e) return t;
                        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                        var n = Object.create(null);
                        if (r.r(n), Object.defineProperty(n, "default", {
                                enumerable: !0,
                                value: t
                            }), 2 & e && "string" != typeof t)
                            for (var i in t) r.d(n, i, function (e) {
                                return t[e]
                            }.bind(null, i));
                        return n
                    }, r.n = function (t) {
                        var e = t && t.__esModule ? function () {
                            return t.default
                        } : function () {
                            return t
                        };
                        return r.d(e, "a", e), e
                    }, r.o = function (t, e) {
                        return Object.prototype.hasOwnProperty.call(t, e)
                    }, r.p = "", r(r.s = 6)
                }([function (t, e, r) {
                    "use strict";
                    var n = r(12),
                        i = {};

                    function o(t, e) {
                        return e === a(t)
                    }

                    function a(t) {
                        var e = typeof t;
                        return "object" !== e ? e : t ? t instanceof Error ? "error" : {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase() : "null"
                    }

                    function s(t) {
                        return o(t, "function")
                    }

                    function c(t) {
                        var e = Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?"),
                            r = RegExp("^" + e + "$");
                        return u(t) && r.test(t)
                    }

                    function u(t) {
                        var e = typeof t;
                        return null != t && ("object" == e || "function" == e)
                    }

                    function l() {
                        var t = g();
                        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
                            var r = (t + 16 * Math.random()) % 16 | 0;
                            return t = Math.floor(t / 16), ("x" === e ? r : 7 & r | 8).toString(16)
                        }))
                    }
                    var h = {
                        strictMode: !1,
                        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                        q: {
                            name: "queryKey",
                            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                        },
                        parser: {
                            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                        }
                    };

                    function f(t, e) {
                        var r, n;
                        try {
                            r = i.stringify(t)
                        } catch (i) {
                            if (e && s(e)) try {
                                r = e(t)
                            } catch (t) {
                                n = t
                            } else n = i
                        }
                        return {
                            error: n,
                            value: r
                        }
                    }

                    function p(t, e) {
                        return function (r, n) {
                            try {
                                e(r, n)
                            } catch (e) {
                                t.error(e)
                            }
                        }
                    }
                    var d = ["log", "network", "dom", "navigation", "error", "manual"],
                        m = ["critical", "error", "warning", "info", "debug"];

                    function v(t, e) {
                        for (var r = 0; r < t.length; ++r)
                            if (t[r] === e) return !0;
                        return !1
                    }

                    function g() {
                        return Date.now ? +Date.now() : +new Date
                    }
                    t.exports = {
                        addParamsAndAccessTokenToPath: function (t, e, r) {
                            (r = r || {}).access_token = t;
                            var n, i = [];
                            for (n in r) Object.prototype.hasOwnProperty.call(r, n) && i.push([n, r[n]].join("="));
                            var o = "?" + i.sort().join("&");
                            (e = e || {}).path = e.path || "";
                            var a, s = e.path.indexOf("?"),
                                c = e.path.indexOf("#"); - 1 !== s && (-1 === c || c > s) ? (a = e.path, e.path = a.substring(0, s) + o + "&" + a.substring(s + 1)) : -1 !== c ? (a = e.path, e.path = a.substring(0, c) + o + a.substring(c)) : e.path = e.path + o
                        },
                        createItem: function (t, e, r, i, o) {
                            for (var s, c, u, h, f, d, m = [], v = [], y = 0, b = t.length; y < b; ++y) {
                                var w = a(d = t[y]);
                                switch (v.push(w), w) {
                                    case "undefined":
                                        break;
                                    case "string":
                                        s ? m.push(d) : s = d;
                                        break;
                                    case "function":
                                        h = p(e, d);
                                        break;
                                    case "date":
                                        m.push(d);
                                        break;
                                    case "error":
                                    case "domexception":
                                    case "exception":
                                        c ? m.push(d) : c = d;
                                        break;
                                    case "object":
                                    case "array":
                                        if (d instanceof Error || "undefined" != typeof DOMException && d instanceof DOMException) {
                                            c ? m.push(d) : c = d;
                                            break
                                        }
                                        if (i && "object" === w && !f) {
                                            for (var x = 0, k = i.length; x < k; ++x)
                                                if (void 0 !== d[i[x]]) {
                                                    f = d;
                                                    break
                                                } if (f) break
                                        }
                                        u ? m.push(d) : u = d;
                                        break;
                                    default:
                                        if (d instanceof Error || "undefined" != typeof DOMException && d instanceof DOMException) {
                                            c ? m.push(d) : c = d;
                                            break
                                        }
                                        m.push(d)
                                }
                            }
                            m.length > 0 && ((u = n(u)).extraArgs = m);
                            var S = {
                                message: s,
                                err: c,
                                custom: u,
                                timestamp: g(),
                                callback: h,
                                notifier: r,
                                diagnostic: {},
                                uuid: l()
                            };
                            return function (t, e) {
                                e && void 0 !== e.level && (t.level = e.level, delete e.level), e && void 0 !== e.skipFrames && (t.skipFrames = e.skipFrames, delete e.skipFrames)
                            }(S, u), i && f && (S.request = f), o && (S.lambdaContext = o), S._originalArgs = t, S.diagnostic.original_arg_types = v, S
                        },
                        addErrorContext: function (t, e) {
                            var r = t.data.custom || {},
                                i = !1;
                            try {
                                for (var o = 0; o < e.length; ++o) e[o].hasOwnProperty("rollbarContext") && (r = n(r, e[o].rollbarContext), i = !0);
                                i && (t.data.custom = r)
                            } catch (e) {
                                t.diagnostic.error_context = "Failed: " + e.message
                            }
                        },
                        createTelemetryEvent: function (t) {
                            for (var e, r, n, i, o = 0, s = t.length; o < s; ++o) switch (a(i = t[o])) {
                                case "string":
                                    !e && v(d, i) ? e = i : !n && v(m, i) && (n = i);
                                    break;
                                case "object":
                                    r = i
                            }
                            return {
                                type: e || "manual",
                                metadata: r || {},
                                level: n
                            }
                        },
                        filterIp: function (t, e) {
                            if (t && t.user_ip && !0 !== e) {
                                var r = t.user_ip;
                                if (e) try {
                                    var n;
                                    if (-1 !== r.indexOf("."))(n = r.split(".")).pop(), n.push("0"), r = n.join(".");
                                    else if (-1 !== r.indexOf(":")) {
                                        if ((n = r.split(":")).length > 2) {
                                            var i = n.slice(0, 3),
                                                o = i[2].indexOf("/"); - 1 !== o && (i[2] = i[2].substring(0, o)), r = i.concat("0000:0000:0000:0000:0000").join(":")
                                        }
                                    } else r = null
                                } catch (t) {
                                    r = null
                                } else r = null;
                                t.user_ip = r
                            }
                        },
                        formatArgsAsString: function (t) {
                            var e, r, n, i = [];
                            for (e = 0, r = t.length; e < r; ++e) {
                                switch (a(n = t[e])) {
                                    case "object":
                                        (n = (n = f(n)).error || n.value).length > 500 && (n = n.substr(0, 497) + "...");
                                        break;
                                    case "null":
                                        n = "null";
                                        break;
                                    case "undefined":
                                        n = "undefined";
                                        break;
                                    case "symbol":
                                        n = n.toString()
                                }
                                i.push(n)
                            }
                            return i.join(" ")
                        },
                        formatUrl: function (t, e) {
                            if (!(e = e || t.protocol) && t.port && (80 === t.port ? e = "http:" : 443 === t.port && (e = "https:")), e = e || "https:", !t.hostname) return null;
                            var r = e + "//" + t.hostname;
                            return t.port && (r = r + ":" + t.port), t.path && (r += t.path), r
                        },
                        get: function (t, e) {
                            if (t) {
                                var r = e.split("."),
                                    n = t;
                                try {
                                    for (var i = 0, o = r.length; i < o; ++i) n = n[r[i]]
                                } catch (t) {
                                    n = void 0
                                }
                                return n
                            }
                        },
                        handleOptions: function (t, e, r, i) {
                            var o = n(t, e, r);
                            return o = function (t, e) {
                                return t.hostWhiteList && !t.hostSafeList && (t.hostSafeList = t.hostWhiteList, t.hostWhiteList = void 0, e && e.log("hostWhiteList is deprecated. Use hostSafeList.")), t.hostBlackList && !t.hostBlockList && (t.hostBlockList = t.hostBlackList, t.hostBlackList = void 0, e && e.log("hostBlackList is deprecated. Use hostBlockList.")), t
                            }(o, i), !e || e.overwriteScrubFields || e.scrubFields && (o.scrubFields = (t.scrubFields || []).concat(e.scrubFields)), o
                        },
                        isError: function (t) {
                            return o(t, "error") || o(t, "exception")
                        },
                        isFiniteNumber: function (t) {
                            return Number.isFinite(t)
                        },
                        isFunction: s,
                        isIterable: function (t) {
                            var e = a(t);
                            return "object" === e || "array" === e
                        },
                        isNativeFunction: c,
                        isObject: u,
                        isString: function (t) {
                            return "string" == typeof t || t instanceof String
                        },
                        isType: o,
                        isPromise: function (t) {
                            return u(t) && o(t.then, "function")
                        },
                        jsonParse: function (t) {
                            var e, r;
                            try {
                                e = i.parse(t)
                            } catch (t) {
                                r = t
                            }
                            return {
                                error: r,
                                value: e
                            }
                        },
                        LEVELS: {
                            debug: 0,
                            info: 1,
                            warning: 2,
                            error: 3,
                            critical: 4
                        },
                        makeUnhandledStackInfo: function (t, e, r, n, i, o, a, s) {
                            var c = {
                                url: e || "",
                                line: r,
                                column: n
                            };
                            c.func = s.guessFunctionName(c.url, c.line), c.context = s.gatherContext(c.url, c.line);
                            var u = "undefined" != typeof document && document && document.location && document.location.href,
                                l = "undefined" != typeof window && window && window.navigator && window.navigator.userAgent;
                            return {
                                mode: o,
                                message: i ? String(i) : t || a,
                                url: u,
                                stack: [c],
                                useragent: l
                            }
                        },
                        merge: n,
                        now: g,
                        redact: function () {
                            return "********"
                        },
                        RollbarJSON: i,
                        sanitizeUrl: function (t) {
                            var e = function (t) {
                                if (o(t, "string")) {
                                    for (var e = h, r = e.parser[e.strictMode ? "strict" : "loose"].exec(t), n = {}, i = 0, a = e.key.length; i < a; ++i) n[e.key[i]] = r[i] || "";
                                    return n[e.q.name] = {}, n[e.key[12]].replace(e.q.parser, (function (t, r, i) {
                                        r && (n[e.q.name][r] = i)
                                    })), n
                                }
                            }(t);
                            return e ? ("" === e.anchor && (e.source = e.source.replace("#", "")), t = e.source.replace("?" + e.query, "")) : "(unknown)"
                        },
                        set: function (t, e, r) {
                            if (t) {
                                var n = e.split("."),
                                    i = n.length;
                                if (!(i < 1))
                                    if (1 !== i) try {
                                        for (var o = t[n[0]] || {}, a = o, s = 1; s < i - 1; ++s) o[n[s]] = o[n[s]] || {}, o = o[n[s]];
                                        o[n[i - 1]] = r, t[n[0]] = a
                                    } catch (t) {
                                        return
                                    } else t[n[0]] = r
                            }
                        },
                        setupJSON: function (t) {
                            s(i.stringify) && s(i.parse) || (o(JSON, "undefined") || (t ? (c(JSON.stringify) && (i.stringify = JSON.stringify), c(JSON.parse) && (i.parse = JSON.parse)) : (s(JSON.stringify) && (i.stringify = JSON.stringify), s(JSON.parse) && (i.parse = JSON.parse))), s(i.stringify) && s(i.parse) || t && t(i))
                        },
                        stringify: f,
                        maxByteSize: function (t) {
                            for (var e = 0, r = t.length, n = 0; n < r; n++) {
                                var i = t.charCodeAt(n);
                                i < 128 ? e += 1 : i < 2048 ? e += 2 : i < 65536 && (e += 3)
                            }
                            return e
                        },
                        typeName: a,
                        uuid4: l
                    }
                }, function (t, e, r) {
                    "use strict";
                    r(17);
                    var n = r(18),
                        i = r(0);
                    t.exports = {
                        error: function () {
                            var t = Array.prototype.slice.call(arguments, 0);
                            t.unshift("Rollbar:"), n.ieVersion() <= 8 ? console.error(i.formatArgsAsString(t)) : console.error.apply(console, t)
                        },
                        info: function () {
                            var t = Array.prototype.slice.call(arguments, 0);
                            t.unshift("Rollbar:"), n.ieVersion() <= 8 ? console.info(i.formatArgsAsString(t)) : console.info.apply(console, t)
                        },
                        log: function () {
                            var t = Array.prototype.slice.call(arguments, 0);
                            t.unshift("Rollbar:"), n.ieVersion() <= 8 ? console.log(i.formatArgsAsString(t)) : console.log.apply(console, t)
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    t.exports = {
                        parse: function (t) {
                            var e, r, n = {
                                protocol: null,
                                auth: null,
                                host: null,
                                path: null,
                                hash: null,
                                href: t,
                                hostname: null,
                                port: null,
                                pathname: null,
                                search: null,
                                query: null
                            };
                            if (-1 !== (e = t.indexOf("//")) ? (n.protocol = t.substring(0, e), r = e + 2) : r = 0, -1 !== (e = t.indexOf("@", r)) && (n.auth = t.substring(r, e), r = e + 1), -1 === (e = t.indexOf("/", r))) {
                                if (-1 === (e = t.indexOf("?", r))) return -1 === (e = t.indexOf("#", r)) ? n.host = t.substring(r) : (n.host = t.substring(r, e), n.hash = t.substring(e)), n.hostname = n.host.split(":")[0], n.port = n.host.split(":")[1], n.port && (n.port = parseInt(n.port, 10)), n;
                                n.host = t.substring(r, e), n.hostname = n.host.split(":")[0], n.port = n.host.split(":")[1], n.port && (n.port = parseInt(n.port, 10)), r = e
                            } else n.host = t.substring(r, e), n.hostname = n.host.split(":")[0], n.port = n.host.split(":")[1], n.port && (n.port = parseInt(n.port, 10)), r = e;
                            if (-1 === (e = t.indexOf("#", r)) ? n.path = t.substring(r) : (n.path = t.substring(r, e), n.hash = t.substring(e)), n.path) {
                                var i = n.path.split("?");
                                n.pathname = i[0], n.query = i[1], n.search = n.query ? "?" + n.query : null
                            }
                            return n
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(22),
                        i = new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");

                    function o(t) {
                        var e = {};
                        return e._stackFrame = t, e.url = t.fileName, e.line = t.lineNumber, e.func = t.functionName, e.column = t.columnNumber, e.args = t.args, e.context = null, e
                    }

                    function a(t, e) {
                        return {
                            stack: function () {
                                var r = [];
                                e = e || 0;
                                try {
                                    r = n.parse(t)
                                } catch (t) {
                                    r = []
                                }
                                for (var i = [], a = e; a < r.length; a++) i.push(new o(r[a]));
                                return i
                            }(),
                            message: t.message,
                            name: s(t),
                            rawStack: t.stack,
                            rawException: t
                        }
                    }

                    function s(t) {
                        var e = t.name && t.name.length && t.name,
                            r = t.constructor.name && t.constructor.name.length && t.constructor.name;
                        return e && r ? "Error" === e ? r : e : e || r
                    }
                    t.exports = {
                        guessFunctionName: function () {
                            return "?"
                        },
                        guessErrorClass: function (t) {
                            if (!t || !t.match) return ["Unknown error. There was no error message to display.", ""];
                            var e = t.match(i),
                                r = "(unknown)";
                            return e && (r = e[e.length - 1], t = (t = t.replace((e[e.length - 2] || "") + r + ":", "")).replace(/(^[\s]+|[\s]+$)/g, "")), [r, t]
                        },
                        gatherContext: function () {
                            return null
                        },
                        parse: function (t, e) {
                            var r = t;
                            if (r.nested) {
                                for (var n = []; r;) n.push(new a(r, e)), r = r.nested, e = 0;
                                return n[0].traceChain = n, n[0]
                            }
                            return new a(r, e)
                        },
                        Stack: a,
                        Frame: o
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0),
                        i = r(5);

                    function o(t, e) {
                        var r = e.split("."),
                            i = r.length - 1;
                        try {
                            for (var o = 0; o <= i; ++o) o < i ? t = t[r[o]] : t[r[o]] = n.redact()
                        } catch (t) {}
                    }
                    t.exports = function (t, e, r) {
                        if (e = e || [], r)
                            for (var a = 0; a < r.length; ++a) o(t, r[a]);
                        var s = function (t) {
                                for (var e, r = [], n = 0; n < t.length; ++n) e = "^\\[?(%5[bB])?" + t[n] + "\\[?(%5[bB])?\\]?(%5[dD])?$", r.push(new RegExp(e, "i"));
                                return r
                            }(e),
                            c = function (t) {
                                for (var e, r = [], n = 0; n < t.length; ++n) e = "\\[?(%5[bB])?" + t[n] + "\\[?(%5[bB])?\\]?(%5[dD])?", r.push(new RegExp("(" + e + "=)([^&\\n]+)", "igm"));
                                return r
                            }(e);

                        function u(t, e) {
                            return e + n.redact()
                        }
                        return i(t, (function t(e, r, o) {
                            var a = function (t, e) {
                                var r;
                                for (r = 0; r < s.length; ++r)
                                    if (s[r].test(t)) {
                                        e = n.redact();
                                        break
                                    } return e
                            }(e, r);
                            return a === r ? n.isType(r, "object") || n.isType(r, "array") ? i(r, t, o) : function (t) {
                                var e;
                                if (n.isType(t, "string"))
                                    for (e = 0; e < c.length; ++e) t = t.replace(c[e], u);
                                return t
                            }(a) : a
                        }))
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);
                    t.exports = function (t, e, r) {
                        var i, o, a, s, c = n.isType(t, "object"),
                            u = n.isType(t, "array"),
                            l = [];
                        if (r = r || {
                                obj: [],
                                mapped: []
                            }, c) {
                            if (s = r.obj.indexOf(t), c && -1 !== s) return r.mapped[s] || r.obj[s];
                            r.obj.push(t), s = r.obj.length - 1
                        }
                        if (c)
                            for (i in t) Object.prototype.hasOwnProperty.call(t, i) && l.push(i);
                        else if (u)
                            for (a = 0; a < t.length; ++a) l.push(a);
                        var h = c ? {} : [],
                            f = !0;
                        for (a = 0; a < l.length; ++a) o = t[i = l[a]], h[i] = e(i, o, r), f = f && h[i] === t[i];
                        return c && !f && (r.mapped[s] = h), f ? t : h
                    }
                }, function (t, e, r) {
                    t.exports = r(7)
                }, function (t, e, r) {
                    "use strict";
                    var n = r(8),
                        i = "undefined" != typeof window && window._rollbarConfig,
                        o = i && i.globalAlias || "Rollbar",
                        a = "undefined" != typeof window && window[o] && "function" == typeof window[o].shimId && void 0 !== window[o].shimId();
                    if ("undefined" == typeof window || window._rollbarStartTime || (window._rollbarStartTime = (new Date).getTime()), !a && i) {
                        var s = new n(i);
                        window[o] = s
                    } else "undefined" != typeof window ? (window.rollbar = n, window._rollbarDidLoad = !0) : "undefined" != typeof self && (self.rollbar = n, self._rollbarDidLoad = !0);
                    t.exports = n
                }, function (t, e, r) {
                    "use strict";
                    var n = r(9),
                        i = r(29),
                        o = r(30),
                        a = r(32),
                        s = r(34),
                        c = r(4),
                        u = r(35);
                    n.setComponents({
                        telemeter: i,
                        instrumenter: o,
                        polyfillJSON: a,
                        wrapGlobals: s,
                        scrub: c,
                        truncation: u
                    }), t.exports = n
                }, function (t, e, r) {
                    "use strict";
                    var n = r(10),
                        i = r(0),
                        o = r(15),
                        a = r(1),
                        s = r(19),
                        c = r(20),
                        u = r(2),
                        l = r(21),
                        h = r(24),
                        f = r(25),
                        p = r(26),
                        d = r(3);

                    function m(t, e) {
                        this.options = i.handleOptions(k, t, null, a), this.options._configuredOptions = t;
                        var r = this.components.telemeter,
                            s = this.components.instrumenter,
                            d = this.components.polyfillJSON;
                        this.wrapGlobals = this.components.wrapGlobals, this.scrub = this.components.scrub;
                        var m = this.components.truncation,
                            v = new c(m),
                            g = new o(this.options, v, u, m);
                        r && (this.telemeter = new r(this.options)), this.client = e || new n(this.options, g, a, this.telemeter, "browser");
                        var y = b(),
                            w = "undefined" != typeof document && document;
                        this.isChrome = y.chrome && y.chrome.runtime, this.anonymousErrorsPending = 0,
                            function (t, e, r) {
                                t.addTransform(l.handleDomException).addTransform(l.handleItemWithError).addTransform(l.ensureItemHasSomethingToSay).addTransform(l.addBaseInfo).addTransform(l.addRequestInfo(r)).addTransform(l.addClientInfo(r)).addTransform(l.addPluginInfo(r)).addTransform(l.addBody).addTransform(h.addMessageWithError).addTransform(h.addTelemetryData).addTransform(h.addConfigToPayload).addTransform(l.addScrubber(e.scrub)).addTransform(h.userTransform(a)).addTransform(h.addConfiguredOptions).addTransform(h.addDiagnosticKeys).addTransform(h.itemToPayload)
                            }(this.client.notifier, this, y), this.client.queue.addPredicate(p.checkLevel).addPredicate(f.checkIgnore).addPredicate(p.userCheckIgnore(a)).addPredicate(p.urlIsNotBlockListed(a)).addPredicate(p.urlIsSafeListed(a)).addPredicate(p.messageIsIgnored(a)), this.setupUnhandledCapture(), s && (this.instrumenter = new s(this.options, this.client.telemeter, this, y, w), this.instrumenter.instrument()), i.setupJSON(d)
                    }
                    var v = null;

                    function g(t) {
                        var e = "Rollbar is not initialized";
                        a.error(e), t && t(new Error(e))
                    }

                    function y(t) {
                        for (var e = 0, r = t.length; e < r; ++e)
                            if (i.isFunction(t[e])) return t[e]
                    }

                    function b() {
                        return "undefined" != typeof window && window || "undefined" != typeof self && self
                    }
                    m.init = function (t, e) {
                        return v ? v.global(t).configure(t) : v = new m(t, e)
                    }, m.prototype.components = {}, m.setComponents = function (t) {
                        m.prototype.components = t
                    }, m.prototype.global = function (t) {
                        return this.client.global(t), this
                    }, m.global = function (t) {
                        if (v) return v.global(t);
                        g()
                    }, m.prototype.configure = function (t, e) {
                        var r = this.options,
                            n = {};
                        return e && (n = {
                            payload: e
                        }), this.options = i.handleOptions(r, t, n, a), this.options._configuredOptions = i.handleOptions(r._configuredOptions, t, n), this.client.configure(this.options, e), this.instrumenter && this.instrumenter.configure(this.options), this.setupUnhandledCapture(), this
                    }, m.configure = function (t, e) {
                        if (v) return v.configure(t, e);
                        g()
                    }, m.prototype.lastError = function () {
                        return this.client.lastError
                    }, m.lastError = function () {
                        if (v) return v.lastError();
                        g()
                    }, m.prototype.log = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.log(t), {
                            uuid: e
                        }
                    }, m.log = function () {
                        if (v) return v.log.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.debug = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.debug(t), {
                            uuid: e
                        }
                    }, m.debug = function () {
                        if (v) return v.debug.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.info = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.info(t), {
                            uuid: e
                        }
                    }, m.info = function () {
                        if (v) return v.info.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.warn = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.warn(t), {
                            uuid: e
                        }
                    }, m.warn = function () {
                        if (v) return v.warn.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.warning = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.warning(t), {
                            uuid: e
                        }
                    }, m.warning = function () {
                        if (v) return v.warning.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.error = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.error(t), {
                            uuid: e
                        }
                    }, m.error = function () {
                        if (v) return v.error.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.critical = function () {
                        var t = this._createItem(arguments),
                            e = t.uuid;
                        return this.client.critical(t), {
                            uuid: e
                        }
                    }, m.critical = function () {
                        if (v) return v.critical.apply(v, arguments);
                        g(y(arguments))
                    }, m.prototype.buildJsonPayload = function (t) {
                        return this.client.buildJsonPayload(t)
                    }, m.buildJsonPayload = function () {
                        if (v) return v.buildJsonPayload.apply(v, arguments);
                        g()
                    }, m.prototype.sendJsonPayload = function (t) {
                        return this.client.sendJsonPayload(t)
                    }, m.sendJsonPayload = function () {
                        if (v) return v.sendJsonPayload.apply(v, arguments);
                        g()
                    }, m.prototype.setupUnhandledCapture = function () {
                        var t = b();
                        this.unhandledExceptionsInitialized || (this.options.captureUncaught || this.options.handleUncaughtExceptions) && (s.captureUncaughtExceptions(t, this), this.wrapGlobals && this.options.wrapGlobalEventHandlers && this.wrapGlobals(t, this), this.unhandledExceptionsInitialized = !0), this.unhandledRejectionsInitialized || (this.options.captureUnhandledRejections || this.options.handleUnhandledRejections) && (s.captureUnhandledRejections(t, this), this.unhandledRejectionsInitialized = !0)
                    }, m.prototype.handleUncaughtException = function (t, e, r, n, o, a) {
                        if (this.options.captureUncaught || this.options.handleUncaughtExceptions) {
                            if (this.options.inspectAnonymousErrors && this.isChrome && null === o && "" === e) return "anonymous";
                            var s, c = i.makeUnhandledStackInfo(t, e, r, n, o, "onerror", "uncaught exception", d);
                            i.isError(o) ? (s = this._createItem([t, o, a]))._unhandledStackInfo = c : i.isError(e) ? (s = this._createItem([t, e, a]))._unhandledStackInfo = c : (s = this._createItem([t, a])).stackInfo = c, s.level = this.options.uncaughtErrorLevel, s._isUncaught = !0, this.client.log(s)
                        }
                    }, m.prototype.handleAnonymousErrors = function () {
                        if (this.options.inspectAnonymousErrors && this.isChrome) {
                            var t = this;
                            try {
                                Error.prepareStackTrace = function (e, r) {
                                    if (t.options.inspectAnonymousErrors && t.anonymousErrorsPending) {
                                        if (t.anonymousErrorsPending -= 1, !e) return;
                                        e._isAnonymous = !0, t.handleUncaughtException(e.message, null, null, null, e)
                                    }
                                    return e.stack
                                }
                            } catch (t) {
                                this.options.inspectAnonymousErrors = !1, this.error("anonymous error handler failed", t)
                            }
                        }
                    }, m.prototype.handleUnhandledRejection = function (t, e) {
                        if (this.options.captureUnhandledRejections || this.options.handleUnhandledRejections) {
                            var r = "unhandled rejection was null or undefined!";
                            if (t)
                                if (t.message) r = t.message;
                                else {
                                    var n = i.stringify(t);
                                    n.value && (r = n.value)
                                } var o, a = t && t._rollbarContext || e && e._rollbarContext;
                            i.isError(t) ? o = this._createItem([r, t, a]) : (o = this._createItem([r, t, a])).stackInfo = i.makeUnhandledStackInfo(r, "", 0, 0, null, "unhandledrejection", "", d), o.level = this.options.uncaughtErrorLevel, o._isUncaught = !0, o._originalArgs = o._originalArgs || [], o._originalArgs.push(e), this.client.log(o)
                        }
                    }, m.prototype.wrap = function (t, e, r) {
                        try {
                            var n;
                            if (n = i.isFunction(e) ? e : function () {
                                    return e || {}
                                }, !i.isFunction(t)) return t;
                            if (t._isWrap) return t;
                            if (!t._rollbar_wrapped && (t._rollbar_wrapped = function () {
                                    r && i.isFunction(r) && r.apply(this, arguments);
                                    try {
                                        return t.apply(this, arguments)
                                    } catch (r) {
                                        var e = r;
                                        throw e && window._rollbarWrappedError !== e && (i.isType(e, "string") && (e = new String(e)), e._rollbarContext = n() || {}, e._rollbarContext._wrappedSource = t.toString(), window._rollbarWrappedError = e), e
                                    }
                                }, t._rollbar_wrapped._isWrap = !0, t.hasOwnProperty))
                                for (var o in t) t.hasOwnProperty(o) && "_rollbar_wrapped" !== o && (t._rollbar_wrapped[o] = t[o]);
                            return t._rollbar_wrapped
                        } catch (e) {
                            return t
                        }
                    }, m.wrap = function (t, e) {
                        if (v) return v.wrap(t, e);
                        g()
                    }, m.prototype.captureEvent = function () {
                        var t = i.createTelemetryEvent(arguments);
                        return this.client.captureEvent(t.type, t.metadata, t.level)
                    }, m.captureEvent = function () {
                        if (v) return v.captureEvent.apply(v, arguments);
                        g()
                    }, m.prototype.captureDomContentLoaded = function (t, e) {
                        return e || (e = new Date), this.client.captureDomContentLoaded(e)
                    }, m.prototype.captureLoad = function (t, e) {
                        return e || (e = new Date), this.client.captureLoad(e)
                    }, m.prototype.loadFull = function () {
                        a.info("Unexpected Rollbar.loadFull() called on a Notifier instance. This can happen when Rollbar is loaded multiple times.")
                    }, m.prototype._createItem = function (t) {
                        return i.createItem(t, a, this)
                    };
                    var w = r(27),
                        x = r(28),
                        k = {
                            version: w.version,
                            scrubFields: x.scrubFields,
                            logLevel: w.logLevel,
                            reportLevel: w.reportLevel,
                            uncaughtErrorLevel: w.uncaughtErrorLevel,
                            endpoint: w.endpoint,
                            verbose: !1,
                            enabled: !0,
                            transmit: !0,
                            sendConfig: !1,
                            includeItemsInTelemetry: !0,
                            captureIp: !0,
                            inspectAnonymousErrors: !0,
                            ignoreDuplicateErrors: !0,
                            wrapGlobalEventHandlers: !1
                        };
                    t.exports = m
                }, function (t, e, r) {
                    "use strict";
                    var n = r(11),
                        i = r(13),
                        o = r(14),
                        a = r(0);

                    function s(t, e, r, n, l) {
                        this.options = a.merge(t), this.logger = r, s.rateLimiter.configureGlobal(this.options), s.rateLimiter.setPlatformOptions(l, this.options), this.api = e, this.queue = new i(s.rateLimiter, e, r, this.options);
                        var h = this.options.tracer || null;
                        u(h) ? (this.tracer = h, this.options.tracer = "opentracing-tracer-enabled", this.options._configuredOptions.tracer = "opentracing-tracer-enabled") : this.tracer = null, this.notifier = new o(this.queue, this.options), this.telemeter = n, c(t), this.lastError = null, this.lastErrorHash = "none"
                    }

                    function c(t) {
                        t.stackTraceLimit && (Error.stackTraceLimit = t.stackTraceLimit)
                    }

                    function u(t) {
                        if (!t) return !1;
                        if (!t.scope || "function" != typeof t.scope) return !1;
                        var e = t.scope();
                        return !(!e || !e.active || "function" != typeof e.active)
                    }
                    s.rateLimiter = new n({
                        maxItems: 0,
                        itemsPerMinute: 60
                    }), s.prototype.global = function (t) {
                        return s.rateLimiter.configureGlobal(t), this
                    }, s.prototype.configure = function (t, e) {
                        var r = this.options,
                            n = {};
                        e && (n = {
                            payload: e
                        }), this.options = a.merge(r, t, n);
                        var i = this.options.tracer || null;
                        return u(i) ? (this.tracer = i, this.options.tracer = "opentracing-tracer-enabled", this.options._configuredOptions.tracer = "opentracing-tracer-enabled") : this.tracer = null, this.notifier && this.notifier.configure(this.options), this.telemeter && this.telemeter.configure(this.options), c(t), this.global(this.options), u(t.tracer) && (this.tracer = t.tracer), this
                    }, s.prototype.log = function (t) {
                        var e = this._defaultLogLevel();
                        return this._log(e, t)
                    }, s.prototype.debug = function (t) {
                        this._log("debug", t)
                    }, s.prototype.info = function (t) {
                        this._log("info", t)
                    }, s.prototype.warn = function (t) {
                        this._log("warning", t)
                    }, s.prototype.warning = function (t) {
                        this._log("warning", t)
                    }, s.prototype.error = function (t) {
                        this._log("error", t)
                    }, s.prototype.critical = function (t) {
                        this._log("critical", t)
                    }, s.prototype.wait = function (t) {
                        this.queue.wait(t)
                    }, s.prototype.captureEvent = function (t, e, r) {
                        return this.telemeter && this.telemeter.captureEvent(t, e, r)
                    }, s.prototype.captureDomContentLoaded = function (t) {
                        return this.telemeter && this.telemeter.captureDomContentLoaded(t)
                    }, s.prototype.captureLoad = function (t) {
                        return this.telemeter && this.telemeter.captureLoad(t)
                    }, s.prototype.buildJsonPayload = function (t) {
                        return this.api.buildJsonPayload(t)
                    }, s.prototype.sendJsonPayload = function (t) {
                        this.api.postJsonPayload(t)
                    }, s.prototype._log = function (t, e) {
                        var r;
                        if (e.callback && (r = e.callback, delete e.callback), this.options.ignoreDuplicateErrors && this._sameAsLastError(e)) {
                            if (r) {
                                var n = new Error("ignored identical item");
                                n.item = e, r(n)
                            }
                        } else try {
                            this._addTracingInfo(e), e.level = e.level || t, this.telemeter && this.telemeter._captureRollbarItem(e), e.telemetryEvents = this.telemeter && this.telemeter.copyEvents() || [], this.notifier.log(e, r)
                        } catch (t) {
                            r && r(t), this.logger.error(t)
                        }
                    }, s.prototype._defaultLogLevel = function () {
                        return this.options.logLevel || "debug"
                    }, s.prototype._sameAsLastError = function (t) {
                        if (!t._isUncaught) return !1;
                        var e = function (t) {
                            return (t.message || "") + "::" + ((t.err || {}).stack || String(t.err))
                        }(t);
                        return this.lastErrorHash === e || (this.lastError = t.err, this.lastErrorHash = e, !1)
                    }, s.prototype._addTracingInfo = function (t) {
                        if (this.tracer) {
                            var e = this.tracer.scope().active();
                            if (function (t) {
                                    if (!t || !t.context || "function" != typeof t.context) return !1;
                                    var e = t.context();
                                    return !!(e && e.toSpanId && e.toTraceId && "function" == typeof e.toSpanId && "function" == typeof e.toTraceId)
                                }(e)) {
                                e.setTag("rollbar.error_uuid", t.uuid), e.setTag("rollbar.has_error", !0), e.setTag("error", !0), e.setTag("rollbar.item_url", "https://rollbar.com/item/uuid/?uuid=" + t.uuid), e.setTag("rollbar.occurrence_url", "https://rollbar.com/occurrence/uuid/?uuid=" + t.uuid);
                                var r = e.context().toSpanId(),
                                    n = e.context().toTraceId();
                                t.custom ? (t.custom.opentracing_span_id = r, t.custom.opentracing_trace_id = n) : t.custom = {
                                    opentracing_span_id: r,
                                    opentracing_trace_id: n
                                }
                            }
                        }
                    }, t.exports = s
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);

                    function i(t) {
                        this.startTime = n.now(), this.counter = 0, this.perMinCounter = 0, this.platform = null, this.platformOptions = {}, this.configureGlobal(t)
                    }

                    function o(t, e, r) {
                        return !t.ignoreRateLimit && e >= 1 && r > e
                    }

                    function a(t, e, r, n, i, o, a) {
                        var s = null;
                        return r && (r = new Error(r)), r || n || (s = function (t, e, r, n, i) {
                            var o = {
                                body: {
                                    message: {
                                        body: i ? "item per minute limit reached, ignoring errors until timeout" : "maxItems has been hit, ignoring errors until reset.",
                                        extra: {
                                            maxItems: r,
                                            itemsPerMinute: n
                                        }
                                    }
                                },
                                language: "javascript",
                                environment: e.environment || e.payload && e.payload.environment,
                                notifier: {
                                    version: e.notifier && e.notifier.version || e.version
                                }
                            };
                            return "browser" === t ? (o.platform = "browser", o.framework = "browser-js", o.notifier.name = "rollbar-browser-js") : "server" === t ? (o.framework = e.framework || "node-js", o.notifier.name = e.notifier.name) : "react-native" === t && (o.framework = e.framework || "react-native", o.notifier.name = e.notifier.name), o
                        }(t, e, i, o, a)), {
                            error: r,
                            shouldSend: n,
                            payload: s
                        }
                    }
                    i.globalSettings = {
                        startTime: n.now(),
                        maxItems: void 0,
                        itemsPerMinute: void 0
                    }, i.prototype.configureGlobal = function (t) {
                        void 0 !== t.startTime && (i.globalSettings.startTime = t.startTime), void 0 !== t.maxItems && (i.globalSettings.maxItems = t.maxItems), void 0 !== t.itemsPerMinute && (i.globalSettings.itemsPerMinute = t.itemsPerMinute)
                    }, i.prototype.shouldSend = function (t, e) {
                        var r = (e = e || n.now()) - this.startTime;
                        (r < 0 || r >= 6e4) && (this.startTime = e, this.perMinCounter = 0);
                        var s = i.globalSettings.maxItems,
                            c = i.globalSettings.itemsPerMinute;
                        if (o(t, s, this.counter)) return a(this.platform, this.platformOptions, s + " max items reached", !1);
                        if (o(t, c, this.perMinCounter)) return a(this.platform, this.platformOptions, c + " items per minute reached", !1);
                        this.counter++, this.perMinCounter++;
                        var u = !o(t, s, this.counter),
                            l = u;
                        return u = u && !o(t, c, this.perMinCounter), a(this.platform, this.platformOptions, null, u, s, c, l)
                    }, i.prototype.setPlatformOptions = function (t, e) {
                        this.platform = t, this.platformOptions = e
                    }, t.exports = i
                }, function (t, e, r) {
                    "use strict";
                    var n = Object.prototype.hasOwnProperty,
                        i = Object.prototype.toString,
                        o = function (t) {
                            if (!t || "[object Object]" !== i.call(t)) return !1;
                            var e, r = n.call(t, "constructor"),
                                o = t.constructor && t.constructor.prototype && n.call(t.constructor.prototype, "isPrototypeOf");
                            if (t.constructor && !r && !o) return !1;
                            for (e in t);
                            return void 0 === e || n.call(t, e)
                        };
                    t.exports = function t() {
                        var e, r, n, i, a, s = {},
                            c = null,
                            u = arguments.length;
                        for (e = 0; e < u; e++)
                            if (null != (c = arguments[e]))
                                for (a in c) r = s[a], s !== (n = c[a]) && (n && o(n) ? (i = r && o(r) ? r : {}, s[a] = t(i, n)) : void 0 !== n && (s[a] = n));
                        return s
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);

                    function i(t, e, r, n) {
                        this.rateLimiter = t, this.api = e, this.logger = r, this.options = n, this.predicates = [], this.pendingItems = [], this.pendingRequests = [], this.retryQueue = [], this.retryHandle = null, this.waitCallback = null, this.waitIntervalID = null
                    }
                    i.prototype.configure = function (t) {
                        this.api && this.api.configure(t);
                        var e = this.options;
                        return this.options = n.merge(e, t), this
                    }, i.prototype.addPredicate = function (t) {
                        return n.isFunction(t) && this.predicates.push(t), this
                    }, i.prototype.addPendingItem = function (t) {
                        this.pendingItems.push(t)
                    }, i.prototype.removePendingItem = function (t) {
                        var e = this.pendingItems.indexOf(t); - 1 !== e && this.pendingItems.splice(e, 1)
                    }, i.prototype.addItem = function (t, e, r, i) {
                        e && n.isFunction(e) || (e = function () {});
                        var o = this._applyPredicates(t);
                        if (o.stop) return this.removePendingItem(i), void e(o.err);
                        if (this._maybeLog(t, r), this.removePendingItem(i), this.options.transmit) {
                            this.pendingRequests.push(t);
                            try {
                                this._makeApiRequest(t, function (r, n) {
                                    this._dequeuePendingRequest(t), e(r, n)
                                }.bind(this))
                            } catch (r) {
                                this._dequeuePendingRequest(t), e(r)
                            }
                        } else e(new Error("Transmit disabled"))
                    }, i.prototype.wait = function (t) {
                        n.isFunction(t) && (this.waitCallback = t, this._maybeCallWait() || (this.waitIntervalID && (this.waitIntervalID = clearInterval(this.waitIntervalID)), this.waitIntervalID = setInterval(function () {
                            this._maybeCallWait()
                        }.bind(this), 500)))
                    }, i.prototype._applyPredicates = function (t) {
                        for (var e = null, r = 0, n = this.predicates.length; r < n; r++)
                            if (!(e = this.predicates[r](t, this.options)) || void 0 !== e.err) return {
                                stop: !0,
                                err: e.err
                            };
                        return {
                            stop: !1,
                            err: null
                        }
                    }, i.prototype._makeApiRequest = function (t, e) {
                        var r = this.rateLimiter.shouldSend(t);
                        r.shouldSend ? this.api.postItem(t, function (r, n) {
                            r ? this._maybeRetry(r, t, e) : e(r, n)
                        }.bind(this)) : r.error ? e(r.error) : this.api.postItem(r.payload, e)
                    };
                    var o = ["ECONNRESET", "ENOTFOUND", "ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNREFUSED", "EHOSTUNREACH", "EPIPE", "EAI_AGAIN"];
                    i.prototype._maybeRetry = function (t, e, r) {
                        var i = !1;
                        if (this.options.retryInterval) {
                            for (var a = 0, s = o.length; a < s; a++)
                                if (t.code === o[a]) {
                                    i = !0;
                                    break
                                } i && n.isFiniteNumber(this.options.maxRetries) && (e.retries = e.retries ? e.retries + 1 : 1, e.retries > this.options.maxRetries && (i = !1))
                        }
                        i ? this._retryApiRequest(e, r) : r(t)
                    }, i.prototype._retryApiRequest = function (t, e) {
                        this.retryQueue.push({
                            item: t,
                            callback: e
                        }), this.retryHandle || (this.retryHandle = setInterval(function () {
                            for (; this.retryQueue.length;) {
                                var t = this.retryQueue.shift();
                                this._makeApiRequest(t.item, t.callback)
                            }
                        }.bind(this), this.options.retryInterval))
                    }, i.prototype._dequeuePendingRequest = function (t) {
                        var e = this.pendingRequests.indexOf(t); - 1 !== e && (this.pendingRequests.splice(e, 1), this._maybeCallWait())
                    }, i.prototype._maybeLog = function (t, e) {
                        if (this.logger && this.options.verbose) {
                            var r = e;
                            if (r = (r = r || n.get(t, "body.trace.exception.message")) || n.get(t, "body.trace_chain.0.exception.message")) return void this.logger.error(r);
                            (r = n.get(t, "body.message.body")) && this.logger.log(r)
                        }
                    }, i.prototype._maybeCallWait = function () {
                        return !(!n.isFunction(this.waitCallback) || 0 !== this.pendingItems.length || 0 !== this.pendingRequests.length || (this.waitIntervalID && (this.waitIntervalID = clearInterval(this.waitIntervalID)), this.waitCallback(), 0))
                    }, t.exports = i
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);

                    function i(t, e) {
                        this.queue = t, this.options = e, this.transforms = [], this.diagnostic = {}
                    }
                    i.prototype.configure = function (t) {
                        this.queue && this.queue.configure(t);
                        var e = this.options;
                        return this.options = n.merge(e, t), this
                    }, i.prototype.addTransform = function (t) {
                        return n.isFunction(t) && this.transforms.push(t), this
                    }, i.prototype.log = function (t, e) {
                        if (e && n.isFunction(e) || (e = function () {}), !this.options.enabled) return e(new Error("Rollbar is not enabled"));
                        this.queue.addPendingItem(t);
                        var r = t.err;
                        this._applyTransforms(t, function (n, i) {
                            if (n) return this.queue.removePendingItem(t), e(n, null);
                            this.queue.addItem(i, e, r, t)
                        }.bind(this))
                    }, i.prototype._applyTransforms = function (t, e) {
                        var r = -1,
                            n = this.transforms.length,
                            i = this.transforms,
                            o = this.options,
                            a = function (t, s) {
                                t ? e(t, null) : ++r !== n ? i[r](s, o, a) : e(null, s)
                            };
                        a(null, t)
                    }, t.exports = i
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0),
                        i = r(16),
                        o = {
                            hostname: "api.rollbar.com",
                            path: "/api/1/item/",
                            search: null,
                            version: "1",
                            protocol: "https:",
                            port: 443
                        };

                    function a(t, e, r, n, i) {
                        this.options = t, this.transport = e, this.url = r, this.truncation = n, this.jsonBackup = i, this.accessToken = t.accessToken, this.transportOptions = s(t, r)
                    }

                    function s(t, e) {
                        return i.getTransportFromOptions(t, o, e)
                    }
                    a.prototype.postItem = function (t, e) {
                        var r = i.transportOptions(this.transportOptions, "POST"),
                            n = i.buildPayload(this.accessToken, t, this.jsonBackup);
                        this.transport.post(this.accessToken, r, n, e)
                    }, a.prototype.buildJsonPayload = function (t, e) {
                        var r, o = i.buildPayload(this.accessToken, t, this.jsonBackup);
                        return (r = this.truncation ? this.truncation.truncate(o) : n.stringify(o)).error ? (e && e(r.error), null) : r.value
                    }, a.prototype.postJsonPayload = function (t, e) {
                        var r = i.transportOptions(this.transportOptions, "POST");
                        this.transport.postJsonPayload(this.accessToken, r, t, e)
                    }, a.prototype.configure = function (t) {
                        var e = this.oldOptions;
                        return this.options = n.merge(e, t), this.transportOptions = s(this.options, this.url), void 0 !== this.options.accessToken && (this.accessToken = this.options.accessToken), this
                    }, t.exports = a
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);
                    t.exports = {
                        buildPayload: function (t, e, r) {
                            if (!n.isType(e.context, "string")) {
                                var i = n.stringify(e.context, r);
                                i.error ? e.context = "Error: could not serialize 'context'" : e.context = i.value || "", e.context.length > 255 && (e.context = e.context.substr(0, 255))
                            }
                            return {
                                access_token: t,
                                data: e
                            }
                        },
                        getTransportFromOptions: function (t, e, r) {
                            var n = e.hostname,
                                i = e.protocol,
                                o = e.port,
                                a = e.path,
                                s = e.search,
                                c = t.timeout,
                                u = t.proxy;
                            if (t.endpoint) {
                                var l = r.parse(t.endpoint);
                                n = l.hostname, i = l.protocol, o = l.port, a = l.pathname, s = l.search
                            }
                            return {
                                timeout: c,
                                hostname: n,
                                protocol: i,
                                port: o,
                                path: a,
                                search: s,
                                proxy: u
                            }
                        },
                        transportOptions: function (t, e) {
                            var r = t.protocol || "https:",
                                n = t.port || ("http:" === r ? 80 : "https:" === r ? 443 : void 0),
                                i = t.hostname,
                                o = t.path,
                                a = t.timeout;
                            return t.search && (o += t.search), t.proxy && (o = r + "//" + i + o, i = t.proxy.host || t.proxy.hostname, n = t.proxy.port, r = t.proxy.protocol || r), {
                                timeout: a,
                                protocol: r,
                                hostname: i,
                                path: o,
                                port: n,
                                method: e
                            }
                        },
                        appendPathToPath: function (t, e) {
                            var r = /\/$/.test(t),
                                n = /^\//.test(e);
                            return r && n ? e = e.substring(1) : r || n || (e = "/" + e), t + e
                        }
                    }
                }, function (t, e) {
                    ! function (t) {
                        "use strict";
                        t.console || (t.console = {});
                        for (var e, r, n = t.console, i = function () {}, o = ["memory"], a = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); e = o.pop();) n[e] || (n[e] = {});
                        for (; r = a.pop();) n[r] || (n[r] = i)
                    }("undefined" == typeof window ? this : window)
                }, function (t, e, r) {
                    "use strict";
                    var n = {
                        ieVersion: function () {
                            if ("undefined" != typeof document) {
                                for (var t = 3, e = document.createElement("div"), r = e.getElementsByTagName("i"); e.innerHTML = "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e", r[0];);
                                return t > 4 ? t : void 0
                            }
                        }
                    };
                    t.exports = n
                }, function (t, e, r) {
                    "use strict";

                    function n(t, e, r, n) {
                        t._rollbarWrappedError && (n[4] || (n[4] = t._rollbarWrappedError), n[5] || (n[5] = t._rollbarWrappedError._rollbarContext), t._rollbarWrappedError = null);
                        var i = e.handleUncaughtException.apply(e, n);
                        r && r.apply(t, n), "anonymous" === i && (e.anonymousErrorsPending += 1)
                    }
                    t.exports = {
                        captureUncaughtExceptions: function (t, e, r) {
                            if (t) {
                                var i;
                                if ("function" == typeof e._rollbarOldOnError) i = e._rollbarOldOnError;
                                else if (t.onerror) {
                                    for (i = t.onerror; i._rollbarOldOnError;) i = i._rollbarOldOnError;
                                    e._rollbarOldOnError = i
                                }
                                e.handleAnonymousErrors();
                                var o = function () {
                                    var r = Array.prototype.slice.call(arguments, 0);
                                    n(t, e, i, r)
                                };
                                r && (o._rollbarOldOnError = i), t.onerror = o
                            }
                        },
                        captureUnhandledRejections: function (t, e, r) {
                            if (t) {
                                "function" == typeof t._rollbarURH && t._rollbarURH.belongsToShim && t.removeEventListener("unhandledrejection", t._rollbarURH);
                                var n = function (t) {
                                    var r, n, i;
                                    try {
                                        r = t.reason
                                    } catch (t) {
                                        r = void 0
                                    }
                                    try {
                                        n = t.promise
                                    } catch (t) {
                                        n = "[unhandledrejection] error getting `promise` from event"
                                    }
                                    try {
                                        i = t.detail, !r && i && (r = i.reason, n = i.promise)
                                    } catch (t) {}
                                    r || (r = "[unhandledrejection] error getting `reason` from event"), e && e.handleUnhandledRejection && e.handleUnhandledRejection(r, n)
                                };
                                n.belongsToShim = r, t._rollbarURH = n, t.addEventListener("unhandledrejection", n)
                            }
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0),
                        i = r(1);

                    function o(t) {
                        this.truncation = t
                    }

                    function a() {
                        var t = "undefined" != typeof window && window || "undefined" != typeof self && self,
                            e = t && t.Zone && t.Zone.current,
                            r = Array.prototype.slice.call(arguments);
                        e && "angular" === e._name ? e._parent.run((function () {
                            s.apply(void 0, r)
                        })) : s.apply(void 0, r)
                    }

                    function s(t, e, r, o, a, s, u) {
                        if ("undefined" != typeof RollbarProxy) return function (t, e) {
                            (new RollbarProxy).sendJsonPayload(t, (function (t) {}), (function (t) {
                                e(new Error(t))
                            }))
                        }(o, a);
                        var l;
                        if (!(l = s ? s() : function () {
                                var t, e, r = [function () {
                                        return new XMLHttpRequest
                                    }, function () {
                                        return new ActiveXObject("Msxml2.XMLHTTP")
                                    }, function () {
                                        return new ActiveXObject("Msxml3.XMLHTTP")
                                    }, function () {
                                        return new ActiveXObject("Microsoft.XMLHTTP")
                                    }],
                                    n = r.length;
                                for (e = 0; e < n; e++) try {
                                    t = r[e]();
                                    break
                                } catch (t) {}
                                return t
                            }())) return a(new Error("No way to send a request"));
                        try {
                            try {
                                var h = function () {
                                    try {
                                        if (h && 4 === l.readyState) {
                                            h = void 0;
                                            var t = n.jsonParse(l.responseText);
                                            if ((o = l) && o.status && 200 === o.status) return void a(t.error, t.value);
                                            if (function (t) {
                                                    return t && n.isType(t.status, "number") && t.status >= 400 && t.status < 600
                                                }(l)) {
                                                if (403 === l.status) {
                                                    var e = t.value && t.value.message;
                                                    i.error(e)
                                                }
                                                a(new Error(String(l.status)))
                                            } else a(c("XHR response had no status code (likely connection failure)"))
                                        }
                                    } catch (t) {
                                        var r;
                                        r = t && t.stack ? t : new Error(t), a(r)
                                    }
                                    var o
                                };
                                l.open(r, e, !0), l.setRequestHeader && (l.setRequestHeader("Content-Type", "application/json"), l.setRequestHeader("X-Rollbar-Access-Token", t)), n.isFiniteNumber(u) && (l.timeout = u), l.onreadystatechange = h, l.send(o)
                            } catch (t) {
                                if ("undefined" != typeof XDomainRequest) {
                                    if (!window || !window.location) return a(new Error("No window available during request, unknown environment"));
                                    "http:" === window.location.href.substring(0, 5) && "https" === e.substring(0, 5) && (e = "http" + e.substring(5));
                                    var f = new XDomainRequest;
                                    f.onprogress = function () {}, f.ontimeout = function () {
                                        a(c("Request timed out", "ETIMEDOUT"))
                                    }, f.onerror = function () {
                                        a(new Error("Error during request"))
                                    }, f.onload = function () {
                                        var t = n.jsonParse(f.responseText);
                                        a(t.error, t.value)
                                    }, f.open(r, e, !0), f.send(o)
                                } else a(new Error("Cannot find a method to transport a request"))
                            }
                        } catch (t) {
                            a(t)
                        }
                    }

                    function c(t, e) {
                        var r = new Error(t);
                        return r.code = e || "ENOTFOUND", r
                    }
                    o.prototype.get = function (t, e, r, i, o) {
                        i && n.isFunction(i) || (i = function () {}), n.addParamsAndAccessTokenToPath(t, e, r), a(t, n.formatUrl(e), "GET", null, i, o, e.timeout)
                    }, o.prototype.post = function (t, e, r, i, o) {
                        if (i && n.isFunction(i) || (i = function () {}), !r) return i(new Error("Cannot send empty request"));
                        var s;
                        if ((s = this.truncation ? this.truncation.truncate(r) : n.stringify(r)).error) return i(s.error);
                        var c = s.value;
                        a(t, n.formatUrl(e), "POST", c, i, o, e.timeout)
                    }, o.prototype.postJsonPayload = function (t, e, r, i, o) {
                        i && n.isFunction(i) || (i = function () {}), a(t, n.formatUrl(e), "POST", r, i, o, e.timeout)
                    }, t.exports = o
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0),
                        i = r(3),
                        o = r(1);

                    function a(t, e, r) {
                        var i = t.message,
                            o = t.custom;
                        i || (i = "Item sent with null or missing arguments.");
                        var a = {
                            body: i
                        };
                        o && (a.extra = n.merge(o)), n.set(t, "data.body", {
                            message: a
                        }), r(null, t)
                    }

                    function s(t) {
                        var e = t.stackInfo.stack;
                        return e && 0 === e.length && t._unhandledStackInfo && t._unhandledStackInfo.stack && (e = t._unhandledStackInfo.stack), e
                    }

                    function c(t, e, r) {
                        var o = t && t.data.description,
                            a = t && t.custom,
                            c = s(t),
                            l = i.guessErrorClass(e.message),
                            h = {
                                exception: {
                                    class: u(e, l[0], r),
                                    message: l[1]
                                }
                            };
                        if (o && (h.exception.description = o), c) {
                            var f, p, d, m, v, g, y, b;
                            for (0 === c.length && (h.exception.stack = e.rawStack, h.exception.raw = String(e.rawException)), h.frames = [], y = 0; y < c.length; ++y) p = {
                                filename: (f = c[y]).url ? n.sanitizeUrl(f.url) : "(unknown)",
                                lineno: f.line || null,
                                method: f.func && "?" !== f.func ? f.func : "[anonymous]",
                                colno: f.column
                            }, r.sendFrameUrl && (p.url = f.url), p.method && p.method.endsWith && p.method.endsWith("_rollbar_wrapped") || (d = m = v = null, (g = f.context ? f.context.length : 0) && (b = Math.floor(g / 2), m = f.context.slice(0, b), d = f.context[b], v = f.context.slice(b)), d && (p.code = d), (m || v) && (p.context = {}, m && m.length && (p.context.pre = m), v && v.length && (p.context.post = v)), f.args && (p.args = f.args), h.frames.push(p));
                            h.frames.reverse(), a && (h.extra = n.merge(a))
                        }
                        return h
                    }

                    function u(t, e, r) {
                        return t.name ? t.name : r.guessErrorClass ? e : "(unknown)"
                    }
                    t.exports = {
                        handleDomException: function (t, e, r) {
                            if (t.err && "DOMException" === i.Stack(t.err).name) {
                                var n = new Error;
                                n.name = t.err.name, n.message = t.err.message, n.stack = t.err.stack, n.nested = t.err, t.err = n
                            }
                            r(null, t)
                        },
                        handleItemWithError: function (t, e, r) {
                            if (t.data = t.data || {}, t.err) try {
                                t.stackInfo = t.err._savedStackTrace || i.parse(t.err, t.skipFrames), e.addErrorContext && function (t) {
                                    var e = [],
                                        r = t.err;
                                    for (e.push(r); r.nested;) r = r.nested, e.push(r);
                                    n.addErrorContext(t, e)
                                }(t)
                            } catch (e) {
                                o.error("Error while parsing the error object.", e);
                                try {
                                    t.message = t.err.message || t.err.description || t.message || String(t.err)
                                } catch (e) {
                                    t.message = String(t.err) || String(e)
                                }
                                delete t.err
                            }
                            r(null, t)
                        },
                        ensureItemHasSomethingToSay: function (t, e, r) {
                            t.message || t.stackInfo || t.custom || r(new Error("No message, stack info, or custom data"), null), r(null, t)
                        },
                        addBaseInfo: function (t, e, r) {
                            var i = e.payload && e.payload.environment || e.environment;
                            t.data = n.merge(t.data, {
                                environment: i,
                                level: t.level,
                                endpoint: e.endpoint,
                                platform: "browser",
                                framework: "browser-js",
                                language: "javascript",
                                server: {},
                                uuid: t.uuid,
                                notifier: {
                                    name: "rollbar-browser-js",
                                    version: e.version
                                },
                                custom: t.custom
                            }), r(null, t)
                        },
                        addRequestInfo: function (t) {
                            return function (e, r, i) {
                                if (!t || !t.location) return i(null, e);
                                var o = "$remote_ip";
                                r.captureIp ? !0 !== r.captureIp && (o += "_anonymize") : o = null, n.set(e, "data.request", {
                                    url: t.location.href,
                                    query_string: t.location.search,
                                    user_ip: o
                                }), i(null, e)
                            }
                        },
                        addClientInfo: function (t) {
                            return function (e, r, i) {
                                if (!t) return i(null, e);
                                var o = t.navigator || {},
                                    a = t.screen || {};
                                n.set(e, "data.client", {
                                    runtime_ms: e.timestamp - t._rollbarStartTime,
                                    timestamp: Math.round(e.timestamp / 1e3),
                                    javascript: {
                                        browser: o.userAgent,
                                        language: o.language,
                                        cookie_enabled: o.cookieEnabled,
                                        screen: {
                                            width: a.width,
                                            height: a.height
                                        }
                                    }
                                }), i(null, e)
                            }
                        },
                        addPluginInfo: function (t) {
                            return function (e, r, i) {
                                if (!t || !t.navigator) return i(null, e);
                                for (var o, a = [], s = t.navigator.plugins || [], c = 0, u = s.length; c < u; ++c) o = s[c], a.push({
                                    name: o.name,
                                    description: o.description
                                });
                                n.set(e, "data.client.javascript.plugins", a), i(null, e)
                            }
                        },
                        addBody: function (t, e, r) {
                            t.stackInfo ? t.stackInfo.traceChain ? function (t, e, r) {
                                for (var i = t.stackInfo.traceChain, o = [], a = i.length, s = 0; s < a; s++) {
                                    var u = c(t, i[s], e);
                                    o.push(u)
                                }
                                n.set(t, "data.body", {
                                    trace_chain: o
                                }), r(null, t)
                            }(t, e, r) : function (t, e, r) {
                                if (s(t)) {
                                    var o = c(t, t.stackInfo, e);
                                    n.set(t, "data.body", {
                                        trace: o
                                    }), r(null, t)
                                } else {
                                    var l = t.stackInfo,
                                        h = i.guessErrorClass(l.message),
                                        f = u(l, h[0], e),
                                        p = h[1];
                                    t.message = f + ": " + p, a(t, 0, r)
                                }
                            }(t, e, r) : a(t, 0, r)
                        },
                        addScrubber: function (t) {
                            return function (e, r, n) {
                                if (t) {
                                    var i = r.scrubFields || [],
                                        o = r.scrubPaths || [];
                                    e.data = t(e.data, i, o)
                                }
                                n(null, e)
                            }
                        }
                    }
                }, function (t, e, r) {
                    var n, i, o;
                    ! function (a, s) {
                        "use strict";
                        i = [r(23)], void 0 === (o = "function" == typeof (n = function (t) {
                            var e = /(^|@)\S+:\d+/,
                                r = /^\s*at .*(\S+:\d+|\(native\))/m,
                                n = /^(eval@)?(\[native code])?$/;
                            return {
                                parse: function (t) {
                                    if (void 0 !== t.stacktrace || void 0 !== t["opera#sourceloc"]) return this.parseOpera(t);
                                    if (t.stack && t.stack.match(r)) return this.parseV8OrIE(t);
                                    if (t.stack) return this.parseFFOrSafari(t);
                                    throw new Error("Cannot parse given Error object")
                                },
                                extractLocation: function (t) {
                                    if (-1 === t.indexOf(":")) return [t];
                                    var e = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t.replace(/[()]/g, ""));
                                    return [e[1], e[2] || void 0, e[3] || void 0]
                                },
                                parseV8OrIE: function (e) {
                                    return e.stack.split("\n").filter((function (t) {
                                        return !!t.match(r)
                                    }), this).map((function (e) {
                                        e.indexOf("(eval ") > -1 && (e = e.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, ""));
                                        var r = e.replace(/^\s+/, "").replace(/\(eval code/g, "("),
                                            n = r.match(/ (\((.+):(\d+):(\d+)\)$)/),
                                            i = (r = n ? r.replace(n[0], "") : r).split(/\s+/).slice(1),
                                            o = this.extractLocation(n ? n[1] : i.pop()),
                                            a = i.join(" ") || void 0,
                                            s = ["eval", "<anonymous>"].indexOf(o[0]) > -1 ? void 0 : o[0];
                                        return new t({
                                            functionName: a,
                                            fileName: s,
                                            lineNumber: o[1],
                                            columnNumber: o[2],
                                            source: e
                                        })
                                    }), this)
                                },
                                parseFFOrSafari: function (e) {
                                    return e.stack.split("\n").filter((function (t) {
                                        return !t.match(n)
                                    }), this).map((function (e) {
                                        if (e.indexOf(" > eval") > -1 && (e = e.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), -1 === e.indexOf("@") && -1 === e.indexOf(":")) return new t({
                                            functionName: e
                                        });
                                        var r = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                                            n = e.match(r),
                                            i = n && n[1] ? n[1] : void 0,
                                            o = this.extractLocation(e.replace(r, ""));
                                        return new t({
                                            functionName: i,
                                            fileName: o[0],
                                            lineNumber: o[1],
                                            columnNumber: o[2],
                                            source: e
                                        })
                                    }), this)
                                },
                                parseOpera: function (t) {
                                    return !t.stacktrace || t.message.indexOf("\n") > -1 && t.message.split("\n").length > t.stacktrace.split("\n").length ? this.parseOpera9(t) : t.stack ? this.parseOpera11(t) : this.parseOpera10(t)
                                },
                                parseOpera9: function (e) {
                                    for (var r = /Line (\d+).*script (?:in )?(\S+)/i, n = e.message.split("\n"), i = [], o = 2, a = n.length; o < a; o += 2) {
                                        var s = r.exec(n[o]);
                                        s && i.push(new t({
                                            fileName: s[2],
                                            lineNumber: s[1],
                                            source: n[o]
                                        }))
                                    }
                                    return i
                                },
                                parseOpera10: function (e) {
                                    for (var r = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, n = e.stacktrace.split("\n"), i = [], o = 0, a = n.length; o < a; o += 2) {
                                        var s = r.exec(n[o]);
                                        s && i.push(new t({
                                            functionName: s[3] || void 0,
                                            fileName: s[2],
                                            lineNumber: s[1],
                                            source: n[o]
                                        }))
                                    }
                                    return i
                                },
                                parseOpera11: function (r) {
                                    return r.stack.split("\n").filter((function (t) {
                                        return !!t.match(e) && !t.match(/^Error created at/)
                                    }), this).map((function (e) {
                                        var r, n = e.split("@"),
                                            i = this.extractLocation(n.pop()),
                                            o = n.shift() || "",
                                            a = o.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
                                        o.match(/\(([^)]*)\)/) && (r = o.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                                        var s = void 0 === r || "[arguments not available]" === r ? void 0 : r.split(",");
                                        return new t({
                                            functionName: a,
                                            args: s,
                                            fileName: i[0],
                                            lineNumber: i[1],
                                            columnNumber: i[2],
                                            source: e
                                        })
                                    }), this)
                                }
                            }
                        }) ? n.apply(e, i) : n) || (t.exports = o)
                    }()
                }, function (t, e, r) {
                    var n, i, o;
                    ! function (r, a) {
                        "use strict";
                        i = [], void 0 === (o = "function" == typeof (n = function () {
                            function t(t) {
                                return t.charAt(0).toUpperCase() + t.substring(1)
                            }

                            function e(t) {
                                return function () {
                                    return this[t]
                                }
                            }
                            var r = ["isConstructor", "isEval", "isNative", "isToplevel"],
                                n = ["columnNumber", "lineNumber"],
                                i = ["fileName", "functionName", "source"],
                                o = r.concat(n, i, ["args"], ["evalOrigin"]);

                            function a(e) {
                                if (e)
                                    for (var r = 0; r < o.length; r++) void 0 !== e[o[r]] && this["set" + t(o[r])](e[o[r]])
                            }
                            a.prototype = {
                                getArgs: function () {
                                    return this.args
                                },
                                setArgs: function (t) {
                                    if ("[object Array]" !== Object.prototype.toString.call(t)) throw new TypeError("Args must be an Array");
                                    this.args = t
                                },
                                getEvalOrigin: function () {
                                    return this.evalOrigin
                                },
                                setEvalOrigin: function (t) {
                                    if (t instanceof a) this.evalOrigin = t;
                                    else {
                                        if (!(t instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame");
                                        this.evalOrigin = new a(t)
                                    }
                                },
                                toString: function () {
                                    var t = this.getFileName() || "",
                                        e = this.getLineNumber() || "",
                                        r = this.getColumnNumber() || "",
                                        n = this.getFunctionName() || "";
                                    return this.getIsEval() ? t ? "[eval] (" + t + ":" + e + ":" + r + ")" : "[eval]:" + e + ":" + r : n ? n + " (" + t + ":" + e + ":" + r + ")" : t + ":" + e + ":" + r
                                }
                            }, a.fromString = function (t) {
                                var e = t.indexOf("("),
                                    r = t.lastIndexOf(")"),
                                    n = t.substring(0, e),
                                    i = t.substring(e + 1, r).split(","),
                                    o = t.substring(r + 1);
                                if (0 === o.indexOf("@")) var s = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(o, ""),
                                    c = s[1],
                                    u = s[2],
                                    l = s[3];
                                return new a({
                                    functionName: n,
                                    args: i || void 0,
                                    fileName: c,
                                    lineNumber: u || void 0,
                                    columnNumber: l || void 0
                                })
                            };
                            for (var s = 0; s < r.length; s++) a.prototype["get" + t(r[s])] = e(r[s]), a.prototype["set" + t(r[s])] = function (t) {
                                return function (e) {
                                    this[t] = Boolean(e)
                                }
                            }(r[s]);
                            for (var c = 0; c < n.length; c++) a.prototype["get" + t(n[c])] = e(n[c]), a.prototype["set" + t(n[c])] = function (t) {
                                return function (e) {
                                    if (r = e, isNaN(parseFloat(r)) || !isFinite(r)) throw new TypeError(t + " must be a Number");
                                    var r;
                                    this[t] = Number(e)
                                }
                            }(n[c]);
                            for (var u = 0; u < i.length; u++) a.prototype["get" + t(i[u])] = e(i[u]), a.prototype["set" + t(i[u])] = function (t) {
                                return function (e) {
                                    this[t] = String(e)
                                }
                            }(i[u]);
                            return a
                        }) ? n.apply(e, i) : n) || (t.exports = o)
                    }()
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);

                    function i(t, e) {
                        n.isFunction(t[e]) && (t[e] = t[e].toString())
                    }
                    t.exports = {
                        itemToPayload: function (t, e, r) {
                            var i = e.payload || {};
                            i.body && delete i.body;
                            var o = n.merge(t.data, i);
                            t._isUncaught && (o._isUncaught = !0), t._originalArgs && (o._originalArgs = t._originalArgs), r(null, o)
                        },
                        addTelemetryData: function (t, e, r) {
                            t.telemetryEvents && n.set(t, "data.body.telemetry", t.telemetryEvents), r(null, t)
                        },
                        addMessageWithError: function (t, e, r) {
                            if (t.message) {
                                var i = "data.body.trace_chain.0",
                                    o = n.get(t, i);
                                if (o || (i = "data.body.trace", o = n.get(t, i)), o) {
                                    if (!o.exception || !o.exception.description) return n.set(t, i + ".exception.description", t.message), void r(null, t);
                                    var a = n.get(t, i + ".extra") || {},
                                        s = n.merge(a, {
                                            message: t.message
                                        });
                                    n.set(t, i + ".extra", s)
                                }
                                r(null, t)
                            } else r(null, t)
                        },
                        userTransform: function (t) {
                            return function (e, r, i) {
                                var o = n.merge(e),
                                    a = null;
                                try {
                                    n.isFunction(r.transform) && (a = r.transform(o.data, e))
                                } catch (n) {
                                    return r.transform = null, t.error("Error while calling custom transform() function. Removing custom transform().", n), void i(null, e)
                                }
                                n.isPromise(a) ? a.then((function (t) {
                                    t && (o.data = t), i(null, o)
                                }), (function (t) {
                                    i(t, e)
                                })) : i(null, o)
                            }
                        },
                        addConfigToPayload: function (t, e, r) {
                            if (!e.sendConfig) return r(null, t);
                            var i = n.get(t, "data.custom") || {};
                            i._rollbarConfig = e, t.data.custom = i, r(null, t)
                        },
                        addConfiguredOptions: function (t, e, r) {
                            var n = e._configuredOptions;
                            i(n, "transform"), i(n, "checkIgnore"), i(n, "onSendCallback"), delete n.accessToken, t.data.notifier.configured_options = n, r(null, t)
                        },
                        addDiagnosticKeys: function (t, e, r) {
                            var i = n.merge(t.notifier.client.notifier.diagnostic, t.diagnostic);
                            if (n.get(t, "err._isAnonymous") && (i.is_anonymous = !0), t._isUncaught && (i.is_uncaught = t._isUncaught), t.err) try {
                                i.raw_error = {
                                    message: t.err.message,
                                    name: t.err.name,
                                    constructor_name: t.err.constructor && t.err.constructor.name,
                                    filename: t.err.fileName,
                                    line: t.err.lineNumber,
                                    column: t.err.columnNumber,
                                    stack: t.err.stack
                                }
                            } catch (t) {
                                i.raw_error = {
                                    failed: String(t)
                                }
                            }
                            t.data.notifier.diagnostic = n.merge(t.data.notifier.diagnostic, i), r(null, t)
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);
                    t.exports = {
                        checkIgnore: function (t, e) {
                            return !n.get(e, "plugins.jquery.ignoreAjaxErrors") || !n.get(t, "body.message.extra.isAjax")
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);

                    function i(t, e, r) {
                        if (!t) return !r;
                        var i, o, a = t.frames;
                        if (!a || 0 === a.length) return !r;
                        for (var s = e.length, c = a.length, u = 0; u < c; u++) {
                            if (i = a[u].filename, !n.isType(i, "string")) return !r;
                            for (var l = 0; l < s; l++)
                                if (o = e[l], new RegExp(o).test(i)) return !0
                        }
                        return !1
                    }

                    function o(t, e, r, o) {
                        var a, s, c = !1;
                        "blocklist" === r && (c = !0);
                        try {
                            if (a = c ? e.hostBlockList : e.hostSafeList, s = n.get(t, "body.trace_chain") || [n.get(t, "body.trace")], !a || 0 === a.length) return !c;
                            if (0 === s.length || !s[0]) return !c;
                            for (var u = s.length, l = 0; l < u; l++)
                                if (i(s[l], a, c)) return !0
                        } catch (t) {
                            c ? e.hostBlockList = null : e.hostSafeList = null;
                            var h = c ? "hostBlockList" : "hostSafeList";
                            return o.error("Error while reading your configuration's " + h + " option. Removing custom " + h + ".", t), !c
                        }
                        return !1
                    }
                    t.exports = {
                        checkLevel: function (t, e) {
                            var r = t.level,
                                i = n.LEVELS[r] || 0,
                                o = e.reportLevel;
                            return !(i < (n.LEVELS[o] || 0))
                        },
                        userCheckIgnore: function (t) {
                            return function (e, r) {
                                var i = !!e._isUncaught;
                                delete e._isUncaught;
                                var o = e._originalArgs;
                                delete e._originalArgs;
                                try {
                                    n.isFunction(r.onSendCallback) && r.onSendCallback(i, o, e)
                                } catch (e) {
                                    r.onSendCallback = null, t.error("Error while calling onSendCallback, removing", e)
                                }
                                try {
                                    if (n.isFunction(r.checkIgnore) && r.checkIgnore(i, o, e)) return !1
                                } catch (e) {
                                    r.checkIgnore = null, t.error("Error while calling custom checkIgnore(), removing", e)
                                }
                                return !0
                            }
                        },
                        urlIsNotBlockListed: function (t) {
                            return function (e, r) {
                                return !o(e, r, "blocklist", t)
                            }
                        },
                        urlIsSafeListed: function (t) {
                            return function (e, r) {
                                return o(e, r, "safelist", t)
                            }
                        },
                        messageIsIgnored: function (t) {
                            return function (e, r) {
                                var i, o, a, s, c, u;
                                try {
                                    if (!(a = r.ignoredMessages) || 0 === a.length) return !0;
                                    if (0 === (u = function (t) {
                                            var e = t.body,
                                                r = [];
                                            if (e.trace_chain)
                                                for (var i = e.trace_chain, o = 0; o < i.length; o++) {
                                                    var a = i[o];
                                                    r.push(n.get(a, "exception.message"))
                                                }
                                            return e.trace && r.push(n.get(e, "trace.exception.message")), e.message && r.push(n.get(e, "message.body")), r
                                        }(e)).length) return !0;
                                    for (s = a.length, i = 0; i < s; i++)
                                        for (c = new RegExp(a[i], "gi"), o = 0; o < u.length; o++)
                                            if (c.test(u[o])) return !1
                                } catch (e) {
                                    r.ignoredMessages = null, t.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.")
                                }
                                return !0
                            }
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    t.exports = {
                        version: "2.24.0",
                        endpoint: "api.rollbar.com/api/1/item/",
                        logLevel: "debug",
                        reportLevel: "debug",
                        uncaughtErrorLevel: "error",
                        maxItems: 0,
                        itemsPerMin: 60
                    }
                }, function (t, e, r) {
                    "use strict";
                    t.exports = {
                        scrubFields: ["pw", "pass", "passwd", "password", "secret", "confirm_password", "confirmPassword", "password_confirmation", "passwordConfirmation", "access_token", "accessToken", "X-Rollbar-Access-Token", "secret_key", "secretKey", "secretToken", "cc-number", "card number", "cardnumber", "cardnum", "ccnum", "ccnumber", "cc num", "creditcardnumber", "credit card number", "newcreditcardnumber", "new credit card", "creditcardno", "credit card no", "card#", "card #", "cc-csc", "cvc", "cvc2", "cvv2", "ccv2", "security code", "card verification", "name on credit card", "name on card", "nameoncard", "cardholder", "card holder", "name des karteninhabers", "ccname", "card type", "cardtype", "cc type", "cctype", "payment type", "expiration date", "expirationdate", "expdate", "cc-exp", "ccmonth", "ccyear"]
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0);

                    function i(t) {
                        this.queue = [], this.options = n.merge(t);
                        var e = this.options.maxTelemetryEvents || 100;
                        this.maxQueueSize = Math.max(0, Math.min(e, 100))
                    }

                    function o(t, e) {
                        return e || {
                            error: "error",
                            manual: "info"
                        } [t] || "info"
                    }
                    i.prototype.configure = function (t) {
                        var e = this.options;
                        this.options = n.merge(e, t);
                        var r = this.options.maxTelemetryEvents || 100,
                            i = Math.max(0, Math.min(r, 100)),
                            o = 0;
                        this.maxQueueSize > i && (o = this.maxQueueSize - i), this.maxQueueSize = i, this.queue.splice(0, o)
                    }, i.prototype.copyEvents = function () {
                        var t = Array.prototype.slice.call(this.queue, 0);
                        if (n.isFunction(this.options.filterTelemetry)) try {
                            for (var e = t.length; e--;) this.options.filterTelemetry(t[e]) && t.splice(e, 1)
                        } catch (t) {
                            this.options.filterTelemetry = null
                        }
                        return t
                    }, i.prototype.capture = function (t, e, r, i, a) {
                        var s = {
                            level: o(t, r),
                            type: t,
                            timestamp_ms: a || n.now(),
                            body: e,
                            source: "client"
                        };
                        i && (s.uuid = i);
                        try {
                            if (n.isFunction(this.options.filterTelemetry) && this.options.filterTelemetry(s)) return !1
                        } catch (t) {
                            this.options.filterTelemetry = null
                        }
                        return this.push(s), s
                    }, i.prototype.captureEvent = function (t, e, r, n) {
                        return this.capture(t, e, r, n)
                    }, i.prototype.captureError = function (t, e, r, n) {
                        var i = {
                            message: t.message || String(t)
                        };
                        return t.stack && (i.stack = t.stack), this.capture("error", i, e, r, n)
                    }, i.prototype.captureLog = function (t, e, r, n) {
                        return this.capture("log", {
                            message: t
                        }, e, r, n)
                    }, i.prototype.captureNetwork = function (t, e, r, n) {
                        e = e || "xhr", t.subtype = t.subtype || e, n && (t.request = n);
                        var i = this.levelFromStatus(t.status_code);
                        return this.capture("network", t, i, r)
                    }, i.prototype.levelFromStatus = function (t) {
                        return t >= 200 && t < 400 ? "info" : 0 === t || t >= 400 ? "error" : "info"
                    }, i.prototype.captureDom = function (t, e, r, n, i) {
                        var o = {
                            subtype: t,
                            element: e
                        };
                        return void 0 !== r && (o.value = r), void 0 !== n && (o.checked = n), this.capture("dom", o, "info", i)
                    }, i.prototype.captureNavigation = function (t, e, r) {
                        return this.capture("navigation", {
                            from: t,
                            to: e
                        }, "info", r)
                    }, i.prototype.captureDomContentLoaded = function (t) {
                        return this.capture("navigation", {
                            subtype: "DOMContentLoaded"
                        }, "info", void 0, t && t.getTime())
                    }, i.prototype.captureLoad = function (t) {
                        return this.capture("navigation", {
                            subtype: "load"
                        }, "info", void 0, t && t.getTime())
                    }, i.prototype.captureConnectivityChange = function (t, e) {
                        return this.captureNetwork({
                            change: t
                        }, "connectivity", e)
                    }, i.prototype._captureRollbarItem = function (t) {
                        if (this.options.includeItemsInTelemetry) return t.err ? this.captureError(t.err, t.level, t.uuid, t.timestamp) : t.message ? this.captureLog(t.message, t.level, t.uuid, t.timestamp) : t.custom ? this.capture("log", t.custom, t.level, t.uuid, t.timestamp) : void 0
                    }, i.prototype.push = function (t) {
                        this.queue.push(t), this.queue.length > this.maxQueueSize && this.queue.shift()
                    }, t.exports = i
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0),
                        i = r(4),
                        o = r(2),
                        a = r(31),
                        s = {
                            network: !0,
                            networkResponseHeaders: !1,
                            networkResponseBody: !1,
                            networkRequestHeaders: !1,
                            networkRequestBody: !1,
                            networkErrorOnHttp5xx: !1,
                            networkErrorOnHttp4xx: !1,
                            networkErrorOnHttp0: !1,
                            log: !0,
                            dom: !0,
                            navigation: !0,
                            connectivity: !0,
                            contentSecurityPolicy: !0,
                            errorOnContentSecurityPolicy: !1
                        };

                    function c(t, e, r, n, i) {
                        var o = t[e];
                        t[e] = r(o), n && n[i].push([t, e, o])
                    }

                    function u(t, e) {
                        for (var r; t[e].length;)(r = t[e].shift())[0][r[1]] = r[2]
                    }

                    function l(t, e, r, i, o) {
                        this.options = t;
                        var a = t.autoInstrument;
                        !1 === t.enabled || !1 === a ? this.autoInstrument = {} : (n.isType(a, "object") || (a = s), this.autoInstrument = n.merge(s, a)), this.scrubTelemetryInputs = !!t.scrubTelemetryInputs, this.telemetryScrubber = t.telemetryScrubber, this.defaultValueScrubber = function (t) {
                            for (var e = [], r = 0; r < t.length; ++r) e.push(new RegExp(t[r], "i"));
                            return function (t) {
                                var r = function (t) {
                                    if (!t || !t.attributes) return null;
                                    for (var e = t.attributes, r = 0; r < e.length; ++r)
                                        if ("name" === e[r].key) return e[r].value;
                                    return null
                                }(t);
                                if (!r) return !1;
                                for (var n = 0; n < e.length; ++n)
                                    if (e[n].test(r)) return !0;
                                return !1
                            }
                        }(t.scrubFields), this.telemeter = e, this.rollbar = r, this.diagnostic = r.client.notifier.diagnostic, this._window = i || {}, this._document = o || {}, this.replacements = {
                            network: [],
                            log: [],
                            navigation: [],
                            connectivity: []
                        }, this.eventRemovers = {
                            dom: [],
                            connectivity: [],
                            contentsecuritypolicy: []
                        }, this._location = this._window.location, this._lastHref = this._location && this._location.href
                    }
                    l.prototype.configure = function (t) {
                        this.options = n.merge(this.options, t);
                        var e = t.autoInstrument,
                            r = n.merge(this.autoInstrument);
                        !1 === t.enabled || !1 === e ? this.autoInstrument = {} : (n.isType(e, "object") || (e = s), this.autoInstrument = n.merge(s, e)), this.instrument(r), void 0 !== t.scrubTelemetryInputs && (this.scrubTelemetryInputs = !!t.scrubTelemetryInputs), void 0 !== t.telemetryScrubber && (this.telemetryScrubber = t.telemetryScrubber)
                    }, l.prototype.instrument = function (t) {
                        !this.autoInstrument.network || t && t.network ? !this.autoInstrument.network && t && t.network && this.deinstrumentNetwork() : this.instrumentNetwork(), !this.autoInstrument.log || t && t.log ? !this.autoInstrument.log && t && t.log && this.deinstrumentConsole() : this.instrumentConsole(), !this.autoInstrument.dom || t && t.dom ? !this.autoInstrument.dom && t && t.dom && this.deinstrumentDom() : this.instrumentDom(), !this.autoInstrument.navigation || t && t.navigation ? !this.autoInstrument.navigation && t && t.navigation && this.deinstrumentNavigation() : this.instrumentNavigation(), !this.autoInstrument.connectivity || t && t.connectivity ? !this.autoInstrument.connectivity && t && t.connectivity && this.deinstrumentConnectivity() : this.instrumentConnectivity(), !this.autoInstrument.contentSecurityPolicy || t && t.contentSecurityPolicy ? !this.autoInstrument.contentSecurityPolicy && t && t.contentSecurityPolicy && this.deinstrumentContentSecurityPolicy() : this.instrumentContentSecurityPolicy()
                    }, l.prototype.deinstrumentNetwork = function () {
                        u(this.replacements, "network")
                    }, l.prototype.instrumentNetwork = function () {
                        var t = this;

                        function e(e, r) {
                            e in r && n.isFunction(r[e]) && c(r, e, (function (e) {
                                return t.rollbar.wrap(e)
                            }))
                        }
                        if ("XMLHttpRequest" in this._window) {
                            var r = this._window.XMLHttpRequest.prototype;
                            c(r, "open", (function (t) {
                                return function (e, r) {
                                    return n.isType(r, "string") && (this.__rollbar_xhr ? (this.__rollbar_xhr.method = e, this.__rollbar_xhr.url = r, this.__rollbar_xhr.status_code = null, this.__rollbar_xhr.start_time_ms = n.now(), this.__rollbar_xhr.end_time_ms = null) : this.__rollbar_xhr = {
                                        method: e,
                                        url: r,
                                        status_code: null,
                                        start_time_ms: n.now(),
                                        end_time_ms: null
                                    }), t.apply(this, arguments)
                                }
                            }), this.replacements, "network"), c(r, "setRequestHeader", (function (e) {
                                return function (r, i) {
                                    return this.__rollbar_xhr || (this.__rollbar_xhr = {}), n.isType(r, "string") && n.isType(i, "string") && (t.autoInstrument.networkRequestHeaders && (this.__rollbar_xhr.request_headers || (this.__rollbar_xhr.request_headers = {}), this.__rollbar_xhr.request_headers[r] = i), "content-type" === r.toLowerCase() && (this.__rollbar_xhr.request_content_type = i)), e.apply(this, arguments)
                                }
                            }), this.replacements, "network"), c(r, "send", (function (r) {
                                return function (i) {
                                    var o = this;

                                    function a() {
                                        if (o.__rollbar_xhr && (null === o.__rollbar_xhr.status_code && (o.__rollbar_xhr.status_code = 0, t.autoInstrument.networkRequestBody && (o.__rollbar_xhr.request = i), o.__rollbar_event = t.captureNetwork(o.__rollbar_xhr, "xhr", void 0)), o.readyState < 2 && (o.__rollbar_xhr.start_time_ms = n.now()), o.readyState > 3)) {
                                            o.__rollbar_xhr.end_time_ms = n.now();
                                            var e = null;
                                            if (o.__rollbar_xhr.response_content_type = o.getResponseHeader("Content-Type"), t.autoInstrument.networkResponseHeaders) {
                                                var r = t.autoInstrument.networkResponseHeaders;
                                                e = {};
                                                try {
                                                    var a, s;
                                                    if (!0 === r) {
                                                        var c = o.getAllResponseHeaders();
                                                        if (c) {
                                                            var u, l, h = c.trim().split(/[\r\n]+/);
                                                            for (s = 0; s < h.length; s++) a = (u = h[s].split(": ")).shift(), l = u.join(": "), e[a] = l
                                                        }
                                                    } else
                                                        for (s = 0; s < r.length; s++) e[a = r[s]] = o.getResponseHeader(a)
                                                } catch (t) {}
                                            }
                                            var f = null;
                                            if (t.autoInstrument.networkResponseBody) try {
                                                f = o.responseText
                                            } catch (t) {}
                                            var p = null;
                                            (f || e) && (p = {}, f && (t.isJsonContentType(o.__rollbar_xhr.response_content_type) ? p.body = t.scrubJson(f) : p.body = f), e && (p.headers = e)), p && (o.__rollbar_xhr.response = p);
                                            try {
                                                var d = o.status;
                                                d = 1223 === d ? 204 : d, o.__rollbar_xhr.status_code = d, o.__rollbar_event.level = t.telemeter.levelFromStatus(d), t.errorOnHttpStatus(o.__rollbar_xhr)
                                            } catch (t) {}
                                        }
                                    }
                                    return e("onload", o), e("onerror", o), e("onprogress", o), "onreadystatechange" in o && n.isFunction(o.onreadystatechange) ? c(o, "onreadystatechange", (function (e) {
                                        return t.rollbar.wrap(e, void 0, a)
                                    })) : o.onreadystatechange = a, o.__rollbar_xhr && t.trackHttpErrors() && (o.__rollbar_xhr.stack = (new Error).stack), r.apply(this, arguments)
                                }
                            }), this.replacements, "network")
                        }
                        "fetch" in this._window && c(this._window, "fetch", (function (e) {
                            return function (r, i) {
                                for (var o = new Array(arguments.length), a = 0, s = o.length; a < s; a++) o[a] = arguments[a];
                                var c, u = o[0],
                                    l = "GET";
                                n.isType(u, "string") ? c = u : u && (c = u.url, u.method && (l = u.method)), o[1] && o[1].method && (l = o[1].method);
                                var h = {
                                    method: l,
                                    url: c,
                                    status_code: null,
                                    start_time_ms: n.now(),
                                    end_time_ms: null
                                };
                                if (o[1] && o[1].headers) {
                                    var f = new Headers(o[1].headers);
                                    h.request_content_type = f.get("Content-Type"), t.autoInstrument.networkRequestHeaders && (h.request_headers = t.fetchHeaders(f, t.autoInstrument.networkRequestHeaders))
                                }
                                return t.autoInstrument.networkRequestBody && (o[1] && o[1].body ? h.request = o[1].body : o[0] && !n.isType(o[0], "string") && o[0].body && (h.request = o[0].body)), t.captureNetwork(h, "fetch", void 0), t.trackHttpErrors() && (h.stack = (new Error).stack), e.apply(this, o).then((function (e) {
                                    h.end_time_ms = n.now(), h.status_code = e.status, h.response_content_type = e.headers.get("Content-Type");
                                    var r = null;
                                    t.autoInstrument.networkResponseHeaders && (r = t.fetchHeaders(e.headers, t.autoInstrument.networkResponseHeaders));
                                    var i = null;
                                    return t.autoInstrument.networkResponseBody && "function" == typeof e.text && (i = e.clone().text()), (r || i) && (h.response = {}, i && ("function" == typeof i.then ? i.then((function (e) {
                                        t.isJsonContentType(h.response_content_type) && (h.response.body = t.scrubJson(e))
                                    })) : h.response.body = i), r && (h.response.headers = r)), t.errorOnHttpStatus(h), e
                                }))
                            }
                        }), this.replacements, "network")
                    }, l.prototype.captureNetwork = function (t, e, r) {
                        return t.request && this.isJsonContentType(t.request_content_type) && (t.request = this.scrubJson(t.request)), this.telemeter.captureNetwork(t, e, r)
                    }, l.prototype.isJsonContentType = function (t) {
                        return !!(t && n.isType(t, "string") && t.toLowerCase().includes("json"))
                    }, l.prototype.scrubJson = function (t) {
                        return JSON.stringify(i(JSON.parse(t), this.options.scrubFields))
                    }, l.prototype.fetchHeaders = function (t, e) {
                        var r = {};
                        try {
                            var n;
                            if (!0 === e) {
                                if ("function" == typeof t.entries)
                                    for (var i = t.entries(), o = i.next(); !o.done;) r[o.value[0]] = o.value[1], o = i.next()
                            } else
                                for (n = 0; n < e.length; n++) {
                                    var a = e[n];
                                    r[a] = t.get(a)
                                }
                        } catch (t) {}
                        return r
                    }, l.prototype.trackHttpErrors = function () {
                        return this.autoInstrument.networkErrorOnHttp5xx || this.autoInstrument.networkErrorOnHttp4xx || this.autoInstrument.networkErrorOnHttp0
                    }, l.prototype.errorOnHttpStatus = function (t) {
                        var e = t.status_code;
                        if (e >= 500 && this.autoInstrument.networkErrorOnHttp5xx || e >= 400 && this.autoInstrument.networkErrorOnHttp4xx || 0 === e && this.autoInstrument.networkErrorOnHttp0) {
                            var r = new Error("HTTP request failed with Status " + e);
                            r.stack = t.stack, this.rollbar.error(r, {
                                skipFrames: 1
                            })
                        }
                    }, l.prototype.deinstrumentConsole = function () {
                        if ("console" in this._window && this._window.console.log)
                            for (var t; this.replacements.log.length;) t = this.replacements.log.shift(), this._window.console[t[0]] = t[1]
                    }, l.prototype.instrumentConsole = function () {
                        if ("console" in this._window && this._window.console.log) {
                            var t = this,
                                e = this._window.console,
                                r = ["debug", "info", "warn", "error", "log"];
                            try {
                                for (var i = 0, o = r.length; i < o; i++) a(r[i])
                            } catch (t) {
                                this.diagnostic.instrumentConsole = {
                                    error: t.message
                                }
                            }
                        }

                        function a(r) {
                            var i = e[r],
                                o = e,
                                a = "warn" === r ? "warning" : r;
                            e[r] = function () {
                                var e = Array.prototype.slice.call(arguments),
                                    r = n.formatArgsAsString(e);
                                t.telemeter.captureLog(r, a), i && Function.prototype.apply.call(i, o, e)
                            }, t.replacements.log.push([r, i])
                        }
                    }, l.prototype.deinstrumentDom = function () {
                        ("addEventListener" in this._window || "attachEvent" in this._window) && this.removeListeners("dom")
                    }, l.prototype.instrumentDom = function () {
                        if ("addEventListener" in this._window || "attachEvent" in this._window) {
                            var t = this.handleClick.bind(this),
                                e = this.handleBlur.bind(this);
                            this.addListener("dom", this._window, "click", "onclick", t, !0), this.addListener("dom", this._window, "blur", "onfocusout", e, !0)
                        }
                    }, l.prototype.handleClick = function (t) {
                        try {
                            var e = a.getElementFromEvent(t, this._document),
                                r = e && e.tagName,
                                n = a.isDescribedElement(e, "a") || a.isDescribedElement(e, "button");
                            r && (n || a.isDescribedElement(e, "input", ["button", "submit"])) ? this.captureDomEvent("click", e) : a.isDescribedElement(e, "input", ["checkbox", "radio"]) && this.captureDomEvent("input", e, e.value, e.checked)
                        } catch (t) {}
                    }, l.prototype.handleBlur = function (t) {
                        try {
                            var e = a.getElementFromEvent(t, this._document);
                            e && e.tagName && (a.isDescribedElement(e, "textarea") ? this.captureDomEvent("input", e, e.value) : a.isDescribedElement(e, "select") && e.options && e.options.length ? this.handleSelectInputChanged(e) : a.isDescribedElement(e, "input") && !a.isDescribedElement(e, "input", ["button", "submit", "hidden", "checkbox", "radio"]) && this.captureDomEvent("input", e, e.value))
                        } catch (t) {}
                    }, l.prototype.handleSelectInputChanged = function (t) {
                        if (t.multiple)
                            for (var e = 0; e < t.options.length; e++) t.options[e].selected && this.captureDomEvent("input", t, t.options[e].value);
                        else t.selectedIndex >= 0 && t.options[t.selectedIndex] && this.captureDomEvent("input", t, t.options[t.selectedIndex].value)
                    }, l.prototype.captureDomEvent = function (t, e, r, n) {
                        if (void 0 !== r)
                            if (this.scrubTelemetryInputs || "password" === a.getElementType(e)) r = "[scrubbed]";
                            else {
                                var i = a.describeElement(e);
                                this.telemetryScrubber ? this.telemetryScrubber(i) && (r = "[scrubbed]") : this.defaultValueScrubber(i) && (r = "[scrubbed]")
                            } var o = a.elementArrayToString(a.treeToArray(e));
                        this.telemeter.captureDom(t, o, r, n)
                    }, l.prototype.deinstrumentNavigation = function () {
                        var t = this._window.chrome;
                        !(t && t.app && t.app.runtime) && this._window.history && this._window.history.pushState && u(this.replacements, "navigation")
                    }, l.prototype.instrumentNavigation = function () {
                        var t = this._window.chrome;
                        if (!(t && t.app && t.app.runtime) && this._window.history && this._window.history.pushState) {
                            var e = this;
                            c(this._window, "onpopstate", (function (t) {
                                return function () {
                                    var r = e._location.href;
                                    e.handleUrlChange(e._lastHref, r), t && t.apply(this, arguments)
                                }
                            }), this.replacements, "navigation"), c(this._window.history, "pushState", (function (t) {
                                return function () {
                                    var r = arguments.length > 2 ? arguments[2] : void 0;
                                    return r && e.handleUrlChange(e._lastHref, r + ""), t.apply(this, arguments)
                                }
                            }), this.replacements, "navigation")
                        }
                    }, l.prototype.handleUrlChange = function (t, e) {
                        var r = o.parse(this._location.href),
                            n = o.parse(e),
                            i = o.parse(t);
                        this._lastHref = e, r.protocol === n.protocol && r.host === n.host && (e = n.path + (n.hash || "")), r.protocol === i.protocol && r.host === i.host && (t = i.path + (i.hash || "")), this.telemeter.captureNavigation(t, e)
                    }, l.prototype.deinstrumentConnectivity = function () {
                        ("addEventListener" in this._window || "body" in this._document) && (this._window.addEventListener ? this.removeListeners("connectivity") : u(this.replacements, "connectivity"))
                    }, l.prototype.instrumentConnectivity = function () {
                        if ("addEventListener" in this._window || "body" in this._document)
                            if (this._window.addEventListener) this.addListener("connectivity", this._window, "online", void 0, function () {
                                this.telemeter.captureConnectivityChange("online")
                            }.bind(this), !0), this.addListener("connectivity", this._window, "offline", void 0, function () {
                                this.telemeter.captureConnectivityChange("offline")
                            }.bind(this), !0);
                            else {
                                var t = this;
                                c(this._document.body, "ononline", (function (e) {
                                    return function () {
                                        t.telemeter.captureConnectivityChange("online"), e && e.apply(this, arguments)
                                    }
                                }), this.replacements, "connectivity"), c(this._document.body, "onoffline", (function (e) {
                                    return function () {
                                        t.telemeter.captureConnectivityChange("offline"), e && e.apply(this, arguments)
                                    }
                                }), this.replacements, "connectivity")
                            }
                    }, l.prototype.handleCspEvent = function (t) {
                        var e = "Security Policy Violation: blockedURI: " + t.blockedURI + ", violatedDirective: " + t.violatedDirective + ", effectiveDirective: " + t.effectiveDirective + ", ";
                        t.sourceFile && (e += "location: " + t.sourceFile + ", line: " + t.lineNumber + ", col: " + t.columnNumber + ", "), e += "originalPolicy: " + t.originalPolicy, this.telemeter.captureLog(e, "error"), this.handleCspError(e)
                    }, l.prototype.handleCspError = function (t) {
                        this.autoInstrument.errorOnContentSecurityPolicy && this.rollbar.error(t)
                    }, l.prototype.deinstrumentContentSecurityPolicy = function () {
                        "addEventListener" in this._window && this.removeListeners("contentsecuritypolicy")
                    }, l.prototype.instrumentContentSecurityPolicy = function () {
                        if ("addEventListener" in this._window) {
                            var t = this.handleCspEvent.bind(this);
                            this.addListener("contentsecuritypolicy", this._window, "securitypolicyviolation", null, t, !1)
                        }
                    }, l.prototype.addListener = function (t, e, r, n, i, o) {
                        e.addEventListener ? (e.addEventListener(r, i, o), this.eventRemovers[t].push((function () {
                            e.removeEventListener(r, i, o)
                        }))) : n && (e.attachEvent(n, i), this.eventRemovers[t].push((function () {
                            e.detachEvent(n, i)
                        })))
                    }, l.prototype.removeListeners = function (t) {
                        for (; this.eventRemovers[t].length;) this.eventRemovers[t].shift()()
                    }, t.exports = l
                }, function (t, e, r) {
                    "use strict";

                    function n(t) {
                        return (t.getAttribute("type") || "").toLowerCase()
                    }

                    function i(t) {
                        if (!t || !t.tagName) return "";
                        var e = [t.tagName];
                        t.id && e.push("#" + t.id), t.classes && e.push("." + t.classes.join("."));
                        for (var r = 0; r < t.attributes.length; r++) e.push("[" + t.attributes[r].key + '="' + t.attributes[r].value + '"]');
                        return e.join("")
                    }

                    function o(t) {
                        if (!t || !t.tagName) return null;
                        var e, r, n, i, o = {};
                        o.tagName = t.tagName.toLowerCase(), t.id && (o.id = t.id), (e = t.className) && "string" == typeof e && (o.classes = e.split(/\s+/));
                        var a = ["type", "name", "title", "alt"];
                        for (o.attributes = [], i = 0; i < a.length; i++) r = a[i], (n = t.getAttribute(r)) && o.attributes.push({
                            key: r,
                            value: n
                        });
                        return o
                    }
                    t.exports = {
                        describeElement: o,
                        descriptionToString: i,
                        elementArrayToString: function (t) {
                            for (var e, r, n = " > ".length, o = [], a = 0, s = t.length - 1; s >= 0; s--) {
                                if (e = i(t[s]), r = a + o.length * n + e.length, s < t.length - 1 && r >= 83) {
                                    o.unshift("...");
                                    break
                                }
                                o.unshift(e), a += e.length
                            }
                            return o.join(" > ")
                        },
                        treeToArray: function (t) {
                            for (var e, r = [], n = 0; t && n < 5 && "html" !== (e = o(t)).tagName; n++) r.unshift(e), t = t.parentNode;
                            return r
                        },
                        getElementFromEvent: function (t, e) {
                            return t.target ? t.target : e && e.elementFromPoint ? e.elementFromPoint(t.clientX, t.clientY) : void 0
                        },
                        isDescribedElement: function (t, e, r) {
                            if (t.tagName.toLowerCase() !== e.toLowerCase()) return !1;
                            if (!r) return !0;
                            t = n(t);
                            for (var i = 0; i < r.length; i++)
                                if (r[i] === t) return !0;
                            return !1
                        },
                        getElementType: n
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(33);
                    t.exports = n
                }, function (t, e) {
                    t.exports = function (t) {
                        var e, r, n, i, o, a, s, c, u, l, h, f, p, d = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

                        function m(t) {
                            return t < 10 ? "0" + t : t
                        }

                        function v() {
                            return this.valueOf()
                        }

                        function g(t) {
                            return d.lastIndex = 0, d.test(t) ? '"' + t.replace(d, (function (t) {
                                var e = n[t];
                                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                            })) + '"' : '"' + t + '"'
                        }
                        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + m(this.getUTCMonth() + 1) + "-" + m(this.getUTCDate()) + "T" + m(this.getUTCHours()) + ":" + m(this.getUTCMinutes()) + ":" + m(this.getUTCSeconds()) + "Z" : null
                        }, Boolean.prototype.toJSON = v, Number.prototype.toJSON = v, String.prototype.toJSON = v), "function" != typeof t.stringify && (n = {
                            "\b": "\\b",
                            "\t": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        }, t.stringify = function (t, n, o) {
                            var a;
                            if (e = "", r = "", "number" == typeof o)
                                for (a = 0; a < o; a += 1) r += " ";
                            else "string" == typeof o && (r = o);
                            if (i = n, n && "function" != typeof n && ("object" != typeof n || "number" != typeof n.length)) throw new Error("JSON.stringify");
                            return function t(n, o) {
                                var a, s, c, u, l, h = e,
                                    f = o[n];
                                switch (f && "object" == typeof f && "function" == typeof f.toJSON && (f = f.toJSON(n)), "function" == typeof i && (f = i.call(o, n, f)), typeof f) {
                                    case "string":
                                        return g(f);
                                    case "number":
                                        return isFinite(f) ? String(f) : "null";
                                    case "boolean":
                                    case "null":
                                        return String(f);
                                    case "object":
                                        if (!f) return "null";
                                        if (e += r, l = [], "[object Array]" === Object.prototype.toString.apply(f)) {
                                            for (u = f.length, a = 0; a < u; a += 1) l[a] = t(a, f) || "null";
                                            return c = 0 === l.length ? "[]" : e ? "[\n" + e + l.join(",\n" + e) + "\n" + h + "]" : "[" + l.join(",") + "]", e = h, c
                                        }
                                        if (i && "object" == typeof i)
                                            for (u = i.length, a = 0; a < u; a += 1) "string" == typeof i[a] && (c = t(s = i[a], f)) && l.push(g(s) + (e ? ": " : ":") + c);
                                        else
                                            for (s in f) Object.prototype.hasOwnProperty.call(f, s) && (c = t(s, f)) && l.push(g(s) + (e ? ": " : ":") + c);
                                        return c = 0 === l.length ? "{}" : e ? "{\n" + e + l.join(",\n" + e) + "\n" + h + "}" : "{" + l.join(",") + "}", e = h, c
                                }
                            }("", {
                                "": t
                            })
                        }), "function" != typeof t.parse && (t.parse = (l = {
                            "\\": "\\",
                            '"': '"',
                            "/": "/",
                            t: "\t",
                            n: "\n",
                            r: "\r",
                            f: "\f",
                            b: "\b"
                        }, h = {
                            go: function () {
                                o = "ok"
                            },
                            firstokey: function () {
                                c = u, o = "colon"
                            },
                            okey: function () {
                                c = u, o = "colon"
                            },
                            ovalue: function () {
                                o = "ocomma"
                            },
                            firstavalue: function () {
                                o = "acomma"
                            },
                            avalue: function () {
                                o = "acomma"
                            }
                        }, f = {
                            go: function () {
                                o = "ok"
                            },
                            ovalue: function () {
                                o = "ocomma"
                            },
                            firstavalue: function () {
                                o = "acomma"
                            },
                            avalue: function () {
                                o = "acomma"
                            }
                        }, p = {
                            "{": {
                                go: function () {
                                    a.push({
                                        state: "ok"
                                    }), s = {}, o = "firstokey"
                                },
                                ovalue: function () {
                                    a.push({
                                        container: s,
                                        state: "ocomma",
                                        key: c
                                    }), s = {}, o = "firstokey"
                                },
                                firstavalue: function () {
                                    a.push({
                                        container: s,
                                        state: "acomma"
                                    }), s = {}, o = "firstokey"
                                },
                                avalue: function () {
                                    a.push({
                                        container: s,
                                        state: "acomma"
                                    }), s = {}, o = "firstokey"
                                }
                            },
                            "}": {
                                firstokey: function () {
                                    var t = a.pop();
                                    u = s, s = t.container, c = t.key, o = t.state
                                },
                                ocomma: function () {
                                    var t = a.pop();
                                    s[c] = u, u = s, s = t.container, c = t.key, o = t.state
                                }
                            },
                            "[": {
                                go: function () {
                                    a.push({
                                        state: "ok"
                                    }), s = [], o = "firstavalue"
                                },
                                ovalue: function () {
                                    a.push({
                                        container: s,
                                        state: "ocomma",
                                        key: c
                                    }), s = [], o = "firstavalue"
                                },
                                firstavalue: function () {
                                    a.push({
                                        container: s,
                                        state: "acomma"
                                    }), s = [], o = "firstavalue"
                                },
                                avalue: function () {
                                    a.push({
                                        container: s,
                                        state: "acomma"
                                    }), s = [], o = "firstavalue"
                                }
                            },
                            "]": {
                                firstavalue: function () {
                                    var t = a.pop();
                                    u = s, s = t.container, c = t.key, o = t.state
                                },
                                acomma: function () {
                                    var t = a.pop();
                                    s.push(u), u = s, s = t.container, c = t.key, o = t.state
                                }
                            },
                            ":": {
                                colon: function () {
                                    if (Object.hasOwnProperty.call(s, c)) throw new SyntaxError("Duplicate key '" + c + '"');
                                    o = "ovalue"
                                }
                            },
                            ",": {
                                ocomma: function () {
                                    s[c] = u, o = "okey"
                                },
                                acomma: function () {
                                    s.push(u), o = "avalue"
                                }
                            },
                            true: {
                                go: function () {
                                    u = !0, o = "ok"
                                },
                                ovalue: function () {
                                    u = !0, o = "ocomma"
                                },
                                firstavalue: function () {
                                    u = !0, o = "acomma"
                                },
                                avalue: function () {
                                    u = !0, o = "acomma"
                                }
                            },
                            false: {
                                go: function () {
                                    u = !1, o = "ok"
                                },
                                ovalue: function () {
                                    u = !1, o = "ocomma"
                                },
                                firstavalue: function () {
                                    u = !1, o = "acomma"
                                },
                                avalue: function () {
                                    u = !1, o = "acomma"
                                }
                            },
                            null: {
                                go: function () {
                                    u = null, o = "ok"
                                },
                                ovalue: function () {
                                    u = null, o = "ocomma"
                                },
                                firstavalue: function () {
                                    u = null, o = "acomma"
                                },
                                avalue: function () {
                                    u = null, o = "acomma"
                                }
                            }
                        }, function (t, e) {
                            var r, n, i = /^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;
                            o = "go", a = [];
                            try {
                                for (; r = i.exec(t);) r[1] ? p[r[1]][o]() : r[2] ? (u = +r[2], f[o]()) : (n = r[3], u = n.replace(/\\(?:u(.{4})|([^u]))/g, (function (t, e, r) {
                                    return e ? String.fromCharCode(parseInt(e, 16)) : l[r]
                                })), h[o]()), t = t.slice(r[0].length)
                            } catch (t) {
                                o = t
                            }
                            if ("ok" !== o || /[^\u0020\t\n\r]/.test(t)) throw o instanceof SyntaxError ? o : new SyntaxError("JSON");
                            return "function" == typeof e ? function t(r, n) {
                                var i, o, a = r[n];
                                if (a && "object" == typeof a)
                                    for (i in u) Object.prototype.hasOwnProperty.call(a, i) && (void 0 !== (o = t(a, i)) ? a[i] = o : delete a[i]);
                                return e.call(r, n, a)
                            }({
                                "": u
                            }, "") : u
                        }))
                    }
                }, function (t, e, r) {
                    "use strict";

                    function n(t, e, r) {
                        if (e.hasOwnProperty && e.hasOwnProperty("addEventListener")) {
                            for (var n = e.addEventListener; n._rollbarOldAdd && n.belongsToShim;) n = n._rollbarOldAdd;
                            var i = function (e, r, i) {
                                n.call(this, e, t.wrap(r), i)
                            };
                            i._rollbarOldAdd = n, i.belongsToShim = r, e.addEventListener = i;
                            for (var o = e.removeEventListener; o._rollbarOldRemove && o.belongsToShim;) o = o._rollbarOldRemove;
                            var a = function (t, e, r) {
                                o.call(this, t, e && e._rollbar_wrapped || e, r)
                            };
                            a._rollbarOldRemove = o, a.belongsToShim = r, e.removeEventListener = a
                        }
                    }
                    t.exports = function (t, e, r) {
                        if (t) {
                            var i, o, a = "EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");
                            for (i = 0; i < a.length; ++i) t[o = a[i]] && t[o].prototype && n(e, t[o].prototype, r)
                        }
                    }
                }, function (t, e, r) {
                    "use strict";
                    var n = r(0),
                        i = r(5);

                    function o(t, e) {
                        return [t, n.stringify(t, e)]
                    }

                    function a(t, e) {
                        var r = t.length;
                        return r > 2 * e ? t.slice(0, e).concat(t.slice(r - e)) : t
                    }

                    function s(t, e, r) {
                        r = void 0 === r ? 30 : r;
                        var i, o = t.data.body;
                        if (o.trace_chain)
                            for (var s = o.trace_chain, c = 0; c < s.length; c++) i = a(i = s[c].frames, r), s[c].frames = i;
                        else o.trace && (i = a(i = o.trace.frames, r), o.trace.frames = i);
                        return [t, n.stringify(t, e)]
                    }

                    function c(t, e) {
                        return e && e.length > t ? e.slice(0, t - 3).concat("...") : e
                    }

                    function u(t, e, r) {
                        return [e = i(e, (function e(r, o, a) {
                            switch (n.typeName(o)) {
                                case "string":
                                    return c(t, o);
                                case "object":
                                case "array":
                                    return i(o, e, a);
                                default:
                                    return o
                            }
                        })), n.stringify(e, r)]
                    }

                    function l(t) {
                        return t.exception && (delete t.exception.description, t.exception.message = c(255, t.exception.message)), t.frames = a(t.frames, 1), t
                    }

                    function h(t, e) {
                        var r = t.data.body;
                        if (r.trace_chain)
                            for (var i = r.trace_chain, o = 0; o < i.length; o++) i[o] = l(i[o]);
                        else r.trace && (r.trace = l(r.trace));
                        return [t, n.stringify(t, e)]
                    }

                    function f(t, e) {
                        return n.maxByteSize(t) > e
                    }
                    t.exports = {
                        truncate: function (t, e, r) {
                            r = void 0 === r ? 524288 : r;
                            for (var n, i, a, c = [o, s, u.bind(null, 1024), u.bind(null, 512), u.bind(null, 256), h]; n = c.shift();)
                                if (t = (i = n(t, e))[0], (a = i[1]).error || !f(a.value, r)) return a;
                            return a
                        },
                        raw: o,
                        truncateFrames: s,
                        truncateStrings: u,
                        maybeTruncateValue: c
                    }
                }])
            },
            6565: function (t, e) {
                var r, n;
                "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, void 0 === (n = "function" == typeof (r = function (t) {
                    "use strict";
                    if ("undefined" == typeof browser || Object.getPrototypeOf(browser) !== Object.prototype) {
                        const e = "The message port closed before a response was received.",
                            r = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",
                            n = t => {
                                const n = {
                                    alarms: {
                                        clear: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        clearAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        get: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        getAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    bookmarks: {
                                        create: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        get: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getChildren: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getRecent: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getSubTree: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getTree: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        move: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        },
                                        remove: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeTree: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        search: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        update: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        }
                                    },
                                    browserAction: {
                                        disable: {
                                            minArgs: 0,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        enable: {
                                            minArgs: 0,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        getBadgeBackgroundColor: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getBadgeText: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getPopup: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getTitle: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        openPopup: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        setBadgeBackgroundColor: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        setBadgeText: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        setIcon: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        setPopup: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        setTitle: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        }
                                    },
                                    browsingData: {
                                        remove: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        },
                                        removeCache: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeCookies: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeDownloads: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeFormData: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeHistory: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeLocalStorage: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removePasswords: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removePluginData: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        settings: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    commands: {
                                        getAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    contextMenus: {
                                        remove: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        update: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        }
                                    },
                                    cookies: {
                                        get: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getAll: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getAllCookieStores: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        remove: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        set: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    devtools: {
                                        inspectedWindow: {
                                            eval: {
                                                minArgs: 1,
                                                maxArgs: 2,
                                                singleCallbackArg: !1
                                            }
                                        },
                                        panels: {
                                            create: {
                                                minArgs: 3,
                                                maxArgs: 3,
                                                singleCallbackArg: !0
                                            },
                                            elements: {
                                                createSidebarPane: {
                                                    minArgs: 1,
                                                    maxArgs: 1
                                                }
                                            }
                                        }
                                    },
                                    downloads: {
                                        cancel: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        download: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        erase: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getFileIcon: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        open: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        pause: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeFile: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        resume: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        search: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        show: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        }
                                    },
                                    extension: {
                                        isAllowedFileSchemeAccess: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        isAllowedIncognitoAccess: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    history: {
                                        addUrl: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        deleteAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        deleteRange: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        deleteUrl: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getVisits: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        search: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    i18n: {
                                        detectLanguage: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getAcceptLanguages: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    identity: {
                                        launchWebAuthFlow: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    idle: {
                                        queryState: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    management: {
                                        get: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        getSelf: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        setEnabled: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        },
                                        uninstallSelf: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        }
                                    },
                                    notifications: {
                                        clear: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        create: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        getAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        getPermissionLevel: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        update: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        }
                                    },
                                    pageAction: {
                                        getPopup: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getTitle: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        hide: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        setIcon: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        setPopup: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        setTitle: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        },
                                        show: {
                                            minArgs: 1,
                                            maxArgs: 1,
                                            fallbackToNoCallback: !0
                                        }
                                    },
                                    permissions: {
                                        contains: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getAll: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        remove: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        request: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    runtime: {
                                        getBackgroundPage: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        getPlatformInfo: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        openOptionsPage: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        requestUpdateCheck: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        sendMessage: {
                                            minArgs: 1,
                                            maxArgs: 3
                                        },
                                        sendNativeMessage: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        },
                                        setUninstallURL: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    sessions: {
                                        getDevices: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        getRecentlyClosed: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        restore: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        }
                                    },
                                    storage: {
                                        local: {
                                            clear: {
                                                minArgs: 0,
                                                maxArgs: 0
                                            },
                                            get: {
                                                minArgs: 0,
                                                maxArgs: 1
                                            },
                                            getBytesInUse: {
                                                minArgs: 0,
                                                maxArgs: 1
                                            },
                                            remove: {
                                                minArgs: 1,
                                                maxArgs: 1
                                            },
                                            set: {
                                                minArgs: 1,
                                                maxArgs: 1
                                            }
                                        },
                                        managed: {
                                            get: {
                                                minArgs: 0,
                                                maxArgs: 1
                                            },
                                            getBytesInUse: {
                                                minArgs: 0,
                                                maxArgs: 1
                                            }
                                        },
                                        sync: {
                                            clear: {
                                                minArgs: 0,
                                                maxArgs: 0
                                            },
                                            get: {
                                                minArgs: 0,
                                                maxArgs: 1
                                            },
                                            getBytesInUse: {
                                                minArgs: 0,
                                                maxArgs: 1
                                            },
                                            remove: {
                                                minArgs: 1,
                                                maxArgs: 1
                                            },
                                            set: {
                                                minArgs: 1,
                                                maxArgs: 1
                                            }
                                        }
                                    },
                                    tabs: {
                                        captureVisibleTab: {
                                            minArgs: 0,
                                            maxArgs: 2
                                        },
                                        create: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        detectLanguage: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        discard: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        duplicate: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        executeScript: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        get: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getCurrent: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        },
                                        getZoom: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        getZoomSettings: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        goBack: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        goForward: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        highlight: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        insertCSS: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        move: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        },
                                        query: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        reload: {
                                            minArgs: 0,
                                            maxArgs: 2
                                        },
                                        remove: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        removeCSS: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        sendMessage: {
                                            minArgs: 2,
                                            maxArgs: 3
                                        },
                                        setZoom: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        setZoomSettings: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        update: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        }
                                    },
                                    topSites: {
                                        get: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    webNavigation: {
                                        getAllFrames: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        getFrame: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    },
                                    webRequest: {
                                        handlerBehaviorChanged: {
                                            minArgs: 0,
                                            maxArgs: 0
                                        }
                                    },
                                    windows: {
                                        create: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        get: {
                                            minArgs: 1,
                                            maxArgs: 2
                                        },
                                        getAll: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        getCurrent: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        getLastFocused: {
                                            minArgs: 0,
                                            maxArgs: 1
                                        },
                                        remove: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        update: {
                                            minArgs: 2,
                                            maxArgs: 2
                                        }
                                    }
                                };
                                if (0 === Object.keys(n).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                                class i extends WeakMap {
                                    constructor(t, e) {
                                        super(e), this.createItem = t
                                    }
                                    get(t) {
                                        return this.has(t) || this.set(t, this.createItem(t)), super.get(t)
                                    }
                                }
                                const o = (e, r) => (...n) => {
                                        t.runtime.lastError ? e.reject(new Error(t.runtime.lastError.message)) : r.singleCallbackArg || n.length <= 1 && !1 !== r.singleCallbackArg ? e.resolve(n[0]) : e.resolve(n)
                                    },
                                    a = t => 1 == t ? "argument" : "arguments",
                                    s = (t, e, r) => new Proxy(e, {
                                        apply: (e, n, i) => r.call(n, t, ...i)
                                    });
                                let c = Function.call.bind(Object.prototype.hasOwnProperty);
                                const u = (t, e = {}, r = {}) => {
                                        let n = Object.create(null),
                                            i = {
                                                has: (e, r) => r in t || r in n,
                                                get(i, l, h) {
                                                    if (l in n) return n[l];
                                                    if (!(l in t)) return;
                                                    let f = t[l];
                                                    if ("function" == typeof f)
                                                        if ("function" == typeof e[l]) f = s(t, t[l], e[l]);
                                                        else if (c(r, l)) {
                                                        let e = ((t, e) => function (r, ...n) {
                                                            if (n.length < e.minArgs) throw new Error(`Expected at least ${e.minArgs} ${a(e.minArgs)} for ${t}(), got ${n.length}`);
                                                            if (n.length > e.maxArgs) throw new Error(`Expected at most ${e.maxArgs} ${a(e.maxArgs)} for ${t}(), got ${n.length}`);
                                                            return new Promise(((i, a) => {
                                                                if (e.fallbackToNoCallback) try {
                                                                    r[t](...n, o({
                                                                        resolve: i,
                                                                        reject: a
                                                                    }, e))
                                                                } catch (o) {
                                                                    console.warn(`${t} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, o), r[t](...n), e.fallbackToNoCallback = !1, e.noCallback = !0, i()
                                                                } else e.noCallback ? (r[t](...n), i()) : r[t](...n, o({
                                                                    resolve: i,
                                                                    reject: a
                                                                }, e))
                                                            }))
                                                        })(l, r[l]);
                                                        f = s(t, t[l], e)
                                                    } else f = f.bind(t);
                                                    else if ("object" == typeof f && null !== f && (c(e, l) || c(r, l))) f = u(f, e[l], r[l]);
                                                    else {
                                                        if (!c(r, "*")) return Object.defineProperty(n, l, {
                                                            configurable: !0,
                                                            enumerable: !0,
                                                            get: () => t[l],
                                                            set(e) {
                                                                t[l] = e
                                                            }
                                                        }), f;
                                                        f = u(f, e[l], r["*"])
                                                    }
                                                    return n[l] = f, f
                                                },
                                                set: (e, r, i, o) => (r in n ? n[r] = i : t[r] = i, !0),
                                                defineProperty: (t, e, r) => Reflect.defineProperty(n, e, r),
                                                deleteProperty: (t, e) => Reflect.deleteProperty(n, e)
                                            },
                                            l = Object.create(t);
                                        return new Proxy(l, i)
                                    },
                                    l = t => ({
                                        addListener(e, r, ...n) {
                                            e.addListener(t.get(r), ...n)
                                        },
                                        hasListener: (e, r) => e.hasListener(t.get(r)),
                                        removeListener(e, r) {
                                            e.removeListener(t.get(r))
                                        }
                                    }),
                                    h = new i((t => "function" != typeof t ? t : function (e) {
                                        const r = u(e, {}, {
                                            getContent: {
                                                minArgs: 0,
                                                maxArgs: 0
                                            }
                                        });
                                        t(r)
                                    }));
                                let f = !1;
                                const p = new i((t => "function" != typeof t ? t : function (e, n, i) {
                                        let o, a, s = !1,
                                            c = new Promise((t => {
                                                o = function (e) {
                                                    f || (console.warn(r, (new Error).stack), f = !0), s = !0, t(e)
                                                }
                                            }));
                                        try {
                                            a = t(e, n, o)
                                        } catch (t) {
                                            a = Promise.reject(t)
                                        }
                                        const u = !0 !== a && ((l = a) && "object" == typeof l && "function" == typeof l.then);
                                        var l;
                                        if (!0 !== a && !u && !s) return !1;
                                        return (u ? a : c).then((t => {
                                            i(t)
                                        }), (t => {
                                            let e;
                                            e = t && (t instanceof Error || "string" == typeof t.message) ? t.message : "An unexpected error occurred", i({
                                                __mozWebExtensionPolyfillReject__: !0,
                                                message: e
                                            })
                                        })).catch((t => {
                                            console.error("Failed to send onMessage rejected reply", t)
                                        })), !0
                                    })),
                                    d = ({
                                        reject: r,
                                        resolve: n
                                    }, i) => {
                                        t.runtime.lastError ? t.runtime.lastError.message === e ? n() : r(new Error(t.runtime.lastError.message)) : i && i.__mozWebExtensionPolyfillReject__ ? r(new Error(i.message)) : n(i)
                                    },
                                    m = (t, e, r, ...n) => {
                                        if (n.length < e.minArgs) throw new Error(`Expected at least ${e.minArgs} ${a(e.minArgs)} for ${t}(), got ${n.length}`);
                                        if (n.length > e.maxArgs) throw new Error(`Expected at most ${e.maxArgs} ${a(e.maxArgs)} for ${t}(), got ${n.length}`);
                                        return new Promise(((t, e) => {
                                            const i = d.bind(null, {
                                                resolve: t,
                                                reject: e
                                            });
                                            n.push(i), r.sendMessage(...n)
                                        }))
                                    },
                                    v = {
                                        devtools: {
                                            network: {
                                                onRequestFinished: l(h)
                                            }
                                        },
                                        runtime: {
                                            onMessage: l(p),
                                            onMessageExternal: l(p),
                                            sendMessage: m.bind(null, "sendMessage", {
                                                minArgs: 1,
                                                maxArgs: 3
                                            })
                                        },
                                        tabs: {
                                            sendMessage: m.bind(null, "sendMessage", {
                                                minArgs: 2,
                                                maxArgs: 3
                                            })
                                        }
                                    },
                                    g = {
                                        clear: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        get: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        },
                                        set: {
                                            minArgs: 1,
                                            maxArgs: 1
                                        }
                                    };
                                return n.privacy = {
                                    network: {
                                        "*": g
                                    },
                                    services: {
                                        "*": g
                                    },
                                    websites: {
                                        "*": g
                                    }
                                }, u(t, v, n)
                            };
                        if ("object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
                        t.exports = n(chrome)
                    } else t.exports = browser
                }) ? r.apply(e, [t]) : r) || (t.exports = n)
            }
        },
        e = {};

    function r(n) {
        var i = e[n];
        if (void 0 !== i) return i.exports;
        var o = e[n] = {
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, r), o.exports
    }
    r.n = t => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return r.d(e, {
            a: e
        }), e
    }, r.d = (t, e) => {
        for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
            enumerable: !0,
            get: e[n]
        })
    }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), (() => {
        "use strict";

        function t(t, e, r, n, i, o, a) {
            try {
                var s = t[o](a),
                    c = s.value
            } catch (t) {
                return void r(t)
            }
            s.done ? e(c) : Promise.resolve(c).then(n, i)
        }

        function e(e) {
            return function () {
                var r = this,
                    n = arguments;
                return new Promise((function (i, o) {
                    var a = e.apply(r, n);

                    function s(e) {
                        t(a, i, o, s, c, "next", e)
                    }

                    function c(e) {
                        t(a, i, o, s, c, "throw", e)
                    }
                    s(void 0)
                }))
            }
        }

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }

        function o(t, e, r) {
            return e && i(t.prototype, e), r && i(t, r), t
        }

        function a(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function s(t) {
            return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function c(t, e, r) {
            return (c = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, r) {
                var n = function (t, e) {
                    for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = s(t)););
                    return t
                }(t, e);
                if (n) {
                    var i = Object.getOwnPropertyDescriptor(n, e);
                    return i.get ? i.get.call(r) : i.value
                }
            })(t, e, r || t)
        }

        function u(t, e) {
            return (u = Object.setPrototypeOf || function (t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function l(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && u(t, e)
        }

        function h(t) {
            return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function f(t, e) {
            if (e && ("object" === h(e) || "function" == typeof e)) return e;
            if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
            return a(t)
        }

        function p(t, e, r) {
            return e in t ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = r, t
        }
        var d = r(7017),
            m = r.n(d);

        function v(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
            return n
        }

        function g(t, e) {
            if (t) {
                if ("string" == typeof t) return v(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? v(t, e) : void 0
            }
        }

        function y(t, e) {
            return function (t) {
                if (Array.isArray(t)) return t
            }(t) || function (t, e) {
                var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (null != r) {
                    var n, i, o = [],
                        a = !0,
                        s = !1;
                    try {
                        for (r = r.call(t); !(a = (n = r.next()).done) && (o.push(n.value), !e || o.length !== e); a = !0);
                    } catch (t) {
                        s = !0, i = t
                    } finally {
                        try {
                            a || null == r.return || r.return()
                        } finally {
                            if (s) throw i
                        }
                    }
                    return o
                }
            }(t, e) || g(t, e) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        var b = new Map,
            w = function (t) {
                var e = b.get(t);
                if (!e) throw new Error("Service not registered for ".concat(t));
                return e
            },
            x = function () {
                return Array.from(b.values())
            },
            k = function () {
                function t(e) {
                    var r;
                    n(this, t), p(this, "id", void 0), p(this, "name", void 0), p(this, "homePage", void 0), p(this, "hostPatterns", void 0), p(this, "hasScrobbler", void 0), p(this, "hasSync", void 0), p(this, "hasAutoSync", void 0), p(this, "limitations", void 0), this.id = e.id, this.name = e.name, this.homePage = e.homePage, this.hostPatterns = Object.freeze(e.hostPatterns), this.hasScrobbler = e.hasScrobbler, this.hasSync = e.hasSync, this.hasAutoSync = e.hasAutoSync, this.limitations = null !== (r = e.limitations) && void 0 !== r ? r : [],
                        function (t, e) {
                            b.set(t, e)
                        }(this.id, this)
                }
                return o(t, [{
                    key: "path",
                    get: function () {
                        return "/".concat(this.id)
                    }
                }]), t
            }(),
            S = new k({
                id: "amazon-prime",
                name: "Amazon Prime",
                homePage: "https://www.primevideo.com/",
                hostPatterns: ["*://*.primevideo.com/*"],
                hasScrobbler: !0,
                hasSync: !0,
                hasAutoSync: !0
            });

        function O(t) {
            return function (t) {
                if (Array.isArray(t)) return v(t)
            }(t) || function (t) {
                if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
            }(t) || g(t) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        var A = r(6565),
            E = r.n(A),
            T = E() ? E().runtime.getURL("/").split("-")[0] : "unknown",
            I = {
                DATABASE_URL: "https://uts.rafaelgomes.xyz/api",
                environment: "MISSING_ENV_VAR".REACT_ENV || "",
                clientId: "d33cb863e9121c7e5c012a0a75ede7f403dc2a969609e08bb56fd9a468d20ee4",
                clientSecret: "7587c45e93467b8bad644496dd96039c04bce620d8b6680d945160a9b70f11a1",
                rollbarToken: "c1669aa5383f4f3dbbeb005d4f597335",
                tmdbApiKey: "3ee339552ac6964399b7545f7afb4528",
                browser: {
                    moz: "firefox",
                    chrome: "chrome",
                    unknown: "unknown"
                } [T] || "unknown",
                pageType: "content",
                tabId: null,
                dateFormat: "EEE d MMM yyyy, H:mm:ss",
                storage: {},
                errors: {},
                events: {}
            };

        function _(t, e) {
            if (e.length < t) throw new TypeError(t + " argument" + (t > 1 ? "s" : "") + " required, but only " + e.length + " present")
        }

        function R(t) {
            return _(1, arguments), t instanceof Date || "object" == typeof t && "[object Date]" === Object.prototype.toString.call(t)
        }

        function C(t) {
            _(1, arguments);
            var e = Object.prototype.toString.call(t);
            return t instanceof Date || "object" == typeof t && "[object Date]" === e ? new Date(t.getTime()) : "number" == typeof t || "[object Number]" === e ? new Date(t) : ("string" != typeof t && "[object String]" !== e || "undefined" == typeof console || (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"), console.warn((new Error).stack)), new Date(NaN))
        }

        function P(t) {
            if (_(1, arguments), !R(t) && "number" != typeof t) return !1;
            var e = C(t);
            return !isNaN(Number(e))
        }
        var j = {
            lessThanXSeconds: {
                one: "less than a second",
                other: "less than {{count}} seconds"
            },
            xSeconds: {
                one: "1 second",
                other: "{{count}} seconds"
            },
            halfAMinute: "half a minute",
            lessThanXMinutes: {
                one: "less than a minute",
                other: "less than {{count}} minutes"
            },
            xMinutes: {
                one: "1 minute",
                other: "{{count}} minutes"
            },
            aboutXHours: {
                one: "about 1 hour",
                other: "about {{count}} hours"
            },
            xHours: {
                one: "1 hour",
                other: "{{count}} hours"
            },
            xDays: {
                one: "1 day",
                other: "{{count}} days"
            },
            aboutXWeeks: {
                one: "about 1 week",
                other: "about {{count}} weeks"
            },
            xWeeks: {
                one: "1 week",
                other: "{{count}} weeks"
            },
            aboutXMonths: {
                one: "about 1 month",
                other: "about {{count}} months"
            },
            xMonths: {
                one: "1 month",
                other: "{{count}} months"
            },
            aboutXYears: {
                one: "about 1 year",
                other: "about {{count}} years"
            },
            xYears: {
                one: "1 year",
                other: "{{count}} years"
            },
            overXYears: {
                one: "over 1 year",
                other: "over {{count}} years"
            },
            almostXYears: {
                one: "almost 1 year",
                other: "almost {{count}} years"
            }
        };

        function L(t) {
            return function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    r = e.width ? String(e.width) : t.defaultWidth,
                    n = t.formats[r] || t.formats[t.defaultWidth];
                return n
            }
        }
        var D, N = {
                date: L({
                    formats: {
                        full: "EEEE, MMMM do, y",
                        long: "MMMM do, y",
                        medium: "MMM d, y",
                        short: "MM/dd/yyyy"
                    },
                    defaultWidth: "full"
                }),
                time: L({
                    formats: {
                        full: "h:mm:ss a zzzz",
                        long: "h:mm:ss a z",
                        medium: "h:mm:ss a",
                        short: "h:mm a"
                    },
                    defaultWidth: "full"
                }),
                dateTime: L({
                    formats: {
                        full: "{{date}} 'at' {{time}}",
                        long: "{{date}} 'at' {{time}}",
                        medium: "{{date}}, {{time}}",
                        short: "{{date}}, {{time}}"
                    },
                    defaultWidth: "full"
                })
            },
            U = {
                lastWeek: "'last' eeee 'at' p",
                yesterday: "'yesterday at' p",
                today: "'today at' p",
                tomorrow: "'tomorrow at' p",
                nextWeek: "eeee 'at' p",
                other: "P"
            };

        function M(t) {
            return function (e, r) {
                var n, i = r || {};
                if ("formatting" === (i.context ? String(i.context) : "standalone") && t.formattingValues) {
                    var o = t.defaultFormattingWidth || t.defaultWidth,
                        a = i.width ? String(i.width) : o;
                    n = t.formattingValues[a] || t.formattingValues[o]
                } else {
                    var s = t.defaultWidth,
                        c = i.width ? String(i.width) : t.defaultWidth;
                    n = t.values[c] || t.values[s]
                }
                return n[t.argumentCallback ? t.argumentCallback(e) : e]
            }
        }

        function H(t) {
            return function (e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = r.width,
                    i = n && t.matchPatterns[n] || t.matchPatterns[t.defaultMatchWidth],
                    o = e.match(i);
                if (!o) return null;
                var a, s = o[0],
                    c = n && t.parsePatterns[n] || t.parsePatterns[t.defaultParseWidth],
                    u = Array.isArray(c) ? F(c, (function (t) {
                        return t.test(s)
                    })) : q(c, (function (t) {
                        return t.test(s)
                    }));
                a = t.valueCallback ? t.valueCallback(u) : u, a = r.valueCallback ? r.valueCallback(a) : a;
                var l = e.slice(s.length);
                return {
                    value: a,
                    rest: l
                }
            }
        }

        function q(t, e) {
            for (var r in t)
                if (t.hasOwnProperty(r) && e(t[r])) return r
        }

        function F(t, e) {
            for (var r = 0; r < t.length; r++)
                if (e(t[r])) return r
        }
        const B = {
            code: "en-US",
            formatDistance: function (t, e, r) {
                var n, i = j[t];
                return n = "string" == typeof i ? i : 1 === e ? i.one : i.other.replace("{{count}}", e.toString()), null != r && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n
            },
            formatLong: N,
            formatRelative: function (t, e, r, n) {
                return U[t]
            },
            localize: {
                ordinalNumber: function (t, e) {
                    var r = Number(t),
                        n = r % 100;
                    if (n > 20 || n < 10) switch (n % 10) {
                        case 1:
                            return r + "st";
                        case 2:
                            return r + "nd";
                        case 3:
                            return r + "rd"
                    }
                    return r + "th"
                },
                era: M({
                    values: {
                        narrow: ["B", "A"],
                        abbreviated: ["BC", "AD"],
                        wide: ["Before Christ", "Anno Domini"]
                    },
                    defaultWidth: "wide"
                }),
                quarter: M({
                    values: {
                        narrow: ["1", "2", "3", "4"],
                        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
                        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
                    },
                    defaultWidth: "wide",
                    argumentCallback: function (t) {
                        return t - 1
                    }
                }),
                month: M({
                    values: {
                        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                        abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    },
                    defaultWidth: "wide"
                }),
                day: M({
                    values: {
                        narrow: ["S", "M", "T", "W", "T", "F", "S"],
                        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                    },
                    defaultWidth: "wide"
                }),
                dayPeriod: M({
                    values: {
                        narrow: {
                            am: "a",
                            pm: "p",
                            midnight: "mi",
                            noon: "n",
                            morning: "morning",
                            afternoon: "afternoon",
                            evening: "evening",
                            night: "night"
                        },
                        abbreviated: {
                            am: "AM",
                            pm: "PM",
                            midnight: "midnight",
                            noon: "noon",
                            morning: "morning",
                            afternoon: "afternoon",
                            evening: "evening",
                            night: "night"
                        },
                        wide: {
                            am: "a.m.",
                            pm: "p.m.",
                            midnight: "midnight",
                            noon: "noon",
                            morning: "morning",
                            afternoon: "afternoon",
                            evening: "evening",
                            night: "night"
                        }
                    },
                    defaultWidth: "wide",
                    formattingValues: {
                        narrow: {
                            am: "a",
                            pm: "p",
                            midnight: "mi",
                            noon: "n",
                            morning: "in the morning",
                            afternoon: "in the afternoon",
                            evening: "in the evening",
                            night: "at night"
                        },
                        abbreviated: {
                            am: "AM",
                            pm: "PM",
                            midnight: "midnight",
                            noon: "noon",
                            morning: "in the morning",
                            afternoon: "in the afternoon",
                            evening: "in the evening",
                            night: "at night"
                        },
                        wide: {
                            am: "a.m.",
                            pm: "p.m.",
                            midnight: "midnight",
                            noon: "noon",
                            morning: "in the morning",
                            afternoon: "in the afternoon",
                            evening: "in the evening",
                            night: "at night"
                        }
                    },
                    defaultFormattingWidth: "wide"
                })
            },
            match: {
                ordinalNumber: (D = {
                    matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                    parsePattern: /\d+/i,
                    valueCallback: function (t) {
                        return parseInt(t, 10)
                    }
                }, function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        r = t.match(D.matchPattern);
                    if (!r) return null;
                    var n = r[0],
                        i = t.match(D.parsePattern);
                    if (!i) return null;
                    var o = D.valueCallback ? D.valueCallback(i[0]) : i[0];
                    o = e.valueCallback ? e.valueCallback(o) : o;
                    var a = t.slice(n.length);
                    return {
                        value: o,
                        rest: a
                    }
                }),
                era: H({
                    matchPatterns: {
                        narrow: /^(b|a)/i,
                        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                        wide: /^(before christ|before common era|anno domini|common era)/i
                    },
                    defaultMatchWidth: "wide",
                    parsePatterns: {
                        any: [/^b/i, /^(a|c)/i]
                    },
                    defaultParseWidth: "any"
                }),
                quarter: H({
                    matchPatterns: {
                        narrow: /^[1234]/i,
                        abbreviated: /^q[1234]/i,
                        wide: /^[1234](th|st|nd|rd)? quarter/i
                    },
                    defaultMatchWidth: "wide",
                    parsePatterns: {
                        any: [/1/i, /2/i, /3/i, /4/i]
                    },
                    defaultParseWidth: "any",
                    valueCallback: function (t) {
                        return t + 1
                    }
                }),
                month: H({
                    matchPatterns: {
                        narrow: /^[jfmasond]/i,
                        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
                    },
                    defaultMatchWidth: "wide",
                    parsePatterns: {
                        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
                        any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
                    },
                    defaultParseWidth: "any"
                }),
                day: H({
                    matchPatterns: {
                        narrow: /^[smtwf]/i,
                        short: /^(su|mo|tu|we|th|fr|sa)/i,
                        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
                    },
                    defaultMatchWidth: "wide",
                    parsePatterns: {
                        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
                    },
                    defaultParseWidth: "any"
                }),
                dayPeriod: H({
                    matchPatterns: {
                        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
                    },
                    defaultMatchWidth: "any",
                    parsePatterns: {
                        any: {
                            am: /^a/i,
                            pm: /^p/i,
                            midnight: /^mi/i,
                            noon: /^no/i,
                            morning: /morning/i,
                            afternoon: /afternoon/i,
                            evening: /evening/i,
                            night: /night/i
                        }
                    },
                    defaultParseWidth: "any"
                })
            },
            options: {
                weekStartsOn: 0,
                firstWeekContainsDate: 1
            }
        };

        function W(t) {
            if (null === t || !0 === t || !1 === t) return NaN;
            var e = Number(t);
            return isNaN(e) ? e : e < 0 ? Math.ceil(e) : Math.floor(e)
        }

        function G(t, e) {
            _(2, arguments);
            var r = C(t).getTime(),
                n = W(e);
            return new Date(r + n)
        }

        function J(t, e) {
            _(2, arguments);
            var r = W(e);
            return G(t, -r)
        }

        function z(t, e) {
            for (var r = t < 0 ? "-" : "", n = Math.abs(t).toString(); n.length < e;) n = "0" + n;
            return r + n
        }
        const V = function (t, e) {
                var r = t.getUTCFullYear(),
                    n = r > 0 ? r : 1 - r;
                return z("yy" === e ? n % 100 : n, e.length)
            },
            Y = function (t, e) {
                var r = t.getUTCMonth();
                return "M" === e ? String(r + 1) : z(r + 1, 2)
            },
            $ = function (t, e) {
                return z(t.getUTCDate(), e.length)
            },
            X = function (t, e) {
                return z(t.getUTCHours() % 12 || 12, e.length)
            },
            K = function (t, e) {
                return z(t.getUTCHours(), e.length)
            },
            Q = function (t, e) {
                return z(t.getUTCMinutes(), e.length)
            },
            Z = function (t, e) {
                return z(t.getUTCSeconds(), e.length)
            },
            tt = function (t, e) {
                var r = e.length,
                    n = t.getUTCMilliseconds();
                return z(Math.floor(n * Math.pow(10, r - 3)), e.length)
            };
        var et = 864e5;

        function rt(t) {
            _(1, arguments);
            var e = 1,
                r = C(t),
                n = r.getUTCDay(),
                i = (n < e ? 7 : 0) + n - e;
            return r.setUTCDate(r.getUTCDate() - i), r.setUTCHours(0, 0, 0, 0), r
        }

        function nt(t) {
            _(1, arguments);
            var e = C(t),
                r = e.getUTCFullYear(),
                n = new Date(0);
            n.setUTCFullYear(r + 1, 0, 4), n.setUTCHours(0, 0, 0, 0);
            var i = rt(n),
                o = new Date(0);
            o.setUTCFullYear(r, 0, 4), o.setUTCHours(0, 0, 0, 0);
            var a = rt(o);
            return e.getTime() >= i.getTime() ? r + 1 : e.getTime() >= a.getTime() ? r : r - 1
        }

        function it(t) {
            _(1, arguments);
            var e = nt(t),
                r = new Date(0);
            r.setUTCFullYear(e, 0, 4), r.setUTCHours(0, 0, 0, 0);
            var n = rt(r);
            return n
        }
        var ot = 6048e5;

        function at(t, e) {
            _(1, arguments);
            var r = e || {},
                n = r.locale,
                i = n && n.options && n.options.weekStartsOn,
                o = null == i ? 0 : W(i),
                a = null == r.weekStartsOn ? o : W(r.weekStartsOn);
            if (!(a >= 0 && a <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
            var s = C(t),
                c = s.getUTCDay(),
                u = (c < a ? 7 : 0) + c - a;
            return s.setUTCDate(s.getUTCDate() - u), s.setUTCHours(0, 0, 0, 0), s
        }

        function st(t, e) {
            _(1, arguments);
            var r = C(t, e),
                n = r.getUTCFullYear(),
                i = e || {},
                o = i.locale,
                a = o && o.options && o.options.firstWeekContainsDate,
                s = null == a ? 1 : W(a),
                c = null == i.firstWeekContainsDate ? s : W(i.firstWeekContainsDate);
            if (!(c >= 1 && c <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
            var u = new Date(0);
            u.setUTCFullYear(n + 1, 0, c), u.setUTCHours(0, 0, 0, 0);
            var l = at(u, e),
                h = new Date(0);
            h.setUTCFullYear(n, 0, c), h.setUTCHours(0, 0, 0, 0);
            var f = at(h, e);
            return r.getTime() >= l.getTime() ? n + 1 : r.getTime() >= f.getTime() ? n : n - 1
        }

        function ct(t, e) {
            _(1, arguments);
            var r = e || {},
                n = r.locale,
                i = n && n.options && n.options.firstWeekContainsDate,
                o = null == i ? 1 : W(i),
                a = null == r.firstWeekContainsDate ? o : W(r.firstWeekContainsDate),
                s = st(t, e),
                c = new Date(0);
            c.setUTCFullYear(s, 0, a), c.setUTCHours(0, 0, 0, 0);
            var u = at(c, e);
            return u
        }
        var ut = 6048e5;

        function lt(t, e) {
            var r = t > 0 ? "-" : "+",
                n = Math.abs(t),
                i = Math.floor(n / 60),
                o = n % 60;
            if (0 === o) return r + String(i);
            var a = e || "";
            return r + String(i) + a + z(o, 2)
        }

        function ht(t, e) {
            return t % 60 == 0 ? (t > 0 ? "-" : "+") + z(Math.abs(t) / 60, 2) : ft(t, e)
        }

        function ft(t, e) {
            var r = e || "",
                n = t > 0 ? "-" : "+",
                i = Math.abs(t);
            return n + z(Math.floor(i / 60), 2) + r + z(i % 60, 2)
        }
        const pt = {
            G: function (t, e, r) {
                var n = t.getUTCFullYear() > 0 ? 1 : 0;
                switch (e) {
                    case "G":
                    case "GG":
                    case "GGG":
                        return r.era(n, {
                            width: "abbreviated"
                        });
                    case "GGGGG":
                        return r.era(n, {
                            width: "narrow"
                        });
                    case "GGGG":
                    default:
                        return r.era(n, {
                            width: "wide"
                        })
                }
            },
            y: function (t, e, r) {
                if ("yo" === e) {
                    var n = t.getUTCFullYear(),
                        i = n > 0 ? n : 1 - n;
                    return r.ordinalNumber(i, {
                        unit: "year"
                    })
                }
                return V(t, e)
            },
            Y: function (t, e, r, n) {
                var i = st(t, n),
                    o = i > 0 ? i : 1 - i;
                return "YY" === e ? z(o % 100, 2) : "Yo" === e ? r.ordinalNumber(o, {
                    unit: "year"
                }) : z(o, e.length)
            },
            R: function (t, e) {
                return z(nt(t), e.length)
            },
            u: function (t, e) {
                return z(t.getUTCFullYear(), e.length)
            },
            Q: function (t, e, r) {
                var n = Math.ceil((t.getUTCMonth() + 1) / 3);
                switch (e) {
                    case "Q":
                        return String(n);
                    case "QQ":
                        return z(n, 2);
                    case "Qo":
                        return r.ordinalNumber(n, {
                            unit: "quarter"
                        });
                    case "QQQ":
                        return r.quarter(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "QQQQQ":
                        return r.quarter(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "QQQQ":
                    default:
                        return r.quarter(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            q: function (t, e, r) {
                var n = Math.ceil((t.getUTCMonth() + 1) / 3);
                switch (e) {
                    case "q":
                        return String(n);
                    case "qq":
                        return z(n, 2);
                    case "qo":
                        return r.ordinalNumber(n, {
                            unit: "quarter"
                        });
                    case "qqq":
                        return r.quarter(n, {
                            width: "abbreviated",
                            context: "standalone"
                        });
                    case "qqqqq":
                        return r.quarter(n, {
                            width: "narrow",
                            context: "standalone"
                        });
                    case "qqqq":
                    default:
                        return r.quarter(n, {
                            width: "wide",
                            context: "standalone"
                        })
                }
            },
            M: function (t, e, r) {
                var n = t.getUTCMonth();
                switch (e) {
                    case "M":
                    case "MM":
                        return Y(t, e);
                    case "Mo":
                        return r.ordinalNumber(n + 1, {
                            unit: "month"
                        });
                    case "MMM":
                        return r.month(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "MMMMM":
                        return r.month(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "MMMM":
                    default:
                        return r.month(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            L: function (t, e, r) {
                var n = t.getUTCMonth();
                switch (e) {
                    case "L":
                        return String(n + 1);
                    case "LL":
                        return z(n + 1, 2);
                    case "Lo":
                        return r.ordinalNumber(n + 1, {
                            unit: "month"
                        });
                    case "LLL":
                        return r.month(n, {
                            width: "abbreviated",
                            context: "standalone"
                        });
                    case "LLLLL":
                        return r.month(n, {
                            width: "narrow",
                            context: "standalone"
                        });
                    case "LLLL":
                    default:
                        return r.month(n, {
                            width: "wide",
                            context: "standalone"
                        })
                }
            },
            w: function (t, e, r, n) {
                var i = function (t, e) {
                    _(1, arguments);
                    var r = C(t),
                        n = at(r, e).getTime() - ct(r, e).getTime();
                    return Math.round(n / ut) + 1
                }(t, n);
                return "wo" === e ? r.ordinalNumber(i, {
                    unit: "week"
                }) : z(i, e.length)
            },
            I: function (t, e, r) {
                var n = function (t) {
                    _(1, arguments);
                    var e = C(t),
                        r = rt(e).getTime() - it(e).getTime();
                    return Math.round(r / ot) + 1
                }(t);
                return "Io" === e ? r.ordinalNumber(n, {
                    unit: "week"
                }) : z(n, e.length)
            },
            d: function (t, e, r) {
                return "do" === e ? r.ordinalNumber(t.getUTCDate(), {
                    unit: "date"
                }) : $(t, e)
            },
            D: function (t, e, r) {
                var n = function (t) {
                    _(1, arguments);
                    var e = C(t),
                        r = e.getTime();
                    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
                    var n = e.getTime(),
                        i = r - n;
                    return Math.floor(i / et) + 1
                }(t);
                return "Do" === e ? r.ordinalNumber(n, {
                    unit: "dayOfYear"
                }) : z(n, e.length)
            },
            E: function (t, e, r) {
                var n = t.getUTCDay();
                switch (e) {
                    case "E":
                    case "EE":
                    case "EEE":
                        return r.day(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "EEEEE":
                        return r.day(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "EEEEEE":
                        return r.day(n, {
                            width: "short",
                            context: "formatting"
                        });
                    case "EEEE":
                    default:
                        return r.day(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            e: function (t, e, r, n) {
                var i = t.getUTCDay(),
                    o = (i - n.weekStartsOn + 8) % 7 || 7;
                switch (e) {
                    case "e":
                        return String(o);
                    case "ee":
                        return z(o, 2);
                    case "eo":
                        return r.ordinalNumber(o, {
                            unit: "day"
                        });
                    case "eee":
                        return r.day(i, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "eeeee":
                        return r.day(i, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "eeeeee":
                        return r.day(i, {
                            width: "short",
                            context: "formatting"
                        });
                    case "eeee":
                    default:
                        return r.day(i, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            c: function (t, e, r, n) {
                var i = t.getUTCDay(),
                    o = (i - n.weekStartsOn + 8) % 7 || 7;
                switch (e) {
                    case "c":
                        return String(o);
                    case "cc":
                        return z(o, e.length);
                    case "co":
                        return r.ordinalNumber(o, {
                            unit: "day"
                        });
                    case "ccc":
                        return r.day(i, {
                            width: "abbreviated",
                            context: "standalone"
                        });
                    case "ccccc":
                        return r.day(i, {
                            width: "narrow",
                            context: "standalone"
                        });
                    case "cccccc":
                        return r.day(i, {
                            width: "short",
                            context: "standalone"
                        });
                    case "cccc":
                    default:
                        return r.day(i, {
                            width: "wide",
                            context: "standalone"
                        })
                }
            },
            i: function (t, e, r) {
                var n = t.getUTCDay(),
                    i = 0 === n ? 7 : n;
                switch (e) {
                    case "i":
                        return String(i);
                    case "ii":
                        return z(i, e.length);
                    case "io":
                        return r.ordinalNumber(i, {
                            unit: "day"
                        });
                    case "iii":
                        return r.day(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "iiiii":
                        return r.day(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "iiiiii":
                        return r.day(n, {
                            width: "short",
                            context: "formatting"
                        });
                    case "iiii":
                    default:
                        return r.day(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            a: function (t, e, r) {
                var n = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
                switch (e) {
                    case "a":
                    case "aa":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "aaa":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        }).toLowerCase();
                    case "aaaaa":
                        return r.dayPeriod(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "aaaa":
                    default:
                        return r.dayPeriod(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            b: function (t, e, r) {
                var n, i = t.getUTCHours();
                switch (n = 12 === i ? "noon" : 0 === i ? "midnight" : i / 12 >= 1 ? "pm" : "am", e) {
                    case "b":
                    case "bb":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "bbb":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        }).toLowerCase();
                    case "bbbbb":
                        return r.dayPeriod(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "bbbb":
                    default:
                        return r.dayPeriod(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            B: function (t, e, r) {
                var n, i = t.getUTCHours();
                switch (n = i >= 17 ? "evening" : i >= 12 ? "afternoon" : i >= 4 ? "morning" : "night", e) {
                    case "B":
                    case "BB":
                    case "BBB":
                        return r.dayPeriod(n, {
                            width: "abbreviated",
                            context: "formatting"
                        });
                    case "BBBBB":
                        return r.dayPeriod(n, {
                            width: "narrow",
                            context: "formatting"
                        });
                    case "BBBB":
                    default:
                        return r.dayPeriod(n, {
                            width: "wide",
                            context: "formatting"
                        })
                }
            },
            h: function (t, e, r) {
                if ("ho" === e) {
                    var n = t.getUTCHours() % 12;
                    return 0 === n && (n = 12), r.ordinalNumber(n, {
                        unit: "hour"
                    })
                }
                return X(t, e)
            },
            H: function (t, e, r) {
                return "Ho" === e ? r.ordinalNumber(t.getUTCHours(), {
                    unit: "hour"
                }) : K(t, e)
            },
            K: function (t, e, r) {
                var n = t.getUTCHours() % 12;
                return "Ko" === e ? r.ordinalNumber(n, {
                    unit: "hour"
                }) : z(n, e.length)
            },
            k: function (t, e, r) {
                var n = t.getUTCHours();
                return 0 === n && (n = 24), "ko" === e ? r.ordinalNumber(n, {
                    unit: "hour"
                }) : z(n, e.length)
            },
            m: function (t, e, r) {
                return "mo" === e ? r.ordinalNumber(t.getUTCMinutes(), {
                    unit: "minute"
                }) : Q(t, e)
            },
            s: function (t, e, r) {
                return "so" === e ? r.ordinalNumber(t.getUTCSeconds(), {
                    unit: "second"
                }) : Z(t, e)
            },
            S: function (t, e) {
                return tt(t, e)
            },
            X: function (t, e, r, n) {
                var i = (n._originalDate || t).getTimezoneOffset();
                if (0 === i) return "Z";
                switch (e) {
                    case "X":
                        return ht(i);
                    case "XXXX":
                    case "XX":
                        return ft(i);
                    case "XXXXX":
                    case "XXX":
                    default:
                        return ft(i, ":")
                }
            },
            x: function (t, e, r, n) {
                var i = (n._originalDate || t).getTimezoneOffset();
                switch (e) {
                    case "x":
                        return ht(i);
                    case "xxxx":
                    case "xx":
                        return ft(i);
                    case "xxxxx":
                    case "xxx":
                    default:
                        return ft(i, ":")
                }
            },
            O: function (t, e, r, n) {
                var i = (n._originalDate || t).getTimezoneOffset();
                switch (e) {
                    case "O":
                    case "OO":
                    case "OOO":
                        return "GMT" + lt(i, ":");
                    case "OOOO":
                    default:
                        return "GMT" + ft(i, ":")
                }
            },
            z: function (t, e, r, n) {
                var i = (n._originalDate || t).getTimezoneOffset();
                switch (e) {
                    case "z":
                    case "zz":
                    case "zzz":
                        return "GMT" + lt(i, ":");
                    case "zzzz":
                    default:
                        return "GMT" + ft(i, ":")
                }
            },
            t: function (t, e, r, n) {
                var i = n._originalDate || t;
                return z(Math.floor(i.getTime() / 1e3), e.length)
            },
            T: function (t, e, r, n) {
                return z((n._originalDate || t).getTime(), e.length)
            }
        };

        function dt(t, e) {
            switch (t) {
                case "P":
                    return e.date({
                        width: "short"
                    });
                case "PP":
                    return e.date({
                        width: "medium"
                    });
                case "PPP":
                    return e.date({
                        width: "long"
                    });
                case "PPPP":
                default:
                    return e.date({
                        width: "full"
                    })
            }
        }

        function mt(t, e) {
            switch (t) {
                case "p":
                    return e.time({
                        width: "short"
                    });
                case "pp":
                    return e.time({
                        width: "medium"
                    });
                case "ppp":
                    return e.time({
                        width: "long"
                    });
                case "pppp":
                default:
                    return e.time({
                        width: "full"
                    })
            }
        }
        const vt = {
            p: mt,
            P: function (t, e) {
                var r, n = t.match(/(P+)(p+)?/),
                    i = n[1],
                    o = n[2];
                if (!o) return dt(t, e);
                switch (i) {
                    case "P":
                        r = e.dateTime({
                            width: "short"
                        });
                        break;
                    case "PP":
                        r = e.dateTime({
                            width: "medium"
                        });
                        break;
                    case "PPP":
                        r = e.dateTime({
                            width: "long"
                        });
                        break;
                    case "PPPP":
                    default:
                        r = e.dateTime({
                            width: "full"
                        })
                }
                return r.replace("{{date}}", dt(i, e)).replace("{{time}}", mt(o, e))
            }
        };

        function gt(t) {
            var e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
            return e.setUTCFullYear(t.getFullYear()), t.getTime() - e.getTime()
        }
        var yt = ["D", "DD"],
            bt = ["YY", "YYYY"];

        function wt(t) {
            return -1 !== yt.indexOf(t)
        }

        function xt(t) {
            return -1 !== bt.indexOf(t)
        }

        function kt(t, e, r) {
            if ("YYYY" === t) throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e, "`) for formatting years to the input `").concat(r, "`; see: https://git.io/fxCyr"));
            if ("YY" === t) throw new RangeError("Use `yy` instead of `YY` (in `".concat(e, "`) for formatting years to the input `").concat(r, "`; see: https://git.io/fxCyr"));
            if ("D" === t) throw new RangeError("Use `d` instead of `D` (in `".concat(e, "`) for formatting days of the month to the input `").concat(r, "`; see: https://git.io/fxCyr"));
            if ("DD" === t) throw new RangeError("Use `dd` instead of `DD` (in `".concat(e, "`) for formatting days of the month to the input `").concat(r, "`; see: https://git.io/fxCyr"))
        }
        var St = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
            Ot = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
            At = /^'([^]*?)'?$/,
            Et = /''/g,
            Tt = /[a-zA-Z]/;

        function It(t, e, r) {
            _(2, arguments);
            var n = String(e),
                i = r || {},
                o = i.locale || B,
                a = o.options && o.options.firstWeekContainsDate,
                s = null == a ? 1 : W(a),
                c = null == i.firstWeekContainsDate ? s : W(i.firstWeekContainsDate);
            if (!(c >= 1 && c <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
            var u = o.options && o.options.weekStartsOn,
                l = null == u ? 0 : W(u),
                h = null == i.weekStartsOn ? l : W(i.weekStartsOn);
            if (!(h >= 0 && h <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
            if (!o.localize) throw new RangeError("locale must contain localize property");
            if (!o.formatLong) throw new RangeError("locale must contain formatLong property");
            var f = C(t);
            if (!P(f)) throw new RangeError("Invalid time value");
            var p = gt(f),
                d = J(f, p),
                m = {
                    firstWeekContainsDate: c,
                    weekStartsOn: h,
                    locale: o,
                    _originalDate: f
                },
                v = n.match(Ot).map((function (t) {
                    var e = t[0];
                    return "p" === e || "P" === e ? (0, vt[e])(t, o.formatLong, m) : t
                })).join("").match(St).map((function (r) {
                    if ("''" === r) return "'";
                    var n = r[0];
                    if ("'" === n) return _t(r);
                    var a = pt[n];
                    if (a) return !i.useAdditionalWeekYearTokens && xt(r) && kt(r, e, t), !i.useAdditionalDayOfYearTokens && wt(r) && kt(r, e, t), a(d, r, o.localize, m);
                    if (n.match(Tt)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + n + "`");
                    return r
                })).join("");
            return v
        }

        function _t(t) {
            return t.match(At)[1].replace(Et, "'")
        }
        var Rt = r(7417),
            Ct = r.n(Rt);

        function Pt() {
            function t(e, r, i) {
                var o = new RegExp(e, r);
                return n.set(o, i || n.get(e)), u(o, t.prototype)
            }

            function e(t, e) {
                var r = n.get(e);
                return Object.keys(r).reduce((function (e, n) {
                    return e[n] = t[r[n]], e
                }), Object.create(null))
            }
            Pt = function (e, r) {
                return new t(e, void 0, r)
            };
            var r = RegExp.prototype,
                n = new WeakMap;
            return l(t, RegExp), t.prototype.exec = function (t) {
                var n = r.exec.call(this, t);
                return n && (n.groups = e(n, this)), n
            }, t.prototype[Symbol.replace] = function (t, i) {
                if ("string" == typeof i) {
                    var o = n.get(this);
                    return r[Symbol.replace].call(this, t, i.replace(/\$<([^>]+)>/g, (function (t, e) {
                        return "$" + o[e]
                    })))
                }
                if ("function" == typeof i) {
                    var a = this;
                    return r[Symbol.replace].call(this, t, (function () {
                        var t = arguments;
                        return "object" !== h(t[t.length - 1]) && (t = [].slice.call(t)).push(e(t, a)), i.apply(this, t)
                    }))
                }
                return r[Symbol.replace].call(this, t, i)
            }, Pt.apply(this, arguments)
        }
        var jt = new(function () {
            function t() {
                n(this, t)
            }
            return o(t, [{
                key: "dateDiff",
                value: function (t, e, r) {
                    var n = this.unix(t),
                        i = this.unix(e);
                    return Math.abs(n - i) <= r
                }
            }, {
                key: "timestamp",
                value: function (t) {
                    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : I.dateFormat;
                    return It(void 0 === t ? new Date : "string" == typeof t ? new Date(t) : "number" == typeof t ? 1e10 <= t ? new Date(t) : new Date(1e3 * t) : t, e)
                }
            }, {
                key: "unix",
                value: function (t) {
                    var e;
                    if (void 0 === t) e = Math.trunc(Date.now() / 1e3);
                    else if ("string" == typeof t) {
                        var r = new Date(t);
                        e = Math.trunc(r.getTime() / 1e3)
                    } else e = "number" == typeof t ? 1e10 <= t ? Math.trunc(t / 1e3) : Math.trunc(t) : Math.trunc(t.getTime() / 1e3);
                    return e
                }
            }, {
                key: "convertToISOString",
                value: function (t) {
                    return t ? new Date(1e3 * t).toISOString() : void 0
                }
            }, {
                key: "mergeObjs",
                value: function (t) {
                    for (var e = arguments.length, r = Array(1 < e ? e - 1 : 0), n = 1; n < e; n++) r[n - 1] = arguments[n];
                    return Ct().all([t].concat(r))
                }
            }, {
                key: "replace",
                value: function (t, e) {
                    var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : Pt(/\{(.+?)\}/g, {
                        placeholder: 1
                    });
                    return t.replace(r, (function (t, r) {
                        return e[r]
                    }))
                }
            }]), t
        }());

        function Lt(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Dt(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? Lt(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : Lt(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }

        function Nt(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Ut(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ut(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function Ut(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var Mt = function () {
                function t(e) {
                    n(this, t), p(this, "cache", void 0), this.cache = e
                }
                return o(t, [{
                    key: "get",
                    value: function (t) {
                        var e;
                        return null === (e = this.cache[t]) || void 0 === e ? void 0 : e.value
                    }
                }, {
                    key: "set",
                    value: function (t, e) {
                        this.cache[t] = {
                            value: e,
                            timestamp: Ht.timestamp
                        }
                    }
                }]), t
            }(),
            Ht = new(function () {
                function t() {
                    n(this, t), p(this, "ttl", {
                        history: 86400,
                        historyItemsToItems: 86400,
                        imageUrls: 86400,
                        items: 86400,
                        itemsToTraktItems: 86400,
                        servicesData: 86400,
                        suggestions: 3600,
                        tmdbApiConfigs: 604800,
                        traktHistoryItems: 2700,
                        traktItems: 86400,
                        traktSettings: 86400,
                        urlsToTraktItems: 86400
                    }), p(this, "isChecking", !1), p(this, "checkTimeout", null), p(this, "storageKeys", Object.keys(this.ttl).map((function (t) {
                        return "".concat(t, "Cache")
                    }))), p(this, "timestamp", 0)
                }
                return o(t, [{
                    key: "init",
                    value: function () {
                        this.check()
                    }
                }, {
                    key: "check",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i, o, a, s, c, u, l, h, f, d, v, g = this;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (!this.isChecking) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 2:
                                        this.isChecking = !0, null !== this.checkTimeout && window.clearTimeout(this.checkTimeout), e = jt.unix(), r = Nt(Object.entries(this.ttl)), t.prev = 6, r.s();
                                    case 8:
                                        if ((n = r.n()).done) {
                                            t.next = 23;
                                            break
                                        }
                                        return i = y(n.value, 2), o = i[0], a = i[1], s = "".concat(o, "Cache"), t.next = 13, I.storage.get(s);
                                    case 13:
                                        if (c = t.sent, u = c[s]) {
                                            t.next = 17;
                                            break
                                        }
                                        return t.abrupt("continue", 21);
                                    case 17:
                                        l = Nt(Object.entries(u));
                                        try {
                                            for (l.s(); !(h = l.n()).done;) f = y(h.value, 2), d = f[0], v = f[1], e - v.timestamp > a && delete u[d]
                                        } catch (t) {
                                            l.e(t)
                                        } finally {
                                            l.f()
                                        }
                                        return t.next = 21, I.storage.set(p({}, s, u), !1);
                                    case 21:
                                        t.next = 8;
                                        break;
                                    case 23:
                                        t.next = 28;
                                        break;
                                    case 25:
                                        t.prev = 25, t.t0 = t.catch(6), r.e(t.t0);
                                    case 28:
                                        return t.prev = 28, r.f(), t.finish(28);
                                    case 31:
                                        this.checkTimeout = window.setTimeout((function () {
                                            g.check()
                                        }), 36e5), this.isChecking = !1;
                                    case 33:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [6, 25, 28, 31]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "get",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a, s, c, u;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return this.timestamp = jt.unix(), r = {}, n = Array.isArray(e) ? e : [e], i = n.map((function (t) {
                                            return "".concat(t, "Cache")
                                        })), t.next = 6, I.storage.get(i);
                                    case 6:
                                        o = t.sent, a = Nt(n);
                                        try {
                                            for (a.s(); !(s = a.n()).done;) c = s.value, u = "".concat(c, "Cache"), r[c] = new Mt(o[u] || {})
                                        } catch (t) {
                                            a.e(t)
                                        } finally {
                                            a.f()
                                        }
                                        return t.abrupt("return", Array.isArray(e) ? r : r[e]);
                                    case 10:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "set",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a, s, c, u, l;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return r = {}, n = Object.keys(e), i = n.map((function (t) {
                                            return "".concat(t, "Cache")
                                        })), t.next = 5, I.storage.get(i);
                                    case 5:
                                        for (o = t.sent, a = 0, s = n; a < s.length; a++) u = s[a], l = "".concat(u, "Cache"), r[l] = Dt(Dt({}, o[l] || {}), (null === (c = e[u]) || void 0 === c ? void 0 : c.cache) || {});
                                        return t.next = 9, I.storage.set(r, !1);
                                    case 9:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t
            }());

        function qt() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
            } catch (t) {
                return !1
            }
        }

        function Ft(t, e, r) {
            return (Ft = qt() ? Reflect.construct : function (t, e, r) {
                var n = [null];
                n.push.apply(n, e);
                var i = new(Function.bind.apply(t, n));
                return r && u(i, r.prototype), i
            }).apply(null, arguments)
        }

        function Bt(t) {
            var e = "function" == typeof Map ? new Map : void 0;
            return (Bt = function (t) {
                if (null === t || (r = t, -1 === Function.toString.call(r).indexOf("[native code]"))) return t;
                var r;
                if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                    if (e.has(t)) return e.get(t);
                    e.set(t, n)
                }

                function n() {
                    return Ft(t, arguments, s(this).constructor)
                }
                return n.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), u(n, t)
            })(t)
        }
        var Wt = function (t) {
            function e(t) {
                var i;
                return n(this, e), p(a(i = r.call(this, JSON.stringify(t))), "request", void 0), p(a(i), "status", void 0), p(a(i), "text", void 0), p(a(i), "isCanceled", void 0), p(a(i), "extra", void 0), i.request = t.request, i.status = t.status, i.text = t.text, i.isCanceled = t.isCanceled, i.extra = t.extra, i
            }
            l(e, t);
            var r = function (t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var r, n = s(t);
                    if (e) {
                        var i = s(this).constructor;
                        r = Reflect.construct(n, arguments, i)
                    } else r = n.apply(this, arguments);
                    return f(this, r)
                }
            }(e);
            return e
        }(Bt(Error));

        function Gt(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Jt(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Jt(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function Jt(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }

        function zt(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Vt(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? zt(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : zt(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }
        var Yt = new(function () {
            function t() {
                var e = this;
                n(this, t), p(this, "messageHandlers", {
                    "dispatch-event": function (t) {
                        return I.events.dispatch(t.eventType, t.eventSpecifier, t.data, !0)
                    }
                }), p(this, "ports", new Map), p(this, "onConnect", (function (t) {
                    var r, n, i = null === (r = t.sender) || void 0 === r || null === (n = r.tab) || void 0 === n ? void 0 : n.id;
                    i && (e.ports.set(i, t), I.events.dispatch("CONTENT_SCRIPT_CONNECT", null, {
                        tabId: i
                    }), t.onDisconnect.addListener((function () {
                        e.ports.delete(i), I.events.dispatch("CONTENT_SCRIPT_DISCONNECT", null, {
                            tabId: i
                        })
                    })))
                })), p(this, "onMessage", (function (t, r) {
                    var n, i, o = e.messageHandlers[t.action];
                    if (void 0 !== o) {
                        var a = o(t, null !== (n = null === (i = r.tab) || void 0 === i ? void 0 : i.id) && void 0 !== n ? n : null);
                        return void 0 === a ? void 0 : Promise.resolve(a).catch((function (t) {
                            if (I.errors.log("Failed to execute action.", t), t instanceof Wt) throw new Error(JSON.stringify({
                                instance: "RequestError",
                                data: {
                                    request: t.request,
                                    status: t.status,
                                    text: t.text,
                                    isCanceled: t.isCanceled,
                                    extra: t.extra
                                }
                            }));
                            throw new Error(JSON.stringify({
                                instance: "Error",
                                data: {
                                    message: t.message
                                }
                            }))
                        }))
                    }
                }))
            }
            return o(t, [{
                key: "init",
                value: function () {
                    "background" === I.pageType ? E().runtime.onConnect.addListener(this.onConnect) : "content" === I.pageType && E().runtime.connect(), E().runtime.onMessage.addListener(this.onMessage)
                }
            }, {
                key: "addHandlers",
                value: function (t) {
                    this.messageHandlers = Vt(Vt({}, this.messageHandlers), t)
                }
            }, {
                key: "toExtension",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r = null, t.prev = 1, t.next = 4, E().runtime.sendMessage(e);
                                case 4:
                                    if (t.t1 = n = t.sent, t.t0 = null !== t.t1, !t.t0) {
                                        t.next = 8;
                                        break
                                    }
                                    t.t0 = void 0 !== n;
                                case 8:
                                    if (!t.t0) {
                                        t.next = 12;
                                        break
                                    }
                                    t.t2 = n, t.next = 13;
                                    break;
                                case 12:
                                    t.t2 = null;
                                case 13:
                                    r = t.t2, t.next = 25;
                                    break;
                                case 16:
                                    if (t.prev = 16, t.t3 = t.catch(1), !(t.t3 instanceof Error)) {
                                        t.next = 25;
                                        break
                                    }
                                    i = JSON.parse(t.t3.message), t.t4 = i.instance, t.next = "Error" === t.t4 ? 23 : "RequestError" === t.t4 ? 24 : 25;
                                    break;
                                case 23:
                                    throw new Error(i.data.message);
                                case 24:
                                    throw new Wt(i.data);
                                case 25:
                                    return t.abrupt("return", r);
                                case 26:
                                case "end":
                                    return t.stop()
                            }
                        }), t, null, [
                            [1, 16]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "toContent",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, E().tabs.sendMessage(r, e);
                                case 2:
                                    if (t.t1 = n = t.sent, t.t0 = null !== t.t1, !t.t0) {
                                        t.next = 6;
                                        break
                                    }
                                    t.t0 = void 0 !== n;
                                case 6:
                                    if (!t.t0) {
                                        t.next = 10;
                                        break
                                    }
                                    t.t2 = n, t.next = 11;
                                    break;
                                case 10:
                                    t.t2 = null;
                                case 11:
                                    return i = t.t2, t.abrupt("return", i);
                                case 13:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "toAllContent",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if ("background" === I.pageType) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return", this.toExtension({
                                        action: "send-to-all-content",
                                        message: e
                                    }));
                                case 2:
                                    r = Gt(this.ports.keys()), t.prev = 3, r.s();
                                case 5:
                                    if ((n = r.n()).done) {
                                        t.next = 11;
                                        break
                                    }
                                    return i = n.value, t.next = 9, this.toContent(e, i);
                                case 9:
                                    t.next = 5;
                                    break;
                                case 11:
                                    t.next = 16;
                                    break;
                                case 13:
                                    t.prev = 13, t.t0 = t.catch(3), r.e(t.t0);
                                case 16:
                                    return t.prev = 16, r.f(), t.finish(16);
                                case 19:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [3, 13, 16, 19]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }]), t
        }());

        function $t(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var Xt, Kt, Qt = new(function () {
                function t() {
                    var e = this;
                    n(this, t), p(this, "abortControllers", new Map), p(this, "instances", new Map), p(this, "onStorageOptionsChange", (function (t) {
                        t.options && "grantCookies" in t.options && e.checkWebRequestListener()
                    })), p(this, "onBeforeSendHeaders", (function (t) {
                        var e = t.requestHeaders;
                        if (e) {
                            var r = e.find((function (t) {
                                return "uts-cookie" === t.name.toLowerCase()
                            }));
                            if (r) return e = e.filter((function (t) {
                                return "cookie" !== t.name.toLowerCase()
                            })), r.name = "Cookie", {
                                requestHeaders: e
                            }
                        }
                    })), p(this, "onTabRemoved", (function (t) {
                        e.cancelTabRequests(t)
                    })), p(this, "onRequestsCancel", (function (t) {
                        e.cancelRequests(null === t.tabId ? t.key : "".concat(t.tabId, "_").concat(t.key))
                    }))
                }
                return o(t, [{
                    key: "init",
                    value: function () {
                        "background" === I.pageType && (this.checkWebRequestListener(), this.checkTabListener(), I.events.subscribe("STORAGE_OPTIONS_CHANGE", null, this.onStorageOptionsChange)), I.events.subscribe("REQUESTS_CANCEL", null, this.onRequestsCancel)
                    }
                }, {
                    key: "checkWebRequestListener",
                    value: function () {
                        if (E().webRequest) {
                            var t = I.storage.options.grantCookies;
                            if (t && !E().webRequest.onBeforeSendHeaders.hasListener(this.onBeforeSendHeaders)) {
                                var e = {
                                    types: ["xmlhttprequest"],
                                    urls: ["*://*.trakt.tv/*"].concat(O(x().map((function (t) {
                                        return t.hostPatterns
                                    })).flat()))
                                };
                                E().webRequest.onBeforeSendHeaders.addListener(this.onBeforeSendHeaders, e, ["blocking", "requestHeaders"])
                            } else !t && E().webRequest.onBeforeSendHeaders.hasListener(this.onBeforeSendHeaders) && E().webRequest.onBeforeSendHeaders.removeListener(this.onBeforeSendHeaders)
                        }
                    }
                }, {
                    key: "checkTabListener",
                    value: function () {
                        E().tabs.onRemoved.hasListener(this.onTabRemoved) || E().tabs.onRemoved.addListener(this.onTabRemoved)
                    }
                }, {
                    key: "cancelRequests",
                    value: function (t) {
                        var e = this.abortControllers.get(t);
                        e && (e.abort(), this.abortControllers.delete(t))
                    }
                }, {
                    key: "cancelTabRequests",
                    value: function (t) {
                        var e, r = function (t, e) {
                            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                            if (!r) {
                                if (Array.isArray(t) || (r = function (t, e) {
                                        if (t) {
                                            if ("string" == typeof t) return $t(t, e);
                                            var r = Object.prototype.toString.call(t).slice(8, -1);
                                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? $t(t, e) : void 0
                                        }
                                    }(t)) || e && t && "number" == typeof t.length) {
                                    r && (t = r);
                                    var n = 0,
                                        i = function () {};
                                    return {
                                        s: i,
                                        n: function () {
                                            return n >= t.length ? {
                                                done: !0
                                            } : {
                                                done: !1,
                                                value: t[n++]
                                            }
                                        },
                                        e: function (t) {
                                            throw t
                                        },
                                        f: i
                                    }
                                }
                                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }
                            var o = !0,
                                a = !1;
                            return {
                                s: function () {
                                    r = r.call(t)
                                },
                                n: function () {
                                    var t = r.next();
                                    return o = t.done, t
                                },
                                e: function (t) {
                                    a = !0
                                },
                                f: function t() {
                                    try {
                                        o || null == r.return || r.return()
                                    } finally {
                                        if (a) throw t
                                    }
                                }
                            }
                        }(O(this.abortControllers.entries()).filter((function (e) {
                            return y(e, 1)[0].startsWith("".concat(t, "_"))
                        })));
                        try {
                            for (r.s(); !(e = r.n()).done;) {
                                var n = y(e.value, 2),
                                    i = n[0];
                                n[1].abort(), this.abortControllers.delete(i)
                            }
                        } catch (t) {
                            r.e(t)
                        } finally {
                            r.f()
                        }
                    }
                }]), t
            }()),
            Zt = r(8194),
            te = r.n(Zt),
            ee = r(6090),
            re = r.n(ee);

        function ne() {
            function t(e, r, i) {
                var o = new RegExp(e, r);
                return n.set(o, i || n.get(e)), u(o, t.prototype)
            }

            function e(t, e) {
                var r = n.get(e);
                return Object.keys(r).reduce((function (e, n) {
                    return e[n] = t[r[n]], e
                }), Object.create(null))
            }
            ne = function (e, r) {
                return new t(e, void 0, r)
            };
            var r = RegExp.prototype,
                n = new WeakMap;
            return l(t, RegExp), t.prototype.exec = function (t) {
                var n = r.exec.call(this, t);
                return n && (n.groups = e(n, this)), n
            }, t.prototype[Symbol.replace] = function (t, i) {
                if ("string" == typeof i) {
                    var o = n.get(this);
                    return r[Symbol.replace].call(this, t, i.replace(/\$<([^>]+)>/g, (function (t, e) {
                        return "$" + o[e]
                    })))
                }
                if ("function" == typeof i) {
                    var a = this;
                    return r[Symbol.replace].call(this, t, (function () {
                        var t = arguments;
                        return "object" !== h(t[t.length - 1]) && (t = [].slice.call(t)).push(e(t, a)), i.apply(this, t)
                    }))
                }
                return r[Symbol.replace].call(this, t, i)
            }, ne.apply(this, arguments)
        }

        function ie(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function oe(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? ie(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : ie(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }(Kt = Xt || (Xt = {}))[Kt.NORMAL = 0] = "NORMAL", Kt[Kt.HIGH = 1] = "HIGH";
        var ae = new(function () {
                function t() {
                    n(this, t), p(this, "withHeaders", {}), p(this, "withRateLimit", {
                        id: "default",
                        maxRPS: {
                            "*": 2
                        }
                    })
                }
                return o(t, [{
                    key: "send",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (r = 1 < i.length && void 0 !== i[1] ? i[1] : I.tabId, n = "", "background" !== I.pageType) {
                                            t.next = 8;
                                            break
                                        }
                                        return t.next = 5, this.sendDirectly(e, r);
                                    case 5:
                                        n = t.sent, t.next = 13;
                                        break;
                                    case 8:
                                        return e.withHeaders = this.withHeaders, e.withRateLimit = this.withRateLimit, t.next = 12, Yt.toExtension({
                                            action: "send-request",
                                            request: e
                                        });
                                    case 12:
                                        n = t.sent;
                                    case 13:
                                        return t.abrupt("return", n);
                                    case 14:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "sendDirectly",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return r = 1 < a.length && void 0 !== a[1] ? a[1] : I.tabId, n = 0, i = "", t.prev = 3, t.next = 6, this.fetch(e, r);
                                    case 6:
                                        if (o = t.sent, n = o.status, i = o.data, !(200 > n || 400 <= n)) {
                                            t.next = 11;
                                            break
                                        }
                                        throw i;
                                    case 11:
                                        t.next = 16;
                                        break;
                                    case 13:
                                        throw t.prev = 13, t.t0 = t.catch(3), new Wt({
                                            request: e,
                                            status: n,
                                            text: i,
                                            isCanceled: t.t0 instanceof re().Cancel
                                        });
                                    case 16:
                                        return t.abrupt("return", i);
                                    case 17:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [3, 13]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "fetch",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a, s, c, u, l = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return i = 1 < l.length && void 0 !== l[1] ? l[1] : I.tabId, t.next = 3, this.getOptions(e, i);
                                    case 3:
                                        return o = t.sent, a = "".concat(null === i ? "" : "".concat(i, "_")).concat(e.cancelKey || "default"), Qt.abortControllers.has(a) || Qt.abortControllers.set(a, new AbortController), s = null === (r = Qt.abortControllers.get(a)) || void 0 === r ? void 0 : r.signal, c = null !== (n = e.rateLimit) && void 0 !== n ? n : this.getRateLimit(e), (u = Qt.instances.get(c.id)) || (u = te()(re().create(), {
                                            maxRPS: c.maxRPS
                                        }), Qt.instances.set(c.id, u)), t.abrupt("return", u.request({
                                            url: e.url,
                                            method: o.method,
                                            headers: o.headers,
                                            data: o.body,
                                            responseType: "text",
                                            signal: s,
                                            transformResponse: function (t) {
                                                return t
                                            },
                                            priority: e.priority || Xt.NORMAL
                                        }));
                                    case 11:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "getOptions",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return r = 1 < n.length && void 0 !== n[1] ? n[1] : I.tabId, t.t0 = e.method, t.next = 4, this.getHeaders(e, r);
                                    case 4:
                                        return t.t1 = t.sent, t.t2 = "string" == typeof e.body ? e.body : JSON.stringify(e.body), t.abrupt("return", {
                                            method: t.t0,
                                            headers: t.t1,
                                            body: t.t2
                                        });
                                    case 7:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "getHeaders",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return r = 1 < o.length && void 0 !== o[1] ? o[1] : I.tabId, n = oe(oe(oe({}, this.withHeaders), e.withHeaders || {}), {}, {
                                            "Content-Type": "string" == typeof e.body ? "application/x-www-form-urlencoded" : "application/json"
                                        }, e.headers || {}), t.next = 4, this.getCookies(e, r);
                                    case 4:
                                        return (i = t.sent) && (n["UTS-Cookie"] = i), t.abrupt("return", n);
                                    case 7:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "getCookies",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a, s = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (null !== (r = 1 < s.length && void 0 !== s[1] ? s[1] : I.tabId)) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 3:
                                        if (I.storage.options.grantCookies && E().cookies && E().webRequest) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 5:
                                        if (null != (n = ne(/https?:\/\/(?:www\.)?(?:.+?)(\/.*)?$/, {
                                                domain: 1
                                            }).exec(e.url)) && n.groups) {
                                            t.next = 8;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 8:
                                        return i = n.groups.domain, t.next = 11, E().tabs.get(r);
                                    case 11:
                                        return o = t.sent, t.next = 14, E().cookies.getAll({
                                            domain: i,
                                            storeId: o.cookieStoreId
                                        });
                                    case 14:
                                        return a = t.sent, t.abrupt("return", a.map((function (t) {
                                            return "".concat(t.name, "=").concat(t.value)
                                        })).join("; "));
                                    case 16:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "getRateLimit",
                    value: function (t) {
                        var e, r;
                        return t.withRateLimit ? (e = t.withRateLimit.id, (r = t.withRateLimit.maxRPS[t.method]) ? {
                            id: "".concat(e, "_").concat(t.method),
                            maxRPS: r
                        } : {
                            id: e,
                            maxRPS: r = t.withRateLimit.maxRPS["*"]
                        }) : (e = this.withRateLimit.id, (r = this.withRateLimit.maxRPS[t.method]) ? {
                            id: "".concat(e, "_").concat(t.method),
                            maxRPS: r
                        } : {
                            id: e,
                            maxRPS: r = this.withRateLimit.maxRPS["*"]
                        })
                    }
                }]), t
            }()),
            se = function (t) {
                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ae;
                return new Proxy(e, {
                    get: function (r, n, i) {
                        return "withHeaders" === n ? oe(oe({}, e.withHeaders), t) : Reflect.get(r, n, i)
                    }
                })
            };

        function ce(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function ue(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? ce(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : ce(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }

        function le(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return he(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? he(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function he(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var fe = new(function () {
                function t() {
                    n(this, t), p(this, "DATABASE_URL", "".concat(I.DATABASE_URL, "/correction")), p(this, "SUGGESTIONS_DATABASE_URL", "".concat(this.DATABASE_URL, "/suggestions"))
                }
                return o(t, [{
                    key: "getSuggestionDatabaseId",
                    value: function (t) {
                        return "".concat(t.type, "_").concat(t.id.toString())
                    }
                }, {
                    key: "getSuggestionUrl",
                    value: function (t) {
                        return "https://trakt.tv/".concat(t.type, "s/").concat(t.id.toString())
                    }
                }, {
                    key: "loadSuggestions",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a, s, c, u, l, h, f, p, d, v, g, y, b, w, x, k;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (I.storage.options.sendReceiveSuggestions) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return", e);
                                    case 2:
                                        if (e.some((function (t) {
                                                return void 0 === t.suggestions
                                            }))) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return", e);
                                    case 5:
                                        return r = e.map((function (t) {
                                            return t.clone()
                                        })), t.next = 8, Ht.get("suggestions");
                                    case 8:
                                        n = t.sent, t.prev = 9, i = [], o = le(r), t.prev = 12, o.s();
                                    case 14:
                                        if ((a = o.n()).done) {
                                            t.next = 23;
                                            break
                                        }
                                        if (void 0 === (s = a.value).suggestions) {
                                            t.next = 18;
                                            break
                                        }
                                        return t.abrupt("continue", 21);
                                    case 18:
                                        c = s.getDatabaseId(), void 0 === (u = n.get(c)) ? i.push(s) : s.suggestions = u;
                                    case 21:
                                        t.next = 14;
                                        break;
                                    case 23:
                                        t.next = 28;
                                        break;
                                    case 25:
                                        t.prev = 25, t.t0 = t.catch(12), o.e(t.t0);
                                    case 28:
                                        return t.prev = 28, o.f(), t.finish(28);
                                    case 31:
                                        if (!(0 < i.length)) {
                                            t.next = 44;
                                            break
                                        }
                                        return t.prev = 32, l = i.map((function (t) {
                                            return t.getDatabaseId()
                                        })).join(","), t.next = 36, ae.send({
                                            method: "GET",
                                            url: "".concat(this.SUGGESTIONS_DATABASE_URL, "?ids=").concat(l)
                                        });
                                    case 36:
                                        h = t.sent, f = JSON.parse(h), p = le(i);
                                        try {
                                            for (p.s(); !(d = p.n()).done;) v = d.value, g = v.getDatabaseId(), y = f.result[g], v.suggestions = null == y ? void 0 : y.sort((function (t, e) {
                                                return t.count > e.count ? -1 : e.count > t.count ? 1 : 0
                                            }))
                                        } catch (t) {
                                            p.e(t)
                                        } finally {
                                            p.f()
                                        }
                                        t.next = 44;
                                        break;
                                    case 42:
                                        t.prev = 42, t.t1 = t.catch(32);
                                    case 44:
                                        t.next = 48;
                                        break;
                                    case 46:
                                        t.prev = 46, t.t2 = t.catch(9);
                                    case 48:
                                        b = le(r);
                                        try {
                                            for (b.s(); !(w = b.n()).done;) x = w.value, k = x.getDatabaseId(), x.suggestions = x.suggestions || null, n.set(k, x.suggestions)
                                        } catch (t) {
                                            b.e(t)
                                        } finally {
                                            b.f()
                                        }
                                        return t.next = 52, Ht.set({
                                            suggestions: n
                                        });
                                    case 52:
                                        return t.abrupt("return", r);
                                    case 53:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [9, 46],
                                [12, 25, 28, 31],
                                [32, 42]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "saveSuggestion",
                    value: function () {
                        var t = e(m().mark((function t(e, r) {
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (I.storage.options.sendReceiveSuggestions) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 2:
                                        return t.next = 4, ae.send({
                                            method: "PUT",
                                            url: this.SUGGESTIONS_DATABASE_URL,
                                            body: {
                                                corrections: [{
                                                    id: e.getDatabaseId(),
                                                    suggestions: [ue(ue({}, r), {}, {
                                                        count: 1
                                                    })]
                                                }]
                                            }
                                        });
                                    case 4:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t
            }()),
            pe = function () {
                function t() {
                    n(this, t), p(this, "API_VERSION", void 0), p(this, "HOST_URL", void 0), p(this, "API_URL", void 0), p(this, "AUTHORIZE_URL", void 0), p(this, "REDIRECT_URL", void 0), p(this, "REQUEST_TOKEN_URL", void 0), p(this, "REVOKE_TOKEN_URL", void 0), p(this, "SEARCH_URL", void 0), p(this, "SHOWS_URL", void 0), p(this, "SCROBBLE_URL", void 0), p(this, "SYNC_URL", void 0), p(this, "SETTINGS_URL", void 0), p(this, "requests", function (t) {
                        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ae;
                        return new Proxy(e, {
                            get: function (r, n, i) {
                                return "withRateLimit" === n ? oe(oe({}, e.withRateLimit), t) : Reflect.get(r, n, i)
                            }
                        })
                    }({
                        id: "trakt-api",
                        maxRPS: {
                            "*": 1,
                            GET: 3
                        }
                    })), p(this, "isActivated", !1), this.API_VERSION = "2", this.HOST_URL = "https://trakt.tv", this.API_URL = "https://api.trakt.tv", this.AUTHORIZE_URL = "".concat(this.HOST_URL, "/oauth/authorize"), this.REDIRECT_URL = "".concat(this.HOST_URL, "/apps"), this.REQUEST_TOKEN_URL = "".concat(this.API_URL, "/oauth/token"), this.REVOKE_TOKEN_URL = "".concat(this.API_URL, "/oauth/revoke"), this.SEARCH_URL = "".concat(this.API_URL, "/search"), this.SHOWS_URL = "".concat(this.API_URL, "/shows"), this.SCROBBLE_URL = "".concat(this.API_URL, "/scrobble"), this.SYNC_URL = "".concat(this.API_URL, "/sync/history"), this.SETTINGS_URL = "".concat(this.API_URL, "/users/settings")
                }
                return o(t, [{
                    key: "activate",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (!this.isActivated) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 2:
                                        return r = {
                                            "trakt-api-key": I.clientId,
                                            "trakt-api-version": this.API_VERSION
                                        }, t.next = 5, I.storage.get("auth");
                                    case 5:
                                        n = t.sent, null !== (e = n.auth) && void 0 !== e && e.access_token && (r.Authorization = "Bearer ".concat(n.auth.access_token)), this.requests = se(r, this.requests), this.isActivated = !0;
                                    case 9:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t
            }();

        function de(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function me(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? de(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : de(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }

        function ve(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var r, n = s(t);
                if (e) {
                    var i = s(this).constructor;
                    r = Reflect.construct(n, arguments, i)
                } else r = n.apply(this, arguments);
                return f(this, r)
            }
        }
        var ge, ye = function () {
                function t(e) {
                    n(this, t), p(this, "id", void 0), p(this, "tmdbId", void 0), p(this, "syncId", void 0), p(this, "title", void 0), p(this, "year", void 0), p(this, "releaseDate", void 0), p(this, "watchedAt", void 0), p(this, "progress", void 0), this.id = e.id, this.tmdbId = e.tmdbId, this.syncId = e.syncId, this.title = e.title, this.year = e.year, this.releaseDate = e.releaseDate, this.watchedAt = e.watchedAt, this.progress = e.progress ? Math.round(100 * e.progress) / 100 : 0
                }
                return o(t, [{
                    key: "save",
                    value: function () {
                        return {
                            id: this.id,
                            tmdbId: this.tmdbId,
                            syncId: this.syncId,
                            title: this.title,
                            year: this.year,
                            releaseDate: this.releaseDate,
                            watchedAt: this.watchedAt,
                            progress: this.progress
                        }
                    }
                }]), t
            }(),
            be = function (t) {
                function e(t) {
                    var i;
                    return n(this, e), p(a(i = r.call(this, t)), "type", "episode"), p(a(i), "season", void 0), p(a(i), "number", void 0), p(a(i), "show", void 0), i.season = t.season, i.number = t.number, i.show = new we(t.show), i
                }
                l(e, t);
                var r = ve(e);
                return o(e, [{
                    key: "save",
                    value: function () {
                        return me(me({}, c(s(e.prototype), "save", this).call(this)), {}, {
                            type: this.type,
                            season: this.season,
                            number: this.number,
                            show: this.show.save()
                        })
                    }
                }, {
                    key: "getDatabaseId",
                    value: function () {
                        return "episode_".concat(this.id.toString())
                    }
                }, {
                    key: "getHistoryUrl",
                    value: function () {
                        return "https://trakt.tv/users/me/history?episode=".concat(this.id)
                    }
                }, {
                    key: "clone",
                    value: function () {
                        return new e(this)
                    }
                }]), e
            }(ye),
            we = function (t) {
                function e(t) {
                    var i;
                    return n(this, e), p(a(i = r.call(this, t)), "type", "show"), i
                }
                l(e, t);
                var r = ve(e);
                return o(e, [{
                    key: "save",
                    value: function () {
                        return me(me({}, c(s(e.prototype), "save", this).call(this)), {}, {
                            type: this.type
                        })
                    }
                }, {
                    key: "getDatabaseId",
                    value: function () {
                        return "show_".concat(this.id.toString())
                    }
                }, {
                    key: "getHistoryUrl",
                    value: function () {
                        return "https://trakt.tv/users/me/history/episodes?show=".concat(this.id)
                    }
                }, {
                    key: "clone",
                    value: function () {
                        return new e(this)
                    }
                }]), e
            }(ye),
            xe = function (t) {
                function e(t) {
                    var i;
                    return n(this, e), p(a(i = r.call(this, t)), "type", "movie"), i
                }
                l(e, t);
                var r = ve(e);
                return o(e, [{
                    key: "save",
                    value: function () {
                        return me(me({}, c(s(e.prototype), "save", this).call(this)), {}, {
                            type: this.type
                        })
                    }
                }, {
                    key: "getDatabaseId",
                    value: function () {
                        return "movie_".concat(this.id.toString())
                    }
                }, {
                    key: "getHistoryUrl",
                    value: function () {
                        return "https://trakt.tv/users/me/history?movie=".concat(this.id)
                    }
                }, {
                    key: "clone",
                    value: function () {
                        return new e(this)
                    }
                }]), e
            }(ye),
            ke = function (t) {
                switch (t.type) {
                    case "episode":
                        return new be(t);
                    case "movie":
                        return new xe(t)
                }
            };

        function Se(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Oe(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? Se(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : Se(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }

        function Ae(t) {
            var e = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                } catch (t) {
                    return !1
                }
            }();
            return function () {
                var r, n = s(t);
                if (e) {
                    var i = s(this).constructor;
                    r = Reflect.construct(n, arguments, i)
                } else r = n.apply(this, arguments);
                return f(this, r)
            }
        }
        var Ee = (p(ge = {}, "Dynasty", "Dynasty reboot"), p(ge, "Shameless (U.S.)", "Shameless"), p(ge, "Star Wars: The Clone Wars", '"Star Wars: The Clone Wars"'), p(ge, "The 100", '"The 100"'), p(ge, "The Avengers", '"The Avengers"'), p(ge, "The Blind Side", '"The Blind Side"'), p(ge, "The House of Cards Trilogy (BBC)", "The House of Cards"), p(ge, "The Office (U.S.)", "The Office (US)"), p(ge, "The Seven Deadly Sins", '"The Seven Deadly Sins"'), p(ge, "Young and Hungry", '"Young and Hungry"'), ge),
            Te = function () {
                function t(e) {
                    var r, i, o, a, s;
                    n(this, t), p(this, "serviceId", void 0), p(this, "id", void 0), p(this, "title", void 0), p(this, "year", void 0), p(this, "watchedAt", void 0), p(this, "progress", void 0), p(this, "isHidden", void 0), p(this, "isSelected", void 0), p(this, "index", void 0), p(this, "suggestions", void 0), p(this, "imageUrl", void 0), p(this, "isLoading", void 0), p(this, "trakt", void 0), this.serviceId = e.serviceId, this.title = Ee[e.title] || e.title, this.year = null !== (r = e.year) && void 0 !== r ? r : 0, this.watchedAt = e.watchedAt, this.progress = e.progress ? Math.round(100 * e.progress) / 100 : 0, this.isHidden = null !== (i = e.isHidden) && void 0 !== i && i, this.isSelected = null !== (o = e.isSelected) && void 0 !== o && o, this.index = null !== (a = e.index) && void 0 !== a ? a : 0, this.suggestions = e.suggestions, this.imageUrl = e.imageUrl, this.isLoading = null !== (s = e.isLoading) && void 0 !== s && s, this.id = e.id || this.generateId()
                }
                return o(t, [{
                    key: "save",
                    value: function () {
                        return {
                            serviceId: this.serviceId,
                            id: this.id,
                            title: this.title,
                            year: this.year,
                            watchedAt: this.watchedAt,
                            progress: this.progress,
                            index: this.index,
                            suggestions: this.suggestions,
                            imageUrl: this.imageUrl
                        }
                    }
                }, {
                    key: "doHide",
                    value: function () {
                        return I.storage.syncOptions.hideSynced && this.trakt && !!this.trakt.watchedAt || this.progress < I.storage.syncOptions.minPercentageWatched
                    }
                }, {
                    key: "isSelectable",
                    value: function () {
                        return !(this.isLoading || !this.trakt || this.trakt.watchedAt || this.doHide())
                    }
                }, {
                    key: "isMissingWatchedDate",
                    value: function () {
                        var t, e, r = I.storage.syncOptions,
                            n = r.addWithReleaseDate,
                            i = r.addWithReleaseDateMissing;
                        return n ? i ? !(this.watchedAt || null !== (e = this.trakt) && void 0 !== e && e.releaseDate) : !(null !== (t = this.trakt) && void 0 !== t && t.releaseDate) : !this.watchedAt
                    }
                }, {
                    key: "getWatchedDate",
                    value: function () {
                        var t, e, r, n = I.storage.syncOptions,
                            i = n.addWithReleaseDate,
                            o = n.addWithReleaseDateMissing;
                        return i ? o ? null !== (e = this.watchedAt) && void 0 !== e ? e : null === (r = this.trakt) || void 0 === r ? void 0 : r.releaseDate : null === (t = this.trakt) || void 0 === t ? void 0 : t.releaseDate : this.watchedAt
                    }
                }, {
                    key: "getDatabaseId",
                    value: function () {
                        return "".concat(this.serviceId, "_").concat(this.id)
                    }
                }]), t
            }(),
            Ie = function (t) {
                function e(t) {
                    var i;
                    return n(this, e), p(a(i = r.call(this, t)), "type", "episode"), p(a(i), "season", void 0), p(a(i), "number", void 0), p(a(i), "show", void 0), p(a(i), "trakt", void 0), i.season = t.season, i.number = t.number, i.show = new _e(t.show), i.trakt = t.trakt && new be(t.trakt), i
                }
                l(e, t);
                var r = Ae(e);
                return o(e, [{
                    key: "save",
                    value: function () {
                        var t;
                        return Oe(Oe({}, c(s(e.prototype), "save", this).call(this)), {}, {
                            type: this.type,
                            season: this.season,
                            number: this.number,
                            show: this.show.save(),
                            trakt: null === (t = this.trakt) || void 0 === t ? void 0 : t.save()
                        })
                    }
                }, {
                    key: "generateId",
                    value: function () {
                        var t, e, r, n, i, o;
                        return "".concat(this.show.title.toLowerCase().replace(/[^A-Za-z0-9]/g, ""), "-s").concat(null !== (t = null === (e = this.season) || void 0 === e ? void 0 : e.toString()) && void 0 !== t ? t : "0", "-e").concat(null !== (r = null === (n = this.number) || void 0 === n ? void 0 : n.toString()) && void 0 !== r ? r : "0", "-").concat(null !== (i = null === (o = this.title) || void 0 === o ? void 0 : o.toLowerCase().replace(/[^A-Za-z0-9]/g, "")) && void 0 !== i ? i : "")
                    }
                }, {
                    key: "getFullTitle",
                    value: function () {
                        var t, e, r, n, i;
                        return "".concat(this.show.title, " S").concat(null !== (t = null === (e = this.season) || void 0 === e ? void 0 : e.toString()) && void 0 !== t ? t : "0", " E").concat(null !== (r = null === (n = this.number) || void 0 === n ? void 0 : n.toString()) && void 0 !== r ? r : "0", " - ").concat(null !== (i = this.title) && void 0 !== i ? i : "Untitled")
                    }
                }, {
                    key: "clone",
                    value: function () {
                        return new e(this)
                    }
                }]), e
            }(Te),
            _e = function (t) {
                function e(t) {
                    var i;
                    return n(this, e), p(a(i = r.call(this, t)), "type", "show"), p(a(i), "trakt", void 0), i.trakt = t.trakt && new we(t.trakt), i
                }
                l(e, t);
                var r = Ae(e);
                return o(e, [{
                    key: "save",
                    value: function () {
                        var t;
                        return Oe(Oe({}, c(s(e.prototype), "save", this).call(this)), {}, {
                            type: this.type,
                            trakt: null === (t = this.trakt) || void 0 === t ? void 0 : t.save()
                        })
                    }
                }, {
                    key: "generateId",
                    value: function () {
                        return this.title.toLowerCase().replace(/[^A-Za-z0-9]/g, "")
                    }
                }, {
                    key: "getFullTitle",
                    value: function () {
                        return "".concat(this.title, " (").concat(this.year, ")")
                    }
                }, {
                    key: "clone",
                    value: function () {
                        return new e(this)
                    }
                }]), e
            }(Te),
            Re = function (t) {
                function e(t) {
                    var i;
                    return n(this, e), p(a(i = r.call(this, t)), "type", "movie"), p(a(i), "trakt", void 0), i.trakt = t.trakt && new xe(t.trakt), i
                }
                l(e, t);
                var r = Ae(e);
                return o(e, [{
                    key: "save",
                    value: function () {
                        var t;
                        return Oe(Oe({}, c(s(e.prototype), "save", this).call(this)), {}, {
                            type: this.type,
                            trakt: null === (t = this.trakt) || void 0 === t ? void 0 : t.save()
                        })
                    }
                }, {
                    key: "generateId",
                    value: function () {
                        return this.title.toLowerCase().replace(/[^A-Za-z0-9]/g, "")
                    }
                }, {
                    key: "getFullTitle",
                    value: function () {
                        return "".concat(this.title, " (").concat(this.year, ")")
                    }
                }, {
                    key: "clone",
                    value: function () {
                        return new e(this)
                    }
                }]), e
            }(Te),
            Ce = function (t) {
                switch (t.type) {
                    case "episode":
                        return new Ie(t);
                    case "movie":
                        return new Re(t)
                }
            },
            Pe = function (t) {
                return t instanceof Te
            };

        function je() {
            function t(e, r, i) {
                var o = new RegExp(e, r);
                return n.set(o, i || n.get(e)), u(o, t.prototype)
            }

            function e(t, e) {
                var r = n.get(e);
                return Object.keys(r).reduce((function (e, n) {
                    return e[n] = t[r[n]], e
                }), Object.create(null))
            }
            je = function (e, r) {
                return new t(e, void 0, r)
            };
            var r = RegExp.prototype,
                n = new WeakMap;
            return l(t, RegExp), t.prototype.exec = function (t) {
                var n = r.exec.call(this, t);
                return n && (n.groups = e(n, this)), n
            }, t.prototype[Symbol.replace] = function (t, i) {
                if ("string" == typeof i) {
                    var o = n.get(this);
                    return r[Symbol.replace].call(this, t, i.replace(/\$<([^>]+)>/g, (function (t, e) {
                        return "$" + o[e]
                    })))
                }
                if ("function" == typeof i) {
                    var a = this;
                    return r[Symbol.replace].call(this, t, (function () {
                        var t = arguments;
                        return "object" !== h(t[t.length - 1]) && (t = [].slice.call(t)).push(e(t, a)), i.apply(this, t)
                    }))
                }
                return r[Symbol.replace].call(this, t, i)
            }, je.apply(this, arguments)
        }

        function Le(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function De(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? Le(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : Le(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }
        var Ne = new(function (t) {
            function r() {
                return n(this, r), i.call(this)
            }
            l(r, t);
            var i = function (t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var r, n = s(t);
                    if (e) {
                        var i = s(this).constructor;
                        r = Reflect.construct(n, arguments, i)
                    } else r = n.apply(this, arguments);
                    return f(this, r)
                }
            }(r);
            return o(r, [{
                key: "find",
                value: function () {
                    var t = e(m().mark((function t(e, r, n) {
                        var i, o, a, s, c, u, l, h, f, p, d, v, g, y, b = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (i = 3 < b.length && void 0 !== b[3] ? b[3] : "default", o = null, a = e.getDatabaseId(), s = n ? "id" in n ? fe.getSuggestionDatabaseId(n) : r.urlsToTraktItems.get(n.url) : r.itemsToTraktItems.get(a), !(c = s ? r.traktItems.get(s) : null) || "show" === c.type) {
                                        t.next = 8;
                                        break
                                    }
                                    return o = ke(c), t.abrupt("return", o);
                                case 8:
                                    if (t.prev = 8, !n) {
                                        t.next = 15;
                                        break
                                    }
                                    return t.next = 12, this.findExactItem(n, r, i);
                                case 12:
                                    u = t.sent, t.next = 24;
                                    break;
                                case 15:
                                    if ("episode" !== e.type) {
                                        t.next = 21;
                                        break
                                    }
                                    return t.next = 18, this.findEpisode(e, r, i);
                                case 18:
                                    u = t.sent, t.next = 24;
                                    break;
                                case 21:
                                    return t.next = 23, this.findItem(e, i);
                                case 23:
                                    u = t.sent;
                                case 24:
                                    if ("episode" in u ? (h = (l = u).episode, f = l.show, p = h.first_aired, d = p ? jt.unix(p) : void 0, o = new be({
                                            id: h.ids.trakt,
                                            tmdbId: h.ids.tmdb,
                                            title: h.title,
                                            year: f.year,
                                            season: h.season,
                                            number: h.number,
                                            releaseDate: d,
                                            show: {
                                                id: f.ids.trakt,
                                                tmdbId: f.ids.tmdb,
                                                title: f.title,
                                                year: f.year
                                            }
                                        })) : (v = u.movie, g = v.released, y = g ? jt.unix(g) : void 0, o = new xe({
                                            id: v.ids.trakt,
                                            tmdbId: v.ids.tmdb,
                                            title: v.title,
                                            year: v.year,
                                            releaseDate: y
                                        })), "content" !== I.pageType) {
                                        t.next = 28;
                                        break
                                    }
                                    return t.next = 28, I.events.dispatch("SEARCH_SUCCESS", null, {
                                        searchItem: u
                                    });
                                case 28:
                                    t.next = 36;
                                    break;
                                case 30:
                                    if (t.prev = 30, t.t0 = t.catch(8), "content" !== I.pageType || !I.errors.validate(t.t0)) {
                                        t.next = 35;
                                        break
                                    }
                                    return t.next = 35, I.events.dispatch("SEARCH_ERROR", null, {
                                        error: t.t0
                                    });
                                case 35:
                                    throw t.t0;
                                case 36:
                                    return o && (s = o.getDatabaseId(), r.itemsToTraktItems.set(a, s), r.traktItems.set(s, De(De({}, o.save()), {}, {
                                        syncId: void 0,
                                        watchedAt: void 0
                                    })), n && "url" in n && r.urlsToTraktItems.set(n.url, s)), t.abrupt("return", o);
                                case 38:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [8, 30]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "findExactItem",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i, o, a, s, c, u = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = 2 < u.length && void 0 !== u[2] ? u[2] : "default", i = "id" in e ? "/search/trakt/".concat(e.id.toString(), "?type=").concat(e.type, "&extended=full") : "".concat(e.url, "?extended=full"), t.next = 4, this.activate();
                                case 4:
                                    return t.next = 6, this.requests.send({
                                        url: "".concat(this.API_URL).concat(i),
                                        method: "GET",
                                        cancelKey: n
                                    });
                                case 6:
                                    if (o = t.sent, a = JSON.parse(o), !Array.isArray(a)) {
                                        t.next = 12;
                                        break
                                    }
                                    return t.abrupt("return", a[0]);
                                case 12:
                                    if (!("season" in a)) {
                                        t.next = 20;
                                        break
                                    }
                                    return s = i.replace(/\/seasons\/.*/, ""), t.next = 16, this.findShow(s, r, n);
                                case 16:
                                    return c = t.sent, t.abrupt("return", {
                                        episode: a,
                                        show: c.show
                                    });
                                case 20:
                                    return t.abrupt("return", {
                                        movie: a
                                    });
                                case 21:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "findItem",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s, c = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r = 1 < c.length && void 0 !== c[1] ? c[1] : "default", t.next = 3, this.activate();
                                case 3:
                                    return t.next = 5, this.requests.send({
                                        url: "".concat(this.SEARCH_URL, "/").concat(e.type, "?query=").concat(encodeURIComponent(e.title), "&extended=full"),
                                        method: "GET",
                                        cancelKey: r
                                    });
                                case 5:
                                    if (i = t.sent, 1 === (o = JSON.parse(i)).length ? n = o[0] : (a = e.title.toLowerCase(), s = e.year, !(n = o.find((function (t) {
                                            var e = "show" in t ? t.show : t.movie,
                                                r = e.title.toLowerCase(),
                                                n = e.year;
                                            return !(r !== a || s && n && s !== n)
                                        }))) && (n = o[0])), n) {
                                        t.next = 10;
                                        break
                                    }
                                    throw new Wt({
                                        status: 404,
                                        text: i,
                                        extra: {
                                            item: e.save()
                                        }
                                    });
                                case 10:
                                    return t.abrupt("return", n);
                                case 11:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "findShow",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i, o, a, s, c, u = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (n = 2 < u.length && void 0 !== u[2] ? u[2] : "default", i = Pe(e) ? "show?query=".concat(encodeURIComponent(e.show.title)) : e, o = r.urlsToTraktItems.get(i), a = o ? r.traktItems.get(o) : null) {
                                        t.next = 21;
                                        break
                                    }
                                    if (!Pe(e)) {
                                        t.next = 11;
                                        break
                                    }
                                    return t.next = 8, this.findItem(e.show, n);
                                case 8:
                                    s = t.sent.show, t.next = 17;
                                    break;
                                case 11:
                                    return t.next = 13, this.activate();
                                case 13:
                                    return t.next = 15, this.requests.send({
                                        url: "".concat(this.API_URL).concat(i),
                                        method: "GET",
                                        cancelKey: n
                                    });
                                case 15:
                                    c = t.sent, s = JSON.parse(c);
                                case 17:
                                    a = {
                                        type: "show",
                                        id: s.ids.trakt,
                                        tmdbId: s.ids.tmdb,
                                        title: s.title,
                                        year: s.year
                                    }, o = "show_".concat(a.id.toString()), r.traktItems.set(o, a), r.urlsToTraktItems.set(i, o);
                                case 21:
                                    return t.abrupt("return", {
                                        show: {
                                            ids: {
                                                trakt: a.id,
                                                tmdb: a.tmdbId
                                            },
                                            title: a.title,
                                            year: a.year
                                        }
                                    });
                                case 22:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "findEpisode",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i, o, a, s, c, u = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = 2 < u.length && void 0 !== u[2] ? u[2] : "default", t.next = 3, this.findShow(e, r, n);
                                case 3:
                                    return o = t.sent, t.next = 6, this.activate();
                                case 6:
                                    return t.next = 8, this.requests.send({
                                        url: this.getEpisodeUrl(e, o.show.ids.trakt),
                                        method: "GET",
                                        cancelKey: n
                                    });
                                case 8:
                                    if (a = t.sent, s = JSON.parse(a), !Array.isArray(s)) {
                                        t.next = 15;
                                        break
                                    }
                                    return c = s, t.abrupt("return", this.findEpisodeByTitle(e, o, c));
                                case 15:
                                    return i = {
                                        episode: s
                                    }, t.abrupt("return", Object.assign({}, i, o));
                                case 17:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "findEpisodeByTitle",
                value: function (t, e, r) {
                    var n = this,
                        i = r.find((function (e) {
                            return e.episode.title && t.title && (n.formatEpisodeTitle(e.episode.title) === n.formatEpisodeTitle(t.title) || /^Episode \d+$/.test(e.episode.title)) && (n.formatEpisodeTitle(e.show.title).includes(n.formatEpisodeTitle(t.show.title)) || n.formatEpisodeTitle(t.title).includes(n.formatEpisodeTitle(e.show.title)))
                        }));
                    if (!i) throw new Wt({
                        status: 404,
                        text: "Episode not found.",
                        extra: {
                            item: t.save(),
                            showItem: e
                        }
                    });
                    return i
                }
            }, {
                key: "getEpisodeUrl",
                value: function (t, e) {
                    var r = "";
                    return t.season && t.number ? r = "".concat(this.SHOWS_URL, "/").concat(e, "/seasons/").concat(t.season, "/episodes/").concat(t.number, "?extended=full") : t.title ? r = "".concat(this.SEARCH_URL, "/episode?query=").concat(encodeURIComponent(t.title), "&extended=full") : t.season && (r = "".concat(this.SHOWS_URL, "/").concat(e, "/seasons/").concat(t.season, "?extended=full")), r
                }
            }, {
                key: "formatEpisodeTitle",
                value: function (t) {
                    return t.toLowerCase().replace(je(/(^|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])(?:a|an|the)([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g, {
                        begin: 1,
                        end: 2
                    }), "$<begin>$<end>").replace(/\s/g, "")
                }
            }]), r
        }(pe));

        function Ue(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Me(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Me(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function Me(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var He = new(function (t) {
            function r() {
                return n(this, r), i.call(this)
            }
            l(r, t);
            var i = function (t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var r, n = s(t);
                    if (e) {
                        var i = s(this).constructor;
                        r = Reflect.construct(n, arguments, i)
                    } else r = n.apply(this, arguments);
                    return f(this, r)
                }
            }(r);
            return o(r, [{
                key: "loadHistory",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i, o, a, s, c, u, l, h, f, p, d, v = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (i = !!(2 < v.length && void 0 !== v[2]) && v[2], o = 3 < v.length && void 0 !== v[3] ? v[3] : "default", a = (null === (n = e.trakt) || void 0 === n ? void 0 : n.watchedAt) || e.getWatchedDate(), e.trakt && a) {
                                        t.next = 5;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 5:
                                    if (s = e.trakt.getDatabaseId(), c = i ? null : r.get(s)) {
                                        t.next = 15;
                                        break
                                    }
                                    return t.next = 10, this.activate();
                                case 10:
                                    return t.next = 12, this.requests.send({
                                        url: this.getUrl(e),
                                        method: "GET",
                                        cancelKey: o,
                                        priority: Xt.HIGH
                                    });
                                case 12:
                                    u = t.sent, c = JSON.parse(u), r.set(s, c);
                                case 15:
                                    l = null, h = Ue(c), t.prev = 17, h.s();
                                case 19:
                                    if ((f = h.n()).done) {
                                        t.next = 30;
                                        break
                                    }
                                    if (p = f.value, d = {
                                            id: p.id,
                                            watched_at: jt.unix(p.watched_at)
                                        }, a !== d.watched_at) {
                                        t.next = 27;
                                        break
                                    }
                                    return l = d, t.abrupt("break", 30);
                                case 27:
                                    jt.dateDiff(a, d.watched_at, 93600) && (l = d);
                                case 28:
                                    t.next = 19;
                                    break;
                                case 30:
                                    t.next = 35;
                                    break;
                                case 32:
                                    t.prev = 32, t.t0 = t.catch(17), h.e(t.t0);
                                case 35:
                                    return t.prev = 35, h.f(), t.finish(35);
                                case 38:
                                    l ? (e.trakt.syncId = l.id, e.trakt.watchedAt = l.watched_at) : e.trakt.watchedAt = null;
                                case 39:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [17, 32, 35, 38]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "removeHistory",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (null !== (r = e.trakt) && void 0 !== r && r.syncId) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    return t.next = 4, this.activate();
                                case 4:
                                    return t.next = 6, this.requests.send({
                                        url: "".concat(this.SYNC_URL, "/remove"),
                                        method: "POST",
                                        body: {
                                            ids: [e.trakt.syncId]
                                        }
                                    });
                                case 6:
                                    e.trakt.syncId = void 0, e.trakt.watchedAt = void 0;
                                case 8:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "getUrl",
                value: function (t) {
                    return t.trakt ? "episode" === t.trakt.type ? "".concat(this.SYNC_URL, "/episodes/").concat(t.trakt.id) : "".concat(this.SYNC_URL, "/movies/").concat(t.trakt.id) : ""
                }
            }, {
                key: "sync",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i, o, a, s, c, u, l, h, f, p, d = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = 2 < d.length && void 0 !== d[2] ? d[2] : "sync", i = [], t.prev = 2, o = {
                                        episodes: r.filter((function (t) {
                                            return "episode" === t.type
                                        })).map((function (t) {
                                            var e;
                                            return {
                                                ids: {
                                                    trakt: null === (e = t.trakt) || void 0 === e ? void 0 : e.id
                                                },
                                                watched_at: jt.convertToISOString(t.getWatchedDate())
                                            }
                                        })),
                                        movies: r.filter((function (t) {
                                            return "movie" === t.type
                                        })).map((function (t) {
                                            var e;
                                            return {
                                                ids: {
                                                    trakt: null === (e = t.trakt) || void 0 === e ? void 0 : e.id
                                                },
                                                watched_at: jt.convertToISOString(t.getWatchedDate())
                                            }
                                        }))
                                    }, t.next = 6, this.activate();
                                case 6:
                                    return t.next = 8, this.requests.send({
                                        url: this.SYNC_URL,
                                        method: "POST",
                                        body: o,
                                        cancelKey: n
                                    });
                                case 8:
                                    return a = t.sent, s = JSON.parse(a), c = {
                                        episodes: s.not_found.episodes.map((function (t) {
                                            return t.ids.trakt
                                        })),
                                        movies: s.not_found.movies.map((function (t) {
                                            return t.ids.trakt
                                        }))
                                    }, t.next = 13, Ht.get("traktHistoryItems");
                                case 13:
                                    u = t.sent, l = Ue(r), t.prev = 15, l.s();
                                case 17:
                                    if ((h = l.n()).done) {
                                        t.next = 27;
                                        break
                                    }
                                    if (!(f = h.value).trakt || ("episode" !== f.type || c.episodes.includes(f.trakt.id)) && ("movie" !== f.type || c.movies.includes(f.trakt.id))) {
                                        t.next = 25;
                                        break
                                    }
                                    return p = f.clone(), t.next = 23, He.loadHistory(p, u, !0, n);
                                case 23:
                                    p.isSelected = !1, i.push(p);
                                case 25:
                                    t.next = 17;
                                    break;
                                case 27:
                                    t.next = 32;
                                    break;
                                case 29:
                                    t.prev = 29, t.t0 = t.catch(15), l.e(t.t0);
                                case 32:
                                    return t.prev = 32, l.f(), t.finish(32);
                                case 35:
                                    return t.next = 37, Ht.set({
                                        traktHistoryItems: u
                                    });
                                case 37:
                                    return t.next = 39, e.update(i, !0);
                                case 39:
                                    return t.next = 41, I.events.dispatch("HISTORY_SYNC_SUCCESS", null, {
                                        added: s.added
                                    });
                                case 41:
                                    t.next = 51;
                                    break;
                                case 43:
                                    if (t.prev = 43, t.t1 = t.catch(2), !I.errors.validate(t.t1)) {
                                        t.next = 51;
                                        break
                                    }
                                    return I.errors.error("Failed to sync history.", t.t1), t.next = 49, e.update(i, !0);
                                case 49:
                                    return t.next = 51, I.events.dispatch("HISTORY_SYNC_ERROR", null, {
                                        error: t.t1
                                    });
                                case 51:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [2, 43],
                            [15, 29, 32, 35]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }]), r
        }(pe));

        function qe(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Fe(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? qe(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : qe(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }

        function Be(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return We(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? We(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function We(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var Ge = new Map,
            Je = function (t) {
                var e = t || "multiple";
                Ge.has(e) || Ge.set(e, new ze(e));
                var r = Ge.get(e);
                if (!r) throw new Error("Sync store not registered for ".concat(t || "null"));
                return r
            },
            ze = function () {
                function t(e) {
                    n(this, t), p(this, "id", void 0), p(this, "data", void 0), this.id = e, this.data = t.getInitialData()
                }
                return o(t, [{
                    key: "selectAll",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i, o;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        e = [], r = Be(this.data.items);
                                        try {
                                            for (r.s(); !(n = r.n()).done;) !(i = n.value).isSelected && i.isSelectable() && ((o = i.clone()).isSelected = !0, e.push(o))
                                        } catch (t) {
                                            r.e(t)
                                        } finally {
                                            r.f()
                                        }
                                        return t.next = 5, this.update(e, !0);
                                    case 5:
                                        return t.abrupt("return", this);
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "selectNone",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i, o;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        e = [], r = Be(this.data.items);
                                        try {
                                            for (r.s(); !(n = r.n()).done;)(i = n.value).isSelected && ((o = i.clone()).isSelected = !1, e.push(o))
                                        } catch (t) {
                                            r.e(t)
                                        } finally {
                                            r.f()
                                        }
                                        return t.next = 5, this.update(e, !0);
                                    case 5:
                                        return t.abrupt("return", this);
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "toggleAll",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i, o;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        e = [], r = Be(this.data.items);
                                        try {
                                            for (r.s(); !(n = r.n()).done;)((i = n.value).isSelected || !i.isSelected && i.isSelectable()) && ((o = i.clone()).isSelected = !o.isSelected, e.push(o))
                                        } catch (t) {
                                            r.e(t)
                                        } finally {
                                            r.f()
                                        }
                                        return t.next = 5, this.update(e, !0);
                                    case 5:
                                        return t.abrupt("return", this);
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "areItemsMissingWatchedDate",
                    value: function () {
                        var t = 0;
                        return this.data.items.some((function (e) {
                            return e.isMissingWatchedDate() && (t += 1), 1 < t
                        }))
                    }
                }, {
                    key: "setData",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (r = this.data.items.length, this.data = Fe(Fe(Fe({}, this.data), e), {}, {
                                                items: [].concat(O(this.data.items), O(e.items || []))
                                            }), !e.items) {
                                            t.next = 7;
                                            break
                                        }
                                        n = Be(e.items);
                                        try {
                                            for (n.s(); !(i = n.n()).done;)(o = i.value).index = r, o.isLoading = !0, r += 1
                                        } catch (t) {
                                            n.e(t)
                                        } finally {
                                            n.f()
                                        }
                                        return t.next = 7, this.dispatchUpdate(e.items);
                                    case 7:
                                        return t.abrupt("return", this);
                                    case 8:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "resetData",
                    value: (r = e(m().mark((function e() {
                        return m().wrap((function (e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return this.data = t.getInitialData(), e.next = 3, I.events.dispatch("SYNC_STORE_RESET", null, {});
                                case 3:
                                    return e.abrupt("return", this);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e, this)
                    }))), function () {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "update",
                    value: function () {
                        var t = e(m().mark((function t(e, r) {
                            var n, i, o;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        n = Be(e);
                                        try {
                                            for (n.s(); !(i = n.n()).done;) o = i.value, this.data.items[o.index] = o
                                        } catch (t) {
                                            n.e(t)
                                        } finally {
                                            n.f()
                                        }
                                        if (!r) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.next = 5, this.dispatchUpdate(e);
                                    case 5:
                                        return t.abrupt("return", this);
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "dispatchUpdate",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (0 !== e.length) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return", this);
                                    case 2:
                                        r = {}, n = Be(e);
                                        try {
                                            for (n.s(); !(i = n.n()).done;) o = i.value, r[o.index] = o
                                        } catch (t) {
                                            n.e(t)
                                        } finally {
                                            n.f()
                                        }
                                        return t.next = 7, I.events.dispatch("ITEMS_LOAD", null, {
                                            items: r
                                        });
                                    case 7:
                                        return t.abrupt("return", this);
                                    case 8:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }], [{
                    key: "getInitialData",
                    value: function () {
                        return {
                            isLoading: !1,
                            loadQueue: [],
                            items: [],
                            hasReachedEnd: !1,
                            hasReachedLastSyncDate: !1
                        }
                    }
                }]), t;
                var r
            }();

        function Ve(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Ye(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ye(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function Ye(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var $e = new Map,
            Xe = function () {
                function t(e) {
                    n(this, t), p(this, "id", void 0), p(this, "leftoverHistoryItems", []), p(this, "hasCheckedHistoryCache", !1), p(this, "hasReachedHistoryEnd", !1), p(this, "nextHistoryPage", 0), p(this, "nextHistoryUrl", ""), p(this, "session", void 0), this.id = e,
                        function (t, e) {
                            $e.set(t, e)
                        }(this.id, this)
                }
                return o(t, [{
                    key: "checkLogin",
                    value: function () {
                        return Promise.resolve(!!this.session && null !== this.session.profileName)
                    }
                }, {
                    key: "loadHistory",
                    value: function () {
                        var t = e(m().mark((function t(e, r, n) {
                            var i, o, a, s, c, u, l, h, f, p, d, v, g, b, w, x, k, S, A, E, T, _, R, C, P, j, L, D, N, U, M, H, q, F, B, W, G, J, z, V, Y;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return i = [], t.prev = 1, t.next = 4, Ht.get(["history", "historyItemsToItems", "items"]);
                                    case 4:
                                        o = t.sent, (a = o.history.get(this.id)) || (a = {
                                            items: []
                                        }), s = Je(this.id), c = s.data, u = c.hasReachedEnd, l = c.hasReachedLastSyncDate, h = [];
                                    case 10:
                                        if (f = [], !(0 < this.leftoverHistoryItems.length)) {
                                            t.next = 16;
                                            break
                                        }
                                        f = this.leftoverHistoryItems, this.leftoverHistoryItems = [], t.next = 24;
                                        break;
                                    case 16:
                                        if (this.hasReachedHistoryEnd) {
                                            t.next = 24;
                                            break
                                        }
                                        return t.next = 19, this.loadHistoryItems();
                                    case 19:
                                        f = t.sent, this.hasCheckedHistoryCache || (w = null, 0 < a.items.length && (x = "".concat(this.id, "_").concat(this.getHistoryItemId(a.items[0])), (k = o.historyItemsToItems.get(x)) && (w = null !== (S = o.items.get(k)) && void 0 !== S ? S : null)), 0 < f.length && w && this.isNewHistoryItem(f[0], null !== (d = w.watchedAt) && void 0 !== d ? d : 0, null !== (v = w.id) && void 0 !== v ? v : "") && (a = {
                                            items: []
                                        }), this.nextHistoryPage = null !== (g = a.nextPage) && void 0 !== g ? g : this.nextHistoryPage, this.nextHistoryUrl = null !== (b = a.nextUrl) && void 0 !== b ? b : this.nextHistoryUrl, 0 < a.items.length && (f = a.items, a.items = []), this.hasCheckedHistoryCache = !0), a.nextPage = this.nextHistoryPage, a.nextUrl = this.nextHistoryUrl, (p = a.items).push.apply(p, O(f));
                                    case 24:
                                        A = Ve(f.entries()), t.prev = 25, A.s();
                                    case 27:
                                        if ((E = A.n()).done) {
                                            t.next = 45;
                                            break
                                        }
                                        if (T = y(E.value, 2), _ = T[0], R = T[1], 0 !== e) {
                                            t.next = 34;
                                            break
                                        }
                                        return this.leftoverHistoryItems = f.slice(_), t.abrupt("break", 45);
                                    case 34:
                                        if (0 !== r && n && !this.isNewHistoryItem(R, r, n)) {
                                            t.next = 39;
                                            break
                                        }
                                        h.push(R), e -= 1, t.next = 43;
                                        break;
                                    case 39:
                                        if (!(0 < r && n)) {
                                            t.next = 43;
                                            break
                                        }
                                        return this.leftoverHistoryItems = f.slice(_), l = !0, t.abrupt("break", 45);
                                    case 43:
                                        t.next = 27;
                                        break;
                                    case 45:
                                        t.next = 50;
                                        break;
                                    case 47:
                                        t.prev = 47, t.t0 = t.catch(25), A.e(t.t0);
                                    case 50:
                                        return t.prev = 50, A.f(), t.finish(50);
                                    case 53:
                                        u = this.hasReachedHistoryEnd || l;
                                    case 54:
                                        if (!u && 0 < e) {
                                            t.next = 10;
                                            break
                                        }
                                        case 55:
                                            if (!(0 < h.length)) {
                                                t.next = 71;
                                                break
                                            }
                                            C = [], P = [], j = Ve(h);
                                            try {
                                                for (j.s(); !(L = j.n()).done;) D = L.value, N = "".concat(this.id, "_").concat(this.getHistoryItemId(D)), (U = o.historyItemsToItems.get(N)) && (M = o.items.get(U)) ? (this.updateItemFromHistory(M, D), C.push(Ce(M))) : (C.push(null), P.push(D))
                                            } catch (t) {
                                                j.e(t)
                                            } finally {
                                                j.f()
                                            }
                                            if (!(0 < P.length)) {
                                                t.next = 68;
                                                break
                                            }
                                            return t.next = 63, this.convertHistoryItems(P);
                                        case 63:
                                            H = t.sent, q = 0, i = C.map((function (t) {
                                                return null === t ? (t = H[q], q += 1, t) : t
                                            })), t.next = 69;
                                            break;
                                        case 68:
                                            i = C;
                                        case 69:
                                            F = Ve(h.entries());
                                            try {
                                                for (F.s(); !(B = F.n()).done;) W = y(B.value, 2), G = W[0], J = W[1], z = "".concat(this.id, "_").concat(this.getHistoryItemId(J)), V = i[G], Y = V.getDatabaseId(), o.historyItemsToItems.set(z, Y), o.items.set(Y, V.save())
                                            } catch (t) {
                                                F.e(t)
                                            } finally {
                                                F.f()
                                            }
                                            case 71:
                                                return t.next = 73, s.setData({
                                                    items: i,
                                                    hasReachedEnd: u,
                                                    hasReachedLastSyncDate: l
                                                });
                                            case 73:
                                                return o.history.set(this.id, a), t.next = 76, Ht.set(o);
                                            case 76:
                                                t.next = 85;
                                                break;
                                            case 78:
                                                if (t.prev = 78, t.t1 = t.catch(1), !I.errors.validate(t.t1)) {
                                                    t.next = 84;
                                                    break
                                                }
                                                return I.errors.error("Failed to load history.", t.t1), t.next = 84, I.events.dispatch("SERVICE_HISTORY_LOAD_ERROR", null, {
                                                    error: t.t1
                                                });
                                            case 84:
                                                throw t.t1;
                                            case 85:
                                                return t.abrupt("return", i);
                                            case 86:
                                            case "end":
                                                return t.stop()
                                }
                            }), t, this, [
                                [1, 78],
                                [25, 47, 50, 53]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "reset",
                    value: function () {
                        this.leftoverHistoryItems = [], this.hasCheckedHistoryCache = !1, this.hasReachedHistoryEnd = !1, this.nextHistoryPage = 0, this.nextHistoryUrl = ""
                    }
                }, {
                    key: "loadHistoryItems",
                    value: function () {
                        return Promise.resolve([])
                    }
                }, {
                    key: "isNewHistoryItem",
                    value: function () {
                        return !0
                    }
                }, {
                    key: "getHistoryItemId",
                    value: function () {
                        return ""
                    }
                }, {
                    key: "convertHistoryItems",
                    value: function () {
                        return Promise.resolve([])
                    }
                }, {
                    key: "updateItemFromHistory",
                    value: function () {}
                }, {
                    key: "getItem",
                    value: function () {
                        return Promise.resolve(null)
                    }
                }], [{
                    key: "loadTraktHistory",
                    value: (r = e(m().mark((function e(r, n) {
                        var i, o, a, s, c, u, l, h, f, p, d, v = arguments;
                        return m().wrap((function (e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (i = 2 < v.length && void 0 !== v[2] ? v[2] : "default", r.some((function (t) {
                                            return void 0 === t.trakt || t.trakt && void 0 === t.trakt.watchedAt
                                        }))) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", r);
                                case 4:
                                    return o = r.map((function (t) {
                                        return t.clone()
                                    })), e.prev = 5, e.next = 8, Ht.get(["itemsToTraktItems", "traktItems", "traktHistoryItems", "urlsToTraktItems"]);
                                case 8:
                                    return a = e.sent, e.next = 11, I.storage.get("corrections");
                                case 11:
                                    s = e.sent, c = s.corrections, u = [], l = Ve(o);
                                    try {
                                        for (l.s(); !(h = l.n()).done;) void 0 === (f = h.value).trakt || f.trakt && void 0 === f.trakt.watchedAt ? (p = f.getDatabaseId(), d = null == c ? void 0 : c[p], u.push(t.loadTraktItemHistory(f, a, d, n, i))) : u.push(Promise.resolve(f))
                                    } catch (t) {
                                        l.e(t)
                                    } finally {
                                        l.f()
                                    }
                                    return e.next = 18, Promise.all(u);
                                case 18:
                                    return o = e.sent, e.next = 21, Ht.set(a);
                                case 21:
                                    e.next = 30;
                                    break;
                                case 23:
                                    if (e.prev = 23, e.t0 = e.catch(5), !I.errors.validate(e.t0)) {
                                        e.next = 29;
                                        break
                                    }
                                    return I.errors.error("Failed to load Trakt history.", e.t0), e.next = 29, I.events.dispatch("TRAKT_HISTORY_LOAD_ERROR", null, {
                                        error: e.t0
                                    });
                                case 29:
                                    throw e.t0;
                                case 30:
                                    return e.abrupt("return", o);
                                case 31:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [5, 23]
                        ])
                    }))), function () {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "loadTraktItemHistory",
                    value: function () {
                        var t = e(m().mark((function t(e, r, n, i) {
                            var o, a = arguments;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (o = 4 < a.length && void 0 !== a[4] ? a[4] : "default", t.prev = 1, e.trakt) {
                                            t.next = 10;
                                            break
                                        }
                                        return t.next = 5, Ne.find(e, r, n, o);
                                    case 5:
                                        if (e.trakt = t.sent, !i) {
                                            t.next = 10;
                                            break
                                        }
                                        return t.next = 9, i(e.clone());
                                    case 9:
                                        e = t.sent;
                                    case 10:
                                        if (!e.trakt || void 0 !== e.trakt.watchedAt) {
                                            t.next = 17;
                                            break
                                        }
                                        return t.next = 13, He.loadHistory(e, r.traktHistoryItems, !1, o);
                                    case 13:
                                        if (!i) {
                                            t.next = 17;
                                            break
                                        }
                                        return t.next = 16, i(e.clone());
                                    case 16:
                                        e = t.sent;
                                    case 17:
                                        t.next = 28;
                                        break;
                                    case 19:
                                        if (t.prev = 19, t.t0 = t.catch(1), e.trakt ? delete e.trakt.watchedAt : e.trakt = null, !i) {
                                            t.next = 26;
                                            break
                                        }
                                        return t.next = 25, i(e.clone());
                                    case 25:
                                        e = t.sent;
                                    case 26:
                                        if (!(t.t0 instanceof Wt && t.t0.isCanceled)) {
                                            t.next = 28;
                                            break
                                        }
                                        throw t.t0;
                                    case 28:
                                        return t.abrupt("return", e);
                                    case 29:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [1, 19]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t;
                var r
            }();
        var Ke = new(function (t) {
            function r() {
                var t, e;
                return n(this, r), p(a(e = i.call(this)), "START", void 0), p(a(e), "PAUSE", void 0), p(a(e), "STOP", void 0), p(a(e), "paths", void 0), e.START = 1, e.PAUSE = 2, e.STOP = 3, e.paths = (p(t = {}, e.START, "/start"), p(t, e.PAUSE, "/pause"), p(t, e.STOP, "/stop"), t), e
            }
            l(r, t);
            var i = function (t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var r, n = s(t);
                    if (e) {
                        var i = s(this).constructor;
                        r = Reflect.construct(n, arguments, i)
                    } else r = n.apply(this, arguments);
                    return f(this, r)
                }
            }(r);
            return o(r, [{
                key: "start",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (e.trakt) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    return t.next = 4, this.send(e.trakt, this.START);
                                case 4:
                                    return t.next = 6, I.storage.get("scrobblingDetails");
                                case 6:
                                    return r = t.sent, (n = r.scrobblingDetails) ? n.isPaused = !1 : n = {
                                        item: e.save(),
                                        tabId: I.tabId,
                                        isPaused: !1
                                    }, t.next = 11, I.storage.set({
                                        scrobblingDetails: n
                                    }, !1);
                                case 11:
                                    return t.next = 13, I.events.dispatch("SCROBBLE_START", null, n);
                                case 13:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "pause",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (e.trakt) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    return t.next = 4, this.send(e.trakt, this.PAUSE);
                                case 4:
                                    return t.next = 6, I.storage.get("scrobblingDetails");
                                case 6:
                                    if (r = t.sent, !(n = r.scrobblingDetails)) {
                                        t.next = 14;
                                        break
                                    }
                                    return n.isPaused = !0, t.next = 12, I.storage.set({
                                        scrobblingDetails: n
                                    }, !1);
                                case 12:
                                    return t.next = 14, I.events.dispatch("SCROBBLE_PAUSE", null, n);
                                case 14:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "stop",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, I.storage.get("scrobblingDetails");
                                case 2:
                                    if (r = t.sent, n = r.scrobblingDetails) {
                                        t.next = 6;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 6:
                                    if (e || (e = Ce(n.item)), e) {
                                        t.next = 9;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 9:
                                    if (!e.trakt) {
                                        t.next = 12;
                                        break
                                    }
                                    return t.next = 12, this.send(e.trakt, this.STOP);
                                case 12:
                                    return t.next = 14, I.storage.remove("scrobblingDetails", !1);
                                case 14:
                                    return t.next = 16, I.events.dispatch("SCROBBLE_STOP", null, n);
                                case 16:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "send",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        var n, i, o;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = this.paths[r], t.prev = 1, p(i = {}, e.type, {
                                        ids: {
                                            trakt: e.id
                                        }
                                    }), p(i, "progress", e.progress), o = i, t.next = 5, this.activate();
                                case 5:
                                    return t.next = 7, this.requests.send({
                                        url: "".concat(this.SCROBBLE_URL).concat(n),
                                        method: "POST",
                                        body: o
                                    });
                                case 7:
                                    return t.next = 9, I.events.dispatch("SCROBBLE_SUCCESS", null, {
                                        item: e.save(),
                                        scrobbleType: r
                                    });
                                case 9:
                                    t.next = 16;
                                    break;
                                case 11:
                                    if (t.prev = 11, t.t0 = t.catch(1), !I.errors.validate(t.t0)) {
                                        t.next = 16;
                                        break
                                    }
                                    return t.next = 16, I.events.dispatch("SCROBBLE_ERROR", null, {
                                        item: e.save(),
                                        scrobbleType: r,
                                        error: t.t0
                                    });
                                case 16:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [1, 11]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }]), r
        }(pe));

        function Qe(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Ze(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? Qe(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : Qe(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }
        var tr = new(function () {
            function t() {
                n(this, t)
            }
            return o(t, [{
                key: "open",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (r = 1 < o.length && void 0 !== o[1] ? o[1] : {}, "content" !== I.pageType) {
                                        t.next = 3;
                                        break
                                    }
                                    return t.abrupt("return", Yt.toExtension({
                                        action: "open-tab",
                                        url: e,
                                        extraProperties: r
                                    }));
                                case 3:
                                    return t.next = 5, E().tabs.query({
                                        active: !0,
                                        currentWindow: !0
                                    });
                                case 5:
                                    if (0 !== (n = t.sent).length) {
                                        t.next = 8;
                                        break
                                    }
                                    return t.abrupt("return", null);
                                case 8:
                                    return i = Ze({
                                        index: n[0].index + 1,
                                        url: e
                                    }, r), I.storage.options.grantCookies && E().cookies && (i.cookieStoreId = n[0].cookieStoreId), t.abrupt("return", E().tabs.create(i));
                                case 11:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }]), t
        }());

        function er(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return rr(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? rr(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function rr(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        var nr = new(function () {
            function t() {
                var r = this;
                n(this, t), p(this, "contentScripts", null), p(this, "injectedContentScriptTabs", new Set), p(this, "injectedScriptIds", new Set), p(this, "onStorageOptionsChange", (function (t) {
                    var e;
                    null !== (e = t.options) && void 0 !== e && e.services && Object.values(t.options.services).some((function (t) {
                        return t && "scrobble" in t
                    })) && (r.updateContentScripts(), r.checkTabListener())
                })), p(this, "onContentScriptDisconnect", function () {
                    var t = e(m().mark((function t(e) {
                        var n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r.injectedContentScriptTabs.has(e.tabId) && r.injectedContentScriptTabs.delete(e.tabId), t.next = 3, I.storage.get("scrobblingDetails");
                                case 3:
                                    if (n = t.sent, !(i = n.scrobblingDetails) || e.tabId !== i.tabId) {
                                        t.next = 8;
                                        break
                                    }
                                    return t.next = 8, Ke.stop();
                                case 8:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()), p(this, "onTabUpdated", (function (t, e, n) {
                    r.injectContentScript(n)
                }))
            }
            return o(t, [{
                key: "init",
                value: function () {
                    "background" === I.pageType && (this.updateContentScripts(), this.checkTabListener(), I.events.subscribe("STORAGE_OPTIONS_CHANGE", null, this.onStorageOptionsChange), I.events.subscribe("CONTENT_SCRIPT_DISCONNECT", null, this.onContentScriptDisconnect))
                }
            }, {
                key: "updateContentScripts",
                value: function () {
                    this.contentScripts = x().filter((function (t) {
                        return t.hasScrobbler && I.storage.options.services[t.id].scrobble || t.hasSync && I.storage.options.services[t.id].sync
                    })).map((function (t) {
                        return {
                            matches: t.hostPatterns.map((function (t) {
                                return t.replace(/^\*:\/\/\*\./, "https?:\\/\\/([^/]*\\.)?").replace(/\/\*$/, "")
                            })),
                            js: ["".concat(t.id, ".js")],
                            run_at: "document_idle"
                        }
                    }))
                }
            }, {
                key: "checkTabListener",
                value: function () {
                    var t = x().some((function (t) {
                        return t.hasScrobbler && I.storage.options.services[t.id].scrobble || t.hasSync && I.storage.options.services[t.id].sync
                    }));
                    t && !E().tabs.onUpdated.hasListener(this.onTabUpdated) ? E().tabs.onUpdated.addListener(this.onTabUpdated) : !t && E().tabs.onUpdated.hasListener(this.onTabUpdated) && E().tabs.onUpdated.removeListener(this.onTabUpdated)
                }
            }, {
                key: "injectContentScript",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s, c, u, l;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (this.contentScripts && "complete" === e.status && e.id && e.url && e.url.startsWith("http") && !this.injectedContentScriptTabs.has(e.id)) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    r = er(this.contentScripts), t.prev = 3, r.s();
                                case 5:
                                    if ((n = r.n()).done) {
                                        t.next = 32;
                                        break
                                    }
                                    if (i = n.value, o = i.matches, a = i.js, s = i.run_at, a && s) {
                                        t.next = 9;
                                        break
                                    }
                                    return t.abrupt("continue", 30);
                                case 9:
                                    if (!o.find((function (t) {
                                            var r;
                                            return null === (r = e.url) || void 0 === r ? void 0 : r.match(t)
                                        }))) {
                                        t.next = 30;
                                        break
                                    }
                                    this.injectedContentScriptTabs.add(e.id), c = er(a), t.prev = 13, c.s();
                                case 15:
                                    if ((u = c.n()).done) {
                                        t.next = 21;
                                        break
                                    }
                                    return l = u.value, t.next = 19, E().tabs.executeScript(e.id, {
                                        file: l,
                                        runAt: s
                                    });
                                case 19:
                                    t.next = 15;
                                    break;
                                case 21:
                                    t.next = 26;
                                    break;
                                case 23:
                                    t.prev = 23, t.t0 = t.catch(13), c.e(t.t0);
                                case 26:
                                    return t.prev = 26, c.f(), t.finish(26);
                                case 29:
                                    return t.abrupt("break", 32);
                                case 30:
                                    t.next = 5;
                                    break;
                                case 32:
                                    t.next = 37;
                                    break;
                                case 34:
                                    t.prev = 34, t.t1 = t.catch(3), r.e(t.t1);
                                case 37:
                                    return t.prev = 37, r.f(), t.finish(37);
                                case 40:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [3, 34, 37, 40],
                            [13, 23, 26, 29]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "inject",
                value: function (t, e, r, n) {
                    var i = this,
                        o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : "",
                        a = "function" == typeof n ? n.toString() : n,
                        s = "object" === h(o) ? JSON.stringify(o) : o;
                    return "content" === I.pageType ? new Promise((function (r) {
                        try {
                            var n = "".concat(t, "-").concat(e);
                            if (!i.injectedScriptIds.has(n)) {
                                var o = JSON.stringify(n),
                                    c = i.getScriptFn(),
                                    u = "(".concat(c.toString(), ")(").concat(o, ", ").concat(a, ", ").concat(s, ");"),
                                    l = document.createElement("script");
                                l.textContent = u, document.body.appendChild(l), i.injectedScriptIds.add(n)
                            }
                            var h = function (t) {
                                window.removeEventListener("uts-on-".concat(n, "-received"), h);
                                var e = t.detail;
                                r(e)
                            };
                            window.addEventListener("uts-on-".concat(n, "-received"), h, !1);
                            var f = new CustomEvent("uts-get-".concat(n));
                            window.dispatchEvent(f)
                        } catch (t) {
                            r(null)
                        }
                    })) : this.injectInTab(t, e, r, a, s)
                }
            }, {
                key: "injectInTab",
                value: function () {
                    var t = e(m().mark((function t(r, n, i, o, a) {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (i) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return", null);
                                case 2:
                                    return t.abrupt("return", new Promise((function (t) {
                                        var s, c = function () {
                                            var u = e(m().mark((function e(u) {
                                                var l;
                                                return m().wrap((function (e) {
                                                    for (;;) switch (e.prev = e.next) {
                                                        case 0:
                                                            if (void 0 !== s && s === u.tabId) {
                                                                e.next = 2;
                                                                break
                                                            }
                                                            return e.abrupt("return");
                                                        case 2:
                                                            return e.next = 4, Yt.toContent({
                                                                action: "inject-function",
                                                                serviceId: r,
                                                                key: n,
                                                                url: i,
                                                                fnStr: o,
                                                                fnParamsStr: a
                                                            }, s);
                                                        case 4:
                                                            l = e.sent, E().tabs.remove(s), t(l), I.events.unsubscribe("CONTENT_SCRIPT_CONNECT", null, c);
                                                        case 8:
                                                        case "end":
                                                            return e.stop()
                                                    }
                                                }), e)
                                            })));
                                            return function () {
                                                return u.apply(this, arguments)
                                            }
                                        }();
                                        I.events.subscribe("CONTENT_SCRIPT_CONNECT", null, c), tr.open(i, {
                                            active: !1
                                        }).then((function (t) {
                                            return s = null == t ? void 0 : t.id
                                        })).catch((function () {}))
                                    })));
                                case 3:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "getScriptFn",
                value: function () {
                    return function (t, e, r) {
                        window.addEventListener("uts-get-".concat(t), (function () {
                            var n = null;
                            try {
                                n = e(r)
                            } catch (t) {}
                            var i = new CustomEvent("uts-on-".concat(t, "-received"), {
                                detail: n
                            });
                            window.dispatchEvent(i)
                        }))
                    }
                }
            }]), t
        }());

        function ir(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return or(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? or(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function or(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }

        function ar(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function sr(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? ar(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : ar(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }
        var cr = new(function (t) {
            function r() {
                var t;
                return n(this, r), p(a(t = i.call(this, S.id)), "HOST_URL", "https://www.primevideo.com"), p(a(t), "API_URL", "https://atv-ps-eu.primevideo.com"), p(a(t), "SETTINGS_URL", "".concat(t.HOST_URL, "/settings")), p(a(t), "PROFILE_URL", "".concat(t.HOST_URL, "/gp/video/api/getProfiles")), p(a(t), "HISTORY_URL", "".concat(t.HOST_URL, "/gp/video/api/getWatchHistorySettingsPage?widgets=activity-history&widgetArgs=%7B%22startIndex%22%3A{index}%7D")), p(a(t), "ENRICHMENTS_URL", "".concat(t.HOST_URL, "/gp/video/api/enrichItemMetadata?metadataToEnrich=%7B%22playback%22%3Atrue%7D&titleIDsToEnrich=%5B{ids}%5D")), p(a(t), "ITEM_URL", ""), p(a(t), "NEXT_ITEM_URL", ""), p(a(t), "DEVICE_TYPE_ID", "AOAGZA014O5RE"), p(a(t), "requests", se({
                    "x-requested-with": "XMLHttpRequest"
                })), p(a(t), "isActivated", !1), p(a(t), "session", void 0), p(a(t), "nextIndex", 0), p(a(t), "nextItemId", ""), t
            }
            l(r, t);
            var i = function (t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var r, n = s(t);
                    if (e) {
                        var i = s(this).constructor;
                        r = Reflect.construct(n, arguments, i)
                    } else r = n.apply(this, arguments);
                    return f(this, r)
                }
            }(r);
            return o(r, [{
                key: "activate",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i, o, a;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (null !== this.session) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    return t.prev = 2, t.next = 5, Ht.get("servicesData");
                                case 5:
                                    if (e = t.sent, r = e.get(this.id)) {
                                        t.next = 17;
                                        break
                                    }
                                    return t.next = 10, this.getSession();
                                case 10:
                                    if ((n = t.sent) && n.deviceId) {
                                        t.next = 13;
                                        break
                                    }
                                    throw new Error("Failed to activate API");
                                case 13:
                                    return r = {
                                        deviceId: n.deviceId
                                    }, e.set(this.id, r), t.next = 17, Ht.set({
                                        servicesData: e
                                    });
                                case 17:
                                    this.ITEM_URL = "".concat(this.API_URL, "/cdp/catalog/GetPlaybackResources?asin={id}&consumptionType=Streaming&desiredResources=CatalogMetadata&deviceID=").concat(r.deviceId, "&deviceTypeID=").concat(this.DEVICE_TYPE_ID, "&firmware=1&gascEnabled=true&resourceUsage=CacheResources&videoMaterialType=Feature&titleDecorationScheme=primary-content&uxLocale=en_US"), this.NEXT_ITEM_URL = "".concat(this.API_URL, "/cdp/discovery/GetSections?decorationScheme=none&deviceID=").concat(r.deviceId, "&deviceTypeID=").concat(this.DEVICE_TYPE_ID, "&firmware=1&gascEnabled=true&pageId={id}&pageType=player&sectionTypes=bottom&uxLocale=en_US&version=default"), this.session = sr(sr({}, r), {}, {
                                        profileName: null
                                    }), this.isActivated = !0, t.next = 26;
                                    break;
                                case 23:
                                    t.prev = 23, t.t0 = t.catch(2), this.session = null;
                                case 26:
                                    if (this.session) {
                                        t.next = 28;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 28:
                                    return t.prev = 28, t.next = 31, this.requests.send({
                                        url: this.PROFILE_URL,
                                        method: "GET"
                                    });
                                case 31:
                                    i = t.sent, o = JSON.parse(i), (a = o.profiles.find((function (t) {
                                        return t.isSelected
                                    }))) && (this.session.profileName = a.name), t.next = 39;
                                    break;
                                case 37:
                                    t.prev = 37, t.t1 = t.catch(28);
                                case 39:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [2, 23],
                            [28, 37]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "checkLogin",
                value: function () {
                    var t = e(m().mark((function t() {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (this.isActivated) {
                                        t.next = 3;
                                        break
                                    }
                                    return t.next = 3, this.activate();
                                case 3:
                                    return t.abrupt("return", !!this.session && !!this.session.profileName);
                                case 4:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "loadHistoryItems",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i, o, a, s, c, u, l, h, f, p, d, v, g, y, b, w = this;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (this.isActivated) {
                                        t.next = 3;
                                        break
                                    }
                                    return t.next = 3, this.activate();
                                case 3:
                                    return e = [], t.next = 6, this.requests.send({
                                        url: jt.replace(this.HISTORY_URL, {
                                            index: this.nextIndex
                                        }),
                                        method: "GET"
                                    });
                                case 6:
                                    if (r = t.sent, n = JSON.parse(r), !(i = n.widgets.find((function (t) {
                                            return "activity-history" === t.widgetType
                                        })))) {
                                        t.next = 27;
                                        break
                                    }
                                    if (!("titles" in (o = i.content.content))) {
                                        t.next = 24;
                                        break
                                    }
                                    a = [], s = o.titles.map((function (t) {
                                        return w.flattenHistoryResponseItems(t.titles)
                                    })).flat(), c = ir(s);
                                    try {
                                        for (c.s(); !(u = c.n()).done;) l = u.value, a.push({
                                            id: l.gti,
                                            watchedAt: jt.unix(l.time)
                                        })
                                    } catch (t) {
                                        c.e(t)
                                    } finally {
                                        c.f()
                                    }
                                    return t.next = 18, this.requests.send({
                                        url: jt.replace(this.ENRICHMENTS_URL, {
                                            ids: a.map((function (t) {
                                                return "%22".concat(t.id, "%22")
                                            })).join("%2C")
                                        }),
                                        method: "GET"
                                    });
                                case 18:
                                    for (h = t.sent, f = JSON.parse(h), p = 0, d = a; p < d.length; p++) y = d[p], b = f.enrichments[y.id], e.push(sr(sr({}, y), {}, {
                                        progress: null !== (v = null == b || null === (g = b.progress) || void 0 === g ? void 0 : g.percentage) && void 0 !== v ? v : 0
                                    }));
                                    this.nextIndex = o.nextStartIndex, t.next = 25;
                                    break;
                                case 24:
                                    this.hasReachedHistoryEnd = !0;
                                case 25:
                                    t.next = 28;
                                    break;
                                case 27:
                                    this.hasReachedHistoryEnd = !0;
                                case 28:
                                    return t.abrupt("return", e);
                                case 29:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "flattenHistoryResponseItems",
                value: function (t) {
                    var e = this;
                    return t.map((function (t) {
                        return 0 < t.children.length ? e.flattenHistoryResponseItems(t.children) : t
                    })).flat()
                }
            }, {
                key: "isNewHistoryItem",
                value: function (t, e) {
                    return t.watchedAt > e
                }
            }, {
                key: "getHistoryItemId",
                value: function (t) {
                    return t.id
                }
            }, {
                key: "convertHistoryItems",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    r = [], n = ir(e), t.prev = 2, n.s();
                                case 4:
                                    if ((i = n.n()).done) {
                                        t.next = 12;
                                        break
                                    }
                                    return o = i.value, t.next = 8, this.getItem(o.id);
                                case 8:
                                    (a = t.sent) && (a.progress = o.progress, a.watchedAt = jt.unix(o.watchedAt), r.push(a));
                                case 10:
                                    t.next = 4;
                                    break;
                                case 12:
                                    t.next = 17;
                                    break;
                                case 14:
                                    t.prev = 14, t.t0 = t.catch(2), n.e(t.t0);
                                case 17:
                                    return t.prev = 17, n.f(), t.finish(17);
                                case 20:
                                    return t.abrupt("return", r);
                                case 21:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [2, 14, 17, 20]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "updateItemFromHistory",
                value: function (t, e) {
                    t.watchedAt = jt.unix(e.watchedAt), t.progress = e.progress
                }
            }, {
                key: "getItem",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s, c;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (r = null, t.prev = 1, this.isActivated) {
                                        t.next = 5;
                                        break
                                    }
                                    return t.next = 5, this.activate();
                                case 5:
                                    return t.next = 7, ae.send({
                                        url: this.ITEM_URL.replace(/{id}/i, e),
                                        method: "GET"
                                    });
                                case 7:
                                    return o = t.sent, a = JSON.parse(o), r = this.parseMetadata(a), t.next = 12, ae.send({
                                        url: this.NEXT_ITEM_URL.replace(/{id}/i, e),
                                        method: "GET"
                                    });
                                case 12:
                                    s = t.sent, c = JSON.parse(s), this.nextItemId = null !== (n = null === (i = c.sections.bottom) || void 0 === i ? void 0 : i.collections.collectionList[0].items.itemList[0].titleId) && void 0 !== n ? n : "", t.next = 20;
                                    break;
                                case 17:
                                    t.prev = 17, t.t0 = t.catch(1), I.errors.validate(t.t0) && I.errors.error("Failed to get item.", t.t0);
                                case 20:
                                    return t.abrupt("return", r);
                                case 21:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [1, 17]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseMetadata",
                value: function (t) {
                    var e, r = this.id,
                        n = t.catalogMetadata,
                        i = n.catalog,
                        o = n.family,
                        a = i.id;
                    if ("show" == ("TV Show" === i.entityType ? "show" : "movie")) {
                        var s = "",
                            c = 0;
                        if (o) {
                            var u = y(o.tvAncestors, 2),
                                l = u[0];
                            s = u[1].catalog.title, c = l.catalog.seasonNumber
                        }
                        var h = i.episodeNumber,
                            f = void 0 === h ? 0 : h,
                            p = i.title;
                        e = new Ie({
                            serviceId: r,
                            id: a,
                            title: p,
                            season: c,
                            number: f,
                            show: {
                                serviceId: r,
                                title: s
                            }
                        })
                    } else {
                        var d = i.title;
                        e = new Re({
                            serviceId: r,
                            id: a,
                            title: d
                        })
                    }
                    return e
                }
            }, {
                key: "getSession",
                value: function () {
                    return nr.inject(this.id, "session", this.SETTINGS_URL, (function () {
                        var t;
                        return {
                            deviceId: null !== (t = window.localStorage.getItem("atvwebplayersdk_atvwebplayer_deviceid")) && void 0 !== t ? t : ""
                        }
                    }))
                }
            }]), r
        }(Xe));

        function ur(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function lr(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? ur(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : ur(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }
        var hr = new Map,
            fr = function (t, e) {
                hr.set(t, e)
            };
        new(function (t) {
            function r() {
                var t;
                return n(this, r), p(a(t = i.call(this, cr, {
                    videoPlayerSelector: ".dv-player-fullscreen video:not(.tst-video-overlay-player-html5)"
                })), "itemId", ""), p(a(t), "onClick", (function (e) {
                    var r, n = e.target;
                    if (n) {
                        var i = n.matches("[data-asin], #dv-action-box-wrapper") ? n : n.closest("[data-asin], #dv-action-box-wrapper");
                        if (i) {
                            var o = i.dataset.asin || (null === (r = i.querySelector('[name="titleId"]')) || void 0 === r ? void 0 : r.value);
                            o && o !== t.itemId && (t.itemId = o)
                        }
                    }
                })), t
            }
            l(r, t);
            var i = function (t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var r, n = s(t);
                    if (e) {
                        var i = s(this).constructor;
                        r = Reflect.construct(n, arguments, i)
                    } else r = n.apply(this, arguments);
                    return f(this, r)
                }
            }(r);
            return o(r, [{
                key: "parseItemFromApi",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, c(s(r.prototype), "parseItemFromApi", this).call(this);
                                case 2:
                                    return (e = t.sent) && (this.itemId = cr.nextItemId), t.abrupt("return", e);
                                case 5:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseItemIdFromCustom",
                value: function () {
                    return this.itemId
                }
            }]), r
        }(function () {
            function t(e) {
                var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                n(this, t), p(this, "api", void 0), p(this, "options", void 0), p(this, "item", null), p(this, "videoPlayer", null), p(this, "currentTime", 0), p(this, "progress", 0), p(this, "onClick", null), p(this, "playbackFnToInject", null), p(this, "itemFnToInject", null), p(this, "itemIdFnToInject", null), this.api = e, this.options = Object.freeze(lr(lr({}, this.getDefaultOptions()), r)), fr(this.api.id, this)
            }
            return o(t, [{
                key: "getDefaultOptions",
                value: function () {
                    return {
                        videoPlayerSelector: "video",
                        watchingUrlRegex: null
                    }
                }
            }, {
                key: "getLocation",
                value: function () {
                    return window.location.href
                }
            }, {
                key: "parsePlayback",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i, o, a, s, c = this;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    e = null, r = null, n = 0, i = [
                                        ["video player", function () {
                                            return c.parsePlaybackFromVideoPlayer()
                                        }],
                                        ["injected script", function () {
                                            return c.parsePlaybackFromInjectedScript()
                                        }],
                                        ["DOM", function () {
                                            return c.parsePlaybackFromDom()
                                        }],
                                        ["custom", function () {
                                            return c.parsePlaybackFromCustom()
                                        }]
                                    ];
                                case 4:
                                    if (!(n < i.length)) {
                                        t.next = 19;
                                        break
                                    }
                                    return (o = y(i[n], 2))[0], a = o[1], t.prev = 6, t.next = 9, a();
                                case 9:
                                    r = t.sent, t.next = 14;
                                    break;
                                case 12:
                                    t.prev = 12, t.t0 = t.catch(6);
                                case 14:
                                    if (!r) {
                                        t.next = 16;
                                        break
                                    }
                                    return t.abrupt("break", 19);
                                case 16:
                                    n++, t.next = 4;
                                    break;
                                case 19:
                                    if (r && (void 0 === r.progress && void 0 !== r.currentTime && void 0 !== r.duration && (r.progress = r.currentTime / r.duration * 100), void 0 === r.isPaused && (void 0 === r.currentTime ? void 0 !== r.progress && (r.isPaused = this.progress === r.progress, this.progress = r.progress) : (r.isPaused = this.currentTime === r.currentTime, this.currentTime = r.currentTime)), void 0 !== r.progress && 0 < r.progress && (e = {
                                            isPaused: null === (s = r.isPaused) || void 0 === s || s,
                                            progress: r.progress
                                        })), !e || this.item) {
                                        t.next = 24;
                                        break
                                    }
                                    return t.next = 23, this.parseItem();
                                case 23:
                                    this.item = t.sent;
                                case 24:
                                    return t.abrupt("return", this.item ? e : null);
                                case 25:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [6, 12]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parsePlaybackFromVideoPlayer",
                value: function () {
                    var t;
                    return this.options.videoPlayerSelector ? !this.videoPlayer || document.body.contains(this.videoPlayer) && this.videoPlayer.matches(this.options.videoPlayerSelector) ? (this.videoPlayer || (this.videoPlayer = document.querySelector(this.options.videoPlayerSelector)), null !== (t = this.videoPlayer) && void 0 !== t && t.duration ? {
                        isPaused: this.videoPlayer.paused,
                        currentTime: this.videoPlayer.currentTime,
                        duration: this.videoPlayer.duration
                    } : null) : (this.videoPlayer = null, null) : null
                }
            }, {
                key: "parsePlaybackFromInjectedScript",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!this.playbackFnToInject) {
                                        t.next = 5;
                                        break
                                    }
                                    return t.next = 3, nr.inject(this.api.id, "playback", "", this.playbackFnToInject);
                                case 3:
                                    return e = t.sent, t.abrupt("return", e);
                                case 5:
                                    return t.abrupt("return", null);
                                case 6:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parsePlaybackFromDom",
                value: function () {
                    return null
                }
            }, {
                key: "parsePlaybackFromCustom",
                value: function () {
                    return null
                }
            }, {
                key: "parseItem",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i, o, a = this;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    e = null, r = 0, n = [
                                        ["API", function () {
                                            return a.parseItemFromApi()
                                        }],
                                        ["injected script", function () {
                                            return a.parseItemFromInjectedScript()
                                        }],
                                        ["DOM", function () {
                                            return a.parseItemFromDom()
                                        }],
                                        ["custom", function () {
                                            return a.parseItemFromCustom()
                                        }]
                                    ];
                                case 3:
                                    if (!(r < n.length)) {
                                        t.next = 18;
                                        break
                                    }
                                    return (i = y(n[r], 2))[0], o = i[1], t.prev = 5, t.next = 8, o();
                                case 8:
                                    e = t.sent, t.next = 13;
                                    break;
                                case 11:
                                    t.prev = 11, t.t0 = t.catch(5);
                                case 13:
                                    if (!e) {
                                        t.next = 15;
                                        break
                                    }
                                    return t.abrupt("break", 18);
                                case 15:
                                    r++, t.next = 3;
                                    break;
                                case 18:
                                    return t.abrupt("return", e);
                                case 19:
                                case "end":
                                    return t.stop()
                            }
                        }), t, null, [
                            [5, 11]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseItemFromApi",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, this.parseItemId();
                                case 2:
                                    return e = t.sent, t.abrupt("return", e ? this.api.getItem(e) : null);
                                case 4:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseItemFromInjectedScript",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!this.itemFnToInject) {
                                        t.next = 6;
                                        break
                                    }
                                    return t.next = 3, nr.inject(this.api.id, "item", "", this.itemFnToInject);
                                case 3:
                                    if (!(e = t.sent)) {
                                        t.next = 6;
                                        break
                                    }
                                    return t.abrupt("return", Ce(e));
                                case 6:
                                    return t.abrupt("return", null);
                                case 7:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseItemFromDom",
                value: function () {
                    return null
                }
            }, {
                key: "parseItemFromCustom",
                value: function () {
                    return null
                }
            }, {
                key: "parseItemId",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i, o, a = this;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    e = null, r = 0, n = [
                                        ["URL", function () {
                                            return a.parseItemIdFromUrl()
                                        }],
                                        ["injected script", function () {
                                            return a.parseItemIdFromInjectedScript()
                                        }],
                                        ["DOM", function () {
                                            return a.parseItemIdFromDom()
                                        }],
                                        ["custom", function () {
                                            return a.parseItemIdFromCustom()
                                        }]
                                    ];
                                case 3:
                                    if (!(r < n.length)) {
                                        t.next = 18;
                                        break
                                    }
                                    return (i = y(n[r], 2))[0], o = i[1], t.prev = 5, t.next = 8, o();
                                case 8:
                                    e = t.sent, t.next = 13;
                                    break;
                                case 11:
                                    t.prev = 11, t.t0 = t.catch(5);
                                case 13:
                                    if (!e) {
                                        t.next = 15;
                                        break
                                    }
                                    return t.abrupt("break", 18);
                                case 15:
                                    r++, t.next = 3;
                                    break;
                                case 18:
                                    return t.abrupt("return", e);
                                case 19:
                                case "end":
                                    return t.stop()
                            }
                        }), t, null, [
                            [5, 11]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseItemIdFromUrl",
                value: function () {
                    var t, e, r, n = (null !== (t = null === (e = this.options.watchingUrlRegex) || void 0 === e || null === (r = e.exec(this.getLocation())) || void 0 === r ? void 0 : r.groups) && void 0 !== t ? t : {}).id;
                    return void 0 === n ? null : n
                }
            }, {
                key: "parseItemIdFromInjectedScript",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!this.itemIdFnToInject) {
                                        t.next = 5;
                                        break
                                    }
                                    return t.next = 3, nr.inject(this.api.id, "item-id", "", this.itemIdFnToInject);
                                case 3:
                                    return e = t.sent, t.abrupt("return", e);
                                case 5:
                                    return t.abrupt("return", null);
                                case 6:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "parseItemIdFromDom",
                value: function () {
                    return null
                }
            }, {
                key: "parseItemIdFromCustom",
                value: function () {
                    return null
                }
            }, {
                key: "getItem",
                value: function () {
                    return this.item
                }
            }, {
                key: "clearItem",
                value: function () {
                    this.item = null, this.currentTime = 0, this.progress = 0
                }
            }]), t
        }()));
        var pr = new(function (t) {
                function r() {
                    return n(this, r), i.call(this)
                }
                l(r, t);
                var i = function (t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                        } catch (t) {
                            return !1
                        }
                    }();
                    return function () {
                        var r, n = s(t);
                        if (e) {
                            var i = s(this).constructor;
                            r = Reflect.construct(n, arguments, i)
                        } else r = n.apply(this, arguments);
                        return f(this, r)
                    }
                }(r);
                return o(r, [{
                    key: "getTimeAndDateFormat",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return e = "EEE ", t.prev = 1, t.next = 4, Ht.get("traktSettings");
                                    case 4:
                                        if (r = t.sent, n = r.get("default")) {
                                            t.next = 16;
                                            break
                                        }
                                        return t.next = 9, this.activate();
                                    case 9:
                                        return t.next = 11, this.requests.send({
                                            url: this.SETTINGS_URL,
                                            method: "GET"
                                        });
                                    case 11:
                                        return i = t.sent, n = JSON.parse(i), r.set("default", n), t.next = 16, Ht.set({
                                            traktSettings: r
                                        });
                                    case 16:
                                        t.t0 = n.account.date_format, t.next = "dmy" === t.t0 ? 19 : "mdy" === t.t0 ? 21 : "ydm" === t.t0 ? 23 : "ymd" === t.t0 ? 25 : 27;
                                        break;
                                    case 19:
                                        return e += "d MMM yyyy", t.abrupt("break", 30);
                                    case 21:
                                        return e += "MMM d yyyy", t.abrupt("break", 30);
                                    case 23:
                                        return e += "yyyy d MMM", t.abrupt("break", 30);
                                    case 25:
                                        return e += "yyyy MMM d", t.abrupt("break", 30);
                                    case 27:
                                        return console.error("Unknown date format", n.account.date_format), e += "d MMM yyyy, H:mm:ss", t.abrupt("return", e);
                                    case 30:
                                        e += n.account.time_24hr ? ", H:mm:ss" : ", h:mm:ss aaa", t.next = 36;
                                        break;
                                    case 33:
                                        t.prev = 33, t.t1 = t.catch(1), e += "d MMM yyyy, H:mm:ss";
                                    case 36:
                                        return t.abrupt("return", e);
                                    case 37:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [1, 33]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), r
            }(pe)),
            dr = new(function () {
                function t() {
                    n(this, t)
                }
                return o(t, [{
                    key: "translate",
                    value: function (t, e) {
                        return E().i18n.getMessage(t, e)
                    }
                }]), t
            }());
        var mr = new(function (t) {
                function r() {
                    var t;
                    return n(this, r), p(a(t = i.call(this)), "isIdentityAvailable", void 0), p(a(t), "manualAuth", void 0), t.isIdentityAvailable = !!E().identity, t.manualAuth = {}, t
                }
                l(r, t);
                var i = function (t) {
                    var e = function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                        } catch (t) {
                            return !1
                        }
                    }();
                    return function () {
                        var r, n = s(t);
                        if (e) {
                            var i = s(this).constructor;
                            r = Reflect.construct(n, arguments, i)
                        } else r = n.apply(this, arguments);
                        return f(this, r)
                    }
                }(r);
                return o(r, [{
                    key: "getAuthorizeUrl",
                    value: function () {
                        return "".concat(this.AUTHORIZE_URL, "?response_type=code&client_id=").concat(I.clientId, "&redirect_uri=").concat(this.getRedirectUrl())
                    }
                }, {
                    key: "getRedirectUrl",
                    value: function () {
                        return this.isIdentityAvailable ? E().identity.getRedirectURL() : this.REDIRECT_URL
                    }
                }, {
                    key: "getCode",
                    value: function (t) {
                        return t.split("?")[1].split("=")[1]
                    }
                }, {
                    key: "hasTokenExpired",
                    value: function (t) {
                        var e = jt.unix();
                        return t.created_at + t.expires_in < e
                    }
                }, {
                    key: "authorize",
                    value: function () {
                        var t = this,
                            e = !1;
                        return "firefox" === I.browser && (e = !!I.storage.options.grantCookies), this.isIdentityAvailable && !e ? this.startIdentityAuth() : new Promise((function (e) {
                            t.startManualAuth(e)
                        }))
                    }
                }, {
                    key: "startIdentityAuth",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r = this;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, E().identity.launchWebAuthFlow({
                                            url: this.getAuthorizeUrl(),
                                            interactive: !0
                                        });
                                    case 3:
                                        return e = t.sent, t.abrupt("return", this.getToken(e));
                                    case 7:
                                        return t.prev = 7, t.t0 = t.catch(0), this.isIdentityAvailable = !1, t.abrupt("return", new Promise((function (t) {
                                            r.startManualAuth(t)
                                        })));
                                    case 11:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 7]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "startManualAuth",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return this.manualAuth.callback = e, t.next = 3, tr.open(this.getAuthorizeUrl());
                                    case 3:
                                        (r = t.sent) && (this.manualAuth.tabId = r.id);
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "finishManualAuth",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (void 0 === this.manualAuth.tabId) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.next = 3, E().tabs.remove(this.manualAuth.tabId);
                                    case 3:
                                        return t.next = 5, this.getToken(e);
                                    case 5:
                                        i = t.sent, null === (r = (n = this.manualAuth).callback) || void 0 === r || r.call(n, i), this.manualAuth = {};
                                    case 8:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "getToken",
                    value: function (t) {
                        return this.requestToken({
                            code: this.getCode(t),
                            client_id: I.clientId,
                            client_secret: I.clientSecret,
                            redirect_uri: this.getRedirectUrl(),
                            grant_type: "authorization_code"
                        })
                    }
                }, {
                    key: "refreshToken",
                    value: function (t) {
                        return this.requestToken({
                            refresh_token: t,
                            client_id: I.clientId,
                            client_secret: I.clientSecret,
                            redirect_uri: this.getRedirectUrl(),
                            grant_type: "refresh_token"
                        })
                    }
                }, {
                    key: "requestToken",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, this.activate();
                                    case 3:
                                        return t.next = 5, this.requests.send({
                                            url: this.REQUEST_TOKEN_URL,
                                            method: "POST",
                                            body: e
                                        });
                                    case 5:
                                        return n = t.sent, r = JSON.parse(n), t.next = 9, I.storage.set({
                                            auth: r
                                        }, !0);
                                    case 9:
                                        t.next = 16;
                                        break;
                                    case 11:
                                        return t.prev = 11, t.t0 = t.catch(0), t.next = 15, I.storage.remove("auth", !0);
                                    case 15:
                                        throw t.t0;
                                    case 16:
                                        return t.abrupt("return", r);
                                    case 17:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 11]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "revokeToken",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, I.storage.get("auth");
                                    case 2:
                                        return r = t.sent, t.next = 5, this.activate();
                                    case 5:
                                        return t.next = 7, this.requests.send({
                                            url: this.REVOKE_TOKEN_URL,
                                            method: "POST",
                                            body: {
                                                access_token: null === (e = r.auth) || void 0 === e ? void 0 : e.access_token,
                                                client_id: I.clientId,
                                                client_secret: I.clientSecret
                                            }
                                        });
                                    case 7:
                                        return t.next = 9, I.storage.remove("auth", !0);
                                    case 9:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "validateToken",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if ("background" === I.pageType) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return", Yt.toExtension({
                                            action: "validate-trakt-token"
                                        }));
                                    case 2:
                                        return e = null, t.next = 5, I.storage.get("auth");
                                    case 5:
                                        if (!(r = t.sent).auth) {
                                            t.next = 14;
                                            break
                                        }
                                        if (!r.auth.refresh_token || !this.hasTokenExpired(r.auth)) {
                                            t.next = 13;
                                            break
                                        }
                                        return t.next = 10, this.refreshToken(r.auth.refresh_token);
                                    case 10:
                                        e = t.sent, t.next = 14;
                                        break;
                                    case 13:
                                        e = r.auth;
                                    case 14:
                                        return t.abrupt("return", e);
                                    case 15:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), r
            }(pe)),
            vr = new(function () {
                function t() {
                    n(this, t), p(this, "isLoggedIn", void 0), this.isLoggedIn = !1
                }
                return o(t, [{
                    key: "checkLogin",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, mr.validateToken();
                                    case 3:
                                        if (!(e = t.sent) || !e.access_token) {
                                            t.next = 10;
                                            break
                                        }
                                        return this.isLoggedIn = !0, t.next = 8, I.events.dispatch("LOGIN_SUCCESS", null, {
                                            auth: e
                                        });
                                    case 8:
                                        t.next = 11;
                                        break;
                                    case 10:
                                        throw new Error(JSON.stringify(e));
                                    case 11:
                                        t.next = 19;
                                        break;
                                    case 13:
                                        if (t.prev = 13, t.t0 = t.catch(0), this.isLoggedIn = !1, !I.errors.validate(t.t0)) {
                                            t.next = 19;
                                            break
                                        }
                                        return t.next = 19, I.events.dispatch("LOGIN_ERROR", null, {
                                            error: t.t0
                                        });
                                    case 19:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 13]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "login",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, Yt.toExtension({
                                            action: "login"
                                        });
                                    case 3:
                                        if (!(e = t.sent) || !e.access_token) {
                                            t.next = 10;
                                            break
                                        }
                                        return this.isLoggedIn = !0, t.next = 8, I.events.dispatch("LOGIN_SUCCESS", null, {
                                            auth: e
                                        });
                                    case 8:
                                        t.next = 11;
                                        break;
                                    case 10:
                                        throw new Error(JSON.stringify(e));
                                    case 11:
                                        t.next = 20;
                                        break;
                                    case 13:
                                        if (t.prev = 13, t.t0 = t.catch(0), this.isLoggedIn = !1, !I.errors.validate(t.t0)) {
                                            t.next = 20;
                                            break
                                        }
                                        return I.errors.error("Failed to log in.", t.t0), t.next = 20, I.events.dispatch("LOGIN_ERROR", null, {
                                            error: t.t0
                                        });
                                    case 20:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 13]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "logout",
                    value: function () {
                        var t = e(m().mark((function t() {
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, Yt.toExtension({
                                            action: "logout"
                                        });
                                    case 3:
                                        return this.isLoggedIn = !1, t.next = 6, I.events.dispatch("LOGOUT_SUCCESS", null, {});
                                    case 6:
                                        t.next = 15;
                                        break;
                                    case 8:
                                        if (t.prev = 8, t.t0 = t.catch(0), this.isLoggedIn = !0, !I.errors.validate(t.t0)) {
                                            t.next = 15;
                                            break
                                        }
                                        return I.errors.error("Failed to log out.", t.t0), t.next = 15, I.events.dispatch("LOGOUT_ERROR", null, {
                                            error: t.t0
                                        });
                                    case 15:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 8]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "finishLogin",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (!(e = window.location.search).includes("code")) {
                                            t.next = 4;
                                            break
                                        }
                                        return t.next = 4, Yt.toExtension({
                                            action: "finish-login",
                                            redirectUrl: e
                                        });
                                    case 4:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t
            }());

        function gr(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return yr(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? yr(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function yr(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        new k({
            id: "crunchyroll-beta",
            name: "Crunchyroll Beta",
            homePage: "https://beta.crunchyroll.com/",
            hostPatterns: ["*://*.beta.crunchyroll.com/*"],
            hasScrobbler: !1,
            hasSync: !0,
            hasAutoSync: !0
        }), new k({
            id: "disneyplus",
            name: "DisneyPlus",
            homePage: "https://www.disneyplus.com/",
            hostPatterns: ["*://*.disneyplus.com/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "goplay-be",
            name: "GoPlay BE",
            homePage: "https://www.goplay.be/",
            hostPatterns: ["*://*.goplay.be/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "hbo-go",
            name: "HBO Go",
            homePage: "https://hbogo.eu",
            hostPatterns: ["*://*.hbogo.co.th/*", "*://*.hbogoasia.com/*", "*://*.hbogo.hu/*", "*://*.hbogo.cz/*", "*://*.hbogo.sk/*", "*://*.hbogo.ro/*", "*://*.hbogo.ru/*", "*://*.hbogo.pl/*", "*://*.hbogo.hr/*", "*://*.hbogo.rs/*", "*://*.hbogo.si/*", "*://*.hbogo.mk/*", "*://*.hbogo.me/*", "*://*.hbogo.bg/*", "*://*.hbogo.ba/*", "*://*.hbogo.eu/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "hbo-max",
            name: "HBO Max",
            homePage: "https://www.hbomax.com/",
            hostPatterns: ["*://*.hbo.com/*", "*://*.hbomax.com/*"],
            hasScrobbler: !0,
            hasSync: !0,
            hasAutoSync: !0
        }), new k({
            id: "kijk-nl",
            name: "Kijk.nl",
            homePage: "https://www.kijk.nl",
            hostPatterns: ["*://*.kijk.nl/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "netflix",
            name: "Netflix",
            homePage: "https://www.netflix.com/",
            hostPatterns: ["*://*.netflix.com/*"],
            hasScrobbler: !0,
            hasSync: !0,
            hasAutoSync: !0
        }), new k({
            id: "nrk",
            name: "NRK",
            homePage: "https://tv.nrk.no/",
            hostPatterns: ["*://*.nrk.no/*"],
            hasScrobbler: !0,
            hasSync: !0,
            hasAutoSync: !0
        }), new k({
            id: "player-pl",
            name: "Player.pl",
            homePage: "https://player.pl",
            hostPatterns: ["*://*.player.pl/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "polsatboxgo-pl",
            name: "Polsatboxgo.pl",
            homePage: "https://polsatboxgo.pl",
            hostPatterns: ["*://*.polsatboxgo.pl/*", "*://*.polsatgo.pl/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "streamz-be",
            name: "Streamz BE",
            homePage: "https://www.streamz.be/",
            hostPatterns: ["*://*.streamz.be/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "viaplay",
            name: "Viaplay",
            homePage: "https://viaplay.com/",
            hostPatterns: ["*://*.viaplay.com/*", "*://*.viaplay.no/*", "*://*.viaplay.se/*", "*://*.viaplay.dk/*", "*://*.viaplay.fi/*", "*://*.viaplay.is/*", "*://*.viaplay.pl/*", "*://*.viaplay.ee/*", "*://*.viaplay.lv/*", "*://*.viaplay.lt/*"],
            hasScrobbler: !0,
            hasSync: !0,
            hasAutoSync: !0
        }), new k({
            id: "vrtnu-be",
            name: "VRTNu BE",
            homePage: "https://www.vrt.be/vrtnu",
            hostPatterns: ["*://*.vrtnu.be/*", "*://*.vrt.be/vrtnu/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "vtmgo-be",
            name: "VTMGo BE",
            homePage: "https://www.vtm.be/vtmgo",
            hostPatterns: ["*://*.vtmgo.be/*", "*://*.vtm.be/vtmgo/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        }), new k({
            id: "wakanim-tv",
            name: "Wakanim.tv",
            homePage: "https://wakanim.tv",
            hostPatterns: ["*://*.wakanim.tv/*"],
            hasScrobbler: !0,
            hasSync: !1,
            hasAutoSync: !1
        });
        var br = new(function () {
            function t() {
                n(this, t), p(this, "currentVersion", 9), p(this, "isSyncAvailable", void 0), p(this, "options", {}), p(this, "optionsDetails", {}), p(this, "syncOptions", {}), p(this, "syncOptionsDetails", {}), this.isSyncAvailable = !!E().storage.sync
            }
            return o(t, [{
                key: "init",
                value: function () {
                    var t = e(m().mark((function t() {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if ("background" === I.pageType) {
                                        t.next = 4;
                                        break
                                    }
                                    return t.next = 3, Yt.toExtension({
                                        action: "get-tab-id"
                                    });
                                case 3:
                                    I.tabId = t.sent;
                                case 4:
                                    return t.next = 6, this.sync();
                                case 6:
                                    return t.next = 8, this.upgradeOrDowngrade();
                                case 8:
                                    return t.next = 10, this.loadOptions();
                                case 10:
                                    return t.next = 12, this.loadSyncOptions();
                                case 12:
                                    return t.next = 14, vr.checkLogin();
                                case 14:
                                    if (!vr.isLoggedIn) {
                                        t.next = 18;
                                        break
                                    }
                                    return t.next = 17, pr.getTimeAndDateFormat();
                                case 17:
                                    I.dateFormat = t.sent;
                                case 18:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "upgradeOrDowngrade",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, this.get("version");
                                case 2:
                                    if (e = t.sent, r = e.version, n = void 0 === r ? 1 : r, console.log("Current storage version: v".concat(n.toString())), !(n < this.currentVersion)) {
                                        t.next = 11;
                                        break
                                    }
                                    return t.next = 9, this.upgrade(n);
                                case 9:
                                    t.next = 14;
                                    break;
                                case 11:
                                    if (!(n > this.currentVersion)) {
                                        t.next = 14;
                                        break
                                    }
                                    return t.next = 14, this.downgrade(n);
                                case 14:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "upgrade",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s, c, u, l, h, f, p, d, v, g, b, w, x;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!(2 > e && 2 <= this.currentVersion)) {
                                        t.next = 23;
                                        break
                                    }
                                    return console.log("Upgrading to v2..."), t.next = 4, this.doRemove(["traktCache", "correctUrls", "scrobblingItem"], !0);
                                case 4:
                                    return t.next = 6, this.get("options");
                                case 6:
                                    if (r = t.sent, n = r.options, i = r.options, !n || !i) {
                                        t.next = 23;
                                        break
                                    }
                                    if (!n.streamingServices || !i.streamingServices) {
                                        t.next = 20;
                                        break
                                    }
                                    o = 0, a = Object.entries(n.streamingServices);
                                case 12:
                                    if (!(o < a.length)) {
                                        t.next = 20;
                                        break
                                    }
                                    if (s = y(a[o], 2), c = s[0], "boolean" == typeof (u = s[1])) {
                                        t.next = 16;
                                        break
                                    }
                                    return t.abrupt("continue", 17);
                                case 16:
                                    i.streamingServices[c] = {
                                        scrobble: u,
                                        sync: u,
                                        autoSync: !1,
                                        autoSyncDays: 0,
                                        lastSync: 0,
                                        lastSyncId: ""
                                    };
                                case 17:
                                    o++, t.next = 12;
                                    break;
                                case 20:
                                    return delete n.disableScrobbling, t.next = 23, this.doSet({
                                        options: i
                                    }, !0);
                                case 23:
                                    if (!(3 > e && 3 <= this.currentVersion)) {
                                        t.next = 35;
                                        break
                                    }
                                    return console.log("Upgrading to v3..."), t.next = 27, this.get("options");
                                case 27:
                                    if (l = t.sent, h = l.options, f = l.options, !h || !f) {
                                        t.next = 35;
                                        break
                                    }
                                    return f.services = h.streamingServices, delete h.streamingServices, t.next = 35, this.doSet({
                                        options: f
                                    }, !0);
                                case 35:
                                    if (!(4 > e && 4 <= this.currentVersion)) {
                                        t.next = 39;
                                        break
                                    }
                                    return console.log("Upgrading to v4..."), t.next = 39, this.doRemove(["correctItems"], !0);
                                case 39:
                                    if (!(5 > e && 5 <= this.currentVersion)) {
                                        t.next = 43;
                                        break
                                    }
                                    return console.log("Upgrading to v5..."), t.next = 43, this.doRemove(["traktCache"], !0);
                                case 43:
                                    if (!(6 > e && 6 <= this.currentVersion)) {
                                        t.next = 56;
                                        break
                                    }
                                    return console.log("Upgrading to v6..."), t.next = 47, this.doRemove(["scrobblingItem"], !0);
                                case 47:
                                    return t.next = 49, this.get("syncOptions");
                                case 49:
                                    if (p = t.sent, d = p.syncOptions, v = p.syncOptions, !d || !v) {
                                        t.next = 56;
                                        break
                                    }
                                    return delete d.itemsPerLoad, t.next = 56, this.doSet({
                                        syncOptions: v
                                    }, !0);
                                case 56:
                                    if (!(7 > e && 7 <= this.currentVersion)) {
                                        t.next = 69;
                                        break
                                    }
                                    return console.log("Upgrading to v7..."), t.next = 60, this.get("options");
                                case 60:
                                    if (g = t.sent, null == (b = g.options) || !b.services || !("hbo-go" in b.services)) {
                                        t.next = 69;
                                        break
                                    }
                                    return b.services["hbo-max"] = b.services["hbo-go"], b.services["hbo-max"].lastSync = 0, b.services["hbo-max"].lastSyncId = "", delete b.services["hbo-go"], t.next = 69, this.doSet({
                                        options: b
                                    }, !0);
                                case 69:
                                    if (!(8 > e && 8 <= this.currentVersion)) {
                                        t.next = 79;
                                        break
                                    }
                                    return console.log("Upgrading to v8..."), t.next = 73, this.get("options");
                                case 73:
                                    if (w = t.sent, null == (x = w.options) || !x.services || !("telia-play" in x.services)) {
                                        t.next = 79;
                                        break
                                    }
                                    return delete x.services["telia-play"], t.next = 79, this.doSet({
                                        options: x
                                    }, !0);
                                case 79:
                                    if (!(9 > e && 9 <= this.currentVersion)) {
                                        t.next = 83;
                                        break
                                    }
                                    return console.log("Upgrading to v9..."), t.next = 83, this.doRemove(["itemsCache", "syncCache", "traktItemsCache"], !0);
                                case 83:
                                    return t.next = 85, this.set({
                                        version: this.currentVersion
                                    }, !0);
                                case 85:
                                    console.log("Upgraded!");
                                case 86:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "downgrade",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s, c, u, l, h, f, p, d;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!(8 < e && 8 >= this.currentVersion)) {
                                        t.next = 4;
                                        break
                                    }
                                    return console.log("Downgrading to v8..."), t.next = 4, this.doRemove(["itemsCache", "syncCache", "traktItemsCache"], !0);
                                case 4:
                                    if (7 < e && 7 >= this.currentVersion && console.log("Downgrading to v7..."), 6 < e && 6 >= this.currentVersion && console.log("Downgrading to v6..."), !(5 < e && 5 >= this.currentVersion)) {
                                        t.next = 10;
                                        break
                                    }
                                    return console.log("Downgrading to v5..."), t.next = 10, this.doRemove(["scrobblingDetails"], !0);
                                case 10:
                                    if (!(4 < e && 4 >= this.currentVersion)) {
                                        t.next = 14;
                                        break
                                    }
                                    return console.log("Downgrading to v4..."), t.next = 14, this.doRemove(["historyCache", "historyItemsToItemsCache", "imageUrlsCache", "itemsCache", "itemsToTraktItemsCache", "servicesDataCache", "suggestionsCache", "tmdbApiConfigsCache", "traktHistoryItemsCache", "traktItemsCache", "traktSettingsCache", "urlsToTraktItemsCache"], !0);
                                case 14:
                                    if (!(3 < e && 3 >= this.currentVersion)) {
                                        t.next = 18;
                                        break
                                    }
                                    return console.log("Downgrading to v3..."), t.next = 18, this.doRemove(["corrections"], !0);
                                case 18:
                                    if (!(2 < e && 2 >= this.currentVersion)) {
                                        t.next = 30;
                                        break
                                    }
                                    return console.log("Downgrading to v2..."), t.next = 22, this.get("options");
                                case 22:
                                    if (r = t.sent, n = r.options, i = r.options, !n || !i) {
                                        t.next = 30;
                                        break
                                    }
                                    return n.streamingServices = i.services, delete i.services, t.next = 30, this.doSet({
                                        options: n
                                    }, !0);
                                case 30:
                                    if (!(1 < e && 1 >= this.currentVersion)) {
                                        t.next = 60;
                                        break
                                    }
                                    return console.log("Downgrading to v1..."), t.next = 34, this.doRemove(["traktCache", "syncCache", "correctItems", "scrobblingItem"], !0);
                                case 34:
                                    return t.next = 36, this.get(["options", "syncOptions"]);
                                case 36:
                                    if (o = t.sent, a = o.options, s = o.options, !a || !s) {
                                        t.next = 53;
                                        break
                                    }
                                    if (!a.streamingServices || !s.streamingServices) {
                                        t.next = 50;
                                        break
                                    }
                                    c = 0, u = Object.entries(s.streamingServices);
                                case 42:
                                    if (!(c < u.length)) {
                                        t.next = 50;
                                        break
                                    }
                                    if (l = y(u[c], 2), h = l[0], "boolean" != typeof (f = l[1])) {
                                        t.next = 46;
                                        break
                                    }
                                    return t.abrupt("continue", 47);
                                case 46:
                                    a.streamingServices[h] = f.scrobble || f.sync;
                                case 47:
                                    c++, t.next = 42;
                                    break;
                                case 50:
                                    return delete s.theme, t.next = 53, this.doSet({
                                        options: a
                                    }, !0);
                                case 53:
                                    if (p = o.syncOptions, d = o.syncOptions, !p || !d) {
                                        t.next = 60;
                                        break
                                    }
                                    return delete d.addWithReleaseDateMissing, delete d.minPercentageWatched, t.next = 60, this.doSet({
                                        syncOptions: p
                                    }, !0);
                                case 60:
                                    return t.next = 62, this.set({
                                        version: this.currentVersion
                                    }, !0);
                                case 62:
                                    console.log("Downgraded!");
                                case 63:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "sync",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!this.isSyncAvailable) {
                                        t.next = 22;
                                        break
                                    }
                                    return t.next = 3, E().storage.sync.get();
                                case 3:
                                    e = t.sent, e = this.joinChunks(e), r = gr(Object.keys(e)), t.prev = 6, r.s();
                                case 8:
                                    if ((n = r.n()).done) {
                                        t.next = 14;
                                        break
                                    }
                                    return i = n.value, t.next = 12, E().storage.local.set(p({}, i, e[i]));
                                case 12:
                                    t.next = 8;
                                    break;
                                case 14:
                                    t.next = 19;
                                    break;
                                case 16:
                                    t.prev = 16, t.t0 = t.catch(6), r.e(t.t0);
                                case 19:
                                    return t.prev = 19, r.f(), t.finish(19);
                                case 22:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [6, 16, 19, 22]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "set",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.abrupt("return", this.doSet(e, r));
                                case 1:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "doSet",
                value: function () {
                    var t = e(m().mark((function t(e, r) {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!r || !this.isSyncAvailable) {
                                        t.next = 6;
                                        break
                                    }
                                    return t.next = 3, this.splitChunks(e);
                                case 3:
                                    return e = t.sent, t.next = 6, E().storage.sync.set(e);
                                case 6:
                                    return t.next = 8, E().storage.local.set(e);
                                case 8:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "get",
                value: function (t) {
                    return E().storage.local.get(t)
                }
            }, {
                key: "remove",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r = !!(1 < n.length && void 0 !== n[1]) && n[1], t.abrupt("return", this.doRemove(e, r));
                                case 2:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "doRemove",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!(1 < s.length && void 0 !== s[1] && s[1] && this.isSyncAvailable)) {
                                        t.next = 25;
                                        break
                                    }
                                    r = [], n = gr(e), t.prev = 4, n.s();
                                case 6:
                                    if ((i = n.n()).done) {
                                        t.next = 15;
                                        break
                                    }
                                    return o = i.value, r.push(o), t.next = 11, this.getNumChunks(o);
                                case 11:
                                    0 < (a = t.sent) && r.push.apply(r, O(this.getChunkKeys(o, a)));
                                case 13:
                                    t.next = 6;
                                    break;
                                case 15:
                                    t.next = 20;
                                    break;
                                case 17:
                                    t.prev = 17, t.t0 = t.catch(4), n.e(t.t0);
                                case 20:
                                    return t.prev = 20, n.f(), t.finish(20);
                                case 23:
                                    return t.next = 25, E().storage.sync.remove(r);
                                case 25:
                                    return t.next = 27, E().storage.local.remove(e);
                                case 27:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [4, 17, 20, 23]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "clear",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (!e || !this.isSyncAvailable) {
                                        t.next = 3;
                                        break
                                    }
                                    return t.next = 3, E().storage.sync.clear();
                                case 3:
                                    return t.next = 5, E().storage.local.clear();
                                case 5:
                                    return t.next = 7, this.set({
                                        version: this.currentVersion
                                    }, !0);
                                case 7:
                                    return t.next = 9, this.reset();
                                case 9:
                                    I.events.dispatch("STORAGE_OPTIONS_CHANGE", null, {
                                        options: this.options,
                                        syncOptions: this.syncOptions
                                    }), I.events.dispatch("STORAGE_OPTIONS_CLEAR", null, {});
                                case 11:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "reset",
                value: function () {
                    var t = e(m().mark((function t() {
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return this.options = {}, this.syncOptions = {}, t.next = 4, this.loadOptions();
                                case 4:
                                    return t.next = 6, this.loadSyncOptions();
                                case 6:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "splitChunks",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i, o, a, s, c, u, l, h, f, p, d, v, g, b, w, x, k, S;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    r = E().storage.sync.QUOTA_BYTES_PER_ITEM, n = {}, i = [], o = 0, a = Object.entries(e);
                                case 4:
                                    if (!(o < a.length)) {
                                        t.next = 22;
                                        break
                                    }
                                    return s = y(a[o], 2), c = s[0], u = s[1], l = JSON.stringify(u), h = "".concat(c).concat(l).length + 10, t.next = 10, this.getNumChunks(c);
                                case 10:
                                    if (f = t.sent, !(h < r && 0 === f)) {
                                        t.next = 14;
                                        break
                                    }
                                    return n[c] = u, t.abrupt("continue", 19);
                                case 14:
                                    for (i.push(c), p = [], d = r - c.length - 10; 0 < l.length;) p.push(l.slice(0, d)), l = l.slice(d);
                                    if (1 < p.length) {
                                        v = gr(p.entries());
                                        try {
                                            for (v.s(); !(g = v.n()).done;) b = y(g.value, 2), w = b[0], x = b[1], k = this.getChunkKey(c, w), n[k] = x
                                        } catch (t) {
                                            v.e(t)
                                        } finally {
                                            v.f()
                                        }
                                        S = this.getChunksKey(c), n[S] = p.length
                                    } else n[c] = JSON.parse(p[0]);
                                case 19:
                                    o++, t.next = 4;
                                    break;
                                case 22:
                                    if (!(0 < i.length)) {
                                        t.next = 25;
                                        break
                                    }
                                    return t.next = 25, this.remove(i, !0);
                                case 25:
                                    return t.abrupt("return", n);
                                case 26:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "joinChunks",
                value: function (t) {
                    for (var e = {}, r = 0, n = Object.entries(t); r < n.length; r++) {
                        var i = y(n[r], 2),
                            o = i[0],
                            a = i[1];
                        if (o.includes("_chunk")) {
                            if (o.endsWith("_chunks")) {
                                for (var s = o.split("_chunks")[0], c = "", u = 0; u < a; u++) c += t[this.getChunkKey(s, u)];
                                e[s] = JSON.parse(c)
                            }
                        } else e[o] = a
                    }
                    return e
                }
            }, {
                key: "getNumChunks",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r = this.getChunksKey(e), t.next = 3, E().storage.local.get(r);
                                case 3:
                                    return n = t.sent, t.abrupt("return", n[r] || 0);
                                case 5:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "getChunksKey",
                value: function (t) {
                    return "".concat(t, "_chunks")
                }
            }, {
                key: "getChunkKeys",
                value: function (t, e) {
                    var r = this;
                    return [this.getChunksKey(t)].concat(O(Array(e).fill("").map((function (e, n) {
                        return r.getChunkKey(t, n)
                    }))))
                }
            }, {
                key: "getChunkKey",
                value: function (t, e) {
                    return "".concat(t, "_chunk").concat(e.toString().padStart(3, "0"))
                }
            }, {
                key: "getSize",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r, n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r = "", t.next = 3, this.get(e);
                                case 3:
                                    return n = t.sent, r = 1024 > (i = (JSON.stringify(n) || "").length) ? "".concat(i.toFixed(2), " B") : 1024 > (i /= 1024) ? "".concat(i.toFixed(2), " KB") : "".concat((i /= 1024).toFixed(2), " MB"), t.abrupt("return", r);
                                case 7:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "loadOptions",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i, o = this;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return this.optionsDetails = {
                                        services: {
                                            type: "custom",
                                            id: "services",
                                            value: Object.fromEntries(x().map((function (t) {
                                                return [t.id, {
                                                    scrobble: !1,
                                                    sync: !1,
                                                    autoSync: !1,
                                                    autoSyncDays: 7,
                                                    lastSync: 0,
                                                    lastSyncId: ""
                                                }]
                                            }))),
                                            doShow: !0
                                        },
                                        showNotifications: {
                                            type: "switch",
                                            id: "showNotifications",
                                            value: !1,
                                            permissions: ["notifications"],
                                            doShow: !0
                                        },
                                        sendReceiveSuggestions: {
                                            type: "switch",
                                            id: "sendReceiveSuggestions",
                                            value: !1,
                                            doShow: !0
                                        },
                                        theme: {
                                            type: "select",
                                            id: "theme",
                                            value: "system",
                                            choices: {
                                                light: dr.translate("lightTheme"),
                                                dark: dr.translate("darkTheme"),
                                                system: dr.translate("systemTheme")
                                            },
                                            doShow: !0
                                        },
                                        allowRollbar: {
                                            type: "switch",
                                            id: "allowRollbar",
                                            value: !1,
                                            origins: ["*://api.rollbar.com/*"],
                                            doShow: !0
                                        },
                                        grantCookies: {
                                            type: "switch",
                                            id: "grantCookies",
                                            value: !1,
                                            permissions: ["cookies", "webRequest", "webRequestBlocking"],
                                            doShow: "firefox" === I.browser
                                        }
                                    }, t.next = 3, this.get("options");
                                case 3:
                                    for ((e = t.sent).options && (this.options = e.options), r = function () {
                                            var t = i[n];
                                            if (t.value = void 0 === o.options[t.id] ? t.value : o.options[t.id], o.isOption(t, "services", "custom")) {
                                                var e = Object.fromEntries(x().filter((function (e) {
                                                    return !(e.id in t.value)
                                                })).map((function (t) {
                                                    return [t.id, {
                                                        scrobble: !1,
                                                        sync: !1,
                                                        autoSync: !1,
                                                        autoSyncDays: 7,
                                                        lastSync: 0,
                                                        lastSyncId: ""
                                                    }]
                                                })));
                                                t.value = jt.mergeObjs(t.value, e)
                                            }
                                            o.options[t.id] = t.value
                                        }, n = 0, i = Object.values(this.optionsDetails); n < i.length; n++) r();
                                case 7:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "saveOptions",
                value: function (t) {
                    var r, n = this,
                        i = jt.mergeObjs(this.options, t),
                        o = [],
                        a = gr(Object.entries(t));
                    try {
                        for (a.s(); !(r = a.n()).done;) {
                            var s = y(r.value, 2),
                                c = s[0],
                                u = s[1];
                            if (u) {
                                var l = this.optionsDetails[c];
                                (l.permissions || l.origins) && (u ? o.push(E().permissions.request({
                                    permissions: l.permissions || [],
                                    origins: l.origins || []
                                })) : o.push(E().permissions.remove({
                                    permissions: l.permissions || [],
                                    origins: l.origins || []
                                })))
                            }
                        }
                    } catch (t) {
                        a.e(t)
                    } finally {
                        a.f()
                    }
                    if (t.services) {
                        for (var h = [], f = [], p = 0, d = Object.entries(t.services); p < d.length; p++) {
                            var v = y(d[p], 2),
                                g = v[0],
                                b = v[1];
                            if (b && ("scrobble" in b || "sync" in b)) {
                                var k = i.services[g],
                                    S = w(g);
                                b.scrobble || b.sync ? h.push.apply(h, O(S.hostPatterns)) : !k.scrobble && !k.sync && f.push.apply(f, O(S.hostPatterns))
                            }
                        }
                        if (0 < h.length || 0 < f.length) {
                            var A = x().some((function (t) {
                                return t.hasScrobbler && i.services[t.id].scrobble
                            }));
                            0 < h.length && o.push(E().permissions.request({
                                permissions: A ? ["tabs"] : [],
                                origins: h
                            })), 0 < f.length && o.push(E().permissions.remove({
                                permissions: A ? [] : ["tabs"],
                                origins: f
                            }))
                        }
                    }
                    return 0 === o.length && o.push(Promise.resolve(!0)), Promise.all(o).then(function () {
                        var r = e(m().mark((function e(r) {
                            return m().wrap((function (e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (!r.every((function (t) {
                                                return t
                                            }))) {
                                            e.next = 7;
                                            break
                                        }
                                        return e.next = 3, n.doSet({
                                            options: i
                                        }, !0);
                                    case 3:
                                        n.updateOptions(t), I.events.dispatch("STORAGE_OPTIONS_CHANGE", null, {
                                            options: t
                                        }), e.next = 8;
                                        break;
                                    case 7:
                                        throw new Error("Permissions not granted");
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function () {
                            return r.apply(this, arguments)
                        }
                    }())
                }
            }, {
                key: "updateOptions",
                value: function (t) {
                    this.options = jt.mergeObjs(this.options, t), this.optionsDetails = jt.mergeObjs(this.optionsDetails, Object.fromEntries(Object.entries(this.options).map((function (t) {
                        var e = y(t, 2);
                        return [e[0], {
                            value: e[1]
                        }]
                    }))))
                }
            }, {
                key: "isOption",
                value: function (t, e) {
                    var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                    return !(e && t.id !== e || r && t.type !== r)
                }
            }, {
                key: "loadSyncOptions",
                value: function () {
                    var t = e(m().mark((function t() {
                        var e, r, n, i;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return this.syncOptionsDetails = {
                                        hideSynced: {
                                            type: "switch",
                                            id: "hideSynced",
                                            value: !1,
                                            doShow: !0
                                        },
                                        addWithReleaseDate: {
                                            type: "switch",
                                            id: "addWithReleaseDate",
                                            value: !1,
                                            doShow: !0
                                        },
                                        addWithReleaseDateMissing: {
                                            type: "switch",
                                            id: "addWithReleaseDateMissing",
                                            value: !1,
                                            dependencies: ["addWithReleaseDate"],
                                            doShow: !0
                                        },
                                        minPercentageWatched: {
                                            type: "number",
                                            id: "minPercentageWatched",
                                            value: 75,
                                            minValue: 0,
                                            maxValue: 100,
                                            doShow: !0
                                        }
                                    }, t.next = 3, this.get("syncOptions");
                                case 3:
                                    for ((e = t.sent).syncOptions && (this.syncOptions = e.syncOptions), r = 0, n = Object.values(this.syncOptionsDetails); r < n.length; r++)(i = n[r]).value = void 0 === this.syncOptions[i.id] ? i.value : this.syncOptions[i.id], this.isOption(i, null, "number") && (void 0 !== i.minValue && (i.value = Math.max(i.value, i.minValue)), void 0 !== i.maxValue && (i.value = Math.min(i.value, i.maxValue))), this.syncOptions[i.id] = i.value;
                                case 6:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "saveSyncOptions",
                value: function () {
                    var t = e(m().mark((function t(e) {
                        var r;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return r = jt.mergeObjs(this.syncOptions, e), t.next = 3, this.doSet({
                                        syncOptions: r
                                    }, !0);
                                case 3:
                                    this.updateSyncOptions(e), I.events.dispatch("STORAGE_OPTIONS_CHANGE", null, {
                                        syncOptions: e
                                    });
                                case 5:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "updateSyncOptions",
                value: function (t) {
                    this.syncOptions = jt.mergeObjs(this.syncOptions, t), this.syncOptionsDetails = jt.mergeObjs(this.syncOptionsDetails, Object.fromEntries(Object.entries(this.syncOptions).map((function (t) {
                        var e = y(t, 2);
                        return [e[0], {
                            value: e[1]
                        }]
                    }))))
                }
            }, {
                key: "checkDisabledOption",
                value: function (t) {
                    var e, r, n = this;
                    return null !== (e = null === (r = t.dependencies) || void 0 === r ? void 0 : r.some((function (t) {
                        return !n.options[t]
                    }))) && void 0 !== e && e
                }
            }, {
                key: "checkSyncOptionDisabled",
                value: function (t) {
                    var e, r, n = this;
                    return null !== (e = null === (r = t.dependencies) || void 0 === r ? void 0 : r.some((function (t) {
                        return !n.syncOptions[t]
                    }))) && void 0 !== e && e
                }
            }]), t
        }());
        I.storage = br;
        var wr = r(1995),
            xr = r.n(wr),
            kr = new(function () {
                function t() {
                    var e = this;
                    n(this, t), p(this, "rollbar", void 0), p(this, "onStorageOptionsChange", (function (t) {
                        t.options && "allowRollbar" in t.options && e.checkRollbar()
                    }))
                }
                return o(t, [{
                    key: "init",
                    value: function () {
                        var t = this;
                        this.checkRollbar(), I.events.subscribe("STORAGE_OPTIONS_CHANGE", null, this.onStorageOptionsChange), I.events.subscribe("SCROBBLE_ERROR", null, (function (e) {
                            return t.onItemError(e, "scrobble")
                        })), I.events.subscribe("SEARCH_ERROR", null, (function (e) {
                            return t.onItemError(e, "find")
                        }))
                    }
                }, {
                    key: "checkRollbar",
                    value: function () {
                        var t = I.storage.options.allowRollbar;
                        t && !this.rollbar ? (this.rollbar = new(xr())({
                            accessToken: I.rollbarToken,
                            autoInstrument: {
                                network: !1
                            },
                            captureIp: !1,
                            captureUncaught: !0,
                            captureUnhandledRejections: !0,
                            payload: {
                                environment: I.environment
                            }
                        }), window.Rollbar = this.rollbar) : !t && this.rollbar && (delete this.rollbar, delete window.Rollbar)
                    }
                }, {
                    key: "onItemError",
                    value: function () {
                        var t = e(m().mark((function t(e, r) {
                            var n;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (!e.error) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.next = 3, I.storage.get("auth");
                                    case 3:
                                        (n = t.sent).auth && n.auth.access_token ? this.error("Failed to ".concat(r, " item."), e.error) : this.warning("Failed to ".concat(r, " item."), e.error);
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "log",
                    value: function (t, e) {
                        console.log("[UTS] ".concat(t.toString()), e)
                    }
                }, {
                    key: "warning",
                    value: function (t, e) {
                        console.warn("[UTS] ".concat(t), e), this.rollbar && this.rollbar.warning(t, e.message)
                    }
                }, {
                    key: "error",
                    value: function (t, e) {
                        console.error("[UTS] ".concat(t), e), this.rollbar && this.rollbar.error(t, e.message)
                    }
                }, {
                    key: "validate",
                    value: function (t) {
                        return t instanceof Wt ? !t.isCanceled : t instanceof Error
                    }
                }]), t
            }());

        function Sr(t, e) {
            var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!r) {
                if (Array.isArray(t) || (r = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Or(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Or(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                    r && (t = r);
                    var n = 0,
                        i = function () {};
                    return {
                        s: i,
                        n: function () {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function (t) {
                            throw t
                        },
                        f: i
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = !0,
                a = !1;
            return {
                s: function () {
                    r = r.call(t)
                },
                n: function () {
                    var t = r.next();
                    return o = t.done, t
                },
                e: function (t) {
                    a = !0
                },
                f: function t() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw t
                    }
                }
            }
        }

        function Or(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
            return n
        }
        I.errors = kr;
        var Ar = new(function () {
            function t() {
                n(this, t), p(this, "GLOBAL_EVENTS", ["SCROBBLE_SUCCESS", "SCROBBLE_ERROR", "SCROBBLE_START", "SCROBBLE_PAUSE", "SCROBBLE_STOP", "SCROBBLE_PROGRESS", "SEARCH_ERROR", "SCROBBLING_ITEM_CORRECTED", "STORAGE_OPTIONS_CHANGE", "CONTENT_SCRIPT_CONNECT", "CONTENT_SCRIPT_DISCONNECT", "REQUESTS_CANCEL"]), p(this, "globalSpecifier", "all"), p(this, "listeners", void 0), this.listeners = {}
            }
            return o(t, [{
                key: "init",
                value: function () {}
            }, {
                key: "subscribe",
                value: function (t, e, r) {
                    e || (e = this.globalSpecifier), this.listeners[t] || (this.listeners[t] = {}), this.listeners[t][e] || (this.listeners[t][e] = []), this.listeners[t][e].push(r)
                }
            }, {
                key: "unsubscribe",
                value: function (t, e, r) {
                    this.listeners[t] && (!e && (e = this.globalSpecifier), this.listeners[t][e] && (this.listeners[t][e] = this.listeners[t][e].filter((function (t) {
                        return t !== r
                    }))))
                }
            }, {
                key: "dispatch",
                value: function () {
                    var t = e(m().mark((function t(e, r, n) {
                        var i, o, a, s, c, u, l, h, f, p, d = arguments;
                        return m().wrap((function (t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if ((o = !!(3 < d.length && void 0 !== d[3]) && d[3]) && "STORAGE_OPTIONS_CHANGE" === e && (s = (a = n).options, c = a.syncOptions, s && I.storage.updateOptions(s), c && I.storage.updateSyncOptions(c)), o || !this.GLOBAL_EVENTS.includes(e)) {
                                        t.next = 10;
                                        break
                                    }
                                    u = {
                                        action: "dispatch-event",
                                        eventType: e,
                                        eventSpecifier: r,
                                        data: n
                                    }, t.t0 = I.pageType, t.next = "background" === t.t0 || "popup" === t.t0 ? 7 : "content" === t.t0 ? 8 : 10;
                                    break;
                                case 7:
                                    Yt.toAllContent(u);
                                case 8:
                                    return Yt.toExtension(u), t.abrupt("break", 10);
                                case 10:
                                    if (r || (r = this.globalSpecifier), l = this.listeners[e] && [].concat(O(null !== (i = this.listeners[e][this.globalSpecifier]) && void 0 !== i ? i : []), O(r !== this.globalSpecifier && this.listeners[e][r] || []))) {
                                        t.next = 14;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 14:
                                    h = Sr(l), t.prev = 15, h.s();
                                case 17:
                                    if ((f = h.n()).done) {
                                        t.next = 30;
                                        break
                                    }
                                    return p = f.value, t.prev = 19, t.next = 22, p(n);
                                case 22:
                                    t.next = 28;
                                    break;
                                case 24:
                                    throw t.prev = 24, t.t1 = t.catch(19), I.errors.validate(t.t1) && I.errors.log("Failed to dispatch.", t.t1), t.t1;
                                case 28:
                                    t.next = 17;
                                    break;
                                case 30:
                                    t.next = 35;
                                    break;
                                case 32:
                                    t.prev = 32, t.t2 = t.catch(15), h.e(t.t2);
                                case 35:
                                    return t.prev = 35, h.f(), t.finish(35);
                                case 38:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this, [
                            [15, 32, 35, 38],
                            [19, 24]
                        ])
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }()
            }]), t
        }());
        I.events = Ar;
        var Er = new Map,
            Tr = function (t) {
                if (!Er.has(t)) {
                    var e = function (t) {
                        var e = hr.get(t);
                        if (!e) throw new Error("Scrobble parser not registered for ".concat(t));
                        return e
                    }(t);
                    Er.set(t, new Ir(e))
                }
                var r = Er.get(t);
                if (!r) throw new Error("Scrobble controller not registered for ".concat(t));
                return r
            },
            Ir = function () {
                function t(r) {
                    var i = this;
                    n(this, t), p(this, "api", void 0), p(this, "parser", void 0), p(this, "reachedScrobbleThreshold", !1), p(this, "scrobbleThreshold", 80), p(this, "progress", 0), p(this, "hasAddedListeners", !1), p(this, "onStorageOptionsChange", (function (t) {
                        var e, r, n = null === (e = t.options) || void 0 === e || null === (r = e.services) || void 0 === r ? void 0 : r[i.api.id];
                        n && "scrobble" in n && i.checkListeners()
                    })), p(this, "onItemCorrected", function () {
                        var t = e(m().mark((function t(e) {
                            var r;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (e.newItem.trakt) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 2:
                                        if (r = i.parser.getItem()) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 5:
                                        return t.next = 7, i.updateProgress(0);
                                    case 7:
                                        return t.next = 9, i.stopScrobble();
                                    case 9:
                                        return r.trakt = ke(e.newItem.trakt), t.next = 12, i.startScrobble();
                                    case 12:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()), this.parser = r, this.api = this.parser.api
                }
                return o(t, [{
                    key: "init",
                    value: function () {
                        this.checkListeners(), I.events.subscribe("STORAGE_OPTIONS_CHANGE", null, this.onStorageOptionsChange)
                    }
                }, {
                    key: "checkListeners",
                    value: function () {
                        var t, e, r = (null === (t = I.storage.options) || void 0 === t || null === (e = t.services) || void 0 === e ? void 0 : e[this.api.id]).scrobble;
                        r && !this.hasAddedListeners ? (I.events.subscribe("SCROBBLING_ITEM_CORRECTED", null, this.onItemCorrected), this.hasAddedListeners = !0) : !r && this.hasAddedListeners && (I.events.unsubscribe("SCROBBLING_ITEM_CORRECTED", null, this.onItemCorrected), this.hasAddedListeners = !1)
                    }
                }, {
                    key: "startScrobble",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i, o, a;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (e = this.parser.getItem()) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 3:
                                        if (this.reachedScrobbleThreshold = !1, this.progress = 0, void 0 !== e.trakt) {
                                            t.next = 27;
                                            break
                                        }
                                        return t.next = 8, Ht.get(["itemsToTraktItems", "traktItems", "urlsToTraktItems"]);
                                    case 8:
                                        return r = t.sent, t.next = 11, I.storage.get(["corrections"]);
                                    case 11:
                                        return n = t.sent, i = n.corrections, o = e.getDatabaseId(), a = null == i ? void 0 : i[o], t.prev = 15, t.next = 18, Ne.find(e, r, a);
                                    case 18:
                                        e.trakt = t.sent, t.next = 25;
                                        break;
                                    case 21:
                                        throw t.prev = 21, t.t0 = t.catch(15), e.trakt = null, t.t0;
                                    case 25:
                                        return t.next = 27, Ht.set(r);
                                    case 27:
                                        if (e.trakt) {
                                            t.next = 29;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 29:
                                        return e.trakt.progress = e.progress, t.next = 32, Ke.start(e);
                                    case 32:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [15, 21]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "pauseScrobble",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (null != (e = this.parser.getItem()) && e.trakt) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 3:
                                        return t.next = 5, Ke.pause(e);
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "stopScrobble",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (null != (e = this.parser.getItem()) && e.trakt) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 3:
                                        return t.next = 5, Ke.stop(e);
                                    case 5:
                                        this.parser.clearItem(), this.reachedScrobbleThreshold = !1, this.progress = 0;
                                    case 8:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "updateProgress",
                    value: function () {
                        var t = e(m().mark((function t(e) {
                            var r, n, i, o, a;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (r = this.parser.getItem()) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 3:
                                        if (r.progress = e, null != r && r.trakt) {
                                            t.next = 6;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 6:
                                        if (r.trakt.progress = e, this.reachedScrobbleThreshold || !(r.trakt.progress > this.scrobbleThreshold)) {
                                            t.next = 21;
                                            break
                                        }
                                        return this.reachedScrobbleThreshold = !0, t.next = 11, I.storage.get("scrobblingDetails");
                                    case 11:
                                        if (n = t.sent, !(i = n.scrobblingDetails)) {
                                            t.next = 19;
                                            break
                                        }
                                        return i.item = r.save(), t.next = 17, I.storage.set({
                                            scrobblingDetails: i
                                        }, !1);
                                    case 17:
                                        return t.next = 19, I.events.dispatch("SCROBBLE_PROGRESS", null, i);
                                    case 19:
                                        t.next = 33;
                                        break;
                                    case 21:
                                        if (!(r.progress < this.progress || 0 === this.progress && 1 < r.progress || 10 < r.progress - this.progress)) {
                                            t.next = 33;
                                            break
                                        }
                                        return this.progress = r.progress, t.next = 25, I.storage.get("scrobblingDetails");
                                    case 25:
                                        if (o = t.sent, !(a = o.scrobblingDetails)) {
                                            t.next = 33;
                                            break
                                        }
                                        return a.item = r.save(), t.next = 31, I.storage.set({
                                            scrobblingDetails: a
                                        }, !1);
                                    case 31:
                                        return t.next = 33, I.events.dispatch("SCROBBLE_PROGRESS", null, a);
                                    case 33:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t
            }();

        function _r(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), r.push.apply(r, n)
            }
            return r
        }

        function Rr(t) {
            for (var e, r = 1; r < arguments.length; r++) e = null == arguments[r] ? {} : arguments[r], r % 2 ? _r(Object(e), !0).forEach((function (r) {
                p(t, r, e[r])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : _r(Object(e)).forEach((function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
            }));
            return t
        }
        var Cr = new Map,
            Pr = function (t) {
                if (!Cr.has(t)) {
                    var e = Tr(t);
                    Cr.set(t, new jr(e))
                }
                var r = Cr.get(t);
                if (!r) throw new Error("Scrobble events not registered for ".concat(t));
                return r
            },
            jr = function () {
                function t(e) {
                    var r = this,
                        i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                    n(this, t), p(this, "api", void 0), p(this, "parser", void 0), p(this, "controller", void 0), p(this, "options", void 0), p(this, "changeListenerId", null), p(this, "url", ""), p(this, "playbackStarted", !1), p(this, "isPaused", !0), p(this, "progress", 0), p(this, "hasAddedListeners", !1), p(this, "onStorageOptionsChange", (function (t) {
                        var e, n, i = null === (e = t.options) || void 0 === e || null === (n = e.services) || void 0 === n ? void 0 : n[r.api.id];
                        i && "scrobble" in i && r.checkListeners()
                    })), this.controller = e, this.parser = this.controller.parser, this.api = this.parser.api, this.options = Object.freeze(Rr(Rr({}, this.getDefaultOptions()), i))
                }
                return o(t, [{
                    key: "getDefaultOptions",
                    value: function () {
                        return {
                            checkFrequency: .5
                        }
                    }
                }, {
                    key: "getLocation",
                    value: function () {
                        return window.location.href
                    }
                }, {
                    key: "init",
                    value: function () {
                        this.checkListeners(), I.events.subscribe("STORAGE_OPTIONS_CHANGE", null, this.onStorageOptionsChange)
                    }
                }, {
                    key: "checkListeners",
                    value: function () {
                        var t = I.storage.options.services[this.api.id].scrobble;
                        t && !this.hasAddedListeners ? (this.checkForChanges(), this.parser.onClick && document.addEventListener("click", this.parser.onClick, !0), this.hasAddedListeners = !0) : !t && this.hasAddedListeners && (null !== this.changeListenerId && (window.clearTimeout(this.changeListenerId), this.changeListenerId = null), this.parser.onClick && document.removeEventListener("click", this.parser.onClick), this.hasAddedListeners = !1)
                    }
                }, {
                    key: "checkForChanges",
                    value: function () {
                        var t = e(m().mark((function t() {
                            var e, r, n, i = this;
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (e = this.getLocation(), this.url === e) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.next = 4, this.onUrlChange(this.url, e);
                                    case 4:
                                        this.url = e;
                                    case 5:
                                        return t.next = 7, this.parser.parsePlayback();
                                    case 7:
                                        if (!(r = t.sent)) {
                                            t.next = 31;
                                            break
                                        }
                                        if (n = r.progress, this.progress === n) {
                                            t.next = 14;
                                            break
                                        }
                                        return t.next = 13, this.controller.updateProgress(n);
                                    case 13:
                                        this.progress = n;
                                    case 14:
                                        if (t.prev = 14, !r.isPaused || this.isPaused) {
                                            t.next = 20;
                                            break
                                        }
                                        return t.next = 18, this.controller.pauseScrobble();
                                    case 18:
                                        t.next = 23;
                                        break;
                                    case 20:
                                        if (r.isPaused || !this.isPaused) {
                                            t.next = 23;
                                            break
                                        }
                                        return t.next = 23, this.controller.startScrobble();
                                    case 23:
                                        t.next = 27;
                                        break;
                                    case 25:
                                        t.prev = 25, t.t0 = t.catch(14);
                                    case 27:
                                        this.playbackStarted = !0, this.isPaused = r.isPaused, t.next = 37;
                                        break;
                                    case 31:
                                        if (!this.playbackStarted) {
                                            t.next = 37;
                                            break
                                        }
                                        return t.next = 34, this.controller.stopScrobble();
                                    case 34:
                                        this.playbackStarted = !1, this.isPaused = !0, this.progress = 0;
                                    case 37:
                                        this.changeListenerId = window.setTimeout((function () {
                                            i.checkForChanges()
                                        }), 1e3 * this.options.checkFrequency);
                                    case 38:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [14, 25]
                            ])
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "onUrlChange",
                    value: function () {
                        var t = e(m().mark((function t(e, r) {
                            return m().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.parser.options.watchingUrlRegex) {
                                            t.next = 2;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 2:
                                        if (!this.parser.options.watchingUrlRegex.test(e)) {
                                            t.next = 6;
                                            break
                                        }
                                        return t.next = 5, this.controller.stopScrobble();
                                    case 5:
                                        this.playbackStarted = !1;
                                    case 6:
                                        this.parser.options.watchingUrlRegex.test(r) && (this.playbackStarted = !0), this.isPaused = !0, this.progress = 0;
                                    case 9:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }]), t
            }(),
            Lr = function () {
                var t = e(m().mark((function t(e) {
                    return m().wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return I.pageType = "content", t.next = 3, br.init();
                            case 3:
                                kr.init(), Ar.init(), Qt.init(), nr.init(), Tr(e).init(), Pr(e).init(), Yt.init();
                            case 10:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function () {
                    return t.apply(this, arguments)
                }
            }();
        Yt.addHandlers({
            "inject-function": function (t) {
                var e = t.serviceId,
                    r = t.key,
                    n = t.url,
                    i = t.fnStr,
                    o = t.fnParamsStr;
                return nr.inject(e, r, n, i, o)
            }
        }), Lr("amazon-prime")
    })()
})();