'use strict'; function G726xAudioDecoder (a) { var b = null, c = 16, d = 24, e = 32, f = 40; switch (a) { case c:b = new G726_16_AudioDecoder(); break; case d:b = new G726_24_AudioDecoder(); break; case e:b = new G726_32_AudioDecoder(); break; case f:b = new G726_40_AudioDecoder(); break; default:debug.log('wrong bits') } return b } function G726_16_AudioDecoder () { function a (a, b) { var d = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = a, r = b; switch (q = q &= 3, d = i.predictorZero(h), j = d >> 1, k = d + i.predictorPole(h), l = k >> 1, m = i.stepSize(h), n = i.reconstruct(2 & q, e[q], m), o = n < 0 ? l - (16383 & n) : l + n, p = o - l + j, h = i.update(2, m, f[q], g[q], n, o, p, h), r) { case c:return o << 2; default:return -1 } } function b () { i = new CommonAudioUtil(), h = i.g726InitState() } var c = 3, d = 65280, e = [116, 365, 365, 116], f = [-704, 14048, 14048, -704], g = [0, 3584, 3584, 0], h = {}, i = null; return b.prototype = {decode: function (b) { for (var e = new Int16Array(4 * b.length), f = 0, g = 0; f < b.length; f++) { var h = null, i = null; i = b[f] >> 6, h = a(i, c), e[g] = h & d, g++, i = b[f] >> 4, h = a(i, c), e[g] = h & d, g++, i = b[f] >> 2, h = a(i, c), e[g] = h & d, g++, i = b[f], h = a(i, c), e[g] = h & d, g++ } return e }}, new b() } function G726_24_AudioDecoder () { function a (a, b) { var d = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = a, r = b; switch (q &= 7, d = i.predictorZero(h), j = d >> 1, k = d + i.predictorPole(h), l = k >> 1, m = i.stepSize(h), n = i.reconstruct(4 & q, e[q], m), o = n < 0 ? l - (16383 & n) : l + n, p = o - l + j, h = i.update(3, m, f[q], g[q], n, o, p, h), r) { case c:return o << 2; default:return -1 } } function b () { i = new CommonAudioUtil(), h = i.g726InitState() } var c = 3, d = 65280, e = [-2048, 135, 273, 373, 373, 273, 135, -2048], f = [-128, 960, 4384, 18624, 18624, 4384, 960, -128], g = [0, 512, 1024, 3584, 3584, 1024, 512, 0], h = {}, i = null; return b.prototype = {decode: function (b) { for (var e = new Int16Array(8 * b.length / 3), f = 0, g = 0; f < b.length - 3; f += 3) { var h = null, i = null; i = b[f] >> 5, h = a(i, c), e[g] = h & d, g++, i = b[f] >> 2, h = a(i, c), e[g] = h & d, g++, i = b[f] << 1 | b[f + 1] >> 7, h = a(i, c), e[g] = h & d, g++, i = b[f + 1] >> 4, h = a(i, c), e[g] = h & d, g++, i = b[f + 1] >> 1, h = a(i, c), e[g] = h & d, g++, i = b[f + 1] << 2 | b[f + 2] >> 6, h = a(i, c), e[g] = h & d, g++, i = b[f + 2] >> 3, h = a(i, c), e[g] = h & d, g++, i = b[f + 2] >> 0, h = a(i, c), e[g] = h & d, g++ } return e }}, new b() } function G726_32_AudioDecoder () { function a (a, b) { var d = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = a, s = b; switch (r &= 15, d = i.predictorZero(h), j = d >> 1, k = d + i.predictorPole(h), l = k >> 1, m = i.stepSize(h), n = i.reconstruct(8 & r, e[r], m), o = n < 0 ? l - (16383 & n) : l + n, p = o - l + j, h = i.update(4, m, f[r] << 5, g[r], n, o, p, h), s) { case c:return q = o << 2, q = q > 32767 ? 32767 : q, q = q < -32768 ? -32768 : q; default:return -1 } } function b () { i = new CommonAudioUtil(), h = i.g726InitState() } var c = 3, d = 65280, e = [-2048, 4, 135, 213, 273, 323, 373, 425, 425, 373, 323, 273, 213, 135, 4, -2048], f = [-12, 18, 41, 64, 112, 198, 355, 1122, 1122, 355, 198, 112, 64, 41, 18, -12], g = [0, 0, 0, 512, 512, 512, 1536, 3584, 3584, 1536, 512, 512, 512, 0, 0, 0], h = {}, i = null; return b.prototype = {decode: function (b) { for (var e = new Int16Array(2 * b.length), f = 0, g = 0; f < b.length; f++) { var h = null, i = (240 & b[f]) >> 4; h = a(i, c), e[g] = h & d, g++; var j = 15 & b[f]; h = a(j, c), e[g] = h & d, g++ } return e }}, new b() } function G726_40_AudioDecoder () { function a (a, b) { var d = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = a, r = b; switch (q &= 31, d = i.predictorZero(h), k = d >> 1, j = d + i.predictorPole(h), l = j >> 1, m = i.stepSize(h), o = i.reconstruct(16 & q, e[q], m), n = o < 0 ? l - (32767 & o) : l + o, p = n - l + k, h = i.update(5, m, f[q], g[q], o, n, p, h), r) { case c:return n << 2; default:return -1 } } function b () { i = new CommonAudioUtil(), h = i.g726InitState() } var c = 3, d = 65280, e = [-2048, -66, 28, 104, 169, 224, 274, 318, 358, 395, 429, 459, 488, 514, 539, 566, 566, 539, 514, 488, 459, 429, 395, 358, 318, 274, 224, 169, 104, 28, -66, -2048], f = [448, 448, 768, 1248, 1280, 1312, 1856, 3200, 4512, 5728, 7008, 8960, 11456, 14080, 16928, 22272, 22272, 16928, 14080, 11456, 8960, 7008, 5728, 4512, 3200, 1856, 1312, 1280, 1248, 768, 448, 448], g = [0, 0, 0, 0, 0, 512, 512, 512, 512, 512, 1024, 1536, 2048, 2560, 3072, 3072, 3072, 3072, 2560, 2048, 1536, 1024, 512, 512, 512, 512, 512, 0, 0, 0, 0, 0], h = {}, i = null; return b.prototype = {decode: function (b) { for (var e = new Int16Array(1.6 * b.length), f = 0, g = 0; f < b.length - 5; f += 5) { var h = null, i = null; i = b[f] >> 3, h = a(i, c), e[g] = h & d, g++, i = b[f] << 2 | b[f + 1] >> 6, h = a(i, c), e[g] = h & d, g++, i = b[f + 1] >> 1, h = a(i, c), e[g] = h & d, g++, i = b[f + 1] << 4 | b[f + 2] >> 4, h = a(i, c), e[g] = h & d, g++, i = b[f + 2] << 1 | b[f + 3] >> 7, h = a(i, c), e[g] = h & d, g++, i = b[f + 3] >> 2, h = a(i, c), e[g] = h & d, g++, i = b[f + 3] << 3 | b[f + 4] >> 5, h = a(i, c), e[g] = h & d, g++, i = b[f + 4] >> 0, h = a(i, c), e[g] = h & d, g++ } return e }}, new b() }
