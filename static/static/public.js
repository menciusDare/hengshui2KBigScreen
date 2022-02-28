function BrowserDetect () { var a = navigator.userAgent.toLowerCase(), b = navigator.appName, c = null; return b === 'Microsoft Internet Explorer' || a.indexOf('trident') > -1 || a.indexOf('edge/') > -1 ? (c = 'ie', b === 'Microsoft Internet Explorer' ? (a = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(a), c += parseInt(a[1])) : a.indexOf('trident') > -1 ? c += 11 : a.indexOf('edge/') > -1 && (c = 'edge')) : a.indexOf('safari') > -1 ? c = a.indexOf('chrome') > -1 ? 'chrome' : 'safari' : a.indexOf('firefox') > -1 && (c = 'firefox'), c } function CommonAudioUtil () { var a = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384], b = function (a, b, c) { var d = 0, e = 0; for (d = 0; c > d && !(a < b[e]); d++)e++; return d }, c = function (c, d) { var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0; return e = c > 0 ? c : 8191 & -c, f = b(e, a, 15) - 6, g = e === 0 ? 32 : f >= 0 ? e >> f : e << -f, h = f + (d >> 6 & 15) - 13, i = g * (d & parseInt('077', 8)) + 48 >> 4, j = h >= 0 ? i << h & 32767 : i >> -h, (c ^ d) < 0 ? -j : j }; this.g726InitState = function () { var a = {}, b = 0; for (a.pp = new Array(2), a.zp = new Array(6), a.pk = new Array(2), a.dq = new Array(6), a.sr = new Array(2), a.yl = 34816, a.yu = 544, a.dms = 0, a.dml = 0, a.ppp = 0, b = 0; b < 2; b++)a.pp[b] = 0, a.pk[b] = 0, a.sr[b] = 32; for (b = 0; b < 6; b++)a.zp[b] = 0, a.dq[b] = 32; return a.td = 0, a }, this.predictorZero = function (a) { var b = 0, d = 0; for (d = c(a.zp[0] >> 2, a.dq[0]), b = 1; b < 6; b++)d += c(a.zp[b] >> 2, a.dq[b]); return d }, this.predictorPole = function (a) { return c(a.pp[1] >> 2, a.sr[1]) + c(a.pp[0] >> 2, a.sr[0]) }, this.stepSize = function (a) { var b = 0, c = 0, d = 0; return a.ppp >= 256 ? a.yu : (b = a.yl >> 6, c = a.yu - b, d = a.ppp >> 2, c > 0 ? b += c * d >> 6 : c < 0 && (b += c * d + 63 >> 6), b) }, this.quantize = function (c, d, e, f) { var g = 0, h = 0, i = 0, j = 0, k = 0, l = 0; return g = Math.abs(c), h = b(g >> 1, a, 15), i = g << 7 >> h & 127, j = (h << 7) + i, k = j - (d >> 2), l = b(k, e, f), c < 0 ? (f << 1) + 1 - l : l === 0 ? (f << 1) + 1 : l }, this.reconstruct = function (a, b, c) { var d = 0, e = 0, f = 0, g = 0; return d = b + (c >> 2), d < 0 ? a ? -32768 : 0 : (e = d >> 7 & 15, f = 128 + (127 & d), g = f << 7 >> 14 - e, a ? g - 32768 : g) }, this.update = function (c, d, e, f, g, h, i, j) { var k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0; if (x = i < 0 ? 1 : 0, l = 32767 & g, s = j.yl >> 15, v = j.yl >> 10 & 31, w = 32 + v << s, t = s > 9 ? 31744 : w, u = t + (t >> 1) >> 1, r = j.td === 0 ? 0 : u >= l ? 0 : 1, j.yu = d + (e - d >> 5), j.yu < 544 ? j.yu = 544 : j.yu > 5120 && (j.yu = 5120), j.yl += j.yu + (-j.yl >> 6), r === 1)j.pp[0] = 0, j.pp[1] = 0, j.zp[0] = 0, j.zp[1] = 0, j.zp[2] = 0, j.zp[3] = 0, j.zp[4] = 0, j.zp[5] = 0, n = 0; else for (p = x ^ j.pk[0], n = j.pp[1] - (j.pp[1] >> 7), i !== 0 && (q = p ? j.pp[0] : -j.pp[0], q < -8191 ? n -= 256 : n += q > 8191 ? 255 : q >> 5, x ^ j.pk[1] ? n <= -12160 ? n = -12288 : n >= 12416 ? n = 12288 : n -= 128 : n <= -12416 ? n = -12288 : n >= 12160 ? n = 12288 : n += 128), j.pp[1] = n, j.pp[0] -= j.pp[0] >> 8, i !== 0 && (p === 0 ? j.pp[0] += 192 : j.pp[0] -= 192), o = 15360 - n, j.pp[0] < -o ? j.pp[0] = -o : j.pp[0] > o && (j.pp[0] = o), k = 0; k < 6; k++)j.zp[k] -= c === 5 ? j.zp[k] >> 9 : j.zp[k] >> 8, 32767 & g && ((g ^ j.dq[k]) >= 0 ? j.zp[k] += 128 : j.zp[k] -= 128); for (k = 5; k > 0; k--)j.dq[k] = j.dq[k - 1]; return l === 0 ? j.dq[0] = g >= 0 ? 32 : 64544 : (m = b(l, a, 15), j.dq[0] = g >= 0 ? (m << 6) + (l << 6 >> m) : (m << 6) + (l << 6 >> m) - 1024), j.sr[1] = j.sr[0], h === 0 ? j.sr[0] = 32 : h > 0 ? (m = b(h, a, 15), j.sr[0] = (m << 6) + (h << 6 >> m)) : h > -32768 ? (l = -h, m = b(l, a, 15), j.sr[0] = (m << 6) + (l << 6 >> m) - 1024) : j.sr[0] = 64544, j.pk[1] = j.pk[0], j.pk[0] = x, j.td = r === 1 ? 0 : n < -11776 ? 1 : 0, j.dms += f - j.dms >> 5, j.dml += (f << 2) - j.dml >> 7, r === 1 ? j.ppp = 256 : j.ppp += d < 1536 ? 512 - j.ppp >> 4 : j.td === 1 ? 512 - j.ppp >> 4 : Math.abs((j.dms << 2) - j.dml) >= j.dml >> 3 ? 512 - j.ppp >> 4 : -j.ppp >> 4, j } } var isDebug = !1, debug = (function (a) { return a ? {log: function (a) { console.log(a) }, error: function (a) { console.error(a) }, count: function (a) { console.count(a) }, info: function (a) { console.info(a) }, trace: function (a) { console.trace(a) }} : {log: function () {}, error: function () {}, count: function () {}, info: function () {}} }(isDebug)), Script = (function () { function a () {} return a.createFromElementId = function (b) { for (var c = document.getElementById(b), d = '', e = c.firstChild; e;)e.nodeType === 3 && (d += e.textContent), e = e.nextSibling; var f = new a(); return f.type = c.type, f.source = d, f }, a.createFromSource = function (b, c) { var d = new a(); return d.type = b, d.source = c, d }, a }()), Shader = (function () { function a (a, b) { if (b.type === 'x-shader/x-fragment') this.shader = a.createShader(a.FRAGMENT_SHADER); else { if (b.type !== 'x-shader/x-vertex') return void error('Unknown shader type: ' + b.type); this.shader = a.createShader(a.VERTEX_SHADER) } return a.shaderSource(this.shader, b.source), a.compileShader(this.shader), a.getShaderParameter(this.shader, a.COMPILE_STATUS) ? void 0 : void error('An error occurred compiling the shaders: ' + a.getShaderInfoLog(this.shader)) } return a }()), Program = (function () { function a (a) { this.gl = a, this.program = this.gl.createProgram() } return a.prototype = {attach: function (a) { this.gl.attachShader(this.program, a.shader) }, link: function () { this.gl.linkProgram(this.program) }, use: function () { this.gl.useProgram(this.program) }, getAttributeLocation: function (a) { return this.gl.getAttribLocation(this.program, a) }, setMatrixUniform: function (a, b) { var c = this.gl.getUniformLocation(this.program, a); this.gl.uniformMatrix4fv(c, !1, b) }}, a }()), Texture = (function () { function a (a, b, c) { this.gl = a, this.size = b, this.texture = a.createTexture(), a.bindTexture(a.TEXTURE_2D, this.texture), this.format = c || a.LUMINANCE, a.texImage2D(a.TEXTURE_2D, 0, this.format, b.w, b.h, 0, this.format, a.UNSIGNED_BYTE, null), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE) } var b = null; return a.prototype = {fill: function (a, b) { var c = this.gl; c.bindTexture(c.TEXTURE_2D, this.texture), b ? c.texSubImage2D(c.TEXTURE_2D, 0, 0, 0, this.size.w, this.size.h, this.format, c.UNSIGNED_BYTE, a) : c.texImage2D(c.TEXTURE_2D, 0, this.format, this.size.w, this.size.h, 0, this.format, c.UNSIGNED_BYTE, a) }, bind: function (a, c, d) { var e = this.gl; b || (b = [e.TEXTURE0, e.TEXTURE1, e.TEXTURE2]), e.activeTexture(b[a]), e.bindTexture(e.TEXTURE_2D, this.texture), e.uniform1i(e.getUniformLocation(c.program, d), a) }}, a }()), base64ArrayBuffer = function (a) { for (var b = '', c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', d = new Uint8Array(a), e = d.byteLength, f = e % 3, g = e - f, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0; g > m; m += 3)l = d[m] << 16 | d[m + 1] << 8 | d[m + 2], h = (16515072 & l) >> 18, i = (258048 & l) >> 12, j = (4032 & l) >> 6, k = 63 & l, b += c[h] + c[i] + c[j] + c[k]; return f === 1 ? (l = d[g], h = (252 & l) >> 2, i = (3 & l) << 4, b += c[h] + c[i] + '==') : f === 2 && (l = d[g] << 8 | d[g + 1], h = (64512 & l) >> 10, i = (1008 & l) >> 4, j = (15 & l) << 2, b += c[h] + c[i] + c[j] + '='), b }
