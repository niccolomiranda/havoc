! function e(n, t, o) {
    function r(i, a) {
        if (!t[i]) {
            if (!n[i]) {
                var u = "function" == typeof require && require;
                if (!a && u) return u(i, !0);
                if (s) return s(i, !0);
                var l = new Error("Cannot find module '" + i + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = t[i] = {
                exports: {}
            };
            n[i][0].call(c.exports, function (e) {
                var t = n[i][1][e];
                return r(t ? t : e)
            }, c, c.exports, e, n, t, o)
        }
        return t[i].exports
    }
    for (var s = "function" == typeof require && require, i = 0; i < o.length; i++) r(o[i]);
    return r
}({
    "/Users/bensonwong/Documents/jam3/prj-thx/index.js": [function (e) {
        "use strict";
        e("./lib/util/override-clone-uniforms")();
        var n = e("./lib/createEmbed"),
            t = document.querySelector("#canvas");
        n(t)
    }, {
        "./lib/createEmbed": "/Users/bensonwong/Documents/jam3/prj-thx/lib/createEmbed.js",
        "./lib/util/override-clone-uniforms": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/override-clone-uniforms.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/EquiToCube.js": [function (e, n) {
        "use strict";

        function t(e) {
            if (this.renderer = e, null === r) {
                var n = e.getContext();
                r = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE)
            }
            this.material = new THREE.MeshBasicMaterial({
                map: null,
                side: THREE.BackSide
            }), s || (s = new THREE.SphereBufferGeometry(100, 256, 64)), this.mesh = new THREE.Mesh(s, this.material), this.scene = new THREE.Scene, this.scene.add(this.mesh);
            var t = Math.min(o, r);
            this.camera = new THREE.CubeCamera(1, 1e3, t), this.cubeTexture = this.camera.renderTarget.texture, clearTimeout(i), i = setTimeout(function () {
                s.dispose()
            }, 3e3)
        }
        var o = 1024,
            r = null,
            s = void 0,
            i = void 0;
        n.exports = t, t.prototype.convert = function (e) {
            this.material.map = e, this.material.needsUpdate = !0, this.camera.updateCubeMap(this.renderer, this.scene)
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/index.js": [function (e, n) {
        (function (t) {
            "use strict";

            function o(e, n) {
                if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
            }
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
                s = function () {
                    function e(e, n) {
                        for (var t = 0; t < n.length; t++) {
                            var o = n[t];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (n, t, o) {
                        return t && e(n.prototype, t), o && e(n, o), n
                    }
                }(),
                i = e("path"),
                a = e("object-assign"),
                u = e("map-limit"),
                l = function () { },
                c = function (e) {
                    return /\.(jpe?g|png|gif|bmp|tga|tif)$/i.test(e)
                },
                d = e("./loadTexture"),
                m = e("./loadAudio"),
                f = e("./loadEnvMap"),
                p = e("load-img"),
                h = function () {
                    function e() {
                        o(this, e), this._cache = {}, this._queue = [], this._renderer = null, this._asyncLimit = 10
                    }
                    return s(e, [{
                        key: "includeAll",
                        value: function () {
                            var e = this,
                                n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return n = Array.isArray(n) ? n : [n], n.map(function (n) {
                                return e.include(n)
                            })
                        }
                    }, {
                        key: "include",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            if (!e || "object" !== ("undefined" == typeof e ? "undefined" : r(e))) throw new Error("First parameter must be an object!");
                            if (!e.url) throw new TypeError("Must specify a URL or opt.url for AssetManager#include()");
                            e = a({}, e), e.key = e.key || e.url;
                            var n = this._getQueued(e.key);
                            return n || this._queue.push(e), e.key
                        }
                    }, {
                        key: "_getQueued",
                        value: function (e) {
                            for (var n = 0; n < this._queue.length; n++) {
                                var t = this._queue[n];
                                if (t.key === e) return t
                            }
                            return null
                        }
                    }, {
                        key: "get",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                            if (!e) throw new TypeError("Must specify a key or URL for AssetManager#get()");
                            return e in this._cache || console.warn("Could not find an asset by the key or URL " + e), this._cache[e]
                        }
                    }, {
                        key: "setRenderer",
                        value: function (e) {
                            this._renderer = e
                        }
                    }, {
                        key: "load",
                        value: function () {
                            var e = this,
                                n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
                                t = this._queue.slice();
                            this._queue.length = 0, u(t, this._asyncLimit, function (n, t) {
                                e.loadItem(n, t)
                            }, n)
                        }
                    }, {
                        key: "loadItem",
                        value: function (e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l,
                                o = e.url,
                                s = i.extname(o),
                                a = e.key || o,
                                u = this._cache,
                                h = this._renderer;
                            if (!(a in u)) {
                                var v = function (e, t) {
                                    e ? delete u[o] : u[o] = t, n && n(e, t)
                                };
                                if (e.envMap) return f(o, e, h, v);
                                if (c(s)) {
                                    var g = void 0;
                                    return g = e.texture !== !1 ? d(o, e, h, v) : p(o, e, v), u[a] = g, g
                                }
                                if (/.(wav|mp3|ogg|mp4)$/i.test(s)) {
                                    if (!e.audioContext) throw new TypeError("AudioContext not specified for asset: " + o);
                                    return void m(o, e.audioContext, v)
                                }
                                throw new Error("Could not load " + o + ", unknown file extension!")
                            }
                            var x = function () {
                                var e = u[a];
                                return t.nextTick(function () {
                                    return n(null, e)
                                }), {
                                    v: e
                                }
                            }();
                            return "object" === ("undefined" == typeof x ? "undefined" : r(x)) ? x.v : void 0
                        }
                    }]), e
                }();
            n.exports = new h
        }).call(this, e("_process"))
    }, {
        "./loadAudio": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadAudio.js",
        "./loadEnvMap": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadEnvMap.js",
        "./loadTexture": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadTexture.js",
        _process: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/process/browser.js",
        "load-img": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/load-img/index.js",
        "map-limit": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/map-limit/index.js",
        "object-assign": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js",
        path: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/path-browserify/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadAudio.js": [function (e, n) {
        "use strict";

        function t(e, n) {
            function t(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r;
                n.decodeAudioData(e, function (e) {
                    t(null, e)
                }, function (e) {
                    return t(e)
                })
            }
            var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : r;
            o({
                uri: e,
                responseType: "arraybuffer"
            }, function (e, n, o) {
                return e ? s(e) : void t(o, s)
            })
        }
        var o = e("xhr"),
            r = function () { };
        n.exports = t
    }, {
        xhr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xhr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadEnvMap.js": [function (e, n) {
        "use strict";

        function t(e, n) {
            return [e + "px" + n, e + "nx" + n, e + "py" + n, e + "ny" + n, e + "pz" + n, e + "nz" + n]
        }
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            r = function () { },
            s = e("./EquiToCube"),
            i = e("./loadTexture"),
            a = e("clamp");
        n.exports = function (e, n, u, l) {
            function c() {
                var n = new Error("Could not load PBR map: " + e);
                console.error(n), l(n), l = r
            }

            function d(e) {
                if (n.pbr || "number" == typeof n.level) {
                    var t = new THREE.PMREMGenerator(e);
                    if (t.update(u), n.pbr) {
                        var o = new THREE.PMREMCubeUVPacker(t.cubeLods);
                        o.update(u);
                        var s = o.CubeUVRenderTarget;
                        e = s.texture
                    } else {
                        var i = a(Math.floor(n.level), 0, t.cubeLods.length);
                        e = t.cubeLods[i].texture
                    }
                }
                n.mapping && (e.mapping = n.mapping), l(null, e), l = r
            }
            if (!u) throw new Error("PBR Map requires renderer to be set on AssetManager!");
            if (!n.equirectangular) {
                var m = n.hdr,
                    f = m ? ".hdr" : ".png",
                    p = t(e, f);
                return m ? (new THREE.HDRCubeTextureLoader).load(THREE.UnsignedByteType, p, d, r, c) : (new THREE.CubeTextureLoader).load(p, function (e) {
                    e.encoding = THREE.RGBM16Encoding, d(e)
                }, r, c)
            }
            var h = function () {
                var n = new s(u);
                return i(e, {}, u, function (e, t) {
                    return e ? l(e) : (n.convert(t), t.dispose(), t.image.data = null, void d(n.cubeTexture))
                }), {
                    v: n.cubeTexture
                }
            }();
            return "object" === ("undefined" == typeof h ? "undefined" : o(h)) ? h.v : void 0
        }
    }, {
        "./EquiToCube": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/EquiToCube.js",
        "./loadTexture": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadTexture.js",
        clamp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/loadTexture.js": [function (e, n) {
        "use strict";

        function t(e, n) {
            e.needsUpdate = !0, "boolean" == typeof n.flipY && (e.flipY = n.flipY), "undefined" != typeof n.mapping && (e.mapping = n.mapping), "undefined" != typeof n.format && (e.format = n.format), e.wrapS = n.wrapS || THREE.ClampToEdgeWrapping, e.wrapT = n.wrapT || THREE.ClampToEdgeWrapping, e.minFilter = n.minFilter || THREE.LinearMipMapLinearFilter, e.magFilter = n.magFilter || THREE.LinearFilter, e.generateMipmaps = n.generateMipmaps !== !1
        }

        function o() { }
        var r = e("object-assign"),
            s = function () { };
        n.exports = function (e, n, i, a) {
            "function" == typeof n && (a = n, n = {}), n = r({}, n), a = a || s;
            var u = new o;
            u.encoding = n.encoding || THREE.LinearEncoding;
            var l = u.load(e, function (o) {
                o.name = e, t(o, n), i && i.setTexture2D(o, 0), a(null, o)
            }, function () { }, function () {
                var n = "Could not load texture " + e;
                console.error(n), a(new Error(n))
            }, n);
            return l
        }, o.prototype.load = function (e, n, t, o, r) {
            var s = new THREE.Texture;
            r && r.encoding && (s.encoding = r.encoding);
            var i = new window.Image;
            return i.onload = function () {
                s.image = i, s.needsUpdate = !0, n(s)
            }, i.onerror = function (e) {
                o(e)
            }, i.src = e, s
        }
    }, {
        "object-assign": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createAudio.js": [function (e, n) {
        "use strict"; {
            var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
                o = (e("xhr"), e("tweenr")()),
                r = e("soundbank-reverb"),
                s = (e("map-limit"), e("../assets")),
                i = e("../util/query"),
                a = new (window.AudioContext || window.webkitAudioContext),
                u = s.include({
                    url: "assets/audio/deepnote.mp3",
                    audioContext: a
                }),
                l = s.include({
                    url: "assets/audio/impulse.mp3",
                    audioContext: a
                }),
                c = e("element-class"),
                d = document.querySelector(".volume");
            document.querySelector(".volume > .on"), document.querySelector(".volume > .off")
        }
        n.exports = function () {
            function e() {
                y.gain.value = O || k || I ? 0 : 1
            }

            function n() {
                d.addEventListener("mousedown", function (n) {
                    n.preventDefault(), k = !k, k ? c(d).add("muted") : c(d).remove("muted"), e()
                })
            }

            function m() {
                var n, t;
                "undefined" != typeof document.hidden ? (n = "hidden", t = "visibilitychange") : "undefined" != typeof document.msHidden && (n = "msHidden", t = "msvisibilitychange"), document.addEventListener(t, function () {
                    I = Boolean(document[n]), e()
                })
            }

            function f() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                if (S) {
                    var n = a.createBufferSource();
                    n.buffer = S, n.start(0 === e ? 0 : a.currentTime + e), n.connect(U), n.onended = function () {
                        console.log("impulse end"), n.disconnect()
                    }, C = n
                }
            }

            function p() {
                R = 0, o.cancel(), L.value = 1, h(), M && j(M)
            }

            function h() {
                D.wet.value = L.value, D.dry.value = 1 - L.value
            }

            function v() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : R,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                T && (M || ! function () {
                    w();
                    var n = a.createBufferSource();
                    n.connect(E), n.onended = function () {
                        j(n), p()
                    }, n.buffer = T, R = e, n.start(0, R), E.gain.value = 0, A = a.currentTime, M = n, L.value = 1
                }(), h(), o.cancel(), o.to(L, {
                    value: 0,
                    delay: n,
                    duration: .5,
                    ease: "expoOut"
                }).on("update", h), o.to(E.gain, {
                    value: 1,
                    delay: n,
                    duration: 1,
                    ease: "expoOut"
                }))
            }

            function g() {
                S && C && C.stop()
            }

            function x() {
                T && M && ! function () {
                    o.cancel();
                    var e = M;
                    o.to(L, {
                        value: 1,
                        duration: .05,
                        ease: "expoOut"
                    }).on("update", h), o.to(E.gain, {
                        value: 0,
                        duration: .5,
                        ease: "quatOut"
                    }).on("complete", function (n) {
                        if (!n.cancelling) {
                            var t = a.currentTime;
                            R += t - A, j(e)
                        }
                    })
                }()
            }

            function b(e) {
                if (_) {
                    var n = r(a);
                    return n.time = 5, n.wet.value = 0, n.dry.value = 1, n.filterType = "highpass", n.cutoff.value = 700, n.connect(e), n
                }
                var o = function () {
                    var n = a.createGain(),
                        t = a.createGain(),
                        o = a.createGain(),
                        r = a.createBiquadFilter();
                    return n.connect(t), n.connect(o), r.type = "highpass", r.frequency.value = 1e3, t.connect(e), o.connect(r), r.connect(e), Object.defineProperties(n, {
                        wet: {
                            get: function () {
                                return o.gain
                            }
                        },
                        dry: {
                            get: function () {
                                return t.gain
                            }
                        }
                    }), n.wet.value = 0, n.dry.value = 1, {
                        v: n
                    }
                }();
                return "object" === ("undefined" == typeof o ? "undefined" : t(o)) ? o.v : void 0
            }

            function j(e) {
                e && (e.stop(0), e.disconnect(), e === M && (M = null))
            }

            function w() {
                "suspended" === a.state && "function" == typeof a.resume && a.resume()
            }
            var y = a.createGain();
            y.connect(a.destination);
            var _ = a.sampleRate <= 96e3,
                D = b(y),
                E = a.createGain();
            E.connect(D);
            var U = a.createGain();
            U.connect(y), U.gain.value = .35;
            var T = s.get(u),
                S = s.get(l),
                M = void 0,
                C = void 0,
                A = 0,
                R = 0,
                L = {
                    value: 0
                },
                k = Boolean(i.banner),
                I = !1,
                O = !1;
            return n(), m(), e(), {
                getCurrentTime: function () {
                    if (!M) return 0;
                    var e = a.currentTime;
                    return R + (e - A)
                },
                playImpulse: f,
                setTouchMute: function (n) {
                    O = n, e()
                },
                isTouchMute: function () {
                    return O
                },
                fadeIn: v,
                fadeOut: x,
                killImpulse: g,
                reset: p
            }
        }
    }, {
        "../assets": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/index.js",
        "../util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        "element-class": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/element-class/index.js",
        "map-limit": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/map-limit/index.js",
        "soundbank-reverb": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/soundbank-reverb/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js",
        xhr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xhr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createCrystals.js": [function (e, n) {
        "use strict";
        var t = e("new-array"),
            o = e("../assets"),
            r = e("tweenr"),
            s = (r(), r()),
            i = e("lerp"),
            a = e("smoothstep"),
            u = (e("eases"), e("clamp")),
            l = e("../shaders/CrystalMaterial"),
            c = e("../util/random"),
            d = c.randomFloat,
            m = c.simplex,
            f = e("three-buffer-vertex-data"),
            p = e("../util/query"),
            h = e("../util/isMobile"),
            v = e("defined"),
            g = v(p.glossiness, 1),
            x = {
                url: "assets/textures/pisaRGBM16/",
                envMap: !0,
                level: g
            },
            b = o.include(x);
        n.exports = function (e) {
            function n(n) {
                n /= 1e3;
                for (var t = E.getState(), o = E.getClimax(), r = E.isInputDown(), s = E.isClimax(), l = 0; l < X.length; l++) X[l].z *= W;
                p.climax && (t = 1, o = 1, r = !0, s = !0);
                var c = i(1, 4.5, t * o) * z;
                ee.forEach(function (l, d) {
                    l.material.uniforms.fadeIn.value = L.value, l.material.uniforms.audioState.value = t, l.material.uniforms.audioClimax.value = o, l.material.uniforms.mousePosition.value.copy(K), l.material.uniforms.resolution.value.set(e.width, e.height), l.material.uniforms.time.value += n * c;
                    var m = a(0, .15, t),
                        f = i(I, O, m),
                        p = i(f, P, o);
                    l.material.uniforms.vertexWeight.value = p, 2 === d && l.material.color.setStyle("white"), (r || s) && (l.material.uniforms.inputTime.value += n * c * o);
                    var h = n * i(l.minSpeed, l.maxSpeed, t);
                    r || s ? (l.rippleAcceleration += h, l.rippleAcceleration = u(l.rippleAcceleration, N, B)) : l.rippleAcceleration *= H, 0 === t && (l.rippleAcceleration = N), l.material.uniforms.rippleTime.value += l.rippleAcceleration * z
                })
            }

            function r() {
                s.cancel().to(L, {
                    value: 1,
                    delay: 0,
                    duration: 2,
                    ease: "quadOut"
                })
            }

            function c(e, n) {
                return n.set(e), n
            }

            function g(e) {
                arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                e = Array.isArray(e) ? e : [e], c(e[0], A), c(e[1] || e[0], R), ne.color1 = A.getStyle(), ee.forEach(function (e, n) {
                    var t = 0 === n ? A : R;
                    e.material.uniforms.color1.value.copy(t)
                })
            }

            function x() {
                ee.forEach(function (e, n) {
                    var t = 0 === n ? A : R;
                    e.material.uniforms.color1.value.copy(t)
                })
            }

            function j(n, t) {
                if (Z = !0, K.x = t[0] / e.width * 2 - 1, K.y = (e.height - 1 - t[1]) / e.height * 2 - 1, K.distanceTo($) >= V) {
                    J++;
                    for (var o = G - 1; o > 0; o--) {
                        var r = X[o - 1];
                        X[o].copy(r)
                    }
                    Y.copy(K).sub($), Y.clampScalar(-Q, Q);
                    var s = X[0].z;
                    J >= G && (s += .1 * Y.length()), s = Math.min(1, s), X[0].set(K.x, K.y, s), $.copy(K)
                }
            }

            function w(e) {
                var n = q,
                    t = F.clone();
                p.wireMix && (t.wireframe = 0 === e, t.wireframe && (t.envMap = void 0, t.needUpdate = !0)), t.uniforms = THREE.UniformsUtils.clone(t.uniforms), t.uniforms.index.value = 1 >= C ? 0 : e / (C - 1), t.uniforms.mouseOffsetStrengths.value = X;
                var o = new THREE.Mesh(n, t),
                    r = .001,
                    s = .15;
                return o.minSpeed = r, o.frustumCulled = !1, o.maxSpeed = s, o.rippleAcceleration = 0, o.position.z = -4, o
            }

            function y(e, n) {
                var t = new THREE.PlaneGeometry(e, e, n, n),
                    o = t.vertices;
                t.faces.forEach(function (e, n) {
                    var t = e.a,
                        r = e.b,
                        s = e.c,
                        i = o[t],
                        a = o[r],
                        u = o[s],
                        l = [i, a, u];
                    l.forEach(function (e) {
                        var t = Math.sin(40 * Math.sqrt(e.x * e.x + e.y * e.y)),
                            o = 2,
                            r = .02;
                        e.x += r * m.noise3D(e.y * o, t, n), e.y += r * m.noise3D(e.x * o, t, n)
                    })
                });
                var r = [],
                    s = [],
                    i = t.faceVertexUvs[0],
                    a = [],
                    u = [],
                    l = new THREE.Vector3,
                    c = new THREE.BufferGeometry,
                    p = !1;
                return p || t.faces.forEach(function (e, n) {
                    var t = e.a,
                        c = e.b,
                        m = e.c,
                        f = o[t],
                        p = o[c],
                        h = o[m],
                        v = [f, p, h],
                        g = i[n];
                    l.set(0, 0, 0), v.forEach(function (e, n) {
                        l.add(e), s.push(e.x, e.y, e.z), r.push(g[n].toArray())
                    }), l.divideScalar(3);
                    var x = l.toArray();
                    a.push(x, x, x);
                    var b = d(1);
                    u.push(b, b, b)
                }), f.attr(c, "position", s, 3), f.attr(c, "centroid", a, 3), f.attr(c, "uv", r, 2), f.attr(c, "sparkleWeight", u, 1), t.dispose(), c
            }

            function _() {
                var e = function () {
                    ee.forEach(function (e, n) {
                        var t = e.material;
                        t.shininess = ne.shininess, t.opacity = ne.opacity, t.envMap = ne.envMap ? k : void 0, t.wireframe = ne.wireMix ? 0 === n : ne.wireframe, t.uniforms.rippleMin.value = ne.rippleMin, t.uniforms.rippleMax.value = ne.rippleMax, t.uniforms.spin.value = ne.spin, t.uniforms.vertexNoise.value = ne.vertexNoise, t.uniforms.sparkles.value = ne.sparkles, t.needsUpdate = !0
                    }), I = ne.vertexWeightIdle, P = ne.vertexWeightClimax, z = ne.speed, A.setStyle(ne.color1), x()
                },
                    n = D.gui,
                    t = n.addFolder("scene");
                t.add(ne, "wireframe").onFinishChange(e), t.add(ne, "wireMix").onFinishChange(e), t.add(ne, "envMap").onFinishChange(e), t.add(ne, "shininess", 0, 200).onChange(e), t.add(ne, "opacity", 0, 1).onChange(e), t.add(ne, "spin", 0, 1).onChange(e), t.add(ne, "sparkles", 0, 1).onChange(e), t.addColor(ne, "color1").onChange(e).listen();
                var o = n.addFolder("shader");
                o.add(ne, "speed", 0, 10).onChange(e), o.add(ne, "rippleMin", 0, 100).onChange(e), o.add(ne, "rippleMax", 0, 100).onChange(e), o.add(ne, "vertexWeightIdle", 0, .5).onChange(e), o.add(ne, "vertexWeightClimax", 0, .5).onChange(e)
            }
            var D = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                E = D.input,
                U = D.gui,
                T = (e.camera.getWorldPosition().z, new THREE.Object3D),
                S = v(p.subdiv, h ? 110 : 150),
                M = 20,
                C = v(p.numLayers, 2),
                A = new THREE.Color,
                R = new THREE.Color,
                L = {
                    value: 0
                },
                k = o.get(b),
                I = .45,
                O = .1,
                P = .37,
                z = .8,
                q = y(M, S),
                F = new l({
                    side: h ? THREE.FrontSide : THREE.DoubleSide,
                    shininess: v(p.shininess, 200),
                    opacity: v(p.opacity, 1),
                    depthTest: !1,
                    depthWrite: !1,
                    blending: THREE.AdditiveBlending,
                    transparent: !0,
                    shading: THREE.FlatShading,
                    envMap: p.envMap !== !1 ? k : void 0,
                    wireframe: Boolean(p.wireframe)
                }),
                H = .975,
                N = .01,
                B = .1,
                V = .01,
                G = l.MOUSE_CAPACITY,
                W = p.bigMouse ? .98 : .97,
                X = t(G).map(function () {
                    return new THREE.Vector3
                }),
                Y = new THREE.Vector2,
                Q = .65,
                K = new THREE.Vector2(-2, -2),
                $ = K.clone(),
                Z = (K.clone(), !1),
                J = 0,
                ee = t(C).map(function (e, n) {
                    return w(n)
                });
            ee.forEach(function (e) {
                return T.add(e)
            });
            var ne = {
                envMap: Boolean(p.envMap !== !1),
                shininess: F.shininess,
                wireframe: Boolean(p.wireframe),
                wireMix: Boolean(p.wireMix),
                opacity: F.opacity,
                color1: A.getStyle(),
                speed: z,
                sparkles: F.uniforms.sparkles.value,
                spin: F.uniforms.spin.value,
                vertexWeightIdle: I,
                vertexWeightClimax: P,
                vertexNoise: F.uniforms.vertexNoise.value,
                rippleMin: F.uniforms.rippleMin.value,
                rippleMax: F.uniforms.rippleMax.value
            };
            return U && _(), {
                setColor: g,
                fadeIn: r,
                object3d: T,
                update: n,
                onMouseMove: j
            }
        }
    }, {
        "../assets": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/index.js",
        "../shaders/CrystalMaterial": "/Users/bensonwong/Documents/jam3/prj-thx/lib/shaders/CrystalMaterial.js",
        "../util/isMobile": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/isMobile.js",
        "../util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        "../util/random": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/random.js",
        clamp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js",
        defined: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/defined/index.js",
        eases: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/index.js",
        lerp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp/index.js",
        "new-array": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/new-array/index.js",
        smoothstep: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/smoothstep/index.js",
        "three-buffer-vertex-data": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-buffer-vertex-data/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createInput.js": [function (e, n) {
        "use strict";
        var t = (e("clamp"), e("tweenr")),
            o = Object.keys(e("eases")),
            r = e("events").EventEmitter,
            s = e("object-assign"),
            i = e("lodash.throttle"),
            a = e("touches"),
            u = e("mouse-event-offset"),
            l = e("./createAudio"),
            c = e("../util/isMobile"),
            d = e("../util/query"),
            m = t(),
            f = t(),
            p = t(),
            h = d.banner,
            v = 300;
        n.exports = function (e) {
            function n(n) {
                h || 0 !== n.button || (n.preventDefault(), u(n, e, k), C.emit("input-down", n, k), L(n))
            }

            function t(n) {
                h || (u(n, e, k), C.emit("input-up", n, k), _(n))
            }

            function g(n) {
                u(n, e, k), C.emit("input-move", n, k)
            }

            function x() {
                e.addEventListener("mousedown", n, !1), e.addEventListener("mousemove", g, !1), document.addEventListener("mouseup", t, !1)
            }

            function b() {
                e.removeEventListener("mousedown", n, !1), e.removeEventListener("mousemove", g, !1), document.removeEventListener("mouseup", t, !1)
            }

            function j() {
                B.value = 1, D(), H.fadeIn(K.initialRampTime)
            }

            function w() {
                if (N = !0, !W) {
                    var e = v / 1e3;
                    H.reset(), c || H.playImpulse(c ? e : 0), H.fadeIn(void 0, c ? e : 0), X = 1, m.cancel(), U({
                        targetValue: 1,
                        delay: c ? e : 0,
                        totalSeconds: K.initialRampTime,
                        ease: K.initialEase
                    }), p.cancel(), U({
                        targetValue: 1,
                        delay: c ? e : 0,
                        target: G,
                        totalSeconds: K.timeForClimax,
                        ease: "quadOut",
                        timeline: p
                    }), C.emit("charge-start")
                }
            }

            function y() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1;
                W || (X = -1, m.cancel(), U({
                    targetValue: 0,
                    totalSeconds: K.fadeOutTime,
                    ease: K.fadeOutEase
                }).on("complete", function () {
                    X = 0
                }), p.cancel(), U({
                    targetValue: 0,
                    target: G,
                    totalSeconds: 1,
                    ease: "quadInOut",
                    timeline: p
                }), e && H.killImpulse(), H.fadeOut(), C.emit("charge-end"))
            }

            function _() {
                N = !1, y()
            }

            function D() {
                f.cancel().to(V, {
                    duration: K.climaxRampTime,
                    value: 1,
                    ease: K.climaxRampEase
                }), W = !0, U({
                    targetValue: 0,
                    totalSeconds: K.finalFadeOutTime,
                    ease: K.finalFadeOutEase,
                    delay: K.sustainTime
                }).on("start", function () {
                    C.emit("audio-ending", {
                        duration: K.finalFadeOutTime,
                        ease: K.finalFadeOutEase
                    }), p.cancel(), U({
                        targetValue: 0,
                        target: G,
                        totalSeconds: 1,
                        ease: "quadInOut",
                        timeline: p
                    })
                }).on("update", function () {
                    V.value = B.value
                }).on("complete", function () {
                    W = !1, Q = !1, console.log("reset to zero"), H.reset(), X = 0, C.emit("audio-end"), C.emit("charge-end")
                })
            }

            function E() {
                var e = H.getCurrentTime();
                !W && e >= K.timeForClimax && D(), !Q && e >= Y && (C.emit("color-change"), Q = !0), $ && ($.state.style.display = K.debug ? "block" : "none", $.fade.style.display = K.debug ? "block" : "none", $.fade.style.background = W ? "green" : "white", $.fade.style.width = Math.floor(100 * B.value) + "%", $.state.style.width = Math.floor(100 * V.value) + "%")
            }

            function U(e) {
                var n = e.targetValue,
                    t = e.totalSeconds,
                    o = e.ease,
                    r = e.target,
                    s = void 0 === r ? B : r,
                    i = e.timeline,
                    a = void 0 === i ? m : i,
                    u = e.delay,
                    l = void 0 === u ? 0 : u,
                    c = 1 / t,
                    d = s.value,
                    f = Math.abs(d - n),
                    p = f / c;
                return a.to(s, {
                    value: n,
                    duration: p,
                    ease: o,
                    delay: l
                })
            }

            function T() {
                var e = document.createElement("div");
                s(e.style, {
                    zIndex: "100",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "0%",
                    height: "5px",
                    background: "blue"
                }), document.body.appendChild(e);
                var n = document.createElement("div");
                return s(n.style, {
                    zIndex: "100",
                    position: "fixed",
                    top: "5px",
                    left: 0,
                    width: "0%",
                    height: "5px",
                    background: "red"
                }), document.body.appendChild(n), {
                    fade: e,
                    state: n
                }
            }

            function S() {
                var e = A.addFolder("timing");
                e.add(K, "initialRampTime", 1, 10).name("initialFadeIn"), e.add(K, "initialEase", o).name("iniitialInEase"), e.add(K, "fadeOutTime", 1, 10).name("earlyFadeOut"), e.add(K, "fadeOutEase", o).name("earlyOutEase"), e.add(K, "finalFadeOutTime", 1, 10).name("endFadeOut"), e.add(K, "finalFadeOutEase", o).name("endOutEase"), e.add(K, "timeForClimax", 1, 10).name("climaxAfter"), e.add(K, "climaxRampTime", 0, 6).name("climaxFadeIn"), e.add(K, "climaxRampEase", o).name("climaxInEase"), e.add(K, "sustainTime", 1, 10).name("climaxDuration"), e.add(K, "debug").onChange(function () { })
            }
            var M = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                C = new r,
                A = M.gui,
                R = !0,
                L = i(w, 100),
                k = [0, 0],
                I = null,
                O = new THREE.Vector2,
                P = new THREE.Vector2,
                z = !1,
                q = function () {
                    var e = !1;
                    return I && (clearTimeout(I), I = null, e = !0), e
                },
                F = a(e, {
                    target: e,
                    type: "touch",
                    filtered: !0,
                    preventSimulated: !1
                }).on("start", function (e, n) {
                    h || (q(), O.fromArray(n), I = setTimeout(function () {
                        e.preventDefault(), z = !0, C.emit("input-start", e, n)
                    }, v), L(e))
                }).on("move", function (e, n) {
                    z && e.preventDefault();
                    var t = !1;
                    if (!z) {
                        var o = P.fromArray(n).distanceTo(O);
                        o > 10 && (t = q())
                    }
                    t ? y(!0) : C.emit("input-move", e, n)
                }).on("end", function (e, n) {
                    h || (z = !1, q(), e.preventDefault(), C.emit("input-end", e, n), _(e))
                });
            x();
            var H = l(),
                N = !1,
                B = {
                    value: 0
                },
                V = {
                    value: 0
                },
                G = {
                    value: 0
                },
                W = !1,
                X = 0,
                Y = 7,
                Q = !1,
                K = {
                    debug: Boolean(d.debugAudio),
                    climaxRampTime: 4.3,
                    initialRampTime: 10,
                    timeForClimax: 3.7,
                    sustainTime: 9,
                    fadeOutTime: 4,
                    finalFadeOutTime: 10,
                    finalFadeOutEase: "quadOut",
                    climaxRampEase: "sineOut",
                    fadeOutEase: "quadInOut",
                    initialEase: "sineOut"
                },
                $ = void 0;
            return (K.debug || A) && ($ = T()), d.climax && j(), s(C, {
                update: E,
                enable: function () {
                    R || (R = !0, F.enable(), x())
                },
                disable: function () {
                    R && (R = !1, F.disable(), b())
                },
                getDirection: function () {
                    return X
                },
                isInputDown: function () {
                    return N
                },
                isClimax: function () {
                    return W
                },
                getClimax: function () {
                    return V.value
                },
                getState: function () {
                    return B.value
                }
            }), A && S(), C
        }
    }, {
        "../util/isMobile": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/isMobile.js",
        "../util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        "./createAudio": "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createAudio.js",
        clamp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js",
        eases: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/index.js",
        events: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js",
        "lodash.throttle": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lodash.throttle/index.js",
        "mouse-event-offset": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js",
        "object-assign": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js",
        touches: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/touches/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createLights.js": [function (e, n) {
        "use strict";
        var t = e("mouse-event-offset"),
            o = e("tweenr")(),
            r = e("lerp");
        n.exports = function (e) {
            function n() {
                var n = [0, 0];
                e.canvas.addEventListener("mousemove", function (r) {
                    t(r, e.canvas, n), o.cancel().to(u, {
                        x: n[0] / e.width * 2 - 1,
                        y: n[1] / e.height * 2 - 1,
                        ease: "expoOut",
                        duration: .5
                    })
                })
            }
            var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = new THREE.Vector3,
                a = new THREE.Object3D,
                u = new THREE.Vector2,
                l = new THREE.Quaternion,
                c = new THREE.Quaternion,
                d = new THREE.Vector3(1, 0, 0),
                m = new THREE.Vector3(0, 1, 0),
                f = 0,
                p = 0,
                h = 4,
                v = 5,
                g = 6.5,
                x = 1,
                b = 58,
                j = "#8d50ff",
                w = new THREE.PointLight(j, g, b, x);
            a.add(w);
            var y = 0,
                _ = new THREE.AmbientLight("#000");
            a.add(_);
            var D = {
                ambient: _.color.getStyle(),
                intensityClimax: 10,
                intensityIdle: 1.25,
                falloffClimax: w.distance,
                falloffIdle: 30,
                radius: h,
                mouseScale: v,
                color: w.color.getStyle()
            },
                E = s.gui;
            if (E) {
                var U = function () {
                    w.color.setStyle(D.color), _.color.setStyle(D.ambient), h = D.radius, v = D.mouseScale
                },
                    T = E.addFolder("lights");
                T.add(D, "intensityIdle", 0, 20).onChange(U), T.add(D, "intensityClimax", 0, 20).onChange(U), T.add(D, "falloffIdle", 0, 100).onChange(U), T.add(D, "falloffClimax", 0, 100).onChange(U), T.add(D, "radius", 0, 10).onChange(U), T.add(D, "mouseScale", 0, 90).onChange(U), T.addColor(D, "color").onChange(U), T.addColor(D, "ambient").onChange(U)
            }
            return n(), {
                object3d: a,
                update: function () {
                    var e = Math.PI / 2,
                        n = 0;
                    w.position.x = Math.sin(e) * Math.sin(n), w.position.y = Math.cos(e), w.position.z = Math.sin(e) * Math.cos(n);
                    var t = v * Math.PI / 180,
                        o = u.y * t,
                        s = u.x * t;
                    l.setFromAxisAngle(d, -o), c.setFromAxisAngle(m, -s), l.multiply(c), w.position.applyQuaternion(l), w.position.multiplyScalar(h), w.distance = r(D.falloffIdle, D.falloffClimax, f), w.intensity = r(D.intensityIdle, D.intensityClimax, f), w.lookAt(i)
                },
                onMouseMove: function (n, t) {
                    y = 2 * (1 - t[0] / e.width) - 1
                },
                setState: function (e, n) {
                    f = e, p = n
                },
                setColor: function (e, n) {
                    w.color.set(e), _.color.set(n)
                },
                getSunColor: function () {
                    return w.color
                },
                getSunPosition: function () {
                    return w.position
                }
            }
        }
    }, {
        lerp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp/index.js",
        "mouse-event-offset": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createShockwave.js": [function (e, n) {
        "use strict";
        var t = e("tweenr")(),
            o = (e("mouse-event-offset"), e("touches")),
            r = e("../util/query");
        n.exports = function (e) {
            var n = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, e.canvas),
                s = new THREE.Vector2,
                i = {
                    strength: 0,
                    radius: 0
                };
            return r.banner || o(n, {
                filtered: !0,
                preventSimulated: !1
            }).on("start", function (n, o) {
                0 === n.button && (s.x = o[0] / e.width, s.y = (e.height - 1 - o[1]) / e.height, i.radius = 0, i.strength = 1, t.cancel().to(i, {
                    duration: 1,
                    ease: "expoOut",
                    radius: 1
                }), t.to(i, {
                    duration: 2,
                    ease: "quadOut",
                    strength: 0
                }))
            }), {
                update: function () {
                    e.post.shockwave && e.post.shockwave.setShockwave(s, i.radius, i.strength)
                }
            }
        }
    }, {
        "../util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        "mouse-event-offset": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js",
        touches: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/touches/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/createApp.js": [function (e, n) {
        "use strict";

        function t() {
            function e() {
                var e = new l(Q, G);
                if (X.addPass(e), !o && h.fxaa !== !1 && (Z.fxaa = new i.ShaderPass(a()), X.addPass(Z.fxaa), D)) {
                    var n = D.addFolder("anti-alias");
                    n.add(Z.fxaa, "enabled")
                }
                Z.bloom = new u(Q, G, {
                    gui: D,
                    gammaOutput: F.gammaFactor
                }), X.addPass(Z.bloom), Z.shockwave = Z.bloom, X.passes[X.passes.length - 1].renderToScreen = !0
            }

            function n() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    n = J.width / J.height,
                    t = 16 / 9,
                    o = t / n * 1;
                if (G.scale.set(o, o, o), K) $.update(), G.position.fromArray($.position), G.up.fromArray($.up), W.fromArray($.direction).add(G.position), G.lookAt(W);
                else {
                    var r = Math.PI / 2,
                        s = 0;
                    G.position.x = Math.sin(r) * Math.sin(s), G.position.y = Math.cos(r), G.position.z = Math.sin(r) * Math.cos(s);
                    var i = U * o,
                        a = T * Math.PI / 180,
                        u = I.y * a * (1 - E),
                        l = I.x * a * (1 - E);
                    O.setFromAxisAngle(z, -u), P.setFromAxisAngle(q, -l), O.multiply(P), G.position.applyQuaternion(O), G.position.multiplyScalar(i), W.set(0, 0, 0), G.lookAt(W)
                }
                G.aspect = n, G.updateProjectionMatrix(), X.passes.forEach(function (n) {
                    "function" == typeof n.tick && n.tick(e)
                })
            }

            function t() {
                X.passes.length >= 2 ? X.render() : F.render(Q, G)
            }

            function x() {
                var e = 20,
                    t = Math.max(2, window.innerWidth),
                    o = Math.max(2, window.innerHeight),
                    r = c(h.width, t),
                    s = c(h.height, o),
                    i = !1;
                if (i) {
                    var a = 720,
                        u = a / 1.6;
                    (r > a || s > u) && (r -= 2 * e, s -= 2 * e), r > a && (r = Math.min(a, r)), s > u && (s = Math.min(u, s))
                }
                h.alignTop ? J.left = J.top = 0 : (J.left = Math.floor((t - r) / 2), J.top = Math.floor((o - s) / 2)), H.style.left = J.left + "px", H.style.top = J.top + "px", H.style.position = "absolute", J.width = r, J.height = s;
                var l = c(v, A());
                l !== C && (F.setPixelRatio(l), C = l), F.setSize(r, s), X.passes.forEach(function (e) {
                    e.uniforms && e.uniforms.resolution && e.uniforms.resolution.value.set(Math.floor(r * l), Math.floor(s * l))
                }), Y.forEach(function (e) {
                    e.setSize(r * l, s * l)
                }), n(0), _.emit("resize")
            }

            function b() {
                var e = function () {
                    var e = new THREE.WebGLRenderTarget(Math.max(2, window.innerWidth), Math.max(2, window.innerHeight));
                    return e.texture.minFilter = THREE.NearestFilter, e.texture.magFilter = THREE.NearestFilter, e.texture.generateMipmaps = !1, e.texture.format = THREE.RGBFormat, e
                },
                    n = e(),
                    t = e();
                return new i(F, n, t)
            }

            function j() {
                var e = [0, 0];
                window.addEventListener("mousemove", function (n) {
                    f(n, J.canvas, e), m.cancel().to(I, {
                        x: e[0] / J.width * 2 - 1,
                        y: e[1] / J.height * 2 - 1,
                        ease: "expoOut",
                        duration: .5
                    })
                })
            }

            function w() {
                window.addEventListener("deviceorientation", function (e) {
                    var n = 20,
                        t = 20,
                        o = d(-e.beta / n, -1, 1),
                        r = d(e.gamma / t, -1, 1);
                    m.cancel().to(I, {
                        x: r,
                        y: o,
                        ease: "expoOut",
                        duration: .5
                    })
                }, !1)
            }
            var y = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                _ = new p,
                D = y.gui,
                E = 0,
                U = 3.5,
                T = 2,
                S = Math.min(o ? 1.5 : 2, window.devicePixelRatio),
                M = Math.min(1.5, S, window.devicePixelRatio),
                C = 1,
                A = function () {
                    var e = window.innerWidth * window.innerHeight,
                        n = 638400;
                    return e > n ? M : S
                },
                R = (c(v, A()), h.post !== !1),
                L = !o && !R,
                k = !1,
                I = new THREE.Vector2,
                O = new THREE.Quaternion,
                P = new THREE.Quaternion,
                z = new THREE.Vector3(1, 0, 0),
                q = new THREE.Vector3(0, 1, 0),
                F = new THREE.WebGLRenderer(s({
                    alpha: !1,
                    stencil: !1,
                    antialias: L
                }, y));
            F.setPixelRatio(C), F.gammaFactor = 2.2, (!R || k) && (F.gammaOutput = !0);
            var H = F.domElement,
                N = .1,
                B = 100,
                V = 65,
                G = new THREE.PerspectiveCamera(V, 1, N, B),
                W = new THREE.Vector3,
                X = b(),
                Y = [X.renderTarget1, X.renderTarget2],
                Q = new THREE.Scene,
                K = !1,
                $ = void 0;
            K && ($ = r(s({
                canvas: H,
                distanceBounds: [.15, 8],
                distance: U
            }, y))), window.addEventListener("resize", x), window.addEventListener("orientationchange", x);
            var Z = {
                enabled: !1
            };
            R && (Z.enabled = !0, e());
            var J = s(_, {
                tick: n,
                camera: G,
                scene: Q,
                renderer: F,
                canvas: H,
                setState: g,
                resize: x,
                render: t,
                post: Z
            });
            J.width = 0, J.height = 0, J.top = 0, J.left = 0, x(), n();
            var ee = window.innerWidth,
                ne = window.innerHeight;

            return setTimeout(function () {
                (ee !== window.innerWidth || ne !== window.innerHeight) && x()
            }, 750), o ? w() : j(), J
        }
        var o = e("./util/isMobile"),
            r = e("orbit-controls"),
            s = e("object-assign"),
            i = e("./post/EffectComposer"),
            a = e("three-shader-fxaa"),
            u = e("./post/BloomTexturePass"),
            l = e("./post/RenderPass"),
            c = e("defined"),
            d = (e("lerp"), e("clamp")),
            m = e("tweenr")(),
            f = e("mouse-event-offset"),
            p = e("events").EventEmitter,
            h = (/(iOS|iPhone|iPod|iPad)/i.test(navigator.userAgent), e("./util/query")),
            v = h.dpr,
            g = function () { };
        n.exports = t
    }, {
        "./post/BloomTexturePass": "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/BloomTexturePass.js",
        "./post/EffectComposer": "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/EffectComposer.js",
        "./post/RenderPass": "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/RenderPass.js",
        "./util/isMobile": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/isMobile.js",
        "./util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        clamp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js",
        defined: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/defined/index.js",
        events: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js",
        lerp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp/index.js",
        "mouse-event-offset": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js",
        "object-assign": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js",
        "orbit-controls": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/orbit-controls/index.js",
        "three-shader-fxaa": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-shader-fxaa/build/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/createEmbed.js": [function (e, n) {
        "use strict";
        var t = e("tweenr"),
            o = t(),
            r = t(),
            s = t(),
            i = t(),
            a = t(),
            u = e("dom-css"),
            l = e("./createApp"),
            c = e("raf-loop"),
            d = e("./components/createLights"),
            m = e("./components/createInput"),
            f = e("./components/createCrystals"),
            p = e("./components/createShockwave"),
            h = e("./assets"),
            v = e("./util/query"),
            g = e("element-class"),
            x = (e("touches"), e("lerp")),
            b = e("lodash.throttle"),
            j = e("./util/isMobile"),
            w = void 0,
            y = function () { },
            _ = document.querySelector(".logo"),
            D = document.querySelector(".info"),
            E = document.querySelector(".info-icon"),
            U = [document.querySelector(".info-volume"), document.querySelector(".info-input")],
            T = (document.querySelector(".bar"), document.querySelector(".scroll-icon")),
            S = e("./util/palettes")(),
            M = window._isSlowLoader;
        window.devicePixelRatio >= 2 && g(E).add("scale-animation");
        var C = v.banner,
            A = v.embedded,
            R = v.noUI;
        if (C || R) {
            var L = [".scroll-container", ".info-container", "#logo-container", ".volume"];
            L.forEach(function (e) {
                document.querySelector(e).style.display = "none"
            })
        }
        A && (document.querySelector(".scroll-container").style.display = "none"), window._slowLoadTimer && window.clearTimeout(window._slowLoadTimer), n.exports = function (e) {
            function n() {
                B.canvas.addEventListener("mousedown", z, !1), document.addEventListener("mouseup", q, !1)
            }

            function t() {
                B.canvas.removeEventListener("mousedown", z, !1), document.removeEventListener("mouseup", q, !1)
            }

            function L() {
                function t(e) {
                    if (!(!A && F && F.scrollY / B.height > .95)) {
                        P += e, w.update(e);
                        var n = w.getState(),
                            t = w.getClimax();
                        B.setState(n, t), y.setState(n, t);
                        var o = x(l.value, .8, n);
                        o !== i && (i = o, u(_, {
                            opacity: l.opacity,
                            transform: "scale3d(" + o + ", " + o + ", 1.0)"
                        })), h.forEach(function (n) {
                            return "function" == typeof n.update && n.update(e)
                        }), B.tick(e), B.render()
                    }
                }

                function s() {
                    j && (document.querySelector(".input-type").textContent = "tap");
                    var e = {
                        value: parseFloat(D.style.opacity) || 0
                    },
                        n = {
                            value: 0
                        };
                    U.forEach(function (e, n) {
                        return u(e, "opacity", 0 === n ? 1 : 0)
                    }), u(E, "opacity", 0);
                    var t = function () {
                        u(D, "opacity", e.value)
                    };
                    D.style.display = "", u(D, "opacity", 0), r.cancel().to(e, {
                        value: 1,
                        delay: N,
                        ease: "quadOut",
                        duration: 1
                    }).on("update", t).once("complete", k), a.to(n, {
                        duration: 1,
                        value: 1,
                        delay: N + .5,
                        ease: "quadOut"
                    }).on("update", function () {
                        return u(E, "opacity", n.value)
                    }), w.on("charge-start", function () {
                        r.cancel().to(e, {
                            value: 0,
                            ease: "quadOut",
                            duration: 1
                        }).on("update", t)
                    }), w.on("charge-end", function () {
                        r.cancel().to(e, {
                            value: 1,
                            delay: N,
                            ease: "quadOut",
                            duration: 1
                        }).on("update", t)
                    })
                }
                C || n(), B.canvas.style.display = "", document.querySelector(".loader").style.display = "none";
                var i = M ? 1 : .95,
                    l = {
                        value: i,
                        opacity: M ? 1 : 0
                    },
                    h = [],
                    g = function (e) {
                        return e && h.push(e), e
                    },
                    w = g(m(e, {
                        gui: O
                    })),
                    y = g(d(B, {
                        gui: O
                    }));
                g(p(B));
                var T = g(f(B, {
                    input: w,
                    gui: O
                }));
                h.forEach(function (e) {
                    return e.object3d && B.scene.add(e.object3d)
                }), c(t).start(), B.resize(), t(0);
                var L = S.getCurrent();
                T.setColor(L.color), y.setColor(L.light, L.ambient), C || R || (_.style.display = "block", s()), T.fadeIn(), o.to(l, {
                    opacity: 1,
                    duration: 1,
                    ease: "quadOut",
                    value: 1
                });
                var I = function () {
                    S.next(function (e) {
                        y.setColor(e.light, e.ambient), T.setColor(e.color)
                    })
                },
                    z = b(function () {
                        w.isClimax() || I()
                    }, 500);
                w.on("input-move", function (e, n) {
                    T.onMouseMove(e, n), y.onMouseMove(e, n)
                }), v.colorOnClick ? w.on("input-start", z) : w.on("color-change", I)
            }

            function k() {
                var e = 0,
                    n = !0,
                    t = U.map(function (e, n) {
                        return {
                            value: 0 === n ? 1 : 0
                        }
                    }),
                    o = function () {
                        U.forEach(function (e, n) {
                            return u(e, "opacity", t[n].value)
                        })
                    },
                    r = function i() {
                        var r = t[e],
                            a = (U[e], n ? 2 : 4),
                            u = .5,
                            l = 1;
                        s.cancel().to(r, {
                            value: 0,
                            delay: a,
                            duration: u,
                            ease: "quadOut"
                        }).on("update", o), e++, e >= U.length && (e = 0); {
                            var c = t[e];
                            U[e]
                        }
                        s.to(c, {
                            value: 1,
                            duration: l,
                            delay: u + a,
                            ease: "quadIn"
                        }).on("update", o).on("complete", i), n = !1
                    };
                r()
            }

            function I() {
                if (A || F) {
                    var e = function t() {
                        i.cancel(), F.removeEventListener("wheel", t, !1), window.removeEventListener("wheel", t, !1), F.removeEventListener("touchstart", t, !1), window.removeEventListener("touchstart", t, !1)
                    },
                        n = function () {
                            F.addEventListener("wheel", e, !1), window.addEventListener("wheel", e, !1);
                            var n = {
                                value: F.scrollY
                            };
                            i.to(n, {
                                value: B.height,
                                duration: 1,
                                ease: "quadInOut"
                            }).on("update", function () {
                                return F.scrollTo(0, n.value)
                            }).on("start", function () {
                                F.addEventListener("touchstart", e, !1), window.addEventListener("touchstart", e, !1)
                            })
                        };
                    T.addEventListener("touchstart", function (e) {
                        e.preventDefault(), e.stopPropagation(), n()
                    }, !1), T.addEventListener("mousedown", function (e) {
                        return e.preventDefault()
                    }), T.addEventListener("click", function (e) {
                        e.stopPropagation(), n()
                    }, !1)
                }
            }
            var O = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : y, void 0);
            "undefined" != typeof w && (O = new w.GUI);
            var P = 0,
                z = function () {
                    return g(B.canvas).add("grabbing")
                },
                q = function () {
                    return g(B.canvas).remove("grabbing")
                };
            O && !v.gui && (O = null, document.querySelector(".dg.ac").style.display = "none");
            var F = window.parent === window ? null : window.parent,
                H = "black",
                N = 2,
                B = l({
                    gui: O,
                    canvas: e
                });
            B.renderer.sortObjects = !1, document.body.style.background = H, B.renderer.setClearColor(H), C || g(e).add("grab"), h.setRenderer(B.renderer), h.load(function (e) {
                e && console.error(e), L()
            }), window.enable = n, window.disable = t, C || R || I()
        }
    }, {
        "./assets": "/Users/bensonwong/Documents/jam3/prj-thx/lib/assets/index.js",
        "./components/createCrystals": "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createCrystals.js",
        "./components/createInput": "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createInput.js",
        "./components/createLights": "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createLights.js",
        "./components/createShockwave": "/Users/bensonwong/Documents/jam3/prj-thx/lib/components/createShockwave.js",
        "./createApp": "/Users/bensonwong/Documents/jam3/prj-thx/lib/createApp.js",
        "./util/isMobile": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/isMobile.js",
        "./util/palettes": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/palettes.js",
        "./util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        "dom-css": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/dom-css/index.js",
        "element-class": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/element-class/index.js",
        lerp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp/index.js",
        "lodash.throttle": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lodash.throttle/index.js",
        "raf-loop": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/raf-loop/index.js",
        touches: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/touches/index.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/BloomTexturePass.js": [function (e, n) {
        "use strict";

        function t(e, n) {
            var t = this,
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            this.scene = e, this.camera = n, this.debugCopyShader = new THREE.ShaderMaterial(s), this._lastWidth = null, this._lastHeight = null, this._blurTarget = null, this._thresholdTarget = null, this.enabled = !0, this.needsSwap = !0, this.oldColor = new THREE.Color, this.oldAlpha = 1, this.clearColor = new THREE.Color("#fff"), this.clearAlpha = 0, this.thresholdBackground = new THREE.Color(r.background), this.thresholdShader = new THREE.RawShaderMaterial({
                vertexShader: o(["#define GLSLIFY 1\nattribute vec4 position;\nattribute vec2 uv;\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * position;\n}\n"]),
                fragmentShader: o(["precision highp float;\n#define GLSLIFY 1\nvarying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec3 background;\nuniform float lumaThreshold;\n\nfloat luma(vec3 color) {\n  return dot(color, vec3(0.299, 0.587, 0.114));\n}\n\nfloat luma(vec4 color) {\n  return dot(color.rgb, vec3(0.299, 0.587, 0.114));\n}\n\nvoid main () {\n  gl_FragColor = texture2D(tDiffuse, vUv);\n  float L = luma(gl_FragColor.rgb);\n  gl_FragColor.rgb *= smoothstep(0.0, lumaThreshold, L);\n  // gl_FragColor.rgb *= step(lumaThreshold, L);\n  // gl_FragColor.rgb *= step(0.001, L);\n  // float t = smoothstep(0.15, 0.5, L);\n  // gl_FragColor.rgb = mix(background, gl_FragColor.rgb, t);\n}\n"]),
                uniforms: {
                    lumaThreshold: {
                        type: "f",
                        value: c(l.lumaThreshold, .35)
                    },
                    background: {
                        type: "c",
                        value: this.thresholdBackground
                    },
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    resolution: {
                        type: "v2",
                        value: new THREE.Vector2(1, 1)
                    }
                }
            }), this.thresholdShader.name = "bloom-threhsold-material", this.postShader = new THREE.RawShaderMaterial({
                vertexShader: o(["#define GLSLIFY 1\nattribute vec4 position;\nattribute vec2 uv;\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * position;\n}\n"]),
                fragmentShader: o(["precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 resolution;\nuniform float radius;\n\nvec3 tex(vec2 uv);\n\n#define ITERATIONS 10\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n#ifndef TAU\n  #define TAU 6.28318530718\n#endif\n\n//Use last part of hash function to generate new random radius and angle\nvec2 mult(inout vec2 r) {\n  r = fract(r * vec2(12.9898,78.233));\n  return sqrt(r.x + .001) * vec2(sin(r.y * TAU), cos(r.y * TAU));\n}\n\nvec3 blur(vec2 uv, float radius, float aspect, float offset) {\n  vec2 circle = vec2(radius);\n  circle.x *= aspect;\n  vec2 rnd = vec2(random(vec2(uv + offset)));\n\n  vec3 acc = vec3(0.0);\n  for (int i = 0; i < ITERATIONS; i++) {\n    acc += tex(uv + circle * mult(rnd)).xyz;\n  }\n  return acc / float(ITERATIONS);\n}\n\nvec3 blur(vec2 uv, float radius, float aspect) {\n  return blur(uv, radius, aspect, 0.0);\n}\n\nvec3 blur(vec2 uv, float radius) {\n  return blur(uv, radius, 1.0);\n}\n\nvec3 tex(vec2 uv) {\n  vec3 rgb = texture2D(tDiffuse, uv).rgb;\n  return rgb;\n  // return threshold > 0.2 ? rgb : vec3(0.0);\n  // return step(1.0 - t, rgb);\n  // return smoothstep(vec3(0.0), vec3(, threshold);\n}\n\nvoid main () {\n  float aspect = resolution.x / resolution.y;\n  \n  //jitter the noise but not every frame\n  // float tick = 0.0;//floor(fract(iGlobalTime)*20.0);\n  // float jitter = mod(tick * 382.0231, 21.321);\n  \n  // vec3 blurred = vec3(0.0);\n  // blurred += 0.6 * blur(vUv, 0.3, 1.0 / aspect, jitter);\n  \n  vec3 blurred = blur(vUv, radius, 1.0 / aspect, radius);\n  gl_FragColor.rgb = blurred;\n  gl_FragColor.a = 1.0;\n  \n  // gl_FragColor = texture2D(tDiffuse, vUv);\n}"]),
                uniforms: {
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    radius: {
                        type: "f",
                        value: 1
                    },
                    resolution: {
                        type: "v2",
                        value: new THREE.Vector2(1, 1)
                    }
                }
            }), this.postShader.name = "bloom-blur-material", this.gaussianShader = new THREE.RawShaderMaterial({
                vertexShader: o(["#define GLSLIFY 1\nattribute vec4 position;\nattribute vec2 uv;\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * position;\n}\n"]),
                fragmentShader: o(["precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 resolution;\nuniform vec2 direction;\nuniform float radius;\n\nvec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3333333333333333) * direction;\n  color += texture2D(image, uv) * 0.29411764705882354;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;\n  return color; \n}\n\nvoid main () {\n  gl_FragColor = blur5(tDiffuse, vUv, resolution.xy, direction);\n  gl_FragColor.a = 1.0;\n}"]),
                uniforms: {
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    direction: {
                        type: "v2",
                        value: new THREE.Vector2
                    },
                    resolution: {
                        type: "v2",
                        value: new THREE.Vector2(1, 1)
                    }
                }
            }), this.gaussianShader.name = "bloom-gaussian-blur-material";
            var a = {};
            r.gammaOutput && (a.GAMMA_OUTPUT = r.gammaOutput.toFixed(1)), this.combineShader = new THREE.RawShaderMaterial({
                vertexShader: o(["#define GLSLIFY 1\nattribute vec4 position;\nattribute vec2 uv;\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * position;\n}\n"]),
                fragmentShader: i(o(["precision mediump float;\n#define GLSLIFY 1\n\n#define SHOCKWAVE\n// #define LENS_DISTORT\n#define FILM_GRAIN\n#define VIGNETTE\n// #define ALLOW_GRAYSCALE\n\nvarying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform sampler2D tBloomDiffuse;\nuniform vec2 resolution;\n\n#ifdef LENS_DISTORT\nuniform float lensDistort;\nuniform float lensDistortK;\nuniform float lensDistortCubicK;\nuniform float lensDistortScale;\n#endif\n\n#ifdef SHOCKWAVE\n#define shockwaveSize 0.35\n#define shockwaveX 10.0\n#define shockwaveY 0.2\n#define shockwaveZ 0.1\nuniform vec2 shockwavePosition;\nuniform float shockwaveStrength;\nuniform float shockwaveRadius;\n\nvec2 applyShockwave (vec2 uv) {\n  vec2 texCoord = uv;\n  vec2 delta = texCoord - shockwavePosition;\n  delta.x *= resolution.x / resolution.y;\n  float dist = length(delta);\n  float radius = shockwaveRadius * shockwaveSize;\n  if ((dist <= (radius + shockwaveZ)) && (dist >= (radius - shockwaveZ)) ) \n  {\n    float diff = (dist - radius); \n    float powDiff = 1.0 - pow(abs(diff * shockwaveX), shockwaveY); \n    float diffTime = diff * powDiff; \n    vec2 diffUV = normalize(texCoord - shockwavePosition); \n    texCoord += (diffUV * diffTime) * shockwaveStrength;\n  }\n  return texCoord;\n}\n#endif\n\n#ifdef ALLOW_GRAYSCALE\nuniform bool grayscale;\n#endif\n\n#ifdef FILM_GRAIN\nuniform float grainStrength;\n#endif\n\n#ifdef VIGNETTE\nuniform float vignetteMin;\nuniform float vignetteMax;\nuniform float vignetteStrength;\n#endif\n\nuniform float bloomOpacity;\nuniform sampler2D lensDustTexture;\nuniform vec2 lensDustResolution;\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\nfloat luma(vec3 color) {\n  return dot(color, vec3(0.299, 0.587, 0.114));\n}\n\nfloat luma(vec4 color) {\n  return dot(color.rgb, vec3(0.299, 0.587, 0.114));\n}\n\nvec2 backgroundUV (vec2 uv_0, vec2 resolution_0, vec2 texResolution) {\n  float tAspect = texResolution.x / texResolution.y;\n  float pAspect = resolution_0.x / resolution_0.y;\n  float pwidth = resolution_0.x;\n  float pheight = resolution_0.y;\n  \n  float width = 0.0;\n  float height = 0.0;  \n  if (tAspect > pAspect) {\n    height = pheight;\n    width = height * tAspect; \n  } else {\n    width = pwidth;\n    height = width / tAspect;\n  }\n  float x = (pwidth - width) / 2.0;\n  float y = (pheight - height) / 2.0;\n  vec2 nUv = uv_0;\n  nUv -= vec2(x, y) / resolution_0;\n  nUv /= vec2(width, height) / resolution_0;\n  return nUv;\n}\n\nvec3 applyLensDistort (sampler2D map, vec2 uv, float distort, float k, float kCube, float scale) {\n  vec3 eta = vec3(1.0 + distort * 0.9, 1.0 + distort * 0.6, 1.0 + distort * 0.3);\n  \n  //texture coordinates\n  vec2 delta = uv - 0.5;\n  float r2 = delta.x * delta.x + delta.y * delta.y;\n  float f = 0.0;\n\n  //only compute the cubic distortion if necessary\n  if( kCube == 0.0)\n  {\n      f = 1.0 + r2 * k;\n  }else {\n      f = 1.0 + r2 * (k + kCube * sqrt(r2));\n  }\n\n  // get the right pixel for the current position\n  vec2 rCoords = (f * eta.r) * scale * (delta) + 0.5;\n  vec2 gCoords = (f * eta.g) * scale * (delta) + 0.5;\n  vec2 bCoords = (f * eta.b) * scale * (delta) + 0.5;\n\n  vec3 inputDistort = vec3(0.0); \n  inputDistort.r = texture2D(map, rCoords).r;\n  inputDistort.g = texture2D(map, gCoords).g;\n  inputDistort.b = texture2D(map, bCoords).b;\n  return inputDistort;\n}\n\nvoid main () {\n  #ifdef SHOCKWAVE\n  vec2 texCoord = applyShockwave(vUv);\n  #else\n  vec2 texCoord = vUv;\n  #endif\n\n  #ifdef LENS_DISTORT\n    vec3 distortRGB = applyLensDistort(tDiffuse, texCoord, lensDistort, lensDistortK, lensDistortCubicK, lensDistortScale);\n    vec4 background = vec4(distortRGB, 1.0);\n  #else\n    vec4 background = texture2D(tDiffuse, texCoord);\n  #endif\n\n  vec4 foreground = texture2D(tBloomDiffuse, texCoord);\n  gl_FragColor = background + foreground * bloomOpacity;\n\n  #ifdef VIGNETTE\n  vec2 cUv = vUv - 0.5;\n  float vignetteBlur = 1.0;\n  float center = length(cUv);\n  float vignette = smoothstep(vignetteMin, vignetteMax, center);\n  vec3 vignetteColor = mix(vec3(0.0), foreground.rgb, vignetteBlur);\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, vignetteColor, vignette * vignetteStrength);\n  #endif\n\n  #ifdef FILM_GRAIN\n  float deband = random(gl_FragCoord.xy) / 255.0;\n  gl_FragColor.rgb += deband * grainStrength;\n  #endif\n\n  // float L = luma(gl_FragColor.rgb);\n  // L = smoothstep(0.0, 0.1, L);\n  // vec2 bgUV = backgroundUV(vUv, resolution, lensDustResolution);\n  // vec4 lensColor = texture2D(lensDustTexture, bgUV);\n  // gl_FragColor.rgb += lensColor.rgb * L * 0.5;\n\n  #ifdef ALLOW_GRAYSCALE\n  if (grayscale) {\n    gl_FragColor.rgb = vec3(luma(gl_FragColor.rgb));\n  }\n  #endif\n\n  #ifdef GAMMA_OUTPUT\n    gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / GAMMA_OUTPUT));\n  #endif\n}"]), a),
                uniforms: {
                    vignetteMin: {
                        type: "f",
                        value: .43
                    },
                    vignetteMax: {
                        type: "f",
                        value: .73
                    },
                    lensDistort: {
                        type: "f",
                        value: .02
                    },
                    lensDistortK: {
                        type: "f",
                        value: .5
                    },
                    lensDistortCubicK: {
                        type: "f",
                        value: 1
                    },
                    lensDistortScale: {
                        type: "f",
                        value: .94
                    },
                    vignetteStrength: {
                        type: "f",
                        value: 1
                    },
                    bloomOpacity: {
                        type: "f",
                        value: .7
                    },
                    resolution: {
                        type: "v2",
                        value: new THREE.Vector2
                    },
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    grayscale: {
                        type: "i",
                        value: 0
                    },
                    grainStrength: {
                        type: "f",
                        value: window.devicePixelRatio >= 2 ? 1.5 : 0
                    },
                    tBloomDiffuse: {
                        type: "t",
                        value: null
                    },
                    shockwavePosition: {
                        type: "v2",
                        value: new THREE.Vector2
                    },
                    shockwaveStrength: {
                        type: "f",
                        value: 0
                    },
                    shockwaveRadius: {
                        type: "f",
                        value: 0
                    }
                }
            }), this.combineShader.name = "bloom-combine-material", this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.postScene = new THREE.Scene, this.postQuad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2)), this.postQuad.name = "godray-post-quad", this.postScene.add(this.postQuad), this.renderToScreen = !1, this.blurRadius = 1, this.isGaussian = !0;
            var u = r.gui;
            u && ! function () {
                var e = u.addFolder("post-fx"),
                    n = {
                        radius: t.blurRadius,
                        isGaussian: t.isGaussian,
                        grayscale: 1 === t.combineShader.uniforms.grayscale.value,
                        lensDistort: t.combineShader.uniforms.lensDistort.value,
                        lensDistortK: t.combineShader.uniforms.lensDistortK.value,
                        lensDistortCubicK: t.combineShader.uniforms.lensDistortCubicK.value,
                        lensDistortScale: t.combineShader.uniforms.lensDistortScale.value,
                        grain: t.combineShader.uniforms.grainStrength.value,
                        opacity: t.combineShader.uniforms.bloomOpacity.value,
                        threshold: t.thresholdShader.uniforms.lumaThreshold.value,
                        vignetteMin: t.combineShader.uniforms.vignetteMin.value,
                        vignetteMax: t.combineShader.uniforms.vignetteMax.value,
                        vignetteStrength: t.combineShader.uniforms.vignetteStrength.value
                    },
                    o = function () {
                        t.blurRadius = n.radius, t.isGaussian = n.isGaussian, t.combineShader.uniforms.grayscale.value = n.grayscale ? 1 : 0, t.combineShader.uniforms.grainStrength.value = n.grain, t.combineShader.uniforms.bloomOpacity.value = n.opacity, t.combineShader.uniforms.vignetteMin.value = n.vignetteMin, t.combineShader.uniforms.vignetteMax.value = n.vignetteMax, t.combineShader.uniforms.vignetteStrength.value = n.vignetteStrength, t.combineShader.uniforms.lensDistort.value = n.lensDistort, t.combineShader.uniforms.lensDistortK.value = n.lensDistortK, t.combineShader.uniforms.lensDistortCubicK.value = n.lensDistortCubicK, t.combineShader.uniforms.lensDistortScale.value = n.lensDistortScale, t.thresholdShader.uniforms.lumaThreshold.value = n.threshold
                    };
                e.add(n, "isGaussian").onChange(o), e.add(n, "threshold", 0, 1).onChange(o), e.add(n, "radius", 0, 2).onChange(o), e.add(n, "opacity", 0, 2).onChange(o), e.add(n, "grain", 0, 10).onChange(o), e.add(n, "vignetteMin", 0, 1).onChange(o), e.add(n, "vignetteMax", 0, 1).onChange(o), e.add(n, "vignetteStrength", 0, 1).onChange(o)
            }()
        }
        var o = e("glslify"),
            r = (e("path"), e("clamp")),
            s = e("three-copyshader"),
            i = e("glsl-inject-defines"),
            a = 3,
            u = 2048,
            l = e("../util/query"),
            c = e("defined"),
            d = [1, 1];
        n.exports = t, t.prototype = {
            tick: function () { },
            setShockwave: function (e, n, t) {
                this.combineShader.uniforms.shockwavePosition.value.copy(e), this.combineShader.uniforms.shockwaveRadius.value = n, this.combineShader.uniforms.shockwaveStrength.value = t
            },
            _updateTargets: function (e) {
                var n = e.width,
                    t = e.height,
                    o = r(Math.floor(n / a), 2, u),
                    s = r(Math.floor(t / a), 2, u);
                this._thresholdTarget && this._blurTarget ? (this._thresholdTarget.width !== n || this._thresholdTarget.height !== t) && (this._thresholdTarget.setSize(o, s), this._blurTarget.setSize(o, s), this._blurTarget2.setSize(o, s)) : (this._blurTarget = new THREE.WebGLRenderTarget(o, s), this._blurTarget.texture.minFilter = THREE.LinearFilter, this._blurTarget.texture.magFilter = THREE.LinearFilter, this._blurTarget.texture.generateMipmaps = !1, this._blurTarget.depthBuffer = !0, this._blurTarget.stencilBuffer = !1, this._blurTarget2 = this._blurTarget.clone(), this._thresholdTarget = this._blurTarget.clone())
            },
            render: function (e, n, t) {
                this._updateTargets(t);
                var o = this.renderToScreen ? void 0 : n;
                this.oldColor.copy(e.getClearColor()), this.oldAlpha = e.getClearAlpha();
                var r = e.autoClear;
                e.setClearColor(this.clearColor, this.clearAlpha), e.autoClear = !1, e.clearTarget(this._thresholdTarget, !0, !0, !1), this.postScene.overrideMaterial = this.thresholdShader, this.thresholdShader.uniforms.resolution.value.set(this._thresholdTarget.width, this._thresholdTarget.height), this.thresholdShader.uniforms.tDiffuse.value = t.texture, e.render(this.postScene, this.postCamera, this._thresholdTarget, !0);
                var s = void 0;
                if (this.isGaussian) {
                    var i = this._blurTarget,
                        a = this._blurTarget2,
                        u = 2 * d.length;
                    this.postScene.overrideMaterial = this.gaussianShader, this.gaussianShader.uniforms.resolution.value.set(this._thresholdTarget.width, this._thresholdTarget.height);
                    for (var l = 0; u > l; l++) {
                        var c = d[Math.floor(l / 2)],
                            m = this.blurRadius * c;
                        0 === l && (i = this._thresholdTarget), this.gaussianShader.uniforms.tDiffuse.value = i.texture;
                        var f = this.gaussianShader.uniforms.direction.value;
                        l % 2 === 0 ? f.set(m, 0) : f.set(0, m), e.render(this.postScene, this.postCamera, a, !0);
                        var p = i;
                        i = a, a = p
                    }
                    s = a
                } else {
                    var h = .5 * this.blurRadius;
                    this.postScene.overrideMaterial = this.postShader, this.postShader.uniforms.resolution.value.set(this._thresholdTarget.width, this._thresholdTarget.height), this.postShader.uniforms.tDiffuse.value = this._thresholdTarget.texture, this.postShader.uniforms.radius.value = .15 * h, e.render(this.postScene, this.postCamera, this._blurTarget, !0), this.postShader.uniforms.tDiffuse.value = this._blurTarget.texture, this.postShader.uniforms.radius.value = .5 * h, e.render(this.postScene, this.postCamera, this._thresholdTarget, !0), s = this._thresholdTarget
                }
                this.postScene.overrideMaterial = this.combineShader, this.combineShader.uniforms.tDiffuse.value = t.texture, this.combineShader.uniforms.tBloomDiffuse.value = s.texture;
                var v = e.getPixelRatio();
                this.combineShader.uniforms.resolution.value.set(o ? o.width : window.innerWidth * v, o ? o.height : window.innerHeight * v), e.render(this.postScene, this.postCamera, o, !0), e.setClearColor(this.oldColor, this.oldAlpha), e.autoClear = r
            }
        }
    }, {
        "../util/query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        clamp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js",
        defined: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/defined/index.js",
        "glsl-inject-defines": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-inject-defines/string.js",
        glslify: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glslify/browser.js",
        path: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/path-browserify/index.js",
        "three-copyshader": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-copyshader/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/EffectComposer.js": [function (e, n) {
        "use strict";

        function t(e, n, t, s) {
            if (this.renderer = e, void 0 === n) throw new Error("must specify targets");
            this.renderTarget1 = n, this.renderTarget2 = t, this.initialRenderTarget = s, this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.passes = [], this.copyPass = new r(o)
        }
        n.exports = t;
        var o = t.CopyShader = e("three-copyshader"),
            r = (t.RenderPass = e("three-effectcomposer/lib/renderpass")(THREE), t.ShaderPass = e("./ShaderPass")(THREE, t)),
            s = t.MaskPass = e("three-effectcomposer/lib/maskpass")(THREE),
            i = t.ClearMaskPass = e("three-effectcomposer/lib/clearmaskpass")(THREE);
        t.prototype = {
            swapBuffers: function () {
                var e = this.readBuffer;
                this.readBuffer = this.writeBuffer, this.writeBuffer = e
            },
            addPass: function (e) {
                this.passes.push(e)
            },
            clearPasses: function () {
                this.passes.length = 0
            },
            insertPass: function (e, n) {
                this.passes.splice(n, 0, e), this.initialClearColor = new THREE.Color(1, 0, 0)
            },
            render: function (e) {
                this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
                var n, t, o, r = !1,
                    a = this.passes.length;
                for (t = 0, o = 0; a > t; t++)
                    if (n = this.passes[t], n.enabled) {
                        var u, l, c = Boolean(this.initialRenderTarget);
                        c && 1 >= o ? (l = this.writeBuffer, u = this.initialRenderTarget) : (l = this.writeBuffer, u = this.readBuffer);
                        var d;
                        this.depthTexture ? d = this.depthTexture : this.initialRenderTarget && (d = 0 === o ? void 0 : this.initialRenderTarget.depthTexture);
                        var m = this.initialRenderTarget ? this.initialRenderTarget.attachments : void 0;
                        if (n.render(this.renderer, l, u, e, r, d, m), n.needsSwap) {
                            if (r) {
                                var f = this.renderer.context;
                                f.stencilFunc(f.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), f.stencilFunc(f.EQUAL, 1, 4294967295)
                            }
                            this.swapBuffers()
                        }
                        n instanceof s ? r = !0 : n instanceof i && (r = !1), o++
                    }
            },
            reset: function (e) {
                void 0 === e && (e = this.renderTarget1.clone(), e.width = window.innerWidth, e.height = window.innerHeight), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2
            },
            setSize: function (e, n) {
                var t = this.renderTarget1.clone();
                t.width = e, t.height = n, this.reset(t)
            }
        }, t.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), t.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), t.scene = new THREE.Scene, t.scene.add(t.quad)
    }, {
        "./ShaderPass": "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/ShaderPass.js",
        "three-copyshader": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-copyshader/index.js",
        "three-effectcomposer/lib/clearmaskpass": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-effectcomposer/lib/clearmaskpass.js",
        "three-effectcomposer/lib/maskpass": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-effectcomposer/lib/maskpass.js",
        "three-effectcomposer/lib/renderpass": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-effectcomposer/lib/renderpass.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/Pass.js": [function (e, n) {
        "use strict";

        function t() {
            this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1
        }
        n.exports = t, Object.assign(t.prototype, {
            setSize: function () { },
            render: function () {
                console.error("Pass: .render() must be implemented in derived pass.")
            }
        })
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/RenderPass.js": [function (e, n) {
        "use strict";

        function t(e, n, t, r, s) {
            o.call(this), this.scene = e, this.camera = n, this.overrideMaterial = t, this.clearColor = r, this.clearAlpha = void 0 !== s ? s : 0, this.gammaInput = void 0, this.gammaOutput = void 0, this.clear = !0, this.needsSwap = !1
        }
        var o = e("./Pass");
        n.exports = t, t.prototype = Object.assign(Object.create(o.prototype), {
            constructor: t,
            render: function (e, n, t) {
                var o = e.autoClear;
                e.autoClear = !1;
                var r = e.gammaInput,
                    s = e.gammaOutput;
                "boolean" == typeof this.gammaInput && (e.gammaInput = this.gammaInput), "boolean" == typeof this.gammaOutput && (e.gammaOutput = this.gammaOutput), this.scene.overrideMaterial = this.overrideMaterial;
                var i, a;
                this.clearColor && (i = e.getClearColor().getHex(), a = e.getClearAlpha(), e.setClearColor(this.clearColor, this.clearAlpha)), e.render(this.scene, this.camera, this.renderToScreen ? null : t, this.clear), this.clearColor && e.setClearColor(i, a), this.scene.overrideMaterial = null, e.autoClear = o, e.gammaInput = r, e.gammaOutput = s
            }
        })
    }, {
        "./Pass": "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/Pass.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/post/ShaderPass.js": [function (e, n) {
        "use strict";
        n.exports = function (e, n) {
            function t(n, o) {
                return this instanceof t ? (this.textureID = void 0 !== o ? o : "tDiffuse", this.uniforms = e.UniformsUtils.clone(n.uniforms), this.material = new e.ShaderMaterial({
                    uniforms: this.uniforms,
                    vertexShader: n.vertexShader,
                    fragmentShader: n.fragmentShader
                }), this.renderToScreen = !1, this.enabled = !0, this.needsSwap = !0, void (this.clear = !1)) : new t(n, o)
            }
            return t.prototype = {
                render: function (e, t, o) {
                    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = o.texture), n.quad.material = this.material, this.renderToScreen ? e.render(n.scene, n.camera) : e.render(n.scene, n.camera, t, this.clear)
                }
            }, t
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/shaders/CrystalMaterial.js": [function (e, n) {
        "use strict";

        function t(e) {
            e = s({}, e), THREE.MeshPhongMaterial.call(this), this.uniforms = s({}, THREE.ShaderLib.phong.uniforms, {
                time: {
                    type: "f",
                    value: 0
                },
                rippleMin: {
                    type: "f",
                    value: 7
                },
                rippleMax: {
                    type: "f",
                    value: 63
                },
                fadeIn: {
                    type: "f",
                    value: 1
                },
                rippleTime: {
                    type: "f",
                    value: 0
                },
                inputTime: {
                    type: "f",
                    value: 0
                },
                spin: {
                    type: "f",
                    value: .5
                },
                vertexWeight: {
                    type: "f",
                    value: .1
                },
                vertexNoise: {
                    type: "f",
                    value: .1
                },
                audioState: {
                    type: "f",
                    value: 1
                },
                sparkles: {
                    type: "f",
                    value: .1
                },
                color1: {
                    type: "c",
                    value: new THREE.Color
                },
                audioClimax: {
                    type: "f",
                    value: 1
                },
                index: {
                    type: "f",
                    value: 0
                },
                mouseOffsetStrengths: {
                    type: "v3v",
                    value: i(l).map(function () {
                        return new THREE.Vector3
                    })
                },
                mousePosition: {
                    type: "v2",
                    value: new THREE.Vector2
                },
                resolution: {
                    type: "v2",
                    value: new THREE.Vector2
                }
            }), delete e.lengthSegments, delete e.radialSegments, o(this), this.setValues(e)
        }

        function o(e) {
            e.vertexShader = m, e.fragmentShader = d, e.type = "CrystalMaterial"
        }
        var r = e("glslify"),
            s = (e("path"), e("object-assign")),
            i = (e("defined"), e("new-array")),
            a = e("glsl-inject-defines"),
            u = e("../util/isMobile"),
            l = 7,
            c = {};
        u || (c.HIGH_QUALITY = !0), c.MOUSE_CAPACITY = String(l);
        var d = r(["#define GLSLIFY 1\n#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nuniform float time;\nuniform float fadeIn;\nuniform vec3 color1;\nuniform float rippleTime;\nuniform float audioState;\nuniform float audioClimax;\n// uniform vec3 palette[5];\nvarying float vRipple;\nvarying float vSparkle;\nvarying vec2 vUv;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvoid main() {\n\n  #include <clipping_planes_fragment>\n\n  float rippleNorm = vRipple * 0.5 + 0.5;\n  float alpha = opacity * mix(1.0, 0.05, rippleNorm);\n\n  vec3 inColor = color1;\n  float dist = length(vUv - 0.5);\n\n  float blackHole = mix(1.0, smoothstep(0.1, 0.2, dist), 1.0);\n  float edges = smoothstep(0.5, 0.4, dist);\n  alpha *= blackHole * fadeIn * edges;\n\n  // inColor = mix(inColor, inColor * 2.0, 1.0 - rippleNorm);\n  // alpha = vSparkle;\n  vec4 diffuseColor = vec4(vec3(inColor), alpha);\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissive;\n\n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <specularmap_fragment>\n  #include <normal_flip>\n  #include <normal_fragment>\n  #include <emissivemap_fragment>\n\n  // accumulation\n  #include <lights_phong_fragment>\n  material.specularStrength = mix(1.0, 5.0, vSparkle);\n  #include <lights_template>\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n  #include <envmap_fragment>\n\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n  #include <premultiplied_alpha_fragment>\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  // gl_FragColor = vec4(vec3(vTriangleColor), 1.0);\n}\n"]),
            m = a(r(["#define GLSLIFY 1\n#define PHONG\n\n#ifdef HIGH_QUALITY\n  #define SPARKLE\n  #define FADE_IN\n  #define SPIN\n  #define RIPPLE_MOUSE\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n  varying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289_0(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute_0(vec4 x) {\n     return mod289_0(((x*34.0)+1.0)*x);\n}\n\nfloat permute_0(float x) {\n     return mod289_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_0(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt_0(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise_0(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289_0(i);\n  float j0 = permute_0( permute_0( permute_0( permute_0(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute_0( permute_0( permute_0( permute_0 (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0_0 = grad4(j0,   ip);\n  vec4 p1 = grad4(j1.x, ip);\n  vec4 p2 = grad4(j1.y, ip);\n  vec4 p3 = grad4(j1.z, ip);\n  vec4 p4 = grad4(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt_0(vec4(dot(p0_0,p0_0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt_0(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0_0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_2(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_2(vec4 x) {\n     return mod289_2(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_2(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_0 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_0;\n  vec3 i1 = min( g_0.xyz, l.zxy );\n  vec3 i2 = max( g_0.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_2(i);\n  vec4 p = permute_2( permute_2( permute_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1(vec4(dot(p0_1,p0_1), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1(vec3 x) {\n  return mod289_1(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1( permute_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nfloat quadraticInOut(float t) {\n  float p = 2.0 * t * t;\n  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;\n}\n\nfloat exponentialInOut(float t) {\n  return t == 0.0 || t == 1.0\n    ? t\n    : t < 0.5\n      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)\n      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;\n}\n\nvec2 rotate (vec2 vector, float cosTheta, float sinTheta) {\n  float x = vector.x;\n  float y = vector.y;\n  float nx = x * cosTheta - y * sinTheta;\n  float ny = x * sinTheta + y * cosTheta;\n  return vec2(nx, ny);\n}\n\nvec4 randomQuaternion (float u1, float u2, float u3) {\n  float sq1 = sqrt(1.0 - u1);\n  float sq2 = sqrt(u1);\n\n  float theta1 = PI * 2.0 * u2;\n  float theta2 = PI * 2.0 * u3;\n\n  float x = sin(theta1) * sq1;\n  float y = cos(theta1) * sq1;\n  float z = sin(theta2) * sq2;\n  float w = cos(theta2) * sq2;\n  return vec4(x, y, z, w);\n}\n\n// from http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm\nfloat udRoundBox(vec2 p, vec2 b, float r) {\n  return length(max(abs(p)-b+r,0.0))-r;\n}\n\nfloat linearstep (float lo, float hi, float x) {\n  return (clamp(x, lo, hi) - lo) / (hi - lo);\n}\n\nvec3 randomSphere (float scale, float n1, float n2) {\n  float r = n1 * 2.0 * PI;\n  float z = n2 * 2.0 - 1.0;\n  float zScale = sqrt(1.0 - z * z) * scale;\n  float tx = cos(r) * zScale;\n  float ty = sin(r) * zScale;\n  float tz = z * scale;\n  return vec3(tx, ty, tz);\n}\n\n// rotate vector\nvec3 quaternionRotation (vec4 q, vec3 v) {\n  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\nattribute vec3 centroid;\nattribute float sparkleWeight;\nuniform float audioState;\nuniform float audioClimax;\nuniform float time;\nuniform float vertexWeight;\nuniform float vertexNoise;\nuniform float rippleTime;\nuniform float index;\nuniform float sparkles;\nuniform float inputTime;\nuniform float fadeIn;\n\nuniform float rippleMin;\nuniform float rippleMax;\nuniform float spin;\n\nuniform vec2 mousePosition;\nuniform vec2 resolution;\nuniform vec3 color1;\n\nuniform vec3 mouseOffsetStrengths[MOUSE_CAPACITY];\n\nvarying float vRipple;\nvarying vec2 vUv;\nvarying float vSparkle;\n\nvec3 createSphere (vec3 position) {\n  vec3 transformed = position;\n  transformed.x *= 2.0;\n  float R = 4.0;\n  float lat = (uv.x * 2.0 - 1.0) * (PI / 2.0);\n  float lon = (uv.y * 2.0 - 1.0) * PI;\n  transformed.x = R * cos(lat) * cos(lon);\n  transformed.y = R * cos(lat) * sin(lon);\n  transformed.z = R * sin(lat);\n  return transformed;\n}\n\nfloat mouseMoveTest (vec3 transformed, float aspect, mat4 projModelView) {\n  // do a hit test now that position has changed\n  vec4 projectedPos = projModelView * vec4(transformed.xyz, 1.0);\n  vec2 tScreenPosition = projectedPos.xy / projectedPos.w;\n  float sum = 0.0;\n  \n  for (int i = 0; i < MOUSE_CAPACITY; i++) {\n    vec3 offsetStrength = mouseOffsetStrengths[i];\n    vec2 offset = offsetStrength.xy;\n    float strength = offsetStrength.z;\n\n    vec2 mouseMoveDelta = offset - tScreenPosition;\n    mouseMoveDelta.x *= aspect;\n\n    float mouseMoveRadius = strength * 5.0;\n    float mouseRadiusSq = mouseMoveRadius * mouseMoveRadius;\n    float lenSq = mouseMoveDelta.x * mouseMoveDelta.x + mouseMoveDelta.y * mouseMoveDelta.y;\n    float mouseMoveScale = 1.0 - clamp(lenSq / mouseRadiusSq, 0.0, 1.0);\n\n    sum += mouseMoveScale * strength;\n  }\n  return sum;\n}\n\nvoid main() {\n\n  vUv = uv;\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n  vNormal = normalize( transformedNormal );\n\n#endif\n\n  ///\n  vec2 mouseNorm = mousePosition * 0.5 + 0.5;\n\n  float dist = length(uv - 0.5);\n  float sinNorm = (sin(time) * 0.5 + 0.5);\n  float sinCosNorm = (sin(cos(time)) * 0.5 + 0.5);\n  float ripples = mix(rippleMin, rippleMax, audioState);\n  float ripples2 = mix(5.0, 30.0, audioState);\n  float rippleSize = ripples;\n  \n  float rippleIdle = sin(dist * rippleSize - time);\n  float rippleAnim = sin(dist * rippleSize - inputTime);\n  float ripple = mix(rippleIdle, rippleAnim, audioState);\n  float ripple2 = sin(dist * ripples2 + sinNorm * 1.0);\n  float rippleNorm = ripple * 0.5 + 0.5;\n  float mouseLength = length(mousePosition);\n  float mouseCenter = length(mouseNorm - 0.5);\n\n  float bigRipple = sin(dist * 20.0 + rippleTime) * 0.075;\n\n  float aspect = resolution.x / resolution.y;\n  mat4 projModelView = projectionMatrix * modelViewMatrix;\n  \n  float mouseRadius = 0.5;\n\n  vec3 transformed = vec3(position.xyz);\n\n  vec3 vertexPoint = centroid.xyz;\n  float vertexIndex = index;\n  \n  #ifdef HIGH_QUALITY\n  float vertexDistance = (snoise_0(vec4(vertexPoint.xy * vertexNoise, ripple, vertexIndex)) * 0.5 + 0.5);\n  #else\n  float vertexDistance = (snoise_2(vec3(vertexPoint.xy * vertexNoise, ripple)) * 0.5 + 0.5);\n  #endif\n\n  float darkness = 1.0;//mix(1.0, mouseLength, audioState);\n  float rippleMouseOff = 0.5;\n  #ifdef RIPPLE_MOUSE\n    float rippleOffset = snoise_0(vec4(vertexPoint.xy * rippleMouseOff, vertexIndex, mousePosition.x));\n  #else\n    float rippleOffset = snoise_2(vec3(vertexPoint.xy * rippleMouseOff, vertexIndex));\n  #endif\n  ripple += rippleOffset * vertexDistance;\n\n  float zOff = 0.0;\n  zOff += ripple;\n  zOff -= ripple2 * 0.5;\n  zOff += bigRipple * audioClimax;\n  transformed.z += zOff;\n\n  // apply mouse ripple\n  transformed.z *= fadeIn;\n  \n  float modVertexWeight = vertexWeight;\n\n  vec3 curPoint = centroid.xyz;\n  vec3 vertexDirection = normalize(position.xyz - curPoint);\n  float vertexOffsetWeight = modVertexWeight * vertexDistance;\n  float vertexOffset = (snoise_0(vec4(uv.xy * (1.0 - rippleNorm), time, vertexIndex)) * 0.5 + 0.5);\n  transformed -= vertexDirection * vertexOffsetWeight * vertexOffset * darkness;\n\n  #ifdef SPIN  \n    vec2 original = transformed.xy;\n    float angle = snoise_1(vec2(dist, ripple2 * 0.5)) * 0.25;\n    // float angle = (dist * PI * 2.0) * ripple2 * 0.25;\n    float tcos = cos(angle);\n    float tsin = sin(angle);\n    transformed.xy = rotate(transformed.xy, tcos, tsin);\n    transformed.xy = mix(original.xy, transformed.xy, spin * (1.0 - audioClimax));\n  #endif\n\n  #ifdef FADE_IN\n    #ifndef SPIN\n      float tcos = 0.0;\n      float tsin = 0.0;\n    #endif\n    if (fadeIn < 1.0) {\n      float fadeAngle = mix(PI * 1.0, PI * 2.0, fadeIn);\n      tcos = cos(fadeAngle);\n      tsin = sin(fadeAngle);\n      transformed.xyz -= centroid.xyz;\n      transformed.xy = rotate(transformed.xy, tcos, tsin);\n      transformed.xyz += centroid.xyz;\n    }\n  #endif\n\n  #ifdef SPARKLE\n    float s = step(1.0 - sparkles, snoise_1(vec2(sparkleWeight, ripple * dist)));\n    vSparkle = clamp(s, 0.0, 1.0);\n  #else\n    vSparkle = 0.0;\n  #endif\n  vRipple = ripple;\n\n  #ifdef HIGH_QUALITY\n    // mouse fancy :D\n    float mouseSum = mouseMoveTest(transformed, aspect, projModelView);\n    // transformed.xyz -= centroid;\n    // float a = 2.0 * PI * 0.5 * (mouseSum * 2.0 - 1.0);\n    // transformed.xy = rotate(transformed.xy, cos(a), sin(a));\n    // transformed.xyz += centroid;\n    vSparkle = mouseSum * 15.0;\n    transformed.z -= mouseSum * 0.5;\n    // transformed.z -= smoothstep(0.1, 1.0, mouseSum) * 5.0;\n    // modVertexWeight = mix(modVertexWeight, 0.05, mouseSum);\n  #endif\n\n  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);\n  gl_Position = projectionMatrix * mvPosition;\n\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  #include <worldpos_vertex>\n  #include <envmap_vertex>\n  #include <shadowmap_vertex>\n\n}\n"]), c);

        n.exports = t, t.prototype = Object.create(THREE.MeshPhongMaterial.prototype), t.prototype.constructor = t, t.prototype.isMeshPhongMaterial = !0, t.MOUSE_CAPACITY = l, t.prototype.copy = function (e) {
            return THREE.MeshPhongMaterial.prototype.copy.call(this, e), this.uniforms = THREE.UniformsUtils.clone(e.uniforms), o(this), this
        }
    }, {
        "../util/isMobile": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/isMobile.js",
        defined: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/defined/index.js",
        "glsl-inject-defines": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-inject-defines/string.js",
        glslify: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glslify/browser.js",
        "new-array": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/new-array/index.js",
        "object-assign": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js",
        path: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/path-browserify/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/isMobile.js": [function (e, n) {
        "use strict";
        n.exports = /(iPhone|iPad|iPod|Android)/i.test(window.navigator.userAgent)
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/override-clone-uniforms.js": [function (e, n) {
        "use strict";

        function t(e) {
            var n = {};
            for (var t in e) {
                n[t] = {};
                for (var o in e[t]) {
                    var r = e[t][o];
                    n[t][o] = r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? r.clone() : Array.isArray(r) ? r.slice() : r
                }
            }
            return n
        }
        n.exports = function () {
            THREE.UniformsUtils.clone = t
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/palettes.js": [function (e, n) {
        "use strict";
        var t = e("tweenr")(),
            o = function () { },
            r = e("./query"),
            s = {
                light: "#5a50ff",
                ambient: "#5664cd",
                color: ["#0065f7", "#1c27e1"]
            },
            i = {
                light: "#8d50ff",
                ambient: "#000",
                color: ["#7400f7", "#b21ce1"]
            },
            a = {
                light: "#ff9c2d",
                ambient: "#b34141",
                color: ["#eb5a1d", "#e2b11d"]
            },
            u = [s, a, i],
            l = u.map(function (e) {
                return Object.keys(e).forEach(function (n) {
                    if ("string" == typeof e[n]) e[n] = new THREE.Color(e[n]);
                    else {
                        if (!Array.isArray(e[n])) throw new TypeError("unknown type");
                        e[n] = e[n].map(function (e) {
                            return new THREE.Color(e)
                        })
                    }
                }), e
            });
        n.exports = function () {
            function e() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o;
                i.set(d), a.set(m), u.set(f), c.set(p), n++, s = l[n % l.length], g.value = 0, t.cancel().to(g, {
                    duration: r.colorOnClick ? 2 : 1,
                    ease: "quadOut",
                    value: 1
                }).on("update", function () {
                    var n = g.value;
                    d.copy(i).lerp(s.light, n), m.copy(a).lerp(s.ambient, n), f.copy(u).lerp(s.color[0], n), p.copy(c).lerp(s.color[1] || s.color[0], n), e(v)
                })
            }
            var n = 0,
                s = l[n],
                i = new THREE.Color,
                a = new THREE.Color,
                u = new THREE.Color,
                c = new THREE.Color,
                d = new THREE.Color,
                m = new THREE.Color,
                f = new THREE.Color,
                p = new THREE.Color,
                h = [f, p],
                v = {
                    light: d,
                    ambient: m,
                    color: h
                },
                g = {
                    value: 0
                };
            return d.set(s.light), m.set(s.ambient), f.set(s.color[0]), p.set(s.color[1] || s.color[0]), {
                getCurrent: function () {
                    return s
                },
                next: e
            }
        }
    }, {
        "./query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        tweenr: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js": [function (e, n) {
        "use strict";

        function t() {
            if ("undefined" == typeof window) return {};
            var e = r.parse(window.location.search);
            return Object.keys(e).forEach(function (n) {
                null === e[n] && (e[n] = !0), "false" === e[n] && (e[n] = !1), "true" === e[n] && (e[n] = !0), o(e[n]) && (e[n] = Number(e[n]))
            }), e
        }

        function o(e) {
            return "number" == typeof e ? !0 : /^0x[0-9a-f]+$/i.test(e) ? !0 : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e)
        }
        var r = e("query-string");
        n.exports = t()
    }, {
        "query-string": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/query-string/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/random.js": [function (e, n) {
        "use strict";
        var t = String(e("./query").seed || "5"),
            o = e("seed-random"),
            r = e("simplex-noise");
        n.exports.random = o(t), n.exports.simplex = new r(n.exports.random), n.exports.randomSign = function () {
            return n.exports.random() > .5 ? 1 : -1
        }, n.exports.randomFloat = function (e, t) {
            if (void 0 === t && (t = e, e = 0), "number" != typeof e || "number" != typeof t) throw new TypeError("Expected all arguments to be numbers");
            return n.exports.random() * (t - e) + e
        }, n.exports.randomCircle = function (e, t) {
            t = t || 1;
            var o = 2 * n.exports.random() * Math.PI;
            return e[0] = Math.cos(o) * t, e[1] = Math.sin(o) * t, e
        }, n.exports.randomSphere = function (e, t) {
            t = t || 1;
            var o = 2 * n.exports.random() * Math.PI,
                r = 2 * n.exports.random() - 1,
                s = Math.sqrt(1 - r * r) * t;
            return e[0] = Math.cos(o) * s, e[1] = Math.sin(o) * s, e[2] = r * t, e
        }
    }, {
        "./query": "/Users/bensonwong/Documents/jam3/prj-thx/lib/util/query.js",
        "seed-random": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/seed-random/index.js",
        "simplex-noise": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/simplex-noise/simplex-noise.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/add-px-to-style/index.js": [function (e, n) {
        var t = {
            animationIterationCount: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridColumn: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            stopOpacity: !0,
            strokeDashoffset: !0,
            strokeOpacity: !0,
            strokeWidth: !0
        };
        n.exports = function (e, n) {
            return "number" != typeof n || t[e] ? n : n + "px"
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/an-array/index.js": [function (e, n) {
        function t(e) {
            return e.BYTES_PER_ELEMENT && "[object ArrayBuffer]" === o.call(e.buffer) || Array.isArray(e)
        }
        var o = Object.prototype.toString;
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js": [function (e, n) {
        function t(e, n, t) {
            return t > n ? n > e ? n : e > t ? t : e : t > e ? t : e > n ? n : e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/defined/index.js": [function (e, n) {
        n.exports = function () {
            for (var e = 0; e < arguments.length; e++)
                if (void 0 !== arguments[e]) return arguments[e]
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/dom-css/index.js": [function (e, n) {
        function t(e, n, t) {
            var o = u[n];
            if ("undefined" == typeof o && (o = r(n)), o) {
                if (void 0 === t) return e.style[o];
                e.style[o] = l(o, t)
            }
        }

        function o(e, n) {
            for (var o in n) n.hasOwnProperty(o) && t(e, o, n[o])
        }

        function r(e) {
            var n = a(e),
                t = i(n);
            return u[n] = u[e] = u[t] = t, t
        }

        function s() {
            2 === arguments.length ? "string" == typeof arguments[1] ? arguments[0].style.cssText = arguments[1] : o(arguments[0], arguments[1]) : t(arguments[0], arguments[1], arguments[2])
        }
        var i = e("prefix-style"),
            a = e("to-camel-case"),
            u = {
                "float": "cssFloat"
            },
            l = e("add-px-to-style");
        n.exports = s, n.exports.set = s, n.exports.get = function (e, n) {
            return Array.isArray(n) ? n.reduce(function (n, o) {
                return n[o] = t(e, o || ""), n
            }, {}) : t(e, n || "")
        }
    }, {
        "add-px-to-style": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/add-px-to-style/index.js",
        "prefix-style": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/prefix-style/index.js",
        "to-camel-case": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-camel-case/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/dprop/index.js": [function (e, n) {
        function t(e, n) {
            return {
                configurable: !0,
                enumerable: !0,
                get: e,
                set: n
            }
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/dtype/index.js": [function (e, n) {
        n.exports = function (e) {
            switch (e) {
                case "int8":
                    return Int8Array;
                case "int16":
                    return Int16Array;
                case "int32":
                    return Int32Array;
                case "uint8":
                    return Uint8Array;
                case "uint16":
                    return Uint16Array;
                case "uint32":
                    return Uint32Array;
                case "float32":
                    return Float32Array;
                case "float64":
                    return Float64Array;
                case "array":
                    return Array;
                case "uint8_clamped":
                    return Uint8ClampedArray
            }
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/back-in-out.js": [function (e, n) {
        function t(e) {
            var n = 2.5949095;
            return (e *= 2) < 1 ? .5 * e * e * ((n + 1) * e - n) : .5 * ((e -= 2) * e * ((n + 1) * e + n) + 2)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/back-in.js": [function (e, n) {
        function t(e) {
            var n = 1.70158;
            return e * e * ((n + 1) * e - n)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/back-out.js": [function (e, n) {
        function t(e) {
            var n = 1.70158;
            return --e * e * ((n + 1) * e + n) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-in-out.js": [function (e, n) {
        function t(e) {
            return .5 > e ? .5 * (1 - o(1 - 2 * e)) : .5 * o(2 * e - 1) + .5
        }
        var o = e("./bounce-out");
        n.exports = t
    }, {
        "./bounce-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-out.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-in.js": [function (e, n) {
        function t(e) {
            return 1 - o(1 - e)
        }
        var o = e("./bounce-out");
        n.exports = t
    }, {
        "./bounce-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-out.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-out.js": [function (e, n) {
        function t(e) {
            var n = 4 / 11,
                t = 8 / 11,
                o = .9,
                r = 4356 / 361,
                s = 35442 / 1805,
                i = 16061 / 1805,
                a = e * e;
            return n > e ? 7.5625 * a : t > e ? 9.075 * a - 9.9 * e + 3.4 : o > e ? r * a - s * e + i : 10.8 * e * e - 20.52 * e + 10.72
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/circ-in-out.js": [function (e, n) {
        function t(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/circ-in.js": [function (e, n) {
        function t(e) {
            return 1 - Math.sqrt(1 - e * e)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/circ-out.js": [function (e, n) {
        function t(e) {
            return Math.sqrt(1 - --e * e)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/cubic-in-out.js": [function (e, n) {
        function t(e) {
            return .5 > e ? 4 * e * e * e : .5 * Math.pow(2 * e - 2, 3) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/cubic-in.js": [function (e, n) {
        function t(e) {
            return e * e * e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/cubic-out.js": [function (e, n) {
        function t(e) {
            var n = e - 1;
            return n * n * n + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/elastic-in-out.js": [function (e, n) {
        function t(e) {
            return .5 > e ? .5 * Math.sin(13 * Math.PI / 2 * 2 * e) * Math.pow(2, 10 * (2 * e - 1)) : .5 * Math.sin(-13 * Math.PI / 2 * (2 * e - 1 + 1)) * Math.pow(2, -10 * (2 * e - 1)) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/elastic-in.js": [function (e, n) {
        function t(e) {
            return Math.sin(13 * e * Math.PI / 2) * Math.pow(2, 10 * (e - 1))
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/elastic-out.js": [function (e, n) {
        function t(e) {
            return Math.sin(-13 * (e + 1) * Math.PI / 2) * Math.pow(2, -10 * e) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/expo-in-out.js": [function (e, n) {
        function t(e) {
            return 0 === e || 1 === e ? e : .5 > e ? .5 * Math.pow(2, 20 * e - 10) : -.5 * Math.pow(2, 10 - 20 * e) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/expo-in.js": [function (e, n) {
        function t(e) {
            return 0 === e ? e : Math.pow(2, 10 * (e - 1))
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/expo-out.js": [function (e, n) {
        function t(e) {
            return 1 === e ? e : 1 - Math.pow(2, -10 * e)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/index.js": [function (e, n) {
        n.exports = {
            backInOut: e("./back-in-out"),
            backIn: e("./back-in"),
            backOut: e("./back-out"),
            bounceInOut: e("./bounce-in-out"),
            bounceIn: e("./bounce-in"),
            bounceOut: e("./bounce-out"),
            circInOut: e("./circ-in-out"),
            circIn: e("./circ-in"),
            circOut: e("./circ-out"),
            cubicInOut: e("./cubic-in-out"),
            cubicIn: e("./cubic-in"),
            cubicOut: e("./cubic-out"),
            elasticInOut: e("./elastic-in-out"),
            elasticIn: e("./elastic-in"),
            elasticOut: e("./elastic-out"),
            expoInOut: e("./expo-in-out"),
            expoIn: e("./expo-in"),
            expoOut: e("./expo-out"),
            linear: e("./linear"),
            quadInOut: e("./quad-in-out"),
            quadIn: e("./quad-in"),
            quadOut: e("./quad-out"),
            quartInOut: e("./quart-in-out"),
            quartIn: e("./quart-in"),
            quartOut: e("./quart-out"),
            quintInOut: e("./quint-in-out"),
            quintIn: e("./quint-in"),
            quintOut: e("./quint-out"),
            sineInOut: e("./sine-in-out"),
            sineIn: e("./sine-in"),
            sineOut: e("./sine-out")
        }
    }, {
        "./back-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/back-in.js",
        "./back-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/back-in-out.js",
        "./back-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/back-out.js",
        "./bounce-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-in.js",
        "./bounce-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-in-out.js",
        "./bounce-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/bounce-out.js",
        "./circ-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/circ-in.js",
        "./circ-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/circ-in-out.js",
        "./circ-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/circ-out.js",
        "./cubic-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/cubic-in.js",
        "./cubic-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/cubic-in-out.js",
        "./cubic-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/cubic-out.js",
        "./elastic-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/elastic-in.js",
        "./elastic-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/elastic-in-out.js",
        "./elastic-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/elastic-out.js",
        "./expo-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/expo-in.js",
        "./expo-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/expo-in-out.js",
        "./expo-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/expo-out.js",
        "./linear": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/linear.js",
        "./quad-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quad-in.js",
        "./quad-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quad-in-out.js",
        "./quad-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quad-out.js",
        "./quart-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quart-in.js",
        "./quart-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quart-in-out.js",
        "./quart-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quart-out.js",
        "./quint-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quint-in.js",
        "./quint-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quint-in-out.js",
        "./quint-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quint-out.js",
        "./sine-in": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/sine-in.js",
        "./sine-in-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/sine-in-out.js",
        "./sine-out": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/sine-out.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/linear.js": [function (e, n) {
        function t(e) {
            return e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quad-in-out.js": [function (e, n) {
        function t(e) {
            return e /= .5, 1 > e ? .5 * e * e : (e--, -.5 * (e * (e - 2) - 1))
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quad-in.js": [function (e, n) {
        function t(e) {
            return e * e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quad-out.js": [function (e, n) {
        function t(e) {
            return -e * (e - 2)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quart-in-out.js": [function (e, n) {
        function t(e) {
            return .5 > e ? 8 * Math.pow(e, 4) : -8 * Math.pow(e - 1, 4) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quart-in.js": [function (e, n) {
        function t(e) {
            return Math.pow(e, 4)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quart-out.js": [function (e, n) {
        function t(e) {
            return Math.pow(e - 1, 3) * (1 - e) + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quint-in-out.js": [function (e, n) {
        function t(e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quint-in.js": [function (e, n) {
        function t(e) {
            return e * e * e * e * e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/quint-out.js": [function (e, n) {
        function t(e) {
            return --e * e * e * e * e + 1
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/sine-in-out.js": [function (e, n) {
        function t(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/sine-in.js": [function (e, n) {
        function t(e) {
            var n = Math.cos(e * Math.PI * .5);
            return Math.abs(n) < 1e-14 ? 1 : 1 - n
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/sine-out.js": [function (e, n) {
        function t(e) {
            return Math.sin(e * Math.PI / 2)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/element-class/index.js": [function (e, n) {
        function t(e, n) {
            if (e.indexOf) return e.indexOf(n);
            for (var t = 0, o = e.length; o > t; t++)
                if (e[t] === n) return t;
            return -1
        }

        function o(e) {
            if (!(this instanceof o)) return new o(e);
            e || (e = {}), e.nodeType && (e = {
                el: e
            }), this.opts = e, this.el = e.el || document.body, "object" != typeof this.el && (this.el = document.querySelector(this.el))
        }
        n.exports = function (e) {
            return new o(e)
        }, o.prototype.add = function (e) {
            var n = this.el;
            if (n) {
                if ("" === n.className) return n.className = e;
                var o = n.className.split(" ");
                return t(o, e) > -1 ? o : (o.push(e), n.className = o.join(" "), o)
            }
        }, o.prototype.remove = function (e) {
            var n = this.el;
            if (n && "" !== n.className) {
                var o = n.className.split(" "),
                    r = t(o, e);
                return r > -1 && o.splice(r, 1), n.className = o.join(" "), o
            }
        }, o.prototype.has = function (e) {
            var n = this.el;
            if (n) {
                var o = n.className.split(" ");
                return t(o, e) > -1
            }
        }, o.prototype.toggle = function (e) {
            var n = this.el;
            n && (this.has(e) ? this.remove(e) : this.add(e))
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js": [function (e, n) {
        function t() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function o(e) {
            return "function" == typeof e
        }

        function r(e) {
            return "number" == typeof e
        }

        function s(e) {
            return "object" == typeof e && null !== e
        }

        function i(e) {
            return void 0 === e
        }
        n.exports = t, t.EventEmitter = t, t.prototype._events = void 0, t.prototype._maxListeners = void 0, t.defaultMaxListeners = 10, t.prototype.setMaxListeners = function (e) {
            if (!r(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, t.prototype.emit = function (e) {
            var n, t, r, a, u, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                if (n = arguments[1], n instanceof Error) throw n;
                var c = new Error('Uncaught, unspecified "error" event. (' + n + ")");
                throw c.context = n, c
            }
            if (t = this._events[e], i(t)) return !1;
            if (o(t)) switch (arguments.length) {
                case 1:
                    t.call(this);
                    break;
                case 2:
                    t.call(this, arguments[1]);
                    break;
                case 3:
                    t.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    a = Array.prototype.slice.call(arguments, 1), t.apply(this, a)
            } else if (s(t))
                for (a = Array.prototype.slice.call(arguments, 1), l = t.slice(), r = l.length, u = 0; r > u; u++) l[u].apply(this, a);
            return !0
        }, t.prototype.addListener = function (e, n) {
            var r;
            if (!o(n)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, o(n.listener) ? n.listener : n), this._events[e] ? s(this._events[e]) ? this._events[e].push(n) : this._events[e] = [this._events[e], n] : this._events[e] = n, s(this._events[e]) && !this._events[e].warned && (r = i(this._maxListeners) ? t.defaultMaxListeners : this._maxListeners, r && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this
        }, t.prototype.on = t.prototype.addListener, t.prototype.once = function (e, n) {
            function t() {
                this.removeListener(e, t), r || (r = !0, n.apply(this, arguments))
            }
            if (!o(n)) throw TypeError("listener must be a function");
            var r = !1;
            return t.listener = n, this.on(e, t), this
        }, t.prototype.removeListener = function (e, n) {
            var t, r, i, a;
            if (!o(n)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (t = this._events[e], i = t.length, r = -1, t === n || o(t.listener) && t.listener === n) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, n);
            else if (s(t)) {
                for (a = i; a-- > 0;)
                    if (t[a] === n || t[a].listener && t[a].listener === n) {
                        r = a;
                        break
                    } if (0 > r) return this;
                1 === t.length ? (t.length = 0, delete this._events[e]) : t.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, n)
            }
            return this
        }, t.prototype.removeAllListeners = function (e) {
            var n, t;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (n in this._events) "removeListener" !== n && this.removeAllListeners(n);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (t = this._events[e], o(t)) this.removeListener(e, t);
            else if (t)
                for (; t.length;) this.removeListener(e, t[t.length - 1]);
            return delete this._events[e], this
        }, t.prototype.listeners = function (e) {
            var n;
            return n = this._events && this._events[e] ? o(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, t.prototype.listenerCount = function (e) {
            if (this._events) {
                var n = this._events[e];
                if (o(n)) return 1;
                if (n) return n.length
            }
            return 0
        }, t.listenerCount = function (e, n) {
            return e.listenerCount(n)
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/flatten-vertex-data/index.js": [function (e, n) {
        function t(e, n, t) {
            if (!e) throw new TypeError("must specify data as first parameter");
            if (t = 0 | +(t || 0), Array.isArray(e) && Array.isArray(e[0])) {
                var r = e[0].length,
                    s = e.length * r;
                n && "string" != typeof n || (n = new (o(n || "float32"))(s + t));
                var i = n.length - t;
                if (s !== i) throw new Error("source length " + s + " (" + r + "x" + e.length + ") does not match destination length " + i);
                for (var a = 0, u = t; a < e.length; a++)
                    for (var l = 0; r > l; l++) n[u++] = e[a][l]
            } else if (n && "string" != typeof n) n.set(e, t);
            else {
                var c = o(n || "float32");
                0 === t ? n = new c(e) : (n = new c(e.length + t), n.set(e, t))
            }
            return n
        }
        var o = e("dtype");
        n.exports = t
    }, {
        dtype: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/dtype/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/for-each/index.js": [function (e, n) {
        function t(e, n, t) {
            if (!i(n)) throw new TypeError("iterator must be a function");
            arguments.length < 3 && (t = this), "[object Array]" === a.call(e) ? o(e, n, t) : "string" == typeof e ? r(e, n, t) : s(e, n, t)
        }

        function o(e, n, t) {
            for (var o = 0, r = e.length; r > o; o++) u.call(e, o) && n.call(t, e[o], o, e)
        }

        function r(e, n, t) {
            for (var o = 0, r = e.length; r > o; o++) n.call(t, e.charAt(o), o, e)
        }

        function s(e, n, t) {
            for (var o in e) u.call(e, o) && n.call(t, e[o], o, e)
        }
        var i = e("is-function");
        n.exports = t;
        var a = Object.prototype.toString,
            u = Object.prototype.hasOwnProperty
    }, {
        "is-function": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/is-function/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-quat/invert.js": [function (e, n) {
        function t(e, n) {
            var t = n[0],
                o = n[1],
                r = n[2],
                s = n[3],
                i = t * t + o * o + r * r + s * s,
                a = i ? 1 / i : 0;
            return e[0] = -t * a, e[1] = -o * a, e[2] = -r * a, e[3] = s * a, e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-quat/normalize.js": [function (e, n) {
        n.exports = e("gl-vec4/normalize")
    }, {
        "gl-vec4/normalize": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec4/normalize.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec2/distance.js": [function (e, n) {
        function t(e, n) {
            var t = n[0] - e[0],
                o = n[1] - e[1];
            return Math.sqrt(t * t + o * o)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/add.js": [function (e, n) {
        function t(e, n, t) {
            return e[0] = n[0] + t[0], e[1] = n[1] + t[1], e[2] = n[2] + t[2], e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/copy.js": [function (e, n) {
        function t(e, n) {
            return e[0] = n[0], e[1] = n[1], e[2] = n[2], e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/cross.js": [function (e, n) {
        function t(e, n, t) {
            var o = n[0],
                r = n[1],
                s = n[2],
                i = t[0],
                a = t[1],
                u = t[2];
            return e[0] = r * u - s * a, e[1] = s * i - o * u, e[2] = o * a - r * i, e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/dot.js": [function (e, n) {
        function t(e, n) {
            return e[0] * n[0] + e[1] * n[1] + e[2] * n[2]
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/length.js": [function (e, n) {
        function t(e) {
            var n = e[0],
                t = e[1],
                o = e[2];
            return Math.sqrt(n * n + t * t + o * o)
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/normalize.js": [function (e, n) {
        function t(e, n) {
            var t = n[0],
                o = n[1],
                r = n[2],
                s = t * t + o * o + r * r;
            return s > 0 && (s = 1 / Math.sqrt(s), e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s), e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/set.js": [function (e, n) {
        function t(e, n, t, o) {
            return e[0] = n, e[1] = t, e[2] = o, e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/subtract.js": [function (e, n) {
        function t(e, n, t) {
            return e[0] = n[0] - t[0], e[1] = n[1] - t[1], e[2] = n[2] - t[2], e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/transformQuat.js": [function (e, n) {
        function t(e, n, t) {
            var o = n[0],
                r = n[1],
                s = n[2],
                i = t[0],
                a = t[1],
                u = t[2],
                l = t[3],
                c = l * o + a * s - u * r,
                d = l * r + u * o - i * s,
                m = l * s + i * r - a * o,
                f = -i * o - a * r - u * s;
            return e[0] = c * l + f * -i + d * -u - m * -a, e[1] = d * l + f * -a + m * -i - c * -u, e[2] = m * l + f * -u + c * -a - d * -i, e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec4/normalize.js": [function (e, n) {
        function t(e, n) {
            var t = n[0],
                o = n[1],
                r = n[2],
                s = n[3],
                i = t * t + o * o + r * r + s * s;
            return i > 0 && (i = 1 / Math.sqrt(i), e[0] = t * i, e[1] = o * i, e[2] = r * i, e[3] = s * i), e
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/global/window.js": [function (e, n) {
        (function (e) {
            n.exports = "undefined" != typeof window ? window : "undefined" != typeof e ? e : "undefined" != typeof self ? self : {}
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-inject-defines/string.js": [function (e, n) {
        var t = e("glsl-tokenizer"),
            o = e("glsl-token-string"),
            r = e("glsl-token-inject-block");
        n.exports = function (e, n) {
            if (!n) return e;
            var s = Object.keys(n);
            if (0 === s.length) return e;
            for (var i = t(e), a = s.length - 1; a >= 0; a--) {
                var u = s[a],
                    l = String(n[u]);
                l && (l = " " + l), r(i, {
                    type: "preprocessor",
                    data: "#define " + u + l
                })
            }
            return o(i)
        }
    }, {
        "glsl-token-inject-block": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-token-inject-block/index.js",
        "glsl-token-string": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-token-string/index.js",
        "glsl-tokenizer": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/string.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-token-inject-block/index.js": [function (e, n) {
        function t(e, n) {
            Array.isArray(n) || (n = [n]);
            var t = o(e),
                r = t > 0 ? e[t - 1] : null;
            r && i.test(r.data) && e.splice(t++, 0, s), e.splice.apply(e, [t, 0].concat(n));
            var a = t + n.length;
            return e[a] && /[^\r\n]$/.test(e[a].data) && e.splice(a, 0, s), e
        }

        function o(e) {
            for (var n = -1, t = 0; t < e.length; t++) {
                var o = e[t];
                if ("preprocessor" === o.type) /^#(extension|version)/.test(o.data) && (n = Math.max(n, t));
                else if ("keyword" === o.type && "precision" === o.data) {
                    var s = r(e, t);
                    if (-1 === s) throw new Error("precision statement not followed by any semicolons!");
                    n = Math.max(n, s)
                }
            }
            return n + 1
        }

        function r(e, n) {
            for (var t = n; t < e.length; t++)
                if ("operator" === e[t].type && ";" === e[t].data) return t;
            return -1
        }
        n.exports = t;
        var s = {
            data: "\n",
            type: "whitespace"
        },
            i = /[^\r\n]$/
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-token-string/index.js": [function (e, n) {
        function t(e) {
            for (var n = [], t = 0; t < e.length; t++) "eof" !== e[t].type && n.push(e[t].data);
            return n.join("")
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/index.js": [function (e, n) {
        function t(e) {
            function n(e) {
                e.length && N.push({
                    type: y[F],
                    data: e,
                    position: G,
                    line: B,
                    column: V
                })
            }

            function t(e) {
                z = 0, Y += e, P = Y.length;
                for (var n; I = Y[z], P > z;) {
                    switch (n = z, F) {
                        case c:
                            z = S();
                            break;
                        case d:
                            z = T();
                            break;
                        case m:
                            z = U();
                            break;
                        case f:
                            z = M();
                            break;
                        case p:
                            z = R();
                            break;
                        case w:
                            z = A();
                            break;
                        case h:
                            z = L();
                            break;
                        case l:
                            z = k();
                            break;
                        case b:
                            z = E();
                            break;
                        case u:
                            z = D()
                    }
                    if (n !== z) switch (Y[n]) {
                        case "\n":
                            V = 0, ++B;
                            break;
                        default:
                            ++V
                    }
                }
                return q += z, Y = Y.slice(z), N
            }

            function _() {
                return H.length && n(H.join("")), F = j, n("(eof)"), N
            }

            function D() {
                return H = H.length ? [] : H, "/" === O && "*" === I ? (G = q + z - 1, F = c, O = I, z + 1) : "/" === O && "/" === I ? (G = q + z - 1, F = d, O = I, z + 1) : "#" === I ? (F = m, G = q + z, z) : /\s/.test(I) ? (F = b, G = q + z, z) : (W = /\d/.test(I), X = /[^\w_]/.test(I), G = q + z, F = W ? p : X ? f : l, z)
            }

            function E() {
                return /[^\s]/g.test(I) ? (n(H.join("")), F = u, z) : (H.push(I), O = I, z + 1)
            }

            function U() {
                return "\r" !== I && "\n" !== I || "\\" === O ? (H.push(I), O = I, z + 1) : (n(H.join("")), F = u, z)
            }

            function T() {
                return U()
            }

            function S() {
                return "/" === I && "*" === O ? (H.push(I), n(H.join("")), F = u, z + 1) : (H.push(I), O = I, z + 1)
            }

            function M() {
                if ("." === O && /\d/.test(I)) return F = h, z;
                if ("/" === O && "*" === I) return F = c, z;
                if ("/" === O && "/" === I) return F = d, z;
                if ("." === I && H.length) {
                    for (; C(H););
                    return F = h, z
                }
                if (";" === I || ")" === I || "(" === I) {
                    if (H.length)
                        for (; C(H););
                    return n(I), F = u, z + 1
                }
                var e = 2 === H.length && "=" !== I;
                if (/[\w_\d\s]/.test(I) || e) {
                    for (; C(H););
                    return F = u, z
                }
                return H.push(I), O = I, z + 1
            }

            function C(e) {
                for (var t, o, s = 0; ;) {
                    if (t = r.indexOf(e.slice(0, e.length + s).join("")), o = r[t], -1 === t) {
                        if (s-- + e.length > 0) continue;
                        o = e.slice(0, 1).join("")
                    }
                    return n(o), G += o.length, H = H.slice(o.length), H.length
                }
            }

            function A() {
                return /[^a-fA-F0-9]/.test(I) ? (n(H.join("")), F = u, z) : (H.push(I), O = I, z + 1)
            }

            function R() {
                return "." === I ? (H.push(I), F = h, O = I, z + 1) : /[eE]/.test(I) ? (H.push(I), F = h, O = I, z + 1) : "x" === I && 1 === H.length && "0" === H[0] ? (F = w, H.push(I), O = I, z + 1) : /[^\d]/.test(I) ? (n(H.join("")), F = u, z) : (H.push(I), O = I, z + 1)
            }

            function L() {
                return "f" === I && (H.push(I), O = I, z += 1), /[eE]/.test(I) ? (H.push(I), O = I, z + 1) : "-" === I && /[eE]/.test(O) ? (H.push(I), O = I, z + 1) : /[^\d]/.test(I) ? (n(H.join("")), F = u, z) : (H.push(I), O = I, z + 1)
            }

            function k() {
                if (/[^\d\w_]/.test(I)) {
                    var e = H.join("");
                    return F = K.indexOf(e) > -1 ? x : Q.indexOf(e) > -1 ? g : v, n(H.join("")), F = u, z
                }
                return H.push(I), O = I, z + 1
            }
            var I, O, P, z = 0,
                q = 0,
                F = u,
                H = [],
                N = [],
                B = 1,
                V = 0,
                G = 0,
                W = !1,
                X = !1,
                Y = "";
            e = e || {};
            var Q = s,
                K = o;
            return "300 es" === e.version && (Q = a, K = i),
                function (e) {
                    return N = [], null !== e ? t(e.replace ? e.replace(/\r\n/g, "\n") : e) : _()
                }
        }
        n.exports = t;
        var o = e("./lib/literals"),
            r = e("./lib/operators"),
            s = e("./lib/builtins"),
            i = e("./lib/literals-300es"),
            a = e("./lib/builtins-300es"),
            u = 999,
            l = 9999,
            c = 0,
            d = 1,
            m = 2,
            f = 3,
            p = 4,
            h = 5,
            v = 6,
            g = 7,
            x = 8,
            b = 9,
            j = 10,
            w = 11,
            y = ["block-comment", "line-comment", "preprocessor", "operator", "integer", "float", "ident", "builtin", "keyword", "whitespace", "eof", "integer"]
    }, {
        "./lib/builtins": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/builtins.js",
        "./lib/builtins-300es": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/builtins-300es.js",
        "./lib/literals": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/literals.js",
        "./lib/literals-300es": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/literals-300es.js",
        "./lib/operators": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/operators.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/builtins-300es.js": [function (e, n) {
        var t = e("./builtins");
        t = t.slice().filter(function (e) {
            return !/^(gl\_|texture)/.test(e)
        }), n.exports = t.concat(["gl_VertexID", "gl_InstanceID", "gl_Position", "gl_PointSize", "gl_FragCoord", "gl_FrontFacing", "gl_FragDepth", "gl_PointCoord", "gl_MaxVertexAttribs", "gl_MaxVertexUniformVectors", "gl_MaxVertexOutputVectors", "gl_MaxFragmentInputVectors", "gl_MaxVertexTextureImageUnits", "gl_MaxCombinedTextureImageUnits", "gl_MaxTextureImageUnits", "gl_MaxFragmentUniformVectors", "gl_MaxDrawBuffers", "gl_MinProgramTexelOffset", "gl_MaxProgramTexelOffset", "gl_DepthRangeParameters", "gl_DepthRange", "trunc", "round", "roundEven", "isnan", "isinf", "floatBitsToInt", "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat", "packSnorm2x16", "unpackSnorm2x16", "packUnorm2x16", "unpackUnorm2x16", "packHalf2x16", "unpackHalf2x16", "outerProduct", "transpose", "determinant", "inverse", "texture", "textureSize", "textureProj", "textureLod", "textureOffset", "texelFetch", "texelFetchOffset", "textureProjOffset", "textureLodOffset", "textureProjLod", "textureProjLodOffset", "textureGrad", "textureGradOffset", "textureProjGrad", "textureProjGradOffset"])
    }, {
        "./builtins": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/builtins.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/builtins.js": [function (e, n) {
        n.exports = ["abs", "acos", "all", "any", "asin", "atan", "ceil", "clamp", "cos", "cross", "dFdx", "dFdy", "degrees", "distance", "dot", "equal", "exp", "exp2", "faceforward", "floor", "fract", "gl_BackColor", "gl_BackLightModelProduct", "gl_BackLightProduct", "gl_BackMaterial", "gl_BackSecondaryColor", "gl_ClipPlane", "gl_ClipVertex", "gl_Color", "gl_DepthRange", "gl_DepthRangeParameters", "gl_EyePlaneQ", "gl_EyePlaneR", "gl_EyePlaneS", "gl_EyePlaneT", "gl_Fog", "gl_FogCoord", "gl_FogFragCoord", "gl_FogParameters", "gl_FragColor", "gl_FragCoord", "gl_FragData", "gl_FragDepth", "gl_FragDepthEXT", "gl_FrontColor", "gl_FrontFacing", "gl_FrontLightModelProduct", "gl_FrontLightProduct", "gl_FrontMaterial", "gl_FrontSecondaryColor", "gl_LightModel", "gl_LightModelParameters", "gl_LightModelProducts", "gl_LightProducts", "gl_LightSource", "gl_LightSourceParameters", "gl_MaterialParameters", "gl_MaxClipPlanes", "gl_MaxCombinedTextureImageUnits", "gl_MaxDrawBuffers", "gl_MaxFragmentUniformComponents", "gl_MaxLights", "gl_MaxTextureCoords", "gl_MaxTextureImageUnits", "gl_MaxTextureUnits", "gl_MaxVaryingFloats", "gl_MaxVertexAttribs", "gl_MaxVertexTextureImageUnits", "gl_MaxVertexUniformComponents", "gl_ModelViewMatrix", "gl_ModelViewMatrixInverse", "gl_ModelViewMatrixInverseTranspose", "gl_ModelViewMatrixTranspose", "gl_ModelViewProjectionMatrix", "gl_ModelViewProjectionMatrixInverse", "gl_ModelViewProjectionMatrixInverseTranspose", "gl_ModelViewProjectionMatrixTranspose", "gl_MultiTexCoord0", "gl_MultiTexCoord1", "gl_MultiTexCoord2", "gl_MultiTexCoord3", "gl_MultiTexCoord4", "gl_MultiTexCoord5", "gl_MultiTexCoord6", "gl_MultiTexCoord7", "gl_Normal", "gl_NormalMatrix", "gl_NormalScale", "gl_ObjectPlaneQ", "gl_ObjectPlaneR", "gl_ObjectPlaneS", "gl_ObjectPlaneT", "gl_Point", "gl_PointCoord", "gl_PointParameters", "gl_PointSize", "gl_Position", "gl_ProjectionMatrix", "gl_ProjectionMatrixInverse", "gl_ProjectionMatrixInverseTranspose", "gl_ProjectionMatrixTranspose", "gl_SecondaryColor", "gl_TexCoord", "gl_TextureEnvColor", "gl_TextureMatrix", "gl_TextureMatrixInverse", "gl_TextureMatrixInverseTranspose", "gl_TextureMatrixTranspose", "gl_Vertex", "greaterThan", "greaterThanEqual", "inversesqrt", "length", "lessThan", "lessThanEqual", "log", "log2", "matrixCompMult", "max", "min", "mix", "mod", "normalize", "not", "notEqual", "pow", "radians", "reflect", "refract", "sign", "sin", "smoothstep", "sqrt", "step", "tan", "texture2D", "texture2DLod", "texture2DProj", "texture2DProjLod", "textureCube", "textureCubeLod", "texture2DLodEXT", "texture2DProjLodEXT", "textureCubeLodEXT", "texture2DGradEXT", "texture2DProjGradEXT", "textureCubeGradEXT"];

    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/literals-300es.js": [function (e, n) {
        var t = e("./literals");
        n.exports = t.slice().concat(["layout", "centroid", "smooth", "case", "mat2x2", "mat2x3", "mat2x4", "mat3x2", "mat3x3", "mat3x4", "mat4x2", "mat4x3", "mat4x4", "uint", "uvec2", "uvec3", "uvec4", "samplerCubeShadow", "sampler2DArray", "sampler2DArrayShadow", "isampler2D", "isampler3D", "isamplerCube", "isampler2DArray", "usampler2D", "usampler3D", "usamplerCube", "usampler2DArray", "coherent", "restrict", "readonly", "writeonly", "resource", "atomic_uint", "noperspective", "patch", "sample", "subroutine", "common", "partition", "active", "filter", "image1D", "image2D", "image3D", "imageCube", "iimage1D", "iimage2D", "iimage3D", "iimageCube", "uimage1D", "uimage2D", "uimage3D", "uimageCube", "image1DArray", "image2DArray", "iimage1DArray", "iimage2DArray", "uimage1DArray", "uimage2DArray", "image1DShadow", "image2DShadow", "image1DArrayShadow", "image2DArrayShadow", "imageBuffer", "iimageBuffer", "uimageBuffer", "sampler1DArray", "sampler1DArrayShadow", "isampler1D", "isampler1DArray", "usampler1D", "usampler1DArray", "isampler2DRect", "usampler2DRect", "samplerBuffer", "isamplerBuffer", "usamplerBuffer", "sampler2DMS", "isampler2DMS", "usampler2DMS", "sampler2DMSArray", "isampler2DMSArray", "usampler2DMSArray"])
    }, {
        "./literals": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/literals.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/literals.js": [function (e, n) {
        n.exports = ["precision", "highp", "mediump", "lowp", "attribute", "const", "uniform", "varying", "break", "continue", "do", "for", "while", "if", "else", "in", "out", "inout", "float", "int", "void", "bool", "true", "false", "discard", "return", "mat2", "mat3", "mat4", "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "bvec2", "bvec3", "bvec4", "sampler1D", "sampler2D", "sampler3D", "samplerCube", "sampler1DShadow", "sampler2DShadow", "struct", "asm", "class", "union", "enum", "typedef", "template", "this", "packed", "goto", "switch", "default", "inline", "noinline", "volatile", "public", "static", "extern", "external", "interface", "long", "short", "double", "half", "fixed", "unsigned", "input", "output", "hvec2", "hvec3", "hvec4", "dvec2", "dvec3", "dvec4", "fvec2", "fvec3", "fvec4", "sampler2DRect", "sampler3DRect", "sampler2DRectShadow", "sizeof", "cast", "namespace", "using"]
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/lib/operators.js": [function (e, n) {
        n.exports = ["<<=", ">>=", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&", "||", "+=", "-=", "*=", "/=", "%=", "&=", "^^", "^=", "|=", "(", ")", "[", "]", ".", "!", "~", "*", "/", "%", "+", "-", "<", ">", "&", "^", "|", "?", ":", "=", ",", ";", "{", "}"]
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/string.js": [function (e, n) {
        function t(e, n) {
            var t = o(n),
                r = [];
            return r = r.concat(t(e)), r = r.concat(t(null))
        }
        var o = e("./index");
        n.exports = t
    }, {
        "./index": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glsl-tokenizer/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/glslify/browser.js": [function (e, n) {
        n.exports = function (e) {
            "string" == typeof e && (e = [e]);
            for (var n = [].slice.call(arguments, 1), t = [], o = 0; o < e.length - 1; o++) t.push(e[o], n[o] || "");
            return t.push(e[o]), t.join("")
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/inherits/inherits_browser.js": [function (e, n) {
        n.exports = "function" == typeof Object.create ? function (e, n) {
            e.super_ = n, e.prototype = Object.create(n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : function (e, n) {
            e.super_ = n;
            var t = function () { };
            t.prototype = n.prototype, e.prototype = new t, e.prototype.constructor = e
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/is-function/index.js": [function (e, n) {
        function t(e) {
            var n = o.call(e);
            return "[object Function]" === n || "function" == typeof e && "[object RegExp]" !== n || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
        }
        n.exports = t;
        var o = Object.prototype.toString
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp-array/index.js": [function (e, n) {
        var t = e("lerp");
        n.exports = function (e, n, o, r) {
            if ("number" == typeof e && "number" == typeof n) return t(e, n, o);
            var s = Math.min(e.length, n.length);
            r = r || new Array(s);
            for (var i = 0; s > i; i++) r[i] = t(e[i], n[i], o);
            return r
        }
    }, {
        lerp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp/index.js": [function (e, n) {
        function t(e, n, t) {
            return e * (1 - t) + n * t
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/load-img/index.js": [function (e, n) {
        function t(e, n, t) {
            "function" == typeof n && (t = n, n = null);
            var o, r = document.createElement("img");
            return r.onload = function () {
                o || (o = !0, t && t(void 0, r))
            }, r.onerror = function () {
                o || (o = !0, t && t(new Error('Unable to load "' + e + '"'), r))
            }, n && n.crossOrigin && (r.crossOrigin = n.crossOrigin), r.src = e, r
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lodash.throttle/index.js": [function (e, n) {
        (function (e) {
            function t(e, n, t) {
                function o(n) {
                    var t = h,
                        o = v;
                    return h = v = void 0, D = n, x = e.apply(o, t)
                }

                function s(e) {
                    return D = e, b = setTimeout(c, n), E ? o(e) : x
                }

                function i(e) {
                    var t = e - j,
                        o = e - D,
                        r = n - t;
                    return U ? y(r, g - o) : r
                }

                function l(e) {
                    var t = e - j,
                        o = e - D;
                    return void 0 === j || t >= n || 0 > t || U && o >= g
                }

                function c() {
                    var e = _();
                    return l(e) ? d(e) : void (b = setTimeout(c, i(e)))
                }

                function d(e) {
                    return b = void 0, T && h ? o(e) : (h = v = void 0, x)
                }

                function m() {
                    void 0 !== b && clearTimeout(b), D = 0, h = j = v = b = void 0
                }

                function f() {
                    return void 0 === b ? x : d(_())
                }

                function p() {
                    var e = _(),
                        t = l(e);
                    if (h = arguments, v = this, j = e, t) {
                        if (void 0 === b) return s(j);
                        if (U) return b = setTimeout(c, n), o(j)
                    }
                    return void 0 === b && (b = setTimeout(c, n)), x
                }
                var h, v, g, x, b, j, D = 0,
                    E = !1,
                    U = !1,
                    T = !0;
                if ("function" != typeof e) throw new TypeError(u);
                return n = a(n) || 0, r(t) && (E = !!t.leading, U = "maxWait" in t, g = U ? w(a(t.maxWait) || 0, n) : g, T = "trailing" in t ? !!t.trailing : T), p.cancel = m, p.flush = f, p
            }

            function o(e, n, o) {
                var s = !0,
                    i = !0;
                if ("function" != typeof e) throw new TypeError(u);
                return r(o) && (s = "leading" in o ? !!o.leading : s, i = "trailing" in o ? !!o.trailing : i), t(e, n, {
                    leading: s,
                    maxWait: n,
                    trailing: i
                })
            }

            function r(e) {
                var n = typeof e;
                return !!e && ("object" == n || "function" == n)
            }

            function s(e) {
                return !!e && "object" == typeof e
            }

            function i(e) {
                return "symbol" == typeof e || s(e) && j.call(e) == c
            }

            function a(e) {
                if ("number" == typeof e) return e;
                if (i(e)) return l;
                if (r(e)) {
                    var n = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = r(n) ? n + "" : n
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(d, "");
                var t = f.test(e);
                return t || p.test(e) ? h(e.slice(2), t ? 2 : 8) : m.test(e) ? l : +e
            }
            var u = "Expected a function",
                l = 0 / 0,
                c = "[object Symbol]",
                d = /^\s+|\s+$/g,
                m = /^[-+]0x[0-9a-f]+$/i,
                f = /^0b[01]+$/i,
                p = /^0o[0-7]+$/i,
                h = parseInt,
                v = "object" == typeof e && e && e.Object === Object && e,
                g = "object" == typeof self && self && self.Object === Object && self,
                x = v || g || Function("return this")(),
                b = Object.prototype,
                j = b.toString,
                w = Math.max,
                y = Math.min,
                _ = function () {
                    return x.Date.now()
                };
            n.exports = o
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/map-limit/index.js": [function (e, n) {
        function t(e, n, t, s) {
            function i() {
                if (l === f) return s(null, d);
                for (; n > m && !c && p !== f;) u()
            }

            function a(e) {
                return c = !0, s(e)
            }

            function u() {
                var n = p++;
                m += 1, t(e[n], function (e, t) {
                    return e ? a(e) : (d[n] = t, l += 1, m -= 1, void i())
                })
            }
            var l = 0,
                c = !1,
                d = [],
                m = 0,
                f = e.length,
                p = 0;
            if (s = o(s || r), "function" != typeof t) throw new Error("Iterator function must be passed as the third argument");
            for (var h = 0; f > h; h++) d[h] = null;
            i()
        }
        var o = e("once"),
            r = function () { };
        n.exports = t
    }, {
        once: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/map-limit/node_modules/once/once.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/map-limit/node_modules/once/once.js": [function (e, n) {
        function t(e) {
            var n = function () {
                return n.called ? n.value : (n.called = !0, n.value = e.apply(this, arguments))
            };
            return n.called = !1, n
        }
        var o = e("wrappy");
        n.exports = o(t), t.proto = t(function () {
            Object.defineProperty(Function.prototype, "once", {
                value: function () {
                    return t(this)
                },
                configurable: !0
            })
        })
    }, {
        wrappy: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/wrappy/wrappy.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mixes/index.js": [function (e, n) {
        function t(e, n) {
            for (var t in n)
                if (n.hasOwnProperty(t)) {
                    var s = n[t];
                    if ("function" == typeof s) e[t] = s;
                    else if (s && "object" == typeof s) {
                        var i = o(r, s);
                        Object.defineProperty(e, t, i)
                    }
                }
        }
        var o = e("xtend"),
            r = {
                enumerable: !0,
                configurable: !0
            };
        n.exports = function (e, n) {
            t(e.prototype, n)
        }, n.exports.mix = t
    }, {
        xtend: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xtend/immutable.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js": [function (e, n) {
        function t(e, n, t) {
            n = n || e.currentTarget || e.srcElement, Array.isArray(t) || (t = [0, 0]);
            var r = e.clientX || 0,
                s = e.clientY || 0,
                i = o(n);
            return t[0] = r - i.left, t[1] = s - i.top, t
        }

        function o(e) {
            return e === window || e === document || e === document.body ? r : e.getBoundingClientRect()
        }
        var r = {
            left: 0,
            top: 0
        };
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-wheel/wheel.js": [function (e, n) {
        "use strict";

        function t(e, n, t) {
            "function" == typeof e && (t = !!n, n = e, e = window);
            var r = o("ex", e),
                s = function (e) {
                    t && e.preventDefault();
                    var o = e.deltaX || 0,
                        s = e.deltaY || 0,
                        i = e.deltaZ || 0,
                        a = e.deltaMode,
                        u = 1;
                    switch (a) {
                        case 1:
                            u = r;
                            break;
                        case 2:
                            u = window.innerHeight
                    }
                    return o *= u, s *= u, i *= u, o || s || i ? n(o, s, i, e) : void 0
                };
            return e.addEventListener("wheel", s), s
        }
        var o = e("to-px");
        n.exports = t
    }, {
        "to-px": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-px/topx.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/new-array/index.js": [function (e, n) {
        function t(e, n) {
            e = e || 0;
            for (var t = new Array(e), o = 0; e > o; o++) t[o] = n;
            return t
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js": [function (e, n) {
        "use strict";

        function t(e) {
            if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }

        function o() {
            try {
                if (!Object.assign) return !1;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                for (var n = {}, t = 0; 10 > t; t++) n["_" + String.fromCharCode(t)] = t;
                var o = Object.getOwnPropertyNames(n).map(function (e) {
                    return n[e]
                });
                if ("0123456789" !== o.join("")) return !1;
                var r = {};
                return "abcdefghijklmnopqrst".split("").forEach(function (e) {
                    r[e] = e
                }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, r)).join("") ? !1 : !0
            } catch (s) {
                return !1
            }
        }
        var r = Object.prototype.hasOwnProperty,
            s = Object.prototype.propertyIsEnumerable;
        n.exports = o() ? Object.assign : function (e) {
            for (var n, o, i = t(e), a = 1; a < arguments.length; a++) {
                n = Object(arguments[a]);
                for (var u in n) r.call(n, u) && (i[u] = n[u]);
                if (Object.getOwnPropertySymbols) {
                    o = Object.getOwnPropertySymbols(n);
                    for (var l = 0; l < o.length; l++) s.call(n, o[l]) && (i[o[l]] = n[o[l]])
                }
            }
            return i
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/orbit-controls/index.js": [function (e, n) {
        function t(e) {
            function n(e, n) {
                var t = 2 * Math.PI;
                g[0] -= t * e * w.rotateSpeed, g[1] -= t * n * w.rotateSpeed
            }

            function t(e) {
                g[2] += e * w.zoomSpeed
            }

            function f(e) {
                g[2] -= e * w.pinchSpeed
            }

            function p() {
                var e = w.up || c;
                a(b, e, c), u(j, b);
                var n = w.distance;
                l.subtract(x, w.position, w.target), l.transformQuat(x, x, b);
                var t = Math.atan2(x[0], x[2]),
                    r = Math.atan2(Math.sqrt(x[0] * x[0] + x[2] * x[2]), x[1]);
                t += g[0], r += g[1], t = s(t, w.thetaBounds[0], w.thetaBounds[1]), r = s(r, w.phiBounds[0], w.phiBounds[1]), r = s(r, d, Math.PI - d), n += g[2], n = s(n, w.distanceBounds[0], w.distanceBounds[1]);
                var i = Math.abs(n) <= d ? d : n;
                x[0] = i * Math.sin(r) * Math.sin(t), x[1] = i * Math.cos(r), x[2] = i * Math.sin(r) * Math.cos(t), w.phi = r, w.theta = t, w.distance = n, l.transformQuat(x, x, j), l.add(w.position, w.target, x), o(w.direction, e, w.position, w.target);
                for (var m = "number" == typeof w.damping ? w.damping : 1, f = 0; f < g.length; f++) g[f] *= 1 - m
            }

            function h(e, n, t) {
                e && l.copy(e, w.position), n && l.copy(n, w.direction), t && l.copy(t, w.up)
            }

            function v() {
                var e = Math.max(d, w.distance);
                w.position[0] = e * Math.sin(w.phi) * Math.sin(w.theta), w.position[1] = e * Math.cos(w.phi), w.position[2] = e * Math.sin(w.phi) * Math.cos(w.theta), l.add(w.position, w.position, w.target)
            }
            e = e || {};
            var g = [0, 0, 0],
                x = [0, 0, 0],
                b = [0, 0, 0, 1],
                j = b.slice(),
                w = {
                    update: p,
                    copyInto: h,
                    position: e.position ? e.position.slice() : [0, 0, 1],
                    direction: [0, 0, -1],
                    up: e.up ? e.up.slice() : [0, 1, 0],
                    target: e.target ? e.target.slice() : [0, 0, 0],
                    phi: r(e.phi, Math.PI / 2),
                    theta: e.theta || 0,
                    distance: r(e.distance, 1),
                    damping: r(e.damping, .25),
                    rotateSpeed: r(e.rotateSpeed, .28),
                    zoomSpeed: r(e.zoomSpeed, .0075),
                    pinchSpeed: r(e.pinchSpeed, .0075),
                    pinch: e.pinching !== !1,
                    zoom: e.zoom !== !1,
                    rotate: e.rotate !== !1,
                    phiBounds: e.phiBounds || [0, Math.PI],
                    thetaBounds: e.thetaBounds || [-(1 / 0), 1 / 0],
                    distanceBounds: e.distanceBounds || [0, 1 / 0]
                };
            "number" != typeof e.distance && (l.subtract(m, w.position, w.target), w.distance = l.length(m)), v();
            const y = i({
                parent: e.parent || window,
                element: e.element,
                rotate: e.rotate !== !1 ? n : null,
                zoom: e.zoom !== !1 ? t : null,
                pinch: e.pinch !== !1 ? f : null
            });
            return w.enable = y.enable, w.disable = y.disable, w
        }

        function o(e, n, t, o) {
            l.copy(e, o), l.subtract(e, e, t), l.normalize(e, e)
        }
        var r = e("defined"),
            s = e("clamp"),
            i = e("./lib/input"),
            a = e("quat-from-unit-vec3"),
            u = e("gl-quat/invert"),
            l = {
                length: e("gl-vec3/length"),
                add: e("gl-vec3/add"),
                subtract: e("gl-vec3/subtract"),
                transformQuat: e("gl-vec3/transformQuat"),
                copy: e("gl-vec3/copy"),
                normalize: e("gl-vec3/normalize"),
                cross: e("gl-vec3/cross")
            },
            c = [0, 1, 0],
            d = Math.pow(2, -23),
            m = [0, 0, 0];
        n.exports = t
    }, {
        "./lib/input": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/orbit-controls/lib/input.js",
        clamp: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/clamp/index.js",
        defined: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/defined/index.js",
        "gl-quat/invert": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-quat/invert.js",
        "gl-vec3/add": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/add.js",
        "gl-vec3/copy": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/copy.js",
        "gl-vec3/cross": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/cross.js",
        "gl-vec3/length": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/length.js",
        "gl-vec3/normalize": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/normalize.js",
        "gl-vec3/subtract": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/subtract.js",
        "gl-vec3/transformQuat": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/transformQuat.js",
        "quat-from-unit-vec3": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/quat-from-unit-vec3/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/orbit-controls/lib/input.js": [function (e, n) {
        function t(e) {
            function n() {
                S || (S = !0, E && (x = o(b, function (e, n) {
                    E(n)
                }, !0)), U && (j.addEventListener("mousedown", m, !1), j.addEventListener("mousemove", p, !1), j.addEventListener("mouseup", f, !1)), (U || T) && (g = s(b), b.addEventListener("touchstart", i, !1), U && (b.addEventListener("touchmove", a, !1), g.on("place", u), g.on("lift", l)), T && g.on("change", d)))
            }

            function t() {
                S && (S = !1, x && b.removeEventListener("wheel", x), g && (g.disable(), b.removeEventListener("touchstart", i, !1), U && b.removeEventListener("touchmove", a, !1)), U && (j.removeEventListener("mousedown", m, !1), j.removeEventListener("mousemove", p, !1), j.removeEventListener("mouseup", f, !1)))
            }

            function i(e) {
                e.preventDefault()
            }

            function a(e) {
                if (y && !c())
                    for (var n = 0; n < e.changedTouches.length; n++) {
                        var t = e.changedTouches[n],
                            o = g.indexOfTouch(t),
                            r = T ? -1 !== o : 0 === o;
                        if (r) {
                            p(t);
                            break
                        }
                    }
            }

            function u(e, n) {
                if (y = !c()) {
                    var t = n || e;
                    m(t)
                }
            }

            function l(e, n) {
                y = !c(), y && n && r(n, b, w)
            }

            function c() {
                return g.pinching && T
            }

            function d(e, n) {
                T(e - n)
            }

            function m(e) {
                r(e, b, w), h(w) && (y = !0)
            }

            function f() {
                y = !1
            }

            function p(e) {
                var n = r(e, b, _);
                if (g && c()) return void (w = n);
                if (y) {
                    var t = v(D),
                        o = (n[0] - w[0]) / t[0],
                        s = (n[1] - w[1]) / t[1];
                    U(o, s), w[0] = n[0], w[1] = n[1]
                }
            }

            function h(e) {
                if (b === window || b === document || b === document.body) return !0;
                var n = b.getBoundingClientRect();
                return e[0] >= 0 && e[1] >= 0 && e[0] < n.width && e[1] < n.height
            }

            function v(e) {
                var n = b;
                return (n === window || n === document || n === document.body) && (n = document.documentElement), e[0] = n.clientWidth, e[1] = n.clientHeight, e
            }
            var g, x, b = e.element || window,
                j = e.parent || b,
                w = [0, 0],
                y = !1,
                _ = [0, 0],
                D = [0, 0],
                E = e.zoom,
                U = e.rotate,
                T = e.pinch,
                S = !1;
            return n(), {
                enable: n,
                disable: t
            }
        }
        var o = e("mouse-wheel"),
            r = e("mouse-event-offset"),
            s = e("touch-pinch");
        n.exports = t
    }, {
        "mouse-event-offset": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js",
        "mouse-wheel": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-wheel/wheel.js",
        "touch-pinch": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/touch-pinch/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/own-enumerable-keys/index.js": [function (e, n) {
        function t(e) {
            var n = Object.getOwnPropertyNames(e);
            return Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(e))), n.filter(function (n) {
                return o.call(e, n)
            })
        }
        var o = Object.prototype.propertyIsEnumerable;
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/parse-headers/parse-headers.js": [function (e, n) {
        var t = e("trim"),
            o = e("for-each"),
            r = function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
        n.exports = function (e) {
            if (!e) return {};
            var n = {};
            return o(t(e).split("\n"), function (e) {
                var o = e.indexOf(":"),
                    s = t(e.slice(0, o)).toLowerCase(),
                    i = t(e.slice(o + 1));
                "undefined" == typeof n[s] ? n[s] = i : r(n[s]) ? n[s].push(i) : n[s] = [n[s], i]
            }), n
        }
    }, {
        "for-each": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/for-each/index.js",
        trim: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/trim/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/parse-unit/index.js": [function (e, n) {
        n.exports = function (e, n) {
            n || (n = [0, ""]), e = String(e);
            var t = parseFloat(e, 10);
            return n[0] = t, n[1] = e.match(/[\d.\-\+]*\s*(.*)/)[1] || "", n
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/path-browserify/index.js": [function (e, n, t) {
        (function (e) {
            function n(e, n) {
                for (var t = 0, o = e.length - 1; o >= 0; o--) {
                    var r = e[o];
                    "." === r ? e.splice(o, 1) : ".." === r ? (e.splice(o, 1), t++) : t && (e.splice(o, 1), t--)
                }
                if (n)
                    for (; t--; t) e.unshift("..");
                return e
            }

            function o(e, n) {
                if (e.filter) return e.filter(n);
                for (var t = [], o = 0; o < e.length; o++) n(e[o], o, e) && t.push(e[o]);
                return t
            }
            var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                s = function (e) {
                    return r.exec(e).slice(1)
                };
            t.resolve = function () {
                for (var t = "", r = !1, s = arguments.length - 1; s >= -1 && !r; s--) {
                    var i = s >= 0 ? arguments[s] : e.cwd();
                    if ("string" != typeof i) throw new TypeError("Arguments to path.resolve must be strings");
                    i && (t = i + "/" + t, r = "/" === i.charAt(0))
                }
                return t = n(o(t.split("/"), function (e) {
                    return !!e
                }), !r).join("/"), (r ? "/" : "") + t || "."
            }, t.normalize = function (e) {
                var r = t.isAbsolute(e),
                    s = "/" === i(e, -1);
                return e = n(o(e.split("/"), function (e) {
                    return !!e
                }), !r).join("/"), e || r || (e = "."), e && s && (e += "/"), (r ? "/" : "") + e
            }, t.isAbsolute = function (e) {
                return "/" === e.charAt(0)
            }, t.join = function () {
                var e = Array.prototype.slice.call(arguments, 0);
                return t.normalize(o(e, function (e) {
                    if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                    return e
                }).join("/"))
            }, t.relative = function (e, n) {
                function o(e) {
                    for (var n = 0; n < e.length && "" === e[n]; n++);
                    for (var t = e.length - 1; t >= 0 && "" === e[t]; t--);
                    return n > t ? [] : e.slice(n, t - n + 1)
                }
                e = t.resolve(e).substr(1), n = t.resolve(n).substr(1);
                for (var r = o(e.split("/")), s = o(n.split("/")), i = Math.min(r.length, s.length), a = i, u = 0; i > u; u++)
                    if (r[u] !== s[u]) {
                        a = u;
                        break
                    } for (var l = [], u = a; u < r.length; u++) l.push("..");
                return l = l.concat(s.slice(a)), l.join("/")
            }, t.sep = "/", t.delimiter = ":", t.dirname = function (e) {
                var n = s(e),
                    t = n[0],
                    o = n[1];
                return t || o ? (o && (o = o.substr(0, o.length - 1)), t + o) : "."
            }, t.basename = function (e, n) {
                var t = s(e)[2];
                return n && t.substr(-1 * n.length) === n && (t = t.substr(0, t.length - n.length)), t
            }, t.extname = function (e) {
                return s(e)[3]
            };
            var i = "b" === "ab".substr(-1) ? function (e, n, t) {
                return e.substr(n, t)
            } : function (e, n, t) {
                return 0 > n && (n = e.length + n), e.substr(n, t)
            }
        }).call(this, e("_process"))
    }, {
        _process: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/process/browser.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/performance-now/lib/performance-now.js": [function (e, n) {
        (function (e) {
            (function () {
                var t, o, r;
                "undefined" != typeof performance && null !== performance && performance.now ? n.exports = function () {
                    return performance.now()
                } : "undefined" != typeof e && null !== e && e.hrtime ? (n.exports = function () {
                    return (t() - r) / 1e6
                }, o = e.hrtime, t = function () {
                    var e;
                    return e = o(), 1e9 * e[0] + e[1]
                }, r = t()) : Date.now ? (n.exports = function () {
                    return Date.now() - r
                }, r = Date.now()) : (n.exports = function () {
                    return (new Date).getTime() - r
                }, r = (new Date).getTime())
            }).call(this)
        }).call(this, e("_process"))
    }, {
        _process: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/process/browser.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/prefix-style/index.js": [function (e, n) {
        var t = null,
            o = ["Webkit", "Moz", "O", "ms"];
        n.exports = function (e) {
            t || (t = document.createElement("div"));
            var n = t.style;
            if (e in n) return e;
            for (var r = e.charAt(0).toUpperCase() + e.slice(1), s = o.length; s >= 0; s--) {
                var i = o[s] + r;
                if (i in n) return i
            }
            return !1
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/process/browser.js": [function (e, n) {
        function t() {
            throw new Error("setTimeout has not been defined")
        }

        function o() {
            throw new Error("clearTimeout has not been defined")
        }

        function r(e) {
            if (c === setTimeout) return setTimeout(e, 0);
            if ((c === t || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0);
            try {
                return c(e, 0)
            } catch (n) {
                try {
                    return c.call(null, e, 0)
                } catch (n) {
                    return c.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (d === clearTimeout) return clearTimeout(e);
            if ((d === o || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
            try {
                return d(e)
            } catch (n) {
                try {
                    return d.call(null, e)
                } catch (n) {
                    return d.call(this, e)
                }
            }
        }

        function i() {
            h && f && (h = !1, f.length ? p = f.concat(p) : v = -1, p.length && a())
        }

        function a() {
            if (!h) {
                var e = r(i);
                h = !0;
                for (var n = p.length; n;) {
                    for (f = p, p = []; ++v < n;) f && f[v].run();
                    v = -1, n = p.length
                }
                f = null, h = !1, s(e)
            }
        }

        function u(e, n) {
            this.fun = e, this.array = n
        }

        function l() { }
        var c, d, m = n.exports = {};
        ! function () {
            try {
                c = "function" == typeof setTimeout ? setTimeout : t
            } catch (e) {
                c = t
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : o
            } catch (e) {
                d = o
            }
        }();
        var f, p = [],
            h = !1,
            v = -1;
        m.nextTick = function (e) {
            var n = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var t = 1; t < arguments.length; t++) n[t - 1] = arguments[t];
            p.push(new u(e, n)), 1 !== p.length || h || r(a)
        }, u.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, m.title = "browser", m.browser = !0, m.env = {}, m.argv = [], m.version = "", m.versions = {}, m.on = l, m.addListener = l, m.once = l, m.off = l, m.removeListener = l, m.removeAllListeners = l, m.emit = l, m.binding = function () {
            throw new Error("process.binding is not supported")
        }, m.cwd = function () {
            return "/"
        }, m.chdir = function () {
            throw new Error("process.chdir is not supported")
        }, m.umask = function () {
            return 0
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/quat-from-unit-vec3/index.js": [function (e, n) {
        function t(e, n, t) {
            var l = o(n, t) + 1;
            return u > l ? (l = 0, Math.abs(n[0]) > Math.abs(n[2]) ? r(a, -n[1], n[0], 0) : r(a, 0, -n[2], n[1])) : i(a, n, t), e[0] = a[0], e[1] = a[1], e[2] = a[2], e[3] = l, s(e, e), e
        }
        var o = e("gl-vec3/dot"),
            r = e("gl-vec3/set"),
            s = e("gl-quat/normalize"),
            i = e("gl-vec3/cross"),
            a = [0, 0, 0],
            u = 1e-6;
        n.exports = t
    }, {
        "gl-quat/normalize": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-quat/normalize.js",
        "gl-vec3/cross": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/cross.js",
        "gl-vec3/dot": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/dot.js",
        "gl-vec3/set": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec3/set.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/query-string/index.js": [function (e, n, t) {
        "use strict";

        function o(e, n) {
            return n.encode ? n.strict ? r(e) : encodeURIComponent(e) : e
        }
        var r = e("strict-uri-encode"),
            s = e("object-assign");
        t.extract = function (e) {
            return e.split("?")[1] || ""
        }, t.parse = function (e) {
            var n = Object.create(null);
            return "string" != typeof e ? n : (e = e.trim().replace(/^(\?|#|&)/, "")) ? (e.split("&").forEach(function (e) {
                var t = e.replace(/\+/g, " ").split("="),
                    o = t.shift(),
                    r = t.length > 0 ? t.join("=") : void 0;
                o = decodeURIComponent(o), r = void 0 === r ? null : decodeURIComponent(r), void 0 === n[o] ? n[o] = r : Array.isArray(n[o]) ? n[o].push(r) : n[o] = [n[o], r]
            }), n) : n
        }, t.stringify = function (e, n) {
            var t = {
                encode: !0,
                strict: !0
            };
            return n = s(t, n), e ? Object.keys(e).sort().map(function (t) {
                var r = e[t];
                if (void 0 === r) return "";
                if (null === r) return o(t, n);
                if (Array.isArray(r)) {
                    var s = [];
                    return r.slice().forEach(function (e) {
                        void 0 !== e && s.push(null === e ? o(t, n) : o(t, n) + "=" + o(e, n))
                    }), s.join("&")
                }
                return o(t, n) + "=" + o(r, n)
            }).filter(function (e) {
                return e.length > 0
            }).join("&") : ""
        }
    }, {
        "object-assign": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/object-assign/index.js",
        "strict-uri-encode": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/strict-uri-encode/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/raf-loop/index.js": [function (e, n) {
        function t(e) {
            return this instanceof t ? (this.running = !1, this.last = s(), this._frame = 0, this._tick = this.tick.bind(this), void (e && this.on("tick", e))) : new t(e)
        }
        var o = e("inherits"),
            r = e("events").EventEmitter,
            s = e("right-now"),
            i = e("raf");
        n.exports = t, o(t, r), t.prototype.start = function () {
            return this.running ? void 0 : (this.running = !0, this.last = s(), this._frame = i(this._tick), this)
        }, t.prototype.stop = function () {
            return this.running = !1, 0 !== this._frame && i.cancel(this._frame), this._frame = 0, this
        }, t.prototype.tick = function () {
            this._frame = i(this._tick);
            var e = s(),
                n = e - this.last;
            this.emit("tick", n), this.last = e
        }
    }, {
        events: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js",
        inherits: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/inherits/inherits_browser.js",
        raf: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/raf/index.js",
        "right-now": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/right-now/browser.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/raf/index.js": [function (e, n) {
        (function (t) {
            for (var o = e("performance-now"), r = "undefined" == typeof window ? t : window, s = ["moz", "webkit"], i = "AnimationFrame", a = r["request" + i], u = r["cancel" + i] || r["cancelRequest" + i], l = 0; !a && l < s.length; l++) a = r[s[l] + "Request" + i], u = r[s[l] + "Cancel" + i] || r[s[l] + "CancelRequest" + i];
            if (!a || !u) {
                var c = 0,
                    d = 0,
                    m = [],
                    f = 1e3 / 60;
                a = function (e) {
                    if (0 === m.length) {
                        var n = o(),
                            t = Math.max(0, f - (n - c));
                        c = t + n, setTimeout(function () {
                            var e = m.slice(0);
                            m.length = 0;
                            for (var n = 0; n < e.length; n++)
                                if (!e[n].cancelled) try {
                                    e[n].callback(c)
                                } catch (t) {
                                    setTimeout(function () {
                                        throw t
                                    }, 0)
                                }
                        }, Math.round(t))
                    }
                    return m.push({
                        handle: ++d,
                        callback: e,
                        cancelled: !1
                    }), d
                }, u = function (e) {
                    for (var n = 0; n < m.length; n++) m[n].handle === e && (m[n].cancelled = !0)
                }
            }
            n.exports = function (e) {
                return a.call(r, e)
            }, n.exports.cancel = function () {
                u.apply(r, arguments)
            }, n.exports.polyfill = function () {
                r.requestAnimationFrame = a, r.cancelAnimationFrame = u
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "performance-now": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/performance-now/lib/performance-now.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/right-now/browser.js": [function (e, n) {
        (function (e) {
            n.exports = e.performance && e.performance.now ? function () {
                return performance.now()
            } : Date.now || function () {
                return +new Date
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/seed-random/index.js": [function (e, n) {
        (function (e) {
            "use strict";

            function t(e) {
                var n, t = e.length,
                    o = this,
                    r = 0,
                    s = o.i = o.j = 0,
                    i = o.S = [];
                for (t || (e = [t++]); a > r;) i[r] = r++;
                for (r = 0; a > r; r++) i[r] = i[s = h & s + e[r % t] + (n = i[r])], i[s] = n;
                (o.g = function (e) {
                    for (var n, t = 0, r = o.i, s = o.j, i = o.S; e--;) n = i[r = h & r + 1], t = t * a + i[h & (i[r] = i[s = h & s + n]) + (i[s] = n)];
                    return o.i = r, o.j = s, t
                })(a)
            }

            function o(e, n) {
                var t, r = [],
                    s = (typeof e)[0];
                if (n && "o" == s)
                    for (t in e) try {
                        r.push(o(e[t], n - 1))
                    } catch (i) { }
                return r.length ? r : "s" == s ? e : e + "\x00"
            }

            function r(e, n) {
                for (var t, o = e + "", r = 0; r < o.length;) n[h & r] = h & (t ^= 19 * n[h & r]) + o.charCodeAt(r++);
                return i(n)
            }

            function s(e) {
                try {
                    return d.crypto.getRandomValues(e = new Uint8Array(a)), i(e)
                } catch (n) {
                    return [+new Date, d, d.navigator && d.navigator.plugins, d.screen, i(c)]
                }
            }

            function i(e) {
                return String.fromCharCode.apply(0, e)
            }
            var a = 256,
                u = 6,
                l = 52,
                c = [],
                d = "undefined" == typeof e ? window : e,
                m = Math.pow(a, u),
                f = Math.pow(2, l),
                p = 2 * f,
                h = a - 1,
                v = Math.random;
            n.exports = function (e, l) {
                if (l && l.global === !0) return l.global = !1, Math.random = n.exports(e, l), l.global = !0, Math.random;
                var d = l && l.entropy || !1,
                    h = [],
                    v = (r(o(d ? [e, i(c)] : 0 in arguments ? e : s(), 3), h), new t(h));
                return r(i(v.S), c),
                    function () {
                        for (var e = v.g(u), n = m, t = 0; f > e;) e = (e + t) * a, n *= a, t = v.g(1);
                        for (; e >= p;) e /= 2, n /= 2, t >>>= 1;
                        return (e + t) / n
                    }
            }, n.exports.resetGlobal = function () {
                Math.random = v
            }, r(Math.random(), c)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/simplex-noise/simplex-noise.js": [function (e, n, t) {
        ! function () {
            "use strict";

            function e(e) {
                e || (e = Math.random), this.p = new Uint8Array(256), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);
                for (var n = 0; 256 > n; n++) this.p[n] = 256 * e();
                for (n = 0; 512 > n; n++) this.perm[n] = this.p[255 & n], this.permMod12[n] = this.perm[n] % 12
            }
            var o = .5 * (Math.sqrt(3) - 1),
                r = (3 - Math.sqrt(3)) / 6,
                s = 1 / 3,
                i = 1 / 6,
                a = (Math.sqrt(5) - 1) / 4,
                u = (5 - Math.sqrt(5)) / 20;
            e.prototype = {
                grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
                grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
                noise2D: function (e, n) {
                    var t, s, i = this.permMod12,
                        a = this.perm,
                        u = this.grad3,
                        l = 0,
                        c = 0,
                        d = 0,
                        m = (e + n) * o,
                        f = Math.floor(e + m),
                        p = Math.floor(n + m),
                        h = (f + p) * r,
                        v = f - h,
                        g = p - h,
                        x = e - v,
                        b = n - g;
                    x > b ? (t = 1, s = 0) : (t = 0, s = 1);
                    var j = x - t + r,
                        w = b - s + r,
                        y = x - 1 + 2 * r,
                        _ = b - 1 + 2 * r,
                        D = 255 & f,
                        E = 255 & p,
                        U = .5 - x * x - b * b;
                    if (U >= 0) {
                        var T = 3 * i[D + a[E]];
                        U *= U, l = U * U * (u[T] * x + u[T + 1] * b)
                    }
                    var S = .5 - j * j - w * w;
                    if (S >= 0) {
                        var M = 3 * i[D + t + a[E + s]];
                        S *= S, c = S * S * (u[M] * j + u[M + 1] * w)
                    }
                    var C = .5 - y * y - _ * _;
                    if (C >= 0) {
                        var A = 3 * i[D + 1 + a[E + 1]];
                        C *= C, d = C * C * (u[A] * y + u[A + 1] * _)
                    }
                    return 70 * (l + c + d)
                },
                noise3D: function (e, n, t) {
                    var o, r, a, u, l, c, d, m, f, p, h = this.permMod12,
                        v = this.perm,
                        g = this.grad3,
                        x = (e + n + t) * s,
                        b = Math.floor(e + x),
                        j = Math.floor(n + x),
                        w = Math.floor(t + x),
                        y = (b + j + w) * i,
                        _ = b - y,
                        D = j - y,
                        E = w - y,
                        U = e - _,
                        T = n - D,
                        S = t - E;
                    U >= T ? T >= S ? (l = 1, c = 0, d = 0, m = 1, f = 1, p = 0) : U >= S ? (l = 1, c = 0, d = 0, m = 1, f = 0, p = 1) : (l = 0, c = 0, d = 1, m = 1, f = 0, p = 1) : S > T ? (l = 0, c = 0, d = 1, m = 0, f = 1, p = 1) : S > U ? (l = 0, c = 1, d = 0, m = 0, f = 1, p = 1) : (l = 0, c = 1, d = 0, m = 1, f = 1, p = 0);
                    var M = U - l + i,
                        C = T - c + i,
                        A = S - d + i,
                        R = U - m + 2 * i,
                        L = T - f + 2 * i,
                        k = S - p + 2 * i,
                        I = U - 1 + 3 * i,
                        O = T - 1 + 3 * i,
                        P = S - 1 + 3 * i,
                        z = 255 & b,
                        q = 255 & j,
                        F = 255 & w,
                        H = .6 - U * U - T * T - S * S;
                    if (0 > H) o = 0;
                    else {
                        var N = 3 * h[z + v[q + v[F]]];
                        H *= H, o = H * H * (g[N] * U + g[N + 1] * T + g[N + 2] * S)
                    }
                    var B = .6 - M * M - C * C - A * A;
                    if (0 > B) r = 0;
                    else {
                        var V = 3 * h[z + l + v[q + c + v[F + d]]];
                        B *= B, r = B * B * (g[V] * M + g[V + 1] * C + g[V + 2] * A)
                    }
                    var G = .6 - R * R - L * L - k * k;
                    if (0 > G) a = 0;
                    else {
                        var W = 3 * h[z + m + v[q + f + v[F + p]]];
                        G *= G, a = G * G * (g[W] * R + g[W + 1] * L + g[W + 2] * k)
                    }
                    var X = .6 - I * I - O * O - P * P;
                    if (0 > X) u = 0;
                    else {
                        var Y = 3 * h[z + 1 + v[q + 1 + v[F + 1]]];
                        X *= X, u = X * X * (g[Y] * I + g[Y + 1] * O + g[Y + 2] * P)
                    }
                    return 32 * (o + r + a + u)
                },
                noise4D: function (e, n, t, o) {
                    var r, s, i, l, c, d = (this.permMod12, this.perm),
                        m = this.grad4,
                        f = (e + n + t + o) * a,
                        p = Math.floor(e + f),
                        h = Math.floor(n + f),
                        v = Math.floor(t + f),
                        g = Math.floor(o + f),
                        x = (p + h + v + g) * u,
                        b = p - x,
                        j = h - x,
                        w = v - x,
                        y = g - x,
                        _ = e - b,
                        D = n - j,
                        E = t - w,
                        U = o - y,
                        T = 0,
                        S = 0,
                        M = 0,
                        C = 0;
                    _ > D ? T++ : S++, _ > E ? T++ : M++, _ > U ? T++ : C++, D > E ? S++ : M++, D > U ? S++ : C++, E > U ? M++ : C++;
                    var A, R, L, k, I, O, P, z, q, F, H, N;
                    A = T >= 3 ? 1 : 0, R = S >= 3 ? 1 : 0, L = M >= 3 ? 1 : 0, k = C >= 3 ? 1 : 0, I = T >= 2 ? 1 : 0, O = S >= 2 ? 1 : 0, P = M >= 2 ? 1 : 0, z = C >= 2 ? 1 : 0, q = T >= 1 ? 1 : 0, F = S >= 1 ? 1 : 0, H = M >= 1 ? 1 : 0, N = C >= 1 ? 1 : 0;
                    var B = _ - A + u,
                        V = D - R + u,
                        G = E - L + u,
                        W = U - k + u,
                        X = _ - I + 2 * u,
                        Y = D - O + 2 * u,
                        Q = E - P + 2 * u,
                        K = U - z + 2 * u,
                        $ = _ - q + 3 * u,
                        Z = D - F + 3 * u,
                        J = E - H + 3 * u,
                        ee = U - N + 3 * u,
                        ne = _ - 1 + 4 * u,
                        te = D - 1 + 4 * u,
                        oe = E - 1 + 4 * u,
                        re = U - 1 + 4 * u,
                        se = 255 & p,
                        ie = 255 & h,
                        ae = 255 & v,
                        ue = 255 & g,
                        le = .6 - _ * _ - D * D - E * E - U * U;
                    if (0 > le) r = 0;
                    else {
                        var ce = d[se + d[ie + d[ae + d[ue]]]] % 32 * 4;
                        le *= le, r = le * le * (m[ce] * _ + m[ce + 1] * D + m[ce + 2] * E + m[ce + 3] * U)
                    }
                    var de = .6 - B * B - V * V - G * G - W * W;
                    if (0 > de) s = 0;
                    else {
                        var me = d[se + A + d[ie + R + d[ae + L + d[ue + k]]]] % 32 * 4;
                        de *= de, s = de * de * (m[me] * B + m[me + 1] * V + m[me + 2] * G + m[me + 3] * W)
                    }
                    var fe = .6 - X * X - Y * Y - Q * Q - K * K;
                    if (0 > fe) i = 0;
                    else {
                        var pe = d[se + I + d[ie + O + d[ae + P + d[ue + z]]]] % 32 * 4;
                        fe *= fe, i = fe * fe * (m[pe] * X + m[pe + 1] * Y + m[pe + 2] * Q + m[pe + 3] * K)
                    }
                    var he = .6 - $ * $ - Z * Z - J * J - ee * ee;
                    if (0 > he) l = 0;
                    else {
                        var ve = d[se + q + d[ie + F + d[ae + H + d[ue + N]]]] % 32 * 4;
                        he *= he, l = he * he * (m[ve] * $ + m[ve + 1] * Z + m[ve + 2] * J + m[ve + 3] * ee)
                    }
                    var ge = .6 - ne * ne - te * te - oe * oe - re * re;
                    if (0 > ge) c = 0;
                    else {
                        var xe = d[se + 1 + d[ie + 1 + d[ae + 1 + d[ue + 1]]]] % 32 * 4;
                        ge *= ge, c = ge * ge * (m[xe] * ne + m[xe + 1] * te + m[xe + 2] * oe + m[xe + 3] * re);

                    }
                    return 27 * (r + s + i + l + c)
                }
            }, "undefined" != typeof define && define.amd && define(function () {
                return e
            }), "undefined" != typeof t ? t.SimplexNoise = e : "undefined" != typeof window && (window.SimplexNoise = e), "undefined" != typeof n && (n.exports = e)
        }()
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/smoothstep/index.js": [function (e, n) {
        n.exports = function (e, n, t) {
            var o = Math.max(0, Math.min(1, (t - e) / (n - e)));
            return o * o * (3 - 2 * o)
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/soundbank-reverb/build-impulse.js": [function (e, n) {
        function t(e, n, t, u) {
            a += 1;
            var l = i[a] = {
                id: a,
                cb: u,
                length: e,
                decay: n,
                reverse: t,
                impulseL: new Float32Array(e),
                impulseR: new Float32Array(e)
            };
            return s.push([l.id, 0, Math.min(r, e)]), setTimeout(o, 1), a
        }

        function o() {
            var e = s.shift();
            if (e) {
                var n = i[e[0]];
                if (n) {
                    for (var t = n.length, a = n.decay, u = n.reverse, l = e[1], c = e[2], d = n.impulseL, m = n.impulseR, f = l; c > f; f++) {
                        var p = u ? t - f : f;
                        d[f] = (2 * Math.random() - 1) * Math.pow(1 - p / t, a), m[f] = (2 * Math.random() - 1) * Math.pow(1 - p / t, a)
                    }
                    c >= t - 1 ? (delete i[e[0]], n.cb([n.impulseL, n.impulseR])) : s.push([n.id, c, Math.min(c + r, t)])
                }
            }
            s.length && setTimeout(o, 5)
        }
        n.exports = t;
        var r = 2048,
            s = [],
            i = {},
            a = 0;
        t.cancel = function (e) {
            return i[e] ? (delete i[e], !0) : !1
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/soundbank-reverb/index.js": [function (e, n) {
        function t(e) {
            var n = e.createGain(),
                t = n._dry = e.createGain(),
                o = n._wet = e.createGain(),
                s = n.output = e.createGain(),
                i = n._convolver = e.createConvolver(),
                a = n._filter = e.createBiquadFilter();
            return n.connect(t), n.connect(o), i.connect(a), t.connect(s), o.connect(i), a.connect(s), Object.defineProperties(n, r), n._time = 3, n._decay = 2, n._reverse = !1, n.cutoff.value = 2e4, n.filterType = "lowpass", n._building = !1, n._buildImpulse(), n
        }
        var o = e("./build-impulse");
        n.exports = t;
        var r = {
            connect: {
                value: function () {
                    this.output.connect.apply(this.output, arguments)
                }
            },
            disconnect: {
                value: function () {
                    this.output.disconnect.apply(this.output, arguments)
                }
            },
            wet: {
                get: function () {
                    return this._wet.gain
                }
            },
            dry: {
                get: function () {
                    return this._dry.gain
                }
            },
            cutoff: {
                get: function () {
                    return this._filter.frequency
                }
            },
            filterType: {
                get: function () {
                    return this._filter.type
                },
                set: function (e) {
                    this._filter.type = e
                }
            },
            _buildImpulse: {
                value: function () {
                    var e = this,
                        n = e.context.sampleRate,
                        t = Math.max(n * e.time, 1);
                    e._building && o.cancel(e._building), e._building = o(t, e.decay, e.reverse, function (o) {
                        var r = e.context.createBuffer(2, t, n);
                        r.getChannelData(0).set(o[0]), r.getChannelData(1).set(o[1]), e._convolver.buffer = r, e._building = !1
                    })
                }
            },
            time: {
                enumerable: !0,
                get: function () {
                    return this._time
                },
                set: function (e) {
                    this._time = e, this._buildImpulse()
                }
            },
            decay: {
                enumerable: !0,
                get: function () {
                    return this._decay
                },
                set: function (e) {
                    this._decay = e, this._buildImpulse()
                }
            },
            reverse: {
                enumerable: !0,
                get: function () {
                    return this._reverse
                },
                set: function (e) {
                    this._reverse = e, this._buildImpulse()
                }
            }
        }
    }, {
        "./build-impulse": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/soundbank-reverb/build-impulse.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/strict-uri-encode/index.js": [function (e, n) {
        "use strict";
        n.exports = function (e) {
            return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            })
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-buffer-vertex-data/index.js": [function (e, n) {
        function t(e, n, t, o) {
            "number" != typeof t && (t = 1), "string" != typeof o && (o = "uint16");
            var s = !e.index && "function" != typeof e.setIndex,
                i = s ? e.getAttribute("index") : e.index,
                a = r(i, n, t, o);
            a && (s ? e.addAttribute("index", a) : e.index = a)
        }

        function o(e, n, t, o, s) {
            if ("number" != typeof o && (o = 3), "string" != typeof s && (s = "float32"), Array.isArray(t) && Array.isArray(t[0]) && t[0].length !== o) throw new Error("Nested vertex array has unexpected size; expected " + o + " but found " + t[0].length);
            var i = e.getAttribute(n),
                a = r(i, t, o, s);
            a && e.addAttribute(n, a)
        }

        function r(e, n, t, o) {
            if (n = n || [], !e || s(e, n, t)) {
                n = i(n, o);
                var r = e && "function" != typeof e.setArray;
                return (!e || r) && (r && !a && (a = !0, console.warn(["A WebGL buffer is being updated with a new size or itemSize, ", "however this version of ThreeJS only supports fixed-size buffers.", "\nThe old buffer may still be kept in memory.\n", "To avoid memory leaks, it is recommended that you dispose ", "your geometries and create new ones, or update to ThreeJS r82 or newer.\n", "See here for discussion:\n", "https://github.com/mrdoob/three.js/pull/9631"].join(""))), e = new THREE.BufferAttribute(n, t)), e.itemSize = t, e.needsUpdate = !0, "function" == typeof e.setArray && e.setArray(n), e
            }
            return i(n, e.array), e.needsUpdate = !0, null
        }

        function s(e, n, t) {
            if (e.itemSize !== t) return !0;
            if (!e.array) return !0;
            var o = e.array.length;
            return Array.isArray(n) && Array.isArray(n[0]) ? o !== n.length * t : o !== n.length
        }
        var i = e("flatten-vertex-data"),
            a = !1;
        n.exports.attr = o, n.exports.index = t
    }, {
        "flatten-vertex-data": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/flatten-vertex-data/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-copyshader/index.js": [function (e, n) {
        n.exports = {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: null
                },
                opacity: {
                    type: "f",
                    value: 1
                }
            },
            vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
            fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-effectcomposer/lib/clearmaskpass.js": [function (e, n) {
        n.exports = function () {
            function e() {
                return this instanceof e ? void (this.enabled = !0) : new e(scene, camera)
            }
            return e.prototype = {
                render: function (e) {
                    var n = e.context;
                    n.disable(n.STENCIL_TEST)
                }
            }, e
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-effectcomposer/lib/maskpass.js": [function (e, n) {
        n.exports = function () {
            function e(n, t) {
                return this instanceof e ? (this.scene = n, this.camera = t, this.enabled = !0, this.clear = !0, this.needsSwap = !1, void (this.inverse = !1)) : new e(n, t)
            }
            return e.prototype = {
                render: function (e, n, t) {
                    var o = e.context;
                    o.colorMask(!1, !1, !1, !1), o.depthMask(!1);
                    var r, s;
                    this.inverse ? (r = 0, s = 1) : (r = 1, s = 0), o.enable(o.STENCIL_TEST), o.stencilOp(o.REPLACE, o.REPLACE, o.REPLACE), o.stencilFunc(o.ALWAYS, r, 4294967295), o.clearStencil(s), e.render(this.scene, this.camera, t, this.clear), e.render(this.scene, this.camera, n, this.clear), o.colorMask(!0, !0, !0, !0), o.depthMask(!0), o.stencilFunc(o.EQUAL, 1, 4294967295), o.stencilOp(o.KEEP, o.KEEP, o.KEEP)
                }
            }, e
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-effectcomposer/lib/renderpass.js": [function (e, n) {
        n.exports = function (e) {
            function n(t, o, r, s, i) {
                return this instanceof n ? (this.scene = t, this.camera = o, this.overrideMaterial = r, this.clearColor = s, this.clearAlpha = void 0 !== i ? i : 1, this.oldClearColor = new e.Color, this.oldClearAlpha = 1, this.enabled = !0, this.clear = !0, void (this.needsSwap = !1)) : new n(t, o, r, s, i)
            }
            return n.prototype = {
                render: function (e, n, t) {
                    this.scene.overrideMaterial = this.overrideMaterial, this.clearColor && (this.oldClearColor.copy(e.getClearColor()), this.oldClearAlpha = e.getClearAlpha(), e.setClearColor(this.clearColor, this.clearAlpha)), e.render(this.scene, this.camera, t, this.clear), this.clearColor && e.setClearColor(this.oldClearColor, this.oldClearAlpha), this.scene.overrideMaterial = null
                }
            }, n
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/three-shader-fxaa/build/index.js": [function (e, n) {
        (function (e) {
            function t(n) {
                if ("undefined" == typeof e.THREE) throw new TypeError("You must have THREE in global scope for this module.");
                return n = n || {}, {
                    uniforms: {
                        tDiffuse: {
                            type: "t",
                            value: new THREE.Texture
                        },
                        resolution: {
                            type: "v2",
                            value: n.resolution || new THREE.Vector2
                        }
                    },
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec2 resolution;\n\nvoid main() {\n  vUv = uv;\n  vec2 fragCoord = uv * resolution;\n  vec2 inverseVP = 1.0 / resolution.xy;\n  v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n  v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n  v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n  v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n  v_rgbM = vec2(fragCoord * inverseVP);\n\n  gl_Position = projectionMatrix *\n              modelViewMatrix *\n              vec4(position,1.0);\n}\n",
                    fragmentShader: '#define GLSLIFY 1\nvarying vec2 vUv;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n//make sure to have a resolution uniform set to the screen size\nuniform vec2 resolution;\nuniform sampler2D tDiffuse;\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent \n//texture reads can be a bottleneck\nvec4 fxaa_1540259130(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE, \n            vec2 v_rgbSW, vec2 v_rgbSE, \n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n  vec2 fragCoord = vUv * resolution;   \n  gl_FragColor = fxaa_1540259130(tDiffuse, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n'
                }
            }
            n.exports = t
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-camel-case/index.js": [function (e, n) {
        function t(e) {
            return o(e).replace(/\s(\w)/g, function (e, n) {
                return n.toUpperCase()
            })
        }
        var o = e("to-space-case");
        n.exports = t
    }, {
        "to-space-case": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-space-case/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-no-case/index.js": [function (e, n) {
        function t(e) {
            return s.test(e) ? e.toLowerCase() : i.test(e) ? (o(e) || e).toLowerCase() : a.test(e) ? r(e).toLowerCase() : e.toLowerCase()
        }

        function o(e) {
            return e.replace(u, function (e, n) {
                return n ? " " + n : ""
            })
        }

        function r(e) {
            return e.replace(l, function (e, n, t) {
                return n + " " + t.toLowerCase().split("").join(" ")
            })
        }
        n.exports = t;
        var s = /\s/,
            i = /(_|-|\.|:)/,
            a = /([a-z][A-Z]|[A-Z][a-z])/,
            u = /[\W_]+(.|$)/g,
            l = /(.)([A-Z]+)/g
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-px/topx.js": [function (e, n) {
        "use strict";

        function t(e, n) {
            var t = s(getComputedStyle(e).getPropertyValue(n));
            return t[0] * r(t[1], e)
        }

        function o(e, n) {
            var o = document.createElement("div");
            o.style["font-size"] = "128" + e, n.appendChild(o);
            var r = t(o, "font-size") / 128;
            return n.removeChild(o), r
        }

        function r(e, n) {
            switch (n = n || document.body, e = (e || "px").trim().toLowerCase(), (n === window || n === document) && (n = document.body), e) {
                case "%":
                    return n.clientHeight / 100;
                case "ch":
                case "ex":
                    return o(e, n);
                case "em":
                    return t(n, "font-size");
                case "rem":
                    return t(document.body, "font-size");
                case "vw":
                    return window.innerWidth / 100;
                case "vh":
                    return window.innerHeight / 100;
                case "vmin":
                    return Math.min(window.innerWidth, window.innerHeight) / 100;
                case "vmax":
                    return Math.max(window.innerWidth, window.innerHeight) / 100;
                case "in":
                    return i;
                case "cm":
                    return i / 2.54;
                case "mm":
                    return i / 25.4;
                case "pt":
                    return i / 72;
                case "pc":
                    return i / 6
            }
            return 1
        }
        var s = e("parse-unit");
        n.exports = r;
        var i = 96
    }, {
        "parse-unit": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/parse-unit/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-space-case/index.js": [function (e, n) {
        function t(e) {
            return o(e).replace(/[\W_]+(.|$)/g, function (e, n) {
                return n ? " " + n : ""
            }).trim()
        }
        var o = e("to-no-case");
        n.exports = t
    }, {
        "to-no-case": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/to-no-case/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/touch-pinch/index.js": [function (e, n) {
        function t(e) {
            function n(e) {
                for (var n = e.identifier, t = 0; t < p.length; t++)
                    if (p[t] && p[t].touch && p[t].touch.identifier === n) return t;
                return -1
            }

            function t() {
                x || (x = !0, e.addEventListener("touchstart", l, !1), e.addEventListener("touchmove", c, !1), e.addEventListener("touchend", d, !1), e.addEventListener("touchcancel", d, !1))
            }

            function u() {
                x && (x = !1, e.removeEventListener("touchstart", l, !1), e.removeEventListener("touchmove", c, !1), e.removeEventListener("touchend", d, !1), e.removeEventListener("touchcancel", d, !1))
            }

            function l(t) {
                for (var r = 0; r < t.changedTouches.length; r++) {
                    var s = t.changedTouches[r],
                        i = s.identifier,
                        u = n(i);
                    if (-1 === u && 2 > h) {
                        var l = 0 === h,
                            c = p[0] ? 1 : 0,
                            d = p[0] ? 0 : 1,
                            x = new o;
                        p[c] = x, h++, x.touch = s, a(s, e, x.position);
                        var b = p[d] ? p[d].touch : void 0;
                        if (f.emit("place", s, b), !l) {
                            var j = m();
                            g = !1, f.emit("start", j), v = j
                        }
                    }
                }
            }

            function c(t) {
                for (var o = !1, r = 0; r < t.changedTouches.length; r++) {
                    var s = t.changedTouches[r],
                        i = n(s); - 1 !== i && (o = !0, p[i].touch = s, a(s, e, p[i].position))
                }
                if (2 === h && o) {
                    var u = m();
                    f.emit("change", u, v), v = u
                }
            }

            function d(e) {
                for (var t = 0; t < e.changedTouches.length; t++) {
                    var o = e.changedTouches[t],
                        r = n(o);
                    if (-1 !== r) {
                        p[r] = null, h--;
                        var s = 0 === r ? 1 : 0,
                            i = p[s] ? p[s].touch : void 0;
                        f.emit("lift", o, i)
                    }
                }
                g || 2 === h || (g = !0, f.emit("end"))
            }

            function m() {
                return 2 > h ? 0 : r(p[0].position, p[1].position)
            }
            e = e || window;
            var f = new s,
                p = [null, null],
                h = 0,
                v = 0,
                g = !1,
                x = !1;
            return Object.defineProperties(f, {
                pinching: i(function () {
                    return 2 === h
                }),
                fingers: i(function () {
                    return p
                })
            }), t(), f.enable = t, f.disable = u, f.indexOfTouch = n, f
        }

        function o() {
            this.position = [0, 0], this.touch = null
        }
        var r = e("gl-vec2/distance"),
            s = e("events").EventEmitter,
            i = e("dprop"),
            a = e("mouse-event-offset");
        n.exports = t
    }, {
        dprop: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/dprop/index.js",
        events: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js",
        "gl-vec2/distance": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/gl-vec2/distance.js",
        "mouse-event-offset": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mouse-event-offset/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/touches/index.js": [function (e, n) {
        function t(e, n) {
            var t = e.clientX || 0,
                o = e.clientY || 0,
                r = a(n);
            return [t - r.left, o - r.top]
        }

        function o(e, n) {
            return Array.prototype.slice.call(e).filter(function (e) {
                return e.target === n
            })[0] || e[0]
        }

        function r(e, n) {
            for (var t = 0; t < e.length; t++)
                if (e[t].identifier === n) return e[t];
            return null
        }

        function s(e, n) {
            return function (t) {
                n ? e.addEventListener(t.type, t.listener) : e.removeEventListener(t.type, t.listener)
            }
        }

        function i(e) {
            return e.replace(/^(touch|mouse)/, "").replace(/up$/, "end").replace(/down$/, "start")
        }

        function a(e) {
            return e === window || e === document || e === document.body ? c : e.getBoundingClientRect()
        }
        var u = e("events/"),
            l = ["touchstart", "touchmove", "touchend", "touchcancel", "mousedown", "mousemove", "mouseup"],
            c = {
                left: 0,
                top: 0
            };
        n.exports = function (e, n) {
            function a(e, n) {
                var t;
                return d && /^touch(end|cancel)/.test(n) ? (t = r(e.changedTouches, d.identifier || 0), t && (d = null)) : !d && /^touchstart/.test(n) ? d = t = o(e.changedTouches, c.target) : d && (t = r(e.changedTouches, d.identifier || 0)), t
            }
            n = n || {}, e = e || window;
            var c = new u;
            c.target = n.target || e;
            var d = null,
                m = n.filtered,
                f = l;
            "string" == typeof n.type && (f = l.filter(function (e) {
                return 0 === e.indexOf(n.type)
            }));
            var p = f.map(function (e) {
                var r = i(e),
                    s = function (s) {
                        var i = s;
                        if (/^touch/.test(e) && (/^touchend$/.test(e) && n.preventSimulated !== !1 && s.preventDefault(), i = m ? a(s, e) : o(s.changedTouches, c.target)), i) {
                            var u = t(i, c.target);
                            c.emit(r, s, u)
                        }
                    };
                return {
                    type: e,
                    listener: s
                }
            });
            return c.enable = function () {
                return p.forEach(s(e, !0)), c
            }, c.disable = function () {
                return p.forEach(s(e, !1)), c
            }, c.enable(), c
        }
    }, {
        "events/": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/trim/index.js": [function (e, n, t) {
        function o(e) {
            return e.replace(/^\s*|\s*$/g, "")
        }
        t = n.exports = o, t.left = function (e) {
            return e.replace(/^\s*/, "")
        }, t.right = function (e) {
            return e.replace(/\s*$/, "")
        }
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-base/index.js": [function (e, n) {
        function t(e) {
            i.call(this), this.duration = e && e.duration || 0, this.delay = e && e.delay || 0, this.time = 0, this.ease = e && e.ease, this.active = !0, this.enabled = !0, this.cancelling = !1, this._started = !1
        }

        function o(e, n) {
            return "function" == typeof e.ease ? e.ease(n) : s(n)
        }
        var r = function () { },
            s = e("eases/linear"),
            i = e("events").EventEmitter,
            a = e("inherits");
        a(t, i), t.prototype.lerp = r, t.prototype.ready = r, t.prototype.cancel = function () {
            return this.cancelling = !0, this
        }, t.prototype.tick = function (e, n) {
            if (n = "function" == typeof n ? n : o, this.cancelling && this.active && (this.active = !1, this.emit("cancelling", this), this.emit("complete", this)), this.active && this.enabled) {
                {
                    this.time
                }
                this.time += e;
                var t = (this.time - this.delay) / this.duration;
                this.time - this.delay > 0 && (this._started || (this._started = !0, this.ready(), this.emit("start", this)), 0 > t ? t = 0 : t > 1 && (t = 1), t = n(this, t), this.lerp(t), this.emit("update", this)), this.time >= this.duration + this.delay && (this.active = !1, this.emit("complete", this))
            }
        }, n.exports = t
    }, {
        "eases/linear": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/linear.js",
        events: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js",
        inherits: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/inherits/inherits_browser.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/index.js": [function (e, n) {
        var t = e("./lib/object"),
            o = e("./lib/group");
        n.exports = function (e, n) {
            var r = Array.isArray(e) ? new o(e, n) : new t(e, n);
            return r
        }
    }, {
        "./lib/group": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/group.js",
        "./lib/object": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/object.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/end-target.js": [function (e, n) {
        var t = e("tween-base"),
            o = e("an-array"),
            r = e("own-enumerable-keys"),
            s = r(new t);
        n.exports = function (e, n) {
            var t = [],
                i = r(n);
            for (var a in n)
                if (i.indexOf(a) >= 0 && a in e && -1 === s.indexOf(a)) {
                    var u = e[a],
                        l = n[a];
                    "number" == typeof u && "number" == typeof l ? t.push({
                        key: a,
                        start: u,
                        end: l
                    }) : o(u) && o(l) && t.push({
                        key: a,
                        start: u.slice(),
                        end: l.slice()
                    })
                } return t
        }
    }, {
        "an-array": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/an-array/index.js",
        "own-enumerable-keys": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/own-enumerable-keys/index.js",
        "tween-base": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-base/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/group.js": [function (e, n) {
        function t(e, n) {
            s.call(this, n), this.target = e, this.end = [], this._options = n
        }
        var o = e("inherits"),
            r = e("lerp-array"),
            s = e("tween-base"),
            i = e("./end-target");
        o(t, s), t.prototype.ready = function () {
            this.end = this.target.map(function (e) {
                return i(e, this._options)
            }, this)
        }, t.prototype.lerp = function (e) {
            for (var n = 0; n < this.end.length; n++)
                for (var t = this.end[n], o = this.target[n], s = 0; s < t.length; s++) {
                    var i = t[s],
                        a = i.key;
                    o[a] = r(i.start, i.end, e, o[a])
                }
        }, n.exports = t
    }, {
        "./end-target": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/end-target.js",
        inherits: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/inherits/inherits_browser.js",
        "lerp-array": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp-array/index.js",
        "tween-base": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-base/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/object.js": [function (e, n) {
        function t(e, n) {
            s.call(this, n), this.target = e, this.endings = void 0, this._options = n
        }
        var o = e("inherits"),
            r = e("lerp-array"),
            s = e("tween-base"),
            i = e("./end-target");
        o(t, s), t.prototype.ready = function () {
            this.endings = i(this.target, this._options)
        }, t.prototype.lerp = function (e) {
            for (var n = 0; n < this.endings.length; n++) {
                var t = this.endings[n],
                    o = t.key;
                this.target[o] = r(t.start, t.end, e, this.target[o])
            }
        }, n.exports = t
    }, {
        "./end-target": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/lib/end-target.js",
        inherits: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/inherits/inherits_browser.js",
        "lerp-array": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/lerp-array/index.js",
        "tween-base": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-base/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-ticker/index.js": [function (e, n) {
        function t(e) {
            return this instanceof t ? (e = e || {}, this.stack = [], this.defaultEase = e.defaultEase || s, this.eases = e.eases || {}, void (this._applyEase = this.ease.bind(this))) : new t(e)
        }

        function o(e) {
            return "function" == typeof e.tick && "function" == typeof e.cancel
        }

        function r(e) {
            for (var n = 0; n < e.length; n++) {
                var t = e[n];
                "function" == typeof t.sync && t.sync()
            }
        }
        var s = e("eases/linear"),
            i = e("tween-objects"),
            a = e("tween-base");
        t.prototype.cancel = function () {
            for (var e = 0; e < this.stack.length; e++) {
                var n = this.stack[e];
                n.cancel(), n.tick(0)
            }
            return this.stack.length = 0, this
        }, t.prototype.clear = t.prototype.cancel, t.prototype.to = function (e, n) {
            var t = e;
            if (n && "object" == typeof n) t = i(e, n);
            else if (e || n) {
                if (!o(t)) throw new Error("must provide options or a tween object")
            } else t = new a;
            return this.push(t)
        }, t.prototype.push = function (e) {
            return this.stack.push(e), e
        }, t.prototype.tick = function (e, n) {
            n = "function" == typeof n ? n : this._applyEase, e = "number" == typeof e ? e : 1 / 60;
            for (var t = 0; t < this.stack.length; t++) this.stack[t].tick(e, n);
            for (r(this.stack), t = this.stack.length - 1; t >= 0; t--) this.stack[t].active || this.stack.splice(t, 1)
        }, t.prototype.ease = function (e, n) {
            var t = e.ease || this.defaultEase;
            return "string" == typeof t && (t = this.eases[t]), "function" != typeof t && (t = s), t(n)
        }, n.exports = t
    }, {
        "eases/linear": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/linear.js",
        "tween-base": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-base/index.js",
        "tween-objects": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-objects/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/index.js": [function (e, n) {
        function t(e) {
            return this instanceof t ? (s.call(this, o(c, e)), i.call(this), this.timeScale = 1, this._handleTick = function (e) {
                e = Math.min(30, e), e /= 1e3, e *= this.timeScale, this.emit("tick", e), this.tick(e)
            }.bind(this), void l.on("tick", this._handleTick)) : new t(e)
        }
        var o = e("xtend"),
            r = e("eases"),
            s = e("tween-ticker"),
            i = e("events").EventEmitter,
            a = e("inherits"),
            u = e("mixes"),
            l = e("./loop"),
            c = {
                eases: r
            };
        n.exports = t, a(t, s), u(t, i.prototype), t.prototype.dispose = function () {
            l.removeListener("tick", this._handleTick)
        }
    }, {
        "./loop": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/loop.js",
        eases: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/eases/index.js",
        events: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/events/events.js",
        inherits: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/inherits/inherits_browser.js",
        mixes: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/mixes/index.js",
        "tween-ticker": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tween-ticker/index.js",
        xtend: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xtend/immutable.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/tweenr/loop.js": [function (e, n) {
        var t = e("raf-loop")();
        t.setMaxListeners(1 / 0), t.start(), n.exports = t
    }, {
        "raf-loop": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/raf-loop/index.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/wrappy/wrappy.js": [function (e, n) {
        function t(e, n) {
            function o() {
                for (var n = new Array(arguments.length), t = 0; t < n.length; t++) n[t] = arguments[t];
                var o = e.apply(this, n),
                    r = n[n.length - 1];
                return "function" == typeof o && o !== r && Object.keys(r).forEach(function (e) {
                    o[e] = r[e]
                }), o
            }
            if (e && n) return t(e)(n);
            if ("function" != typeof e) throw new TypeError("need wrapper function");
            return Object.keys(e).forEach(function (n) {
                o[n] = e[n]
            }), o
        }
        n.exports = t
    }, {}],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xhr/index.js": [function (e, n) {
        "use strict";

        function t(e, n) {
            for (var t = 0; t < e.length; t++) n(e[t])
        }

        function o(e) {
            for (var n in e)
                if (e.hasOwnProperty(n)) return !1;
            return !0
        }

        function r(e, n, t) {
            var o = e;
            return c(n) ? (t = n, "string" == typeof e && (o = {
                uri: e
            })) : o = m(n, {
                uri: e
            }), o.callback = t, o
        }

        function s(e, n, t) {
            return n = r(e, n, t), i(n)
        }

        function i(e) {
            function n() {
                4 === m.readyState && i()
            }

            function t() {
                var e = void 0;
                if (e = m.response ? m.response : m.responseText || a(m), w) try {
                    e = JSON.parse(e)
                } catch (n) { }
                return e
            }

            function r(e) {
                return clearTimeout(h), e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))), e.statusCode = 0, l(e, c)
            }

            function i() {
                if (!p) {
                    var n;
                    clearTimeout(h), n = e.useXDR && void 0 === m.status ? 200 : 1223 === m.status ? 204 : m.status;
                    var o = c,
                        r = null;
                    return 0 !== n ? (o = {
                        body: t(),
                        statusCode: n,
                        method: g,
                        headers: {},
                        url: v,
                        rawRequest: m
                    }, m.getAllResponseHeaders && (o.headers = d(m.getAllResponseHeaders()))) : r = new Error("Internal XMLHttpRequest Error"), l(r, o, o.body)
                }
            }
            if ("undefined" == typeof e.callback) throw new Error("callback argument missing");
            var u = !1,
                l = function (n, t, o) {
                    u || (u = !0, e.callback(n, t, o))
                },
                c = {
                    body: void 0,
                    headers: {},
                    statusCode: 0,
                    method: g,
                    url: v,
                    rawRequest: m
                },
                m = e.xhr || null;
            m || (m = e.cors || e.useXDR ? new s.XDomainRequest : new s.XMLHttpRequest);
            var f, p, h, v = m.url = e.uri || e.url,
                g = m.method = e.method || "GET",
                x = e.body || e.data || null,
                b = m.headers = e.headers || {},
                j = !!e.sync,
                w = !1;
            if ("json" in e && e.json !== !1 && (w = !0, b.accept || b.Accept || (b.Accept = "application/json"), "GET" !== g && "HEAD" !== g && (b["content-type"] || b["Content-Type"] || (b["Content-Type"] = "application/json"), x = JSON.stringify(e.json === !0 ? x : e.json))), m.onreadystatechange = n, m.onload = i, m.onerror = r, m.onprogress = function () { }, m.onabort = function () {
                p = !0
            }, m.ontimeout = r, m.open(g, v, !j, e.username, e.password), j || (m.withCredentials = !!e.withCredentials), !j && e.timeout > 0 && (h = setTimeout(function () {
                if (!p) {
                    p = !0, m.abort("timeout");
                    var e = new Error("XMLHttpRequest timeout");
                    e.code = "ETIMEDOUT", r(e)
                }
            }, e.timeout)), m.setRequestHeader)
                for (f in b) b.hasOwnProperty(f) && m.setRequestHeader(f, b[f]);
            else if (e.headers && !o(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
            return "responseType" in e && (m.responseType = e.responseType), "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(m), m.send(x), m
        }

        function a(e) {
            if ("document" === e.responseType) return e.responseXML;
            var n = 204 === e.status && e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
            return "" !== e.responseType || n ? null : e.responseXML
        }

        function u() { }
        var l = e("global/window"),
            c = e("is-function"),
            d = e("parse-headers"),
            m = e("xtend");
        n.exports = s, s.XMLHttpRequest = l.XMLHttpRequest || u, s.XDomainRequest = "withCredentials" in new s.XMLHttpRequest ? s.XMLHttpRequest : l.XDomainRequest, t(["get", "put", "post", "patch", "head", "delete"], function (e) {
            s["delete" === e ? "del" : e] = function (n, t, o) {
                return t = r(n, t, o), t.method = e.toUpperCase(), i(t)
            }
        })
    }, {
        "global/window": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/global/window.js",
        "is-function": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/is-function/index.js",
        "parse-headers": "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/parse-headers/parse-headers.js",
        xtend: "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xtend/immutable.js"
    }],
    "/Users/bensonwong/Documents/jam3/prj-thx/node_modules/xtend/immutable.js": [function (e, n) {
        function t() {
            for (var e = {}, n = 0; n < arguments.length; n++) {
                var t = arguments[n];
                for (var r in t) o.call(t, r) && (e[r] = t[r])
            }
            return e
        }
        n.exports = t;
        var o = Object.prototype.hasOwnProperty
    }, {}]
}, {}, ["/Users/bensonwong/Documents/jam3/prj-thx/index.js"]);