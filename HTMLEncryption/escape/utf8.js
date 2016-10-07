        (function(n) {
            var g = typeof exports == "object" && exports;
            var t = typeof module == "object" && module && module.exports == g && module;
            var m = typeof global == "object" && global;
            if (m.global === m || m.window === m) {
                n = m
            }
            var l = String.fromCharCode;

            function f(x) {
                var w = [];
                var v = 0;
                var y = x.length;
                var z;
                var u;
                while (v < y) {
                    z = x.charCodeAt(v++);
                    if (z >= 55296 && z <= 56319 && v < y) {
                        u = x.charCodeAt(v++);
                        if ((u & 64512) == 56320) {
                            w.push(((z & 1023) << 10) + (u & 1023) + 65536)
                        } else {
                            w.push(z);
                            v--
                        }
                    } else {
                        w.push(z)
                    }
                }
                return w
            }

            function q(y) {
                var w = y.length;
                var v = -1;
                var x;
                var u = "";
                while (++v < w) {
                    x = y[v];
                    if (x > 65535) {
                        x -= 65536;
                        u += l(x >>> 10 & 1023 | 55296);
                        x = 56320 | x & 1023
                    }
                    u += l(x)
                }
                return u
            }

            function e(v, u) {
                return l(((v >> u) & 63) | 128)
            }

            function p(u) {
                if ((u & 4294967168) == 0) {
                    return l(u)
                }
                var v = "";
                if ((u & 4294965248) == 0) {
                    v = l(((u >> 6) & 31) | 192)
                } else {
                    if ((u & 4294901760) == 0) {
                        v = l(((u >> 12) & 15) | 224);
                        v += e(u, 6)
                    } else {
                        if ((u & 4292870144) == 0) {
                            v = l(((u >> 18) & 7) | 240);
                            v += e(u, 12);
                            v += e(u, 6)
                        }
                    }
                }
                v += l((u & 63) | 128);
                return v
            }

            function o(x) {
                var w = f(x);
                var y = w.length;
                var v = -1;
                var u;
                var z = "";
                while (++v < y) {
                    u = w[v];
                    z += p(u)
                }
                return z
            }

            function a() {
                if (j >= i) {
                    throw Error("Invalid byte index")
                }
                var u = k[j] & 255;
                j++;
                if ((u & 192) == 128) {
                    return u & 63
                }
                throw Error("Invalid continuation byte")
            }

            function c() {
                var v;
                var u;
                var y;
                var x;
                var w;
                if (j > i) {
                    throw Error("Invalid byte index")
                }
                if (j == i) {
                    return false
                }
                v = k[j] & 255;
                j++;
                if ((v & 128) == 0) {
                    return v
                }
                if ((v & 224) == 192) {
                    var u = a();
                    w = ((v & 31) << 6) | u;
                    if (w >= 128) {
                        return w
                    } else {
                        throw Error("Invalid continuation byte")
                    }
                }
                if ((v & 240) == 224) {
                    u = a();
                    y = a();
                    w = ((v & 15) << 12) | (u << 6) | y;
                    if (w >= 2048) {
                        return w
                    } else {
                        throw Error("Invalid continuation byte")
                    }
                }
                if ((v & 248) == 240) {
                    u = a();
                    y = a();
                    x = a();
                    w = ((v & 15) << 18) | (u << 12) | (y << 6) | x;
                    if (w >= 65536 && w <= 1114111) {
                        return w
                    }
                }
                throw Error("Invalid UTF-8 detected")
            }
            var k;
            var i;
            var j;

            function b(w) {
                k = f(w);
                i = k.length;
                j = 0;
                var u = [];
                var v;
                while ((v = c()) !== false) {
                    u.push(v)
                }
                return q(u)
            }
            var d = {
                version: "2.0.0",
                encode: o,
                decode: b
            };
            if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
                define(function() {
                    return d
                })
            } else {
                if (g && !g.nodeType) {
                    if (t) {
                        t.exports = d
                    } else {
                        var r = {};
                        var h = r.hasOwnProperty;
                        for (var s in d) {
                            h.call(d, s) && (g[s] = d[s])
                        }
                    }
                } else {
                    n.utf8 = d
                }
            }
        }(this));
        (function(window, document) {
            /*var textareas = document.getElementsByTagName("textarea"),
                decoded = textareas[0],
                encoded = textareas[1],
				*/
				decoded = document.getElementById('output'),
				encoded = document.getElementById('enk'),
                permalink = document.getElementById("permalink"),
                storage = (function() {
                    var uid = new Date,
                        storage, result;
                    try {
                        (storage = window.localStorage).setItem(uid, uid);
                        result = storage.getItem(uid) == uid;
                        storage.removeItem(uid);
                        return result && storage
                    } catch (e) {}
                }()),
                stringFromCharCode = String.fromCharCode;

            function encode(string) {
                return encodeURIComponent(string).replace(/['()_*]/g, function(character) {
                    return "%" + character.charCodeAt().toString(16)
                })
            }

            function hexEscape(string) {
                var length = string.length;
                var index = -1;
                var result = "";
                var hex;
                while (++index < length) {
                    hex = string.charCodeAt(index).toString(16).toUpperCase();
                    result += "\\x" + ("00" + hex).slice(-2)
                }
                return result
            }

            function update() {
                /*var shouldDecode = this == encoded;
                var value;
                if (shouldDecode) {
                    try {
                        value = utf8.decode(eval("'" + encoded.value + "'"));
                        decoded.value = value;
                        decoded.className = encoded.className = ""
                    } catch (e) {
                        decoded.value = "ERROR: invalid input";
                        decoded.className = encoded.className = "invalid"
                    }
                } else {*/
                    value = utf8.encode(decoded.value);
					var it = document.getElementById('input').value
					if (it == '' || it == null){return false}
                    else {encoded.value = document.getElementById('unesjson').value+hexEscape(value)+'"));</script>';
                    decoded.className = encoded.className = "";}
                }
             /*   value = decoded.value;
                permalink.hash = encode(value);
                storage && (storage.utf8 = value)
            }*/
            decoded.onclick = encoded.onclick = update;
            /*decoded.oninput = encoded.oninput = function() {
                decoded.onclick = encoded.onclick = null;
                update.call(this)
            };
            /*if (storage) {
                storage.utf8 && (decoded.value = storage.utf8);
                update()
            }
            window.onhashchange = function() {
                decoded.value = decodeURIComponent(location.hash.slice(1));
                update()
            };
            if (location.hash) {
                window.onhashchange()
            }*/
        }(this, document));