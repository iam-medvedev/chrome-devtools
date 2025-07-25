// gen/front_end/third_party/chromium/client-variations/ClientVariations.js
var gen = {};
(function() {
  var f, aa = this || self;
  function h(a) {
    var b = typeof a;
    return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
  }
  function ba(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
  }
  function k(a, b) {
    a = a.split(".");
    var c = aa;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift()); ) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
  }
  function ca(a, b) {
    function c() {
    }
    c.prototype = b.prototype;
    a.Ob = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.base = function(d, e, g) {
      for (var m = Array(arguments.length - 2), n = 2; n < arguments.length; n++) m[n - 2] = arguments[n];
      return b.prototype[e].apply(d, m);
    };
  }
  ;
  function da(a, b) {
    Array.prototype.forEach.call(a, b, void 0);
  }
  function l(a, b) {
    return Array.prototype.map.call(a, b, void 0);
  }
  ;
  var ea = {}, p = null;
  function fa(a) {
    var b = a.length, c = 3 * b / 4;
    c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c), e = 0;
    ha(a, function(g) {
      d[e++] = g;
    });
    return d.subarray(0, e);
  }
  function ha(a, b) {
    function c(w) {
      for (; d < a.length; ) {
        var K = a.charAt(d++), qa = p[K];
        if (null != qa) return qa;
        if (!/^[\s\xa0]*$/.test(K)) throw Error("Unknown base64 encoding at char: " + K);
      }
      return w;
    }
    ia();
    for (var d = 0; ; ) {
      var e = c(-1), g = c(0), m = c(64), n = c(64);
      if (64 === n && -1 === e) break;
      b(e << 2 | g >> 4);
      64 != m && (b(g << 4 & 240 | m >> 2), 64 != n && b(m << 6 & 192 | n));
    }
  }
  function ia() {
    if (!p) {
      p = {};
      for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
        var d = a.concat(b[c].split(""));
        ea[c] = d;
        for (var e = 0; e < d.length; e++) {
          var g = d[e];
          void 0 === p[g] && (p[g] = e);
        }
      }
    }
  }
  ;
  function q(a, b, c, d) {
    let e = "Assertion failed", g;
    c ? (e += ": " + c, g = d) : a && (e += ": " + a, g = b);
    throw Error(e, g || []);
  }
  function r(a, b) {
    var c = [];
    a || q("", null, b, c);
    return a;
  }
  function t(a, ...b) {
    throw Error("Failure" + (a ? ": " + a : ""), b);
  }
  function u(a) {
    var b = v, c = [];
    a instanceof b || q("Expected instanceof %s but got %s.", [ja(b), ja(a)], void 0, c);
  }
  function ja(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
  }
  ;
  function x(a, b) {
    this.g = a;
    this.h = b;
  }
  function ka(a) {
    return new x((a.g >>> 1 | (a.h & 1) << 31) >>> 0, a.h >>> 1 >>> 0);
  }
  function la(a) {
    return new x(a.g << 1 >>> 0, (a.h << 1 | a.g >>> 31) >>> 0);
  }
  x.prototype.add = function(a) {
    return new x((this.g + a.g & 4294967295) >>> 0 >>> 0, ((this.h + a.h & 4294967295) >>> 0) + (4294967296 <= this.g + a.g ? 1 : 0) >>> 0);
  };
  x.prototype.sub = function(a) {
    return new x((this.g - a.g & 4294967295) >>> 0 >>> 0, ((this.h - a.h & 4294967295) >>> 0) - (0 > this.g - a.g ? 1 : 0) >>> 0);
  };
  function ma(a) {
    var b = a & 65535, c = a >>> 16;
    a = 10 * b + 65536 * (0 * b & 65535) + 65536 * (10 * c & 65535);
    for (b = 0 * c + (0 * b >>> 16) + (10 * c >>> 16); 4294967296 <= a; ) a -= 4294967296, b += 1;
    return new x(a >>> 0, b >>> 0);
  }
  x.prototype.toString = function() {
    for (var a = "", b = this; 0 != b.g || 0 != b.h; ) {
      var c = new x(0, 0);
      b = new x(b.g, b.h);
      for (var d = new x(10, 0), e = new x(1, 0); !(d.h & 2147483648); ) d = la(d), e = la(e);
      for (; 0 != e.g || 0 != e.h; ) 0 >= (d.h < b.h || d.h == b.h && d.g < b.g ? -1 : d.h == b.h && d.g == b.g ? 0 : 1) && (c = c.add(e), b = b.sub(d)), d = ka(d), e = ka(e);
      c = [c, b];
      b = c[0];
      a = c[1].g + a;
    }
    "" == a && (a = "0");
    return a;
  };
  x.prototype.clone = function() {
    return new x(this.g, this.h);
  };
  var y = 0, z = 0;
  function na(a) {
    var b = a >>> 0;
    a = Math.floor((a - b) / 4294967296) >>> 0;
    y = b;
    z = a;
  }
  function A(a) {
    var b = 0 > a;
    a = Math.abs(a);
    var c = a >>> 0;
    a = Math.floor((a - c) / 4294967296);
    a >>>= 0;
    b && (a = ~a >>> 0, c = (~c >>> 0) + 1, 4294967295 < c && (c = 0, a++, 4294967295 < a && (a = 0)));
    y = c;
    z = a;
  }
  function B(a, b) {
    return 4294967296 * b + (a >>> 0);
  }
  function oa(a, b) {
    var c = b & 2147483648;
    c && (a = ~a + 1 >>> 0, b = ~b >>> 0, 0 == a && (b = b + 1 >>> 0));
    a = B(a, b);
    return c ? -a : a;
  }
  function pa(a, b) {
    var c = -(a & 1);
    return oa((a >>> 1 | b << 31) ^ c, b >>> 1 ^ c);
  }
  function ra(a) {
    if (a.constructor === Uint8Array) return a;
    if (a.constructor === ArrayBuffer) return new Uint8Array(a);
    if (a.constructor === Array) return new Uint8Array(a);
    if (a.constructor === String) return fa(a);
    if (a instanceof Uint8Array) return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    t("Type not convertible to Uint8Array.");
    return new Uint8Array(0);
  }
  ;
  function sa(a, b, c) {
    this.h = null;
    this.g = this.j = this.o = 0;
    this.D = false;
    a && ta(this, a, b, c);
  }
  var ua = [];
  function va(a, b, c) {
    if (ua.length) {
      var d = ua.pop();
      a && ta(d, a, b, c);
      return d;
    }
    return new sa(a, b, c);
  }
  f = sa.prototype;
  f.clone = function() {
    return va(this.h, this.o, this.j - this.o);
  };
  f.clear = function() {
    this.h = null;
    this.g = this.j = this.o = 0;
    this.D = false;
  };
  function ta(a, b, c, d) {
    a.h = ra(b);
    a.o = void 0 !== c ? c : 0;
    a.j = void 0 !== d ? a.o + d : a.h.length;
    a.g = a.o;
  }
  f.reset = function() {
    this.g = this.o;
  };
  function wa(a, b) {
    a.g += b;
    r(a.g <= a.j);
  }
  function xa(a, b) {
    for (var c = 128, d = 0, e = 0, g = 0; 4 > g && 128 <= c; g++) c = a.h[a.g++], d |= (c & 127) << 7 * g;
    128 <= c && (c = a.h[a.g++], d |= (c & 127) << 28, e |= (c & 127) >> 4);
    if (128 <= c) for (g = 0; 5 > g && 128 <= c; g++) c = a.h[a.g++], e |= (c & 127) << 7 * g + 3;
    if (128 > c) return b(d >>> 0, e >>> 0);
    t("Failed to read varint, encoding is invalid.");
    a.D = true;
  }
  f.v = function() {
    var a = this.h;
    var b = a[this.g];
    var c = b & 127;
    if (128 > b) return this.g += 1, r(this.g <= this.j), c;
    b = a[this.g + 1];
    c |= (b & 127) << 7;
    if (128 > b) return this.g += 2, r(this.g <= this.j), c;
    b = a[this.g + 2];
    c |= (b & 127) << 14;
    if (128 > b) return this.g += 3, r(this.g <= this.j), c;
    b = a[this.g + 3];
    c |= (b & 127) << 21;
    if (128 > b) return this.g += 4, r(this.g <= this.j), c;
    b = a[this.g + 4];
    c |= (b & 15) << 28;
    if (128 > b) return this.g += 5, r(this.g <= this.j), c >>> 0;
    this.g += 5;
    128 <= a[this.g++] && 128 <= a[this.g++] && 128 <= a[this.g++] && 128 <= a[this.g++] && 128 <= a[this.g++] && r(false);
    r(this.g <= this.j);
    return c;
  };
  f.fa = function() {
    return ~~this.v();
  };
  f.qa = function() {
    var a = this.v();
    return a >>> 1 ^ -(a & 1);
  };
  f.pa = function() {
    return xa(this, B);
  };
  f.ga = function() {
    return xa(this, oa);
  };
  f.ra = function() {
    return xa(this, pa);
  };
  f.u = function() {
    var a = this.h[this.g], b = this.h[this.g + 1], c = this.h[this.g + 2], d = this.h[this.g + 3];
    this.g += 4;
    r(this.g <= this.j);
    return (a << 0 | b << 8 | c << 16 | d << 24) >>> 0;
  };
  f.R = function() {
    var a = this.u(), b = this.u();
    return B(a, b);
  };
  f.G = function() {
    var a = this.h[this.g], b = this.h[this.g + 1], c = this.h[this.g + 2], d = this.h[this.g + 3];
    this.g += 4;
    r(this.g <= this.j);
    return a << 0 | b << 8 | c << 16 | d << 24;
  };
  f.P = function() {
    var a = this.u(), b = this.u();
    return oa(a, b);
  };
  f.O = function() {
    var a = this.u(), b = 2 * (a >> 31) + 1, c = a >>> 23 & 255;
    a &= 8388607;
    return 255 == c ? a ? NaN : Infinity * b : 0 == c ? b * Math.pow(2, -149) * a : b * Math.pow(2, c - 150) * (a + Math.pow(2, 23));
  };
  f.N = function() {
    var a = this.u(), b = this.u(), c = 2 * (b >> 31) + 1, d = b >>> 20 & 2047;
    a = 4294967296 * (b & 1048575) + a;
    return 2047 == d ? a ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -1074) * a : c * Math.pow(2, d - 1075) * (a + 4503599627370496);
  };
  f.ba = function() {
    return !!this.h[this.g++];
  };
  f.da = function() {
    return this.fa();
  };
  f.ha = function(a) {
    var b = this.h, c = this.g, d = c + a, e = [];
    for (a = ""; c < d; ) {
      var g = b[c++];
      if (128 > g) e.push(g);
      else if (192 > g) continue;
      else if (224 > g) {
        var m = b[c++];
        e.push((g & 31) << 6 | m & 63);
      } else if (240 > g) {
        m = b[c++];
        var n = b[c++];
        e.push((g & 15) << 12 | (m & 63) << 6 | n & 63);
      } else if (248 > g) {
        m = b[c++];
        n = b[c++];
        var w = b[c++];
        g = (g & 7) << 18 | (m & 63) << 12 | (n & 63) << 6 | w & 63;
        g -= 65536;
        e.push((g >> 10 & 1023) + 55296, (g & 1023) + 56320);
      }
      8192 <= e.length && (a += String.fromCharCode.apply(null, e), e.length = 0);
    }
    if (8192 >= e.length) e = String.fromCharCode.apply(null, e);
    else {
      b = "";
      for (d = 0; d < e.length; d += 8192) b += String.fromCharCode.apply(null, Array.prototype.slice.call(e, d, d + 8192));
      e = b;
    }
    this.g = c;
    return a + e;
  };
  f.ca = function(a) {
    if (0 > a || this.g + a > this.h.length) return this.D = true, t("Invalid byte length!"), new Uint8Array(0);
    var b = this.h.subarray(this.g, this.g + a);
    this.g += a;
    r(this.g <= this.j);
    return b;
  };
  function ya() {
    this.g = [];
  }
  f = ya.prototype;
  f.length = function() {
    return this.g.length;
  };
  f.end = function() {
    var a = this.g;
    this.g = [];
    return a;
  };
  function za(a) {
    var b = y, c = z;
    r(b == Math.floor(b));
    r(c == Math.floor(c));
    r(0 <= b && 4294967296 > b);
    for (r(0 <= c && 4294967296 > c); 0 < c || 127 < b; ) a.g.push(b & 127 | 128), b = (b >>> 7 | c << 25) >>> 0, c >>>= 7;
    a.g.push(b);
  }
  function Aa(a, b, c) {
    r(b == Math.floor(b));
    r(c == Math.floor(c));
    r(0 <= b && 4294967296 > b);
    r(0 <= c && 4294967296 > c);
    a.A(b);
    a.A(c);
  }
  function C(a, b) {
    r(b == Math.floor(b));
    for (r(0 <= b && 4294967296 > b); 127 < b; ) a.g.push(b & 127 | 128), b >>>= 7;
    a.g.push(b);
  }
  function D(a, b) {
    r(b == Math.floor(b));
    r(-2147483648 <= b && 2147483648 > b);
    if (0 <= b) C(a, b);
    else {
      for (var c = 0; 9 > c; c++) a.g.push(b & 127 | 128), b >>= 7;
      a.g.push(1);
    }
  }
  function Ba(a, b) {
    r(b == Math.floor(b));
    r(0 <= b && 18446744073709552e3 > b);
    A(b);
    za(a);
  }
  function Ca(a, b) {
    r(b == Math.floor(b));
    r(-9223372036854776e3 <= b && 9223372036854776e3 > b);
    A(b);
    za(a);
  }
  function Da(a, b) {
    r(b == Math.floor(b));
    r(-2147483648 <= b && 2147483648 > b);
    C(a, (b << 1 ^ b >> 31) >>> 0);
  }
  function Ea(a, b) {
    r(b == Math.floor(b));
    r(-9223372036854776e3 <= b && 9223372036854776e3 > b);
    var c = b;
    b = 0 > c;
    c = 2 * Math.abs(c);
    na(c);
    c = y;
    var d = z;
    b && (0 == c ? 0 == d ? d = c = 4294967295 : (d--, c = 4294967295) : c--);
    y = c;
    z = d;
    za(a);
  }
  f.A = function(a) {
    r(a == Math.floor(a));
    r(0 <= a && 4294967296 > a);
    this.g.push(a >>> 0 & 255);
    this.g.push(a >>> 8 & 255);
    this.g.push(a >>> 16 & 255);
    this.g.push(a >>> 24 & 255);
  };
  f.W = function(a) {
    r(a == Math.floor(a));
    r(0 <= a && 18446744073709552e3 > a);
    na(a);
    this.A(y);
    this.A(z);
  };
  f.T = function(a) {
    r(a == Math.floor(a));
    r(-2147483648 <= a && 2147483648 > a);
    this.g.push(a >>> 0 & 255);
    this.g.push(a >>> 8 & 255);
    this.g.push(a >>> 16 & 255);
    this.g.push(a >>> 24 & 255);
  };
  f.U = function(a) {
    r(a == Math.floor(a));
    r(-9223372036854776e3 <= a && 9223372036854776e3 > a);
    A(a);
    Aa(this, y, z);
  };
  f.J = function(a) {
    r(Infinity === a || -Infinity === a || isNaN(a) || -34028234663852886e22 <= a && 34028234663852886e22 >= a);
    var b = a;
    b = (a = 0 > b ? 1 : 0) ? -b : b;
    if (0 === b) 0 < 1 / b ? y = z = 0 : (z = 0, y = 2147483648);
    else if (isNaN(b)) z = 0, y = 2147483647;
    else if (34028234663852886e22 < b) z = 0, y = (a << 31 | 2139095040) >>> 0;
    else if (11754943508222875e-54 > b) b = Math.round(b / Math.pow(2, -149)), z = 0, y = (a << 31 | b) >>> 0;
    else {
      var c = Math.floor(Math.log(b) / Math.LN2);
      b *= Math.pow(2, -c);
      b = Math.round(8388608 * b);
      16777216 <= b && ++c;
      z = 0;
      y = (a << 31 | c + 127 << 23 | b & 8388607) >>> 0;
    }
    this.A(y);
  };
  f.I = function(a) {
    r(Infinity === a || -Infinity === a || isNaN(a) || -17976931348623157e292 <= a && 17976931348623157e292 >= a);
    var b = a;
    b = (a = 0 > b ? 1 : 0) ? -b : b;
    if (0 === b) z = 0 < 1 / b ? 0 : 2147483648, y = 0;
    else if (isNaN(b)) z = 2147483647, y = 4294967295;
    else if (17976931348623157e292 < b) z = (a << 31 | 2146435072) >>> 0, y = 0;
    else if (22250738585072014e-324 > b) b /= Math.pow(2, -1074), z = (a << 31 | b / 4294967296) >>> 0, y = b >>> 0;
    else {
      var c = b, d = 0;
      if (2 <= c) for (; 2 <= c && 1023 > d; ) d++, c /= 2;
      else for (; 1 > c && -1022 < d; ) c *= 2, d--;
      b *= Math.pow(2, -d);
      z = (a << 31 | d + 1023 << 20 | 1048576 * b & 1048575) >>> 0;
      y = 4503599627370496 * b >>> 0;
    }
    this.A(y);
    this.A(z);
  };
  f.H = function(a) {
    r("boolean" === typeof a || "number" === typeof a);
    this.g.push(a ? 1 : 0);
  };
  f.S = function(a) {
    r(a == Math.floor(a));
    r(-2147483648 <= a && 2147483648 > a);
    D(this, a);
  };
  f.ja = function(a) {
    this.g.push.apply(this.g, a);
  };
  f.V = function(a) {
    var b = this.g.length, c = [];
    "string" !== typeof a && q("Expected string but got %s: %s.", [h(a), a], void 0, c);
    for (c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      if (128 > d) this.g.push(d);
      else if (2048 > d) this.g.push(d >> 6 | 192), this.g.push(d & 63 | 128);
      else if (65536 > d) if (55296 <= d && 56319 >= d && c + 1 < a.length) {
        var e = a.charCodeAt(c + 1);
        56320 <= e && 57343 >= e && (d = 1024 * (d - 55296) + e - 56320 + 65536, this.g.push(d >> 18 | 240), this.g.push(d >> 12 & 63 | 128), this.g.push(d >> 6 & 63 | 128), this.g.push(d & 63 | 128), c++);
      } else this.g.push(d >> 12 | 224), this.g.push(d >> 6 & 63 | 128), this.g.push(d & 63 | 128);
    }
    return this.g.length - b;
  };
  function E(a) {
    this.g = va(a, void 0, void 0);
    this.D = this.g.g;
    this.h = this.j = -1;
    this.o = false;
  }
  E.prototype.Ca = function() {
    return this.j;
  };
  E.prototype.getFieldNumber = E.prototype.Ca;
  E.prototype.Z = function() {
    return 2 == this.h;
  };
  E.prototype.isDelimited = E.prototype.Z;
  E.prototype.aa = function() {
    return 4 == this.h;
  };
  E.prototype.isEndGroup = E.prototype.aa;
  E.prototype.reset = function() {
    this.g.reset();
    this.h = this.j = -1;
  };
  E.prototype.M = function() {
    var a = this.g;
    if (a.g == a.j) return false;
    (a = this.o) || (a = this.g, a = a.D || 0 > a.g || a.g > a.j);
    if (a) return t("Decoder hit an error"), false;
    this.D = this.g.g;
    var b = this.g.v();
    a = b >>> 3;
    b &= 7;
    if (0 != b && 5 != b && 1 != b && 2 != b && 3 != b && 4 != b) return t("Invalid wire type: %s (at position %s)", b, this.D), this.o = true, false;
    this.j = a;
    this.h = b;
    return true;
  };
  E.prototype.nextField = E.prototype.M;
  function F(a) {
    switch (a.h) {
      case 0:
        if (0 != a.h) t("Invalid wire type for skipVarintField"), F(a);
        else {
          for (a = a.g; a.h[a.g] & 128; ) a.g++;
          a.g++;
        }
        break;
      case 1:
        1 != a.h ? (t("Invalid wire type for skipFixed64Field"), F(a)) : wa(a.g, 8);
        break;
      case 2:
        if (2 != a.h) t("Invalid wire type for skipDelimitedField"), F(a);
        else {
          var b = a.g.v();
          wa(a.g, b);
        }
        break;
      case 5:
        5 != a.h ? (t("Invalid wire type for skipFixed32Field"), F(a)) : wa(a.g, 4);
        break;
      case 3:
        b = a.j;
        do {
          if (!a.M()) {
            t("Unmatched start-group tag: stream EOF");
            a.o = true;
            break;
          }
          if (4 == a.h) {
            a.j != b && (t("Unmatched end-group tag"), a.o = true);
            break;
          }
          F(a);
        } while (1);
        break;
      default:
        t("Invalid wire encoding for field.");
    }
  }
  E.prototype.Ja = function(a, b) {
    r(2 == this.h);
    var c = this.g.j, d = this.g.v();
    d = this.g.g + d;
    this.g.j = d;
    b(a, this);
    this.g.g = d;
    this.g.j = c;
  };
  E.prototype.readMessage = E.prototype.Ja;
  E.prototype.Ia = function(a, b, c) {
    r(3 == this.h);
    r(this.j == a);
    c(b, this);
    this.o || 4 == this.h || (t("Group submessage did not end with an END_GROUP tag"), this.o = true);
  };
  E.prototype.readGroup = E.prototype.Ia;
  E.prototype.G = function() {
    r(0 == this.h);
    return this.g.fa();
  };
  E.prototype.readInt32 = E.prototype.G;
  E.prototype.P = function() {
    r(0 == this.h);
    return this.g.ga();
  };
  E.prototype.readInt64 = E.prototype.P;
  E.prototype.u = function() {
    r(0 == this.h);
    return this.g.v();
  };
  E.prototype.readUint32 = E.prototype.u;
  E.prototype.R = function() {
    r(0 == this.h);
    return this.g.pa();
  };
  E.prototype.readUint64 = E.prototype.R;
  E.prototype.Za = function() {
    r(0 == this.h);
    return this.g.qa();
  };
  E.prototype.readSint32 = E.prototype.Za;
  E.prototype.$a = function() {
    r(0 == this.h);
    return this.g.ra();
  };
  E.prototype.readSint64 = E.prototype.$a;
  E.prototype.Ga = function() {
    r(5 == this.h);
    return this.g.u();
  };
  E.prototype.readFixed32 = E.prototype.Ga;
  E.prototype.Ha = function() {
    r(1 == this.h);
    return this.g.R();
  };
  E.prototype.readFixed64 = E.prototype.Ha;
  E.prototype.Xa = function() {
    r(5 == this.h);
    return this.g.G();
  };
  E.prototype.readSfixed32 = E.prototype.Xa;
  E.prototype.Ya = function() {
    r(1 == this.h);
    return this.g.P();
  };
  E.prototype.readSfixed64 = E.prototype.Ya;
  E.prototype.O = function() {
    r(5 == this.h);
    return this.g.O();
  };
  E.prototype.readFloat = E.prototype.O;
  E.prototype.N = function() {
    r(1 == this.h);
    return this.g.N();
  };
  E.prototype.readDouble = E.prototype.N;
  E.prototype.ba = function() {
    r(0 == this.h);
    return !!this.g.v();
  };
  E.prototype.readBool = E.prototype.ba;
  E.prototype.da = function() {
    r(0 == this.h);
    return this.g.ga();
  };
  E.prototype.readEnum = E.prototype.da;
  E.prototype.ha = function() {
    r(2 == this.h);
    var a = this.g.v();
    return this.g.ha(a);
  };
  E.prototype.readString = E.prototype.ha;
  E.prototype.ca = function() {
    r(2 == this.h);
    var a = this.g.v();
    return this.g.ca(a);
  };
  E.prototype.readBytes = E.prototype.ca;
  function G(a, b) {
    r(2 == a.h);
    var c = a.g.v();
    c = a.g.g + c;
    for (var d = []; a.g.g < c; ) d.push(b.call(a.g));
    return d;
  }
  E.prototype.ea = function() {
    return G(this, this.g.fa);
  };
  E.prototype.readPackedInt32 = E.prototype.ea;
  E.prototype.Qa = function() {
    return G(this, this.g.ga);
  };
  E.prototype.readPackedInt64 = E.prototype.Qa;
  E.prototype.Va = function() {
    return G(this, this.g.v);
  };
  E.prototype.readPackedUint32 = E.prototype.Va;
  E.prototype.Wa = function() {
    return G(this, this.g.pa);
  };
  E.prototype.readPackedUint64 = E.prototype.Wa;
  E.prototype.Ta = function() {
    return G(this, this.g.qa);
  };
  E.prototype.readPackedSint32 = E.prototype.Ta;
  E.prototype.Ua = function() {
    return G(this, this.g.ra);
  };
  E.prototype.readPackedSint64 = E.prototype.Ua;
  E.prototype.Na = function() {
    return G(this, this.g.u);
  };
  E.prototype.readPackedFixed32 = E.prototype.Na;
  E.prototype.Oa = function() {
    return G(this, this.g.R);
  };
  E.prototype.readPackedFixed64 = E.prototype.Oa;
  E.prototype.Ra = function() {
    return G(this, this.g.G);
  };
  E.prototype.readPackedSfixed32 = E.prototype.Ra;
  E.prototype.Sa = function() {
    return G(this, this.g.P);
  };
  E.prototype.readPackedSfixed64 = E.prototype.Sa;
  E.prototype.Pa = function() {
    return G(this, this.g.O);
  };
  E.prototype.readPackedFloat = E.prototype.Pa;
  E.prototype.La = function() {
    return G(this, this.g.N);
  };
  E.prototype.readPackedDouble = E.prototype.La;
  E.prototype.Ka = function() {
    return G(this, this.g.ba);
  };
  E.prototype.readPackedBool = E.prototype.Ka;
  E.prototype.Ma = function() {
    return G(this, this.g.da);
  };
  E.prototype.readPackedEnum = E.prototype.Ma;
  function H() {
    this.j = [];
    this.h = 0;
    this.g = new ya();
    this.o = [];
  }
  function I(a, b) {
    J(a, b, 2);
    b = a.g.end();
    a.j.push(b);
    a.h += b.length;
    b.push(a.h);
    return b;
  }
  function L(a, b) {
    var c = b.pop();
    c = a.h + a.g.length() - c;
    for (r(0 <= c); 127 < c; ) b.push(c & 127 | 128), c >>>= 7, a.h++;
    b.push(c);
    a.h++;
  }
  H.prototype.reset = function() {
    this.j = [];
    this.g.end();
    this.h = 0;
    this.o = [];
  };
  H.prototype.oa = function() {
    r(0 == this.o.length);
    for (var a = new Uint8Array(this.h + this.g.length()), b = this.j, c = b.length, d = 0, e = 0; e < c; e++) {
      var g = b[e];
      a.set(g, d);
      d += g.length;
    }
    b = this.g.end();
    a.set(b, d);
    d += b.length;
    r(d == a.length);
    this.j = [a];
    return a;
  };
  H.prototype.getResultBuffer = H.prototype.oa;
  function J(a, b, c) {
    r(1 <= b && b == Math.floor(b));
    C(a.g, 8 * b + c);
  }
  H.prototype.T = function(a, b) {
    null != b && (r(-2147483648 <= b && 2147483648 > b), null != b && (J(this, a, 0), D(this.g, b)));
  };
  H.prototype.writeInt32 = H.prototype.T;
  H.prototype.U = function(a, b) {
    null != b && (r(-9223372036854776e3 <= b && 9223372036854776e3 > b), null != b && (J(this, a, 0), Ca(this.g, b)));
  };
  H.prototype.writeInt64 = H.prototype.U;
  H.prototype.A = function(a, b) {
    null != b && (r(0 <= b && 4294967296 > b), null != b && (J(this, a, 0), C(this.g, b)));
  };
  H.prototype.writeUint32 = H.prototype.A;
  H.prototype.W = function(a, b) {
    null != b && (r(0 <= b && 18446744073709552e3 > b), null != b && (J(this, a, 0), Ba(this.g, b)));
  };
  H.prototype.writeUint64 = H.prototype.W;
  H.prototype.Kb = function(a, b) {
    null != b && (r(-2147483648 <= b && 2147483648 > b), null != b && (J(this, a, 0), Da(this.g, b)));
  };
  H.prototype.writeSint32 = H.prototype.Kb;
  H.prototype.Lb = function(a, b) {
    null != b && (r(-9223372036854776e3 <= b && 9223372036854776e3 > b), null != b && (J(this, a, 0), Ea(this.g, b)));
  };
  H.prototype.writeSint64 = H.prototype.Lb;
  H.prototype.ua = function(a, b) {
    null != b && (r(0 <= b && 4294967296 > b), J(this, a, 5), this.g.A(b));
  };
  H.prototype.writeFixed32 = H.prototype.ua;
  H.prototype.va = function(a, b) {
    null != b && (r(0 <= b && 18446744073709552e3 > b), J(this, a, 1), this.g.W(b));
  };
  H.prototype.writeFixed64 = H.prototype.va;
  H.prototype.wa = function(a, b) {
    null != b && (r(-2147483648 <= b && 2147483648 > b), J(this, a, 5), this.g.T(b));
  };
  H.prototype.writeSfixed32 = H.prototype.wa;
  H.prototype.xa = function(a, b) {
    null != b && (r(-9223372036854776e3 <= b && 9223372036854776e3 > b), J(this, a, 1), this.g.U(b));
  };
  H.prototype.writeSfixed64 = H.prototype.xa;
  H.prototype.J = function(a, b) {
    null != b && (J(this, a, 5), this.g.J(b));
  };
  H.prototype.writeFloat = H.prototype.J;
  H.prototype.I = function(a, b) {
    null != b && (J(this, a, 1), this.g.I(b));
  };
  H.prototype.writeDouble = H.prototype.I;
  H.prototype.H = function(a, b) {
    null != b && (r("boolean" === typeof b || "number" === typeof b), J(this, a, 0), this.g.H(b));
  };
  H.prototype.writeBool = H.prototype.H;
  H.prototype.S = function(a, b) {
    null != b && (r(-2147483648 <= b && 2147483648 > b), J(this, a, 0), D(this.g, b));
  };
  H.prototype.writeEnum = H.prototype.S;
  H.prototype.V = function(a, b) {
    null != b && (a = I(this, a), this.g.V(b), L(this, a));
  };
  H.prototype.writeString = H.prototype.V;
  H.prototype.ja = function(a, b) {
    null != b && (b = ra(b), J(this, a, 2), C(this.g, b.length), a = this.g.end(), this.j.push(a), this.j.push(b), this.h += a.length + b.length);
  };
  H.prototype.writeBytes = H.prototype.ja;
  H.prototype.cb = function(a, b, c) {
    null != b && (a = I(this, a), c(b, this), L(this, a));
  };
  H.prototype.writeMessage = H.prototype.cb;
  H.prototype.bb = function(a, b, c) {
    null != b && (J(this, a, 3), c(b, this), J(this, a, 4));
  };
  H.prototype.writeGroup = H.prototype.bb;
  H.prototype.ka = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = b[c];
      null != d && (J(this, a, 0), D(this.g, d));
    }
  };
  H.prototype.writeRepeatedInt32 = H.prototype.ka;
  H.prototype.Bb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = b[c];
      null != d && (J(this, a, 0), Ca(this.g, d));
    }
  };
  H.prototype.writeRepeatedInt64 = H.prototype.Bb;
  H.prototype.Ib = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = b[c];
      null != d && (J(this, a, 0), C(this.g, d));
    }
  };
  H.prototype.writeRepeatedUint32 = H.prototype.Ib;
  H.prototype.Jb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = b[c];
      null != d && (J(this, a, 0), Ba(this.g, d));
    }
  };
  H.prototype.writeRepeatedUint64 = H.prototype.Jb;
  H.prototype.Fb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = b[c];
      null != d && (J(this, a, 0), Da(this.g, d));
    }
  };
  H.prototype.writeRepeatedSint32 = H.prototype.Fb;
  H.prototype.Gb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = b[c];
      null != d && (J(this, a, 0), Ea(this.g, d));
    }
  };
  H.prototype.writeRepeatedSint64 = H.prototype.Gb;
  H.prototype.wb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.ua(a, b[c]);
  };
  H.prototype.writeRepeatedFixed32 = H.prototype.wb;
  H.prototype.xb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.va(a, b[c]);
  };
  H.prototype.writeRepeatedFixed64 = H.prototype.xb;
  H.prototype.yb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) {
      var d = a, e = b[c];
      if (null != e) {
        a: {
          for (var g = new x(0, 0), m = new x(0, 0), n = 0; n < e.length; n++) {
            if ("0" > e[n] || "9" < e[n]) {
              e = null;
              break a;
            }
            m.g = parseInt(e[n], 10);
            var w = ma(g.g);
            g = ma(g.h);
            g.h = g.g;
            g.g = 0;
            g = w.add(g).add(m);
          }
          e = g;
        }
        J(this, d, 1);
        Aa(this.g, e.g, e.h);
      }
    }
  };
  H.prototype.writeRepeatedFixed64String = H.prototype.yb;
  H.prototype.Db = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.wa(a, b[c]);
  };
  H.prototype.writeRepeatedSfixed32 = H.prototype.Db;
  H.prototype.Eb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.xa(a, b[c]);
  };
  H.prototype.writeRepeatedSfixed64 = H.prototype.Eb;
  H.prototype.zb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.J(a, b[c]);
  };
  H.prototype.writeRepeatedFloat = H.prototype.zb;
  H.prototype.ub = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.I(a, b[c]);
  };
  H.prototype.writeRepeatedDouble = H.prototype.ub;
  H.prototype.sb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.H(a, b[c]);
  };
  H.prototype.writeRepeatedBool = H.prototype.sb;
  H.prototype.vb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.S(a, b[c]);
  };
  H.prototype.writeRepeatedEnum = H.prototype.vb;
  H.prototype.Hb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.V(a, b[c]);
  };
  H.prototype.writeRepeatedString = H.prototype.Hb;
  H.prototype.tb = function(a, b) {
    if (null != b) for (var c = 0; c < b.length; c++) this.ja(a, b[c]);
  };
  H.prototype.writeRepeatedBytes = H.prototype.tb;
  H.prototype.Cb = function(a, b, c) {
    if (null != b) for (var d = 0; d < b.length; d++) {
      var e = I(this, a);
      c(b[d], this);
      L(this, e);
    }
  };
  H.prototype.writeRepeatedMessage = H.prototype.Cb;
  H.prototype.Ab = function(a, b, c) {
    if (null != b) for (var d = 0; d < b.length; d++) J(this, a, 3), c(b[d], this), J(this, a, 4);
  };
  H.prototype.writeRepeatedGroup = H.prototype.Ab;
  H.prototype.kb = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) D(this.g, b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedInt32 = H.prototype.kb;
  H.prototype.lb = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) Ca(this.g, b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedInt64 = H.prototype.lb;
  H.prototype.qb = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) C(this.g, b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedUint32 = H.prototype.qb;
  H.prototype.rb = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) Ba(this.g, b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedUint64 = H.prototype.rb;
  H.prototype.ob = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) Da(this.g, b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedSint32 = H.prototype.ob;
  H.prototype.pb = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) Ea(this.g, b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedSint64 = H.prototype.pb;
  H.prototype.hb = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, 4 * b.length), a = 0; a < b.length; a++) this.g.A(b[a]);
  };
  H.prototype.writePackedFixed32 = H.prototype.hb;
  H.prototype.ib = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, 8 * b.length), a = 0; a < b.length; a++) this.g.W(b[a]);
  };
  H.prototype.writePackedFixed64 = H.prototype.ib;
  H.prototype.mb = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, 4 * b.length), a = 0; a < b.length; a++) this.g.T(b[a]);
  };
  H.prototype.writePackedSfixed32 = H.prototype.mb;
  H.prototype.nb = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, 8 * b.length), a = 0; a < b.length; a++) this.g.U(b[a]);
  };
  H.prototype.writePackedSfixed64 = H.prototype.nb;
  H.prototype.jb = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, 4 * b.length), a = 0; a < b.length; a++) this.g.J(b[a]);
  };
  H.prototype.writePackedFloat = H.prototype.jb;
  H.prototype.fb = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, 8 * b.length), a = 0; a < b.length; a++) this.g.I(b[a]);
  };
  H.prototype.writePackedDouble = H.prototype.fb;
  H.prototype.eb = function(a, b) {
    if (null != b && b.length) for (J(this, a, 2), C(this.g, b.length), a = 0; a < b.length; a++) this.g.H(b[a]);
  };
  H.prototype.writePackedBool = H.prototype.eb;
  H.prototype.gb = function(a, b) {
    if (null != b && b.length) {
      a = I(this, a);
      for (var c = 0; c < b.length; c++) this.g.S(b[c]);
      L(this, a);
    }
  };
  H.prototype.writePackedEnum = H.prototype.gb;
  function M(a, b) {
    this.j = a;
    this.h = b;
    this.g = {};
    this.arrClean = true;
    if (0 < this.j.length) {
      for (a = 0; a < this.j.length; a++) {
        b = this.j[a];
        var c = b[0];
        this.g[c.toString()] = new Fa(c, b[1]);
      }
      this.arrClean = true;
    }
  }
  k("jspb.Map", M);
  M.prototype.l = function() {
    if (this.arrClean) {
      if (this.h) {
        var a = this.g, b;
        for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) {
          var c = a[b].g;
          c && c.l();
        }
      }
    } else {
      this.j.length = 0;
      a = N(this);
      a.sort();
      for (b = 0; b < a.length; b++) {
        var d = this.g[a[b]];
        (c = d.g) && c.l();
        this.j.push([d.key, d.value]);
      }
      this.arrClean = true;
    }
    return this.j;
  };
  M.prototype.toArray = M.prototype.l;
  M.prototype.ta = function(a, b) {
    for (var c = this.l(), d = [], e = 0; e < c.length; e++) {
      var g = this.g[c[e][0].toString()];
      O(this, g);
      var m = g.g;
      m ? (r(b), d.push([g.key, b(a, m)])) : d.push([g.key, g.value]);
    }
    return d;
  };
  M.prototype.toObject = M.prototype.ta;
  M.fromObject = function(a, b, c) {
    b = new M([], b);
    for (var d = 0; d < a.length; d++) {
      var e = a[d][0], g = c(a[d][1]);
      b.set(e, g);
    }
    return b;
  };
  function P(a) {
    this.h = 0;
    this.g = a;
  }
  P.prototype.next = function() {
    return this.h < this.g.length ? { done: false, value: this.g[this.h++] } : { done: true, value: void 0 };
  };
  "undefined" != typeof Symbol && (P.prototype[Symbol.iterator] = function() {
    return this;
  });
  M.prototype.Ea = function() {
    return N(this).length;
  };
  M.prototype.getLength = M.prototype.Ea;
  M.prototype.clear = function() {
    this.g = {};
    this.arrClean = false;
  };
  M.prototype.clear = M.prototype.clear;
  M.prototype.Aa = function(a) {
    a = a.toString();
    var b = this.g.hasOwnProperty(a);
    delete this.g[a];
    this.arrClean = false;
    return b;
  };
  M.prototype.del = M.prototype.Aa;
  M.prototype.Ba = function() {
    var a = [], b = N(this);
    b.sort();
    for (var c = 0; c < b.length; c++) {
      var d = this.g[b[c]];
      a.push([d.key, d.value]);
    }
    return a;
  };
  M.prototype.getEntryList = M.prototype.Ba;
  M.prototype.entries = function() {
    var a = [], b = N(this);
    b.sort();
    for (var c = 0; c < b.length; c++) {
      var d = this.g[b[c]];
      a.push([d.key, O(this, d)]);
    }
    return new P(a);
  };
  M.prototype.entries = M.prototype.entries;
  M.prototype.keys = function() {
    var a = [], b = N(this);
    b.sort();
    for (var c = 0; c < b.length; c++) a.push(this.g[b[c]].key);
    return new P(a);
  };
  M.prototype.keys = M.prototype.keys;
  M.prototype.values = function() {
    var a = [], b = N(this);
    b.sort();
    for (var c = 0; c < b.length; c++) a.push(O(this, this.g[b[c]]));
    return new P(a);
  };
  M.prototype.values = M.prototype.values;
  M.prototype.forEach = function(a, b) {
    var c = N(this);
    c.sort();
    for (var d = 0; d < c.length; d++) {
      var e = this.g[c[d]];
      a.call(b, O(this, e), e.key, this);
    }
  };
  M.prototype.forEach = M.prototype.forEach;
  M.prototype.set = function(a, b) {
    var c = new Fa(a);
    this.h ? (c.g = b, c.value = b.l()) : c.value = b;
    this.g[a.toString()] = c;
    this.arrClean = false;
    return this;
  };
  M.prototype.set = M.prototype.set;
  function O(a, b) {
    return a.h ? (b.g || (b.g = new a.h(b.value)), b.g) : b.value;
  }
  M.prototype.get = function(a) {
    if (a = this.g[a.toString()]) return O(this, a);
  };
  M.prototype.get = M.prototype.get;
  M.prototype.has = function(a) {
    return a.toString() in this.g;
  };
  M.prototype.has = M.prototype.has;
  M.prototype.sa = function(a, b, c, d, e) {
    var g = N(this);
    g.sort();
    for (var m = 0; m < g.length; m++) {
      var n = this.g[g[m]];
      b.o.push(I(b, a));
      c.call(b, 1, n.key);
      this.h ? d.call(b, 2, O(this, n), e) : d.call(b, 2, n.value);
      n = b;
      r(0 <= n.o.length);
      L(n, n.o.pop());
    }
  };
  M.prototype.serializeBinary = M.prototype.sa;
  M.deserializeBinary = function(a, b, c, d, e, g, m) {
    for (; b.M() && !b.aa(); ) {
      var n = b.j;
      1 == n ? g = c.call(b) : 2 == n && (a.h ? (r(e), m || (m = new a.h()), d.call(b, m, e)) : m = d.call(b));
    }
    r(void 0 != g);
    r(void 0 != m);
    a.set(g, m);
  };
  function N(a) {
    a = a.g;
    var b = [], c;
    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
    return b;
  }
  function Fa(a, b) {
    this.key = a;
    this.value = b;
    this.g = void 0;
  }
  ;
  function Q(a, b, c, d, e) {
    this.K = a;
    this.na = b;
    this.ctor = c;
    this.ia = d;
    this.L = e;
  }
  k("jspb.ExtensionFieldInfo", Q);
  k("jspb.ExtensionFieldBinaryInfo", function(a, b, c, d, e, g) {
    this.ma = a;
    this.X = b;
    this.Y = c;
    this.la = d;
    this.ya = e;
    this.Fa = g;
  });
  Q.prototype.C = function() {
    return !!this.ctor;
  };
  Q.prototype.isMessageType = Q.prototype.C;
  function v() {
  }
  k("jspb.Message", v);
  v.GENERATE_TO_OBJECT = true;
  v.GENERATE_FROM_OBJECT = true;
  var R = "function" == typeof Uint8Array;
  v.prototype.Da = function() {
    return this.h;
  };
  v.prototype.getJsPbMessageId = v.prototype.Da;
  function Ga(a, b, c, d, e, g) {
    a.i = null;
    b || (b = c ? [c] : []);
    a.h = c ? String(c) : void 0;
    a.B = 0 === c ? -1 : 0;
    a.s = b;
    a: {
      c = a.s.length;
      b = -1;
      if (c && (b = c - 1, c = a.s[b], !(null === c || "object" != typeof c || Array.isArray(c) || R && c instanceof Uint8Array))) {
        a.F = b - a.B;
        a.m = c;
        break a;
      }
      -1 < d ? (a.F = Math.max(d, b + 1 - a.B), a.m = null) : a.F = Number.MAX_VALUE;
    }
    a.g = {};
    if (e) for (d = 0; d < e.length; d++) b = e[d], b < a.F ? (b += a.B, a.s[b] = a.s[b] || S) : (T(a), a.m[b] = a.m[b] || S);
    if (g && g.length) for (d = 0; d < g.length; d++) Ha(a, g[d]);
  }
  v.initialize = Ga;
  var S = Object.freeze ? Object.freeze([]) : [];
  function T(a) {
    var b = a.F + a.B;
    a.s[b] || (a.m = a.s[b] = {});
  }
  function Ia(a, b, c) {
    for (var d = [], e = 0; e < a.length; e++) d[e] = b.call(a[e], c, a[e]);
    return d;
  }
  v.toObjectList = Ia;
  v.toObjectExtension = function(a, b, c, d, e) {
    for (var g in c) {
      var m = c[g], n = d.call(a, m);
      if (null != n) {
        for (var w in m.na) if (m.na.hasOwnProperty(w)) break;
        b[w] = m.ia ? m.L ? Ia(n, m.ia, e) : m.ia(e, n) : n;
      }
    }
  };
  v.serializeBinaryExtensions = function(a, b, c, d) {
    for (var e in c) {
      var g = c[e], m = g.ma;
      if (!g.Y) throw Error("Message extension present that was generated without binary serialization support");
      var n = d.call(a, m);
      if (null != n) if (m.C()) if (g.la) g.Y.call(b, m.K, n, g.la);
      else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
      else g.Y.call(b, m.K, n);
    }
  };
  v.readBinaryExtension = function(a, b, c, d, e) {
    var g = c[b.j];
    if (g) {
      c = g.ma;
      if (!g.X) throw Error("Deserializing extension whose generated code does not support binary format");
      if (c.C()) {
        var m = new c.ctor();
        g.X.call(b, m, g.ya);
      } else m = g.X.call(b);
      c.L && !g.Fa ? (b = d.call(a, c)) ? b.push(m) : e.call(a, c, [m]) : e.call(a, c, m);
    } else F(b);
  };
  function U(a, b) {
    if (b < a.F) {
      b += a.B;
      var c = a.s[b];
      return c === S ? a.s[b] = [] : c;
    }
    if (a.m) return c = a.m[b], c === S ? a.m[b] = [] : c;
  }
  v.getField = U;
  v.getRepeatedField = function(a, b) {
    return U(a, b);
  };
  function Ja(a, b) {
    a = U(a, b);
    return null == a ? a : +a;
  }
  v.getOptionalFloatingPointField = Ja;
  function Ka(a, b) {
    a = U(a, b);
    return null == a ? a : !!a;
  }
  v.getBooleanField = Ka;
  v.getRepeatedFloatingPointField = function(a, b) {
    var c = U(a, b);
    a.g || (a.g = {});
    if (!a.g[b]) {
      for (var d = 0; d < c.length; d++) c[d] = +c[d];
      a.g[b] = true;
    }
    return c;
  };
  v.getRepeatedBooleanField = function(a, b) {
    var c = U(a, b);
    a.g || (a.g = {});
    if (!a.g[b]) {
      for (var d = 0; d < c.length; d++) c[d] = !!c[d];
      a.g[b] = true;
    }
    return c;
  };
  function La(a) {
    if (null == a || "string" === typeof a) return a;
    if (R && a instanceof Uint8Array) {
      var b;
      void 0 === b && (b = 0);
      ia();
      b = ea[b];
      const m = Array(Math.floor(a.length / 3)), n = b[64] || "";
      let w = 0, K = 0;
      for (; w < a.length - 2; w += 3) {
        var c = a[w], d = a[w + 1], e = a[w + 2], g = b[c >> 2];
        c = b[(c & 3) << 4 | d >> 4];
        d = b[(d & 15) << 2 | e >> 6];
        e = b[e & 63];
        m[K++] = g + c + d + e;
      }
      g = 0;
      e = n;
      switch (a.length - w) {
        case 2:
          g = a[w + 1], e = b[(g & 15) << 2] || n;
        case 1:
          a = a[w], m[K] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + e + n;
      }
      return m.join("");
    }
    t("Cannot coerce to b64 string: " + h(a));
    return null;
  }
  v.bytesAsB64 = La;
  function Ma(a) {
    if (null == a || a instanceof Uint8Array) return a;
    if ("string" === typeof a) return fa(a);
    t("Cannot coerce to Uint8Array: " + h(a));
    return null;
  }
  v.bytesAsU8 = Ma;
  v.bytesListAsB64 = function(a) {
    Na(a);
    return a.length && "string" !== typeof a[0] ? l(a, La) : a;
  };
  v.bytesListAsU8 = function(a) {
    Na(a);
    return !a.length || a[0] instanceof Uint8Array ? a : l(a, Ma);
  };
  function Na(a) {
    if (a && 1 < a.length) {
      var b = h(a[0]);
      da(a, function(c) {
        h(c) != b && t("Inconsistent type in JSPB repeated field array. Got " + h(c) + " expected " + b);
      });
    }
  }
  function Oa(a, b, c) {
    a = U(a, b);
    return null == a ? c : a;
  }
  v.getFieldWithDefault = Oa;
  v.getBooleanFieldWithDefault = function(a, b, c) {
    a = Ka(a, b);
    return null == a ? c : a;
  };
  v.getFloatingPointFieldWithDefault = function(a, b, c) {
    a = Ja(a, b);
    return null == a ? c : a;
  };
  v.getFieldProto3 = Oa;
  v.getMapField = function(a, b, c, d) {
    a.i || (a.i = {});
    if (b in a.i) return a.i[b];
    var e = U(a, b);
    if (!e) {
      if (c) return;
      e = [];
      V(a, b, e);
    }
    return a.i[b] = new M(e, d);
  };
  function V(a, b, c) {
    u(a);
    b < a.F ? a.s[b + a.B] = c : (T(a), a.m[b] = c);
    return a;
  }
  v.setField = V;
  v.setProto3IntField = function(a, b, c) {
    return W(a, b, c, 0);
  };
  v.setProto3FloatField = function(a, b, c) {
    return W(a, b, c, 0);
  };
  v.setProto3BooleanField = function(a, b, c) {
    return W(a, b, c, false);
  };
  v.setProto3StringField = function(a, b, c) {
    return W(a, b, c, "");
  };
  v.setProto3BytesField = function(a, b, c) {
    return W(a, b, c, "");
  };
  v.setProto3EnumField = function(a, b, c) {
    return W(a, b, c, 0);
  };
  v.setProto3StringIntField = function(a, b, c) {
    return W(a, b, c, "0");
  };
  function W(a, b, c, d) {
    u(a);
    c !== d ? V(a, b, c) : b < a.F ? a.s[b + a.B] = null : (T(a), delete a.m[b]);
    return a;
  }
  function Pa(a, b, c, d) {
    u(a);
    b = U(a, b);
    void 0 != d ? b.splice(d, 0, c) : b.push(c);
    return a;
  }
  v.addToRepeatedField = Pa;
  function Qa(a, b, c, d) {
    u(a);
    (c = Ha(a, c)) && c !== b && void 0 !== d && (a.i && c in a.i && (a.i[c] = void 0), V(a, c, void 0));
    return V(a, b, d);
  }
  v.setOneofField = Qa;
  function Ha(a, b) {
    for (var c, d, e = 0; e < b.length; e++) {
      var g = b[e], m = U(a, g);
      null != m && (c = g, d = m, V(a, g, void 0));
    }
    return c ? (V(a, c, d), c) : 0;
  }
  v.computeOneofCase = Ha;
  v.getWrapperField = function(a, b, c, d) {
    a.i || (a.i = {});
    if (!a.i[c]) {
      var e = U(a, c);
      if (d || e) a.i[c] = new b(e);
    }
    return a.i[c];
  };
  v.getRepeatedWrapperField = function(a, b, c) {
    Ra(a, b, c);
    b = a.i[c];
    b == S && (b = a.i[c] = []);
    return b;
  };
  function Ra(a, b, c) {
    a.i || (a.i = {});
    if (!a.i[c]) {
      for (var d = U(a, c), e = [], g = 0; g < d.length; g++) e[g] = new b(d[g]);
      a.i[c] = e;
    }
  }
  v.setWrapperField = function(a, b, c) {
    u(a);
    a.i || (a.i = {});
    var d = c ? c.l() : c;
    a.i[b] = c;
    return V(a, b, d);
  };
  v.setOneofWrapperField = function(a, b, c, d) {
    u(a);
    a.i || (a.i = {});
    var e = d ? d.l() : d;
    a.i[b] = d;
    return Qa(a, b, c, e);
  };
  v.setRepeatedWrapperField = function(a, b, c) {
    u(a);
    a.i || (a.i = {});
    c = c || [];
    for (var d = [], e = 0; e < c.length; e++) d[e] = c[e].l();
    a.i[b] = c;
    return V(a, b, d);
  };
  v.addToRepeatedWrapperField = function(a, b, c, d, e) {
    Ra(a, d, b);
    var g = a.i[b];
    g || (g = a.i[b] = []);
    c = c ? c : new d();
    a = U(a, b);
    void 0 != e ? (g.splice(e, 0, c), a.splice(e, 0, c.l())) : (g.push(c), a.push(c.l()));
    return c;
  };
  v.toMap = function(a, b, c, d) {
    for (var e = {}, g = 0; g < a.length; g++) e[b.call(a[g])] = c ? c.call(a[g], d, a[g]) : a[g];
    return e;
  };
  function Sa(a) {
    if (a.i) for (var b in a.i) {
      var c = a.i[b];
      if (Array.isArray(c)) for (var d = 0; d < c.length; d++) c[d] && c[d].l();
      else c && c.l();
    }
  }
  v.prototype.l = function() {
    Sa(this);
    return this.s;
  };
  v.prototype.toArray = v.prototype.l;
  v.prototype.toString = function() {
    Sa(this);
    return this.s.toString();
  };
  v.prototype.getExtension = function(a) {
    if (this.m) {
      this.i || (this.i = {});
      var b = a.K;
      if (a.L) {
        if (a.C()) return this.i[b] || (this.i[b] = l(this.m[b] || [], function(c) {
          return new a.ctor(c);
        })), this.i[b];
      } else if (a.C()) return !this.i[b] && this.m[b] && (this.i[b] = new a.ctor(this.m[b])), this.i[b];
      return this.m[b];
    }
  };
  v.prototype.getExtension = v.prototype.getExtension;
  v.prototype.ab = function(a, b) {
    this.i || (this.i = {});
    T(this);
    var c = a.K;
    a.L ? (b = b || [], a.C() ? (this.i[c] = b, this.m[c] = l(b, function(d) {
      return d.l();
    })) : this.m[c] = b) : a.C() ? (this.i[c] = b, this.m[c] = b ? b.l() : b) : this.m[c] = b;
    return this;
  };
  v.prototype.setExtension = v.prototype.ab;
  v.difference = function(a, b) {
    if (!(a instanceof b.constructor)) throw Error("Messages have different types.");
    var c = a.l();
    b = b.l();
    var d = [], e = 0, g = c.length > b.length ? c.length : b.length;
    a.h && (d[0] = a.h, e = 1);
    for (; e < g; e++) X(c[e], b[e]) || (d[e] = b[e]);
    return new a.constructor(d);
  };
  v.equals = function(a, b) {
    return a == b || !(!a || !b) && a instanceof b.constructor && X(a.l(), b.l());
  };
  function Ta(a, b) {
    a = a || {};
    b = b || {};
    var c = {}, d;
    for (d in a) c[d] = 0;
    for (d in b) c[d] = 0;
    for (d in c) if (!X(a[d], b[d])) return false;
    return true;
  }
  v.compareExtensions = Ta;
  function X(a, b) {
    if (a == b) return true;
    if (!ba(a) || !ba(b)) return "number" === typeof a && isNaN(a) || "number" === typeof b && isNaN(b) ? String(a) == String(b) : false;
    if (a.constructor != b.constructor) return false;
    if (R && a.constructor === Uint8Array) {
      if (a.length != b.length) return false;
      for (var c = 0; c < a.length; c++) if (a[c] != b[c]) return false;
      return true;
    }
    if (a.constructor === Array) {
      var d = void 0, e = void 0, g = Math.max(a.length, b.length);
      for (c = 0; c < g; c++) {
        var m = a[c], n = b[c];
        m && m.constructor == Object && (r(void 0 === d), r(c === a.length - 1), d = m, m = void 0);
        n && n.constructor == Object && (r(void 0 === e), r(c === b.length - 1), e = n, n = void 0);
        if (!X(m, n)) return false;
      }
      return d || e ? (d = d || {}, e = e || {}, Ta(d, e)) : true;
    }
    if (a.constructor === Object) return Ta(a, b);
    throw Error("Invalid type in JSPB array");
  }
  v.compareFields = X;
  v.prototype.za = function() {
    return Y(this);
  };
  v.prototype.cloneMessage = v.prototype.za;
  v.prototype.clone = function() {
    return Y(this);
  };
  v.prototype.clone = v.prototype.clone;
  v.clone = function(a) {
    return Y(a);
  };
  function Y(a) {
    return new a.constructor(Ua(a.l()));
  }
  v.copyInto = function(a, b) {
    u(a);
    u(b);
    r(a.constructor == b.constructor, "Copy source and target message should have the same type.");
    a = Y(a);
    for (var c = b.l(), d = a.l(), e = c.length = 0; e < d.length; e++) c[e] = d[e];
    b.i = a.i;
    b.m = a.m;
  };
  function Ua(a) {
    if (Array.isArray(a)) {
      for (var b = Array(a.length), c = 0; c < a.length; c++) {
        var d = a[c];
        null != d && (b[c] = "object" == typeof d ? Ua(r(d)) : d);
      }
      return b;
    }
    if (R && a instanceof Uint8Array) return new Uint8Array(a);
    b = {};
    for (c in a) d = a[c], null != d && (b[c] = "object" == typeof d ? Ua(r(d)) : d);
    return b;
  }
  v.registerMessageType = function(a, b) {
    b.Nb = a;
  };
  function Z(a) {
    Ga(this, a, 0, -1, Va, null);
  }
  ca(Z, v);
  var Va = [1, 3];
  Z.prototype.ta = function(a) {
    var b, c = { Qb: null == (b = U(this, 1)) ? void 0 : b, Pb: null == (b = U(this, 3)) ? void 0 : b };
    a && (c.Mb = this);
    return c;
  };
  function Wa(a) {
    a = new E(a);
    for (var b = new Z(); a.M() && !a.aa(); ) switch (a.j) {
      case 1:
        for (var c = a.Z() ? a.ea() : [a.G()], d = 0; d < c.length; d++) Pa(b, 1, c[d], void 0);
        break;
      case 3:
        c = a.Z() ? a.ea() : [a.G()];
        for (d = 0; d < c.length; d++) Pa(b, 3, c[d], void 0);
        break;
      default:
        F(a);
    }
    return b;
  }
  Z.prototype.sa = function() {
    var a = new H();
    var b = U(this, 1);
    0 < b.length && a.ka(1, b);
    b = U(this, 3);
    0 < b.length && a.ka(3, b);
    return a.oa();
  };
  k("parseClientVariations", function(a) {
    var b = "";
    try {
      b = atob(a);
    } catch (c) {
    }
    a = [];
    for (let c = 0; c < b.length; c++) a.push(b.charCodeAt(c));
    b = null;
    try {
      b = Wa(a);
    } catch (c) {
      b = Wa([]);
    }
    return { variationIds: U(b, 1), triggerVariationIds: U(b, 3) };
  });
  k("formatClientVariations", function(a, b = "Active Google-visible variation IDs on this client. These are reported for analysis, but do not directly affect any server-side behavior.", c = "Active Google-visible variation IDs on this client that trigger server-side behavior. These are reported for analysis *and* directly affect server-side behavior.") {
    const d = a.variationIds;
    a = a.triggerVariationIds;
    const e = ["message ClientVariations {"];
    d.length && e.push(`  // ${b}`, `  repeated int32 variation_id = [${d.join(", ")}];`);
    a.length && e.push(`  // ${c}`, `  repeated int32 trigger_variation_id = [${a.join(", ")}];`);
    e.push("}");
    return e.join("\n");
  });
}).call(gen);
function parseClientVariations(data) {
  return gen.parseClientVariations(data);
}
function formatClientVariations(data) {
  return gen.formatClientVariations(data);
}
export {
  formatClientVariations,
  parseClientVariations
};
//# sourceMappingURL=client-variations.js.map
